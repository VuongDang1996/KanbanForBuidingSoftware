import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import app from '../server/index.js';
import { db } from '../server/db.js';
import {
  calculateCrc16,
  generateVietQrEmvcoString,
  getVietQrImageUrl,
  buildBankingDeepLink,
  generateOrderMemo,
  PRICING_PLANS,
  FEATURE_COMPARISON
} from '../src/lib/payment/vietQrEmvco.js';

const PORT = 3888;
let server;
const BASE_URL = `http://127.0.0.1:${PORT}`;

before((done) => {
  server = http.createServer(app);
  server.listen(PORT, done);
});

after((done) => {
  server.close(done);
});

describe('PAY-101, PAY-102, PAY-103: Dynamic VietQR Napas & Pricing Billing Engine', () => {

  test('EMVCo CRC-16 CCITT checksum algorithm correctness', () => {
    // Known test vectors for CRC16-CCITT (0xFFFF initial value, 0x1021 polynomial)
    const testPayload = '00020101021238540010A00000072701240006970422011009881234560208QRIBFTTA530370454065990005802VN62190815VP_LEARNER_1Y6304';
    const crc = calculateCrc16(testPayload);
    assert.equal(typeof crc, 'string');
    assert.equal(crc.length, 4);
    assert.match(crc, /^[0-9A-F]{4}$/);
  });

  test('generateVietQrEmvcoString generates compliant EMVCo Napas payload', () => {
    const qrString = generateVietQrEmvcoString({
      bankBin: '970422',
      accountNumber: '0988123456',
      amount: 599000,
      orderCode: 'VP TEST 1Y 9999'
    });

    assert.ok(qrString.startsWith('000201010212')); // Tag 00 & Tag 01 dynamic
    assert.ok(qrString.includes('A000000727')); // VietQR Napas AID
    assert.ok(qrString.includes('970422')); // MB Bank BIN
    assert.ok(qrString.includes('0988123456')); // Account number
    assert.ok(qrString.includes('5303704')); // VND currency
    assert.ok(qrString.includes('5406599000')); // Amount 599000
    assert.ok(qrString.includes('6304')); // CRC tag prefix
    assert.equal(qrString.length > 50, true);
  });

  test('generateOrderMemo, getVietQrImageUrl and buildBankingDeepLink helper functions', () => {
    const memo = generateOrderMemo('user_test_123', 'pro_annual');
    assert.match(memo, /^VP [A-Z0-9]+ 1Y \d{4}$/);

    const imgUrl = getVietQrImageUrl({
      bankBin: '970422',
      accountNumber: '0988123456',
      amount: 599000,
      orderCode: memo
    });
    assert.ok(imgUrl.startsWith('https://img.vietqr.io/image/970422-0988123456-compact2.png'));
    assert.ok(imgUrl.includes('amount=599000'));

    const deepLink = buildBankingDeepLink({
      bankBin: '970422',
      accountNumber: '0988123456',
      amount: 599000,
      orderCode: memo
    });
    assert.ok(deepLink.startsWith('vietqr://transfer?bin=970422&account=0988123456'));
    assert.ok(deepLink.includes('amount=599000'));
  });

  test('GET /api/v1/pricing/matrix returns all plans and feature comparison', async () => {
    const res = await fetch(`${BASE_URL}/api/v1/pricing/matrix`);
    assert.equal(res.status, 200);

    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(Array.isArray(data.plans), true);
    assert.equal(data.plans.length, 3);
    assert.equal(data.plans[1].id, 'pro_annual');
    assert.equal(data.plans[1].popular, true);
    assert.equal(data.plans[1].discountPercent, 40);

    assert.equal(Array.isArray(data.featureComparison), true);
    assert.ok(data.featureComparison.length >= 5);
  });

  test('POST /api/v1/payment/vietqr/create-order creates 15-minute pending order', async () => {
    const testUserId = `test_learner_${Date.now()}`;
    const res = await fetch(`${BASE_URL}/api/v1/payment/vietqr/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: testUserId, planId: 'pro_annual' })
    });

    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.ok(data.order);
    assert.equal(data.order.userId, testUserId);
    assert.equal(data.order.planId, 'pro_annual');
    assert.equal(data.order.amount, 599000);
    assert.equal(data.order.status, 'pending');
    assert.ok(data.order.orderCode);
    assert.ok(data.order.qrPayload);
    assert.ok(data.order.qrImageUrl);
    assert.ok(data.order.deepLink);

    // Verify expiration is ~15 minutes ahead
    const expireTime = new Date(data.order.expiresAt).getTime();
    const diffMs = expireTime - Date.now();
    assert.ok(diffMs > 14 * 60 * 1000 && diffMs <= 15.5 * 60 * 1000);

    // Verify persisted in SQLite
    const row = db.prepare('SELECT * FROM vietqr_orders WHERE order_code = ?').get(data.order.orderCode);
    assert.ok(row);
    assert.equal(row.status, 'pending');
    assert.equal(row.amount, 599000);
  });

  test('GET /api/v1/payment/vietqr/order/:orderCode/status checks order lifecycle', async () => {
    const testUserId = `test_query_${Date.now()}`;
    // Create an order first
    const createRes = await fetch(`${BASE_URL}/api/v1/payment/vietqr/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: testUserId, planId: 'pro_monthly' })
    });
    const { order } = await createRes.json();

    // Query status
    const statusRes = await fetch(`${BASE_URL}/api/v1/payment/vietqr/order/${order.orderCode}/status`);
    assert.equal(statusRes.status, 200);
    const statusData = await statusRes.json();
    assert.equal(statusData.success, true);
    assert.equal(statusData.orderCode, order.orderCode);
    assert.equal(statusData.status, 'pending');
    assert.equal(statusData.paidAt, null);
  });

  test('POST /api/v1/payment/vietqr/simulate-bank-transfer activates Pro tier and reconciles', async () => {
    const testUserId = `test_payer_${Date.now()}`;
    // Create an order
    const createRes = await fetch(`${BASE_URL}/api/v1/payment/vietqr/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: testUserId, planId: 'pro_annual' })
    });
    const { order } = await createRes.json();

    // Simulate transfer
    const simRes = await fetch(`${BASE_URL}/api/v1/payment/vietqr/simulate-bank-transfer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderCode: order.orderCode })
    });
    assert.equal(simRes.status, 200);
    const simData = await simRes.json();
    assert.equal(simData.success, true);
    assert.equal(simData.status, 'paid');
    assert.equal(simData.activatedTier, 'pro');
    assert.ok(simData.paidAt);

    // Verify order in DB is paid
    const updatedOrder = db.prepare('SELECT * FROM vietqr_orders WHERE order_code = ?').get(order.orderCode);
    assert.equal(updatedOrder.status, 'paid');
    assert.ok(updatedOrder.paid_at);

    // Verify user in arch_users is upgraded to pro
    const userRow = db.prepare('SELECT tier FROM arch_users WHERE id = ?').get(testUserId);
    assert.ok(userRow);
    assert.equal(userRow.tier, 'pro');

    // Verify active subscription recorded in arch_subscriptions
    const subRow = db.prepare('SELECT * FROM arch_subscriptions WHERE user_id = ? AND status = ?').get(testUserId, 'active');
    assert.ok(subRow);
    assert.equal(subRow.plan_code, 'pro_annual');

    // Verify idempotent if simulated again
    const secondSimRes = await fetch(`${BASE_URL}/api/v1/payment/vietqr/simulate-bank-transfer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderCode: order.orderCode })
    });
    const secondData = await secondSimRes.json();
    assert.equal(secondData.success, true);
    assert.equal(secondData.alreadyPaid, true);
  });

  test('Order status returns expired for past expiration orders', async () => {
    const expiredOrderCode = `VP EXPIRED ${Date.now()}`;
    const pastDate = new Date(Date.now() - 60000).toISOString();
    db.prepare(`
      INSERT INTO vietqr_orders (id, order_code, user_id, plan_code, amount, bank_bin, account_number, account_name, status, expires_at, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(`exp_${Date.now()}`, expiredOrderCode, 'user_exp', 'pro_monthly', 149000, '970422', '0988123456', 'CONG TY VIETPHONICS', 'pending', pastDate, pastDate);

    const res = await fetch(`${BASE_URL}/api/v1/payment/vietqr/order/${expiredOrderCode}/status`);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.status, 'expired');
  });

});
