import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import app from '../server/index.js';
import { db } from '../server/db.js';
import {
  MINIMAL_PAIRS_CATALOG,
  generateQuizQuestion,
  evaluateQuizAnswer
} from '../src/lib/scoring/minimalPairs.js';

describe('ELSA-205: Minimal Pair Auditory Discrimination Quizzes Tests', () => {

  describe('Minimal Pairs Catalog & Phonemic Contrasts (AC 1)', () => {
    test('Must contain essential minimal pairs for Vietnamese learners', () => {
      assert.ok(MINIMAL_PAIRS_CATALOG.pair_theta_t);
      assert.ok(MINIMAL_PAIRS_CATALOG.pair_long_short_i);
      assert.ok(MINIMAL_PAIRS_CATALOG.pair_s_sh);
      assert.ok(MINIMAL_PAIRS_CATALOG.pair_b_p);
      assert.ok(MINIMAL_PAIRS_CATALOG.pair_l_n);
      assert.ok(MINIMAL_PAIRS_CATALOG.pair_d_eth);
    });

    test('Each pair must have valid IPA, Vietnamese context and articulatory hints (AC 3)', () => {
      const pair = MINIMAL_PAIRS_CATALOG.pair_theta_t;
      assert.equal(pair.phonemeA, '/θ/');
      assert.equal(pair.phonemeB, '/t/');
      assert.equal(pair.words.a.word, 'think');
      assert.equal(pair.words.b.word, 'tink');
      assert.ok(pair.articulatoryHint.includes('đầu lưỡi'));
      assert.ok(pair.vietnameseContext.includes('răng xát'));
    });
  });

  describe('Quiz Generation & Scoring / Streak Logic (AC 2 & AC 4)', () => {
    test('generateQuizQuestion should select one valid target word between A and B', () => {
      const q = generateQuizQuestion('pair_theta_t');
      assert.equal(q.pairId, 'pair_theta_t');
      assert.ok(['think', 'tink'].includes(q.targetWord));
      assert.ok(['a', 'b'].includes(q.targetOption));
      assert.equal(q.optionA.word, 'think');
      assert.equal(q.optionB.word, 'tink');
    });

    test('evaluateQuizAnswer should award base 15 XP and increment streak on correct answer', () => {
      const res = evaluateQuizAnswer('pair_theta_t', 'think', 'think', 950, 0);
      assert.equal(res.isCorrect, true);
      assert.equal(res.newStreak, 1);
      assert.equal(res.xpAwarded, 15);
      assert.ok(res.feedback.includes('Chính xác'));
    });

    test('evaluateQuizAnswer should apply streak bonuses for >= 3 and >= 5 streaks', () => {
      const streak3 = evaluateQuizAnswer('pair_theta_t', 'think', 'think', 800, 2);
      assert.equal(streak3.newStreak, 3);
      assert.equal(streak3.xpAwarded, 20); // 15 + 5 bonus

      const streak5 = evaluateQuizAnswer('pair_theta_t', 'think', 'think', 800, 4);
      assert.equal(streak5.newStreak, 5);
      assert.equal(streak5.xpAwarded, 25); // 15 + 10 mega bonus
    });

    test('evaluateQuizAnswer should reset streak to 0 on incorrect answer', () => {
      const res = evaluateQuizAnswer('pair_theta_t', 'think', 'tink', 1100, 4);
      assert.equal(res.isCorrect, false);
      assert.equal(res.newStreak, 0);
      assert.equal(res.xpAwarded, 0);
      assert.ok(res.feedback.includes('Chưa đúng'));
    });
  });

  describe('Backend API & SQLite Persistence (Gate D & E)', () => {
    let server;
    const testPort = 3857;
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

    test('GET /api/v1/pedagogy/minimal-pairs should return all pairs list', async () => {
      const res = await fetch(`${baseUrl}/api/v1/pedagogy/minimal-pairs`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(Array.isArray(data.pairs));
      assert.ok(data.pairs.length >= 6);
    });

    test('GET /api/v1/pedagogy/minimal-pairs/question should return random question', async () => {
      const res = await fetch(`${baseUrl}/api/v1/pedagogy/minimal-pairs/question?pairId=pair_long_short_i`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.question.pairId, 'pair_long_short_i');
      assert.ok(['sheep', 'ship'].includes(data.question.targetWord));
    });

    test('POST /api/v1/pedagogy/minimal-pairs/submit should save result to SQLite', async () => {
      const res = await fetch(`${baseUrl}/api/v1/pedagogy/minimal-pairs/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'user_mp_test'
        },
        body: JSON.stringify({
          pairId: 'pair_theta_t',
          targetWord: 'think',
          selectedWord: 'think',
          reactionTimeMs: 950,
          currentStreak: 2
        })
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.recordId.startsWith('mpq-'));
      assert.equal(data.result.isCorrect, true);
      assert.equal(data.result.newStreak, 3);

      // Verify row persisted in SQLite
      const row = db.prepare('SELECT * FROM minimal_pair_quiz_records WHERE id = ?').get(data.recordId);
      assert.ok(row);
      assert.equal(row.pair_id, 'pair_theta_t');
      assert.equal(row.is_correct, 1);
      assert.equal(row.streak_count, 3);
      assert.equal(row.user_id, 'user_mp_test');
    });

    test('GET /api/v1/pedagogy/minimal-pairs/latest should retrieve the latest user record', async () => {
      const res = await fetch(`${baseUrl}/api/v1/pedagogy/minimal-pairs/latest`, {
        headers: { 'x-user-id': 'user_mp_test' }
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.recordId);
      assert.equal(data.pairId, 'pair_theta_t');
      assert.equal(data.isCorrect, true);
    });

    test('POST /api/v1/pedagogy/minimal-pairs/submit validation: should reject missing fields with 400', async () => {
      const res = await fetch(`${baseUrl}/api/v1/pedagogy/minimal-pairs/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pairId: 'pair_theta_t' })
      });

      assert.equal(res.status, 400);
      const data = await res.json();
      assert.equal(data.success, false);
      assert.ok(data.error.includes('Missing required fields'));
    });
  });

});
