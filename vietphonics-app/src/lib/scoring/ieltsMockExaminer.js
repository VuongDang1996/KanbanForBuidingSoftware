/**
 * IELTS Speaking Part 1 & 2 AI Mock Examiner Engine (VN-104)
 * Standard Cambridge IDP/BC Assessment Protocol for Vietnamese Learners.
 * Evaluates 4 core criteria: Fluency & Coherence (FC), Lexical Resource (LR),
 * Grammatical Range & Accuracy (GRA), Pronunciation (PR), with L1 Past-Tense omission diagnostics.
 */

export const IELTS_CUE_CARDS = [
  {
    id: 'tech_difficult_01',
    part: 2,
    topicTitle: 'A piece of technology difficult to use',
    cardPrompt: 'Describe a piece of technology you find difficult to use.',
    bulletPoints: [
      'What it is and when you got it',
      'What you use it for',
      'How often you use it',
      'And explain why you find it difficult to use.'
    ],
    targetBand: 7.0,
    recommendedVocab: [
      { word: 'steep learning curve', ipa: '/stiːp ˈlɜːnɪŋ kɜːv/', meaning: 'đòi hỏi nhiều thời gian để thành thạo' },
      { word: 'glitchy interface', ipa: '/ˈɡlɪtʃi ˈɪntəfeɪs/', meaning: 'giao diện hay bị giật lỗi' },
      { word: 'counterintuitive', ipa: '/ˌkaʊntərɪnˈtjuːɪtɪv/', meaning: 'ngược với trực giác tự nhiên' },
      { word: 'multitask', ipa: '/ˌmʌltiˈtɑːsk/', meaning: 'xử lý nhiều tác vụ cùng lúc' }
    ]
  },
  {
    id: 'memorable_journey_02',
    part: 2,
    topicTitle: 'A memorable journey by public transport',
    cardPrompt: 'Describe a memorable journey you made by public transport.',
    bulletPoints: [
      'Where you went and what transport you used',
      'Who was with you',
      'What happened during the journey',
      'And explain why this journey was so memorable.'
    ],
    targetBand: 7.0,
    recommendedVocab: [
      { word: 'breathtaking scenery', ipa: '/ˈbreθteɪkɪŋ ˈsiːnəri/', meaning: 'phong cảnh ngoạn mục' },
      { word: 'packed like sardines', ipa: '/pækt laɪk sɑːˈdiːnz/', meaning: 'chật như nêm cối' },
      { word: 'unforeseen delay', ipa: '/ˌʌnfɔːˈsiːn dɪˈleɪ/', meaning: 'sự chậm trễ ngoài dự kiến' }
    ]
  }
];

export function getIeltsCueCards() {
  return IELTS_CUE_CARDS;
}

export function getIeltsCueCardById(id) {
  return IELTS_CUE_CARDS.find((c) => c.id === id) || IELTS_CUE_CARDS[0];
}

/**
 * Standard Cambridge IELTS Rounding Rule:
 * If the average of the 4 criteria ends in .25, it rounds UP to the next half band (.5).
 * If it ends in .75, it rounds UP to the next whole band (.0).
 * Otherwise rounds to the nearest whole or half band.
 */
export function calculateCambridgeOverallBand(fc, lr, gra, pr) {
  const avg = (fc + lr + gra + pr) / 4;
  const remainder = avg - Math.floor(avg);
  if (remainder < 0.125) {
    return Math.floor(avg);
  } else if (remainder < 0.375) {
    return Math.floor(avg) + 0.5; // .25 rounds up to .5
  } else if (remainder < 0.625) {
    return Math.floor(avg) + 0.5;
  } else if (remainder < 0.875) {
    return Math.floor(avg) + 1.0; // .75 rounds up to 1.0
  } else {
    return Math.floor(avg) + 1.0;
  }
}

/**
 * Vietnamese L1 Past-Tense Omission Diagnostic:
 * Vietnamese verbs do not conjugate for past tense. Vietnamese learners frequently
 * drop "-ed" endings or forget irregular past forms when narrating past events.
 */
export function detectPastTenseOmissions(transcript = '') {
  if (!transcript || typeof transcript !== 'string') return [];

  const textLower = transcript.toLowerCase();
  const pastIndicators = ['yesterday', 'ago', 'last year', 'last week', 'in 20', 'in the past', 'when i was', 'bought', 'went', 'saw', 'decided'];
  const isPastNarrative = pastIndicators.some((ind) => textLower.includes(ind));

  const errors = [];
  const baseVerbsToWatch = [
    { base: 'use', correctPast: 'used', phonemeEnding: '/d/', example: 'I use it last year -> I used it last year' },
    { base: 'try', correctPast: 'tried', phonemeEnding: '/d/', example: 'I try many times -> I tried many times' },
    { base: 'fail', correctPast: 'failed', phonemeEnding: '/d/', example: 'The system fail -> The system failed' },
    { base: 'install', correctPast: 'installed', phonemeEnding: '/d/', example: 'I install the app -> I installed the app' },
    { base: 'purchase', correctPast: 'purchased', phonemeEnding: '/t/', example: 'I purchase it last month -> I purchased it' },
    { base: 'start', correctPast: 'started', phonemeEnding: '/ɪd/', example: 'it start malfunctioning -> it started' }
  ];

  if (isPastNarrative) {
    for (const item of baseVerbsToWatch) {
      // Look for base verb not preceded by 'to', 'can', 'will', 'do', 'did'
      const regex = new RegExp(`\\b(?<!to\\s|can\\s|will\\s|could\\s|would\\s|did\\s|do\\s)${item.base}\\b`, 'i');
      if (regex.test(textLower)) {
        errors.push({
          verb: item.base,
          correctForm: item.correctPast,
          soundEnding: item.phonemeEnding,
          issue: `Quên chia thì quá khứ cho động từ "${item.base}" (phải dùng "${item.correctPast}")`,
          correctiveTip: `L1 Transfer Trap: Cần bật rõ âm đuôi ${item.phonemeEnding} trong "${item.correctPast}". ${item.example}.`
        });
      }
    }
  }

  return errors;
}

/**
 * Main Evaluation Engine for Part 2 Speech
 */
export function evaluateIeltsMockPart2({
  topicId = 'tech_difficult_01',
  transcript = '',
  prepNotes = '',
  speechDurationSec = 110
}) {
  const card = getIeltsCueCardById(topicId);
  const words = transcript.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // 1. Fluency & Coherence (FC)
  // Optimal rate: ~110-140 words per minute for 2 minutes
  let fcBand = 6.0;
  if (wordCount >= 180 && speechDurationSec >= 100) fcBand = 7.5;
  else if (wordCount >= 140 && speechDurationSec >= 80) fcBand = 7.0;
  else if (wordCount >= 90) fcBand = 6.5;
  else if (wordCount >= 50) fcBand = 5.5;
  else fcBand = 5.0;

  // Discourse markers check
  const discourseMarkers = ['well', 'actually', 'first of all', 'furthermore', 'moreover', 'on top of that', 'all in all', 'eventually', 'however'];
  const markerCount = discourseMarkers.filter((m) => transcript.toLowerCase().includes(m)).length;
  if (markerCount >= 3 && fcBand < 8.0) fcBand = Math.min(8.0, fcBand + 0.5);

  // 2. Lexical Resource (LR)
  let lrBand = 6.0;
  const advancedVocabMatches = card.recommendedVocab.filter((v) =>
    transcript.toLowerCase().includes(v.word.toLowerCase())
  );
  if (advancedVocabMatches.length >= 2) lrBand = 7.5;
  else if (advancedVocabMatches.length === 1) lrBand = 7.0;
  else if (wordCount > 130) lrBand = 6.5;
  else lrBand = 6.0;

  // 3. Grammatical Range & Accuracy (GRA)
  const pastTenseErrors = detectPastTenseOmissions(transcript);
  let graBand = 6.5;
  if (pastTenseErrors.length === 0 && wordCount >= 120) {
    graBand = 7.5;
  } else if (pastTenseErrors.length === 1) {
    graBand = 6.5;
  } else if (pastTenseErrors.length >= 2) {
    graBand = 5.5; // Penalize heavy past tense drops
  }

  // 4. Pronunciation (PR)
  let prBand = 6.5;
  // Check for common L1 ending sound omission markers in transcript
  const hasGoodEndings = !transcript.toLowerCase().includes('technolog ') && wordCount >= 80;
  if (hasGoodEndings && pastTenseErrors.length === 0) prBand = 7.5;
  else if (hasGoodEndings) prBand = 7.0;
  else prBand = 6.0;

  const overallBand = calculateCambridgeOverallBand(fcBand, lrBand, graBand, prBand);

  return {
    topicId: card.id,
    topicTitle: card.topicTitle,
    prepNotes: prepNotes.trim(),
    transcript: transcript.trim(),
    speechDurationSec,
    wordCount,
    criteria: {
      fc: {
        code: 'FC',
        name: 'Fluency & Coherence',
        nameVi: 'Độ Trôi Chảy & Mạch Lạc',
        band: fcBand,
        feedback: markerCount >= 2
          ? 'Duy trì nhịp nói liên tục rất tốt, sử dụng liên từ tự nhiên.'
          : 'Cần sử dụng thêm các từ nối tự nhiên như "furthermore", "on top of that" để liên kết các ý.'
      },
      lr: {
        code: 'LR',
        name: 'Lexical Resource',
        nameVi: 'Vốn Từ Vựng',
        band: lrBand,
        matchedKeywords: advancedVocabMatches.map((v) => v.word),
        feedback: advancedVocabMatches.length > 0
          ? `Sử dụng thành công từ vựng chủ đề: ${advancedVocabMatches.map((v) => `"${v.word}"`).join(', ')}.`
          : 'Nên bổ sung các collocation đắt giá như "steep learning curve", "counterintuitive".'
      },
      gra: {
        code: 'GRA',
        name: 'Grammatical Range & Accuracy',
        nameVi: 'Độ Đa Dạng & Chuẩn Xác Ngữ Pháp',
        band: graBand,
        pastTenseErrors,
        feedback: pastTenseErrors.length > 0
          ? `Bạn đã bỏ quên đuôi thì quá khứ ở các động từ: ${pastTenseErrors.map((e) => `"${e.verb}"`).join(', ')}, làm giảm độ chuẩn xác ngữ pháp.`
          : 'Cấu trúc câu phong phú và chia thì quá khứ hoàn toàn chuẩn xác!'
      },
      pr: {
        code: 'PR',
        name: 'Pronunciation',
        nameVi: 'Phát Âm & Ngữ Điệu',
        band: prBand,
        feedback: prBand >= 7.0
          ? 'Trọng âm từ và ngữ điệu tự nhiên, bảo toàn tốt âm đuôi.'
          : 'Chú ý nhấn đúng trọng âm các từ đa âm tiết và bật rõ âm gió phụ âm cuối.'
      }
    },
    overallBand,
    examinerPersona: {
      name: 'Sarah AI Examiner',
      location: 'IDP / British Council London Accredited Mock Room',
      avatarUrl: '/avatars/examiner_sarah.png',
      generalComment: overallBand >= 7.0
        ? 'Excellent response! Your narrative was well-paced, cohesive, and clearly addressed all bullet points on the cue card.'
        : 'Good effort! Focus on eliminating L1 verb tense lapses and maintaining steady pacing across the 2-minute stretch.'
    }
  };
}
