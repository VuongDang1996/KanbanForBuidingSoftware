/**
 * asyncAudioQueuePipeline.js
 * Asynchronous Audio Ingestion & GPU Worker Queue Pipeline (ARCH-102)
 * Features magic bytes validation, PCM 16kHz mono normalization spec,
 * BullMQ/Redis priority queue simulation, KEDA GPU autoscaler, and DLQ handling.
 */

/**
 * Validates audio magic bytes from raw binary buffer or base64 string
 * @param {Buffer|string} input
 * @returns {{ valid: boolean, format: string, mimeType: string }}
 */
export function detectAudioFormat(input) {
  let buf;
  if (Buffer.isBuffer(input)) {
    buf = input;
  } else if (typeof input === 'string') {
    if (input.startsWith('data:')) {
      const base64Data = input.split(',')[1] || '';
      buf = Buffer.from(base64Data, 'base64');
    } else {
      buf = Buffer.from(input, 'base64');
    }
  } else {
    return { valid: false, format: 'unknown', mimeType: 'application/octet-stream' };
  }

  if (buf.length < 4) {
    return { valid: false, format: 'unknown', mimeType: 'application/octet-stream' };
  }

  // RIFF / WAV: 'RIFF' header
  if (buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46) {
    return { valid: true, format: 'wav', mimeType: 'audio/wav' };
  }

  // WebM / Matroska: 0x1A 0x45 0xDF 0xA3
  if (buf[0] === 0x1A && buf[1] === 0x45 && buf[2] === 0xDF && buf[3] === 0xA3) {
    return { valid: true, format: 'webm', mimeType: 'audio/webm' };
  }

  // Ogg / Opus: 'OggS'
  if (buf[0] === 0x4F && buf[1] === 0x67 && buf[2] === 0x67 && buf[3] === 0x53) {
    return { valid: true, format: 'ogg', mimeType: 'audio/ogg' };
  }

  // MP3: 'ID3' or 0xFF 0xFB/0xF3
  if ((buf[0] === 0x49 && buf[1] === 0x44 && buf[2] === 0x33) || (buf[0] === 0xFF && (buf[1] & 0xE0) === 0xE0)) {
    return { valid: true, format: 'mp3', mimeType: 'audio/mpeg' };
  }

  return { valid: false, format: 'unsupported', mimeType: 'application/octet-stream' };
}

/**
 * Normalization specification for FFmpeg processing
 */
export const FFMPEG_NORMALIZATION_SPEC = {
  sampleRateHz: 16000,
  channels: 1, // Mono
  codec: 'pcm_s16le',
  bitDepth: 16,
  silenceThresholdDb: -50,
  silenceMinDurationSec: 0.1
};

/**
 * Validates normalized audio parameters
 */
export function verifyAudioNormalization(audioMeta = {}) {
  const isSampleRateOk = (audioMeta.sampleRateHz || 16000) === FFMPEG_NORMALIZATION_SPEC.sampleRateHz;
  const isMono = (audioMeta.channels || 1) === FFMPEG_NORMALIZATION_SPEC.channels;
  const isBitDepthOk = (audioMeta.bitDepth || 16) === FFMPEG_NORMALIZATION_SPEC.bitDepth;

  return {
    normalized: isSampleRateOk && isMono && isBitDepthOk,
    specs: FFMPEG_NORMALIZATION_SPEC,
    appliedFilters: [
      `silenceremove=start_periods=1:start_duration=${FFMPEG_NORMALIZATION_SPEC.silenceMinDurationSec}:start_threshold=${FFMPEG_NORMALIZATION_SPEC.silenceThresholdDb}dB`,
      'areverse',
      `silenceremove=start_periods=1:start_duration=${FFMPEG_NORMALIZATION_SPEC.silenceMinDurationSec}:start_threshold=${FFMPEG_NORMALIZATION_SPEC.silenceThresholdDb}dB`,
      'areverse'
    ]
  };
}

/**
 * Calculates KEDA Horizontal Pod Autoscaler target GPU workers
 * @param {number} queueDepth - Current pending jobs
 * @param {number} currentWorkers - Current active GPU nodes (default 2)
 * @param {number} minWorkers - Min nodes (default 2)
 * @param {number} maxWorkers - Max nodes (default 16)
 * @returns {{ targetWorkers: number, shouldScale: boolean, scaleDirection: string, estimatedLatencyMs: number }}
 */
export function calculateKedaGpuScale(queueDepth, currentWorkers = 2, minWorkers = 2, maxWorkers = 16) {
  // Target: 10 jobs per worker to maintain latency < 400ms
  const targetPerWorker = 10;
  let recommended = Math.ceil(queueDepth / targetPerWorker);
  recommended = Math.max(minWorkers, Math.min(maxWorkers, recommended));

  let scaleDirection = 'steady';
  if (recommended > currentWorkers) scaleDirection = 'scale_up';
  else if (recommended < currentWorkers) scaleDirection = 'scale_down';

  const estimatedLatencyMs = Math.round((queueDepth / Math.max(1, currentWorkers)) * 35);

  return {
    targetWorkers: recommended,
    currentWorkers,
    queueDepth,
    shouldScale: recommended !== currentWorkers,
    scaleDirection,
    estimatedLatencyMs
  };
}

/**
 * Evaluates job retry policy and dead letter queue routing
 * Max attempts: 3 with exponential backoff: 1s, 2s, 4s
 * @param {number} currentAttempts
 * @param {string} errorDetails
 * @returns {{ canRetry: boolean, nextAttempt: number, backoffMs: number, moveToDlq: boolean }}
 */
export function evaluateJobRetryPolicy(currentAttempts = 0, errorDetails = '') {
  const maxAttempts = 3;
  const nextAttempt = currentAttempts + 1;

  if (nextAttempt >= maxAttempts) {
    return {
      canRetry: false,
      nextAttempt,
      backoffMs: 0,
      moveToDlq: true,
      dlqReason: `Exceeded maximum attempts (${maxAttempts}). Last error: ${errorDetails}`
    };
  }

  const backoffMs = Math.pow(2, currentAttempts) * 1000; // 1s, 2s
  return {
    canRetry: true,
    nextAttempt,
    backoffMs,
    moveToDlq: false,
    dlqReason: null
  };
}
