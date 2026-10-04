import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import app from '../server/index.js';
import { db } from '../server/db.js';
import {
  POSITIONAL_LADDER_CATALOG,
  calculateTierStars,
  evaluateLadderProgression
} from '../src/lib/scoring/positionalLadder.js';

describe('PRON-205: 3-Tier Positional Phoneme Ladder Tests', () => {

  describe('Catalog & Positional Tiers (AC 1 & AC 2)', () => {
    test('Must contain positional ladder catalog for /z/, /θ/, and /l/', () => {
      assert.ok(POSITIONAL_LADDER_CATALOG['/z/']);
      assert.ok(POSITIONAL_LADDER_CATALOG['/θ/']);
      assert.ok(POSITIONAL_LADDER_CATALOG['/l/']);
    });

    test('Each phoneme profile must have 3 tiers (Initial, Medial, Final) and L1 Coda warning', () => {
      const zProf = POSITIONAL_LADDER_CATALOG['/z/'];
      assert.equal(zProf.tiers.length, 3);
      assert.equal(zProf.tiers[0].position, 'initial');
      assert.equal(zProf.tiers[1].position, 'medial');
      assert.equal(zProf.tiers[2].position, 'final');
      assert.ok(zProf.l1FinalWarning.includes('nuốt âm'));

      // Check sample words
      assert.equal(zProf.tiers[0].words[0].word, 'zoo');
      assert.equal(zProf.tiers[1].words[0].word, 'music');
      assert.equal(zProf.tiers[2].words[0].word, 'buzz');
    });
  });

  describe('Star Calculation & Sequential Unlock Engine (AC 1)', () => {
    test('calculateTierStars should correctly compute star boundaries', () => {
      assert.equal(calculateTierStars(95), 3);
      assert.equal(calculateTierStars(85), 3);
      assert.equal(calculateTierStars(84), 2);
      assert.equal(calculateTierStars(70), 2);
      assert.equal(calculateTierStars(50), 1);
      assert.equal(calculateTierStars(40), 0);
    });

    test('evaluateLadderProgression should lock Tier 2 and Tier 3 when Tier 1 < 80%', () => {
      const prog = evaluateLadderProgression(75, 0, 0);
      assert.equal(prog.tier1.isUnlocked, true);
      assert.equal(prog.tier2.isUnlocked, false);
      assert.equal(prog.tier3.isUnlocked, false);
      assert.equal(prog.tier1.stars, 2);
    });

    test('evaluateLadderProgression should unlock Tier 2 when Tier 1 >= 80%', () => {
      const prog = evaluateLadderProgression(85, 60, 0);
      assert.equal(prog.tier1.isUnlocked, true);
      assert.equal(prog.tier2.isUnlocked, true);
      assert.equal(prog.tier3.isUnlocked, false); // Tier 2 not yet 80%
      assert.equal(prog.tier1.stars, 3);
      assert.equal(prog.tier2.stars, 1);
    });

    test('evaluateLadderProgression should unlock Tier 3 when Tier 1 and Tier 2 both >= 80%', () => {
      const prog = evaluateLadderProgression(90, 88, 92);
      assert.equal(prog.tier1.isUnlocked, true);
      assert.equal(prog.tier2.isUnlocked, true);
      assert.equal(prog.tier3.isUnlocked, true);
      assert.equal(prog.totalStars, 9);
      assert.equal(prog.isAllMastered, true);
    });
  });

  describe('Backend API & SQLite Persistence (Gate D & E)', () => {
    let server;
    const testPort = 3862;
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

    test('GET /api/v1/practice/positional-ladder/catalog should return catalog', async () => {
      const res = await fetch(`${baseUrl}/api/v1/practice/positional-ladder/catalog`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(Array.isArray(data.catalog));
      assert.ok(data.catalog.length >= 3);
    });

    test('POST /api/v1/practice/positional-ladder/submit should save score and unlock next tier', async () => {
      const res = await fetch(`${baseUrl}/api/v1/practice/positional-ladder/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'user_ladder_test'
        },
        body: JSON.stringify({
          phoneme: '/z/',
          tier: 1,
          word: 'zoo',
          score: 88
        })
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.recordId.startsWith('pos-'));
      assert.equal(data.stars, 3);
      assert.equal(data.progression.tier2.isUnlocked, true);

      // Verify row persisted in SQLite
      const row = db.prepare('SELECT * FROM positional_ladder_records WHERE id = ?').get(data.recordId);
      assert.ok(row, 'Record not found in SQLite table');
      assert.equal(row.user_id, 'user_ladder_test');
      assert.equal(row.phoneme, '/z/');
      assert.equal(row.tier, 1);
      assert.equal(row.score, 88);
      assert.equal(row.stars, 3);
    });

    test('GET /api/v1/practice/positional-ladder/status should retrieve user progression', async () => {
      const res = await fetch(`${baseUrl}/api/v1/practice/positional-ladder/status?phoneme=/z/`, {
        headers: { 'x-user-id': 'user_ladder_test' }
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.phoneme, '/z/');
      assert.ok(data.progression.tier1);
    });

    test('POST /api/v1/practice/positional-ladder/submit validation: reject missing fields with 400', async () => {
      const res = await fetch(`${baseUrl}/api/v1/practice/positional-ladder/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneme: '/z/' })
      });

      assert.equal(res.status, 400);
      const data = await res.json();
      assert.equal(data.success, false);
      assert.ok(data.error.includes('Missing required fields'));
    });
  });

});
