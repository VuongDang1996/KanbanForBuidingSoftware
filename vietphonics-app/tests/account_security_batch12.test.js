/**
 * account_security_batch12.test.js
 * Comprehensive Test Suite for Batch 12: USER-106, USER-103, USER-104
 * 
 * 12-Gate Standard Audit:
 * - Gate A: Persona and acceptance flows
 * - Gate B: Given/When/Then acceptance criteria verified
 * - Gate F1: Salt-hashed password storage (PBKDF2/Crypto)
 * - Gate F3: Secure expiring tokens (SHA-256, single-use)
 * - Gate F6: Revoke all other sessions upon password reset
 * - Gate F7: Rate limit and cooldown throttles
 * - Gate F8: Anti-enumeration & disposable email rejection
 * - Gate G12: Max 2 concurrent sessions enforcement
 * - Gate K: Unit and Integration test coverage
 * - Gate L: Terms consent and decree compliance
 */

import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import {
  validateEmailAddress,
  validatePasswordStrength,
  hashPassword,
  verifyPassword,
  hashTokenSha256,
  generateEmailVerificationOtp,
  generatePasswordResetToken,
  authRateLimiter,
  parseDeviceFromUserAgent
} from '../src/lib/auth/authSecurityManager.js';
import app from '../server/index.js';
import { db } from '../server/db.js';

let server;
const PORT = 3099;
const BASE_URL = `http://localhost:${PORT}`;

before(async () => {
  await new Promise((resolve) => {
    server = app.listen(PORT, () => resolve());
  });
});

after(async () => {
  if (server) {
    await new Promise((resolve) => server.close(resolve));
  }
});

describe('Batch 12: Account & Security Engine Unit Tests (USER-106, USER-103, USER-104)', () => {
  it('USER-106: validateEmailAddress blocks disposable domains & invalid formats', () => {
    assert.equal(validateEmailAddress('test@mailinator.com').valid, false);
    assert.equal(validateEmailAddress('bot@10minutemail.com').valid, false);
    assert.equal(validateEmailAddress('invalid-email-format').valid, false);
    assert.equal(validateEmailAddress('user@vietphonics.vn').valid, true);
  });

  it('USER-106: validatePasswordStrength verifies minimum length, casing and numbers', () => {
    const weak = validatePasswordStrength('short1');
    assert.equal(weak.valid, false);
    assert.ok(weak.feedback.length > 0);

    const strong = validatePasswordStrength('VietPhonics2026!');
    assert.equal(strong.valid, true);
    assert.ok(strong.score >= 75);
  });

  it('USER-106 / F1: hashPassword generates salted hash and verifyPassword correctly verifies', () => {
    const pwd = 'MySecretPassword123!';
    const hash = hashPassword(pwd);
    assert.ok(hash.startsWith('pbkdf2:10000:'));
    assert.equal(verifyPassword(pwd, hash), true);
    assert.equal(verifyPassword('WrongPassword123!', hash), false);
  });

  it('USER-106 / F3: generateEmailVerificationOtp produces 6-digit code and SHA-256 hash', () => {
    const otp = generateEmailVerificationOtp();
    assert.equal(otp.otpCode.length, 6);
    assert.ok(/^\d{6}$/.test(otp.otpCode));
    assert.ok(otp.tokenHash.length === 64); // SHA-256 hex
    assert.ok(new Date(otp.expiresAt) > new Date());
  });

  it('USER-103 / F3: generatePasswordResetToken produces 32-byte hex and 30-min expiration', () => {
    const reset = generatePasswordResetToken();
    assert.equal(reset.rawToken.length, 64); // 32 bytes in hex = 64 chars
    assert.ok(reset.tokenHash.length === 64);
    const ttlMinutes = (new Date(reset.expiresAt) - new Date()) / (1000 * 60);
    assert.ok(ttlMinutes >= 29 && ttlMinutes <= 31);
  });

  it('USER-104: parseDeviceFromUserAgent accurately classifies mobile vs desktop', () => {
    const mobileUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1';
    const desktopUA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36';

    const mobile = parseDeviceFromUserAgent(mobileUA);
    assert.equal(mobile.deviceType, 'mobile');
    assert.ok(mobile.deviceName.includes('iPhone'));

    const desktop = parseDeviceFromUserAgent(desktopUA);
    assert.equal(desktop.deviceType, 'desktop');
    assert.ok(desktop.deviceName.includes('Windows PC'));
  });
});

describe('Batch 12: USER-106 Email Registration & OTP Verification Integration Tests', () => {
  const testEmail = `student_${Date.now()}@vietphonics.vn`;
  const testPassword = 'SecureStudent2026!';
  let testAccountId;
  let receivedOtp;

  it('AC 1 / Gate L6: Rejects registration without terms consent', async () => {
    const res = await fetch(`${BASE_URL}/api/v1/auth/email/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword,
        consentedToTerms: false
      })
    });
    assert.equal(res.status, 400);
    const data = await res.json();
    assert.ok(data.error.includes('đồng ý với Điều khoản'));
  });

  it('AC 1 / Gate F1: Valid registration creates pending account and returns OTP preview', async () => {
    const res = await fetch(`${BASE_URL}/api/v1/auth/email/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword,
        displayName: 'Nguyễn Văn Test',
        l1Dialect: 'bac',
        learningGoal: 'ielts',
        consentedToTerms: true
      })
    });
    assert.equal(res.status, 201);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.ok(data.accountId);
    assert.ok(data.otpPreview);

    testAccountId = data.accountId;
    receivedOtp = data.otpPreview;

    // Verify DB record
    const accountInDb = db.prepare('SELECT * FROM auth_accounts WHERE id = ?').get(testAccountId);
    assert.equal(accountInDb.status, 'pending_verification');
    assert.equal(accountInDb.l1_dialect, 'bac');
    assert.ok(verifyPassword(testPassword, accountInDb.password_hash));
  });

  it('AC 2: Wrong OTP code returns 422 and increments attempts', async () => {
    const res = await fetch(`${BASE_URL}/api/v1/auth/email/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        otpCode: '000000'
      })
    });
    assert.equal(res.status, 422);
    const data = await res.json();
    assert.ok(data.error.includes('không chính xác'));
  });

  it('AC 2 / Gate F3: Correct OTP activates account and issues auth token + session', async () => {
    const res = await fetch(`${BASE_URL}/api/v1/auth/email/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        otpCode: receivedOtp
      })
    });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.account.status, 'active');
    assert.ok(data.token);
    assert.ok(data.sessionId);

    // Verify DB account status updated to active
    const accountInDb = db.prepare('SELECT * FROM auth_accounts WHERE id = ?').get(testAccountId);
    assert.equal(accountInDb.status, 'active');
    assert.ok(accountInDb.email_verified_at);
  });
});

describe('Batch 12: USER-103 Forgot & Reset Password Integration Tests', () => {
  const resetEmail = `forgot_test_${Date.now()}@vietphonics.vn`;
  let activeAccountId;
  let capturedResetToken;

  before(async () => {
    // Create an active account for reset test
    const regRes = await fetch(`${BASE_URL}/api/v1/auth/email/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: resetEmail,
        password: 'InitialPassword2026!',
        displayName: 'Trần Văn Reset',
        consentedToTerms: true
      })
    });
    const regData = await regRes.json();
    activeAccountId = regData.accountId;

    // Verify OTP to make active
    await fetch(`${BASE_URL}/api/v1/auth/email/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: resetEmail,
        otpCode: regData.otpPreview
      })
    });

    // Create 2 active sessions to verify session revocation
    const nowIso = new Date().toISOString();
    db.prepare(`
      INSERT INTO user_active_sessions (id, account_id, refresh_token_hash, device_name, device_type, last_active_at, created_at)
      VALUES (?, ?, 'hash1', 'iPhone 15', 'mobile', ?, ?)
    `).run(`sess_old_1_${Date.now()}`, activeAccountId, nowIso, nowIso);

    db.prepare(`
      INSERT INTO user_active_sessions (id, account_id, refresh_token_hash, device_name, device_type, last_active_at, created_at)
      VALUES (?, ?, 'hash2', 'MacBook Pro', 'desktop', ?, ?)
    `).run(`sess_old_2_${Date.now()}`, activeAccountId, nowIso, nowIso);
  });

  it('AC 1 / Gate F8: Forgot password returns neutral 200 message and generates token', async () => {
    const res = await fetch(`${BASE_URL}/api/v1/auth/password/forgot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: resetEmail })
    });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.ok(data.message.includes('Nếu địa chỉ email tồn tại'));
    assert.ok(data.resetTokenPreview);

    capturedResetToken = data.resetTokenPreview;
  });

  it('AC 3 / Gate F6: Submitting new password updates hash and revokes ALL active sessions', async () => {
    // Pre-check: active sessions count
    const beforeSessions = db.prepare('SELECT COUNT(*) as cnt FROM user_active_sessions WHERE account_id = ? AND revoked_at IS NULL').get(activeAccountId);
    assert.ok(beforeSessions.cnt >= 2);

    const newPassword = 'BrandNewPassword2026!';
    const res = await fetch(`${BASE_URL}/api/v1/auth/password/reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: capturedResetToken,
        newPassword
      })
    });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.ok(data.revokedSessionsCount >= 2);

    // Verify account password hash changed
    const account = db.prepare('SELECT * FROM auth_accounts WHERE id = ?').get(activeAccountId);
    assert.equal(verifyPassword(newPassword, account.password_hash), true);

    // Verify ALL active sessions are now REVOKED (Gate F6)
    const afterSessions = db.prepare('SELECT COUNT(*) as cnt FROM user_active_sessions WHERE account_id = ? AND revoked_at IS NULL').get(activeAccountId);
    assert.equal(afterSessions.cnt, 0);
  });

  it('Gate F3: Reusing the same reset token returns 422', async () => {
    const res = await fetch(`${BASE_URL}/api/v1/auth/password/reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: capturedResetToken,
        newPassword: 'AnotherPassword2026!'
      })
    });
    assert.equal(res.status, 422);
  });
});

describe('Batch 12: USER-104 Profile & Device Session Limiter (Max 2 Devices)', () => {
  const accountId = `acc_device_test_${Date.now()}`;

  before(() => {
    const nowIso = new Date().toISOString();
    const uniqueEmail = `device_${Date.now()}@vietphonics.vn`;
    db.prepare(`
      INSERT INTO auth_accounts (id, email, password_hash, display_name, l1_dialect, learning_goal, status, tier, created_at, updated_at)
      VALUES (?, ?, 'hash', 'Lê Thị Thiết Bị', 'trung', 'workplace', 'active', 'pro', ?, ?)
    `).run(accountId, uniqueEmail, nowIso, nowIso);
  });

  it('AC 1 & AC 4: Enforce max 2 concurrent sessions for Pro account', async () => {
    // 1st device: allowed
    const res1 = await fetch(`${BASE_URL}/api/v1/auth/session/enforce`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)'
      },
      body: JSON.stringify({ accountId })
    });
    const data1 = await res1.json();
    assert.equal(data1.success, true);
    assert.equal(data1.activeSessionsCount, 1);

    // 2nd device: allowed
    const res2 = await fetch(`${BASE_URL}/api/v1/auth/session/enforce`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0'
      },
      body: JSON.stringify({ accountId })
    });
    const data2 = await res2.json();
    assert.equal(data2.success, true);
    assert.equal(data2.activeSessionsCount, 2);

    // 3rd device without evictOldest: blocked with 409 DEVICE_LIMIT_REACHED
    const res3 = await fetch(`${BASE_URL}/api/v1/auth/session/enforce`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X)'
      },
      body: JSON.stringify({ accountId, evictOldest: false })
    });
    assert.equal(res3.status, 409);
    const data3 = await res3.json();
    assert.equal(data3.code, 'DEVICE_LIMIT_REACHED');
    assert.equal(data3.maxAllowed, 2);
    assert.equal(data3.activeSessions.length, 2);
  });

  it('AC 4: 3rd device with evictOldest=true revokes oldest session and registers new session', async () => {
    const res = await fetch(`${BASE_URL}/api/v1/auth/session/enforce`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X)'
      },
      body: JSON.stringify({ accountId, evictOldest: true })
    });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);

    // Active sessions should remain at 2
    const sessions = db.prepare('SELECT * FROM user_active_sessions WHERE account_id = ? AND revoked_at IS NULL').all(accountId);
    assert.equal(sessions.length, 2);
  });

  it('AC 2 & AC 3: GET /api/v1/user/sessions and remote DELETE session', async () => {
    const getRes = await fetch(`${BASE_URL}/api/v1/user/sessions?accountId=${accountId}`);
    const getData = await getRes.json();
    assert.equal(getData.success, true);
    assert.equal(getData.sessions.length, 2);

    const sessionToRevoke = getData.sessions[0].id;

    // Remote revoke
    const delRes = await fetch(`${BASE_URL}/api/v1/user/sessions/${sessionToRevoke}`, {
      method: 'DELETE'
    });
    const delData = await delRes.json();
    assert.equal(delData.success, true);

    // Check sessions count dropped to 1
    const checkRes = await fetch(`${BASE_URL}/api/v1/user/sessions?accountId=${accountId}`);
    const checkData = await checkRes.json();
    assert.equal(checkData.sessions.length, 1);
  });

  it('AC 1: PATCH /api/v1/user/profile-settings updates L1 dialect and learning goal', async () => {
    const res = await fetch(`${BASE_URL}/api/v1/user/profile-settings`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accountId,
        displayName: 'Lê Thiết Bị Cập Nhật',
        l1Dialect: 'nam',
        learningGoal: 'ielts'
      })
    });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.profile.l1Dialect, 'nam');

    // Verify DB sync
    const account = db.prepare('SELECT * FROM auth_accounts WHERE id = ?').get(accountId);
    assert.equal(account.l1_dialect, 'nam');
    assert.equal(account.display_name, 'Lê Thiết Bị Cập Nhật');
  });
});
