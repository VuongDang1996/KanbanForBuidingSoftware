import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import PaywallModal from './PaywallModal';

export default function QuotaUsageBadge() {
  const { isPro } = useApp();
  const [quota, setQuota] = useState({
    isPro: Boolean(isPro),
    isQuotaExceeded: false,
    lessonsCompletedToday: 0,
    dailyLimit: 5,
    remainingLessons: 5,
    badgeText: 'Còn 5/5 bài miễn phí'
  });
  const [showPaywall, setShowPaywall] = useState(false);

  useEffect(() => {
    fetch('/api/v1/quota/status')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.quota) {
          setQuota(data.quota);
        }
      })
      .catch(() => {});
  }, [isPro]);

  if (quota.isPro) {
    return (
      <span className="px-3 py-1 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-400/50 text-amber-700 font-label-mono text-xs font-bold rounded-full flex items-center gap-1 shadow-xs">
        <span className="material-symbols-outlined text-sm text-amber-600">verified</span>
        <span>Pro Member</span>
      </span>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setShowPaywall(true)}
        className={`px-3 py-1 rounded-full font-label-mono text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
          quota.isQuotaExceeded
            ? 'bg-rose-100 border border-rose-300 text-rose-800 hover:bg-rose-200 animate-pulse'
            : 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200'
        }`}
        data-testid="quota-badge-btn"
      >
        <span className="material-symbols-outlined text-sm">
          {quota.isQuotaExceeded ? 'lock' : 'battery_charging_full'}
        </span>
        <span>{quota.badgeText}</span>
      </button>

      <PaywallModal isOpen={showPaywall} onClose={() => setShowPaywall(false)} />
    </>
  );
}
