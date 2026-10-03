import React, { useState, useEffect } from 'react';
import { IPA_PHONEMES, getPhonemeTier, summarizePhonemes } from '../../lib/phonemes/ipaData';

export default function IpaMatrixGrid({ onSelectPractice }) {
  const [phonemes, setPhonemes] = useState(IPA_PHONEMES);
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'weak' | 'mastered'
  const [selectedPhoneme, setSelectedPhoneme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch live phonemes from backend API
  useEffect(() => {
    async function fetchPhonemes() {
      try {
        const res = await fetch('/api/v1/user/phonemes');
        if (res.ok) {
          const data = await res.json();
          if (data.phonemes && data.phonemes.length > 0) {
            setPhonemes(data.phonemes);
            // Select default weak sound if none selected
            const defaultWeak = data.phonemes.find(p => p.symbol === 'θ') || data.phonemes[0];
            setSelectedPhoneme(defaultWeak);
          }
        }
      } catch (err) {
        console.warn('Using local phonemes fallback:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPhonemes();
  }, []);

  const summary = summarizePhonemes(phonemes);

  // Play audio TTS
  const playTTS = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Simulate updating phoneme score
  const handlePracticeScore = async (phonemeSymbol, newScore) => {
    setIsUpdating(true);
    try {
      const res = await fetch('/api/v1/user/phonemes/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneme: phonemeSymbol, score: newScore })
      });
      if (res.ok) {
        const result = await res.json();
        setPhonemes(prev =>
          prev.map(p => {
            if (p.symbol === phonemeSymbol) {
              const tier = getPhonemeTier(newScore);
              return {
                ...p,
                score: newScore,
                attempts: (p.attempts || 1) + 1,
                tier: tier.tier,
                label: tier.label,
                badgeColor: tier.badgeColor,
                isWarning: tier.isWarning
              };
            }
            return p;
          })
        );
        if (selectedPhoneme?.symbol === phonemeSymbol) {
          const tier = getPhonemeTier(newScore);
          setSelectedPhoneme(prev => ({
            ...prev,
            score: newScore,
            tier: tier.tier,
            label: tier.label,
            isWarning: tier.isWarning
          }));
        }
      }
    } catch (err) {
      console.error('Failed to update phoneme score:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  // Group phonemes
  const monophthongs = phonemes.filter(p => p.category === 'monophthong');
  const diphthongs = phonemes.filter(p => p.category === 'diphthong');
  const consonants = phonemes.filter(p => p.category === 'consonant');

  // Compute tile appearance based on filterMode & score
  const getTileStyles = (score) => {
    const isWeak = score < 60;
    const isMastered = score >= 85;

    let baseStyle = '';
    if (isMastered) {
      baseStyle = 'bg-emerald-50 text-emerald-800 border-emerald-300 ring-1 ring-emerald-400/30 hover:bg-emerald-100';
    } else if (score >= 60) {
      baseStyle = 'bg-amber-50 text-amber-800 border-amber-300 ring-1 ring-amber-400/30 hover:bg-amber-100';
    } else {
      baseStyle = 'bg-rose-50 text-rose-800 border-rose-400 ring-2 ring-rose-500 font-black hover:bg-rose-100 shadow-xs';
    }

    if (filterMode === 'weak') {
      if (!isWeak) {
        baseStyle += ' opacity-30 grayscale-[60%] scale-95';
      } else {
        baseStyle += ' ring-2 ring-rose-600 scale-105 shadow-md bg-rose-100';
      }
    } else if (filterMode === 'mastered') {
      if (!isMastered) {
        baseStyle += ' opacity-30 grayscale-[60%] scale-95';
      } else {
        baseStyle += ' ring-2 ring-emerald-600 scale-105 shadow-md';
      }
    }

    return baseStyle;
  };

  const renderPhonemeTile = (p) => {
    const s = Number(p.score ?? p.defaultScore ?? 0);
    const isSelected = selectedPhoneme?.symbol === p.symbol;
    const isWeak = s < 60;

    return (
      <button
        key={p.symbol}
        type="button"
        onClick={() => {
          setSelectedPhoneme(p);
          playTTS(p.examples?.[0] || p.symbol);
        }}
        className={`relative p-2 rounded-xl text-center transition-all flex flex-col items-center justify-center cursor-pointer border ${getTileStyles(s)} ${
          isSelected ? 'outline-2 outline-sky-600 ring-2 ring-sky-500 shadow-sm' : ''
        }`}
        title={`Âm /${p.symbol}/: ${s}% - ${p.name || ''}`}
      >
        {isWeak && (
          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] font-extrabold shadow-xs">
            !
          </span>
        )}
        <span className="font-ipa-display text-lg sm:text-xl font-bold leading-tight">
          {p.symbol}
        </span>
        <span className="font-label-mono text-[10px] tracking-tight mt-0.5 font-semibold">
          {s}%
        </span>
      </button>
    );
  };

  return (
    <div className="space-y-6">
      {/* Matrix Controls & Filter Bar (AC 4) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-headline-sm text-base text-slate-900 font-bold">
              Bản Đồ 44 Âm Vị Quốc Tế IPA
            </h3>
            <span className="font-label-mono text-xs px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 font-semibold">
              Điểm TB: {summary.averageScore}%
            </span>
          </div>
          <p className="font-body-sm text-xs text-slate-500 mt-0.5">
            Nhấp vào từng âm để xem khẩu hình chi tiết, 3 từ ví dụ và nghe phát âm chuẩn
          </p>
        </div>

        {/* 3-State Filter Mode (AC 4) */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-slate-200 shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              filterMode === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Tất cả (44)
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('weak')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
              filterMode === 'weak'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-rose-700 hover:bg-rose-50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-400"></span>
            <span>Cần cải thiện &lt;60% ({summary.weakCount})</span>
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('mastered')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
              filterMode === 'mastered'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-emerald-700 hover:bg-emerald-50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Đã làm chủ ≥85% ({summary.masteredCount})</span>
          </button>
        </div>
      </div>

      {/* 44 Phonemes Matrix (AC 1) */}
      <div className="space-y-6">
        {/* Monophthongs */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="font-label-mono text-xs uppercase font-bold text-slate-700 tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              Nguyên Âm Đơn (Monophthongs - 12)
            </span>
            <span className="font-label-mono text-[11px] text-slate-400">
              Làm chủ {monophthongs.filter(p => (p.score ?? p.defaultScore) >= 85).length}/12
            </span>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-2">
            {monophthongs.map(renderPhonemeTile)}
          </div>
        </div>

        {/* Diphthongs */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="font-label-mono text-xs uppercase font-bold text-slate-700 tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              Nguyên Âm Đôi (Diphthongs - 8)
            </span>
            <span className="font-label-mono text-[11px] text-slate-400">
              Làm chủ {diphthongs.filter(p => (p.score ?? p.defaultScore) >= 85).length}/8
            </span>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {diphthongs.map(renderPhonemeTile)}
          </div>
        </div>

        {/* Consonants */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="font-label-mono text-xs uppercase font-bold text-slate-700 tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-500"></span>
              Phụ Âm (Consonants - 24)
            </span>
            <span className="font-label-mono text-[11px] text-rose-600 font-semibold">
              Điểm yếu L1: /θ/, /ʃ/, /dʒ/
            </span>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-2">
            {consonants.map(renderPhonemeTile)}
          </div>
        </div>
      </div>

      {/* Selected Phoneme Drawer / Preview Bar (AC 3) */}
      {selectedPhoneme && (
        <div className="bg-white rounded-xl p-5 border-2 border-slate-200 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-5 animate-fade-in">
          <div className="flex items-start sm:items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-ipa-display text-2xl font-black shrink-0 ${
              (selectedPhoneme.score ?? selectedPhoneme.defaultScore) >= 85
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                : (selectedPhoneme.score ?? selectedPhoneme.defaultScore) >= 60
                ? 'bg-amber-50 text-amber-700 border border-amber-300'
                : 'bg-rose-50 text-rose-700 border border-rose-300 ring-2 ring-rose-400'
            }`}>
              /{selectedPhoneme.symbol}/
            </div>

            <div className="space-y-1">
              <div className="flex items-center flex-wrap gap-2">
                <h4 className="font-headline-sm text-base text-slate-900 font-bold">
                  {selectedPhoneme.name || `Âm /${selectedPhoneme.symbol}/`}
                </h4>
                <span className={`font-label-mono text-xs px-2.5 py-0.5 rounded-full font-bold ${
                  (selectedPhoneme.score ?? selectedPhoneme.defaultScore) >= 85
                    ? 'bg-emerald-100 text-emerald-800'
                    : (selectedPhoneme.score ?? selectedPhoneme.defaultScore) >= 60
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  {selectedPhoneme.score ?? selectedPhoneme.defaultScore}% • {(selectedPhoneme.score ?? selectedPhoneme.defaultScore) >= 85 ? 'Làm Chủ' : (selectedPhoneme.score ?? selectedPhoneme.defaultScore) >= 60 ? 'Đang Luyện' : 'Cần Khắc Phục'}
                </span>
                <span className="text-xs text-slate-400 font-medium">({selectedPhoneme.categoryVi || selectedPhoneme.category})</span>
              </div>

              {/* 3 Common Example Words (AC 3) */}
              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs text-slate-500 font-medium">3 từ ví dụ:</span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {(selectedPhoneme.examples || ['think', 'path', 'math']).map((word, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => playTTS(word)}
                      className="px-2.5 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-mono font-medium flex items-center gap-1 transition-all cursor-pointer"
                      title={`Nghe phát âm từ: ${word}`}
                    >
                      <span>{word}</span>
                      <span className="material-symbols-outlined text-[12px] text-slate-500">volume_up</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pedagogy tip */}
              {selectedPhoneme.tips && (
                <p className="font-body-sm text-xs text-slate-600 italic pt-0.5">
                  💡 {selectedPhoneme.tips}
                </p>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
            {/* Quick Practice Simulation */}
            <button
              type="button"
              disabled={isUpdating}
              onClick={() => handlePracticeScore(selectedPhoneme.symbol, Math.min(100, (selectedPhoneme.score ?? selectedPhoneme.defaultScore) + 10))}
              className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
              title="Mô phỏng luyện tập và cập nhật điểm số vào database"
            >
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span>Luyện +10%</span>
            </button>

            {/* Listen button */}
            <button
              type="button"
              onClick={() => playTTS(selectedPhoneme.examples?.[0] || selectedPhoneme.symbol)}
              className="px-3 py-2 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer border border-sky-200"
            >
              <span className="material-symbols-outlined text-sm">volume_up</span>
              <span>Nghe Mẫu</span>
            </button>

            {/* Launch Practice Room (AC 3) */}
            <button
              type="button"
              onClick={() => onSelectPractice && onSelectPractice(selectedPhoneme.symbol)}
              className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <span>Luyện Tập Âm Này</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
