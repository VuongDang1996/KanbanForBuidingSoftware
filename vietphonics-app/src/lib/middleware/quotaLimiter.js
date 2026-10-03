// ARCH-104: Tiered Quota Limiter & Entitlement Enforcement Middleware

export class QuotaLimiter {
  constructor() {
    this.usageStore = new Map();
  }

  // Get current date string for daily bucket
  getTodayKey() {
    return new Date().toISOString().split('T')[0];
  }

  checkQuota(userId, isPro) {
    if (isPro) {
      return {
        allowed: true,
        tier: 'pro',
        remaining: Infinity,
        message: 'Không giới hạn lượt thu âm và kịch bản nâng cao.'
      };
    }

    const today = this.getTodayKey();
    const userKey = `${userId}:${today}`;
    const currentUsage = this.usageStore.get(userKey) || 0;
    const FREE_DAILY_LIMIT = 10;

    if (currentUsage >= FREE_DAILY_LIMIT) {
      return {
        allowed: false,
        tier: 'free',
        currentUsage,
        limit: FREE_DAILY_LIMIT,
        remaining: 0,
        message: 'Bạn đã đạt giới hạn 10 lượt thu âm miễn phí hôm nay. Hãy nâng cấp PRO 30k để mở khóa không giới hạn!'
      };
    }

    return {
      allowed: true,
      tier: 'free',
      currentUsage,
      limit: FREE_DAILY_LIMIT,
      remaining: FREE_DAILY_LIMIT - currentUsage,
      message: `Còn ${FREE_DAILY_LIMIT - currentUsage} lượt thu âm miễn phí hôm nay.`
    };
  }

  recordUsage(userId, isPro) {
    if (isPro) return;
    const today = this.getTodayKey();
    const userKey = `${userId}:${today}`;
    const currentUsage = this.usageStore.get(userKey) || 0;
    this.usageStore.set(userKey, currentUsage + 1);
  }
}

export const quotaLimiter = new QuotaLimiter();
