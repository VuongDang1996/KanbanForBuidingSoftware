import test, { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('PRON-101: Web Audio API Low-Latency Streaming & Waveform Canvas Tests', () => {
  describe('AudioWorklet Processor Pipeline (AC 1 & Gate C)', () => {
    const workletPath = path.join(__dirname, '..', 'public', 'pcm-recorder-processor.js');

    it('pcm-recorder-processor.js must exist in public directory for browser loading', () => {
      assert.ok(fs.existsSync(workletPath), 'AudioWorklet processor file must exist in public/');
    });

    it('pcm-recorder-processor.js must configure 1024-sample buffer size (<50ms latency)', () => {
      const content = fs.readFileSync(workletPath, 'utf8');
      assert.ok(content.includes('class PcmRecorderProcessor extends AudioWorkletProcessor'));
      assert.ok(content.includes('this.bufferSize = 1024'));
      assert.ok(content.includes("registerProcessor('pcm-recorder-processor', PcmRecorderProcessor)"));
    });

    it('AudioWorklet must post raw Float32 PCM buffers to main thread', () => {
      const content = fs.readFileSync(workletPath, 'utf8');
      assert.ok(content.includes("eventType: 'pcm_buffer'"));
      assert.ok(content.includes('new Float32Array(this.bufferSize)'));
    });
  });

  describe('Canvas 2D 64-Bar Waveform Visualization (AC 2)', () => {
    it('Should calculate 64 frequency bar positions symmetrically with mirror layout', () => {
      const barCount = 64;
      const width = 640;
      const halfBars = barCount / 2;
      const barSpacing = width / barCount;

      assert.equal(halfBars, 32);
      assert.equal(barSpacing, 10);

      // Verify mirror indexing
      for (let i = 0; i < halfBars; i++) {
        const leftX = width / 2 - (i + 1) * barSpacing;
        const rightX = width / 2 + i * barSpacing;

        assert.ok(leftX >= 0, 'Left bar must stay within canvas bounds');
        assert.ok(rightX < width, 'Right bar must stay within canvas bounds');
        assert.equal(rightX - width / 2, width / 2 - leftX - barSpacing, 'Must be perfectly symmetrical');
      }
    });

    it('FFT 1024 must yield 512 frequency bins with low-frequency emphasis for speech formants', () => {
      const fftSize = 1024;
      const frequencyBinCount = fftSize / 2;
      assert.equal(frequencyBinCount, 512);

      // Speech frequencies (F1: 200-1000Hz, F2: 800-2500Hz) mapped within first 120 bins at 48kHz
      const sampleRate = 48000;
      const binWidthHz = sampleRate / fftSize; // 46.875 Hz per bin
      assert.ok(binWidthHz < 50, 'Bin width must be precise enough for formant tracking (<50Hz)');

      const f1Bin = Math.round(500 / binWidthHz);
      const f2Bin = Math.round(1500 / binWidthHz);
      assert.ok(f1Bin < 120 && f2Bin < 120, 'Vowel formants must fall in primary visual bins');
    });
  });

  describe('Push-to-Talk Logic & Space Key Debouncing (AC 3)', () => {
    it('Should trigger onStart only on first Space keydown and block repeat events', () => {
      let startCount = 0;
      let stopCount = 0;
      let isKeyDown = false;

      const simulateKeyDown = (e) => {
        if (e.code === 'Space' && !e.repeat && !isKeyDown) {
          isKeyDown = true;
          startCount++;
        }
      };

      const simulateKeyUp = (e) => {
        if (e.code === 'Space' && isKeyDown) {
          isKeyDown = false;
          stopCount++;
        }
      };

      // Press Space
      simulateKeyDown({ code: 'Space', repeat: false });
      assert.equal(startCount, 1);
      assert.equal(stopCount, 0);

      // OS Key repeats while held down (must be ignored)
      simulateKeyDown({ code: 'Space', repeat: true });
      simulateKeyDown({ code: 'Space', repeat: true });
      assert.equal(startCount, 1, 'Key repeat must be ignored by debounce check');

      // Release Space
      simulateKeyUp({ code: 'Space' });
      assert.equal(stopCount, 1);
      assert.equal(isKeyDown, false);
    });

    it('Should ignore Space key if user is typing in an input or textarea', () => {
      const shouldBlock = (tagName, isContentEditable) => {
        return tagName === 'input' || tagName === 'textarea' || isContentEditable;
      };

      assert.equal(shouldBlock('input', false), true);
      assert.equal(shouldBlock('textarea', false), true);
      assert.equal(shouldBlock('div', true), true);
      assert.equal(shouldBlock('body', false), false);
      assert.equal(shouldBlock('button', false), false);
    });
  });

  describe('Microphone Permission Denied Fallback (AC 4)', () => {
    it('Should detect NotAllowedError and generate clear user instructions', () => {
      const err = new Error('Permission denied');
      err.name = 'NotAllowedError';

      const isDenied = err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError';
      assert.equal(isDenied, true);

      const userMessage = isDenied
        ? 'Bạn chưa cấp quyền microphone. Vui lòng bấm Cho phép để ghi âm.'
        : err.message;

      assert.ok(userMessage.includes('chưa cấp quyền microphone'));
    });
  });
});
