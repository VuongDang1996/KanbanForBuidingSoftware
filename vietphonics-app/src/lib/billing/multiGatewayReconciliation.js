/**
 * multiGatewayReconciliation.js
 * Multi-Gateway Subscription Billing & Webhook Reconciliation Engine (ARCH-103)
 * Provides HMAC-SHA256 signature verification, Idempotent transaction processing,
 * Multi-gateway webhook normalization (VietQR/Napas, MoMo, Stripe), and Cron auto-reconciliation.
 */

import crypto from 'node:crypto';

export const GATEWAY_SECRETS = {
  vietqr: process.env.VIETQR_WEBHOOK_SECRET || 'vietphonics_secret_vietqr_2026',
  momo: process.env.MOMO_WEBHOOK_SECRET || 'vietphonics_secret_momo_2026',
  stripe: process.env.STRIPE_WEBHOOK_SECRET || 'vietphonics_secret_stripe_2026'
};

/**
 * Computes HMAC-SHA256 hex digest for a payload
 * @param {string|Object} payload
 * @param {string} secretKey
 * @returns {string} hex digest
 */
export function generateHmacSha256(payload, secretKey) {
  const data = typeof payload === 'string' ? payload : JSON.stringify(payload);
  return crypto.createHmac('sha256', secretKey).update(data).digest('hex');
}

/**
 * Verifies HMAC-SHA256 signature using timingSafeEqual
 * @param {string|Object} payload
 * @param {string} signature
 * @param {string} secretKey
 * @returns {boolean}
 */
export function verifyHmacSha256(payload, signature, secretKey) {
  if (!signature || !secretKey) return false;
  try {
    const computed = generateHmacSha256(payload, secretKey);
    const sigBuf = Buffer.from(signature, 'hex');
    const compBuf = Buffer.from(computed, 'hex');
    if (sigBuf.length !== compBuf.length) return false;
    return crypto.timingSafeEqual(sigBuf, compBuf);
  } catch (err) {
    return false;
  }
}

/**
 * Normalizes multi-gateway webhook payload to a standard transaction record
 * @param {'vietqr'|'momo'|'stripe'} gateway
 * @param {Object} rawBody
 * @returns {{ transactionId: string, orderCode: string, userId: string, amount: number, planCode: string }}
 */
export function normalizeGatewayPayload(gateway, rawBody = {}) {
  switch (gateway) {
    case 'vietqr':
      return {
        transactionId: rawBody.transactionId || rawBody.refNo || `vqr_${Date.now()}`,
        orderCode: rawBody.orderCode || rawBody.content || 'VP_PRO_MONTH',
        userId: rawBody.userId || 'default_user',
        amount: Number(rawBody.amount || 99000),
        planCode: rawBody.planCode || 'pro_monthly'
      };
    case 'momo':
      return {
        transactionId: rawBody.transId || rawBody.momoTransId || `momo_${Date.now()}`,
        orderCode: rawBody.orderId || 'MOMO_VP_PRO',
        userId: rawBody.userId || 'default_user',
        amount: Number(rawBody.amount || 99000),
        planCode: rawBody.extraData?.planCode || rawBody.planCode || 'pro_monthly'
      };
    case 'stripe':
      return {
        transactionId: rawBody.id || `ch_${Date.now()}`,
        orderCode: rawBody.data?.object?.payment_intent || 'STRIPE_VP_PRO',
        userId: rawBody.data?.object?.metadata?.userId || rawBody.userId || 'default_user',
        amount: Number(rawBody.data?.object?.amount || 99000),
        planCode: rawBody.data?.object?.metadata?.planCode || rawBody.planCode || 'pro_monthly'
      };
    default:
      return {
        transactionId: rawBody.transactionId || `gen_${Date.now()}`,
        orderCode: rawBody.orderCode || 'PRO_SUB',
        userId: rawBody.userId || 'default_user',
        amount: Number(rawBody.amount || 99000),
        planCode: rawBody.planCode || 'pro_monthly'
      };
  }
}

/**
 * Calculates new subscription period end date based on plan
 * @param {string} currentEndDate - ISO timestamp or null
 * @param {string} planCode - 'pro_monthly' | 'pro_annual' | 'pro_lifetime'
 * @returns {string} newEndDate ISO string
 */
export function calculateSubscriptionExtension(currentEndDate, planCode = 'pro_monthly') {
  const baseTime = (currentEndDate && new Date(currentEndDate) > new Date())
    ? new Date(currentEndDate)
    : new Date();

  let daysToAdd = 30;
  if (planCode.includes('annual') || planCode.includes('year')) {
    daysToAdd = 365;
  } else if (planCode.includes('lifetime')) {
    daysToAdd = 3650;
  }

  const newDate = new Date(baseTime.getTime() + daysToAdd * 24 * 3600 * 1000);
  return newDate.toISOString();
}

/**
 * Reconciles un-notified bank transactions against unpaid users
 * @param {Object} dbInstance - SQLite DatabaseSync
 * @param {Array<Object>} bankTransactions
 * @returns {{ reconciledCount: number, autoCredited: Array<string> }}
 */
export function runBankReconciliation(dbInstance, bankTransactions = []) {
  let reconciledCount = 0;
  const autoCredited = [];

  for (const tx of bankTransactions) {
    const existing = dbInstance.prepare(
      'SELECT id FROM billing_webhook_logs WHERE transaction_id = ?'
    ).get(tx.transactionId);

    if (!existing) {
      const now = new Date().toISOString();
      const newEndDate = calculateSubscriptionExtension(null, tx.planCode || 'pro_monthly');

      dbInstance.prepare(`
        INSERT INTO billing_webhook_logs (
          id, gateway, transaction_id, order_code, user_id, amount,
          plan_code, status, signature, created_at, reconciled_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, 'reconciled', 'auto_reconcile_cron', ?, ?)
      `).run(
        `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        tx.gateway || 'vietqr',
        tx.transactionId,
        tx.orderCode || 'RECONCILED_TX',
        tx.userId,
        tx.amount || 99000,
        tx.planCode || 'pro_monthly',
        now,
        now
      );

      // Auto-update user subscription
      dbInstance.prepare(`
        UPDATE arch_subscriptions SET
          status = 'active',
          current_period_end = ?
        WHERE user_id = ?
      `).run(newEndDate, tx.userId);

      reconciledCount++;
      autoCredited.push(tx.transactionId);
    }
  }

  return { reconciledCount, autoCredited };
}
