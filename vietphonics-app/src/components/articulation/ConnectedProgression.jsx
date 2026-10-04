import React, { useState, useEffect, useCallback } from 'react';
import {
  CONNECTED_PROGRESSIONS,
  evaluateProgressionStep
} from '../../lib/scoring/connectedProgression';

export default function ConnectedProgression({
  initialProgressionId = 'prog_breathe'
}) {
  const [selectedProgId, setSelectedProgId] = useState(initialProgressionId);
  const track = CONNECTED_PROGRESSIONS[selectedProgId] || CONNECTED_PROGRESSIONS.prog_breathe;

  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [stepScores, setStepScores] = useState({ 0: 92, 1: 0, 2: 0 }); // Step 0 passed by default
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [isSimulatingDegradation, setIsSimulatingDegradation] = useState(false);

  const currentStep = track.steps[currentStepIdx] || track.steps[0];

  // Re-run evaluation when step or degradation simulation changes
  useEffect(() => {
    const baseline = currentStepIdx > 0 ? (stepScores[currentStepIdx - 1] || 90) : null;
    let score = stepScores[currentStepIdx] || (currentStepIdx === 0 ? 92 : 0);

    if (isSimulatingDegradation && currentStepIdx > 0) {
      score = 72; // simulated 18% drop from 90 baseline
    }

    const evalResult = evaluateProgressionStep({
      progressionId: selectedProgId,
      stepIndex: currentStepIdx,
      score,
      baselineScore: baseline
    });

    setEvaluation(evalResult);
  }, [currentStepIdx, selectedProgId, stepScores, isSimulatingDegradation]);

  // Audio Playback
  const playStepAudio = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setIsPlayingAudio(true);

    const utterance = new SpeechSynthesisUtterance(currentStep.text);
    utterance.lang = 'en-US';
    utterance.rate = currentStep.type === 'sentence' ? 0.9 : 0.85;
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  }, [currentStep.text, currentStep.type]);

  // Auto Advance (AC 4)
  const advanceToNextStep = useCallback(() => {
    if (currentStepIdx < track.steps.length - 1) {
      setCurrentStepIdx(prev => prev + 1);
    }
  }, [currentStepIdx, track.steps.length]);

  // Global Enter Key Handler for Auto-Advance (AC 4)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key === 'Enter') {
        e.preventDefault();
        if (evaluation && evaluation.isPassed && currentStepIdx < track.steps.length - 1) {
          advanceToNextStep();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [evaluation, currentStepIdx, advanceToNextStep, track.steps.length]);

  // Handle Practice Submit
  const handlePracticeSubmit = async (scoreToSubmit) => {
    const prevScore = currentStepIdx > 0 ? stepScores[currentStepIdx - 1] : null;

    setStepScores(prev => ({
      ...prev,
      [currentStepIdx]: scoreToSubmit
    }));

    try {
      const res = await fetch('/api/v1/practice/progression-tier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          progressionId: selectedProgId,
          stepIndex: currentStepIdx,
          score: scoreToSubmit,
          baselineScore: prevScore
        })
      });

      if (res.ok) {
        const data = await res.json();
        setEvaluation(data.evaluation);
      }
    } catch {
      // Fallback local eval
    }
  };

  return (
    <section className="w-full bg-white rounded-2xl p-space-md md:p-space-lg shadow-sm border border-slate-200/90 relative overflow-hidden transition-all">
      {/* Decorative ambient blur */}
      <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-indigo-100/40 blur-[60px] pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-space-sm gap-3 border-b border-slate-100 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-label-mono text-label-mono uppercase text-indigo-700 font-bold tracking-wider">
              PRON-206 · Connected Speech Positional Progression
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-label-mono bg-indigo-100 text-indigo-800 font-bold">
              Word ➔ Phrase ➔ Sentence
            </span>
          </div>
          <h3 className="text-heading-md font-bold text-slate-900 mt-1">
            Nâng Cấp Từ Đơn Lên Cụm Từ &amp; Câu Giao Tiếp Tự Nhiên
          </h3>
          <p className="text-body-sm text-slate-500">
            Bảo toàn âm vị trong luồng lời nói liên tục; cảnh báo hiện tượng rụng âm khi câu nói dài hơn.
          </p>
        </div>

        {/* Enter Key Instruction Badge */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <span className="text-slate-400 font-mono text-xs hidden sm:inline">Phím tắt:</span>
          <kbd className="px-2 py-1 rounded bg-slate-900 text-white font-mono text-xs font-bold shadow-xs">
            Enter ↵ để tiếp tục
          </kbd>
        </div>
      </div>

      {/* Track Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 mt-4 pt-1">
        {Object.values(CONNECTED_PROGRESSIONS).map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => {
              setSelectedProgId(p.id);
              setCurrentStepIdx(0);
              setStepScores({ 0: 92, 1: 0, 2: 0 });
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 border ${
              selectedProgId === p.id
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            <span className="font-ipa-inline font-bold px-1.5 py-0.5 rounded bg-white/20 text-white">
              {p.targetPhoneme}
            </span>
            <span>{p.steps[0].text}</span>
            <span className="text-[10px] opacity-75">({p.targetName})</span>
          </button>
        ))}
      </div>

      {/* 3-Pill Stepper Indicator (AC 2) */}
      <div className="flex items-center justify-between gap-2 mt-5 p-2 bg-slate-50 border border-slate-200 rounded-2xl overflow-x-auto">
        {track.steps.map((st, sIdx) => {
          const isCompleted = (stepScores[sIdx] || 0) >= 80;
          const isActive = currentStepIdx === sIdx;
          const isLocked = sIdx > 0 && (stepScores[sIdx - 1] || 0) < 80;

          return (
            <button
              key={st.type}
              type="button"
              disabled={isLocked}
              onClick={() => setCurrentStepIdx(sIdx)}
              className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border ${
                isActive
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm ring-2 ring-indigo-200'
                  : isCompleted
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100/70'
                  : 'bg-white text-slate-400 border-slate-200 cursor-not-allowed'
              }`}
            >
              {isCompleted ? (
                <span className="material-symbols-outlined text-sm text-emerald-600">check_circle</span>
              ) : isLocked ? (
                <span className="material-symbols-outlined text-sm text-slate-400">lock</span>
              ) : (
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              )}
              <span>{st.label}</span>
              {stepScores[sIdx] > 0 && (
                <span className="text-[10px] font-mono opacity-80">({stepScores[sIdx]}%)</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Step Prompt Reading Canvas (AC 1) */}
      <div className="mt-5 p-6 bg-gradient-to-br from-indigo-50/40 via-white to-sky-50/30 rounded-2xl border border-indigo-100 relative">
        <div className="flex items-center justify-between mb-3 text-xs text-slate-500 font-label-mono">
          <span className="text-indigo-800 font-bold uppercase tracking-wider">
            Bước {currentStepIdx + 1}/3: {currentStep.label}
          </span>
          <span className="text-slate-400 font-mono">
            Mục tiêu: {track.targetPhoneme}
          </span>
        </div>

        {/* Main Text Display with highlighted phoneme */}
        <div className="text-2xl md:text-3xl font-serif text-slate-900 font-semibold leading-relaxed py-2 flex items-baseline flex-wrap gap-2">
          <span>"{currentStep.text}"</span>
          <span className="text-base font-ipa-inline font-normal text-indigo-700 font-sans">
            {currentStep.ipa}
          </span>
        </div>

        <p className="text-xs text-slate-600 mt-1">
          💡 {currentStep.description}
        </p>

        {/* Audio Speaker & Practice Controls */}
        <div className="mt-5 pt-4 border-t border-indigo-100/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={playStepAudio}
              disabled={isPlayingAudio}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-xs active:scale-95 disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-base">
                {isPlayingAudio ? 'graphic_eq' : 'volume_up'}
              </span>
              <span>{isPlayingAudio ? 'Đang phát...' : 'Nghe Phát Âm Chuẩn'}</span>
            </button>

            {/* Practice / Record Button */}
            <button
              type="button"
              onClick={() => handlePracticeSubmit(88)}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center gap-2 shadow-2xs active:scale-95"
            >
              <span className="material-symbols-outlined text-base text-rose-600">mic</span>
              <span>Đọc Thu Âm &amp; Chấm Điểm</span>
            </button>
          </div>

          {/* Advance Button (AC 4) */}
          {evaluation && evaluation.isPassed && currentStepIdx < track.steps.length - 1 && (
            <button
              type="button"
              onClick={advanceToNextStep}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95 animate-pulse"
            >
              <span>Tiếp Tục Bước Kế (Enter)</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          )}
        </div>
      </div>

      {/* Degradation Alert Banner (AC 3) */}
      {evaluation && evaluation.hasDegradation && (
        <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 flex items-start gap-3">
          <span className="material-symbols-outlined text-amber-600 text-2xl shrink-0 mt-0.5">
            trending_down
          </span>
          <div className="space-y-1 text-xs">
            <h4 className="font-bold text-amber-950 text-sm">
              Cảnh báo suy hao độ chuẩn xác (Degradation Alert)!
            </h4>
            <p className="text-amber-800 leading-relaxed">
              {evaluation.degradationAlert}
            </p>
          </div>
        </div>
      )}

      {/* QA / Demo Simulation Switcher */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="font-medium">Mô phỏng kiểm thử QA:</span>
        <button
          type="button"
          onClick={() => setIsSimulatingDegradation(!isSimulatingDegradation)}
          className={`px-3 py-1 rounded-md font-bold transition-all ${
            isSimulatingDegradation
              ? 'bg-amber-600 text-white shadow-2xs'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          {isSimulatingDegradation ? 'Mô phỏng suy hao (>15% drop): Bật' : 'Giọng đọc chuẩn: Bật'}
        </button>
      </div>
    </section>
  );
}
