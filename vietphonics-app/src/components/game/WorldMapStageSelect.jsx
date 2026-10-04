import React, { useState, useEffect } from 'react';
import {
  GAME_WORLDS,
  getGameWorlds,
  evaluateStageCompletion
} from '../../lib/scoring/gameLevelMap';

export default function WorldMapStageSelect({
  isOpen = true,
  onClose = () => {},
  onSelectStage = () => {}
}) {
  const worlds = getGameWorlds();
  const [activeWorldIndex, setActiveWorldIndex] = useState(0);
  const [selectedStage, setSelectedStage] = useState(null);
  const [unlockedStages, setUnlockedStages] = useState({
    stage_1_1: { stars: 3, score: 92 },
    stage_1_2: { stars: 3, score: 88 },
    stage_1_3: { stars: 2, score: 75 },
    stage_1_4: { stars: 0, score: 0 } // unlocked, not completed
  });
  const [totalStars, setTotalStars] = useState(8);
  const [totalGems, setTotalGems] = useState(450);
  const [notification, setNotification] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeWorld = worlds[activeWorldIndex] || worlds[0];

  // AC 4: Keyboard world switch 1, 2, 3, 4
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['1', '2', '3', '4'].includes(e.key) && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        const idx = parseInt(e.key, 10) - 1;
        if (idx >= 0 && idx < worlds.length) {
          setActiveWorldIndex(idx);
          setSelectedStage(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [worlds.length]);

  if (!isOpen) return null;

  const handleSimulateClearStage = async (stage) => {
    setIsSubmitting(true);
    const testScore = 90; // Earns 3 stars
    const localEval = evaluateStageCompletion({
      worldId: activeWorld.id,
      stageId: stage.id,
      score: testScore,
      currentTotalStars: totalStars
    });

    try {
      const res = await fetch('/api/v1/game/stage-complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          worldId: activeWorld.id,
          stageId: stage.id,
          score: testScore,
          currentTotalStars: totalStars
        })
      });
      if (res.ok) {
        const data = await res.json();
        const progression = data.progression || localEval;
        // Update state
        setUnlockedStages((prev) => ({
          ...prev,
          [stage.id]: { stars: progression.stars, score: progression.score },
          ...(progression.nextStageId ? { [progression.nextStageId]: { stars: 0, score: 0 } } : {})
        }));
        setTotalStars((prev) => prev + progression.stars);
        setTotalGems((prev) => prev + progression.gemReward);
        setNotification({
          type: 'success',
          text: `🎉 ${progression.feedbackText} +${progression.gemReward} Kim Cương!`
        });
      }
    } catch {
      setUnlockedStages((prev) => ({
        ...prev,
        [stage.id]: { stars: localEval.stars, score: localEval.score },
        ...(localEval.nextStageId ? { [localEval.nextStageId]: { stars: 0, score: 0 } } : {})
      }));
      setTotalGems((prev) => prev + localEval.gemReward);
      setNotification({
        type: 'success',
        text: `🎉 ${localEval.feedbackText} +${localEval.gemReward} Kim Cương!`
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="world-map-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in"
    >
      <div className="relative w-full max-w-5xl bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden my-6 flex flex-col text-white">
        {/* Top Header Bar */}
        <div className="px-6 py-4 bg-slate-950/90 border-b border-slate-800/80 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <span className="material-symbols-outlined text-2xl">map</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="world-map-title" className="text-base font-bold font-headline-sm">
                  Bản Đồ Phiêu Lưu Phát Âm (GAME-101)
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  4 Thế Giới Tuyến Tính
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Nhấn phím [1] [2] [3] [4] để lướt camera qua các thế giới
              </p>
            </div>
          </div>

          {/* Player Hub: Gems & Stars */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-amber-400 font-mono text-xs font-bold shadow-inner">
              <span className="material-symbols-outlined text-base">star</span>
              <span>{totalStars} Sao</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-cyan-400 font-mono text-xs font-bold shadow-inner">
              <span className="material-symbols-outlined text-base">diamond</span>
              <span>{totalGems} Gems</span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Đóng bản đồ"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </div>

        {/* 4 Worlds Biome Tabs */}
        <div className="px-6 py-3 bg-slate-900/90 border-b border-slate-800 flex gap-2 overflow-x-auto">
          {worlds.map((w, idx) => {
            const isUnlocked = totalStars >= w.requiredStarsToUnlock;
            const isActive = activeWorldIndex === idx;
            return (
              <button
                key={w.id}
                onClick={() => isUnlocked && setActiveWorldIndex(idx)}
                disabled={!isUnlocked}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md font-bold'
                    : isUnlocked
                    ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60'
                    : 'bg-slate-950/40 text-slate-600 border border-slate-800/40 cursor-not-allowed opacity-60'
                }`}
              >
                <span className="font-mono text-[11px] font-bold">[{idx + 1}]</span>
                <span>{w.name}</span>
                {!isUnlocked && (
                  <span className="material-symbols-outlined text-xs text-amber-500">lock</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Toast Notification */}
        {notification && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-fade-in">
            <span className="material-symbols-outlined text-sm">celebration</span>
            <span>{notification.text}</span>
          </div>
        )}

        {/* World Map Canvas & Stages Area */}
        <div className={`p-8 bg-gradient-to-b ${activeWorld.bgColor} flex-1 flex flex-col items-center justify-center min-h-[380px] relative overflow-hidden`}>
          {/* World Lore Banner */}
          <div className="text-center mb-8 max-w-xl">
            <h3 className="text-xl font-extrabold text-amber-300 mb-1">
              {activeWorld.name} ({activeWorld.englishName})
            </h3>
            <p className="text-xs text-slate-300">
              {activeWorld.description}
            </p>
          </div>

          {/* Stage Progression Nodes (Isometric / Floating Pathway) */}
          <div className="w-full max-w-3xl flex items-center justify-between relative py-6">
            {/* Connecting Pathway Line */}
            <div className="absolute top-1/2 left-8 right-8 h-1 bg-gradient-to-r from-amber-500/30 via-amber-400 to-amber-500/30 -translate-y-1/2 z-0"></div>

            {activeWorld.stages.map((stage, idx) => {
              const progress = unlockedStages[stage.id];
              const isUnlocked = progress !== undefined;
              const stars = progress?.stars || 0;
              const isSelected = selectedStage?.id === stage.id;

              return (
                <div key={stage.id} className="relative z-10 flex flex-col items-center gap-2 group">
                  {/* Floating Node Circle */}
                  <button
                    onClick={() => isUnlocked && setSelectedStage(stage)}
                    disabled={!isUnlocked}
                    className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 cursor-pointer shadow-xl ${
                      isSelected
                        ? 'ring-4 ring-amber-400 scale-110'
                        : isUnlocked
                        ? 'hover:scale-105 hover:-translate-y-1'
                        : 'cursor-not-allowed opacity-50'
                    } ${
                      stage.boss
                        ? 'bg-gradient-to-br from-rose-600 to-red-800 border-2 border-rose-400 text-white'
                        : isUnlocked
                        ? 'bg-gradient-to-br from-white to-slate-200 border-2 border-amber-400 text-slate-900'
                        : 'bg-slate-800 border border-slate-700 text-slate-500'
                    }`}
                  >
                    {isUnlocked ? (
                      stage.boss ? (
                        <span className="material-symbols-outlined text-2xl text-amber-300 animate-pulse">
                          skull
                        </span>
                      ) : (
                        <span className="font-extrabold text-sm md:text-base font-mono">
                          {idx + 1}
                        </span>
                      )
                    ) : (
                      <span className="material-symbols-outlined text-base">lock</span>
                    )}

                    {/* Star Badges */}
                    {isUnlocked && (
                      <div className="flex gap-0.5 mt-0.5">
                        {[1, 2, 3].map((s) => (
                          <span
                            key={s}
                            className={`text-[9px] ${
                              s <= stars ? 'text-amber-500' : 'text-slate-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    )}
                  </button>

                  {/* Stage Label */}
                  <span className="text-[10px] font-semibold text-slate-200 max-w-[80px] text-center truncate">
                    {stage.name.split(':')[0]}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Node Preview Modal (AC 3) */}
          {selectedStage && (
            <div className="mt-6 w-full max-w-xl bg-slate-950/90 rounded-2xl border border-amber-500/50 p-5 shadow-2xl flex flex-col gap-3 animate-fade-in z-20">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {selectedStage.boss ? 'ẢI TRÙM THẾ GIỚI' : 'ẢI THƯỜNG'}
                  </span>
                  <h4 className="text-sm font-bold text-white">{selectedStage.name}</h4>
                </div>
                <button
                  onClick={() => setSelectedStage(null)}
                  className="text-slate-400 hover:text-white text-xs cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex flex-col gap-1">
                  <span className="text-[10px] text-slate-400 uppercase font-mono">Quái Thú Trấn Giữ:</span>
                  <span className="font-semibold text-slate-200 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-rose-400">pest_control</span>
                    <span>{selectedStage.monster}</span>
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex flex-col gap-1">
                  <span className="text-[10px] text-slate-400 uppercase font-mono">Mục Tiêu Âm Vị:</span>
                  <span className="font-mono text-cyan-300 font-bold">
                    {selectedStage.targetPhonemes.join(' • ')}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono font-bold">
                  <span className="material-symbols-outlined text-sm">diamond</span>
                  <span>Phần thưởng: +{selectedStage.rewardGems} Gems</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleSimulateClearStage(selectedStage)}
                    disabled={isSubmitting}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-sm">play_arrow</span>
                    <span>{isSubmitting ? 'Đang tính điểm...' : 'Chơi Ải (Test Clear 90%)'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
