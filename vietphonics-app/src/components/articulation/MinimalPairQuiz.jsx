import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MINIMAL_PAIRS_CATALOG, generateQuizQuestion, evaluateQuizAnswer } from '../../lib/scoring/minimalPairs';

export default function MinimalPairQuiz({
  initialPairId = 'pair_theta_t',
  onStreakUpdate
}) {
  const [selectedPairId, setSelectedPairId] = useState(initialPairId);
  const [currentQuestion, setCurrentQuestion] = useState(() => generateQuizQuestion(initialPairId));
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizResult, setQuizResult] = useState(null);
  const [streak, setStreak] = useState(0);
  const [totalXp, setTotalXp] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());

  // Audio speech synthesis helper
  const playWordAudio = useCallback((wordToPlay) => {
    if (!wordToPlay) return;
    setIsPlayingAudio(true);

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(wordToPlay);
      utterance.lang = 'en-US';
      utterance.rate = 0.85; // slightly slower for clear acoustic discrimination
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlayingAudio(false), 800);
    }
  }, []);

  // Play audio on new question
  useEffect(() => {
    setStartTime(Date.now());
    playWordAudio(currentQuestion.targetWord);
  }, [currentQuestion, playWordAudio]);

  // Handle Answer Selection
  const handleSelectAnswer = async (selectedWord) => {
    if (selectedAnswer !== null) return; // already answered

    const reactionTimeMs = Date.now() - startTime;
    setSelectedAnswer(selectedWord);

    try {
      const res = await fetch('/api/v1/pedagogy/minimal-pairs/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'default_user'
        },
        body: JSON.stringify({
          pairId: selectedPairId,
          targetWord: currentQuestion.targetWord,
          selectedWord,
          reactionTimeMs,
          currentStreak: streak
        })
      });

      if (res.ok) {
        const data = await res.json();
        setQuizResult(data.result);
        setStreak(data.result.newStreak);
        setTotalXp((prev) => prev + data.result.xpAwarded);
        if (onStreakUpdate) onStreakUpdate(data.result.newStreak);
      } else {
        const localResult = evaluateQuizAnswer(
          selectedPairId,
          currentQuestion.targetWord,
          selectedWord,
          reactionTimeMs,
          streak
        );
        setQuizResult(localResult);
        setStreak(localResult.newStreak);
        setTotalXp((prev) => prev + localResult.xpAwarded);
      }
    } catch {
      const localResult = evaluateQuizAnswer(
        selectedPairId,
        currentQuestion.targetWord,
        selectedWord,
        reactionTimeMs,
        streak
      );
      setQuizResult(localResult);
      setStreak(localResult.newStreak);
      setTotalXp((prev) => prev + localResult.xpAwarded);
    }
  };

  // Move to next question
  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setQuizResult(null);
    setCurrentQuestion(generateQuizQuestion(selectedPairId));
  };

  // Switch minimal pair category
  const handleSwitchCategory = (pairId) => {
    setSelectedPairId(pairId);
    setSelectedAnswer(null);
    setQuizResult(null);
    setCurrentQuestion(generateQuizQuestion(pairId));
  };

  // Keyboard navigation: 1 for A, 2 for B, Space for audio
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        playWordAudio(currentQuestion.targetWord);
      } else if (e.key === '1') {
        e.preventDefault();
        handleSelectAnswer(currentQuestion.optionA.word);
      } else if (e.key === '2') {
        e.preventDefault();
        handleSelectAnswer(currentQuestion.optionB.word);
      } else if (e.key === 'Enter' && selectedAnswer !== null) {
        e.preventDefault();
        handleNextQuestion();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestion, selectedAnswer, playWordAudio]);

  const pairMeta = MINIMAL_PAIRS_CATALOG[selectedPairId] || MINIMAL_PAIRS_CATALOG.pair_theta_t;

  return (
    <section className="w-full bg-white rounded-xl p-4 md:p-6 shadow-sm border border-slate-200/90 relative mt-6">
      {/* Top Header: Title & XP / Streak Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sky-600 text-2xl">hearing</span>
            <h3 className="font-bold text-slate-800 text-lg md:text-xl">
              Luyện Tai Phân Biệt Cặp Âm Tối Thiểu (ELSA-205)
            </h3>
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
              Auditory Discrimination
            </span>
          </div>
          <p className="text-slate-500 text-sm mt-0.5">
            Nghe âm thanh ngẫu nhiên và chọn đúng từ - Rèn luyện phản xạ thính giác phân biệt âm trước khi nói
          </p>
        </div>

        {/* Streak & XP Display */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
            <span className="text-base">🔥</span>
            <span>Streak: {streak} câu</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-bold">
            <span className="material-symbols-outlined text-base text-indigo-600">stars</span>
            <span>+{totalXp} XP</span>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-1">Cặp âm:</span>
        {Object.values(MINIMAL_PAIRS_CATALOG).map((pair) => (
          <button
            key={pair.id}
            onClick={() => handleSwitchCategory(pair.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedPairId === pair.id
                ? 'bg-sky-600 text-white shadow-sm ring-2 ring-sky-200'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {pair.name}
          </button>
        ))}
      </div>

      {/* Hero Audio Button with Sound Wave Ring */}
      <div className="mt-6 flex flex-col items-center justify-center">
        <div className="relative">
          {isPlayingAudio && (
            <div className="absolute inset-0 rounded-full bg-sky-400 animate-ping opacity-40"></div>
          )}
          <button
            onClick={() => playWordAudio(currentQuestion.targetWord)}
            className="relative w-20 h-20 rounded-full bg-sky-500 hover:bg-sky-600 active:scale-95 text-white shadow-lg shadow-sky-500/30 flex items-center justify-center transition-transform"
            title="Bấm hoặc gõ phím Space để nghe lại"
          >
            <span className="material-symbols-outlined text-3xl">volume_up</span>
          </button>
        </div>

        <div className="mt-2 text-center">
          <span className="text-xs text-slate-500 font-medium">Bấm loa hoặc phím <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-[11px] font-mono text-slate-700">Space</kbd> để nghe lại</span>
        </div>
      </div>

      {/* Bento Choice Cards (Options A vs B) (AC 2) */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Option A */}
        {(() => {
          const isA = selectedAnswer === currentQuestion.optionA.word;
          const isTarget = currentQuestion.targetWord === currentQuestion.optionA.word;
          let cardStyle = 'border-slate-200 hover:border-sky-400 bg-white hover:bg-slate-50';

          if (selectedAnswer !== null) {
            if (isTarget) {
              cardStyle = 'border-emerald-500 bg-emerald-50/70 ring-2 ring-emerald-200 text-emerald-950';
            } else if (isA && !isTarget) {
              cardStyle = 'border-rose-500 bg-rose-50/70 ring-2 ring-rose-200 text-rose-950';
            } else {
              cardStyle = 'border-slate-200 bg-slate-50/50 opacity-60';
            }
          }

          return (
            <button
              onClick={() => handleSelectAnswer(currentQuestion.optionA.word)}
              disabled={selectedAnswer !== null}
              className={`p-5 rounded-2xl border-2 transition-all flex flex-col items-center text-center relative ${cardStyle}`}
            >
              <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-100 text-slate-600 border border-slate-200">
                Phím [1]
              </span>

              {selectedAnswer !== null && isTarget && (
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                  ✓ Đáp án đúng (+15 XP)
                </span>
              )}

              {selectedAnswer !== null && isA && !isTarget && (
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800 flex items-center gap-1">
                  ✕ Bạn chọn từ này
                </span>
              )}

              <span className="text-3xl font-black text-slate-800 tracking-wide mt-2">
                {currentQuestion.optionA.word}
              </span>
              <span className="font-mono text-sm text-sky-700 font-bold mt-1">
                {currentQuestion.optionA.ipa}
              </span>
              <span className="text-xs text-slate-500 mt-1">
                Nghĩa: {currentQuestion.optionA.meaning}
              </span>
            </button>
          );
        })()}

        {/* Option B */}
        {(() => {
          const isB = selectedAnswer === currentQuestion.optionB.word;
          const isTarget = currentQuestion.targetWord === currentQuestion.optionB.word;
          let cardStyle = 'border-slate-200 hover:border-sky-400 bg-white hover:bg-slate-50';

          if (selectedAnswer !== null) {
            if (isTarget) {
              cardStyle = 'border-emerald-500 bg-emerald-50/70 ring-2 ring-emerald-200 text-emerald-950';
            } else if (isB && !isTarget) {
              cardStyle = 'border-rose-500 bg-rose-50/70 ring-2 ring-rose-200 text-rose-950';
            } else {
              cardStyle = 'border-slate-200 bg-slate-50/50 opacity-60';
            }
          }

          return (
            <button
              onClick={() => handleSelectAnswer(currentQuestion.optionB.word)}
              disabled={selectedAnswer !== null}
              className={`p-5 rounded-2xl border-2 transition-all flex flex-col items-center text-center relative ${cardStyle}`}
            >
              <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-100 text-slate-600 border border-slate-200">
                Phím [2]
              </span>

              {selectedAnswer !== null && isTarget && (
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                  ✓ Đáp án đúng (+15 XP)
                </span>
              )}

              {selectedAnswer !== null && isB && !isTarget && (
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800 flex items-center gap-1">
                  ✕ Bạn chọn từ này
                </span>
              )}

              <span className="text-3xl font-black text-slate-800 tracking-wide mt-2">
                {currentQuestion.optionB.word}
              </span>
              <span className="font-mono text-sm text-sky-700 font-bold mt-1">
                {currentQuestion.optionB.ipa}
              </span>
              <span className="text-xs text-slate-500 mt-1">
                Nghĩa: {currentQuestion.optionB.meaning}
              </span>
            </button>
          );
        })()}
      </div>

      {/* Answer Feedback & Articulatory Hint (AC 3) */}
      {selectedAnswer !== null && (
        <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-purple-600 text-base">psychology</span>
              <strong className="text-xs text-slate-800 font-bold uppercase tracking-wider">
                Mẹo Phân Biệt Cấu Âm (Articulatory Tip):
              </strong>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {currentQuestion.articulatoryHint}
            </p>
          </div>

          <button
            onClick={handleNextQuestion}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 shrink-0"
          >
            <span>Câu Tiếp Theo</span>
            <kbd className="px-1.5 py-0.5 bg-indigo-700 border border-indigo-500 rounded text-[10px] font-mono">Enter</kbd>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      )}
    </section>
  );
}
