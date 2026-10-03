import React, { useState, useEffect } from 'react';
import { SYLLABLE_STRESS_WORDS, evaluateSyllableStress } from '../../lib/scoring/syllableStress';

/**
 * ELSA-202: Syllable Stress & Capitalized Word Emphasis Evaluator
 * Features:
 * - AC 1: Syllable Bubbles display (Stressed ~72px glowing vs Unstressed ~42px)
 * - AC 2: Three Pillars Table (Duration ratio, Volume dB, Pitch Hz)
 * - AC 3: Vietnamese L1 "Dấu Sắc" tone trap pedagogical alert
 * - AC 4: Keyboard shortcuts 1, 2, 3, 4 for isolated syllable audio playback
 */
export default function SyllableStressVisualizer({
  initialWord = 'photography',
  onClose
}) {
  const [selectedWord, setSelectedWord] = useState(initialWord);
  const [userStressIndex, setUserStressIndex] = useState(1);
  const [userDurationMs, setUserDurationMs] = useState(275);
  const [activeSyllableIndex, setActiveSyllableIndex] = useState(null);

  const evaluation = evaluateSyllableStress({
    word: selectedWord,
    userStressIndex,
    userStressedDurationMs: userDurationMs
  });

  // Play isolated syllable or full word
  const playSyllableAudio = (text, rate = 0.85) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = rate;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleIsolateSyllable = (idx) => {
    if (idx >= 0 && idx < evaluation.syllables.length) {
      setActiveSyllableIndex(idx);
      const syl = evaluation.syllables[idx];
      playSyllableAudio(syl.text, 0.8);
      setTimeout(() => setActiveSyllableIndex(null), 1000);
    }
  };

  // AC 4: Keyboard listener for keys '1', '2', '3', '4'
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= evaluation.syllables.length) {
        e.preventDefault();
        handleIsolateSyllable(num - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedWord, evaluation.syllables]);

  return (
    <div className="w-full bg-white rounded-xl p-5 shadow-sm border border-slate-200 space-y-5">
      {/* Header & Word Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-600 text-lg">bubble_chart</span>
            ELSA-202: Giám Định Trọng Âm Tiết (Syllable Stress Bubbles)
          </h3>
          <p className="text-xs text-slate-500">
            Quy luật 3 Trụ Cột: Âm mang trọng âm phải <strong>To hơn - Dài hơn - Cao hơn</strong>
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {Object.keys(SYLLABLE_STRESS_WORDS).map((w) => (
            <button
              key={w}
              type="button"
              onClick={() => {
                setSelectedWord(w);
                const target = SYLLABLE_STRESS_WORDS[w];
                setUserStressIndex(target.primaryStressIndex);
                setUserDurationMs(275);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${
                selectedWord === w
                  ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      {/* AC 1: Syllable Bubbles Display */}
      <div className="py-6 px-4 bg-slate-900 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
        {/* Helper guide */}
        <div className="absolute top-2 left-3 text-[11px] text-slate-400 font-mono">
          Bấm phím <kbd className="px-1.5 py-0.5 bg-slate-800 text-white rounded border border-slate-700">1</kbd> - <kbd className="px-1.5 py-0.5 bg-slate-800 text-white rounded border border-slate-700">{evaluation.syllables.length}</kbd> để cô lập nghe riêng âm tiết
        </div>

        <div className="text-center mb-4 mt-2">
          <span className="text-xs text-indigo-400 font-mono font-bold tracking-widest uppercase">
            IPA CHUẨN: {evaluation.ipa}
          </span>
        </div>

        {/* Bubbles Row */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 my-2">
          {evaluation.syllables.map((syl, idx) => {
            const isStressed = syl.isStressed;
            const isTarget = idx === evaluation.primaryStressIndex;
            const isCurrentPlaying = activeSyllableIndex === idx;

            // Stressed Bubble: ~72px glowing, Unstressed: ~42px muted
            const bubbleSize = isStressed
              ? 'w-20 h-20 text-lg shadow-[0_0_25px_rgba(99,102,241,0.6)] ring-4 ring-indigo-400/50 bg-gradient-to-br from-indigo-500 to-purple-600 font-extrabold text-white scale-110'
              : 'w-12 h-12 text-xs bg-slate-800 border border-slate-700 text-slate-300 font-medium hover:bg-slate-700';

            return (
              <div key={`syl-${idx}`} className="flex flex-col items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleIsolateSyllable(idx)}
                  title={`Âm tiết ${idx + 1}: /${syl.text}/. Bấm phím ${idx + 1} để nghe riêng.`}
                  className={`rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer relative ${bubbleSize} ${
                    isCurrentPlaying ? 'scale-125 ring-4 ring-rose-400' : ''
                  }`}
                >
                  <span>{syl.text}</span>
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-700 text-[10px] font-mono font-bold text-white flex items-center justify-center border border-slate-600">
                    {idx + 1}
                  </span>
                </button>
                <span className="text-[10px] font-mono text-slate-400">
                  {syl.durationMs}ms
                </span>
                {isTarget && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-indigo-500/20 text-indigo-300 font-bold uppercase tracking-wider">
                    Trọng âm
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Listen Full Word buttons */}
        <div className="flex items-center gap-3 mt-4">
          <button
            type="button"
            onClick={() => playSyllableAudio(selectedWord, 0.9)}
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">volume_up</span>
            Nghe toàn từ 1.0x
          </button>
          <button
            type="button"
            onClick={() => playSyllableAudio(selectedWord, 0.55)}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors border border-slate-700"
          >
            <span className="material-symbols-outlined text-sm">slow_motion_video</span>
            Nghe chậm 0.5x
          </button>
        </div>
      </div>

      {/* AC 2: Three Pillars Comparison Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Ba Trụ Cột Âm Học (The Three Pillars of Stress):
          </span>
          <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
            evaluation.score >= 85 ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
            evaluation.score >= 60 ? 'bg-amber-100 text-amber-800 border-amber-300' :
            'bg-rose-100 text-rose-800 border-rose-300'
          }`}>
            {evaluation.score}% GOP — {evaluation.statusLabel}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Pillar 1: Duration Ratio */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
              <span>1. Thời lượng (Duration)</span>
              <span className="material-symbols-outlined text-sm text-indigo-600">hourglass_top</span>
            </div>
            <div className="text-xl font-extrabold text-slate-900 font-mono">
              {evaluation.threePillars.durationRatio}x
            </div>
            <span className="text-[11px] text-slate-500 mt-1">
              Mục tiêu: ≥ {evaluation.threePillars.targetDurationRatio}x (Ngân dài hơn âm phụ)
            </span>
          </div>

          {/* Pillar 2: Volume Delta */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
              <span>2. Độ to (Volume)</span>
              <span className="material-symbols-outlined text-sm text-sky-600">volume_up</span>
            </div>
            <div className="text-xl font-extrabold text-slate-900 font-mono">
              +{evaluation.threePillars.volumeDeltaDb} dB
            </div>
            <span className="text-[11px] text-slate-500 mt-1">
              Mục tiêu: +{evaluation.threePillars.targetVolumeDeltaDb} dB (Phát âm to rõ ràng)
            </span>
          </div>

          {/* Pillar 3: Pitch Delta */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
              <span>3. Cao độ (Pitch)</span>
              <span className="material-symbols-outlined text-sm text-purple-600">tune</span>
            </div>
            <div className="text-xl font-extrabold text-slate-900 font-mono">
              +{evaluation.threePillars.pitchDeltaHz} Hz
            </div>
            <span className="text-[11px] text-slate-500 mt-1">
              Mục tiêu: +{evaluation.threePillars.targetPitchDeltaHz} Hz (Tông cao tự nhiên)
            </span>
          </div>
        </div>
      </div>

      {/* AC 3: Vietnamese L1 Tone Warning ("Dấu Sắc" Alert) */}
      {evaluation.l1ToneTrap ? (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-300 text-rose-900 space-y-1 animate-pulse">
          <div className="flex items-center gap-2 font-bold text-xs">
            <span className="material-symbols-outlined text-sm text-rose-600">warning</span>
            Cảnh báo thói quen L1: Bạn đang thêm "Dấu Sắc" tiếng Việt!
          </div>
          <p className="text-xs leading-relaxed">
            {evaluation.pedagogicalAdvice}
          </p>
        </div>
      ) : (
        <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-200 text-indigo-900 text-xs flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="material-symbols-outlined text-sm text-indigo-600">lightbulb</span>
            {evaluation.pedagogicalAdvice}
          </span>
          {/* Quick toggle to simulate L1 Tone Trap */}
          <button
            type="button"
            onClick={() => setUserDurationMs(userDurationMs < 130 ? 275 : 95)}
            className="text-[11px] font-bold text-indigo-700 hover:underline shrink-0 ml-2"
          >
            {userDurationMs < 130 ? '↺ Thử chuẩn To-Dài-Cao' : '⚡ Thử bẫy Dấu Sắc'}
          </button>
        </div>
      )}
    </div>
  );
}
