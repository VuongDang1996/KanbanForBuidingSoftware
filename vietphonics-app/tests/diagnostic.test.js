import test, { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import app from '../server/index.js';
import { db, initAppDatabase } from '../server/db.js';
import { DIAGNOSTIC_12_SENTENCES, generateDiagnosticReport } from '../src/lib/diagnostic/screenerSentences.js';

describe('VN-102: Vietnamese L1 3-Minute Diagnostic Screener Tests', () => {
  let server;
  let baseUrl;
  const testPort = 3094;

  before(async () => {
    initAppDatabase();
    await new Promise(resolve => {
      server = http.createServer(app);
      server.listen(testPort, () => {
        baseUrl = `http://localhost:${testPort}`;
        resolve();
      });
    });
  });

  after(async () => {
    await new Promise(resolve => server.close(resolve));
  });

  describe('Diagnostic 12-Sentence Design & L1 Traps (AC 1)', () => {
    it('Should contain exactly 12 diagnostic sentences covering Vietnamese L1 traps', () => {
      assert.equal(DIAGNOSTIC_12_SENTENCES.length, 12);
    });

    it('Each diagnostic sentence must contain sentence text, target phoneme, and L1 trap explanation', () => {
      for (const item of DIAGNOSTIC_12_SENTENCES) {
        assert.ok(item.sentence && item.sentence.length > 10, 'Sentence text must be non-empty');
        assert.ok(item.targetPhoneme, 'Must target specific phoneme or suprasegmental trap');
        assert.ok(item.ipa, 'Must contain full IPA transcription');
        assert.ok(item.l1Trap && item.l1Trap.length > 5, 'Must explain Vietnamese L1 trap mechanism');
      }
    });

    it('Must cover critical Vietnamese phonetic blindspots: ending /t/, /s/, /θ/, /ð/, /s/ vs /ʃ/', () => {
      const targets = DIAGNOSTIC_12_SENTENCES.map(s => s.targetPhoneme);
      assert.ok(targets.includes('/t/'), 'Must cover final /t/');
      assert.ok(targets.includes('/s/'), 'Must cover final /s/');
      assert.ok(targets.includes('/θ/'), 'Must cover dental /θ/');
      assert.ok(targets.includes('/ð/'), 'Must cover dental /ð/');
      assert.ok(targets.includes('/s/ vs /ʃ/'), 'Must cover /s/ vs /ʃ/ contrast');
      assert.ok(targets.includes('stress'), 'Must cover word stress shift');
      assert.ok(targets.includes('intonation'), 'Must cover question intonation');
      assert.ok(targets.includes('linking'), 'Must cover consonant-to-vowel linking');
    });
  });

  describe('Report Synthesis & 30-Day Personalized Roadmap (AC 3)', () => {
    it('Should calculate overall score and map accurately to IELTS and CEFR', () => {
      const sampleAnswers = [
        { itemIndex: 0, score: 75 },
        { itemIndex: 1, score: 80 },
        { itemIndex: 2, score: 70 },
        { itemIndex: 3, score: 75 }
      ];
      const report = generateDiagnosticReport(sampleAnswers);

      assert.equal(report.overallScore, 75);
      assert.equal(report.ieltsBand, '7.0');
      assert.equal(report.cefr, 'B2+');
    });

    it('Must identify Top 3 habit traps with severity ranking', () => {
      const report = generateDiagnosticReport([]);
      assert.equal(report.topHabits.length, 3);
      assert.ok(report.topHabits[0].title.includes('phụ âm đuôi'));
      assert.ok(report.topHabits[1].title.includes('/θ/'));
      assert.ok(report.topHabits[2].title.includes('/s/ vs chu môi /ʃ/'));
    });

    it('Must generate 3-phase 30-day personalized roadmap (Gate H)', () => {
      const report = generateDiagnosticReport([]);
      assert.ok(Array.isArray(report.actionPlan30Days));
      assert.equal(report.actionPlan30Days.length, 3);
      assert.ok(report.actionPlan30Days[0].phase.includes('Giai đoạn 1'));
      assert.ok(report.actionPlan30Days[1].phase.includes('Giai đoạn 2'));
      assert.ok(report.actionPlan30Days[2].phase.includes('Giai đoạn 3'));
    });
  });

  describe('Backend API & Baseline Database Persistence (Gate D & E)', () => {
    const testUserId = `test-user-diag-${Date.now()}`;

    it('GET /api/v1/diagnostic/sentences should return 12 sentences', async () => {
      const res = await fetch(`${baseUrl}/api/v1/diagnostic/sentences`);
      assert.equal(res.status, 200);
      const data = await res.json();

      assert.equal(data.success, true);
      assert.equal(data.totalCount, 12);
      assert.equal(data.sentences.length, 12);
    });

    it('POST /api/v1/diagnostic/screener-submit should persist answers and update user baseline GOP', async () => {
      // First ensure user exists in user_profiles
      const now = new Date().toISOString();
      db.prepare(`
        INSERT INTO user_profiles (id, user_id, dialect, calibration_mode, confidence_score, ielts_target, overall_gop, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(user_id) DO NOTHING
      `).run(`prof-${testUserId}`, testUserId, 'bac', 'manual_selection', 0.92, 7.5, 70, now, now);

      const mockAnswers = [
        { itemIndex: 0, sentence: 'What time did you contact...', targetPhoneme: '/t/', score: 85 },
        { itemIndex: 1, sentence: 'The price of the house...', targetPhoneme: '/s/', score: 80 }
      ];

      const res = await fetch(`${baseUrl}/api/v1/diagnostic/screener-submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': testUserId
        },
        body: JSON.stringify({ answers: mockAnswers })
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.screenerId.startsWith('scr-'));
      assert.equal(data.report.overallScore, 83); // (85 + 80) / 2 = 82.5 -> 83

      // Verify DB direct persistence
      const screenerRow = db.prepare('SELECT * FROM diagnostic_screeners WHERE id = ?').get(data.screenerId);
      assert.ok(screenerRow);
      assert.equal(screenerRow.user_id, testUserId);

      // Verify user profile baseline updated
      const profileRow = db.prepare('SELECT overall_gop FROM user_profiles WHERE user_id = ?').get(testUserId);
      assert.equal(profileRow.overall_gop, 83);
    });

    it('GET /api/v1/diagnostic/screener-latest should retrieve the most recent submitted screener', async () => {
      const res = await fetch(`${baseUrl}/api/v1/diagnostic/screener-latest`, {
        headers: { 'x-user-id': testUserId }
      });
      assert.equal(res.status, 200);
      const data = await res.json();

      assert.equal(data.success, true);
      assert.ok(data.report);
      assert.equal(data.report.overallScore, 83);
      assert.equal(data.answers.length, 2);
    });
  });
});
