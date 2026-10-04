import React, { useState, useEffect } from 'react';
import {
  TARGET_DIALECTS,
  ACCENT_CONTRAST_WORDS,
  evaluateDialectProximity
} from '../../lib/audio/accentExplorerEngine';

export default function AccentExplorerLab() {
  const [selectedDialectCode, setSelectedDialectCode] = useState('us');
  const [proximityEvaluation, setProximityEvaluation] = useState(null);

  useEffect(() => {
    const res = evaluateDialectProximity(selectedDialectCode);
    setProximityEvaluation(res);
  }, [selectedDialectCode]);

  // Global Keyboard hotkeys (1, 2, 3) for quick dialect switching (AC 4)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === '1') setSelectedDialectCode('us');
      if (e.key === '2') setSelectedDialectCode('uk');
      if (e.key === '3') setSelectedDialectCode('au');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const playTTS = (text, dialectCode = 'us') => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      if (dialectCode === 'us') utterance.lang = 'en-US';
      if (dialectCode === 'uk') utterance.lang = 'en-GB';
      if (dialectCode === 'au') utterance.lang = 'en-AU';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-sky-600 uppercase">
              ADV-108 • Accent Explorer &amp; Target Dialect Selector
            </span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-[10px] font-mono font-bold text-indigo-700">
              Hotkeys: [1] US • [2] UK • [3] AU
            </span>
          </div>
          <h2 className="text-xl font-black text-slate-900 mt-1">
            Khám Phá &amp; Chuyển Đổi Giọng Mục Tiêu (Mỹ vs Anh vs Úc)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Lựa chọn chuẩn giọng phù hợp với mục tiêu du học hoặc định cư. Hệ thống tự động đo độ tiệm cận chất giọng (Dialect Proximity %) và điều chỉnh bộ tiêu chí chấm điểm.
          </p>
        </div>
      </div>

      {/* 3 Flags Dialect Selector (AC 1 & AC 4) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {TARGET_DIALECTS.map((dialect) => {
          const isSelected = selectedDialectCode === dialect.code;
          return (
            <button
              key={dialect.code}
              onClick={() => setSelectedDialectCode(dialect.code)}
              type="button"
              className={`p-6 rounded-3xl text-left transition-all cursor-pointer relative ${
                isSelected
                  ? 'border-2 border-indigo-500 bg-indigo-500/5 shadow-[0_0_25px_rgba(99,102,241,0.2)] ring-2 ring-indigo-400/30'
                  : 'border border-slate-200 bg-slate-50 hover:bg-slate-100/80 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-4xl">{dialect.flag}</span>
                <span className="px-2 py-0.5 rounded-lg bg-slate-200/80 text-slate-700 font-mono text-[10px] font-bold">
                  Phím: [{dialect.hotkey}]
                </span>
              </div>

              <div className="mt-4">
                <h3 className="text-base font-black text-slate-900">{dialect.name}</h3>
                <span className="text-xs font-bold text-indigo-600 block mt-0.5">
                  {dialect.nativeName}
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-slate-500 space-y-1">
                {dialect.features.slice(0, 2).map((feat, fIdx) => (
                  <p key={fIdx} className="line-clamp-1">• {feat}</p>
                ))}
              </div>

              {isSelected && (
                <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
              )}
            </button>
          );
        })}
      </div>

      {/* Proximity Score Gauge Banner (AC 3) */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white border border-indigo-900 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1">
          <span className="font-mono text-xs text-indigo-400 font-bold uppercase tracking-wider block">
            Chỉ Số Tiệm Cận Giọng Mục Tiêu (Dialect Proximity)
          </span>
          <h3 className="text-lg font-bold text-white">
            Chuẩn Giọng Đang Chọn: {proximityEvaluation?.selectedDialect?.name}
          </h3>
          <p className="text-xs text-slate-300 max-w-xl">
            {proximityEvaluation?.keyAdvice}
          </p>
        </div>

        <div className="flex items-baseline gap-2 shrink-0 bg-slate-800/60 px-6 py-4 rounded-2xl border border-indigo-500/30">
          <span className="font-mono text-4xl font-black text-indigo-400">
            {proximityEvaluation?.proximityPercent ?? 78}%
          </span>
          <span className="text-xs font-mono text-slate-400 uppercase">Proximity</span>
        </div>
      </div>

      {/* Three-Column Vocabulary Contrast Matrix (AC 2) */}
      <div className="space-y-4">
        <h3 className="text-xs font-mono font-bold text-slate-400 uppercase">
          Bảng Đối Chiếu Âm Học 3 Miền (Phonemic Contrast Matrix)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ACCENT_CONTRAST_WORDS.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-black text-slate-900">{item.word}</span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                {/* US Row */}
                <div
                  className={`p-2.5 rounded-xl border flex items-center justify-between transition-colors ${
                    selectedDialectCode === 'us'
                      ? 'bg-sky-50 border-sky-300 text-sky-950'
                      : 'bg-white border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-sky-700 block">🇺🇸 Mỹ (US)</span>
                    <span className="font-bold">{item.us.ipa}</span>
                    <span className="text-[10px] text-slate-500 block">{item.us.keyFeature}</span>
                  </div>
                  <button
                    onClick={() => playTTS(item.word, 'us')}
                    type="button"
                    className="p-2 rounded-lg bg-sky-100 hover:bg-sky-200 text-sky-800 cursor-pointer transition-colors"
                    title="Nghe giọng Mỹ"
                  >
                    <span className="material-symbols-outlined text-sm">volume_up</span>
                  </button>
                </div>

                {/* UK Row */}
                <div
                  className={`p-2.5 rounded-xl border flex items-center justify-between transition-colors ${
                    selectedDialectCode === 'uk'
                      ? 'bg-rose-50 border-rose-300 text-rose-950'
                      : 'bg-white border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-rose-700 block">🇬🇧 Anh (RP)</span>
                    <span className="font-bold">{item.uk.ipa}</span>
                    <span className="text-[10px] text-slate-500 block">{item.uk.keyFeature}</span>
                  </div>
                  <button
                    onClick={() => playTTS(item.word, 'uk')}
                    type="button"
                    className="p-2 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-800 cursor-pointer transition-colors"
                    title="Nghe giọng Anh"
                  >
                    <span className="material-symbols-outlined text-sm">volume_up</span>
                  </button>
                </div>

                {/* AU Row */}
                <div
                  className={`p-2.5 rounded-xl border flex items-center justify-between transition-colors ${
                    selectedDialectCode === 'au'
                      ? 'bg-amber-50 border-amber-300 text-amber-950'
                      : 'bg-white border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-amber-700 block">🇦🇺 Úc (Aus)</span>
                    <span className="font-bold">{item.au.ipa}</span>
                    <span className="text-[10px] text-slate-500 block">{item.au.keyFeature}</span>
                  </div>
                  <button
                    onClick={() => playTTS(item.word, 'au')}
                    type="button"
                    className="p-2 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-800 cursor-pointer transition-colors"
                    title="Nghe giọng Úc"
                  >
                    <span className="material-symbols-outlined text-sm">volume_up</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
