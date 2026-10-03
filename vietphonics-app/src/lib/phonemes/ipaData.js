/**
 * 44 English IPA Phonemes Definition & Metadata
 * Standards based on International Phonetic Alphabet (IPA) for Received Pronunciation / General American.
 * Specifically annotated with Vietnamese (L1) common interference markers.
 */

export const IPA_PHONEMES = [
  // 12 Monophthongs (Nguyên âm đơn)
  {
    symbol: 'iː',
    category: 'monophthong',
    categoryVi: 'Nguyên Âm Đơn',
    name: 'Long E Sound',
    defaultScore: 86,
    examples: ['sheep', 'see', 'tree'],
    tips: 'Cười mở rộng khóe môi, kéo dài trường độ âm.'
  },
  {
    symbol: 'ɪ',
    category: 'monophthong',
    categoryVi: 'Nguyên Âm Đơn',
    name: 'Short I Sound',
    defaultScore: 81,
    examples: ['ship', 'bit', 'swim'],
    tips: 'Khẩu hình mở tự nhiên hơn /iː/, phát âm dứt khoát nhanh.'
  },
  {
    symbol: 'e',
    category: 'monophthong',
    categoryVi: 'Nguyên Âm Đơn',
    name: 'Short E Sound',
    defaultScore: 75,
    examples: ['bed', 'ten', 'red'],
    tips: 'Mở miệng vừa phải, lưỡi ở vị trí trung gian.'
  },
  {
    symbol: 'æ',
    category: 'monophthong',
    categoryVi: 'Nguyên Âm Đơn',
    name: 'Short A / Ash Sound',
    defaultScore: 61,
    examples: ['bad', 'cat', 'apple'],
    tips: 'Hạ quai hàm sâu hơn /e/, kéo khóe miệng sang hai bên (âm e bẹt).'
  },
  {
    symbol: 'ʌ',
    category: 'monophthong',
    categoryVi: 'Nguyên Âm Đơn',
    name: 'Short U Sound (Strut)',
    defaultScore: 84,
    examples: ['cup', 'bus', 'love'],
    tips: 'Mở miệng tự nhiên, thả lỏng môi giống âm /ă/ tiếng Việt.'
  },
  {
    symbol: 'ɑː',
    category: 'monophthong',
    categoryVi: 'Nguyên Âm Đơn',
    name: 'Long A Sound',
    defaultScore: 88,
    examples: ['father', 'car', 'heart'],
    tips: 'Hạ hàm tối đa, đầu lưỡi thụt sâu về sau cuống họng.'
  },
  {
    symbol: 'ɒ',
    category: 'monophthong',
    categoryVi: 'Nguyên Âm Đơn',
    name: 'Short O Sound',
    defaultScore: 72,
    examples: ['pot', 'hot', 'rock'],
    tips: 'Môi hơi tròn, phát âm dứt khoát trong khoang miệng.'
  },
  {
    symbol: 'ɔː',
    category: 'monophthong',
    categoryVi: 'Nguyên Âm Đơn',
    name: 'Long O Sound',
    defaultScore: 83,
    examples: ['door', 'four', 'call'],
    tips: 'Tròn môi rõ rệt, kéo dài trường độ âm.'
  },
  {
    symbol: 'ʊ',
    category: 'monophthong',
    categoryVi: 'Nguyên Âm Đơn',
    name: 'Short U / Foot Sound',
    defaultScore: 77,
    examples: ['foot', 'book', 'good'],
    tips: 'Môi hơi chu nhẹ, không chu chặt như /uː/.'
  },
  {
    symbol: 'uː',
    category: 'monophthong',
    categoryVi: 'Nguyên Âm Đơn',
    name: 'Long U / Goose Sound',
    defaultScore: 85,
    examples: ['boot', 'blue', 'food'],
    tips: 'Môi chu tròn hẳn, hơi phát ra dài và sâu.'
  },
  {
    symbol: 'ɜː',
    category: 'monophthong',
    categoryVi: 'Nguyên Âm Đơn',
    name: 'Long Schwa / Nurse Sound',
    defaultScore: 69,
    examples: ['bird', 'girl', 'nurse'],
    tips: 'Lưỡi cong nhẹ ở giữa khoang miệng, giữ trường độ đều.'
  },
  {
    symbol: 'ə',
    category: 'monophthong',
    categoryVi: 'Nguyên Âm Đơn',
    name: 'Schwa Sound',
    defaultScore: 68,
    examples: ['teacher', 'banana', 'about'],
    tips: 'Âm lướt phổ biến nhất trong tiếng Anh, cơ miệng hoàn toàn thả lỏng.'
  },

  // 8 Diphthongs (Nguyên âm đôi)
  {
    symbol: 'eɪ',
    category: 'diphthong',
    categoryVi: 'Nguyên Âm Đôi',
    name: 'Face Diphthong',
    defaultScore: 89,
    examples: ['face', 'day', 'make'],
    tips: 'Trượt từ /e/ lướt nhẹ sang /ɪ/.'
  },
  {
    symbol: 'aɪ',
    category: 'diphthong',
    categoryVi: 'Nguyên Âm Đôi',
    name: 'Price Diphthong',
    defaultScore: 91,
    examples: ['price', 'time', 'high'],
    tips: 'Mở to /a/ rồi thu nhỏ dần về /ɪ/.'
  },
  {
    symbol: 'ɔɪ',
    category: 'diphthong',
    categoryVi: 'Nguyên Âm Đôi',
    name: 'Choice Diphthong',
    defaultScore: 85,
    examples: ['choice', 'boy', 'voice'],
    tips: 'Tròn môi ở /ɔ/ rồi kéo dẹt sang /ɪ/.'
  },
  {
    symbol: 'aʊ',
    category: 'diphthong',
    categoryVi: 'Nguyên Âm Đôi',
    name: 'Mouth Diphthong',
    defaultScore: 82,
    examples: ['mouth', 'now', 'house'],
    tips: 'Hạ hàm phát âm /a/ rồi chu môi hướng về /ʊ/.'
  },
  {
    symbol: 'əʊ',
    category: 'diphthong',
    categoryVi: 'Nguyên Âm Đôi',
    name: 'Goat Diphthong',
    defaultScore: 70,
    examples: ['goat', 'home', 'show'],
    tips: 'Bắt đầu từ âm schwa thả lỏng rồi tròn môi kết thúc.'
  },
  {
    symbol: 'ɪə',
    category: 'diphthong',
    categoryVi: 'Nguyên Âm Đôi',
    name: 'Near Diphthong',
    defaultScore: 74,
    examples: ['near', 'here', 'ear'],
    tips: 'Bắt đầu từ /ɪ/ lướt thả lỏng về /ə/.'
  },
  {
    symbol: 'eə',
    category: 'diphthong',
    categoryVi: 'Nguyên Âm Đôi',
    name: 'Square Diphthong',
    defaultScore: 67,
    examples: ['hair', 'care', 'there'],
    tips: 'Bắt đầu từ /e/ mở rộng miệng rồi trôi về schwa /ə/.'
  },
  {
    symbol: 'ʊə',
    category: 'diphthong',
    categoryVi: 'Nguyên Âm Đôi',
    name: 'Cure Diphthong',
    defaultScore: 80,
    examples: ['cure', 'pure', 'tour'],
    tips: 'Bắt đầu chu môi /ʊ/ rồi thả lỏng về /ə/.'
  },

  // 24 Consonants (Phụ âm)
  {
    symbol: 'p',
    category: 'consonant',
    categoryVi: 'Phụ Âm',
    name: 'Voiceless Bilabial Plosive',
    defaultScore: 88,
    examples: ['pen', 'stop', 'paper'],
    tips: 'Bật hơi mạnh qua hai môi, thanh quản không rung.'
  },
  {
    symbol: 'b',
    category: 'consonant',
    categoryVi: 'Phụ Âm',
    name: 'Voiced Bilabial Plosive',
    defaultScore: 84,
    examples: ['bad', 'cab', 'book'],
    tips: 'Mím chặt hai môi và làm rung dây thanh quản khi bật âm.'
  },
  {
    symbol: 't',
    category: 'consonant',
    categoryVi: 'Phụ Âm',
    name: 'Voiceless Alveolar Plosive',
    defaultScore: 83,
    examples: ['tea', 'cat', 'time'],
    tips: 'Đầu lưỡi chạm nướu răng trên, bật hơi dứt khoát không nuốt âm đuôi.'
  },
  {
    symbol: 'd',
    category: 'consonant',
    categoryVi: 'Phụ Âm',
    name: 'Voiced Alveolar Plosive',
    defaultScore: 81,
    examples: ['did', 'dog', 'middle'],
    tips: 'Đầu lưỡi chạm nướu trên và rung thanh quản.'
  },
  {
    symbol: 'k',
    category: 'consonant',
    categoryVi: 'Phụ Âm',
    name: 'Voiceless Velar Plosive',
    defaultScore: 86,
    examples: ['cat', 'key', 'back'],
    tips: 'Cuống lưỡi nâng chạm vòm họng mềm, bật hơi mạnh ra ngoài.'
  },
  {
    symbol: 'g',
    category: 'consonant',
    categoryVi: 'Phụ Âm',
    name: 'Voiced Velar Plosive',
    defaultScore: 82,
    examples: ['got', 'give', 'bag'],
    tips: 'Cuống lưỡi chặn khí và rung thanh quản.'
  },
  {
    symbol: 'f',
    category: 'consonant',
    categoryVi: 'Phụ Âm',
    name: 'Voiceless Labiodental Fricative',
    defaultScore: 85,
    examples: ['fall', 'leaf', 'phone'],
    tips: 'Răng cửa trên chạm nhẹ môi dưới, đẩy luồng khí ma sát thoát ra.'
  },
  {
    symbol: 'v',
    category: 'consonant',
    categoryVi: 'Phụ Âm',
    name: 'Voiced Labiodental Fricative',
    defaultScore: 80,
    examples: ['voice', 'live', 'travel'],
    tips: 'Khẩu hình giống /f/ nhưng rung dây thanh quản, tránh lẫn sang /j/ (d).'
  },
  {
    symbol: 'θ',
    category: 'consonant',
    categoryVi: 'Phụ Âm',
    name: 'Voiceless Dental Fricative (Cần khắc phục)',
    defaultScore: 54, // Weak sound < 60%
    examples: ['think', 'path', 'math'],
    tips: 'Đặt đầu lưỡi giữa hai hàm răng, thổi luồng khí nhẹ qua kẽ răng. Tuyệt đối không thay bằng /t/ hay /s/.'
  },
  {
    symbol: 'ð',
    category: 'consonant',
    categoryVi: 'Phụ Âm',
    name: 'Voiced Dental Fricative',
    defaultScore: 64,
    examples: ['this', 'mother', 'breathe'],
    tips: 'Đầu lưỡi kẹp nhẹ giữa hai răng và rung dây thanh quản.'
  },
  {
    symbol: 's',
    category: 'consonant',
    categoryVi: 'Phụ Âm',
    name: 'Voiceless Alveolar Fricative',
    defaultScore: 86,
    examples: ['see', 'city', 'miss'],
    tips: 'Hai răng khép gần sát, đẩy luồng khí xì sắc bén.'
  },
  {
    symbol: 'z',
    category: 'consonant',
    categoryVi: 'Phụ Âm',
    name: 'Voiced Alveolar Fricative',
    defaultScore: 81,
    examples: ['zoo', 'lazy', 'buzz'],
    tips: 'Khẩu hình giống /s/ kèm theo độ rung rè mạnh ở cổ họng.'
  },
  {
    symbol: 'ʃ',
    category: 'consonant',
    categoryVi: 'Phụ Âm',
    name: 'Voiceless Postalveolar Fricative (Cần khắc phục)',
    defaultScore: 58, // Weak sound < 60%
    examples: ['shoe', 'sugar', 'wish'],
    tips: 'Môi hơi chu nhẹ ra trước, thân lưỡi nâng gần vòm miệng thổi luồng khí êm dịu.'
  },
  {
    symbol: 'ʒ',
    category: 'consonant',
    categoryVi: 'Phụ Âm',
    name: 'Voiced Postalveolar Fricative',
    defaultScore: 62,
    examples: ['vision', 'measure', 'beige'],
    tips: 'Khẩu hình tương tự /ʃ/ kết hợp rung thanh quản.'
  },
  {
    symbol: 'h',
    category: 'consonant',
    categoryVi: 'Phụ Âm',
    name: 'Voiceless Glottal Fricative',
    defaultScore: 90,
    examples: ['hat', 'ahead', 'home'],
    tips: 'Thở luồng hơi nhẹ từ thanh môn không tạo cản trở khoang miệng.'
  },
  {
    symbol: 'tʃ',
    category: 'consonant',
    categoryVi: 'Phụ Âm',
    name: 'Voiceless Postalveolar Affricate',
    defaultScore: 72,
    examples: ['chin', 'match', 'picture'],
    tips: 'Bắt đầu chặn khí như /t/ rồi bật nhanh sang luồng ma sát /ʃ/.'
  },
  {
    symbol: 'dʒ',
    category: 'consonant',
    categoryVi: 'Phụ Âm',
    name: 'Voiced Postalveolar Affricate (Cần khắc phục)',
    defaultScore: 55, // Weak sound < 60%
    examples: ['joy', 'gym', 'edge'],
    tips: 'Chặn khí như /d/ rồi bật sang /ʒ/ đồng thời rung mạnh dây thanh quản.'
  },
  {
    symbol: 'm',
    category: 'consonant',
    categoryVi: 'Phụ Âm',
    name: 'Bilabial Nasal',
    defaultScore: 94,
    examples: ['man', 'some', 'summer'],
    tips: 'Hai môi ngậm kín, luồng hơi thoát hoàn toàn qua mũi.'
  },
  {
    symbol: 'n',
    category: 'consonant',
    categoryVi: 'Phụ Âm',
    name: 'Alveolar Nasal',
    defaultScore: 93,
    examples: ['no', 'sun', 'funny'],
    tips: 'Đầu lưỡi áp sát nướu răng trên, thoát hơi qua mũi. Tránh lẫn với /l/.'
  },
  {
    symbol: 'ŋ',
    category: 'consonant',
    categoryVi: 'Phụ Âm',
    name: 'Velar Nasal',
    defaultScore: 87,
    examples: ['sing', 'ring', 'long'],
    tips: 'Cuống lưỡi nâng chạm vòm họng mềm, thoát hơi qua mũi.'
  },
  {
    symbol: 'l',
    category: 'consonant',
    categoryVi: 'Phụ Âm',
    name: 'Alveolar Lateral Approximant',
    defaultScore: 81,
    examples: ['leg', 'bell', 'light'],
    tips: 'Đầu lưỡi đặt ở chân răng trên, luồng hơi thoát ra hai bên thân lưỡi.'
  },
  {
    symbol: 'r',
    category: 'consonant',
    categoryVi: 'Phụ Âm',
    name: 'Post-alveolar Approximant',
    defaultScore: 78,
    examples: ['red', 'ring', 'right'],
    tips: 'Đầu lưỡi cong nhẹ về sau nhưng không chạm vào vòm họng.'
  },
  {
    symbol: 'w',
    category: 'consonant',
    categoryVi: 'Phụ Âm',
    name: 'Labio-velar Approximant',
    defaultScore: 89,
    examples: ['wet', 'win', 'away'],
    tips: 'Tròn môi chu nhỏ rồi mở nhanh sang nguyên âm kế tiếp.'
  },
  {
    symbol: 'j',
    category: 'consonant',
    categoryVi: 'Phụ Âm',
    name: 'Palatal Approximant',
    defaultScore: 90,
    examples: ['yes', 'yellow', 'cure'],
    tips: 'Thân lưỡi nâng sát vòm miệng cứng, lướt nhanh tương tự bán nguyên âm.'
  }
];

/**
 * Determine score tier & visual representation
 * Gate B / AC 2:
 * - >= 85%: Emerald (Mastered)
 * - 60 - 84%: Amber (In Progress)
 * - < 60%: Rose (Weak / Warning)
 */
export function getPhonemeTier(score) {
  if (score >= 85) {
    return {
      tier: 'mastered',
      label: 'Làm Chủ',
      badgeColor: 'emerald',
      bgClass: 'bg-emerald-50 text-emerald-800 border-emerald-300 ring-1 ring-emerald-400/40',
      isWarning: false
    };
  }
  if (score >= 60) {
    return {
      tier: 'progress',
      label: 'Đang Luyện',
      badgeColor: 'amber',
      bgClass: 'bg-amber-50 text-amber-800 border-amber-300 ring-1 ring-amber-400/40',
      isWarning: false
    };
  }
  return {
    tier: 'weak',
    label: 'Cần Khắc Phục',
    badgeColor: 'rose',
    bgClass: 'bg-rose-50 text-rose-800 border-rose-400 ring-2 ring-rose-500 font-black shadow-xs',
    isWarning: true
  };
}

/**
 * Summarize statistics across 44 phonemes
 */
export function summarizePhonemes(phonemesList) {
  const totalCount = phonemesList.length;
  let masteredCount = 0;
  let progressCount = 0;
  let weakCount = 0;
  let totalScore = 0;

  for (const p of phonemesList) {
    const s = Number(p.score ?? p.defaultScore ?? 0);
    totalScore += s;
    if (s >= 85) masteredCount++;
    else if (s >= 60) progressCount++;
    else weakCount++;
  }

  const averageScore = totalCount > 0 ? Math.round(totalScore / totalCount) : 0;

  return {
    totalCount,
    masteredCount,
    progressCount,
    weakCount,
    averageScore
  };
}
