import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { getDailyPathCurriculum, processStepCompletion } from '../../lib/scoring/dailyPersonalizedPath';

export default function DailyPathCard() {
  const { dialect, incrementStreak } = useApp();
  const [curriculum, setCurriculum] = useState(() => getDailyPathCurriculum(dialect));
  const [completedSteps, setCompletedSteps] = useState(0);
  const [currentStepOrder, setCurrentStepOrder] = useState(1);
  const [remainingMinutes, setRemainingMinutes] = useState(10);
  const [loading, setLoading] = useState(false);
  const [stepCompleteToast, setStepCompleteToast] = useState(null);

  // Load from backend on mount and when dialect changes
  useEffect(() => {
    const fetchDailyPath = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/v1/curriculum/daily-path?dialect=${dialect}`);
        const data = await res.json();
        if (data.success) {
          setCompletedSteps(data.completedSteps);
          setCurrentStepOrder(data.currentStepOrder);
          setRemainingMinutes(data.remainingMinutes);
          if (data.curriculum) {
            setCurriculum(data.curriculum);
          }
        }
      } catch (err) {
        console.error('Failed to load daily path:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDailyPath();
  }, [dialect]);

  const playTTS = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCompleteStep = async () => {
    const nextOrder = currentStepOrder;
    try {
      const res = await fetch('/api/v1/curriculum/step-complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stepOrder: nextOrder })
      });
      const data = await res.json();
      if (data.success) {
        setCompletedSteps(data.completedSteps);
        setCurrentStepOrder(data.currentStepOrder);
        setRemainingMinutes(data.remainingMinutes);
        setStepCompleteToast(`Xuất sắc! Đã hoàn thành Bước ${nextOrder}!`);
        incrementStreak();
        setTimeout(() => setStepCompleteToast(null), 3000);
      }
    } catch (err) {
      // Fallback local calc
      const local = processStepCompletion({
        currentCompletedSteps: completedSteps,
        targetOrder: nextOrder,
        totalSteps: 5
      });
      setCompletedSteps(local.completedSteps);
      setCurrentStepOrder(local.nextStepOrder);
      setRemainingMinutes(local.remainingMinutes);
    }
  };

  const currentStep = curriculum.steps.find((s) => s.order === currentStepOrder) || curriculum.steps[0];
  const isAllDone = completedSteps >= 5;

  return (
    <div
      className="w-full bg-white border border-slate-200/90 rounded-2xl shadow-[0_4px_20px_rgba(15,23,42,0.04)] p-5 md:p-6 flex flex-col justify-between relative overflow-hidden"
      data-testid="daily-path-card"
    >
      {/* Background ambient radial highlight */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-50/60 rounded-full blur-3xl pointer-events-none" />

      {/* Header with Title and Countdown Timer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-2xl">route</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-label-mono text-[11px] text-emerald-700 font-bold uppercase tracking-wider">
                Lộ Trình Tối Ưu 10 Phút ({curriculum.dialectName})
              </span>
            </div>
            <h3 className="font-headline-md text-base md:text-lg font-bold text-slate-900 mt-0.5">
              Hành Trình Tinh Chỉnh Phản Xạ Hôm Nay
            </h3>
          </div>
        </div>

        {/* Countdown Badge (AC 2) */}
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 font-label-mono text-xs font-bold text-slate-700 shrink-0 self-start sm:self-auto"
          data-testid="countdown-timer-badge"
        >
          <span className="material-symbols-outlined text-base text-emerald-600">timer</span>
          <span>{isAllDone ? 'Hoàn Thành 10/10 Phút' : `⏱️ Còn ${remainingMinutes} phút`}</span>
        </div>
      </div>

      {/* Toast Feedback */}
      {stepCompleteToast && (
        <div className="mb-4 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <span className="material-symbols-outlined text-emerald-600 text-base">verified</span>
          <span>{stepCompleteToast}</span>
        </div>
      )}

      {/* Pill Stepper Progress Bar (AC 1 & AC 2) */}
      <div className="mb-6 space-y-2">
        <div className="flex items-center justify-between text-xs font-label-mono text-slate-500 mb-1.5 font-semibold">
          <span>Tiến trình 5 Chặng Micro-Learning:</span>
          <span className="text-emerald-700 font-bold">{completedSteps}/5 Bước Đã Hoàn Thành</span>
        </div>

        {/* 5-Segment Pill Stepper */}
        <div className="grid grid-cols-5 gap-2" data-testid="pill-stepper">
          {curriculum.steps.map((step) => {
            const isCompleted = step.order <= completedSteps;
            const isCurrent = step.order === currentStepOrder && !isAllDone;

            return (
              <div
                key={step.order}
                className={`h-3 rounded-full transition-all duration-500 relative flex items-center justify-center ${
                  isCompleted
                    ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                    : isCurrent
                    ? 'bg-sky-400 animate-pulse ring-2 ring-sky-200'
                    : 'bg-slate-200'
                }`}
                title={`Bước ${step.order}: ${step.title}`}
                data-testid={`pill-step-${step.order}`}
              />
            );
          })}
        </div>
      </div>

      {/* Active Step Presentation Card */}
      {!isAllDone ? (
        <div className="p-4 md:p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50/30 border border-slate-200/90 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-label-mono text-[11px] font-bold">
                BƯỚC {currentStep.order}/5 • {currentStep.title}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-label-mono text-[11px]">
                {currentStep.durationMin} phút
              </span>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <span className="text-lg md:text-xl font-headline-md font-bold text-slate-900">
                "{currentStep.targetWord}"
              </span>
              <span className="px-2 py-0.5 rounded-lg bg-sky-100 text-sky-800 font-mono text-xs font-bold">
                {currentStep.phoneme}
              </span>
              <button
                type="button"
                onClick={() => playTTS(currentStep.targetWord)}
                className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-indigo-600 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                title="Nghe mẫu phát âm"
                data-testid="play-step-tts"
              >
                <span className="material-symbols-outlined text-base">volume_up</span>
              </button>
            </div>

            <p className="text-xs text-slate-600 flex items-center gap-1.5 pt-1">
              <span className="material-symbols-outlined text-amber-500 text-sm">lightbulb</span>
              <span><strong className="text-slate-800">Lý do điều chỉnh L1:</strong> {currentStep.trapReason}</span>
            </p>
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center mb-6 space-y-2">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-2xl font-bold">celebration</span>
          </div>
          <h4 className="font-headline-md text-base font-bold text-emerald-900">
            Tuyệt Vời! Bạn Đã Hoàn Thành Lộ Trình 10 Phút Hôm Nay!
          </h4>
          <p className="text-xs text-emerald-700">
            Chuỗi ngày học liên tục được duy trì. Hãy tiếp tục bảo vệ streak vào ngày mai nhé!
          </p>
        </div>
      )}

      {/* Mobile Thumb Zone Action Button (AC 4) */}
      <div className="w-full">
        {!isAllDone ? (
          <button
            type="button"
            onClick={handleCompleteStep}
            className="w-full min-h-[52px] h-[52px] rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-headline-sm text-sm font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            data-testid="start-next-step-btn"
          >
            <span className="material-symbols-outlined text-xl">play_circle</span>
            <span>BẮT ĐẦU BƯỚC {currentStepOrder} NGAY ({currentStep.durationMin} PHÚT)</span>
          </button>
        ) : (
          <div
            className="w-full min-h-[52px] h-[52px] rounded-2xl bg-emerald-100 text-emerald-800 font-headline-sm text-sm font-bold flex items-center justify-center gap-2"
            data-testid="all-steps-completed-badge"
          >
            <span className="material-symbols-outlined text-xl">check_circle</span>
            <span>100% HOÀN THÀNH LỘ TRÌNH HÔM NAY</span>
          </div>
        )}
      </div>
    </div>
  );
}
