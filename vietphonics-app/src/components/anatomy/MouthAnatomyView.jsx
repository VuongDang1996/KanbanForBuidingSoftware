import React, { useState, useEffect, useMemo } from 'react';
import { PHONEME_ANATOMY_CATALOG, calculateAnatomyTransform } from '../../lib/anatomy/phonemeAnatomyData';

export default function MouthAnatomyView({ initialPhoneme = '/θ/' }) {
  const [selectedPhoneme, setSelectedPhoneme] = useState(initialPhoneme);
  const currentProfile = useMemo(() => {
    return PHONEME_ANATOMY_CATALOG[selectedPhoneme] || PHONEME_ANATOMY_CATALOG['/θ/'];
  }, [selectedPhoneme]);

  // Sliders state
  const [tongueElevation, setTongueElevation] = useState(currentProfile.defaultSliders.tongueElevation);
  const [jawDrop, setJawDrop] = useState(currentProfile.defaultSliders.jawDrop);
  const [airPressure, setAirPressure] = useState(currentProfile.defaultSliders.airPressure);

  // Toggles & Animation
  const [showL1Ghost, setShowL1Ghost] = useState(true);
  const [isVoiced, setIsVoiced] = useState(currentProfile.isVoiced);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Sync sliders when phoneme changes
  useEffect(() => {
    setTongueElevation(currentProfile.defaultSliders.tongueElevation);
    setJawDrop(currentProfile.defaultSliders.jawDrop);
    setAirPressure(currentProfile.defaultSliders.airPressure);
    setIsVoiced(currentProfile.isVoiced);
    setIsSaved(false);
  }, [currentProfile]);

  const { totalTranslateY } = calculateAnatomyTransform(tongueElevation, jawDrop);

  // Audio tone playback
  const playTone = (freq, durationSec = 0.4) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationSec);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + durationSec);
    } catch {}
  };

  // Trigger Morphing Animation (AC 1)
  const triggerMorphAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 1800);
  };

  // Save Calibration
  const saveCalibration = async () => {
    try {
      await fetch('/api/v1/anatomy/calibration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'default_user'
        },
        body: JSON.stringify({
          phoneme: selectedPhoneme,
          tongueElevation,
          jawDrop,
          airPressure,
          isGhostCompared: showL1Ghost
        })
      });
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2500);
    } catch {
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2500);
    }
  };

  return (
    <section className="w-full bg-white rounded-xl p-4 md:p-6 shadow-sm border border-slate-200/90 relative mt-6">
      {/* Header & Quick Phoneme Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-rose-600 text-2xl">medical_services</span>
            <h3 className="font-bold text-slate-800 text-lg md:text-xl">
              Mô Hình Cắt Lớp Giải Phẫu Khẩu Hình 2D (PRON-201)
            </h3>
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
              Sagittal Cross-Section
            </span>
          </div>
          <p className="text-slate-500 text-sm mt-0.5">
            Mặt cắt dọc vòm miệng chuẩn xác y khoa &amp; L1 Ghost Overlay so sánh trực quan thói quen tiếng Việt
          </p>
        </div>

        {/* Phoneme Quick Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {Object.keys(PHONEME_ANATOMY_CATALOG).map((sym) => {
            const item = PHONEME_ANATOMY_CATALOG[sym];
            return (
              <button
                key={sym}
                onClick={() => setSelectedPhoneme(sym)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedPhoneme === sym
                    ? 'bg-rose-600 text-white shadow-sm ring-2 ring-rose-200'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {sym} {item.sampleWord}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Split Grid: 8 Cols (Sagittal Canvas) + 4 Cols (Front Lip & Guidance) */}
      <div className="mt-5 grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* LEFT: 8 Cols - Sagittal Stage */}
        <div className="xl:col-span-8 flex flex-col gap-4">
          <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-inner flex flex-col">
            {/* Top Toolbar inside stage */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3 z-10">
              <div className="flex items-center gap-2 text-white">
                <span className="text-rose-400 font-mono text-xl font-bold">{currentProfile.phoneme}</span>
                <span className="text-slate-400 text-xs font-medium">• {currentProfile.name}</span>
              </div>

              <div className="flex items-center gap-2">
                {/* L1 Ghost Overlay Toggle (AC 3) */}
                <button
                  onClick={() => setShowL1Ghost(!showL1Ghost)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    showL1Ghost
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">visibility</span>
                  <span>L1 Ghost Overlay: {showL1Ghost ? 'BẬT' : 'TẮT'}</span>
                </button>

                {/* Voicing indicator */}
                <button
                  onClick={() => setIsVoiced(!isVoiced)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    isVoiced
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isVoiced ? 'bg-sky-400 animate-pulse' : 'bg-slate-500'}`}></span>
                  <span>{isVoiced ? 'Hữu thanh (Voiced)' : 'Vô thanh (Voiceless)'}</span>
                </button>
              </div>
            </div>

            {/* 760x500 SVG Sagittal Canvas */}
            <div className="relative w-full h-[380px] md:h-[440px] bg-slate-950/70 border border-slate-800/90 rounded-xl flex items-center justify-center overflow-hidden">
              <svg
                id="vocalTractSvg"
                viewBox="0 0 760 500"
                className="w-full h-full object-contain select-none z-10"
              >
                <defs>
                  {/* Warm Vivid Tongue Muscle Gradient */}
                  <linearGradient id="tongueGradReact" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#fb7185" />
                    <stop offset="50%" stopColor="#f43f5e" />
                    <stop offset="100%" stopColor="#be123c" />
                  </linearGradient>
                  {/* Airflow Gradient */}
                  <linearGradient id="airGradReact" x1="0%" x2="100%" y1="100%" y2="0%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.15" />
                    <stop offset="70%" stopColor="#0284c7" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#0369a1" stopOpacity="1" />
                  </linearGradient>
                </defs>

                {/* Head Silhouette */}
                <path
                  d="M 120 40 C 260 10, 480 20, 560 90 C 620 140, 640 220, 640 250 C 630 258, 600 262, 590 262 C 585 275, 580 286, 580 292 C 588 296, 615 304, 618 316 C 620 336, 570 380, 530 400 C 470 430, 400 450, 360 480 L 140 480 L 140 380 C 130 310, 110 180, 120 40 Z"
                  fill="#1e293b"
                  opacity="0.6"
                  stroke="#334155"
                  strokeWidth="1.5"
                />

                {/* Nasal Cavity */}
                <path
                  d="M 330 110 C 370 70, 450 70, 520 120 C 530 130, 550 160, 550 180 C 530 190, 490 190, 450 170 C 400 150, 360 140, 330 110 Z"
                  fill="#0f172a"
                  stroke="#334155"
                  strokeWidth="1.5"
                />
                <text x="430" y="115" className="fill-slate-500 font-mono text-[10px] tracking-widest font-semibold">
                  KHOANG MŨI
                </text>

                {/* Hard Palate (Vòm Cứng) */}
                <path
                  d="M 360 170 C 400 170, 460 185, 490 215 C 500 225, 515 240, 522 255"
                  fill="none"
                  stroke="#94a3b8"
                  strokeLinecap="round"
                  strokeWidth="5"
                />
                <text x="390" y="165" className="fill-slate-400 font-mono text-[10px] font-bold">
                  VÒM CỨNG (HARD PALATE)
                </text>

                {/* Velum / Soft Palate */}
                <path
                  d="M 360 170 C 330 170, 305 185, 295 210 C 290 225, 290 245, 295 255 C 298 260, 305 260, 308 250 C 315 230, 325 215, 355 205"
                  fill="#334155"
                  stroke="#64748b"
                  strokeWidth="2"
                />
                <text x="220" y="210" className="fill-slate-500 font-mono text-[10px] font-semibold">
                  LƯỠI GÀ (VELUM)
                </text>

                {/* Posterior Pharynx Wall */}
                <path
                  d="M 290 260 C 285 290, 280 340, 275 440"
                  fill="none"
                  stroke="#64748b"
                  strokeLinecap="round"
                  strokeWidth="6"
                />

                {/* Upper Incisor (Răng Cửa Trên) */}
                <path d="M 545 268 L 536 292 L 526 291 L 532 268 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.8" />
                <text x="548" y="260" className="fill-slate-300 font-mono text-[10px] font-bold">
                  Răng Trên
                </text>

                {/* Lower Incisor (Răng Cửa Dưới) */}
                <path d="M 536 332 L 530 306 L 521 308 L 525 334 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.8" />
                <text x="546" y="348" className="fill-slate-300 font-mono text-[10px] font-bold">
                  Răng Dưới
                </text>

                {/* AC 3: L1 Vietnamese Ghost Path Overlay */}
                {showL1Ghost && currentProfile.l1GhostPath && (
                  <g className="transition-opacity duration-300">
                    <path
                      d={currentProfile.l1GhostPath}
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2.5"
                      strokeDasharray="6 4"
                      strokeOpacity="0.75"
                    />
                    <text x="440" y="275" className="fill-amber-400 font-mono text-[10px] font-bold">
                      🇻🇳 L1 Thói Quen Lưỡi Rụt
                    </text>
                  </g>
                )}

                {/* Dynamic Tongue Body (Reacting to sliders) */}
                <g
                  style={{
                    transform: `translateY(${totalTranslateY}px)${isAnimating ? ' translate(6px, -2px)' : ''}`,
                    transition: isAnimating ? 'transform 0.5s ease-in-out' : 'transform 0.15s ease-out'
                  }}
                >
                  <path
                    d={currentProfile.tonguePath}
                    fill="url(#tongueGradReact)"
                    stroke="#fb7185"
                    strokeWidth="1.5"
                  />
                  {/* Muscle Fiber Striations */}
                  <path d="M 380 340 Q 420 315 470 315" fill="none" stroke="rgba(255,255,255,0.4)" strokeDasharray="3 3" strokeWidth="1.5" />
                  <path d="M 395 365 Q 430 340 480 330" fill="none" stroke="rgba(255,255,255,0.35)" strokeDasharray="4 4" strokeWidth="1.5" />
                  <text x="420" y="330" className="fill-white font-mono text-[10px] font-bold tracking-wider">
                    CƠ THÂN LƯỠI
                  </text>
                </g>

                {/* Airflow Stream (Opacity tied to airPressure slider) */}
                <g opacity={airPressure / 100}>
                  <path
                    d="M 315 440 C 315 380, 335 310, 380 270 C 430 225, 480 265, 518 285 L 565 292"
                    fill="none"
                    stroke="url(#airGradReact)"
                    strokeDasharray="8 6"
                    strokeLinecap="round"
                    strokeWidth="4"
                  />
                  <path
                    d="M 565 294 Q 610 292 635 285"
                    fill="none"
                    stroke="#38bdf8"
                    strokeDasharray="6 4"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                  />
                </g>

                {/* Larynx Node (Voicing vibration) */}
                <g transform="translate(295, 430)">
                  <circle
                    cx="0"
                    cy="0"
                    r="14"
                    fill={isVoiced ? '#0284c7' : '#1e293b'}
                    stroke={isVoiced ? '#38bdf8' : '#475569'}
                    strokeWidth="2"
                  />
                  <text x="22" y="4" className="fill-slate-400 font-mono text-[10px] font-bold">
                    {isVoiced ? 'THANH QUẢN RUNG' : 'THANH QUẢN TĨNH'}
                  </text>
                </g>
              </svg>

              {/* Metric Overlay Badge */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono">
                <div className="px-3 py-1 rounded bg-slate-800/90 text-sky-300 border border-slate-700">
                  Friction Index: {currentProfile.frictionIndex}%
                </div>
                <div className="px-3 py-1 rounded bg-slate-800/90 text-rose-300 border border-slate-700">
                  {currentProfile.contactTarget}
                </div>
              </div>
            </div>

            {/* AC 2: 3 Biomechanical Manual Sliders */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-800/80 border border-slate-700 p-3.5 rounded-xl">
              {/* Slider 1: Tongue Elevation */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-300 font-semibold">Độ Nâng Lưỡi</span>
                  <span className="text-rose-400 font-bold">{tongueElevation}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={tongueElevation}
                  onChange={(e) => setTongueElevation(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
                <span className="text-[10px] text-slate-400 font-mono block mt-0.5">Chuẩn: {currentProfile.defaultSliders.tongueElevation}%</span>
              </div>

              {/* Slider 2: Jaw Drop */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-300 font-semibold">Độ Mở Hàm (Jaw)</span>
                  <span className="text-sky-400 font-bold">{jawDrop}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="80"
                  value={jawDrop}
                  onChange={(e) => setJawDrop(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
                <span className="text-[10px] text-slate-400 font-mono block mt-0.5">Chuẩn: {currentProfile.defaultSliders.jawDrop}%</span>
              </div>

              {/* Slider 3: Air Pressure */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-300 font-semibold">Lực Luồng Hơi</span>
                  <span className="text-emerald-400 font-bold">{airPressure}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={airPressure}
                  onChange={(e) => setAirPressure(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <span className="text-[10px] text-slate-400 font-mono block mt-0.5">Chuẩn: {currentProfile.defaultSliders.airPressure}%</span>
              </div>
            </div>

            {/* Bottom Controls Bar */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => playTone(340, 0.35)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <span className="material-symbols-outlined text-sm text-rose-400">volume_up</span>
                  <span>Nghe Âm {currentProfile.phoneme}</span>
                </button>

                <button
                  onClick={() => playTone(440, 0.45)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <span className="material-symbols-outlined text-sm text-sky-400">record_voice_over</span>
                  <span>Từ "{currentProfile.sampleWord}"</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={triggerMorphAnimation}
                  disabled={isAnimating}
                  className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all"
                >
                  <span className="material-symbols-outlined text-sm">animation</span>
                  <span>{isAnimating ? 'Đang chuyển động...' : 'Xem Hoạt Họa Khẩu Hình'}</span>
                </button>

                <button
                  onClick={saveCalibration}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isSaved
                      ? 'bg-emerald-600 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  {isSaved ? '✓ Đã Lưu' : 'Lưu Hiệu Chỉnh'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: 4 Cols - Coronal Front Lip & L1 Diagnostic */}
        <div className="xl:col-span-4 flex flex-col gap-4">
          {/* Coronal Front Lip View */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-rose-600 text-base">face</span>
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Tư Thế Môi Trực Diện</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-600">
                CORONAL VIEW
              </span>
            </div>

            {/* Front Lip SVG Graphic */}
            <div className="relative w-full h-36 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 280 140" className="w-full h-full object-contain">
                <rect width="280" height="140" fill="#f8fafc" />
                {/* Upper lip */}
                <path d="M 60 70 Q 100 50 140 56 Q 180 50 220 70 Q 180 62 140 65 Q 100 62 60 70 Z" fill="#fb7185" opacity="0.9" />
                {/* Mouth dark hole */}
                <ellipse cx="140" cy="72" rx="60" ry="14" fill="#334155" />
                {/* Upper Incisors */}
                <path d="M 119 66 L 119 76 L 138 76 L 138 66 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" />
                <path d="M 142 66 L 142 76 L 161 76 L 161 66 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" />
                {/* Protruding Tongue Tip */}
                <path
                  d="M 120 75 Q 140 85 160 75 Q 155 82 140 83 Q 125 82 120 75 Z"
                  fill="#f43f5e"
                  stroke="#fda4af"
                  strokeWidth="1"
                />
                {/* Lower Lip */}
                <path d="M 60 70 Q 100 80 140 84 Q 180 80 220 70 Q 180 92 140 92 Q 100 92 60 70 Z" fill="#e11d48" opacity="0.95" />
                {/* Callout */}
                <line x1="140" y1="83" x2="140" y2="108" stroke="#0284c7" strokeWidth="1.2" strokeDasharray="2 2" />
                <circle cx="140" cy="108" r="2.5" fill="#0284c7" />
                <text x="148" y="112" className="fill-sky-800 font-mono text-[9px] font-bold">
                  Lưỡi thò 2 - 3mm
                </text>
              </svg>
            </div>
          </div>

          {/* 1. Vietnamese Habitual Mistake Diagnostic Card */}
          <div className="bg-rose-50 border border-rose-200 border-l-4 border-l-rose-500 p-3.5 rounded-xl shadow-xs">
            <div className="flex items-start gap-2.5">
              <span className="material-symbols-outlined text-rose-600 text-lg shrink-0 mt-0.5">warning</span>
              <div>
                <strong className="text-xs font-bold text-rose-900 uppercase block tracking-wider">
                  Tật Quen Thuộc Của Người Việt:
                </strong>
                <p className="text-xs text-rose-950 mt-1 leading-relaxed">
                  {currentProfile.l1Mistake}
                </p>
              </div>
            </div>
          </div>

          {/* 2. Step-by-Step Corrective Guidance */}
          <div className="bg-emerald-50 border border-emerald-200 border-l-4 border-l-emerald-600 p-3.5 rounded-xl shadow-xs">
            <div className="flex items-start gap-2.5">
              <span className="material-symbols-outlined text-emerald-700 text-lg shrink-0 mt-0.5">check_circle</span>
              <div>
                <strong className="text-xs font-bold text-emerald-900 uppercase block tracking-wider">
                  Cách Đặt Lưỡi Chuẩn Xác:
                </strong>
                <p className="text-xs text-emerald-950 mt-1 leading-relaxed">
                  {currentProfile.correctiveGuidance}
                </p>
              </div>
            </div>
          </div>

          {/* 3. Tactile Trick / Mẹo Cảm Giác */}
          <div className="bg-amber-50 border border-amber-200 border-l-4 border-l-amber-500 p-3.5 rounded-xl shadow-xs">
            <div className="flex items-start gap-2.5">
              <span className="material-symbols-outlined text-amber-700 text-lg shrink-0 mt-0.5">touch_app</span>
              <div>
                <strong className="text-xs font-bold text-amber-900 uppercase block tracking-wider">
                  Mẹo Cảm Giác (Tactile Trick):
                </strong>
                <p className="text-xs text-amber-950 mt-1 leading-relaxed">
                  {currentProfile.tactileTrick}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
