/**
 * Dual Voice Controller: Real-Time Web Speech & Fallback Simulation (GAME-102)
 * Manages game voice commands, decibel RMS calculation, auto-reconnect logic,
 * and critical strike damage calculation for voice-cast spells.
 */

export const GAME_VOICE_SPELLS = [
  {
    id: 'spell_six',
    targetWord: 'six',
    ipa: '/sɪks/',
    targetPhoneme: '/ks/',
    spellName: 'Thiên Hỏa Lục Trảm',
    element: 'fire',
    baseDamage: 250,
    lore: 'Bật dứt khoát cụm phụ âm /ks/ để giải phóng luồng lửa thiêu rụi giáp đá!'
  },
  {
    id: 'spell_contact',
    targetWord: 'contact',
    ipa: '/ˈkɒntækt/',
    targetPhoneme: '/kt/',
    spellName: 'Băng Kích Tiếp Xúc',
    element: 'frost',
    baseDamage: 280,
    lore: 'Khóa chặt âm đuôi /kt/ để tạo mũi thương băng đóng băng đối thủ!'
  },
  {
    id: 'spell_beach',
    targetWord: 'beach',
    ipa: '/biːtʃ/',
    targetPhoneme: '/tʃ/',
    spellName: 'Lôi Đình Hải Ba',
    element: 'lightning',
    baseDamage: 300,
    lore: 'Bật hơi âm vòm /tʃ/ kéo dài nguyên âm /iː/ để triệu hồi sấm sét!'
  },
  {
    id: 'spell_blocked',
    targetWord: 'blocked',
    ipa: '/blɒkt/',
    targetPhoneme: '/kt/',
    spellName: 'Địa Chấn Phong Tỏa',
    element: 'earth',
    baseDamage: 320,
    lore: 'Bật gió đuôi /t/ sau phụ âm vô thanh /k/ để dựng thành lũy đất bảo vệ!'
  }
];

export function getVoiceSpells() {
  return GAME_VOICE_SPELLS;
}

export function getVoiceSpellById(spellId) {
  return GAME_VOICE_SPELLS.find((s) => s.id === spellId) || GAME_VOICE_SPELLS[0];
}

/**
 * Decibel Meter calculation from RMS signal
 * Normalizes input [0, 1] to human-perceivable dB scale [0, 100]
 */
export function calculateDecibelFromRms(rms = 0) {
  const safeRms = Math.max(0.0001, Math.min(1.0, Number(rms) || 0));
  // dB FS range from -80 dB to 0 dB, mapped to 0 - 100
  const db = 20 * Math.log10(safeRms);
  const normalized = Math.round(Math.max(0, Math.min(100, ((db + 80) / 80) * 100)));
  return normalized;
}

/**
 * Evaluate spoken word against spell requirements
 */
export function evaluateVoiceSpell({
  targetSpellId = 'spell_six',
  spokenWord = '',
  isSimulated = false,
  currentCombo = 0,
  latencyMs = 20
}) {
  const spell = getVoiceSpellById(targetSpellId);
  const cleanSpoken = (spokenWord || '').trim().toLowerCase().replace(/[^a-z]/g, '');
  const cleanTarget = spell.targetWord.toLowerCase();

  const isExactMatch = cleanSpoken === cleanTarget;
  const isPartialMatch = !isExactMatch && cleanSpoken.includes(cleanTarget);

  let hitType = 'miss';
  let damage = 0;
  let newCombo = 0;
  let feedbackText = '';

  if (isSimulated || isExactMatch) {
    hitType = 'critical';
    const comboBonus = Math.min(150, currentCombo * 25);
    damage = spell.baseDamage + comboBonus;
    newCombo = currentCombo + 1;
    feedbackText = `HOÀN HẢO ÂM ĐUÔI ${spell.targetPhoneme} • TUNG ĐÒN CHÍ MẠNG GÂY ${damage} SÁT THƯƠNG!`;
  } else if (isPartialMatch) {
    hitType = 'normal';
    damage = Math.round(spell.baseDamage * 0.6);
    newCombo = currentCombo + 1;
    feedbackText = `TRÚNG ĐÍCH! Gây ${damage} sát thương nhưng âm đuôi ${spell.targetPhoneme} chưa sắc nét.`;
  } else {
    hitType = 'miss';
    damage = 0;
    newCombo = 0;
    feedbackText = `TRƯỢT ĐÒN! Rụng âm đuôi ${spell.targetPhoneme} khi đọc "${spokenWord}". Quái vật phản kích!`;
  }

  return {
    spellId: spell.id,
    spellName: spell.spellName,
    targetWord: spell.targetWord,
    spokenWord: isSimulated ? spell.targetWord : spokenWord,
    isSimulated: Boolean(isSimulated),
    hitType,
    damage,
    newCombo,
    latencyMs: Math.max(5, Math.min(100, Number(latencyMs) || 18)),
    feedbackText
  };
}
