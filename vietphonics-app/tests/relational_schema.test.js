import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import app from '../server/index.js';
import { db } from '../server/db.js';
import {
  SCHEMA_TABLES,
  getPartitionNameForDate,
  getMonthBoundaries,
  evaluateConnectionPoolHealth,
  ensureMonthlyPartition,
  routeInsertPhonemeScore
} from '../src/lib/database/relationalSchemaManager.js';

const PORT = 3883;
let server;

describe('ARCH-101: Relational Database Schema Design & Range Partitioning Tests', () => {
  before((done) => {
    server = http.createServer(app);
    server.listen(PORT, done);
  });

  after((done) => {
    server.close(done);
  });

  describe('3NF Relational Tables & Foreign Keys (AC 1)', () => {
    it('verifies all 4 core relational tables are instantiated', () => {
      for (const tableName of SCHEMA_TABLES) {
        const check = db.prepare(
          "SELECT name FROM sqlite_master WHERE type='table' AND name=?"
        ).get(tableName);
        assert.ok(check, `Table ${tableName} must exist in database schema`);
      }
    });

    it('enforces cascade deletion when user is deleted', () => {
      const testUserId = `usr_cascade_${Date.now()}`;
      const now = new Date().toISOString();

      // Insert parent user
      db.prepare(`
        INSERT INTO arch_users (id, email, full_name, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?)
      `).run(testUserId, `${testUserId}@example.com`, 'Cascade User', now, now);

      // Insert child subscription
      db.prepare(`
        INSERT INTO arch_subscriptions (id, user_id, plan_code, status, current_period_start, current_period_end, created_at)
        VALUES (?, ?, 'pro', 'active', ?, ?, ?)
      `).run(`sub_${testUserId}`, testUserId, now, now, now);

      // Insert child phoneme score
      db.prepare(`
        INSERT INTO arch_phoneme_scores (id, user_id, phoneme_symbol, score, duration_ms, created_at)
        VALUES (?, ?, '/s/', 85, 200, ?)
      `).run(`ps_${testUserId}`, testUserId, now);

      // Delete parent user
      db.prepare('DELETE FROM arch_users WHERE id = ?').run(testUserId);

      // Check cascade deletion
      const remainingSub = db.prepare('SELECT * FROM arch_subscriptions WHERE user_id = ?').get(testUserId);
      const remainingScore = db.prepare('SELECT * FROM arch_phoneme_scores WHERE user_id = ?').get(testUserId);

      assert.equal(remainingSub, undefined, 'Subscriptions must cascade delete');
      assert.equal(remainingScore, undefined, 'Phoneme scores must cascade delete');
    });
  });

  describe('Compound Indexes & Fast Index Scan (AC 2)', () => {
    it('verifies compound indexes are registered on phoneme_scores and subscriptions', () => {
      const indexes = db.prepare(
        "SELECT name FROM sqlite_master WHERE type='index'"
      ).all().map(r => r.name);

      assert.ok(indexes.includes('idx_arch_phoneme_scores_user_sym'));
      assert.ok(indexes.includes('idx_arch_phoneme_scores_user_time'));
      assert.ok(indexes.includes('idx_arch_subscriptions_user_status'));
    });

    it('performs rapid indexed scan on (user_id, created_at DESC) under 15ms', () => {
      const startTime = performance.now();
      const records = db.prepare(`
        SELECT * FROM arch_phoneme_scores
        WHERE user_id = 'usr_arch_default'
        ORDER BY created_at DESC
        LIMIT 10
      `).all();
      const duration = performance.now() - startTime;

      assert.ok(records.length >= 1);
      assert.ok(duration < 15, `Query time ${duration}ms must be under 15ms index scan threshold`);
    });
  });

  describe('PgBouncer Connection Pooling Simulation (AC 3)', () => {
    it('validates 5,000 max clients capacity in transaction mode', () => {
      const pool = evaluateConnectionPoolHealth({
        maxClientConn: 5000,
        activeClients: 1500,
        defaultPoolSize: 50,
        poolMode: 'transaction'
      });

      assert.equal(pool.healthy, true);
      assert.equal(pool.maxCapacity, 5000);
      assert.equal(pool.mode, 'transaction');
      assert.equal(pool.utilizationPercent, 30);
    });
  });

  describe('Automated Monthly Range Partitioning (AC 4)', () => {
    it('generates consistent monthly partition table names', () => {
      const partNameOct = getPartitionNameForDate('2026-10-15T10:00:00Z');
      assert.equal(partNameOct, 'arch_phoneme_scores_2026_10');

      const partNameNov = getPartitionNameForDate('2026-11-01T00:00:00Z');
      assert.equal(partNameNov, 'arch_phoneme_scores_2026_11');
    });

    it('computes exact UTC month boundaries for partition ranges', () => {
      const bounds = getMonthBoundaries(2026, 10);
      assert.equal(bounds.start, '2026-10-01T00:00:00.000Z');
      assert.equal(bounds.end, '2026-11-01T00:00:00.000Z');
    });

    it('routes insert into monthly partition table dynamically', () => {
      const testScoreId = `ps_route_${Date.now()}`;
      const result = routeInsertPhonemeScore(db, {
        id: testScoreId,
        user_id: 'usr_arch_default',
        phoneme_symbol: '/θ/',
        score: 89.2,
        duration_ms: 280,
        created_at: '2026-10-04T12:00:00Z'
      });

      assert.equal(result.partitionTable, 'arch_phoneme_scores_2026_10');

      // Verify partition table exists and contains record
      const row = db.prepare(`SELECT * FROM arch_phoneme_scores_2026_10 WHERE id = ?`).get(testScoreId);
      assert.ok(row);
      assert.equal(row.phoneme_symbol, '/θ/');
      assert.equal(row.score, 89.2);
    });
  });

  describe('REST API Endpoints', () => {
    it('GET /api/v1/arch/schema-status returns schema tables and connection pool health', async () => {
      const res = await fetch(`http://localhost:${PORT}/api/v1/arch/schema-status`);
      assert.equal(res.status, 200);
      const data = await res.json();

      assert.equal(data.success, true);
      assert.ok(Array.isArray(data.tables));
      assert.equal(data.poolHealth.mode, 'transaction');
    });

    it('POST /api/v1/arch/records ingests new phoneme record and routes to partition', async () => {
      const res = await fetch(`http://localhost:${PORT}/api/v1/arch/records`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'usr_arch_default',
          phonemeSymbol: '/dʒ/',
          score: 91,
          durationMs: 310
        })
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.recordId);
      assert.ok(data.partitionTable.startsWith('arch_phoneme_scores_'));
    });

    it('GET /api/v1/arch/user-history/:userId retrieves score records with subscription status', async () => {
      const res = await fetch(`http://localhost:${PORT}/api/v1/arch/user-history/usr_arch_default`);
      assert.equal(res.status, 200);
      const data = await res.json();

      assert.equal(data.success, true);
      assert.equal(data.hasActiveSubscription, true);
      assert.ok(data.historyCount >= 1);
    });
  });
});
