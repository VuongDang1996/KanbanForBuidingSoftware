import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import app from '../server/index.js';
import { db } from '../server/db.js';
import {
  getIeltsCueCards,
  getIeltsCueCardById,
  calculateCambridgeOverallBand,
  detectPastTenseOmissions,
  evaluateIeltsMockPart2
} from '../src/lib/scoring/ieltsMockExaminer.js';

describe('VN-104: IELTS Speaking Part 1 & 2 AI Mock Examiner Tests', () => {
  let server;
  const PORT = 3872;
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

  describe('Cue Card Structure & Cambridge Scoring Protocol (AC 1 & AC 3)', () => {
    test('Catalog must contain Technology Part 2 card with bullet points & C1 vocab', () => {
      const cards = getIeltsCueCards();
      assert.ok(Array.isArray(cards));
      assert.ok(cards.length >= 2);

      const techCard = getIeltsCueCardById('tech_difficult_01');
      assert.ok(techCard);
      assert.equal(techCard.part, 2);
      assert.equal(techCard.bulletPoints.length, 4);
      assert.ok(techCard.recommendedVocab.some((v) => v.word.includes('steep learning curve')));
    });

    test('Cambridge rounding rule: .25 rounds up to .5 and .75 rounds up to next whole band', () => {
      // 6.25 average -> 6.5
      const band625 = calculateCambridgeOverallBand(6.5, 6.0, 6.5, 6.0);
      assert.equal(band625, 6.5);

      // 6.75 average -> 7.0
      const band675 = calculateCambridgeOverallBand(6.5, 7.0, 6.5, 7.0);
      assert.equal(band675, 7.0);

      // 7.0 flat -> 7.0
      const band70 = calculateCambridgeOverallBand(7.0, 7.0, 7.0, 7.0);
      assert.equal(band70, 7.0);
    });
  });

  describe('Vietnamese L1 Past-Tense Omission Diagnostic (AC 4)', () => {
    test('detectPastTenseOmissions should flag uninflected verbs in past narrative contexts', () => {
      const transcript = 'Two years ago, I use a confusing software and it fail to process the video.';
      const errors = detectPastTenseOmissions(transcript);

      assert.ok(errors.length >= 2);
      assert.ok(errors.some((e) => e.verb === 'use' && e.correctForm === 'used'));
      assert.ok(errors.some((e) => e.verb === 'fail' && e.correctForm === 'failed'));
      assert.match(errors[0].correctiveTip, /L1 Transfer Trap|âm đuôi/i);
    });

    test('detectPastTenseOmissions should not flag verbs in present context', () => {
      const transcript = 'Every day I use computers for my job.';
      const errors = detectPastTenseOmissions(transcript);
      assert.equal(errors.length, 0);
    });
  });

  describe('Evaluation Engine & 4 Cambridge Criteria (AC 2 & AC 3)', () => {
    test('evaluateIeltsMockPart2 computes FC, LR, GRA, PR and overall band', () => {
      const result = evaluateIeltsMockPart2({
        topicId: 'tech_difficult_01',
        transcript: 'Two years ago, I bought a camera. However, it had a really steep learning curve because the interface was counterintuitive. Eventually I learned to multitask.',
        prepNotes: 'bought 2 yrs ago, steep learning curve',
        speechDurationSec: 115
      });

      assert.ok(result.overallBand >= 6.0 && result.overallBand <= 9.0);
      assert.ok(result.criteria.fc.band > 0);
      assert.ok(result.criteria.lr.band >= 7.0); // Matched multiple advanced words
      assert.ok(result.criteria.gra.band > 0);
      assert.ok(result.criteria.pr.band > 0);
      assert.ok(result.examinerPersona.name.includes('Sarah'));
    });
  });

  describe('API Endpoints & SQLite Persistence (Gate D & E)', () => {
    test('GET /api/v1/ielts/cue-cards should return cue cards list', async () => {
      const res = await fetch(`${baseUrl}/api/v1/ielts/cue-cards`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.cueCards.length >= 2);
    });

    test('GET /api/v1/ielts/cue-cards/:id should return specific cue card', async () => {
      const res = await fetch(`${baseUrl}/api/v1/ielts/cue-cards/tech_difficult_01`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.cueCard.id, 'tech_difficult_01');
    });

    test('POST /api/v1/ielts/mock-eval should evaluate speech and save record to SQLite', async () => {
      const testUserId = `test-ielts-user-${Date.now()}`;
      const payload = {
        topicId: 'tech_difficult_01',
        transcript: 'Last year I bought an expensive tool. Although it has a steep learning curve, I eventually figured it out.',
        prepNotes: 'bought tool, steep learning curve',
        speechDurationSec: 110
      };

      const res = await fetch(`${baseUrl}/api/v1/ielts/mock-eval`, {
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
      assert.equal(data.userId, testUserId);
      assert.ok(data.recordId);
      assert.ok(data.evaluation.overallBand >= 5.0);

      // Verify row in SQLite
      const row = db.prepare('SELECT * FROM ielts_mock_examiner_records WHERE id = ?').get(data.recordId);
      assert.ok(row);
      assert.equal(row.user_id, testUserId);
      assert.equal(row.topic_id, 'tech_difficult_01');
      assert.equal(row.overall_band, data.evaluation.overallBand);
    });

    test('GET /api/v1/ielts/mock/latest should return the user latest exam record', async () => {
      const testUserId = `test-ielts-latest-${Date.now()}`;
      await fetch(`${baseUrl}/api/v1/ielts/mock-eval`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': testUserId
        },
        body: JSON.stringify({
          topicId: 'memorable_journey_02',
          transcript: 'Two years ago, I traveled across the country by train. It had breathtaking scenery throughout.',
          prepNotes: 'train journey',
          speechDurationSec: 100
        })
      });

      const res = await fetch(`${baseUrl}/api/v1/ielts/mock/latest`, {
        headers: { 'x-user-id': testUserId }
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.evaluation);
      assert.equal(data.topicId, 'memorable_journey_02');
    });

    test('POST /api/v1/ielts/mock-eval should return 400 when transcript is missing', async () => {
      const res = await fetch(`${baseUrl}/api/v1/ielts/mock-eval`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });

      assert.equal(res.status, 400);
      const data = await res.json();
      assert.equal(data.success, false);
      assert.match(data.error, /Missing required field: transcript/i);
    });
  });
});
