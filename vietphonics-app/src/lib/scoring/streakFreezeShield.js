/**
 * Daily Practice Streak Counter & Streak Freeze Shield Engine (ELSA-601)
 * Handles pulsating flame calculations, midnight streak freeze consumption, and gem shield purchase.
 */

export function evaluateStreakVisuals({ streak = 7, isFrozen = false }) {
  const isHighStreak = streak >= 7;

  if (isFrozen) {
    return {
      mode: 'frozen',
      badgeClass: 'flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-500/20 border border-sky-400/50 text-sky-600 font-extrabold shadow-[0_0_15px_rgba(56,189,248,0.4)] animate-pulse',
      icon: 'ac_unit',
      statusText: `Bảo Vệ: ${streak} Ngày (Đang Đóng Băng)`,
      tooltip: 'Khiên băng đã tự động kích hoạt để cứu chuỗi của bạn!'
    };
  }

  if (isHighStreak) {
    return {
      mode: 'flame',
      badgeClass: 'flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-rose-500/20 border border-amber-500/40 text-amber-600 font-extrabold shadow-[0_0_15px_rgba(245,158,11,0.3)] animate-pulse',
      icon: 'local_fire_department',
      statusText: `🔥 ${streak} Ngày (Streak Cao Thủ)`,
      tooltip: 'Chuỗi luyện tập xuất sắc trên 7 ngày với hào quang rực rỡ!'
    };
  }

  return {
    mode: 'normal',
    badgeClass: 'flex items-center gap-1 px-3 py-1 bg-rose-50 border border-rose-200/80 rounded-full font-label-mono text-label-mono text-rose-600 font-bold',
    icon: 'local_fire_department',
    statusText: `🔥 ${streak} Ngày`,
    tooltip: 'Duy trì học mỗi ngày để thắp sáng hào quang streak!'
  };
}

/**
 * AC 2: Midnight check and auto-consumption of freeze shield
 */
export function processMidnightStreakProtection({ streak = 7, shields = 1, hoursInactive = 25 }) {
  if (hoursInactive <= 24) {
    return {
      streakMaintained: streak,
      shieldsRemaining: shields,
      shieldConsumed: false,
      isFrozen: false,
      message: 'Chuỗi học tập vẫn đang trong thời hạn 24 giờ.'
    };
  }

  if (shields >= 1) {
    return {
      streakMaintained: streak,
      shieldsRemaining: shields - 1,
      shieldConsumed: true,
      isFrozen: true,
      message: `Chuỗi ${streak} ngày của bạn đã được khiên băng bảo vệ an toàn! Hãy hoàn thành 1 bài học hôm nay để làm tan băng!`
    };
  }

  // No shields => streak reset to 0
  return {
    streakMaintained: 0,
    shieldsRemaining: 0,
    shieldConsumed: false,
    isFrozen: false,
    message: 'Rất tiếc! Bạn đã không học trong hơn 24 giờ và không có khiên băng, chuỗi ngày học đã về 0.'
  };
}

/**
 * AC 4: Purchase freeze shield with 200 gems
 */
export function buyStreakFreeze({ gemsBalance = 500, currentShields = 1, costGems = 200 }) {
  if (gemsBalance < costGems) {
    return {
      success: false,
      error: `Bạn cần ${costGems} Kim Cương (hiện có ${gemsBalance}).`,
      gemsBalance,
      shields: currentShields
    };
  }

  return {
    success: true,
    gemsBalance: gemsBalance - costGems,
    shields: currentShields + 1,
    message: 'Mua Khiên Đóng Băng thành công! Chuỗi học tập của bạn đã được bảo vệ.'
  };
}
