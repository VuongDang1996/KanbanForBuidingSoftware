import React, { useState } from 'react';

const PHONEMES = [
  { id: 'theta', symbol: '/θ/', word: 'think', name: 'Interdental Voiceless Fricative', voiced: false, toneFreq: 320, contrastId: 'eth', contrastSym: '/ð/' },
  { id: 'eth', symbol: '/ð/', word: 'this', name: 'Interdental Voiced Fricative', voiced: true, toneFreq: 220, contrastId: 'theta', contrastSym: '/θ/' },
  { id: 'esh', symbol: '/ʃ/', word: 'she', name: 'Palato-Alveolar Voiceless Fricative', voiced: false, toneFreq: 400, contrastId: 'ezh', contrastSym: '/ʒ/' },
  { id: 'ezh', symbol: '/ʒ/', word: 'measure', name: 'Palato-Alveolar Voiced Fricative', voiced: true, toneFreq: 260, contrastId: 'esh', contrastSym: '/ʃ/' },
  { id: 'ch', symbol: '/tʃ/', word: 'chair', name: 'Voiceless Postalveolar Affricate', voiced: false, toneFreq: 360, contrastId: 'dj', contrastSym: '/dʒ/' },
  { id: 'dj', symbol: '/dʒ/', word: 'job', name: 'Voiced Postalveolar Affricate', voiced: true, toneFreq: 240, contrastId: 'ch', contrastSym: '/tʃ/' }
];

export default function MouthAnatomyView() {
  const [activePhonemeId, setActivePhonemeId] = useState('theta');
  const [isVoiced, setIsVoiced] = useState(false);
  const [tongueElev, setTongueElev] = useState(35);
  const [jawDrop, setJawDrop] = useState(25);
  const [airPressure, setAirPressure] = useState(65);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animTranslate, setAnimTranslate] = useState({ x: 0, y: 0 });

  const currentPhoneme = PHONEMES.find(p => p.id === activePhonemeId) || PHONEMES[0];

  const handlePhonemeSelect = (p) => {
    setActivePhonemeId(p.id);
    setIsVoiced(p.voiced);
    if (p.id === 'theta' || p.id === 'eth') {
      setTongueElev(35);
      setJawDrop(25);
    } else if (p.id === 'esh' || p.id === 'ezh') {
      setTongueElev(65);
      setJawDrop(20);
    } else {
      setTongueElev(75);
      setJawDrop(30);
    }
  };

  const playTTS = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const triggerAnimate = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    // Cycle 1: retract tongue slightly
    setAnimTranslate({ x: -8, y: 4 });
    setTimeout(() => {
      // Cycle 2: push between teeth
      setAnimTranslate({ x: 6, y: -2 });
    }, 400);
    setTimeout(() => {
      // Cycle 3: return
      setAnimTranslate({ x: 0, y: 0 });
      setIsAnimating(false);
    }, 1200);
  };

  // Calculated dynamic tongue shift
  const yOffset = (35 - tongueElev) * 0.4;
  const jawY = (jawDrop - 25) * 0.3;
  const totalTongueY = (yOffset + jawY) + animTranslate.y;
  const totalTongueX = animTranslate.x;

  return (
    <div className="flex flex-col w-full animate-fade-in">
      {/* Top Context Header Bar */}
      <div className="w-full bg-white border-b border-slate-200/80 px-4 md:px-gutter-desktop py-space-sm shadow-sm">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-md">
            <div className="flex items-center gap-space-xs px-space-sm py-1 bg-sky-50 border border-sky-200/70 rounded-full">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
              <span className="font-label-mono text-label-mono text-sky-800 uppercase font-semibold">2D Biomechanical Studio</span>
            </div>
            <div className="hidden sm:flex items-center gap-space-xs text-slate-500 font-label-mono text-label-mono">
              <span>Phoneme Target:</span>
              <span className="text-rose-600 font-ipa-inline text-ipa-inline font-bold">{currentPhoneme.symbol}</span>
              <span className="text-slate-300">·</span>
              <span>{currentPhoneme.name}</span>
            </div>
          </div>

          {/* Quick Phoneme Switcher Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {PHONEMES.map((p) => {
              const active = p.id === activePhonemeId;
              return (
                <button aria-label="Chọn âm vị thực hành"
                  key={p.id}
                  onClick={() => handlePhonemeSelect(p)}
                  className={`px-3 py-1 rounded-full font-ipa-inline text-ipa-inline text-xs font-semibold shadow-xs transition-all whitespace-nowrap ${
                    active
                      ? 'bg-rose-600 text-white shadow-sm ring-2 ring-rose-200'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }`}
                  type="button"
                >
                  {p.symbol} {p.word}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main 12-Column Split-View Studio Canvas */}
      <div className="w-full px-gutter md:px-gutter-desktop py-space-lg">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 xl:grid-cols-12 gap-gutter-desktop items-start">
          {/* LEFT PANE: 8 COLS - Sagittal Cross-Section Vocal Tract Graphic */}
          <div className="xl:col-span-8 flex flex-col gap-space-lg min-w-0">
            {/* Primary Acoustic Stage Box */}
            <div className="relative bg-white border border-slate-200/90 rounded-2xl p-space-md md:p-space-lg shadow-sm overflow-hidden flex flex-col">
              {/* Subtle Ambient Light Gradient Backdrop */}
              <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-100/60 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute top-1/2 right-0 w-80 h-80 bg-rose-100/50 rounded-full blur-3xl pointer-events-none"></div>

              {/* Stage Subhead & Metadata */}
              <div className="flex flex-wrap items-center justify-between gap-space-sm mb-space-md z-10">
                <div className="flex items-center gap-space-sm">
                  <span className="p-2 bg-rose-50 text-rose-600 border border-rose-200/60 rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg">medical_services</span>
                  </span>
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-slate-900 tracking-tight font-bold">
                      Thiết Diện Cắt Dọc Miệng &amp; Vòm Họng
                    </h2>
                    <p className="font-label-mono text-label-mono text-slate-500 uppercase tracking-wider">
                      Sagittal Plane · Articulatory Target Matrix
                    </p>
                  </div>
                </div>

                {/* Voicing Comparator Toggle */}
                <div className="flex items-center gap-2 bg-slate-100/80 border border-slate-200 px-3 py-1.5 rounded-full">
                  <span className="font-body-sm text-body-sm text-slate-600 font-medium">Thanh quản:</span>
                  <button aria-label="Nút tương tác"
                    onClick={() => setIsVoiced(!isVoiced)}
                    className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white text-slate-700 hover:text-slate-900 border border-slate-200 font-label-mono text-label-mono shadow-xs transition-all cursor-pointer"
                    type="button"
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${isVoiced ? 'bg-sky-500 animate-ping' : 'bg-slate-400'}`}
                    ></span>
                    <span>
                      {isVoiced ? 'Đang Rung (Voiced)' : 'Không Rung (Voiceless)'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Sagittal Anatomical SVG Canvas */}
              <div className="relative w-full h-[400px] md:h-[480px] bg-[#f8fafc] border border-slate-200/80 rounded-xl flex items-center justify-center overflow-hidden">
                {/* Delicate Precision Grid Lines */}
                <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern height="40" id="grid-pattern" patternUnits="userSpaceOnUse" width="40">
                      <path className="text-slate-300" d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.75"></path>
                    </pattern>
                  </defs>
                  <rect fill="url(#grid-pattern)" height="100%" width="100%"></rect>
                </svg>

                {/* Vector Cross-Section Anatomy */}
                <svg
                  className="w-full h-full max-h-[460px] object-contain transition-all duration-300 select-none z-10"
                  viewBox="0 0 760 500"
                >
                  <defs>
                    {/* Warm Vivid Tongue Muscle Gradient */}
                    <linearGradient id="tongueGrad" x1="0%" x2="100%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="#fb7185"></stop>
                      <stop offset="50%" stopColor="#f43f5e"></stop>
                      <stop offset="100%" stopColor="#be123c"></stop>
                    </linearGradient>

                    {/* Sharp Airflow Gradient */}
                    <linearGradient id="airGrad" x1="0%" x2="100%" y1="100%" y2="0%">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.15"></stop>
                      <stop offset="70%" stopColor="#0284c7" stopOpacity="0.85"></stop>
                      <stop offset="100%" stopColor="#0369a1" stopOpacity="1"></stop>
                    </linearGradient>

                    {/* Vibrant Glow Filter */}
                    <filter height="150%" id="cyanGlow" width="150%" x="-25%" y="-25%">
                      <feGaussianBlur result="blur" stdDeviation="3.5"></feGaussianBlur>
                      <feComposite in="SourceGraphic" in2="blur" operator="over"></feComposite>
                    </filter>
                  </defs>

                  {/* Head & Facial Silhouette */}
                  <path
                    d="M 120 40 C 260 10, 480 20, 560 90 C 620 140, 640 220, 640 250 C 630 258, 600 262, 590 262 C 585 275, 580 286, 580 292 C 588 296, 615 304, 618 316 C 620 336, 570 380, 530 400 C 470 430, 400 450, 360 480 L 140 480 L 140 380 C 130 310, 110 180, 120 40 Z"
                    fill="#e2e8f0"
                    opacity="0.45"
                    stroke="#cbd5e1"
                    strokeWidth="1.5"
                  ></path>

                  {/* Nasal Cavity & Sinuses */}
                  <path
                    d="M 330 110 C 370 70, 450 70, 520 120 C 530 130, 550 160, 550 180 C 530 190, 490 190, 450 170 C 400 150, 360 140, 330 110 Z"
                    fill="#f1f5f9"
                    stroke="#cbd5e1"
                    strokeWidth="1.5"
                  ></path>
                  <text className="fill-slate-400 font-label-mono text-[10px] tracking-widest font-semibold" x="430" y="115">
                    KHOANG MŨI (NASAL)
                  </text>

                  {/* Hard Palate (Vòm Cứng) & Ridges */}
                  <path
                    d="M 360 170 C 400 170, 460 185, 490 215 C 500 225, 515 240, 522 255"
                    fill="none"
                    stroke="#475569"
                    strokeLinecap="round"
                    strokeWidth="5"
                  ></path>
                  <path d="M 450 195 L 452 188 M 465 204 L 468 197 M 480 215 L 484 208" stroke="#64748b" strokeLinecap="round" strokeWidth="2"></path>
                  <text className="fill-slate-600 font-label-mono text-[10px] font-bold" x="390" y="165">
                    VÒM CỨNG (HARD PALATE)
                  </text>

                  {/* Soft Palate & Velum/Uvula */}
                  <path
                    d="M 360 170 C 330 170, 305 185, 295 210 C 290 225, 290 245, 295 255 C 298 260, 305 260, 308 250 C 315 230, 325 215, 355 205"
                    fill="#cbd5e1"
                    stroke="#64748b"
                    strokeWidth="2"
                  ></path>
                  <text className="fill-slate-500 font-label-mono text-[10px] font-semibold" x="220" y="210">
                    LƯỠI GÀ (VELUM)
                  </text>

                  {/* Pharynx Posterior Wall (Thành Họng Sau) */}
                  <path d="M 290 260 C 285 290, 280 340, 275 440" fill="none" stroke="#64748b" strokeLinecap="round" strokeWidth="6"></path>
                  <text className="fill-slate-500 font-label-mono text-[10px] font-semibold" x="195" y="340">
                    THÀNH HỌNG
                  </text>

                  {/* Upper Lip & Incisor */}
                  <path d="M 590 262 C 570 264, 555 266, 545 270" fill="none" stroke="#94a3b8" strokeWidth="4"></path>
                  <path d="M 545 268 L 536 292 L 526 291 L 532 268 Z" fill="#ffffff" stroke="#475569" strokeWidth="1.8"></path>
                  <text className="fill-slate-800 font-label-mono text-[10px] font-bold" x="548" y="260">
                    Răng Cửa Trên
                  </text>

                  {/* Lower Lip & Incisor */}
                  <path d="M 580 320 C 560 320, 546 318, 540 312" fill="none" stroke="#94a3b8" strokeWidth="4"></path>
                  <path d="M 536 332 L 530 306 L 521 308 L 525 334 Z" fill="#ffffff" stroke="#475569" strokeWidth="1.8"></path>
                  <text className="fill-slate-800 font-label-mono text-[10px] font-bold" x="546" y="345">
                    Răng Cửa Dưới
                  </text>

                  {/* Dynamic Tongue Body & Blade */}
                  <g
                    style={{
                      transform: `translate(${totalTongueX}px, ${totalTongueY}px)`,
                      transition: isAnimating ? 'transform 0.4s ease' : 'transform 0.15s ease'
                    }}
                  >
                    <path
                      d="M 330 400 C 340 350, 360 305, 400 290 C 445 272, 485 290, 515 298 C 532 301, 550 300, 552 297 C 550 303, 532 315, 505 325 C 450 345, 410 370, 390 420 Z"
                      fill="url(#tongueGrad)"
                      stroke="#e11d48"
                      strokeWidth="1.5"
                    ></path>
                    <path d="M 380 340 Q 420 315 470 315" fill="none" stroke="rgba(255,255,255,0.45)" strokeDasharray="3 3" strokeWidth="1.5"></path>
                    <path d="M 395 365 Q 430 340 480 330" fill="none" stroke="rgba(255,255,255,0.4)" strokeDasharray="4 4" strokeWidth="1.5"></path>
                    <path d="M 410 390 Q 445 365 490 345" fill="none" stroke="rgba(255,255,255,0.35)" strokeDasharray="4 4" strokeWidth="1.5"></path>
                    <text className="fill-white font-label-mono text-[10px] font-bold tracking-wider" x="420" y="325">
                      CƠ THÂN LƯỠI
                    </text>
                  </g>

                  {/* Active Constriction Point: Marker */}
                  <g transform="translate(545, 298)">
                    <circle cx="0" cy="0" fill="none" opacity="0.6" r="16" stroke="#0284c7" strokeWidth="1.5">
                      <animate attributeName="r" dur="2s" repeatCount="indefinite" values="6;22;26"></animate>
                      <animate attributeName="opacity" dur="2s" repeatCount="indefinite" values="0.9;0.3;0"></animate>
                    </circle>
                    <circle cx="0" cy="0" fill="#0284c7" filter="url(#cyanGlow)" r="5"></circle>
                    <line stroke="#0284c7" strokeDasharray="2 2" strokeWidth="1.5" x1="0" x2="35" y1="0" y2="-45"></line>
                    <circle cx="35" cy="-45" fill="#0284c7" r="2.5"></circle>
                  </g>

                  <g transform="translate(585, 245)">
                    <rect fill="#ffffff" height="24" opacity="0.95" rx="6" stroke="#bae6fd" strokeWidth="1" width="135" x="-5" y="-12"></rect>
                    <text className="fill-sky-800 font-label-mono text-[10px] font-bold" x="0" y="4">
                      Khe Hở Răng: 2.5mm
                    </text>
                  </g>

                  {/* Dynamic Airflow Stream */}
                  <g opacity={airPressure / 100}>
                    <path
                      d="M 315 440 C 315 380, 335 310, 380 270 C 430 225, 480 265, 518 285 L 565 292"
                      fill="none"
                      stroke="url(#airGrad)"
                      strokeDasharray="8 6"
                      strokeLinecap="round"
                      strokeWidth="4"
                    >
                      <animate attributeName="stroke-dashoffset" dur="1.2s" repeatCount="indefinite" values="40;0"></animate>
                    </path>
                    <path
                      d="M 325 435 C 330 370, 355 315, 395 285 C 440 250, 485 275, 522 290 L 580 295"
                      fill="none"
                      opacity="0.8"
                      stroke="#0284c7"
                      strokeDasharray="4 4"
                      strokeWidth="2"
                    >
                      <animate attributeName="stroke-dashoffset" dur="1s" repeatCount="indefinite" values="30;0"></animate>
                    </path>
                    <path
                      d="M 565 294 Q 610 292 635 285"
                      fill="none"
                      stroke="#0284c7"
                      strokeDasharray="6 4"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                    >
                      <animate attributeName="stroke-dashoffset" dur="0.8s" repeatCount="indefinite" values="20;0"></animate>
                    </path>
                    <path
                      d="M 565 297 Q 605 304 630 315"
                      fill="none"
                      stroke="#38bdf8"
                      strokeDasharray="5 5"
                      strokeLinecap="round"
                      strokeWidth="1.8"
                    >
                      <animate attributeName="stroke-dashoffset" dur="0.9s" repeatCount="indefinite" values="25;0"></animate>
                    </path>
                  </g>

                  {/* Vocal Cord Vibration Node (Larynx) */}
                  <g transform="translate(295, 430)">
                    <circle
                      cx="0"
                      cy="0"
                      fill={isVoiced ? '#e0f2fe' : '#ffffff'}
                      r="14"
                      stroke={isVoiced ? '#0284c7' : '#94a3b8'}
                      strokeWidth="2"
                    ></circle>
                    <path d="M -6 -5 Q 0 -2 6 -5" fill="none" stroke="#64748b" strokeWidth="2"></path>
                    <path d="M -6 5 Q 0 2 6 5" fill="none" stroke="#64748b" strokeWidth="2"></path>
                    <text className="fill-slate-600 font-label-mono text-[10px] font-bold" x="22" y="4">
                      THANH QUẢN {isVoiced ? '(RUNG)' : '(TĨNH)'}
                    </text>
                  </g>
                </svg>

                {/* Bottom Floating Acoustic Metric Badge Inside Stage */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
                  <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-slate-200/90 shadow-xs pointer-events-auto">
                    <span className="material-symbols-outlined text-sm text-sky-600">tune</span>
                    <span className="font-label-mono text-label-mono text-slate-500">Acoustic Friction:</span>
                    <span className="font-label-mono text-label-mono text-sky-700 font-bold">
                      Continuous / Friction Index {airPressure}%
                    </span>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-slate-200/90 shadow-xs pointer-events-auto">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                    <span className="font-label-mono text-label-mono text-slate-700 font-semibold">
                      Target Contact: Răng Trên + Răng Dưới
                    </span>
                  </div>
                </div>
              </div>

              {/* Real-Time Manual Articulation Calibration Sliders */}
              <div className="mt-space-md grid grid-cols-1 md:grid-cols-3 gap-space-md bg-slate-50/80 border border-slate-200/80 p-space-md rounded-xl">
                {/* Slider 1 */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-label-mono text-label-mono text-slate-700 font-semibold" htmlFor="tongueElev">
                      Độ Nâng Thân Lưỡi
                    </label>
                    <span className="font-label-mono text-label-mono text-rose-600 font-bold">{tongueElev}%</span>
                  </div>
                  <input
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                    id="tongueElev"
                    max="90"
                    min="10"
                    type="range"
                    value={tongueElev}
                    onChange={(e) => setTongueElev(Number(e.target.value))}
                  />
                  <div className="flex justify-between font-label-mono text-[9px] text-slate-500">
                    <span>0% Đáy miệng</span>
                    <span className="text-rose-600 font-semibold">Chuẩn: 30-40%</span>
                    <span>100% Chạm vòm</span>
                  </div>
                </div>

                {/* Slider 2 */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-label-mono text-label-mono text-slate-700 font-semibold" htmlFor="jawDrop">
                      Độ Mở Quai Hàm (Jaw)
                    </label>
                    <span className="font-label-mono text-label-mono text-sky-700 font-bold">{jawDrop}%</span>
                  </div>
                  <input
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                    id="jawDrop"
                    max="80"
                    min="5"
                    type="range"
                    value={jawDrop}
                    onChange={(e) => setJawDrop(Number(e.target.value))}
                  />
                  <div className="flex justify-between font-label-mono text-[9px] text-slate-500">
                    <span>Khép hờ (Slit)</span>
                    <span className="text-sky-700 font-semibold">Chuẩn: 20-30%</span>
                    <span>Mở rộng</span>
                  </div>
                </div>

                {/* Slider 3 */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-label-mono text-label-mono text-slate-700 font-semibold" htmlFor="airPressure">
                      Lực Đẩy Luồng Hơi
                    </label>
                    <span className="font-label-mono text-label-mono text-sky-700 font-bold">{airPressure}%</span>
                  </div>
                  <input
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                    id="airPressure"
                    max="100"
                    min="10"
                    type="range"
                    value={airPressure}
                    onChange={(e) => setAirPressure(Number(e.target.value))}
                  />
                  <div className="flex justify-between font-label-mono text-[9px] text-slate-500">
                    <span>Yếu (Ngắt quãng)</span>
                    <span className="text-sky-700 font-semibold">Chuẩn: 60-75%</span>
                    <span>Rất mạnh</span>
                  </div>
                </div>
              </div>

              {/* Bottom Audio Controls Toolbar */}
              <div className="mt-space-md flex flex-wrap items-center justify-between gap-space-sm pt-space-xs">
                <div className="flex flex-wrap items-center gap-space-xs sm:gap-space-sm">
                  {/* Audio 1 */}
                  <button aria-label="Phát âm mẫu chuẩn bản ngữ"
                    onClick={() => playTTS(currentPhoneme.word)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-body-sm text-body-sm font-semibold transition-all shadow-xs cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-rose-600 text-lg">volume_up</span>
                    <span>
                      Nghe Âm Lẻ <strong className="font-ipa-inline text-rose-600">{currentPhoneme.symbol}</strong>
                    </span>
                  </button>

                  {/* Audio 2 */}
                  <button aria-label="Phát âm mẫu chuẩn bản ngữ"
                    onClick={() => playTTS(currentPhoneme.word)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-body-sm text-body-sm font-semibold transition-all shadow-xs cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-sky-600 text-lg">record_voice_over</span>
                    <span>
                      Nghe Từ <strong className="text-sky-700">"{currentPhoneme.word}"</strong> (US)
                    </span>
                  </button>
                </div>

                {/* Audio 3: Master Trigger Animated Morph */}
                <button aria-label="Nút tương tác"
                  onClick={triggerAnimate}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-headline-sm text-sm font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer ${
                    isAnimating ? 'opacity-75 scale-95' : ''
                  }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-lg">animation</span>
                  <span>Xem Hoạt Họa Khẩu Hình</span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT PANE: 4 COLS - Front Lip Camera View & Tactile Guide */}
          <div className="xl:col-span-4 flex flex-col gap-space-md min-w-0">
            {/* Frontal Lip Posture Card */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-space-md shadow-sm flex flex-col gap-space-sm relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-rose-600 text-base">face</span>
                  <span className="font-headline-sm text-sm text-slate-800 font-bold">Tư Thế Môi &amp; Đầu Lưỡi Trực Diện</span>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-label-mono text-[10px] font-bold border border-slate-200">
                  CORONAL VIEW
                </span>
              </div>

              {/* Stylized Frontal Lip Graphic View */}
              <div className="relative w-full h-44 bg-[#f8fafc] border border-slate-200 rounded-xl flex items-center justify-center overflow-hidden">
                <svg className="w-full h-full object-contain" viewBox="0 0 280 140">
                  <rect fill="#f1f5f9" height="140" width="280"></rect>
                  {/* Upper lip */}
                  <path d="M 60 70 Q 100 50 140 56 Q 180 50 220 70 Q 180 62 140 65 Q 100 62 60 70 Z" fill="#fb7185" opacity="0.9"></path>
                  {/* Mouth cavity */}
                  <ellipse cx="140" cy="72" fill="#334155" rx="60" ry="14"></ellipse>
                  {/* Upper Incisors */}
                  <path d="M 105 66 L 105 74 L 118 75 L 118 66 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.8"></path>
                  <path d="M 119 66 L 119 76 L 138 76 L 138 66 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8"></path>
                  <path d="M 142 66 L 142 76 L 161 76 L 161 66 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8"></path>
                  <path d="M 162 66 L 162 74 L 175 75 L 175 66 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.8"></path>
                  {/* Interdental Tongue Blade Peeking Out */}
                  <path
                    d="M 120 75 Q 140 85 160 75 Q 155 82 140 83 Q 125 82 120 75 Z"
                    fill="#f43f5e"
                    stroke="#fda4af"
                    strokeWidth="1"
                  >
                    <animate
                      attributeName="d"
                      dur="2s"
                      repeatCount="indefinite"
                      values="M 120 75 Q 140 85 160 75 Q 155 82 140 83 Q 125 82 120 75 Z; M 120 75 Q 140 88 160 75 Q 155 86 140 87 Q 125 86 120 75 Z; M 120 75 Q 140 85 160 75 Q 155 82 140 83 Q 125 82 120 75 Z"
                    ></animate>
                  </path>
                  {/* Lower Lip */}
                  <path d="M 60 70 Q 100 80 140 84 Q 180 80 220 70 Q 180 92 140 92 Q 100 92 60 70 Z" fill="#e11d48" opacity="0.95"></path>
                  {/* Indicator callout */}
                  <line stroke="#0284c7" strokeDasharray="2 2" strokeWidth="1.2" x1="140" x2="140" y1="83" y2="108"></line>
                  <circle cx="140" cy="108" fill="#0284c7" r="2.5"></circle>
                  <text className="fill-sky-800 font-label-mono text-[9px] font-bold" x="148" y="112">
                    Lưỡi thò 2 - 3mm
                  </text>
                </svg>

                {/* Guide Overlay Indicator */}
                <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 text-sky-700 font-label-mono text-[10px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-ping"></span>
                  <span>Interdental Contact Active</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-slate-600 font-body-sm text-body-sm px-1">
                <span>Răng trên &amp; dưới chạm nhẹ lưỡi</span>
                <span className="text-rose-600 font-label-mono text-label-mono font-bold">Không Cắn Răng</span>
              </div>
            </div>

            {/* 1. Empathic Vietnamese Mistake Diagnostic Card */}
            <div className="bg-rose-50 border border-rose-200 border-l-4 border-l-rose-500 p-space-md rounded-xl shadow-xs relative overflow-hidden">
              <div className="flex items-start gap-3">
                <span className="p-1.5 bg-rose-100 text-rose-600 rounded-lg shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-lg">warning</span>
                </span>
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="font-headline-sm text-xs font-bold text-rose-900 uppercase tracking-wider">
                    Tật Quen Thuộc Của Người Việt
                  </div>
                  <p className="font-body-sm text-body-sm text-rose-950 leading-relaxed">
                    Hay rụt lưỡi vào trong khoang miệng và đọc thành âm <strong className="text-rose-700 font-bold">"Thờ"</strong> tiếng Việt (âm bật tắc hơi <span className="font-ipa-inline text-rose-700 font-bold">/tʰ/</span>) hoặc biến thành âm <span className="font-ipa-inline text-rose-700 font-bold">/t/</span> thuần (nhầm <em className="text-rose-800 font-medium">"think"</em> thành <em>"tink"</em>).
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Step-by-Step Corrective Guidance */}
            <div className="bg-emerald-50 border border-emerald-200 border-l-4 border-l-emerald-600 p-space-md rounded-xl shadow-xs relative overflow-hidden">
              <div className="flex items-start gap-3">
                <span className="p-1.5 bg-emerald-100 text-emerald-700 rounded-lg shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-lg">check_circle</span>
                </span>
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="font-headline-sm text-xs font-bold text-emerald-900 uppercase tracking-wider">
                    Cách Đặt Lưỡi Chuẩn Xác
                  </div>
                  <p className="font-body-sm text-body-sm text-emerald-950 leading-relaxed">
                    Đặt nhẹ đầu lưỡi thò ra giữa 2 hàng răng cửa từ <strong className="text-emerald-800">2-3mm</strong>. Tuyệt đối không cắn chặt răng. Nhẹ nhàng đẩy luồng hơi gió êm, liên tục luồn qua kẽ răng mà không ngắt luồng khí.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Tactile Trick / Mẹo Cảm Giác */}
            <div className="bg-amber-50 border border-amber-200 border-l-4 border-l-amber-500 p-space-md rounded-xl shadow-xs relative overflow-hidden">
              <div className="flex items-start gap-3">
                <span className="p-1.5 bg-amber-100 text-amber-700 rounded-lg shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-lg">touch_app</span>
                </span>
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="font-headline-sm text-xs font-bold text-amber-900 uppercase tracking-wider">
                    Mẹo Cảm Giác (Tactile Trick)
                  </div>
                  <p className="font-body-sm text-body-sm text-amber-950 leading-relaxed">
                    Đặt ngón tay trỏ sát trước mép môi. Khi phát âm từ <strong className="text-amber-800 font-bold">"think"</strong>, đầu lưỡi bạn phải <em>chạm khẽ vào đầu ngón tay</em> và cảm nhận rõ luồng hơi ấm phả ra liên tục!
                  </p>
                </div>
              </div>
            </div>

            {/* Phonemic Comparison Badge Tray */}
            <div className="bg-white border border-slate-200/90 p-space-sm rounded-xl flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-slate-500">compare_arrows</span>
                <span className="font-label-mono text-label-mono text-slate-600 font-semibold">Cặp Âm Tương Phản:</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-rose-50 border border-rose-200 text-rose-700 font-ipa-inline text-ipa-inline font-bold">
                  {currentPhoneme.symbol} ({currentPhoneme.voiced ? 'Voiced' : 'Voiceless'})
                </span>
                <span className="text-slate-400 font-medium">vs</span>
                <span className="px-2 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-700 font-ipa-inline text-ipa-inline font-bold">
                  {currentPhoneme.contrastSym} ({currentPhoneme.voiced ? 'Voiceless' : 'Voiced'})
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
