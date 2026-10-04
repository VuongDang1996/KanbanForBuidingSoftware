import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import app from '../server/index.js';
import { db } from '../server/db.js';
import {
  computeRadarPoints,
  buildRadarSvgPoints,
  getRadarColorTheme,
  calculateAverageRadarScore,
  generateAuthToken,
  verifyAuthToken
} from '../src/lib/scoring/learnerDashboardAuth.js';

const PORT = 3882;
let server;

describe('USER-101: Learner Authentication, Pronunciation Mastery Dashboard & Skill Radar Tests', () => {
  before((done) => {
    server = http.createServer(app);
    server.listen(PORT, done);
  });

  after((done) => {
    server.close(done);
  });

  describe('5-Pillar Skill Radar Mathematics & Theming (AC 2)', () => {
    it('computes exactly 5 vertices corresponding to the 5 skill axes', () => {
      const scores = { phonemes: 85, stress: 78, intonation: 70, endingSounds: 92, fluency: 80 };
      const points = computeRadarPoints(scores, 120, 120, 90);

      assert.equal(points.length, 5);
      assert.deepEqual(
        points.map(p => p.key),
        ['phonemes', 'stress', 'intonation', 'endingSounds', 'fluency']
      );

      // Verify Cartesian coordinates are finite numbers within bounding radius
      points.forEach(p => {
        assert.ok(!isNaN(p.x) && isFinite(p.x));
        assert.ok(!isNaN(p.y) && isFinite(p.y));
        const distFromCenter = Math.sqrt(Math.pow(p.x - 120, 2) + Math.pow(p.y - 120, 2));
        assert.ok(distFromCenter <= 90.01, `Point ${p.key} dist ${distFromCenter} exceeds max radius 90`);
      });
    });

    it('builds valid SVG polygon string format', () => {
      const points = [
        { x: 120, y: 30 },
        { x: 200, y: 80 },
        { x: 170, y: 180 },
        { x: 70, y: 180 },
        { x: 40, y: 80 }
      ];
      const polygonStr = buildRadarSvgPoints(points);
      assert.equal(polygonStr, '120,30 200,80 170,180 70,180 40,80');
    });

    it('determines appropriate color theme based on score thresholds', () => {
      const highTheme = getRadarColorTheme(85);
      assert.equal(highTheme.theme, 'emerald');

      const midTheme = getRadarColorTheme(72);
      assert.equal(midTheme.theme, 'sky');

      const lowTheme = getRadarColorTheme(55);
      assert.equal(lowTheme.theme, 'rose');
    });

    it('calculates average score across all 5 axes correctly', () => {
      const scores = { phonemes: 80, stress: 80, intonation: 80, endingSounds: 80, fluency: 80 };
      assert.equal(calculateAverageRadarScore(scores), 80);

      const variedScores = { phonemes: 100, stress: 50, intonation: 60, endingSounds: 90, fluency: 50 };
      // (100 + 50 + 60 + 90 + 50) / 5 = 350 / 5 = 70
      assert.equal(calculateAverageRadarScore(variedScores), 70);
    });
  });

  describe('Learner Auth Token Generation & Verification (AC 1)', () => {
    it('generates and successfully verifies token payload', () => {
      const token = generateAuthToken('usr_test_123', 'test@example.com');
      assert.ok(typeof token === 'string' && token.length > 20);

      const payload = verifyAuthToken(token);
      assert.ok(payload);
      assert.equal(payload.sub, 'usr_test_123');
      assert.equal(payload.email, 'test@example.com');
    });

    it('rejects invalid or corrupted token string', () => {
      const invalid = verifyAuthToken('corrupted-token-invalid');
      assert.equal(invalid, null);
    });
  });

  describe('REST API & SQLite Database Endpoints (AC 1, AC 3, AC 4)', () => {
    it('POST /api/v1/auth/login authenticates user and returns profile + token', async () => {
      const res = await fetch(`http://localhost:${PORT}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test_learner@vietphonics.vn',
          name: 'Học Viên Test'
        })
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.token);
      assert.equal(data.user.email, 'test_learner@vietphonics.vn');
      assert.equal(data.user.name, 'Học Viên Test');
    });

    it('GET /api/v1/user/profile-dashboard returns 5 radar scores and 4 learning stats', async () => {
      const res = await fetch(`http://localhost:${PORT}/api/v1/user/profile-dashboard`, {
        headers: { 'x-user-id': 'default_user' }
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.user);
      assert.equal(data.user.name, 'Đặng Vương');

      // 5 radar axes (AC 2)
      assert.equal(typeof data.radarScores.phonemes, 'number');
      assert.equal(typeof data.radarScores.stress, 'number');
      assert.equal(typeof data.radarScores.intonation, 'number');
      assert.equal(typeof data.radarScores.endingSounds, 'number');
      assert.equal(typeof data.radarScores.fluency, 'number');

      // 4 stats (AC 3)
      assert.equal(typeof data.stats.totalPracticeMinutes, 'number');
      assert.equal(typeof data.stats.masteredPhonemesCount, 'number');
      assert.equal(typeof data.stats.errorBankCount, 'number');
      assert.equal(typeof data.stats.predictedIelts, 'number');

      assert.ok(data.radarPoints.length === 5);
      assert.ok(data.averageRadarScore >= 0);
    });

    it('POST /api/v1/user/profile-dashboard/update-scores updates scores and persists to SQLite', async () => {
      const updateRes = await fetch(`http://localhost:${PORT}/api/v1/user/profile-dashboard/update-scores`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'default_user'
        },
        body: JSON.stringify({
          radarScores: {
            phonemes: 88,
            stress: 82,
            intonation: 75,
            endingSounds: 95,
            fluency: 84
          },
          stats: {
            totalPracticeMinutes: 360,
            masteredPhonemesCount: 34,
            errorBankCount: 5,
            predictedIelts: 7.5
          }
        })
      });

      assert.equal(updateRes.status, 200);
      const updateData = await updateRes.json();
      assert.equal(updateData.success, true);

      // Verify update in SQLite
      const row = db.prepare("SELECT * FROM learner_auth_dashboard_records WHERE user_id = 'default_user'").get();
      assert.equal(row.phonemes_score, 88);
      assert.equal(row.ending_sounds_score, 95);
      assert.equal(row.total_practice_minutes, 360);
      assert.equal(row.mastered_phonemes_count, 34);
      assert.equal(row.predicted_ielts, 7.5);
    });
  });
});
