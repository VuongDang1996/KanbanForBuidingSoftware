import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { evaluateStreakVisuals } from '../../lib/scoring/streakFreezeShield';

export default function StreakBadge() {
  const { streak, setShowStreakModal } = useApp();
  const [streakData, setStreakData] = useState({
    streakCount: streak || 7,
    isFrozen: false,
    shields: 1
  });

  useEffect(() => {
    fetch('/api/v1/streak/status')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStreakData({
            streakCount: data.streakCount,
            isFrozen: data.isFrozen,
            shields: data.freezeShieldsCount
          });
        }
      })
      .catch(() => {});
  }, [streak]);

  const visuals = evaluateStreakVisuals({
    streak: streakData.streakCount,
    isFrozen: streakData.isFrozen
  });

  return (
    <button
      type="button"
      onClick={() => setShowStreakModal(true)}
      className={`${visuals.badgeClass} cursor-pointer transition-all hover:scale-105 active:scale-95`}
      title={visuals.tooltip}
      data-testid="streak-badge-btn"
    >
      <span className="material-symbols-outlined text-base">
        {visuals.icon}
      </span>
      <span className="font-label-mono text-xs font-bold">
        {streakData.streakCount} Ngày
      </span>
      {streakData.isFrozen && (
        <span className="px-1.5 py-0.2 rounded bg-sky-200/80 text-sky-900 text-[9px] font-mono font-bold">
          BĂNG
        </span>
      )}
    </button>
  );
}
