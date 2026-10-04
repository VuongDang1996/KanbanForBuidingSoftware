import React, { useState } from 'react';
import {
  VOWEL_FORMANT_TARGETS,
  formantToSvgCoords,
  evaluateVowelFormants
} from '../../lib/audio/formantAnalysis.js';

export default function VowelSpaceChart() {
  const [selectedTarget, setSelectedTarget] = useState(VOWEL_FORMANT_TARGETS[0]); // /iː/
  const [userF1, setUserF1] = useState(380);
  const [userF2, setUserF2] = useState(2100);

  const evaluation = evaluateVowelFormants(selectedTarget.symbol, userF1, userF2);

  // SVG dimensions
  const SVG_WIDTH = 640;
  const SVG_HEIGHT = 440;
  const PADDING = 45;

  const targetCoords = formantToSvgCoords(selectedTarget.f1, selectedTarget.f2, SVG_WIDTH, SVG_HEIGHT, PADDING);
  const userCoords = formantToSvgCoords(userF1, userF2, SVG_WIDTH, SVG_HEIGHT, PADDING);

  const handleChartClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Convert pixel back to F1/F2 approximate
    const ratioY = (clickY - PADDING) / (SVG_HEIGHT - 2 * PADDING);
    const newF1 = Math.round(200 + ratioY * 700);

    const ratioX = (clickX - PADDING) / (SVG_WIDTH - 2 * PADDING);
    const newF2 = Math.round(2500 - ratioX * 1800);

    setUserF1(Math.max(200, Math.min(900, newF1)));
    setUserF2(Math.max(700, Math.min(2500, newF2)));
  };

  return (
    <div className="flex flex-col gap-6 bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-0.5 rounded-full bg-sky-50 text-sky-800 font-label-mono text-xs font-bold border border-sky-200">
              ACOUSTIC FORMANT BIOFEEDBACK (LPC)
            </span>
            <span className="text-xs font-mono text-slate-500">Burg LPC Analysis F1/F2</span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-slate-900 font-extrabold tracking-tight">
            Live Vowel Space Chart (ADV-103)
          </h2>
          <p className="font-body-md text-sm text-slate-600 mt-1">
            Bản đồ tọa độ nguyên âm 2 trục đảo ngược F1 (Độ cao lưỡi) vs F2 (Vị trí lưỡi trước/sau).
          </p>
        </div>

        {/* Status Score Pill */}
        <div className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl border shrink-0 ${
          evaluation.isInTarget ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'
        }`}>
          <span className="material-symbols-outlined text-2xl">
            {evaluation.isInTarget ? 'verified' : 'adjust'}
          </span>
          <div className="flex flex-col">
            <span className="font-label-mono text-[10px] uppercase font-bold">Trạng Thái Khớp Formant</span>
            <span className="font-mono text-base font-extrabold">
              {evaluation.isInTarget ? '✓ TRONG TARGET ZONE' : `Lệch ${evaluation.distanceHz} Hz`}
            </span>
          </div>
        </div>
      </div>

      {/* Vowel Target Selector */}
      <div className="flex flex-wrap gap-2">
        {VOWEL_FORMANT_TARGETS.map((target) => (
          <button
            key={target.symbol}
            type="button"
            onClick={() => {
              setSelectedTarget(target);
              // Set user F1/F2 slightly offset to demonstrate vector guidance
              setUserF1(target.f1 + 80);
              setUserF2(target.f2 - 120);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedTarget.symbol === target.symbol
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span className="font-mono font-bold">{target.symbol}</span>
            <span className="opacity-75 text-[11px]">{target.name}</span>
          </button>
        ))}
      </div>

      {/* SVG Inverted Formant Coordinate Chart */}
      <div className="relative bg-slate-950 rounded-2xl p-4 overflow-hidden shadow-inner flex flex-col items-center">
        {/* Axis Labels */}
        <div className="absolute top-3 left-4 text-xs font-mono text-slate-400">
          F2: Trước lưỡi (2500 Hz) ←
        </div>
        <div className="absolute top-3 right-4 text-xs font-mono text-slate-400">
          → Sau lưỡi (700 Hz)
        </div>
        <div className="absolute bottom-3 left-4 text-xs font-mono text-slate-400">
          F1: Cao lưỡi (200 Hz) ↑
        </div>
        <div className="absolute bottom-3 right-4 text-xs font-mono text-slate-400">
          ↓ Thấp lưỡi / Hạ hàm (900 Hz)
        </div>

        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          className="w-full max-w-2xl h-auto cursor-crosshair select-none"
          onClick={handleChartClick}
        >
          {/* Grid lines */}
          <line x1={PADDING} y1={PADDING} x2={SVG_WIDTH - PADDING} y2={PADDING} stroke="#334155" strokeDasharray="4 4" />
          <line x1={PADDING} y1={SVG_HEIGHT / 2} x2={SVG_WIDTH - PADDING} y2={SVG_HEIGHT / 2} stroke="#1e293b" strokeDasharray="4 4" />
          <line x1={PADDING} y1={SVG_HEIGHT - PADDING} x2={SVG_WIDTH - PADDING} y2={SVG_HEIGHT - PADDING} stroke="#334155" strokeDasharray="4 4" />

          {/* Target Vowel Ellipses */}
          {VOWEL_FORMANT_TARGETS.map((v) => {
            const coords = formantToSvgCoords(v.f1, v.f2, SVG_WIDTH, SVG_HEIGHT, PADDING);
            const isSelected = v.symbol === selectedTarget.symbol;

            return (
              <g key={v.symbol} className="transition-all">
                <ellipse
                  cx={coords.x}
                  cy={coords.y}
                  rx={v.radiusF2 / 8}
                  ry={v.radiusF1 / 5}
                  fill={isSelected ? 'rgba(244, 63, 94, 0.25)' : 'rgba(16, 185, 129, 0.12)'}
                  stroke={isSelected ? '#f43f5e' : '#10b981'}
                  strokeWidth={isSelected ? '2.5' : '1.2'}
                  strokeDasharray={isSelected ? 'none' : '3 3'}
                />
                <text
                  x={coords.x}
                  y={coords.y + 4}
                  textAnchor="middle"
                  fill={isSelected ? '#fda4af' : '#6ee7b7'}
                  fontSize="12"
                  fontWeight={isSelected ? 'bold' : 'normal'}
                  fontFamily="monospace"
                >
                  {v.symbol}
                </text>
              </g>
            );
          })}

          {/* Directional Vector Arrow */}
          {!evaluation.isInTarget && (
            <g>
              <line
                x1={userCoords.x}
                y1={userCoords.y}
                x2={targetCoords.x}
                y2={targetCoords.y}
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeDasharray="5 3"
              />
              <circle cx={targetCoords.x} cy={targetCoords.y} r="4" fill="#f59e0b" />
            </g>
          )}

          {/* Live User Formant Dot */}
          <g transform={`translate(${userCoords.x}, ${userCoords.y})`}>
            <circle r="16" fill="rgba(244, 63, 94, 0.3)" className="animate-ping" />
            <circle r="8" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" shadow="0 0 10px #f43f5e" />
          </g>
        </svg>

        <span className="text-[11px] text-slate-400 mt-2 font-mono">
          [Click lên biểu đồ để di chuyển chấm âm thanh giọng của bạn]
        </span>
      </div>

      {/* Telemetry & Directional Advice Box */}
      <div className="flex flex-col md:flex-row items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-xl">psychology</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-mono font-bold text-slate-800">
              Tọa độ hiện tại: F1={userF1}Hz, F2={userF2}Hz (Mục tiêu {selectedTarget.symbol}: F1={selectedTarget.f1}Hz, F2={selectedTarget.f2}Hz)
            </span>
            <p className="text-xs text-slate-600 mt-0.5 font-medium">{evaluation.advice}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              setUserF1(selectedTarget.f1);
              setUserF2(selectedTarget.f2);
            }}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
          >
            Đưa Vào Vùng Chuẩn
          </button>
        </div>
      </div>
    </div>
  );
}
