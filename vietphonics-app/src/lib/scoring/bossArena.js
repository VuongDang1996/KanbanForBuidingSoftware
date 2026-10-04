/**
 * Auditory Discrimination Boss Arenas & Turn-Based Minimal Pair Counter-Spells (GAME-103)
 * Manages RPG Boss Encounters, minimal pair turn generation, 3.5s timer validation,
 * damage calculations, and L1 Vietnamese acoustic duration magnifier tips.
 */

export const BOSS_ENCOUNTERS = [
  {
    id: 'boss_titan_t',
    name: 'The Final-T Titan',
    title: 'Cự Nhân Âm Đuôi Tinh Thạch',
    element: 'earth',
    maxHp: 100,
    avatarUrl: '/avatars/boss_titan.png',
    deck: [
      {
        turnIndex: 1,
        targetWord: 'beat',
        targetIpa: '/biːt/',
        phoneticFocus: '/iː/ vs /ɪ/',
        audioCueText: 'beat',
        options: [
          { index: 1, word: 'bit', ipa: '/bɪt/', durationMs: 85, isCorrect: false },
          { index: 2, word: 'beat', ipa: '/biːt/', durationMs: 220, isCorrect: true }
        ],
        magnifierTip: "Âm /iː/ trong 'beat' kéo dài 220ms, miệng cười bè căng mép; khác với âm /ɪ/ trong 'bit' chỉ kéo dài 85ms cơ miệng thả lỏng."
      },
      {
        turnIndex: 2,
        targetWord: 'seat',
        targetIpa: '/siːt/',
        phoneticFocus: 'Ending /t/ vs /d/',
        audioCueText: 'seat',
        options: [
          { index: 1, word: 'seat', ipa: '/siːt/', durationMs: 190, isCorrect: true },
          { index: 2, word: 'seed', ipa: '/siːd/', durationMs: 280, isCorrect: false }
        ],
        magnifierTip: "Âm /t/ vô thanh làm nguyên âm đứng trước bị rút ngắn (190ms); trong khi /d/ hữu thanh kéo dài nguyên âm lên 280ms."
      },
      {
        turnIndex: 3,
        targetWord: 'ship',
        targetIpa: '/ʃɪp/',
        phoneticFocus: '/ɪ/ vs /iː/',
        audioCueText: 'ship',
        options: [
          { index: 1, word: 'ship', ipa: '/ʃɪp/', durationMs: 80, isCorrect: true },
          { index: 2, word: 'sheep', ipa: '/ʃiːp/', durationMs: 230, isCorrect: false }
        ],
        magnifierTip: "Âm /ɪ/ trong 'ship' ngắn dứt khoát 80ms; âm /iː/ trong 'sheep' ngân dài 230ms với khóe môi mở rộng."
      }
    ]
  },
  {
    id: 'boss_vowel_chimera',
    name: 'The Vowel Chimera',
    title: 'Huyễn Thú Nguyên Âm Biến Ảo',
    element: 'fire',
    maxHp: 100,
    avatarUrl: '/avatars/boss_chimera.png',
    deck: [
      {
        turnIndex: 1,
        targetWord: 'bad',
        targetIpa: '/bæd/',
        phoneticFocus: '/æ/ vs /e/',
        audioCueText: 'bad',
        options: [
          { index: 1, word: 'bed', ipa: '/bed/', durationMs: 110, isCorrect: false },
          { index: 2, word: 'bad', ipa: '/bæd/', durationMs: 240, isCorrect: true }
        ],
        magnifierTip: "Âm /æ/ trong 'bad' hạ hàm sâu 3 ngón tay, mở rộng khoang miệng; khác với âm /e/ trong 'bed' chỉ mở vừa phải."
      },
      {
        turnIndex: 2,
        targetWord: 'cup',
        targetIpa: '/kʌp/',
        phoneticFocus: '/ʌ/ vs /ɑː/',
        audioCueText: 'cup',
        options: [
          { index: 1, word: 'cup', ipa: '/kʌp/', durationMs: 95, isCorrect: true },
          { index: 2, word: 'cap', ipa: '/kæp/', durationMs: 210, isCorrect: false }
        ],
        magnifierTip: "Âm /ʌ/ trong 'cup' là nguyên âm ngắn ở giữa vòm miệng; 'cap' dùng /æ/ bành miệng bè ngang."
      }
    ]
  }
];

export function getBossEncounters() {
  return BOSS_ENCOUNTERS;
}

export function getBossEncounterById(bossId) {
  return BOSS_ENCOUNTERS.find((b) => b.id === bossId) || BOSS_ENCOUNTERS[0];
}

/**
 * Evaluate Turn In Boss Fight
 */
export function evaluateBossTurn({
  bossId = 'boss_titan_t',
  turnIndex = 1,
  selectedOptionIndex = 1,
  currentBossHp = 100,
  currentPlayerHp = 100,
  timeTakenSec = 2.0
}) {
  const boss = getBossEncounterById(bossId);
  const turnData = boss.deck.find((d) => d.turnIndex === Number(turnIndex)) || boss.deck[0];
  const selectedOption = turnData.options.find((o) => o.index === Number(selectedOptionIndex));

  const isTimeout = Number(timeTakenSec) > 3.5;
  const isCorrect = !isTimeout && Boolean(selectedOption && selectedOption.isCorrect);

  let damageDealt = 0;
  let damageTaken = 0;
  let newBossHp = currentBossHp;
  let newPlayerHp = currentPlayerHp;

  if (isCorrect) {
    // Player deals 35 damage to Boss
    damageDealt = 35;
    newBossHp = Math.max(0, currentBossHp - damageDealt);
  } else {
    // Boss counters, deals 25 damage to Player
    damageTaken = 25;
    newPlayerHp = Math.max(0, currentPlayerHp - damageTaken);
  }

  const isBossDefeated = newBossHp <= 0;
  const isPlayerDefeated = newPlayerHp <= 0;

  return {
    bossId: boss.id,
    bossName: boss.name,
    turnIndex: turnData.turnIndex,
    targetWord: turnData.targetWord,
    targetIpa: turnData.targetIpa,
    selectedWord: selectedOption ? selectedOption.word : 'TIMEOUT',
    isCorrect,
    isTimeout,
    timeTakenSec: Number(timeTakenSec),
    damageDealt,
    damageTaken,
    newBossHp,
    newPlayerHp,
    isBossDefeated,
    isPlayerDefeated,
    magnifierTip: turnData.magnifierTip,
    soundEffect: isCorrect ? 'sword_slash_critical' : 'boss_counter_crush',
    screenShake: isCorrect // Triggers UI Screen Shake on critical hit
  };
}
