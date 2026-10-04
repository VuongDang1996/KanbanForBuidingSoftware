import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import StreakBadge from './gamification/StreakBadge';

export default function Navbar() {
  const {
    activeTab,
    setActiveTab,
    dialect,
    setDialect,
    streak,
    shields,
    isPro,
    setShowStreakModal,
    setShowDiagnosticModal,
    setShowUpgradeModal
  } = useApp();

  const [dialectOpen, setDialectOpen] = useState(false);

  const navItems = [
    { id: 'tong-quan', label: 'Tổng Quan' },
    { id: 'phong-luyen-phat-am', label: 'Phòng Luyện Phát Âm' },
    { id: 'khau-hinh-2d', label: 'Khẩu Hình & Webcam AI' },
    { id: 'mastery-lab', label: 'Mastery Lab' },
    { id: 'ai-lab', label: 'AI Speech Lab' },
    { id: 'ai-hoi-thoai', label: 'AI Hội Thoại' },
    { id: 'game-3d-rpg', label: 'Game 3D RPG' },
    { id: 'ngan-hang-tu-loi', label: 'Ngân Hàng Từ Lỗi' },
    { id: 'tien-do', label: 'Tiến Độ & Phân Tích' }
  ];

  const dialectLabels = {
    bac: '🇻🇳 Giọng Miền Bắc: /d/-/z/ calibrated',
    trung: '🇻🇳 Giọng Miền Trung: /e/-/ɛ/ tonal pitch',
    nam: '🇻🇳 Giọng Miền Nam: /v/ ➔ /j/, dropped -k/-t'
  };

  return (
    <header className="sticky top-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
      <div className="h-16 lg:h-20 w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand & Dialect */}
        <div className="flex items-center gap-space-sm sm:gap-space-md shrink-0">
          <button aria-label="Trang chủ VietPhonics"
            onClick={() => setActiveTab('tong-quan')}
            className="flex items-center gap-2 group text-left cursor-pointer shrink-0"
            type="button"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-rose-500 flex items-center justify-center text-white shadow-md shadow-rose-500/20 shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
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
            <button aria-label="Nút tương tác"
              onClick={() => setDialectOpen(!dialectOpen)}
              className="flex items-center gap-space-xs bg-slate-100 hover:bg-slate-200/80 border border-slate-200 px-space-sm py-1.5 rounded-full transition-colors cursor-pointer"
              type="button"
            >
              <span className="font-label-mono text-label-mono text-slate-700 flex items-center gap-1.5 font-semibold">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                {dialectLabels[dialect]}
              </span>
              <span className="material-symbols-outlined text-sm text-slate-400">arrow_drop_down</span>
            </button>

            {dialectOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setDialectOpen(false)} />
                <div className="absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-[0_12px_32px_rgba(15,23,42,0.12)] border border-slate-200/90 p-space-xs flex flex-col gap-1 z-50">
                  <div className="px-space-sm py-1 font-label-mono text-[10px] text-slate-400 uppercase tracking-wider">
                    L1 Dialect Adaptation
                  </div>
                  <button aria-label="Nút tương tác" type="button"
                    onClick={() => {
                      setDialect('bac');
                      setDialectOpen(false);
                    }}
                    className={`flex items-center justify-between px-space-sm py-2 rounded-lg text-left font-body-sm font-semibold transition-colors ${
                      dialect === 'bac'
                        ? 'bg-sky-50 text-secondary'
                        : 'hover:bg-slate-100 text-slate-600'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>🇻🇳</span> Miền Bắc (/d/ ➔ /z/, /t/ ending)
                    </span>
                    {dialect === 'bac' && (
                      <span className="material-symbols-outlined text-sm text-secondary">check</span>
                    )}
                  </button>

                  <button aria-label="Nút tương tác" type="button"
                    onClick={() => {
                      setDialect('trung');
                      setDialectOpen(false);
                    }}
                    className={`flex items-center justify-between px-space-sm py-2 rounded-lg text-left font-body-sm font-semibold transition-colors ${
                      dialect === 'trung'
                        ? 'bg-sky-50 text-secondary'
                        : 'hover:bg-slate-100 text-slate-600'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>🇻🇳</span> Miền Trung (/e/-/ɛ/ tonal pitch)
                    </span>
                    {dialect === 'trung' && (
                      <span className="material-symbols-outlined text-sm text-secondary">check</span>
                    )}
                  </button>

                  <button aria-label="Nút tương tác" type="button"
                    onClick={() => {
                      setDialect('nam');
                      setDialectOpen(false);
                    }}
                    className={`flex items-center justify-between px-space-sm py-2 rounded-lg text-left font-body-sm font-semibold transition-colors ${
                      dialect === 'nam'
                        ? 'bg-sky-50 text-secondary'
                        : 'hover:bg-slate-100 text-slate-600'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>🇻🇳</span> Miền Nam (/v/ ➔ /j/, dropped -k/-t)
                    </span>
                    {dialect === 'nam' && (
                      <span className="material-symbols-outlined text-sm text-secondary">check</span>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-100/90 border border-slate-200/80 p-1 rounded-full shrink min-w-0">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button aria-label="Chuyển phân hệ học" type="button"
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`font-body-sm text-xs px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-primary font-bold shadow-sm border border-slate-200/50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 font-medium'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Status Counters & Profile */}
        <div className="flex items-center gap-space-sm shrink-0">
          <div className="hidden md:flex items-center gap-space-xs">
            <StreakBadge />
            <div className="flex items-center gap-1 px-3 py-1 bg-sky-50 border border-sky-200/80 rounded-full font-label-mono text-label-mono text-secondary font-bold">
              <span className="text-xs">🛡️</span>
              <span>{shields} Khiên</span>
            </div>
            <div className="hidden 2xl:flex items-center gap-1 px-3 py-1 bg-indigo-50 border border-indigo-200/80 rounded-full font-label-mono text-label-mono text-tertiary font-bold">
              <span className="text-xs">⭐</span>
              <span>Lv.8 Master of Ending Sounds</span>
            </div>
          </div>

          <div
            onClick={() => setShowUpgradeModal(true)}
            className="relative flex items-center justify-center p-0.5 rounded-full bg-gradient-to-tr from-primary to-secondary shadow-md cursor-pointer group"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHtiGkMW_bAiVzUucj4w1pSTyoUmgY825vfdXITJv58g5VF-Z_u6RjPzdnhlZFADwCrMLXHraynwzk8Stxdwaw3LNoL-JczEGc9hADocs8sqV6iq4vQvD0Tj7MVgl5X1O792UHUG3m9s72dhJEbsafsRfJbpJYqAQJMKs2BZQvA0Rw0cC6LWuB41m9iU-abrgZHPfwmc64qayjq2GpPH5BgTYB7Uk1_d0jQCjjPNtwFKYn5mqLJaQz"
            />
            <span className="absolute -bottom-1 -right-1 px-1 py-0.2 rounded-full bg-primary text-white font-label-mono text-[9px] font-bold tracking-tighter uppercase ring-1 ring-white">
              {isPro ? 'PRO' : 'FREE'}
            </span>
          </div>
        </div>
      </div>

      {/* Sub-nav for mobile */}
      <div className="xl:hidden flex items-center gap-2 overflow-x-auto px-4 py-2 border-t border-slate-100 bg-slate-50/80 scrollbar-none">
        {navItems.map((item) => (
          <button aria-label="Chuyển phân hệ học" type="button"
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-semibold ${
              activeTab === item.id
                ? 'bg-primary text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
}
