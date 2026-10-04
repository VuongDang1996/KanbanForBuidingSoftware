import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { getProBenefits, getCountdownUntilMidnight } from '../../lib/scoring/freemiumQuota';

export default function PaywallModal({ isOpen, onClose }) {
  const { setShowUpgradeModal } = useApp();
  const [benefits] = useState(getProBenefits());
  const [countdown, setCountdown] = useState(() => getCountdownUntilMidnight());

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setCountdown(getCountdownUntilMidnight());
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const handleQuickUpgrade = () => {
    onClose();
    setShowUpgradeModal(true);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
      data-testid="paywall-modal"
    >
      <div className="relative w-full max-w-lg bg-slate-900 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(245,158,11,0.25)] flex flex-col text-white max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
          data-testid="close-paywall-modal"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        {/* Top Header & Pro Badge */}
        <div className="flex flex-col items-center text-center mb-6">
          <span className="bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black px-3 py-1 rounded-full text-xs uppercase tracking-wider mb-3 shadow-md">
            ⭐ NÂNG CẤP TÀI KHOẢN PRO
          </span>
          <h3 className="font-headline-lg text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Đạt Chuẩn Phát Âm Bản Xứ Không Giới Hạn
          </h3>
          <p className="text-xs text-amber-200/80 mt-1 max-w-sm">
            Bạn đã sử dụng hết 5 bài tập miễn phí hôm nay. Nâng cấp Pro để giải phóng toàn bộ tiềm năng giọng nói!
          </p>
        </div>

        {/* 4 Core Pro Benefits (AC 2) */}
        <div className="space-y-3 mb-6">
          {benefits.map((b) => (
            <div
              key={b.id}
              className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-3 hover:border-amber-500/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-400 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-xl">{b.icon}</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white leading-tight">
                  {b.title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                  {b.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Countdown Reset Notice (AC 4) */}
        <div
          className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-center mb-6"
          data-testid="paywall-countdown-notice"
        >
          <div className="text-[11px] text-amber-300 font-label-mono font-bold flex items-center justify-center gap-1.5">
            <span className="material-symbols-outlined text-sm">schedule</span>
            <span>{countdown.countdownText}</span>
          </div>
        </div>

        {/* Quick Upgrade CTA Button (AC 3) */}
        <button
          type="button"
          onClick={handleQuickUpgrade}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-extrabold text-base sm:text-lg shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
          data-testid="upgrade-pro-cta-btn"
        >
          <span className="material-symbols-outlined text-xl">qr_code_2</span>
          <span>Nâng Cấp Pro Chỉ 3.000đ/Ngày (90k/Tháng)</span>
        </button>

        <p className="text-[10px] text-slate-400 text-center mt-3">
          Quét mã VietQR Napas 24/7 kích hoạt tự động tức thì trong 3 giây. Hủy bất cứ lúc nào.
        </p>
      </div>
    </div>
  );
}
