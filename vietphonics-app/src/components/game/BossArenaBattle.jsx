import React, { useState, useEffect, useRef } from 'react';
import {
  BOSS_ENCOUNTERS,
  getBossEncounterById,
  evaluateBossTurn
} from '../../lib/scoring/bossArena';

export default function BossArenaBattle({
  isOpen = true,
  onClose = () => {},
  bossId = 'boss_titan_t'
}) {
  const currentBoss = getBossEncounterById(bossId);
  const [turnIndex, setTurnIndex] = useState(1);
  const [bossHp, setBossHp] = useState(currentBoss.maxHp);
  const [playerHp, setPlayerHp] = useState(100);
  const [timeLeft, setTimeLeft] = useState(3.5);
  const [isShaking, setIsShaking] = useState(false);
  const [turnResult, setTurnResult] = useState(null);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [isFighting, setIsFighting] = useState(true);

  const currentTurn = currentBoss.deck.find((d) => d.turnIndex === turnIndex) || currentBoss.deck[0];
  const timerRef = useRef(null);

  // Play audio cue for the boss's incantation
  const playAudioCue = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    }
  };

  // Turn timer countdown (3.5s)
  useEffect(() => {
    if (!isOpen || !isFighting || turnResult) return;

    // Speak audio cue when turn begins
    playAudioCue(currentTurn.audioCueText);

    setTimeLeft(3.5);
    const interval = 100; // 0.1s tick
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0.1) {
          clearInterval(timerRef.current);
          handleSelectOption(0, 3.6); // timeout
          return 0;
        }
        return Number((prev - 0.1).toFixed(1));
      });
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [turnIndex, isOpen, isFighting, turnResult]);

  // Keyboard shortcut listener: Keys 1 and 2 (AC 4)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen || !isFighting || turnResult) return;
      if (e.key === '1') {
        e.preventDefault();
        handleSelectOption(1, 3.5 - timeLeft);
      } else if (e.key === '2') {
        e.preventDefault();
        handleSelectOption(2, 3.5 - timeLeft);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isFighting, turnResult, timeLeft]);

  if (!isOpen) return null;

  const handleSelectOption = async (optionIdx, timeSpent) => {
    if (timerRef.current) clearInterval(timerRef.current);

    const clientTurn = evaluateBossTurn({
      bossId: currentBoss.id,
      turnIndex,
      selectedOptionIndex: optionIdx,
      currentBossHp: bossHp,
      currentPlayerHp: playerHp,
      timeTakenSec: timeSpent || (3.5 - timeLeft)
    });

    try {
      const res = await fetch('/api/v1/game/boss-turn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bossId: currentBoss.id,
          turnIndex,
          selectedOptionIndex: optionIdx,
          currentBossHp: bossHp,
          currentPlayerHp: playerHp,
          timeTakenSec: timeSpent || (3.5 - timeLeft)
        })
      });
      if (res.ok) {
        const data = await res.json();
        const result = data.turnResult || clientTurn;
        processResult(result);
      } else {
        processResult(clientTurn);
      }
    } catch {
      processResult(clientTurn);
    }
  };

  const processResult = (result) => {
    setTurnResult(result);
    setBossHp(result.newBossHp);
    setPlayerHp(result.newPlayerHp);

    if (result.screenShake) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 700);
    }

    if (!result.isCorrect) {
      setShowMagnifier(true);
    }

    if (result.isBossDefeated || result.isPlayerDefeated) {
      setIsFighting(false);
    }
  };

  const nextTurn = () => {
    setTurnResult(null);
    setShowMagnifier(false);
    if (turnIndex < currentBoss.deck.length) {
      setTurnIndex((prev) => prev + 1);
    } else {
      // Loop or restart deck
      setTurnIndex(1);
    }
  };

  const restartFight = () => {
    setBossHp(currentBoss.maxHp);
    setPlayerHp(100);
    setTurnIndex(1);
    setTurnResult(null);
    setShowMagnifier(false);
    setIsFighting(true);
  };

  const bossHpPercent = (bossHp / currentBoss.maxHp) * 100;
  const playerHpPercent = (playerHp / 100) * 100;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="boss-arena-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fade-in"
    >
      <div
        className={`relative w-full max-w-4xl bg-slate-900 rounded-3xl shadow-2xl border-2 border-slate-800 overflow-hidden my-6 flex flex-col text-white transition-transform ${
          isShaking ? 'animate-bounce ring-4 ring-rose-500' : ''
        }`}
      >
        {/* Top Header */}
        <div className="px-6 py-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
              <span className="material-symbols-outlined text-2xl">swords</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="boss-arena-title" className="text-base font-bold font-headline-sm">
                  Đấu Trường Trùm Phân Biệt Âm (GAME-103)
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Minimal Pair Counter-Spells
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Phím tắt: Bấm [1] hoặc [2] trên bàn phím để phản đòn nhanh
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Thoát đấu trường"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Combat Field */}
        <div className="p-6 flex flex-col gap-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
          {/* Boss Bar & Avatar */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-rose-600/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                  <span className="material-symbols-outlined text-2xl">pest_control</span>
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-rose-400">{currentBoss.name}</h4>
                  <span className="text-xs text-slate-400 font-mono">{currentBoss.title}</span>
                </div>
              </div>
              <div className="text-right font-mono">
                <span className="text-xs text-slate-400">HP TRÙM: </span>
                <span className="text-lg font-black text-rose-400">{bossHp}</span>
                <span className="text-xs text-slate-500"> / {currentBoss.maxHp}</span>
              </div>
            </div>

            {/* Boss HP Bar (AC 1) */}
            <div className="w-full h-4 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 transition-all duration-300"
                style={{ width: `${Math.max(0, Math.min(100, bossHpPercent))}%` }}
              ></div>
            </div>
          </div>

          {/* Turn Incantation & Timer */}
          {isFighting && (
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-indigo-500/30 flex flex-col items-center gap-4 text-center">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                  Lượt {turnIndex}/{currentBoss.deck.length}: {currentTurn.phoneticFocus}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <button
                  onClick={() => playAudioCue(currentTurn.audioCueText)}
                  className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">volume_up</span>
                  <span>Nghe lại tiếng Trùm</span>
                </button>
              </div>

              {/* 3.5s Countdown Progress */}
              <div className="w-full max-w-md flex flex-col gap-1 items-center">
                <div className="flex items-center justify-between w-full text-xs font-mono">
                  <span className="text-slate-400">Thời gian phản đòn:</span>
                  <span className={`font-bold ${timeLeft <= 1.0 ? 'text-rose-400 animate-ping' : 'text-amber-400'}`}>
                    {timeLeft.toFixed(1)}s
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-rose-500 transition-all duration-100"
                    style={{ width: `${(timeLeft / 3.5) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* 2 Counter-Spell Cards (AC 2 & AC 4) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl mt-2">
                {currentTurn.options.map((opt) => (
                  <button
                    key={opt.index}
                    onClick={() => handleSelectOption(opt.index, 3.5 - timeLeft)}
                    disabled={Boolean(turnResult)}
                    className="p-5 rounded-2xl bg-slate-800/80 hover:bg-slate-700 border-2 border-indigo-500/40 hover:border-indigo-400 transition-all cursor-pointer flex flex-col items-center justify-center gap-1 shadow-xl hover:scale-102 active:scale-95 disabled:opacity-50"
                  >
                    <span className="font-mono text-xs text-amber-400 font-bold">
                      PHÍM [{opt.index}]
                    </span>
                    <span className="text-2xl font-black text-white font-headline-sm tracking-wide">
                      "{opt.word}"
                    </span>
                    <span className="font-mono text-sm text-cyan-300">
                      {opt.ipa}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Turn Result & Acoustic Magnifier (AC 3) */}
          {turnResult && (
            <div className="flex flex-col gap-4 animate-fade-in">
              <div
                className={`p-4 rounded-xl border text-xs font-semibold flex items-center justify-between ${
                  turnResult.isCorrect
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                    : 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">
                    {turnResult.isCorrect ? '⚔️' : '🛡️'}
                  </span>
                  <span>
                    {turnResult.isCorrect
                      ? `CHÉM TRÚNG CHÍ MẠNG! Phản đòn chính xác gây -${turnResult.damageDealt} HP vào Boss!`
                      : `PHẢN ĐÒN THẤT BẠI! Boss phản kích gây -${turnResult.damageTaken} HP vào bạn!`}
                  </span>
                </div>
                {isFighting && (
                  <button
                    onClick={nextTurn}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    Lượt tiếp theo &rarr;
                  </button>
                )}
              </div>

              {/* L1 Acoustic Magnifier Box (AC 3) */}
              {showMagnifier && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                  <span className="material-symbols-outlined text-amber-400 text-xl mt-0.5">
                    search
                  </span>
                  <div className="flex flex-col gap-1 text-xs text-slate-200">
                    <strong className="text-amber-300 font-mono uppercase">
                      Kính Lúp Âm Học (L1 Acoustic Magnifier):
                    </strong>
                    <p className="leading-relaxed">
                      {turnResult.magnifierTip}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Player HP Bar */}
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold font-mono">
                LV5
              </div>
              <div>
                <span className="text-xs font-bold text-slate-200">Hiệp Sĩ Phát Âm (Bạn)</span>
                <div className="w-48 h-2.5 rounded-full bg-slate-800 overflow-hidden mt-1">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-sky-400 transition-all duration-300"
                    style={{ width: `${Math.max(0, Math.min(100, playerHpPercent))}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="font-mono text-xs text-slate-400">
              HP: <span className="text-emerald-400 font-bold">{playerHp}</span> / 100
            </div>
          </div>

          {/* Game Over / Victory Modal */}
          {!isFighting && (
            <div className="p-6 rounded-2xl bg-slate-950 border-2 border-amber-500 flex flex-col items-center gap-4 text-center animate-fade-in shadow-2xl">
              <span className="text-4xl">
                {bossHp <= 0 ? '🏆' : '💀'}
              </span>
              <h3 className="text-xl font-black text-amber-400">
                {bossHp <= 0 ? 'CHIẾN THẮNG TRÙM THÀNH CÔNG!' : 'BẠN ĐÃ BỊ ĐÁNH BẠI!'}
              </h3>
              <p className="text-xs text-slate-300 max-w-md">
                {bossHp <= 0
                  ? 'Đôi tai nhạy bén của bạn đã phân biệt hoàn hảo các cặp âm tối thiểu! Nhận +150 Kim Cương Phonics!'
                  : 'Hãy ôn luyện lại độ dài nguyên âm và phụ âm vô thanh/hữu thanh trước khi thử sức lại nhé.'}
              </p>
              <button
                onClick={restartFight}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer shadow-lg"
              >
                Đấu lại trận này
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
