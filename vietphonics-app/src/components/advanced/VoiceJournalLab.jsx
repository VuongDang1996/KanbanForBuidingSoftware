import React, { useState, useEffect } from 'react';
import {
  VOICE_JOURNAL_PROMPTS,
  evaluateSpontaneousJournalEntry
} from '../../lib/audio/voiceJournalEngine';

export default function VoiceJournalLab() {
  const [selectedPromptId, setSelectedPromptId] = useState('vj_p1');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTimer, setRecordingTimer] = useState(48);
  const [activeWordId, setActiveWordId] = useState(null);

  // Sample spontaneous transcript for simulation
  const [transcript, setTranscript] = useState(
    'Last weekend I went to the countryside with my family. We had a really ờ delicious meal and enjoyed the fresh air.'
  );

  const [evaluation, setEvaluation] = useState(null);

  const currentPrompt =
    VOICE_JOURNAL_PROMPTS.find((p) => p.id === selectedPromptId) ||
    VOICE_JOURNAL_PROMPTS[0];

  useEffect(() => {
    handleEvaluate(transcript, recordingTimer);
  }, [selectedPromptId]);

  const handleEvaluate = (text, duration) => {
    const res = evaluateSpontaneousJournalEntry({
      promptId: selectedPromptId,
      rawTranscript: text,
      durationSeconds: duration,
      baselineReadAloudScore: 86
    });
    setEvaluation(res);
  };

  const handleWordClick = (word) => {
    setActiveWordId(word.id);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word.word);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
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
              ADV-107 • Spontaneous Speech Voice Journal
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-mono font-bold text-emerald-700">
              Transfer Gap Tracking
            </span>
          </div>
          <h2 className="text-xl font-black text-slate-900 mt-1">
            Nhật Ký Thoại Tự Do &amp; Đo Lường Khoảng Cách Chuyển Di
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Chấm phát âm không cần kịch bản có sẵn. So sánh giữa điểm đọc kịch bản tĩnh vs nói ứng biến đời thực để thu hẹp khoảng cách chuyển di (Transfer Gap).
          </p>
        </div>

        {/* Prompt Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-500 whitespace-nowrap">Chủ đề:</label>
          <select
            value={selectedPromptId}
            onChange={(e) => setSelectedPromptId(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            {VOICE_JOURNAL_PROMPTS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.topic}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Daily Prompt Card */}
      <div className="p-6 rounded-2xl bg-sky-50 border border-sky-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-sky-600 text-white font-mono text-[10px] font-bold">
              Chủ Đề Hôm Nay
            </span>
            <h3 className="text-sm font-bold text-sky-950">{currentPrompt.topic}</h3>
          </div>
          <p className="text-xs text-sky-900 font-semibold">{currentPrompt.promptEn}</p>
          <p className="text-xs text-sky-700 italic">{currentPrompt.promptVi}</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              setIsRecording(!isRecording);
              if (!isRecording) {
                handleEvaluate(transcript, 52);
              }
            }}
            type="button"
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer transition-all ${
              isRecording
                ? 'bg-rose-600 text-white animate-pulse'
                : 'bg-sky-600 hover:bg-sky-700 text-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm">
              {isRecording ? 'stop_circle' : 'mic'}
            </span>
            <span>{isRecording ? 'Đang Thu Âm (0:48)...' : 'Bắt Đầu Nói Tự Do'}</span>
          </button>
        </div>
      </div>

      {/* Transfer Gap Meter Card (AC 2) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Baseline Read Aloud */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase">
            Điểm Đọc Kịch Bản (Scripted)
          </span>
          <div className="text-3xl font-black text-slate-800 mt-2">
            {evaluation?.baselineReadAloudScore ?? 86}%
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Chuẩn phát âm khi có văn bản trước mắt</p>
        </div>

        {/* Spontaneous Speech */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase">
            Điểm Nói Tự Do (Spontaneous)
          </span>
          <div className="text-3xl font-black text-sky-600 mt-2">
            {evaluation?.spontaneousScore ?? 78}%
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Phản xạ phát âm thực tế khi ứng biến</p>
        </div>

        {/* Transfer Gap */}
        <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200">
          <span className="text-xs font-mono font-bold text-rose-700 uppercase">
            Khoảng Cách Chuyển Di (Transfer Gap)
          </span>
          <div className="text-3xl font-black text-rose-700 mt-2">
            {evaluation?.transferGapPercentageText ?? '-8%'}
          </div>
          <p className="text-[11px] text-rose-800 mt-1">
            Mức sụt giảm khi không nhìn mặt chữ
          </p>
        </div>
      </div>

      {/* Word-Click Sync Audio Player Transcript (AC 3 & AC 4) */}
      <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-sky-400 font-bold uppercase tracking-wider">
            Bản Bóc Băng Đồng Bộ Thời Gian (Click Vào Từ Để Nghe Lại)
          </span>
          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <span>Tốc độ: <strong className="text-white">{evaluation?.wpm ?? 136} WPM</strong></span>
            <span>Thời lượng: <strong className="text-white">{evaluation?.durationSeconds ?? 48}s</strong></span>
          </div>
        </div>

        {/* Word Chips */}
        <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-wrap gap-2 text-base leading-loose">
          {evaluation?.alignedWords?.map((w) => {
            const isSelected = activeWordId === w.id;
            return (
              <button
                key={w.id}
                onClick={() => handleWordClick(w)}
                type="button"
                className={`px-2.5 py-1 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  w.isFiller
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 line-through'
                    : isSelected
                    ? 'bg-sky-500 text-white ring-2 ring-sky-300 shadow-md font-bold'
                    : 'bg-slate-800/80 text-slate-200 hover:bg-slate-700'
                }`}
                title={`Mốc thời gian: ${w.startMs}ms - ${w.endMs}ms (Điểm: ${w.score}%)`}
              >
                {w.word}
              </button>
            );
          })}
        </div>

        {/* Active Word Telemetry */}
        {activeWordId && (
          <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700 flex items-center justify-between text-xs text-slate-300 font-mono">
            <span>
              Đã chọn từ: <strong className="text-sky-300">{evaluation?.alignedWords?.find((w) => w.id === activeWordId)?.word}</strong>
            </span>
            <span>
              Timestamp: {evaluation?.alignedWords?.find((w) => w.id === activeWordId)?.startMs}ms ➔ {evaluation?.alignedWords?.find((w) => w.id === activeWordId)?.endMs}ms
            </span>
            <span className="text-emerald-400 font-bold">
              Độ chuẩn: {evaluation?.alignedWords?.find((w) => w.id === activeWordId)?.score}%
            </span>
          </div>
        )}
      </div>

      {/* Vietnamese L1 Filler Word Callout (AC 4) */}
      {evaluation?.detectedFillersCount > 0 && (
        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex items-start gap-3">
          <span className="material-symbols-outlined text-amber-600 text-xl shrink-0 mt-0.5">
            tips_and_updates
          </span>
          <div className="space-y-1">
            <h4 className="text-xs font-black text-amber-900 uppercase tracking-wide">
              Phát Hiện Âm Đệm Tiếng Việt ({evaluation.detectedFillersCount} lần: {evaluation.detectedFillers.map((f) => `"${f.word}"`).join(', ')})
            </h4>
            <p className="text-xs text-amber-800 leading-relaxed">
              Bạn có xu hướng chèn âm "ờ / ừm" khi đang suy nghĩ từ vựng. Lời khuyên: Hãy cho phép bản thân có những khoảng ngắt im lặng tự nhiên (silent pauses) thay vì chèn âm đệm tiếng Việt!
            </p>
          </div>
        </div>
      )}

      {/* Advice Section */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
        <span className="font-bold text-slate-900 block mb-1">Chỉ Dẫn Thu Hẹp Khoảng Cách:</span>
        <p>{evaluation?.advice}</p>
      </div>
    </div>
  );
}
