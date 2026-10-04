/**
 * PRON-212: Biomechanical Articulatory Comparison Engine
 * Computes geometric deltas between user's mouth snapshot landmarks and gold-standard 2D anatomical models.
 */

export const PHONEME_BENCHMARK_PROFILES = {
  // Dental Fricatives (/θ/, /ð/)
  '/θ/': {
    phoneme: '/θ/',
    name: 'Voiceless Dental Fricative',
    targetApertureMm: 3.5,
    targetWidthHeightRatio: 2.2,
    targetTeethGapMm: 2.8,
    tongueInterdentalRequired: true,
    coronalType: 'dental',
    sampleWord: 'think'
  },
  '/ð/': {
    phoneme: '/ð/',
    name: 'Voiced Dental Fricative',
    targetApertureMm: 3.5,
    targetWidthHeightRatio: 2.2,
    targetTeethGapMm: 2.8,
    tongueInterdentalRequired: true,
    coronalType: 'dental',
    sampleWord: 'this'
  },

  // Postalveolar Fricatives & Rounded Sounds (/ʃ/, /ʒ/, /uː/, /w/)
  '/ʃ/': {
    phoneme: '/ʃ/',
    name: 'Voiceless Postalveolar Fricative',
    targetApertureMm: 6.0,
    targetWidthHeightRatio: 1.25, // puckered circular
    targetTeethGapMm: 2.0,
    tongueInterdentalRequired: false,
    coronalType: 'round',
    sampleWord: 'she'
  },
  '/ʒ/': {
    phoneme: '/ʒ/',
    name: 'Voiced Postalveolar Fricative',
    targetApertureMm: 6.0,
    targetWidthHeightRatio: 1.25,
    targetTeethGapMm: 2.0,
    tongueInterdentalRequired: false,
    coronalType: 'round',
    sampleWord: 'measure'
  },
  '/uː/': {
    phoneme: '/uː/',
    name: 'Close Back Rounded Vowel',
    targetApertureMm: 5.0,
    targetWidthHeightRatio: 1.15,
    targetTeethGapMm: 2.0,
    tongueInterdentalRequired: false,
    coronalType: 'round',
    sampleWord: 'too'
  },
  '/w/': {
    phoneme: '/w/',
    name: 'Voiced Labio-Velar Approximant',
    targetApertureMm: 4.5,
    targetWidthHeightRatio: 1.1,
    targetTeethGapMm: 1.5,
    tongueInterdentalRequired: false,
    coronalType: 'round',
    sampleWord: 'wet'
  },

  // Open Low Vowels (/æ/, /ɑː/, /ʌ/)
  '/æ/': {
    phoneme: '/æ/',
    name: 'Near-Open Front Unrounded Vowel',
    targetApertureMm: 24.0, // wide drop
    targetWidthHeightRatio: 1.75,
    targetTeethGapMm: 14.0,
    tongueInterdentalRequired: false,
    coronalType: 'open',
    sampleWord: 'cat'
  },
  '/ɑː/': {
    phoneme: '/ɑː/',
    name: 'Open Back Unrounded Vowel',
    targetApertureMm: 26.0,
    targetWidthHeightRatio: 1.6,
    targetTeethGapMm: 16.0,
    tongueInterdentalRequired: false,
    coronalType: 'open',
    sampleWord: 'father'
  },

  // Spread High Front Vowels (/iː/, /ɪ/, /e/)
  '/iː/': {
    phoneme: '/iː/',
    name: 'Close Front Unrounded Vowel',
    targetApertureMm: 5.0,
    targetWidthHeightRatio: 3.4, // wide stretched smile
    targetTeethGapMm: 2.0,
    tongueInterdentalRequired: false,
    coronalType: 'spread',
    sampleWord: 'see'
  },
  '/ɪ/': {
    phoneme: '/ɪ/',
    name: 'Near-Close Near-Front Vowel',
    targetApertureMm: 8.0,
    targetWidthHeightRatio: 2.8,
    targetTeethGapMm: 3.5,
    tongueInterdentalRequired: false,
    coronalType: 'spread',
    sampleWord: 'sit'
  },

  // Labiodental Fricatives (/f/, /v/)
  '/f/': {
    phoneme: '/f/',
    name: 'Voiceless Labiodental Fricative',
    targetApertureMm: 4.0,
    targetWidthHeightRatio: 2.4,
    targetTeethGapMm: 1.0,
    tongueInterdentalRequired: false,
    coronalType: 'labiodental',
    sampleWord: 'fall'
  },
  '/v/': {
    phoneme: '/v/',
    name: 'Voiced Labiodental Fricative',
    targetApertureMm: 4.0,
    targetWidthHeightRatio: 2.4,
    targetTeethGapMm: 1.0,
    tongueInterdentalRequired: false,
    coronalType: 'labiodental',
    sampleWord: 'voice'
  },

  // Bilabial Stops (/p/, /b/, /m/)
  '/p/': {
    phoneme: '/p/',
    name: 'Voiceless Bilabial Plosive',
    targetApertureMm: 0.5,
    targetWidthHeightRatio: 2.5,
    targetTeethGapMm: 0.5,
    tongueInterdentalRequired: false,
    coronalType: 'bilabial',
    sampleWord: 'pen'
  },
  '/b/': {
    phoneme: '/b/',
    name: 'Voiced Bilabial Plosive',
    targetApertureMm: 0.5,
    targetWidthHeightRatio: 2.5,
    targetTeethGapMm: 0.5,
    tongueInterdentalRequired: false,
    coronalType: 'bilabial',
    sampleWord: 'bad'
  },
  '/m/': {
    phoneme: '/m/',
    name: 'Voiced Bilabial Nasal',
    targetApertureMm: 0.5,
    targetWidthHeightRatio: 2.5,
    targetTeethGapMm: 0.5,
    tongueInterdentalRequired: false,
    coronalType: 'bilabial',
    sampleWord: 'man'
  }
};

/**
 * Retrieve benchmark metrics for any phoneme with safe fallback
 */
export function getBenchmarkMetrics(phoneme) {
  const clean = phoneme.startsWith('/') ? phoneme : `/${phoneme}/`;
  return (
    PHONEME_BENCHMARK_PROFILES[clean] ||
    PHONEME_BENCHMARK_PROFILES['/θ/'] || {
      phoneme: clean,
      name: 'Neutral Sound',
      targetApertureMm: 10.0,
      targetWidthHeightRatio: 2.2,
      targetTeethGapMm: 4.0,
      tongueInterdentalRequired: false,
      coronalType: 'neutral',
      sampleWord: 'about'
    }
  );
}

/**
 * Evaluate user's mouth snapshot metrics against standard anatomical profile
 * @param {string} phoneme Target IPA symbol
 * @param {object} clientMetrics Extracted geometric features from canvas
 * @returns {object} Evaluation results with deltas, score, status, L1 flags, and advice
 */
export function evaluateMouthSnapshot(phoneme, clientMetrics = {}) {
  const benchmark = getBenchmarkMetrics(phoneme);

  const userAperture = typeof clientMetrics.jawApertureMm === 'number'
    ? clientMetrics.jawApertureMm
    : (clientMetrics.jawAperturePx ? clientMetrics.jawAperturePx * 0.4 : 10.0);

  const userRatio = typeof clientMetrics.lipWidthHeightRatio === 'number'
    ? clientMetrics.lipWidthHeightRatio
    : 2.0;

  const userTeethGap = typeof clientMetrics.teethGapMm === 'number'
    ? clientMetrics.teethGapMm
    : (clientMetrics.teethGapPx ? clientMetrics.teethGapPx * 0.35 : 2.5);

  const userTongueDetected = Boolean(clientMetrics.tongueProtrusionDetected);

  // Compute absolute deltas
  const apertureDeltaMm = Math.round((userAperture - benchmark.targetApertureMm) * 10) / 10;
  const ratioDelta = Math.round(Math.abs(userRatio - benchmark.targetWidthHeightRatio) * 100) / 100;
  const teethDeltaMm = Math.round(Math.abs(userTeethGap - benchmark.targetTeethGapMm) * 10) / 10;

  // Detect L1 Vietnamese articulatory mistakes
  let l1ErrorFlag = null;
  let feedbackText = 'Khẩu hình cơ môi, răng và đầu lưỡi của bạn rất chuẩn xác so với âm mẫu y khoa!';
  let summary = 'Khẩu hình đạt chuẩn y khoa';

  if (benchmark.tongueInterdentalRequired && (!userTongueDetected || userTeethGap < 1.0)) {
    l1ErrorFlag = 'RETRACTED_TONGUE';
    summary = 'Cần thò đầu lưỡi giữa 2 răng';
    feedbackText = 'Bạn chưa thò đầu lưỡi ra ngoài 2-3mm giữa 2 hàm răng. Hãy hé răng và kẹp nhẹ đầu lưỡi để phát âm chuẩn, tránh nói thành âm "thờ" hoặc "t".';
  } else if (benchmark.coronalType === 'round' && userRatio > 1.85) {
    l1ErrorFlag = 'UNPUCKERED_LIPS';
    summary = 'Cần chu tròn môi chữ O';
    feedbackText = `Khóe môi đang bị kéo dẹt (${userRatio.toFixed(1)}). Hãy chu môi tròn nhô ra phía trước để tạo ống cộng hưởng chuẩn cho âm ${benchmark.phoneme}.`;
  } else if (benchmark.coronalType === 'open' && userAperture < benchmark.targetApertureMm - 6.0) {
    l1ErrorFlag = 'INSUFFICIENT_JAW_DROP';
    summary = 'Hàm dưới mở chưa đủ sâu';
    feedbackText = `Hàm mở được ${userAperture.toFixed(1)}mm (chuẩn: ${benchmark.targetApertureMm}mm). Hãy hạ cằm xuống sâu thêm sao cho vừa 2 ngón tay đặt ngang giữa 2 hàm răng.`;
  } else if (benchmark.coronalType === 'spread' && userAperture > benchmark.targetApertureMm + 9.0) {
    l1ErrorFlag = 'EXCESSIVE_JAW_DROP';
    summary = 'Khẩu hình mở quá rộng';
    feedbackText = `Khẩu hình đang mở quá lớn (${userAperture.toFixed(1)}mm). Hãy khép hàm hẹp lại dưới 8mm và kéo dẹt khóe môi sang hai bên như cười mỉm.`;
  }

  // Calculate composite score (0 - 100)
  const apertureScore = Math.max(0, 100 - Math.abs(apertureDeltaMm) * 4.5);
  const ratioScore = Math.max(0, 100 - ratioDelta * 28.0);
  const teethScore = Math.max(0, 100 - teethDeltaMm * 8.0);
  const tonguePenalty = (benchmark.tongueInterdentalRequired && !userTongueDetected) ? 35 : 0;

  const rawScore = (apertureScore * 0.45 + ratioScore * 0.35 + teethScore * 0.2) - tonguePenalty;
  const similarityScore = Math.min(100, Math.max(15, Math.round(rawScore)));

  // Categorize status
  let status = 'NEEDS_ADJUSTMENT';
  if (similarityScore >= 85) {
    status = 'EXCELLENT';
  } else if (similarityScore < 60) {
    status = 'POOR';
  }

  return {
    phoneme: benchmark.phoneme,
    similarityScore,
    status,
    metrics: {
      userApertureMm: Math.round(userAperture * 10) / 10,
      targetApertureMm: benchmark.targetApertureMm,
      apertureDeltaMm,
      userRatio: Math.round(userRatio * 100) / 100,
      targetRatio: benchmark.targetWidthHeightRatio,
      ratioDelta,
      userTeethGapMm: Math.round(userTeethGap * 10) / 10,
      targetTeethGapMm: benchmark.targetTeethGapMm,
      teethDeltaMm,
      interdentalTongueDetected: userTongueDetected,
      tongueRequired: benchmark.tongueInterdentalRequired
    },
    feedback: {
      summary,
      actionAdvice: feedbackText,
      l1ErrorFlag
    }
  };
}
