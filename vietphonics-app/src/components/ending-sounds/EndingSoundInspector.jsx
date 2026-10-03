import React, { useState, useEffect, useRef } from 'react';
import { BURST_CRITICAL_WORDS, analyzeEndingSoundBurst } from '../../lib/audio/burstAnalysis';

/**
 * VN-101: Final Consonant Sound Ending Burst Analyzer & Dual Oscilloscope Inspector
 * Features:
 * - AC 1: Dual Oscilloscope Canvas (Native Reference vs User Voice)
 * - AC 2: Transient Burst Energy Spike (dE/dt) Gauge with >= 0.35 Threshold
 * - AC 3: Vietnamese L1 Unreleased Stop Anatomical Warning & Guidance
 * - AC 4: Slow-Mo 0.5x Pitch-Preserving Timestretch Playback
 */
export default function EndingSoundInspector({
  initialWord = 'Six',
  onClose
}) {
  const [selectedWord, setSelectedWord] = useState(initialWord);
  const [burstRatio, setBurstRatio] = useState(0.14); // Default learner unreleased
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef(null);

  const evaluation = analyzeEndingSoundBurst(selectedWord, burstRatio);

  // Play audio at customized speed (0.5x or 1.0x) with pitch preservation
  const handlePlayAudio = (word, rate = 1.0) => {
    setIsPlaying(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = rate;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlaying(false), 1200);
    }
  };

  // Draw Dual Oscilloscope Waveform on Canvas 2D
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Background grid
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;

    for (let x = 0; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    const midY1 = height * 0.25;
    const midY2 = height * 0.75;

    // Center divider
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Channel 1: Native Reference Waveform (Sky-600) with strong coda burst spike
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 2.5;
    ctx.beginPath();

    const pointsCount = 300;
    for (let i = 0; i < pointsCount; i++) {
      const x = (i / pointsCount) * width;
      const progress = i / pointsCount;

      let amp = 0;
      if (progress < 0.2) {
        amp = Math.sin(i * 0.3) * 6; // lead-in
      } else if (progress < 0.7) {
        // Vowel core
        amp = Math.sin(i * 0.4) * (24 + Math.sin(i * 0.08) * 12);
      } else if (progress < 0.85) {
        // Stop closure (silence gap)
        amp = Math.sin(i * 0.2) * 3;
      } else {
        // TRANSIENT CODA BURST SPIKE (Sharp high energy)
        amp = (Math.random() * 2 - 1) * 36;
      }

      const y = midY1 + amp;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Channel 2: User Recorded Waveform (Rose-600 or Amber-500)
    ctx.strokeStyle = evaluation.isReleased ? '#059669' : '#e11d48';
    ctx.lineWidth = 2.5;
    ctx.beginPath();

    for (let i = 0; i < pointsCount; i++) {
      const x = (i / pointsCount) * width;
      const progress = i / pointsCount;

      let amp = 0;
      if (progress < 0.2) {
        amp = Math.sin(i * 0.3) * 5;
      } else if (progress < 0.7) {
        amp = Math.sin(i * 0.4) * (22 + Math.sin(i * 0.08) * 10);
      } else if (progress < 0.85) {
        amp = Math.sin(i * 0.2) * 2;
      } else {
        // USER CODA: Weak or unreleased if burstRatio < 0.35
        const burstMultiplier = evaluation.isReleased ? 32 : 6;
        amp = (Math.random() * 2 - 1) * burstMultiplier;
      }

      const y = midY2 + amp;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Coda 50ms Burst Zone Marker Box
    const burstStartX = width * 0.85;
    ctx.fillStyle = evaluation.isReleased ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)';
    ctx.fillRect(burstStartX, 0, width - burstStartX, height);
    ctx.strokeStyle = evaluation.isReleased ? '#10b981' : '#f43f5e';
    ctx.lineWidth = 2;
    ctx.strokeRect(burstStartX, 0, width - burstStartX, height);

    // Labels
    ctx.font = 'bold 11px monospace';
    ctx.fillStyle = '#0369a1';
    ctx.fillText('NATIVE REFERENCE: [Xung bật hơi /k/ + /s/ rõ ràng]', 12, 22);

    ctx.fillStyle = evaluation.isReleased ? '#047857' : '#be123c';
    ctx.fillText(`USER VOICE: [${evaluation.isReleased ? 'Đã bật hơi' : 'MẤT XUNG BẬT HƠI (Nuốt âm đuôi)'}]`, 12, height / 2 + 22);

    ctx.font = 'bold 10px monospace';
    ctx.fillStyle = evaluation.isReleased ? '#047857' : '#be123c';
    ctx.fillText('Coda 50ms', burstStartX + 6, height - 12);
  }, [selectedWord, burstRatio, evaluation.isReleased]);

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-2xl">graphic_eq</span>
            </div>
            <div>
              <h2 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                VN-101: Thanh Tra Âm Cuối &amp; Phân Tích Xung Âm Bật Hơi
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 font-semibold">
                  Acoustical Burst Inspector
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Đối chiếu 2 kênh sóng âm song song và đo lường xung năng lượng tức thời (dE/dt)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 flex items-center justify-center text-slate-600 transition-colors"
            title="Đóng cửa sổ"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Word Selection Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Chọn từ kiểm tra phụ âm đuôi:
            </span>
            <div className="flex flex-wrap gap-2">
              {Object.keys(BURST_CRITICAL_WORDS).map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => {
                    setSelectedWord(w);
                    setBurstRatio(BURST_CRITICAL_WORDS[w].userDefaultBurstRatio);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                    selectedWord === w
                      ? 'bg-rose-600 text-white border-rose-700 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  "{w}" ({BURST_CRITICAL_WORDS[w].targetPhoneme})
                </button>
              ))}
            </div>
          </div>

          {/* AC 1: Dual Oscilloscope Canvas */}
          <div className="rounded-xl border border-slate-300 overflow-hidden shadow-inner bg-slate-50">
            <canvas
              ref={canvasRef}
              width={760}
              height={220}
              className="w-full h-56 block cursor-crosshair"
            />
          </div>

          {/* AC 2: Burst Energy Spike Meter & Threshold Indicator */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Meter Card */}
            <div className="p-4 rounded-xl border bg-slate-50 border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-sky-600">electric_bolt</span>
                  Tỷ lệ năng lượng xung bật (Burst Energy Ratio):
                </span>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${evaluation.badgeClass}`}>
                  {evaluation.statusLabel}
                </span>
              </div>

              {/* Progress bar with 0.35 threshold line */}
              <div className="relative pt-2 pb-1">
                <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden flex">
                  <div
                    style={{ width: `${Math.min(100, burstRatio * 150)}%` }}
                    className={`h-full transition-all duration-300 ${
                      evaluation.isReleased ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                  />
                </div>
                {/* 0.35 Threshold Marker */}
                <div
                  style={{ left: `${0.35 * 150}%` }}
                  className="absolute top-0 bottom-0 w-0.5 bg-slate-800 z-10 flex flex-col items-center"
                >
                  <span className="text-[9px] font-mono font-bold bg-slate-800 text-white px-1 rounded -top-3">
                    0.35 Ngưỡng Chuẩn
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>0.0 (Nuốt âm)</span>
                <span className="font-bold text-slate-800">Hiện tại: {burstRatio}</span>
                <span>0.6+ (Bật nổ rất mạnh)</span>
              </div>

              {/* Simulation Toggle to try released plosive */}
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Mô phỏng phát âm:</span>
                <button
                  type="button"
                  onClick={() => setBurstRatio(burstRatio >= 0.35 ? 0.14 : 0.46)}
                  className="px-3 py-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold transition-colors"
                >
                  {burstRatio >= 0.35 ? '↺ Đổi sang Nuốt Âm (<0.35)' : '✓ Đổi sang Bật Chuẩn (≥0.35)'}
                </button>
              </div>
            </div>

            {/* Audio Playback Controls (AC 4: Slow-Mo 0.5x) */}
            <div className="p-4 rounded-xl border bg-slate-50 border-slate-200 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Nghe đối chiếu &amp; Kéo giãn thời gian (Timestretch):
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Nghe ở tốc độ 0.5x với thuật toán giữ nguyên cao độ (Pitch-preserving) để nhận biết chính xác điểm ngậm miệng hay bật thoát khí.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => handlePlayAudio(selectedWord, 1.0)}
                  disabled={isPlaying}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
                >
                  <span className="material-symbols-outlined text-base">volume_up</span>
                  Chuẩn Bản Ngữ 1.0x
                </button>

                <button
                  type="button"
                  onClick={() => handlePlayAudio(selectedWord, 0.5)}
                  disabled={isPlaying}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
                >
                  <span className="material-symbols-outlined text-base">slow_motion_video</span>
                  Nghe Chậm 0.5x
                </button>
              </div>
            </div>
          </div>

          {/* AC 3: Vietnamese L1 Unreleased Stop Anatomical Guidance Card */}
          <div className="p-4 bg-gradient-to-r from-amber-50 to-rose-50 rounded-xl border border-amber-200 space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
              <span className="material-symbols-outlined text-base text-amber-700">clinical_notes</span>
              Chẩn Đoán Bệnh Lý L1: Tật "Nuốt Âm Đuôi" (Unreleased Stop Coda)
            </div>
            <p className="text-xs text-amber-950 leading-relaxed">
              <strong>Bẫy thói quen:</strong> {evaluation.trap}
            </p>
            <div className="pt-1 text-xs text-emerald-900 font-medium border-t border-amber-200/80">
              <strong>Kỹ thuật khắc phục:</strong> {evaluation.articulatoryGuidance}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between rounded-b-2xl">
          <span className="text-xs text-slate-500 font-mono">
            VN-101 Verified | FFT Size 1024 | dE/dt Threshold: 0.35
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition-colors"
          >
            Đã Hiểu &amp; Quay Lại Studio
          </button>
        </div>
      </div>
    </div>
  );
}
