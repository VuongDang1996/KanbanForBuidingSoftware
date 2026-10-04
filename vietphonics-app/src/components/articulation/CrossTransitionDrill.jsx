import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CONFUSION_TRAP_DRILLS, evaluateConfusionTrap } from '../../lib/scoring/crossTransition';

export default function CrossTransitionDrill({
  initialTrapId = 'trap_s_sh'
}) {
  const [selectedTrapId, setSelectedTrapId] = useState(initialTrapId);
  const trap = CONFUSION_TRAP_DRILLS[selectedTrapId] || CONFUSION_TRAP_DRILLS.trap_s_sh;

  const [evaluation, setEvaluation] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isSimulatingAssimilation, setIsSimulatingAssimilation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Metronome States (AC 3)
  const [metronomeActive, setMetronomeActive] = useState(false);
  const [bpm, setBpm] = useState(60);
  const [activeBeatWordIdx, setActiveBeatWordIdx] = useState(-1);

  const audioCtxRef = useRef(null);
  const timerRef = useRef(null);

  // Re-run evaluation on trap or simulation toggle
  useEffect(() => {
    let mockDetections = {};
    if (isSimulatingAssimilation) {
      if (selectedTrapId === 'trap_s_sh') {
        mockDetections = {
          'sells': '/ʃ/', // assimilated to previous /ʃ/ "She"
          'sea': '/s/',
          'shells': '/s/' // assimilated to previous /s/ "sea"
        };
      } else if (selectedTrapId === 'trap_l_n') {
        mockDetections = {
          'line': '/n/' // North dialect L->N collapse
        };
      }
    }

    setEvaluation(evaluateConfusionTrap(selectedTrapId, mockDetections));
    setActiveBeatWordIdx(-1);
    stopMetronome();
  }, [selectedTrapId, isSimulatingAssimilation]);

  // Web Audio API Metronome Sound Generator (AC 3)
  const playTick = (isDownbeat = false) => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(isDownbeat ? 1200 : 800, audioCtxRef.current.currentTime);

      gain.gain.setValueAtTime(0.3, audioCtxRef.current.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);

      osc.start();
      osc.stop(audioCtxRef.current.currentTime + 0.08);
    } catch {
      // AudioContext unavailable fallback
    }
  };

  // Metronome start/stop logic
  const startMetronome = () => {
    setMetronomeActive(true);
    const intervalMs = Math.round((60 / bpm) * 1000);
    let beatIdx = 0;

    playTick(true);
    setActiveBeatWordIdx(0);

    timerRef.current = setInterval(() => {
      beatIdx = (beatIdx + 1) % trap.words.length;
      setActiveBeatWordIdx(beatIdx);
      playTick(beatIdx === 0);
    }, intervalMs);
  };

  const stopMetronome = () => {
    setMetronomeActive(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setActiveBeatWordIdx(-1);
  };

  const toggleMetronome = () => {
    if (metronomeActive) {
      stopMetronome();
    } else {
      startMetronome();
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close().catch(() => {});
    };
  }, []);

  // Audio Playback
  const playSentenceAudio = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setIsPlayingAudio(true);

    const utterance = new SpeechSynthesisUtterance(trap.sentence);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  // Submit Practice
  const handleSubmitPractice = async () => {
    setIsSubmitting(true);
    let mockDetections = {};
    if (isSimulatingAssimilation) {
      mockDetections = { 'sells': '/ʃ/' };
    }

    try {
      const res = await fetch('/api/v1/practice/confusion-trap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trapId: selectedTrapId,
          detectedWordPhonemes: mockDetections
        })
      });

      if (res.ok) {
        const data = await res.json();
        setEvaluation(data.evaluation);
      }
    } catch {
      // Fallback
    } finally {
      setIsSubmitting(false);
    }
  };

  const curEval = evaluation || evaluateConfusionTrap(selectedTrapId, {});

  return (
    <section className="w-full bg-white rounded-2xl p-space-md md:p-space-lg shadow-sm border border-slate-200/90 relative overflow-hidden transition-all">
      {/* Subtle background blur */}
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-rose-100/40 blur-[60px] pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-space-sm gap-3 border-b border-slate-100 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-label-mono text-label-mono uppercase text-rose-700 font-bold tracking-wider">
              PRON-208 · L1 Confusion-Trap Cross-Transition Drills
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-label-mono bg-rose-100 text-rose-800 font-bold">
              Phonetic Assimilation Guard
            </span>
          </div>
          <h3 className="text-heading-md font-bold text-slate-900 mt-1">
            Bài Tập Đảo Ngữ Âm Chống Nhầm Lẫn Bẫy Âm L1
          </h3>
          <p className="text-body-sm text-slate-500">
            Khắc phục tật líu lưỡi và hiện tượng đồng hóa âm khi 2 âm đối kháng đứng cạnh nhau; rèn luyện độ linh hoạt cơ miệng.
          </p>
        </div>

        {/* Agility Score Badge */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-full px-4 py-2 font-mono text-sm text-white flex items-center gap-2 shadow-xs">
            <span className="text-xs text-slate-400">Độ Linh Hoạt:</span>
            <span className={`font-bold ${
              curEval.agilityScore >= 80 ? 'text-emerald-400' : 'text-amber-400'
            }`}>
              {curEval.agilityScore}% Agility Score
            </span>
          </div>
        </div>
      </div>

      {/* Trap Drills Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 mt-4 pt-1">
        {Object.values(CONFUSION_TRAP_DRILLS).map((dr) => (
          <button
            key={dr.id}
            type="button"
            onClick={() => setSelectedTrapId(dr.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 border ${
              selectedTrapId === dr.id
                ? 'bg-rose-600 border-rose-600 text-white shadow-sm'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            <span className="font-ipa-inline font-bold px-1.5 py-0.5 rounded bg-white/20 text-white">
              {dr.phonemeA} vs {dr.phonemeB}
            </span>
            <span>{dr.name}</span>
          </button>
        ))}
      </div>

      {/* Tongue Twister Sentence Display with Color Coded Lip Shapes (AC 1) */}
      <div className="mt-5 p-6 bg-gradient-to-br from-rose-50/30 via-white to-sky-50/30 rounded-2xl border border-rose-100/80 relative">
        <div className="flex items-center justify-between mb-3 text-xs text-slate-500 font-label-mono">
          <span className="text-rose-800 font-bold uppercase tracking-wider">
            Câu Luyện Đảo Âm: "{trap.sentence}"
          </span>
          <span className="font-mono text-slate-400">
            {trap.phonemeA} (Xanh) ⇄ {trap.phonemeB} (Hồng)
          </span>
        </div>

        {/* Word Chips Layout */}
        <div className="flex flex-wrap items-center gap-3 py-3">
          {trap.words.map((item, idx) => {
            const isMetronomeActiveBeat = activeBeatWordIdx === idx;

            const badgeBg =
              item.color === 'rose'
                ? 'bg-rose-100 text-rose-900 border-rose-300'
                : item.color === 'sky'
                ? 'bg-sky-100 text-sky-900 border-sky-300'
                : item.color === 'indigo'
                ? 'bg-indigo-100 text-indigo-900 border-indigo-300'
                : 'bg-slate-100 text-slate-700 border-slate-200';

            return (
              <div
                key={`${item.word}-${idx}`}
                className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${badgeBg} ${
                  isMetronomeActiveBeat
                    ? 'ring-4 ring-rose-400 scale-105 shadow-md bg-white'
                    : 'shadow-2xs'
                }`}
              >
                <span className="font-serif text-xl md:text-2xl font-bold">
                  {item.word}
                </span>
                <span className="font-ipa-inline text-xs font-semibold opacity-80">
                  {item.ipa}
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/70 border border-slate-200 mt-0.5">
                  {item.lipShape}
                </span>
              </div>
            );
          })}
        </div>

        {/* L1 Trap Context Notice */}
        <p className="text-xs text-slate-600 mt-2 italic border-t border-rose-100 pt-2">
          💡 {trap.l1Notice}
        </p>
      </div>

      {/* Web Audio API Metronome Bar (AC 3) */}
      <div className="mt-4 p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Animated Pulsing Metronome Beacon */}
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 border border-slate-700 shrink-0">
            {metronomeActive && (
              <div className="absolute w-10 h-10 rounded-full bg-rose-500/40 animate-ping pointer-events-none" />
            )}
            <span className={`material-symbols-outlined text-xl ${metronomeActive ? 'text-rose-400' : 'text-slate-400'}`}>
              metronome
            </span>
          </div>

          <div>
            <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
              <span>Máy Gõ Nhịp Metronome Web Audio API</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/30">
                {metronomeActive ? `● Đang Chạy (${bpm} BPM)` : 'Tạm Dừng'}
              </span>
            </h4>
            <p className="text-[11px] text-slate-400">
              Gõ nhịp đều đặn giúp não bộ điều khiển cơ môi kịp chuyển đổi trạng thái Bè ⇄ Chu.
            </p>
          </div>
        </div>

        {/* Metronome Controls */}
        <div className="flex items-center gap-2">
          {/* BPM Selector */}
          <div className="flex items-center bg-slate-800 p-1 rounded-lg border border-slate-700 text-xs font-mono">
            {[60, 80, 100].map(val => (
              <button
                key={val}
                type="button"
                onClick={() => setBpm(val)}
                className={`px-2.5 py-1 rounded transition-all ${
                  bpm === val ? 'bg-rose-600 text-white font-bold' : 'text-slate-300 hover:text-white'
                }`}
              >
                {val} BPM
              </button>
            ))}
          </div>

          {/* Toggle Button */}
          <button
            type="button"
            onClick={toggleMetronome}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95 ${
              metronomeActive
                ? 'bg-rose-600 text-white ring-2 ring-rose-400/40'
                : 'bg-slate-800 hover:bg-slate-700 text-rose-300 border border-slate-700'
            }`}
          >
            <span className="material-symbols-outlined text-sm">
              {metronomeActive ? 'stop' : 'play_arrow'}
            </span>
            <span>{metronomeActive ? 'Dừng Nhịp' : 'Bật Nhịp Gõ'}</span>
          </button>
        </div>
      </div>

      {/* Phonetic Assimilation Detection Alert Drawer (AC 2) */}
      {curEval.assimilations && curEval.assimilations.length > 0 && (
        <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-300 text-slate-800 space-y-2 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-amber-950 text-sm flex items-center gap-1.5">
              <span className="material-symbols-outlined text-amber-600 text-base">warning</span>
              Phát hiện lỗi đồng hóa âm (Phonetic Assimilation / Líu lưỡi)!
            </h4>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-200 text-amber-900">
              {curEval.assimilations.length} vị trí bị líu
            </span>
          </div>

          <div className="space-y-1.5 pt-1">
            {curEval.assimilations.map((err, aIdx) => (
              <p key={aIdx} className="text-xs text-amber-900">
                ⚠️ <strong className="font-bold text-amber-950">{err.message}</strong>
              </p>
            ))}
          </div>
          <p className="text-[11px] text-amber-700 italic border-t border-amber-200/80 pt-1">
            💡 Bí quyết: Hạ thấp tốc độ xuống 60 BPM bằng Metronome, dừng nhẹ 0.2 giây giữa 2 từ để khẩu hình môi kịp thay đổi.
          </p>
        </div>
      )}

      {/* Action Footer & Simulation */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          {/* Play native sentence */}
          <button
            type="button"
            onClick={playSentenceAudio}
            disabled={isPlayingAudio}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold transition-all flex items-center gap-2 shadow-xs active:scale-95 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-base">
              {isPlayingAudio ? 'graphic_eq' : 'volume_up'}
            </span>
            <span>{isPlayingAudio ? 'Đang phát...' : 'Nghe Đọc Mẫu'}</span>
          </button>

          {/* Practice speech */}
          <button
            type="button"
            onClick={handleSubmitPractice}
            disabled={isSubmitting}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 font-bold transition-all flex items-center gap-2 shadow-2xs active:scale-95"
          >
            <span className="material-symbols-outlined text-base text-rose-600">mic</span>
            <span>{isSubmitting ? 'Đang chấm điểm...' : 'Đọc Thử Thách & Đo Độ Dẻo'}</span>
          </button>
        </div>

        {/* QA Simulation */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsSimulatingAssimilation(!isSimulatingAssimilation)}
            className={`px-3 py-1 rounded-md font-bold transition-all ${
              isSimulatingAssimilation
                ? 'bg-amber-600 text-white shadow-2xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {isSimulatingAssimilation ? 'Mô phỏng líu lưỡi: Bật' : 'Đọc chuẩn 2 âm: Bật'}
          </button>
        </div>
      </div>
    </section>
  );
}
