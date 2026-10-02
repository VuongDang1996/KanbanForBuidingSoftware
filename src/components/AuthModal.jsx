import React, { useState } from 'react';
import {
  User,
  Mail,
  Lock,
  Sparkles,
  Flame,
  Award,
  CheckCircle2,
  X,
  LogIn,
  UserPlus,
  ArrowRight,
  ShieldCheck,
  Target
} from 'lucide-react';

export const DEMO_USERS = [
  {
    id: 'user-tuan-anh',
    name: 'Nguyễn Tuấn Anh',
    email: 'tuananh.dev@vietphonics.ai',
    avatar: '🧙‍♂️',
    role: 'IT Software Engineer @ FPT Software',
    target: 'Giao tiếp dự án quốc tế & IELTS 7.0',
    accentRegion: 'Hà Nội (Bắc)',
    level: 5,
    xp: 2450,
    streak: 7,
    overallScore: 76,
    soundMastery: {
      endingSounds: 82,
      minimalPairs: 71,
      stressCadence: 68,
      connectedSpeech: 59
    }
  },
  {
    id: 'user-mai-phuong',
    name: 'Trần Thị Mai Phương',
    email: 'phuong.ftu@vietphonics.ai',
    avatar: '👩‍🎓',
    role: 'Sinh viên Ngoại Thương (FTU)',
    target: 'Chinh phục IELTS Speaking 8.0 & Du học',
    accentRegion: 'TP. Hồ Chí Minh (Nam)',
    level: 7,
    xp: 4890,
    streak: 18,
    overallScore: 88,
    soundMastery: {
      endingSounds: 94,
      minimalPairs: 89,
      stressCadence: 85,
      connectedSpeech: 84
    }
  }
];

export default function AuthModal({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout
}) {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register' | 'switch'
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [targetGoal, setTargetGoal] = useState('IELTS 7.0+');
  const [accentRegion, setAccentRegion] = useState('Miền Bắc (Hà Nội)');

  if (!isOpen) return null;

  const handleCustomRegister = (e) => {
    e.preventDefault();
    if (!nameInput.trim()) return;

    const newUser = {
      id: 'user-' + Date.now(),
      name: nameInput.trim(),
      email: emailInput.trim() || `${nameInput.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      avatar: '🌟',
      role: 'Học viên VietPhonics AI',
      target: targetGoal,
      accentRegion,
      level: 1,
      xp: 150,
      streak: 1,
      overallScore: 65,
      soundMastery: {
        endingSounds: 60,
        minimalPairs: 55,
        stressCadence: 50,
        connectedSpeech: 45
      }
    };

    onLogin(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">
                {currentUser ? 'Hồ Sơ Học Viên' : 'Đăng Nhập VietPhonics'}
              </h3>
              <p className="text-xs text-slate-400">
                {currentUser ? 'Quản lý tài khoản & mục tiêu cá nhân' : 'Theo dõi tiến độ phát âm & lịch sử thu âm'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current User Card if Logged in */}
        {currentUser && (
          <div className="p-4 rounded-2xl bg-slate-950 border border-indigo-500/30 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-950 border border-indigo-400/50 flex items-center justify-center text-2xl">
                {currentUser.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white truncate">{currentUser.name}</h4>
                  <span className="text-[10px] px-1.5 py-0.2 bg-amber-500 text-slate-950 font-black rounded">
                    LV {currentUser.level}
                  </span>
                </div>
                <p className="text-xs text-slate-400 truncate">{currentUser.email}</p>
                <p className="text-[10px] text-indigo-400 font-medium">{currentUser.role}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-xs">
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Mục tiêu phát âm:</span>
                <span className="text-amber-300 font-bold text-xs truncate block">{currentUser.target}</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Chuỗi Streak:</span>
                <span className="text-rose-400 font-bold text-xs flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-rose-400" />
                  <span>{currentUser.streak} ngày liên tục</span>
                </span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  onLogout();
                  setActiveTab('login');
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-300 text-xs font-semibold"
              >
                Đăng Xuất
              </button>
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md"
              >
                Xem Tiến Độ Chi Tiết
              </button>
            </div>
          </div>
        )}

        {/* Quick Demo Switcher */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Chọn tài khoản Demo kiểm thử nhanh:
          </span>
          <div className="space-y-2">
            {DEMO_USERS.map((demo) => {
              const isSelected = currentUser?.id === demo.id;
              return (
                <button
                  key={demo.id}
                  onClick={() => {
                    onLogin(demo);
                    onClose();
                  }}
                  className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-indigo-950/60 border-indigo-500 text-white ring-2 ring-indigo-500/20'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{demo.avatar}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{demo.name}</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono">
                          LV.{demo.level}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 block">{demo.role}</span>
                      <span className="text-[10px] text-indigo-400 font-semibold">{demo.target}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-emerald-400 font-mono block">
                      {demo.overallScore}%
                    </span>
                    <span className="text-[9px] text-slate-500">Điểm phát âm</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Registration / Login Form Toggle */}
        {!currentUser && (
          <form onSubmit={handleCustomRegister} className="pt-2 border-t border-slate-800 space-y-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Hoặc tạo tài khoản mới:
            </span>

            <div>
              <input
                type="text"
                placeholder="Họ và tên của bạn..."
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <select
                value={targetGoal}
                onChange={(e) => setTargetGoal(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
              >
                <option value="IELTS 7.0+">IELTS 7.0+</option>
                <option value="Giao tiếp IT Công sở">Giao tiếp IT Công sở</option>
                <option value="Phỏng vấn việc làm quốc tế">Phỏng vấn việc làm</option>
                <option value="Xóa mất gốc âm đuôi">Xóa mất gốc âm đuôi</option>
              </select>

              <select
                value={accentRegion}
                onChange={(e) => setAccentRegion(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
              >
                <option value="Miền Bắc (Hà Nội)">Giọng Miền Bắc</option>
                <option value="Miền Nam (Sài Gòn)">Giọng Miền Nam</option>
                <option value="Miền Trung (Đà Nẵng/Huế)">Giọng Miền Trung</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg transition-all"
            >
              Tạo Hồ Sơ & Bắt Đầu Học
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
