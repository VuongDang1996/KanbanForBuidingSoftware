import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import app from '../server/index.js';
import { db } from '../server/db.js';
import {
  calculateWpm,
  categorizeTempo,
  calculateNeedleAngle,
  analyzeFluency,
  VIETNAMESE_L1_FILLERS
} from '../src/lib/scoring/fluencyAnalysis.js';

let server;
const PORT = 3852; // Dedicated test port for fluency tests

describe('ELSA-204: Speech Fluency, Natural Pauses & Filler Word Monitor Tests', () => {
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

  describe('WPM Speedometer Gauge & Conversational Tempo (AC 1)', () => {
    test('calculateWpm should accurately compute words per minute', () => {
      assert.strictEqual(calculateWpm(12, 6.0), 120);
      assert.strictEqual(calculateWpm(20, 10.0), 120);
      assert.strictEqual(calculateWpm(15, 5.0), 180);
      assert.strictEqual(calculateWpm(0, 5.0), 0);
      assert.strictEqual(calculateWpm(10, 0), 0);
    });

    test('categorizeTempo must correctly map slow (<110), optimal (110-160), and fast (>160)', () => {
      const slow = categorizeTempo(95);
      assert.strictEqual(slow.category, 'slow');
      assert.ok(slow.evaluation.includes('rời rạc') || slow.evaluation.includes('Chậm'));

      const optimal = categorizeTempo(135);
      assert.strictEqual(optimal.category, 'optimal');
      assert.ok(optimal.evaluation.includes('đối thoại tự nhiên') || optimal.evaluation.includes('Lý tưởng'));

      const fast = categorizeTempo(185);
      assert.strictEqual(fast.category, 'fast');
      assert.ok(fast.evaluation.includes('quá vội') || fast.evaluation.includes('Nhanh'));
    });

    test('calculateNeedleAngle must smoothly span -90deg to +90deg', () => {
      assert.strictEqual(calculateNeedleAngle(40), -90);
      assert.strictEqual(calculateNeedleAngle(130), 0);
      assert.strictEqual(calculateNeedleAngle(220), 90);

      // Boundary clamping
      assert.strictEqual(calculateNeedleAngle(20), -90);
      assert.strictEqual(calculateNeedleAngle(250), 90);
    });
  });

  describe('Timeline Segments & Pause Distribution (AC 2 & AC 3)', () => {
    const testSentence = 'Six months ago, she baked fresh bread for breakfast on the street.';

    test('analyzeFluency should extract speech segments and pause durations', () => {
      const result = analyzeFluency({
        sentence: testSentence,
        totalDurationSec: 5.6
      });

      assert.ok(result);
      assert.strictEqual(result.sentence, testSentence);
      assert.strictEqual(result.wordsCount, 12);
      assert.ok(result.wpm >= 110 && result.wpm <= 160);
      assert.strictEqual(result.tempoCategory, 'optimal');
      assert.ok(result.pauseRatio > 0 && result.pauseRatio < 50);
      assert.ok(Array.isArray(result.segments));
      assert.ok(result.segments.length >= 3);
    });

    test('Pauses >= 0.5s must be classified as awkward hesitations with warning flags', () => {
      const result = analyzeFluency({
        sentence: testSentence,
        totalDurationSec: 6.0
      });

      const awkwardPauses = result.segments.filter(s => s.type === 'pause' && s.isAwkward);
      assert.ok(awkwardPauses.length >= 1);
      assert.ok(awkwardPauses[0].duration >= 0.5);
      assert.strictEqual(result.awkwardPausesCount, awkwardPauses.length);
    });
  });

  describe('L1 Filler Detection & Intentional Silence Advice (AC 4)', () => {
    test('Must maintain dictionary of Vietnamese and English hesitation fillers', () => {
      const tokens = VIETNAMESE_L1_FILLERS.map(f => f.token);
      assert.ok(tokens.includes('ờ'));
      assert.ok(tokens.includes('ừm'));
      assert.ok(tokens.includes('kiểu như'));
      assert.ok(tokens.includes('um'));
      assert.ok(tokens.includes('like'));
    });

    test('Vietnamese L1 fillers must provide pedagogical tip recommending intentional silence', () => {
      const oFiller = VIETNAMESE_L1_FILLERS.find(f => f.token === 'ờ');
      assert.ok(oFiller);
      assert.ok(oFiller.tip.includes('im lặng có chủ đích') || oFiller.tip.includes('Intentional Silence'));
    });
  });

  describe('Backend API & SQLite Persistence (Gate D & E)', () => {
    const testUserId = `test-user-fluency-${Date.now()}`;
    const testSentence = 'The presentation will begin in five minutes.';

    test('POST /api/v1/scoring/fluency-analysis should save record in SQLite', async () => {
      const res = await fetch(`http://localhost:${PORT}/api/v1/scoring/fluency-analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': testUserId
        },
        body: JSON.stringify({
          sentence: testSentence,
          totalDurationSec: 4.2
        })
      });

      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(data.success, true);
      assert.ok(data.fluencyId);
      assert.strictEqual(data.userId, testUserId);
      assert.ok(data.fluency.wpm > 0);

      // Verify row in SQLite fluency_analysis_records
      const row = db.prepare('SELECT * FROM fluency_analysis_records WHERE id = ?').get(data.fluencyId);
      assert.ok(row);
      assert.strictEqual(row.user_id, testUserId);
      assert.strictEqual(row.sentence_text, testSentence);
      assert.strictEqual(row.wpm, data.fluency.wpm);
    });

    test('GET /api/v1/scoring/fluency-analysis/latest should retrieve the latest record', async () => {
      const res = await fetch(`http://localhost:${PORT}/api/v1/scoring/fluency-analysis/latest`, {
        headers: {
          'x-user-id': testUserId
        }
      });

      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(data.success, true);
      assert.ok(data.fluency);
      assert.strictEqual(data.sentence, testSentence);
    });

    test('Validation: Should reject empty sentence with 400 Bad Request', async () => {
      const res = await fetch(`http://localhost:${PORT}/api/v1/scoring/fluency-analysis`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sentence: '' })
      });

      assert.strictEqual(res.status, 400);
      const data = await res.json();
      assert.strictEqual(data.success, false);
      assert.ok(data.error.includes('Missing required field: sentence'));
    });
  });
});
