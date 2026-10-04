import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import app from '../server/index.js';
import { db } from '../server/db.js';
import {
  CONFUSION_TRAP_DRILLS,
  evaluateConfusionTrap
} from '../src/lib/scoring/crossTransition.js';

describe('PRON-208: L1 Confusion-Trap Cross-Transition Drills Tests', () => {

  describe('Drill Catalog & Antagonistic Phoneme Pairs (AC 1)', () => {
    test('Must contain trap drills for s/sh, l/n, and theta/s', () => {
      assert.ok(CONFUSION_TRAP_DRILLS.trap_s_sh);
      assert.ok(CONFUSION_TRAP_DRILLS.trap_l_n);
      assert.ok(CONFUSION_TRAP_DRILLS.trap_theta_s);
    });

    test('trap_s_sh should contain tongue twister sentence and lip shape instructions', () => {
      const drill = CONFUSION_TRAP_DRILLS.trap_s_sh;
      assert.equal(drill.phonemeA, '/s/');
      assert.equal(drill.phonemeB, '/ʃ/');
      assert.equal(drill.sentence, 'She sells sea shells on the seashore.');
      assert.ok(drill.l1Notice.includes('đồng hóa âm'));

      // Check lip shape badges
      assert.ok(drill.words[0].lipShape.includes('Chu cong môi'));
      assert.ok(drill.words[1].lipShape.includes('Bè miệng cười'));
    });
  });

  describe('Phonetic Assimilation Detection & Agility Matrix (AC 2 & AC 4)', () => {
    test('evaluateConfusionTrap should achieve 100% agility when transitions are clean', () => {
      const res = evaluateConfusionTrap('trap_s_sh', {
        'She': '/ʃ/',
        'sells': '/s/',
        'sea': '/s/',
        'shells': '/ʃ/'
      });
      assert.equal(res.agilityScore, 100);
      assert.equal(res.assimilations.length, 0);
      assert.ok(res.matrix.totalTransitions > 0);
      assert.equal(res.matrix.successfulTransitions, res.matrix.totalTransitions);
    });

    test('evaluateConfusionTrap should detect tongue slip assimilation when phoneme collapses', () => {
      // User says "sells" with /ʃ/ after "She" (/ʃ/)
      const res = evaluateConfusionTrap('trap_s_sh', {
        'She': '/ʃ/',
        'sells': '/ʃ/' // assimilation!
      });
      assert.ok(res.assimilations.length >= 1);
      assert.ok(res.assimilations[0].message.includes('Líu lưỡi đồng hóa âm'));
      assert.ok(res.assimilations[0].message.includes('She'));
      assert.ok(res.assimilations[0].message.includes('sells'));
      assert.ok(res.agilityScore < 100);
    });
  });

  describe('Backend API & SQLite Persistence (Gate D & E)', () => {
    let server;
    const testPort = 3865;
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

    test('GET /api/v1/practice/confusion-trap/drills should return all drills', async () => {
      const res = await fetch(`${baseUrl}/api/v1/practice/confusion-trap/drills`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(Array.isArray(data.drills));
      assert.ok(data.drills.length >= 3);
      assert.equal(data.drills[0].id, 'trap_s_sh');
    });

    test('POST /api/v1/practice/confusion-trap should evaluate and persist to SQLite', async () => {
      const res = await fetch(`${baseUrl}/api/v1/practice/confusion-trap`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'user_trap_test'
        },
        body: JSON.stringify({
          trapId: 'trap_s_sh',
          detectedWordPhonemes: {
            'She': '/ʃ/',
            'sells': '/ʃ/' // simulated assimilation
          }
        })
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.recordId.startsWith('ctd-'));
      assert.ok(data.evaluation.assimilations.length >= 1);

      // Verify row persisted in SQLite
      const row = db.prepare('SELECT * FROM cross_transition_drill_records WHERE id = ?').get(data.recordId);
      assert.ok(row, 'Record not found in SQLite table');
      assert.equal(row.user_id, 'user_trap_test');
      assert.equal(row.trap_id, 'trap_s_sh');
      assert.equal(row.phoneme_a, '/s/');
      assert.equal(row.phoneme_b, '/ʃ/');
    });

    test('GET /api/v1/practice/confusion-trap/latest should retrieve user record', async () => {
      const res = await fetch(`${baseUrl}/api/v1/practice/confusion-trap/latest`, {
        headers: { 'x-user-id': 'user_trap_test' }
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.recordId);
      assert.equal(data.trapId, 'trap_s_sh');
      assert.ok(Array.isArray(data.assimilations));
    });

    test('POST /api/v1/practice/confusion-trap validation: reject missing trapId with 400', async () => {
      const res = await fetch(`${baseUrl}/api/v1/practice/confusion-trap`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ detectedWordPhonemes: {} })
      });

      assert.equal(res.status, 400);
      const data = await res.json();
      assert.equal(data.success, false);
      assert.ok(data.error.includes('Missing required field: trapId'));
    });
  });

});
