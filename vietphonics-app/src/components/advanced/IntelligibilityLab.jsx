import React, { useState, useEffect } from 'react';
import {
  SEMANTIC_RISK_DICTIONARY,
  VIRTUAL_LISTENERS,
  evaluateIntelligibility
} from '../../lib/ai/intelligibilityEngine';

export default function IntelligibilityLab() {
  const [spokenText, setSpokenText] = useState('She washed the bed sheet on the beach.');
  const [mispronouncedWords, setMispronouncedWords] = useState(['sheet']);
  const [evaluation, setEvaluation] = useState(null);

  const sampleSentences = [
    { text: 'She washed the bed sheet on the beach.', mispronounced: ['sheet'] },
    { text: 'Please focus on the main priority today.', mispronounced: [] },
    { text: 'I really can\'t accept this offer right now.', mispronounced: ['can\'t'] },
    { text: 'Six months ago she baked fresh bread for breakfast.', mispronounced: [] }
  ];

  useEffect(() => {
    handleRunEvaluation(spokenText, mispronouncedWords);
  }, []);

  const handleRunEvaluation = (text, mispronounced) => {
    const res = evaluateIntelligibility({
      spokenText: text,
      mispronouncedWords: mispronounced
    });
    setEvaluation(res);
  };

  const handleSelectSample = (sample) => {
    setSpokenText(sample.text);
    setMispronouncedWords(sample.mispronounced);
    handleRunEvaluation(sample.text, sample.mispronounced);
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-sky-600 uppercase">
              ADV-106 • Intelligibility &amp; Multi-ASR Listener Panel
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-mono font-bold text-emerald-700">
              Comprehensibility Over Accent
            </span>
          </div>
          <h2 className="text-xl font-black text-slate-900 mt-1">
            Đo "Người Nghe Có Hiểu Bạn Không?" Thay Vì Chỉ Đo Giống Bản Ngữ
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Hội đồng thính giả ảo đa quốc gia (Mỹ, Châu Âu, Toàn Cầu) đo lường khả năng thông hiểu thực tế và phát hiện các rủi ro hiểu lầm ngữ nghĩa nhạy cảm.
          </p>
        </div>
      </div>

      {/* Preset Practice Sentences */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-400">Câu mẫu kiểm tra:</span>
        {sampleSentences.map((s, idx) => (
          <button
            key={idx}
            onClick={() => handleSelectSample(s)}
            type="button"
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              spokenText === s.text
                ? 'bg-sky-600 text-white shadow-xs font-bold'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Mẫu #{idx + 1}
          </button>
        ))}
      </div>

      {/* Main Intelligibility Semi-Circle Gauge Card */}
      <div className="p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-around gap-8">
        {/* Semi-Circle Gauge Visual */}
        <div className="relative flex flex-col items-center justify-center">
          <svg width="220" height="130" viewBox="0 0 220 130" className="overflow-visible">
            {/* Background Arc */}
            <path
              d="M 20,110 A 90,90 0 0,1 200,110"
              fill="none"
              stroke="#1e293b"
              strokeWidth="20"
              strokeLinecap="round"
            />
            {/* Progress Arc */}
            <path
              d="M 20,110 A 90,90 0 0,1 200,110"
              fill="none"
              stroke="#10b981"
              strokeWidth="20"
              strokeLinecap="round"
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * (evaluation?.globalIntelligibility ?? 94)) / 100}
              className="transition-all duration-700 ease-out"
            />
          </svg>

          <div className="absolute top-12 flex flex-col items-center">
            <span className="text-5xl font-black text-white tracking-tight">
              {evaluation?.globalIntelligibility ?? 94}%
            </span>
            <span className="font-mono text-xs font-bold text-emerald-400 mt-1 uppercase tracking-wider">
              {evaluation?.ratingCategory ?? 'Highly Intelligible'}
            </span>
          </div>
        </div>

        {/* Evaluation Summary */}
        <div className="max-w-md space-y-3 text-center md:text-left">
          <span className="font-mono text-xs text-sky-400 font-bold uppercase tracking-widest block">
            Kết Luận Thẩm Định Toàn Cầu
          </span>
          <h3 className="text-xl font-bold text-white">
            {evaluation?.globalIntelligibility >= 85
              ? 'Giao Tiếp Hiệu Quả & Dễ Hiểu'
              : 'Có Nguy Cơ Hiểu Lầm Trong Công Việc'}
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            {evaluation?.comprehensionFeedback}
          </p>
          <div className="pt-2 flex items-center justify-center md:justify-start gap-4 font-mono text-xs text-slate-400">
            <span>Từ đã nói: <strong className="text-white">{evaluation?.wordCount ?? 0} từ</strong></span>
            <span>Rủi ro ngữ nghĩa: <strong className={evaluation?.hasHighRiskAlert ? 'text-rose-400' : 'text-emerald-400'}>{evaluation?.hasHighRiskAlert ? 'CẢNH BÁO' : 'An Toàn'}</strong></span>
          </div>
        </div>
      </div>

      {/* Semantic Risk Callout Alert Banner (AC 3) */}
      {evaluation?.hasHighRiskAlert && (
        <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 flex items-start gap-3.5 shadow-xs">
          <span className="material-symbols-outlined text-rose-600 text-2xl shrink-0 mt-0.5">
            report_problem
          </span>
          <div className="space-y-1.5">
            <h4 className="text-xs font-black text-rose-900 uppercase tracking-wide">
              Cảnh Báo Nguy Cơ Hiểu Lầm Nhạy Cảm (High Semantic Risk)
            </h4>
            {evaluation?.semanticRisks?.map((risk, rIdx) => (
              <p key={rIdx} className="text-xs text-rose-800 leading-relaxed">
                {risk.warning}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* 3 Virtual Listener Panel Cards (AC 2) */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono font-bold text-slate-400 uppercase">
          Hội Đồng Thính Giả Ảo Đa Quốc Gia (Virtual Multi-ASR Panel)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {evaluation?.listenerScores?.map((listener) => (
            <div
              key={listener.id}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{listener.avatar}</span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1">
                      <span>{listener.flag}</span>
                      <span>{listener.name}</span>
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono">{listener.region}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-slate-900">{listener.score}%</span>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                  Phản Hồi Tiếp Nhận
                </span>
                <p className="text-xs text-slate-700 italic">"{listener.status}"</p>
              </div>

              <p className="text-[11px] text-slate-500">{listener.tolerance}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
