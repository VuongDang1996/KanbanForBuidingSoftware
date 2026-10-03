import React, { useState, useEffect, useRef, useCallback } from 'react';
import { DICTATION_EXERCISES, evaluateDictationSubmission } from '../../lib/scoring/audioDictation';

export default function AudioDictationCard({
  initialExerciseId = 'dic_01',
  onSubmissionSuccess
}) {
  const [selectedExerciseId, setSelectedExerciseId] = useState(initialExerciseId);
  const exercise = DICTATION_EXERCISES[selectedExerciseId] || DICTATION_EXERCISES.dic_01;

  const [userAnswers, setUserAnswers] = useState({});
  const [evaluation, setEvaluation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // References for inputs
  const inputRefs = useRef({});

  // Reset inputs when exercise changes
  useEffect(() => {
    setUserAnswers({});
    setEvaluation(null);
    setIsPlaying(false);
  }, [selectedExerciseId]);

  // Audio speech synthesis player (AC 2)
  const playAudio = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(exercise.audioText);
    utterance.lang = 'en-US';
    utterance.rate = playbackRate;
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  }, [exercise.audioText, playbackRate]);

  const stopAudio = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      playAudio();
    }
  };

  // Keyboard navigation: J to replay/rewind, K to play/pause (AC 2)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Allow J and K outside of inputs
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key === 'j' || e.key === 'J') {
        e.preventDefault();
        playAudio();
      } else if (e.key === 'k' || e.key === 'K') {
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playAudio, isPlaying]);

  // Handle Input Change & Auto-Focus next gap (AC 1)
  const handleInputChange = (gapId, val, gapIndex) => {
    setUserAnswers((prev) => ({
      ...prev,
      [gapId]: val
    }));

    // If typed value matches target length, jump to next gap
    const targetLength = exercise.gaps[gapIndex]?.target.length || 1;
    if (val.trim().length >= targetLength && gapIndex < exercise.gaps.length - 1) {
      const nextGapId = exercise.gaps[gapIndex + 1].id;
      if (inputRefs.current[nextGapId]) {
        inputRefs.current[nextGapId].focus();
      }
    }
  };

  // Submit Evaluation (AC 4)
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/v1/practice/dictation-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'default_user'
        },
        body: JSON.stringify({
          exerciseId: selectedExerciseId,
          userAnswers
        })
      });

      if (res.ok) {
        const data = await res.json();
        setEvaluation(data.evaluation);
        if (onSubmissionSuccess) onSubmissionSuccess(data.evaluation);
      } else {
        const localResult = evaluateDictationSubmission(selectedExerciseId, userAnswers);
        setEvaluation(localResult);
      }
    } catch {
      const localResult = evaluateDictationSubmission(selectedExerciseId, userAnswers);
      setEvaluation(localResult);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full bg-white rounded-xl p-4 md:p-6 shadow-sm border border-slate-200/90 relative mt-6">
      {/* Header & Exercise Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-rose-600 text-2xl">edit_note</span>
            <h3 className="font-bold text-slate-800 text-lg md:text-xl">
              Nghe Chính Tả Âm Vị &amp; Điền Khuyết Ký Tự (PRON-202)
            </h3>
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
              Phonemic Gap-Fill
            </span>
          </div>
          <p className="text-slate-500 text-sm mt-0.5">
            Nghe câu chuẩn bản ngữ, điền các phụ âm đuôi hoặc âm câm còn thiếu vào chỗ trống
          </p>
        </div>

        {/* Exercise Selector */}
        <div className="flex flex-wrap items-center gap-1.5">
          {Object.values(DICTATION_EXERCISES).map((ex) => (
            <button
              key={ex.id}
              onClick={() => setSelectedExerciseId(ex.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedExerciseId === ex.id
                  ? 'bg-rose-600 text-white shadow-sm ring-2 ring-rose-200'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {ex.title.split(':')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Audio Player Toolbar (AC 2) */}
      <div className="mt-4 p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {/* Play / Pause button */}
          <button
            onClick={togglePlay}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all ${
              isPlaying
                ? 'bg-rose-600 text-white animate-pulse'
                : 'bg-rose-500 hover:bg-rose-600 text-white'
            }`}
          >
            <span className="material-symbols-outlined text-base">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
            <span>{isPlaying ? 'Tạm Dừng (K)' : 'Phát Âm Thanh (K)'}</span>
          </button>

          {/* Rewind / Replay button */}
          <button
            onClick={playAudio}
            className="px-3 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-all"
            title="Nghe lại từ đầu (Phím J)"
          >
            <span className="material-symbols-outlined text-base">replay_5</span>
            <span>Nghe Lại (J)</span>
          </button>
        </div>

        {/* Speed Selector */}
        <div className="flex items-center gap-1.5 text-xs font-semibold">
          <span className="text-slate-500 mr-1">Tốc độ:</span>
          {[0.75, 1.0].map((rate) => (
            <button
              key={rate}
              onClick={() => setPlaybackRate(rate)}
              className={`px-2.5 py-1 rounded-md transition-all ${
                playbackRate === rate
                  ? 'bg-indigo-600 text-white font-bold shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {rate}x
            </button>
          ))}
        </div>
      </div>

      {/* Dictation Gap-Fill Sentence Card (AC 1) */}
      <div className="mt-5 p-5 rounded-2xl bg-gradient-to-r from-slate-50 to-indigo-50/40 border border-slate-200">
        <div className="flex items-center gap-2 mb-3">
          <span className="material-symbols-outlined text-indigo-600 text-base">spellcheck</span>
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            {exercise.title}
          </span>
        </div>

        {/* Gap Fill Inputs in Sentence Flow */}
        <div className="flex flex-wrap items-center gap-2 text-base md:text-lg font-medium text-slate-800 leading-loose py-2">
          {exercise.gaps.map((gap, idx) => {
            const gapRes = evaluation?.gapResults?.[gap.id];
            let borderStyle = 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200';
            if (gapRes) {
              borderStyle = gapRes.isCorrect
                ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-200'
                : 'border-rose-500 bg-rose-50 text-rose-900 font-bold ring-2 ring-rose-200';
            }

            return (
              <span key={gap.id} className="inline-flex items-center gap-1 bg-white/80 px-2 py-1 rounded-lg border border-slate-200/60 shadow-xs">
                {gap.prefix && <span className="font-bold">{gap.prefix}</span>}
                <input
                  ref={(el) => (inputRefs.current[gap.id] = el)}
                  type="text"
                  maxLength={gap.target.length + 1}
                  value={userAnswers[gap.id] || ''}
                  onChange={(e) => handleInputChange(gap.id, e.target.value, idx)}
                  placeholder="___"
                  className={`w-14 text-center font-mono text-base font-bold rounded-lg border-2 px-1 py-0.5 outline-none transition-all ${borderStyle}`}
                />
                {gap.suffix && <span className="font-bold">{gap.suffix}</span>}

                {/* Inline IPA or target badge */}
                {gapRes && (
                  <span className={`text-[10px] font-mono px-1 rounded ${gapRes.isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                    {gapRes.isCorrect ? '✓' : `✕ ${gap.target}`}
                  </span>
                )}
              </span>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200">
          <span className="text-xs text-slate-500">
            Gợi ý: Lắng nghe kỹ âm gió và âm bật ở cuối các từ được đánh dấu
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setUserAnswers({})}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-100"
            >
              Làm Lại
            </button>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all"
            >
              <span className="material-symbols-outlined text-sm">send</span>
              <span>{isSubmitting ? 'Đang chấm...' : 'Nộp Bài & Chấm Điểm'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Submission Result Scorecard & Silent Letter Advice (AC 3 & AC 4) */}
      {evaluation && (
        <div className="mt-4 flex flex-col md:flex-row gap-3 animate-fade-in">
          {/* Score Badge */}
          <div className={`p-4 rounded-xl border flex items-center gap-3 shrink-0 ${
            evaluation.isAllCorrect
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}>
            <span className="material-symbols-outlined text-3xl text-emerald-600">
              {evaluation.isAllCorrect ? 'verified' : 'fact_check'}
            </span>
            <div>
              <span className="text-xs font-bold block uppercase tracking-wider">Kết Quả Điền Âm Vị:</span>
              <div className="text-lg font-black font-mono">
                {evaluation.correctCount}/{evaluation.totalGaps} đúng ({evaluation.score}%)
              </div>
              <span className="text-[11px] font-semibold text-indigo-700">+{evaluation.xpAwarded} XP Thưởng</span>
            </div>
          </div>

          {/* AC 3: Silent Letter Warning Alert */}
          {evaluation.silentLetterTip && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 border-l-4 border-l-rose-500 text-rose-900 flex-1">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-rose-800">
                <span className="material-symbols-outlined text-base">lightbulb</span>
                <span>Quy Tắc Âm Câm (Silent Letter Phonology):</span>
              </div>
              <p className="text-xs mt-1 leading-relaxed">
                {evaluation.silentLetterTip}
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
