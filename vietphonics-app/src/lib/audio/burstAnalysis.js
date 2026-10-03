/**
 * Acoustical Burst Energy & Coda Plosive Release Engine (VN-101)
 * Analyzes transient burst energy spike (dE/dt), Zero-Crossing Rate (ZCR),
 * and Vietnamese unreleased stop coda habits.
 */

export const BURST_CRITICAL_WORDS = {
  'Six': {
    targetPhoneme: '/ks/',
    nativeBurstRatio: 0.54,
    userDefaultBurstRatio: 0.14,
    nativeZcr: 0.38,
    userDefaultZcr: 0.08,
    trap: 'Người Việt đọc thành "si" hoặc "sít", nuốt sạch cụm bật /k/ và xì /s/.',
    articulatoryGuidance: 'Khép cuống lưỡi vào ngạc mềm nén luồng hơi lại rồi lập tức xì mạnh thành âm /s/. Không được ngậm miệng cụt âm.'
  },
  'baked': {
    targetPhoneme: '/kt/',
    nativeBurstRatio: 0.48,
    userDefaultBurstRatio: 0.11,
    nativeZcr: 0.32,
    userDefaultZcr: 0.06,
    trap: 'Nuốt đuôi "-ed" phát âm là /t/ sau phụ âm vô thanh /k/.',
    articulatoryGuidance: 'Sau khi phát âm nguyên âm /eɪ/, khép cuống lưỡi tạo /k/ rồi dùng đầu lưỡi bật dứt khoát âm /t/.'
  },
  'contact': {
    targetPhoneme: '/t/',
    nativeBurstRatio: 0.46,
    userDefaultBurstRatio: 0.12,
    nativeZcr: 0.28,
    userDefaultZcr: 0.07,
    trap: 'Đọc thành "con-tắc" ngậm môi ngậm lưỡi lại như tiếng Việt, triệt tiêu toàn bộ dải tần 3kHz - 8kHz.',
    articulatoryGuidance: 'Đầu lưỡi chạm gờ lợi trên chặn hơi, sau đó mở nhẹ ra để luồng khí phụt ra ngoài thành tiếng bật nổ dứt khoát.'
  },
  'breakfast': {
    targetPhoneme: '/st/',
    nativeBurstRatio: 0.52,
    userDefaultBurstRatio: 0.16,
    nativeZcr: 0.42,
    userDefaultZcr: 0.12,
    trap: 'Chỉ xì nhẹ âm /s/ và bỏ rơi hoàn toàn âm /t/ ở cuối từ.',
    articulatoryGuidance: 'Duy trì luồng xì /s/ rồi tức thì khép nhanh đầu lưỡi lên chân răng trên bật dứt khoát âm /t/.'
  },
  'desk': {
    targetPhoneme: '/sk/',
    nativeBurstRatio: 0.50,
    userDefaultBurstRatio: 0.15,
    nativeZcr: 0.36,
    userDefaultZcr: 0.09,
    trap: 'Đọc thành "đét" nuốt mất phụ âm chặn vòm họng /k/.',
    articulatoryGuidance: 'Sau âm xì /s/, nâng cuống lưỡi lên vòm họng ngạc mềm tạo một cú bật nhẹ /k/ trước khi kết thúc.'
  }
};

/**
 * Calculates Zero-Crossing Rate (ZCR) on audio sample buffer
 */
export function calculateZeroCrossingRate(samples) {
  if (!samples || samples.length < 2) return 0;
  let count = 0;
  for (let i = 1; i < samples.length; i++) {
    if ((samples[i] >= 0 && samples[i - 1] < 0) || (samples[i] < 0 && samples[i - 1] >= 0)) {
      count++;
    }
  }
  return Math.round((count / (samples.length - 1)) * 1000) / 1000;
}

/**
 * Calculates transient burst energy ratio in final 50ms of word
 * BurstEnergyRatio = (Energy_last50ms / samples_50ms) / (Energy_vowel / samples_vowel)
 */
export function calculateBurstEnergyRatio(samples, sampleRate = 16000) {
  if (!samples || samples.length < 100) return 0;

  const samples50ms = Math.min(samples.length, Math.floor(sampleRate * 0.05));
  const burstStartIndex = samples.length - samples50ms;

  let burstEnergySum = 0;
  for (let i = burstStartIndex; i < samples.length; i++) {
    burstEnergySum += samples[i] * samples[i];
  }
  const avgBurstEnergy = burstEnergySum / samples50ms;

  // Vowel region (middle 40% of speech token)
  const vowelStart = Math.floor(samples.length * 0.2);
  const vowelEnd = Math.floor(samples.length * 0.6);
  let vowelEnergySum = 0;
  const vowelCount = vowelEnd - vowelStart || 1;
  for (let i = vowelStart; i < vowelEnd; i++) {
    vowelEnergySum += samples[i] * samples[i];
  }
  const avgVowelEnergy = Math.max(1e-6, vowelEnergySum / vowelCount);

  const ratio = avgBurstEnergy / avgVowelEnergy;
  return Math.round(ratio * 100) / 100;
}

/**
 * Evaluates Burst Energy Ratio against the 0.35 threshold (AC 2)
 */
export function evaluateBurstSpike(burstRatio) {
  const isReleased = burstRatio >= 0.35;

  if (isReleased) {
    return {
      isReleased: true,
      status: 'released',
      label: 'Bật hơi chuẩn! (Released Plosive)',
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      textClass: 'text-emerald-700',
      message: `Tỷ lệ xung năng lượng đạt ${burstRatio} (≥ 0.35). Đã tạo được tiếng nổ thoát khí rõ rệt.`
    };
  }

  return {
    isReleased: false,
    status: 'unreleased',
    label: 'Nuốt âm đuôi! (Unreleased Stop Coda)',
    badgeClass: 'bg-rose-100 text-rose-800 border-rose-300 ring-2 ring-rose-400 animate-pulse',
    textClass: 'text-rose-700',
    message: `Tỷ lệ xung năng lượng chỉ đạt ${burstRatio} (< 0.35). Miệng bị khép chặt khiến âm đuôi bị ngậm lại theo thói quen tiếng Việt.`
  };
}

/**
 * Full ending sound burst analysis for a targeted word
 */
export function analyzeEndingSoundBurst(word, userBurstRatio = null) {
  const matched = BURST_CRITICAL_WORDS[word] || BURST_CRITICAL_WORDS['contact'];
  const ratio = userBurstRatio !== null ? userBurstRatio : matched.userDefaultBurstRatio;
  const evaluation = evaluateBurstSpike(ratio);

  return {
    word,
    targetPhoneme: matched.targetPhoneme,
    nativeBurstRatio: matched.nativeBurstRatio,
    nativeZcr: matched.nativeZcr,
    userBurstRatio: ratio,
    userZcr: ratio >= 0.35 ? matched.nativeZcr : matched.userDefaultZcr,
    isReleased: evaluation.isReleased,
    status: evaluation.status,
    statusLabel: evaluation.label,
    badgeClass: evaluation.badgeClass,
    textClass: evaluation.textClass,
    message: evaluation.message,
    trap: matched.trap,
    articulatoryGuidance: matched.articulatoryGuidance
  };
}
