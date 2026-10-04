import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function GuestWelcomeHero({ onPreviewDashboard }) {
  const {
    dialect,
    setDialect,
    dialectConfig,
    setActiveTab,
    setShowDiagnosticModal,
    setShowAccountModal,
    setAccountModalTab
  } = useApp();

  const [demoPlaying, setDemoPlaying] = useState(false);
  const [demoEvaluated, setDemoEvaluated] = useState(false);

  const playDemoWord = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance('Six months ago');
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      utterance.onstart = () => setDemoPlaying(true);
      utterance.onend = () => {
        setDemoPlaying(false);
        setDemoEvaluated(true);
      };
      window.speechSynthesis.speak(utterance);
    } else {
      setDemoEvaluated(true);
    }
  };

  const dialectOptions = [
    {
      id: 'bac',
      title: '🇻🇳 Giọng Miền Bắc',
      subtitle: 'Hà Nội & Bắc Bộ',
      calib: 'Calibrated: /d/➔/z/, âm đuôi /t/-/d/, triệt tiêu l/n'
    },
    {
      id: 'trung',
      title: '🇻🇳 Giọng Miền Trung',
      subtitle: 'Nghệ An, Huế, Đà Nẵng',
      calib: 'Calibrated: Giải phóng nén thanh quản, mở rộng /e/-/ɛ/'
    },
    {
      id: 'nam',
      title: '🇻🇳 Giọng Miền Nam',
      subtitle: 'Sài Gòn & Nam Bộ',
      calib: 'Calibrated: /v/➔/j/, giữ âm đuôi khép miệng /p/, /k/, /t/'
    }
  ];

  return (
    <div className="w-full bg-gradient-to-b from-white via-slate-50/60 to-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-[0_12px_40px_rgba(15,23,42,0.06)] relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute -right-24 -top-24 w-96 h-96 bg-rose-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-24 -bottom-24 w-96 h-96 bg-sky-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-8 max-w-5xl mx-auto">
        {/* Top Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-primary font-label-mono text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span>AI ACOUSTIC ENGINE • TINH CHỈNH THEO THỔ NGỮ VIỆT</span>
          </div>

          {onPreviewDashboard && (
            <button
              onClick={onPreviewDashboard}
              type="button"
              className="text-xs font-semibold text-slate-500 hover:text-indigo-600 transition flex items-center gap-1 cursor-pointer bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs"
            >
              <span>Xem trước Dashboard Học Viên</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          )}
        </div>

        {/* Hero Title & Subtitle */}
        <div className="flex flex-col gap-4 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Chẩn Đoán &amp; Triệt Tiêu <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-primary via-rose-600 to-indigo-600 bg-clip-text text-transparent">
              Lỗi Nuốt Âm Đuôi Tiếng Anh
            </span>{' '}
            Bằng AI Âm Học
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Hệ thống AI đầu tiên tại Việt Nam phân tách sóng âm theo thổ ngữ 3 miền, nhận diện chính xác
            bẫy nuốt cụm phụ âm <code className="text-primary font-mono font-bold bg-rose-50 px-1.5 py-0.5 rounded">/-ks/</code>,{' '}
            <code className="text-primary font-mono font-bold bg-rose-50 px-1.5 py-0.5 rounded">/-nθs/</code> và
            lệch khẩu hình chỉ trong <strong>120ms</strong>.
          </p>
        </div>

        {/* Dialect Quick-Calibration Selector */}
        <div className="flex flex-col gap-3 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="font-label-mono text-xs uppercase tracking-wider font-bold text-slate-700 flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-secondary">tune</span>
              Bước 1: Chọn thổ ngữ mẹ đẻ của bạn để AI hiệu chuẩn ma trận âm học
            </span>
            <span className="text-xs text-slate-400 font-mono hidden md:inline">L1 Transfer Matrix</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {dialectOptions.map((opt) => {
              const isSelected = dialect === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setDialect(opt.id)}
                  className={`p-3.5 rounded-xl text-left transition-all border cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-rose-50/70 border-rose-300 ring-2 ring-rose-200/50 shadow-xs'
                      : 'bg-slate-50/70 hover:bg-slate-100/80 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">{opt.title}</span>
                    {isSelected && (
                      <span className="material-symbols-outlined text-base text-primary">check_circle</span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium mt-1">{opt.subtitle}</span>
                  <p className="text-[10px] text-slate-600 font-mono mt-2 pt-2 border-t border-slate-200/60 leading-tight">
                    {opt.calib}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="text-xs text-secondary bg-sky-50 px-3 py-2 rounded-lg border border-sky-100 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">info</span>
            <span>
              <strong>Hiệu chuẩn hiện tại:</strong> {dialectConfig?.tip}
            </span>
          </div>
        </div>

        {/* Live Audio Acoustic Demo Preview */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 rounded-2xl shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-2 w-full lg:w-3/5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-rose-500 text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                Demo Âm Học Trực Tiếp
              </span>
              <span className="text-xs text-slate-400 font-mono">Bẫy nuốt âm điển hình</span>
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono tracking-tight text-white flex items-center gap-2">
              <span>“Six</span>
              <span className="text-rose-400 underline decoration-rose-500 decoration-2">months</span>
              <span>ago...”</span>
              <span className="text-xs text-slate-400 font-normal font-sans">/sɪks mʌnθs əˈɡoʊ/</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Người Việt thường nuốt âm <strong className="text-rose-300">/θ/</strong> và rơi mất{' '}
              <strong className="text-rose-300">/s/</strong> đuôi (nói thành <em>"mân-tờ"</em>). AI sẽ cảnh báo và mô phỏng vị trí kẹp lưỡi chuẩn 2D.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
            <button
              onClick={playDemoWord}
              type="button"
              className={`w-full sm:w-auto px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer ${
                demoPlaying
                  ? 'bg-rose-500 text-white ring-4 ring-rose-400/30 animate-pulse'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
            >
              <span className="material-symbols-outlined text-base">
                {demoPlaying ? 'volume_up' : 'play_circle'}
              </span>
              <span>{demoPlaying ? 'Đang phát mẫu...' : 'Nghe Phát Âm Chuẩn'}</span>
            </button>

            <button
              onClick={() => setActiveTab('phong-luyen-phat-am')}
              type="button"
              className="w-full sm:w-auto px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-rose-600 hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">mic</span>
              <span>Luyện Thử Với Micro</span>
            </button>
          </div>
        </div>

        {/* Primary Call-to-Actions for Guest */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 pt-2">
          <button
            onClick={() => setActiveTab('chan-doan')}
            type="button"
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-primary via-rose-600 to-indigo-600 text-white font-black text-base shadow-lg shadow-rose-600/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer group"
          >
            <span className="material-symbols-outlined text-2xl group-hover:animate-bounce">
              health_and_safety
            </span>
            <span>BẮT ĐẦU CHẨN ĐOÁN LỖI PHÁT ÂM 3 PHÚT (MIỄN PHÍ)</span>
            <span className="material-symbols-outlined text-xl">arrow_forward</span>
          </button>

          <button
            onClick={() => {
              setAccountModalTab('login');
              setShowAccountModal(true);
            }}
            type="button"
            className="px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-sm shadow-xs hover:border-slate-400 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl text-indigo-600">login</span>
            <span>Đăng Nhập / Đăng Ký Tài Khoản</span>
          </button>
        </div>

        {/* 4 Core Pillars Benefit Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-slate-200/80">
          <div className="flex items-center gap-2.5 p-2 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-lg">bolt</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-800">&lt; 120ms Latency</span>
              <span className="text-[10px] text-slate-500">Phản hồi sóng âm thời gian thực</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-secondary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-lg">videocam</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-800">Khẩu hình 2D &amp; Webcam</span>
              <span className="text-[10px] text-slate-500">Mô phỏng cơ học vòm họng &amp; môi</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-lg">analytics</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-800">Dự đoán IELTS 5.0 - 8.5</span>
              <span className="text-[10px] text-slate-500">Quy đổi từ điểm âm học GOP</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-lg">qr_code_2</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-800">VietQR Napas 24/7</span>
              <span className="text-[10px] text-slate-500">30.000đ/tháng • Kích hoạt tức thì</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
