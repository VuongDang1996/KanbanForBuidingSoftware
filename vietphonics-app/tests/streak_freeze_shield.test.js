import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import app from '../server/index.js';
import { db } from '../server/db.js';
import {
  evaluateStreakVisuals,
  processMidnightStreakProtection,
  buyStreakFreeze
} from '../src/lib/scoring/streakFreezeShield.js';

describe('ELSA-601: Daily Practice Streak Counter & Streak Freeze Shield Tests', () => {
  let server;
  const PORT = 3880;
  const baseUrl = `http://127.0.0.1:${PORT}`;

  before(async () => {
    await new Promise((resolve) => {
      server = http.createServer(app);
      server.listen(PORT, resolve);
    });
  });

  after(async () => {
    await new Promise((resolve) => {
      server.close(resolve);
    });
  });

  describe('Streak Visual State & Hào Quang (AC 1)', () => {
    test('evaluateStreakVisuals renders pulsating flame glow when streak >= 7', () => {
      const visuals = evaluateStreakVisuals({ streak: 7, isFrozen: false });
      assert.equal(visuals.mode, 'flame');
      assert.ok(visuals.badgeClass.includes('animate-pulse'));
      assert.ok(visuals.badgeClass.includes('amber-500'));
      assert.ok(visuals.statusText.includes('7 Ngày'));
    });

    test('evaluateStreakVisuals renders icy blue frozen shield when isFrozen is true', () => {
      const visuals = evaluateStreakVisuals({ streak: 14, isFrozen: true });
      assert.equal(visuals.mode, 'frozen');
      assert.ok(visuals.badgeClass.includes('sky-500/20'));
      assert.equal(visuals.icon, 'ac_unit');
      assert.ok(visuals.statusText.includes('Đang Đóng Băng'));
    });

    test('evaluateStreakVisuals renders standard badge for streak < 7', () => {
      const visuals = evaluateStreakVisuals({ streak: 3, isFrozen: false });
      assert.equal(visuals.mode, 'normal');
      assert.ok(visuals.badgeClass.includes('bg-rose-50'));
    });
  });

  describe('Midnight Freeze Shield Consumption Math (AC 2 & AC 3)', () => {
    test('Within 24h inactivity does not consume shield', () => {
      const res = processMidnightStreakProtection({ streak: 7, shields: 1, hoursInactive: 18 });
      assert.equal(res.streakMaintained, 7);
      assert.equal(res.shieldConsumed, false);
      assert.equal(res.isFrozen, false);
      assert.equal(res.shieldsRemaining, 1);
    });

    test('Over 24h inactivity consumes 1 shield and keeps streak intact with frozen status', () => {
      const res = processMidnightStreakProtection({ streak: 7, shields: 2, hoursInactive: 26 });
      assert.equal(res.streakMaintained, 7);
      assert.equal(res.shieldConsumed, true);
      assert.equal(res.isFrozen, true);
      assert.equal(res.shieldsRemaining, 1);
      assert.ok(res.message.includes('khiên băng bảo vệ an toàn'));
    });

    test('Over 24h inactivity with 0 shields resets streak to 0', () => {
      const res = processMidnightStreakProtection({ streak: 7, shields: 0, hoursInactive: 26 });
      assert.equal(res.streakMaintained, 0);
      assert.equal(res.shieldConsumed, false);
      assert.equal(res.isFrozen, false);
    });
  });

  describe('Freeze Shield Purchase Math (AC 4)', () => {
    test('buyStreakFreeze rejects when gems are insufficient', () => {
      const res = buyStreakFreeze({ gemsBalance: 150, currentShields: 0, costGems: 200 });
      assert.equal(res.success, false);
      assert.equal(res.shields, 0);
      assert.ok(res.error.includes('200 Kim Cương'));
    });

    test('buyStreakFreeze deducts 200 gems and increments shield count', () => {
      const res = buyStreakFreeze({ gemsBalance: 500, currentShields: 1, costGems: 200 });
      assert.equal(res.success, true);
      assert.equal(res.gemsBalance, 300);
      assert.equal(res.shields, 2);
    });
  });

  describe('REST API & Database Persistence (AC 1, AC 2, AC 3, AC 4)', () => {
    test('GET /api/v1/streak/status initializes user streak in SQLite', async () => {
      const testUserId = `test-streak-${Date.now()}`;
      const res = await fetch(`${baseUrl}/api/v1/streak/status`, {
        headers: { 'x-user-id': testUserId }
      });
      assert.equal(res.status, 200);

      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.streakCount, 7);
      assert.equal(data.freezeShieldsCount, 1);
      assert.equal(data.isFrozen, false);

      // Verify in SQLite table user_streak_shield_records
      const row = db.prepare('SELECT * FROM user_streak_shield_records WHERE user_id = ?').get(testUserId);
      assert.ok(row);
      assert.equal(row.streak_count, 7);
    });

    test('POST /api/v1/streak/consume-freeze consumes shield overnight and sets is_frozen', async () => {
      const testUserId = `test-streak-cons-${Date.now()}`;
      // Initialize first
      await fetch(`${baseUrl}/api/v1/streak/status`, {
        headers: { 'x-user-id': testUserId }
      });

      // Simulate 26 hours inactivity
      const res = await fetch(`${baseUrl}/api/v1/streak/consume-freeze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': testUserId
        },
        body: JSON.stringify({ hoursInactive: 26 })
      });
      assert.equal(res.status, 200);

      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.streakCount, 7);
      assert.equal(data.freezeShieldsCount, 0);
      assert.equal(data.isFrozen, true);
      assert.equal(data.savedModalPending, true);

      // Verify in SQLite
      const row = db.prepare('SELECT * FROM user_streak_shield_records WHERE user_id = ?').get(testUserId);
      assert.ok(row);
      assert.equal(row.is_frozen, 1);
      assert.equal(row.saved_modal_pending, 1);
    });

    test('POST /api/v1/streak/dismiss-saved-modal unfreezes status', async () => {
      const testUserId = `test-streak-dism-${Date.now()}`;
      await fetch(`${baseUrl}/api/v1/streak/status`, { headers: { 'x-user-id': testUserId } });
      await fetch(`${baseUrl}/api/v1/streak/consume-freeze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': testUserId },
        body: JSON.stringify({ hoursInactive: 26 })
      });

      const res = await fetch(`${baseUrl}/api/v1/streak/dismiss-saved-modal`, {
        method: 'POST',
        headers: { 'x-user-id': testUserId }
      });
      assert.equal(res.status, 200);

      const row = db.prepare('SELECT * FROM user_streak_shield_records WHERE user_id = ?').get(testUserId);
      assert.equal(row.is_frozen, 0);
      assert.equal(row.saved_modal_pending, 0);
    });

    test('POST /api/v1/streak/buy-freeze purchases shield with gems', async () => {
      const testUserId = `test-streak-buy-${Date.now()}`;
      await fetch(`${baseUrl}/api/v1/streak/status`, { headers: { 'x-user-id': testUserId } });

      const res = await fetch(`${baseUrl}/api/v1/streak/buy-freeze`, {
        method: 'POST',
        headers: { 'x-user-id': testUserId }
      });
      assert.equal(res.status, 200);

      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.freezeShieldsCount, 2);
    });
  });
});
