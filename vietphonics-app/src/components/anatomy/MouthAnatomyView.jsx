import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  PHONEME_ANATOMY_CATALOG,
  ALL_44_PHONEMES_LIST,
  calculateAnatomyTransform
} from '../../lib/anatomy/phonemeAnatomyData';

export default function MouthAnatomyView({ initialPhoneme = '/θ/' }) {
  const [selectedPhoneme, setSelectedPhoneme] = useState(initialPhoneme);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryTab, setActiveCategoryTab] = useState('all'); // 'all' | 'monophthong' | 'diphthong' | 'fricative_plosive' | 'nasal_approximant'

  // Current Phoneme Profile
  const currentProfile = useMemo(() => {
    return (
      PHONEME_ANATOMY_CATALOG[selectedPhoneme] ||
      PHONEME_ANATOMY_CATALOG[selectedPhoneme.replace(/\//g, '')] ||
      PHONEME_ANATOMY_CATALOG['/θ/']
    );
  }, [selectedPhoneme]);

  // Sliders state
  const [tongueElevation, setTongueElevation] = useState(currentProfile.defaultSliders.tongueElevation);
  const [jawDrop, setJawDrop] = useState(currentProfile.defaultSliders.jawDrop);
  const [airPressure, setAirPressure] = useState(currentProfile.defaultSliders.airPressure);

  // Toggles & Animation State
  const [showL1Ghost, setShowL1Ghost] = useState(true);
  const [isVoiced, setIsVoiced] = useState(currentProfile.isVoiced);
  const [isPlayingAnim, setIsPlayingAnim] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [animSpeed, setAnimSpeed] = useState(1.0); // 1.0 | 0.5 | 0.25
  const [animPhase, setAnimPhase] = useState(0); // 0 (rest) -> 1 (peak) -> 0
  const [isSaved, setIsSaved] = useState(false);

  const animTimerRef = useRef(null);
  const audioContextRef = useRef(null);

  // Sync sliders when phoneme changes
  useEffect(() => {
    setTongueElevation(currentProfile.defaultSliders.tongueElevation);
    setJawDrop(currentProfile.defaultSliders.jawDrop);
    setAirPressure(currentProfile.defaultSliders.airPressure);
    setIsVoiced(currentProfile.isVoiced);
    setIsSaved(false);
    setAnimPhase(0);
  }, [currentProfile]);

  // Web Audio Synthesizer (Realistic Formants & Noise)
  const playSoundEffect = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      const duration = 0.5 / animSpeed;

      if (currentProfile.category === 'monophthong' || currentProfile.category === 'diphthong') {
        // Formant synthesis for vowels
        const osc = ctx.createOscillator();
        const f1 = ctx.createBiquadFilter();
        const f2 = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(currentProfile.audioTone?.freq || 220, now);

        f1.type = 'bandpass';
        f1.frequency.setValueAtTime(currentProfile.audioTone?.f1 || 500, now);
        f1.Q.setValueAtTime(4.0, now);

        f2.type = 'bandpass';
        f2.frequency.setValueAtTime(currentProfile.audioTone?.f2 || 1500, now);
        f2.Q.setValueAtTime(4.0, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.12, now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        osc.connect(f1);
        osc.connect(f2);
        f1.connect(gain);
        f2.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + duration);
      } else {
        // Fricative / Plosive noise synthesis
        const bufferSize = ctx.sampleRate * duration;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = currentProfile.subCategory === 'Plosive' ? 'lowpass' : 'highpass';
        filter.frequency.setValueAtTime(currentProfile.audioTone?.freq || 3000, now);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.08, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        whiteNoise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        // Add subtle voicing hum if voiced consonant
        if (currentProfile.isVoiced) {
          const oscVoice = ctx.createOscillator();
          const voiceGain = ctx.createGain();
          oscVoice.type = 'sine';
          oscVoice.frequency.setValueAtTime(140, now);
          voiceGain.gain.setValueAtTime(0.08, now);
          voiceGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
          oscVoice.connect(voiceGain);
          voiceGain.connect(ctx.destination);
          oscVoice.start(now);
          oscVoice.stop(now + duration);
        }

        whiteNoise.start(now);
        whiteNoise.stop(now + duration);
      }
    } catch (e) {
      console.warn('Audio playback not supported:', e);
    }
  };

  // Continuous & Single-Cycle Animation Loop Engine
  useEffect(() => {
    if (!isPlayingAnim) {
      setAnimPhase(0);
      if (animTimerRef.current) clearInterval(animTimerRef.current);
      return;
    }

    playSoundEffect();
    let startTime = performance.now();
    const cycleDuration = 1400 / animSpeed;

    const tick = () => {
      const elapsed = performance.now() - startTime;
      const progress = (elapsed % cycleDuration) / cycleDuration;
      // Sinusoidal breathing wave (0 -> 1 -> 0)
      const phase = Math.sin(progress * Math.PI);
      setAnimPhase(phase);

      if (!isLooping && elapsed >= cycleDuration) {
        setIsPlayingAnim(false);
        setAnimPhase(0);
      } else {
        animTimerRef.current = requestAnimationFrame(tick);
      }
    };

    animTimerRef.current = requestAnimationFrame(tick);

    return () => {
      if (animTimerRef.current) cancelAnimationFrame(animTimerRef.current);
    };
  }, [isPlayingAnim, isLooping, animSpeed, selectedPhoneme]);

  const toggleAnimation = () => {
    setIsPlayingAnim((prev) => !prev);
  };

  const resetSlidersToStandard = () => {
    setTongueElevation(currentProfile.defaultSliders.tongueElevation);
    setJawDrop(currentProfile.defaultSliders.jawDrop);
    setAirPressure(currentProfile.defaultSliders.airPressure);
  };

  // Dynamic Anatomy Transforms
  const { totalTranslateY } = calculateAnatomyTransform(tongueElevation, jawDrop);
  // Animate dynamic vertical tongue shift with spring ease
  const dynamicTongueY = totalTranslateY + animPhase * -14;
  const dynamicJawY = jawDrop * 0.25 + animPhase * 8;
  const dynamicLipPucker = animPhase * 15;

  // Filtered 44-phonemes catalog for UI
  const filteredPhonemes = useMemo(() => {
    return ALL_44_PHONEMES_LIST.filter((p) => {
      // Category filter
      if (activeCategoryTab === 'monophthong' && p.category !== 'monophthong') return false;
      if (activeCategoryTab === 'diphthong' && p.category !== 'diphthong') return false;
      if (activeCategoryTab === 'fricative_plosive' && !(p.subCategory === 'Fricative' || p.subCategory === 'Plosive' || p.subCategory === 'Affricate')) return false;
      if (activeCategoryTab === 'nasal_approximant' && !(p.subCategory === 'Nasal' || p.subCategory === 'Approximant')) return false;

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchSymbol = p.phoneme.toLowerCase().includes(q) || p.phoneme.replace(/\//g, '').includes(q);
        const matchWord = p.sampleWord.toLowerCase().includes(q);
        const matchName = p.name.toLowerCase().includes(q) || (p.vietnameseName && p.vietnameseName.toLowerCase().includes(q));
        return matchSymbol || matchWord || matchName;
      }
      return true;
    });
  }, [activeCategoryTab, searchQuery]);

  // Is tricky L1 sound
  const isTrickyL1 = ['/θ/', '/ð/', '/ʃ/', '/ʒ/', '/æ/', '/dʒ/'].includes(currentProfile.phoneme);

  return (
    <section className="w-full bg-white rounded-3xl p-4 md:p-6 shadow-xl border border-slate-200 relative mt-6">
      {/* 1. HEADER & 44-PHONEMES CATEGORY BAR */}
      <div className="space-y-4 pb-5 border-b border-slate-100">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-lg border border-rose-100 shadow-sm">
                🗣️
              </span>
              <h3 className="font-black text-slate-900 text-lg md:text-2xl tracking-tight">
                Mô Hình Hoạt Họa Khẩu Hình 2D Toàn Diện (44 Âm IPA Chuẩn Y Khoa)
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Full 44 Sounds Active
              </span>
            </div>
            <p className="text-slate-500 text-xs md:text-sm mt-1">
              Mặt cắt dọc sagittal sinh động, chuyển động cơ lưỡi thời gian thực, luồng hơi hạt khí &amp; góc nhìn môi trực diện cho toàn bộ 44 âm tiếng Anh.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[240px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm âm hoặc từ... (vd: cat, /æ/, th)"
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
            />
            <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-slate-400 text-sm">
              search
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {[
            { id: 'all', label: '🌟 Tất Cả (44)', count: 44 },
            { id: 'monophthong', label: '🅰️ Nguyên Âm Đơn (12)', count: 12 },
            { id: 'diphthong', label: '🔤 Nguyên Âm Đôi (8)', count: 8 },
            { id: 'fricative_plosive', label: '⚡ Phụ Âm Xát & Tắc (15)', count: 15 },
            { id: 'nasal_approximant', label: '🌊 Phụ Âm Mũi & Lỏng (9)', count: 9 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategoryTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                activeCategoryTab === tab.id
                  ? 'bg-slate-900 text-white shadow-sm ring-2 ring-slate-800'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Interactive 44 Phonemes Selector Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-200">
          {filteredPhonemes.map((p) => {
            const isSelected = selectedPhoneme === p.phoneme;
            const isTricky = ['/θ/', '/ð/', '/ʃ/', '/ʒ/', '/æ/', '/dʒ/'].includes(p.phoneme);
            return (
              <button
                key={p.phoneme}
                onClick={() => setSelectedPhoneme(p.phoneme)}
                className={`group px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 flex items-center gap-1.5 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-rose-600 text-white shadow-md ring-2 ring-rose-200 scale-105'
                    : 'bg-white text-slate-700 hover:bg-rose-50 border border-slate-200/90 hover:border-rose-300'
                }`}
              >
                <span className={`font-mono text-sm ${isSelected ? 'text-white' : 'text-rose-600'}`}>
                  {p.phoneme}
                </span>
                <span className={`text-[11px] font-sans ${isSelected ? 'text-rose-100' : 'text-slate-500'}`}>
                  {p.sampleWord}
                </span>

                {/* Voicing Dot */}
                <span
                  title={p.isVoiced ? 'Hữu thanh' : 'Vô thanh'}
                  className={`w-1.5 h-1.5 rounded-full ${
                    isSelected
                      ? 'bg-white'
                      : p.isVoiced
                      ? 'bg-sky-500'
                      : 'bg-slate-300'
                  }`}
                />

                {/* Tricky L1 Marker */}
                {isTricky && (
                  <span
                    title="Bẫy phát âm người Việt thường mắc lỗi"
                    className={`text-[9px] px-1 rounded-full font-black ${
                      isSelected ? 'bg-amber-400 text-slate-950' : 'bg-rose-100 text-rose-700'
                    }`}
                  >
                    !
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. MAIN WORKSPACE: 8 COLS (SAGITTAL STAGE) + 4 COLS (CORONAL & GUIDANCE) */}
      <div className="mt-6 grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: 8 Cols — Sagittal Canvas & Biomechanical Controls */}
        <div className="xl:col-span-8 flex flex-col gap-4">
          <div className="relative bg-slate-950 border border-slate-800 rounded-3xl p-4 md:p-5 shadow-2xl flex flex-col overflow-hidden">
            {/* Stage Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3 z-20">
              <div className="flex items-center gap-2 text-white">
                <span className="text-rose-400 font-mono text-2xl font-black">{currentProfile.phoneme}</span>
                <div>
                  <span className="text-white text-xs font-bold block">{currentProfile.name}</span>
                  <span className="text-slate-400 text-[11px] font-medium block">
                    {currentProfile.vietnameseName} • Từ: <strong className="text-sky-300 font-mono">"{currentProfile.sampleWord}"</strong> ({currentProfile.sampleIpa})
                  </span>
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowL1Ghost(!showL1Ghost)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    showL1Ghost
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">visibility</span>
                  <span>Bẫy L1 Việt: {showL1Ghost ? 'BẬT' : 'TẮT'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsVoiced(!isVoiced)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isVoiced
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                      : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isVoiced ? 'bg-sky-400 animate-pulse' : 'bg-slate-600'}`} />
                  <span>{isVoiced ? 'Hữu thanh' : 'Vô thanh'}</span>
                </button>
              </div>
            </div>

            {/* 760x500 HIGH-PRECISION SAGITTAL SVG STAGE */}
            <div className="relative w-full h-[380px] md:h-[450px] bg-slate-900/90 border border-slate-800 rounded-2xl flex items-center justify-center overflow-hidden shadow-inner">
              <svg
                id="vocalTractSvg"
                viewBox="0 0 760 500"
                className="w-full h-full object-contain select-none z-10"
              >
                <defs>
                  {/* Warm Vivid Tongue Muscle Gradient */}
                  <linearGradient id="tongueGradVivid" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#fb7185" />
                    <stop offset="50%" stopColor="#f43f5e" />
                    <stop offset="100%" stopColor="#be123c" />
                  </linearGradient>

                  {/* Flowing Airflow Gradient */}
                  <linearGradient id="airGradFlow" x1="0%" x2="100%" y1="100%" y2="0%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
                    <stop offset="60%" stopColor="#0284c7" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="1" />
                  </linearGradient>

                  {/* Ultrasonic Larynx Wave Glow */}
                  <filter id="larynxGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Head Silhouette Background */}
                <path
                  d="M 120 40 C 260 10, 480 20, 560 90 C 620 140, 640 220, 640 250 C 630 258, 600 262, 590 262 C 585 275, 580 286, 580 292 C 588 296, 615 304, 618 316 C 620 336, 570 380, 530 400 C 470 430, 400 450, 360 480 L 140 480 L 140 380 C 130 310, 110 180, 120 40 Z"
                  fill="#0f172a"
                  opacity="0.75"
                  stroke="#334155"
                  strokeWidth="1.8"
                />

                {/* Nasal Cavity (Khoang Mũi) */}
                <path
                  d="M 330 110 C 370 70, 450 70, 520 120 C 530 130, 550 160, 550 180 C 530 190, 490 190, 450 170 C 400 150, 360 140, 330 110 Z"
                  fill="#090d16"
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

                {/* Velum / Soft Palate (Lưỡi Gà Di Động) */}
                <path
                  d={`M 360 170 C 330 170, 305 185, 295 ${currentProfile.subCategory === 'Nasal' ? 230 : 210} C 290 225, 290 245, 295 255 C 298 260, 305 260, 308 250 C 315 230, 325 215, 355 205`}
                  fill="#334155"
                  stroke="#64748b"
                  strokeWidth="2"
                  className="transition-all duration-300"
                />
                <text x="220" y="210" className="fill-slate-500 font-mono text-[10px] font-semibold">
                  LƯỠI GÀ (VELUM)
                </text>

                {/* Posterior Pharynx Wall */}
                <path
                  d="M 290 260 C 285 290, 280 340, 275 440"
                  fill="none"
                  stroke="#475569"
                  strokeLinecap="round"
                  strokeWidth="6"
                />

                {/* Upper Incisor (Răng Cửa Trên Cố Định) */}
                <path d="M 545 268 L 536 292 L 526 291 L 532 268 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.8" />
                <text x="548" y="260" className="fill-slate-300 font-mono text-[10px] font-bold">
                  Răng Trên
                </text>

                {/* Lower Incisor & Lower Jaw (Răng Dưới Di Động Theo Hàm) */}
                <g transform={`translate(0, ${dynamicJawY})`} className="transition-transform duration-150">
                  <path d="M 536 332 L 530 306 L 521 308 L 525 334 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.8" />
                  <text x="546" y="348" className="fill-slate-300 font-mono text-[10px] font-bold">
                    Răng Dưới
                  </text>
                </g>

                {/* L1 VIETNAMESE GHOST OVERLAY PATH */}
                {showL1Ghost && currentProfile.l1GhostPath && (
                  <g className="transition-opacity duration-300">
                    <path
                      d={currentProfile.l1GhostPath}
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2.5"
                      strokeDasharray="6 4"
                      strokeOpacity="0.8"
                    />
                    <text x="440" y="275" className="fill-amber-400 font-mono text-[10px] font-black drop-shadow">
                      🇻🇳 Thói Quen Lỗi Tiếng Việt
                    </text>
                  </g>
                )}

                {/* DYNAMIC BIOMECHANICAL TONGUE BODY */}
                <g
                  style={{
                    transform: `translateY(${dynamicTongueY}px)`,
                    transition: isPlayingAnim ? 'transform 0.08s ease-out' : 'transform 0.15s ease-out'
                  }}
                >
                  <path
                    d={currentProfile.tonguePath}
                    fill="url(#tongueGradVivid)"
                    stroke="#fb7185"
                    strokeWidth="1.8"
                    className="filter drop-shadow-md"
                  />
                  {/* Internal Muscular Striations */}
                  <path d="M 380 340 Q 420 315 470 315" fill="none" stroke="rgba(255,255,255,0.4)" strokeDasharray="3 3" strokeWidth="1.5" />
                  <path d="M 395 365 Q 430 340 480 330" fill="none" stroke="rgba(255,255,255,0.35)" strokeDasharray="4 4" strokeWidth="1.5" />
                  <text x="420" y="330" className="fill-white font-mono text-[10px] font-bold tracking-wider">
                    CƠ THÂN LƯỠI
                  </text>
                </g>

                {/* DYNAMIC AIRFLOW STREAM & STREAMING PARTICLES */}
                <g opacity={airPressure / 100}>
                  {/* Air Stream Line */}
                  <path
                    d="M 315 440 C 315 380, 335 310, 380 270 C 430 225, 480 265, 518 285 L 565 292"
                    fill="none"
                    stroke="url(#airGradFlow)"
                    strokeDasharray={isPlayingAnim ? '12 8' : '8 6'}
                    strokeDashoffset={isPlayingAnim ? animPhase * -40 : 0}
                    strokeLinecap="round"
                    strokeWidth="4"
                    className="transition-all"
                  />

                  {/* Mouth Exit Air Wave */}
                  <path
                    d="M 565 294 Q 610 292 645 285"
                    fill="none"
                    stroke="#38bdf8"
                    strokeDasharray="6 4"
                    strokeDashoffset={isPlayingAnim ? animPhase * -30 : 0}
                    strokeLinecap="round"
                    strokeWidth="3"
                  />

                  {/* Burst Particles during Peak Animation */}
                  {isPlayingAnim && (
                    <g transform={`translate(${animPhase * 25}, 0)`}>
                      <circle cx="580" cy="288" r="2.5" fill="#38bdf8" opacity="0.9" />
                      <circle cx="605" cy="285" r="3.0" fill="#7dd3fc" opacity="0.8" />
                      <circle cx="630" cy="282" r="2.0" fill="#bae6fd" opacity="0.7" />
                    </g>
                  )}

                  {/* Nasal Flow Stream (for Nasals: /m, n, ŋ/) */}
                  {currentProfile.subCategory === 'Nasal' && (
                    <path
                      d="M 315 340 C 320 250, 350 160, 420 140 L 530 140"
                      fill="none"
                      stroke="#38bdf8"
                      strokeDasharray="8 6"
                      strokeDashoffset={isPlayingAnim ? animPhase * -40 : 0}
                      strokeWidth="3.5"
                    />
                  )}
                </g>

                {/* CONSTRICTION TARGET POINT MARKER */}
                {currentProfile.constrictionPoint && (
                  <g transform={`translate(${currentProfile.constrictionPoint.x}, ${currentProfile.constrictionPoint.y})`}>
                    <circle cx="0" cy="0" r="4.5" fill="#fb7185" className="animate-ping" opacity="0.75" />
                    <circle cx="0" cy="0" r="3" fill="#ffffff" />
                  </g>
                )}

                {/* LARYNX NODE & ULTRASONIC VOICING WAVES */}
                <g transform="translate(295, 430)">
                  {isVoiced && isPlayingAnim && (
                    <>
                      <circle cx="0" cy="0" r="22" fill="none" stroke="#38bdf8" strokeWidth="1.5" opacity={animPhase * 0.8} />
                      <circle cx="0" cy="0" r="32" fill="none" stroke="#0284c7" strokeWidth="1" opacity={animPhase * 0.5} />
                    </>
                  )}
                  <circle
                    cx="0"
                    cy="0"
                    r="14"
                    fill={isVoiced ? '#0284c7' : '#1e293b'}
                    stroke={isVoiced ? '#38bdf8' : '#475569'}
                    strokeWidth="2"
                    filter={isVoiced ? 'url(#larynxGlow)' : 'none'}
                  />
                  <text x="22" y="4" className="fill-slate-300 font-mono text-[10px] font-bold">
                    {isVoiced ? 'THANH QUẢN RUNG' : 'THANH QUẢN TĨNH'}
                  </text>
                </g>
              </svg>

              {/* Real-time Friction Badge */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono pointer-events-none">
                <div className="px-3 py-1 rounded-xl bg-slate-900/90 text-sky-300 border border-slate-700/80 shadow-md">
                  Friction Index: <strong className="text-white">{currentProfile.frictionIndex}%</strong>
                </div>
                <div className="px-3 py-1 rounded-xl bg-slate-900/90 text-rose-300 border border-slate-700/80 shadow-md">
                  {currentProfile.contactTarget}
                </div>
              </div>
            </div>

            {/* 3 BIOMECHANICAL SLIDERS */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
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
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
                <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
                  Chuẩn: {currentProfile.defaultSliders.tongueElevation}%
                </span>
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
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
                <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
                  Chuẩn: {currentProfile.defaultSliders.jawDrop}%
                </span>
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
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
                  Chuẩn: {currentProfile.defaultSliders.airPressure}%
                </span>
              </div>
            </div>

            {/* ANIMATION & AUDIO CONTROLLER BAR */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              {/* Sound Player & Reset */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={playSoundEffect}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border border-slate-800"
                >
                  <span className="material-symbols-outlined text-sm text-rose-400">volume_up</span>
                  <span>Nghe Âm {currentProfile.phoneme}</span>
                </button>

                <button
                  type="button"
                  onClick={resetSlidersToStandard}
                  className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-medium flex items-center gap-1 transition-all cursor-pointer border border-slate-800"
                  title="Đặt lại các thanh trượt về giá trị chuẩn y khoa"
                >
                  <span className="material-symbols-outlined text-sm">restart_alt</span>
                  <span>Chuẩn Y Khoa</span>
                </button>
              </div>

              {/* Vivid Animation Controls */}
              <div className="flex items-center gap-2">
                {/* Speed buttons */}
                <div className="flex items-center bg-slate-900 rounded-xl border border-slate-800 p-0.5 text-[11px] font-mono">
                  {[1.0, 0.5, 0.25].map((spd) => (
                    <button
                      key={spd}
                      type="button"
                      onClick={() => setAnimSpeed(spd)}
                      className={`px-2 py-1 rounded-lg font-bold transition-all ${
                        animSpeed === spd ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>

                {/* Loop Toggle */}
                <button
                  type="button"
                  onClick={() => setIsLooping(!isLooping)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                    isLooping
                      ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/50'
                      : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">repeat</span>
                  <span>Lặp Lại</span>
                </button>

                {/* Primary Play/Pause Button */}
                <button
                  type="button"
                  onClick={toggleAnimation}
                  className={`px-4 py-2 rounded-xl text-xs font-black shadow-lg flex items-center gap-2 transition-all cursor-pointer ${
                    isPlayingAnim
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 animate-pulse'
                      : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-900/30'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">
                    {isPlayingAnim ? 'pause_circle' : 'play_circle'}
                  </span>
                  <span>{isPlayingAnim ? 'Tạm Dừng Hoạt Họa' : 'Phát Hoạt Họa Khẩu Hình'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 4 Cols — Coronal Front Lip & Educational Guides */}
        <div className="xl:col-span-4 flex flex-col gap-4">
          {/* VIVID CORONAL FRONTAL LIP VIEW */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-5 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-rose-600 text-lg">face</span>
                <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                  Tư Thế Môi Trực Diện (Coronal Lip View)
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white text-slate-600 border border-slate-200">
                {currentProfile.lipShape?.coronalType?.toUpperCase() || 'NEUTRAL'}
              </span>
            </div>

            {/* Dynamic Coronal Lip SVG Graphic */}
            <div className="relative w-full h-44 bg-white border border-slate-200 rounded-2xl flex items-center justify-center overflow-hidden shadow-inner">
              <svg viewBox="0 0 280 150" className="w-full h-full object-contain">
                <rect width="280" height="150" fill="#ffffff" />

                {/* Lip Shape Kinematics Rendered by coronalType */}
                {currentProfile.lipShape?.coronalType === 'round' ? (
                  // Rounded / Puckered Lip Shape (/uː/, /w/, /ʃ/, /ʒ/, /ɔː/)
                  <g transform={`scale(${1 + animPhase * 0.08})`} transform-origin="140 75">
                    {/* Outer rounded lips */}
                    <ellipse cx="140" cy="75" rx={38 + dynamicLipPucker} ry={34 + dynamicLipPucker} fill="#fb7185" />
                    {/* Inner mouth hole */}
                    <ellipse cx="140" cy="75" rx="16" ry="16" fill="#1e293b" />
                    {/* Teeth glint */}
                    <path d="M 132 68 L 148 68 L 146 72 L 134 72 Z" fill="#ffffff" opacity="0.8" />
                    <text x="140" y="125" textAnchor="middle" className="fill-rose-700 font-mono text-[9px] font-bold">
                      Chu tròn môi chữ O (Puckered)
                    </text>
                  </g>
                ) : currentProfile.lipShape?.coronalType === 'dental' ? (
                  // Interdental Teeth Peek (/θ/, /ð/)
                  <g>
                    {/* Upper Lip */}
                    <path d="M 60 70 Q 100 50 140 56 Q 180 50 220 70 Q 180 62 140 65 Q 100 62 60 70 Z" fill="#fb7185" />
                    {/* Dark oral cavity */}
                    <ellipse cx="140" cy="74" rx="62" ry="16" fill="#1e293b" />
                    {/* Upper incisors */}
                    <path d="M 118 64 L 118 76 L 138 76 L 138 64 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                    <path d="M 142 64 L 142 76 L 162 76 L 162 64 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                    {/* Protruding Tongue Tip with dynamic peek */}
                    <path
                      d={`M 118 76 Q 140 ${84 + animPhase * 10} 162 76 Q 155 86 140 ${87 + animPhase * 10} Q 125 86 118 76 Z`}
                      fill="#f43f5e"
                      stroke="#fda4af"
                      strokeWidth="1.2"
                    />
                    {/* Lower Lip */}
                    <path d="M 60 70 Q 100 82 140 88 Q 180 82 220 70 Q 180 94 140 94 Q 100 94 60 70 Z" fill="#e11d48" />
                    {/* Callout */}
                    <line x1="140" y1={87 + animPhase * 10} x2="140" y2="120" stroke="#0284c7" strokeWidth="1.2" strokeDasharray="2 2" />
                    <circle cx="140" cy="120" r="2.5" fill="#0284c7" />
                    <text x="140" y="134" textAnchor="middle" className="fill-sky-800 font-mono text-[9px] font-bold">
                      Đầu lưỡi thò 2 - 3mm giữa 2 răng
                    </text>
                  </g>
                ) : currentProfile.lipShape?.coronalType === 'labiodental' ? (
                  // Labiodental (/f/, /v/)
                  <g>
                    {/* Upper Lip */}
                    <path d="M 60 65 Q 100 48 140 52 Q 180 48 220 65 Q 180 58 140 60 Q 100 58 60 65 Z" fill="#fb7185" />
                    {/* Dark oral cavity */}
                    <ellipse cx="140" cy="70" rx="58" ry="14" fill="#1e293b" />
                    {/* Upper teeth biting into lower lip */}
                    <path d="M 120 60 L 120 76 L 138 76 L 138 60 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                    <path d="M 142 60 L 142 76 L 160 76 L 160 60 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                    {/* Lower Lip curving upward under teeth */}
                    <path d="M 60 65 Q 100 74 140 76 Q 180 74 220 65 Q 180 92 140 92 Q 100 92 60 65 Z" fill="#e11d48" />
                    <text x="140" y="125" textAnchor="middle" className="fill-rose-700 font-mono text-[9px] font-bold">
                      Răng trên chạm nhẹ mép môi dưới
                    </text>
                  </g>
                ) : currentProfile.lipShape?.coronalType === 'bilabial' ? (
                  // Bilabial Compressed (/p/, /b/, /m/)
                  <g>
                    {/* Upper Lip pressed flat */}
                    <path d="M 60 72 Q 100 58 140 62 Q 180 58 220 72 Q 180 68 140 70 Q 100 68 60 72 Z" fill="#fb7185" />
                    {/* Tight mouth seal */}
                    <line x1="70" y1="73" x2="210" y2="73" stroke="#991b1b" strokeWidth="2.5" />
                    {/* Lower Lip pressed upward */}
                    <path d="M 60 72 Q 100 78 140 82 Q 180 78 220 72 Q 180 88 140 88 Q 100 88 60 72 Z" fill="#e11d48" />
                    <text x="140" y="125" textAnchor="middle" className="fill-rose-700 font-mono text-[9px] font-bold">
                      Hai môi mím chặt nén áp suất
                    </text>
                  </g>
                ) : currentProfile.lipShape?.coronalType === 'open' ? (
                  // Open Jaw (/æ/, /ɑː/, /aɪ/)
                  <g>
                    {/* Upper Lip */}
                    <path d="M 50 60 Q 100 38 140 42 Q 180 38 230 60 Q 180 52 140 55 Q 100 52 50 60 Z" fill="#fb7185" />
                    {/* Large gaping oral cavity */}
                    <ellipse cx="140" cy="78" rx="68" ry={26 + animPhase * 8} fill="#1e293b" />
                    {/* Upper Teeth */}
                    <path d="M 115 54 L 115 68 L 138 68 L 138 54 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                    <path d="M 142 54 L 142 68 L 165 68 L 165 54 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                    {/* Tongue resting low in floor */}
                    <path d="M 100 90 Q 140 85 180 90 Q 160 100 140 100 Q 120 100 100 90 Z" fill="#f43f5e" />
                    {/* Lower Lip dropped deep */}
                    <path d="M 50 60 Q 100 95 140 106 Q 180 95 230 60 Q 180 114 140 114 Q 100 114 50 60 Z" fill="#e11d48" />
                    <text x="140" y="135" textAnchor="middle" className="fill-rose-700 font-mono text-[9px] font-bold">
                      Hạ hàm mở miệng rộng tối đa
                    </text>
                  </g>
                ) : (
                  // Spread / Smile or Neutral (/iː/, /s/, /z/, /e/)
                  <g>
                    {/* Upper Lip stretched wide */}
                    <path d="M 45 68 Q 100 50 140 54 Q 180 50 235 68 Q 180 62 140 64 Q 100 62 45 68 Z" fill="#fb7185" />
                    {/* Mouth aperture */}
                    <ellipse cx="140" cy="72" rx={64 + animPhase * 10} ry="14" fill="#1e293b" />
                    {/* Upper & Lower teeth aligned */}
                    <path d="M 115 62 L 115 72 L 138 72 L 138 62 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" />
                    <path d="M 142 62 L 142 72 L 165 72 L 165 62 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" />
                    {/* Lower Lip stretched */}
                    <path d="M 45 68 Q 100 80 140 84 Q 180 80 235 68 Q 180 90 140 90 Q 100 90 45 68 Z" fill="#e11d48" />
                    <text x="140" y="125" textAnchor="middle" className="fill-rose-700 font-mono text-[9px] font-bold">
                      {currentProfile.lipShape?.label || 'Kéo dẹt mép môi sang hai bên'}
                    </text>
                  </g>
                )}
              </svg>
            </div>
            <p className="text-[11px] text-slate-500 italic text-center">
              Khẩu hình tự động chuyển động đồng bộ khi kích hoạt tính năng phát hoạt họa.
            </p>
          </div>

          {/* 1. L1 HABITUAL MISTAKE CARD */}
          <div className="bg-rose-50 border border-rose-200 border-l-4 border-l-rose-500 p-4 rounded-2xl shadow-sm">
            <div className="flex items-start gap-2.5">
              <span className="material-symbols-outlined text-rose-600 text-lg shrink-0 mt-0.5">warning</span>
              <div>
                <strong className="text-xs font-black text-rose-900 uppercase block tracking-wider">
                  Tật Quen Thuộc Của Người Việt:
                </strong>
                <p className="text-xs text-rose-950 mt-1 leading-relaxed">
                  {currentProfile.l1Mistake}
                </p>
              </div>
            </div>
          </div>

          {/* 2. STEP-BY-STEP CORRECTIVE GUIDANCE */}
          <div className="bg-emerald-50 border border-emerald-200 border-l-4 border-l-emerald-600 p-4 rounded-2xl shadow-sm">
            <div className="flex items-start gap-2.5">
              <span className="material-symbols-outlined text-emerald-700 text-lg shrink-0 mt-0.5">check_circle</span>
              <div>
                <strong className="text-xs font-black text-emerald-900 uppercase block tracking-wider">
                  Cách Đặt Cơ &amp; Khẩu Hình Chuẩn Xác:
                </strong>
                <p className="text-xs text-emerald-950 mt-1 leading-relaxed">
                  {currentProfile.correctiveGuidance}
                </p>
              </div>
            </div>
          </div>

          {/* 3. TACTILE BIOFEEDBACK TRICK */}
          <div className="bg-amber-50 border border-amber-200 border-l-4 border-l-amber-500 p-4 rounded-2xl shadow-sm">
            <div className="flex items-start gap-2.5">
              <span className="material-symbols-outlined text-amber-700 text-lg shrink-0 mt-0.5">touch_app</span>
              <div>
                <strong className="text-xs font-black text-amber-900 uppercase block tracking-wider">
                  Mẹo Cảm Giác Cơ Thể (Tactile Trick):
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
