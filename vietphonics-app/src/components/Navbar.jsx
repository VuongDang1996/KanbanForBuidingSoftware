import React, { useState } from 'react';
import { useApp, DIALECTS } from '../context/AppContext';

export default function Navbar() {
  const {
    activeTab,
    setActiveTab,
    dialect,
    setDialect,
    dialectConfig,
    streak,
    shields,
    isPro,
    setShowStreakModal,
    setShowDiagnosticModal,
    setShowUpgradeModal
  } = useApp();

  const [dialectMenuOpen, setDialectMenuOpen] = useState(false);

  const navLinks = [
    { id: 'tong-quan', label: 'Tổng Quan' },
    { id: 'phong-luyen-phat-am', label: 'Phòng Luyện Âm' },
    { id: 'khau-hinh-2d', label: 'Khẩu Hình 2D' },
    { id: 'ai-hoi-thoai', label: 'AI Hội Thoại' },
    { id: 'game-3d-rpg', label: 'Game 3D RPG' },
    { id: 'tien-do', label: 'Dữ Liệu IPA' },
    { id: 'ngan-hang-tu-loi', label: 'Từ Lỗi & PRO' }
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
      <div className="h-16 lg:h-20 w-full px-4 lg:px-8 max-w-[1440px] mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo & Dialect Selector */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={() => setActiveTab('tong-quan')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-rose-600 flex items-center justify-center text-white shadow-sm font-black text-sm tracking-wider">
              VP
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-lg font-black text-primary tracking-tight leading-none">
                VietPhonics<span className="text-secondary">.AI</span>
              </span>
              <span className="font-label-mono text-[9px] text-slate-500 uppercase tracking-widest mt-1">
                Acoustic L1 Lab
              </span>
            </div>
          </button>

          {/* Dialect Switcher Dropdown */}
          <div className="relative shrink-0 hidden md:block">
            <button
              onClick={() => setDialectMenuOpen(!dialectMenuOpen)}
              className="flex items-center gap-2 bg-slate-100/90 hover:bg-slate-200/90 border border-slate-200 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
              type="button"
            >
              <span className="font-label-mono text-xs text-slate-700 flex items-center gap-1.5 font-semibold">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                {dialectConfig.label}
              </span>
              <span className="material-symbols-outlined text-sm text-slate-400">arrow_drop_down</span>
            </button>

            {dialectMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setDialectMenuOpen(false)}
                />
                <div className="absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-[0_12px_32px_rgba(15,23,42,0.12)] border border-slate-200/90 p-2 flex flex-col gap-1 z-50">
                  <div className="px-2.5 py-1 font-label-mono text-[10px] text-slate-400 uppercase tracking-wider">
                    L1 Dialect Adaptation
                  </div>
                  {Object.values(DIALECTS).map((d) => (
                    <button
                      key={d.id}
                      onClick={() => {
                        setDialect(d.id);
                        setDialectMenuOpen(false);
                      }}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs font-semibold transition-colors ${
                        dialect === d.id
                          ? 'bg-sky-50 text-secondary border border-sky-100'
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span>{d.name}</span>
                        <span className="text-[10px] text-slate-400 font-normal">{d.desc.split(':')[1]}</span>
                      </div>
                      {dialect === d.id && (
                        <span className="material-symbols-outlined text-sm text-secondary">check</span>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-100/90 border border-slate-200/80 p-1 rounded-full shrink-0">
          {navLinks.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`font-body-sm text-xs px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-primary font-bold shadow-xs border border-slate-200/50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 font-medium'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Status Badges & PRO Profile */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Quick Screener CTA */}
          <button
            onClick={() => setShowDiagnosticModal(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors"
          >
            <span className="material-symbols-outlined text-sm text-primary">assessment</span>
            <span>Chẩn đoán 3 phút</span>
          </button>

          {/* Gamification Pills */}
          <button
            onClick={() => setShowStreakModal(true)}
            className="flex items-center gap-1 px-2.5 py-1 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 rounded-full font-label-mono text-xs text-primary font-bold transition-transform hover:scale-105"
            title="Nhấp để xem tiến trình chuỗi luyện tập"
          >
            <span>🔥</span>
            <span>{streak} Ngày</span>
          </button>

          <div
            className="hidden md:flex items-center gap-1 px-2.5 py-1 bg-sky-50 border border-sky-200/80 rounded-full font-label-mono text-xs text-secondary font-bold"
            title="Số Khiên đóng băng chuỗi còn lại"
          >
            <span>🛡️</span>
            <span>{shields} Khiên</span>
          </div>

          {/* PRO Upgrade Button / Badge */}
          {isPro ? (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-amber-400 to-rose-500 text-white rounded-full text-xs font-bold shadow-xs">
              <span>⭐</span>
              <span>PRO Active</span>
            </div>
          ) : (
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary hover:bg-rose-700 text-white text-xs font-bold shadow-xs transition-transform hover:scale-105"
            >
              <span className="material-symbols-outlined text-sm">lock_open</span>
              <span>Mở PRO 30K</span>
            </button>
          )}

          {/* User Avatar */}
          <div
            onClick={() => setShowUpgradeModal(true)}
            className="relative flex items-center justify-center p-0.5 rounded-full bg-gradient-to-tr from-primary to-secondary shadow-xs cursor-pointer hover:ring-2 hover:ring-primary/40 transition-all"
            title="Tài khoản học viên"
          >
            <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-700">
              VN
            </div>
            <span className="absolute -bottom-1 -right-1 px-1 py-0.2 rounded-full bg-primary text-white font-label-mono text-[8px] font-bold uppercase ring-1 ring-white">
              {isPro ? 'PRO' : 'FREE'}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="xl:hidden flex items-center gap-2 overflow-x-auto px-4 py-2 border-t border-slate-100 bg-slate-50/70 scrollbar-none">
        {navLinks.map((item) => (
          <button
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
