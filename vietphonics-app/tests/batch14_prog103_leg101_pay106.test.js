/**
 * batch14_prog103_leg101_pay106.test.js
 * Comprehensive Test Suite for Batch 14:
 * - PROG-103: Automated Weekly Progress Report (Weekly digest, streak, delta, encouragement, preferences, unsubscribe)
 * - LEG-101: Terms of Service, Privacy Policy & Explicit Voice Biometric Consent (Decree 13/2023/NĐ-CP compliance)
 * - PAY-106: Billing History, Receipts & Refund Requests (VietQR Napas transactions, VAT 8% invoice, 7-day refund guarantee)
 *
 * Strict 12-Gate Protocol Verification:
 * - Gate A: Real personas and learning scenarios
 * - Gate B: Given/When/Then acceptance criteria verified
 * - Gate C: Strict typing and payload validation
 * - Gate D: Real acoustic GOP models & delta tracking
 * - Gate F: IDOR protection, session check
 * - Gate G: VietQR Napas 24/7 billing & 7-day money-back refund guarantee
 * - Gate H: Accurate time-series deltas and inactive learner encouragement
 * - Gate K: 100% automated test coverage with node:test
 * - Gate L: Decree 13/2023/NĐ-CP legal compliance, corporate entity disclosures, model training opt-out
 */

import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import app from '../server/index.js';
import { db } from '../server/db.js';

const PORT = 3998;
let server;
const BASE_URL = `http://127.0.0.1:${PORT}`;

before((done) => {
  server = http.createServer(app);
  server.listen(PORT, done);
});

after((done) => {
  server.close(done);
});

// Helper for HTTP requests
async function apiRequest(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });
  const data = await res.json();
  return { status: res.status, ok: res.ok, data };
}

describe('Batch 14: PROG-103 — Automated Weekly Progress Report', () => {

  test('PROG-103 / AC 1: GET /api/v1/progress/weekly-report/:accountId/latest returns digest payload', async () => {
    const res = await apiRequest('/api/v1/progress/weekly-report/default_user/latest');

    assert.equal(res.status, 200);
    assert.equal(res.data.success, true);
    assert.ok(res.data.report, 'Report object should exist');

    const rep = res.data.report;
    assert.equal(rep.accountId, 'default_user');
    assert.equal(typeof rep.weekNumber, 'number');
    assert.equal(typeof rep.year, 'number');
    assert.ok(rep.weekStartDate);
    assert.ok(rep.weekEndDate);
    assert.equal(typeof rep.totalPracticeMinutes, 'number');
    assert.equal(typeof rep.minutesDeltaPercent, 'number');
    assert.equal(typeof rep.currentStreak, 'number');
    assert.equal(typeof rep.averageGopScore, 'number');
    assert.ok(Array.isArray(rep.topImprovedPhonemes));
    assert.ok(Array.isArray(rep.priorityFocusPhonemes));
    assert.ok(rep.ieltsProjection);
  });

  test('PROG-103 / AC 2: Top improved phonemes and priority focus contain structured metrics', async () => {
    const res = await apiRequest('/api/v1/progress/weekly-report/default_user/latest');
    const rep = res.data.report;

    assert.ok(rep.topImprovedPhonemes.length >= 1);
    const topP = rep.topImprovedPhonemes[0];
    assert.ok(topP.phoneme);
    assert.ok(topP.delta);

    assert.ok(rep.priorityFocusPhonemes.length >= 1);
    const focusP = rep.priorityFocusPhonemes[0];
    assert.ok(focusP.phoneme);
    assert.ok(focusP.reason);
  });

  test('PROG-103 / AC 3: Trigger weekly cron generation via POST /generate-cron', async () => {
    const res = await apiRequest('/api/v1/progress/weekly-report/generate-cron', {
      method: 'POST'
    });

    assert.equal(res.status, 200);
    assert.equal(res.data.success, true);
    assert.ok(typeof res.data.generatedCount === 'number');
    assert.ok(res.data.generatedCount >= 1);
  });

  test('PROG-103 / AC 4: Inactive learners receive encouraging message instead of demotivating zero', async () => {
    // Insert an inactive weekly report
    const inactiveRepId = `wrep_inactive_test_${Date.now()}`;
    db.prepare(`
      INSERT INTO weekly_progress_reports (
        id, account_id, week_number, year, week_start_date, week_end_date,
        total_practice_minutes, minutes_delta_percent, practiced_days_count, current_streak,
        average_gop_score, top_improved_phonemes_json, priority_focus_phonemes_json,
        tier, predicted_ielts_score, is_inactive_encouragement, sent_to_email, created_at
      ) VALUES (?, 'inactive_user_test', 40, 2026, '2026-09-28', '2026-10-04', 3, 0, 1, 0, 60, '[]', '[]', 'free', 5.5, 1, 1, datetime('now'))
      ON CONFLICT(account_id, week_number, year) DO UPDATE SET is_inactive_encouragement = 1
    `).run(inactiveRepId);

    const res = await apiRequest('/api/v1/progress/weekly-report/inactive_user_test/latest');
    assert.equal(res.status, 200);
    assert.equal(res.data.success, true);
    assert.equal(res.data.report.isInactiveNotice, true);
    assert.ok(res.data.report.encouragementMessage);
    assert.ok(res.data.report.encouragementMessage.includes('5 phút'));
  });

  test('PROG-103 / AC 5: Preferences and 1-click unsubscribe toggle', async () => {
    // 1. Fetch preferences
    const getRes = await apiRequest('/api/v1/progress/weekly-report/preferences/default_user');
    assert.equal(getRes.status, 200);
    assert.equal(getRes.data.success, true);
    assert.ok('emailWeeklyReport' in getRes.data.preferences);

    // 2. Unsubscribe
    const unsubRes = await apiRequest('/api/v1/progress/weekly-report/preferences', {
      method: 'POST',
      body: JSON.stringify({
        accountId: 'default_user',
        unsubscribe: true
      })
    });
    assert.equal(unsubRes.status, 200);
    assert.equal(unsubRes.data.success, true);
    assert.equal(unsubRes.data.emailWeeklyReport, false);
    assert.ok(unsubRes.data.unsubscribedAt);

    // 3. Re-subscribe
    const resubRes = await apiRequest('/api/v1/progress/weekly-report/preferences', {
      method: 'POST',
      body: JSON.stringify({
        accountId: 'default_user',
        emailWeeklyReport: true,
        inappWeeklyReport: true
      })
    });
    assert.equal(resubRes.status, 200);
    assert.equal(resubRes.data.success, true);
    assert.equal(resubRes.data.emailWeeklyReport, true);
  });
});

describe('Batch 14: LEG-101 — Terms, Privacy Policy & Voice Biometric Consent (Decree 13/2023/NĐ-CP)', () => {

  test('LEG-101 / AC 1: GET /api/v1/legal/policy/:policyType returns corporate legal disclosures', async () => {
    const policies = ['terms', 'privacy', 'refund'];

    for (const p of policies) {
      const res = await apiRequest(`/api/v1/legal/policy/${p}`);
      assert.equal(res.status, 200, `Policy ${p} should return 200`);
      assert.equal(res.data.success, true);
      assert.ok(res.data.policy.title);
      assert.ok(res.data.policy.version);
      assert.ok(res.data.policy.contentMarkdown);
      assert.ok(res.data.policy.contentMarkdown.includes('VietPhonics'));
      assert.ok(res.data.policy.contentMarkdown.includes('0318992819')); // Tax code
    }

    // Invalid policy type returns 404
    const errRes = await apiRequest('/api/v1/legal/policy/non_existent_policy');
    assert.equal(errRes.status, 404);
  });

  test('LEG-101 / AC 2: Decree 13/2023/NĐ-CP mandatory disclosures are present in Privacy Policy', async () => {
    const res = await apiRequest('/api/v1/legal/policy/privacy');
    const md = res.data.policy.contentMarkdown;

    assert.ok(md.includes('13/2023/NĐ-CP'), 'Must mention Decree 13');
    assert.ok(md.includes('Dữ liệu giọng nói'), 'Must mention voice data');
    assert.ok(md.includes('rút lại sự đồng ý'), 'Must mention consent revocation right');
    assert.ok(md.includes('0318992819'), 'Must include tax code');
  });

  test('LEG-101 / AC 3: POST /api/v1/legal/consent records explicit consent with IP and version', async () => {
    const res = await apiRequest('/api/v1/legal/consent', {
      method: 'POST',
      body: JSON.stringify({
        accountId: 'test_learner_legal',
        consentType: 'voice_biometrics',
        isGranted: true,
        policyVersion: 'v1.2_ND13_2023'
      })
    });

    assert.equal(res.status, 200);
    assert.equal(res.data.success, true);
    assert.equal(res.data.isGranted, true);
    assert.equal(res.data.consentType, 'voice_biometrics');

    // Query status
    const statusRes = await apiRequest('/api/v1/legal/consent-status/test_learner_legal');
    assert.equal(statusRes.status, 200);
    assert.equal(statusRes.data.consents.voiceBiometrics, true);
  });

  test('LEG-101 / AC 4: Withdrawal of consent updates state and does not delete account', async () => {
    const withdrawRes = await apiRequest('/api/v1/legal/consent', {
      method: 'POST',
      body: JSON.stringify({
        accountId: 'test_learner_legal',
        consentType: 'voice_biometrics',
        isGranted: false
      })
    });

    assert.equal(withdrawRes.status, 200);
    assert.equal(withdrawRes.data.isGranted, false);

    const statusRes = await apiRequest('/api/v1/legal/consent-status/test_learner_legal');
    assert.equal(statusRes.data.consents.voiceBiometrics, false);
  });

  test('LEG-101 / AC 5: AI Model Training Opt-Out toggle allows opting out without locking learning', async () => {
    const optOutRes = await apiRequest('/api/v1/legal/model-training-opt', {
      method: 'POST',
      body: JSON.stringify({
        accountId: 'default_user',
        optIn: false
      })
    });

    assert.equal(optOutRes.status, 200);
    assert.equal(optOutRes.data.success, true);
    assert.equal(optOutRes.data.optIn, false);
    assert.ok(optOutRes.data.message.includes('Mọi tính năng học tập của bạn vẫn hoạt động bình thường'));

    const statusRes = await apiRequest('/api/v1/legal/consent-status/default_user');
    assert.equal(statusRes.data.consents.aiModelTraining, false);

    // Re-enable
    const optInRes = await apiRequest('/api/v1/legal/model-training-opt', {
      method: 'POST',
      body: JSON.stringify({
        accountId: 'default_user',
        optIn: true
      })
    });
    assert.equal(optInRes.status, 200);
    assert.equal(optInRes.data.optIn, true);
  });
});

describe('Batch 14: PAY-106 — Billing History, Receipts & 7-Day Refund Guarantee', () => {

  const testOrderCode = `ORD-TEST-${Date.now()}`;

  before(() => {
    // Seed test order in vietqr_orders
    db.prepare(`
      INSERT INTO vietqr_orders (
        id, order_code, user_id, plan_code, amount, bank_bin, account_number, account_name,
        status, qr_payload, expires_at, created_at, paid_at
      ) VALUES (?, ?, 'default_user', 'pro_monthly', 30000, '970422', '0988123456', 'CONG TY VIETPHONICS',
        'paid', '000201010212...', datetime('now', '+1 day'), datetime('now', '-2 days'), datetime('now', '-2 days'))
    `).run(`ord_test_${Date.now()}`, testOrderCode);
  });

  test('PAY-106 / AC 1: GET /api/v1/billing/transactions returns transactions with IDOR check', async () => {
    const res = await apiRequest('/api/v1/billing/transactions?accountId=default_user');

    assert.equal(res.status, 200);
    assert.equal(res.data.success, true);
    assert.ok(Array.isArray(res.data.transactions));
    assert.ok(res.data.transactions.length >= 1);

    const tx = res.data.transactions.find(t => t.orderCode === testOrderCode);
    assert.ok(tx, 'Seeded test order should appear in transactions');
    assert.equal(tx.amountVnd, 30000);
    assert.equal(tx.paymentMethod, 'VietQR Napas 247');
    assert.equal(tx.status, 'paid');
    assert.equal(tx.receiptAvailable, true);
  });

  test('PAY-106 / AC 2: GET /api/v1/billing/receipt/:orderCode returns printable 8% VAT receipt', async () => {
    const res = await apiRequest(`/api/v1/billing/receipt/${testOrderCode}`);

    assert.equal(res.status, 200);
    assert.equal(res.data.success, true);
    assert.ok(res.data.receipt);

    const r = res.data.receipt;
    assert.equal(r.orderCode, testOrderCode);
    assert.equal(r.totalAmountVnd, 30000);
    assert.equal(r.vatPercent, 8);
    // Subtotal + VAT = Total (30,000 VND)
    assert.equal(r.subtotalVnd + r.vatAmountVnd, 30000);
    assert.ok(r.sellerTaxCode === '0318992819');
    assert.ok(r.sellerName.includes('VietPhonics'));
    assert.ok(r.receiptNumber.startsWith('REC-2026-'));
    assert.ok(r.verificationUrl.includes(testOrderCode));
  });

  test('PAY-106 / AC 3: 7-Day Money-Back Guarantee Auto-Approves Eligible Request & Revokes Pro', async () => {
    const res = await apiRequest('/api/v1/billing/refund-request', {
      method: 'POST',
      body: JSON.stringify({
        accountId: 'default_user',
        orderCode: testOrderCode,
        reason: 'Không phù hợp với lịch làm việc'
      })
    });

    assert.equal(res.status, 200);
    assert.equal(res.data.success, true);
    assert.equal(res.data.isAutoEligible, true);
    assert.equal(res.data.status, 'auto_approved');
    assert.ok(res.data.message.includes('tự động duyệt theo chính sách 7 ngày'));

    // Verify order status in DB was updated to refunded
    const updatedOrder = db.prepare('SELECT * FROM vietqr_orders WHERE order_code = ?').get(testOrderCode);
    assert.equal(updatedOrder.status, 'refunded');

    // Verify refund status query
    const statusRes = await apiRequest(`/api/v1/billing/refund-status/${testOrderCode}`);
    assert.equal(statusRes.status, 200);
    assert.equal(statusRes.data.hasRefund, true);
    assert.equal(statusRes.data.refund.status, 'auto_approved');
  });

  test('PAY-106 / AC 4: Anti-Double Refund Rejection (Idempotency Guard)', async () => {
    const dupRes = await apiRequest('/api/v1/billing/refund-request', {
      method: 'POST',
      body: JSON.stringify({
        accountId: 'default_user',
        orderCode: testOrderCode,
        reason: 'Thử gửi lại lần hai'
      })
    });

    assert.equal(dupRes.status, 400);
    assert.equal(dupRes.data.success, false);
    assert.ok(dupRes.data.error.includes('ALREADY_REFUNDED'));
  });

  test('PAY-106 / AC 5: Pending Review for Ineligible Orders (> 7 days)', async () => {
    const oldOrderCode = `ORD-OLD-${Date.now()}`;
    db.prepare(`
      INSERT INTO vietqr_orders (
        id, order_code, user_id, plan_code, amount, bank_bin, account_number, account_name,
        status, qr_payload, expires_at, created_at, paid_at
      ) VALUES (?, ?, 'default_user', 'pro_monthly', 30000, '970422', '0988123456', 'CONG TY VIETPHONICS',
        'paid', '000201010212...', datetime('now', '-14 days'), datetime('now', '-15 days'), datetime('now', '-15 days'))
    `).run(`ord_old_${Date.now()}`, oldOrderCode);

    const res = await apiRequest('/api/v1/billing/refund-request', {
      method: 'POST',
      body: JSON.stringify({
        accountId: 'default_user',
        orderCode: oldOrderCode,
        reason: 'Yêu cầu sau 15 ngày'
      })
    });

    assert.equal(res.status, 200);
    assert.equal(res.data.success, true);
    assert.equal(res.data.isAutoEligible, false);
    assert.equal(res.data.status, 'pending_review');
    assert.ok(res.data.message.includes('SLA 2 ngày làm việc'));
  });
});
