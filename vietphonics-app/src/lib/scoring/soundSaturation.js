/**
 * Dense Target Sound Saturation Sentences Engine (PRON-211)
 * High-density phoneme saturation drills designed to challenge articulatory muscle memory,
 * calculate saturation meter fill percentage, detect L1 affricate/fricative traps, and evaluate density accuracy.
 */

export const SATURATION_SENTENCES = [
  {
    id: 'sat_dj_01',
    targetPhoneme: '/dʒ/',
    phonemeName: 'Voiced post-alveolar affricate (Âm tắc xát vòm miệng hữu thanh)',
    text: 'George enjoyed arranging orange juice in the large fridge.',
    vietnameseTranslation: 'George rất thích sắp xếp nước cam trong chiếc tủ lạnh lớn.',
    targetOccurrencesCount: 8,
    words: [
      { word: 'George', ipa: '/dʒɔːrdʒ/', hasTarget: true, targetCount: 2, offsetIndices: [0, 5] },
      { word: 'enjoyed', ipa: '/ɪnˈdʒɔɪd/', hasTarget: true, targetCount: 1, offsetIndices: [2] },
      { word: 'arranging', ipa: '/əˈreɪndʒɪŋ/', hasTarget: true, targetCount: 1, offsetIndices: [6] },
      { word: 'orange', ipa: '/ˈɔːrɪndʒ/', hasTarget: true, targetCount: 1, offsetIndices: [5] },
      { word: 'juice', ipa: '/dʒuːs/', hasTarget: true, targetCount: 1, offsetIndices: [0] },
      { word: 'in', ipa: '/ɪn/', hasTarget: false, targetCount: 0 },
      { word: 'the', ipa: '/ðə/', hasTarget: false, targetCount: 0 },
      { word: 'large', ipa: '/lɑːrdʒ/', hasTarget: true, targetCount: 1, offsetIndices: [4] },
      { word: 'fridge', ipa: '/frɪdʒ/', hasTarget: true, targetCount: 1, offsetIndices: [3] }
    ],
    l1Trap: {
      type: 'affricate_reduction',
      title: 'Bẫy L1 Giảm Âm Tắc Xát /dʒ/ (Affricate Failure)',
      description: 'Người Việt hay nuốt hoặc đọc lướt /dʒ/ thành âm "d" mềm (/z/) hoặc "đ" (/d/) như tiếng Việt.',
      correctiveAdvice: "Âm /dʒ/ là âm tắc xát (Affricate): Cần khép miệng nén khí sau vòm chân răng rồi mới bật bung âm ra kèm rung dây thanh, tuyệt đối không lướt thành chữ 'd' tiếng Việt!"
    }
  },
  {
    id: 'sat_v_02',
    targetPhoneme: '/v/',
    phonemeName: 'Voiced labiodental fricative (Âm xát răng môi hữu thanh)',
    text: 'Five clever volunteers drove seven vans over several rivers.',
    vietnameseTranslation: 'Năm tình nguyện viên thông minh đã lái 7 chiếc xe tải nhỏ qua vài con sông.',
    targetOccurrencesCount: 9,
    words: [
      { word: 'Five', ipa: '/faɪv/', hasTarget: true, targetCount: 1 },
      { word: 'clever', ipa: '/ˈklevər/', hasTarget: true, targetCount: 1 },
      { word: 'volunteers', ipa: '/ˌvɑːlənˈtɪrz/', hasTarget: true, targetCount: 1 },
      { word: 'drove', ipa: '/droʊv/', hasTarget: true, targetCount: 1 },
      { word: 'seven', ipa: '/ˈsevn/', hasTarget: true, targetCount: 1 },
      { word: 'vans', ipa: '/vænz/', hasTarget: true, targetCount: 1 },
      { word: 'over', ipa: '/ˈoʊvər/', hasTarget: true, targetCount: 1 },
      { word: 'several', ipa: '/ˈsevrəl/', hasTarget: true, targetCount: 1 },
      { word: 'rivers', ipa: '/ˈrɪvərz/', hasTarget: true, targetCount: 1 }
    ],
    l1Trap: {
      type: 'labiodental_confusion',
      title: 'Bẫy L1 Miền Nam: Biến /v/ thành /j/ (dô, da)',
      description: 'Người miền Nam hay biến âm /v/ thành âm "d" /j/ (vd: ve thành de).',
      correctiveAdvice: 'Hãy đặt nhẹ răng cửa trên vào lòng môi dưới, đẩy luồng hơi và rung mạnh thanh quản để tạo âm /v/ chuẩn xác.'
    }
  },
  {
    id: 'sat_th_03',
    targetPhoneme: '/θ/',
    phonemeName: 'Voiceless dental fricative (Âm xát răng vô thanh)',
    text: 'Theo thoughtfully thought through thirty thrilling theatrical themes.',
    vietnameseTranslation: 'Theo đã suy nghĩ thấu đáo qua 30 chủ đề sân khấu đầy kịch tính.',
    targetOccurrencesCount: 8,
    words: [
      { word: 'Theo', ipa: '/ˈθiːoʊ/', hasTarget: true, targetCount: 1 },
      { word: 'thoughtfully', ipa: '/ˈθɔːtfəli/', hasTarget: true, targetCount: 1 },
      { word: 'thought', ipa: '/θɔːt/', hasTarget: true, targetCount: 1 },
      { word: 'through', ipa: '/θruː/', hasTarget: true, targetCount: 1 },
      { word: 'thirty', ipa: '/ˈθɜːrti/', hasTarget: true, targetCount: 1 },
      { word: 'thrilling', ipa: '/ˈθrɪlɪŋ/', hasTarget: true, targetCount: 1 },
      { word: 'theatrical', ipa: '/θiˈætrɪkl/', hasTarget: true, targetCount: 1 },
      { word: 'themes', ipa: '/θiːmz/', hasTarget: true, targetCount: 1 }
    ],
    l1Trap: {
      type: 'dental_stopping',
      title: 'Bẫy L1: Đọc /θ/ thành /t/ (Tơ-ti, Tanh-kiu)',
      description: 'Lưỡi không thò ra ngoài răng mà thụt vào trong đập vào chân răng tạo thành âm /t/.',
      correctiveAdvice: 'Thò 2mm đầu lưỡi ra kẹp giữa răng cửa trước khi phát âm bất kỳ từ nào có âm /θ/!'
    }
  }
];

export function getSaturationSentences() {
  return SATURATION_SENTENCES;
}

export function getSaturationSentence(id) {
  if (!id) return null;
  const normalized = id.trim().toLowerCase();
  return SATURATION_SENTENCES.find(
    (s) => s.id.toLowerCase() === normalized || s.targetPhoneme.toLowerCase() === normalized
  ) || null;
}

export function evaluateSaturationSpeech({
  sentenceId,
  correctOccurrences = null,
  detectedSubstitutions = []
}) {
  const sentence = getSaturationSentence(sentenceId);
  if (!sentence) {
    return {
      success: false,
      error: `Sentence not found for: ${sentenceId}`
    };
  }

  const total = sentence.targetOccurrencesCount;
  // If not explicitly provided, simulate standard 85% accurate pronunciation
  const count = typeof correctOccurrences === 'number'
    ? Math.max(0, Math.min(total, correctOccurrences))
    : Math.round(total * 0.85);

  const accuracyPercent = Math.round((count / total) * 100);
  const saturationMeterLevel = accuracyPercent; // 0 to 100%
  const isMastered = accuracyPercent >= 80;

  const hasAffricateError = detectedSubstitutions.some(
    (sub) => sub.includes('/z/') || sub.includes('/d/') || sub.includes('tơ')
  );

  return {
    success: true,
    sentenceId: sentence.id,
    targetPhoneme: sentence.targetPhoneme,
    text: sentence.text,
    totalOccurrences: total,
    correctOccurrences: count,
    accuracyPercent,
    saturationMeterLevel,
    isMastered,
    detectedTraps: hasAffricateError ? [sentence.l1Trap.title] : [],
    advice: hasAffricateError ? sentence.l1Trap.correctiveAdvice : 'Phản xạ cơ miệng rất xuất sắc!',
    feedback: isMastered
      ? `Đạt chuẩn bão hòa cao (${count}/${total} âm ${sentence.targetPhoneme})! Cơ miệng duy trì phản xạ tốt.`
      : `Đạt ${count}/${total} âm. Cần kiểm soát cơ miệng khi nói liên tục các từ giàu âm ${sentence.targetPhoneme}.`
  };
}
