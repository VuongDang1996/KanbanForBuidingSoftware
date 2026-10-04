import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import app from '../server/index.js';
import { db } from '../server/db.js';
import {
  evaluateSubscriptionLifecycle,
  runSubscriptionLifecycleCron
} from '../src/lib/billing/subscriptionGracePeriod.js';

const PORT = 3889;
let server;
const BASE_URL = `http://127.0.0.1:${PORT}`;

before((done) => {
  server = http.createServer(app);
  server.listen(PORT, done);
});

after((done) => {
  server.close(done);
});

describe('PAY-104: Automated Grace Period (3 Days) & Expiring Subscription Reminders', () => {

  test('evaluateSubscriptionLifecycle calculates steady state and expiring alert', () => {
    const now = new Date('2026-10-04T12:00:00Z');

    // 1. Far from expiration (10 days left)
    const steadySub = {
      id: 'sub_1',
      status: 'active',
      current_period_end: new Date('2026-10-14T12:00:00Z').toISOString()
    };
    const evalSteady = evaluateSubscriptionLifecycle(steadySub, now);
    assert.equal(evalSteady.shouldTransition, false);
    assert.equal(evalSteady.isExpiringAlert, false);

    // 2. Expiring in 2 days (within 3 days alert window)
    const expiringSub = {
      id: 'sub_2',
      status: 'active',
      current_period_end: new Date('2026-10-06T12:00:00Z').toISOString()
    };
    const evalExpiring = evaluateSubscriptionLifecycle(expiringSub, now);
    assert.equal(evalExpiring.shouldTransition, false);
    assert.equal(evalExpiring.isExpiringAlert, true);
  });

  test('evaluateSubscriptionLifecycle transitions expired active subscription to grace_period', () => {
    const now = new Date('2026-10-04T12:00:00Z');
    // Period ended 1 day ago -> within 3-day grace period
    const graceSub = {
      id: 'sub_grace',
      status: 'active',
      current_period_end: new Date('2026-10-03T12:00:00Z').toISOString()
    };
    const evalGrace = evaluateSubscriptionLifecycle(graceSub, now);
    assert.equal(evalGrace.shouldTransition, true);
    assert.equal(evalGrace.newStatus, 'grace_period');
    assert.ok(evalGrace.graceDaysLeft >= 1 && evalGrace.graceDaysLeft <= 3);
  });

  test('evaluateSubscriptionLifecycle transitions overdue grace_period to expired', () => {
    const now = new Date('2026-10-04T12:00:00Z');
    // Period ended 4 days ago -> 3-day grace period expired
    const overdueSub = {
      id: 'sub_overdue',
      status: 'grace_period',
      current_period_end: new Date('2026-09-30T12:00:00Z').toISOString()
    };
    const evalOverdue = evaluateSubscriptionLifecycle(overdueSub, now);
    assert.equal(evalOverdue.shouldTransition, true);
    assert.equal(evalOverdue.newStatus, 'expired');
    assert.equal(evalOverdue.graceDaysLeft, 0);
  });

  test('runSubscriptionLifecycleCron activates grace period and logs audit record', () => {
    const testUserId = `user_grace_${Date.now()}`;
    const subId = `sub_${Date.now()}`;
    const now = new Date();
    const periodEnd = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(); // Ended 1 day ago

    // Insert user and subscription
    db.prepare(`
      INSERT INTO arch_users (id, email, full_name, tier, created_at, updated_at)
      VALUES (?, ?, ?, 'pro', ?, ?)
    `).run(testUserId, `${testUserId}@vietphonics.com`, 'Grace User', now.toISOString(), now.toISOString());

    db.prepare(`
      INSERT INTO arch_subscriptions (id, user_id, plan_code, status, current_period_start, current_period_end, created_at)
      VALUES (?, ?, 'pro_annual', 'active', ?, ?, ?)
    `).run(subId, testUserId, now.toISOString(), periodEnd, now.toISOString());

    const cronResult = runSubscriptionLifecycleCron(db, now);
    assert.ok(cronResult.processedCount >= 1);
    assert.ok(cronResult.graceActivated >= 1);

    // Verify subscription status is now grace_period
    const updatedSub = db.prepare('SELECT status FROM arch_subscriptions WHERE id = ?').get(subId);
    assert.equal(updatedSub.status, 'grace_period');

    // Verify audit log
    const auditRow = db.prepare('SELECT * FROM subscription_audit_logs WHERE subscription_id = ?').get(subId);
    assert.ok(auditRow);
    assert.equal(auditRow.old_status, 'active');
    assert.equal(auditRow.new_status, 'grace_period');
  });

  test('POST /api/v1/billing/subscription/check-expiring-cron triggers state machine and downgrades to free when overdue', async () => {
    const testUserId = `user_expire_${Date.now()}`;
    const subId = `sub_exp_${Date.now()}`;
    const now = new Date();
    const periodEnd = new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(); // Ended 4 days ago

    db.prepare(`
      INSERT INTO arch_users (id, email, full_name, tier, created_at, updated_at)
      VALUES (?, ?, ?, 'pro', ?, ?)
    `).run(testUserId, `${testUserId}@vietphonics.com`, 'Expire User', now.toISOString(), now.toISOString());

    db.prepare(`
      INSERT INTO arch_subscriptions (id, user_id, plan_code, status, current_period_start, current_period_end, created_at)
      VALUES (?, ?, 'pro_monthly', 'grace_period', ?, ?, ?)
    `).run(subId, testUserId, now.toISOString(), periodEnd, now.toISOString());

    const res = await fetch(`${BASE_URL}/api/v1/billing/subscription/check-expiring-cron`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ simulatedNow: now.toISOString() })
    });

    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.ok(data.expiredCount >= 1);

    // Verify downgraded to free tier
    const userRow = db.prepare('SELECT tier FROM arch_users WHERE id = ?').get(testUserId);
    assert.equal(userRow.tier, 'free');
  });

  test('GET /api/v1/billing/subscription/status/:userId returns grace period status and notifications', async () => {
    const testUserId = `user_status_${Date.now()}`;
    const subId = `sub_stat_${Date.now()}`;
    const now = new Date();
    const periodEnd = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(); // Expiring in 2 days

    db.prepare(`
      INSERT INTO arch_users (id, email, full_name, tier, created_at, updated_at)
      VALUES (?, ?, ?, 'pro', ?, ?)
    `).run(testUserId, `${testUserId}@vietphonics.com`, 'Status User', now.toISOString(), now.toISOString());

    db.prepare(`
      INSERT INTO arch_subscriptions (id, user_id, plan_code, status, current_period_start, current_period_end, created_at)
      VALUES (?, ?, 'pro_annual', 'active', ?, ?, ?)
    `).run(subId, testUserId, now.toISOString(), periodEnd, now.toISOString());

    const res = await fetch(`${BASE_URL}/api/v1/billing/subscription/status/${testUserId}`);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.hasSubscription, true);
    assert.equal(data.status, 'active');
    assert.equal(data.isExpiringAlert, true);
  });

  test('GET /api/v1/billing/subscription/audit-logs/:userId retrieves audit trail', async () => {
    const testUserId = `user_trail_${Date.now()}`;
    const auditId = `aud_trail_${Date.now()}`;
    db.prepare(`
      INSERT INTO subscription_audit_logs (id, subscription_id, user_id, old_status, new_status, reason, created_at)
      VALUES (?, 'sub_trail', ?, 'active', 'grace_period', 'Test audit trail', ?)
    `).run(auditId, testUserId, new Date().toISOString());

    const res = await fetch(`${BASE_URL}/api/v1/billing/subscription/audit-logs/${testUserId}`);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(Array.isArray(data.logs), true);
    assert.ok(data.logs.length >= 1);
    assert.equal(data.logs[0].id, auditId);
  });

});
