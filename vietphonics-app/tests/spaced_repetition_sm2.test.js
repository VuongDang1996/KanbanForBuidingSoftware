import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import app from '../server/index.js';
import { db } from '../server/db.js';
import {
  calculateSM2,
  getInitialCards
} from '../src/lib/scoring/spacedRepetitionSM2.js';

describe('ELSA-402: Automated Error Bank with Spaced Repetition (SM-2) Tests', () => {
  let server;
  const PORT = 3879;
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

  describe('SuperMemo-2 Formula & Interval Math (AC 2 & AC 3)', () => {
    test('Initial error cards contain comfortable, clothes, and specific with valid properties', () => {
      const cards = getInitialCards();
      assert.equal(cards.length, 3);
      const comfortable = cards.find((c) => c.word === 'comfortable');
      assert.ok(comfortable);
      assert.equal(comfortable.easinessFactor, 2.5);
      assert.equal(comfortable.intervalDays, 1);
      assert.ok(comfortable.muscleTip.includes('3 nhịp'));
    });

    test('Rating Hard (q = 3) reduces EF and schedules review in 1 day', () => {
      const res = calculateSM2({
        quality: 3,
        currentEF: 2.5,
        currentInterval: 1,
        repetitions: 0,
        score: 60
      });

      assert.equal(res.intervalDays, 1);
      assert.equal(res.repetitions, 1);
      // EF' = 2.5 + (0.1 - 2 * (0.08 + 2 * 0.02)) = 2.5 + (0.1 - 0.24) = 2.36
      assert.equal(res.easinessFactor, 2.36);
      assert.equal(res.isMastered, false);
    });

    test('Rating Good (q = 4) maintains reasonable EF and schedules review in 3 days', () => {
      const res = calculateSM2({
        quality: 4,
        currentEF: 2.5,
        currentInterval: 1,
        repetitions: 0,
        score: 86
      });

      assert.equal(res.intervalDays, 3);
      assert.equal(res.repetitions, 1);
      // EF' = 2.5 + (0.1 - 1 * (0.08 + 1 * 0.02)) = 2.5 + 0 = 2.5
      assert.equal(res.easinessFactor, 2.5);
      assert.equal(res.consecutiveHighScores, 1);
    });

    test('Rating Easy (q = 5) increases EF and schedules review in 7 days', () => {
      const res = calculateSM2({
        quality: 5,
        currentEF: 2.5,
        currentInterval: 1,
        repetitions: 0,
        score: 95
      });

      assert.equal(res.intervalDays, 7);
      assert.equal(res.repetitions, 1);
      // EF' = 2.5 + (0.1 - 0) = 2.6
      assert.equal(res.easinessFactor, 2.6);
      assert.equal(res.consecutiveHighScores, 1);
    });

    test('EF is bounded at lower limit 1.3', () => {
      let ef = 1.4;
      for (let i = 0; i < 5; i++) {
        const res = calculateSM2({
          quality: 1,
          currentEF: ef,
          currentInterval: 1,
          repetitions: 0,
          score: 40
        });
        ef = res.easinessFactor;
      }
      assert.equal(ef, 1.3);
    });

    test('Graduation to Mastered occurs upon 3 consecutive scores >= 85 (AC 4)', () => {
      const cycle1 = calculateSM2({ quality: 5, currentEF: 2.5, currentInterval: 1, repetitions: 0, score: 90, consecutiveHighScores: 0 });
      assert.equal(cycle1.isMastered, false);
      assert.equal(cycle1.consecutiveHighScores, 1);

      const cycle2 = calculateSM2({ quality: 5, currentEF: cycle1.easinessFactor, currentInterval: cycle1.intervalDays, repetitions: cycle1.repetitions, score: 92, consecutiveHighScores: cycle1.consecutiveHighScores });
      assert.equal(cycle2.isMastered, false);
      assert.equal(cycle2.consecutiveHighScores, 2);

      const cycle3 = calculateSM2({ quality: 5, currentEF: cycle2.easinessFactor, currentInterval: cycle2.intervalDays, repetitions: cycle2.repetitions, score: 96, consecutiveHighScores: cycle2.consecutiveHighScores });
      assert.equal(cycle3.isMastered, true);
      assert.equal(cycle3.pointsAwarded, 50);
    });
  });

  describe('REST API & SQLite Error Bank Persistence (AC 1, AC 2, AC 3, AC 4)', () => {
    test('GET /api/v1/error-bank/due-cards seeds initial cards and returns due list', async () => {
      const testUserId = `test-sm2-user-${Date.now()}`;
      const res = await fetch(`${baseUrl}/api/v1/error-bank/due-cards`, {
        headers: { 'x-user-id': testUserId }
      });
      assert.equal(res.status, 200);

      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.dueCards.length >= 3);

      // Verify in SQLite
      const rows = db.prepare('SELECT * FROM error_bank_sm2_records WHERE user_id = ?').all(testUserId);
      assert.equal(rows.length, 3);
    });

    test('POST /api/v1/error-bank/review executes SM-2 review and updates card in SQLite', async () => {
      const testUserId = `test-sm2-rev-${Date.now()}`;
      // Initialize cards
      const initRes = await fetch(`${baseUrl}/api/v1/error-bank/due-cards`, {
        headers: { 'x-user-id': testUserId }
      });
      const initData = await initRes.json();
      const firstCard = initData.dueCards[0];

      // Review card with quality = 5, score = 90
      const revRes = await fetch(`${baseUrl}/api/v1/error-bank/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': testUserId
        },
        body: JSON.stringify({
          cardId: firstCard.id,
          quality: 5,
          score: 90
        })
      });
      assert.equal(revRes.status, 200);

      const revData = await revRes.json();
      assert.equal(revData.success, true);
      assert.equal(revData.sm2.intervalDays, 7);
      assert.equal(revData.updatedCard.status, 'learning');

      // Check SQLite table
      const row = db.prepare('SELECT * FROM error_bank_sm2_records WHERE id = ?').get(firstCard.id);
      assert.ok(row);
      assert.equal(row.interval_days, 7);
      assert.equal(row.consecutive_high_scores, 1);
    });

    test('GET /api/v1/error-bank/stats returns accurate statistics', async () => {
      const testUserId = `test-sm2-stats-${Date.now()}`;
      await fetch(`${baseUrl}/api/v1/error-bank/due-cards`, {
        headers: { 'x-user-id': testUserId }
      });

      const res = await fetch(`${baseUrl}/api/v1/error-bank/stats`, {
        headers: { 'x-user-id': testUserId }
      });
      assert.equal(res.status, 200);

      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.totalCards, 3);
      assert.ok(data.dueCount >= 1);
    });
  });
});
