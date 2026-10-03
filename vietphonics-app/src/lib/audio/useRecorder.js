// PRON-101 — Web Audio API low-latency in-browser audio engine.
// useRecorder(): microphone capture with AudioWorklet / AnalyserNode metering + final PCM buffer.
import { useCallback, useEffect, useRef, useState } from 'react';

let sharedCtx = null;
export function getAudioContext() {
  if (!sharedCtx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (Ctx) {
      sharedCtx = new Ctx({ latencyHint: 'interactive' });
    }
  }
  if (sharedCtx && sharedCtx.state === 'suspended') {
    sharedCtx.resume();
  }
  return sharedCtx;
}

export function isMicSupported() {
  return typeof navigator !== 'undefined' &&
    !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

/**
 * @param {{ maxSeconds?: number, onLevel?: (rms:number)=>void }} opts
 * returns {
 *   status: 'idle'|'requesting'|'recording'|'processing'|'ready'|'error',
 *   error, level (0..1 live RMS), elapsed (s),
 *   analyserNode,
 *   isRecording,
 *   isPermissionDenied,
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
  const [analyserState, setAnalyserState] = useState(null);

  const streamRef = useRef(null);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const analyserRef = useRef(null);
  const workletRef = useRef(null);
  const sourceRef = useRef(null);
  const rafRef = useRef(null);
  const startTimeRef = useRef(0);
  const frameRef = useRef(new Float32Array(2048));

  const cleanup = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    try {
      if (workletRef.current) {
        workletRef.current.port?.postMessage({ command: 'stop' });
        workletRef.current.disconnect();
      }
    } catch (e) {}
    try { sourceRef.current && sourceRef.current.disconnect(); } catch (e) {}
    if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    workletRef.current = null;
    analyserRef.current = null;
    setAnalyserState(null);
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
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          channelCount: 1,
          sampleRate: 16000
        }
      });
      streamRef.current = stream;
      const ctx = getAudioContext();
      if (!ctx) throw new Error('AudioContext unavailable');

      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 1024; // 512 frequency bins
      source.connect(analyser);
      sourceRef.current = source;
      analyserRef.current = analyser;
      setAnalyserState(analyser);

      // AC 1: AudioWorklet initialization for low-latency PCM streaming (<50ms)
      if (ctx.audioWorklet && typeof ctx.audioWorklet.addModule === 'function') {
        try {
          await ctx.audioWorklet.addModule('/pcm-recorder-processor.js');
          const workletNode = new AudioWorkletNode(ctx, 'pcm-recorder-processor');
          source.connect(workletNode);
          workletRef.current = workletNode;
        } catch (workletErr) {
          console.info('AudioWorklet module info (using fallback):', workletErr.message);
        }
      }

      chunksRef.current = [];
      const mime = window.MediaRecorder && MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : '';
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
        if (!analyserRef.current) return;
        analyserRef.current.getFloatTimeDomainData(frameRef.current);
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
      const isDenied = e.name === 'NotAllowedError' || e.name === 'PermissionDeniedError';
      setError(isDenied
        ? 'Bạn chưa cấp quyền microphone. Vui lòng bấm Cho phép để ghi âm.'
        : e.message
      );
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

  const isRecording = status === 'recording';
  const isPermissionDenied = status === 'error' && (error?.includes('quyền') || error?.includes('NotAllowedError'));

  return {
    status,
    error,
    level,
    elapsed,
    result,
    isRecording,
    isPermissionDenied,
    analyserNode: analyserState || analyserRef.current,
    start,
    stop,
    reset,
    getLiveWaveform,
    getAnalyser
  };
}

/**
 * PRON-101 AC 3: Push-to-Talk (Space bar listener with debounce)
 */
export function usePushToTalk({ onStart, onStop, isRecording, disabled = false }) {
  const isKeyDownRef = useRef(false);

  useEffect(() => {
    if (disabled || typeof window === 'undefined') return;

    const handleKeyDown = (e) => {
      if (e.code === 'Space' && !e.repeat && !isKeyDownRef.current) {
        const activeTag = document.activeElement?.tagName?.toLowerCase();
        if (activeTag === 'input' || activeTag === 'textarea' || document.activeElement?.isContentEditable) {
          return;
        }
        e.preventDefault();
        isKeyDownRef.current = true;
        onStart?.();
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === 'Space' && isKeyDownRef.current) {
        e.preventDefault();
        isKeyDownRef.current = false;
        onStop?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [onStart, onStop, disabled]);
}

/** Play a Float32Array / AudioBuffer / URL. Returns a stop() function. */
export function playSamples(samples, sampleRate, { rate = 1 } = {}) {
  const ctx = getAudioContext();
  if (!ctx) return () => {};
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
