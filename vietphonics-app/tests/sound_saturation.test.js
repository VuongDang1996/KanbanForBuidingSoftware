import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import app from '../server/index.js';
import { db } from '../server/db.js';
import {
  SATURATION_SENTENCES,
  getSaturationSentences,
  getSaturationSentence,
  evaluateSaturationSpeech
} from '../src/lib/scoring/soundSaturation.js';

describe('PRON-211: Dense Target Sound Saturation Sentences Tests', () => {
  let server;
  const PORT = 3868;
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

  describe('Saturated Sentences & High Phoneme Density (AC 1 & AC 4)', () => {
    test('Catalog must contain saturated sentences for /dʒ/, /v/, and /θ/', () => {
      const sentences = getSaturationSentences();
      assert.ok(Array.isArray(sentences));
      assert.ok(sentences.length >= 3);

      const djSentence = sentences.find((s) => s.targetPhoneme === '/dʒ/');
      assert.ok(djSentence);
      assert.equal(djSentence.targetOccurrencesCount, 8);
      assert.match(djSentence.text, /George enjoyed arranging orange juice/i);

      const vSentence = sentences.find((s) => s.targetPhoneme === '/v/');
      assert.ok(vSentence);
      assert.equal(vSentence.targetOccurrencesCount, 9);

      const thSentence = sentences.find((s) => s.targetPhoneme === '/θ/');
      assert.ok(thSentence);
      assert.equal(thSentence.targetOccurrencesCount, 8);
    });

    test('Each word in saturated sentence must provide token breakdown with targetCount', () => {
      const sentence = getSaturationSentence('sat_dj_01');
      assert.ok(sentence);
      assert.ok(sentence.words.length >= 7);

      const georgeWord = sentence.words.find((w) => w.word === 'George');
      assert.ok(georgeWord);
      assert.equal(georgeWord.hasTarget, true);
      assert.equal(georgeWord.targetCount, 2);
    });
  });

  describe('Saturation Meter & L1 Affricate Reduction Advice (AC 2 & AC 3)', () => {
    test('evaluateSaturationSpeech should calculate accuracy and saturation meter level', () => {
      const res = evaluateSaturationSpeech({
        sentenceId: 'sat_dj_01',
        correctOccurrences: 8
      });

      assert.equal(res.success, true);
      assert.equal(res.totalOccurrences, 8);
      assert.equal(res.correctOccurrences, 8);
      assert.equal(res.accuracyPercent, 100);
      assert.equal(res.saturationMeterLevel, 100);
      assert.equal(res.isMastered, true);
    });

    test('evaluateSaturationSpeech should flag L1 affricate failure when /z/ or /d/ is detected', () => {
      const res = evaluateSaturationSpeech({
        sentenceId: 'sat_dj_01',
        correctOccurrences: 5,
        detectedSubstitutions: ['/z/']
      });

      assert.equal(res.success, true);
      assert.equal(res.accuracyPercent, 63);
      assert.equal(res.isMastered, false);
      assert.ok(res.detectedTraps.length > 0);
      assert.match(res.advice, /không lướt thành chữ 'd'/i);
    });
  });

  describe('Backend API & SQLite Persistence (Gate D & E)', () => {
    test('GET /api/v1/practice/saturation/sentences should return list', async () => {
      const res = await fetch(`${baseUrl}/api/v1/practice/saturation/sentences`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.sentences.length >= 3);
    });

    test('GET /api/v1/practice/saturation/sentences/:id should return single sentence', async () => {
      const res = await fetch(`${baseUrl}/api/v1/practice/saturation/sentences/sat_dj_01`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.sentence.targetPhoneme, '/dʒ/');
    });

    test('POST /api/v1/scoring/saturation-sentence should evaluate and persist to SQLite', async () => {
      const testUserId = `test-user-${Date.now()}`;
      const payload = {
        userId: testUserId,
        sentenceId: 'sat_dj_01',
        correctOccurrences: 7,
        detectedSubstitutions: []
      };

      const res = await fetch(`${baseUrl}/api/v1/scoring/saturation-sentence`, {
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
      assert.equal(data.evaluation.correctOccurrences, 7);
      assert.equal(data.evaluation.accuracyPercent, 88);

      // Verify in SQLite
      const row = db.prepare('SELECT * FROM sound_saturation_records WHERE id = ?').get(data.recordId);
      assert.ok(row);
      assert.equal(row.user_id, testUserId);
      assert.equal(row.sentence_id, 'sat_dj_01');
      assert.equal(row.target_phoneme, '/dʒ/');
      assert.equal(row.correct_occurrences, 7);
      assert.equal(row.accuracy_percentage, 88);
      assert.equal(row.is_mastered, 1);
    });

    test('GET /api/v1/scoring/saturation-sentence/latest should retrieve the user record', async () => {
      const testUserId = `test-user-${Date.now()}`;
      const payload = {
        userId: testUserId,
        sentenceId: 'sat_v_02',
        correctOccurrences: 9
      };

      await fetch(`${baseUrl}/api/v1/scoring/saturation-sentence`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const res = await fetch(`${baseUrl}/api/v1/scoring/saturation-sentence/latest`, {
        headers: { 'x-user-id': testUserId }
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.recordId);
      assert.equal(data.userId, testUserId);
      assert.equal(data.sentenceId, 'sat_v_02');
      assert.equal(data.targetPhoneme, '/v/');
      assert.equal(data.accuracyPercentage, 100);
    });

    test('POST /api/v1/scoring/saturation-sentence validation: reject missing sentenceId with 400', async () => {
      const res = await fetch(`${baseUrl}/api/v1/scoring/saturation-sentence`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correctOccurrences: 5 })
      });

      assert.equal(res.status, 400);
      const data = await res.json();
      assert.equal(data.success, false);
      assert.match(data.error, /sentenceId/i);
    });
  });
});
