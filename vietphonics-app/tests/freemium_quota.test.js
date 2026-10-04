import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import app from '../server/index.js';
import { db } from '../server/db.js';
import {
  evaluateUserQuota,
  getCountdownUntilMidnight,
  getProBenefits,
  FREE_DAILY_LESSON_LIMIT
} from '../src/lib/scoring/freemiumQuota.js';

describe('ELSA-602: Freemium 5-Lesson Daily Limit & Pro Paywall Tests', () => {
  let server;
  const PORT = 3881;
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

  describe('Quota Calculation & Midnight Reset Countdown (AC 1 & AC 4)', () => {
    test('Daily limit must be strictly 5 lessons', () => {
      assert.equal(FREE_DAILY_LESSON_LIMIT, 5);
      const quota = evaluateUserQuota({ lessonsCompletedToday: 0, isPro: false });
      assert.equal(quota.dailyLimit, 5);
      assert.equal(quota.remainingLessons, 5);
      assert.equal(quota.canAccessLesson, true);
    });

    test('Reaching 5 lessons marks quota exceeded and blocks access', () => {
      const quota = evaluateUserQuota({ lessonsCompletedToday: 5, isPro: false });
      assert.equal(quota.isQuotaExceeded, true);
      assert.equal(quota.remainingLessons, 0);
      assert.equal(quota.canAccessLesson, false);
      assert.ok(quota.badgeText.includes('5/5 bài miễn phí đã dùng'));
    });

    test('Pro account bypasses daily quota entirely', () => {
      const quota = evaluateUserQuota({ lessonsCompletedToday: 20, isPro: true });
      assert.equal(quota.isPro, true);
      assert.equal(quota.isQuotaExceeded, false);
      assert.equal(quota.canAccessLesson, true);
      assert.equal(quota.remainingLessons, Infinity);
    });

    test('Countdown until midnight formats accurate hours and minutes (AC 4)', () => {
      const cd = getCountdownUntilMidnight();
      assert.ok(cd.hours >= 0 && cd.hours <= 24);
      assert.ok(cd.minutes >= 0 && cd.minutes <= 59);
      assert.ok(cd.countdownText.includes('5 bài miễn phí mới sẽ được nạp lại sau:'));
      assert.ok(cd.countdownText.includes('(Lúc 00:00)'));
    });

    test('Pro benefits catalog highlights 4 core privileges (AC 2)', () => {
      const benefits = getProBenefits();
      assert.equal(benefits.length, 4);
      const expectedIds = ['unlimited_practice', 'ai_roleplay', 'ielts_examiner', 'error_bank_sm2'];
      for (const id of expectedIds) {
        assert.ok(benefits.some((b) => b.id === id));
      }
    });
  });

  describe('REST API & Database Persistence (AC 1, AC 2, AC 3)', () => {
    test('GET /api/v1/quota/status returns initial quota for user', async () => {
      const testUserId = `user-quota-init-${Date.now()}`;
      const res = await fetch(`${baseUrl}/api/v1/quota/status`, {
        headers: { 'x-user-id': testUserId }
      });
      assert.equal(res.status, 200);

      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.quota.lessonsCompletedToday, 0);
      assert.equal(data.quota.remainingLessons, 5);
      assert.equal(data.quota.canAccessLesson, true);
      assert.equal(data.benefits.length, 4);
    });

    test('POST /api/v1/quota/consume-lesson consumes lesson up to 5 and then blocks with 403', async () => {
      const testUserId = `user-quota-consume-${Date.now()}`;
      // Consume 5 lessons
      for (let i = 1; i <= 5; i++) {
        const res = await fetch(`${baseUrl}/api/v1/quota/consume-lesson`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-user-id': testUserId
          }
        });
        assert.equal(res.status, 200);
        const data = await res.json();
        assert.equal(data.quota.lessonsCompletedToday, i);
      }

      // 6th attempt must be rejected with 403
      const blockedRes = await fetch(`${baseUrl}/api/v1/quota/consume-lesson`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': testUserId
        }
      });
      assert.equal(blockedRes.status, 403);
      const blockedData = await blockedRes.json();
      assert.equal(blockedData.success, false);
      assert.ok(blockedData.error.includes('Đã hết định ngạch'));

      // Verify in SQLite
      const today = new Date().toISOString().split('T')[0];
      const row = db.prepare('SELECT * FROM freemium_quota_records WHERE user_id = ? AND date_str = ?').get(testUserId, today);
      assert.ok(row);
      assert.equal(row.lessons_completed_today, 5);
    });

    test('POST /api/v1/quota/upgrade-pro upgrades user to Pro and unblocks access', async () => {
      const testUserId = `user-quota-upgrade-${Date.now()}`;
      // Upgrade
      const upRes = await fetch(`${baseUrl}/api/v1/quota/upgrade-pro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': testUserId
        }
      });
      assert.equal(upRes.status, 200);
      const upData = await upRes.json();
      assert.equal(upData.isPro, true);

      // Verify status now shows isPro: true
      const statRes = await fetch(`${baseUrl}/api/v1/quota/status`, {
        headers: { 'x-user-id': testUserId }
      });
      const statData = await statRes.json();
      assert.equal(statData.quota.isPro, true);
      assert.equal(statData.quota.canAccessLesson, true);
    });
  });
});
