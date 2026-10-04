/**
 * Automated Error Bank with Spaced Repetition (SuperMemo-2 Algorithm) Engine (ELSA-402)
 * Mathematical calculation of interval and easiness factor (EF) based on learner recall quality.
 *
 * Formula:
 * EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
 * Bound: EF' >= 1.3
 * Interval I:
 *   - if repetitions == 1 => 1 day
 *   - if repetitions == 2 => (q === 5 ? 6 : q === 4 ? 3 : 1)
 *   - if repetitions > 2  => Math.round(prevInterval * EF')
 *
 * Graduation:
 *   - if repetitions >= 3 && lastScore >= 85 => Mastered (Award +50 XP/Points)
 */

export const INITIAL_ERROR_CARDS = [
  {
    id: 'err-comfortable',
    word: 'comfortable',
    ipa: '/ˈkʌmftəbl/',
    phonemeError: 'Bỏ quên trọng âm dồn /kʌmf/ & đọc dư 4 âm tiết',
    pastUserAudio: 'com-pho-tay-bồ',
    nativePhonetics: 'CƠM-tơ-bồ (3 âm tiết)',
    muscleTip: 'Thả lỏng cơ hàm dưới, bỏ hẳn âm "for", chỉ đọc 3 nhịp: /ˈkʌmf/ - /tə/ - /bl/.',
    easinessFactor: 2.5,
    intervalDays: 1,
    repetitions: 0,
    consecutiveHighScores: 0,
    lastScore: 54,
    status: 'due', // 'due' | 'learning' | 'mastered'
    category: 'swallow'
  },
  {
    id: 'err-clothes',
    word: 'clothes',
    ipa: '/kloʊðz/',
    phonemeError: 'Rụng cụm phụ âm đuôi /-ðz/ thành cờ-lâu-thịt',
    pastUserAudio: 'cloh-thit',
    nativePhonetics: 'kloʊðz (1 âm tiết duy nhất)',
    muscleTip: 'Kẹp nhẹ đầu lưỡi giữa hai hàm răng cho âm /ð/ rồi trượt tức thời sang âm rung /z/.',
    easinessFactor: 2.5,
    intervalDays: 1,
    repetitions: 0,
    consecutiveHighScores: 0,
    lastScore: 48,
    status: 'due',
    category: 'ending'
  },
  {
    id: 'err-specific',
    word: 'specific',
    ipa: '/spəˈsɪfɪk/',
    phonemeError: 'Sai trọng âm & thiếu âm chặn vô thanh /k/',
    pastUserAudio: 'spe-ci-phi',
    nativePhonetics: 'spə-SÍ-fik',
    muscleTip: 'Trọng âm rơi vào âm tiết thứ hai /ˈsɪf/, hạ thấp âm đầu và bật sắc gọn âm đuôi /k/.',
    easinessFactor: 2.5,
    intervalDays: 1,
    repetitions: 0,
    consecutiveHighScores: 0,
    lastScore: 58,
    status: 'due',
    category: 'flat'
  }
];

export function getInitialCards() {
  return INITIAL_ERROR_CARDS;
}

/**
 * Calculate next SM-2 interval and easiness factor
 * @param {Object} params
 * @param {number} params.quality - Rating q: 3 (Hard, 1d), 4 (Good, 3d), 5 (Easy, 7d)
 * @param {number} params.currentEF - Current Easiness Factor (default 2.5, min 1.3)
 * @param {number} params.currentInterval - Current interval days
 * @param {number} params.repetitions - Number of successful reviews
 * @param {number} params.score - Pronunciation score achieved (0-100)
 * @param {number} params.consecutiveHighScores - Count of consecutive scores >= 85
 */
export function calculateSM2({
  quality = 4,
  currentEF = 2.5,
  currentInterval = 1,
  repetitions = 0,
  score = 80,
  consecutiveHighScores = 0
}) {
  const q = Math.max(0, Math.min(5, Number(quality) || 4));
  const safeEF = Math.max(1.3, Number(currentEF) || 2.5);

  // New EF formula: EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  let newEF = safeEF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  newEF = Math.max(1.3, Math.round(newEF * 100) / 100);

  let newInterval;
  let newRepetitions = repetitions;

  if (q < 3) {
    // Failure / restart
    newRepetitions = 0;
    newInterval = 1;
  } else {
    newRepetitions += 1;
    if (newRepetitions === 1) {
      newInterval = q === 5 ? 7 : q === 4 ? 3 : 1;
    } else if (newRepetitions === 2) {
      newInterval = q === 5 ? 14 : q === 4 ? 6 : 2;
    } else {
      newInterval = Math.round(currentInterval * newEF);
    }
  }

  // High score tracking & Graduation (AC 4)
  const isHighScore = score >= 85;
  const newConsecutive = isHighScore ? consecutiveHighScores + 1 : 0;
  const isMastered = newConsecutive >= 3;

  return {
    easinessFactor: newEF,
    intervalDays: newInterval,
    repetitions: newRepetitions,
    consecutiveHighScores: newConsecutive,
    isMastered,
    pointsAwarded: isMastered ? 50 : 10,
    nextReviewDate: new Date(Date.now() + newInterval * 24 * 60 * 60 * 1000).toISOString()
  };
}
