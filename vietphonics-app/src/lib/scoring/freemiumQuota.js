/**
 * Freemium 5-Lesson Daily Limit & Pro Paywall Engine (ELSA-602)
 * Handles daily lesson quota tracking, midnight countdown calculation, and Pro paywall gating.
 */

export const FREE_DAILY_LESSON_LIMIT = 5;

export const PRO_BENEFITS = [
  {
    id: 'unlimited_practice',
    icon: 'all_inclusive',
    title: 'Luyện Phát Âm Không Giới Hạn',
    desc: 'Học bao nhiêu bài tùy thích mỗi ngày, không lo hết định ngạch GPU.'
  },
  {
    id: 'ai_roleplay',
    icon: 'smart_toy',
    title: 'Mở Khóa Toàn Diện AI Roleplay Alex',
    desc: 'Hội thoại phản xạ trực tiếp 1-1 với Tech Lead Alex trong môi trường công sở.'
  },
  {
    id: 'ielts_examiner',
    icon: 'school',
    title: 'Báo Cáo IELTS Speaking 9.0',
    desc: 'Chấm điểm 4 tiêu chí chuẩn Cambridge với phát hiện lỗi nuốt âm quá khứ L1.'
  },
  {
    id: 'error_bank_sm2',
    icon: 'psychology',
    title: 'Ngân Hàng Lỗi Spaced Repetition SM-2',
    desc: 'Khắc ghi cơ bắp âm vị qua chu kỳ ngắt quãng thích ứng sinh học.'
  }
];

export function getProBenefits() {
  return PRO_BENEFITS;
}

/**
 * Calculates remaining time until midnight 00:00 local time
 */
export function getCountdownUntilMidnight(now = new Date()) {
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);

  const diffMs = Math.max(0, midnight.getTime() - now.getTime());
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  const pad = (n) => String(n).padStart(2, '0');
  return {
    hours,
    minutes,
    seconds,
    formatted: `${pad(hours)} giờ ${pad(minutes)} phút`,
    countdownText: `5 bài miễn phí mới sẽ được nạp lại sau: ${pad(hours)} giờ ${pad(minutes)} phút (Lúc 00:00)`
  };
}

/**
 * AC 1: Evaluates user quota state
 */
export function evaluateUserQuota({ lessonsCompletedToday = 0, isPro = false }) {
  if (isPro) {
    return {
      isPro: true,
      isQuotaExceeded: false,
      lessonsCompletedToday,
      remainingLessons: Infinity,
      badgeText: 'Pro Unlimited',
      canAccessLesson: true
    };
  }

  const completed = Math.max(0, Number(lessonsCompletedToday) || 0);
  const remaining = Math.max(0, FREE_DAILY_LESSON_LIMIT - completed);
  const isQuotaExceeded = completed >= FREE_DAILY_LESSON_LIMIT;

  return {
    isPro: false,
    isQuotaExceeded,
    lessonsCompletedToday: completed,
    dailyLimit: FREE_DAILY_LESSON_LIMIT,
    remainingLessons: remaining,
    badgeText: isQuotaExceeded
      ? `${FREE_DAILY_LESSON_LIMIT}/${FREE_DAILY_LESSON_LIMIT} bài miễn phí đã dùng`
      : `Còn ${remaining}/${FREE_DAILY_LESSON_LIMIT} bài miễn phí hôm nay`,
    canAccessLesson: !isQuotaExceeded
  };
}
