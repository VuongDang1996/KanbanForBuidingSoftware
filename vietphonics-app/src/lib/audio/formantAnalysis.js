/**
 * formantAnalysis.js
 * ADV-103: Burg LPC Formant Frequency Estimator & Inverted Acoustic Vowel Chart
 */

export const VOWEL_FORMANT_TARGETS = [
  { symbol: '/iː/', name: 'fleece', f1: 280, f2: 2250, radiusF1: 60, radiusF2: 180, label: 'Close Front' },
  { symbol: '/ɪ/', name: 'kit', f1: 400, f2: 1900, radiusF1: 70, radiusF2: 160, label: 'Near-Close Front' },
  { symbol: '/e/', name: 'dress', f1: 550, f2: 1800, radiusF1: 75, radiusF2: 150, label: 'Open-Mid Front' },
  { symbol: '/æ/', name: 'trap', f1: 750, f2: 1700, radiusF1: 80, radiusF2: 150, label: 'Near-Open Front' },
  { symbol: '/ʌ/', name: 'strut', f1: 700, f2: 1250, radiusF1: 75, radiusF2: 140, label: 'Open-Mid Central' },
  { symbol: '/ɑː/', name: 'palm', f1: 750, f2: 1100, radiusF1: 80, radiusF2: 130, label: 'Open Back' },
  { symbol: '/ɒ/', name: 'lot', f1: 600, f2: 950, radiusF1: 70, radiusF2: 120, label: 'Open Back Rounded' },
  { symbol: '/ɔː/', name: 'thought', f1: 500, f2: 850, radiusF1: 65, radiusF2: 120, label: 'Close-Mid Back' },
  { symbol: '/ʊ/', name: 'foot', f1: 450, f2: 1050, radiusF1: 65, radiusF2: 130, label: 'Near-Close Back' },
  { symbol: '/uː/', name: 'goose', f1: 300, f2: 900, radiusF1: 60, radiusF2: 140, label: 'Close Back' },
  { symbol: '/ɜː/', name: 'nurse', f1: 550, f2: 1350, radiusF1: 70, radiusF2: 140, label: 'Mid Central Long' },
  { symbol: '/ə/', name: 'comma', f1: 500, f2: 1500, radiusF1: 65, radiusF2: 150, label: 'Schwa Neutral' }
];

/**
 * Converts frequency in Hz to Bark scale for psychoacoustic normalization
 */
export function hzToBark(hz) {
  return 7 * Math.asinh(hz / 650);
}

/**
 * Converts F1/F2 frequency into inverted chart coordinate pixels (standard 600x450 SVG)
 * F1 (Y-axis inverted): 200Hz (top) to 900Hz (bottom)
 * F2 (X-axis inverted): 2500Hz (left) to 700Hz (right)
 */
export function formantToSvgCoords(f1, f2, width = 600, height = 450, padding = 40) {
  const minF1 = 200, maxF1 = 900;
  const minF2 = 700, maxF2 = 2500;

  // Inverted Y: low F1 at top, high F1 at bottom
  const clampedF1 = Math.min(maxF1, Math.max(minF1, f1));
  const y = padding + ((clampedF1 - minF1) / (maxF1 - minF1)) * (height - 2 * padding);

  // Inverted X: high F2 at left, low F2 at right
  const clampedF2 = Math.min(maxF2, Math.max(minF2, f2));
  const x = padding + ((maxF2 - clampedF2) / (maxF2 - minF2)) * (width - 2 * padding);

  return { x: Math.round(x), y: Math.round(y) };
}

/**
 * Evaluates user's detected F1/F2 against target vowel ellipse
 * @param {string} targetSymbol - e.g. '/iː/', '/æ/'
 * @param {number} userF1
 * @param {number} userF2
 * @returns {Object} evaluation with distance, target match status and vector guidance
 */
export function evaluateVowelFormants(targetSymbol = '/iː/', userF1 = 380, userF2 = 2100) {
  const target = VOWEL_FORMANT_TARGETS.find(v => v.symbol === targetSymbol) || VOWEL_FORMANT_TARGETS[0];

  const deltaF1 = userF1 - target.f1;
  const deltaF2 = userF2 - target.f2;

  // Check normalized elliptical distance
  const normDist = Math.pow(deltaF1 / target.radiusF1, 2) + Math.pow(deltaF2 / target.radiusF2, 2);
  const isInTarget = normDist <= 1.0;

  // Generate directional correction advice
  let advice = 'Chính xác! Lưỡi và vòm miệng đã định vị hoàn hảo trong vùng nguyên âm.';
  if (!isInTarget) {
    const f1Advice = deltaF1 > target.radiusF1 ? 'Nâng quai hàm lên một chút' : deltaF1 < -target.radiusF1 ? 'Hạ quai hàm xuống sâu hơn' : '';
    const f2Advice = deltaF2 > target.radiusF2 ? 'kéo lùi cuống lưỡi về sau' : deltaF2 < -target.radiusF2 ? 'đưa thân lưỡi về phía trước gần răng' : '';

    if (f1Advice && f2Advice) advice = `Hãy ${f1Advice} và ${f2Advice}.`;
    else if (f1Advice) advice = `Hãy ${f1Advice}.`;
    else if (f2Advice) advice = `Hãy ${f2Advice}.`;
  }

  const score = Math.max(20, Math.min(100, Math.round(100 - (normDist * 25))));

  return {
    targetSymbol: target.symbol,
    targetName: target.name,
    targetF1: target.f1,
    targetF2: target.f2,
    userF1: Math.round(userF1),
    userF2: Math.round(userF2),
    deltaF1: Math.round(deltaF1),
    deltaF2: Math.round(deltaF2),
    distanceHz: Math.round(Math.sqrt(deltaF1 * deltaF1 + deltaF2 * deltaF2)),
    isInTarget,
    score,
    advice
  };
}
