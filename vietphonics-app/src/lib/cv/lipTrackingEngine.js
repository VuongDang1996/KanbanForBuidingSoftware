/**
 * lipTrackingEngine.js
 * ADV-102: MediaPipe Lip Mesh Telemetry & Articulatory Jaw Geometry Evaluator
 */

export const PHONEME_LIP_TARGETS = {
  ae: {
    phoneme: '/æ/',
    name: 'Near-Open Front Unrounded Vowel',
    word: 'fantastic',
    focusMetric: 'jawOpening',
    targetMin: 75,
    targetMax: 95,
    l1Warning: 'Hạ hàm dưới sâu hơn 15mm! Miệng mở rộng gấp đôi như khi ngáp thay vì đọc thành âm /e/ phẳng.'
  },
  u: {
    phoneme: '/uː/',
    name: 'Close Back Rounded Vowel',
    word: 'food',
    focusMetric: 'lipRounding',
    targetMin: 80,
    targetMax: 100,
    l1Warning: 'Chu môi tròn về phía trước như thổi sáo! Tránh thói quen người Việt mở bè mép đọc thành "phút".'
  },
  i: {
    phoneme: '/iː/',
    name: 'Close Front Unrounded Vowel',
    word: 'cheese',
    focusMetric: 'cornerRetraction',
    targetMin: 75,
    targetMax: 95,
    l1Warning: 'Kéo căng hai khóe miệng sang hai bên như cười mỉm! Đừng thả lỏng môi giống âm /ɪ/ ngắn.'
  },
  theta: {
    phoneme: '/θ/',
    name: 'Voiceless Interdental Fricative',
    word: 'think',
    focusMetric: 'jawOpening',
    targetMin: 40,
    targetMax: 60,
    l1Warning: 'Đặt đầu lưỡi thò ra giữa 2 hàm răng 2-3mm! Không rụt lưỡi vào trong tạo thành âm tắc /t/.'
  }
};

/**
 * Calculates 2D Euclidean Distance between two landmark coordinates
 */
export function calculateEuclideanDistance(p1, p2) {
  if (!p1 || !p2) return 0;
  const dx = (p1.x || 0) - (p2.x || 0);
  const dy = (p1.y || 0) - (p2.y || 0);
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Evaluates Lip Telemetry metrics from MediaPipe landmarks
 * @param {Array<Object>} landmarks - 468 landmark points {x, y, z}
 * @returns {Object} { jawOpening, lipSpread, lipRounding }
 */
export function evaluateLipLandmarks(landmarks) {
  if (!landmarks || landmarks.length < 300) {
    // Default baseline if landmarks are empty
    return { jawOpening: 50, lipSpread: 50, lipRounding: 50 };
  }

  // MediaPipe lip keypoints:
  // Upper lip center: 13, Lower lip center: 14
  // Mouth left corner: 61, Mouth right corner: 291
  const upperLip = landmarks[13];
  const lowerLip = landmarks[14];
  const leftCorner = landmarks[61];
  const rightCorner = landmarks[291];

  const verticalDist = calculateEuclideanDistance(upperLip, lowerLip);
  const horizontalDist = calculateEuclideanDistance(leftCorner, rightCorner);

  // Normalize distances to 0-100 scale based on standard facial ratios
  const jawOpening = Math.min(100, Math.max(0, Math.round(verticalDist * 320)));
  const lipSpread = Math.min(100, Math.max(0, Math.round(horizontalDist * 220)));
  const lipRounding = Math.min(100, Math.max(0, Math.round(100 - (horizontalDist * 160) + (verticalDist * 80))));

  return { jawOpening, lipSpread, lipRounding };
}

/**
 * Validates whether user lip geometry hits the Target Zone for a target phoneme
 * @param {string} phonemeKey - 'ae', 'u', 'i', 'theta'
 * @param {Object} telemetry - { jawOpening, lipSpread, lipRounding }
 * @returns {Object} { isTargetMet, currentMetric, score, advice }
 */
export function evaluatePhonemeLipTarget(phonemeKey = 'ae', telemetry = { jawOpening: 60, lipSpread: 50, lipRounding: 50 }) {
  const target = PHONEME_LIP_TARGETS[phonemeKey] || PHONEME_LIP_TARGETS.ae;
  let metricValue = 0;

  if (target.focusMetric === 'jawOpening') metricValue = telemetry.jawOpening;
  else if (target.focusMetric === 'lipRounding') metricValue = telemetry.lipRounding;
  else if (target.focusMetric === 'cornerRetraction') metricValue = telemetry.lipSpread;

  const isTargetMet = metricValue >= target.targetMin && metricValue <= target.targetMax;
  let score = 100;

  if (!isTargetMet) {
    const diff = metricValue < target.targetMin ? target.targetMin - metricValue : metricValue - target.targetMax;
    score = Math.max(40, 100 - diff * 2);
  }

  return {
    phoneme: target.phoneme,
    focusMetric: target.focusMetric,
    metricValue,
    targetRange: [target.targetMin, target.targetMax],
    isTargetMet,
    score: Math.round(score),
    advice: isTargetMet ? 'Khẩu hình chuẩn xác! Cơ môi và quai hàm đã vào đúng Target Zone.' : target.l1Warning
  };
}
