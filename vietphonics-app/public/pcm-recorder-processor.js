/**
 * PCM Recorder AudioWorklet Processor (PRON-101)
 * High-performance audio capture on dedicated AudioWorklet rendering thread.
 * Extracts raw Float32 PCM samples with 1024-sample buffer size and latency < 50ms.
 */

class PcmRecorderProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.bufferSize = 1024;
    this.buffer = new Float32Array(this.bufferSize);
    this.bufferIndex = 0;
    this.isRecording = true;

    this.port.onmessage = (e) => {
      if (e.data && e.data.command === 'stop') {
        this.isRecording = false;
        if (this.bufferIndex > 0) {
          this.port.postMessage({
            eventType: 'pcm_buffer',
            pcmData: this.buffer.slice(0, this.bufferIndex)
          });
          this.bufferIndex = 0;
        }
      } else if (e.data && e.data.command === 'start') {
        this.isRecording = true;
        this.bufferIndex = 0;
      }
    };
  }

  process(inputs, outputs, parameters) {
    if (!this.isRecording) return true;

    const input = inputs[0];
    if (!input || !input[0]) return true;

    const channelData = input[0];
    for (let i = 0; i < channelData.length; i++) {
      this.buffer[this.bufferIndex++] = channelData[i];
      if (this.bufferIndex >= this.bufferSize) {
        this.port.postMessage({
          eventType: 'pcm_buffer',
          pcmData: this.buffer.slice()
        });
        this.bufferIndex = 0;
      }
    }
    return true;
  }
}

registerProcessor('pcm-recorder-processor', PcmRecorderProcessor);
