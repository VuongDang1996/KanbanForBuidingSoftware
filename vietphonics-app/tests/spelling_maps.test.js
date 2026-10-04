import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import app from '../server/index.js';
import { db } from '../server/db.js';
import {
  SPELLING_MAP_CATALOG,
  getSpellingMapCatalog,
  getSpellingMapByPhoneme,
  evaluateSpellingQuiz
} from '../src/lib/scoring/spellingMaps.js';

describe('PRON-209: Numbered Target Phoneme System & Multi-Spelling Sound Maps Tests', () => {
  let server;
  const PORT = 3866;
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

  describe('Radial Mindmap & Catalog Structure (AC 1 & AC 2)', () => {
    test('Catalog must contain numbered phonemes /f/ (#9), /ʃ/ (#14), and /k/ (#23)', () => {
      const catalog = getSpellingMapCatalog();
      assert.ok(Array.isArray(catalog));
      assert.ok(catalog.length >= 3);

      const fMap = catalog.find((m) => m.symbol === '/f/');
      assert.ok(fMap);
      assert.equal(fMap.number, 9);
      assert.equal(fMap.branches.length, 3);

      const shMap = catalog.find((m) => m.symbol === '/ʃ/');
      assert.ok(shMap);
      assert.equal(shMap.number, 14);

      const kMap = catalog.find((m) => m.symbol === '/k/');
      assert.ok(kMap);
      assert.equal(kMap.number, 23);
    });

    test('Phoneme /f/ must define frequency branches: f/ff (78%), ph (18%), gh (4%) summing to 100%', () => {
      const fMap = getSpellingMapByPhoneme('sound_09_f');
      assert.ok(fMap);

      const totalPercentage = fMap.branches.reduce((acc, b) => acc + b.percentage, 0);
      assert.equal(totalPercentage, 100);

      const phBranch = fMap.branches.find((b) => b.pattern === 'ph');
      assert.ok(phBranch);
      assert.equal(phBranch.percentage, 18);
      assert.ok(phBranch.examples.length >= 5);
      assert.ok(phBranch.examples.some((e) => e.word === 'physics' && e.highlight === 'ph'));
      assert.ok(phBranch.examples.some((e) => e.word === 'phone'));
    });

    test('Each branch example must contain word, IPA transcription, and Vietnamese translation', () => {
      const catalog = getSpellingMapCatalog();
      for (const map of catalog) {
        for (const branch of map.branches) {
          for (const ex of branch.examples) {
            assert.ok(ex.word, 'Example must have word');
            assert.ok(ex.ipa, 'Example must have IPA');
            assert.ok(ex.highlight, 'Example must have highlight substring');
            assert.ok(ex.translation, 'Example must have translation');
            assert.ok(ex.word.toLowerCase().includes(ex.highlight.toLowerCase()));
          }
        }
      }
    });
  });

  describe('Silent Letter & L1 Trap Warnings (AC 3)', () => {
    test('Phoneme /f/ must warn against silent "gh" in words like "though", "night", "thought"', () => {
      const fMap = getSpellingMapByPhoneme('sound_09_f');
      assert.ok(fMap.silentTrap);
      assert.match(fMap.silentTrap.description, /though/i);
      assert.match(fMap.silentTrap.description, /night/i);
      assert.ok(fMap.silentTrap.silentExamples.some((w) => w.includes('night')));
    });

    test('Phoneme /k/ must warn that "k" before "n" is completely silent (knight, knee, knife)', () => {
      const kMap = getSpellingMapByPhoneme('sound_23_k');
      assert.ok(kMap.silentTrap);
      assert.match(kMap.silentTrap.description, /knight/i);
      assert.ok(kMap.silentTrap.silentExamples.some((w) => w.includes('knight')));
      assert.ok(kMap.silentTrap.silentExamples.some((w) => w.includes('knee')));
    });
  });

  describe('Spelling Quiz Evaluation Logic (AC 4)', () => {
    test('evaluateSpellingQuiz should award 100% when all options match', () => {
      const answers = [
        { id: 'quiz_f_01', selectedOption: 'ph' },
        { id: 'quiz_f_02', selectedOption: 'tough' },
        { id: 'quiz_f_03', selectedOption: 'f / ff' }
      ];

      const res = evaluateSpellingQuiz('sound_09_f', answers);
      assert.equal(res.success, true);
      assert.equal(res.scorePercent, 100);
      assert.equal(res.correctCount, 3);
      assert.equal(res.passed, true);
    });

    test('evaluateSpellingQuiz should calculate partial score and pass/fail thresholds', () => {
      const answers = [
        { id: 'quiz_f_01', selectedOption: 'p' }, // wrong
        { id: 'quiz_f_02', selectedOption: 'tough' }, // correct
        { id: 'quiz_f_03', selectedOption: 'th' } // wrong
      ];

      const res = evaluateSpellingQuiz('sound_09_f', answers);
      assert.equal(res.success, true);
      assert.equal(res.correctCount, 1);
      assert.equal(res.passed, false); // < 70%
      assert.equal(res.scorePercent, 33);
    });
  });

  describe('Backend API & SQLite Persistence (Gate D & E)', () => {
    test('GET /api/v1/phonetics/spelling-maps should return catalog', async () => {
      const res = await fetch(`${baseUrl}/api/v1/phonetics/spelling-maps`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.maps.length >= 3);
    });

    test('GET /api/v1/phonetics/spelling-maps/:phonemeId should return single sound map', async () => {
      const res = await fetch(`${baseUrl}/api/v1/phonetics/spelling-maps/sound_14_sh`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.map.symbol, '/ʃ/');
    });

    test('POST /api/v1/phonetics/spelling-quiz should evaluate answers and persist to SQLite', async () => {
      const testUserId = `test-user-${Date.now()}`;
      const payload = {
        userId: testUserId,
        phonemeId: 'sound_09_f',
        answers: [
          { id: 'quiz_f_01', selectedOption: 'ph' },
          { id: 'quiz_f_02', selectedOption: 'tough' },
          { id: 'quiz_f_03', selectedOption: 'f / ff' }
        ]
      };

      const res = await fetch(`${baseUrl}/api/v1/phonetics/spelling-quiz`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': testUserId
        },
        body: JSON.stringify(payload)
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.evaluation.scorePercent, 100);

      // Verify in SQLite
      const row = db.prepare('SELECT * FROM spelling_map_quiz_records WHERE id = ?').get(data.recordId);
      assert.ok(row);
      assert.equal(row.user_id, testUserId);
      assert.equal(row.symbol, '/f/');
      assert.equal(row.score, 100);
      assert.equal(row.passed, 1);
    });

    test('GET /api/v1/phonetics/spelling-quiz/latest should retrieve the user record', async () => {
      const testUserId = `test-user-${Date.now()}`;
      const payload = {
        userId: testUserId,
        phonemeId: 'sound_09_f',
        answers: [
          { id: 'quiz_f_01', selectedOption: 'ph' },
          { id: 'quiz_f_02', selectedOption: 'thought' }, // wrong
          { id: 'quiz_f_03', selectedOption: 'f / ff' }
        ]
      };

      await fetch(`${baseUrl}/api/v1/phonetics/spelling-quiz`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const res = await fetch(`${baseUrl}/api/v1/phonetics/spelling-quiz/latest`, {
        headers: { 'x-user-id': testUserId }
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.recordId);
      assert.equal(data.userId, testUserId);
      assert.equal(data.score, 67);
      assert.equal(data.correctCount, 2);
    });

    test('POST /api/v1/phonetics/spelling-quiz validation: reject missing answers with 400', async () => {
      const res = await fetch(`${baseUrl}/api/v1/phonetics/spelling-quiz`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phonemeId: 'sound_09_f' })
      });

      assert.equal(res.status, 400);
      const data = await res.json();
      assert.equal(data.success, false);
      assert.match(data.error, /answers/i);
    });
  });
});
