import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import app from '../server/index.js';
import { db } from '../server/db.js';
import {
  DICTATION_EXERCISES,
  calculateLevenshtein,
  evaluateDictationSubmission
} from '../src/lib/scoring/audioDictation.js';

describe('PRON-202: Phonemic Audio Dictation & Gap-Fill Exercises Tests', () => {

  describe('Dictation Catalog & Phonemic Gaps (AC 1)', () => {
    test('Must contain standard exercises for ending clusters and silent letters', () => {
      assert.ok(DICTATION_EXERCISES.dic_01, 'Exercise dic_01 missing');
      assert.ok(DICTATION_EXERCISES.dic_02_silent, 'Exercise dic_02_silent missing');
      assert.ok(DICTATION_EXERCISES.dic_03, 'Exercise dic_03 missing');
    });

    test('dic_01 should target coda consonant clusters (x, sh, d)', () => {
      const ex = DICTATION_EXERCISES.dic_01;
      assert.equal(ex.gaps.length, 3);
      assert.equal(ex.gaps[0].target, 'x');
      assert.equal(ex.gaps[0].ipa, '/sɪks/');
      assert.equal(ex.gaps[1].target, 'sh');
      assert.equal(ex.gaps[1].ipa, '/freʃ/');
      assert.equal(ex.gaps[2].target, 'd');
      assert.equal(ex.gaps[2].ipa, '/bred/');
    });

    test('dic_02_silent should provide pedagogical silent letter explanations', () => {
      const ex = DICTATION_EXERCISES.dic_02_silent;
      assert.ok(ex.silentLetterTip.includes('doubt'));
      assert.ok(ex.silentLetterTip.includes('/daʊt/'));
      assert.ok(ex.silentLetterTip.includes('knight'));
    });
  });

  describe('Levenshtein Distance Metric & String Normalization (AC 3)', () => {
    test('calculateLevenshtein should return 0 for identical strings (case-insensitive & trimmed)', () => {
      assert.equal(calculateLevenshtein('sh', 'sh'), 0);
      assert.equal(calculateLevenshtein('SH', 'sh'), 0);
      assert.equal(calculateLevenshtein('  x  ', 'x'), 0);
    });

    test('calculateLevenshtein should accurately compute insertion, deletion, and substitution', () => {
      assert.equal(calculateLevenshtein('s', 'sh'), 1); // insertion
      assert.equal(calculateLevenshtein('shh', 'sh'), 1); // deletion
      assert.equal(calculateLevenshtein('ch', 'sh'), 1); // substitution
      assert.equal(calculateLevenshtein('abc', 'xyz'), 3);
    });
  });

  describe('Dictation Scoring Algorithm & Feedback (AC 4)', () => {
    test('evaluateDictationSubmission should score 100% and award bonus XP on perfect input', () => {
      const answers = {
        gap_1: 'x',
        gap_2: 'sh',
        gap_3: 'd'
      };
      const result = evaluateDictationSubmission('dic_01', answers);
      assert.equal(result.score, 100);
      assert.equal(result.correctCount, 3);
      assert.equal(result.totalGaps, 3);
      assert.equal(result.isAllCorrect, true);
      assert.equal(result.xpAwarded, 45); // 3*10 + 15 bonus
      assert.equal(result.gapResults.gap_1.isCorrect, true);
      assert.equal(result.gapResults.gap_2.isCorrect, true);
      assert.equal(result.gapResults.gap_3.isCorrect, true);
    });

    test('evaluateDictationSubmission should accurately handle partial mistakes', () => {
      const answers = {
        gap_1: 'x',
        gap_2: 'ch', // wrong
        gap_3: 'd'
      };
      const result = evaluateDictationSubmission('dic_01', answers);
      assert.equal(result.correctCount, 2);
      assert.equal(result.totalGaps, 3);
      assert.equal(result.score, 67); // Math.round(2/3 * 100)
      assert.equal(result.isAllCorrect, false);
      assert.equal(result.xpAwarded, 20); // 2*10, no bonus
      assert.equal(result.gapResults.gap_2.isCorrect, false);
      assert.equal(result.gapResults.gap_2.levenshteinDistance, 1);
    });
  });

  describe('Backend API & SQLite Persistence (Gate D & E)', () => {
    let server;
    const testPort = 3859;
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

    test('GET /api/v1/practice/dictation-exercises should return catalog', async () => {
      const res = await fetch(`${baseUrl}/api/v1/practice/dictation-exercises`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(Array.isArray(data.exercises));
      assert.ok(data.exercises.length >= 3);
      assert.equal(data.exercises[0].id, 'dic_01');
    });

    test('POST /api/v1/practice/dictation-submit should evaluate and persist to SQLite', async () => {
      const res = await fetch(`${baseUrl}/api/v1/practice/dictation-submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'user_dictation_test'
        },
        body: JSON.stringify({
          exerciseId: 'dic_01',
          userAnswers: {
            gap_1: 'x',
            gap_2: 'sh',
            gap_3: 'd'
          }
        })
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.recordId.startsWith('dic-'));
      assert.equal(data.evaluation.isAllCorrect, true);
      assert.equal(data.evaluation.score, 100);

      // Verify row persisted in SQLite database
      const row = db.prepare('SELECT * FROM dictation_exercise_records WHERE id = ?').get(data.recordId);
      assert.ok(row, 'Row not found in SQLite table');
      assert.equal(row.user_id, 'user_dictation_test');
      assert.equal(row.exercise_id, 'dic_01');
      assert.equal(row.is_all_correct, 1);
      assert.equal(row.score, 100);
      assert.equal(row.correct_gaps_count, 3);
      assert.equal(row.total_gaps_count, 3);
    });

    test('GET /api/v1/practice/dictation/latest should retrieve the user record', async () => {
      const res = await fetch(`${baseUrl}/api/v1/practice/dictation/latest`, {
        headers: { 'x-user-id': 'user_dictation_test' }
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.recordId);
      assert.equal(data.exerciseId, 'dic_01');
      assert.equal(data.isAllCorrect, true);
      assert.equal(data.score, 100);
      assert.equal(data.userAnswers.gap_1, 'x');
    });

    test('POST /api/v1/practice/dictation-submit validation: reject missing exerciseId with 400', async () => {
      const res = await fetch(`${baseUrl}/api/v1/practice/dictation-submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userAnswers: {} })
      });

      assert.equal(res.status, 400);
      const data = await res.json();
      assert.equal(data.success, false);
      assert.ok(data.error.includes('Missing required field: exerciseId'));
    });
  });

});
