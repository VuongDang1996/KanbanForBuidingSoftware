import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import app from '../server/index.js';
import { db } from '../server/db.js';
import {
  TARGET_SATURATED_SENTENCES,
  evaluateTargetDrill
} from '../src/lib/scoring/targetSentenceDrill.js';

describe('PRON-203: Targeted Sound Read-Aloud & Contextual Fluency Drills Tests', () => {

  describe('Saturated Sentences Catalog & Phoneme Highlighting (AC 1 & AC 4)', () => {
    test('Must contain target-sound saturated sentences for dental fricative /θ/, palato-alveolar /ʃ/, and coda /d/', () => {
      assert.ok(TARGET_SATURATED_SENTENCES.sat_theta_01);
      assert.ok(TARGET_SATURATED_SENTENCES.sat_sh_02);
      assert.ok(TARGET_SATURATED_SENTENCES.sat_d_coda_03);
    });

    test('sat_theta_01 should contain 5 occurrences of /θ/ and Vietnamese L1 guidance', () => {
      const s = TARGET_SATURATED_SENTENCES.sat_theta_01;
      assert.equal(s.targetPhoneme, '/θ/');
      assert.equal(s.totalOccurrences, 5);
      assert.equal(s.text, 'I think thirty-three thieves thought of that.');
      assert.ok(s.vietnameseL1Trap.includes('/t/'));
      assert.ok(s.vietnameseL1Trap.includes('hai hàm răng'));

      // Word breakdown tokens must have IPA for isolated audio snippet
      assert.ok(s.words.length >= 7);
      assert.equal(s.words[1].word, 'think');
      assert.equal(s.words[1].ipa, '/θɪŋk/');
    });
  });

  describe('Realtime Badge Counter & Scoring Math (AC 2)', () => {
    test('evaluateTargetDrill should return 100% when all occurrences are pronounced accurately', () => {
      const mockPerf = {
        'think': { gop: 90, detectedPhoneme: '/θ/', isSubstituted: false },
        'thirty-three': { gop: 92, detectedPhoneme: '/θ/', isSubstituted: false },
        'thieves': { gop: 88, detectedPhoneme: '/θ/', isSubstituted: false },
        'thought': { gop: 95, detectedPhoneme: '/θ/', isSubstituted: false }
      };

      const result = evaluateTargetDrill('sat_theta_01', mockPerf);
      assert.equal(result.accuracyPercent, 100);
      assert.equal(result.correctOccurrences, 5);
      assert.equal(result.totalOccurrences, 5);
      assert.ok(result.badgeText.includes('5/5 âm /θ/ đạt chuẩn (100%)'));
      assert.equal(result.substitutions.length, 0);
    });

    test('evaluateTargetDrill should accurately compute partial accuracy percentage', () => {
      // 1 target word (thirty-three has 2 occurrences) substituted
      const mockPerf = {
        'think': { gop: 90, detectedPhoneme: '/θ/', isSubstituted: false },
        'thirty-three': { gop: 40, detectedPhoneme: '/t/', isSubstituted: true },
        'thieves': { gop: 88, detectedPhoneme: '/θ/', isSubstituted: false },
        'thought': { gop: 95, detectedPhoneme: '/θ/', isSubstituted: false }
      };

      const result = evaluateTargetDrill('sat_theta_01', mockPerf);
      assert.equal(result.totalOccurrences, 5);
      assert.equal(result.correctOccurrences, 3); // 5 - 2
      assert.equal(result.accuracyPercent, 60); // 3/5 = 60%
      assert.ok(result.badgeText.includes('3/5 âm /θ/ đạt chuẩn (60%)'));
    });
  });

  describe('L1 Substitution Error Detection (AC 3)', () => {
    test('Should flag /θ/ -> /t/ substitution in "thirty-three" with corrective articulatory advice', () => {
      const mockPerf = {
        'thirty-three': { gop: 45, detectedPhoneme: '/t/', isSubstituted: true }
      };

      const result = evaluateTargetDrill('sat_theta_01', mockPerf);
      assert.equal(result.substitutions.length, 1);
      assert.equal(result.substitutions[0].word, 'thirty-three');
      assert.equal(result.substitutions[0].expectedPhoneme, '/θ/');
      assert.equal(result.substitutions[0].actualPhoneme, '/t/');
      assert.ok(result.substitutions[0].message.includes('Lỗi thay thế: /θ/ bị đọc thành /t/'));
      assert.ok(result.substitutions[0].message.includes('hai hàm răng'));
    });

    test('Should flag /ʃ/ -> /s/ substitution in "shiny" for sat_sh_02', () => {
      const mockPerf = {
        'shiny': { gop: 50, detectedPhoneme: '/s/', isSubstituted: true }
      };

      const result = evaluateTargetDrill('sat_sh_02', mockPerf);
      assert.equal(result.substitutions.length, 1);
      assert.equal(result.substitutions[0].word, 'shiny');
      assert.equal(result.substitutions[0].expectedPhoneme, '/ʃ/');
      assert.equal(result.substitutions[0].actualPhoneme, '/s/');
      assert.ok(result.substitutions[0].message.includes('chu tròn môi'));
    });
  });

  describe('Backend API & SQLite Persistence (Gate D & E)', () => {
    let server;
    const testPort = 3860;
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

    test('GET /api/v1/practice/target-drill/sentences should return all sentences', async () => {
      const res = await fetch(`${baseUrl}/api/v1/practice/target-drill/sentences`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(Array.isArray(data.sentences));
      assert.ok(data.sentences.length >= 3);
      assert.equal(data.sentences[0].id, 'sat_theta_01');
    });

    test('POST /api/v1/scoring/targeted-sound should evaluate and persist to SQLite', async () => {
      const res = await fetch(`${baseUrl}/api/v1/scoring/targeted-sound`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'user_target_drill_test'
        },
        body: JSON.stringify({
          sentenceId: 'sat_theta_01',
          userWordPerformances: {
            'thirty-three': { gop: 45, detectedPhoneme: '/t/', isSubstituted: true }
          }
        })
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.recordId.startsWith('tsd-'));
      assert.equal(data.evaluation.targetPhoneme, '/θ/');
      assert.equal(data.evaluation.substitutions.length, 1);

      // Verify row persisted in SQLite
      const row = db.prepare('SELECT * FROM target_sound_drill_records WHERE id = ?').get(data.recordId);
      assert.ok(row, 'Record not found in SQLite table');
      assert.equal(row.user_id, 'user_target_drill_test');
      assert.equal(row.sentence_id, 'sat_theta_01');
      assert.equal(row.target_phoneme, '/θ/');
      assert.equal(row.total_occurrences, 5);
      assert.equal(row.correct_occurrences, 3);
      assert.equal(row.accuracy_percent, 60);

      const parsedBreakdown = JSON.parse(row.words_breakdown_json);
      assert.ok(Array.isArray(parsedBreakdown));
      assert.ok(parsedBreakdown.length >= 7);
    });

    test('GET /api/v1/scoring/targeted-sound/latest should retrieve the user record', async () => {
      const res = await fetch(`${baseUrl}/api/v1/scoring/targeted-sound/latest`, {
        headers: { 'x-user-id': 'user_target_drill_test' }
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.recordId);
      assert.equal(data.sentenceId, 'sat_theta_01');
      assert.equal(data.targetPhoneme, '/θ/');
      assert.equal(data.totalOccurrences, 5);
      assert.equal(data.correctOccurrences, 3);
      assert.equal(data.accuracyPercent, 60);
      assert.equal(data.substitutions.length, 1);
    });

    test('POST /api/v1/scoring/targeted-sound validation: reject missing sentenceId with 400', async () => {
      const res = await fetch(`${baseUrl}/api/v1/scoring/targeted-sound`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userWordPerformances: {} })
      });

      assert.equal(res.status, 400);
      const data = await res.json();
      assert.equal(data.success, false);
      assert.ok(data.error.includes('Missing required field: sentenceId'));
    });
  });

});
