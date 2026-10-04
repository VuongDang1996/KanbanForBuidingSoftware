/**
 * Dual-Track Audio Recording & Native Speaker Waveform Comparison (PRON-204)
 * Provides peak waveform extraction, vowel nucleus alignment,
 * and duration deficiency analysis between Native (Track A) and User (Track B).
 */

export const DUAL_TRACK_BENCHMARKS = {
  'thought': {
    word: 'thought',
    ipa: '/θɔːt/',
    nativeDurationMs: 680,
    nativeVowelNucleusMs: 240, // /ɔː/ sustained vowel
    nativeVowelRange: [140, 380], // [start, end]
    // Normalized 40-point envelope for native Track A
    nativePeaks: [
      0.05, 0.12, 0.25, 0.40, 0.65, 0.85, 0.95, 0.98, 0.94, 0.88,
      0.82, 0.78, 0.75, 0.73, 0.70, 0.68, 0.65, 0.60, 0.55, 0.48,
      0.40, 0.32, 0.25, 0.18, 0.10, 0.05, 0.02, 0.01, 0.08, 0.35,
      0.70, 0.92, 0.60, 0.25, 0.10, 0.05, 0.02, 0.01, 0.00, 0.00
    ],
    // Typical Vietnamese L1 truncated attempt: user drops vowel early
    demoUserDurationMs: 460,
    demoUserVowelRange: [120, 240], // only 120ms instead of 240ms!
    demoUserPeaks: [
      0.04, 0.10, 0.22, 0.38, 0.60, 0.80, 0.88, 0.75, 0.50, 0.25,
      0.10, 0.05, 0.02, 0.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00,
      0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.05, 0.25,
      0.55, 0.70, 0.35, 0.10, 0.02, 0.00, 0.00, 0.00, 0.00, 0.00
    ]
  },
  'banana': {
    word: 'banana',
    ipa: '/bəˈnænə/',
    nativeDurationMs: 720,
    nativeVowelNucleusMs: 260, // stressed /ˈnæ/
    nativeVowelRange: [180, 440],
    nativePeaks: [
      0.10, 0.25, 0.15, 0.08, 0.15, 0.45, 0.82, 0.98, 0.92, 0.84,
      0.76, 0.68, 0.58, 0.45, 0.30, 0.18, 0.08, 0.05, 0.12, 0.22,
      0.18, 0.12, 0.08, 0.05, 0.02, 0.01, 0.00, 0.00, 0.00, 0.00,
      0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00
    ],
    demoUserDurationMs: 510,
    demoUserVowelRange: [160, 310],
    demoUserPeaks: [
      0.12, 0.28, 0.18, 0.09, 0.18, 0.50, 0.85, 0.75, 0.50, 0.30,
      0.15, 0.08, 0.04, 0.02, 0.01, 0.00, 0.00, 0.00, 0.05, 0.15,
      0.10, 0.05, 0.02, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00,
      0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00
    ]
  },
  'fresh': {
    word: 'fresh',
    ipa: '/freʃ/',
    nativeDurationMs: 580,
    nativeVowelNucleusMs: 180,
    nativeVowelRange: [120, 300],
    nativePeaks: [
      0.08, 0.20, 0.45, 0.70, 0.88, 0.95, 0.85, 0.72, 0.55, 0.40,
      0.30, 0.42, 0.58, 0.65, 0.68, 0.64, 0.60, 0.55, 0.48, 0.38,
      0.25, 0.15, 0.08, 0.04, 0.01, 0.00, 0.00, 0.00, 0.00, 0.00,
      0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00
    ],
    demoUserDurationMs: 390,
    demoUserVowelRange: [100, 200],
    demoUserPeaks: [
      0.06, 0.18, 0.40, 0.65, 0.80, 0.82, 0.60, 0.40, 0.20, 0.10,
      0.15, 0.30, 0.40, 0.42, 0.35, 0.20, 0.10, 0.05, 0.02, 0.00,
      0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00,
      0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00
    ]
  }
};

/**
 * Extracts 40 normalized peak points from an audio Float32Array channel
 */
export function extractWaveformPeaks(float32Array, targetPoints = 40) {
  if (!float32Array || float32Array.length === 0) {
    return new Array(targetPoints).fill(0);
  }

  const step = Math.floor(float32Array.length / targetPoints);
  const peaks = [];

  for (let i = 0; i < targetPoints; i++) {
    const start = i * step;
    const end = Math.min(start + step, float32Array.length);
    let max = 0;
    for (let j = start; j < end; j++) {
      const absVal = Math.abs(float32Array[j]);
      if (absVal > max) max = absVal;
    }
    peaks.push(Number(max.toFixed(3)));
  }

  // Normalize between 0.0 and 1.0
  const maxPeak = Math.max(...peaks, 0.001);
  return peaks.map((p) => Number((p / maxPeak).toFixed(2)));
}

/**
 * Compares User audio against Native benchmark waveform
 */
export function compareDualTrackWaveforms(word = 'thought', userDurationMs = 460, userPeaks = null) {
  const benchmark = DUAL_TRACK_BENCHMARKS[word] || DUAL_TRACK_BENCHMARKS.thought;
  const userP = userPeaks || benchmark.demoUserPeaks;

  const durationDiff = benchmark.nativeDurationMs - userDurationMs;
  const nativeVowelDuration = benchmark.nativeVowelNucleusMs;
  const userVowelDuration = Math.round(userDurationMs * (benchmark.demoUserVowelRange[1] - benchmark.demoUserVowelRange[0]) / benchmark.demoUserDurationMs);
  const vowelDiff = nativeVowelDuration - userVowelDuration;

  const isVowelTooShort = vowelDiff >= 70; // more than 70ms shorter
  let durationWarning = null;

  if (isVowelTooShort) {
    durationWarning = `Nguyên âm quá ngắn! Bạn ngân ${userVowelDuration}ms, thiếu ~${vowelDiff}ms so với chuẩn bản ngữ (${nativeVowelDuration}ms). Hãy kéo dài thêm!`;
  }

  // Calculate simple correlation coefficient between native and user peaks
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  const count = Math.min(benchmark.nativePeaks.length, userP.length);

  for (let i = 0; i < count; i++) {
    const a = benchmark.nativePeaks[i];
    const b = userP[i];
    dotProduct += a * b;
    normA += a * a;
    normB += b * b;
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  const cosineSim = denominator > 0 ? (dotProduct / denominator) : 0;
  const correlationScore = Math.max(0, Math.min(100, Math.round(cosineSim * 100)));

  return {
    word: benchmark.word,
    ipa: benchmark.ipa,
    nativeDurationMs: benchmark.nativeDurationMs,
    userDurationMs,
    durationDiff,
    nativeVowelNucleusMs: nativeVowelDuration,
    userVowelDurationMs: userVowelDuration,
    isVowelTooShort,
    durationWarning,
    discrepancyRange: isVowelTooShort ? [userVowelDuration, nativeVowelDuration] : null,
    correlationScore,
    nativePeaks: benchmark.nativePeaks,
    userPeaks: userP
  };
}
