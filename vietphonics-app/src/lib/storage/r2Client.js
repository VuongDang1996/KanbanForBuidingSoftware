// ARCH-105: Cloud Object Storage & Ephemeral Audio Retention Lifecycle (Cloudflare R2 Presigned URLs)

export class CloudflareR2StorageClient {
  constructor(config = {}) {
    this.bucketName = config.bucketName || 'vietphonics-audio-production';
    this.endpoint = config.endpoint || 'https://r2.cloudflarestorage.com';
  }

  // Generate Presigned PUT URL for client-side direct audio upload
  generatePresignedUploadUrl(userId, fileName, isPro = false) {
    const timestamp = Date.now();
    const objectKey = `recordings/${userId}/${timestamp}-${fileName}`;
    const retentionDays = isPro ? 90 : 7; // 7-day retention for Free, 90-day for Pro

    const presignedUrl = `${this.endpoint}/${this.bucketName}/${objectKey}?X-Amz-Expires=3600&retention_policy=${retentionDays}d`;

    return {
      objectKey,
      uploadUrl: presignedUrl,
      expiresInSeconds: 3600,
      retentionDays,
      zeroEgress: true
    };
  }

  // Lifecycle rule evaluation for ephemeral audio cleanup
  evaluateRetentionExpiry(objectMetadata) {
    const { createdAt, retentionDays } = objectMetadata;
    const expiryTimestamp = new Date(createdAt).getTime() + retentionDays * 86400000;
    const isExpired = Date.now() > expiryTimestamp;

    return {
      isExpired,
      scheduledCleanup: new Date(expiryTimestamp).toISOString()
    };
  }
}

export const r2StorageClient = new CloudflareR2StorageClient();
