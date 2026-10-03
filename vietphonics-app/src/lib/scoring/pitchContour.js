/**
 * Pitch Contour & Sentence Intonation Melody Tracker (ELSA-203)
 * Implements F0 Semitone Normalization, Terminal Pitch Slope Classification,
 * and Web Audio Humming Synth parameters.
 */

// 1. Sentence Benchmarks with Native General US Intonation Profiles
export const SENTENCE_PITCH_BENCHMARKS = {
  'sent_yes_no_01': {
    id: 'sent_yes_no_01',
    text: 'Are you coming with us tomorrow?',
    type: 'yes_no_question',
    targetTerminalTone: 'rise',
    minTerminalDeltaSemitone: 2.5,
    referenceMedianF0: 180, // Hz
    words: [
      { text: 'Are', startSec: 0.0, endSec: 0.25, semitone: 0.0 },
      { text: 'you', startSec: 0.25, endSec: 0.5, semitone: -0.8 },
      { text: 'coming', startSec: 0.5, endSec: 1.0, semitone: 1.5 },
      { text: 'with', startSec: 1.0, endSec: 1.3, semitone: -0.6 },
      { text: 'us', startSec: 1.3, endSec: 1.6, semitone: -0.4 },
      { text: 'tomorrow?', startSec: 1.6, endSec: 2.4, semitone: 4.2 }
    ],
    // High-resolution reference curve points (time 0.0 to 1.0 normalized)
    referencePoints: [
      { t: 0.0, st: 0.0 },
      { t: 0.1, st: -0.4 },
      { t: 0.2, st: -0.8 },
      { t: 0.3, st: 0.6 },
      { t: 0.4, st: 1.5 },
      { t: 0.5, st: 0.2 },
      { t: 0.6, st: -0.6 },
      { t: 0.7, st: -0.4 },
      { t: 0.8, st: 1.2 },
      { t: 0.9, st: 2.8 },
      { t: 1.0, st: 4.5 }
    ],
    pedagogicalTip: 'Câu hỏi Yes/No trong tiếng Anh cần vút cao giọng (Rising Tone) ở âm tiết cuối cùng (~+3 đến +5 semitone) để thể hiện sự dò hỏi mong đợi câu trả lời.'
  },
  'sent_wh_02': {
    id: 'sent_wh_02',
    text: 'Where did you buy this fresh bread?',
    type: 'wh_question',
    targetTerminalTone: 'fall',
    minTerminalDeltaSemitone: -2.0,
    referenceMedianF0: 175,
    words: [
      { text: 'Where', startSec: 0.0, endSec: 0.35, semitone: 2.2 },
      { text: 'did', startSec: 0.35, endSec: 0.6, semitone: -0.5 },
      { text: 'you', startSec: 0.6, endSec: 0.85, semitone: -1.0 },
      { text: 'buy', startSec: 0.85, endSec: 1.3, semitone: 2.8 },
      { text: 'this', startSec: 1.3, endSec: 1.55, semitone: -0.8 },
      { text: 'fresh', startSec: 1.55, endSec: 1.95, semitone: 0.5 },
      { text: 'bread?', startSec: 1.95, endSec: 2.5, semitone: -2.6 }
    ],
    referencePoints: [
      { t: 0.0, st: 2.2 },
      { t: 0.15, st: 1.0 },
      { t: 0.3, st: -0.5 },
      { t: 0.45, st: -1.0 },
      { t: 0.6, st: 2.8 },
      { t: 0.75, st: -0.8 },
      { t: 0.85, st: 0.5 },
      { t: 1.0, st: -2.6 }
    ],
    pedagogicalTip: 'Câu hỏi Wh- (Where, What, Why, How...) thường hạ giọng (Falling Tone) ở cuối câu sau khi đã nhấn mạnh từ nghi vấn và động từ chính.'
  },
  'sent_statement_03': {
    id: 'sent_statement_03',
    text: 'Six months ago, she baked fresh bread on the street.',
    type: 'statement',
    targetTerminalTone: 'fall',
    minTerminalDeltaSemitone: -2.0,
    referenceMedianF0: 170,
    words: [
      { text: 'Six', startSec: 0.0, endSec: 0.3, semitone: 0.2 },
      { text: 'months', startSec: 0.3, endSec: 0.7, semitone: 1.8 },
      { text: 'ago,', startSec: 0.7, endSec: 1.2, semitone: 1.0 },
      { text: 'she', startSec: 1.2, endSec: 1.45, semitone: -0.4 },
      { text: 'baked', startSec: 1.45, endSec: 1.9, semitone: 2.4 },
      { text: 'fresh', startSec: 1.9, endSec: 2.25, semitone: 1.2 },
      { text: 'bread', startSec: 2.25, endSec: 2.7, semitone: 0.0 },
      { text: 'on the', startSec: 2.7, endSec: 3.1, semitone: -0.8 },
      { text: 'street.', startSec: 3.1, endSec: 3.8, semitone: -3.2 }
    ],
    referencePoints: [
      { t: 0.0, st: 0.2 },
      { t: 0.15, st: 1.8 },
      { t: 0.3, st: 1.0 },
      { t: 0.45, st: -0.4 },
      { t: 0.6, st: 2.4 },
      { t: 0.75, st: 1.2 },
      { t: 0.85, st: -0.8 },
      { t: 1.0, st: -3.2 }
    ],
    pedagogicalTip: 'Câu khẳng định/trần thuật tiếng Anh luôn kết thúc bằng ngữ điệu đi xuống dứt khoát (Falling Cadence) để báo hiệu câu nói đã kết thúc hoàn chỉnh.'
  }
};

/**
 * Calculates semitone value relative to median F0 (Gate B / AC 4)
 * Semitone = 12 * log2(F0 / medianF0)
 * Eliminates biological pitch gap between male (~120Hz) and female (~220Hz) speakers.
 */
export function calculateSemitone(f0, medianF0) {
  if (!f0 || f0 <= 30 || !medianF0 || medianF0 <= 30) {
    return 0;
  }
  const st = 12 * Math.log2(f0 / medianF0);
  return Number(st.toFixed(2));
}

/**
 * Calculates the median F0 frequency from an array of pitch samples.
 */
export function calculateMedianF0(f0Array) {
  const voiced = f0Array.filter(f => typeof f === 'number' && f >= 50 && f <= 600);
  if (voiced.length === 0) return 160; // fallback default
  const sorted = [...voiced].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

/**
 * Normalizes an array of raw F0 frequency readings into Semitone points.
 * @param {Array<{timeSec: number, f0: number}>} rawPitchTrack
 * @returns {{ medianF0: number, normalizedPoints: Array<{t: number, st: number, timeSec: number}> }}
 */
export function normalizePitchContour(rawPitchTrack) {
  const f0Values = rawPitchTrack.map(p => p.f0).filter(f => f > 50);
  const medianF0 = calculateMedianF0(f0Values);
  const totalDuration = rawPitchTrack.length > 0 ? (rawPitchTrack[rawPitchTrack.length - 1].timeSec || 1) : 1;

  const normalizedPoints = rawPitchTrack.map(pt => {
    const st = pt.f0 > 50 ? calculateSemitone(pt.f0, medianF0) : 0;
    const tNorm = totalDuration > 0 ? Number((pt.timeSec / totalDuration).toFixed(3)) : 0;
    return {
      timeSec: Number(pt.timeSec.toFixed(2)),
      t: tNorm,
      st
    };
  });

  return { medianF0: Number(medianF0.toFixed(1)), normalizedPoints };
}

/**
 * Analyzes terminal intonation slope at the last 300ms (or last 20% of sentence)
 * (AC 2)
 */
export function classifyTerminalIntonation(normalizedPoints) {
  if (!normalizedPoints || normalizedPoints.length < 2) {
    return { terminalTone: 'flat', deltaSemitones: 0, isRising: false, isFalling: false };
  }

  // Look at the tail portion (last 3 points or last 35% of timeline)
  const tailCount = Math.max(3, Math.min(normalizedPoints.length, Math.floor(normalizedPoints.length * 0.35)));
  const tail = normalizedPoints.slice(-tailCount);

  const startPoint = tail[0];
  const endPoint = tail[tail.length - 1];
  const deltaSemitones = Number((endPoint.st - startPoint.st).toFixed(2));

  let terminalTone = 'flat';
  if (deltaSemitones >= 1.5) {
    terminalTone = 'rise';
  } else if (deltaSemitones <= -1.5) {
    terminalTone = 'fall';
  }

  return {
    terminalTone,
    deltaSemitones,
    isRising: terminalTone === 'rise',
    isFalling: terminalTone === 'fall'
  };
}

/**
 * Computes overall intonation melody similarity score between learner curve and native benchmark.
 */
export function evaluateMelodySimilarity(userPoints, nativePoints, targetTerminalTone, userTerminalTone) {
  if (!userPoints || userPoints.length === 0 || !nativePoints || nativePoints.length === 0) {
    return 50;
  }

  // Sample comparison across normalized timeline t [0.0 ... 1.0]
  let totalDiff = 0;
  let sampleCount = 0;

  for (const nPt of nativePoints) {
    // Find closest user point
    let closest = userPoints[0];
    let minTDiff = Math.abs(userPoints[0].t - nPt.t);
    for (const uPt of userPoints) {
      const d = Math.abs(uPt.t - nPt.t);
      if (d < minTDiff) {
        minTDiff = d;
        closest = uPt;
      }
    }
    totalDiff += Math.abs(closest.st - nPt.st);
    sampleCount++;
  }

  const avgDiff = sampleCount > 0 ? (totalDiff / sampleCount) : 2.0;
  let rawScore = Math.max(30, Math.min(100, Math.round(100 - (avgDiff * 14))));

  // Terminal intonation is critical (weighted 30% of total prosody score)
  const isTerminalCorrect = targetTerminalTone === userTerminalTone;
  if (!isTerminalCorrect) {
    rawScore = Math.max(35, rawScore - 25);
  } else {
    rawScore = Math.min(100, rawScore + 5);
  }

  return rawScore;
}

/**
 * Main evaluation orchestrator for ELSA-203
 */
export function analyzePitchContour(sentenceId, userPitchTrack = null, simulatedTone = null) {
  const benchmark = SENTENCE_PITCH_BENCHMARKS[sentenceId] || SENTENCE_PITCH_BENCHMARKS['sent_yes_no_01'];

  let normalizedUserPoints = [];
  let userMedianF0 = 165;

  if (userPitchTrack && userPitchTrack.length > 0) {
    const norm = normalizePitchContour(userPitchTrack);
    normalizedUserPoints = norm.normalizedPoints;
    userMedianF0 = norm.medianF0;
  } else {
    // Generate simulated user curve according to simulatedTone parameter
    const isToneCorrect = simulatedTone !== 'fall_trap';
    normalizedUserPoints = benchmark.referencePoints.map(pt => {
      let st = pt.st;
      if (!isToneCorrect) {
        // Vietnamese L1 tone trap: user drops pitch sharply at the end instead of rising
        if (pt.t >= 0.7) {
          const progress = (pt.t - 0.7) / 0.3; // 0 to 1
          st = 0.5 - (progress * 3.2); // drops from +0.5 down to -2.7 st
        } else {
          st = pt.st * 0.7; // flatter intonation
        }
      } else {
        // Natural small human fluctuation around native target
        st = pt.st + (Math.sin(pt.t * Math.PI * 4) * 0.2);
      }
      return {
        t: pt.t,
        st: Number(st.toFixed(2)),
        timeSec: Number((pt.t * 2.4).toFixed(2))
      };
    });
  }

  const terminalAnalysis = classifyTerminalIntonation(normalizedUserPoints);
  const isTerminalCorrect = terminalAnalysis.terminalTone === benchmark.targetTerminalTone;
  const score = evaluateMelodySimilarity(
    normalizedUserPoints,
    benchmark.referencePoints,
    benchmark.targetTerminalTone,
    terminalAnalysis.terminalTone
  );

  let feedback = '';
  let l1ToneTrap = false;

  if (benchmark.type === 'yes_no_question' && !isTerminalCorrect) {
    l1ToneTrap = true;
    feedback = '⚠️ Bẫy ngữ điệu L1: Bạn đang hạ giọng cuối câu hỏi Yes/No! Tiếng Việt thường dùng các từ hỏi ở cuối ("hả", "à", "không") nên người học có thói quen hạ giọng. Trong tiếng Anh, bạn phải vút cao giọng ở từ cuối cùng để biểu đạt câu hỏi.';
  } else if (benchmark.targetTerminalTone === 'fall' && terminalAnalysis.terminalTone === 'rise') {
    feedback = '⚠️ Ngữ điệu câu bị lơ lửng: Bạn đang lên giọng ở cuối câu trần thuật/Wh-! Hãy hạ giọng dứt khoát về âm vực ngực để báo hiệu câu nói đã kết thúc.';
  } else {
    feedback = '🎉 Ngữ điệu tuyệt vời! Độ cong cao độ và hướng lượn cuối câu hoàn toàn chuẩn xác theo ngữ điệu người bản ngữ.';
  }

  return {
    sentenceId: benchmark.id,
    sentenceText: benchmark.text,
    sentenceType: benchmark.type,
    targetTerminalTone: benchmark.targetTerminalTone,
    userTerminalTone: terminalAnalysis.terminalTone,
    terminalDeltaSemitones: terminalAnalysis.deltaSemitones,
    isTerminalCorrect,
    melodySimilarityScore: score,
    userMedianF0,
    l1ToneTrap,
    feedback,
    pedagogicalTip: benchmark.pedagogicalTip,
    words: benchmark.words,
    nativePoints: benchmark.referencePoints,
    userPoints: normalizedUserPoints
  };
}
