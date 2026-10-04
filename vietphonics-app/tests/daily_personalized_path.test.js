import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import app from '../server/index.js';
import { db } from '../server/db.js';
import {
  getDailyPathCurriculum,
  processStepCompletion
} from '../src/lib/scoring/dailyPersonalizedPath.js';

describe('ELSA-401: 10-Minute Daily Personalized Practice Path Tests', () => {
  let server;
  const PORT = 3878;
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

  describe('Adaptive Curriculum Engine & Regional L1 Traps (AC 1 & AC 3)', () => {
    test('Curriculum for Northern VN (bac) contains exactly 5 micro-steps totaling 10 minutes and prioritizes L/N', () => {
      const cur = getDailyPathCurriculum('bac');
      assert.equal(cur.totalSteps, 5);
      assert.equal(cur.totalMinutes, 10);
      assert.equal(cur.steps.length, 5);
      assert.equal(cur.steps[0].type, 'warmup');
      assert.equal(cur.steps[1].type, 'challenge');
      assert.equal(cur.steps[2].type, 'challenge');
      assert.equal(cur.steps[3].type, 'minimal_pair');
      assert.equal(cur.steps[4].type, 'sentence');

      // Check L/N priority
      const lnStep = cur.steps.find((s) => s.phoneme.includes('l') || s.phoneme.includes('n'));
      assert.ok(lnStep);
      assert.ok(lnStep.trapReason.includes('L/N'));
    });

    test('Curriculum for Southern VN (nam) prioritizes final consonant dropping /t/ and /k/', () => {
      const cur = getDailyPathCurriculum('nam');
      assert.equal(cur.totalSteps, 5);
      assert.equal(cur.totalMinutes, 10);
      const tStep = cur.steps.find((s) => s.phoneme === '/t/');
      assert.ok(tStep);
      assert.equal(tStep.targetWord, 'contact');
      assert.ok(tStep.trapReason.includes('thanh hầu'));
    });

    test('Curriculum for Central VN (trung) prioritizes diphthongs /eə/ and /ɪə/', () => {
      const cur = getDailyPathCurriculum('trung');
      assert.equal(cur.totalSteps, 5);
      assert.equal(cur.totalMinutes, 10);
      const diphthong = cur.steps.find((s) => s.phoneme === '/eə/');
      assert.ok(diphthong);
      assert.equal(diphthong.targetWord, 'square');
    });
  });

  describe('Pill Stepper Math & Completion State (AC 2 & AC 4)', () => {
    test('processStepCompletion advances completed steps and remaining minutes accurately', () => {
      const step1 = processStepCompletion({ currentCompletedSteps: 0, targetOrder: 1, totalSteps: 5 });
      assert.equal(step1.completedSteps, 1);
      assert.equal(step1.nextStepOrder, 2);
      assert.equal(step1.remainingMinutes, 8);
      assert.equal(step1.isAllCompleted, false);
      assert.equal(step1.progressPercent, 20);

      const step3 = processStepCompletion({ currentCompletedSteps: 1, targetOrder: 3, totalSteps: 5 });
      assert.equal(step3.completedSteps, 3);
      assert.equal(step3.nextStepOrder, 4);
      assert.equal(step3.remainingMinutes, 4);
      assert.equal(step3.isAllCompleted, false);
      assert.equal(step3.progressPercent, 60);

      const step5 = processStepCompletion({ currentCompletedSteps: 4, targetOrder: 5, totalSteps: 5 });
      assert.equal(step5.completedSteps, 5);
      assert.equal(step5.nextStepOrder, 5);
      assert.equal(step5.remainingMinutes, 0);
      assert.equal(step5.isAllCompleted, true);
      assert.equal(step5.progressPercent, 100);
    });
  });

  describe('REST API & Database Persistence (AC 1, AC 2, AC 3)', () => {
    test('GET /api/v1/curriculum/daily-path initializes 5-step path in SQLite', async () => {
      const testUserId = `test-path-user-${Date.now()}`;
      const res = await fetch(`${baseUrl}/api/v1/curriculum/daily-path?dialect=nam`, {
        headers: { 'x-user-id': testUserId }
      });
      assert.equal(res.status, 200);

      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.totalSteps, 5);
      assert.equal(data.completedSteps, 0);
      assert.equal(data.remainingMinutes, 10);
      assert.equal(data.curriculum.steps.length, 5);

      // Verify in SQLite
      const row = db.prepare('SELECT * FROM daily_practice_path_records WHERE user_id = ?').get(testUserId);
      assert.ok(row);
      assert.equal(row.dialect, 'nam');
      assert.equal(row.completed_steps, 0);
    });

    test('POST /api/v1/curriculum/step-complete completes micro-step and updates SQLite', async () => {
      const testUserId = `test-step-comp-${Date.now()}`;
      // Initialize first
      await fetch(`${baseUrl}/api/v1/curriculum/daily-path?dialect=bac`, {
        headers: { 'x-user-id': testUserId }
      });

      // Complete step 1
      const res = await fetch(`${baseUrl}/api/v1/curriculum/step-complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': testUserId
        },
        body: JSON.stringify({ stepOrder: 1 })
      });
      assert.equal(res.status, 200);

      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.completedSteps, 1);
      assert.equal(data.currentStepOrder, 2);
      assert.equal(data.remainingMinutes, 8);
      assert.equal(data.isAllCompleted, false);

      // Check SQLite table
      const row = db.prepare('SELECT * FROM daily_practice_path_records WHERE user_id = ?').get(testUserId);
      assert.ok(row);
      assert.equal(row.completed_steps, 1);
      assert.equal(row.current_step_order, 2);
      assert.equal(row.remaining_minutes, 8);
    });

    test('GET /api/v1/curriculum/daily-path/latest returns current user path state', async () => {
      const testUserId = `test-path-latest-${Date.now()}`;
      // Initialize path
      await fetch(`${baseUrl}/api/v1/curriculum/daily-path?dialect=trung`, {
        headers: { 'x-user-id': testUserId }
      });

      const res = await fetch(`${baseUrl}/api/v1/curriculum/daily-path/latest`, {
        headers: { 'x-user-id': testUserId }
      });
      assert.equal(res.status, 200);

      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.dailyPath);
      assert.equal(data.dailyPath.dialect, 'trung');
      assert.equal(data.dailyPath.totalSteps, 5);
    });
  });
});
