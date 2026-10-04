/**
 * 3-Tier Positional Phoneme Ladder (PRON-205)
 * Progression ladder across 3 allophonic positions:
 * Tier 1: Initial (Đầu từ) -> Tier 2: Medial (Giữa từ) -> Tier 3: Final (Cuối từ).
 */

export const POSITIONAL_LADDER_CATALOG = {
  '/z/': {
    phoneme: '/z/',
    name: 'Voiced Alveolar Fricative (Âm Rung /z/)',
    l1FinalWarning: '85% người Việt nuốt âm /z/ ở vị trí cuối từ (biến thành âm câm hoặc đọc nhầm sang /s/ vô thanh)! Hãy duy trì luồng hơi rung dây thanh quản đến tận mili-giây cuối cùng.',
    tiers: [
      {
        tier: 1,
        position: 'initial',
        label: 'Vị Trí Đầu Từ (Initial) — Dễ Nhất',
        description: 'Âm /z/ đứng ở đầu từ, dễ kiểm soát độ rung nhất.',
        words: [
          { word: 'zoo', ipa: '/zuː/' },
          { word: 'zero', ipa: '/ˈzɪərəʊ/' },
          { word: 'zone', ipa: '/zəʊn/' }
        ]
      },
      {
        tier: 2,
        position: 'medial',
        label: 'Vị Trí Giữa Từ (Medial) — Trung Bình',
        description: 'Âm /z/ kẹp giữa 2 nguyên âm, cần giữ rung liên tục mà không ngắt hơi.',
        words: [
          { word: 'music', ipa: '/ˈmjuːzɪk/' },
          { word: 'lazy', ipa: '/ˈleɪzi/' },
          { word: 'easy', ipa: '/ˈiːzi/' }
        ]
      },
      {
        tier: 3,
        position: 'final',
        label: 'Vị Trí Cuối Từ (Final) — Khó Nhất',
        description: 'Âm /z/ ở cuối từ (Coda), bẫy nuốt âm nặng nhất của người Việt.',
        words: [
          { word: 'buzz', ipa: '/bʌz/' },
          { word: 'please', ipa: '/pliːz/' },
          { word: 'rose', ipa: '/rəʊz/' }
        ]
      }
    ]
  },
  '/θ/': {
    phoneme: '/θ/',
    name: 'Voiceless Dental Fricative (Âm Thổi /θ/)',
    l1FinalWarning: 'Ở cuối từ, người Việt thường rụt lưỡi vào trong và đọc thành /t/ (e.g. "bath" -> "bát"). Hãy giữ đầu lưỡi kẹp nhẹ ngoài răng cửa cho đến khi dứt âm!',
    tiers: [
      {
        tier: 1,
        position: 'initial',
        label: 'Vị Trí Đầu Từ (Initial)',
        description: 'Kẹp đầu lưỡi đẩy hơi trước khi vào nguyên âm.',
        words: [
          { word: 'think', ipa: '/θɪŋk/' },
          { word: 'three', ipa: '/θriː/' },
          { word: 'thank', ipa: '/θæŋk/' }
        ]
      },
      {
        tier: 2,
        position: 'medial',
        label: 'Vị Trí Giữa Từ (Medial)',
        description: 'Chuyển vị nhanh giữa các âm tiết.',
        words: [
          { word: 'method', ipa: '/ˈmeθəd/' },
          { word: 'author', ipa: '/ˈɔːθər/' },
          { word: 'birthday', ipa: '/ˈbɜːθdeɪ/' }
        ]
      },
      {
        tier: 3,
        position: 'final',
        label: 'Vị Trí Cuối Từ (Final)',
        description: 'Duy trì luồng hơi xát răng cuối từ.',
        words: [
          { word: 'bath', ipa: '/bɑːθ/' },
          { word: 'breath', ipa: '/breθ/' },
          { word: 'south', ipa: '/saʊθ/' }
        ]
      }
    ]
  },
  '/l/': {
    phoneme: '/l/',
    name: 'Alveolar Lateral Approximant (Âm /l/)',
    l1FinalWarning: 'Âm Dark L [ɫ] ở cuối từ yêu cầu nâng cuống lưỡi lên vòm mềm (velarization), người Việt hay nuốt hoàn toàn hoặc biến thành "u/ô" (e.g. "school" -> "s-ku").',
    tiers: [
      {
        tier: 1,
        position: 'initial',
        label: 'Vị Trí Đầu Từ (Light L)',
        description: 'Đầu lưỡi chạm nướu răng trên rồi bung ra.',
        words: [
          { word: 'light', ipa: '/laɪt/' },
          { word: 'love', ipa: '/lʌv/' },
          { word: 'look', ipa: '/lʊk/' }
        ]
      },
      {
        tier: 2,
        position: 'medial',
        label: 'Vị Trí Giữa Từ (Medial L)',
        description: 'Liên kết mượt mà giữa hai âm tiết.',
        words: [
          { word: 'yellow', ipa: '/ˈjeləʊ/' },
          { word: 'follow', ipa: '/ˈfɒləʊ/' },
          { word: 'pilot', ipa: '/ˈpaɪlət/' }
        ]
      },
      {
        tier: 3,
        position: 'final',
        label: 'Vị Trí Cuối Từ (Dark L [ɫ])',
        description: 'Nâng cuống lưỡi về vòm họng mềm.',
        words: [
          { word: 'call', ipa: '/kɔːl/' },
          { word: 'feel', ipa: '/fiːl/' },
          { word: 'school', ipa: '/skuːl/' }
        ]
      }
    ]
  }
};

/**
 * Calculates star rating from numerical score
 */
export function calculateTierStars(score = 0) {
  if (score >= 85) return 3;
  if (score >= 70) return 2;
  if (score >= 50) return 1;
  return 0;
}

/**
 * Evaluates ladder progress and checks whether subsequent tiers unlock
 */
export function evaluateLadderProgression(tier1Score = 0, tier2Score = 0, tier3Score = 0) {
  const t1Stars = calculateTierStars(tier1Score);
  const t2Stars = calculateTierStars(tier2Score);
  const t3Stars = calculateTierStars(tier3Score);

  // Tier 1 is always unlocked.
  // Tier 2 unlocks if Tier 1 score >= 80 (or >= 2 stars with high quality)
  const isTier2Unlocked = tier1Score >= 80;
  // Tier 3 unlocks if Tier 2 score >= 80
  const isTier3Unlocked = isTier2Unlocked && (tier2Score >= 80);

  const totalStars = t1Stars + t2Stars + t3Stars;
  const isAllMastered = totalStars === 9;

  return {
    tier1: { score: tier1Score, stars: t1Stars, isUnlocked: true },
    tier2: { score: tier2Score, stars: t2Stars, isUnlocked: isTier2Unlocked },
    tier3: { score: tier3Score, stars: t3Stars, isUnlocked: isTier3Unlocked },
    totalStars,
    isAllMastered
  };
}
