import React from 'react';
import { computeRadarPoints, buildRadarSvgPoints, getRadarColorTheme, calculateAverageRadarScore } from '../../lib/scoring/learnerDashboardAuth';

/**
 * SkillRadarChart.jsx
 * 5-Pillar Pronunciation Skill Radar Chart rendered with native SVG (USER-101)
 * Formula:
 *   angle = (2 * PI * i / 5) - (PI / 2)
 *   x = cx + R * (score / 100) * cos(angle)
 *   y = cy + R * (score / 100) * sin(angle)
 */
export default function SkillRadarChart({
  scores = { phonemes: 85, stress: 78, intonation: 70, endingSounds: 92, fluency: 80 },
  size = 280,
  className = ''
}) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.38;

  const points = computeRadarPoints(scores, cx, cy, r);
  const polygonPointsStr = buildRadarSvgPoints(points);
  const avgScore = calculateAverageRadarScore(scores);
  const theme = getRadarColorTheme(avgScore);

  // Concentric background rings (20%, 40%, 60%, 80%, 100%)
  const gridRings = [0.2, 0.4, 0.6, 0.8, 1.0];

  return (
    <div className={`flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-200 shadow-sm ${className}`}>
      {/* Header telemetry */}
      <div className="w-full flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-xl">radar</span>
          <h3 className="font-headline-sm text-sm font-bold text-slate-800">
            5 Trụ Cột Năng Lực Phát Âm
          </h3>
        </div>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${theme.badgeBg}`}>
          {avgScore}% • {theme.label.split(' ')[0]}
        </span>
      </div>

      {/* SVG Radar */}
      <div className="relative flex items-center justify-center">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="overflow-visible"
          role="img"
          aria-label="5-Axis Pronunciation Skill Radar Chart"
        >
          {/* Concentric Polygonal Background Rings */}
          {gridRings.map((factor, idx) => {
            const ringPoints = computeRadarPoints(
              { phonemes: 100 * factor, stress: 100 * factor, intonation: 100 * factor, endingSounds: 100 * factor, fluency: 100 * factor },
              cx,
              cy,
              r
            );
            return (
              <polygon
                key={`ring-${idx}`}
                points={buildRadarSvgPoints(ringPoints)}
                fill="none"
                stroke="#e2e8f0"
                strokeWidth={idx === gridRings.length - 1 ? "1.5" : "1"}
                strokeDasharray={idx === gridRings.length - 1 ? undefined : "3 3"}
              />
            );
          })}

          {/* Axis Spokes from Center to Outer Radius */}
          {points.map((p, idx) => (
            <line
              key={`spoke-${idx}`}
              x1={cx}
              y1={cy}
              x2={p.maxX}
              y2={p.maxY}
              stroke="#cbd5e1"
              strokeWidth="1"
            />
          ))}

          {/* Dynamic Active User Polygon Area */}
          <polygon
            points={polygonPointsStr}
            fill={theme.fill}
            stroke={theme.stroke}
            strokeWidth="2.5"
            className="transition-all duration-500 ease-out"
          />

          {/* Interactive Vertex Nodes */}
          {points.map((p, idx) => (
            <g key={`node-${idx}`} className="group cursor-pointer">
              <circle
                cx={p.x}
                cy={p.y}
                r="4.5"
                fill="#ffffff"
                stroke={theme.stroke}
                strokeWidth="2.5"
                className="transition-transform group-hover:scale-125"
              />
              {/* Score text near vertex */}
              <text
                x={p.x}
                y={p.y - 8}
                textAnchor="middle"
                className="text-[10px] font-bold fill-slate-700 select-none"
              >
                {p.score}%
              </text>
            </g>
          ))}

          {/* Axis Labels Around Perimeter */}
          {points.map((p, idx) => {
            // Label offset slightly outward from maxX, maxY
            const labelDist = r + 22;
            const lx = cx + labelDist * Math.cos(p.angle);
            const ly = cy + labelDist * Math.sin(p.angle);
            return (
              <text
                key={`label-${idx}`}
                x={lx}
                y={ly + 4}
                textAnchor="middle"
                className="text-[10.5px] font-semibold fill-slate-600 select-none"
              >
                {p.label.split(' ')[0]}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Axis Breakdown Legends */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
        {points.map(p => (
          <div key={p.key} className="flex items-center justify-between p-1.5 bg-slate-50 rounded-lg">
            <span className="text-slate-600 truncate">{p.label.split(' ')[0]}</span>
            <span className="font-bold text-slate-800 ml-1">{p.score}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
