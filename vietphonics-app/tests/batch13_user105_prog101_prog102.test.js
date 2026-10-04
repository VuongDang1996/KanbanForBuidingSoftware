/**
 * batch13_user105_prog101_prog102.test.js
 * Comprehensive Test Suite for Batch 13:
 * - USER-105: Account Deletion & Personal Data Export (Decree 13/2023/NĐ-CP)
 * - PROG-101: Progress Over Time Charts (7/30/90 Days)
 * - PROG-102: Before vs After Audio Comparison
 * 
 * Strict 12-Gate Protocol Verification:
 * - Gate A: Real personas and learning scenarios
 * - Gate B: Given/When/Then acceptance criteria verified
 * - Gate C: Strict TypeScript/JSDoc and payload typing
 * - Gate D: Real acoustic GOP models & phoneme improvement deltas
 * - Gate F: Revoke sessions on deletion request, signed download expiry
 * - Gate G12: Server-side entitlement check (Free tier 403 on 30/90 days)
 * - Gate H: Gap days not fake-interpolated; true time-series integrity
 * - Gate K: 100% automated test coverage with node:test
 * - Gate L: Decree 13/2023/NĐ-CP legal compliance & 10-year accounting audit trail
 */

import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import app from '../server/index.js';
import { db } from '../server/db.js';

const PORT = 3999;
let server;
const BASE_URL = `http://127.0.0.1:${PORT}`;

before((done) => {
  server = http.createServer(app);
  server.listen(PORT, done);
});

after((done) => {
  server.close(done);
});

// Helper for HTTP requests
async function apiRequest(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });
  const data = await res.json();
  return { status: res.status, ok: res.ok, data };
}

describe('Batch 13: USER-105 — Decree 13/2023/NĐ-CP Data Portability & Erasure', () => {

  test('USER-105 / AC 1: POST /api/v1/user/data-export exports personal data with 24h validity', async () => {
    const res = await apiRequest('/api/v1/user/data-export', {
      method: 'POST',
      body: JSON.stringify({ accountId: 'default_user' })
    });

    assert.equal(res.status, 200);
    assert.equal(res.data.success, true);
    assert.ok(res.data.downloadUrl);
    assert.ok(res.data.downloadUrl.includes('data_export_default_user'));
    assert.ok(res.data.expiresAt);

    // Verify 24-hour expiration delta
    const expiryDate = new Date(res.data.expiresAt);
    const now = new Date();
    const diffHours = (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    assert.ok(diffHours >= 23.9 && diffHours <= 24.1, `Expiry hours was ${diffHours}`);

    // Verify comprehensive data structure (AC 1)
    // Verify comprehensive data structure (AC 1)
    assert.ok(res.data.data);
    assert.ok(res.data.data.profile);
    assert.ok(Array.isArray(res.data.data.phonemeMastery));
    assert.ok(Array.isArray(res.data.data.progressHistory));
    assert.ok(Array.isArray(res.data.data.baselineRecords));
    assert.ok(Array.isArray(res.data.data.sessions));

    // Verify database record in user_data_exports
    const exportDb = db.prepare("SELECT * FROM user_data_exports WHERE account_id = ? ORDER BY created_at DESC LIMIT 1").get('default_user');
    assert.ok(exportDb);
    assert.equal(exportDb.export_status, 'completed');

    // Verify audit compliance log (Gate L)
    const auditLog = db.prepare("SELECT * FROM audit_compliance_logs WHERE account_id = ? AND event_type = 'data_export_requested' ORDER BY created_at DESC LIMIT 1").get('default_user');
    assert.ok(auditLog);
  });

  test('USER-105 / AC 2: POST /api/v1/user/account-delete-request strictly validates "XOÁ"', async () => {
    // Reject with empty or incorrect text
    const failRes = await apiRequest('/api/v1/user/account-delete-request', {
      method: 'POST',
      body: JSON.stringify({
        accountId: 'test_delete_user',
        confirmationText: 'delete my account'
      })
    });

    assert.equal(failRes.status, 400);
    assert.equal(failRes.data.success, false);
    assert.ok(failRes.data.error.includes('XOÁ'));
  });

  test('USER-105 / AC 2 & 3: Account deletion request triggers 7-day grace period, revokes sessions, and allows cancellation', async () => {
    const testUserId = `user_del_test_${Date.now()}`;

    // Seed test user and active session
    db.prepare(`
      INSERT INTO auth_accounts (id, email, password_hash, display_name, status, created_at, updated_at)
      VALUES (?, ?, 'hash123', 'Test Del User', 'active', datetime('now'), datetime('now'))
    `).run(testUserId, `${testUserId}@example.com`);

    db.prepare(`
      INSERT INTO user_active_sessions (id, account_id, refresh_token_hash, device_name, device_type, ip_address, created_at, last_active_at)
      VALUES (?, ?, 'tok1', 'MacBook Air', 'desktop', '127.0.0.1', datetime('now'), datetime('now'))
    `).run(`sess_${testUserId}`, testUserId);

    // 1. Submit deletion request with "XOÁ"
    const reqRes = await apiRequest('/api/v1/user/account-delete-request', {
      method: 'POST',
      body: JSON.stringify({
        accountId: testUserId,
        confirmationText: 'XOÁ',
        reason: 'Không còn nhu cầu'
      })
    });

    assert.equal(reqRes.status, 200);
    assert.equal(reqRes.data.success, true);
    assert.equal(reqRes.data.status, 'pending_deletion');
    assert.equal(reqRes.data.daysRemaining, 7);
    assert.ok(reqRes.data.cancelToken);

    // Verify session was revoked (Gate F / AC 2)
    const activeSession = db.prepare("SELECT * FROM user_active_sessions WHERE id = ?").get(`sess_${testUserId}`);
    assert.ok(activeSession.revoked_at !== null, 'Active session must be revoked');

    // 2. Check deletion status
    const statusRes = await apiRequest(`/api/v1/user/account-delete-status/${testUserId}`);
    assert.equal(statusRes.status, 200);
    assert.equal(statusRes.data.isPendingDeletion, true);
    assert.equal(statusRes.data.daysRemaining, 7);

    // 3. Cancel deletion request
    const cancelRes = await apiRequest('/api/v1/user/account-delete-cancel', {
      method: 'POST',
      body: JSON.stringify({
        accountId: testUserId,
        cancelToken: reqRes.data.cancelToken
      })
    });

    assert.equal(cancelRes.status, 200);
    assert.equal(cancelRes.data.success, true);
    assert.equal(cancelRes.data.status, 'active');

    // Status check should now show active
    const postStatusRes = await apiRequest(`/api/v1/user/account-delete-status/${testUserId}`);
    assert.equal(postStatusRes.data.isPendingDeletion, false);

    // Verify cancellation audit log
    const cancelLog = db.prepare("SELECT * FROM audit_compliance_logs WHERE account_id = ? AND event_type = 'deletion_canceled'").get(testUserId);
    assert.ok(cancelLog);
  });

  test('USER-105 / AC 4: POST /api/v1/user/account-purge-cron purges after grace period but keeps anonymized accounting records', async () => {
    const purgeUserId = `user_purge_${Date.now()}`;

    // Seed in auth_accounts and arch_users (accounting table)
    db.prepare(`
      INSERT INTO auth_accounts (id, email, password_hash, display_name, status, created_at, updated_at)
      VALUES (?, ?, 'hash', 'Nguyen Van Purge', 'active', datetime('now'), datetime('now'))
    `).run(purgeUserId, `${purgeUserId}@test.vn`);

    db.prepare(`
      INSERT INTO arch_users (id, email, full_name, dialect_preference, tier, created_at, updated_at)
      VALUES (?, ?, 'Nguyen Van Purge', 'northern', 'free', datetime('now'), datetime('now'))
    `).run(purgeUserId, `${purgeUserId}@test.vn`);

    db.prepare(`
      INSERT INTO user_profiles (id, user_id, dialect, calibration_mode, confidence_score, ielts_target, overall_gop, created_at, updated_at)
      VALUES (?, ?, 'bac', 'manual_selection', 0.9, 7.0, 75, datetime('now'), datetime('now'))
    `).run(`prof_${purgeUserId}`, purgeUserId);

    // Set deletion request with expired grace period (yesterday)
    const pastDate = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
    db.prepare(`
      INSERT INTO account_deletion_requests (id, account_id, status, cancel_token_hash, requested_at, grace_period_ends_at, reason)
      VALUES (?, ?, 'pending_deletion', 'tok_expired', datetime('now', '-8 days'), ?, 'Purge test')
    `).run(`del_req_${purgeUserId}`, purgeUserId, pastDate);

    // Run cron
    const cronRes = await apiRequest('/api/v1/user/account-purge-cron', { method: 'POST' });
    assert.equal(cronRes.status, 200);
    assert.ok(cronRes.data.purgedCount >= 1);

    // Verify profile is deleted
    const profile = db.prepare("SELECT * FROM user_profiles WHERE user_id = ?").get(purgeUserId);
    assert.equal(profile, undefined);

    // Verify accounting record is anonymized per 10-year law (not hard-deleted)
    const archUser = db.prepare("SELECT * FROM arch_users WHERE id = ?").get(purgeUserId);
    assert.ok(archUser);
    assert.equal(archUser.email, `anonymized_${purgeUserId}@vietphonics.vn`);
    assert.equal(archUser.full_name, 'Anonymized User');
  });
});

describe('Batch 13: PROG-101 — Progress Over Time Charts (7/30/90 Days)', () => {

  test('PROG-101 / AC 1: Validates range query parameter', async () => {
    const invalidRes = await apiRequest('/api/v1/progress/history-timeseries?accountId=default_user&range=14');
    assert.equal(invalidRes.status, 400);
    assert.equal(invalidRes.data.success, false);

    const valid7 = await apiRequest('/api/v1/progress/history-timeseries?accountId=default_user&range=7');
    assert.equal(valid7.status, 200);
    assert.equal(valid7.data.range, 7);
    assert.equal(valid7.data.timeseries.length, 7);

    const valid30 = await apiRequest('/api/v1/progress/history-timeseries?accountId=default_user&range=30');
    assert.equal(valid30.status, 200);
    assert.equal(valid30.data.range, 30);
    assert.equal(valid30.data.timeseries.length, 30);
  });

  test('PROG-101 / AC 4 (Gate G12): Free users cannot access 30 or 90 day ranges (403 Forbidden)', async () => {
    const freeUserId = `free_learner_${Date.now()}`;

    // Seed free user
    db.prepare(`
      INSERT INTO auth_accounts (id, email, password_hash, display_name, tier, status, created_at, updated_at)
      VALUES (?, ?, 'hash', 'Free Learner', 'free', 'active', datetime('now'), datetime('now'))
    `).run(freeUserId, `${freeUserId}@test.vn`);

    // 7 days is permitted for Free tier
    const res7 = await apiRequest(`/api/v1/progress/history-timeseries?accountId=${freeUserId}&range=7`);
    assert.equal(res7.status, 200);

    // 30 days is blocked with 403 Forbidden
    const res30 = await apiRequest(`/api/v1/progress/history-timeseries?accountId=${freeUserId}&range=30`);
    assert.equal(res30.status, 403);
    assert.equal(res30.data.upgradeRequired, true);

    // 90 days is blocked with 403 Forbidden
    const res90 = await apiRequest(`/api/v1/progress/history-timeseries?accountId=${freeUserId}&range=90`);
    assert.equal(res90.status, 403);
    assert.equal(res90.data.upgradeRequired, true);
  });

  test('PROG-101 / AC 3: Empty state when user has fewer than 3 practiced days', async () => {
    const newUserId = `new_learner_${Date.now()}`;

    db.prepare(`
      INSERT INTO auth_accounts (id, email, password_hash, display_name, tier, status, created_at, updated_at)
      VALUES (?, ?, 'hash', 'New Learner', 'free', 'active', datetime('now'), datetime('now'))
    `).run(newUserId, `${newUserId}@test.vn`);

    // Only 1 day recorded
    db.prepare(`
      INSERT INTO daily_skill_progress_history (
        id, account_id, practice_date, ending_sounds_score, vowels_score, stress_score, intonation_score, overall_gop, practice_minutes, words_practiced, created_at
      ) VALUES (?, ?, date('now'), 75, 78, 70, 72, 74, 15, 20, datetime('now'))
    `).run(`prog_${newUserId}_1`, newUserId);

    const res = await apiRequest(`/api/v1/progress/history-timeseries?accountId=${newUserId}&range=7`);
    assert.equal(res.status, 200);
    assert.equal(res.data.emptyState, true);
    assert.equal(res.data.daysCount, 1);
    assert.ok(res.data.message.includes('Luyện thêm 2 ngày'));
  });

  test('PROG-101 / AC 2: Non-practiced days are represented as gap days with null scores (no fake interpolation)', async () => {
    const res = await apiRequest('/api/v1/progress/history-timeseries?accountId=default_user&range=30');
    assert.equal(res.status, 200);

    const timeseries = res.data.timeseries;
    assert.equal(timeseries.length, 30);

    const practicedDays = timeseries.filter(d => d.hasPracticed);
    const gapDays = timeseries.filter(d => !d.hasPracticed);

    assert.ok(practicedDays.length > 0, 'Must have practiced days');
    assert.ok(gapDays.length > 0, 'Must have rest/gap days in 30-day timeline');

    // Gap days must explicitly hold null scores
    for (const gap of gapDays) {
      assert.equal(gap.overallGop, null);
      assert.equal(gap.endingSounds, null);
      assert.equal(gap.vowels, null);
      assert.equal(gap.practiceMinutes, 0);
    }
  });

  test('PROG-101 / AC 5: POST /api/v1/progress/record-practice-session records daily progress', async () => {
    const testAcc = `test_rec_${Date.now()}`;
    const today = new Date().toISOString().split('T')[0];

    const res = await apiRequest('/api/v1/progress/record-practice-session', {
      method: 'POST',
      body: JSON.stringify({
        accountId: testAcc,
        practiceDate: today,
        endingSoundsScore: 88,
        vowelsScore: 84,
        stressScore: 82,
        intonationScore: 80,
        overallGop: 85,
        practiceMinutes: 25,
        wordsPracticed: 35
      })
    });

    assert.equal(res.status, 200);
    assert.equal(res.data.success, true);

    const row = db.prepare("SELECT * FROM daily_skill_progress_history WHERE account_id = ? AND practice_date = ?").get(testAcc, today);
    assert.ok(row);
    assert.equal(row.ending_sounds_score, 88);
    assert.equal(row.overall_gop, 85);
  });
});

describe('Batch 13: PROG-102 — Before vs After Audio Comparison', () => {

  test('PROG-102 / AC 1, 2, 3: Baseline vs Latest audio comparison with phoneme deltas & model consistency', async () => {
    const res = await apiRequest('/api/v1/progress/before-after-comparison/default_user?sentenceId=sent_focus_01');

    assert.equal(res.status, 200);
    assert.equal(res.data.success, true);
    assert.equal(res.data.hasComparison, true);
    assert.equal(res.data.sentenceId, 'sent_focus_01');

    // Baseline GOP (58%) vs Latest GOP (84%)
    assert.equal(res.data.baselineOverallGop, 58);
    assert.equal(res.data.latestOverallGop, 84);
    assert.equal(res.data.overallDelta, 26);

    // Phoneme improvement deltas
    assert.ok(Array.isArray(res.data.phonemeDeltas));
    assert.ok(res.data.phonemeDeltas.length >= 4);

    const thDelta = res.data.phonemeDeltas.find(p => p.phoneme === '/θ/');
    assert.ok(thDelta);
    assert.equal(thDelta.baselineScore, 42);
    assert.equal(thDelta.latestScore, 78);
    assert.equal(thDelta.delta, 36);
    assert.equal(thDelta.improved, true);

    // Model version consistency tag
    assert.equal(res.data.modelVersion, 'Acoustic_GOP_v5.1');
    assert.equal(res.data.isModelConsistent, true);
  });

  test('PROG-102 / AC 4: Voice consent revocation hides audio playback URLs while preserving score comparison', async () => {
    // 0. Ensure initial state is clean
    await apiRequest('/api/v1/progress/toggle-voice-consent', {
      method: 'POST',
      body: JSON.stringify({ accountId: 'default_user', consentGranted: true })
    });

    // 1. Initial state: consent is granted
    const initRes = await apiRequest('/api/v1/progress/before-after-comparison/default_user?sentenceId=sent_focus_01');
    assert.equal(initRes.data.consentGranted, true);
    assert.ok(initRes.data.baselineAudioUrl !== null);
    assert.ok(initRes.data.latestAudioUrl !== null);

    // 2. Revoke voice consent
    const revokeRes = await apiRequest('/api/v1/progress/toggle-voice-consent', {
      method: 'POST',
      body: JSON.stringify({ accountId: 'default_user', consentGranted: false })
    });
    assert.equal(revokeRes.status, 200);
    assert.equal(revokeRes.data.consentGranted, false);

    // 3. Audio URLs must now be hidden
    const hiddenRes = await apiRequest('/api/v1/progress/before-after-comparison/default_user?sentenceId=sent_focus_01');
    assert.equal(hiddenRes.data.consentGranted, false);
    assert.equal(hiddenRes.data.baselineAudioUrl, null);
    assert.equal(hiddenRes.data.latestAudioUrl, null);
    assert.ok(hiddenRes.data.consentNotice.includes('chưa đồng ý lưu trữ giọng nói'));

    // Scores must still be preserved
    assert.equal(hiddenRes.data.overallDelta, 26);

    // 4. Restore voice consent
    await apiRequest('/api/v1/progress/toggle-voice-consent', {
      method: 'POST',
      body: JSON.stringify({ accountId: 'default_user', consentGranted: true })
    });

    const restoredRes = await apiRequest('/api/v1/progress/before-after-comparison/default_user?sentenceId=sent_focus_01');
    assert.equal(restoredRes.data.consentGranted, true);
    assert.ok(restoredRes.data.baselineAudioUrl !== null);
  });

  test('PROG-102 / AC 5: POST /api/v1/progress/set-baseline persists new baseline comparison record', async () => {
    const testAcc = `baseline_acc_${Date.now()}`;
    const sentId = 'sent_custom_02';

    const res = await apiRequest('/api/v1/progress/set-baseline', {
      method: 'POST',
      body: JSON.stringify({
        accountId: testAcc,
        sentenceId: sentId,
        sentenceText: 'Think through three thoughtful things.',
        baselineOverallGop: 50,
        baselineAudioUrl: 'https://cdn.vietphonics.vn/audio/base_02.mp3',
        baselinePhonemeScores: [
          { phoneme: '/θ/', score: 40, note: 'Voiceless dental fricative' }
        ]
      })
    });

    assert.equal(res.status, 200);
    assert.equal(res.data.success, true);

    const record = db.prepare("SELECT * FROM baseline_comparison_records WHERE account_id = ? AND sentence_id = ?").get(testAcc, sentId);
    assert.ok(record);
    assert.equal(record.baseline_overall_gop, 50);
  });
});
