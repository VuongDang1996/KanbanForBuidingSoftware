/**
 * Targeted Sound Read-Aloud & Contextual Fluency Drills (PRON-203)
 * Provides target sound saturated sentences, phoneme occurrence extraction,
 * L1 substitution error detection, and isolated word audio pronunciation.
 */

export const TARGET_SATURATED_SENTENCES = {
  'sat_theta_01': {
    id: 'sat_theta_01',
    targetPhoneme: '/θ/',
    targetName: 'Voiceless Dental Fricative (Âm Thổi /θ/)',
    text: 'I think thirty-three thieves thought of that.',
    vietnameseL1Trap: 'Người Việt hay thay thế /θ/ thành /t/ ("tơ-ti") hoặc /s/ ("xinh"). Hãy kẹp đầu lưỡi giữa hai hàm răng và đẩy luồng hơi êm.',
    words: [
      { id: 'w1', word: 'I', targetIndices: [], ipa: '/aɪ/' },
      { id: 'w2', word: 'think', targetIndices: [0], ipa: '/θɪŋk/', commonSubstitution: '/t/' },
      { id: 'w3', word: 'thirty-three', targetIndices: [0, 7], ipa: '/ˈθɜːti θriː/', commonSubstitution: '/t/' },
      { id: 'w4', word: 'thieves', targetIndices: [0], ipa: '/θiːvz/', commonSubstitution: '/t/' },
      { id: 'w5', word: 'thought', targetIndices: [0], ipa: '/θɔːt/', commonSubstitution: '/t/' },
      { id: 'w6', word: 'of', targetIndices: [], ipa: '/əv/' },
      { id: 'w7', word: 'that', targetIndices: [], ipa: '/ðæt/', note: 'Voiced /ð/' }
    ],
    totalOccurrences: 5
  },
  'sat_sh_02': {
    id: 'sat_sh_02',
    targetPhoneme: '/ʃ/',
    targetName: 'Voiceless Palato-Alveolar Fricative (Âm Chu Môi /ʃ/)',
    text: 'She sells six shiny seashells by the seashore.',
    vietnameseL1Trap: 'Người Việt hay lẫn lộn /ʃ/ với /s/. Âm /ʃ/ đòi hỏi phải chu tròn môi như khi ra hiệu im lặng "suỵt".',
    words: [
      { id: 'w1', word: 'She', targetIndices: [0], ipa: '/ʃiː/', commonSubstitution: '/s/' },
      { id: 'w2', word: 'sells', targetIndices: [], ipa: '/selz/' },
      { id: 'w3', word: 'six', targetIndices: [], ipa: '/sɪks/' },
      { id: 'w4', word: 'shiny', targetIndices: [0], ipa: '/ˈʃaɪni/', commonSubstitution: '/s/' },
      { id: 'w5', word: 'seashells', targetIndices: [3], ipa: '/ˈsiːʃelz/', commonSubstitution: '/s/' },
      { id: 'w6', word: 'by', targetIndices: [], ipa: '/baɪ/' },
      { id: 'w7', word: 'the', targetIndices: [], ipa: '/ðə/' },
      { id: 'w8', word: 'seashore', targetIndices: [3], ipa: '/ˈsiːʃɔːr/', commonSubstitution: '/s/' }
    ],
    totalOccurrences: 4
  },
  'sat_d_coda_03': {
    id: 'sat_d_coda_03',
    targetPhoneme: '/d/',
    targetName: 'Voiced Alveolar Stop Coda (Âm Đuôi /d/)',
    text: 'David baked, lived, played, and avoided the loud crowd.',
    vietnameseL1Trap: 'Người Việt thường nuốt âm /d/ ở cuối từ hoặc biến thành âm câm không bật hơi. Hãy rung thanh quản và giải phóng lưỡi khỏi lợi.',
    words: [
      { id: 'w1', word: 'David', targetIndices: [0, 4], ipa: '/ˈdeɪvɪd/', commonSubstitution: 'missing' },
      { id: 'w2', word: 'baked', targetIndices: [], ipa: '/beɪkt/', note: '-ed is /t/' },
      { id: 'w3', word: 'lived', targetIndices: [4], ipa: '/lɪvd/', commonSubstitution: 'missing' },
      { id: 'w4', word: 'played', targetIndices: [5], ipa: '/pleɪd/', commonSubstitution: 'missing' },
      { id: 'w5', word: 'and', targetIndices: [2], ipa: '/ænd/', commonSubstitution: 'missing' },
      { id: 'w6', word: 'avoided', targetIndices: [6], ipa: '/əˈvɔɪdɪd/', commonSubstitution: 'missing' },
      { id: 'w7', word: 'the', targetIndices: [], ipa: '/ðə/' },
      { id: 'w8', word: 'loud', targetIndices: [3], ipa: '/laʊd/', commonSubstitution: 'missing' },
      { id: 'w9', word: 'crowd', targetIndices: [4], ipa: '/kraʊd/', commonSubstitution: 'missing' }
    ],
    totalOccurrences: 8
  }
};

/**
 * Detects substitution errors for a given sentence and target phoneme.
 * E.g., if target is /θ/ and user substituted with /t/ in "thirty".
 */
export function evaluateTargetDrill(sentenceId = 'sat_theta_01', userWordPerformances = {}) {
  const sentence = TARGET_SATURATED_SENTENCES[sentenceId] || TARGET_SATURATED_SENTENCES.sat_theta_01;
  const breakdown = [];
  const substitutions = [];
  let correctOccurrences = 0;
  let totalOccurrences = 0;

  sentence.words.forEach((item) => {
    const hasTarget = item.targetIndices && item.targetIndices.length > 0;
    const occCount = hasTarget ? item.targetIndices.length : 0;
    totalOccurrences += occCount;

    // Check user performance if provided
    const userPerf = userWordPerformances[item.word] || {
      gop: 92,
      detectedPhoneme: sentence.targetPhoneme,
      isSubstituted: false
    };

    const isCorrect = userPerf.gop >= 75 && !userPerf.isSubstituted;
    if (hasTarget) {
      if (isCorrect) {
        correctOccurrences += occCount;
      } else if (userPerf.detectedPhoneme && userPerf.detectedPhoneme !== sentence.targetPhoneme) {
        // Detected substitution
        substitutions.push({
          word: item.word,
          expectedPhoneme: sentence.targetPhoneme,
          actualPhoneme: userPerf.detectedPhoneme,
          message: `Lỗi thay thế: ${sentence.targetPhoneme} bị đọc thành ${userPerf.detectedPhoneme} trong từ "${item.word}". ${sentence.vietnameseL1Trap}`
        });
      }
    }

    breakdown.push({
      word: item.word,
      ipa: item.ipa,
      hasTarget,
      targetIndices: item.targetIndices,
      gop: userPerf.gop || 90,
      isCorrect,
      detectedPhoneme: userPerf.detectedPhoneme || sentence.targetPhoneme,
      note: item.note || null
    });
  });

  const accuracyPercent = totalOccurrences > 0
    ? Math.round((correctOccurrences / totalOccurrences) * 100)
    : 100;

  return {
    sentenceId: sentence.id,
    targetPhoneme: sentence.targetPhoneme,
    targetName: sentence.targetName,
    text: sentence.text,
    totalOccurrences,
    correctOccurrences,
    accuracyPercent,
    badgeText: `${correctOccurrences}/${totalOccurrences} âm ${sentence.targetPhoneme} đạt chuẩn (${accuracyPercent}%)`,
    substitutions,
    breakdown
  };
}
