import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import StreakBadge from './gamification/StreakBadge';
import QuotaUsageBadge from './paywall/QuotaUsageBadge';
import NotificationBellDropdown from './notifications/NotificationBellDropdown';

export default function Navbar() {
  const {
    activeTab,
    setActiveTab,
    dialect,
    setDialect,
    shields,
    isPro,
    isGuest,
    currentUser,
    logoutLearner,
    setShowDiagnosticModal,
    setShowUpgradeModal,
    setShowAccountModal,
    setAccountModalTab,
    setShowBillingModal,
    setShowLegalModal
  } = useApp();

  const [dialectOpen, setDialectOpen] = useState(false);

  // 4 Consolidated Core Hubs
  const navHubs = [
    {
      id: 'tong-quan',
      label: 'Tổng Quan',
      icon: 'home',
      matchIds: ['tong-quan', 'chan-doan']
    },
    {
      id: 'phong-luyen-phat-am',
      label: 'Phòng Luyện Âm',
      icon: 'mic',
      matchIds: ['phong-luyen-phat-am', 'khau-hinh-2d', 'mastery-lab']
    },
    {
      id: 'ai-lab',
      label: 'AI Interactive Lab',
      icon: 'psychology',
      matchIds: ['ai-lab', 'ai-hoi-thoai', 'game-3d-rpg']
    },
    {
      id: 'tien-do',
      label: 'Tiến Độ & Ngân Hàng Lỗi',
      icon: 'trending_up',
      matchIds: ['tien-do', 'ngan-hang-tu-loi', 'pro-upgrade']
    }
  ];

  const dialectLabels = {
    bac: '🇻🇳 Giọng Miền Bắc',
    trung: '🇻🇳 Giọng Miền Trung',
    nam: '🇻🇳 Giọng Miền Nam'
  };

  return (
    <header className="sticky top-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
      <div className="h-16 lg:h-20 w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 mx-auto flex items-center justify-between gap-3 sm:gap-4">
        {/* Brand & Dialect Selector */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <button
            aria-label="Trang chủ VietPhonics"
            onClick={() => setActiveTab('tong-quan')}
            className="flex items-center gap-2.5 group text-left cursor-pointer shrink-0"
            type="button"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-primary to-rose-500 flex items-center justify-center text-white shadow-md shadow-rose-500/20 shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-lg sm:text-xl text-primary font-black tracking-tight leading-none">
                VietPhonics<span className="text-secondary">.AI</span>
              </span>
              <span className="font-label-mono text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-0.5">
                Acoustic L1 Lab
              </span>
            </div>
          </button>

          {/* L1 Dialect Dropdown */}
          <div className="relative shrink-0 hidden lg:block">
            <button
              aria-label="Chọn thổ ngữ hiệu chuẩn"
              onClick={() => setDialectOpen(!dialectOpen)}
              className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
              type="button"
            >
              <span className="font-label-mono text-xs text-slate-700 flex items-center gap-1.5 font-semibold">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                {dialectLabels[dialect]}
              </span>
              <span className="material-symbols-outlined text-sm text-slate-400">arrow_drop_down</span>
            </button>

            {dialectOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setDialectOpen(false)} />
                <div className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 flex flex-col gap-1 z-50">
                  <div className="px-3 py-1.5 font-mono text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                    L1 Dialect Adaptation
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setDialect('bac');
                      setDialectOpen(false);
                    }}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-semibold transition ${
                      dialect === 'bac'
                        ? 'bg-rose-50 text-primary font-bold'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span>🇻🇳 Miền Bắc (/d/ ➔ /z/, âm đuôi /t/)</span>
                    {dialect === 'bac' && <span className="material-symbols-outlined text-sm text-primary">check</span>}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDialect('trung');
                      setDialectOpen(false);
                    }}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-semibold transition ${
                      dialect === 'trung'
                        ? 'bg-rose-50 text-primary font-bold'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span>🇻🇳 Miền Trung (/e/-/ɛ/ pitch offset)</span>
                    {dialect === 'trung' && <span className="material-symbols-outlined text-sm text-primary">check</span>}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDialect('nam');
                      setDialectOpen(false);
                    }}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-semibold transition ${
                      dialect === 'nam'
                        ? 'bg-rose-50 text-primary font-bold'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span>🇻🇳 Miền Nam (/v/ ➔ /j/, giữ -k/-t)</span>
                    {dialect === 'nam' && <span className="material-symbols-outlined text-sm text-primary">check</span>}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Center: 4 Consolidated Navigation Hubs */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 border border-slate-200/80 p-1 rounded-full shrink min-w-0">
          {navHubs.map((hub) => {
            const isActive = hub.matchIds.includes(activeTab);
            return (
              <button
                key={hub.id}
                type="button"
                onClick={() => setActiveTab(hub.id)}
                className={`text-xs px-3.5 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-white text-slate-900 font-bold shadow-xs border border-slate-200/60'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 font-semibold'
                }`}
              >
                <span className={`material-symbols-outlined text-base ${isActive ? 'text-primary' : 'text-slate-400'}`}>
                  {hub.icon}
                </span>
                <span>{hub.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Side: Guest Actions vs Registered Learner Badges */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {isGuest ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('chan-doan')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-primary font-bold text-xs border border-rose-200 transition cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">health_and_safety</span>
                <span>Chẩn Đoán 3 Phút</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAccountModalTab('login');
                  setShowAccountModal(true);
                }}
                className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-200 transition cursor-pointer"
              >
                Đăng Nhập
              </button>

              <button
                type="button"
                onClick={() => {
                  setAccountModalTab('register');
                  setShowAccountModal(true);
                }}
                className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-primary to-rose-600 hover:brightness-105 text-white font-bold text-xs shadow-xs transition cursor-pointer"
              >
                Đăng Ký
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1.5">
                <QuotaUsageBadge />
                <StreakBadge />
                <div className="flex items-center gap-1 px-2.5 py-1 bg-sky-50 border border-sky-200/80 rounded-full font-mono text-[11px] text-secondary font-bold">
                  <span>🛡️</span>
                  <span>{shields} Khiên</span>
                </div>
              </div>

              {/* Multi-Channel Notification Bell (OPS-104) */}
              <NotificationBellDropdown />

              {/* Account Security & Sessions */}
              <button
                onClick={() => {
                  setAccountModalTab('devices');
                  setShowAccountModal(true);
                }}
                className="p-2 rounded-full text-slate-500 hover:text-indigo-600 hover:bg-slate-100 transition cursor-pointer flex items-center justify-center border border-slate-200"
                title="Bảo mật tài khoản & Quản lý thiết bị (USER-104)"
                aria-label="Bảo mật tài khoản & Quản lý thiết bị"
                type="button"
              >
                <svg className="w-4 h-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </button>

              {/* Billing History & Receipts (PAY-106) */}
              <button
                onClick={() => setShowBillingModal(true)}
                className="p-2 rounded-full text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition cursor-pointer flex items-center justify-center border border-slate-200"
                title="Lịch sử giao dịch, biên lai & hoàn tiền (PAY-106)"
                aria-label="Lịch sử giao dịch & Biên lai"
                type="button"
              >
                <span className="material-symbols-outlined text-base text-slate-700">receipt_long</span>
              </button>

              {/* Legal & Privacy Policy (LEG-101) */}
              <button
                onClick={() => setShowLegalModal(true)}
                className="p-2 rounded-full text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition cursor-pointer flex items-center justify-center border border-slate-200"
                title="Điều khoản & Quyền riêng tư NĐ 13/2023 (LEG-101)"
                aria-label="Điều khoản & Quyền riêng tư"
                type="button"
              >
                <span className="material-symbols-outlined text-base text-slate-700">gavel</span>
              </button>

              {/* Profile Avatar / Pro Upgrade */}
              <div
                onClick={() => setShowUpgradeModal(true)}
                className="relative flex items-center justify-center p-0.5 rounded-full bg-gradient-to-tr from-primary to-secondary shadow-sm cursor-pointer group"
                title={isPro ? 'Gói Pro đã kích hoạt' : 'Nâng cấp Pro VietQR 30.000đ/tháng'}
              >
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs ring-2 ring-white">
                  {currentUser?.name ? currentUser.name.charAt(0) : 'U'}
                </div>
                <span className="absolute -bottom-1 -right-1 px-1 py-0.2 rounded-full bg-primary text-white font-mono text-[9px] font-bold uppercase ring-1 ring-white">
                  {isPro ? 'PRO' : 'FREE'}
                </span>
              </div>

              {/* Logout button */}
              <button
                onClick={logoutLearner}
                className="p-1.5 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                title="Đăng xuất"
                aria-label="Đăng xuất"
                type="button"
              >
                <span className="material-symbols-outlined text-lg">logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sub-nav for Mobile & Tablet (4 Consolidated Hubs) */}
      <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto px-4 py-2 border-t border-slate-100 bg-slate-50/90 scrollbar-none">
        {navHubs.map((hub) => {
          const isActive = hub.matchIds.includes(activeTab);
          return (
            <button
              key={hub.id}
              type="button"
              onClick={() => setActiveTab(hub.id)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition ${
                isActive
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-sm">{hub.icon}</span>
              <span>{hub.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
