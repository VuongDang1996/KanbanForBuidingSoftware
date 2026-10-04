import React, { useState, useEffect, useRef, useCallback } from 'react';
import { DUAL_TRACK_BENCHMARKS, compareDualTrackWaveforms } from '../../lib/audio/dualTrackWaveform';

export default function DualTrackStudio({
  initialWord = 'thought',
  onClose
}) {
  const [selectedWord, setSelectedWord] = useState(initialWord);
  const benchmark = DUAL_TRACK_BENCHMARKS[selectedWord] || DUAL_TRACK_BENCHMARKS.thought;

  const [comparison, setComparison] = useState(() => compareDualTrackWaveforms(selectedWord));
  const [playheadRatio, setPlayheadRatio] = useState(0.25); // 0.0 to 1.0
  const [activeChannel, setActiveChannel] = useState(null); // 'A' (native) | 'B' (user) | null
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [isRecordingUser, setIsRecordingUser] = useState(false);

  const containerRef = useRef(null);

  // Update comparison when word changes
  useEffect(() => {
    setComparison(compareDualTrackWaveforms(selectedWord));
    setPlayheadRatio(0.25);
  }, [selectedWord]);

  // Audio Playback functions
  const playNative = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setActiveChannel('A');

    const utterance = new SpeechSynthesisUtterance(benchmark.word);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.onend = () => setActiveChannel(null);
    utterance.onerror = () => setActiveChannel(null);

    window.speechSynthesis.speak(utterance);
  }, [benchmark.word]);

  const playUser = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setActiveChannel('B');

    // Simulate truncated user speech with faster speech rate or pitch shift
    const utterance = new SpeechSynthesisUtterance(benchmark.word);
    utterance.lang = 'en-US';
    utterance.rate = 1.35; // truncated duration
    utterance.pitch = 1.1;
    utterance.onend = () => setActiveChannel(null);
    utterance.onerror = () => setActiveChannel(null);

    window.speechSynthesis.speak(utterance);
  }, [benchmark.word]);

  const stopAllAudio = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setActiveChannel(null);
    }
  }, []);

  // Global Keyboard hotkeys: A, B, Space (AC 4)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        playNative();
      } else if (e.key === 'b' || e.key === 'B') {
        e.preventDefault();
        playUser();
      } else if (e.code === 'Space') {
        e.preventDefault();
        if (activeChannel) {
          stopAllAudio();
        } else {
          playNative();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playNative, playUser, stopAllAudio, activeChannel]);

  // Handle Playhead scrub on click / drag (AC 2)
  const handleTimelineInteraction = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const ratio = Math.max(0, Math.min(1, x / rect.width));
    setPlayheadRatio(ratio);
  };

  const handleMouseDown = (e) => {
    setIsScrubbing(true);
    handleTimelineInteraction(e);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isScrubbing) handleTimelineInteraction(e);
    };
    const handleMouseUp = () => setIsScrubbing(false);

    if (isScrubbing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isScrubbing]);

  const currentPlayheadMs = Math.round(playheadRatio * benchmark.nativeDurationMs);

  return (
    <section className="w-full bg-slate-900 rounded-2xl p-space-md md:p-space-lg shadow-lg border border-slate-800 text-white relative overflow-hidden transition-all">
      {/* Glow ambient background */}
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-sky-500/10 blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-rose-500/10 blur-[80px] pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-space-sm gap-3 border-b border-slate-800 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-label-mono text-label-mono uppercase text-sky-400 font-bold tracking-wider">
              PRON-204 · Dual-Track Acoustic Studio
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-label-mono bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30">
              Vowel Nucleus Alignment
            </span>
          </div>
          <h3 className="text-heading-md font-bold text-white mt-1">
            So Sánh Sóng Âm Đôi Kênh: Bản Xứ vs Học Viên
          </h3>
          <p className="text-body-sm text-slate-400">
            Duyệt âm thanh mili-giây (Audio Scrubbing) để phát hiện nguyên âm bị ngắt cụt hoặc nuốt âm đuôi.
          </p>
        </div>

        {/* Action badges & Correlation Score */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="bg-slate-800/80 border border-slate-700 rounded-full px-4 py-2 font-mono text-sm text-white flex items-center gap-2 shadow-xs">
            <span className="text-slate-400 text-xs">Độ Tương Phản:</span>
            <span className={`font-bold ${
              comparison.correlationScore >= 80 ? 'text-emerald-400' : 'text-amber-400'
            }`}>
              {comparison.correlationScore}% Waveform Correlation
            </span>
          </div>
        </div>
      </div>

      {/* Target Word Selector */}
      <div className="flex flex-wrap items-center gap-2 mt-4 pt-1 relative z-10">
        {Object.values(DUAL_TRACK_BENCHMARKS).map((b) => (
          <button
            key={b.word}
            type="button"
            onClick={() => setSelectedWord(b.word)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 border ${
              selectedWord === b.word
                ? 'bg-sky-500 border-sky-400 text-white shadow-sm'
                : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700 text-slate-300'
            }`}
          >
            <span>{b.word}</span>
            <span className="font-ipa-inline opacity-80">{b.ipa}</span>
            <span className="text-[10px] text-sky-200">({b.nativeDurationMs}ms)</span>
          </button>
        ))}
      </div>

      {/* Dual Track Canvas Container (AC 1 & AC 2) */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        className="mt-5 p-4 bg-slate-950/80 rounded-xl border border-slate-800 relative cursor-crosshair select-none overflow-hidden"
      >
        {/* Timeline ruler markers */}
        <div className="flex justify-between text-[10px] font-mono text-slate-500 pb-2 border-b border-slate-800/80 mb-3">
          <span>0ms (Bắt đầu)</span>
          <span>Nucleus: ~{benchmark.nativeVowelRange[0]}ms - {benchmark.nativeVowelRange[1]}ms</span>
          <span>{benchmark.nativeDurationMs}ms (Kết thúc)</span>
        </div>

        {/* TRACK A: NATIVE SPEAKER (Sky-400) */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-sky-400 font-bold flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${activeChannel === 'A' ? 'bg-sky-400 animate-ping' : 'bg-sky-500'}`} />
              KÊNH A (Giọng Bản Xứ Oxford/US) — {benchmark.nativeDurationMs}ms
            </span>
            <span className="text-slate-400 font-mono text-[11px]">[Phím A để nghe]</span>
          </div>

          <div className="h-16 bg-slate-900 border border-sky-500/30 rounded-xl p-2 flex items-center gap-1 relative overflow-hidden">
            {benchmark.nativePeaks.map((peak, idx) => (
              <div
                key={`native-${idx}`}
                className="flex-1 rounded-sm bg-gradient-to-t from-sky-600 to-sky-400 transition-all duration-150"
                style={{ height: `${Math.max(6, peak * 100)}%` }}
              />
            ))}
          </div>
        </div>

        {/* TRACK B: USER RECORDING (Rose-400) */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-rose-400 font-bold flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${activeChannel === 'B' ? 'bg-rose-400 animate-ping' : 'bg-rose-500'}`} />
              KÊNH B (Giọng Thu Âm Của Bạn) — {benchmark.demoUserDurationMs}ms
            </span>
            <span className="text-slate-400 font-mono text-[11px]">[Phím B để nghe]</span>
          </div>

          <div className="h-16 bg-slate-900 border border-rose-500/30 rounded-xl p-2 flex items-center gap-1 relative overflow-hidden">
            {benchmark.demoUserPeaks.map((peak, idx) => (
              <div
                key={`user-${idx}`}
                className="flex-1 rounded-sm bg-gradient-to-t from-rose-600 to-rose-400 transition-all duration-150"
                style={{ height: `${Math.max(6, peak * 100)}%` }}
              />
            ))}

            {/* Duration Truncation Deficiency Boundary (AC 3) */}
            {comparison.isVowelTooShort && (
              <div
                className="absolute top-1 bottom-1 border-2 border-dashed border-amber-400 bg-amber-400/10 rounded-md pointer-events-none flex items-center justify-center"
                style={{
                  left: '35%',
                  width: '30%'
                }}
              >
                <span className="text-[10px] font-mono text-amber-300 font-bold px-1 bg-slate-900/80 rounded">
                  ⚠️ Vùng Thiếu Hụt (~{benchmark.nativeDurationMs - benchmark.demoUserDurationMs}ms)
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Vertical Playhead Scrubber Line (AC 2) */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-amber-400 shadow-[0_0_12px_#f59e0b] pointer-events-none transition-transform"
          style={{
            left: `${playheadRatio * 100}%`
          }}
        >
          {/* Top handle pill */}
          <div className="absolute top-1 -left-6 bg-amber-400 text-slate-950 font-mono text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
            {currentPlayheadMs}ms
          </div>
        </div>
      </div>

      {/* Duration Discrepancy Warning Alert (AC 3) */}
      {comparison.durationWarning && (
        <div className="mt-4 p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 flex items-start gap-3">
          <span className="material-symbols-outlined text-amber-400 text-xl shrink-0 mt-0.5">
            speed
          </span>
          <div className="text-xs space-y-1">
            <p className="font-bold text-amber-300">
              {comparison.durationWarning}
            </p>
            <p className="text-amber-200/80">
              💡 Thói quen tiếng Việt là ngắt âm dứt khoát. Trong tiếng Anh, nguyên âm dài ({benchmark.ipa}) quyết định độ tự nhiên và giúp người nghe phân biệt với các từ có nguyên âm ngắn.
            </p>
          </div>
        </div>
      )}

      {/* Studio Action Controls & Hotkeys Legend (AC 4) */}
      <div className="mt-5 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          {/* Button A: Play Native */}
          <button
            type="button"
            onClick={playNative}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
              activeChannel === 'A'
                ? 'bg-sky-500 text-white border-sky-400 ring-2 ring-sky-400/30'
                : 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
            }`}
          >
            <span className="material-symbols-outlined text-base">volume_up</span>
            <span>Phím [A]: Nghe Bản Xứ</span>
          </button>

          {/* Button B: Play User */}
          <button
            type="button"
            onClick={playUser}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
              activeChannel === 'B'
                ? 'bg-rose-500 text-white border-rose-400 ring-2 ring-rose-400/30'
                : 'bg-slate-800 hover:bg-slate-700 text-rose-300 border-slate-700'
            }`}
          >
            <span className="material-symbols-outlined text-base">person</span>
            <span>Phím [B]: Nghe Giọng Bạn</span>
          </button>

          {/* Stop / Pause */}
          <button
            type="button"
            onClick={stopAllAudio}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
            title="Dừng âm thanh"
          >
            <span className="material-symbols-outlined text-base">stop</span>
          </button>
        </div>

        {/* Hotkeys legend reminder */}
        <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
          <span>Phím tắt:</span>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-white font-bold">A</kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-white font-bold">B</kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-white font-bold">Space</kbd>
        </div>
      </div>
    </section>
  );
}
