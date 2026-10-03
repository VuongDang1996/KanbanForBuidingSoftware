import React from 'react';
import { useApp } from '../context/AppContext';

export default function StreakModal() {
  const { streak, shields, showStreakModal, setShowStreakModal } = useApp();

  if (!showStreakModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 flex flex-col items-center text-center">
        {/* Close Button */}
        <button
          onClick={() => setShowStreakModal(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Big Flame Icon with Glow */}
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-rose-600 flex items-center justify-center text-5xl shadow-[0_10px_30px_rgba(244,63,94,0.4)] animate-bounce">
            🔥
          </div>
          <div className="absolute -inset-2 bg-rose-400/20 rounded-full blur-xl -z-10" />
        </div>

        <span className="px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-primary font-mono text-xs font-bold uppercase tracking-wider mb-2">
          Streak Milestones Unlocked
        </span>

        <h3 className="text-2xl font-black text-slate-900 tracking-tight">
          Chuỗi Luyện Tập: {streak} Ngày!
        </h3>

        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          Xuất sắc! Bạn đã duy trì phản xạ phát âm tiếng Anh chuẩn liên tục 14 ngày. Cơ lưỡi và vòm họng của bạn đang hình thành phản xạ tự nhiên.
        </p>

        {/* Shield Status Card */}
        <div className="w-full mt-6 p-4 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-between text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-sky-200 text-secondary flex items-center justify-center text-xl shadow-xs">
              🛡️
            </div>
            <div>
              <span className="font-bold text-sm text-slate-900 block">Khiên Đóng Băng Chuỗi</span>
              <span className="text-xs text-slate-500">Tự động bảo vệ streak nếu bạn bận 1 ngày</span>
            </div>
          </div>
          <span className="text-base font-black text-secondary font-mono">
            {shields} / 2
          </span>
        </div>

        {/* 7-Day Visual Calendar */}
        <div className="w-full mt-5">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 block">
            Lịch sử tuần này
          </span>
          <div className="grid grid-cols-7 gap-2">
            {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day, idx) => {
              const isToday = idx === 3;
              const isDone = idx <= 3;
              return (
                <div
                  key={day}
                  className={`flex flex-col items-center py-2.5 rounded-xl border text-xs font-mono font-bold transition-all ${
                    isDone
                      ? 'bg-rose-50 border-rose-200 text-primary'
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  } ${isToday ? 'ring-2 ring-primary ring-offset-1' : ''}`}
                >
                  <span className="text-[10px] text-slate-500 mb-1">{day}</span>
                  <span>{isDone ? '🔥' : '○'}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => setShowStreakModal(false)}
          className="w-full mt-6 py-3.5 rounded-2xl bg-gradient-to-r from-primary to-rose-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all hover:brightness-105"
        >
          Tiếp Tục Chinh Phục Ngày Hôm Nay
        </button>
      </div>
    </div>
  );
}
