/**
 * Numbered Target Phoneme System & Multi-Spelling Sound Maps (PRON-209)
 * Maps each English phoneme to its orthographic spelling variants with frequency distributions,
 * contextual audio samples, silent letter trap warnings, and diagnostic spelling checks.
 */

export const SPELLING_MAP_CATALOG = [
  {
    id: 'sound_09_f',
    number: 9,
    symbol: '/f/',
    name: 'Voiceless labiodental fricative',
    vietnameseName: 'Âm xát răng-môi vô thanh',
    totalFrequencyEstimatedPercent: 100,
    branches: [
      {
        pattern: 'f / ff',
        percentage: 78,
        color: 'sky',
        rule: 'Dạng chính tả thông dụng nhất (78%). Răng trên cắn nhẹ môi dưới đẩy luồng hơi liên tục.',
        examples: [
          { word: 'fast', ipa: '/fæst/', highlight: 'f', translation: 'nhanh' },
          { word: 'coffee', ipa: '/ˈkɔːfi/', highlight: 'ff', translation: 'cà phê' },
          { word: 'leaf', ipa: '/liːf/', highlight: 'f', translation: 'chiếc lá' },
          { word: 'flame', ipa: '/fleɪm/', highlight: 'fl', translation: 'ngọn lửa' },
          { word: 'traffic', ipa: '/ˈtræfɪk/', highlight: 'ff', translation: 'giao thông' }
        ]
      },
      {
        pattern: 'ph',
        percentage: 18,
        color: 'indigo',
        rule: 'Chính tả gốc Hy Lạp (Greek loanwords, 18%). Luôn đọc là /f/, người Việt hay nhầm với âm /p/.',
        examples: [
          { word: 'phone', ipa: '/foʊn/', highlight: 'ph', translation: 'điện thoại' },
          { word: 'photo', ipa: '/ˈfoʊtoʊ/', highlight: 'ph', translation: 'bức ảnh' },
          { word: 'physics', ipa: '/ˈfɪzɪks/', highlight: 'ph', translation: 'vật lý học' },
          { word: 'phrase', ipa: '/freɪz/', highlight: 'ph', translation: 'cụm từ' },
          { word: 'dolphin', ipa: '/ˈdɑːlfɪn/', highlight: 'ph', translation: 'cá heo' }
        ]
      },
      {
        pattern: 'gh',
        percentage: 4,
        color: 'rose',
        rule: 'Chính tả bất quy tắc cổ (Old English, 4%). Chỉ phát âm /f/ ở cuối một số từ nhất định.',
        examples: [
          { word: 'laugh', ipa: '/læf/', highlight: 'gh', translation: 'cười' },
          { word: 'rough', ipa: '/rʌf/', highlight: 'gh', translation: 'gồ ghề / thô ráp' },
          { word: 'tough', ipa: '/tʌf/', highlight: 'gh', translation: 'dai / cứng rắn' },
          { word: 'enough', ipa: '/ɪˈnʌf/', highlight: 'gh', translation: 'đầy đủ' },
          { word: 'cough', ipa: '/kɔːf/', highlight: 'gh', translation: 'ho' }
        ]
      }
    ],
    silentTrap: {
      title: 'Bẫy Âm Câm L1 Nguy Hiểm: Mặt chữ "gh"',
      description: "Chữ 'gh' CHỈ phát âm là /f/ trong số ít từ như 'laugh', 'rough', 'tough', 'cough', 'enough'. Trong các từ như 'though', 'thought', 'night', 'light', 'weigh', 'through' thì 'gh' HOÀN TOÀN LÀ ÂM CÂM! Người Việt tuyệt đối không đọc phụ âm ở những từ này.",
      silentExamples: ['though /ðoʊ/', 'night /naɪt/', 'thought /θɔːt/', 'through /θruː/']
    },
    quickQuiz: [
      {
        id: 'quiz_f_01',
        question: 'Trong từ "physics", phần chữ cái nào đại diện cho âm /f/?',
        word: 'physics',
        options: ['ph', 'ys', 'cs', 'p'],
        correctOption: 'ph',
        explanation: 'Trong "physics", chữ ghép "ph" (gốc Hy Lạp) phát âm là /f/.'
      },
      {
        id: 'quiz_f_02',
        question: 'Từ nào sau đây có cụm "gh" phát âm là /f/?',
        word: 'So sánh "tough" vs "thought"',
        options: ['tough', 'thought', 'night', 'though'],
        correctOption: 'tough',
        explanation: '"tough" đọc là /tʌf/, trong khi "thought", "night", "though" cụm "gh" là âm câm.'
      },
      {
        id: 'quiz_f_03',
        question: 'Nhánh chính tả nào chiếm tỷ lệ áp đảo (78%) của âm /f/?',
        word: 'Phân bố mặt chữ',
        options: ['f / ff', 'ph', 'gh', 'th'],
        correctOption: 'f / ff',
        explanation: 'Nhánh chữ cái "f / ff" là phổ biến nhất với 78% tần suất trong từ vựng tiếng Anh.'
      }
    ]
  },
  {
    id: 'sound_14_sh',
    number: 14,
    symbol: '/ʃ/',
    name: 'Voiceless post-alveolar fricative',
    vietnameseName: 'Âm xát sau chân răng vô thanh',
    totalFrequencyEstimatedPercent: 100,
    branches: [
      {
        pattern: 'sh',
        percentage: 65,
        color: 'sky',
        rule: 'Chính tả chuẩn bản xứ (65%). Tròn môi, đẩy lưỡi về sau chân răng.',
        examples: [
          { word: 'ship', ipa: '/ʃɪp/', highlight: 'sh', translation: 'con tàu' },
          { word: 'fish', ipa: '/fɪʃ/', highlight: 'sh', translation: 'con cá' },
          { word: 'fashion', ipa: '/ˈfæʃn/', highlight: 'sh', translation: 'thời trang' },
          { word: 'shine', ipa: '/ʃaɪn/', highlight: 'sh', translation: 'tỏa sáng' },
          { word: 'brush', ipa: '/brʌʃ/', highlight: 'sh', translation: 'bàn chải' }
        ]
      },
      {
        pattern: 'ti / ci / si',
        percentage: 25,
        color: 'indigo',
        rule: 'Hậu tố Latinh (-tion, -cial, -sion, 25%). Người Việt hay nhầm với âm /s/ nhẹ.',
        examples: [
          { word: 'nation', ipa: '/ˈneɪʃn/', highlight: 'ti', translation: 'quốc gia' },
          { word: 'special', ipa: '/ˈspeʃl/', highlight: 'ci', translation: 'đặc biệt' },
          { word: 'musician', ipa: '/mjuːˈzɪʃn/', highlight: 'ci', translation: 'nhạc sĩ' },
          { word: 'action', ipa: '/ˈækʃn/', highlight: 'ti', translation: 'hành động' },
          { word: 'mansion', ipa: '/ˈmænʃn/', highlight: 'si', translation: 'dinh thự' }
        ]
      },
      {
        pattern: 'ch',
        percentage: 10,
        color: 'rose',
        rule: 'Từ mượn tiếng Pháp (French loanwords, 10%). Viết là "ch" nhưng phát âm là /ʃ/ thay vì /tʃ/.',
        examples: [
          { word: 'chef', ipa: '/ʃef/', highlight: 'ch', translation: 'bếp trưởng' },
          { word: 'machine', ipa: '/məˈʃiːn/', highlight: 'ch', translation: 'máy móc' },
          { word: 'champagne', ipa: '/ʃæmˈpeɪn/', highlight: 'ch', translation: 'rượu sâm banh' },
          { word: 'parachute', ipa: '/ˈpærəʃuːt/', highlight: 'ch', translation: 'dù nhảy' },
          { word: 'brochure', ipa: '/broʊˈʃʊr/', highlight: 'ch', translation: 'tờ gấp quảng cáo' }
        ]
      }
    ],
    silentTrap: {
      title: 'Bẫy Phân Biệt Mặt Chữ: "ch" đọc là /ʃ/ hay /tʃ/?',
      description: "Hầu hết các từ viết là 'ch' đọc là /tʃ/ (e.g. 'church', 'chair'). Tuy nhiên các từ mượn gốc Pháp như 'chef', 'machine', 'champagne' lại đọc là /ʃ/ cong môi. Đừng phát âm 'chef' thành 'chép' /tʃ/!",
      silentExamples: ['chef /ʃef/', 'machine /məˈʃiːn/', 'parachute /ˈpærəʃuːt/']
    },
    quickQuiz: [
      {
        id: 'quiz_sh_01',
        question: 'Trong từ "machine", cụm chữ cái "ch" được phát âm là gì?',
        word: 'machine',
        options: ['/ʃ/', '/tʃ/', '/k/', '/s/'],
        correctOption: '/ʃ/',
        explanation: '"machine" là từ mượn gốc Pháp, cụm "ch" phát âm là /ʃ/ cong môi.'
      },
      {
        id: 'quiz_sh_02',
        question: 'Trong hậu tố "-tion" của từ "nation", chữ cái nào biến đổi thành âm /ʃ/?',
        word: 'nation',
        options: ['ti', 'on', 'na', 't'],
        correctOption: 'ti',
        explanation: 'Tổ hợp chữ "ti" đứng trước nguyên âm trong hậu tố "-tion" đọc thành âm /ʃ/.'
      }
    ]
  },
  {
    id: 'sound_23_k',
    number: 23,
    symbol: '/k/',
    name: 'Voiceless velar plosive',
    vietnameseName: 'Âm tắc vòm mềm vô thanh',
    totalFrequencyEstimatedPercent: 100,
    branches: [
      {
        pattern: 'c',
        percentage: 60,
        color: 'sky',
        rule: 'Mặt chữ "c" cứng (Hard C, đứng trước a, o, u hoặc phụ âm, 60%).',
        examples: [
          { word: 'cat', ipa: '/kæt/', highlight: 'c', translation: 'con mèo' },
          { word: 'music', ipa: '/ˈmjuːzɪk/', highlight: 'c', translation: 'âm nhạc' },
          { word: 'actor', ipa: '/ˈæktər/', highlight: 'c', translation: 'diễn viên' },
          { word: 'cold', ipa: '/koʊld/', highlight: 'c', translation: 'lạnh' },
          { word: 'picnic', ipa: '/ˈpɪknɪk/', highlight: 'c', translation: 'dã ngoại' }
        ]
      },
      {
        pattern: 'k',
        percentage: 20,
        color: 'indigo',
        rule: 'Chữ cái "k" đứng đầu từ hoặc sau nguyên âm dài/nguyên âm đôi (20%).',
        examples: [
          { word: 'king', ipa: '/kɪŋ/', highlight: 'k', translation: 'vua' },
          { word: 'make', ipa: '/meɪk/', highlight: 'k', translation: 'làm / tạo ra' },
          { word: 'kite', ipa: '/kaɪt/', highlight: 'k', translation: 'con diều' },
          { word: 'like', ipa: '/laɪk/', highlight: 'k', translation: 'thích' },
          { word: 'milk', ipa: '/mɪlk/', highlight: 'k', translation: 'sữa' }
        ]
      },
      {
        pattern: 'ck',
        percentage: 12,
        color: 'emerald',
        rule: 'Chữ ghép "ck" đứng ngay sau nguyên âm ngắn ở âm tiết nhấn (12%).',
        examples: [
          { word: 'back', ipa: '/bæk/', highlight: 'ck', translation: 'lưng / quay lại' },
          { word: 'duck', ipa: '/dʌk/', highlight: 'ck', translation: 'con vịt' },
          { word: 'rock', ipa: '/rɑːk/', highlight: 'ck', translation: 'hòn đá' },
          { word: 'black', ipa: '/blæk/', highlight: 'ck', translation: 'màu đen' },
          { word: 'check', ipa: '/tʃek/', highlight: 'ck', translation: 'kiểm tra' }
        ]
      },
      {
        pattern: 'ch',
        percentage: 8,
        color: 'rose',
        rule: 'Chữ ghép "ch" trong từ mượn gốc Hy Lạp (Greek words, 8%).',
        examples: [
          { word: 'character', ipa: '/ˈkærəktər/', highlight: 'ch', translation: 'nhân vật' },
          { word: 'school', ipa: '/skuːl/', highlight: 'ch', translation: 'trường học' },
          { word: 'echo', ipa: '/ˈekoʊ/', highlight: 'ch', translation: 'tiếng vang' },
          { word: 'anchor', ipa: '/ˈæŋkər/', highlight: 'ch', translation: 'mỏ neo' },
          { word: 'chaos', ipa: '/ˈkeɪɑːs/', highlight: 'ch', translation: 'hỗn loạn' }
        ]
      }
    ],
    silentTrap: {
      title: 'Bẫy Âm Câm L1 Tuyệt Đối: Chữ "k" đứng trước "n"',
      description: "Chữ cái 'k' đứng trước 'n' ở đầu từ luôn luôn là ÂM CÂM! Ví dụ: 'knight' đọc là /naɪt/ (không đọc k-nai), 'knee' đọc là /niː/ (không đọc k-ni), 'knife' đọc là /naɪf/. Người Việt hay mắc lỗi cố bật âm /k/.",
      silentExamples: ['knight /naɪt/', 'knee /niː/', 'knife /naɪf/', 'knock /nɑːk/', 'know /noʊ/']
    },
    quickQuiz: [
      {
        id: 'quiz_k_01',
        question: 'Trong từ "knight" (hiệp sĩ), chữ cái "k" có phát âm không?',
        word: 'knight',
        options: ['Không, đây là âm câm', 'Có, đọc là /k/', 'Đọc là /tʃ/', 'Đọc là /s/'],
        correctOption: 'Không, đây là âm câm',
        explanation: 'Tổ hợp "kn-" ở đầu từ luôn có "k" là âm câm, "knight" đọc chuẩn là /naɪt/.'
      },
      {
        id: 'quiz_k_02',
        question: 'Từ nào sau đây có cụm "ch" phát âm là /k/?',
        word: 'character vs chair vs church',
        options: ['character', 'chair', 'church', 'cheese'],
        correctOption: 'character',
        explanation: '"character" là từ gốc Hy Lạp, cụm "ch" phát âm là /k/, các từ còn lại đọc là /tʃ/.'
      }
    ]
  }
];

export function getSpellingMapCatalog() {
  return SPELLING_MAP_CATALOG;
}

export function getSpellingMapByPhoneme(phonemeId) {
  if (!phonemeId) return null;
  const normalized = phonemeId.trim().toLowerCase();
  return SPELLING_MAP_CATALOG.find(
    (item) => item.id.toLowerCase() === normalized || item.symbol.toLowerCase() === normalized
  ) || null;
}

export function evaluateSpellingQuiz(phonemeId, answers) {
  const map = getSpellingMapByPhoneme(phonemeId);
  if (!map) {
    return {
      success: false,
      error: `Phoneme map not found for: ${phonemeId}`
    };
  }

  if (!Array.isArray(answers) || answers.length === 0) {
    return {
      success: false,
      error: 'Answers array must contain at least 1 item'
    };
  }

  const results = [];
  let correctCount = 0;

  for (const quizItem of map.quickQuiz) {
    const userAnswerObj = answers.find((a) => a.id === quizItem.id);
    const userAnswer = userAnswerObj ? userAnswerObj.selectedOption : null;
    const isCorrect = userAnswer === quizItem.correctOption;
    if (isCorrect) correctCount++;

    results.push({
      id: quizItem.id,
      question: quizItem.question,
      userAnswer,
      correctOption: quizItem.correctOption,
      isCorrect,
      explanation: quizItem.explanation
    });
  }

  const totalQuestions = map.quickQuiz.length;
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);
  const passed = scorePercent >= 70;

  return {
    success: true,
    phonemeId: map.id,
    symbol: map.symbol,
    totalQuestions,
    correctCount,
    scorePercent,
    passed,
    results,
    feedback: passed
      ? `Tuyệt vời! Bạn nắm rất vững bản đồ chính tả của âm ${map.symbol} (${correctCount}/${totalQuestions} câu đúng).`
      : `Hãy xem lại các ngoại lệ chính tả và âm câm của âm ${map.symbol} để tránh bẫy phát âm.`
  };
}
