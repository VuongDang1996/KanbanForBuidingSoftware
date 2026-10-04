import React, { useState, useEffect } from 'react';
import {
  POSITIONAL_LADDER_CATALOG,
  calculateTierStars,
  evaluateLadderProgression
} from '../../lib/scoring/positionalLadder';

export default function PositionalLadder({
  initialPhoneme = '/z/'
}) {
  const [selectedPhoneme, setSelectedPhoneme] = useState(initialPhoneme);
  const profile = POSITIONAL_LADDER_CATALOG[selectedPhoneme] || POSITIONAL_LADDER_CATALOG['/z/'];

  const [activeTier, setActiveTier] = useState(1);
  const [tierScores, setTierScores] = useState({ 1: 88, 2: 78, 3: 0 }); // Initial state
  const [progression, setProgression] = useState(() => evaluateLadderProgression(88, 78, 0));
  const [activeWordPlaying, setActiveWordPlaying] = useState(null);

  // Re-evaluate progression when scores change
  useEffect(() => {
    setProgression(evaluateLadderProgression(tierScores[1] || 0, tierScores[2] || 0, tierScores[3] || 0));
  }, [tierScores, selectedPhoneme]);

  // Audio Playback
  const playWordAudio = (word) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setActiveWordPlaying(word);

    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    utterance.onend = () => setActiveWordPlaying(null);
    utterance.onerror = () => setActiveWordPlaying(null);

    window.speechSynthesis.speak(utterance);
  };

  // Simulate practicing and submitting tier score
  const handlePracticeTier = async (tierNum) => {
    const mockScore = tierNum === 1 ? 92 : tierNum === 2 ? 86 : 82;
    const targetWord = profile.tiers.find(t => t.tier === tierNum)?.words[0]?.word || 'practice';

    setTierScores(prev => ({
      ...prev,
      [tierNum]: mockScore
    }));

    try {
      const res = await fetch('/api/v1/practice/positional-ladder/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneme: selectedPhoneme,
          tier: tierNum,
          word: targetWord,
          score: mockScore
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.progression) {
          setProgression(data.progression);
        }
      }
    } catch {
      // Fallback local update
    }
  };

  const getTierState = (tierNum) => {
    if (tierNum === 1) return progression.tier1;
    if (tierNum === 2) return progression.tier2;
    return progression.tier3;
  };

  return (
    <section className="w-full bg-white rounded-2xl p-space-md md:p-space-lg shadow-sm border border-slate-200/90 relative overflow-hidden transition-all">
      {/* Decorative gradient blur */}
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-indigo-100/40 blur-[60px] pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-space-sm gap-3 border-b border-slate-100 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-label-mono text-label-mono uppercase text-indigo-700 font-bold tracking-wider">
              PRON-205 · 3-Tier Positional Phoneme Ladder
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-label-mono bg-indigo-100 text-indigo-800 font-bold">
              Allophonic Mastery
            </span>
          </div>
          <h3 className="text-heading-md font-bold text-slate-900 mt-1">
            Luyện Âm Phân Vị 3 Cấp Độ: Đầu — Giữa — Cuối
          </h3>
          <p className="text-body-sm text-slate-500">
            Khắc phục hiện tượng "chỉ nói đúng được chữ đầu"; chinh phục cửa ải phụ âm đuôi (Coda) khó nhất của người Việt.
          </p>
        </div>

        {/* Total Stars Counter */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-full px-4 py-2 font-mono text-sm text-white flex items-center gap-2 shadow-xs">
            <span className="text-amber-400">★</span>
            <span className="font-bold text-amber-300">
              {progression.totalStars}/9 Sao Làm Chủ
            </span>
            <span className="text-xs text-slate-400">({selectedPhoneme})</span>
          </div>
        </div>
      </div>

      {/* Phoneme Ladder Tabs */}
      <div className="flex flex-wrap items-center gap-2 mt-4 pt-1">
        {Object.values(POSITIONAL_LADDER_CATALOG).map((p) => (
          <button
            key={p.phoneme}
            type="button"
            onClick={() => {
              setSelectedPhoneme(p.phoneme);
              setActiveTier(1);
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 border ${
              selectedPhoneme === p.phoneme
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            <span className="font-ipa-inline font-bold px-1.5 py-0.5 rounded bg-white/20 text-white">
              {p.phoneme}
            </span>
            <span>{p.name.split('(')[0]}</span>
          </button>
        ))}
      </div>

      {/* 3-Tier Vertical Ladder Layout (AC 1 & AC 2) */}
      <div className="mt-5 space-y-4">
        {profile.tiers.slice().reverse().map((tierItem) => {
          const tState = getTierState(tierItem.tier);
          const isUnlocked = tState.isUnlocked;
          const stars = tState.stars;

          const colorTheme =
            tierItem.tier === 3
              ? { border: 'border-rose-300', bg: 'bg-rose-50/40', badge: 'bg-rose-100 text-rose-800', btn: 'bg-rose-600 hover:bg-rose-700' }
              : tierItem.tier === 2
              ? { border: 'border-indigo-300', bg: 'bg-indigo-50/40', badge: 'bg-indigo-100 text-indigo-800', btn: 'bg-indigo-600 hover:bg-indigo-700' }
              : { border: 'border-sky-300', bg: 'bg-sky-50/40', badge: 'bg-sky-100 text-sky-800', btn: 'bg-sky-600 hover:bg-sky-700' };

          return (
            <div
              key={tierItem.tier}
              className={`p-4 md:p-5 rounded-xl border transition-all relative ${
                isUnlocked
                  ? `${colorTheme.border} ${colorTheme.bg} shadow-xs`
                  : 'border-slate-200 bg-slate-50/60 opacity-60'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Left Tier Info */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-label-mono ${
                      isUnlocked ? colorTheme.badge : 'bg-slate-200 text-slate-600'
                    }`}>
                      TIER {tierItem.tier}: {tierItem.position.toUpperCase()}
                    </span>
                    <span className="font-bold text-slate-800 text-sm">
                      {tierItem.label}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    {tierItem.description}
                  </p>

                  {/* Word Badges */}
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    {tierItem.words.map((w) => (
                      <button
                        key={w.word}
                        type="button"
                        onClick={() => playWordAudio(w.word)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 border ${
                          activeWordPlaying === w.word
                            ? 'bg-slate-900 text-white border-slate-900 ring-2 ring-indigo-400'
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-2xs'
                        }`}
                        title="Click để nghe phát âm mẫu"
                      >
                        <span>{w.word}</span>
                        <span className="text-[11px] font-ipa-inline opacity-70 text-indigo-700">{w.ipa}</span>
                        <span className="material-symbols-outlined text-xs">volume_up</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right Stars & Practice Trigger */}
                <div className="flex items-center gap-4 self-end md:self-auto shrink-0">
                  {/* Star Rating Display (AC 2) */}
                  <div className="flex items-center gap-1 text-lg">
                    {[1, 2, 3].map((starIdx) => (
                      <span
                        key={starIdx}
                        className={starIdx <= stars ? 'text-amber-400' : 'text-slate-300'}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Practice / Unlock Action Button */}
                  {isUnlocked ? (
                    <button
                      type="button"
                      onClick={() => handlePracticeTier(tierItem.tier)}
                      className={`px-4 py-2 rounded-xl text-white text-xs font-bold transition-all shadow-xs active:scale-95 flex items-center gap-1.5 ${colorTheme.btn}`}
                    >
                      <span className="material-symbols-outlined text-sm">mic</span>
                      <span>{stars >= 3 ? 'Luyện Lại' : 'Bắt Đầu'} ({tState.score}%)</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-200 text-slate-500 text-xs font-semibold">
                      <span className="material-symbols-outlined text-sm">lock</span>
                      <span>Đạt ≥80% Tier {tierItem.tier - 1} để mở</span>
                    </div>
                  )}
                </div>
              </div>

              {/* L1 Final Position Consonant Alert Card (AC 3) */}
              {tierItem.tier === 3 && (
                <div className="mt-3 pt-3 border-t border-rose-200/80 flex items-start gap-2.5 text-xs text-rose-900 bg-rose-100/60 p-3 rounded-lg">
                  <span className="material-symbols-outlined text-rose-600 text-lg shrink-0 mt-0.5">
                    warning
                  </span>
                  <div>
                    <strong className="font-bold text-rose-950">
                      Cảnh Báo Thói Quen Tiếng Việt (L1 Coda Trap):
                    </strong>{' '}
                    <span>{profile.l1FinalWarning}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
