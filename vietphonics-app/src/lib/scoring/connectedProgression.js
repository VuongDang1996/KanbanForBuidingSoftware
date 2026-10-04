/**
 * Connected Speech Positional Progression Engine (PRON-206)
 * Progression: Word (Từ đơn) -> Collocation / Phrase (Cụm từ) -> Sentence (Câu)
 * Degradation Alert: Flags when phoneme accuracy drops >15% in longer context.
 */

export const CONNECTED_PROGRESSIONS = {
  'prog_breathe': {
    id: 'prog_breathe',
    targetPhoneme: '/ð/',
    targetName: 'Voiced Dental Fricative (/ð/)',
    steps: [
      {
        stepIndex: 0,
        type: 'word',
        label: 'Từ Đơn (Word)',
        text: 'breathe',
        ipa: '/briːð/',
        description: 'Phát âm chuẩn âm đuôi /ð/ ở cuối từ đơn trước.'
      },
      {
        stepIndex: 1,
        type: 'phrase',
        label: 'Cụm Từ (Phrase)',
        text: 'breathe in deeply',
        ipa: '/ˈbriːð ɪn ˈdiːpli/',
        description: 'Nối âm đuôi /ð/ sang nguyên âm /ɪ/ của từ "in".'
      },
      {
        stepIndex: 2,
        type: 'sentence',
        label: 'Câu Hoàn Chỉnh (Sentence)',
        text: 'Take a moment to breathe in deeply.',
        ipa: '/teɪk ə ˈməʊmənt tə ˈbriːð ɪn ˈdiːpli/',
        description: 'Bảo toàn âm /ð/ khi nói ở tốc độ câu tự nhiên.'
      }
    ]
  },
  'prog_smooth': {
    id: 'prog_smooth',
    targetPhoneme: '/ð/',
    targetName: 'Voiced Dental Fricative (/ð/)',
    steps: [
      {
        stepIndex: 0,
        type: 'word',
        label: 'Từ Đơn (Word)',
        text: 'smooth',
        ipa: '/smuːð/',
        description: 'Ngân dài nguyên âm /uː/ và rung /ð/ dứt khoát.'
      },
      {
        stepIndex: 1,
        type: 'phrase',
        label: 'Cụm Từ (Phrase)',
        text: 'smooth surface',
        ipa: '/smuːð ˈsɜːfɪs/',
        description: 'Chuyển vị giữa âm rung /ð/ và âm xát /s/ đứng kế.'
      },
      {
        stepIndex: 2,
        type: 'sentence',
        label: 'Câu Hoàn Chỉnh (Sentence)',
        text: 'The table has a very smooth surface.',
        ipa: '/ðə ˈteɪbl hæz ə ˈveri smuːð ˈsɜːfɪs/',
        description: 'Duy trì nhịp điệu trọng âm câu.'
      }
    ]
  },
  'prog_cloth': {
    id: 'prog_cloth',
    targetPhoneme: '/θ/',
    targetName: 'Voiceless Dental Fricative (/θ/)',
    steps: [
      {
        stepIndex: 0,
        type: 'word',
        label: 'Từ Đơn (Word)',
        text: 'cloth',
        ipa: '/klɒθ/',
        description: 'Thổi hơi kẹp răng /θ/ dứt khoát ở cuối từ.'
      },
      {
        stepIndex: 1,
        type: 'phrase',
        label: 'Cụm Từ (Phrase)',
        text: 'clean cloth',
        ipa: '/kliːn klɒθ/',
        description: 'Kết hợp cụm 2 từ có phụ âm kép.'
      },
      {
        stepIndex: 2,
        type: 'sentence',
        label: 'Câu Hoàn Chỉnh (Sentence)',
        text: 'Wipe the window with a clean cloth.',
        ipa: '/waɪp ðə ˈwɪndəʊ wɪð ə kliːn klɒθ/',
        description: 'Phát âm tròn trịa trong câu mệnh lệnh.'
      }
    ]
  }
};

/**
 * Evaluates step progression and detects context degradation
 */
export function evaluateProgressionStep({
  progressionId = 'prog_breathe',
  stepIndex = 0,
  score = 85,
  baselineScore = null
}) {
  const prog = CONNECTED_PROGRESSIONS[progressionId] || CONNECTED_PROGRESSIONS.prog_breathe;
  const currentStep = prog.steps[stepIndex] || prog.steps[0];

  const isPassed = score >= 80;
  const hasNextStep = stepIndex < prog.steps.length - 1;
  const canAdvance = isPassed && hasNextStep;

  // Check degradation (AC 3): drop >15% from previous baseline
  let hasDegradation = false;
  let degradationGap = 0;
  let degradationAlert = null;

  if (baselineScore !== null && baselineScore !== undefined && stepIndex > 0) {
    const diff = baselineScore - score;
    if (diff > 15) {
      hasDegradation = true;
      degradationGap = diff;
      degradationAlert = `Bạn đang bị mất âm khi nói dài hơn! Độ chuẩn xác tụt ${diff}% so với bước trước (${baselineScore}% ➔ ${score}%). Hãy giảm tốc độ nói và tập trung vào âm mục tiêu trước!`;
    }
  }

  return {
    progressionId: prog.id,
    targetPhoneme: prog.targetPhoneme,
    stepIndex,
    stepType: currentStep.type,
    text: currentStep.text,
    ipa: currentStep.ipa,
    score,
    isPassed,
    canAdvance,
    nextStepIndex: canAdvance ? stepIndex + 1 : null,
    hasDegradation,
    degradationGap,
    degradationAlert
  };
}
