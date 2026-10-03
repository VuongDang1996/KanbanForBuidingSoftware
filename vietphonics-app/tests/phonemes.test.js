import test, { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import app from '../server/index.js';
import { db, initAppDatabase } from '../server/db.js';
import { IPA_PHONEMES, getPhonemeTier, summarizePhonemes } from '../src/lib/phonemes/ipaData.js';

describe('USER-102: Granular Phoneme Mastery Ledger (44 IPA Matrix Grid) Tests', () => {
  let server;
  let baseUrl;
  const testPort = 3093;

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

  describe('IPA 44 Phonemes Classification & Standards (AC 1)', () => {
    it('Should contain exactly 44 phonemes in total', () => {
      assert.equal(IPA_PHONEMES.length, 44);
    });

    it('Should have exactly 12 monophthongs (Nguyên âm đơn)', () => {
      const monos = IPA_PHONEMES.filter(p => p.category === 'monophthong');
      assert.equal(monos.length, 12);
    });

    it('Should have exactly 8 diphthongs (Nguyên âm đôi)', () => {
      const diphthongs = IPA_PHONEMES.filter(p => p.category === 'diphthong');
      assert.equal(diphthongs.length, 8);
    });

    it('Should have exactly 24 consonants (Phụ âm)', () => {
      const consonants = IPA_PHONEMES.filter(p => p.category === 'consonant');
      assert.equal(consonants.length, 24);
    });

    it('Each phoneme should contain 3 example words and pronunciation tips (AC 3)', () => {
      for (const p of IPA_PHONEMES) {
        assert.ok(p.symbol, 'Phoneme must have a symbol');
        assert.ok(Array.isArray(p.examples), 'Examples must be an array');
        assert.equal(p.examples.length, 3, `Phoneme /${p.symbol}/ must have 3 example words`);
        assert.ok(p.tips && p.tips.length > 5, `Phoneme /${p.symbol}/ must have pedagogical tips`);
      }
    });
  });

  describe('Phoneme Color-Coding & Threshold Logic (AC 2)', () => {
    it('Should classify score >= 85% as mastered (Emerald Green)', () => {
      const tier85 = getPhonemeTier(85);
      const tier95 = getPhonemeTier(95);

      assert.equal(tier85.tier, 'mastered');
      assert.equal(tier85.badgeColor, 'emerald');
      assert.equal(tier85.isWarning, false);

      assert.equal(tier95.tier, 'mastered');
      assert.equal(tier95.badgeColor, 'emerald');
    });

    it('Should classify 60% <= score < 85% as in-progress (Amber Yellow)', () => {
      const tier60 = getPhonemeTier(60);
      const tier79 = getPhonemeTier(79);
      const tier84 = getPhonemeTier(84);

      assert.equal(tier60.tier, 'progress');
      assert.equal(tier60.badgeColor, 'amber');
      assert.equal(tier60.isWarning, false);

      assert.equal(tier79.tier, 'progress');
      assert.equal(tier84.tier, 'progress');
    });

    it('Should classify score < 60% as weak sound (Rose Red with Warning)', () => {
      const tier54 = getPhonemeTier(54);
      const tier0 = getPhonemeTier(0);
      const tier59 = getPhonemeTier(59);

      assert.equal(tier54.tier, 'weak');
      assert.equal(tier54.badgeColor, 'rose');
      assert.equal(tier54.isWarning, true);

      assert.equal(tier0.tier, 'weak');
      assert.equal(tier59.tier, 'weak');
      assert.equal(tier59.isWarning, true);
    });

    it('Should summarize phoneme statistics correctly', () => {
      const summary = summarizePhonemes(IPA_PHONEMES);
      assert.equal(summary.totalCount, 44);
      assert.ok(summary.masteredCount > 0);
      assert.ok(summary.progressCount > 0);
      assert.ok(summary.weakCount >= 3, 'Must identify at least 3 weak sounds (/θ/, /ʃ/, /dʒ/)');
      assert.ok(summary.averageScore >= 60 && summary.averageScore <= 90);
    });
  });

  describe('Backend API & Database Persistence (Gate D & E)', () => {
    const testGetUserId = `test-user-get-${Date.now()}`;
    const testPostUserId = `test-user-post-${Date.now()}`;

    it('GET /api/v1/user/phonemes should return all 44 phonemes structured with stats', async () => {
      const res = await fetch(`${baseUrl}/api/v1/user/phonemes`, {
        headers: { 'x-user-id': testGetUserId }
      });
      assert.equal(res.status, 200);
      const data = await res.json();

      assert.equal(data.success, true);
      assert.equal(data.counts.total, 44);
      assert.equal(data.counts.monophthongs, 12);
      assert.equal(data.counts.diphthongs, 8);
      assert.equal(data.counts.consonants, 24);

      // Verify that weak sounds are flagged
      const th = data.phonemes.find(p => p.symbol === 'θ');
      assert.ok(th, 'Sound /θ/ must exist');
      assert.equal(th.tier, 'weak');
      assert.equal(th.isWarning, true);
      assert.equal(th.examples.length, 3);
    });

    it('POST /api/v1/user/phonemes/score should update phoneme score and persist to DB', async () => {
      const updateRes = await fetch(`${baseUrl}/api/v1/user/phonemes/score`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': testPostUserId
        },
        body: JSON.stringify({
          phoneme: 'θ',
          score: 88
        })
      });

      assert.equal(updateRes.status, 200);
      const updateData = await updateRes.json();
      assert.equal(updateData.success, true);
      assert.equal(updateData.phoneme.symbol, 'θ');
      assert.equal(updateData.phoneme.score, 88);
      assert.equal(updateData.phoneme.tier, 'mastered');

      // Verify DB direct query
      const dbRow = db.prepare('SELECT * FROM user_phoneme_mastery WHERE user_id = ? AND phoneme = ?').get(testPostUserId, 'θ');
      assert.ok(dbRow);
      assert.equal(dbRow.score, 88);
    });

    it('POST /api/v1/user/phonemes/score should validate score and phoneme input', async () => {
      const invalidScoreRes = await fetch(`${baseUrl}/api/v1/user/phonemes/score`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneme: 'æ', score: 150 })
      });
      assert.equal(invalidScoreRes.status, 400);

      const missingPhonemeRes = await fetch(`${baseUrl}/api/v1/user/phonemes/score`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score: 75 })
      });
      assert.equal(missingPhonemeRes.status, 400);
    });
  });
});
