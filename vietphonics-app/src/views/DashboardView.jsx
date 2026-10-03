import React from 'react';
import { useApp } from '../context/AppContext';

export default function DashboardView() {
  const {
    dialectConfig,
    gopScore,
    streak,
    triggerPractice,
    setActiveTab,
    setShowDiagnosticModal,
    errorWords
  } = useApp();

  const playAudioWord = (word) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const currentFocusPractice = {
    id: 'step-02',
    word: 'Months',
    sentence: 'Six months ago, she baked fresh bread for breakfast on the street.',
    ipa: '/sɪks mʌnθs əˈɡoʊ, ʃi beɪkt freʃ bred fɔːr ˈbrekfəst ɒn ðə striːt/',
    targetPhonemes: ['/ks/', '/nθs/', '/kt/', '/st/'],
    difficulty: 'Intermediate',
    trap: 'Rụng âm đuôi -ed và nuốt cụm /ks/, /nθs/'
  };

  return (
    <div className="w-full flex flex-col gap-6 py-4 animate-fade-in">
      {/* Top Strategic Status & Audio Engine Telemetry Bar */}
      <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-white border border-slate-200/80 p-4 rounded-2xl shadow-[0_2px_8px_rgba(15,23,42,0.03)]">
        <div className="flex items-center gap-3 flex-wrap text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(2,132,199,0.5)] animate-pulse" />
            <span className="font-mono text-slate-800 uppercase tracking-wider font-bold">
              Acoustic Engine v4.2 Ready
            </span>
          </div>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-slate-500">Mô hình L1:</span>
            <span className="font-mono text-secondary px-2 py-0.5 rounded bg-sky-50 border border-sky-100 font-semibold">
              {dialectConfig.name} ({dialectConfig.f0Mean})
            </span>
          </div>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <div className="flex items-center gap-1.5 font-mono text-primary font-semibold">
            <span className="material-symbols-outlined text-sm">mic</span>
            <span>Web Audio 44.1kHz • 24-bit Float</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs self-end lg:self-auto">
          <button
            onClick={() => setShowDiagnosticModal(true)}
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-rose-50 hover:bg-rose-100 border border-rose-200 text-primary font-bold transition-colors"
          >
            <span className="material-symbols-outlined text-sm">tune</span>
            <span>Chẩn đoán L1 lại</span>
          </button>
          <span className="px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 font-mono text-indigo-700 font-semibold">
            Buổi #48
          </span>
        </div>
      </div>

      {/* 4-Pillar Vietnamese Phonetic Radar & High-Echelon Diagnostic Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Card: 4-Pillar Breakdown (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-2xl p-6 flex flex-col justify-between shadow-[0_4px_16px_rgba(15,23,42,0.04)] relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-rose-50/70 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col gap-4 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-rose-50 text-primary border border-rose-100">
                  <span className="material-symbols-outlined text-xl">graphic_eq</span>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest font-semibold block">
                    Acoustic Diagnostic
                  </span>
                  <h2 className="text-lg text-slate-900 font-extrabold">
                    4 Trụ Cột Ngữ Âm L1 Việt
                  </h2>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200/70 font-mono text-xs text-secondary font-semibold">
                Dynamic Matrix
              </span>
            </div>

            {/* 4 Pillars Breakdown */}
            <div className="flex flex-col gap-3 mt-1">
              {/* Pillar 1 */}
              <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
                    <span className="font-bold text-slate-800">1. Âm Đuôi & Cụm Phụ Âm</span>
                    <span className="font-mono text-slate-400">/ks/, /st/, /t/, /d/</span>
                  </div>
                  <span className="font-mono text-emerald-600 font-bold">82%</span>
                </div>
                <div className="w-full bg-slate-200/70 h-2 rounded-full overflow-hidden flex">
                  <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000" style={{ width: '82%' }} />
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.5)]" />
                    <span className="font-bold text-slate-800">2. Cặp Âm Dễ Nhầm</span>
                    <span className="font-mono text-slate-400">/θ/-/t/, /iː/-/ɪ/, /l/-/n/</span>
                  </div>
                  <span className="font-mono text-amber-600 font-bold">71%</span>
                </div>
                <div className="w-full bg-slate-200/70 h-2 rounded-full overflow-hidden flex">
                  <div className="bg-amber-500 h-full rounded-full transition-all duration-1000" style={{ width: '71%' }} />
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.5)]" />
                    <span className="font-bold text-slate-800">3. Trọng Âm & Nhịp Điệu</span>
                    <span className="font-mono text-slate-400">Stress & Cadence</span>
                  </div>
                  <span className="font-mono text-amber-600 font-bold">68%</span>
                </div>
                <div className="w-full bg-slate-200/70 h-2 rounded-full overflow-hidden flex">
                  <div className="bg-amber-500 h-full rounded-full transition-all duration-1000" style={{ width: '68%' }} />
                </div>
              </div>

              {/* Pillar 4 (Focus Alert) */}
              <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-rose-50/50 border border-rose-100 hover:border-rose-200 transition-colors">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.5)] animate-pulse" />
                    <span className="font-bold text-slate-800">4. Nối Âm & Lướt Âm</span>
                    <span className="font-mono text-rose-600 font-bold">Mục tiêu ưu tiên</span>
                  </div>
                  <span className="font-mono text-rose-600 font-bold">59%</span>
                </div>
                <div className="w-full bg-slate-200/70 h-2 rounded-full overflow-hidden flex">
                  <div className="bg-rose-500 h-full rounded-full transition-all duration-1000" style={{ width: '59%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Dialect Tip Footer Card */}
          <div className="mt-4 p-3 rounded-xl bg-sky-50/70 border border-sky-100 flex items-start gap-2.5">
            <span className="material-symbols-outlined text-secondary text-lg mt-0.5 shrink-0">lightbulb</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong className="text-secondary font-bold">{dialectConfig.name}:</strong> {dialectConfig.tip}
            </p>
          </div>
        </div>

        {/* Center Card: Overall GOP Score & Benchmarks (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-2xl p-6 flex flex-col justify-between shadow-[0_4px_16px_rgba(15,23,42,0.04)] relative overflow-hidden">
          <div className="absolute -left-16 bottom-0 w-48 h-48 bg-sky-50/80 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                Global Index
              </span>
              <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-50 border border-sky-100 font-mono text-xs text-secondary font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <span>Normalized</span>
              </div>
            </div>
            <h2 className="text-lg text-slate-900 font-extrabold mt-1">Acoustic GOP Score</h2>
          </div>

          {/* Neon Cyan Circular Dial Display */}
          <div className="py-2 flex flex-col items-center justify-center relative">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
                <circle
                  className="text-slate-100"
                  cx="80"
                  cy="80"
                  fill="transparent"
                  r="68"
                  stroke="currentColor"
                  strokeWidth="12"
                />
                <circle
                  className="text-secondary transition-all duration-1000"
                  cx="80"
                  cy="80"
                  fill="transparent"
                  r="68"
                  stroke="currentColor"
                  strokeDasharray="427.25"
                  strokeDashoffset={427.25 - (427.25 * gopScore) / 100}
                  strokeLinecap="round"
                  strokeWidth="12"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-black text-slate-900 leading-none tracking-tighter">
                  {gopScore}
                </span>
                <span className="font-mono text-xs text-secondary tracking-widest mt-1 uppercase font-bold">
                  /100 GOP
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 font-mono text-xs text-primary font-semibold">
              <span>🔥 Chuỗi {streak} Ngày:</span>
              <span className="font-bold text-slate-800">+4% Độ chuẩn tuần này</span>
            </div>
          </div>

          {/* Predicted Exam Benchmarks */}
          <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center relative">
            <div className="flex flex-col p-2 rounded-lg bg-white border border-slate-200/60 shadow-xs">
              <span className="font-mono text-xs text-slate-500 font-semibold">IELTS</span>
              <span className="text-lg text-secondary font-black">7.0</span>
              <span className="font-mono text-[9px] text-slate-400">Speaking</span>
            </div>
            <div className="flex flex-col p-2 rounded-lg bg-white border border-slate-200/60 shadow-xs">
              <span className="font-mono text-xs text-slate-500 font-semibold">CEFR</span>
              <span className="text-lg text-primary font-black">B2+</span>
              <span className="font-mono text-[9px] text-slate-400">Upper Inter.</span>
            </div>
            <div className="flex flex-col p-2 rounded-lg bg-white border border-slate-200/60 shadow-xs">
              <span className="font-mono text-xs text-slate-500 font-semibold">TOEIC</span>
              <span className="text-lg text-indigo-600 font-black">160</span>
              <span className="font-mono text-[9px] text-slate-400">/ 200 PTS</span>
            </div>
          </div>
        </div>

        {/* Right Card: Habit Telemetry & Cadence (3 cols) */}
        <div className="lg:col-span-3 bg-white border border-slate-200/80 rounded-2xl p-6 flex flex-col justify-between shadow-[0_4px_16px_rgba(15,23,42,0.04)]">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                Habit Telemetry
              </span>
              <span className="material-symbols-outlined text-primary text-xl">insights</span>
            </div>
            <h2 className="text-lg text-slate-900 font-extrabold mt-1">Chỉ Số Khử Lỗi L1</h2>
          </div>

          <div className="flex flex-col gap-3 py-2">
            {/* Metric 1: Tone Flattening */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Flat Tone Transfer</span>
                <span className="font-mono text-emerald-600 font-bold">-42%</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-slate-900">0.58</span>
                <span className="font-mono text-[10px] text-slate-500">Tonal Variance (StDev)</span>
              </div>
              <p className="font-mono text-[10px] text-secondary font-medium">
                Đã giảm rung ngữ điệu kiểu thanh điệu tiếng Việt
              </p>
            </div>

            {/* Metric 2: Cadence Tracker */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Tốc Độ Nói (Cadence)</span>
                <span className="material-symbols-outlined text-base text-secondary">speed</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-secondary">135</span>
                <span className="font-mono text-xs text-slate-500">WPM (Chuẩn Quốc Tế)</span>
              </div>
              <div className="w-full bg-slate-200/70 h-1.5 rounded-full overflow-hidden mt-1">
                <div className="bg-secondary h-full rounded-full" style={{ width: '75%' }} />
              </div>
            </div>

            {/* Metric 3: Daily Target Gauge */}
            <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-mono text-xs text-emerald-700 font-semibold">Mục Tiêu Hôm Nay</span>
                <span className="text-sm font-bold text-slate-900">10 / 10 Phút Luyện</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-lg">check_circle</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('tien-do')}
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition-colors font-mono text-xs font-semibold flex items-center justify-center gap-1.5"
            type="button"
          >
            <span>Xem Phân Tích Âm Phổ Chi Tiết</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Primary Section: 10-Minute Daily Personalized Curriculum Path */}
      <div className="w-full bg-white border border-slate-200/90 rounded-2xl p-6 lg:p-8 shadow-[0_6px_24px_rgba(15,23,42,0.05)] flex flex-col gap-6 relative overflow-hidden">
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-96 h-96 bg-rose-50 rounded-full blur-[100px] pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 relative">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 font-mono text-xs text-primary uppercase tracking-widest font-bold">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <span>AI Neural Progression • 10 Phút Tối Ưu</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Lộ Trình Tinh Chỉnh Phản Xạ Hôm Nay
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              Được cá nhân hóa sau khi phân tích 18 câu bạn đọc hôm qua. Tập trung triệt tiêu hiện tượng nuốt âm đuôi và làm mềm cơ lưỡi.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <div className="px-3.5 py-1.5 rounded-xl bg-sky-50 border border-sky-100 font-mono text-xs text-secondary font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-base">timer</span>
              <span>Tổng thời gian: 10 Phút</span>
            </div>
          </div>
        </div>

        {/* 3-Step Connected Dynamic Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 relative">
          {/* Step 1: Completed */}
          <div className="relative bg-slate-50 border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between gap-4 z-10 transition-all hover:border-slate-300 group shadow-xs">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-2xl font-bold">check</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-xs font-bold">
                  2 Mins • Xong
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs text-emerald-600 uppercase tracking-wider font-bold">
                  Step 01 • Khởi Động Âm Yếu
                </span>
                <h3 className="text-base text-slate-900 mt-1 font-bold group-hover:text-secondary transition-colors">
                  Luyện âm răng vô thanh /θ/
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Tập trung 5 từ mẫu hay lẫn lộn: <span className="font-mono text-slate-900 font-semibold">think, thank, breath, tooth, method</span>.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-slate-200/60">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-slate-500">Kết quả phân tích:</span>
                <span className="text-emerald-600 font-bold">92% GOP (Chuẩn B2+)</span>
              </div>
              <div className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200/70 font-mono text-xs text-slate-800 flex items-center justify-between">
                <span className="text-slate-500">Độ hở đầu lưỡi:</span>
                <span className="text-secondary font-bold">Khẩu hình 2.5mm</span>
              </div>
            </div>
          </div>

          {/* Step 2: ACTIVE & PULSING (Core Focus) */}
          <div className="relative bg-white border-2 border-rose-400 rounded-2xl p-5 flex flex-col justify-between gap-4 z-10 shadow-[0_10px_30px_rgba(225,29,72,0.12)] transition-all hover:scale-[1.01] group cursor-pointer">
            <div className="relative flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-primary to-rose-600 text-white flex items-center justify-center shadow-[0_4px_14px_rgba(225,29,72,0.35)] animate-pulse">
                  <span className="material-symbols-outlined text-2xl font-bold">bolt</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-primary font-mono text-xs font-bold uppercase tracking-wider animate-bounce">
                  5 Mins • Đang Chờ
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs text-primary uppercase tracking-wider font-bold">
                  Step 02 • Diệt Lỗi Trọng Tâm
                </span>
                <h3 className="text-base text-slate-900 mt-1 font-bold group-hover:text-primary transition-colors">
                  Bắt lỗi rụng âm đuôi -ed & cụm /ks/
                </h3>
                <div className="mt-2 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-800 font-sans text-xs font-medium leading-relaxed">
                  “Six <span className="text-primary font-bold">months</span> ago, she baked fresh bread for breakfast on the <span className="text-secondary font-bold">street</span>.”
                </div>
              </div>
            </div>

            <div className="relative flex flex-col gap-2.5 pt-2 border-t border-rose-100">
              <div className="flex items-center justify-between font-mono text-xs text-slate-600">
                <span>Mục tiêu triệt tiêu:</span>
                <span className="text-primary font-bold">Rụng -ks & Nuốt -t</span>
              </div>
              <button
                onClick={() => triggerPractice(currentFocusPractice)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-rose-600 text-white font-bold text-xs shadow-md hover:shadow-lg hover:brightness-105 transition-all flex items-center justify-center gap-2"
                type="button"
              >
                <span className="material-symbols-outlined text-lg">play_circle</span>
                <span>NHẤP ĐỂ BẮT ĐẦU NGAY</span>
              </button>
            </div>
          </div>

          {/* Step 3: Locked Step */}
          <div className="relative bg-slate-50/60 border border-slate-200/60 rounded-2xl p-5 flex flex-col justify-between gap-4 z-10 opacity-80 group">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-slate-200/80 text-slate-400 flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">lock</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-slate-200/60 border border-slate-300/50 font-mono text-xs text-slate-500 font-semibold">
                  3 Mins • Khóa
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs text-indigo-600 uppercase tracking-wider font-bold">
                  Step 03 • Thực Chiến Hội Thoại
                </span>
                <h3 className="text-base text-slate-800 mt-1 font-bold">
                  AI Tech Lead Daily Standup
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Nói 3 câu báo cáo tiến độ công việc với trợ lý AI, duy trì nối âm tự nhiên và phản xạ ngữ điệu không ngập ngừng.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-slate-200/60">
              <div className="flex items-center justify-between font-mono text-xs text-slate-500">
                <span>Điều kiện mở:</span>
                <span>Hoàn thành Step 02 (&gt;75% GOP)</span>
              </div>
              <button
                onClick={() => setActiveTab('ai-hoi-thoai')}
                className="w-full py-2.5 rounded-xl bg-slate-200/70 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-300/60 font-mono text-xs text-slate-600 flex items-center justify-center gap-2 font-semibold transition-colors"
              >
                <span className="material-symbols-outlined text-sm">smart_toy</span>
                <span>Khám Phá Phòng AI Hội Thoại</span>
              </button>
            </div>
          </div>
        </div>

        {/* Action Banner */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200/80 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-secondary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">headset_mic</span>
            </div>
            <div>
              <span className="text-sm text-slate-900 font-bold block">
                Cần tai nghe chuẩn cho phản hồi tức thì 12ms
              </span>
              <span className="font-mono text-xs text-slate-500">
                Hệ thống kích hoạt mô đun lọc nhiễu phòng học và khử vang thích ứng
              </span>
            </div>
          </div>
          <button
            onClick={() => triggerPractice(currentFocusPractice)}
            className="w-full md:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-primary to-rose-600 text-white font-bold text-xs shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2 shrink-0"
            type="button"
          >
            <span>Bắt Đầu Luyện Tập 10 Phút Ngay</span>
            <span className="material-symbols-outlined text-lg">east</span>
          </button>
        </div>
      </div>

      {/* Lower Bento: Recent High-Risk Phoneme Flaws Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-[0_4px_16px_rgba(15,23,42,0.04)] flex flex-col gap-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">warning</span>
            <h3 className="text-base font-bold text-slate-900">
              Ngân Hàng Lỗi Âm Cần Triệt Tiêu Gần Đây
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-slate-500 font-semibold">
              Lọc theo: L1 Vietnamese Interference
            </span>
            <button
              onClick={() => setActiveTab('ngan-hang-tu-loi')}
              className="text-xs text-primary font-bold hover:underline"
            >
              Xem tất cả ({errorWords.length})
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="font-mono text-slate-500 uppercase tracking-wider bg-slate-50 rounded-xl border-y border-slate-200/70">
                <th className="py-2.5 px-3">Từ Mục Tiêu</th>
                <th className="py-2.5 px-3">Phân Tách IPA</th>
                <th className="py-2.5 px-3">Lỗi Điển Hình Người Việt</th>
                <th className="py-2.5 px-3">GOP Đo Được</th>
                <th className="py-2.5 px-3 text-right">Hành Động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {errorWords.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3 font-bold text-slate-900">{item.word}</td>
                  <td className="py-3 px-3 font-mono text-secondary font-bold">{item.ipa}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-rose-50 border border-rose-200 text-primary font-mono text-[11px] font-bold">
                        {item.errorType}
                      </span>
                      <span className="text-slate-500 text-[11px]">➔ {item.note}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-rose-600 font-bold">{item.score}%</span>
                      <div className="w-16 bg-slate-200/70 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-rose-500 h-full rounded-full"
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => playAudioWord(item.word)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-secondary transition-colors"
                        title="Nghe phát âm chuẩn bản xứ"
                      >
                        <span className="material-symbols-outlined text-base">volume_up</span>
                      </button>
                      <button
                        onClick={() =>
                          triggerPractice({
                            id: item.id,
                            word: item.word,
                            sentence: `Please pronounce the word "${item.word}" accurately.`,
                            ipa: item.ipa,
                            targetPhonemes: [item.ipa],
                            difficulty: 'Focus',
                            trap: item.errorType
                          })
                        }
                        className="px-2.5 py-1 rounded-lg bg-primary hover:bg-rose-700 text-white font-bold text-[11px] shadow-xs"
                      >
                        Luyện
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
