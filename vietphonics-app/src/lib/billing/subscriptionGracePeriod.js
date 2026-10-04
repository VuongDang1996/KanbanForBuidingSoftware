/**
 * subscriptionGracePeriod.js
 * PAY-104: Automated Grace Period (3 Days), Expiring Subscription Alerts & Downgrade State Machine
 */

export const GRACE_PERIOD_DAYS = 3;
export const EXPIRING_REMINDER_DAYS = 3;

/**
 * Evaluates subscription state transition
 * @param {Object} subscription - { id, status, current_period_start, current_period_end, plan_code }
 * @param {Date} now - current timestamp
 * @returns {Object} { newStatus, shouldTransition, reason, daysLeftInGrace, isExpiringAlert }
 */
export function evaluateSubscriptionLifecycle(subscription, now = new Date()) {
  const periodEnd = new Date(subscription.current_period_end);
  const nowMs = now.getTime();
  const endMs = periodEnd.getTime();
  const diffMs = endMs - nowMs;
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  // 1. Check if expiring within 3 days (Reminder alert)
  const isExpiringAlert = subscription.status === 'active' && diffDays > 0 && diffDays <= EXPIRING_REMINDER_DAYS;

  // 2. Active subscription passed current_period_end -> Enters Grace Period
  if (subscription.status === 'active' && nowMs > endMs) {
    const graceEndMs = endMs + (GRACE_PERIOD_DAYS * 24 * 60 * 60 * 1000);
    if (nowMs <= graceEndMs) {
      const graceDaysLeft = Math.max(0, Math.ceil((graceEndMs - nowMs) / (1000 * 60 * 60 * 24)));
      return {
        newStatus: 'grace_period',
        shouldTransition: true,
        reason: 'Subscription period ended; entering 3-day grace period with full Pro entitlements',
        graceDaysLeft,
        isExpiringAlert: false
      };
    } else {
      // Overdue beyond grace period directly
      return {
        newStatus: 'expired',
        shouldTransition: true,
        reason: 'Subscription period and 3-day grace period ended without payment',
        graceDaysLeft: 0,
        isExpiringAlert: false
      };
    }
  }

  // 3. Grace period check
  if (subscription.status === 'grace_period') {
    const graceEndMs = endMs + (GRACE_PERIOD_DAYS * 24 * 60 * 60 * 1000);
    if (nowMs > graceEndMs) {
      return {
        newStatus: 'expired',
        shouldTransition: true,
        reason: '3-day grace period expired without renewal; downgrading to Free tier',
        graceDaysLeft: 0,
        isExpiringAlert: false
      };
    } else {
      const graceDaysLeft = Math.max(0, Math.ceil((graceEndMs - nowMs) / (1000 * 60 * 60 * 24)));
      return {
        newStatus: 'grace_period',
        shouldTransition: false,
        reason: `Currently in grace period with ${graceDaysLeft} day(s) remaining`,
        graceDaysLeft,
        isExpiringAlert: false
      };
    }
  }

  return {
    newStatus: subscription.status,
    shouldTransition: false,
    reason: 'Subscription is in steady state',
    graceDaysLeft: 0,
    isExpiringAlert
  };
}

/**
 * Runs subscription cron scan on SQLite database
 * @param {Object} db - SQLite database instance
 * @param {Date} simulatedNow - optional timestamp for deterministic testing
 * @returns {Object} { processedCount, graceActivated, expiredCount, alertsGenerated }
 */
export function runSubscriptionLifecycleCron(db, simulatedNow = new Date()) {
  const nowIso = simulatedNow.toISOString();
  const subscriptions = db.prepare("SELECT * FROM arch_subscriptions WHERE status IN ('active', 'grace_period')").all();

  let graceActivated = 0;
  let expiredCount = 0;
  let alertsGenerated = 0;

  for (const sub of subscriptions) {
    const result = evaluateSubscriptionLifecycle(sub, simulatedNow);

    // Expiring alert (within 3 days)
    if (result.isExpiringAlert) {
      const existingAlert = db.prepare(`
        SELECT id FROM subscription_notifications
        WHERE subscription_id = ? AND type = 'expiring_soon'
      `).get(sub.id);

      if (!existingAlert) {
        const notifId = `notif_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
        db.prepare(`
          INSERT INTO subscription_notifications (
            id, user_id, subscription_id, type, message, promo_code, discount_percent, created_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
          notifId,
          sub.user_id,
          sub.id,
          'expiring_soon',
          'Gói VietPhonics Pro của bạn sẽ hết hạn trong 3 ngày tới! Gia hạn ngay để nhận ưu đãi 10%.',
          'RENEW10',
          10,
          nowIso
        );
        alertsGenerated++;
      }
    }

    // Status transition
    if (result.shouldTransition) {
      const oldStatus = sub.status;
      const newStatus = result.newStatus;

      // Update subscription status
      db.prepare('UPDATE arch_subscriptions SET status = ? WHERE id = ?').run(newStatus, sub.id);

      // Record audit log
      const auditId = `aud_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      db.prepare(`
        INSERT INTO subscription_audit_logs (
          id, subscription_id, user_id, old_status, new_status, reason, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(auditId, sub.id, sub.user_id, oldStatus, newStatus, result.reason, nowIso);

      if (newStatus === 'grace_period') {
        graceActivated++;
      } else if (newStatus === 'expired') {
        expiredCount++;
        // Downgrade user to free tier
        db.prepare("UPDATE arch_users SET tier = 'free', updated_at = ? WHERE id = ?").run(nowIso, sub.user_id);
        db.prepare('UPDATE freemium_quota_records SET is_pro = 0, updated_at = ? WHERE user_id = ?').run(nowIso, sub.user_id);
      }
    }
  }

  return {
    processedCount: subscriptions.length,
    graceActivated,
    expiredCount,
    alertsGenerated,
    scannedAt: nowIso
  };
}
