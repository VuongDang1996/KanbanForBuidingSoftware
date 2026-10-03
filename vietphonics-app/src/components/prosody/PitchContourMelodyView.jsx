import React, { useState, useEffect, useRef } from 'react';
import { SENTENCE_PITCH_BENCHMARKS, analyzePitchContour } from '../../lib/scoring/pitchContour';

export default function PitchContourMelodyView({
  initialSentenceId = 'sent_yes_no_01',
  onEvaluationComplete
}) {
  const [selectedSentenceId, setSelectedSentenceId] = useState(initialSentenceId);
  const [evaluation, setEvaluation] = useState(() => analyzePitchContour(initialSentenceId));
  const [isSimulatingL1Trap, setIsSimulatingL1Trap] = useState(false);
  const [isPlayingHumming, setIsPlayingHumming] = useState(false);
  const [playingTrackType, setPlayingTrackType] = useState(null); // 'native' | 'user'
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [showGrid, setShowGrid] = useState(true);

  const audioCtxRef = useRef(null);
  const activeOscRef = useRef(null);

  // Sync evaluation when sentence or simulation mode changes
  const runEvaluation = async (sentenceId, trapMode) => {
    setIsEvaluating(true);
    try {
      const res = await fetch('/api/v1/scoring/pitch-contour', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'default_user'
        },
        body: JSON.stringify({
          sentenceId,
          simulatedTone: trapMode ? 'fall_trap' : 'normal'
        })
      });

      if (res.ok) {
        const data = await res.json();
        setEvaluation(data.evaluation);
        if (onEvaluationComplete) onEvaluationComplete(data.evaluation);
      } else {
        // Fallback local calculation
        const localEval = analyzePitchContour(sentenceId, null, trapMode ? 'fall_trap' : 'normal');
        setEvaluation(localEval);
      }
    } catch {
      const localEval = analyzePitchContour(sentenceId, null, trapMode ? 'fall_trap' : 'normal');
      setEvaluation(localEval);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleSelectSentence = (sentenceId) => {
    setSelectedSentenceId(sentenceId);
    stopHumming();
    runEvaluation(sentenceId, isSimulatingL1Trap);
  };

  const handleToggleL1Trap = () => {
    const nextMode = !isSimulatingL1Trap;
    setIsSimulatingL1Trap(nextMode);
    stopHumming();
    runEvaluation(selectedSentenceId, nextMode);
  };

  /**
   * AC 3: Web Audio Humming Mode (Sine Wave Synth Pitch Glide)
   */
  const playHummingMelody = (points, trackType) => {
    stopHumming();

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine'; // pure smooth humming flute/whistle tone
      activeOscRef.current = osc;

      const baseFreq = 220; // A3 base pitch (Hz)
      const startTime = ctx.currentTime + 0.05;
      const totalDuration = 2.4; // 2.4s total glide duration

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.exponentialRampToValueAtTime(0.2, startTime + 0.08);

      points.forEach((pt) => {
        const tOffset = pt.t * totalDuration;
        const targetFreq = baseFreq * Math.pow(2, pt.st / 12);
        osc.frequency.setTargetAtTime(targetFreq, startTime + tOffset, 0.04);
      });

      // Smooth fade out
      gain.gain.setValueAtTime(0.2, startTime + totalDuration - 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + totalDuration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + totalDuration);

      setIsPlayingHumming(true);
      setPlayingTrackType(trackType);

      osc.onended = () => {
        setIsPlayingHumming(false);
        setPlayingTrackType(null);
        try { ctx.close(); } catch {}
      };
    } catch (e) {
      console.error('Humming Synth error:', e);
      setIsPlayingHumming(false);
      setPlayingTrackType(null);
    }
  };

  const stopHumming = () => {
    if (activeOscRef.current) {
      try {
        activeOscRef.current.stop();
        activeOscRef.current.disconnect();
      } catch {}
      activeOscRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      try { audioCtxRef.current.close(); } catch {}
      audioCtxRef.current = null;
    }
    setIsPlayingHumming(false);
    setPlayingTrackType(null);
  };

  useEffect(() => {
    return () => stopHumming();
  }, []);

  // Helper to convert point array to SVG path string
  // Canvas viewport: 1000 width, 220 height
  // Semitone range: +6 st (y=20) to -6 st (y=200). Baseline 0 st is at y=110.
  const semitoneToY = (st) => {
    const clamped = Math.max(-6, Math.min(6, st));
    // 0st -> 110, +6st -> 20, -6st -> 200
    return 110 - (clamped * 15);
  };

  const pointsToSvgPath = (points) => {
    if (!points || points.length === 0) return '';
    return points.reduce((acc, pt, idx) => {
      const x = 30 + pt.t * 940;
      const y = semitoneToY(pt.st);
      if (idx === 0) return `M ${x.toFixed(1)} ${y.toFixed(1)}`;
      return `${acc} L ${x.toFixed(1)} ${y.toFixed(1)}`;
    }, '');
  };

  const pointsToAreaPath = (points) => {
    if (!points || points.length === 0) return '';
    const linePath = pointsToSvgPath(points);
    const lastX = (30 + points[points.length - 1].t * 940).toFixed(1);
    const firstX = (30 + points[0].t * 940).toFixed(1);
    return `${linePath} L ${lastX} 210 L ${firstX} 210 Z`;
  };

  const currentBenchmark = SENTENCE_PITCH_BENCHMARKS[selectedSentenceId] || SENTENCE_PITCH_BENCHMARKS['sent_yes_no_01'];

  return (
    <section className="w-full bg-white rounded-xl p-4 md:p-6 shadow-sm border border-slate-200/90 relative">
      {/* Header & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-600 text-2xl">graphic_eq</span>
            <h3 className="font-bold text-slate-800 text-lg md:text-xl">
              Đường Cong Cao Độ &amp; Ngữ Điệu Suprasegmental (ELSA-203)
            </h3>
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Semitone Normalized
            </span>
          </div>
          <p className="text-slate-500 text-sm mt-0.5">
            Theo dõi đường cong ngữ điệu câu (Pitch Contour) chuẩn hóa thang Bán Âm (Semitone) loại bỏ khác biệt giọng nam/nữ
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="w-4 h-0.5 bg-sky-600 border-b-2 border-dashed border-sky-600"></span>
            <span className="text-sky-800 font-bold">Giọng Mẫu Chuẩn (General US)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-1 bg-amber-500 rounded"></span>
            <span className="text-amber-800 font-bold">Giọng Của Bạn</span>
          </div>
        </div>
      </div>

      {/* Benchmark Sentence Switcher */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-1">Câu luyện tập:</span>
        {Object.values(SENTENCE_PITCH_BENCHMARKS).map((bench) => (
          <button
            key={bench.id}
            onClick={() => handleSelectSentence(bench.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedSentenceId === bench.id
                ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-200 font-semibold'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {bench.type === 'yes_no_question' && '❓ Yes/No: '}
            {bench.type === 'wh_question' && '🔍 Wh-: '}
            {bench.type === 'statement' && '💬 Trần thuật: '}
            "{bench.text.length > 28 ? bench.text.slice(0, 28) + '...' : bench.text}"
          </button>
        ))}
      </div>

      {/* Target Pitch Direction Banner & Humming Synth Controls */}
      <div className="mt-4 bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Terminal Tone Badge */}
          <div
            className={`px-3 py-1.5 rounded-lg border flex items-center gap-2 text-xs font-bold ${
              evaluation.isTerminalCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-rose-50 border-rose-300 text-rose-800 animate-pulse'
            }`}
          >
            <span className="material-symbols-outlined text-base">
              {evaluation.targetTerminalTone === 'rise' ? 'trending_up' : 'trending_down'}
            </span>
            <span>
              {evaluation.isTerminalCorrect
                ? `Đạt chuẩn kết thúc (${evaluation.userTerminalTone.toUpperCase()} ${evaluation.terminalDeltaSemitones >= 0 ? '+' : ''}${evaluation.terminalDeltaSemitones} st)`
                : `Lỗi ngữ điệu cuối câu (${evaluation.userTerminalTone.toUpperCase()} ${evaluation.terminalDeltaSemitones >= 0 ? '+' : ''}${evaluation.terminalDeltaSemitones} st)`}
            </span>
          </div>

          <div className="text-xs text-slate-600">
            Điểm tương đồng giai điệu: <strong className="text-indigo-600 text-sm">{evaluation.melodySimilarityScore}%</strong>
          </div>
        </div>

        {/* Humming Synth Button (AC 3) & L1 Trap Simulation */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={() => playHummingMelody(evaluation.nativePoints, 'native')}
            disabled={isPlayingHumming}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isPlayingHumming && playingTrackType === 'native'
                ? 'bg-sky-600 text-white animate-pulse'
                : 'bg-sky-100 text-sky-800 hover:bg-sky-200 border border-sky-300'
            }`}
            title="Nghe chuỗi âm huýt sáo không lời mô phỏng đường cong chuẩn"
          >
            <span className="material-symbols-outlined text-base">music_note</span>
            {isPlayingHumming && playingTrackType === 'native' ? 'Đang phát Humming mẫu...' : '🎵 Giai Điệu Mẫu (Humming)'}
          </button>

          <button
            onClick={() => playHummingMelody(evaluation.userPoints, 'user')}
            disabled={isPlayingHumming}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isPlayingHumming && playingTrackType === 'user'
                ? 'bg-amber-600 text-white animate-pulse'
                : 'bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300'
            }`}
            title="Nghe giai điệu ngữ điệu của người học"
          >
            <span className="material-symbols-outlined text-base">volume_up</span>
            {isPlayingHumming && playingTrackType === 'user' ? 'Đang phát Humming bạn...' : '🎵 Giai Điệu Của Bạn'}
          </button>

          {isPlayingHumming && (
            <button
              onClick={stopHumming}
              className="px-2 py-1.5 rounded-lg text-xs bg-rose-100 text-rose-700 hover:bg-rose-200 border border-rose-300 font-semibold"
            >
              Dừng
            </button>
          )}

          {/* L1 Trap Simulation Toggle */}
          <button
            onClick={handleToggleL1Trap}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              isSimulatingL1Trap
                ? 'bg-rose-600 text-white border-rose-600 font-semibold'
                : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
            }`}
          >
            {isSimulatingL1Trap ? '⚠️ Bẫy L1 Đang Bật' : 'Thử Bẫy L1 Hạ Giọng'}
          </button>
        </div>
      </div>

      {/* High-Fidelity SVG Acoustic Intonation Canvas */}
      <div className="relative w-full h-72 bg-slate-900/95 border border-slate-800 rounded-xl overflow-hidden p-2 mt-4 shadow-inner">
        {/* Frequency Semitone and Time Axis Labels */}
        <div className="absolute left-2.5 top-2.5 bottom-7 flex flex-col justify-between font-mono text-[10px] text-slate-400 select-none pointer-events-none font-semibold">
          <span>+6 st (~255Hz)</span>
          <span>+3 st (~215Hz)</span>
          <span className="text-emerald-400 font-bold">0 st (F0 Median: {evaluation.userMedianF0}Hz)</span>
          <span>-3 st (~150Hz)</span>
          <span>-6 st (~125Hz)</span>
        </div>
        <div className="absolute bottom-1.5 left-28 right-6 flex justify-between font-mono text-[10px] text-slate-400 select-none pointer-events-none font-semibold">
          <span>0.0s</span>
          <span>0.6s</span>
          <span>1.2s</span>
          <span>1.8s</span>
          <span>2.4s</span>
        </div>

        {/* Sub-grid & Curves */}
        <svg className="w-full h-full pl-24 pb-6 pr-4 pt-3" preserveAspectRatio="none" viewBox="0 0 1000 220">
          <defs>
            <linearGradient id="userPitchGlowMelody" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="nativePitchGlowMelody" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Semitone Reference Gridlines */}
          {showGrid && (
            <>
              <line stroke="#334155" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="1000" y1="20" y2="20" />
              <line stroke="#334155" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="1000" y1="65" y2="65" />
              <line stroke="#10b981" strokeDasharray="4 4" strokeWidth="1.5" strokeOpacity="0.6" x1="0" x2="1000" y1="110" y2="110" />
              <line stroke="#334155" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="1000" y1="155" y2="155" />
              <line stroke="#334155" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="1000" y1="200" y2="200" />
            </>
          )}

          {/* Word Alignment Timeline Slices at the Bottom */}
          <g className="font-mono text-[10px] fill-slate-300 font-semibold select-none">
            {currentBenchmark.words.map((w, idx) => {
              const xPos = 30 + ((w.startSec / 2.4) * 940);
              return (
                <text key={idx} x={xPos} y="215">
                  {w.text}
                </text>
              );
            })}
          </g>

          {/* Area beneath Native Reference Pitch */}
          <path d={pointsToAreaPath(evaluation.nativePoints)} fill="url(#nativePitchGlowMelody)" />

          {/* Native Reference Pitch Curve: Vibrant Electric Cyan dashed curve */}
          <path
            d={pointsToSvgPath(evaluation.nativePoints)}
            fill="none"
            stroke="#38bdf8"
            strokeDasharray="6 4"
            strokeLinecap="round"
            strokeWidth="3"
          />

          {/* Area beneath Learner Pitch */}
          <path d={pointsToAreaPath(evaluation.userPoints)} fill="url(#userPitchGlowMelody)" />

          {/* Learner Pitch Curve: Amber / Gold Curve */}
          <path
            d={pointsToSvgPath(evaluation.userPoints)}
            fill="none"
            stroke={evaluation.isTerminalCorrect ? '#f59e0b' : '#f43f5e'}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.5"
          />
        </svg>
      </div>

      {/* Pedagogical Guidance & L1 Diagnostic Alert */}
      <div className="mt-4 flex flex-col md:flex-row gap-3">
        <div className={`p-3.5 rounded-xl border flex-1 ${
          evaluation.l1ToneTrap
            ? 'bg-rose-50 border-rose-200 text-rose-900'
            : 'bg-indigo-50/60 border-indigo-100 text-slate-800'
        }`}>
          <div className="flex items-center gap-2 font-bold text-sm">
            <span className="material-symbols-outlined text-base">
              {evaluation.l1ToneTrap ? 'warning' : 'tips_and_updates'}
            </span>
            <span>{evaluation.l1ToneTrap ? 'Cảnh Báo Lỗi Ngữ Điệu Tiếng Việt (L1)' : 'Nhận Xét Sư Phạm & Giai Điệu'}</span>
          </div>
          <p className="text-xs mt-1 leading-relaxed">{evaluation.feedback}</p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 flex-1">
          <div className="flex items-center gap-2 font-bold text-sm text-slate-800">
            <span className="material-symbols-outlined text-base text-indigo-600">psychology</span>
            <span>Quy Tắc Ngữ Điệu (Sentence Melody Rule)</span>
          </div>
          <p className="text-xs mt-1 leading-relaxed">{evaluation.pedagogicalTip}</p>
        </div>
      </div>
    </section>
  );
}
