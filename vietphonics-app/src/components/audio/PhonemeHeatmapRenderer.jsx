import React, { useState } from 'react';
import PhonemeQuickDiagnosticDrawer from './PhonemeQuickDiagnosticDrawer.jsx';

/**
 * ELSA-201: Phoneme Error Heatmap with Forced Alignment
 * Interactive phonetic tiles with color tiers, WCAG AA colorblind markers,
 * and articulatory diagnostic drawer.
 */
export default function PhonemeHeatmapRenderer({
  words = [],
  overallGop = 76,
  onPlayAudio,
  colorblindMode = false,
  onToggleColorblind
}) {
  const [selectedPhoneme, setSelectedPhoneme] = useState(null);
  const [selectedWord, setSelectedWord] = useState(null);
  const [isColorblind, setIsColorblind] = useState(colorblindMode);

  const toggleColorblind = () => {
    const nextVal = !isColorblind;
    setIsColorblind(nextVal);
    if (onToggleColorblind) onToggleColorblind(nextVal);
  };

  const handleWordClick = (wordObj) => {
    setSelectedPhoneme(null);
    setSelectedWord(wordObj);
    if (onPlayAudio) {
      onPlayAudio(wordObj.word, 0.9);
    }
  };

  const handlePhonemeClick = (e, phoneme, wordObj) => {
    e.stopPropagation();
    setSelectedWord(null);
    setSelectedPhoneme({ ...phoneme, word: wordObj.word });
    if (onPlayAudio) {
      onPlayAudio(phoneme.symbol || phoneme.ipa, 0.85);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Control bar above Heatmap */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Bản đồ nhiệt âm vị (Phoneme Heatmap):
          </span>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              {isColorblind && <span className="font-mono font-bold">✓</span>}
              ≥85% Đạt
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              {isColorblind && <span className="font-mono font-bold">!</span>}
              60-84% Lưu ý
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-medium">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              {isColorblind && <span className="font-mono font-bold">✕</span>}
              &lt;60% Cần sửa
            </span>
          </div>
        </div>

        {/* Colorblind Mode Toggle (WCAG 2.1 AA) */}
        <button
          type="button"
          onClick={toggleColorblind}
          className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5 transition-all ${
            isColorblind
              ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm ring-2 ring-indigo-200'
              : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
          }`}
          title="Bật/Tắt chế độ hỗ trợ thị giác người mù màu theo chuẩn WCAG 2.1 AA"
        >
          <span className="material-symbols-outlined text-sm">
            {isColorblind ? 'visibility' : 'visibility_off'}
          </span>
          Chế độ Mù màu (WCAG AA): {isColorblind ? 'BẬT' : 'TẮT'}
        </button>
      </div>

      {/* Interactive Word & Phoneme Heatmap Grid */}
      <div className="flex flex-wrap items-end gap-x-3.5 gap-y-6 pt-1 pb-3">
        {words.map((w, wIdx) => {
          const isWordSelected = selectedWord?.word === w.word;
          const wordGop = w.gopScore !== undefined ? w.gopScore : 75;

          // Word level border and bg
          let wordBorder = 'border-slate-200 hover:border-slate-300 bg-white';
          if (wordGop < 60) wordBorder = 'border-rose-200 bg-rose-50/30';
          else if (wordGop < 85) wordBorder = 'border-amber-200 bg-amber-50/30';

          return (
            <div
              key={`word-${w.word}-${wIdx}`}
              onClick={() => handleWordClick(w)}
              className={`group flex flex-col items-center p-2 rounded-xl border transition-all cursor-pointer shadow-sm hover:shadow ${wordBorder} ${
                isWordSelected ? 'ring-2 ring-sky-500 border-sky-400 bg-sky-50/50' : ''
              }`}
            >
              {/* Word Display with phonetic coloring */}
              <div className="font-ipa-display text-xl font-bold tracking-tight text-slate-800 flex items-center gap-0.5">
                {w.word}
              </div>

              {/* Sub-Phoneme Chips List */}
              <div className="flex items-center gap-1 mt-2">
                {w.phonemes && w.phonemes.map((p, pIdx) => {
                  const pScore = p.score !== undefined ? p.score : 70;
                  const isError = pScore < 60;
                  const isAcceptable = pScore >= 60 && pScore < 85;
                  const isMastered = pScore >= 85;

                  let chipStyle = 'bg-emerald-50 text-emerald-800 border-emerald-300';
                  let markerIcon = '✓';

                  if (isError) {
                    chipStyle = 'bg-rose-100 text-rose-800 border-rose-400 ring-2 ring-rose-400 ring-offset-1 animate-pulse';
                    markerIcon = '✕';
                  } else if (isAcceptable) {
                    chipStyle = 'bg-amber-50 text-amber-800 border-amber-300';
                    markerIcon = '!';
                  }

                  const isPhonemeSelected = selectedPhoneme?.symbol === p.symbol && selectedPhoneme?.word === w.word;

                  return (
                    <button
                      key={`p-${w.word}-${p.symbol}-${pIdx}`}
                      type="button"
                      onClick={(e) => handlePhonemeClick(e, p, w)}
                      title={`Âm /${p.symbol}/: ${pScore}% GOP. Nhấp để xem giải thích âm học.`}
                      className={`relative font-mono px-2 py-0.5 rounded-md text-xs font-bold border transition-transform hover:scale-110 flex items-center gap-0.5 ${chipStyle} ${
                        isPhonemeSelected ? 'scale-110 ring-2 ring-sky-600' : ''
                      }`}
                    >
                      <span>/{p.symbol}/</span>
                      {isColorblind && (
                        <span className="text-[10px] font-black opacity-90 ml-0.5">
                          {markerIcon}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Word GOP Score Badge */}
              <div className="mt-1.5 flex items-center gap-1">
                <span className={`font-mono text-[10px] font-bold px-1.5 py-0.2 rounded ${
                  wordGop >= 85 ? 'text-emerald-700 bg-emerald-100' :
                  wordGop >= 60 ? 'text-amber-700 bg-amber-100' :
                  'text-rose-700 bg-rose-100'
                }`}>
                  {wordGop}% GOP
                </span>
                {isColorblind && (
                  <span className="font-mono text-[10px] font-bold text-slate-500">
                    {wordGop >= 85 ? '[✓]' : wordGop >= 60 ? '[!]' : '[✕]'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Diagnostic Popover / Drawer */}
      <PhonemeQuickDiagnosticDrawer
        selectedPhoneme={selectedPhoneme}
        selectedWord={selectedWord}
        onClose={() => { setSelectedPhoneme(null); setSelectedWord(null); }}
        onPlayAudio={onPlayAudio}
      />
    </div>
  );
}
