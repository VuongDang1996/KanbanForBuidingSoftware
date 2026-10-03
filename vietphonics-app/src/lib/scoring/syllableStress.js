/**
 * Syllable Stress & Word Emphasis Evaluation Engine (ELSA-202)
 * Features Three Pillars calculation (Duration, Volume, Pitch)
 * and Vietnamese L1 "Dấu Sắc" tone trap detection.
 */

export const SYLLABLE_STRESS_WORDS = {
  'photography': {
    word: 'photography',
    ipa: '/fəˈtɑːɡrəfi/',
    primaryStressIndex: 1, // 'TO'
    syllables: [
      { text: 'pho', ipa: '/fə/', isStressed: false, durationMs: 110, volumeDb: 62, pitchHz: 140 },
      { text: 'TO', ipa: '/ˈtɑː/', isStressed: true, durationMs: 275, volumeDb: 68, pitchHz: 182 },
      { text: 'gra', ipa: '/ɡrə/', isStressed: false, durationMs: 105, volumeDb: 61, pitchHz: 142 },
      { text: 'phy', ipa: '/fi/', isStressed: false, durationMs: 120, volumeDb: 62, pitchHz: 138 }
    ],
    threePillarsBenchmark: {
      durationRatio: 2.4, // 275ms vs ~112ms avg
      volumeDeltaDb: 6.2, // 68dB vs ~61.8dB avg
      pitchDeltaHz: 42   // 182Hz vs ~140Hz avg
    },
    contrastWord: 'photograph'
  },
  'photograph': {
    word: 'photograph',
    ipa: '/ˈfoʊtəɡræf/',
    primaryStressIndex: 0, // 'PHO'
    syllables: [
      { text: 'PHO', ipa: '/ˈfoʊ/', isStressed: true, durationMs: 260, volumeDb: 67, pitchHz: 178 },
      { text: 'to', ipa: '/tə/', isStressed: false, durationMs: 100, volumeDb: 60, pitchHz: 138 },
      { text: 'graph', ipa: '/ɡræf/', isStressed: false, durationMs: 130, volumeDb: 62, pitchHz: 140 }
    ],
    threePillarsBenchmark: {
      durationRatio: 2.3,
      volumeDeltaDb: 6.0,
      pitchDeltaHz: 39
    },
    contrastWord: 'photography'
  },
  'computer': {
    word: 'computer',
    ipa: '/kəmˈpjuːtər/',
    primaryStressIndex: 1, // 'PU'
    syllables: [
      { text: 'com', ipa: '/kəm/', isStressed: false, durationMs: 115, volumeDb: 61, pitchHz: 142 },
      { text: 'PU', ipa: '/ˈpjuː/', isStressed: true, durationMs: 280, volumeDb: 69, pitchHz: 185 },
      { text: 'ter', ipa: '/tər/', isStressed: false, durationMs: 125, volumeDb: 62, pitchHz: 140 }
    ],
    threePillarsBenchmark: {
      durationRatio: 2.3,
      volumeDeltaDb: 7.5,
      pitchDeltaHz: 44
    }
  },
  'banana': {
    word: 'banana',
    ipa: '/bəˈnænə/',
    primaryStressIndex: 1, // 'NA'
    syllables: [
      { text: 'ba', ipa: '/bə/', isStressed: false, durationMs: 105, volumeDb: 60, pitchHz: 138 },
      { text: 'NA', ipa: '/ˈnæ/', isStressed: true, durationMs: 270, volumeDb: 68, pitchHz: 180 },
      { text: 'na', ipa: '/nə/', isStressed: false, durationMs: 115, volumeDb: 61, pitchHz: 139 }
    ],
    threePillarsBenchmark: {
      durationRatio: 2.5,
      volumeDeltaDb: 7.5,
      pitchDeltaHz: 41
    }
  },
  'record (noun)': {
    word: 'record (noun)',
    ipa: '/ˈrekərd/',
    primaryStressIndex: 0, // 'RE'
    syllables: [
      { text: 'RE', ipa: '/ˈre/', isStressed: true, durationMs: 250, volumeDb: 68, pitchHz: 176 },
      { text: 'cord', ipa: '/kərd/', isStressed: false, durationMs: 135, volumeDb: 61, pitchHz: 140 }
    ],
    threePillarsBenchmark: {
      durationRatio: 1.85,
      volumeDeltaDb: 7.0,
      pitchDeltaHz: 36
    },
    contrastWord: 'record (verb)'
  },
  'record (verb)': {
    word: 'record (verb)',
    ipa: '/rɪˈkɔːrd/',
    primaryStressIndex: 1, // 'CORD'
    syllables: [
      { text: 're', ipa: '/rɪ/', isStressed: false, durationMs: 110, volumeDb: 60, pitchHz: 139 },
      { text: 'CORD', ipa: '/ˈkɔːrd/', isStressed: true, durationMs: 290, volumeDb: 69, pitchHz: 184 }
    ],
    threePillarsBenchmark: {
      durationRatio: 2.6,
      volumeDeltaDb: 9.0,
      pitchDeltaHz: 45
    },
    contrastWord: 'record (noun)'
  }
};

/**
 * Evaluates syllable stress performance against Three Pillars benchmarks
 */
export function evaluateSyllableStress({
  word = 'photography',
  userStressIndex = 1,
  userStressedDurationMs = 275,
  userStressedPitchHz = 182,
  userStressedVolumeDb = 68
}) {
  const matched = SYLLABLE_STRESS_WORDS[word] || SYLLABLE_STRESS_WORDS['photography'];
  const isCorrect = userStressIndex === matched.primaryStressIndex;

  // Compute unstressed baseline
  const unstressed = matched.syllables.filter((_, idx) => idx !== matched.primaryStressIndex);
  const avgUnstressedDuration = unstressed.reduce((sum, s) => sum + s.durationMs, 0) / (unstressed.length || 1);
  const avgUnstressedPitch = unstressed.reduce((sum, s) => sum + s.pitchHz, 0) / (unstressed.length || 1);
  const avgUnstressedVolume = unstressed.reduce((sum, s) => sum + s.volumeDb, 0) / (unstressed.length || 1);

  const durationRatio = Math.round((userStressedDurationMs / avgUnstressedDuration) * 10) / 10;
  const pitchDeltaHz = Math.round(userStressedPitchHz - avgUnstressedPitch);
  const volumeDeltaDb = Math.round((userStressedVolumeDb - avgUnstressedVolume) * 10) / 10;

  // Vietnamese L1 Tone Warning (Dấu Sắc Trap):
  // High pitch jump (>= 30Hz) but too short duration (< 130ms)
  const l1ToneTrap = pitchDeltaHz >= 30 && userStressedDurationMs < 130;

  let score = 92;
  let status = 'mastered';
  let statusLabel = 'Đạt chuẩn trọng âm!';

  if (!isCorrect) {
    score = 42;
    status = 'wrong_syllable';
    statusLabel = 'Sai vị trí trọng âm';
  } else if (l1ToneTrap) {
    score = 58;
    status = 'l1_tone_trap';
    statusLabel = 'Mắc bẫy đánh dấu sắc tiếng Việt';
  } else if (durationRatio < 1.7) {
    score = 72;
    status = 'acceptable';
    statusLabel = 'Trọng âm chưa đủ dài';
  }

  return {
    word: matched.word,
    ipa: matched.ipa,
    primaryStressIndex: matched.primaryStressIndex,
    targetSyllable: matched.syllables[matched.primaryStressIndex].text,
    syllables: matched.syllables,
    userStressIndex,
    isCorrect,
    l1ToneTrap,
    score,
    status,
    statusLabel,
    threePillars: {
      durationRatio,
      volumeDeltaDb,
      pitchDeltaHz,
      targetDurationRatio: matched.threePillarsBenchmark.durationRatio,
      targetVolumeDeltaDb: matched.threePillarsBenchmark.volumeDeltaDb,
      targetPitchDeltaHz: matched.threePillarsBenchmark.pitchDeltaHz
    },
    pedagogicalAdvice: l1ToneTrap
      ? 'Bạn đang thêm dấu sắc tiếng Việt! Trọng âm tiếng Anh cần phải ngân dài và mở to miệng (To - Dài - Cao), không chỉ đơn thuần là đẩy cao giọng.'
      : (isCorrect
        ? 'Xuất sắc! Bạn đã thể hiện trọn vẹn 3 trụ cột: Ngân dài hơn gấp đôi, to hơn và cao hơn.'
        : `Từ này nhấn vào âm tiết thứ ${matched.primaryStressIndex + 1} ("${matched.syllables[matched.primaryStressIndex].text}").`)
  };
}
