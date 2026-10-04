/**
 * L1 Confusion-Trap Cross-Transition Drills Engine (PRON-208)
 * Targets rapid alternating shifts between antagonistic phoneme pairs:
 * - /s/ vs /ʃ/ (Bè miệng vs Chu môi)
 * - /l/ vs /n/ (Đầu lưỡi nướu vs Âm mũi)
 * - /θ/ vs /s/ (Kẹp răng vs Xát răng)
 */

export const CONFUSION_TRAP_DRILLS = {
  'trap_s_sh': {
    id: 'trap_s_sh',
    phonemeA: '/s/',
    phonemeB: '/ʃ/',
    name: 'Bè Miệng /s/ vs Chu Môi /ʃ/',
    l1Notice: 'Người Việt rất dễ bị đồng hóa âm (Assimilation): nếu từ đầu là /ʃ/ ("She") thì từ sau bị lây thành "shells", biến cả câu thành toàn âm chu môi hoặc toàn âm bè miệng!',
    sentence: 'She sells sea shells on the seashore.',
    words: [
      { id: 'w1', word: 'She', phoneme: '/ʃ/', ipa: '/ʃiː/', lipShape: '😗 Chu cong môi', color: 'rose' },
      { id: 'w2', word: 'sells', phoneme: '/s/', ipa: '/selz/', lipShape: '😀 Bè miệng cười', color: 'sky' },
      { id: 'w3', word: 'sea', phoneme: '/s/', ipa: '/siː/', lipShape: '😀 Bè miệng cười', color: 'sky' },
      { id: 'w4', word: 'shells', phoneme: '/ʃ/', ipa: '/ʃelz/', lipShape: '😗 Chu cong môi', color: 'rose' },
      { id: 'w5', word: 'on', phoneme: null, ipa: '/ɒn/', lipShape: 'Thả lỏng', color: 'slate' },
      { id: 'w6', word: 'the', phoneme: null, ipa: '/ðə/', lipShape: 'Thả lỏng', color: 'slate' },
      { id: 'w7', word: 'seashore', phoneme: '/s/-/ʃ/', ipa: '/ˈsiːʃɔːr/', lipShape: '😀 Bè rồi 😗 Chu', color: 'indigo' }
    ]
  },
  'trap_l_n': {
    id: 'trap_l_n',
    phonemeA: '/l/',
    phonemeB: '/n/',
    name: 'Lưỡi Nướu /l/ vs Âm Mũi /n/ (Bẫy Bắc Bộ)',
    l1Notice: 'Người học Bắc Bộ (Hà Nội & đồng bằng sông Hồng) hay lẫn lộn L và N. Lưỡi /l/ cần chạm nướu đẩy hơi hai bên, /n/ hơi thoát hoàn toàn qua mũi.',
    sentence: 'Nine nice night nurses line light lamps.',
    words: [
      { id: 'w1', word: 'Nine', phoneme: '/n/', ipa: '/naɪn/', lipShape: 'Hơi qua mũi', color: 'sky' },
      { id: 'w2', word: 'nice', phoneme: '/n/', ipa: '/naɪs/', lipShape: 'Hơi qua mũi', color: 'sky' },
      { id: 'w3', word: 'night', phoneme: '/n/', ipa: '/naɪt/', lipShape: 'Hơi qua mũi', color: 'sky' },
      { id: 'w4', word: 'nurses', phoneme: '/n/', ipa: '/ˈnɜːsɪz/', lipShape: 'Hơi qua mũi', color: 'sky' },
      { id: 'w5', word: 'line', phoneme: '/l/', ipa: '/laɪn/', lipShape: 'Lưỡi chạm nướu', color: 'rose' },
      { id: 'w6', word: 'light', phoneme: '/l/', ipa: '/laɪt/', lipShape: 'Lưỡi chạm nướu', color: 'rose' },
      { id: 'w7', word: 'lamps', phoneme: '/l/', ipa: '/læmps/', lipShape: 'Lưỡi chạm nướu', color: 'rose' }
    ]
  },
  'trap_theta_s': {
    id: 'trap_theta_s',
    phonemeA: '/θ/',
    phonemeB: '/s/',
    name: 'Kẹp Răng /θ/ vs Xát Răng /s/',
    l1Notice: 'Đầu lưỡi kẹp ngoài răng cho /θ/, sau đó phải rút nhanh vào trong sau răng cửa cho /s/ mà không nuốt âm.',
    sentence: 'Think of something sweet with smooth silk.',
    words: [
      { id: 'w1', word: 'Think', phoneme: '/θ/', ipa: '/θɪŋk/', lipShape: '👅 Kẹp đầu lưỡi', color: 'rose' },
      { id: 'w2', word: 'of', phoneme: null, ipa: '/əv/', lipShape: 'Thả lỏng', color: 'slate' },
      { id: 'w3', word: 'something', phoneme: '/s/-/θ/', ipa: '/ˈsʌmθɪŋ/', lipShape: 'Xát rồi Kẹp', color: 'indigo' },
      { id: 'w4', word: 'sweet', phoneme: '/s/', ipa: '/swiːt/', lipShape: '🦷 Xát sau răng', color: 'sky' },
      { id: 'w5', word: 'with', phoneme: '/θ/', ipa: '/wɪθ/', lipShape: '👅 Kẹp đầu lưỡi', color: 'rose' },
      { id: 'w6', word: 'smooth', phoneme: '/ð/', ipa: '/smuːð/', lipShape: 'Rung kẹp răng', color: 'indigo' },
      { id: 'w7', word: 'silk', phoneme: '/s/', ipa: '/sɪlk/', lipShape: '🦷 Xát sau răng', color: 'sky' }
    ]
  }
};

/**
 * Evaluates speech input for cross-transition phonetic assimilation
 */
export function evaluateConfusionTrap(trapId = 'trap_s_sh', detectedWordPhonemes = {}) {
  const trap = CONFUSION_TRAP_DRILLS[trapId] || CONFUSION_TRAP_DRILLS.trap_s_sh;
  const assimilations = [];
  const matrix = {
    totalTransitions: 0,
    successfulTransitions: 0
  };

  let prevPhoneme = null;
  let prevWord = null;

  trap.words.forEach((item) => {
    if (!item.phoneme) return;

    const detected = detectedWordPhonemes[item.word] || item.phoneme;

    // Check if transition occurred from previous target word
    if (prevPhoneme !== null && item.phoneme !== prevPhoneme) {
      matrix.totalTransitions++;

      // Check assimilation error (e.g. user said same phoneme as previous word)
      if (detected === prevPhoneme) {
        assimilations.push({
          fromWord: prevWord,
          toWord: item.word,
          expectedPhoneme: item.phoneme,
          assimilatedTo: prevPhoneme,
          message: `Líu lưỡi đồng hóa âm: "${prevWord}" (${prevPhoneme}) ➔ "${item.word}" (bị đọc nhầm thành ${prevPhoneme} thay vì ${item.phoneme})!`
        });
      } else {
        matrix.successfulTransitions++;
      }
    }

    prevPhoneme = item.phoneme;
    prevWord = item.word;
  });

  const agilityScore = matrix.totalTransitions > 0
    ? Math.round((matrix.successfulTransitions / matrix.totalTransitions) * 100)
    : 100;

  return {
    trapId: trap.id,
    phonemeA: trap.phonemeA,
    phonemeB: trap.phonemeB,
    sentence: trap.sentence,
    agilityScore,
    matrix,
    assimilations,
    l1Notice: trap.l1Notice
  };
}
