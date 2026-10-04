/**
 * Multi-Tier Level Progression & 4-World Map Engine (GAME-101)
 * Manages 4 RPG worlds (Vowel Isle, Final Consonant Bay, Stress Peak, Fluency Citadel),
 * 3-star completion criteria, sequential unlocks, and diamond rewards.
 */

export const GAME_WORLDS = [
  {
    id: 'world_1',
    code: 'WORLD_1',
    name: 'Đảo Nguyên Âm',
    englishName: 'Vowel Isle',
    themeColor: 'cyan',
    bgColor: 'from-cyan-900 to-slate-900',
    description: 'Vùng biển ngọc với các sinh vật phát âm nguyên âm đơn và nguyên âm đôi.',
    requiredStarsToUnlock: 0,
    stages: [
      { id: 'stage_1_1', name: 'Ải 1.1: Bờ Biển /iː/ vs /ɪ/', targetPhonemes: ['/iː/', '/ɪ/'], monster: 'Cua Xanh Sheep-Ship', boss: false, rewardGems: 30 },
      { id: 'stage_1_2', name: 'Ải 1.2: Đầm Lầy /æ/ vs /e/', targetPhonemes: ['/æ/', '/e/'], monster: 'Ếch Gai Bat-Bet', boss: false, rewardGems: 35 },
      { id: 'stage_1_3', name: 'Ải 1.3: Rừng Trúc /ʌ/ vs /ɑː/', targetPhonemes: ['/ʌ/', '/ɑː/'], monster: 'Gấu Trúc Cup-Cap', boss: false, rewardGems: 40 },
      { id: 'stage_1_4', name: 'Ải 1.4: Hang Động Nguyên Âm Đôi', targetPhonemes: ['/eɪ/', '/aɪ/'], monster: 'Rắn Cổ Late-Light', boss: false, rewardGems: 45 },
      { id: 'stage_1_5', name: 'Ải 1.5: Trùm Đảo Vua Hải Mã Vowel', targetPhonemes: ['/iː/', '/ɪ/', '/æ/'], monster: 'Trùm Vua Hải Mã', boss: true, rewardGems: 100 }
    ]
  },
  {
    id: 'world_2',
    code: 'WORLD_2',
    name: 'Vịnh Âm Đuôi',
    englishName: 'Final Consonant Bay',
    themeColor: 'emerald',
    bgColor: 'from-emerald-900 to-slate-900',
    description: 'Thung lũng xanh mướt - nơi người Việt dễ trượt đòn nhất vì thói quen rụng âm cuối.',
    requiredStarsToUnlock: 8,
    stages: [
      { id: 'stage_2_1', name: 'Ải 2.1: Bãi Đá Âm Gió /s/ vs /z/', targetPhonemes: ['/s/', '/z/'], monster: 'Bọ Cạp Peace-Peas', boss: false, rewardGems: 35 },
      { id: 'stage_2_2', name: 'Ải 2.2: Rạn San Hô Chặn /t/ vs /d/', targetPhonemes: ['/t/', '/d/'], monster: 'Bạch Tuộc Seat-Seed', boss: false, rewardGems: 40 },
      { id: 'stage_2_3', name: 'Ải 2.3: Khe Nứt Cụm /ks/ Bứt Phá', targetPhonemes: ['/ks/'], monster: 'Golem Đá Vụn Six-Sick', boss: false, rewardGems: 50 },
      { id: 'stage_2_4', name: 'Ải 2.4: Mũi Neo Vô Thanh /k/ vs /p/', targetPhonemes: ['/k/', '/p/'], monster: 'Nhạn Biển Back-Bag', boss: false, rewardGems: 45 },
      { id: 'stage_2_5', name: 'Ải 2.5: Trùm Vịnh Leviathan Âm Đuôi', targetPhonemes: ['/ks/', '/t/', '/d/'], monster: 'Trùm Thủy Quái Leviathan', boss: true, rewardGems: 120 }
    ]
  },
  {
    id: 'world_3',
    code: 'WORLD_3',
    name: 'Núi Trọng Âm',
    englishName: 'Stress Peak',
    themeColor: 'purple',
    bgColor: 'from-purple-900 to-slate-900',
    description: 'Vùng núi lửa tím kiểm tra lực nhấn trọng âm đa âm tiết và ngữ điệu.',
    requiredStarsToUnlock: 18,
    stages: [
      { id: 'stage_3_1', name: 'Ải 3.1: Dốc Trọng Âm Đầu 2 Âm Tiết', targetPhonemes: ['stress_1st'], monster: 'Sói Lửa Present (N)', boss: false, rewardGems: 40 },
      { id: 'stage_3_2', name: 'Ải 3.2: Vực Trọng Âm Hai 2 Âm Tiết', targetPhonemes: ['stress_2nd'], monster: 'Đại Bàng Tro Present (V)', boss: false, rewardGems: 45 },
      { id: 'stage_3_3', name: 'Ải 3.3: Thác Dung Nham 3 Âm Tiết', targetPhonemes: ['stress_3rd'], monster: 'Kỳ Lân Lửa Fantastic', boss: false, rewardGems: 55 },
      { id: 'stage_3_4', name: 'Ải 3.4: Miệng Núi Lửa Nhấn Hậu Tố -ic/-tion', targetPhonemes: ['suffix_rules'], monster: 'Khổng Lồ Nham Thạch', boss: false, rewardGems: 60 },
      { id: 'stage_3_5', name: 'Ải 3.5: Trùm Phượng Hoàng Lửa Trọng Âm', targetPhonemes: ['multi_syllable'], monster: 'Trùm Phượng Hoàng Ignis', boss: true, rewardGems: 150 }
    ]
  },
  {
    id: 'world_4',
    code: 'WORLD_4',
    name: 'Đền Thờ Phản Xạ',
    englishName: 'Fluency Citadel',
    themeColor: 'amber',
    bgColor: 'from-amber-900 to-slate-900',
    description: 'Đền cổ vàng kim thử thách nối âm, nuốt âm và nhịp điệu nói chuẩn bản ngữ.',
    requiredStarsToUnlock: 30,
    stages: [
      { id: 'stage_4_1', name: 'Ải 4.1: Cổng Đền Nối Phụ Âm Sang Nguyên Âm', targetPhonemes: ['linking_c_v'], monster: 'Hộ Vệ Pick it up', boss: false, rewardGems: 50 },
      { id: 'stage_4_2', name: 'Ải 4.2: Hành Lang Nối Nguyên Âm /w/ & /j/', targetPhonemes: ['linking_glide'], monster: 'Nhân Sư Go on', boss: false, rewardGems: 55 },
      { id: 'stage_4_3', name: 'Ải 4.3: Hầm Ngầm Giảm Âm Yếu Schwa /ə/', targetPhonemes: ['reduced_schwa'], monster: 'Bóng Ma Cup of tea', boss: false, rewardGems: 65 },
      { id: 'stage_4_4', name: 'Ải 4.4: Đài Trăng Đồng Hóa Âm (Assimilation)', targetPhonemes: ['assimilation'], monster: 'Hiệp Sĩ Don\'t you', boss: false, rewardGems: 70 },
      { id: 'stage_4_5', name: 'Ải 4.5: Đại Trùm Thần Rồng Phản Xạ Hoàng Kim', targetPhonemes: ['connected_speech'], monster: 'Đại Trùm Rồng Vàng Aurelius', boss: true, rewardGems: 200 }
    ]
  }
];

export function getGameWorlds() {
  return GAME_WORLDS;
}

export function getGameWorldById(worldId) {
  return GAME_WORLDS.find((w) => w.id === worldId) || GAME_WORLDS[0];
}

/**
 * 3-Star Grading Formula:
 * - 3 stars: score >= 85
 * - 2 stars: score >= 70
 * - 1 star:  score >= 50
 * - 0 stars: score < 50
 */
export function calculateStageStars(score) {
  const s = Number(score) || 0;
  if (s >= 85) return 3;
  if (s >= 70) return 2;
  if (s >= 50) return 1;
  return 0;
}

/**
 * Evaluate Stage Completion & Calculate Progression
 */
export function evaluateStageCompletion({
  worldId = 'world_1',
  stageId = 'stage_1_1',
  score = 90,
  currentTotalStars = 0
}) {
  const stars = calculateStageStars(score);
  const isPassed = stars >= 1;
  const world = getGameWorldById(worldId);
  const stageIndex = world.stages.findIndex((s) => s.id === stageId);
  const currentStage = world.stages[stageIndex] || world.stages[0];

  let gemReward = 0;
  if (stars === 3) gemReward = currentStage.rewardGems;
  else if (stars === 2) gemReward = Math.round(currentStage.rewardGems * 0.7);
  else if (stars === 1) gemReward = Math.round(currentStage.rewardGems * 0.4);

  let nextStageId = null;
  let nextWorldUnlocked = false;

  if (isPassed) {
    if (stageIndex >= 0 && stageIndex < world.stages.length - 1) {
      nextStageId = world.stages[stageIndex + 1].id;
    } else {
      // Completed final stage of world
      const nextWorldIndex = GAME_WORLDS.findIndex((w) => w.id === worldId) + 1;
      if (nextWorldIndex < GAME_WORLDS.length) {
        const nextWorld = GAME_WORLDS[nextWorldIndex];
        const newTotalStars = currentTotalStars + stars;
        if (newTotalStars >= nextWorld.requiredStarsToUnlock) {
          nextWorldUnlocked = true;
          nextStageId = nextWorld.stages[0].id;
        }
      }
    }
  }

  return {
    worldId,
    stageId,
    score: Number(score),
    stars,
    isPassed,
    gemReward,
    nextStageId,
    nextWorldUnlocked,
    feedbackText: stars === 3
      ? 'XUẤT SẮC 3 SAO! Bạn đã làm chủ hoàn toàn âm vị này!'
      : stars === 2
      ? 'ĐẠT 2 SAO! Phát âm rõ ràng, luyện thêm chút để đạt 3 sao hoàn hảo.'
      : stars === 1
      ? 'ĐẠT 1 SAO! Vừa đủ qua ải, cần bật rõ hơn các phụ âm đích.'
      : 'CHƯA ĐẠT! Hãy nghe lại mẫu chuẩn và thử sức lần nữa.'
  };
}
