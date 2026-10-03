// PRON-101 — Web Audio API low-latency in-browser audio engine.
// useRecorder(): microphone capture with live level/waveform metering + final PCM buffer for analysis.
import { useCallback, useEffect, useRef, useState } from 'react';

let sharedCtx = null;
export function getAudioContext() {
  if (!sharedCtx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    sharedCtx = new Ctx({ latencyHint: 'interactive' });
  }
  if (sharedCtx.state === 'suspended') sharedCtx.resume();
  return sharedCtx;
}

export function isMicSupported() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
}

/**
 * @param {{ maxSeconds?: number, onLevel?: (rms:number)=>void }} opts
 * returns {
 *   status: 'idle'|'requesting'|'recording'|'processing'|'ready'|'error',
 *   error, level (0..1 live RMS), elapsed (s),
 *   liveSamples: Float32Array ref (latest analyser frame) — read via getLiveWaveform(),
 *   result: { blob, url, samples: Float32Array (mono), sampleRate, duration } | null,
 *   start(), stop(), reset()
 * }
 */
export function useRecorder({ maxSeconds = 30 } = {}) {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [level, setLevel] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [result, setResult] = useState(null);

  const streamRef = useRef(null);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const rafRef = useRef(null);
  const startTimeRef = useRef(0);
  const frameRef = useRef(new Float32Array(2048));

  const cleanup = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    try { sourceRef.current && sourceRef.current.disconnect(); } catch (e) {}
    if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  useEffect(() => cleanup, [cleanup]);

  const stop = useCallback(() => {
    const rec = recorderRef.current;
    if (rec && rec.state === 'recording') {
      setStatus('processing');
      rec.stop();
    }
  }, []);

  const start = useCallback(async () => {
    setError(null);
    setResult(null);
    if (!isMicSupported()) {
      setError('Trình duyệt không hỗ trợ thu âm. Hãy dùng Chrome / Edge mới nhất.');
      setStatus('error');
      return;
    }
    try {
      setStatus('requesting');
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true, channelCount: 1 }
      });
      streamRef.current = stream;
      const ctx = getAudioContext();
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
      source.connect(analyser);
      sourceRef.current = source;
      analyserRef.current = analyser;

      chunksRef.current = [];
      const mime = MediaRecorder.isTypeSupported('audio/webm;codecs=opus') ? 'audio/webm;codecs=opus' : '';
      const rec = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
      rec.ondataavailable = (e) => e.data.size && chunksRef.current.push(e.data);
      rec.onstop = async () => {
        cleanup();
        try {
          const blob = new Blob(chunksRef.current, { type: rec.mimeType || 'audio/webm' });
          const arr = await blob.arrayBuffer();
          const decoded = await getAudioContext().decodeAudioData(arr);
          const samples = decoded.getChannelData(0).slice();
          setResult({
            blob,
            url: URL.createObjectURL(blob),
            samples,
            sampleRate: decoded.sampleRate,
            duration: decoded.duration
          });
          setStatus('ready');
        } catch (e) {
          setError('Không giải mã được bản ghi âm: ' + e.message);
          setStatus('error');
        }
      };
      recorderRef.current = rec;
      rec.start(100);
      startTimeRef.current = performance.now();
      setStatus('recording');

      const tick = () => {
        analyser.getFloatTimeDomainData(frameRef.current);
        let sum = 0;
        for (let i = 0; i < frameRef.current.length; i++) sum += frameRef.current[i] ** 2;
        const rms = Math.sqrt(sum / frameRef.current.length);
        setLevel(Math.min(1, rms * 4));
        const el = (performance.now() - startTimeRef.current) / 1000;
        setElapsed(el);
        if (el >= maxSeconds) {
          stop();
          return;
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      tick();
    } catch (e) {
      cleanup();
      setError(e.name === 'NotAllowedError' ? 'Bạn chưa cấp quyền micro. Bấm biểu tượng 🔒 trên thanh địa chỉ để cho phép.' : e.message);
      setStatus('error');
    }
  }, [cleanup, maxSeconds, stop]);

  const reset = useCallback(() => {
    cleanup();
    setResult(null);
    setStatus('idle');
    setElapsed(0);
    setLevel(0);
  }, [cleanup]);

  const getLiveWaveform = useCallback(() => frameRef.current, []);
  const getAnalyser = useCallback(() => analyserRef.current, []);

  return { status, error, level, elapsed, result, start, stop, reset, getLiveWaveform, getAnalyser };
}

/** Play a Float32Array / AudioBuffer / URL. Returns a stop() function. */
export function playSamples(samples, sampleRate, { rate = 1 } = {}) {
  const ctx = getAudioContext();
  const buf = ctx.createBuffer(1, samples.length, sampleRate);
  buf.copyToChannel(samples, 0);
  const src = ctx.createBufferSource();
  src.buffer = buf;
  src.playbackRate.value = rate;
  src.connect(ctx.destination);
  src.start();
  return () => { try { src.stop(); } catch (e) {} };
}

/** Play only a time slice [t0, t1] seconds of samples. */
export function playSlice(samples, sampleRate, t0, t1, opts) {
  const a = Math.max(0, Math.floor(t0 * sampleRate));
  const b = Math.min(samples.length, Math.floor(t1 * sampleRate));
  return playSamples(samples.slice(a, b), sampleRate, opts);
}
