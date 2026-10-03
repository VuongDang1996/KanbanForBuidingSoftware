/**
 * Phonemic Audio Dictation & Gap-Fill Exercises (PRON-202)
 * Evaluates phonemic gap filling, Levenshtein distance,
 * and silent letter phonological rules.
 */

export const DICTATION_EXERCISES = {
  'dic_01': {
    id: 'dic_01',
    title: 'Luyện Âm Đuôi Bị Nuốt: Cụm Phụ Âm Kép',
    audioText: 'Six months ago, she baked fresh bread for breakfast.',
    displayTemplate: 'Si___ months ago, she baked fre___ brea___ for breakfast.',
    gaps: [
      { id: 'gap_1', prefix: 'Si', suffix: '', target: 'x', targetWord: 'Six', ipa: '/sɪks/', hint: 'Âm kép /ks/' },
      { id: 'gap_2', prefix: 'fre', suffix: '', target: 'sh', targetWord: 'fresh', ipa: '/freʃ/', hint: 'Âm xát /ʃ/' },
      { id: 'gap_3', prefix: 'brea', suffix: '', target: 'd', targetWord: 'bread', ipa: '/bred/', hint: 'Âm đuôi /d/' }
    ],
    silentLetterTip: null
  },
  'dic_02_silent': {
    id: 'dic_02_silent',
    title: 'Cạm Bẫy Chữ Viết: Các Từ Chứa Âm Câm (Silent Letters)',
    audioText: 'There is no doubt that the brave knight will answer.',
    displayTemplate: 'There is no dou___ that the brave ___ght will answer.',
    gaps: [
      { id: 'gap_1', prefix: 'dou', suffix: '', target: 'bt', targetWord: 'doubt', ipa: '/daʊt/', hint: 'Chứa âm câm "b"' },
      { id: 'gap_2', prefix: '', suffix: 'ght', target: 'kni', targetWord: 'knight', ipa: '/naɪt/', hint: 'Chứa âm câm "k"' }
    ],
    silentLetterTip: 'Trong từ "doubt", chữ cái "b" là âm câm hoàn toàn, phát âm là /daʊt/. Trong từ "knight", chữ "k" và "gh" đều câm, phát âm chỉ là /naɪt/!'
  },
  'dic_03': {
    id: 'dic_03',
    title: 'Chính Tả Ngữ Âm: Hóa Đơn & Âm Câm "P"',
    audioText: 'Please keep the official receipt in your pocket.',
    displayTemplate: 'Please keep the official recei___ in your pocket.',
    gaps: [
      { id: 'gap_1', prefix: 'recei', suffix: '', target: 'pt', targetWord: 'receipt', ipa: '/rɪˈsiːt/', hint: 'Chứa âm câm "p"' }
    ],
    silentLetterTip: 'Trong từ "receipt", chữ cái "p" là âm câm hoàn toàn (phát âm là /rɪˈsiːt/), tuyệt đối không phát âm thành "rì-xếp"!'
  }
};

/**
 * Computes Levenshtein distance between two strings
 */
export function calculateLevenshtein(str1 = '', str2 = '') {
  const a = (str1 || '').toLowerCase().trim();
  const b = (str2 || '').toLowerCase().trim();
  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Evaluates dictation submission
 */
export function evaluateDictationSubmission(exerciseId = 'dic_01', userAnswers = {}) {
  const exercise = DICTATION_EXERCISES[exerciseId] || DICTATION_EXERCISES.dic_01;
  const gapResults = {};
  let correctCount = 0;

  exercise.gaps.forEach((gap) => {
    const rawUserAns = (userAnswers[gap.id] || '').trim();
    const levDist = calculateLevenshtein(rawUserAns, gap.target);
    const isCorrect = levDist === 0;

    if (isCorrect) correctCount++;

    gapResults[gap.id] = {
      gapId: gap.id,
      userAnswer: rawUserAns,
      target: gap.target,
      targetWord: gap.targetWord,
      ipa: gap.ipa,
      isCorrect,
      levenshteinDistance: levDist
    };
  });

  const totalGaps = exercise.gaps.length;
  const isAllCorrect = correctCount === totalGaps;
  const score = Math.round((correctCount / totalGaps) * 100);
  const xpAwarded = (correctCount * 10) + (isAllCorrect ? 15 : 0);

  return {
    exerciseId: exercise.id,
    title: exercise.title,
    sentenceText: exercise.audioText,
    gapResults,
    correctCount,
    totalGaps,
    isAllCorrect,
    score,
    xpAwarded,
    silentLetterTip: exercise.silentLetterTip
  };
}
