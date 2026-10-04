import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import app from '../server/index.js';
import { db } from '../server/db.js';
import {
  GATEWAY_SECRETS,
  generateHmacSha256,
  verifyHmacSha256,
  normalizeGatewayPayload,
  calculateSubscriptionExtension,
  runBankReconciliation
} from '../src/lib/billing/multiGatewayReconciliation.js';

const PORT = 3885;
let server;

describe('ARCH-103: Multi-Gateway Subscription Billing & Webhook Reconciliation Tests', () => {
  before((done) => {
    server = http.createServer(app);
    server.listen(PORT, done);
  });

  after((done) => {
    server.close(done);
  });

  describe('HMAC-SHA256 Signature Verification (AC 1)', () => {
    it('accepts authentic HMAC signature matching shared secret', () => {
      const payload = { transactionId: 'tx_test_01', amount: 99000, userId: 'usr_arch_default' };
      const secret = GATEWAY_SECRETS.vietqr;
      const signature = generateHmacSha256(payload, secret);

      const isValid = verifyHmacSha256(payload, signature, secret);
      assert.equal(isValid, true);
    });

    it('rejects tampered payload or incorrect signature', () => {
      const payload = { transactionId: 'tx_test_01', amount: 99000 };
      const tampered = { transactionId: 'tx_test_01', amount: 1000 }; // modified amount
      const secret = GATEWAY_SECRETS.vietqr;
      const signature = generateHmacSha256(payload, secret);

      const isValid = verifyHmacSha256(tampered, signature, secret);
      assert.equal(isValid, false);
    });

    it('rejects invalid signature with HTTP 401 Unauthorized', async () => {
      const payload = { transactionId: 'tx_bad_sig', amount: 99000 };
      const res = await fetch(`http://localhost:${PORT}/api/v1/billing/webhook/vietqr`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-signature': '0000deadbeefinvalidhex'
        },
        body: JSON.stringify(payload)
      });

      assert.equal(res.status, 401);
      const data = await res.json();
      assert.equal(data.error, 'Invalid HMAC signature');
    });
  });

  describe('Idempotency Key & Deduplication (AC 2)', () => {
    it('processes transaction on first webhook call and activates Pro', async () => {
      const txId = `tx_vqr_first_${Date.now()}`;
      const payload = {
        transactionId: txId,
        orderCode: 'VP_PRO_MONTHLY',
        userId: 'usr_arch_default',
        amount: 99000,
        planCode: 'pro_monthly'
      };
      const secret = GATEWAY_SECRETS.vietqr;
      const signature = generateHmacSha256(payload, secret);

      const res = await fetch(`http://localhost:${PORT}/api/v1/billing/webhook/vietqr`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-signature': signature
        },
        body: JSON.stringify(payload)
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.status, 'activated_success');
      assert.equal(data.transactionId, txId);
      assert.ok(data.expiresAt);
    });

    it('returns already_processed on retry calls without duplicating ledger entries', async () => {
      const txId = `tx_vqr_dedup_${Date.now()}`;
      const payload = {
        transactionId: txId,
        orderCode: 'VP_PRO_MONTHLY',
        userId: 'usr_arch_default',
        amount: 99000,
        planCode: 'pro_monthly'
      };
      const secret = GATEWAY_SECRETS.vietqr;
      const signature = generateHmacSha256(payload, secret);

      // 1st request
      const res1 = await fetch(`http://localhost:${PORT}/api/v1/billing/webhook/vietqr`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-signature': signature },
        body: JSON.stringify(payload)
      });
      assert.equal(res1.status, 200);

      // 2nd request (duplicate retry from bank gateway)
      const res2 = await fetch(`http://localhost:${PORT}/api/v1/billing/webhook/vietqr`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-signature': signature },
        body: JSON.stringify(payload)
      });
      assert.equal(res2.status, 200);
      const data2 = await res2.json();
      assert.equal(data2.status, 'already_processed');

      // Verify only 1 log entry in SQLite
      const logs = db.prepare('SELECT COUNT(*) as cnt FROM billing_webhook_logs WHERE transaction_id = ?').get(txId);
      assert.equal(logs.cnt, 1);
    });
  });

  describe('Multi-Gateway Payload Normalization (AC 3)', () => {
    it('normalizes MoMo webhook payload format', () => {
      const momoRaw = {
        transId: 'momo_987654321',
        orderId: 'ORDER_MOMO_01',
        userId: 'usr_arch_default',
        amount: 199000,
        planCode: 'pro_annual'
      };
      const normalized = normalizeGatewayPayload('momo', momoRaw);
      assert.equal(normalized.transactionId, 'momo_987654321');
      assert.equal(normalized.amount, 199000);
      assert.equal(normalized.planCode, 'pro_annual');
    });

    it('normalizes Stripe webhook payload format', () => {
      const stripeRaw = {
        id: 'evt_stripe_charge_123',
        data: {
          object: {
            payment_intent: 'pi_test_123',
            amount: 99000,
            metadata: { userId: 'usr_arch_default', planCode: 'pro_monthly' }
          }
        }
      };
      const normalized = normalizeGatewayPayload('stripe', stripeRaw);
      assert.equal(normalized.transactionId, 'evt_stripe_charge_123');
      assert.equal(normalized.userId, 'usr_arch_default');
    });

    it('calculates proper 30-day and 365-day extensions', () => {
      const now = new Date();
      const monthlyEnd = calculateSubscriptionExtension(now.toISOString(), 'pro_monthly');
      const annualEnd = calculateSubscriptionExtension(now.toISOString(), 'pro_annual');

      const monthDiff = new Date(monthlyEnd).getTime() - now.getTime();
      const yearDiff = new Date(annualEnd).getTime() - now.getTime();

      assert.ok(monthDiff >= 29 * 24 * 3600 * 1000);
      assert.ok(yearDiff >= 364 * 24 * 3600 * 1000);
    });
  });

  describe('Automated Bank Reconciliation Cron (AC 4)', () => {
    it('reconciles unsettled bank transactions and auto-credits subscription', async () => {
      const unsettledTxId = `bank_reconcile_${Date.now()}`;
      const payload = {
        transactions: [
          {
            transactionId: unsettledTxId,
            orderCode: 'BANK_NAPAS_AUTO',
            userId: 'usr_arch_default',
            amount: 99000,
            planCode: 'pro_monthly',
            gateway: 'vietqr'
          }
        ]
      };

      const res = await fetch(`http://localhost:${PORT}/api/v1/billing/reconcile-cron`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.reconciledCount, 1);
      assert.ok(data.autoCredited.includes(unsettledTxId));

      // Verify row in database has status 'reconciled'
      const row = db.prepare('SELECT * FROM billing_webhook_logs WHERE transaction_id = ?').get(unsettledTxId);
      assert.ok(row);
      assert.equal(row.status, 'reconciled');
    });

    it('GET /api/v1/billing/reconcile-status reports accurate financial ledger stats', async () => {
      const res = await fetch(`http://localhost:${PORT}/api/v1/billing/reconcile-status`);
      assert.equal(res.status, 200);
      const data = await res.json();

      assert.equal(data.success, true);
      assert.ok(data.totalCount >= 2);
      assert.ok(data.totalAmount > 0);
      assert.ok(Array.isArray(data.recentLogs));
    });
  });
});
