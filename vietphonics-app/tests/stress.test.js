import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import app from '../server/index.js';
import { db } from '../server/db.js';
import {
  evaluateSyllableStress,
  SYLLABLE_STRESS_WORDS
} from '../src/lib/scoring/syllableStress.js';

let server;
const PORT = 3854; // Dedicated test port for syllable stress tests

describe('ELSA-202: Syllable Stress & Word Emphasis Evaluator Tests', () => {
  before(async () => {
    await new Promise((resolve) => {
      server = app.listen(PORT, resolve);
    });
  });

  after(async () => {
    await new Promise((resolve) => {
      server.close(resolve);
    });
  });

  describe('Syllable Decomposition & Stress Placement (AC 1)', () => {
    test('Must correctly identify primary stressed syllable in multi-syllable words', () => {
      const photography = SYLLABLE_STRESS_WORDS['photography'];
      assert.ok(photography);
      assert.strictEqual(photography.primaryStressIndex, 1); // 'TO'
      assert.strictEqual(photography.syllables[1].text, 'TO');
      assert.strictEqual(photography.syllables[1].isStressed, true);

      const photograph = SYLLABLE_STRESS_WORDS['photograph'];
      assert.ok(photograph);
      assert.strictEqual(photograph.primaryStressIndex, 0); // 'PHO'
      assert.strictEqual(photograph.syllables[0].text, 'PHO');
    });

    test('Must support grammatical stress shifts (Noun vs Verb contrast pairs)', () => {
      const recordNoun = SYLLABLE_STRESS_WORDS['record (noun)'];
      const recordVerb = SYLLABLE_STRESS_WORDS['record (verb)'];

      assert.strictEqual(recordNoun.primaryStressIndex, 0); // 'RE'
      assert.strictEqual(recordVerb.primaryStressIndex, 1); // 'CORD'
    });
  });

  describe('Three Pillars of Stress: Duration, Volume, Pitch (AC 2)', () => {
    test('Should calculate Three Pillars metrics compared to unstressed syllables', () => {
      const result = evaluateSyllableStress({
        word: 'photography',
        userStressIndex: 1,
        userStressedDurationMs: 275,
        userStressedPitchHz: 182,
        userStressedVolumeDb: 68
      });

      assert.ok(result);
      assert.strictEqual(result.isCorrect, true);
      assert.ok(result.score >= 85);
      assert.ok(result.threePillars.durationRatio >= 2.0, 'Duration ratio should be at least 2.0x');
      assert.ok(result.threePillars.volumeDeltaDb >= 4.0, 'Volume delta should be at least +4dB');
      assert.ok(result.threePillars.pitchDeltaHz >= 30, 'Pitch delta should be at least +30Hz');
    });

    test('Should flag low score when user stresses the wrong syllable', () => {
      const result = evaluateSyllableStress({
        word: 'photography',
        userStressIndex: 0 // Wrong: stressed 'pho' instead of 'TO'
      });

      assert.strictEqual(result.isCorrect, false);
      assert.strictEqual(result.status, 'wrong_syllable');
      assert.ok(result.score <= 50);
    });
  });

  describe('Vietnamese L1 "Dấu Sắc" Tone Trap Detection (AC 3)', () => {
    test('Must detect L1 tone trap when pitch is elevated but duration is too short (<130ms)', () => {
      const result = evaluateSyllableStress({
        word: 'photography',
        userStressIndex: 1,
        userStressedDurationMs: 95, // Too short! Just a sharp tone mark
        userStressedPitchHz: 185
      });

      assert.strictEqual(result.l1ToneTrap, true);
      assert.strictEqual(result.status, 'l1_tone_trap');
      assert.ok(result.pedagogicalAdvice.includes('dấu sắc tiếng Việt'));
    });
  });

  describe('Backend API & SQLite Persistence (Gate D & E)', () => {
    const testUserId = `test-user-stress-${Date.now()}`;

    test('POST /api/v1/scoring/syllable-stress should evaluate and save record', async () => {
      const res = await fetch(`http://localhost:${PORT}/api/v1/scoring/syllable-stress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': testUserId
        },
        body: JSON.stringify({
          word: 'computer',
          userStressIndex: 1
        })
      });

      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(data.success, true);
      assert.ok(data.stressId);
      assert.strictEqual(data.userId, testUserId);
      assert.strictEqual(data.evaluation.word, 'computer');
      assert.strictEqual(data.evaluation.isCorrect, true);

      // Verify row in SQLite syllable_stress_records
      const row = db.prepare('SELECT * FROM syllable_stress_records WHERE id = ?').get(data.stressId);
      assert.ok(row);
      assert.strictEqual(row.user_id, testUserId);
      assert.strictEqual(row.word, 'computer');
      assert.strictEqual(row.is_correct, 1);
    });

    test('GET /api/v1/scoring/syllable-stress/latest should return the latest record', async () => {
      const res = await fetch(`http://localhost:${PORT}/api/v1/scoring/syllable-stress/latest`, {
        headers: {
          'x-user-id': testUserId
        }
      });

      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(data.success, true);
      assert.strictEqual(data.word, 'computer');
      assert.strictEqual(data.isCorrect, true);
    });

    test('Validation: Should reject empty word with 400 Bad Request', async () => {
      const res = await fetch(`http://localhost:${PORT}/api/v1/scoring/syllable-stress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word: '' })
      });

      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.strictEqual(data.success, false);
      assert.ok(data.error.includes('Missing required field: word'));
    });
  });
});
