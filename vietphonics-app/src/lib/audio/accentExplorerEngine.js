/**
 * Accent Explorer Engine (ADV-108)
 * Compares General American (US), British RP (UK), and Australian (AU) English.
 * Computes dialect proximity percentage and guides dialect-specific phonemic transitions.
 */

export const TARGET_DIALECTS = [
  {
    code: 'us',
    hotkey: '1',
    name: 'General American',
    nativeName: 'Mỹ Chuẩn (US)',
    flag: '🇺🇸',
    color: 'sky',
    features: [
      'Rhotic R: Phát âm âm /r/ rõ nét ở mọi vị trí (car /kɑːr/, bird /bɜːrd/)',
      'Flap T: Âm /t/ giữa hai nguyên âm biến thành /ɾ/ lướt nhẹ (water -> wa-der)',
      'Flat A: Nguyên âm /æ/ bẹt rộng trong các từ bath, dance, ask',
      'Unrounded Lot: Nguyên âm /ɑː/ mở không tròn môi (father = bother)'
    ]
  },
  {
    code: 'uk',
    hotkey: '2',
    name: 'British RP (Received Pronunciation)',
    nativeName: 'Anh Chuẩn (RP)',
    flag: '🇬🇧',
    color: 'rose',
    features: [
      'Non-Rhotic: Không phát âm /r/ sau nguyên âm trừ khi nối từ (car -> /kɑː/)',
      'True Aspirated T: Bật hơi /t/ đanh và dứt khoát, hoặc glottal stop /ʔ/',
      'Broad A: Nguyên âm /ɑː/ sâu cuống họng trong bath, dance, fast',
      'Rounded Lot: Nguyên âm /ɒ/ ngắn và tròn môi rõ rệt'
    ]
  },
  {
    code: 'au',
    hotkey: '3',
    name: 'Australian English',
    nativeName: 'Úc Chuẩn (Aus)',
    flag: '🇦🇺',
    color: 'amber',
    features: [
      'Non-Rhotic: Giống Anh không đọc âm /r/ cuối từ (water -> /woːtə/)',
      'Diphthong Shift: Các nguyên âm đôi dịch chuyển hướng về phía trước (/eɪ/ -> /aɪ/)',
      'High Rising Terminal (HRT): Ngữ điệu thường có xu hướng lên giọng cuối câu',
      'Broad Open Vowels: Âm /ɑː/ dịch chuyển thành nguyên âm trung tâm /ɐː/'
    ]
  }
];

export const ACCENT_CONTRAST_WORDS = [
  {
    id: 'w_water',
    word: 'Water',
    us: { ipa: '/ˈwɔːtər/', keyFeature: 'Flap T [ɾ] + Rhotic R' },
    uk: { ipa: '/ˈwɔːtə/', keyFeature: 'Aspirated T + Silent R' },
    au: { ipa: '/ˈwoːtə/', keyFeature: 'Broad vowel + Silent R' }
  },
  {
    id: 'w_dance',
    word: 'Dance',
    us: { ipa: '/dæns/', keyFeature: 'Flat vowel /æ/' },
    uk: { ipa: '/dɑːns/', keyFeature: 'Broad back vowel /ɑː/' },
    au: { ipa: '/dɑːns/', keyFeature: 'Broad vowel /ɑː/' }
  },
  {
    id: 'w_schedule',
    word: 'Schedule',
    us: { ipa: '/ˈskɛdʒuːl/', keyFeature: 'Bắt đầu bằng /sk/' },
    uk: { ipa: '/ˈʃɛdjuːl/', keyFeature: 'Bắt đầu bằng /ʃ/ mềm' },
    au: { ipa: '/ˈʃɛdjuːl/', keyFeature: 'Bắt đầu bằng /ʃ/ mềm' }
  },
  {
    id: 'w_car',
    word: 'Car',
    us: { ipa: '/kɑːr/', keyFeature: 'Cuộn lưỡi âm R mạnh' },
    uk: { ipa: '/kɑː/', keyFeature: 'Ngân dài nguyên âm, không cuộn R' },
    au: { ipa: '/kɐː/', keyFeature: 'Nguyên âm mở phía trước /ɐː/' }
  },
  {
    id: 'w_tomato',
    word: 'Tomato',
    us: { ipa: '/təˈmeɪtoʊ/', keyFeature: 'Âm giữa /eɪ/ + Flap T' },
    uk: { ipa: '/təˈmɑːtəʊ/', keyFeature: 'Âm giữa /ɑː/ + bật /t/' },
    au: { ipa: '/təˈmɑːtəʊ/', keyFeature: 'Âm giữa /ɑː/' }
  }
];

/**
 * Evaluates target dialect proximity based on phonetic features.
 * @param {string} dialectCode - 'us' | 'uk' | 'au'
 * @param {object} [userTelemetry]
 * @returns {object} Dialect proximity score and comparative advice
 */
export function evaluateDialectProximity(dialectCode = 'us', userTelemetry = {}) {
  const selected = TARGET_DIALECTS.find((d) => d.code === dialectCode) || TARGET_DIALECTS[0];

  // Base proximity calculation
  const rhoticStrength = userTelemetry.rhoticStrength ?? (dialectCode === 'us' ? 0.82 : 0.25);
  const flapTAccuracy = userTelemetry.flapTAccuracy ?? (dialectCode === 'us' ? 0.79 : 0.2);
  const broadVowelAccuracy = userTelemetry.broadVowelAccuracy ?? (dialectCode === 'uk' ? 0.84 : 0.3);

  let proximityPercent = 75;
  let keyAdvice = '';

  if (dialectCode === 'us') {
    proximityPercent = Math.round((rhoticStrength * 0.5 + flapTAccuracy * 0.5) * 100);
    keyAdvice = proximityPercent >= 80
      ? 'Chất giọng Mỹ của bạn rất rõ nét: Âm R cuộn tự nhiên và Flap T lướt mượt mà.'
      : 'Để đạt chuẩn giọng Mỹ hơn: Hãy cuộn nhẹ đầu lưỡi về phía ngạc mềm khi gặp âm /r/ cuối từ (car, water).';
  } else if (dialectCode === 'uk') {
    proximityPercent = Math.round(((1 - rhoticStrength) * 0.4 + broadVowelAccuracy * 0.6) * 100);
    keyAdvice = proximityPercent >= 80
      ? 'Phong thái Anh chuẩn (RP) xuất sắc: Nguyên âm /ɑː/ sâu và không bị ảnh hưởng bởi âm R cuộn Mỹ.'
      : 'Để đạt chuẩn giọng Anh RP: Không cuộn lưỡi âm /r/ sau nguyên âm; hãy thả lỏng và ngân dài nguyên âm tự nhiên.';
  } else {
    proximityPercent = Math.round(((1 - rhoticStrength) * 0.5 + broadVowelAccuracy * 0.5) * 100);
    keyAdvice = 'Giọng Úc yêu cầu mở rộng khẩu hình và chuyển dịch nguyên âm đôi mượt mà.';
  }

  return {
    selectedDialect: selected,
    proximityPercent: Math.min(100, Math.max(35, proximityPercent)),
    keyAdvice,
    contrastWords: ACCENT_CONTRAST_WORDS
  };
}
