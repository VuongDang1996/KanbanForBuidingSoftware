import React from 'react';

/**
 * ELSA-201: AC 3 - Phoneme Quick Diagnostic Drawer
 * Opens when learner clicks on an individual phoneme or word tile.
 * Displays large IPA symbol, Vietnamese L1 trap explanation, articulatory guide,
 * and audio playback/practice actions.
 */
export default function PhonemeQuickDiagnosticDrawer({
  selectedPhoneme,
  selectedWord,
  onClose,
  onPlayAudio
}) {
  if (!selectedPhoneme && !selectedWord) return null;

  const item = selectedPhoneme || selectedWord;
  const isPhoneme = Boolean(selectedPhoneme);
  const symbol = isPhoneme ? item.ipa || `/${item.symbol}/` : `/${item.word}/`;
  const score = item.score !== undefined ? item.score : item.gopScore || 70;

  const getTierBadge = (s) => {
    if (s >= 85) return { bg: 'bg-emerald-100 text-emerald-800 border-emerald-300', text: 'Xuất sắc (≥85%)' };
    if (s >= 60) return { bg: 'bg-amber-100 text-amber-800 border-amber-300', text: 'Cần trau chuốt (60-84%)' };
    return { bg: 'bg-rose-100 text-rose-800 border-rose-300', text: 'Cần sửa ngay (<60%)' };
  };

  const badge = getTierBadge(score);

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-2xl border-l border-slate-200 z-50 flex flex-col transition-all duration-300 animate-in slide-in-from-right">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-sky-600">graphic_eq</span>
          <h3 className="font-bold text-slate-800 text-sm">
            {isPhoneme ? 'Giám định Âm vị Chi tiết' : 'Giám định Từ vựng'}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          title="Đóng bảng chẩn đoán"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-6 overflow-y-auto flex-1 space-y-5">
        {/* Large IPA Hero Display */}
        <div className="text-center py-4 bg-slate-50 rounded-2xl border border-slate-200/80">
          <div className="font-ipa-display text-5xl font-extrabold text-slate-900 tracking-wide font-mono">
            {symbol}
          </div>
          {isPhoneme && item.word && (
            <div className="text-xs text-slate-500 mt-1">
              Trong từ: <span className="font-bold text-slate-700">"{item.word}"</span>
            </div>
          )}
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className={`text-xs px-2.5 py-1 rounded-full font-bold border ${badge.bg}`}>
              {score}% GOP — {badge.text}
            </span>
          </div>
          {item.startMs !== undefined && item.endMs !== undefined && (
            <div className="text-[11px] font-mono text-slate-400 mt-1">
              Forced Alignment: {item.startMs}ms → {item.endMs}ms (Δ {item.endMs - item.startMs}ms)
            </div>
          )}
        </div>

        {/* Audio Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onPlayAudio && onPlayAudio(isPhoneme ? item.symbol || item.ipa : item.word, 0.85)}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-sky-600 hover:bg-sky-700 text-white font-medium text-xs rounded-xl shadow-sm transition-colors"
          >
            <span className="material-symbols-outlined text-base">volume_up</span>
            Nghe âm chuẩn
          </button>
          <button
            onClick={() => onPlayAudio && onPlayAudio(isPhoneme ? item.symbol || item.ipa : item.word, 0.55)}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-xl transition-colors border border-slate-200"
          >
            <span className="material-symbols-outlined text-base">slow_motion_video</span>
            Nghe chậm 0.5x
          </button>
        </div>

        {/* Vietnamese L1 Trap Explanation */}
        <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800">
            <span className="material-symbols-outlined text-sm text-rose-600">warning</span>
            Bẫy phát âm người Việt hay mắc:
          </div>
          <p className="text-xs text-rose-900 leading-relaxed">
            {item.trap || (isPhoneme
              ? 'Người Việt có xu hướng nuốt âm đuôi này hoặc hạ tông giọng khiến người bản xứ khó nhận diện từ.'
              : 'Từ này chứa các cụm phụ âm liên tiếp mà cơ miệng tiếng Việt chưa quen điều phối hơi.')}
          </p>
        </div>

        {/* Articulatory Guidance */}
        <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
            <span className="material-symbols-outlined text-sm text-emerald-600">psychology</span>
            Khẩu hình &amp; Kỹ thuật khắc phục:
          </div>
          <p className="text-xs text-emerald-900 leading-relaxed">
            {item.tip || 'Tập trung vào vị trí tiếp xúc của lưỡi và luồng hơi. Đừng vội phát âm từ tiếp theo trước khi âm đuôi này thoát hơi trọn vẹn.'}
          </p>
          {item.articulatory && (
            <div className="text-[11px] text-emerald-700 font-medium mt-1 pt-1 border-t border-emerald-200/60">
              {item.articulatory}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
        <span className="text-[11px] text-slate-500">Mã âm tố: {symbol}</span>
        <button
          onClick={onClose}
          className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg transition-colors"
        >
          Xong
        </button>
      </div>
    </div>
  );
}
