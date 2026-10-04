import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import app from '../server/index.js';
import { db } from '../server/db.js';
import {
  CONNECTED_PROGRESSIONS,
  evaluateProgressionStep
} from '../src/lib/scoring/connectedProgression.js';

describe('PRON-206: Connected Speech Positional Progression Tests', () => {

  describe('Progression Tracks & Step Sequence (AC 1 & AC 2)', () => {
    test('Must contain progression tracks for breathe, smooth, and cloth', () => {
      assert.ok(CONNECTED_PROGRESSIONS.prog_breathe);
      assert.ok(CONNECTED_PROGRESSIONS.prog_smooth);
      assert.ok(CONNECTED_PROGRESSIONS.prog_cloth);
    });

    test('prog_breathe should define 3 sequential levels: Word -> Phrase -> Sentence', () => {
      const track = CONNECTED_PROGRESSIONS.prog_breathe;
      assert.equal(track.targetPhoneme, '/ð/');
      assert.equal(track.steps.length, 3);
      assert.equal(track.steps[0].type, 'word');
      assert.equal(track.steps[0].text, 'breathe');
      assert.equal(track.steps[1].type, 'phrase');
      assert.equal(track.steps[1].text, 'breathe in deeply');
      assert.equal(track.steps[2].type, 'sentence');
      assert.ok(track.steps[2].text.includes('Take a moment to breathe in deeply'));
    });
  });

  describe('Step Evaluation & Auto-Advance Conditions (AC 1 & AC 4)', () => {
    test('evaluateProgressionStep should allow advancing when step score >= 80%', () => {
      const res = evaluateProgressionStep({
        progressionId: 'prog_breathe',
        stepIndex: 0,
        score: 88
      });
      assert.equal(res.isPassed, true);
      assert.equal(res.canAdvance, true);
      assert.equal(res.nextStepIndex, 1);
    });

    test('evaluateProgressionStep should not allow advancing when score < 80%', () => {
      const res = evaluateProgressionStep({
        progressionId: 'prog_breathe',
        stepIndex: 0,
        score: 65
      });
      assert.equal(res.isPassed, false);
      assert.equal(res.canAdvance, false);
      assert.equal(res.nextStepIndex, null);
    });
  });

  describe('Context Degradation Detection (AC 3)', () => {
    test('Should flag degradation alert when score drops >15% compared to baseline', () => {
      // Baseline on word was 92%, but sentence dropped to 72% (diff: 20%)
      const res = evaluateProgressionStep({
        progressionId: 'prog_breathe',
        stepIndex: 2,
        score: 72,
        baselineScore: 92
      });
      assert.equal(res.hasDegradation, true);
      assert.equal(res.degradationGap, 20);
      assert.ok(res.degradationAlert.includes('Bạn đang bị mất âm khi nói dài hơn'));
      assert.ok(res.degradationAlert.includes('92% ➔ 72%'));
    });

    test('Should not flag degradation if score drop is within acceptable margin (<=15%)', () => {
      const res = evaluateProgressionStep({
        progressionId: 'prog_breathe',
        stepIndex: 1,
        score: 82,
        baselineScore: 90
      });
      assert.equal(res.hasDegradation, false);
      assert.equal(res.degradationAlert, null);
    });
  });

  describe('Backend API & SQLite Persistence (Gate D & E)', () => {
    let server;
    const testPort = 3863;
    const baseUrl = `http://localhost:${testPort}`;

    before(async () => {
      await new Promise((resolve) => {
        server = app.listen(testPort, () => resolve());
      });
    });

    after(async () => {
      if (server) {
        await new Promise((resolve) => server.close(resolve));
      }
    });

    test('GET /api/v1/practice/progression/catalog should return tracks', async () => {
      const res = await fetch(`${baseUrl}/api/v1/practice/progression/catalog`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(Array.isArray(data.catalog));
      assert.ok(data.catalog.length >= 3);
      assert.equal(data.catalog[0].id, 'prog_breathe');
    });

    test('POST /api/v1/practice/progression-tier should evaluate and persist to SQLite', async () => {
      const res = await fetch(`${baseUrl}/api/v1/practice/progression-tier`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'user_progression_test'
        },
        body: JSON.stringify({
          progressionId: 'prog_breathe',
          stepIndex: 1,
          score: 85,
          baselineScore: 90
        })
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.recordId.startsWith('csp-'));
      assert.equal(data.evaluation.isPassed, true);
      assert.equal(data.evaluation.canAdvance, true);

      // Verify row persisted in SQLite
      const row = db.prepare('SELECT * FROM connected_progression_records WHERE id = ?').get(data.recordId);
      assert.ok(row, 'Record not found in SQLite table');
      assert.equal(row.user_id, 'user_progression_test');
      assert.equal(row.progression_id, 'prog_breathe');
      assert.equal(row.step_index, 1);
      assert.equal(row.score, 85);
      assert.equal(row.baseline_score, 90);
      assert.equal(row.has_degradation, 0);
    });

    test('GET /api/v1/practice/progression/latest should retrieve the user record', async () => {
      const res = await fetch(`${baseUrl}/api/v1/practice/progression/latest`, {
        headers: { 'x-user-id': 'user_progression_test' }
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.recordId);
      assert.equal(data.progressionId, 'prog_breathe');
      assert.equal(data.stepIndex, 1);
      assert.equal(data.score, 85);
    });

    test('POST /api/v1/practice/progression-tier validation: reject missing stepIndex with 400', async () => {
      const res = await fetch(`${baseUrl}/api/v1/practice/progression-tier`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ progressionId: 'prog_breathe' })
      });

      assert.equal(res.status, 400);
      const data = await res.json();
      assert.equal(data.success, false);
      assert.ok(data.error.includes('Missing required fields'));
    });
  });

});
