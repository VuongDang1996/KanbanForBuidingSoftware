import React, { useState, useEffect } from 'react';
import { CONNECTED_SPEECH_DRILLS, evaluateConnectedSpeechFlow } from '../../lib/audio/connectedSpeechEngine';

export default function ConnectedSpeechLab() {
  const [selectedDrillId, setSelectedDrillId] = useState('cs_hold_on');
  const [isRecording, setIsRecording] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [simulatedPause, setSimulatedPause] = useState(45); // ms

  const currentDrill =
    CONNECTED_SPEECH_DRILLS.find((d) => d.id === selectedDrillId) ||
    CONNECTED_SPEECH_DRILLS[0];

  // Initial evaluation on drill change
  useEffect(() => {
    handleEvaluate(simulatedPause);
  }, [selectedDrillId]);

  const handleEvaluate = (pauseMs = 45) => {
    const boundaries = currentDrill.linkingPairs.map((p) => ({
      fromWord: p.fromWord,
      toWord: p.toWord,
      measuredPauseMs: pauseMs
    }));
    const res = evaluateConnectedSpeechFlow(selectedDrillId, boundaries);
    setEvaluation(res);
  };

  const handleSimulateStaccato = () => {
    setSimulatedPause(140);
    handleEvaluate(140);
  };

  const handleSimulateSmooth = () => {
    setSimulatedPause(40);
    handleEvaluate(40);
  };

  const playTTS = (text, rate = 1.0) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = rate;
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
              ADV-105 • Connected Speech &amp; Flow Lab
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-mono font-bold text-emerald-700">
              Linking Arcs &amp; Flow Score
            </span>
          </div>
          <h2 className="text-xl font-black text-slate-900 mt-1">
            Luyện Nối Âm, Nuốt Âm &amp; Triệt Tiêu Thói Quen Ngắt Câu Rời Rạc
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Theo dõi sự liên tục của dải phổ tại ranh giới từ. Phát hiện khoảng lặng ngắt âm (&gt;120ms) của người Việt để sửa phản xạ đơn lập.
          </p>
        </div>

        {/* Drill Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-500 whitespace-nowrap">Chọn câu:</label>
          <select
            value={selectedDrillId}
            onChange={(e) => setSelectedDrillId(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            {CONNECTED_SPEECH_DRILLS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.sentence}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Sentence Interactive Card with SVG Linking Arcs */}
      <div className="p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 text-white relative overflow-hidden shadow-xl border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-xs font-bold text-sky-400 uppercase tracking-widest">
            Acoustic Linking Canvas
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => playTTS(currentDrill.sentence, 0.75)}
              type="button"
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined text-sm">slow_motion_video</span>
              <span>Chậm 0.75x</span>
            </button>
            <button
              onClick={() => playTTS(currentDrill.sentence, 1.0)}
              type="button"
              className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined text-sm">volume_up</span>
              <span>Nghe Bản Ngữ</span>
            </button>
          </div>
        </div>

        {/* Words and Arcs Visualization */}
        <div className="py-8 px-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-10 relative">
          {currentDrill.words.map((w, idx) => {
            const hasPairAfter = currentDrill.linkingPairs.some(
              (p) => p.fromWord.toLowerCase() === w.text.toLowerCase()
            );
            const pairEval = evaluation?.evaluatedPairs?.find(
              (p) => p.fromWord.toLowerCase() === w.text.toLowerCase()
            );
            const isSmooth = pairEval?.linked ?? true;

            return (
              <div key={w.id} className="relative flex flex-col items-center group">
                <span className="text-3xl sm:text-4xl font-black tracking-wide text-white drop-shadow-md">
                  {w.text}
                </span>
                <span className="font-mono text-xs text-sky-300 mt-1">{w.ipa}</span>

                {/* SVG Connecting Arc to Next Word */}
                {hasPairAfter && (
                  <div className="absolute -top-7 -right-8 pointer-events-none flex flex-col items-center">
                    <svg width="48" height="24" viewBox="0 0 48 24" className="overflow-visible">
                      <path
                        d="M 2,22 Q 24,2 46,22"
                        fill="none"
                        stroke={isSmooth ? '#34d399' : '#f59e0b'}
                        strokeWidth="3"
                        strokeDasharray={isSmooth ? 'none' : '4 3'}
                        className="animate-pulse"
                      />
                    </svg>
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full -mt-1 ${
                        isSmooth
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}
                    >
                      {isSmooth ? 'Linked' : 'Staccato'}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="border-t border-slate-800 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <span>IPA Chuẩn: <code className="text-sky-300 font-mono">{currentDrill.ipa}</code></span>
          <span className="font-mono text-emerald-400 font-bold">
            {evaluation?.isMastered ? '✨ Ngữ lưu liên tục hoàn hảo' : '⚠️ Cần bắc cầu phụ âm'}
          </span>
        </div>
      </div>

      {/* Flow Score and Staccato Telemetry Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Flow Score Metric Card */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono font-bold text-slate-400 uppercase">
              Điểm Ngữ Lưu (Flow Score)
            </span>
            <div className="text-4xl font-black text-slate-900 mt-2 flex items-baseline gap-1">
              <span className={evaluation?.flowScore >= 85 ? 'text-emerald-600' : 'text-amber-600'}>
                {evaluation?.flowScore ?? 92}
              </span>
              <span className="text-sm text-slate-400 font-normal">/ 100</span>
            </div>
          </div>
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden mt-4">
            <div
              className={`h-full transition-all duration-500 ${
                evaluation?.flowScore >= 85 ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
              style={{ width: `${evaluation?.flowScore ?? 92}%` }}
            />
          </div>
        </div>

        {/* Staccato Warning Card */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono font-bold text-slate-400 uppercase">
              Khoảng Ngắt Nghỉ (Inter-word Pause)
            </span>
            <div className="text-4xl font-black text-slate-900 mt-2 flex items-baseline gap-1">
              <span className={simulatedPause <= 90 ? 'text-emerald-600' : 'text-rose-600'}>
                {simulatedPause}
              </span>
              <span className="text-sm text-slate-400 font-normal">ms</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            {simulatedPause <= 90
              ? '✅ Khoảng ngắt dưới 90ms: Hơi thở mượt mà không khựng.'
              : '⚠️ Khoảng ngắt vượt 120ms: Rơi vào bẫy đơn lập tiếng Việt!'}
          </p>
        </div>

        {/* Interactive Simulation Controls */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase">
            Kiểm Thử Giả Lập Tần Số
          </span>
          <div className="flex flex-col gap-2">
            <button
              onClick={handleSimulateSmooth}
              type="button"
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                simulatedPause <= 90
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="material-symbols-outlined text-sm">check_circle</span>
              <span>Giả lập Nối Mượt (40ms)</span>
            </button>
            <button
              onClick={handleSimulateStaccato}
              type="button"
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                simulatedPause > 90
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="material-symbols-outlined text-sm">warning</span>
              <span>Giả lập Ngắt Rời (140ms)</span>
            </button>
          </div>
        </div>
      </div>

      {/* L1 Staccato Alert Callout */}
      {evaluation?.staccatoCount > 0 && (
        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
          <span className="material-symbols-outlined text-amber-600 shrink-0 text-xl mt-0.5">
            warning
          </span>
          <div className="space-y-1">
            <h4 className="text-xs font-black uppercase tracking-wide text-amber-800">
              Cảnh Báo Lỗi Ngắt Nghỉ Đơn Lập (L1 Transfer Alert)
            </h4>
            <p className="text-xs text-amber-800 leading-relaxed">
              Bạn đang ngắt quãng {simulatedPause}ms giữa các từ như cách đọc tiếng Việt đơn lập. Trong tiếng Anh tự nhiên, các từ chức năng và nguyên âm phải được nối liên tục mà không dừng hơi thở!
            </p>
          </div>
        </div>
      )}

      {/* Detailed Linking Rules Breakdown */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono font-bold text-slate-400 uppercase">
          Chi Tiết Các Cặp Nối Âm Trong Câu
        </h3>
        <div className="space-y-2">
          {evaluation?.evaluatedPairs?.map((pair, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">
                    "{pair.fromWord}" ➔ "{pair.toWord}"
                  </span>
                  <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-mono text-[10px] font-bold">
                    {pair.type}
                  </span>
                </div>
                <p className="text-slate-600">{pair.rule}</p>
                <p className="text-slate-500 italic">💡 {pair.l1Guidance}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="font-mono text-xs text-slate-500">
                  Pause: <strong>{pair.measuredPauseMs}ms</strong>
                </span>
                <span
                  className={`px-2.5 py-1 rounded-full font-mono font-bold text-[11px] ${
                    pair.linked
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {pair.linked ? 'Nối Mượt' : 'Bị Khựng'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
