/**
 * Minimal Pair Auditory Discrimination Dataset & Scoring Logic (ELSA-205)
 * Trains auditory discrimination for high-confusion phoneme contrasts in Vietnamese learners:
 * /θ/ vs /t/, /iː/ vs /ɪ/, /s/ vs /ʃ/, /b/ vs /p/, /l/ vs /n/, /d/ vs /ð/.
 */

export const MINIMAL_PAIRS_CATALOG = {
  'pair_theta_t': {
    id: 'pair_theta_t',
    name: '/θ/ vs /t/',
    phonemeA: '/θ/',
    phonemeB: '/t/',
    difficulty: 'Intermediate',
    vietnameseContext: 'Người Việt thường thay thế âm răng xát /θ/ bằng âm tắc vòm /t/ (đọc "thank you" thành "tăng kiu").',
    articulatoryHint: 'Kẹp nhẹ đầu lưỡi giữa hai hàm răng cho âm thổi hơi vô thanh /θ/, bật đầu lưỡi dứt khoát sau nướu răng trên cho /t/.',
    words: {
      a: { word: 'think', ipa: '/θɪŋk/', meaning: 'suy nghĩ' },
      b: { word: 'tink', ipa: '/tɪŋk/', meaning: 'tiếng leng keng kim loại' }
    }
  },
  'pair_long_short_i': {
    id: 'pair_long_short_i',
    name: '/iː/ vs /ɪ/',
    phonemeA: '/iː/',
    phonemeB: '/ɪ/',
    difficulty: 'Beginner',
    vietnameseContext: 'Tiếng Việt chỉ có một âm /i/ lưng chừng, khiến người học không kéo căng khóe môi cho /iː/ và không hạ thả lỏng hàm cho /ɪ/.',
    articulatoryHint: 'Cười tươi kéo dẹt khóe môi sang hai bên cho nguyên âm dài /iː/, thả lỏng cơ miệng và hạ nhẹ cằm cho nguyên âm ngắn /ɪ/.',
    words: {
      a: { word: 'sheep', ipa: '/ʃiːp/', meaning: 'con cừu' },
      b: { word: 'ship', ipa: '/ʃɪp/', meaning: 'con tàu thủy' }
    }
  },
  'pair_s_sh': {
    id: 'pair_s_sh',
    name: '/s/ vs /ʃ/',
    phonemeA: '/s/',
    phonemeB: '/ʃ/',
    difficulty: 'Intermediate',
    vietnameseContext: 'Người miền Bắc có xu hướng làm bẹt âm /ʃ/ thành /s/, trong khi người miền Nam có thể phát âm nặng hơn.',
    articulatoryHint: 'Đầu lưỡi đặt sát sau răng cửa trên tạo tiếng xì nhẹ không chu môi cho /s/, chu tròn môi và kéo lưỡi lùi về sau vòm miệng cho /ʃ/.',
    words: {
      a: { word: 'sea', ipa: '/siː/', meaning: 'biển cả' },
      b: { word: 'she', ipa: '/ʃiː/', meaning: 'cô ấy' }
    }
  },
  'pair_b_p': {
    id: 'pair_b_p',
    name: '/b/ vs /p/',
    phonemeA: '/b/',
    phonemeB: '/p/',
    difficulty: 'Beginner',
    vietnameseContext: 'Tiếng Việt đầu câu không có âm bật vô thanh /p/ tự nhiên (chỉ có /b/), người học hay quên bật luồng hơi mạnh cho /p/.',
    articulatoryHint: 'Rung dây thanh quản khi mím môi nhả âm hữu thanh /b/, nén hơi rồi bung mạnh luồng khí vô thanh cho âm /p/.',
    words: {
      a: { word: 'bat', ipa: '/bæt/', meaning: 'con dơi / gậy bóng chày' },
      b: { word: 'pat', ipa: '/pæt/', meaning: 'vỗ nhẹ' }
    }
  },
  'pair_l_n': {
    id: 'pair_l_n',
    name: '/l/ vs /n/',
    phonemeA: '/l/',
    phonemeB: '/n/',
    difficulty: 'Regional (Miền Bắc)',
    vietnameseContext: 'Đặc thù thổ ngữ một số tỉnh đồng bằng Bắc Bộ (Hải Dương, Hưng Yên, Nam Định) hay lẫn lộn âm L và N.',
    articulatoryHint: 'Đầu lưỡi tì vào nướu răng trên cho luồng hơi thoát qua 2 bên mép cho /l/, hạ vòm mềm cho luồng hơi thoát hoàn toàn qua mũi cho /n/.',
    words: {
      a: { word: 'light', ipa: '/laɪt/', meaning: 'ánh sáng / nhẹ' },
      b: { word: 'night', ipa: '/naɪt/', meaning: 'ban đêm' }
    }
  },
  'pair_d_eth': {
    id: 'pair_d_eth',
    name: '/d/ vs /ð/',
    phonemeA: '/d/',
    phonemeB: '/ð/',
    difficulty: 'Advanced',
    vietnameseContext: 'Người học hay đọc âm /ð/ (the, this, that) thành âm /d/ tiếng Việt (đơ, đít, đát).',
    articulatoryHint: 'Bật đầu lưỡi sau nướu cho âm nổ /d/, kẹp nhẹ đầu lưỡi giữa 2 răng và rung thanh quản liên tục cho âm xát /ð/.',
    words: {
      a: { word: 'dare', ipa: '/deər/', meaning: 'dám thách thức' },
      b: { word: 'there', ipa: '/ðeər/', meaning: 'ở đó' }
    }
  }
};

/**
 * Generates a quiz question for a given minimal pair.
 * Randomly chooses between Option A and Option B as the correct target word.
 */
export function generateQuizQuestion(pairId = 'pair_theta_t') {
  const pair = MINIMAL_PAIRS_CATALOG[pairId] || MINIMAL_PAIRS_CATALOG.pair_theta_t;
  const isOptionA = Math.random() < 0.5;
  const targetOption = isOptionA ? 'a' : 'b';
  const targetWord = pair.words[targetOption];

  return {
    pairId: pair.id,
    pairName: pair.name,
    phonemeA: pair.phonemeA,
    phonemeB: pair.phonemeB,
    targetOption,
    targetWord: targetWord.word,
    targetIpa: targetWord.ipa,
    targetMeaning: targetWord.meaning,
    optionA: pair.words.a,
    optionB: pair.words.b,
    articulatoryHint: pair.articulatoryHint,
    vietnameseContext: pair.vietnameseContext
  };
}

/**
 * Evaluates user's choice and computes XP & Streak rewards.
 */
export function evaluateQuizAnswer(pairId, targetWord, selectedWord, reactionTimeMs = 1200, currentStreak = 0) {
  const pair = MINIMAL_PAIRS_CATALOG[pairId] || MINIMAL_PAIRS_CATALOG.pair_theta_t;
  const isCorrect = (targetWord || '').toLowerCase().trim() === (selectedWord || '').toLowerCase().trim();

  let newStreak = isCorrect ? currentStreak + 1 : 0;
  let xpAwarded = 0;

  if (isCorrect) {
    xpAwarded = 15; // Base XP
    if (newStreak >= 5) {
      xpAwarded += 10; // Mega streak bonus
    } else if (newStreak >= 3) {
      xpAwarded += 5;  // Streak bonus
    }
  }

  const feedback = isCorrect
    ? `Chính xác! Bạn đã phân biệt rõ từ "${targetWord}".`
    : `Chưa đúng! Âm thanh vừa phát là "${targetWord}", không phải "${selectedWord}".`;

  return {
    pairId: pair.id,
    targetWord,
    selectedWord,
    isCorrect,
    reactionTimeMs,
    newStreak,
    xpAwarded,
    feedback,
    articulatoryHint: pair.articulatoryHint,
    vietnameseContext: pair.vietnameseContext
  };
}
