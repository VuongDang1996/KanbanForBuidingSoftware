import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import app from '../server/index.js';
import { db } from '../server/db.js';
import {
  PERK_ITEMS_CATALOG,
  UNIVERSITIES_CATALOG,
  buyPerkItem,
  computeUniversityLeaderboard
} from '../src/lib/scoring/rpgInventoryLeaderboard.js';

describe('GAME-105: RPG Equipment Inventory & University Leaderboard Tests', () => {
  let server;
  const PORT = 3877;
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

  describe('Inventory Catalog & Purchase Math (AC 1)', () => {
    test('Perk catalog must contain Streak Freeze Shield with 200 gems', () => {
      const shield = PERK_ITEMS_CATALOG.find((p) => p.id === 'streak_freeze');
      assert.ok(shield);
      assert.equal(shield.costGems, 200);
      assert.ok(shield.name.includes('Streak Freeze'));
      assert.equal(shield.type, 'consumable');
    });

    test('buyPerkItem rejects purchase when gems are insufficient', () => {
      const res = buyPerkItem({
        currentGems: 100,
        inventory: [],
        itemId: 'streak_freeze'
      });
      assert.equal(res.success, false);
      assert.ok(res.error.includes('200 Kim Cương'));
      assert.equal(res.newGems, 100);
    });

    test('buyPerkItem successfully adds item to inventory and deducts gems', () => {
      const res = buyPerkItem({
        currentGems: 500,
        inventory: [],
        itemId: 'streak_freeze'
      });
      assert.equal(res.success, true);
      assert.equal(res.newGems, 300);
      assert.equal(res.newInventory.length, 1);
      assert.equal(res.newInventory[0].itemId, 'streak_freeze');
      assert.equal(res.newInventory[0].quantity, 1);
    });

    test('buyPerkItem increments quantity on re-purchase', () => {
      const first = buyPerkItem({
        currentGems: 500,
        inventory: [],
        itemId: 'streak_freeze'
      });
      const second = buyPerkItem({
        currentGems: first.newGems,
        inventory: first.newInventory,
        itemId: 'streak_freeze'
      });
      assert.equal(second.success, true);
      assert.equal(second.newGems, 100);
      assert.equal(second.newInventory.length, 1);
      assert.equal(second.newInventory[0].quantity, 2);
    });
  });

  describe('University Leaderboard & Personal Rank Math (AC 2 & AC 3)', () => {
    test('Podium returns top 3 universities with Gold, Silver, Bronze tiers', () => {
      const board = computeUniversityLeaderboard([], 'HUST', 3200);
      assert.equal(board.podium.length, 3);
      assert.equal(board.podium[0].tier, 'Gold');
      assert.equal(board.podium[1].tier, 'Silver');
      assert.equal(board.podium[2].tier, 'Bronze');
      assert.equal(board.podium[0].id, 'HUST');
      assert.equal(board.podium[1].id, 'FTU');
      assert.equal(board.podium[2].id, 'NEU');
    });

    test('Personal rank footer matches exact target specification', () => {
      const board = computeUniversityLeaderboard([], 'HUST', 3200);
      assert.ok(board.personalRank);
      assert.equal(board.personalRank.userRankInUni, 14);
      assert.equal(board.personalRank.totalStudentsInUni, 820);
      assert.equal(
        board.personalRank.rankText,
        'Bạn đang xếp hạng 14 trong 820 sinh viên ĐH Bách Khoa Hà Nội'
      );
    });
  });

  describe('REST API & Database Persistence (AC 1, AC 2, AC 3, AC 4)', () => {
    test('GET /api/v1/game/inventory returns initial balance and catalog', async () => {
      const testUserId = `user-inv-${Date.now()}`;
      const res = await fetch(`${baseUrl}/api/v1/game/inventory`, {
        headers: { 'x-user-id': testUserId }
      });
      assert.equal(res.status, 200);

      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.gemsBalance, 500);
      assert.ok(Array.isArray(data.inventory));
      assert.ok(data.catalog.length >= 3);
    });

    test('POST /api/v1/game/inventory/buy purchases Streak Freeze and updates SQLite', async () => {
      const testUserId = `user-inv-buy-${Date.now()}`;
      const res = await fetch(`${baseUrl}/api/v1/game/inventory/buy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': testUserId
        },
        body: JSON.stringify({ itemId: 'streak_freeze' })
      });
      assert.equal(res.status, 200);

      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.gemsBalance, 300);
      assert.equal(data.inventory[0].itemId, 'streak_freeze');

      // Check SQLite table rpg_inventory_records
      const row = db.prepare('SELECT * FROM rpg_inventory_records WHERE user_id = ?').get(testUserId);
      assert.ok(row);
      assert.equal(row.gems_balance, 300);
      const items = JSON.parse(row.items_json);
      assert.equal(items.length, 1);
      assert.equal(items[0].itemId, 'streak_freeze');
    });

    test('GET /api/v1/leaderboard/university retrieves podium and personal footer', async () => {
      const res = await fetch(`${baseUrl}/api/v1/leaderboard/university?universityId=HUST`);
      assert.equal(res.status, 200);

      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.podium.length, 3);
      assert.equal(data.podium[0].id, 'HUST');
      assert.equal(data.personalRank.userRankInUni, 14);
    });

    test('POST /api/v1/leaderboard/submit-xp adds XP and updates leaderboard in SQLite', async () => {
      const testUserId = `user-xp-${Date.now()}`;
      const res = await fetch(`${baseUrl}/api/v1/leaderboard/submit-xp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: testUserId,
          universityId: 'HUST',
          universityName: 'ĐH Bách Khoa Hà Nội',
          userName: 'Sinh Viên BK Test',
          xp: 250
        })
      });
      assert.equal(res.status, 200);

      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.submittedXp, 250);

      // Verify in SQLite table university_leaderboard_records
      const row = db.prepare('SELECT * FROM university_leaderboard_records WHERE user_id = ?').get(testUserId);
      assert.ok(row);
      assert.equal(row.xp, 250);
      assert.equal(row.university_id, 'HUST');
    });
  });
});
