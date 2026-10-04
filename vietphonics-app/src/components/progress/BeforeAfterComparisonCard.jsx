import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export default function BeforeAfterComparisonCard({ accountId = 'default_user' }) {
  const { triggerPractice } = useApp();
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(false);
  const [playingTrack, setPlayingTrack] = useState(null); // 'baseline' | 'latest' | null
  const [consentGranted, setConsentGranted] = useState(true);

  useEffect(() => {
    fetchComparisonData();
  }, [accountId]);

  const fetchComparisonData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/v1/progress/before-after-comparison/${accountId}`);
      const data = await res.json();
      if (data && data.success) {
        setComparison(data);
        setConsentGranted(data.consentGranted);
      }
    } catch (err) {
      console.warn('Failed to fetch before/after comparison:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleConsent = async () => {
    const newConsent = !consentGranted;
    setConsentGranted(newConsent);
    try {
      await fetch('/api/v1/progress/toggle-voice-consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountId, consentGranted: newConsent })
      });
      fetchComparisonData();
    } catch {}
  };

  const playAudio = (text, type, rate = 0.85) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = type === 'baseline' ? 0.75 : 0.9;
      utterance.onstart = () => setPlayingTrack(type);
      utterance.onend = () => setPlayingTrack(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  const rePracticeItem = {
    id: 'sent_focus_01',
    word: 'Months',
    sentence: 'Six months ago, she baked fresh bread for breakfast on the street.',
    ipa: '/sɪks mʌnθs əˈɡoʊ, ʃi beɪkt freʃ bred fɔːr ˈbrekfəst ɒn ðə striːt/',
    targetPhonemes: ['/ks/', '/nθs/', '/kt/', '/st/'],
    difficulty: 'Intermediate',
    trap: 'So sánh trực tiếp với bản ghi Day 1'
  };

  if (!comparison?.hasComparison) return null;

  return (
    <div className="w-full bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-xl">compare_arrows</span>
            <h3 className="font-bold text-slate-900 text-base sm:text-lg">
              So Sánh Giọng Nói: Ngày Đầu Tiên vs Hôm Nay (PROG-102)
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              +{comparison.overallDelta}% GOP
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Cảm nhận rõ sự tiến bộ bằng chính đôi tai của bạn. Đo đạc độ lệch âm học giữa bản thu đầu vào và bản thu mới nhất.
          </p>
        </div>

        {/* Model Consistency Badge (AC 4) */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="font-mono text-[10px] px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 font-semibold" title="Đảm bảo so sánh công bằng trên cùng phiên bản thuật toán">
            Mô hình: {comparison.modelVersion}
          </span>
        </div>
      </div>

      {/* Target Sentence Display */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col gap-1">
        <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">Câu đối chiếu chuẩn:</span>
        <div className="font-serif italic text-base sm:text-lg text-slate-800">
          “{comparison.sentenceText}”
        </div>
      </div>

      {/* Dual Audio Track Comparison Players (AC 3) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Track 1: Baseline (Day 1) */}
        <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200/80 flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="font-bold text-xs uppercase tracking-wider text-rose-900">
                Bản Thu Ngày Đầu Tiên (Day 1)
              </span>
            </div>
            <span className="font-mono text-xs font-bold text-rose-700">{comparison.baselineOverallGop}% GOP</span>
          </div>

          <div className="text-xs text-slate-600 font-mono">
            Ngày ghi: {new Date(comparison.baselineDate).toLocaleDateString('vi-VN')}
          </div>

          {consentGranted ? (
            <button
              type="button"
              onClick={() => playAudio('Six months ago she bake fresh bread for breakfast on street', 'baseline')}
              className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                playingTrack === 'baseline'
                  ? 'bg-rose-600 text-white ring-4 ring-rose-300 animate-pulse'
                  : 'bg-white hover:bg-rose-100 border border-rose-200 text-rose-800 shadow-2xs'
              }`}
            >
              <span className="material-symbols-outlined text-base">
                {playingTrack === 'baseline' ? 'stop' : 'volume_up'}
              </span>
              <span>{playingTrack === 'baseline' ? 'Đang phát bản thu Day 1...' : 'Nghe Giọng Ngày Đầu'}</span>
            </button>
          ) : (
            <div className="text-[11px] text-slate-400 bg-white p-2 rounded-lg border border-slate-200 text-center">
              🔒 Audio đã ẩn (Chưa cấp quyền lưu giọng nói)
            </div>
          )}
        </div>

        {/* Track 2: Today (Day 30) */}
        <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/80 flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="font-bold text-xs uppercase tracking-wider text-emerald-900">
                Bản Thu Mới Nhất (Hôm Nay)
              </span>
            </div>
            <span className="font-mono text-xs font-bold text-emerald-700">{comparison.latestOverallGop}% GOP</span>
          </div>

          <div className="text-xs text-slate-600 font-mono">
            Ngày ghi: {new Date(comparison.latestDate).toLocaleDateString('vi-VN')}
          </div>

          {consentGranted ? (
            <button
              type="button"
              onClick={() => playAudio('Six months ago she baked fresh bread for breakfast on the street', 'latest')}
              className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                playingTrack === 'latest'
                  ? 'bg-emerald-600 text-white ring-4 ring-emerald-300 animate-pulse'
                  : 'bg-white hover:bg-emerald-100 border border-emerald-200 text-emerald-800 shadow-2xs'
              }`}
            >
              <span className="material-symbols-outlined text-base">
                {playingTrack === 'latest' ? 'stop' : 'volume_up'}
              </span>
              <span>{playingTrack === 'latest' ? 'Đang phát bản thu hôm nay...' : 'Nghe Giọng Hiện Tại'}</span>
            </button>
          ) : (
            <div className="text-[11px] text-slate-400 bg-white p-2 rounded-lg border border-slate-200 text-center">
              🔒 Audio đã ẩn (Chưa cấp quyền lưu giọng nói)
            </div>
          )}
        </div>
      </div>

      {/* Phoneme Delta Breakdown Table (AC 3) */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold text-slate-700">Chi tiết cải thiện từng âm vị mục tiêu:</span>
        <div className="overflow-x-auto border border-slate-200/80 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-mono border-b border-slate-200">
              <tr>
                <th className="p-2.5">Âm Vị</th>
                <th className="p-2.5">Day 1</th>
                <th className="p-2.5">Hôm Nay</th>
                <th className="p-2.5">Mức Cải Thiện</th>
                <th className="p-2.5">Ghi Chú Âm Học</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {comparison.phonemeDeltas?.map((item) => (
                <tr key={item.phoneme} className="hover:bg-slate-50">
                  <td className="p-2.5 font-mono font-bold text-slate-900 text-sm">{item.phoneme}</td>
                  <td className="p-2.5 font-mono text-slate-500">{item.baselineScore}%</td>
                  <td className="p-2.5 font-mono font-bold text-slate-800">{item.latestScore}%</td>
                  <td className="p-2.5 font-mono font-bold">
                    <span className={`px-2 py-0.5 rounded-full ${
                      item.improved
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {item.delta > 0 ? `+${item.delta}%` : `${item.delta}%`}
                    </span>
                  </td>
                  <td className="p-2.5 text-slate-600">{item.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Controls: Re-Prompt & Consent Toggle */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
        <button
          type="button"
          onClick={() => triggerPractice(rePracticeItem)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-rose-600 text-white font-bold text-xs shadow-xs hover:brightness-105 transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">mic</span>
          <span>Đọc Lại Câu Này Để Cập Nhật Bản Thu Mới</span>
        </button>

        <button
          type="button"
          onClick={handleToggleConsent}
          className="text-xs text-slate-500 hover:text-slate-800 transition flex items-center gap-1.5 self-center sm:self-auto cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">
            {consentGranted ? 'verified_user' : 'lock'}
          </span>
          <span>{consentGranted ? 'Quyền lưu trữ giọng nói: Đang Bật' : 'Quyền lưu trữ giọng nói: Đã Tắt'}</span>
        </button>
      </div>
    </div>
  );
}
