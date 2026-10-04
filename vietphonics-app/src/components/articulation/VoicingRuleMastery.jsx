import React, { useState, useEffect, useCallback } from 'react';
import { VOICING_RULE_CATALOG, evaluateVoicingCheck } from '../../lib/scoring/voicingRules';

export default function VoicingRuleMastery({
  initialCategory = 's_es_endings'
}) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const profile = VOICING_RULE_CATALOG[selectedCategory] || VOICING_RULE_CATALOG.s_es_endings;

  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [placements, setPlacements] = useState({}); // { [word]: chosenCoda }
  const [showMnemonics, setShowMnemonics] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [playingWord, setPlayingWord] = useState(null);

  // Reset placements when category changes
  useEffect(() => {
    setPlacements({});
    setEvaluation(null);
    setActiveWordIndex(0);
  }, [selectedCategory]);

  const currentWord = profile.words[activeWordIndex] || profile.words[0];

  // Audio Playback
  const playWord = useCallback((wordText) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setPlayingWord(wordText);

    const utterance = new SpeechSynthesisUtterance(wordText);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    utterance.onend = () => setPlayingWord(null);
    utterance.onerror = () => setPlayingWord(null);

    window.speechSynthesis.speak(utterance);
  }, []);

  // Place current word into a column
  const placeWord = useCallback((codaId) => {
    if (!currentWord) return;

    setPlacements(prev => ({
      ...prev,
      [currentWord.word]: codaId
    }));

    // Move to next word if available
    if (activeWordIndex < profile.words.length - 1) {
      setActiveWordIndex(prev => prev + 1);
    }
  }, [currentWord, activeWordIndex, profile.words.length]);

  // Keyboard Hotkeys 1, 2, 3 (AC 1)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key === '1') {
        e.preventDefault();
        placeWord(profile.columns[0].id);
      } else if (e.key === '2') {
        e.preventDefault();
        placeWord(profile.columns[1].id);
      } else if (e.key === '3') {
        e.preventDefault();
        placeWord(profile.columns[2].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [placeWord, profile.columns]);

  // Check / Submit evaluation (AC 4)
  const handleSubmitCheck = async () => {
    setIsSubmitting(true);
    const submissions = profile.words.map(w => ({
      word: w.word,
      chosenCoda: placements[w.word] || w.targetCoda
    }));

    try {
      const res = await fetch('/api/v1/grammar/voicing-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: selectedCategory,
          submissions
        })
      });

      if (res.ok) {
        const data = await res.json();
        setEvaluation(data.evaluation);
      } else {
        setEvaluation(evaluateVoicingCheck(selectedCategory, submissions));
      }
    } catch {
      setEvaluation(evaluateVoicingCheck(selectedCategory, submissions));
    } finally {
      setIsSubmitting(false);
    }
  };

  const placedCount = Object.keys(placements).length;
  const isVoicedActive = currentWord?.isVoiced;

  return (
    <section className="w-full bg-white rounded-2xl p-space-md md:p-space-lg shadow-sm border border-slate-200/90 relative overflow-hidden transition-all">
      {/* Subtle ambient light */}
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-amber-100/40 blur-[60px] pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-space-sm gap-3 border-b border-slate-100 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-label-mono text-label-mono uppercase text-sky-700 font-bold tracking-wider">
              PRON-207 · Grammatical Voicing Alternations
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-label-mono bg-sky-100 text-sky-800 font-bold">
              Phonetic Rule Mastery
            </span>
          </div>
          <h3 className="text-heading-md font-bold text-slate-900 mt-1">
            Quy Tắc Biến Âm Ngữ Pháp Đuôi -s/-es &amp; -ed
          </h3>
          <p className="text-body-sm text-slate-500">
            Chấm dứt thói quen "thấy s là đọc s, thấy ed là đọc đơ"; phân loại chuẩn xác theo tính hữu thanh/vô thanh.
          </p>
        </div>

        {/* View Mnemonics Button (AC 3) */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setShowMnemonics(!showMnemonics)}
            className="px-3.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs"
          >
            <span className="material-symbols-outlined text-sm text-amber-600">auto_stories</span>
            <span>{showMnemonics ? 'Ẩn Câu Thần Chú' : '🔮 Xem Câu Thần Chú Dân Gian'}</span>
          </button>
        </div>
      </div>

      {/* Category Toggle Tabs */}
      <div className="flex items-center gap-2 mt-4 pt-1">
        {Object.values(VOICING_RULE_CATALOG).map((cat) => (
          <button
            key={cat.category}
            type="button"
            onClick={() => setSelectedCategory(cat.category)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
              selectedCategory === cat.category
                ? 'bg-sky-600 border-sky-600 text-white shadow-sm'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            <span>{cat.category === 's_es_endings' ? 'Đuôi -s/-es' : 'Đuôi -ed'}</span>
            <span className="text-[10px] opacity-80">({cat.words.length} từ)</span>
          </button>
        ))}
      </div>

      {/* Vietnamese Mnemonic Card Drawer (AC 3) */}
      {showMnemonics && (
        <div className="mt-4 p-4 rounded-xl bg-amber-50/90 border border-amber-300 text-slate-800 text-xs space-y-2 animate-fadeIn">
          <h4 className="font-bold text-amber-950 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-base text-amber-700">lightbulb</span>
            Khẩu Quyết Ghi Nhớ Nhanh Quy Tắc Âm Đuôi Cho Người Việt
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            {Object.entries(profile.mnemonics).map(([coda, tip]) => (
              <div key={coda} className="p-3 bg-white rounded-lg border border-amber-200">
                <span className="font-ipa-inline font-bold text-sky-700 px-1.5 py-0.5 rounded bg-sky-50 border border-sky-200">
                  {coda}
                </span>
                <p className="mt-1.5 font-medium text-slate-700">"{tip}"</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Word Flashcard with Vocal Cord Vibration Visualizer (AC 2) */}
      <div className="mt-5 p-5 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          {/* Vocal Cord Vibration Beacon (AC 2) */}
          <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-slate-800 border border-slate-700 shrink-0">
            {isVoicedActive && (
              <div className="absolute w-14 h-14 rounded-full bg-emerald-500/30 animate-ping pointer-events-none" />
            )}
            <span className={`material-symbols-outlined text-2xl ${
              isVoicedActive ? 'text-emerald-400 animate-pulse' : 'text-slate-400'
            }`}>
              {isVoicedActive ? 'graphic_eq' : 'air'}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-label-mono text-label-mono text-slate-400 text-xs">
                Từ #{activeWordIndex + 1}/{profile.words.length}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-label-mono ${
                isVoicedActive ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' : 'bg-sky-950 text-sky-400 border border-sky-500/40'
              }`}>
                {isVoicedActive ? '🔊 Hữu Thanh (Rung Dây Thanh Quản)' : '💨 Vô Thanh (Chỉ Bật Luồng Hơi)'}
              </span>
            </div>
            <div className="text-2xl font-bold font-serif text-white flex items-baseline gap-2 mt-0.5">
              <span>{currentWord.word}</span>
              <span className="text-sm font-sans font-normal text-sky-300 font-ipa-inline">{currentWord.ipa}</span>
            </div>
          </div>
        </div>

        {/* Action button to speak */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => playWord(currentWord.word)}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sky-300 text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs"
          >
            <span className="material-symbols-outlined text-sm">volume_up</span>
            <span>{playingWord === currentWord.word ? 'Đang phát...' : 'Nghe Phát Âm'}</span>
          </button>
        </div>
      </div>

      {/* 3-Column Sorting Board (AC 1) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
        {profile.columns.map((col) => {
          const wordsInCol = profile.words.filter(w => placements[w.word] === col.id);

          return (
            <div
              key={col.id}
              onClick={() => placeWord(col.id)}
              className="p-4 rounded-xl border-2 border-slate-200 hover:border-sky-400 bg-slate-50/70 cursor-pointer transition-all flex flex-col justify-between min-h-[200px] group shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="font-bold text-slate-800 text-xs">
                    {col.label}
                  </span>
                  <kbd className="px-2 py-0.5 rounded bg-slate-200 text-slate-800 font-mono text-[10px] font-bold group-hover:bg-sky-600 group-hover:text-white transition-colors">
                    Phím [{col.hotkey}]
                  </kbd>
                </div>

                {/* Placed Words Chips in this Column */}
                <div className="flex flex-wrap gap-1.5 pt-3">
                  {wordsInCol.map(w => (
                    <span
                      key={w.word}
                      className="px-2 py-1 rounded-lg text-xs font-mono font-bold bg-white border border-slate-300 text-slate-800 shadow-2xs flex items-center gap-1"
                    >
                      <span>{w.word}</span>
                      <span className="text-[10px] text-sky-600">{col.id}</span>
                    </span>
                  ))}
                  {wordsInCol.length === 0 && (
                    <span className="text-[11px] text-slate-400 italic">
                      Bấm vào đây hoặc nhấn [{col.hotkey}] để xếp từ...
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 text-right">
                <span className="text-[11px] text-slate-500 font-mono font-semibold">
                  {wordsInCol.length} từ đã chọn
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Evaluation Result Feedback Banner (AC 4) */}
      {evaluation && (
        <div className="mt-5 p-4 rounded-xl bg-slate-900 text-white space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-sky-300">
              Kết Quả Phân Loại: {evaluation.correctCount}/{evaluation.totalWords} Từ Chính Xác ({evaluation.score}%)
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
              evaluation.score >= 80 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
            }`}>
              {evaluation.score >= 80 ? 'Xuất Sắc!' : 'Cần Rèn Luyện Thêm'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs pt-1">
            {evaluation.results.map((r, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-lg border ${
                  r.isCorrect
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                    : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                }`}
              >
                <div className="flex items-center justify-between font-mono font-bold">
                  <span>{r.word}</span>
                  <span>{r.isCorrect ? '✅ ' + r.targetCoda : '❌ Chọn ' + r.chosenCoda + ' ➔ Đúng: ' + r.targetCoda}</span>
                </div>
                <p className="text-[10px] opacity-80 mt-1">{r.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Submit / Reset Controls */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="text-slate-500 font-mono">
          Tiến độ: {placedCount}/{profile.words.length} từ đã phân loại
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPlacements({})}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-all"
          >
            Làm Lại
          </button>
          <button
            type="button"
            onClick={handleSubmitCheck}
            disabled={isSubmitting}
            className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold transition-all shadow-xs active:scale-95 flex items-center gap-1.5 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-sm">verified</span>
            <span>{isSubmitting ? 'Đang chấm điểm...' : 'Kiểm Tra & Nộp Bài'}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
