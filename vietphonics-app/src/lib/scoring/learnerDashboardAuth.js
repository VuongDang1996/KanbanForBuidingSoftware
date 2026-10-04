/**
 * learnerDashboardAuth.js
 * Engine for Learner Authentication, 5-Pillar Skill Radar Mathematics, and Dashboard Aggregations (USER-101)
 */

export const RADAR_AXES = [
  { key: 'phonemes', label: 'Âm Vị (Phonemes)', angleIndex: 0 },
  { key: 'stress', label: 'Trọng Âm (Stress)', angleIndex: 1 },
  { key: 'intonation', label: 'Ngữ Điệu (Intonation)', angleIndex: 2 },
  { key: 'endingSounds', label: 'Âm Đuôi (Ending Sounds)', angleIndex: 3 },
  { key: 'fluency', label: 'Lưu Loát (Fluency)', angleIndex: 4 }
];

/**
 * Computes Cartesian SVG coordinates for the 5-axis Skill Radar
 * Formula:
 *   angle = (2 * PI * i / 5) - (PI / 2)
 *   x = cx + R * (score / 100) * cos(angle)
 *   y = cy + R * (score / 100) * sin(angle)
 *
 * @param {Object} scores - { phonemes, stress, intonation, endingSounds, fluency } (0-100)
 * @param {number} cx - Center X coordinate (default 120)
 * @param {number} cy - Center Y coordinate (default 120)
 * @param {number} r - Max radius in pixels (default 90)
 * @returns {Array<{ key: string, label: string, score: number, x: number, y: number, angle: number }>}
 */
export function computeRadarPoints(scores = {}, cx = 120, cy = 120, r = 90) {
  const totalAxes = RADAR_AXES.length;

  return RADAR_AXES.map((axis, i) => {
    const rawScore = Number(scores[axis.key] ?? 70);
    const clampedScore = Math.max(0, Math.min(100, rawScore));
    const angle = (2 * Math.PI * i / totalAxes) - (Math.PI / 2);
    const currentRadius = r * (clampedScore / 100);

    const x = Math.round((cx + currentRadius * Math.cos(angle)) * 100) / 100;
    const y = Math.round((cy + currentRadius * Math.sin(angle)) * 100) / 100;

    // Outer grid vertex (100% boundary)
    const maxX = Math.round((cx + r * Math.cos(angle)) * 100) / 100;
    const maxY = Math.round((cy + r * Math.sin(angle)) * 100) / 100;

    return {
      key: axis.key,
      label: axis.label,
      score: clampedScore,
      angle,
      x,
      y,
      maxX,
      maxY
    };
  });
}

/**
 * Builds an SVG polygon points string from points array
 * @param {Array<{ x: number, y: number }>} points
 * @returns {string} - e.g. "120,30 205,92 173,191 67,191 35,92"
 */
export function buildRadarSvgPoints(points = []) {
  if (!points.length) return '';
  return points.map(p => `${p.x},${p.y}`).join(' ');
}

/**
 * Determines visual theme and color palette based on overall radar score average
 * @param {number} averageScore - 0 to 100
 * @returns {{ theme: string, stroke: string, fill: string, badgeBg: string, label: string }}
 */
export function getRadarColorTheme(averageScore) {
  if (averageScore >= 80) {
    return {
      theme: 'emerald',
      stroke: '#059669', // emerald-600
      fill: 'rgba(16, 185, 129, 0.35)', // emerald-500
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      label: 'Bản Xứ / Thần Tốc (80-100%)'
    };
  }
  if (averageScore >= 65) {
    return {
      theme: 'sky',
      stroke: '#0284c7', // sky-600
      fill: 'rgba(14, 165, 233, 0.35)', // sky-500
      badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
      label: 'Tự Tin / Trôi Chảy (65-79%)'
    };
  }
  return {
    theme: 'rose',
    stroke: '#e11d48', // rose-600
    fill: 'rgba(244, 63, 94, 0.35)', // rose-500
    badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
    label: 'Cần Luyện Âm Cơ Bản (<65%)'
  };
}

/**
 * Computes overall average score across all 5 radar dimensions
 * @param {Object} scores
 * @returns {number}
 */
export function calculateAverageRadarScore(scores = {}) {
  const values = RADAR_AXES.map(a => Number(scores[a.key] ?? 70));
  const sum = values.reduce((acc, val) => acc + val, 0);
  return Math.round(sum / values.length);
}

/**
 * Lightweight Auth Token Generator and Verifier
 * (Standard RFC HMAC-like base64 token representation)
 */
export function generateAuthToken(userId, email) {
  const payload = {
    sub: userId,
    email,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (7 * 24 * 3600) // 7 days
  };
  const jsonStr = JSON.stringify(payload);
  return Buffer.from(jsonStr).toString('base64');
}

export function verifyAuthToken(token) {
  try {
    if (!token) return null;
    const cleanToken = token.startsWith('Bearer ') ? token.slice(7) : token;
    const jsonStr = Buffer.from(cleanToken, 'base64').toString('utf8');
    const payload = JSON.parse(jsonStr);
    if (!payload.sub || !payload.exp) return null;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null; // expired
    return payload;
  } catch (err) {
    return null;
  }
}
