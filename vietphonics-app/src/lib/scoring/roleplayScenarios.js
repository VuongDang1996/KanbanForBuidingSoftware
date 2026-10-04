/**
 * Dynamic Scenario AI Speaking Roleplay Engine (ELSA-301)
 * Simulates conversational turn-taking with AI personas (e.g. Alex Tech Lead),
 * analyzes ending consonants (/t/, /d/, /kt/), tracks meeting objective checklists, and persists session logs.
 */

export const ROLEPLAY_SCENARIOS = [
  {
    id: 'it_scrum_04',
    code: '#IT-04',
    title: 'Daily Scrum Standup',
    targetAudience: 'Dành cho Lập trình viên / Kỹ sư làm việc từ xa với Tech Lead Mỹ',
    partner: {
      name: 'Alex Tech Lead',
      location: 'San Francisco, CA',
      role: 'Staff Engineer & Scrum Master',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlobVAhbku47-3bRxJGNs2zzKtj4wm_1DZAS6xzOusrdx80eISBXCdqc5H1H2xpt169wruKmuUux6JdabMzRHYJMHpnVRSVOFqBlBvcdadIPPhpevwFfq9uSzFNUR7v6TIWcPfdGJM4Fox5FWFVD9PpnGvYisLo49wntuifxo3ljK9BOuJsSX2edDOadyhimRODos4ef4qF4EJ7z_334LV21kNrnQgYqx1S4W7x09HNXPiizWAAdGI'
    },
    initialMessage: "Morning team! Let's do a quick round. What did you finish yesterday on the payment gateway, and are there any blockers?",
    initialMessageVi: "“Chào cả nhóm! Hôm qua bạn làm xong phần cổng thanh toán chưa, và hiện có vấn đề gì làm nghẽn tiến độ không?”",
    l1EndingTarget: 'Ending Stops /t/, /d/, /kt/',
    suggestedResponses: [
      {
        text: 'Yesterday I finished the webhook signature verification, and I have no blockers today.',
        vi: 'Hôm qua tôi đã hoàn thành xác thực chữ ký webhook, và hôm nay không có vướng mắc gì.'
      },
      {
        text: 'We ran into an infrastructure bottleneck on staging, so the deployment is currently blocked.',
        vi: 'Chúng tôi gặp nghẽn hạ tầng trên môi trường staging, nên việc triển khai hiện đang bị chặn.'
      }
    ],
    checklists: [
      { id: 'chk_progress', label: 'Báo cáo việc đã hoàn thành hôm qua (finished / completed)', requiredKeyword: ['finish', 'complete', 'done', 'yesterday'] },
      { id: 'chk_blocker', label: 'Nêu rõ tình trạng vướng mắc (blocker / bottleneck / no blockers)', requiredKeyword: ['block', 'bottleneck', 'issue', 'no blocker'] },
      { id: 'chk_stops', label: 'Phát âm chuẩn âm đuôi /t/, /d/, /kt/ (finished, blocked)', targetWords: ['finished', 'completed', 'blocked'] }
    ]
  },
  {
    id: 'hr_interview_02',
    code: '#HR-02',
    title: 'Behavioral Job Interview',
    partner: {
      name: 'Emily Davis',
      location: 'New York, NY',
      role: 'Senior Talent Acquisition Lead'
    },
    initialMessage: 'Welcome! Tell me about a time you handled a difficult production outage under strict deadlines.',
    initialMessageVi: '“Chào mừng bạn! Hãy kể cho tôi về một lần bạn xử lý sự cố hệ thống nghiêm trọng dưới áp lực thời gian.”',
    l1EndingTarget: 'Past Tense Suffixes -ed (/t/, /d/, /ɪd/)',
    checklists: [
      { id: 'chk_situation', label: 'Mô tả bối cảnh sự cố (outage / incident)', requiredKeyword: ['incident', 'outage', 'bug', 'server'] },
      { id: 'chk_action', label: 'Hành động bạn đã thực hiện (analyzed / deployed / resolved)', requiredKeyword: ['analyzed', 'fixed', 'resolved', 'deployed'] }
    ]
  }
];

export function getRoleplayScenarios() {
  return ROLEPLAY_SCENARIOS;
}

export function getRoleplayScenario(id) {
  if (!id) return null;
  const normalized = id.trim().toLowerCase();
  return ROLEPLAY_SCENARIOS.find(
    (s) => s.id.toLowerCase() === normalized || s.code.toLowerCase() === normalized
  ) || null;
}

export function evaluateRoleplayTurn({
  scenarioId,
  userTranscript = '',
  detectedPhonemeErrors = []
}) {
  const scenario = getRoleplayScenario(scenarioId) || ROLEPLAY_SCENARIOS[0];
  const lowerTranscript = (userTranscript || '').toLowerCase();

  // Check meeting checklist objectives
  const updatedChecklists = scenario.checklists.map((chk) => {
    let met = false;
    if (chk.requiredKeyword) {
      met = chk.requiredKeyword.some((kw) => lowerTranscript.includes(kw));
    } else if (chk.targetWords) {
      met = chk.targetWords.some((tw) => lowerTranscript.includes(tw));
    }
    return {
      id: chk.id,
      label: chk.label,
      met
    };
  });

  // Ending stops / unreleased consonant detection
  const unreleasedStops = [];
  if (lowerTranscript.includes('block') && !lowerTranscript.includes('blocked')) {
    unreleasedStops.push('blocked (thiếu âm /t/)');
  }
  if (lowerTranscript.includes('finish') && !lowerTranscript.includes('finished')) {
    unreleasedStops.push('finished (thiếu âm /t/)');
  }

  // Calculate phonetic accuracy
  const totalChecks = updatedChecklists.length;
  const passedChecks = updatedChecklists.filter((c) => c.met).length;
  const accuracyBase = totalChecks > 0 ? (passedChecks / totalChecks) * 100 : 80;
  const penalty = unreleasedStops.length * 15;
  const phoneticAccuracy = Math.max(40, Math.min(100, Math.round(accuracyBase - penalty)));

  // Generate Alex AI's natural response
  let aiResponse = '';
  let aiResponseVi = '';

  const hasBlocker = (lowerTranscript.includes('block') || lowerTranscript.includes('bottleneck')) &&
    !lowerTranscript.includes('no block') &&
    !lowerTranscript.includes('not block');

  if (hasBlocker) {
    aiResponse = "Got it! Thanks for flagging the blocker early. Let's sync right after standup with DevOps to unblock the pipeline.";
    aiResponseVi = '“Đã hiểu! Cảm ơn bạn đã nêu blocker sớm. Hãy trao đổi riêng ngay sau họp với bên DevOps để thông tắc pipeline.”';
  } else if (lowerTranscript.includes('finish') || lowerTranscript.includes('complet')) {
    aiResponse = "Awesome work on shipping that on schedule! What's next on your plate for the rest of today's sprint?";
    aiResponseVi = '“Làm tốt lắm, giao việc đúng tiến độ! Kế hoạch tiếp theo trong ngày hôm nay của bạn là gì?”';
  } else {
    aiResponse = "Thanks for the update. Let's make sure our PRs are reviewed and merged before end of day.";
    aiResponseVi = '“Cảm ơn cập nhật của bạn. Hãy đảm bảo các pull request được review và merge trước cuối ngày nhé.”';
  }

  return {
    success: true,
    scenarioId: scenario.id,
    userTranscript,
    aiResponse,
    aiResponseVi,
    phoneticAccuracy,
    unreleasedStops,
    checklists: updatedChecklists,
    isBlockerResolved: !lowerTranscript.includes('block') || lowerTranscript.includes('resolved')
  };
}
