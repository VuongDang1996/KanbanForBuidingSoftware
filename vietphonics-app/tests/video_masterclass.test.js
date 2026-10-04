import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import app from '../server/index.js';
import { db } from '../server/db.js';
import {
  MASTERCLASS_LESSONS,
  getMasterclassCatalog,
  getMasterclassLesson,
  getCurrentCue,
  evaluateMasterclassSession
} from '../src/lib/scoring/videoMasterclass.js';

describe('PRON-210: Video-Synchronized Masterclass & Exaggerated Articulation Modeling Tests', () => {
  let server;
  const PORT = 3867;
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

  describe('Masterclass Lessons & Dual Camera Angles (AC 1)', () => {
    test('Catalog must contain masterclass lessons for /θ/, /w/, and /æ/', () => {
      const catalog = getMasterclassCatalog();
      assert.ok(Array.isArray(catalog));
      assert.ok(catalog.length >= 3);

      const thetaLesson = catalog.find((l) => l.phoneme === '/θ/');
      assert.ok(thetaLesson);
      assert.equal(thetaLesson.durationSec, 12.0);

      const wLesson = catalog.find((l) => l.phoneme === '/w/');
      assert.ok(wLesson);

      const aeLesson = catalog.find((l) => l.phoneme === '/æ/');
      assert.ok(aeLesson);
    });

    test('Each lesson must support both Frontal (0°) and Profile (45°) camera angles', () => {
      const thetaLesson = getMasterclassLesson('mc_theta_01');
      assert.ok(thetaLesson);
      assert.equal(thetaLesson.angles.length, 2);

      const frontal = thetaLesson.angles.find((a) => a.id === 'frontal');
      assert.ok(frontal);
      assert.match(frontal.label, /Góc Nhìn Thẳng/i);

      const profile = thetaLesson.angles.find((a) => a.id === 'profile_45');
      assert.ok(profile);
      assert.match(profile.label, /Góc Nghiêng 45°/i);
    });
  });

  describe('WebVTT Cues & Exaggerated Articulation Auto-Zoom (AC 2 & AC 3)', () => {
    test('Lesson /θ/ must contain step cues with exaggerated interdental placement and zoom > 2.0x', () => {
      const lesson = getMasterclassLesson('mc_theta_01');
      assert.ok(lesson.cues.length >= 4);

      const step2 = lesson.cues.find((c) => c.id === 'cue_02');
      assert.ok(step2);
      assert.equal(step2.lipShape, 'tongue_interdental');
      assert.ok(step2.zoomLevel >= 2.0, 'Interdental placement cue must zoom >= 2.0x');
      assert.match(step2.vietnameseTip, /không cắn chặt/i);
    });

    test('getCurrentCue should return correct active cue according to timestamp', () => {
      const lesson = getMasterclassLesson('mc_theta_01');
      // t = 1.0s -> cue_01 (0 - 2.5s)
      const cue1 = getCurrentCue(lesson, 1.0);
      assert.equal(cue1.id, 'cue_01');

      // t = 4.0s -> cue_02 (2.5 - 6.0s)
      const cue2 = getCurrentCue(lesson, 4.0);
      assert.equal(cue2.id, 'cue_02');

      // t = 7.0s -> cue_03 (6.0 - 9.5s)
      const cue3 = getCurrentCue(lesson, 7.0);
      assert.equal(cue3.id, 'cue_03');
    });

    test('evaluateMasterclassSession should compute completion percentage and criteria', () => {
      // 10s out of 12s -> ~83% -> completed
      const res = evaluateMasterclassSession({
        lessonId: 'mc_theta_01',
        watchDurationSec: 10.0,
        cameraAngle: 'profile_45',
        playbackRate: 0.5,
        loopEnabled: true
      });

      assert.equal(res.success, true);
      assert.equal(res.completionPercentage, 83);
      assert.equal(res.isCompleted, true);
      assert.equal(res.cameraAngle, 'profile_45');
      assert.equal(res.playbackRate, 0.5);
      assert.equal(res.loopEnabled, true);
    });
  });

  describe('Backend API & SQLite Persistence (Gate D & E)', () => {
    test('GET /api/v1/masterclass/videos should return lessons catalog', async () => {
      const res = await fetch(`${baseUrl}/api/v1/masterclass/videos`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.lessons.length >= 3);
    });

    test('GET /api/v1/masterclass/videos/:lessonId should return single lesson', async () => {
      const res = await fetch(`${baseUrl}/api/v1/masterclass/videos/mc_theta_01`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.lesson.phoneme, '/θ/');
    });

    test('POST /api/v1/masterclass/progress should save watch progress in SQLite', async () => {
      const testUserId = `test-user-${Date.now()}`;
      const payload = {
        userId: testUserId,
        lessonId: 'mc_theta_01',
        watchDurationSec: 12.0,
        cameraAngle: 'profile_45',
        playbackRate: 0.25,
        loopEnabled: true
      };

      const res = await fetch(`${baseUrl}/api/v1/masterclass/progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': testUserId
        },
        body: JSON.stringify(payload)
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.progress.isCompleted, true);
      assert.equal(data.progress.completionPercentage, 100);

      // Verify in SQLite
      const row = db.prepare('SELECT * FROM masterclass_progress_records WHERE id = ?').get(data.recordId);
      assert.ok(row);
      assert.equal(row.user_id, testUserId);
      assert.equal(row.lesson_id, 'mc_theta_01');
      assert.equal(row.phoneme, '/θ/');
      assert.equal(row.camera_angle, 'profile_45');
      assert.equal(row.playback_rate, 0.25);
      assert.equal(row.loop_enabled, 1);
      assert.equal(row.is_completed, 1);
    });

    test('GET /api/v1/masterclass/progress/latest should retrieve the user record', async () => {
      const testUserId = `test-user-${Date.now()}`;
      const payload = {
        userId: testUserId,
        lessonId: 'mc_w_02',
        watchDurationSec: 5.0,
        cameraAngle: 'frontal',
        playbackRate: 1.0,
        loopEnabled: false
      };

      await fetch(`${baseUrl}/api/v1/masterclass/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const res = await fetch(`${baseUrl}/api/v1/masterclass/progress/latest`, {
        headers: { 'x-user-id': testUserId }
      });

      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.ok(data.recordId);
      assert.equal(data.userId, testUserId);
      assert.equal(data.lessonId, 'mc_w_02');
      assert.equal(data.phoneme, '/w/');
      assert.equal(data.watchDurationSec, 5.0);
    });

    test('POST /api/v1/masterclass/progress validation: reject missing duration with 400', async () => {
      const res = await fetch(`${baseUrl}/api/v1/masterclass/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId: 'mc_theta_01' })
      });

      assert.equal(res.status, 400);
      const data = await res.json();
      assert.equal(data.success, false);
      assert.match(data.error, /watchDurationSec/i);
    });
  });
});
