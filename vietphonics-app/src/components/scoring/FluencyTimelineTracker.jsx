import React, { useState } from 'react';
import { calculateNeedleAngle } from '../../lib/scoring/fluencyAnalysis';

/**
 * ELSA-204: Speech Fluency, Natural Pauses & Filler Word Monitor
 * Features:
 * - AC 1: Semicircular SVG WPM Speedometer Gauge with needle rotation
 * - AC 2: Interactive Timeline Track with Speech, Pauses, and Fillers
 * - AC 3: Audio Excerpt 1.5s slice playback on segment click
 * - AC 4: L1 Hesitation Filter with Intentional Silence advice
 */
export default function FluencyTimelineTracker({
  fluencyData,
  onPlayAudioSlice
}) {
  const [l1FilterEnabled, setL1FilterEnabled] = useState(true);
  const [activePlayingId, setActivePlayingId] = useState(null);
  const [selectedSegment, setSelectedSegment] = useState(null);

  const data = fluencyData || {
    wpm: 128,
    tempoCategory: 'optimal',
    tempoLabel: 'Tốc độ Lý tưởng (110-160 WPM)',
    tempoEvaluation: 'Tốc độ đối thoại tự nhiên, đĩnh đạc chuẩn Cambridge/IELTS Speaking Band 7.5+.',
    tempoColorClass: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    totalDurationSec: 5.6,
    speechDurationSec: 4.4,
    pauseDurationSec: 1.2,
    pauseRatio: 21.4,
    awkwardPausesCount: 1,
    fillersCount: 1,
    segments: [
      { id: 'seg-1', type: 'speech', text: 'Six months ago,', startSec: 0.2, endSec: 1.6, duration: 1.4 },
      { id: 'seg-2', type: 'pause', text: 'Nghỉ 0.3s', startSec: 1.6, endSec: 1.9, duration: 0.3, isAwkward: false },
      { id: 'seg-3', type: 'speech', text: 'she baked fresh bread', startSec: 1.9, endSec: 3.3, duration: 1.4 },
      { id: 'seg-4', type: 'pause', text: 'Ngập ngừng 0.8s', startSec: 3.3, endSec: 4.1, duration: 0.8, isAwkward: true },
      { id: 'seg-5', type: 'speech', text: 'for breakfast on the street.', startSec: 4.1, endSec: 5.5, duration: 1.4 }
    ],
    fillers: [
      {
        token: 'ờ',
        type: 'l1_vietnamese',
        startSec: 3.4,
        endSec: 3.8,
        description: 'Ngập ngừng chèn từ đệm "ờ" sau cụm "fresh bread".',
        tip: 'Thay thế bằng sự im lặng có chủ đích. Khoảng lặng giúp câu nói trang trọng hơn.'
      }
    ]
  };

  const needleAngle = calculateNeedleAngle(data.wpm);

  // Play audio slice of 1.5 seconds around selected segment
  const handleSegmentClick = (seg) => {
    setSelectedSegment(seg);
    setActivePlayingId(seg.id);

    if (onPlayAudioSlice) {
      onPlayAudioSlice(seg.startSec, seg.endSec, seg.text);
    } else if ('speechSynthesis' in window) {
      // Browser Web Speech fallback playback
      window.speechSynthesis.cancel();
      const phrase = seg.type === 'speech' ? seg.text : `Pause ${seg.duration} seconds`;
      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }

    setTimeout(() => {
      setActivePlayingId(null);
    }, 1500);
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
      {/* Gauge A: Tốc Độ Nói (Speech Fluency WPM Speedometer) [Col 7] */}
      <div className="lg:col-span-7 bg-white rounded-xl p-space-md shadow-sm border border-slate-200/80 flex flex-col justify-between">
        <div className="flex items-center justify-between pb-space-sm border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sky-600 text-xl">speed</span>
            <h3 className="font-headline-sm text-headline-sm text-slate-800 font-bold">
              Tốc Độ &amp; Độ Lưu Loát (Fluency Meter)
            </h3>
          </div>
          <span className="font-label-mono text-label-mono px-2.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 font-semibold">
            Chuẩn Đàm Thoại: 110-160 WPM
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-space-md items-center py-3">
          {/* Semicircular SVG Gauge with dynamic needle */}
          <div className="sm:col-span-6 flex flex-col items-center justify-center relative">
            <svg className="w-52 h-28 overflow-visible" viewBox="0 0 200 110">
              {/* Background Arc: 40 to 220 WPM */}
              <path
                className="text-slate-200"
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="16"
              />
              {/* Safe Target Zone Highlight (110-160 WPM zone) */}
              <path
                className="text-emerald-200"
                d="M 75 25 A 80 80 0 0 1 145 35"
                fill="none"
                stroke="currentColor"
                strokeWidth="16"
              />
              {/* Active Progress Arc */}
              <path
                className="text-sky-500 transition-all duration-500"
                d={`M 20 100 A 80 80 0 0 1 ${100 + 80 * Math.sin((needleAngle + 90) * Math.PI / 180)} ${100 - 80 * Math.cos((needleAngle + 90) * Math.PI / 180)}`}
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="16"
              />
              {/* Needle Indicator rotating from center (100, 100) */}
              <g transform={`rotate(${needleAngle}, 100, 100)`} className="transition-transform duration-500 ease-out">
                <circle className="text-slate-800" cx="100" cy="100" fill="currentColor" r="7" />
                <line
                  className="text-slate-900"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                  x1="100"
                  y1="100"
                  x2="100"
                  y2="28"
                />
              </g>
            </svg>
            <div className="-mt-4 text-center">
              <span className="font-display-hero text-headline-lg font-extrabold text-slate-900">
                {data.wpm}
              </span>
              <span className="font-label-mono text-label-mono text-sky-700 ml-1 uppercase font-bold">
                WPM
              </span>
            </div>
          </div>

          {/* Gauge Metrics & Evaluation Badge */}
          <div className="sm:col-span-6 flex flex-col gap-space-xs">
            <div className={`p-space-sm rounded-lg border ${data.tempoColorClass}`}>
              <div className="flex items-center gap-1.5 font-label-mono text-label-mono mb-1 font-bold">
                <span className="material-symbols-outlined text-sm">verified</span>
                {data.tempoLabel}
              </div>
              <p className="font-body-sm text-xs font-medium leading-snug">
                {data.tempoEvaluation}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-center">
                <span className="font-label-mono text-[10px] text-slate-500 block uppercase font-semibold">
                  Phát âm thực
                </span>
                <span className="font-headline-sm text-body-lg text-rose-600 font-bold">
                  {data.speechDurationSec}s
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-center">
                <span className="font-label-mono text-[10px] text-slate-500 block uppercase font-semibold">
                  Tỉ lệ nghỉ (Pause)
                </span>
                <span className="font-headline-sm text-body-lg text-sky-700 font-bold">
                  {data.pauseRatio}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* AC 2 & 3: Interactive Timeline Track */}
        <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-sky-600">view_timeline</span>
              Thước đo dòng thời gian (Fluency Timeline — Bấm đoạn để nghe trích đoạn 1.5s):
            </span>
            <span className="font-mono text-slate-400 text-[11px]">
              Tổng: {data.totalDurationSec}s
            </span>
          </div>

          {/* Timeline Bar with relative flex segments */}
          <div className="w-full h-8 bg-slate-100 rounded-lg p-1 flex gap-1 items-center border border-slate-200 relative overflow-hidden">
            {data.segments.map((seg, idx) => {
              const isPlaying = activePlayingId === seg.id;
              const flexGrow = Math.max(1, Math.round(seg.duration * 10));

              let segBg = 'bg-sky-500 text-white';
              if (seg.type === 'pause') {
                segBg = seg.isAwkward
                  ? 'bg-amber-400 text-amber-950 border border-amber-500 font-bold'
                  : 'bg-slate-300 text-slate-600';
              }

              return (
                <button
                  key={seg.id || `seg-${idx}`}
                  type="button"
                  onClick={() => handleSegmentClick(seg)}
                  style={{ flex: flexGrow }}
                  title={`${seg.type === 'speech' ? 'Lời nói' : (seg.isAwkward ? 'Quãng khựng (>0.5s)' : 'Nghỉ ngắn')}: ${seg.duration}s. Bấm để nghe lại 1.5s.`}
                  className={`h-full rounded text-[10px] font-mono flex items-center justify-center truncate px-1 transition-all hover:opacity-85 ${segBg} ${
                    isPlaying ? 'ring-2 ring-rose-500 scale-105 z-10 animate-pulse' : ''
                  }`}
                >
                  {seg.type === 'speech' ? seg.text : (seg.isAwkward ? `⚠️ ${seg.duration}s` : `${seg.duration}s`)}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 font-label-mono">
            <span>0.0s (Bắt đầu)</span>
            <span className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded bg-sky-500"></span> Lời nói
              <span className="inline-block w-2.5 h-2.5 rounded bg-slate-300 ml-1"></span> Nghỉ tự nhiên (&lt;0.5s)
              <span className="inline-block w-2.5 h-2.5 rounded bg-amber-400 ml-1"></span> Ngập ngừng (≥0.5s)
            </span>
            <span>{data.totalDurationSec}s</span>
          </div>
        </div>
      </div>

      {/* Gauge B: Bắt Từ Đệm & Quãng Ngập Ngừng (Pause & Filler Monitor) [Col 5] */}
      <div className="lg:col-span-5 bg-white rounded-xl p-space-md shadow-sm border border-slate-200/80 flex flex-col justify-between">
        <div className="flex items-center justify-between pb-space-sm border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-rose-600 text-xl">timer_pause</span>
            <h3 className="font-headline-sm text-headline-sm text-slate-800 font-bold">
              Giám Sát Quãng Ngắt &amp; Đệm
            </h3>
          </div>
          {/* AC 4: L1 Hesitation Filter Switch */}
          <button
            type="button"
            onClick={() => setL1FilterEnabled(!l1FilterEnabled)}
            className={`px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 transition-all ${
              l1FilterEnabled
                ? 'bg-rose-600 text-white border-rose-700 shadow-sm'
                : 'bg-slate-100 text-slate-600 border-slate-200'
            }`}
            title="Bật/Tắt bộ lọc phát hiện từ đệm tiếng Việt (L1 Hesitation Filter)"
          >
            <span className="material-symbols-outlined text-xs">filter_alt</span>
            L1 Hesitation: {l1FilterEnabled ? 'BẬT' : 'TẮT'}
          </button>
        </div>

        <div className="space-y-space-sm py-2">
          {/* Counter Pill 1: Fillers */}
          <div className="flex items-center justify-between p-space-sm rounded-lg bg-slate-50 border border-slate-200/80">
            <div className="flex items-center gap-space-sm">
              <div className={`w-9 h-9 rounded-md flex items-center justify-center ${
                data.fillersCount > 0 ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
              }`}>
                <span className="material-symbols-outlined text-xl">record_voice_over</span>
              </div>
              <div>
                <span className="font-body-md text-xs font-semibold text-slate-800 block">
                  Từ đệm rác (Hesitation Tokens)
                </span>
                <span className="font-label-mono text-[11px] text-slate-500">
                  Phát hiện: "ờ", "ừm", "um", "uh"
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className={`font-headline-md text-headline-md font-bold ${
                data.fillersCount > 0 ? 'text-rose-600' : 'text-emerald-600'
              }`}>
                {data.fillersCount}
              </span>
              <span className="font-label-mono text-[10px] text-slate-500 block uppercase font-semibold">
                Lần
              </span>
            </div>
          </div>

          {/* Counter Pill 2: Pauses */}
          <div className="flex items-center justify-between p-space-sm rounded-lg bg-slate-50 border border-slate-200/80">
            <div className="flex items-center gap-space-sm">
              <div className={`w-9 h-9 rounded-md flex items-center justify-center ${
                data.awkwardPausesCount > 0 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
              }`}>
                <span className="material-symbols-outlined text-xl">hourglass_empty</span>
              </div>
              <div>
                <span className="font-body-md text-xs font-semibold text-slate-800 block">
                  Quãng khựng ngập ngừng &gt; 0.5s
                </span>
                <span className="font-label-mono text-[11px] text-slate-500">
                  {data.awkwardPausesCount > 0 ? 'Làm đứt gãy luồng thông tin' : 'Không có khoảng khựng bất thường'}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className={`font-headline-md text-headline-md font-bold ${
                data.awkwardPausesCount > 0 ? 'text-amber-600' : 'text-emerald-600'
              }`}>
                {data.awkwardPausesCount}
              </span>
              <span className="font-label-mono text-[10px] text-slate-500 block uppercase font-semibold">
                Lần
              </span>
            </div>
          </div>

          {/* AC 4: Pedagogical Card with Intentional Silence advice */}
          {l1FilterEnabled && data.fillers.length > 0 && (
            <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                <span className="material-symbols-outlined text-sm text-amber-600">tips_and_updates</span>
                Lời khuyên Sư Phạm: Sự im lặng có chủ đích
              </div>
              <p className="text-xs text-amber-950 leading-relaxed">
                {data.fillers[0].tip || 'Khi cần suy nghĩ, hãy dùng khoảng lặng tự nhiên (Intentional Silence) thay vì phát ra âm "ờ" hay "ừm". Khoảng lặng tạo phong thái tự tin và chuyên nghiệp.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
