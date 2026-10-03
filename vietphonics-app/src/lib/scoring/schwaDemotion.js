/**
 * Syllable Stress vs. Tone Mark Visualizer & Schwa Demotion (VN-103)
 * Evaluates vowel reduction (Schwa Demotion) using Neutral Formant Proximity:
 * D_neutral = sqrt((F1 - 500)^2 + (F2 - 1500)^2)
 * and duration compression (<80ms).
 */

export const SCHWA_BENCHMARK_WORDS = {
  banana: {
    word: 'banana',
    ipa: '/bəˈnæn.ə/',
    syllables: [
      { text: 'ba', ipa: 'bə', isStress: false, isSchwa: true, targetDurationMs: 60, targetF1: 510, targetF2: 1480 },
      { text: 'NA', ipa: 'ˈnæn', isStress: true, isSchwa: false, targetDurationMs: 290, targetF1: 750, targetF2: 1720 },
      { text: 'na', ipa: 'ə', isStress: false, isSchwa: true, targetDurationMs: 55, targetF1: 520, targetF2: 1510 }
    ],
    schwaIndex: 0,
    vietnameseToneTrap: 'Đọc đều 3 âm tiết "ba - na - nà" (Syllable-timed) với âm "ba" mở to /aː/ thay vì lướt nhẹ /bə/.',
    pedagogicalAdvice: "Bạn đang đọc rõ chữ 'ba'! Hãy đọc lướt thật nhanh thành /bə/ - chỉ lướt nhẹ môi như một tiếng thở dài."
  },
  about: {
    word: 'about',
    ipa: '/əˈbaʊt/',
    syllables: [
      { text: 'a', ipa: 'ə', isStress: false, isSchwa: true, targetDurationMs: 50, targetF1: 505, targetF2: 1490 },
      { text: 'BOUT', ipa: 'ˈbaʊt', isStress: true, isSchwa: false, targetDurationMs: 310, targetF1: 720, targetF2: 1300 }
    ],
    schwaIndex: 0,
    vietnameseToneTrap: 'Đọc thành 2 từ đơn "a - bao", kéo dài âm "a" đầu tiên.',
    pedagogicalAdvice: "Đừng đọc là 'a-bao'! Âm đầu là schwa /ə/ siêu ngắn (<60ms), dồn trọng tâm vút vào 'bout'."
  },
  chocolate: {
    word: 'chocolate',
    ipa: '/ˈtʃɒk.lət/',
    syllables: [
      { text: 'CHO', ipa: 'ˈtʃɒk', isStress: true, isSchwa: false, targetDurationMs: 270, targetF1: 680, targetF2: 1100 },
      { text: 'late', ipa: 'lət', isStress: false, isSchwa: true, targetDurationMs: 65, targetF1: 515, targetF2: 1520 }
    ],
    schwaIndex: 1,
    vietnameseToneTrap: 'Đọc thành 3 âm tiết "chô - cô - lét" đều độ dài.',
    pedagogicalAdvice: "Từ này trong tiếng Anh chỉ có 2 âm tiết! Chữ 'o' ở giữa bị nuốt và âm đuôi rút gọn thành /lət/ cực lướt."
  },
  camera: {
    word: 'camera',
    ipa: '/ˈkæm.rə/',
    syllables: [
      { text: 'CAM', ipa: 'ˈkæm', isStress: true, isSchwa: false, targetDurationMs: 280, targetF1: 780, targetF2: 1650 },
      { text: 'ra', ipa: 'rə', isStress: false, isSchwa: true, targetDurationMs: 60, targetF1: 520, targetF2: 1470 }
    ],
    schwaIndex: 1,
    vietnameseToneTrap: 'Đọc thành 3 âm tiết tiếng Việt "ca - me - ra".',
    pedagogicalAdvice: "Nhấn mạnh vào 'cam' và lướt siêu nhẹ âm đuôi /rə/, không đọc rời rạc từng âm tiết."
  },
  police: {
    word: 'police',
    ipa: '/pəˈliːs/',
    syllables: [
      { text: 'po', ipa: 'pə', isStress: false, isSchwa: true, targetDurationMs: 55, targetF1: 495, targetF2: 1530 },
      { text: 'LICE', ipa: 'ˈliːs', isStress: true, isSchwa: false, targetDurationMs: 320, targetF1: 300, targetF2: 2200 }
    ],
    schwaIndex: 0,
    vietnameseToneTrap: 'Đọc thành "pô - lít" với nguyên âm /oʊ/ căng miệng ở âm đầu.',
    pedagogicalAdvice: "Âm đầu là schwa /pə/, thả lỏng hoàn toàn cơ môi và chỉ bung hơi nhẹ trước khi bật âm 'lice'."
  }
};

/**
 * Calculates Euclidean distance in Formant space (F1, F2) to neutral vocal tract center (500Hz, 1500Hz)
 * (Gate B / AC 1)
 */
export function calculateNeutralFormantDistance(f1, f2) {
  if (typeof f1 !== 'number' || typeof f2 !== 'number') return 999;
  const dF1 = f1 - 500;
  const dF2 = f2 - 1500;
  const dist = Math.sqrt(dF1 * dF1 + dF2 * dF2);
  return Number(dist.toFixed(1));
}

/**
 * Evaluates whether a vowel segment qualifies as an authentic relaxed Schwa Demotion.
 * Criterion:
 * - D_neutral <= 160 Hz (central relaxed tongue)
 * - Duration <= 85 ms (rapid compression)
 */
export function evaluateSchwaDemotion(durationMs, f1, f2) {
  const neutralDistance = calculateNeutralFormantDistance(f1, f2);
  const isNeutralFormant = neutralDistance <= 160;
  const isRapidDuration = durationMs <= 85;

  const isDemoted = isNeutralFormant && isRapidDuration;
  const l1FullVowelTrap = f1 > 700 || durationMs > 150;

  // Calculate score (0 to 100)
  let score = 100;

  // Penalty for duration excess
  if (durationMs > 80) {
    const durationPenalty = Math.min(45, (durationMs - 80) * 0.4);
    score -= durationPenalty;
  }

  // Penalty for formant offset
  if (neutralDistance > 100) {
    const formantPenalty = Math.min(45, (neutralDistance - 100) * 0.2);
    score -= formantPenalty;
  }

  if (l1FullVowelTrap) {
    score = Math.min(48, Math.max(25, Math.round(score)));
  } else {
    score = Math.max(30, Math.min(100, Math.round(score)));
  }

  return {
    durationMs,
    f1,
    f2,
    neutralDistance,
    isDemoted,
    isNeutralFormant,
    isRapidDuration,
    l1FullVowelTrap,
    score
  };
}

/**
 * Main analyzer for a target word
 */
export function analyzeWordSchwa(wordKey = 'banana', customAudioMetrics = null, simulateL1Trap = false) {
  const normalizedKey = (wordKey || 'banana').toLowerCase().trim();
  const benchmark = SCHWA_BENCHMARK_WORDS[normalizedKey] || SCHWA_BENCHMARK_WORDS.banana;

  let durationMs = 62;
  let f1 = 510;
  let f2 = 1490;

  if (customAudioMetrics) {
    durationMs = customAudioMetrics.durationMs ?? durationMs;
    f1 = customAudioMetrics.f1 ?? f1;
    f2 = customAudioMetrics.f2 ?? f2;
  } else if (simulateL1Trap) {
    // Vietnamese L1 full unreduced vowel trap: open mouth (~820Hz), long duration (~210ms)
    durationMs = 210;
    f1 = 820;
    f2 = 1250;
  }

  const evaluation = evaluateSchwaDemotion(durationMs, f1, f2);

  let feedback = '';
  if (evaluation.isDemoted) {
    feedback = '🎉 Giảm âm Schwa xuất sắc! Bạn đã lướt âm cực nhanh (<80ms) và thả lỏng khẩu hình về trung tâm, mang lại nhịp điệu tiếng Anh tự nhiên.';
  } else if (evaluation.l1FullVowelTrap) {
    feedback = `⚠️ Bẫy nguyên âm mở L1: ${benchmark.pedagogicalAdvice}`;
  } else if (!evaluation.isRapidDuration) {
    feedback = '⚠️ Âm schwa của bạn có khẩu hình tốt nhưng phát âm hơi dài. Hãy đọc lướt nhanh hơn nữa như một tiếng thở nhẹ.';
  } else {
    feedback = '⚠️ Âm schwa chưa thả lỏng hoàn toàn. Hãy để đầu lưỡi và hàm ở vị trí trung tính không căng cứng.';
  }

  return {
    word: benchmark.word,
    ipa: benchmark.ipa,
    syllables: benchmark.syllables,
    schwaIndex: benchmark.schwaIndex,
    evaluation,
    feedback,
    vietnameseToneTrap: benchmark.vietnameseToneTrap,
    pedagogicalAdvice: benchmark.pedagogicalAdvice
  };
}

/**
 * Generates Mobile Haptic vibration pattern for Navigator.vibrate (AC 4)
 * Returns array of ms for vibration pulses
 */
export function getHapticPatternForSyllables(syllables) {
  const pattern = [];
  syllables.forEach((s, idx) => {
    if (s.isStress) {
      pattern.push(100); // 100ms strong vibration for primary stress
    } else if (s.isSchwa) {
      pattern.push(15);  // 15ms subtle micro-vibration for schwa
    } else {
      pattern.push(40);  // 40ms medium vibration
    }
    if (idx < syllables.length - 1) {
      pattern.push(120); // 120ms pause between syllables
    }
  });
  return pattern;
}
