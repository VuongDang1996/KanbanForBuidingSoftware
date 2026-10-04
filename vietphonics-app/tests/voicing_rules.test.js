import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import app from '../server/index.js';
import { db } from '../server/db.js';
import {
  VOICING_RULE_CATALOG,
  evaluateVoicingCheck
} from '../src/lib/scoring/voicingRules.js';

describe('PRON-207: Phonetic Exception Words & Grammatical Voicing Alternations Tests', () => {

  describe('Voicing Rule Catalog & Column Structures (AC 1)', () => {
    test('Must contain rule profiles for -s/-es and -ed endings', () => {
      assert.ok(VOICING_RULE_CATALOG.s_es_endings);
      assert.ok(VOICING_RULE_CATALOG.ed_endings);
    });

    test('s_es_endings should define 3 columns (/s/, /z/, /ɪz/) and hotkeys 1, 2, 3', () => {
      const sProf = VOICING_RULE_CATALOG.s_es_endings;
      assert.equal(sProf.columns.length, 3);
      assert.equal(sProf.columns[0].id, '/s/');
      assert.equal(sProf.columns[0].hotkey, '1');
      assert.equal(sProf.columns[1].id, '/z/');
      assert.equal(sProf.columns[1].hotkey, '2');
      assert.equal(sProf.columns[2].id, '/ɪz/');
      assert.equal(sProf.columns[2].hotkey, '3');
      assert.ok(sProf.words.length >= 8);
    });

    test('ed_endings should define 3 columns (/t/, /d/, /ɪd/)', () => {
      const edProf = VOICING_RULE_CATALOG.ed_endings;
      assert.equal(edProf.columns.length, 3);
      assert.equal(edProf.columns[0].id, '/t/');
      assert.equal(edProf.columns[1].id, '/d/');
      assert.equal(edProf.columns[2].id, '/ɪd/');
    });
  });

  describe('Vietnamese Mnemonics (AC 3)', () => {
    test('Must provide mnemonic sayings for voiceless, voiced, and sibilants', () => {
      const sProf = VOICING_RULE_CATALOG.s_es_endings;
      assert.ok(sProf.mnemonics['/s/'].includes('Thời phong kiến phương tây'));
      assert.ok(sProf.mnemonics['/ɪz/'].includes('Sáng sớm chạy xe sh zỏm'));

      const edProf = VOICING_RULE_CATALOG.ed_endings;
      assert.ok(edProf.mnemonics['/ɪd/'].includes('Tiền đô'));
    });
  });

  describe('Voicing Evaluation Algorithm (AC 2 & AC 4)', () => {
    test('evaluateVoicingCheck should score 100% on perfect classification', () => {
      const submissions = [
        { word: 'cats', chosenCoda: '/s/' },
        { word: 'dogs', chosenCoda: '/z/' },
        { word: 'buses', chosenCoda: '/ɪz/' }
      ];
      const res = evaluateVoicingCheck('s_es_endings', submissions);
      assert.equal(res.score, 100);
      assert.equal(res.correctCount, 3);
      assert.equal(res.totalWords, 3);
      assert.equal(res.results[0].isCorrect, true);
      assert.equal(res.results[1].isCorrect, true);
      assert.equal(res.results[2].isCorrect, true);
    });

    test('evaluateVoicingCheck should identify incorrect codas with clear explanations', () => {
      const submissions = [
        { word: 'cats', chosenCoda: '/s/' },
        { word: 'dogs', chosenCoda: '/s/' } // wrong: /z/
      ];
      const res = evaluateVoicingCheck('s_es_endings', submissions);
      assert.equal(res.correctCount, 1);
      assert.equal(res.score, 50);
      assert.equal(res.results[1].isCorrect, false);
      assert.ok(res.results[1].explanation.includes('Chưa đúng'));
    });
  });

  describe('Backend API & SQLite Persistence (Gate D & E)', () => {
    let server;
    const testPort = 3864;
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

    test('GET /api/v1/grammar/voicing-rules/catalog should return categories list', async () => {
      const res = await fetch(`${baseUrl}/api/v1/grammar/voicing-rules/catalog`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(Array.isArray(data.catalog));
      assert.ok(data.catalog.length >= 2);
    });

    test('POST /api/v1/grammar/voicing-check should evaluate and persist to SQLite', async () => {
      const res = await fetch(`${baseUrl}/api/v1/grammar/voicing-check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'user_voicing_test'
        },
        body: JSON.stringify({
          category: 's_es_endings',
          submissions: [
            { word: 'cats', chosenCoda: '/s/' },
            { word: 'dogs', chosenCoda: '/z/' }
          ]
        })
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.recordId.startsWith('vce-'));
      assert.equal(data.evaluation.score, 100);

      // Verify row persisted in SQLite
      const row = db.prepare('SELECT * FROM grammatical_voicing_records WHERE id = ?').get(data.recordId);
      assert.ok(row, 'Record not found in SQLite table');
      assert.equal(row.user_id, 'user_voicing_test');
      assert.equal(row.category, 's_es_endings');
      assert.equal(row.correct_count, 2);
      assert.equal(row.total_words, 2);
      assert.equal(row.score, 100);
    });

    test('GET /api/v1/grammar/voicing-check/latest should retrieve the user record', async () => {
      const res = await fetch(`${baseUrl}/api/v1/grammar/voicing-check/latest`, {
        headers: { 'x-user-id': 'user_voicing_test' }
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.recordId);
      assert.equal(data.category, 's_es_endings');
      assert.equal(data.score, 100);
    });

    test('POST /api/v1/grammar/voicing-check validation: reject missing submissions with 400', async () => {
      const res = await fetch(`${baseUrl}/api/v1/grammar/voicing-check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: 's_es_endings', submissions: [] })
      });

      assert.equal(res.status, 400);
      const data = await res.json();
      assert.equal(data.success, false);
      assert.ok(data.error.includes('Missing required fields'));
    });
  });

});
