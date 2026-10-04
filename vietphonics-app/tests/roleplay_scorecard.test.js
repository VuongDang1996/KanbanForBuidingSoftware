import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import app from '../server/index.js';
import { db } from '../server/db.js';
import {
  calculateRoleplayScorecard,
  DEFAULT_SAMPLE_SCORECARD
} from '../src/lib/scoring/roleplayScorecard.js';

describe('ELSA-302: Post-Roleplay Comprehensive Scorecard Tests', () => {
  let server;
  const PORT = 3871;
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

  describe('Scoring Formula & Rank Badge Logic (AC 1 & AC 2)', () => {
    test('calculateRoleplayScorecard should compute weighted average: P=25%, F=20%, G=20%, V=20%, O=15%', () => {
      const res = calculateRoleplayScorecard({
        pronunciationScore: 80,
        fluencyScore: 80,
        grammarScore: 80,
        vocabularyScore: 80,
        objectiveScore: 80
      });

      assert.equal(res.overallScore, 80);
      assert.equal(res.rankTier, 'Silver');
      assert.equal(res.rankBadge, 'Professional Contributor');
    });

    test('calculateRoleplayScorecard should assign Gold badge for overallScore >= 85', () => {
      const res = calculateRoleplayScorecard({
        pronunciationScore: 92,
        fluencyScore: 90,
        grammarScore: 95,
        vocabularyScore: 90,
        objectiveScore: 90
      });

      assert.ok(res.overallScore >= 85);
      assert.equal(res.rankTier, 'Gold');
      assert.equal(res.rankBadge, 'Senior Communicator');
    });

    test('calculateRoleplayScorecard should assign Bronze badge for overallScore < 70', () => {
      const res = calculateRoleplayScorecard({
        pronunciationScore: 65,
        fluencyScore: 60,
        grammarScore: 65,
        vocabularyScore: 60,
        objectiveScore: 60
      });

      assert.ok(res.overallScore < 70);
      assert.equal(res.rankTier, 'Bronze');
      assert.equal(res.rankBadge, 'Developing Speaker');
    });

    test('calculateRoleplayScorecard provides default fallback structure when given empty input', () => {
      const res = calculateRoleplayScorecard({});
      assert.ok(res.overallScore >= 0);
      assert.ok(Array.isArray(res.weakWords));
      assert.ok(Array.isArray(res.transcriptTurns));
      assert.ok(res.pillars.pronunciation);
      assert.ok(res.pillars.fluency);
      assert.ok(res.pillars.grammar);
      assert.ok(res.pillars.vocabulary);
      assert.ok(res.pillars.objectives);
    });

    test('Weak words should include Vietnamese muscle corrective advice', () => {
      const res = calculateRoleplayScorecard({
        detectedErrors: [
          { word: 'blocked', ipa: '/blɒkt/', issue: 'Thiếu âm gió /t/' }
        ]
      });

      assert.equal(res.weakWords.length, 1);
      assert.equal(res.weakWords[0].word, 'blocked');
      assert.match(res.weakWords[0].correctiveTip, /chân răng trên|bật hơi/i);
    });
  });

  describe('Scorecard API Endpoints & SQLite Persistence (Gate D & E)', () => {
    test('POST /api/v1/roleplay/scorecard/generate should compute scorecard and persist record', async () => {
      const testUserId = `test-user-${Date.now()}`;
      const payload = {
        sessionId: 'it_scrum_04',
        pronunciationScore: 86,
        fluencyScore: 82,
        grammarScore: 90,
        vocabularyScore: 80,
        objectiveScore: 85,
        transcriptTurns: [
          { speaker: 'ai', text: 'Morning team! Any blockers?', time: '09:00 AM' },
          { speaker: 'user', text: 'I am blocked by the staging server timeout.', time: '09:01 AM' }
        ],
        weakWords: [
          { word: 'blocked', ipa: '/blɒkt/', issue: 'Thiếu âm /t/ unreleased stop' }
        ]
      };

      const res = await fetch(`${baseUrl}/api/v1/roleplay/scorecard/generate`, {
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
      assert.ok(data.scorecardId);
      assert.ok(data.scorecard.overallScore > 0);
      assert.equal(data.scorecard.rankTier, 'Gold');

      // Verify row in SQLite
      const row = db.prepare('SELECT * FROM roleplay_scorecard_records WHERE id = ?').get(data.scorecardId);
      assert.ok(row);
      assert.equal(row.user_id, testUserId);
      assert.equal(row.session_id, 'it_scrum_04');
      assert.equal(row.overall_score, data.scorecard.overallScore);
    });

    test('GET /api/v1/roleplay/scorecard/latest should retrieve the user latest scorecard', async () => {
      const testUserId = `test-user-latest-${Date.now()}`;
      await fetch(`${baseUrl}/api/v1/roleplay/scorecard/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': testUserId
        },
        body: JSON.stringify({
          sessionId: 'client_negotiation_02',
          pronunciationScore: 95,
          fluencyScore: 92,
          grammarScore: 94,
          vocabularyScore: 90,
          objectiveScore: 92
        })
      });

      const res = await fetch(`${baseUrl}/api/v1/roleplay/scorecard/latest`, {
        headers: { 'x-user-id': testUserId }
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.scorecard);
      assert.equal(data.scorecard.sessionId, 'client_negotiation_02');
      assert.equal(data.scorecard.rankTier, 'Gold');
    });

    test('POST /api/v1/roleplay/scorecard/save-error should export weak word into Error Bank payload', async () => {
      const testUserId = `test-user-err-${Date.now()}`;
      const res = await fetch(`${baseUrl}/api/v1/roleplay/scorecard/save-error`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': testUserId
        },
        body: JSON.stringify({
          word: 'infrastructure',
          ipa: '/ˌɪnfrəˈstrʌktʃər/',
          issue: 'Nhấn sai trọng âm thứ 3',
          correctiveTip: 'Nhấn mạnh âm ba "STRUC", lướt nhẹ các âm còn lại'
        })
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.savedWord.word, 'infrastructure');
      assert.equal(data.savedWord.intervalDays, 1);
      assert.match(data.message, /Ngân Hàng Lỗi/i);
    });

    test('POST /api/v1/roleplay/scorecard/save-error should return 400 when word is missing', async () => {
      const res = await fetch(`${baseUrl}/api/v1/roleplay/scorecard/save-error`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });

      assert.equal(res.status, 400);
      const data = await res.json();
      assert.equal(data.success, false);
      assert.match(data.error, /Missing required field: word/i);
    });
  });
});
