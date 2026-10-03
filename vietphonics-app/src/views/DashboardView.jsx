import React from 'react';
import { useApp } from '../context/AppContext';
import IeltsBandEstimator from '../components/dashboard/IeltsBandEstimator';

export default function DashboardView() {
  const { dialect, dialectConfig, gopScore, setActiveTab, triggerPractice, setShowDiagnosticModal } = useApp();

  const playWord = (word) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const focusPracticeItem = {
    id: 'step-02-focus',
    word: 'Months',
    sentence: 'Six months ago, she baked fresh bread for breakfast on the street.',
    ipa: '/sɪks mʌnθs əˈɡoʊ, ʃi beɪkt freʃ bred fɔːr ˈbrekfəst ɒn ðə striːt/',
    targetPhonemes: ['/ks/', '/nθs/', '/kt/', '/st/'],
    difficulty: 'Intermediate',
    trap: 'Bắt lỗi rụng âm đuôi -ed & cụm /ks/'
  };

  return (
    <div className="flex flex-col w-full">
      <div className="w-full px-6 lg:px-12 mx-auto py-space-lg flex flex-col gap-space-xl max-w-[1440px]">
        {/* Top Strategic Status & Audio Engine Telemetry Bar */}
        <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md bg-white border border-slate-200/80 p-space-md rounded-xl shadow-[0_2px_8px_rgba(15,23,42,0.03)]">
          <div className="flex items-center gap-space-md flex-wrap">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(2,132,199,0.5)] animate-pulse" />
              <span className="font-label-mono text-label-mono text-slate-800 uppercase tracking-wider font-bold">
                Acoustic Engine v4.2 Ready
              </span>
            </div>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <div className="flex items-center gap-2">
              <span className="font-label-mono text-label-mono text-slate-500">Active Model:</span>
              <span className="font-label-mono text-label-mono text-secondary px-2 py-0.5 rounded bg-sky-50 border border-sky-100 font-semibold">
                {dialectConfig.name} Transfer Corrector
              </span>
            </div>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <div className="flex items-center gap-1.5 font-label-mono text-label-mono text-primary font-semibold">
              <span className="material-symbols-outlined text-sm">mic</span>
              <span>Sample Rate: 44.1kHz • 24-bit Float</span>
            </div>
          </div>
          <div className="flex items-center gap-space-sm self-end lg:self-auto">
            <button aria-label="Mở bài kiểm tra chẩn đoán L1" type="button"
              onClick={() => setShowDiagnosticModal(true)}
              className="px-2.5 py-1 rounded bg-rose-50 hover:bg-rose-100 border border-rose-200 font-label-mono text-label-mono text-primary font-bold transition-colors cursor-pointer"
            >
              Chẩn đoán L1
            </button>
            <span className="px-2 py-0.5 rounded bg-indigo-50 border border-indigo-100 font-label-mono text-label-mono text-indigo-700 font-semibold">
              Session #48
            </span>
          </div>
        </div>

        {/* 4-Pillar Vietnamese Phonetic Radar & High-Echelon Diagnostic Hero Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-6 items-stretch">
          {/* Left Glass Card: 4-Pillar Radial & Progress Gauges (5 cols on XL, 1 col on MD) */}
          <div className="md:col-span-1 xl:col-span-5 bg-white border border-slate-200/80 rounded-xl p-space-lg flex flex-col justify-between shadow-[0_4px_16px_rgba(15,23,42,0.04)] relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-rose-50/70 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-col gap-space-md relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-lg bg-rose-50 text-primary border border-rose-100">
                    <span className="material-symbols-outlined text-xl">graphic_eq</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-mono text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                      Acoustic Diagnostic
                    </span>
                    <h2 className="font-headline-sm text-headline-sm text-slate-900 font-bold">
                      4 Trụ Cột Ngữ Âm L1 Việt
                    </h2>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200/70 font-label-mono text-label-mono text-secondary font-semibold">
                  Dynamic Matrix
                </span>
              </div>

              {/* 4 Pillars Breakdown */}
              <div className="flex flex-col gap-3 mt-2">
                {/* Pillar 1 */}
                <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                  <div className="flex items-center justify-between font-body-sm text-body-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
                      <span className="font-semibold text-slate-800">1. Âm Đuôi & Cụm Phụ Âm</span>
                      <span className="font-label-mono text-label-mono text-slate-500">/ks/, /st/, /t/, /d/</span>
                    </div>
                    <span className="font-ipa-inline text-ipa-inline text-emerald-600 font-bold">82%</span>
                  </div>
                  <div className="w-full bg-slate-200/70 h-2 rounded-full overflow-hidden flex">
                    <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000" style={{ width: '82%' }} />
                  </div>
                </div>

                {/* Pillar 2 */}
                <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                  <div className="flex items-center justify-between font-body-sm text-body-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.5)]" />
                      <span className="font-semibold text-slate-800">2. Cặp Âm Dễ Nhầm</span>
                      <span className="font-label-mono text-label-mono text-slate-500">/θ/-/t/, /iː/-/ɪ/, /l/-/n/</span>
                    </div>
                    <span className="font-ipa-inline text-ipa-inline text-amber-600 font-bold">71%</span>
                  </div>
                  <div className="w-full bg-slate-200/70 h-2 rounded-full overflow-hidden flex">
                    <div className="bg-amber-500 h-full rounded-full transition-all duration-1000" style={{ width: '71%' }} />
                  </div>
                </div>

                {/* Pillar 3 */}
                <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                  <div className="flex items-center justify-between font-body-sm text-body-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.5)]" />
                      <span className="font-semibold text-slate-800">3. Trọng Âm & Nhịp Điệu</span>
                      <span className="font-label-mono text-label-mono text-slate-500">Stress & Cadence</span>
                    </div>
                    <span className="font-ipa-inline text-ipa-inline text-amber-600 font-bold">68%</span>
                  </div>
                  <div className="w-full bg-slate-200/70 h-2 rounded-full overflow-hidden flex">
                    <div className="bg-amber-500 h-full rounded-full transition-all duration-1000" style={{ width: '68%' }} />
                  </div>
                </div>

                {/* Pillar 4 (Focus Alert) */}
                <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-rose-50/50 border border-rose-100 hover:border-rose-200 transition-colors">
                  <div className="flex items-center justify-between font-body-sm text-body-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.5)]" />
                      <span className="font-semibold text-slate-800">4. Nối Âm & Lướt Âm</span>
                      <span className="font-label-mono text-label-mono text-rose-600 font-bold">Mục tiêu ưu tiên</span>
                    </div>
                    <span className="font-ipa-inline text-ipa-inline text-rose-600 font-bold">59%</span>
                  </div>
                  <div className="w-full bg-slate-200/70 h-2 rounded-full overflow-hidden flex">
                    <div className="bg-rose-500 h-full rounded-full transition-all duration-1000" style={{ width: '59%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Dialect Tip Footer Card */}
            <div className="mt-4 p-3 rounded-lg bg-sky-50/70 border border-sky-100 flex items-start gap-3 shadow-none">
              <span className="material-symbols-outlined text-secondary text-lg mt-0.5 shrink-0">lightbulb</span>
              <p className="font-body-sm text-body-sm text-slate-600">
                <strong className="text-secondary font-bold">Đặc thù Giọng {dialectConfig.name}:</strong>{' '}
                {dialect === 'bac' && (
                  <>
                    Đang cải thiện xuất sắc cặp âm <span className="font-ipa-inline text-slate-900 font-bold">/z/</span> và <span className="font-ipa-inline text-slate-900 font-bold">/ʒ/</span>, cần tập trung duy trì luồng hơi âm đuôi <span className="font-ipa-inline text-primary font-bold">/t/</span> & <span className="font-ipa-inline text-primary font-bold">/d/</span>!
                  </>
                )}
                {dialect === 'trung' && (
                  <>
                    Ngữ điệu dồn dập đang được giải phóng đều đặn, cần mở rộng khẩu hình vòm họng cho các nguyên âm đôi <span className="font-ipa-inline text-primary font-bold">/eə/</span> và <span className="font-ipa-inline text-primary font-bold">/ɪə/</span>!
                  </>
                )}
                {dialect === 'nam' && (
                  <>
                    Ngữ điệu mềm mại tự nhiên, cần giữ trọn vẹn luồng bật phụ âm đuôi <span className="font-ipa-inline text-primary font-bold">/k/</span> và <span className="font-ipa-inline text-primary font-bold">/t/</span> thay vì nuốt tắt thanh hầu!
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Center-Right Hero Card: Overall GOP & Benchmarks (4 cols on XL, 1 col on MD) */}
          <div className="md:col-span-1 xl:col-span-4 bg-white border border-slate-200/80 rounded-xl p-space-lg flex flex-col justify-between shadow-[0_4px_16px_rgba(15,23,42,0.04)] relative overflow-hidden">
            <div className="absolute -left-16 bottom-0 w-48 h-48 bg-sky-50/80 rounded-full blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="font-label-mono text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                  Global Index
                </span>
                <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-50 border border-sky-100 font-label-mono text-label-mono text-secondary font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span>Normalized</span>
                </div>
              </div>
              <h2 className="font-headline-sm text-headline-sm text-slate-900 font-bold mt-1">Acoustic GOP Score</h2>
            </div>

            {/* Neon Cyan Circular Dial & Radar Display */}
            <div className="py-4 flex flex-col items-center justify-center relative">
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
                  <circle className="text-slate-100" cx="80" cy="80" fill="transparent" r="68" stroke="currentColor" strokeWidth="12" />
                  <circle
                    className="text-secondary transition-all duration-1000"
                    cx="80"
                    cy="80"
                    fill="transparent"
                    r="68"
                    stroke="currentColor"
                    strokeDasharray="427.25"
                    strokeDashoffset="102.5"
                    strokeLinecap="round"
                    strokeWidth="12"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display-hero text-display-hero text-slate-900 leading-none tracking-tighter font-extrabold">
                    76
                  </span>
                  <span className="font-label-mono text-label-mono text-secondary tracking-widest mt-1 uppercase font-bold">
                    /100 GOP
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 font-label-mono text-label-mono text-primary font-semibold">
                <span>🔥 Streak Booster:</span>
                <span className="font-bold text-slate-800">+4% Độ chuẩn tuần này</span>
              </div>
            </div>

            {/* Predicted Exam Benchmarks & Interactive IELTS Semicircle Gauge (ELSA-103) */}
            <IeltsBandEstimator overallGop={gopScore} />
          </div>

          {/* Right Metric Card: L1 Habit Reduction & Cadence (3 cols on XL, full on MD/sm) */}
          <div className="col-span-full xl:col-span-3 bg-white border border-slate-200/80 rounded-xl p-space-lg flex flex-col justify-between shadow-[0_4px_16px_rgba(15,23,42,0.04)]">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-label-mono text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                  Habit Telemetry
                </span>
                <span className="material-symbols-outlined text-primary text-xl">insights</span>
              </div>
              <h2 className="font-headline-sm text-headline-sm text-slate-900 font-bold mt-1">Chỉ Số Khử Lỗi L1</h2>
            </div>

            <div className="flex flex-col gap-space-md py-2">
              {/* Metric 1 */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-body-sm text-body-sm text-slate-600 font-medium">Flat Tone Transfer</span>
                  <span className="font-label-mono text-label-mono text-emerald-600 font-bold">-42%</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-headline-md text-headline-md text-slate-900 font-extrabold">0.58</span>
                  <span className="font-label-mono text-label-mono text-slate-500">Tonal Variance (StDev)</span>
                </div>
                <p className="font-label-mono text-[10px] text-secondary font-medium">
                  Đã giảm rung ngữ điệu kiểu thanh điệu tiếng Việt
                </p>
              </div>

              {/* Metric 2 */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-body-sm text-body-sm text-slate-600 font-medium">Tốc Độ Nói (Cadence)</span>
                  <span className="material-symbols-outlined text-base text-secondary">speed</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-headline-md text-headline-md text-secondary font-extrabold">135</span>
                  <span className="font-label-mono text-label-mono text-slate-500">WPM (Chuẩn Quốc Tế)</span>
                </div>
                <div className="w-full bg-slate-200/70 h-1.5 rounded-full overflow-hidden mt-1">
                  <div className="bg-secondary h-full rounded-full" style={{ width: '75%' }} />
                </div>
              </div>

              {/* Metric 3 */}
              <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-label-mono text-label-mono text-emerald-700 font-semibold">Mục Tiêu Hôm Nay</span>
                  <span className="font-body-md text-body-md text-slate-900 font-bold">10 / 10 Phút Luyện</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-xl">check_circle</span>
                </div>
              </div>
            </div>

            <button aria-label="Chuyển phân hệ học"
              onClick={() => setActiveTab('tien-do')}
              className="w-full py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition-colors font-label-mono text-label-mono font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              type="button"
            >
              <span>Xem Phân Tích Âm Phổ Chi Tiết</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Primary Section: 10-Minute Daily Personalized Curriculum Path */}
        <div className="w-full bg-white border border-slate-200/90 rounded-xl p-space-lg lg:p-space-xl shadow-[0_6px_24px_rgba(15,23,42,0.05)] flex flex-col gap-space-lg relative overflow-hidden">
          <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-96 h-96 bg-rose-50 rounded-full blur-[100px] pointer-events-none" />

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md relative">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 font-label-mono text-label-mono text-primary uppercase tracking-widest font-bold">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                <span>AI Neural Progression • 10 Phút Tối Ưu</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-slate-900 font-extrabold tracking-tight">
                Lộ Trình Tinh Chỉnh Phản Xạ Hôm Nay
              </h2>
              <p className="font-body-md text-body-md text-slate-600 max-w-2xl">
                Được cá nhân hóa sau khi phân tích 18 câu bạn đọc hôm qua. Tập trung triệt tiêu hiện tượng nuốt âm đuôi và làm mềm cơ lưỡi.
              </p>
            </div>
            <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
              <div className="px-3.5 py-1.5 rounded-lg bg-sky-50 border border-sky-100 font-label-mono text-label-mono text-secondary font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-base">timer</span>
                <span>Tổng thời gian: 10 Phút</span>
              </div>
            </div>
          </div>

          {/* 3-Step Connected Dynamic Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-md relative">
            {/* Circuit Connector Line (Visible on Desktop) */}
            <div className="hidden lg:block absolute top-14 left-[15%] right-[15%] h-0.5 bg-slate-200 -z-0">
              <div className="h-full bg-gradient-to-r from-emerald-500 via-primary to-slate-200" style={{ width: '55%' }} />
            </div>

            {/* Step 1: Completed */}
            <div className="relative bg-slate-50 border border-slate-200/80 rounded-xl p-space-md flex flex-col justify-between gap-space-md z-10 transition-all hover:border-slate-300 group shadow-sm">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-2xl font-bold">check</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-label-mono text-label-mono font-bold">
                    2 Mins • Xong
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-mono text-label-mono text-emerald-600 uppercase tracking-wider font-bold">
                    Step 01 • Khởi Động Âm Yếu ({dialectConfig.name})
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-slate-900 mt-1 font-bold group-hover:text-secondary transition-colors">
                    {dialect === 'bac' && 'Khắc phục bẫy âm L/N cho người miền Bắc'}
                    {dialect === 'trung' && 'Khắc phục bẫy thanh điệu & nguyên âm đôi cho người miền Trung'}
                    {dialect === 'nam' && 'Khắc phục nuốt phụ âm đuôi /k/, /t/ cho người miền Nam'}
                  </h3>
                  <p className="font-body-sm text-body-sm text-slate-600 mt-1.5 leading-relaxed">
                    {dialect === 'bac' && (
                      <>Tập trung 5 từ mẫu hay lẫn lộn /l/-/n/: <span className="font-ipa-inline text-slate-900 font-semibold">light, night, line, nine, little</span>. Triệt tiêu phản xạ nhầm âm Bắc Bộ.</>
                    )}
                    {dialect === 'trung' && (
                      <>Tập trung nguyên âm đôi /eə/ và /ɪə/: <span className="font-ipa-inline text-slate-900 font-semibold">hair, clear, tear, square</span>. Mở rộng vòm họng và giữ trường độ chuẩn.</>
                    )}
                    {dialect === 'nam' && (
                      <>Tập trung bật dứt khoát âm đuôi: <span className="font-ipa-inline text-slate-900 font-semibold">street, cat, speak, look, pack</span>. Khắc phục thói quen nuốt tắt thanh hầu.</>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <div className="flex items-center justify-between font-label-mono text-label-mono">
                  <span className="text-slate-500">Kết quả phân tích:</span>
                  <span className="text-emerald-600 font-bold">92% GOP (Chuẩn B2+)</span>
                </div>
                <div className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200/70 font-label-mono text-label-mono text-slate-800 flex items-center justify-between">
                  <span className="text-slate-500">Độ hở đầu lưỡi:</span>
                  <span className="text-secondary font-bold">Khẩu hình 2.5mm</span>
                </div>
              </div>
            </div>

            {/* Step 2: ACTIVE & PULSING (Core Focus) */}
            <div
              onClick={() => triggerPractice(focusPracticeItem)}
              className="relative bg-white border-2 border-rose-400 rounded-xl p-space-md flex flex-col justify-between gap-space-md z-10 shadow-[0_10px_30px_rgba(225,29,72,0.12)] transition-all hover:scale-[1.01] group cursor-pointer"
            >
              <div className="relative flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-rose-600 text-white flex items-center justify-center shadow-[0_4px_14px_rgba(225,29,72,0.35)] animate-pulse">
                    <span className="material-symbols-outlined text-2xl font-bold">bolt</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-primary font-label-mono text-label-mono font-bold uppercase tracking-wider animate-bounce">
                    5 Mins • Đang Chờ
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-mono text-label-mono text-primary uppercase tracking-wider font-bold">
                    Step 02 • Diệt Lỗi Trọng Tâm
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-slate-900 mt-1 font-bold group-hover:text-primary transition-colors">
                    Bắt lỗi rụng âm đuôi -ed & cụm /ks/
                  </h3>
                  <div className="mt-2 p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-slate-800 font-ipa-inline text-ipa-inline leading-relaxed">
                    “Six <span className="text-primary font-bold">months</span> ago, she baked fresh bread for breakfast on the <span className="text-secondary font-bold">street</span>.”
                  </div>
                </div>
              </div>
              <div className="relative flex flex-col gap-3 pt-2">
                <div className="flex items-center justify-between font-label-mono text-label-mono text-slate-600">
                  <span>Mục tiêu triệt tiêu:</span>
                  <span className="text-primary font-bold">Rụng -ks & Nuốt -t</span>
                </div>
                <button aria-label="Nút tương tác"
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-primary to-rose-600 text-white font-headline-sm text-body-md font-bold tracking-wide shadow-md hover:shadow-lg hover:brightness-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-xl">play_circle</span>
                  <span>NHẤP ĐỂ BẮT ĐẦU NGAY</span>
                </button>
              </div>
            </div>

            {/* Step 3: Locked Step */}
            <div className="relative bg-slate-50/60 border border-slate-200/60 rounded-xl p-space-md flex flex-col justify-between gap-space-md z-10 opacity-75 group">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-slate-200/80 text-slate-400 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">lock</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-slate-200/60 border border-slate-300/50 font-label-mono text-label-mono text-slate-500 font-semibold">
                    3 Mins • Khóa
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-mono text-label-mono text-indigo-600 uppercase tracking-wider font-bold">
                    Step 03 • Thực Chiến Hội Thoại
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-slate-800 mt-1 font-bold">
                    AI Tech Lead Daily Standup
                  </h3>
                  <p className="font-body-sm text-body-sm text-slate-500 mt-1.5 leading-relaxed">
                    Nói 3 câu báo cáo tiến độ công việc với trợ lý AI, duy trì nối âm tự nhiên và phản xạ ngữ điệu không ngập ngừng.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <div className="flex items-center justify-between font-label-mono text-label-mono text-slate-500">
                  <span>Điều kiện mở:</span>
                  <span>Hoàn thành Step 02 (&gt;75% GOP)</span>
                </div>
                <button aria-label="Chuyển phân hệ học"
                  onClick={() => setActiveTab('ai-hoi-thoai')}
                  className="w-full py-2.5 rounded-lg bg-slate-200/70 hover:bg-slate-300 border border-slate-300/60 font-label-mono text-label-mono text-slate-700 flex items-center justify-center gap-2 cursor-pointer font-semibold transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-sm">smart_toy</span>
                  <span>Mở Phòng AI Hội Thoại</span>
                </button>
              </div>
            </div>
          </div>

          {/* Action Banner: Floating Primary CTA */}
          <div className="w-full flex flex-col md:flex-row items-center justify-between p-space-md rounded-xl bg-slate-50 border border-slate-200/80 gap-space-md">
            <div className="flex items-center gap-space-md">
              <div className="w-10 h-10 rounded-full bg-sky-100 text-secondary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined">headset_mic</span>
              </div>
              <div className="flex flex-col">
                <span className="font-body-md text-body-md text-slate-900 font-bold">
                  Cần tai nghe chuẩn cho phản hồi tức thì 12ms
                </span>
                <span className="font-label-mono text-label-mono text-slate-500">
                  Hệ thống kích hoạt mô đun lọc nhiễu phòng học và khử vang thích ứng
                </span>
              </div>
            </div>
            <button aria-label="Nút tương tác"
              onClick={() => triggerPractice(focusPracticeItem)}
              className="w-full md:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-primary to-rose-600 text-white font-headline-sm text-body-md font-bold tracking-wide shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              type="button"
            >
              <span>Bắt Đầu Luyện Tập 10 Phút Ngay</span>
              <span className="material-symbols-outlined text-xl">east</span>
            </button>
          </div>
        </div>

        {/* Lower Bento: Recent Phoneme Flaws & Articulation Diagnostic Breakdown */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Left: Recent High-Risk Phoneme Flaws Table (8 cols on XL, full on mobile/tablet) */}
          <div className="col-span-12 xl:col-span-8 bg-white border border-slate-200/80 rounded-xl p-space-lg shadow-[0_4px_16px_rgba(15,23,42,0.04)] flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">warning</span>
                <h3 className="font-headline-sm text-headline-sm text-slate-900 font-bold">
                  Ngân Hàng Lỗi Âm Cần Triệt Tiêu Gần Đây
                </h3>
              </div>
              <span className="font-label-mono text-label-mono text-slate-500 font-semibold">
                Lọc theo: L1 Vietnamese Interference
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="font-label-mono text-label-mono text-slate-500 uppercase tracking-wider bg-slate-50 rounded-lg border-y border-slate-200/70">
                    <th className="py-2.5 px-3">Từ Mục Tiêu</th>
                    <th className="py-2.5 px-3">Phân Tách IPA</th>
                    <th className="py-2.5 px-3">Lỗi Điển Hình Người Việt</th>
                    <th className="py-2.5 px-3">GOP Đo Được</th>
                    <th className="py-2.5 px-3 text-right">Luyện Nhanh</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-body-sm text-body-sm">
                  {/* Item 1 */}
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-bold text-slate-900">Months</td>
                    <td className="py-3 px-3 font-ipa-inline text-ipa-inline text-secondary font-bold">/mʌnθs/</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded bg-rose-50 border border-rose-200 text-primary font-label-mono text-label-mono font-bold">
                          Mất /s/ đuôi
                        </span>
                        <span className="text-slate-500 text-xs">➔ Nói thành "mân-tờ"</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className="font-label-mono text-rose-600 font-bold">54%</span>
                        <div className="w-16 bg-slate-200/70 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-rose-500 h-full rounded-full" style={{ width: '54%' }} />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button aria-label="Phát âm mẫu chuẩn bản ngữ"
                        onClick={() => playWord('Months')}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-secondary transition-colors cursor-pointer"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-base">volume_up</span>
                      </button>
                    </td>
                  </tr>

                  {/* Item 2 */}
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-bold text-slate-900">Breakfast</td>
                    <td className="py-3 px-3 font-ipa-inline text-ipa-inline text-secondary font-bold">/ˈbrek.fəst/</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-700 font-label-mono text-label-mono font-bold">
                          Sai trọng âm
                        </span>
                        <span className="text-slate-500 text-xs">➔ Nhấn âm 2, rụng cụm /-st/</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className="font-label-mono text-amber-600 font-bold">66%</span>
                        <div className="w-16 bg-slate-200/70 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-amber-500 h-full rounded-full" style={{ width: '66%' }} />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button aria-label="Phát âm mẫu chuẩn bản ngữ"
                        onClick={() => playWord('Breakfast')}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-secondary transition-colors cursor-pointer"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-base">volume_up</span>
                      </button>
                    </td>
                  </tr>

                  {/* Item 3 */}
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-bold text-slate-900">Street</td>
                    <td className="py-3 px-3 font-ipa-inline text-ipa-inline text-secondary font-bold">/striːt/</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded bg-rose-50 border border-rose-200 text-primary font-label-mono text-label-mono font-bold">
                          Gãy cụm /str-/
                        </span>
                        <span className="text-slate-500 text-xs">➔ Nuốt âm /t/ đuôi</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className="font-label-mono text-rose-600 font-bold">61%</span>
                        <div className="w-16 bg-slate-200/70 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-rose-500 h-full rounded-full" style={{ width: '61%' }} />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button aria-label="Phát âm mẫu chuẩn bản ngữ"
                        onClick={() => playWord('Street')}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-secondary transition-colors cursor-pointer"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-base">volume_up</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Real-Time Tongue & Palate Articulation Preview (4 cols on XL, full on mobile/tablet) */}
          <div className="col-span-12 xl:col-span-4 bg-white border border-slate-200/80 rounded-xl p-space-lg shadow-[0_4px_16px_rgba(15,23,42,0.04)] flex flex-col justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-label-mono text-label-mono text-secondary uppercase tracking-widest font-bold">
                  Biomechanical Model
                </span>
                <span className="px-2 py-0.5 rounded bg-sky-50 border border-sky-100 text-secondary font-label-mono text-[10px] font-bold">
                  2D Cut-section
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-slate-900 font-bold">Điểm Chạm Khẩu Hình /θ/</h3>
              <p className="font-body-sm text-body-sm text-slate-600">
                Vị trí chuẩn: Đặt đầu lưỡi giữa hai hàm răng, thổi nhẹ không rung dây thanh.
              </p>
            </div>

            {/* Wireframe Articulation Graphic */}
            <div className="w-full h-44 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center relative overflow-hidden my-3">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-100/50 to-transparent pointer-events-none" />
              <svg className="w-48 h-32 text-secondary" fill="none" viewBox="0 0 200 120">
                <path className="text-slate-400" d="M 20 40 Q 60 20 110 30 T 180 50" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" />
                <rect className="text-slate-700" fill="currentColor" height="16" rx="2" width="12" x="75" y="28" />
                <rect className="text-slate-700" fill="currentColor" height="16" rx="2" width="12" x="73" y="68" />
                <path d="M 170 100 Q 130 90 95 62 Q 82 52 65 52 Q 62 57 70 65 Q 110 85 160 105" fill="rgba(225, 29, 72, 0.15)" stroke="#e11d48" strokeWidth="2" />
                <circle className="animate-ping" cx="68" cy="54" fill="#0284c7" r="5" />
                <circle cx="68" cy="54" fill="#0284c7" r="3" />
              </svg>
              <span className="absolute bottom-2 left-3 font-label-mono text-[10px] text-primary font-bold">
                Interdental Friction Point
              </span>
              <span className="absolute top-2 right-3 font-label-mono text-[10px] text-slate-400 font-semibold">
                Sagittal Plane
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="font-body-sm text-body-sm text-slate-800 font-bold">Tập luyện mô phỏng 2D</span>
              <button aria-label="Chuyển phân hệ học"
                onClick={() => setActiveTab('khau-hinh-2d')}
                className="font-label-mono text-label-mono text-secondary hover:underline flex items-center gap-1 font-bold cursor-pointer"
                type="button"
              >
                <span>Mở Studio 2D</span>
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
