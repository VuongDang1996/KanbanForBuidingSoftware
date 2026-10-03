/**
 * ELSA-103: Non-Linear Mapping from Phonetic & Acoustic Metrics to IELTS Speaking Band & CEFR
 * Based on Cambridge English Language Assessment & IELTS Speaking Band Descriptors (Public version).
 */

export const CAMBRIDGE_BENCHMARKS = [
  { minScore: 92, band: 8.5, cefr: 'C2', label: 'Expert User' },
  { minScore: 84, band: 7.5, cefr: 'C1', label: 'Good User' },
  { minScore: 74, band: 6.5, cefr: 'B2', label: 'Competent User' },
  { minScore: 62, band: 5.5, cefr: 'B1', label: 'Modest User' },
  { minScore: 50, band: 4.5, cefr: 'A2', label: 'Limited User' },
  { minScore: 0,  band: 3.5, cefr: 'A1', label: 'Extremely Limited' }
];

/**
 * Calculates IELTS Speaking Band and CEFR level from acoustic diagnostic scores
 * @param {number} pronunciationAcc - 0..100 (GOP phonetic accuracy)
 * @param {number} fluencyWpm - Words per minute (target 130..150 WPM)
 * @param {number} intonationScore - 0..100 (Pitch cadence & stress)
 * @param {number} lexicalGrammarEstimate - 0..100 (Vocabulary & sentence complexity estimate)
 */
export function calculateIeltsBand({
  pronunciationAcc = 76,
  fluencyWpm = 135,
  intonationScore = 70,
  lexicalGrammarEstimate = 74
} = {}) {
  // Fluency score normalized around 140 WPM standard
  const fluencyScore = Math.min(Math.round((fluencyWpm / 140) * 92), 100);

  // 4 Criteria Breakdown (0..9.0 scale)
  const prBand = mapScoreToBand(pronunciationAcc * 0.7 + intonationScore * 0.3);
  const fcBand = mapScoreToBand(fluencyScore * 0.65 + intonationScore * 0.35);
  const lrBand = mapScoreToBand(lexicalGrammarEstimate * 0.8 + pronunciationAcc * 0.2);
  const graBand = mapScoreToBand(lexicalGrammarEstimate * 0.85 + fluencyScore * 0.15);

  // Overall IELTS Speaking Band is the arithmetic mean of 4 criteria rounded to nearest 0.5
  const rawMean = (prBand + fcBand + lrBand + graBand) / 4;
  const overallBand = roundToIeltsBand(rawMean);

  // Map to CEFR
  let cefr = 'B2';
  if (overallBand >= 8.5) cefr = 'C2';
  else if (overallBand >= 7.0) cefr = 'C1';
  else if (overallBand >= 5.5) cefr = 'B2';
  else if (overallBand >= 4.5) cefr = 'B1';
  else cefr = 'A2';

  return {
    overallBand,
    cefr,
    compositeGop: Math.round(pronunciationAcc * 0.45 + intonationScore * 0.25 + fluencyScore * 0.3),
    criteria: {
      pronunciation: { name: 'Pronunciation (PR)', band: prBand, score: Math.round(pronunciationAcc) },
      fluency: { name: 'Fluency & Coherence (FC)', band: fcBand, score: Math.round(fluencyScore) },
      lexical: { name: 'Lexical Resource (LR)', band: lrBand, score: Math.round(lexicalGrammarEstimate) },
      grammar: { name: 'Grammatical Range (GRA)', band: graBand, score: Math.round(lexicalGrammarEstimate) }
    },
    disclaimer: 'Bảng ước tính điểm số dựa trên phân tích âm học và nhịp điệu (WPM), chỉ mang tính chất tham khảo cho quá trình tự học và không thay thế chứng chỉ khảo thí chính thức của Cambridge, IDP Education hoặc British Council.'
  };
}

function mapScoreToBand(score) {
  if (score >= 90) return 8.5;
  if (score >= 84) return 8.0;
  if (score >= 76) return 7.5;
  if (score >= 68) return 7.0;
  if (score >= 60) return 6.5;
  if (score >= 52) return 6.0;
  if (score >= 44) return 5.5;
  if (score >= 36) return 5.0;
  if (score >= 28) return 4.5;
  return 4.0;
}

function roundToIeltsBand(score) {
  const floor = Math.floor(score);
  const remainder = score - floor;
  if (remainder < 0.25) return floor;
  if (remainder < 0.75) return floor + 0.5;
  return floor + 1.0;
}

/**
 * Computes the target gap recommendation (AC 3)
 */
export function computeTargetGap(currentBand, targetBand = 7.5, criteria = {}) {
  const gap = Number((targetBand - currentBand).toFixed(1));
  if (gap <= 0) {
    return {
      gap: 0,
      achieved: true,
      recommendation: `Chúc mừng! Bạn đã chạm hoặc vượt mốc mục tiêu ${targetBand} Band. Hãy tiếp tục duy trì phong độ và độ tự nhiên trong hội thoại.`
    };
  }

  // Find lowest criteria
  const pr = criteria.pronunciation?.band || 6.5;
  const fc = criteria.fluency?.band || 6.5;

  let keyFocus = 'Pronunciation';
  let advice = `Bạn cần cải thiện +${gap} Band ở tiêu chí Pronunciation (đặc biệt là âm đuôi /ks/, /t/, /d/ và ngữ điệu câu hỏi) để chạm mốc mục tiêu ${targetBand}.`;
  
  if (fc < pr) {
    keyFocus = 'Fluency & Coherence';
    advice = `Bạn cần cải thiện +${gap} Band ở tiêu chí Fluency (tăng tốc độ đọc lên 135-145 WPM và giảm ngắt nghỉ đột ngột) để chạm mốc mục tiêu ${targetBand}.`;
  }

  return {
    gap,
    achieved: false,
    keyFocus,
    recommendation: advice
  };
}
