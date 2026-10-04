import { describe, it, before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import app from '../server/index.js';
import { db } from '../server/db.js';
import {
  evaluateSlidingWindow,
  clearSlidingWindowStore,
  checkTierEntitlement
} from '../src/lib/security/slidingWindowRateLimiter.js';

const PORT = 3886;
let server;

describe('ARCH-104: Tiered Quota Limiter & Entitlement Enforcement Tests', () => {
  before((done) => {
    server = http.createServer(app);
    server.listen(PORT, done);
  });

  after((done) => {
    server.close(done);
  });

  beforeEach(() => {
    clearSlidingWindowStore();
  });

  describe('Sliding Window Algorithm (AC 2)', () => {
    it('allows 10 requests within a 60-second window', () => {
      const now = Date.now();
      for (let i = 0; i < 10; i++) {
        const res = evaluateSlidingWindow('test_client_01', { windowMs: 60000, maxRequests: 10, now: now + i * 100 });
        assert.equal(res.allowed, true);
        assert.equal(res.remaining, 9 - i);
      }
    });

    it('blocks the 11th request within window with retryAfterSec', () => {
      const now = Date.now();
      for (let i = 0; i < 10; i++) {
        evaluateSlidingWindow('test_client_02', { windowMs: 60000, maxRequests: 10, now: now + i * 100 });
      }

      const blocked = evaluateSlidingWindow('test_client_02', { windowMs: 60000, maxRequests: 10, now: now + 2000 });
      assert.equal(blocked.allowed, false);
      assert.equal(blocked.remaining, 0);
      assert.ok(blocked.retryAfterSec > 0 && blocked.retryAfterSec <= 60);
    });

    it('slides window and frees capacity after window expiration', () => {
      const pastTime = Date.now() - 65000; // 65s ago
      for (let i = 0; i < 10; i++) {
        evaluateSlidingWindow('test_client_03', { windowMs: 60000, maxRequests: 10, now: pastTime + i * 100 });
      }

      // Now (65s later) window has slid past old timestamps
      const freshRes = evaluateSlidingWindow('test_client_03', { windowMs: 60000, maxRequests: 10, now: Date.now() });
      assert.equal(freshRes.allowed, true);
      assert.equal(freshRes.remaining, 9);
    });
  });

  describe('Tier Quota & RFC-7807 Entitlement (AC 1 & AC 3)', () => {
    it('enforces 5-lesson daily limit for Free Tier with RFC-7807 problem details', () => {
      const freeUser = { id: 'usr_free_01', tier: 'free' };

      // Lesson 1 to 5 allowed
      const lesson5 = checkTierEntitlement(freeUser, 4);
      assert.equal(lesson5.allowed, true);
      assert.equal(lesson5.remainingLessons, 1);

      // Lesson 6 blocked with 429
      const lesson6 = checkTierEntitlement(freeUser, 5);
      assert.equal(lesson6.allowed, false);
      assert.equal(lesson6.statusCode, 429);
      assert.ok(lesson6.problemDetails);
      assert.equal(lesson6.problemDetails.status, 429);
      assert.equal(lesson6.problemDetails.type, 'https://vietphonics.com/errors/daily-quota-exceeded');
    });

    it('bypasses daily quota for Pro tier with sub-2ms verification latency', () => {
      const proUser = { id: 'usr_pro_01', tier: 'pro' };

      const check50 = checkTierEntitlement(proUser, 50);
      assert.equal(check50.allowed, true);
      assert.equal(check50.tier, 'pro');
      assert.equal(check50.statusCode, 200);
      assert.ok(check50.latencyMs < 2.0, `Latency ${check50.latencyMs}ms must be under 2ms SLA`);
    });
  });

  describe('REST API Rate Limiter Endpoints', () => {
    it('POST /api/v1/security/rate-limit/check sets headers and blocks burst spam', async () => {
      const clientKey = `ip_test_${Date.now()}`;

      // Send 10 rapid calls
      for (let i = 0; i < 10; i++) {
        const res = await fetch(`http://localhost:${PORT}/api/v1/security/rate-limit/check`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-user-id': clientKey },
          body: JSON.stringify({ endpoint: '/api/v1/scoring', maxRequests: 10 })
        });
        assert.equal(res.status, 200);
        assert.equal(res.headers.get('x-ratelimit-limit'), '10');
      }

      // 11th call gets 429
      const blockedRes = await fetch(`http://localhost:${PORT}/api/v1/security/rate-limit/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': clientKey },
        body: JSON.stringify({ endpoint: '/api/v1/scoring', maxRequests: 10 })
      });

      assert.equal(blockedRes.status, 429);
      assert.ok(blockedRes.headers.get('retry-after'));
      const problem = await blockedRes.json();
      assert.equal(problem.status, 429);
      assert.ok(problem.detail.includes('quá 10 yêu cầu'));
    });

    it('GET /api/v1/security/entitlements/:userId checks tier entitlements', async () => {
      const res = await fetch(`http://localhost:${PORT}/api/v1/security/entitlements/usr_arch_default`);
      assert.equal(res.status, 200);
      const data = await res.json();

      assert.equal(data.success, true);
      assert.equal(data.tier, 'pro');
      assert.equal(data.allowed, true);
      assert.ok(data.verificationLatencyMs < 2.0);
    });
  });
});
