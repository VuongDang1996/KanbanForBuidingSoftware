import React, { useState, useEffect } from 'react';

export default function StreakSavedModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [streakCount, setStreakCount] = useState(7);
  const [shieldsCount, setShieldsCount] = useState(0);
  const [purchaseStatus, setPurchaseStatus] = useState(null);

  useEffect(() => {
    fetch('/api/v1/streak/status')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStreakCount(data.streakCount);
          setShieldsCount(data.freezeShieldsCount);
          if (data.savedModalPending) {
            setIsOpen(true);
          }
        }
      })
      .catch(() => {});
  }, []);

  const handleDismiss = async () => {
    try {
      await fetch('/api/v1/streak/dismiss-saved-modal', { method: 'POST' });
      setIsOpen(false);
    } catch {
      setIsOpen(false);
    }
  };

  const handleBuyMoreShield = async () => {
    try {
      const res = await fetch('/api/v1/streak/buy-freeze', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setShieldsCount(data.freezeShieldsCount);
        setPurchaseStatus('Đã mua thêm 1 Khiên Băng (-200 Kim Cương)!');
        setTimeout(() => setPurchaseStatus(null), 2500);
      } else {
        setPurchaseStatus(data.error || 'Không đủ kim cương.');
        setTimeout(() => setPurchaseStatus(null), 2500);
      }
    } catch {
      setPurchaseStatus('Lỗi kết nối');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fade-in"
      data-testid="streak-saved-modal"
    >
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-sky-300 flex flex-col items-center text-center">
        {/* Frozen Icon with Ice Ping Effect (AC 3) */}
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-sky-400 via-cyan-500 to-blue-600 flex items-center justify-center text-white text-5xl shadow-[0_10px_35px_rgba(56,189,248,0.5)] animate-pulse">
            <span className="material-symbols-outlined text-6xl">ac_unit</span>
          </div>
          <div className="absolute -inset-2 bg-sky-400/25 rounded-full blur-xl -z-10" />
        </div>

        <span className="px-3.5 py-1 rounded-full bg-sky-100 border border-sky-300 text-sky-800 font-label-mono text-xs font-bold uppercase tracking-wider mb-2">
          Khiên Băng Đã Kích Hoạt
        </span>

        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Chuỗi {streakCount} Ngày Của Bạn Đã Được Cứu!
        </h3>

        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          Chuỗi <strong>{streakCount} ngày</strong> của bạn đã được khiên băng bảo vệ an toàn! Hãy hoàn thành 1 bài học hôm nay để làm tan băng!
        </p>

        {/* Shields status */}
        <div className="w-full mt-5 p-3.5 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-between text-left">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-sky-600 text-xl">shield</span>
            <div>
              <span className="text-xs font-bold text-slate-900 block">Khiên Băng Còn Lại</span>
              <span className="text-[10px] text-slate-500">Bảo vệ tự động 24h</span>
            </div>
          </div>
          <span className="font-mono text-sm font-black text-sky-700">
            {shieldsCount} Khiên
          </span>
        </div>

        {purchaseStatus && (
          <div className="mt-2 text-xs font-bold text-indigo-700">
            {purchaseStatus}
          </div>
        )}

        {/* Action Buttons */}
        <div className="w-full mt-6 space-y-2.5">
          <button
            type="button"
            onClick={handleDismiss}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-headline-sm text-sm font-bold shadow-md shadow-sky-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            data-testid="shatter-ice-btn"
          >
            <span className="material-symbols-outlined text-lg">local_fire_department</span>
            <span>Làm Tan Băng & Luyện Tập Ngay</span>
          </button>

          <button
            type="button"
            onClick={handleBuyMoreShield}
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-label-mono text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            data-testid="buy-more-shield-btn"
          >
            <span className="material-symbols-outlined text-sm text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>
              diamond
            </span>
            <span>Mua Thêm Khiên Băng (200 Kim Cương)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
