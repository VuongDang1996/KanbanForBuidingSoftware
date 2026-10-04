/**
 * Zero-Latency Procedural Sound Synthesizer & Canvas Audio Engine (GAME-104)
 * Generates 8 distinct video game SFX procedurally using Web Audio API (OscillatorNode, GainNode)
 * with 0-byte download footprint, Apple iOS Safari unlock, and prefers-reduced-motion accessibility.
 */

export const SYNTH_SFX_CATALOG = [
  { id: 'hit_slash', name: 'Nhát Chém Kiếm (Blade Slash)', waveType: 'sawtooth', startFreq: 180, endFreq: 40, durationSec: 0.12 },
  { id: 'critical_impact', name: 'Đòn Chí Mạng (Critical Impact)', waveType: 'square', startFreq: 320, endFreq: 60, durationSec: 0.25 },
  { id: 'coin_pickup', name: 'Thu Thập Tiền Vàng (Coin Pickup)', waveType: 'sine', startFreq: 987, endFreq: 1318, durationSec: 0.15 },
  { id: 'shield_defend', name: 'Khiên Đỡ Đòn (Shield Clank)', waveType: 'triangle', startFreq: 300, endFreq: 120, durationSec: 0.18 },
  { id: 'boss_roar', name: 'Tiếng Gầm Của Trùm (Boss Roar)', waveType: 'sawtooth', startFreq: 80, endFreq: 30, durationSec: 0.45 },
  { id: 'level_up', name: 'Thăng Cấp Vinh Quang (Fanfare)', waveType: 'sine', startFreq: 523, endFreq: 1046, durationSec: 0.40 },
  { id: 'streak_flame', name: 'Ngọn Lửa Chuỗi (Flame Whoosh)', waveType: 'triangle', startFreq: 150, endFreq: 450, durationSec: 0.20 },
  { id: 'freeze_shatter', name: 'Băng Tuyết Vỡ (Ice Ping)', waveType: 'sine', startFreq: 2400, endFreq: 800, durationSec: 0.22 }
];

export function getSynthSfxCatalog() {
  return SYNTH_SFX_CATALOG;
}

export function getSynthSfxById(id) {
  return SYNTH_SFX_CATALOG.find((s) => s.id === id) || SYNTH_SFX_CATALOG[0];
}

let globalAudioCtx = null;

export function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!globalAudioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      globalAudioCtx = new AudioContextClass();
    }
  }
  return globalAudioCtx;
}

/**
 * AC 1: Safari iOS AudioContext Unlock on first user gesture
 */
export async function unlockSafariAudioContext() {
  const ctx = getAudioContext();
  if (!ctx) return false;
  if (ctx.state === 'suspended') {
    try {
      await ctx.resume();
      return ctx.state === 'running';
    } catch {
      return false;
    }
  }
  return ctx.state === 'running';
}

/**
 * AC 2: Check accessibility preference for reduced motion / photosensitive safety
 */
export function isReducedMotionPreferred() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * AC 3: Procedural synthesis of 8 game SFX types
 */
export function playProceduralSfx(type = 'hit_slash', volume = 0.5) {
  const ctx = getAudioContext();
  if (!ctx || ctx.state !== 'running') {
    // Attempt unlock if suspended
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
  }
  if (!ctx) return null;

  const sfxConfig = getSynthSfxById(type);
  const now = ctx.currentTime;
  const safeVol = Math.max(0, Math.min(1.0, Number(volume) || 0.5));

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = sfxConfig.waveType;
  osc.frequency.setValueAtTime(sfxConfig.startFreq, now);
  osc.frequency.exponentialRampToValueAtTime(
    Math.max(10, sfxConfig.endFreq),
    now + sfxConfig.durationSec
  );

  gain.gain.setValueAtTime(safeVol, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + sfxConfig.durationSec);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + sfxConfig.durationSec);

  return {
    type: sfxConfig.id,
    waveType: sfxConfig.waveType,
    startFreq: sfxConfig.startFreq,
    endFreq: sfxConfig.endFreq,
    durationSec: sfxConfig.durationSec,
    volume: safeVol,
    timestamp: Date.now()
  };
}
