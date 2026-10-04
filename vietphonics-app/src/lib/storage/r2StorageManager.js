/**
 * r2StorageManager.js
 * Cloud Object Storage & Ephemeral Audio Retention Lifecycle Engine (ARCH-105)
 * S3/Cloudflare R2 Presigned URLs, 7-day/90-day retention policies, and CORS security.
 */

import crypto from 'node:crypto';

export const R2_CONFIG = {
  bucketName: 'vietphonics-audio-prod',
  endpoint: 'https://r2.vietphonics.vn',
  presignedUrlExpiresInSec: 300, // 5 minutes
  allowedOrigins: [
    /^https:\/\/(.*\.)?vietphonics\.com$/,
    /^https:\/\/(.*\.)?vietphonics\.vn$/,
    /^http:\/\/localhost(:\d+)?$/
  ]
};

/**
 * Creates S3/R2 presigned upload ticket for client direct upload
 * @param {Object} options - { userId, mimeType, extension, expiresInSec }
 * @returns {{ key: string, presignedUrl: string, expiresInSec: number, bucket: string, latencyMs: number }}
 */
export function createAudioUploadTicket(options = {}) {
  const startTime = performance.now();
  const userId = options.userId || 'usr_anonymous';
  const extension = options.extension || 'opus';
  const expiresInSec = options.expiresInSec || R2_CONFIG.presignedUrlExpiresInSec;

  const objectUuid = crypto.randomUUID();
  const key = `audio/${userId}/${objectUuid}.${extension}`;

  // Generate HMAC signature token for presigned PUT URL
  const tokenPayload = `${key}:${expiresInSec}:${Date.now()}`;
  const sig = crypto.createHmac('sha256', 'r2_signing_secret_vietphonics')
    .update(tokenPayload)
    .digest('hex');

  const presignedUrl = `${R2_CONFIG.endpoint}/${R2_CONFIG.bucketName}/${key}?X-Amz-Expires=${expiresInSec}&X-Amz-Signature=${sig}`;
  const latencyMs = Math.round((performance.now() - startTime) * 100) / 100;

  return {
    key,
    bucket: R2_CONFIG.bucketName,
    presignedUrl,
    expiresInSec,
    contentType: options.mimeType || 'audio/opus',
    latencyMs
  };
}

/**
 * Calculates retention policy days based on user tier
 * Free Tier: 7 days
 * Pro Tier: 90 days
 *
 * @param {string} tier - 'free' | 'pro'
 * @returns {{ retentionDays: number, expiresAt: string }}
 */
export function calculateRetentionPolicy(tier = 'free') {
  const retentionDays = tier === 'pro' ? 90 : 7;
  const now = new Date();
  const expiresAt = new Date(now.getTime() + retentionDays * 24 * 3600 * 1000).toISOString();

  return {
    retentionDays,
    expiresAt
  };
}

/**
 * Checks if an audio storage object has expired
 * @param {string} createdAtIso
 * @param {number} retentionDays
 * @param {number} nowMs
 * @returns {boolean}
 */
export function isAudioObjectExpired(createdAtIso, retentionDays, nowMs = Date.now()) {
  const createdTime = new Date(createdAtIso).getTime();
  const ageMs = nowMs - createdTime;
  const maxAgeMs = retentionDays * 24 * 3600 * 1000;
  return ageMs > maxAgeMs;
}

/**
 * Validates CORS request origin against allowed whitelist
 * @param {string} origin
 * @returns {boolean}
 */
export function validateCorsOrigin(origin) {
  if (!origin) return false;
  return R2_CONFIG.allowedOrigins.some(regex => regex.test(origin));
}

/**
 * Purges expired audio records from database
 * @param {Object} dbInstance
 * @param {string} nowIso
 * @returns {{ purgedCount: number }}
 */
export function purgeExpiredAudioObjects(dbInstance, nowIso = new Date().toISOString()) {
  const selectExpired = dbInstance.prepare(`
    SELECT id, storage_key FROM storage_audio_objects
    WHERE expires_at <= ?
  `).all(nowIso);

  if (selectExpired.length > 0) {
    dbInstance.prepare(`
      DELETE FROM storage_audio_objects
      WHERE expires_at <= ?
    `).run(nowIso);
  }

  return {
    purgedCount: selectExpired.length,
    purgedKeys: selectExpired.map(r => r.storage_key)
  };
}
