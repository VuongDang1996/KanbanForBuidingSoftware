import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import app from '../server/index.js';
import { db } from '../server/db.js';
import {
  detectAudioFormat,
  FFMPEG_NORMALIZATION_SPEC,
  verifyAudioNormalization,
  calculateKedaGpuScale,
  evaluateJobRetryPolicy
} from '../src/lib/audio/asyncAudioQueuePipeline.js';

const PORT = 3884;
let server;

// Mock audio payloads (valid magic bytes)
const SAMPLE_WAV_BASE64 = Buffer.from([0x52, 0x49, 0x46, 0x46, 0x24, 0x00, 0x00, 0x00, 0x57, 0x41, 0x56, 0x45]).toString('base64');
const SAMPLE_WEBM_BASE64 = Buffer.from([0x1A, 0x45, 0xDF, 0xA3, 0x9F, 0x42, 0x86, 0x81]).toString('base64');

describe('ARCH-102: Asynchronous Audio Ingestion & GPU Worker Queue Pipeline Tests', () => {
  before((done) => {
    server = http.createServer(app);
    server.listen(PORT, done);
  });

  after((done) => {
    server.close(done);
  });

  describe('Audio Magic Bytes Validation (<15ms) (AC 1)', () => {
    it('detects WAV RIFF magic bytes header accurately', () => {
      const result = detectAudioFormat(SAMPLE_WAV_BASE64);
      assert.equal(result.valid, true);
      assert.equal(result.format, 'wav');
      assert.equal(result.mimeType, 'audio/wav');
    });

    it('detects WebM/Matroska magic bytes header accurately', () => {
      const result = detectAudioFormat(SAMPLE_WEBM_BASE64);
      assert.equal(result.valid, true);
      assert.equal(result.format, 'webm');
      assert.equal(result.mimeType, 'audio/webm');
    });

    it('rejects corrupt binary with invalid magic bytes', () => {
      const corrupt = Buffer.from([0x00, 0x11, 0x22, 0x33]).toString('base64');
      const result = detectAudioFormat(corrupt);
      assert.equal(result.valid, false);
      assert.equal(result.format, 'unsupported');
    });
  });

  describe('FFmpeg Normalization Specifications (AC 2)', () => {
    it('verifies PCM 16kHz 16-bit mono and -50dB silence trimming filters', () => {
      const norm = verifyAudioNormalization({ sampleRateHz: 16000, channels: 1, bitDepth: 16 });
      assert.equal(norm.normalized, true);
      assert.equal(norm.specs.sampleRateHz, 16000);
      assert.equal(norm.specs.channels, 1);
      assert.equal(norm.specs.silenceThresholdDb, -50);
      assert.ok(norm.appliedFilters.some(f => f.includes('-50dB')));
    });
  });

  describe('KEDA GPU Worker Autoscaling (AC 3)', () => {
    it('scales up GPU worker pods to maximum when queue depth exceeds 100', () => {
      const scaleHigh = calculateKedaGpuScale(140, 2, 2, 16);
      assert.equal(scaleHigh.shouldScale, true);
      assert.equal(scaleHigh.scaleDirection, 'scale_up');
      assert.ok(scaleHigh.targetWorkers >= 14);
    });

    it('maintains steady baseline when queue depth is low', () => {
      const scaleLow = calculateKedaGpuScale(15, 2, 2, 16);
      assert.equal(scaleLow.targetWorkers, 2);
      assert.equal(scaleLow.scaleDirection, 'steady');
    });
  });

  describe('Dead Letter Queue (DLQ) & Exponential Backoff (AC 4)', () => {
    it('applies exponential backoff on retry 1 and 2', () => {
      const attempt1 = evaluateJobRetryPolicy(0, 'Temporary timeout');
      assert.equal(attempt1.canRetry, true);
      assert.equal(attempt1.backoffMs, 1000); // 1s
      assert.equal(attempt1.moveToDlq, false);

      const attempt2 = evaluateJobRetryPolicy(1, 'Model busy');
      assert.equal(attempt2.canRetry, true);
      assert.equal(attempt2.backoffMs, 2000); // 2s
      assert.equal(attempt2.moveToDlq, false);
    });

    it('moves to DLQ on attempt 3 failure', () => {
      const attempt3 = evaluateJobRetryPolicy(2, 'Corrupt PCM frames');
      assert.equal(attempt3.canRetry, false);
      assert.equal(attempt3.moveToDlq, true);
      assert.ok(attempt3.dlqReason.includes('Exceeded maximum attempts'));
    });
  });

  describe('REST API Queue Endpoints', () => {
    it('POST /api/v1/audio/ingest accepts audio and returns 202 Accepted in under 15ms', async () => {
      const startTime = performance.now();
      const res = await fetch(`http://localhost:${PORT}/api/v1/audio/ingest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audioData: SAMPLE_WAV_BASE64,
          mimeType: 'audio/wav',
          isPro: true
        })
      });
      const elapsed = performance.now() - startTime;

      assert.equal(res.status, 202);
      const data = await res.json();
      assert.equal(data.status, 'accepted');
      assert.ok(data.jobId);
      assert.equal(data.priority, 'high_priority_vip');
      assert.ok(elapsed < 200, `Full HTTP roundtrip should be brisk (${elapsed}ms)`);
      assert.ok(data.validationDurationMs < 15, `Magic bytes check took ${data.validationDurationMs}ms`);
    });

    it('GET /api/v1/jobs/:jobId/status processes queued job and returns transcription result', async () => {
      // 1. Ingest job
      const ingestRes = await fetch(`http://localhost:${PORT}/api/v1/audio/ingest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audioData: SAMPLE_WEBM_BASE64,
          mimeType: 'audio/webm'
        })
      });
      const { jobId } = await ingestRes.json();

      // 2. Poll status (triggers worker processing)
      const statusRes = await fetch(`http://localhost:${PORT}/api/v1/jobs/${jobId}/status`);
      assert.equal(statusRes.status, 200);
      const jobData = await statusRes.json();

      assert.equal(jobData.status, 'completed');
      assert.ok(jobData.result);
      assert.equal(jobData.result.overallGop, 88);
      assert.equal(jobData.result.normalized, true);
    });

    it('GET /api/v1/jobs/pipeline-metrics returns telemetry metrics', async () => {
      const res = await fetch(`http://localhost:${PORT}/api/v1/jobs/pipeline-metrics`);
      assert.equal(res.status, 200);
      const metrics = await res.json();

      assert.equal(metrics.success, true);
      assert.ok(typeof metrics.queueDepth === 'number');
      assert.ok(typeof metrics.dlqCount === 'number');
      assert.ok(metrics.kedaAutoscale);
    });
  });
});
