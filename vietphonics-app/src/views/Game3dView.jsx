import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useRecorder } from '../lib/audio/useRecorder';
import WorldMapStageSelect from '../components/game/WorldMapStageSelect';
import VoiceControllerHUD from '../components/game/VoiceControllerHUD';
import BossArenaBattle from '../components/game/BossArenaBattle';

export default function Game3dView() {
  const { incrementStreak } = useApp();
  const [showWorldMap, setShowWorldMap] = useState(false);
  const [showBossArena, setShowBossArena] = useState(false);
  const [bossHp, setBossHp] = useState(1250);
  const maxBossHp = 3000;
  const [combo, setCombo] = useState(4);
  const [combatFeedback, setCombatFeedback] = useState({
    type: 'critical',
    damage: 250,
    text: 'HOÀN HẢO ÂM ĐUÔI /ks/ • BẺ GÃY GIÁP ĐÁ!',
    emoji: '💥'
  });
  const [isSurging, setIsSurging] = useState(false);

  const { isRecording, start, stop } = useRecorder({ autoAnalyze: true });

  const playTTS = (text, rate = 1.0) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = rate;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleTestPerfect = () => {
    playTTS('Six', 0.9);
    setIsSurging(true);
    const newHp = Math.max(0, bossHp - 250);
    setBossHp(newHp);
    setCombo(prev => prev + 1);
    setCombatFeedback({
      type: 'critical',
      damage: 250,
      text: 'HOÀN HẢO ÂM ĐUÔI /ks/ • BẺ GÃY GIÁP ĐÁ!',
      emoji: '💥'
    });
    incrementStreak();
    setTimeout(() => setIsSurging(false), 1200);
  };

  const handleTestError = () => {
    playTTS('Si', 1.0);
    setIsSurging(false);
    setCombo(0);
    setCombatFeedback({
      type: 'miss',
      damage: 0,
      text: 'TRƯỢT ĐÒN! RỤNG ÂM /ks/ THÀNH "SÍCH" • GOLEM PHẢN KÍCH!',
      emoji: '🛡️'
    });
  };

  const handleVoiceSpellCast = (action) => {
    if (action.hitType === 'critical' || action.hitType === 'normal') {
      setIsSurging(true);
      const newHp = Math.max(0, bossHp - action.damage);
      setBossHp(newHp);
      setCombo(action.newCombo);
      setCombatFeedback({
        type: action.hitType,
        damage: action.damage,
        text: action.feedbackText,
        emoji: action.hitType === 'critical' ? '💥' : '⚔️'
      });
      incrementStreak();
      setTimeout(() => setIsSurging(false), 1200);
    } else {
      setIsSurging(false);
      setCombo(0);
      setCombatFeedback({
        type: 'miss',
        damage: 0,
        text: action.feedbackText,
        emoji: '🛡️'
      });
    }
  };

  const handleMicToggle = async () => {
    if (isRecording) {
      await stop();
      handleTestPerfect();
    } else {
      await start();
    }
  };

  const hpPercent = (bossHp / maxBossHp) * 100;

  return (
    <div className="flex flex-col w-full animate-fade-in">
      <main className="w-full px-4 md:px-gutter-desktop py-space-md max-w-[1440px] mx-auto">
        {/* TOP STATUS BAR: LORE, COMBO & CURRENCY */}
        <div className="w-full flex flex-col xl:flex-row items-center justify-between gap-space-md mb-space-md">
          {/* Left: Player Combat Status & Combo */}
          <div className="flex items-center gap-space-md w-full xl:w-auto justify-between xl:justify-start">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50 border border-amber-200/80 shadow-sm">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/15 text-amber-600 animate-pulse">
                <span className="material-symbols-outlined text-lg">local_fire_department</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-mono text-[10px] uppercase text-amber-800/80 font-semibold leading-none">
                  Combo Multiplier
                </span>
                <span className="font-headline-sm text-base text-amber-700 tracking-tight font-extrabold leading-tight">
                  x{combo} STREAK!
                </span>
              </div>
            </div>
          </div>

          {/* Center: Stage & Lore Banner */}
          <div className="flex flex-col items-center text-center px-space-md py-1.5 bg-slate-50 border border-slate-200/80 rounded-xl">
            <div className="flex items-center gap-2 font-label-mono text-[11px] text-sky-700 font-bold">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping"></span>
              <span className="uppercase tracking-wider">Acoustic World 1: Final Consonants</span>
            </div>
            <div className="font-headline-md text-base md:text-lg text-slate-900 font-bold tracking-tight flex items-center gap-2 mt-0.5">
              <span>Thung Lũng Âm Đuôi</span>
              <span className="text-slate-300 font-normal">•</span>
              <span className="text-rose-600">Ải 3: Trùm Golem Đá Vụn</span>
            </div>
            <div className="flex items-center gap-2 mt-1 flex-wrap justify-center">
              <button
                onClick={() => setShowWorldMap(true)}
                className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-label-mono text-[11px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                type="button"
                data-testid="open-world-map"
              >
                <span className="material-symbols-outlined text-sm">map</span>
                <span>Bản Đồ 4 Thế Giới (GAME-101)</span>
              </button>
              <button
                onClick={() => setShowBossArena(true)}
                className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-label-mono text-[11px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                type="button"
                data-testid="open-boss-arena"
              >
                <span className="material-symbols-outlined text-sm">swords</span>
                <span>Đấu Trường Trùm Minimal Pair (GAME-103)</span>
              </button>
            </div>
          </div>

          {/* Right: Currencies & L1 Calibration */}
          <div className="flex items-center gap-space-sm w-full xl:w-auto justify-end">
            <div className="flex items-center gap-2 px-space-sm py-2 rounded-xl bg-slate-50 border border-slate-200/80 shadow-sm">
              <span className="material-symbols-outlined text-amber-500 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                monetization_on
              </span>
              <div className="flex flex-col text-left">
                <span className="font-label-mono text-[10px] text-slate-500 font-semibold uppercase">V-Coins</span>
                <span className="font-headline-sm text-[15px] text-slate-900 font-bold leading-none">1,420</span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-space-sm py-2 rounded-xl bg-slate-50 border border-slate-200/80 shadow-sm">
              <span className="material-symbols-outlined text-indigo-600 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                diamond
              </span>
              <div className="flex flex-col text-left">
                <span className="font-label-mono text-[10px] text-slate-500 font-semibold uppercase">Runestones</span>
                <span className="font-headline-sm text-[15px] text-indigo-700 font-bold leading-none">28</span>
              </div>
            </div>
          </div>
        </div>

        {/* CENTER 3D ISOMETRIC COMBAT ARENA */}
        <div className="relative w-full rounded-3xl overflow-hidden bg-white/95 border border-slate-200/90 shadow-[0_4px_24px_rgba(15,23,42,0.06)] p-space-md md:p-space-xl flex flex-col justify-between min-h-[580px]">
          {/* Isometric Ground Ambient Lighting & Runes Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-60 bg-[radial-gradient(ellipse_at_50%_70%,rgba(14,165,233,0.08)_0%,rgba(244,63,94,0.05)_40%,transparent_75%)]"></div>
          <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none bg-gradient-to-t from-slate-50/80 to-transparent"></div>

          {/* Ground Inscribed Neon Rune Ring */}
          <div className="absolute inset-x-0 bottom-10 flex justify-center pointer-events-none opacity-40">
            <svg className="w-[850px] h-[220px]" fill="none" viewBox="0 0 850 220">
              <ellipse className="text-sky-400" cx="425" cy="110" rx="380" ry="80" stroke="currentColor" strokeDasharray="12 8" strokeWidth="1.5"></ellipse>
              <ellipse className="text-rose-400" cx="425" cy="110" rx="280" ry="55" stroke="currentColor" strokeWidth="1"></ellipse>
              <ellipse className="text-indigo-400" cx="425" cy="110" rx="160" ry="32" stroke="currentColor" strokeDasharray="6 6" strokeWidth="1.5"></ellipse>
              <circle className="text-sky-500" cx="120" cy="110" fill="currentColor" r="5"></circle>
              <circle className="text-sky-500" cx="730" cy="110" fill="currentColor" r="5"></circle>
              <circle className="text-rose-500" cx="425" cy="35" fill="currentColor" r="5"></circle>
              <circle className="text-rose-500" cx="425" cy="185" fill="currentColor" r="5"></circle>
            </svg>
          </div>

          {/* ARENA TOP: GOLEM BOSS TELEMETRY */}
          <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-space-md">
            {/* Hero Status Pill */}
            <div className="flex items-center gap-space-sm bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse"></span>
              <span className="font-headline-sm text-body-md text-slate-800 font-semibold">Spellcaster: L1 Resonator</span>
              <span className="px-2.5 py-0.5 rounded-full bg-sky-50 border border-sky-200 font-label-mono text-[11px] text-sky-700 font-semibold">
                Acoustic Shield ON
              </span>
            </div>

            {/* BOSS HP METRIC */}
            <div className="w-full md:w-96 flex flex-col gap-1.5 bg-white/95 backdrop-blur-md p-space-sm rounded-2xl border border-rose-200/70 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-headline-sm text-base text-rose-700 font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-rose-600 text-base">skull</span>
                  Ancient Stone Golem
                </span>
                <span className="font-label-mono text-[11px] text-slate-600 font-semibold">
                  Rune Shield: <span className="text-rose-600 font-bold">/ks/</span>
                </span>
              </div>
              {/* Boss Progress Health Bar */}
              <div className="w-full h-3.5 rounded-full bg-slate-100 border border-slate-200 overflow-hidden p-0.5 shadow-inner">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-rose-500 to-red-600 transition-all duration-700 shadow-sm"
                  style={{ width: `${hpPercent}%` }}
                ></div>
              </div>
              <div className="flex justify-between font-label-mono text-[10px] text-slate-500 font-semibold">
                <span>WEAKNESS: ASPIRATED /k/ + VOICED /s/</span>
                <span className="text-rose-700 font-bold">{bossHp} / {maxBossHp} HP</span>
              </div>
            </div>
          </div>

          {/* ARENA COMBAT STAGE: HERO VS GOLEM WITH BEAM */}
          <div className="relative z-10 w-full flex items-center justify-between my-auto py-space-lg px-space-sm md:px-space-xl">
            {/* Hero Character Left */}
            <div className="relative flex flex-col items-center group">
              <div className="absolute -inset-4 rounded-3xl bg-sky-200/50 blur-2xl group-hover:bg-sky-300/60 transition-all pointer-events-none"></div>
              <div className="relative w-36 h-48 md:w-52 md:h-68 rounded-2xl overflow-hidden bg-white p-1.5 border border-slate-200/90 shadow-[0_8px_24px_rgba(15,23,42,0.08)] flex flex-col items-center justify-center">
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-100">
                  <img
                    className="w-full h-full object-cover"
                    alt="Cyber Mage Hero"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPthl4S96KQuQRKSZMdf7YAbisGHCUiCiD39RTgTqpYfvFbqOcw49WRz6-HfDbGMuBJshNjnWnX7Ych4U8ijc_aflBG8XHhmZO0YoWd7MTckBIpEAn6Jo5NFwjvVgJLzwXEQ7Z3Q5cxlQ6J_-zU1VVLLknN8GWVTzMyLs1uxh0nm0RioSYf5CkM1iDGXCWD_tek3QKch-3tdn-AEuInKBtQEqP7xvS-i8ceBbEUj336VNymZbNeOlf"
                  />
                  <div className="absolute bottom-2 inset-x-2 p-1.5 rounded-lg bg-white/90 backdrop-blur-sm border border-slate-200/60 text-center shadow-sm">
                    <span className="font-label-mono text-[11px] text-sky-800 font-bold tracking-wide">
                      HERO: PHONETICIAN
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-space-sm flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 font-label-mono text-[11px] font-semibold shadow-xs">
                <span className="material-symbols-outlined text-sm text-sky-600">graphic_eq</span> Formant Charging: 2,400 Hz
              </div>
            </div>

            {/* DYNAMIC ATTACK BEAM VISUAL */}
            <div className="relative flex-1 mx-3 md:mx-8 h-32 flex flex-col items-center justify-center">
              <div className="relative w-full h-8 flex items-center justify-center">
                <div className="w-full h-1.5 bg-gradient-to-r from-sky-400 via-rose-400 to-rose-500 rounded-full opacity-70"></div>
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-sky-400 via-rose-400 to-rose-500 rounded-full transition-opacity ${
                    isSurging ? 'opacity-100 blur-sm scale-110 animate-pulse' : 'opacity-40 blur-xs'
                  }`}
                ></div>
                <div className="absolute inset-0 flex items-center justify-around pointer-events-none">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8] animate-ping"></span>
                  <span className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_12px_#f43f5e] animate-bounce"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8] animate-ping"></span>
                </div>
              </div>

              {/* Combat Damage Floating Label */}
              <div className="mt-space-sm px-4 py-2 rounded-2xl bg-amber-50/95 border border-amber-300 backdrop-blur-md shadow-lg flex items-center gap-2.5 transform transition-all duration-300">
                <span className="text-2xl animate-bounce">{combatFeedback.emoji}</span>
                <div className="flex flex-col text-left">
                  <span className="font-headline-sm text-sm md:text-base text-rose-700 font-extrabold tracking-tight">
                    {combatFeedback.damage > 0 ? `CRITICAL HIT! -${combatFeedback.damage} DMG` : 'MISSED CODA!'}
                  </span>
                  <span className="font-label-mono text-[11px] text-amber-900 font-bold">
                    {combatFeedback.text}
                  </span>
                </div>
              </div>
            </div>

            {/* Boss Monster Right */}
            <div className="relative flex flex-col items-center group">
              <div className="absolute -inset-4 rounded-3xl bg-rose-200/50 blur-2xl group-hover:bg-rose-300/60 transition-all pointer-events-none"></div>
              <div className="relative w-36 h-48 md:w-52 md:h-68 rounded-2xl overflow-hidden bg-white p-1.5 border border-slate-200/90 shadow-[0_8px_24px_rgba(15,23,42,0.08)] flex flex-col items-center justify-center">
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-100">
                  <img
                    className="w-full h-full object-cover"
                    alt="Ancient Stone Golem"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLskWelzqbUijGJgAmqFXcZMVHw4qtAguLJNBKPt9tyh6BW3LBfnFYBAD9TrCI0n1k3KwK54Naxk5X2ajI9-Y43m573RsMIh2_4sVUSy8F-bB9ONIfvY8mvwA8_FLuApJbqUjgaYXwbbyuJhq2LAMvDDjCZwbCxe1i24CJHSVA0YQNJRo4iOPMi1bX4SoDwyP0WXyaOzJSJX40irOk4tZQtn1QXdrcRuhoK8TWJ12meDgCBcgvIYOc"
                  />
                  {/* Cracked Rune Shield Seal Overlay */}
                  <div className="absolute inset-0 bg-rose-900/10 flex flex-col items-center justify-center backdrop-blur-[1px]">
                    <div className="w-16 h-16 rounded-2xl bg-white/95 border border-rose-200 shadow-xl flex flex-col items-center justify-center">
                      <span className="font-ipa-display text-ipa-display text-rose-600 font-bold leading-none">/ks/</span>
                      <span className="font-label-mono text-[8px] text-slate-500 uppercase tracking-widest leading-none mt-1 font-semibold">
                        RUNE SHIELD
                      </span>
                    </div>
                  </div>
                  <div className="absolute bottom-2 inset-x-2 p-1.5 rounded-lg bg-white/90 backdrop-blur-sm border border-slate-200/60 text-center shadow-sm">
                    <span className="font-label-mono text-[11px] text-rose-800 font-bold tracking-wide">
                      BOSS: GOLEM ĐÁ VỤN
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-space-sm flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 font-label-mono text-[11px] font-semibold shadow-xs">
                <span className="material-symbols-outlined text-sm text-rose-600">shield_with_heart</span>
                Giáp Nứt: {Math.round(hpPercent)}% Remaining
              </div>
            </div>
          </div>

          {/* SPOKEN INCANTATION SPELLCASTING BOX */}
          <div className="relative z-20 w-full max-w-2xl mx-auto bg-white rounded-2xl p-space-md border border-slate-200/90 shadow-[0_8px_30px_rgba(15,23,42,0.06)] flex flex-col items-center gap-space-sm">
            <div className="w-full flex items-center justify-between font-label-mono text-label-mono px-space-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping"></span>
                <span className="uppercase tracking-widest text-slate-800 font-bold text-[12px]">
                  Thần Chú Khắc Chế:
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sky-700 font-bold text-[12px]">Thời Gian Hô:</span>
                <span className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-800 font-bold text-[11px]">2.4s</span>
              </div>
            </div>

            {/* Target Word in Giant Letters with Syllable Break */}
            <div className="flex items-center justify-center gap-space-md py-1">
              <div className="flex items-center gap-2">
                <span className="font-display-hero text-4xl md:text-5xl text-slate-900 font-extrabold tracking-tight">S</span>
                <span className="font-display-hero text-4xl md:text-5xl text-slate-900 font-extrabold tracking-tight">I</span>
                <span className="relative font-display-hero text-4xl md:text-5xl text-rose-600 font-extrabold tracking-tight">
                  X
                  <span className="absolute -top-1.5 -right-2.5 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-600"></span>
                  </span>
                </span>
              </div>
              {/* IPA Badge */}
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 shadow-inner">
                <span className="font-label-mono text-[11px] text-slate-500 font-semibold">IPA:</span>
                <span className="font-ipa-display text-2xl text-sky-700 tracking-wider font-bold">
                  /sɪ<span className="text-rose-600 underline decoration-rose-500 underline-offset-4">ks</span>/
                </span>
              </div>
            </div>

            {/* Vietnamese Error Prevention Tooltip */}
            <div className="w-full flex items-center justify-between px-space-sm py-2 rounded-xl bg-rose-50/80 border border-rose-200 text-rose-950 font-body-sm text-[12px] leading-relaxed">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-rose-600 text-lg shrink-0">psychology</span>
                <span>
                  Cảnh báo âm Việt: Người học hay nuốt âm đuôi <strong className="text-rose-800">/ks/</strong> thành{' '}
                  <strong className="text-rose-800">"sích"</strong> hoặc <strong className="text-rose-800">"síc"</strong>.
                </span>
              </div>
              <span className="font-label-mono text-[11px] text-rose-700 font-bold shrink-0 hidden sm:inline">
                Yêu cầu xì hơi /s/ sau bật /k/!
              </span>
            </div>
          </div>
        </div>

        {/* GAME-102 Real-time Dual Voice Controller HUD */}
        <div className="w-full mt-space-md">
          <VoiceControllerHUD
            activeSpellId="spell_six"
            onSpellCast={handleVoiceSpellCast}
            currentCombo={combo}
          />
        </div>

        {/* DUAL INPUT CONTROLS DOCK */}
        <div className="w-full mt-space-md grid grid-cols-1 lg:grid-cols-12 gap-space-md">
          {/* Primary Voice Recording Trigger */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-space-md border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-md">
            <div className="flex items-center gap-space-md w-full md:w-auto">
              <button aria-label="Bật tắt ghi âm giọng nói"
                onClick={handleMicToggle}
                className={`relative group flex items-center justify-center w-20 h-20 rounded-full transition-all shrink-0 active:scale-95 cursor-pointer ${
                  isRecording
                    ? 'bg-rose-600 ring-4 ring-rose-300 animate-pulse'
                    : 'bg-gradient-to-tr from-rose-600 via-rose-500 to-pink-500 shadow-[0_6px_20px_rgba(225,29,72,0.35)]'
                }`}
                type="button"
              >
                <span className="absolute inset-0 rounded-full bg-rose-400/30 animate-ping group-hover:opacity-100 opacity-60"></span>
                <span className="material-symbols-outlined text-3xl text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {isRecording ? 'stop' : 'mic'}
                </span>
              </button>
              <div className="flex flex-col">
                <span className="font-headline-sm text-base text-slate-900 font-bold">
                  {isRecording ? 'Đang Thu Âm Chiến Luyện...' : 'Bật Micro Giọng Thật'}
                </span>
                <span className="font-body-sm text-[13px] text-sky-700 font-medium flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${isRecording ? 'bg-rose-500 animate-ping' : 'bg-sky-500'}`}></span>
                  {isRecording ? 'Đang phân tích âm /ks/...' : 'Web Speech Engine: Đang Chờ Giọng Bạn...'}
                </span>
                <span className="font-label-mono text-[11px] text-slate-500 mt-0.5">Nhấn để đọc từ: [ S - I - X ]</span>
              </div>
            </div>

            {/* Real-time Decibel / Pitch Meter */}
            <div className="w-full md:w-44 flex flex-col gap-1.5 bg-slate-50 border border-slate-200 p-space-sm rounded-xl">
              <div className="flex justify-between font-label-mono text-[10px] text-slate-500 font-semibold">
                <span>MIC LEVEL</span>
                <span className="text-sky-700 font-bold">-18 dB</span>
              </div>
              <div className="flex items-end gap-1 h-6 w-full justify-between px-1">
                <div className="w-1.5 h-2 bg-sky-300 rounded-full"></div>
                <div className="w-1.5 h-3 bg-sky-400 rounded-full"></div>
                <div className="w-1.5 h-5 bg-sky-600 rounded-full animate-pulse"></div>
                <div className="w-1.5 h-2 bg-sky-300 rounded-full"></div>
                <div className="w-1.5 h-6 bg-rose-500 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-4 bg-sky-500 rounded-full"></div>
                <div className="w-1.5 h-2 bg-sky-300 rounded-full"></div>
                <div className="w-1.5 h-5 bg-sky-600 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Test Suite Buttons */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-space-md border border-slate-200/90 shadow-sm flex flex-col justify-center gap-space-sm">
            <div className="font-label-mono text-[11px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-indigo-600">science</span>
              Bộ Mô Phỏng Thử Nghiệm Phản Ứng Game
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
              <button aria-label="Kiểm thử kết quả đòn đánh"
                onClick={handleTestPerfect}
                className="flex flex-col text-left p-space-sm rounded-xl bg-slate-50 hover:bg-sky-50/80 border border-slate-200 hover:border-sky-300 transition-all group cursor-pointer"
                type="button"
              >
                <span className="font-headline-sm text-sm text-sky-700 font-bold flex items-center gap-1 group-hover:text-sky-800">
                  <span className="material-symbols-outlined text-base text-sky-600">bolt</span> Chuẩn: /sɪks/
                </span>
                <span className="font-label-mono text-[10px] text-slate-500 mt-1">Test 100% Sát Thương (Phá Giáp)</span>
              </button>

              <button aria-label="Kiểm thử kết quả đòn đánh"
                onClick={handleTestError}
                className="flex flex-col text-left p-space-sm rounded-xl bg-slate-50 hover:bg-rose-50/80 border border-slate-200 hover:border-rose-300 transition-all group cursor-pointer"
                type="button"
              >
                <span className="font-headline-sm text-sm text-rose-700 font-bold flex items-center gap-1 group-hover:text-rose-800">
                  <span className="material-symbols-outlined text-base text-rose-600">warning</span> Lỗi VN: /sɪ/
                </span>
                <span className="font-label-mono text-[10px] text-slate-500 mt-1">Test Trượt Đòn &amp; Phản Kích</span>
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM QUEST PROGRESSION RIBBON */}
        <div className="w-full mt-space-lg bg-white rounded-2xl p-space-md border border-slate-200/90 shadow-sm flex flex-col gap-space-md">
          <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-space-xs font-label-mono text-label-mono text-slate-600 pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sky-600 text-base">map</span>
              <span className="text-slate-900 font-bold uppercase tracking-wider text-[12px]">
                Hành Trình Chinh Phục Ngữ Âm (Campaign Map)
              </span>
              <span className="px-2 py-0.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 font-semibold text-[11px]">
                World 1: Ải 3/12
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1 text-indigo-700">
                <span>⭐</span> 8 / 36 Sao Thu Thập
              </span>
              <span className="flex items-center gap-1 text-slate-700">
                <span>🗺️</span> 3 Thế Giới Luyện Âm
              </span>
            </div>
          </div>

          {/* 12-Node World Map Scrollable Track */}
          <div className="w-full overflow-x-auto pb-space-sm">
            <div className="flex items-center justify-between min-w-[980px] px-space-sm py-2 relative">
              <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1 bg-slate-200 z-0"></div>
              <div className="absolute left-8 w-[220px] top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-emerald-500 via-sky-500 to-rose-500 z-0"></div>

              {/* Node 1 */}
              <div className="relative z-10 flex flex-col items-center gap-1 group cursor-pointer">
                <div className="w-11 h-11 rounded-full bg-emerald-50 border-2 border-emerald-500 text-emerald-600 group-hover:bg-emerald-100 transition-colors flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-emerald-600 text-lg font-bold">check</span>
                </div>
                <span className="font-label-mono text-[10px] text-amber-500">⭐⭐⭐</span>
                <span className="font-label-mono text-[11px] text-slate-800 font-bold">Ải 1: /-t/</span>
              </div>

              {/* Node 2 */}
              <div className="relative z-10 flex flex-col items-center gap-1 group cursor-pointer">
                <div className="w-11 h-11 rounded-full bg-emerald-50 border-2 border-emerald-500 text-emerald-600 group-hover:bg-emerald-100 transition-colors flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-emerald-600 text-lg font-bold">check</span>
                </div>
                <span className="font-label-mono text-[10px] text-amber-500">⭐⭐⭐</span>
                <span className="font-label-mono text-[11px] text-slate-800 font-bold">Ải 2: /-d/</span>
              </div>

              {/* Node 3 (Active) */}
              <div className="relative z-10 flex flex-col items-center gap-1 group cursor-pointer scale-110">
                <div className="w-12 h-12 rounded-full bg-rose-600 border-2 border-white text-white flex items-center justify-center shadow-md ring-4 ring-rose-200 animate-pulse">
                  <span className="material-symbols-outlined text-xl font-bold">swords</span>
                </div>
                <span className="font-label-mono text-[10px] text-rose-600 font-bold">ĐANG ĐẤU TRÙM</span>
                <span className="font-label-mono text-[11px] text-rose-700 font-bold">Ải 3: /-ks/</span>
              </div>

              {/* Node 4 (Locked) */}
              <div className="relative z-10 flex flex-col items-center gap-1 opacity-60">
                <div className="w-11 h-11 rounded-full bg-slate-100 border-2 border-slate-300 text-slate-400 flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">lock</span>
                </div>
                <span className="font-label-mono text-[10px] text-slate-400">Chưa mở</span>
                <span className="font-label-mono text-[11px] text-slate-500">Ải 4: /-θ/</span>
              </div>

              {/* Node 5 (Locked) */}
              <div className="relative z-10 flex flex-col items-center gap-1 opacity-60">
                <div className="w-11 h-11 rounded-full bg-slate-100 border-2 border-slate-300 text-slate-400 flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">lock</span>
                </div>
                <span className="font-label-mono text-[10px] text-slate-400">Chưa mở</span>
                <span className="font-label-mono text-[11px] text-slate-500">Ải 5: /-ʃ/</span>
              </div>

              {/* Node 6 (Locked) */}
              <div className="relative z-10 flex flex-col items-center gap-1 opacity-60">
                <div className="w-11 h-11 rounded-full bg-slate-100 border-2 border-slate-300 text-slate-400 flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">lock</span>
                </div>
                <span className="font-label-mono text-[10px] text-slate-400">Chưa mở</span>
                <span className="font-label-mono text-[11px] text-slate-500">Ải 6: /-tʃ/</span>
              </div>
            </div>
          </div>
        </div>

        {/* GAME-101 4-World Map Stage Progression Modal */}
        <WorldMapStageSelect
          isOpen={showWorldMap}
          onClose={() => setShowWorldMap(false)}
        />

        {/* GAME-103 Auditory Discrimination Boss Arena Modal */}
        <BossArenaBattle
          isOpen={showBossArena}
          onClose={() => setShowBossArena(false)}
        />
      </main>
    </div>
  );
}
