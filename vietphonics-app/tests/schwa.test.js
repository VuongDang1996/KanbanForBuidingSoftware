import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import app from '../server/index.js';
import { db } from '../server/db.js';
import {
  calculateNeutralFormantDistance,
  evaluateSchwaDemotion,
  analyzeWordSchwa,
  getHapticPatternForSyllables,
  SCHWA_BENCHMARK_WORDS
} from '../src/lib/scoring/schwaDemotion.js';

describe('VN-103: Syllable Stress vs. Tone Mark Visualizer & Schwa Demotion Tests', () => {

  describe('Formant Space Proximity & Neutral Vowel Math (AC 1)', () => {
    test('calculateNeutralFormantDistance should return 0 at center (500Hz, 1500Hz)', () => {
      const dist = calculateNeutralFormantDistance(500, 1500);
      assert.equal(dist, 0);
    });

    test('calculateNeutralFormantDistance should calculate Euclidean distance correctly', () => {
      // 30^2 + 40^2 = 900 + 1600 = 2500 -> sqrt is 50
      const dist = calculateNeutralFormantDistance(530, 1540);
      assert.equal(dist, 50);
    });

    test('evaluateSchwaDemotion must certify relaxed rapid schwa (<85ms, D_neutral <= 160Hz)', () => {
      const res = evaluateSchwaDemotion(60, 510, 1490);
      assert.equal(res.isDemoted, true);
      assert.equal(res.isRapidDuration, true);
      assert.equal(res.isNeutralFormant, true);
      assert.equal(res.l1FullVowelTrap, false);
      assert.ok(res.score >= 85);
    });

    test('evaluateSchwaDemotion must flag L1 full unreduced vowel trap when duration > 150ms or F1 > 700Hz', () => {
      const res = evaluateSchwaDemotion(220, 820, 1250);
      assert.equal(res.isDemoted, false);
      assert.equal(res.l1FullVowelTrap, true);
      assert.ok(res.score <= 50);
    });
  });

  describe('Linguistic Benchmark Words & Pedagogical Contrast (AC 2 & AC 3)', () => {
    test('Must provide benchmark words with syllable breakdown and L1 tone traps', () => {
      assert.ok(SCHWA_BENCHMARK_WORDS.banana);
      assert.ok(SCHWA_BENCHMARK_WORDS.about);
      assert.ok(SCHWA_BENCHMARK_WORDS.chocolate);
      assert.ok(SCHWA_BENCHMARK_WORDS.camera);
      assert.ok(SCHWA_BENCHMARK_WORDS.police);

      const banana = SCHWA_BENCHMARK_WORDS.banana;
      assert.equal(banana.syllables.length, 3);
      assert.equal(banana.syllables[0].isSchwa, true);
      assert.equal(banana.syllables[1].isStress, true);
    });

    test('analyzeWordSchwa should detect L1 full vowel error on "banana" and give specific advice', () => {
      const result = analyzeWordSchwa('banana', null, true);
      assert.equal(result.word, 'banana');
      assert.equal(result.evaluation.isDemoted, false);
      assert.equal(result.evaluation.l1FullVowelTrap, true);
      assert.ok(result.feedback.includes("Bẫy nguyên âm mở L1"));
      assert.ok(result.pedagogicalAdvice.includes("chữ 'ba'"));
    });

    test('analyzeWordSchwa should reward proper schwa demotion on "banana"', () => {
      const result = analyzeWordSchwa('banana', { durationMs: 55, f1: 505, f2: 1510 }, false);
      assert.equal(result.evaluation.isDemoted, true);
      assert.ok(result.evaluation.score >= 90);
      assert.ok(result.feedback.includes("xuất sắc"));
    });
  });

  describe('Mobile Haptic Vibration Rhythm (AC 4)', () => {
    test('getHapticPatternForSyllables should map 100ms for primary stress and 15ms for schwa', () => {
      const syllables = [
        { text: 'ba', isStress: false, isSchwa: true },
        { text: 'NA', isStress: true, isSchwa: false },
        { text: 'na', isStress: false, isSchwa: true }
      ];

      const pattern = getHapticPatternForSyllables(syllables);
      // Pattern format: [vib, pause, vib, pause, vib]
      assert.equal(pattern[0], 15);  // micro-tap for schwa 'ba'
      assert.equal(pattern[1], 120); // pause
      assert.equal(pattern[2], 100); // strong pulse for stress 'NA'
      assert.equal(pattern[3], 120); // pause
      assert.equal(pattern[4], 15);  // micro-tap for schwa 'na'
    });
  });

  describe('Backend API & SQLite Persistence (Gate D & E)', () => {
    let server;
    const testPort = 3856;
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

    test('GET /api/v1/pedagogy/schwa-words should return list of benchmark words', async () => {
      const res = await fetch(`${baseUrl}/api/v1/pedagogy/schwa-words`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(Array.isArray(data.words));
      assert.ok(data.words.length >= 5);
      assert.equal(data.words[0].word, 'banana');
    });

    test('POST /api/v1/pedagogy/schwa-check should evaluate schwa demotion and persist in SQLite', async () => {
      const res = await fetch(`${baseUrl}/api/v1/pedagogy/schwa-check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'user_schwa_test'
        },
        body: JSON.stringify({
          word: 'banana',
          customAudioMetrics: { durationMs: 58, f1: 512, f2: 1495 }
        })
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.checkId.startsWith('scw-'));
      assert.equal(data.evaluation.word, 'banana');
      assert.equal(data.evaluation.evaluation.isDemoted, true);

      // Verify row persisted in SQLite
      const row = db.prepare('SELECT * FROM schwa_demotion_records WHERE id = ?').get(data.checkId);
      assert.ok(row);
      assert.equal(row.word, 'banana');
      assert.equal(row.is_demoted, 1);
      assert.equal(row.user_id, 'user_schwa_test');
    });

    test('GET /api/v1/pedagogy/schwa-check/latest should retrieve the latest user record', async () => {
      const res = await fetch(`${baseUrl}/api/v1/pedagogy/schwa-check/latest`, {
        headers: { 'x-user-id': 'user_schwa_test' }
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.checkId);
      assert.equal(data.word, 'banana');
      assert.equal(data.isDemoted, true);
      assert.ok(data.score >= 85);
    });

    test('POST /api/v1/pedagogy/schwa-check validation: should reject empty word with 400', async () => {
      const res = await fetch(`${baseUrl}/api/v1/pedagogy/schwa-check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word: '' })
      });

      assert.equal(res.status, 400);
      const data = await res.json();
      assert.equal(data.success, false);
      assert.ok(data.error.includes('Missing required field: word'));
    });
  });

});
