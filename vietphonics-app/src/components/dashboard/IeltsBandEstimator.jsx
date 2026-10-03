import React, { useState, useEffect } from 'react';
import { calculateIeltsBand, computeTargetGap } from '../../lib/scoring/ieltsMapping';

export default function IeltsBandEstimator({ overallGop = 76, onOpenDetails }) {
  const [data, setData] = useState(() => {
    const est = calculateIeltsBand({
      pronunciationAcc: overallGop,
      fluencyWpm: 135,
      intonationScore: 71,
      lexicalGrammarEstimate: 75
    });
    return {
      estimate: est,
      targetBand: 7.5,
      gapInfo: computeTargetGap(est.overallBand, 7.5, est.criteria)
    };
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState(7.5);
  const [isSavingTarget, setIsSavingTarget] = useState(false);

  // Fetch real estimate from API
  useEffect(() => {
    fetch('/api/v1/user/ielts-estimate')
      .then(res => res.ok ? res.json() : null)
      .then(res => {
        if (res && res.success) {
          setData(res);
          setSelectedTarget(res.targetBand || 7.5);
        }
      })
      .catch(() => {});
  }, [overallGop]);

  const handleUpdateTarget = async (newTarget) => {
    setSelectedTarget(newTarget);
    setIsSavingTarget(true);
    try {
      const res = await fetch('/api/v1/user/ielts-target', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetBand: newTarget })
      });
      if (res.ok) {
        const json = await res.json();
        setData(prev => ({
          ...prev,
          targetBand: newTarget,
          gapInfo: json.gapInfo
        }));
      }
    } catch (e) {
      console.warn('Failed to update target band:', e);
    } finally {
      setIsSavingTarget(false);
    }
  };

  const { estimate, targetBand, gapInfo } = data;
  const band = estimate?.overallBand || 7.0;
  const cefr = estimate?.cefr || 'B2+';

  // SVG Semicircle needle calculation (Band 4.0 to 9.0 mapped to -180 deg to 0 deg)
  const minBand = 4.0;
  const maxBand = 9.0;
  const normalized = Math.max(0, Math.min(1, (band - minBand) / (maxBand - minBand)));
  const needleAngle = -180 + normalized * 180;

  return (
    <>
      {/* Clickable Card in Dashboard */}
      <div
        onClick={() => setIsModalOpen(true)}
        className="w-full bg-slate-50 border border-slate-200/80 hover:border-secondary hover:shadow-md transition-all rounded-xl p-3.5 flex flex-col gap-2.5 cursor-pointer group"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="font-label-mono text-label-mono text-slate-700 font-bold uppercase tracking-wider">
              IELTS Speaking Estimator
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-sky-100 text-secondary font-mono text-[10px] font-bold group-hover:bg-secondary group-hover:text-white transition-colors">
            Chi Tiết 4 Tiêu Chí ➔
          </span>
        </div>

        {/* Semicircle Gauge Display */}
        <div className="flex items-center justify-between gap-3">
          <div className="relative w-28 h-16 flex items-end justify-center overflow-hidden">
            <svg className="w-28 h-28" viewBox="0 0 100 100">
              {/* Background Arc */}
              <path
                d="M 10 50 A 40 40 0 0 1 90 50"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="10"
                strokeLinecap="round"
              />
              {/* Colored Gauge Arc */}
              <path
                d="M 10 50 A 40 40 0 0 1 90 50"
                fill="none"
                stroke="url(#ielts-gradient)"
                strokeWidth="10"
                strokeDasharray="125.6"
                strokeDashoffset={125.6 * (1 - normalized)}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="ielts-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute bottom-0 flex flex-col items-center">
              <span className="font-headline-lg text-2xl font-black text-slate-900 leading-none">
                {band.toFixed(1)}
              </span>
              <span className="font-mono text-[9px] font-bold text-slate-400 uppercase">
                Band Score
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1 flex-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Khung CEFR:</span>
              <span className="font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
                {cefr}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Mục tiêu:</span>
              <span className="font-bold text-secondary font-mono">
                {targetBand} Band
              </span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-0.5">
              <div
                className="bg-secondary h-full rounded-full transition-all duration-700"
                style={{ width: `${Math.min(100, (band / targetBand) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Target Gap Advice Snippet */}
        <p className="text-[11px] text-slate-600 line-clamp-1 bg-white p-1.5 rounded-lg border border-slate-100">
          💡 {gapInfo?.recommendation || 'Đang ước lượng khoảng cách mục tiêu...'}
        </p>

        <span className="text-[9px] text-slate-400 font-mono italic">
          * Ước tính tham khảo dựa trên âm học IDP/BC (ELSA-103)
        </span>
      </div>

      {/* Detailed Modal: 4-Criteria Radar Chart & Target Gap (AC 2 & AC 3) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 flex flex-col my-8 gap-5">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center font-bold text-lg">
                  🎯
                </div>
                <div>
                  <h3 className="font-black text-lg text-slate-900">
                    Bảng Ước Tính IELTS & Khung CEFR (ELSA-103)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Phân tích 4 tiêu chí chuẩn khảo thí Cambridge: PR, FC, LR, GRA
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            {/* Overall Summary Bar */}
            <div className="grid grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <div>
                <span className="text-xs text-slate-500 block">Dự Báo Điểm</span>
                <span className="text-2xl font-black text-secondary font-mono">{band.toFixed(1)}</span>
                <span className="text-[10px] text-slate-400 block">IELTS Speaking</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Quy Đổi Châu Âu</span>
                <span className="text-2xl font-black text-primary font-mono">{cefr}</span>
                <span className="text-[10px] text-slate-400 block">CEFR Level</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Mục Tiêu Cá Nhân</span>
                <span className="text-2xl font-black text-emerald-600 font-mono">{selectedTarget}</span>
                <span className="text-[10px] text-slate-400 block">Target Band</span>
              </div>
            </div>

            {/* SVG 4-Criteria Radar Chart (AC 2) */}
            <div className="flex flex-col sm:flex-row items-center gap-6 bg-white p-4 rounded-2xl border border-slate-200/80">
              <div className="relative w-56 h-56 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 200 200">
                  {/* Concentric Grid Circles for Band 5, 7, 9 */}
                  <polygon points="100,30 170,100 100,170 30,100" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                  <polygon points="100,50 150,100 100,150 50,100" fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />
                  <polygon points="100,70 130,100 100,130 70,100" fill="none" stroke="#e2e8f0" strokeWidth="1" />

                  {/* Axes */}
                  <line x1="100" y1="15" x2="100" y2="185" stroke="#cbd5e1" strokeWidth="1" />
                  <line x1="15" y1="100" x2="185" y2="100" stroke="#cbd5e1" strokeWidth="1" />

                  {/* Dynamic Radar Shape */}
                  {/* PR: top (100, y), FC: right (x, 100), LR: bottom (100, y), GRA: left (x, 100) */}
                  {(() => {
                    const prNorm = ((estimate?.criteria?.pronunciation?.band || 7.0) - 4) / 5;
                    const fcNorm = ((estimate?.criteria?.fluency?.band || 6.5) - 4) / 5;
                    const lrNorm = ((estimate?.criteria?.lexical?.band || 7.0) - 4) / 5;
                    const graNorm = ((estimate?.criteria?.grammar?.band || 7.0) - 4) / 5;

                    const yPR = 100 - prNorm * 75;
                    const xFC = 100 + fcNorm * 75;
                    const yLR = 100 + lrNorm * 75;
                    const xGRA = 100 - graNorm * 75;

                    return (
                      <>
                        <polygon
                          points={`100,${yPR} ${xFC},100 100,${yLR} ${xGRA},100`}
                          fill="rgba(2, 132, 199, 0.25)"
                          stroke="#0284c7"
                          strokeWidth="2.5"
                          className="transition-all duration-1000"
                        />
                        <circle cx="100" cy={yPR} r="4" fill="#0284c7" />
                        <circle cx={xFC} cy="100" r="4" fill="#0284c7" />
                        <circle cx="100" cy={yLR} r="4" fill="#0284c7" />
                        <circle cx={xGRA} cy="100" r="4" fill="#0284c7" />
                      </>
                    );
                  })()}

                  {/* Labels */}
                  <text x="100" y="12" textAnchor="middle" className="text-[10px] font-bold fill-slate-700">PR (Phát âm)</text>
                  <text x="190" y="103" textAnchor="start" className="text-[10px] font-bold fill-slate-700">FC</text>
                  <text x="100" y="196" textAnchor="middle" className="text-[10px] font-bold fill-slate-700">LR (Từ vựng)</text>
                  <text x="10" y="103" textAnchor="end" className="text-[10px] font-bold fill-slate-700">GRA</text>
                </svg>
              </div>

              {/* 4 Criteria Details */}
              <div className="flex-1 flex flex-col gap-2.5 w-full">
                {Object.entries(estimate?.criteria || {}).map(([key, item]) => (
                  <div key={key} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <span className="font-medium text-slate-700">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-secondary">{item.band.toFixed(1)}</span>
                      <span className="text-[10px] text-slate-400">({item.score}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Gap & Recommendation Box (AC 3) */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col gap-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <span>🎯</span>
                  <span>Thiết Lập Mục Tiêu & Phân Tích Khoảng Cách (Target Gap):</span>
                </span>
                
                {/* Target Band Picker */}
                <div className="flex items-center gap-1">
                  {[6.5, 7.0, 7.5, 8.0, 8.5].map((b) => (
                    <button
                      key={b}
                      onClick={() => handleUpdateTarget(b)}
                      className={`px-2 py-0.5 rounded-lg text-xs font-mono font-bold transition-all ${
                        selectedTarget === b
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-white text-slate-700 hover:bg-amber-100'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-xs text-amber-950 leading-relaxed font-medium mt-1">
                {gapInfo?.recommendation}
              </p>
            </div>

            {/* Legal Disclaimer (Gate I7 & Gate L) */}
            <p className="text-[11px] text-slate-400 font-mono leading-normal bg-slate-50 p-3 rounded-xl border border-slate-100">
              ⚠️ <strong>Lưu ý pháp lý:</strong> {estimate?.disclaimer}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
