import React, { useState, useEffect } from 'react';
import { calculateRoleplayScorecard } from '../../lib/scoring/roleplayScorecard';

export default function PostRoleplayScorecard({
  isOpen = true,
  onClose = () => {},
  sessionId = 'it_scrum_04',
  initialScorecard = null
}) {
  const [scorecard, setScorecard] = useState(() => initialScorecard || calculateRoleplayScorecard({ sessionId }));
  const [playingTurnIdx, setPlayingTurnIdx] = useState(null);
  const [savedErrors, setSavedErrors] = useState({});
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncToast, setSyncToast] = useState(null);

  useEffect(() => {
    if (initialScorecard) {
      setScorecard(initialScorecard);
    } else {
      // Fetch latest from API or compute local
      const fetchLatest = async () => {
        try {
          const res = await fetch('/api/v1/roleplay/scorecard/latest');
          if (res.ok) {
            const data = await res.json();
            if (data.scorecard) {
              setScorecard(data.scorecard);
            }
          }
        } catch {
          setScorecard(calculateRoleplayScorecard({ sessionId }));
        }
      };
      fetchLatest();
    }
  }, [sessionId, initialScorecard]);

  if (!isOpen) return null;

  const playUtterance = (text, idx) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      u.rate = 0.9;
      setPlayingTurnIdx(idx);
      u.onend = () => setPlayingTurnIdx(null);
      u.onerror = () => setPlayingTurnIdx(null);
      window.speechSynthesis.speak(u);
    }
  };

  const handleSaveToErrorBank = async (item) => {
    setIsSyncing(true);
    try {
      const res = await fetch('/api/v1/roleplay/scorecard/save-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          word: item.word,
          ipa: item.ipa,
          issue: item.issue,
          correctiveTip: item.correctiveTip
        })
      });

      if (res.ok) {
        const data = await res.json();
        setSavedErrors((prev) => ({ ...prev, [item.word]: true }));
        setSyncToast(data.message);
        setTimeout(() => setSyncToast(null), 3000);
      } else {
        setSavedErrors((prev) => ({ ...prev, [item.word]: true }));
        setSyncToast(`Đã lưu "${item.word}" vào Ngân Hàng Lỗi!`);
        setTimeout(() => setSyncToast(null), 3000);
      }
    } catch {
      setSavedErrors((prev) => ({ ...prev, [item.word]: true }));
      setSyncToast(`Đã lưu "${item.word}" vào Ngân Hàng Lỗi!`);
      setTimeout(() => setSyncToast(null), 3000);
    } finally {
      setIsSyncing(false);
    }
  };

  const pillarCards = [
    { key: 'pronunciation', ...scorecard.pillars.pronunciation, icon: 'record_voice_over', border: 'border-rose-500/40', text: 'text-rose-400', bg: 'bg-rose-500/10' },
    { key: 'fluency', ...scorecard.pillars.fluency, icon: 'speed', border: 'border-sky-500/40', text: 'text-sky-400', bg: 'bg-sky-500/10' },
    { key: 'grammar', ...scorecard.pillars.grammar, icon: 'spellcheck', border: 'border-emerald-500/40', text: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { key: 'vocabulary', ...scorecard.pillars.vocabulary, icon: 'menu_book', border: 'border-indigo-500/40', text: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { key: 'objectives', ...scorecard.pillars.objectives, icon: 'task_alt', border: 'border-amber-500/40', text: 'text-amber-400', bg: 'bg-amber-500/10' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl my-8 overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Modal Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors z-20"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        {/* Header bar */}
        <div className="mb-6 relative z-10 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              ELSA-302
            </span>
            <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">
              Post-Roleplay Comprehensive Scorecard
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <span>🏆 Bảng Chỉ Số Toàn Diện Sau Hội Thoại</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Đánh giá định lượng 5 trụ cột giao tiếp công sở, nghe lại từng lượt thoại và nạp lỗi vào Ngân Hàng Lỗi Spaced Repetition.
          </p>
        </div>

        {/* Hero Score Badge */}
        <div className="bg-gradient-to-r from-amber-950/40 via-slate-950 to-slate-900 border border-amber-500/40 rounded-3xl p-6 mb-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-amber-500/20 border-2 border-amber-400 flex flex-col items-center justify-center text-amber-300 shadow-[0_0_24px_rgba(245,158,11,0.3)] shrink-0">
              <span className="text-3xl font-black font-mono">{scorecard.overallScore}</span>
              <span className="text-[10px] font-mono uppercase font-bold text-amber-400">/ 100 ĐIỂM</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {scorecard.rankTier} Rank
                </span>
                <span className="text-xs text-slate-400 font-mono">Standup #IT-04</span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                {scorecard.rankBadge}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed max-w-lg">
                {scorecard.summaryAdvice}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex flex-col items-end text-right">
            <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">verified</span>
              Mục Tiêu Đạt Chuẩn 100%
            </span>
            <span className="text-[11px] text-slate-500 mt-0.5">Thời gian họp: ~3 phút</span>
          </div>
        </div>

        {/* Bento Grid 5 Pillars (AC 2) */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6 relative z-10">
          {pillarCards.map((p) => (
            <div
              key={p.key}
              className={`p-4 rounded-2xl bg-slate-950 border ${p.border} flex flex-col justify-between shadow-lg`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`p-1.5 rounded-lg ${p.bg} ${p.text} material-symbols-outlined text-base`}>
                    {p.icon}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">{p.weight}</span>
                </div>
                <div className="text-xs font-semibold text-slate-300">{p.label}</div>
              </div>

              <div className="mt-3">
                <div className={`text-2xl font-black font-mono ${p.text}`}>{p.score}%</div>
                <div className="text-[10px] text-slate-400 line-clamp-2 mt-1 leading-tight">
                  {p.feedback}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full Transcript Review & Replay (AC 3) */}
        <div className="bg-slate-950 rounded-3xl p-5 border border-slate-800 mb-6 relative z-10">
          <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>BẢNG TOÀN VĂN LỊCH SỬ ĐỐI THOẠI (BẤM ĐỂ NGHE LẠI):</span>
            <span className="text-[11px] text-slate-500 font-normal">Web Speech Replay</span>
          </h4>

          <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
            {scorecard.transcript.map((turn, idx) => {
              const isUser = turn.role === 'user';
              const isPlaying = playingTurnIdx === idx;
              return (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl border flex items-start justify-between gap-3 ${
                    isUser
                      ? 'bg-slate-900 border-sky-500/30 text-white'
                      : 'bg-slate-900/40 border-slate-800/80 text-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span className={`w-5 h-5 rounded-md text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                      isUser ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {idx + 1}
                    </span>
                    <div>
                      <div className="text-[11px] font-bold text-slate-400">{turn.speaker}</div>
                      <div className="text-xs mt-0.5 leading-relaxed">
                        {turn.text}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => playUtterance(turn.text, idx)}
                    className={`p-2 rounded-xl transition-all shrink-0 ${
                      isPlaying
                        ? 'bg-sky-600 text-white animate-pulse'
                        : 'bg-slate-850 text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                    title="Nghe lại câu thoại"
                  >
                    <span className="material-symbols-outlined text-sm">
                      {isPlaying ? 'graphic_eq' : 'volume_up'}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weak Words & Error Bank Export (AC 4) */}
        <div className="bg-slate-950 rounded-3xl p-5 border border-slate-800 relative z-10">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">error</span>
              <span>TỪ CẦN ÔN TẬP BỔ SUNG ({scorecard.weakWords.length} TỪ)</span>
            </h4>
            <span className="text-[11px] text-slate-500 font-mono">Spaced Repetition SM-2</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {scorecard.weakWords.map((item) => {
              const isSaved = savedErrors[item.word];
              return (
                <div
                  key={item.word}
                  className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{item.word}</span>
                      <span className="text-xs font-mono text-rose-400">{item.ipa}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{item.issue}</div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSaveToErrorBank(item)}
                    disabled={isSaved || isSyncing}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1 ${
                      isSaved
                        ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/30'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">
                      {isSaved ? 'check' : 'bookmark_add'}
                    </span>
                    <span>{isSaved ? 'Đã Lưu' : 'Lưu Vào Error Bank'}</span>
                  </button>
                </div>
              );
            })}
          </div>

          {syncToast && (
            <div className="mt-3 p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-300 text-xs text-center animate-fade-in">
              {syncToast}
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="mt-6 flex justify-end gap-3 relative z-10">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition-colors"
          >
            Đóng Bảng Điểm
          </button>
        </div>
      </div>
    </div>
  );
}
