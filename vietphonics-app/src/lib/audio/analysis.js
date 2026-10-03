// Acoustic analysis toolkit (pure JS, runs in browser, zero server cost).
// All functions take mono Float32Array samples + sampleRate.

/** Downsample to N peak buckets for waveform drawing → [{min,max}] */
export function waveformPeaks(samples, buckets = 400) {
  const out = [];
  const size = Math.max(1, Math.floor(samples.length / buckets));
  for (let i = 0; i < buckets; i++) {
    let min = 1, max = -1;
    const start = i * size;
    for (let j = start; j < start + size && j < samples.length; j++) {
      const v = samples[j];
      if (v < min) min = v;
      if (v > max) max = v;
    }
    out.push({ min: min === 1 ? 0 : min, max: max === -1 ? 0 : max });
  }
  return out;
}

/** Short-time RMS energy envelope. Returns { frames: Float32Array, hop (s) } */
export function energyEnvelope(samples, sampleRate, frameMs = 20) {
  const hop = Math.floor((sampleRate * frameMs) / 1000);
  const n = Math.floor(samples.length / hop);
  const frames = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    let s = 0;
    for (let j = i * hop; j < (i + 1) * hop; j++) s += samples[j] * samples[j];
    frames[i] = Math.sqrt(s / hop);
  }
  return { frames, hop: frameMs / 1000 };
}

/** Trim leading/trailing silence. Returns { start, end } in seconds. */
export function speechBounds(samples, sampleRate) {
  const { frames, hop } = energyEnvelope(samples, sampleRate);
  const peak = Math.max(...frames, 1e-6);
  const thr = Math.max(0.02, peak * 0.08);
  let a = 0, b = frames.length - 1;
  while (a < frames.length && frames[a] < thr) a++;
  while (b > a && frames[b] < thr) b--;
  return { start: a * hop, end: (b + 1) * hop };
}

/**
 * Voice-activity segments & pauses.
 * Returns { segments: [{start,end}], pauses: [{start,end,duration}], speechTime, totalTime }
 */
export function detectSegments(samples, sampleRate, { minPauseMs = 120 } = {}) {
  const { frames, hop } = energyEnvelope(samples, sampleRate);
  const peak = Math.max(...frames, 1e-6);
  const thr = Math.max(0.015, peak * 0.1);
  const segments = [];
  let inSeg = false, segStart = 0;
  for (let i = 0; i < frames.length; i++) {
    const voiced = frames[i] >= thr;
    if (voiced && !inSeg) { inSeg = true; segStart = i; }
    if (!voiced && inSeg) { inSeg = false; segments.push({ start: segStart * hop, end: i * hop }); }
  }
  if (inSeg) segments.push({ start: segStart * hop, end: frames.length * hop });
  // merge segments separated by tiny gaps
  const merged = [];
  for (const s of segments) {
    const last = merged[merged.length - 1];
    if (last && s.start - last.end < minPauseMs / 1000) last.end = s.end;
    else merged.push({ ...s });
  }
  const pauses = [];
  for (let i = 1; i < merged.length; i++) {
    pauses.push({ start: merged[i - 1].end, end: merged[i].start, duration: merged[i].start - merged[i - 1].end });
  }
  const speechTime = merged.reduce((a, s) => a + (s.end - s.start), 0);
  return { segments: merged, pauses, speechTime, totalTime: samples.length / sampleRate };
}

/** YIN-style autocorrelation pitch for one frame. Returns Hz or 0. */
export function detectPitchFrame(frame, sampleRate, minHz = 70, maxHz = 450) {
  const n = frame.length;
  let rms = 0;
  for (let i = 0; i < n; i++) rms += frame[i] * frame[i];
  rms = Math.sqrt(rms / n);
  if (rms < 0.01) return 0;
  const minLag = Math.floor(sampleRate / maxHz);
  const maxLag = Math.floor(sampleRate / minHz);
  const d = new Float32Array(maxLag + 1);
  for (let lag = 1; lag <= maxLag; lag++) {
    let s = 0;
    for (let i = 0; i < n - maxLag; i++) {
      const diff = frame[i] - frame[i + lag];
      s += diff * diff;
    }
    d[lag] = s;
  }
  // cumulative mean normalized difference
  let running = 0;
  const cmnd = new Float32Array(maxLag + 1);
  cmnd[0] = 1;
  for (let lag = 1; lag <= maxLag; lag++) {
    running += d[lag];
    cmnd[lag] = running ? (d[lag] * lag) / running : 1;
  }
  let best = -1;
  for (let lag = minLag; lag <= maxLag; lag++) {
    if (cmnd[lag] < 0.15) {
      while (lag + 1 <= maxLag && cmnd[lag + 1] < cmnd[lag]) lag++;
      best = lag;
      break;
    }
  }
  if (best === -1) return 0;
  return sampleRate / best;
}

/** Pitch contour → [{t, hz}] (hz=0 when unvoiced) */
export function pitchContour(samples, sampleRate, hopMs = 20, frameMs = 40) {
  const hop = Math.floor((sampleRate * hopMs) / 1000);
  const size = Math.floor((sampleRate * frameMs) / 1000);
  const out = [];
  for (let i = 0; i + size < samples.length; i += hop) {
    out.push({ t: i / sampleRate, hz: detectPitchFrame(samples.subarray(i, i + size), sampleRate) });
  }
  return out;
}

/** Median of voiced pitch values */
export function medianPitch(contour) {
  const v = contour.map((p) => p.hz).filter((h) => h > 0).sort((a, b) => a - b);
  return v.length ? v[Math.floor(v.length / 2)] : 0;
}

/** Syllable nuclei: local maxima in smoothed energy envelope. Returns [{t, energy, duration}] */
export function syllableNuclei(samples, sampleRate) {
  const { frames, hop } = energyEnvelope(samples, sampleRate, 10);
  const sm = new Float32Array(frames.length);
  for (let i = 0; i < frames.length; i++) {
    let s = 0, c = 0;
    for (let k = -3; k <= 3; k++) if (frames[i + k] !== undefined) { s += frames[i + k]; c++; }
    sm[i] = s / c;
  }
  const peak = Math.max(...sm, 1e-6);
  const thr = peak * 0.25;
  const nuclei = [];
  for (let i = 2; i < sm.length - 2; i++) {
    if (sm[i] > thr && sm[i] >= sm[i - 1] && sm[i] >= sm[i + 1] && sm[i] > sm[i - 2] && sm[i] > sm[i + 2]) {
      const last = nuclei[nuclei.length - 1];
      if (last && (i * hop - last.t) < 0.12) {
        if (sm[i] > last.energy) { last.t = i * hop; last.energy = sm[i]; }
        continue;
      }
      // width at half height → duration
      let l = i, r = i;
      while (l > 0 && sm[l] > sm[i] * 0.5) l--;
      while (r < sm.length - 1 && sm[r] > sm[i] * 0.5) r++;
      nuclei.push({ t: i * hop, energy: sm[i], duration: (r - l) * hop });
    }
  }
  return nuclei;
}

/**
 * Ending-sound energy check: is there consonant energy (esp. high-frequency fricative /s/, burst /t,k/)
 * after the last vowel nucleus? Returns { tailMs, hfRatio, present }
 */
export function endingConsonantEvidence(samples, sampleRate) {
  const { end } = speechBounds(samples, sampleRate);
  const nuclei = syllableNuclei(samples, sampleRate);
  const lastNucleus = nuclei.length ? nuclei[nuclei.length - 1].t : end;
  const tailStart = Math.floor((lastNucleus + 0.06) * sampleRate);
  const tailEnd = Math.floor(end * sampleRate);
  const tail = samples.subarray(Math.min(tailStart, tailEnd), tailEnd);
  if (tail.length < 32) return { tailMs: 0, hfRatio: 0, present: false };
  // high-frequency proxy: zero-crossing rate
  let zc = 0, e = 0;
  for (let i = 1; i < tail.length; i++) {
    if ((tail[i] >= 0) !== (tail[i - 1] >= 0)) zc++;
    e += tail[i] * tail[i];
  }
  const zcr = zc / tail.length; // >0.15 ≈ fricative noise
  const tailMs = (tail.length / sampleRate) * 1000;
  const rms = Math.sqrt(e / tail.length);
  return { tailMs, hfRatio: zcr, rms, present: tailMs > 40 && (zcr > 0.12 || rms > 0.02) };
}

// ---------- Formants (LPC) for vowel space (ADV-103) ----------
function autocorr(x, order) {
  const r = new Float64Array(order + 1);
  for (let k = 0; k <= order; k++) {
    let s = 0;
    for (let i = 0; i < x.length - k; i++) s += x[i] * x[i + k];
    r[k] = s;
  }
  return r;
}
function levinson(r, order) {
  const a = new Float64Array(order + 1);
  a[0] = 1;
  let e = r[0];
  if (e === 0) return a;
  for (let i = 1; i <= order; i++) {
    let acc = r[i];
    for (let j = 1; j < i; j++) acc += a[j] * r[i - j];
    const k = -acc / e;
    const tmp = a.slice();
    for (let j = 1; j < i; j++) a[j] = tmp[j] + k * tmp[i - j];
    a[i] = k;
    e *= 1 - k * k;
  }
  return a;
}
/**
 * Estimate F1/F2 of a vowel frame using LPC spectral envelope peak picking.
 * Best on frames resampled near 10–11kHz; we decimate internally.
 * Returns { f1, f2 } in Hz or null.
 */
export function estimateFormants(frame, sampleRate) {
  // decimate to ~11kHz
  const factor = Math.max(1, Math.round(sampleRate / 11025));
  const sr = sampleRate / factor;
  const n = Math.floor(frame.length / factor);
  if (n < 128) return null;
  const x = new Float64Array(n);
  let energy = 0;
  for (let i = 0; i < n; i++) {
    const v = frame[i * factor] - 0.95 * (i ? frame[(i - 1) * factor] : 0); // pre-emphasis
    const w = 0.54 - 0.46 * Math.cos((2 * Math.PI * i) / (n - 1)); // hamming
    x[i] = v * w;
    energy += x[i] * x[i];
  }
  if (energy < 1e-4) return null;
  const order = 12;
  const a = levinson(autocorr(x, order), order);
  // evaluate envelope 1/|A(e^jw)| on 0..4000Hz
  const peaks = [];
  let prev = 0, prev2 = 0;
  const step = 10;
  for (let f = 0; f <= 4000; f += step) {
    const w = (2 * Math.PI * f) / sr;
    let re = 0, im = 0;
    for (let k = 0; k <= order; k++) { re += a[k] * Math.cos(w * k); im -= a[k] * Math.sin(w * k); }
    const mag = 1 / Math.sqrt(re * re + im * im);
    if (f >= 2 * step && prev > prev2 && prev > mag) peaks.push(f - step);
    prev2 = prev; prev = mag;
  }
  const f1 = peaks.find((p) => p >= 200 && p <= 1100);
  const f2 = peaks.find((p) => p > (f1 || 0) + 200 && p >= 650 && p <= 3200);
  if (!f1 || !f2) return null;
  return { f1, f2 };
}

/** Average formants across the most voiced, stable middle part of a recording. */
export function vowelFormants(samples, sampleRate) {
  const { start, end } = speechBounds(samples, sampleRate);
  const mid0 = start + (end - start) * 0.25;
  const mid1 = start + (end - start) * 0.75;
  const size = Math.floor(sampleRate * 0.04);
  const res = [];
  for (let t = mid0; t < mid1; t += 0.02) {
    const i = Math.floor(t * sampleRate);
    const f = estimateFormants(samples.subarray(i, i + size), sampleRate);
    if (f) res.push(f);
  }
  if (!res.length) return null;
  const med = (arr) => arr.sort((a, b) => a - b)[Math.floor(arr.length / 2)];
  return { f1: med(res.map((r) => r.f1)), f2: med(res.map((r) => r.f2)) };
}

/** Pearson correlation of two pitch contours resampled to same length (intonation similarity 0..1) */
export function contourSimilarity(a, b, points = 50) {
  const norm = (c) => {
    const v = c.filter((p) => p.hz > 0).map((p) => p.hz);
    if (v.length < 3) return null;
    const out = [];
    for (let i = 0; i < points; i++) out.push(v[Math.floor((i / points) * v.length)]);
    const m = out.reduce((s, x) => s + x, 0) / out.length;
    return out.map((x) => x / m);
  };
  const x = norm(a), y = norm(b);
  if (!x || !y) return 0;
  const mx = x.reduce((s, v) => s + v, 0) / points;
  const my = y.reduce((s, v) => s + v, 0) / points;
  let num = 0, dx = 0, dy = 0;
  for (let i = 0; i < points; i++) { num += (x[i] - mx) * (y[i] - my); dx += (x[i] - mx) ** 2; dy += (y[i] - my) ** 2; }
  const r = num / Math.sqrt(dx * dy || 1);
  return Math.max(0, (r + 1) / 2);
}
