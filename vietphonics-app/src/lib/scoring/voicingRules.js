/**
 * Phonetic Exception Words & Grammatical Voicing Alternations (PRON-207)
 * Rules for -s/-es (/s/, /z/, /ɪz/) and -ed (/t/, /d/, /ɪd/) endings,
 * vocal cord vibration detection, and Vietnamese mnemonic sayings.
 */

export const VOICING_RULE_CATALOG = {
  's_es_endings': {
    category: 's_es_endings',
    title: 'Quy Tắc Đuôi Danh Từ Số Nhiều & Động Từ Ngôi Thứ Ba (-s/-es)',
    mnemonics: {
      '/s/': 'Thời phong kiến phương tây (kết thúc bằng phụ âm vô thanh: /p/, /k/, /t/, /f/, /θ/)',
      '/ɪz/': 'Sáng sớm chạy xe sh zỏm (kết thúc bằng âm xuýt sibilants: /s/, /z/, /ʃ/, /tʃ/, /dʒ/, /ks/)',
      '/z/': 'Các âm còn lại (nguyên âm và phụ âm hữu thanh: /b/, /d/, /ɡ/, /v/, /m/, /n/, /l/…)'
    },
    columns: [
      { id: '/s/', label: 'Cột 1: /s/ (Vô Thanh)', hotkey: '1', color: 'sky' },
      { id: '/z/', label: 'Cột 2: /z/ (Hữu Thanh - Rung Cổ)', hotkey: '2', color: 'emerald' },
      { id: '/ɪz/', label: 'Cột 3: /ɪz/ (Âm Xuýt / Thêm Âm Tiết)', hotkey: '3', color: 'indigo' }
    ],
    words: [
      { word: 'cats', targetCoda: '/s/', ipa: '/kæts/', baseEnd: '/t/', isVoiced: false },
      { word: 'books', targetCoda: '/s/', ipa: '/bʊks/', baseEnd: '/k/', isVoiced: false },
      { word: 'cups', targetCoda: '/s/', ipa: '/kʌps/', baseEnd: '/p/', isVoiced: false },
      { word: 'dogs', targetCoda: '/z/', ipa: '/dɒɡz/', baseEnd: '/ɡ/', isVoiced: true },
      { word: 'plays', targetCoda: '/z/', ipa: '/pleɪz/', baseEnd: '/eɪ/', isVoiced: true },
      { word: 'pens', targetCoda: '/z/', ipa: '/penz/', baseEnd: '/n/', isVoiced: true },
      { word: 'buses', targetCoda: '/ɪz/', ipa: '/ˈbʌsɪz/', baseEnd: '/s/', isVoiced: false, isSibilant: true },
      { word: 'watches', targetCoda: '/ɪz/', ipa: '/ˈwɒtʃɪz/', baseEnd: '/tʃ/', isVoiced: false, isSibilant: true },
      { word: 'boxes', targetCoda: '/ɪz/', ipa: '/ˈbɒksɪz/', baseEnd: '/ks/', isVoiced: false, isSibilant: true }
    ]
  },
  'ed_endings': {
    category: 'ed_endings',
    title: 'Quy Tắc Đuôi Động Từ Quá Khứ & Phân Từ (-ed)',
    mnemonics: {
      '/t/': 'Chính phủ phát sách không share (kết thúc bằng phụ âm vô thanh: /p/, /k/, /f/, /s/, /ʃ/, /tʃ/)',
      '/ɪd/': 'Tiền đô (kết thúc bằng âm /t/ hoặc /d/)',
      '/d/': 'Các âm còn lại (tất cả các nguyên âm và phụ âm hữu thanh)'
    },
    columns: [
      { id: '/t/', label: 'Cột 1: /t/ (Vô Thanh)', hotkey: '1', color: 'sky' },
      { id: '/d/', label: 'Cột 2: /d/ (Hữu Thanh - Rung Cổ)', hotkey: '2', color: 'emerald' },
      { id: '/ɪd/', label: 'Cột 3: /ɪd/ (Thêm Âm Tiết: Tiền Đô)', hotkey: '3', color: 'indigo' }
    ],
    words: [
      { word: 'cooked', targetCoda: '/t/', ipa: '/kʊkt/', baseEnd: '/k/', isVoiced: false },
      { word: 'walked', targetCoda: '/t/', ipa: '/wɔːkt/', baseEnd: '/k/', isVoiced: false },
      { word: 'stopped', targetCoda: '/t/', ipa: '/stɒpt/', baseEnd: '/p/', isVoiced: false },
      { word: 'played', targetCoda: '/d/', ipa: '/pleɪd/', baseEnd: '/eɪ/', isVoiced: true },
      { word: 'lived', targetCoda: '/d/', ipa: '/lɪvd/', baseEnd: '/v/', isVoiced: true },
      { word: 'cleaned', targetCoda: '/d/', ipa: '/kliːnd/', baseEnd: '/n/', isVoiced: true },
      { word: 'waited', targetCoda: '/ɪd/', ipa: '/ˈweɪtɪd/', baseEnd: '/t/', isVoiced: false },
      { word: 'needed', targetCoda: '/ɪd/', ipa: '/ˈniːdɪd/', baseEnd: '/d/', isVoiced: true }
    ]
  }
};

/**
 * Validates submissions for a voicing category
 */
export function evaluateVoicingCheck(category = 's_es_endings', submissions = []) {
  const profile = VOICING_RULE_CATALOG[category] || VOICING_RULE_CATALOG.s_es_endings;
  const wordMap = new Map(profile.words.map(w => [w.word, w]));

  const results = [];
  let correctCount = 0;

  submissions.forEach(sub => {
    const wordMeta = wordMap.get(sub.word);
    if (!wordMeta) return;

    const isCorrect = sub.chosenCoda === wordMeta.targetCoda;
    if (isCorrect) correctCount++;

    results.push({
      word: sub.word,
      ipa: wordMeta.ipa,
      chosenCoda: sub.chosenCoda,
      targetCoda: wordMeta.targetCoda,
      isCorrect,
      isVoiced: wordMeta.isVoiced,
      explanation: isCorrect
        ? `Chính xác! Âm cuối "${wordMeta.targetCoda}" tuân theo quy tắc.`
        : `Chưa đúng. Từ "${sub.word}" kết thúc bằng ${wordMeta.targetCoda} vì âm gốc là ${wordMeta.baseEnd}.`
    });
  });

  const total = submissions.length || profile.words.length;
  const score = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  return {
    category: profile.category,
    title: profile.title,
    totalWords: total,
    correctCount,
    score,
    results
  };
}
