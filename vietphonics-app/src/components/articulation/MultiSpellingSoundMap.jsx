import React, { useState, useEffect } from 'react';
import { SPELLING_MAP_CATALOG, getSpellingMapByPhoneme, evaluateSpellingQuiz } from '../../lib/scoring/spellingMaps';

export default function MultiSpellingSoundMap({ initialPhoneme = 'sound_09_f' }) {
  const [activePhonemeId, setActivePhonemeId] = useState(initialPhoneme);
  const [currentMap, setCurrentMap] = useState(() => getSpellingMapByPhoneme(initialPhoneme) || SPELLING_MAP_CATALOG[0]);
  const [selectedBranchIndex, setSelectedBranchIndex] = useState(0);
  const [showTrapDrawer, setShowTrapDrawer] = useState(true);
  const [quizMode, setQuizMode] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [playingWord, setPlayingWord] = useState(null);

  useEffect(() => {
    const map = getSpellingMapByPhoneme(activePhonemeId) || SPELLING_MAP_CATALOG[0];
    setCurrentMap(map);
    setSelectedBranchIndex(0);
    setUserAnswers({});
    setQuizResult(null);
  }, [activePhonemeId]);

  // Keyboard navigation for quick branch selection (1, 2, 3)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= currentMap.branches.length) {
        setSelectedBranchIndex(num - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentMap]);

  const activeBranch = currentMap.branches[selectedBranchIndex] || currentMap.branches[0];

  const playAudioWord = (word) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(word);
      u.lang = 'en-US';
      u.rate = 0.85;
      setPlayingWord(word);
      u.onend = () => setPlayingWord(null);
      u.onerror = () => setPlayingWord(null);
      window.speechSynthesis.speak(u);
    }
  };

  const handleSelectQuizOption = (quizId, option) => {
    setUserAnswers((prev) => ({
      ...prev,
      [quizId]: option
    }));
  };

  const handleQuizSubmit = async () => {
    const formattedAnswers = currentMap.quickQuiz.map((q) => ({
      id: q.id,
      selectedOption: userAnswers[q.id] || null
    }));

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/v1/phonetics/spelling-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phonemeId: currentMap.id,
          answers: formattedAnswers
        })
      });

      if (res.ok) {
        const data = await res.json();
        setQuizResult(data.evaluation);
      } else {
        // Fallback local evaluation
        const local = evaluateSpellingQuiz(currentMap.id, formattedAnswers);
        setQuizResult(local);
      }
    } catch {
      const local = evaluateSpellingQuiz(currentMap.id, formattedAnswers);
      setQuizResult(local);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getColorClasses = (color, isSelected) => {
    switch (color) {
      case 'sky':
        return isSelected
          ? 'bg-sky-500/10 border-sky-500 text-sky-400 ring-2 ring-sky-400/40'
          : 'bg-slate-900/60 border-slate-700/80 text-slate-300 hover:border-sky-500/50';
      case 'indigo':
        return isSelected
          ? 'bg-indigo-500/10 border-indigo-500 text-indigo-400 ring-2 ring-indigo-400/40'
          : 'bg-slate-900/60 border-slate-700/80 text-slate-300 hover:border-indigo-500/50';
      case 'rose':
        return isSelected
          ? 'bg-rose-500/10 border-rose-500 text-rose-400 ring-2 ring-rose-400/40'
          : 'bg-slate-900/60 border-slate-700/80 text-slate-300 hover:border-rose-500/50';
      case 'emerald':
        return isSelected
          ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 ring-2 ring-emerald-400/40'
          : 'bg-slate-900/60 border-slate-700/80 text-slate-300 hover:border-emerald-500/50';
      default:
        return isSelected
          ? 'bg-sky-500/10 border-sky-500 text-sky-400'
          : 'bg-slate-900/60 border-slate-700/80 text-slate-300';
    }
  };

  return (
    <section className="w-full bg-slate-950 rounded-3xl p-6 md:p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6 mb-8 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              PRON-209
            </span>
            <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">
              Multi-Spelling Sound Maps
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <span>🗺️ Bản Đồ Mặt Chữ &amp; Chính Tả Đa Dạng</span>
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Một âm vị trong tiếng Anh có thể có 3–5 cách viết khác nhau. Nắm vững bản đồ tần suất mặt chữ để không bao giờ bị chính tả đánh lừa.
          </p>
        </div>

        {/* Phoneme selector pills */}
        <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 shrink-0">
          {SPELLING_MAP_CATALOG.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setActivePhonemeId(m.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activePhonemeId === m.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <span className="text-[10px] font-mono text-indigo-300">#{m.number}</span>
              <span className="font-mono text-sm">{m.symbol}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mode toggles */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setQuizMode(false)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              !quizMode
                ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>🧭 Bản Đồ Trực Quan</span>
          </button>
          <button
            type="button"
            onClick={() => setQuizMode(true)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              quizMode
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800'
            }`}
          >
            <span>📝 Thử Thách Chính Tả ({currentMap.quickQuiz.length} câu)</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setShowTrapDrawer((prev) => !prev)}
          className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1.5 font-medium transition-colors"
        >
          <span className="material-symbols-outlined text-sm">
            {showTrapDrawer ? 'visibility_off' : 'warning'}
          </span>
          <span>{showTrapDrawer ? 'Ẩn Cảnh Báo Âm Câm' : 'Xem Cảnh Báo Âm Câm L1'}</span>
        </button>
      </div>

      {!quizMode ? (
        /* MAP VIEW */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          {/* Left 5 Cols: Radial Diagram & Branches */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Center Phoneme Circle Node */}
            <div className="relative mb-8">
              <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-indigo-700 to-indigo-500 border-4 border-indigo-400/40 flex flex-col items-center justify-center text-white shadow-[0_0_40px_rgba(99,102,241,0.4)] relative z-20">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-200">
                  Âm #{currentMap.number}
                </span>
                <span className="text-4xl font-mono font-black my-0.5 tracking-tight">
                  {currentMap.symbol}
                </span>
                <span className="text-[10px] text-indigo-100 font-medium px-2 text-center line-clamp-1">
                  {currentMap.vietnameseName}
                </span>
              </div>
              {/* Outer decorative ring */}
              <div className="absolute inset-0 -m-3 rounded-full border border-dashed border-indigo-500/30 animate-spin-slow pointer-events-none"></div>
            </div>

            {/* Branch selector cards (Hotkeys 1, 2, 3) */}
            <div className="w-full space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono px-1">
                <span>CÁC NHÁNH CHÍNH TẢ (PHÍM TẮT 1-{currentMap.branches.length}):</span>
                <span>TẦN SUẤT</span>
              </div>

              {currentMap.branches.map((b, idx) => {
                const isSelected = selectedBranchIndex === idx;
                const styleClasses = getColorClasses(b.color, isSelected);

                return (
                  <button
                    key={b.pattern}
                    type="button"
                    onClick={() => setSelectedBranchIndex(idx)}
                    className={`w-full p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between text-left cursor-pointer ${styleClasses}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 font-mono text-xs flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="font-mono text-base font-bold tracking-wide">
                          "{b.pattern}"
                        </div>
                        <div className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                          {b.examples.map((e) => e.word).join(', ')}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-mono font-black">
                        {b.percentage}%
                      </span>
                      <div className="text-[10px] text-slate-400">phân bố</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right 7 Cols: Expanded Branch Drill-Down */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Active Branch Deep Dive Card */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-xl bg-indigo-500/20 text-indigo-300 font-mono font-black text-lg border border-indigo-500/30">
                    "{activeBranch.pattern}"
                  </span>
                  <div>
                    <h3 className="text-white font-bold text-base">
                      Nhánh Chính Tả Chiếm {activeBranch.percentage}%
                    </h3>
                    <p className="text-xs text-slate-400">
                      Tất cả các từ chứa tổ hợp này đều đại diện cho âm {currentMap.symbol}
                    </p>
                  </div>
                </div>

                <span className="text-xs font-mono text-slate-400 bg-slate-800 px-3 py-1 rounded-full">
                  {activeBranch.examples.length} từ ví dụ
                </span>
              </div>

              {/* Rule commentary */}
              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 mb-5 text-xs text-slate-300 leading-relaxed">
                <span className="font-bold text-indigo-400 mr-1.5">💡 Quy luật cấu từ:</span>
                {activeBranch.rule}
              </div>

              {/* Word List with Orthography Highlight & Web Speech player */}
              <div className="space-y-2.5">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  TỪ VÍ DỤ CHUẨN BẢN XỨ (BẤM ĐỂ NGHE PHÁT ÂM):
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeBranch.examples.map((item) => (
                    <div
                      key={item.word}
                      className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-indigo-500/50 transition-all flex items-center justify-between group"
                    >
                      <div className="flex flex-col">
                        <div className="text-base font-bold text-white tracking-wide">
                          {item.word.split(item.highlight).map((part, i, arr) => (
                            <React.Fragment key={i}>
                              {part}
                              {i < arr.length - 1 && (
                                <span className="text-rose-400 bg-rose-500/10 px-0.5 rounded font-black underline decoration-rose-400">
                                  {item.highlight}
                                </span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-mono text-indigo-400">{item.ipa}</span>
                          <span className="text-[11px] text-slate-400">• {item.translation}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => playAudioWord(item.word)}
                        className={`p-2.5 rounded-xl transition-all ${
                          playingWord === item.word
                            ? 'bg-indigo-600 text-white animate-pulse'
                            : 'bg-slate-800/80 text-slate-300 hover:bg-indigo-600 hover:text-white'
                        }`}
                        title="Nghe phát âm chuẩn"
                      >
                        <span className="material-symbols-outlined text-base">
                          {playingWord === item.word ? 'graphic_eq' : 'volume_up'}
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Silent Letter & L1 Trap Drawer */}
            {showTrapDrawer && (
              <div className="bg-amber-950/20 border border-amber-500/40 rounded-3xl p-6 relative overflow-hidden animate-fade-in">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400">
                    <span className="material-symbols-outlined text-xl">warning</span>
                  </div>
                  <div>
                    <h4 className="text-amber-300 font-bold text-sm">
                      {currentMap.silentTrap.title}
                    </h4>
                    <p className="text-xs text-amber-200/80 mt-1 leading-relaxed">
                      {currentMap.silentTrap.description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {currentMap.silentTrap.silentExamples.map((ex) => (
                        <span
                          key={ex}
                          className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs"
                        >
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* QUIZ MODE */
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 relative z-10 max-w-3xl mx-auto shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">
                Kiểm Tra Nhận Diện Chính Tả: Âm {currentMap.symbol}
              </h3>
              <p className="text-xs text-slate-400">
                Chọn phương án chính xác đại diện cho âm vị trong các trường hợp sau.
              </p>
            </div>
            <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
              {currentMap.quickQuiz.length} câu hỏi
            </span>
          </div>

          <div className="space-y-6">
            {currentMap.quickQuiz.map((q, idx) => (
              <div key={q.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-5 h-5 rounded-md bg-indigo-600/30 text-indigo-300 text-xs font-mono font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-sm font-semibold text-white">{q.question}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3">
                  {q.options.map((opt) => {
                    const isSelected = userAnswers[q.id] === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectQuizOption(q.id, opt)}
                        className={`p-3 rounded-xl border text-xs font-mono font-bold transition-all text-center ${
                          isSelected
                            ? 'bg-indigo-600 border-indigo-400 text-white shadow-md'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {quizResult && (
                  <div className="mt-3 pt-3 border-t border-slate-900 text-xs flex items-start gap-2">
                    <span className="material-symbols-outlined text-sm shrink-0 mt-0.5 text-indigo-400">
                      info
                    </span>
                    <span className="text-slate-400">{q.explanation}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {quizResult && (
            <div className={`mt-6 p-4 rounded-2xl border flex items-center justify-between ${
              quizResult.passed
                ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                : 'bg-rose-950/20 border-rose-500/40 text-rose-300'
            }`}>
              <div>
                <div className="font-bold text-sm">
                  {quizResult.passed ? '🎉 VƯỢT QUA BÀI KIỂM TRA!' : '⚠️ CẦN ÔN TẬP THÊM'}
                </div>
                <div className="text-xs opacity-90 mt-0.5">{quizResult.feedback}</div>
              </div>
              <div className="text-right shrink-0 ml-4 font-mono">
                <div className="text-2xl font-black">{quizResult.scorePercent}%</div>
                <div className="text-[10px] uppercase">
                  {quizResult.correctCount}/{quizResult.totalQuestions} ĐÚNG
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setUserAnswers({});
                setQuizResult(null);
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-slate-800 transition-colors"
            >
              Làm lại
            </button>
            <button
              type="button"
              onClick={handleQuizSubmit}
              disabled={isSubmitting || Object.keys(userAnswers).length === 0}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? 'Đang chấm điểm...' : 'Nộp Bài & Lưu Kết Quả'}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
