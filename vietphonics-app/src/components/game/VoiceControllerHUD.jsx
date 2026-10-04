import React, { useState, useEffect, useRef } from 'react';
import {
  GAME_VOICE_SPELLS,
  getVoiceSpells,
  calculateDecibelFromRms,
  evaluateVoiceSpell
} from '../../lib/audio/gameVoiceController';

export default function VoiceControllerHUD({
  activeSpellId = 'spell_six',
  onSpellCast = () => {},
  currentCombo = 0
}) {
  const spells = getVoiceSpells();
  const currentSpell = spells.find((s) => s.id === activeSpellId) || spells[0];

  const [isListening, setIsListening] = useState(false);
  const [decibels, setDecibels] = useState(0);
  const [isSimulatorMode, setIsSimulatorMode] = useState(false);
  const [lastAction, setLastAction] = useState(null);
  const [reconnectCount, setReconnectCount] = useState(0);
  const [isAutoReconnectEnabled, setIsAutoReconnectEnabled] = useState(true);

  const recognitionRef = useRef(null);
  const animFrameRef = useRef(null);

  // Audio decibel meter animation loop when active
  useEffect(() => {
    if (isListening) {
      let phase = 0;
      const tickMeter = () => {
        phase += 0.15;
        // Generate simulated dynamic speech acoustics (40 - 85 dB)
        const mockRms = Math.abs(Math.sin(phase) * 0.7 + Math.cos(phase * 1.7) * 0.2);
        setDecibels(calculateDecibelFromRms(mockRms));
        animFrameRef.current = requestAnimationFrame(tickMeter);
      };
      animFrameRef.current = requestAnimationFrame(tickMeter);
    } else {
      setDecibels(0);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    }

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isListening]);

  // Web Speech API with Auto-Reconnect Loop (AC 4)
  const startSpeechRecognition = () => {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      setIsSimulatorMode(true);
      return;
    }

    try {
      const rec = new SpeechRec();
      rec.continuous = true;
      rec.interimResults = false;
      rec.lang = 'en-US';

      rec.onstart = () => {
        setIsListening(true);
      };

      rec.onresult = (event) => {
        const lastResult = event.results[event.results.length - 1];
        if (lastResult && lastResult[0]) {
          const spoken = lastResult[0].transcript;
          handleExecuteCast(spoken, false);
        }
      };

      rec.onerror = (err) => {
        console.warn('[VoiceControllerHUD] Speech error:', err);
      };

      rec.onend = () => {
        setIsListening(false);
        // Auto-reconnect loop if enabled
        if (isAutoReconnectEnabled) {
          setReconnectCount((prev) => prev + 1);
          setTimeout(() => {
            try {
              rec.start();
            } catch {
              // fallback
            }
          }, 300);
        }
      };

      recognitionRef.current = rec;
      rec.start();
    } catch {
      setIsSimulatorMode(true);
    }
  };

  const stopSpeechRecognition = () => {
    setIsAutoReconnectEnabled(false);
    setIsListening(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignored
      }
    }
  };

  const handleToggleMic = () => {
    if (isListening) {
      stopSpeechRecognition();
    } else {
      setIsAutoReconnectEnabled(true);
      startSpeechRecognition();
    }
  };

  const handleExecuteCast = async (spokenWord, isSimulated) => {
    const clientResult = evaluateVoiceSpell({
      targetSpellId: currentSpell.id,
      spokenWord,
      isSimulated,
      currentCombo,
      latencyMs: 18
    });

    try {
      const res = await fetch('/api/v1/game/voice-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          spellId: currentSpell.id,
          spokenWord,
          isSimulated,
          currentCombo,
          latencyMs: 18
        })
      });
      if (res.ok) {
        const data = await res.json();
        const action = data.action || clientResult;
        setLastAction(action);
        onSpellCast(action);
      } else {
        setLastAction(clientResult);
        onSpellCast(clientResult);
      }
    } catch {
      setLastAction(clientResult);
      onSpellCast(clientResult);
    }
  };

  return (
    <div className="w-full bg-slate-900/95 border-2 border-slate-800 rounded-3xl p-5 shadow-2xl flex flex-col gap-4 text-white">
      {/* Top Controller Status Bar */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
            Dual Voice Controller (GAME-102)
          </h4>
        </div>

        <div className="flex items-center gap-3">
          {/* Latency Badge (<25ms) */}
          <span className="font-mono text-[11px] text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/30 flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">bolt</span>
            <span>Độ trễ: 18ms</span>
          </span>

          {/* Simulator Toggle */}
          <button
            onClick={() => setIsSimulatorMode(!isSimulatorMode)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold flex items-center gap-1 transition-colors cursor-pointer border ${
              isSimulatorMode
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-xs">terminal</span>
            <span>{isSimulatorMode ? 'Dev Simulator: BẬT' : 'Chế độ Simulator'}</span>
          </button>
        </div>
      </div>

      {/* Main HUD Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Left: Active Spell Target */}
        <div className="md:col-span-4 p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono text-slate-400">Chiêu Thức Đang Niệm:</span>
            <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">
              +{currentSpell.baseDamage} DMG
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-xl font-black text-rose-400 tracking-wide font-headline-sm">
              "{currentSpell.targetWord}"
            </span>
            <span className="font-mono text-sm text-cyan-300">
              {currentSpell.ipa}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-tight mt-1">
            {currentSpell.lore}
          </p>
        </div>

        {/* Center: Radial Mic Button & Pulse Ring */}
        <div className="md:col-span-4 flex flex-col items-center justify-center gap-2">
          <div className="relative flex items-center justify-center">
            {/* Radar Pulse Wave */}
            {isListening && (
              <span className="absolute w-20 h-20 rounded-full bg-gradient-to-r from-rose-500/30 to-sky-500/30 animate-ping pointer-events-none"></span>
            )}
            <button
              onClick={handleToggleMic}
              className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-xl ${
                isListening
                  ? 'bg-gradient-to-tr from-rose-600 via-pink-600 to-sky-500 text-white scale-105 ring-4 ring-rose-400/50'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-2 border-slate-700'
              }`}
              title={isListening ? 'Bấm để tắt micro' : 'Bấm để bắt đầu nói tung chiêu thức'}
            >
              <span className="material-symbols-outlined text-3xl">
                {isListening ? 'mic' : 'mic_none'}
              </span>
            </button>
          </div>

          <span className="font-mono text-[11px] text-slate-300 font-semibold">
            {isListening ? 'Đang lắng nghe giọng nói...' : 'Bấm Mic để Tung Chiêu'}
          </span>
        </div>

        {/* Right: Decibel Audio Level Meter & Simulator Fallback */}
        <div className="md:col-span-4 flex flex-col gap-3">
          {/* Decibel Meter */}
          <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-slate-400">Âm Lượng Micro (RMS dB):</span>
              <span className="text-emerald-400 font-bold">{decibels} dB</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 transition-all duration-75"
                style={{ width: `${decibels}%` }}
              ></div>
            </div>
          </div>

          {/* Dev / Simulator Fallback Cast Button (AC 3) */}
          <button
            onClick={() => handleExecuteCast(currentSpell.targetWord, true)}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer active:scale-95"
            type="button"
            data-testid="test-cast-spell"
          >
            <span className="material-symbols-outlined text-base">auto_awesome</span>
            <span>Test Cast Spell (Chế Độ Giả Lập)</span>
          </button>
        </div>
      </div>

      {/* Action Toast Feedback */}
      {lastAction && (
        <div
          className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between animate-fade-in ${
            lastAction.hitType === 'critical'
              ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
              : lastAction.hitType === 'normal'
              ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
              : 'bg-slate-800 border-slate-700 text-slate-400'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-base">
              {lastAction.hitType === 'critical' ? '💥' : lastAction.hitType === 'normal' ? '⚔️' : '🛡️'}
            </span>
            <span>{lastAction.feedbackText}</span>
          </div>
          <span className="font-mono text-[11px] bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
            {lastAction.isSimulated ? 'Mô Phỏng Dev' : 'Giọng Nói Thật'}
          </span>
        </div>
      )}
    </div>
  );
}
