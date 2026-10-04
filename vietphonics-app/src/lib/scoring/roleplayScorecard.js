/**
 * Post-Roleplay Comprehensive Scorecard Engine (ELSA-302)
 * Evaluates 5 core communicative pillars (Pronunciation, Fluency, Grammar, Workplace Vocabulary, Meeting Objectives),
 * produces Bento Grid metrics, formats full transcripts with replay markers, and manages Error Bank exports.
 */

export function calculateRoleplayScorecard({
  sessionId = 'session_default',
  pronunciationScore = 85,
  fluencyScore = 90,
  grammarScore = 88,
  vocabularyScore = 92,
  objectiveScore = 100,
  transcriptTurns = [],
  detectedErrors = []
}) {
  const p = Math.max(0, Math.min(100, Number(pronunciationScore) || 80));
  const f = Math.max(0, Math.min(100, Number(fluencyScore) || 80));
  const g = Math.max(0, Math.min(100, Number(grammarScore) || 80));
  const v = Math.max(0, Math.min(100, Number(vocabularyScore) || 80));
  const o = Math.max(0, Math.min(100, Number(objectiveScore) || 80));

  // Weighted overall score: 25% Pronunciation, 20% Fluency, 20% Grammar, 20% Vocab, 15% Objectives
  const overallScore = Math.round(p * 0.25 + f * 0.20 + g * 0.20 + v * 0.20 + o * 0.15);

  let rankBadge = 'Senior Communicator';
  let rankTier = 'Gold';
  if (overallScore < 70) {
    rankBadge = 'Developing Speaker';
    rankTier = 'Bronze';
  } else if (overallScore < 85) {
    rankBadge = 'Professional Contributor';
    rankTier = 'Silver';
  }

  const defaultWeakWords = [
    {
      word: 'blocked',
      ipa: '/blɑːkt/',
      issue: 'Nuốt âm đuôi /t/ (Vietnamese unreleased stop trap)',
      correctiveTip: 'Cần bật nhẹ hơi /t/ dứt khoát ở đầu lưỡi',
      category: 'Pronunciation'
    },
    {
      word: 'bottleneck',
      ipa: '/ˈbɑːtlnek/',
      issue: 'Phát âm lướt âm /t/ giữa từ',
      correctiveTip: 'Chặn nhẹ thanh môn trước khi sang âm /l/',
      category: 'Vocabulary'
    }
  ];

  const weakWords = (Array.isArray(detectedErrors) && detectedErrors.length > 0
    ? detectedErrors
    : defaultWeakWords).map(err => ({
      ...err,
      correctiveTip: err.correctiveTip || 'Cần đặt đầu lưỡi chạm chân răng trên và bật hơi dứt khoát'
    }));

  const defaultTurns = [
    {
      speaker: 'Alex Tech Lead',
      text: "Morning team! What did you finish yesterday on the payment gateway, and are there any blockers?",
      timeSec: 3.5,
      role: 'ai'
    },
    {
      speaker: 'Bạn (Học viên)',
      text: "Yesterday I merged the pull request for the checkout API, but today I am blocked by the staging server timeout.",
      timeSec: 5.2,
      role: 'user',
      highlightedWord: 'blocked'
    },
    {
      speaker: 'Alex Tech Lead',
      text: "Got it! Thanks for flagging the Napas blocker early. I'll reach out to their support channel right after standup.",
      timeSec: 4.1,
      role: 'ai'
    }
  ];

  const transcript = Array.isArray(transcriptTurns) && transcriptTurns.length > 0
    ? transcriptTurns
    : defaultTurns;

  return {
    sessionId,
    overallScore,
    rankBadge,
    rankTier,
    pillars: {
      pronunciation: {
        score: p,
        label: 'Phát Âm & Âm Cuối',
        color: 'rose',
        weight: '25%',
        feedback: p >= 80 ? 'Bảo toàn âm đuôi rất tốt!' : 'Cần chú ý các âm bật hơi /t/, /d/ cuối từ.'
      },
      fluency: {
        score: f,
        label: 'Độ Lưu Loát & Nhịp Điệu',
        color: 'sky',
        weight: '20%',
        feedback: f >= 80 ? 'Nói trôi chảy, ít ngập ngừng.' : 'Cố gắng giảm từ đệm "uhm, ah".'
      },
      grammar: {
        score: g,
        label: 'Ngữ Pháp & Thì Quá Khứ',
        color: 'emerald',
        weight: '20%',
        feedback: g >= 80 ? 'Dùng thì quá khứ đơn chuẩn xác.' : 'Lưu ý chia động từ quá khứ khi báo cáo việc đã làm.'
      },
      vocabulary: {
        score: v,
        label: 'Từ Vựng IT & Công Sở',
        color: 'indigo',
        weight: '20%',
        feedback: v >= 80 ? 'Sử dụng thuật ngữ kỹ thuật tự nhiên.' : 'Nên trau dồi thêm các cụm từ công sở thông dụng.'
      },
      objectives: {
        score: o,
        label: 'Mục Tiêu Buổi Họp Scrum',
        color: 'amber',
        weight: '15%',
        feedback: o >= 80 ? 'Đã nêu đủ tiến độ và blocker!' : 'Cần nêu rõ lý do bị chặn công việc.'
      }
    },
    weakWords,
    transcript,
    transcriptTurns: transcript,
    summaryAdvice: 'Khả năng giao tiếp kỹ thuật của bạn rất ấn tượng. Hãy luyện tập thêm âm bật hơi /t/ để giọng nói thêm phần đĩnh đạc và thuyết phục trong các cuộc họp với khách hàng Mỹ!'
  };
}

export const DEFAULT_SAMPLE_SCORECARD = calculateRoleplayScorecard({ sessionId: 'it_scrum_04' });

