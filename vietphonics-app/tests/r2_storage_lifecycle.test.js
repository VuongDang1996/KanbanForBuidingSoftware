import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import app from '../server/index.js';
import { db } from '../server/db.js';
import {
  R2_CONFIG,
  createAudioUploadTicket,
  calculateRetentionPolicy,
  isAudioObjectExpired,
  validateCorsOrigin,
  purgeExpiredAudioObjects
} from '../src/lib/storage/r2StorageManager.js';

const PORT = 3887;
let server;

describe('ARCH-105: Cloud Object Storage & Ephemeral Audio Retention Tests', () => {
  before((done) => {
    server = http.createServer(app);
    server.listen(PORT, done);
  });

  after((done) => {
    server.close(done);
  });

  describe('S3/R2 Presigned Upload Ticket (<20ms) (AC 1)', () => {
    it('generates presigned PUT upload URL with 5-minute expiration in under 20ms', () => {
      const ticket = createAudioUploadTicket({
        userId: 'usr_test_r2',
        extension: 'opus',
        mimeType: 'audio/opus'
      });

      assert.ok(ticket.presignedUrl);
      assert.ok(ticket.presignedUrl.includes('X-Amz-Expires=300'));
      assert.ok(ticket.presignedUrl.includes('X-Amz-Signature='));
      assert.ok(ticket.key.startsWith('audio/usr_test_r2/'));
      assert.equal(ticket.contentType, 'audio/opus');
      assert.ok(ticket.latencyMs < 20, `Latency ${ticket.latencyMs}ms must be under 20ms SLA`);
    });
  });

  describe('Ephemeral Audio Retention Lifecycle Policies (AC 3)', () => {
    it('sets 7-day retention for Free users and 90-day retention for Pro users', () => {
      const freePolicy = calculateRetentionPolicy('free');
      assert.equal(freePolicy.retentionDays, 7);

      const proPolicy = calculateRetentionPolicy('pro');
      assert.equal(proPolicy.retentionDays, 90);

      const nowMs = Date.now();
      const freeExpiryMs = new Date(freePolicy.expiresAt).getTime();
      const proExpiryMs = new Date(proPolicy.expiresAt).getTime();

      assert.ok(freeExpiryMs - nowMs >= 6.9 * 24 * 3600 * 1000);
      assert.ok(proExpiryMs - nowMs >= 89.9 * 24 * 3600 * 1000);
    });

    it('identifies expired audio objects correctly', () => {
      const eightDaysAgo = new Date(Date.now() - 8 * 24 * 3600 * 1000).toISOString();
      assert.equal(isAudioObjectExpired(eightDaysAgo, 7), true); // 8 > 7 -> expired

      const fiveDaysAgo = new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString();
      assert.equal(isAudioObjectExpired(fiveDaysAgo, 7), false); // 5 < 7 -> not expired
    });
  });

  describe('CORS Security Policy (AC 4)', () => {
    it('allows verified vietphonics domains and localhost', () => {
      assert.equal(validateCorsOrigin('https://vietphonics.com'), true);
      assert.equal(validateCorsOrigin('https://app.vietphonics.com'), true);
      assert.equal(validateCorsOrigin('https://vietphonics.vn'), true);
      assert.equal(validateCorsOrigin('http://localhost:5174'), true);
    });

    it('rejects untrusted malicious origins', () => {
      assert.equal(validateCorsOrigin('https://phishing-site.ru'), false);
      assert.equal(validateCorsOrigin('https://evil-hacker.com'), false);
      assert.equal(validateCorsOrigin(''), false);
    });
  });

  describe('REST API Storage Endpoints & Auto-Purge Execution (AC 1, AC 2, AC 3, AC 4)', () => {
    it('GET /api/v1/storage/upload-ticket returns presigned ticket', async () => {
      const res = await fetch(`http://localhost:${PORT}/api/v1/storage/upload-ticket?extension=wav&mimeType=audio/wav`);
      assert.equal(res.status, 200);
      const data = await res.json();

      assert.equal(data.success, true);
      assert.ok(data.ticket.presignedUrl);
      assert.equal(data.ticket.bucket, 'vietphonics-audio-prod');
    });

    it('POST /api/v1/storage/register-uploaded-file records audio object in SQLite', async () => {
      const storageKey = `audio/usr_arch_default/test_record_${Date.now()}.opus`;
      const res = await fetch(`http://localhost:${PORT}/api/v1/storage/register-uploaded-file`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'usr_arch_default'
        },
        body: JSON.stringify({
          storageKey,
          fileSizeBytes: 64200,
          mimeType: 'audio/opus'
        })
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.tier, 'pro');
      assert.equal(data.retentionDays, 90);

      // Verify row in database
      const row = db.prepare('SELECT * FROM storage_audio_objects WHERE storage_key = ?').get(storageKey);
      assert.ok(row);
      assert.equal(row.file_size_bytes, 64200);
    });

    it('POST /api/v1/storage/purge-expired cleans up expired records', async () => {
      // Insert simulated old record that expired yesterday
      const oldKey = `audio/test/expired_${Date.now()}.opus`;
      const yesterday = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
      db.prepare(`
        INSERT INTO storage_audio_objects (
          id, user_id, storage_key, bucket_name, content_type,
          file_size_bytes, tier, retention_days, expires_at, created_at
        ) VALUES (?, 'usr_temp', ?, 'vietphonics-audio-prod', 'audio/opus', 32000, 'free', 7, ?, ?)
      `).run(`obj_exp_${Date.now()}`, oldKey, yesterday, yesterday);

      // Execute purge
      const purgeRes = await fetch(`http://localhost:${PORT}/api/v1/storage/purge-expired`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ simulatedNowIso: new Date().toISOString() })
      });

      assert.equal(purgeRes.status, 200);
      const purgeData = await purgeRes.json();
      assert.equal(purgeData.success, true);
      assert.ok(purgeData.purgedCount >= 1);
      assert.ok(purgeData.purgedKeys.includes(oldKey));
    });

    it('GET /api/v1/storage/cors-check enforces CORS origin whitelist', async () => {
      // Good origin
      const goodRes = await fetch(`http://localhost:${PORT}/api/v1/storage/cors-check?origin=https://app.vietphonics.vn`);
      assert.equal(goodRes.status, 200);

      // Bad origin
      const badRes = await fetch(`http://localhost:${PORT}/api/v1/storage/cors-check?origin=https://unauthorized-domain.com`);
      assert.equal(badRes.status, 403);
    });
  });
});
