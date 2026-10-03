import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function ProgressAnalyticsView() {
  const { setActiveTab } = useApp();
  const [selectedPhoneme, setSelectedPhoneme] = useState({
    symbol: '/θ/',
    name: 'Voiceless Dental Fricative',
    score: '54%',
    state: 'Yếu',
    desc: 'Lỗi phổ biến: Đầu lưỡi rụt lại quá sớm tạo thành âm tắc /t/ hoặc trượt ra /s/.'
  });

  const playTTS = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex flex-col w-full animate-fade-in">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Breadcrumb & Analytical Header Status */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                alt="User Avatar"
                className="w-14 h-14 rounded-full object-cover shadow-sm ring-2 ring-rose-200"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHtiGkMW_bAiVzUucj4w1pSTyoUmgY825vfdXITJv58g5VF-Z_u6RjPzdnhlZFADwCrMLXHraynwzk8Stxdwaw3LNoL-JczEGc9hADocs8sqV6iq4vQvD0Tj7MVgl5X1O792UHUG3m9s72dhJEbsafsRfJbpJYqAQJMKs2BZQvA0Rw0cC6LWuB41m9iU-abrgZHPfwmc64qayjq2GpPH5BgTYB7Uk1_d0jQCjjPNtwFKYn5mqLJaQz"
              />
              <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-sky-600 ring-2 ring-white flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-headline-sm text-headline-sm text-slate-900 font-bold">
                  Tiến Độ &amp; Phân Tích Âm Học
                </h1>
                <span className="px-2 py-0.5 rounded bg-sky-50 text-sky-700 font-label-mono text-label-mono uppercase tracking-wider font-semibold border border-sky-200">
                  L1 Calibrated
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-slate-500 flex items-center gap-2 mt-0.5">
                <span>Học viên: <strong className="text-slate-800">Nguyễn Tuấn Kiệt</strong></span>
                <span>•</span>
                <span className="font-label-mono text-label-mono text-sky-700 font-semibold">
                  Dialect Model: Miền Bắc (/d/ ➔ /z/)
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2.5">
            <button
              onClick={() => alert('Đang trích xuất Báo Cáo Phổ Âm Học PDF chuẩn CEFR...')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-label-md text-label-md transition-all shadow-sm font-semibold cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg text-sky-600">picture_as_pdf</span>
              <span>Xuất Báo Cáo PDF</span>
            </button>
            <button
              onClick={() => alert('Liên kết chia sẻ bảng điểm GOP đã được sao chép!')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-label-md text-label-md transition-all shadow-sm font-semibold cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">share</span>
              <span>Chia Sẻ Thành Tích</span>
            </button>
          </div>
        </div>

        {/* MODULE 1: Top Performance & Benchmark Summary Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Radial GOP Gauge & Benchmarks */}
          <div className="lg:col-span-7 bg-white rounded-xl p-6 lg:p-8 shadow-sm flex flex-col justify-between relative overflow-hidden border border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-rose-50 text-rose-600">
                  <span className="material-symbols-outlined text-xl">insights</span>
                </span>
                <div>
                  <h2 className="font-headline-sm text-headline-sm text-slate-900 font-bold">
                    Chỉ Số Chuẩn Hóa GOP Tổng Thể
                  </h2>
                  <p className="font-label-mono text-label-mono text-slate-500">
                    Goodness of Pronunciation • Acoustic Neural Scored
                  </p>
                </div>
              </div>
              <span className="font-label-mono text-label-mono px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                +8.4% Tháng Này
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center my-6">
              {/* Circular Gauge SVG */}
              <div className="sm:col-span-5 flex flex-col items-center justify-center">
                <div className="relative w-44 h-44 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                    <circle cx="80" cy="80" fill="none" r="66" stroke="#f1f5f9" strokeWidth="14"></circle>
                    <circle
                      cx="80"
                      cy="80"
                      fill="none"
                      r="66"
                      stroke="url(#gopGradient)"
                      strokeDasharray="414.7"
                      strokeDashoffset="99.5"
                      strokeLinecap="round"
                      strokeWidth="14"
                    ></circle>
                    <defs>
                      <linearGradient id="gopGradient" x1="0%" x2="100%" y1="0%" y2="100%">
                        <stop offset="0%" stopColor="#0284c7"></stop>
                        <stop offset="70%" stopColor="#e11d48"></stop>
                        <stop offset="100%" stopColor="#059669"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="font-display-hero text-4xl font-extrabold text-slate-900 leading-none">
                      76<span className="text-2xl text-rose-600">%</span>
                    </span>
                    <span className="font-label-mono text-[11px] text-slate-500 font-semibold mt-1 uppercase tracking-wider">
                      Overall GOP
                    </span>
                  </div>
                </div>
                <span className="font-label-mono text-label-mono text-slate-500 mt-2">
                  Mẫu phân tích: 44.1kHz Formants
                </span>
              </div>

              {/* Benchmarks */}
              <div className="sm:col-span-7 flex flex-col gap-3">
                <div className="bg-slate-50 rounded-lg p-3.5 flex items-center justify-between border border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <div className="font-label-md text-label-md text-slate-900 font-bold">
                        IELTS Speaking Tương Đương
                      </div>
                      <div className="font-body-sm text-body-sm text-slate-500">Pronunciation &amp; Fluency Band</div>
                    </div>
                  </div>
                  <span className="font-headline-sm text-headline-sm text-sky-700 font-bold">Band 7.0</span>
                </div>

                <div className="bg-slate-50 rounded-lg p-3.5 flex items-center justify-between border border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📘</span>
                    <div>
                      <div className="font-label-md text-label-md text-slate-900 font-bold">
                        Chuẩn Châu Âu CEFR
                      </div>
                      <div className="font-body-sm text-body-sm text-slate-500">Acoustic Clarity Index</div>
                    </div>
                  </div>
                  <span className="font-headline-sm text-headline-sm text-indigo-700 font-bold">B2 High</span>
                </div>

                <div className="bg-slate-50 rounded-lg p-3.5 flex items-center justify-between border border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🗣️</span>
                    <div>
                      <div className="font-label-md text-label-md text-slate-900 font-bold">
                        Mức Phản Xạ Âm Tiết
                      </div>
                      <div className="font-body-sm text-body-sm text-slate-500">Khử dấu thanh L1 Việt</div>
                    </div>
                  </div>
                  <span className="font-label-md text-label-md font-bold px-3 py-1 rounded bg-emerald-50 text-emerald-700">
                    Tự Nhiên
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 flex items-center justify-between text-slate-500 font-label-mono text-label-mono border-t border-slate-100">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Khử tạp âm &amp; Doppler OK
              </span>
              <span>Target IELTS 8.0: còn 9% GOP</span>
            </div>
          </div>

          {/* Habit & Consistency Metrics Panel */}
          <div className="lg:col-span-5 bg-white rounded-xl p-6 lg:p-8 shadow-sm flex flex-col justify-between border border-slate-200">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-headline-sm text-headline-sm text-slate-900 font-bold">
                  Kỷ Luật &amp; Lượng Nói
                </h3>
                <span className="font-label-mono text-label-mono px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-bold">
                  STREAK LIVE
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                {/* Streak Block */}
                <div className="bg-slate-50 rounded-xl p-4 flex flex-col justify-between border border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">🔥</span>
                    <span className="font-label-mono text-[10px] uppercase font-bold text-slate-400">Streak</span>
                  </div>
                  <div className="mt-3">
                    <div className="font-headline-md text-headline-md text-slate-900 font-bold">14 Ngày</div>
                    <div className="font-label-mono text-label-mono text-slate-500 mt-0.5">Kỷ lục: 21 ngày</div>
                  </div>
                </div>

                {/* Shields Block */}
                <div className="bg-slate-50 rounded-xl p-4 flex flex-col justify-between border border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">🛡️</span>
                    <span className="font-label-mono text-[10px] uppercase font-bold text-slate-400">Bảo Vệ</span>
                  </div>
                  <div className="mt-3">
                    <div className="font-headline-md text-headline-md text-sky-700 font-bold">2 Khiên</div>
                    <div className="font-label-mono text-label-mono text-slate-500 mt-0.5">Còn hạn trong 48h</div>
                  </div>
                </div>

                {/* Spoken Sentences */}
                <div className="bg-slate-50 rounded-xl p-4 flex flex-col justify-between border border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">🎙️</span>
                    <span className="font-label-mono text-[10px] uppercase font-bold text-slate-400">Số Câu</span>
                  </div>
                  <div className="mt-3">
                    <div className="font-headline-md text-headline-md text-slate-900 font-bold">528 Câu</div>
                    <div className="font-label-mono text-label-mono text-slate-500 mt-0.5">+46 câu hôm nay</div>
                  </div>
                </div>

                {/* Practice Time */}
                <div className="bg-slate-50 rounded-xl p-4 flex flex-col justify-between border border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">⏱️</span>
                    <span className="font-label-mono text-[10px] uppercase font-bold text-slate-400">Thời Lượng</span>
                  </div>
                  <div className="mt-3">
                    <div className="font-headline-md text-headline-md text-slate-900 font-bold">6g 45p</div>
                    <div className="font-label-mono text-label-mono text-slate-500 mt-0.5">Trung bình 28p/ngày</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 p-3.5 rounded-lg bg-sky-50 flex items-center justify-between border border-sky-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sky-700 text-xl">bolt</span>
                <span className="font-body-sm text-body-sm text-slate-800 font-medium">Mục tiêu tuần này: 120 phút</span>
              </div>
              <span className="font-label-mono text-label-mono font-bold text-sky-700">Đạt 130/120p (108%)</span>
            </div>
          </div>
        </div>

        {/* MODULE 2: The 4-Pillar Vietnamese Phonetic Radar & Detailed Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-headline-sm text-headline-sm text-slate-900 font-bold">
                4 Trụ Cột Âm Học Dành Cho Người Việt
              </h2>
              <p className="font-body-sm text-body-sm text-slate-500">
                Hệ thống phân tích ma trận bù trừ âm vần đặc trưng theo L1 Vietnamese
              </p>
            </div>
            <span className="hidden md:inline font-label-mono text-label-mono text-slate-500">
              Dựa trên mô hình formant F1/F2 &amp; F0 Coda
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Pillar 1 */}
            <div className="bg-white rounded-xl p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow border border-slate-200">
              <div>
                <div className="flex items-start justify-between">
                  <span className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600 font-bold">
                    <span className="material-symbols-outlined text-xl">done_all</span>
                  </span>
                  <span className="font-label-mono text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase">
                    Làm Chủ
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-slate-900 font-bold mt-4">
                  Âm Đuôi &amp; Cụm Phụ Âm
                </h3>
                <p className="font-label-mono text-label-mono text-slate-500">Ending Consonant Codas</p>
                <p className="font-body-sm text-body-sm text-slate-600 mt-2.5">
                  Rất Tốt. Đã hoàn toàn khắc phục tật nuốt âm đuôi /s/, /t/, /d/. Cụm /kts/ và /pst/ đạt chuẩn.
                </p>
              </div>
              <div className="mt-5">
                <div className="flex items-center justify-between mb-1.5 font-label-mono text-label-mono">
                  <span className="text-slate-600">Độ chuẩn xác</span>
                  <span className="font-bold text-emerald-600">82%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-emerald-600" style={{ width: '82%' }}></div>
                </div>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white rounded-xl p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow border border-slate-200">
              <div>
                <div className="flex items-start justify-between">
                  <span className="p-2.5 rounded-lg bg-amber-50 text-amber-600 font-bold">
                    <span className="material-symbols-outlined text-xl">compare_arrows</span>
                  </span>
                  <span className="font-label-mono text-[11px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 uppercase">
                    Cải Thiện
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-slate-900 font-bold mt-4">
                  Cặp Âm Dễ Nhầm
                </h3>
                <p className="font-label-mono text-label-mono text-slate-500">Minimal Pairs /θ/-/t/, /iː/-/ɪ/</p>
                <p className="font-body-sm text-body-sm text-slate-600 mt-2.5">
                  Khá. Cần luyện thêm âm kẹp lưỡi /θ/ trong "think" để không bị nhầm sang /t/ hoặc /s/.
                </p>
              </div>
              <div className="mt-5">
                <div className="flex items-center justify-between mb-1.5 font-label-mono text-label-mono">
                  <span className="text-slate-600">Độ chuẩn xác</span>
                  <span className="font-bold text-amber-600">71%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-amber-500" style={{ width: '71%' }}></div>
                </div>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white rounded-xl p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow border border-slate-200">
              <div>
                <div className="flex items-start justify-between">
                  <span className="p-2.5 rounded-lg bg-sky-50 text-sky-700 font-bold">
                    <span className="material-symbols-outlined text-xl">graphic_eq</span>
                  </span>
                  <span className="font-label-mono text-[11px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-700 uppercase">
                    Đang Luyện
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-slate-900 font-bold mt-4">
                  Trọng Âm &amp; Khử Dấu
                </h3>
                <p className="font-label-mono text-label-mono text-slate-500">Syllable Stress &amp; De-Toning</p>
                <p className="font-body-sm text-body-sm text-slate-600 mt-2.5">
                  Đang Cải Thiện. Đã biết nhấn âm chính, cần lướt mềm hơn ở âm nguyên âm yếu schwa /ə/.
                </p>
              </div>
              <div className="mt-5">
                <div className="flex items-center justify-between mb-1.5 font-label-mono text-label-mono">
                  <span className="text-slate-600">Độ chuẩn xác</span>
                  <span className="font-bold text-sky-700">68%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-sky-600" style={{ width: '68%' }}></div>
                </div>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="bg-white rounded-xl p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow border border-slate-200">
              <div>
                <div className="flex items-start justify-between">
                  <span className="p-2.5 rounded-lg bg-rose-50 text-rose-600 font-bold">
                    <span className="material-symbols-outlined text-xl">warning</span>
                  </span>
                  <span className="font-label-mono text-[11px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-700 uppercase">
                    Ưu Tiên Cao
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-slate-900 font-bold mt-4">
                  Nối Âm &amp; Lưu Loát
                </h3>
                <p className="font-label-mono text-label-mono text-slate-500">Connected Speech &amp; Fluency</p>
                <p className="font-body-sm text-body-sm text-slate-600 mt-2.5">
                  Cần Luyện Tập. Tốc độ nói còn bị giật cục từng từ. Cần liên kết âm phụ âm sang nguyên âm kế tiếp.
                </p>
              </div>
              <div className="mt-5">
                <div className="flex items-center justify-between mb-1.5 font-label-mono text-label-mono">
                  <span className="text-slate-600">Độ chuẩn xác</span>
                  <span className="font-bold text-rose-600">59%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-rose-600" style={{ width: '59%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MODULE 3: Weekly Speaking Volume & Accuracy Trend (7-Day Mixed Chart Card) */}
        <div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm space-y-6 border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-sky-50 text-sky-700">
                  <span className="material-symbols-outlined text-xl">analytics</span>
                </span>
                <h2 className="font-headline-sm text-headline-sm text-slate-900 font-bold">
                  Xu Hướng Thời Lượng &amp; Độ Chính Xác (7 Ngày)
                </h2>
              </div>
              <p className="font-body-sm text-body-sm text-slate-500 mt-1">
                Biểu đồ kết hợp thời lượng luyện tập (cột màu) và đường độ chuẩn GOP (cyan line)
              </p>
            </div>
            <div className="flex items-center gap-4 font-label-mono text-label-mono">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-slate-200"></span>
                <span className="text-slate-600">Thời lượng (Phút)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-1 rounded bg-sky-600"></span>
                <span className="text-slate-600">GOP Chính xác (%)</span>
              </div>
            </div>
          </div>

          {/* Mixed Chart Container */}
          <div className="w-full overflow-x-auto">
            <div className="min-w-[620px] relative h-64 flex flex-col justify-end pt-6 pb-2">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8 pt-4">
                <div className="w-full border-b border-slate-100 flex justify-end">
                  <span className="font-label-mono text-[10px] text-slate-300">80% / 30m</span>
                </div>
                <div className="w-full border-b border-slate-100 flex justify-end">
                  <span className="font-label-mono text-[10px] text-slate-300">70% / 20m</span>
                </div>
                <div className="w-full border-b border-slate-100 flex justify-end">
                  <span className="font-label-mono text-[10px] text-slate-300">60% / 10m</span>
                </div>
                <div className="w-full border-b border-slate-100 flex justify-end">
                  <span className="font-label-mono text-[10px] text-slate-300">0% / 0m</span>
                </div>
              </div>

              {/* SVG Overlaid Line for Accuracy Trend */}
              <svg className="absolute inset-0 w-full h-48 pointer-events-none z-10" preserveAspectRatio="none" viewBox="0 0 700 200">
                <defs>
                  <linearGradient id="cyanLineGrad" x1="0%" x2="100%" y1="0%" y2="0%">
                    <stop offset="0%" stopColor="#0284c7"></stop>
                    <stop offset="100%" stopColor="#38bdf8"></stop>
                  </linearGradient>
                </defs>
                <path
                  d="M 50 120 C 100 118, 110 115, 150 115 C 200 115, 210 98, 250 98 C 300 98, 310 104, 350 104 C 400 104, 410 86, 450 86 C 500 86, 510 80, 550 80 C 600 80, 610 74, 650 74"
                  fill="none"
                  stroke="url(#cyanLineGrad)"
                  strokeLinecap="round"
                  strokeWidth="4"
                ></path>
                <circle cx="50" cy="120" fill="#ffffff" r="5" stroke="#0284c7" strokeWidth="3"></circle>
                <circle cx="150" cy="115" fill="#ffffff" r="5" stroke="#0284c7" strokeWidth="3"></circle>
                <circle cx="250" cy="98" fill="#ffffff" r="5" stroke="#0284c7" strokeWidth="3"></circle>
                <circle cx="350" cy="104" fill="#ffffff" r="5" stroke="#0284c7" strokeWidth="3"></circle>
                <circle cx="450" cy="86" fill="#ffffff" r="5" stroke="#0284c7" strokeWidth="3"></circle>
                <circle cx="550" cy="80" fill="#ffffff" r="5" stroke="#0284c7" strokeWidth="3"></circle>
                <circle cx="650" cy="74" fill="#0284c7" r="6" stroke="#ffffff" strokeWidth="2"></circle>
              </svg>

              {/* 7 Columns */}
              <div className="grid grid-cols-7 gap-2 sm:gap-6 h-48 items-end relative z-0 px-2 sm:px-6">
                <div className="flex flex-col items-center group cursor-pointer h-full justify-end">
                  <div className="w-10 sm:w-14 bg-slate-200 hover:bg-sky-200 transition-colors rounded-t-lg" style={{ height: '40%' }}></div>
                  <span className="mt-2 font-label-mono text-label-mono text-slate-500 font-semibold">T2</span>
                </div>
                <div className="flex flex-col items-center group cursor-pointer h-full justify-end">
                  <div className="w-10 sm:w-14 bg-slate-200 hover:bg-sky-200 transition-colors rounded-t-lg" style={{ height: '50%' }}></div>
                  <span className="mt-2 font-label-mono text-label-mono text-slate-500 font-semibold">T3</span>
                </div>
                <div className="flex flex-col items-center group cursor-pointer h-full justify-end">
                  <div className="w-10 sm:w-14 bg-slate-200 hover:bg-sky-200 transition-colors rounded-t-lg" style={{ height: '66%' }}></div>
                  <span className="mt-2 font-label-mono text-label-mono text-slate-500 font-semibold">T4</span>
                </div>
                <div className="flex flex-col items-center group cursor-pointer h-full justify-end">
                  <div className="w-10 sm:w-14 bg-slate-200 hover:bg-sky-200 transition-colors rounded-t-lg" style={{ height: '33%' }}></div>
                  <span className="mt-2 font-label-mono text-label-mono text-slate-500 font-semibold">T5</span>
                </div>
                <div className="flex flex-col items-center group cursor-pointer h-full justify-end">
                  <div className="w-10 sm:w-14 bg-slate-200 hover:bg-sky-200 transition-colors rounded-t-lg" style={{ height: '83%' }}></div>
                  <span className="mt-2 font-label-mono text-label-mono text-slate-500 font-semibold">T6</span>
                </div>
                <div className="flex flex-col items-center group cursor-pointer h-full justify-end">
                  <div className="w-10 sm:w-14 bg-slate-300 hover:bg-sky-200 transition-colors rounded-t-lg" style={{ height: '100%' }}></div>
                  <span className="mt-2 font-label-mono text-label-mono text-slate-500 font-semibold">T7</span>
                </div>
                <div className="flex flex-col items-center group cursor-pointer h-full justify-end">
                  <div className="w-10 sm:w-14 bg-rose-200 hover:bg-rose-300 transition-colors rounded-t-lg" style={{ height: '60%' }}></div>
                  <span className="mt-2 font-label-mono text-label-mono text-rose-600 font-bold">CN (Nay)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MODULE 4 & 5: IPA 44 Heatmap Matrix & Urgent Focus Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* IPA 44 Heatmap (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-xl p-6 lg:p-8 shadow-sm space-y-6 border border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="font-headline-sm text-headline-sm text-slate-900 font-bold">
                  Bản Đồ Làm Chủ 44 Âm Quốc Tế IPA
                </h2>
                <p className="font-body-sm text-body-sm text-slate-500">
                  Nhấp vào từng âm để nghe mẫu đối chiếu khẩu hình &amp; formant L1
                </p>
              </div>
              <div className="flex items-center gap-2 font-label-mono text-[11px]">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-500"></span> &gt;80%</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-amber-500"></span> 60-80%</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-rose-500"></span> &lt;60%</span>
              </div>
            </div>

            {/* Matrix */}
            <div className="space-y-5">
              {/* Monophthongs */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-mono text-label-mono uppercase text-slate-500 font-semibold tracking-wider">
                    Nguyên Âm Đơn (Monophthongs - 12)
                  </span>
                  <span className="font-label-mono text-[11px] text-slate-400">Trung bình: 78%</span>
                </div>
                <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
                  {[
                    { sym: 'iː', score: '86%', state: 'mastered', cls: 'bg-emerald-50 text-emerald-800' },
                    { sym: 'ɪ', score: '81%', state: 'mastered', cls: 'bg-emerald-50 text-emerald-800' },
                    { sym: 'e', score: '75%', state: 'progress', cls: 'bg-amber-50 text-amber-800' },
                    { sym: 'æ', score: '61%', state: 'progress', cls: 'bg-amber-50 text-amber-800' },
                    { sym: 'ʌ', score: '84%', state: 'mastered', cls: 'bg-emerald-50 text-emerald-800' },
                    { sym: 'ɑː', score: '88%', state: 'mastered', cls: 'bg-emerald-50 text-emerald-800' },
                    { sym: 'ɒ', score: '72%', state: 'progress', cls: 'bg-amber-50 text-amber-800' },
                    { sym: 'ɔː', score: '83%', state: 'mastered', cls: 'bg-emerald-50 text-emerald-800' },
                    { sym: 'ʊ', score: '77%', state: 'progress', cls: 'bg-amber-50 text-amber-800' },
                    { sym: 'uː', score: '85%', state: 'mastered', cls: 'bg-emerald-50 text-emerald-800' },
                    { sym: 'ɜː', score: '69%', state: 'progress', cls: 'bg-amber-50 text-amber-800' },
                    { sym: 'ə', score: '68%', state: 'progress', cls: 'bg-amber-50 text-amber-800' }
                  ].map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedPhoneme({
                          symbol: `/${p.sym}/`,
                          name: 'Monophthong Sound',
                          score: p.score,
                          state: p.score >= '80%' ? 'Làm Chủ' : 'Cần Luyện',
                          desc: 'Nguyên âm đơn chuẩn vị trí hàm và độ bè môi.'
                        });
                        playTTS(p.sym);
                      }}
                      className={`${p.cls} p-2 rounded-lg text-center transition-all group flex flex-col items-center hover:shadow-xs cursor-pointer`}
                    >
                      <span className="font-ipa-display text-ipa-display leading-tight group-hover:scale-110 transition-transform font-bold">
                        {p.sym}
                      </span>
                      <span className="font-label-mono text-[10px]">{p.score}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Diphthongs */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-mono text-label-mono uppercase text-slate-500 font-semibold tracking-wider">
                    Nguyên Âm Đôi (Diphthongs - 8)
                  </span>
                  <span className="font-label-mono text-[11px] text-slate-400">Trung bình: 79%</span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {[
                    { sym: 'eɪ', score: '89%', cls: 'bg-emerald-50 text-emerald-800' },
                    { sym: 'aɪ', score: '91%', cls: 'bg-emerald-50 text-emerald-800' },
                    { sym: 'ɔɪ', score: '85%', cls: 'bg-emerald-50 text-emerald-800' },
                    { sym: 'aʊ', score: '82%', cls: 'bg-emerald-50 text-emerald-800' },
                    { sym: 'əʊ', score: '70%', cls: 'bg-amber-50 text-amber-800' },
                    { sym: 'ɪə', score: '74%', cls: 'bg-amber-50 text-amber-800' },
                    { sym: 'eə', score: '67%', cls: 'bg-amber-50 text-amber-800' },
                    { sym: 'ʊə', score: '80%', cls: 'bg-emerald-50 text-emerald-800' }
                  ].map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedPhoneme({
                          symbol: `/${p.sym}/`,
                          name: 'Diphthong Transition',
                          score: p.score,
                          state: p.score >= '80%' ? 'Làm Chủ' : 'Cải Thiện',
                          desc: 'Chuyển vị trí từ âm thứ nhất lướt mượt mà sang âm thứ hai.'
                        });
                        playTTS(p.sym);
                      }}
                      className={`${p.cls} p-2 rounded-lg text-center transition-all group flex flex-col items-center hover:shadow-xs cursor-pointer`}
                    >
                      <span className="font-ipa-display text-ipa-display leading-tight group-hover:scale-110 transition-transform font-bold">
                        {p.sym}
                      </span>
                      <span className="font-label-mono text-[10px]">{p.score}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Consonants */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-mono text-label-mono uppercase text-slate-500 font-semibold tracking-wider">
                    Phụ Âm (Consonants - 24)
                  </span>
                  <span className="font-label-mono text-[11px] text-rose-600 font-bold">Yếu: /θ/, /ks/, /ʃ/</span>
                </div>
                <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
                  {[
                    { sym: 'p', score: '88%', cls: 'bg-emerald-50 text-emerald-800' },
                    { sym: 'b', score: '84%', cls: 'bg-emerald-50 text-emerald-800' },
                    { sym: 't', score: '83%', cls: 'bg-emerald-50 text-emerald-800' },
                    { sym: 'd', score: '81%', cls: 'bg-emerald-50 text-emerald-800' },
                    { sym: 'k', score: '86%', cls: 'bg-emerald-50 text-emerald-800' },
                    { sym: 'g', score: '82%', cls: 'bg-emerald-50 text-emerald-800' },
                    { sym: 'f', score: '85%', cls: 'bg-emerald-50 text-emerald-800' },
                    { sym: 'v', score: '80%', cls: 'bg-emerald-50 text-emerald-800' },
                    { sym: 'θ', score: '54%', cls: 'bg-rose-50 text-rose-800 ring-2 ring-rose-400 font-black' },
                    { sym: 'ð', score: '64%', cls: 'bg-amber-50 text-amber-800' },
                    { sym: 's', score: '86%', cls: 'bg-emerald-50 text-emerald-800' },
                    { sym: 'z', score: '81%', cls: 'bg-emerald-50 text-emerald-800' },
                    { sym: 'ʃ', score: '66%', cls: 'bg-amber-50 text-amber-800' },
                    { sym: 'ʒ', score: '62%', cls: 'bg-amber-50 text-amber-800' },
                    { sym: 'h', score: '90%', cls: 'bg-emerald-50 text-emerald-800' },
                    { sym: 'tʃ', score: '72%', cls: 'bg-amber-50 text-amber-800' },
                    { sym: 'dʒ', score: '65%', cls: 'bg-amber-50 text-amber-800' },
                    { sym: 'm', score: '94%', cls: 'bg-emerald-50 text-emerald-800' },
                    { sym: 'n', score: '93%', cls: 'bg-emerald-50 text-emerald-800' },
                    { sym: 'ŋ', score: '87%', cls: 'bg-emerald-50 text-emerald-800' },
                    { sym: 'l', score: '81%', cls: 'bg-emerald-50 text-emerald-800' },
                    { sym: 'r', score: '78%', cls: 'bg-emerald-50 text-emerald-800' },
                    { sym: 'w', score: '89%', cls: 'bg-emerald-50 text-emerald-800' },
                    { sym: 'j', score: '90%', cls: 'bg-emerald-50 text-emerald-800' }
                  ].map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedPhoneme({
                          symbol: `/${p.sym}/`,
                          name: `Phụ âm /${p.sym}/`,
                          score: p.score,
                          state: p.score < '60%' ? 'Yếu Cần Khắc Phục' : (p.score < '80%' ? 'Đang Luyện' : 'Làm Chủ'),
                          desc: p.sym === 'θ'
                            ? 'Lỗi phổ biến: Đầu lưỡi rụt lại quá sớm tạo thành âm tắc /t/ hoặc trượt ra /s/.'
                            : 'Đối chiếu khẩu hình và vị trí điểm thắt luồng khí.'
                        });
                        playTTS(p.sym);
                      }}
                      className={`${p.cls} p-2 rounded-lg text-center transition-all group flex flex-col items-center hover:shadow-xs cursor-pointer`}
                    >
                      <span className="font-ipa-display text-ipa-display leading-tight group-hover:scale-110 transition-transform font-bold">
                        {p.sym}
                      </span>
                      <span className="font-label-mono text-[10px]">{p.score}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Dynamic Phoneme Preview Bar */}
            <div className="bg-slate-50 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-200">
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center font-ipa-display text-2xl font-bold">
                  {selectedPhoneme.symbol}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-headline-sm text-headline-sm text-slate-900 font-bold">
                      {selectedPhoneme.name}
                    </h4>
                    <span className="font-label-mono text-label-mono px-2 py-0.5 rounded bg-rose-100 text-rose-700 font-bold">
                      {selectedPhoneme.score} - {selectedPhoneme.state}
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-slate-500">{selectedPhoneme.desc}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('khau-hinh-2d')}
                className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg bg-rose-600 text-white font-label-md text-label-md hover:bg-rose-700 transition-all font-semibold shadow-sm cursor-pointer"
              >
                <span>Xem Khẩu Hình &amp; Luyện Ngay</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Urgent Focus Card (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-xl p-6 lg:p-8 shadow-sm flex flex-col justify-between space-y-6 border border-slate-200">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-lg bg-rose-50 text-rose-600">
                    <span className="material-symbols-outlined text-xl">priority_high</span>
                  </span>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-slate-900 font-bold">
                      Cần Khắc Phục Ngay
                    </h3>
                    <p className="font-label-mono text-label-mono text-rose-600 font-semibold">
                      Top 3 Âm Kéo Tụt Điểm GOP
                    </p>
                  </div>
                </div>
              </div>
              <p className="font-body-sm text-body-sm text-slate-500 mt-3">
                Hệ thống nhận diện 3 âm tiết có tỉ lệ sai lệch phổ âm thanh F1/F2 trên 35% so với người bản xứ:
              </p>

              <div className="space-y-3.5 mt-5">
                {/* Sound 1: /θ/ */}
                <div className="p-3.5 rounded-xl bg-rose-50/60 hover:bg-rose-50 transition-colors flex items-center justify-between border border-rose-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white text-rose-600 flex items-center justify-center font-ipa-display text-xl font-bold shadow-xs border border-rose-200">
                      θ
                    </div>
                    <div>
                      <div className="font-label-md text-label-md text-slate-900 font-bold">Âm /θ/ (Think, Path)</div>
                      <div className="font-label-mono text-[11px] text-rose-700">
                        Chính xác: <strong>54%</strong> • Lỗi /t/ thế chỗ
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('khau-hinh-2d')}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-label-mono text-[11px] font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                  >
                    <span>Luyện</span>
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </button>
                </div>

                {/* Sound 2: /ks/ */}
                <div className="p-3.5 rounded-xl bg-rose-50/60 hover:bg-rose-50 transition-colors flex items-center justify-between border border-rose-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white text-rose-600 flex items-center justify-center font-ipa-display text-xl font-bold shadow-xs border border-rose-200">
                      ks
                    </div>
                    <div>
                      <div className="font-label-md text-label-md text-slate-900 font-bold">Cụm /ks/ (Six, Box)</div>
                      <div className="font-label-mono text-[11px] text-rose-700">
                        Chính xác: <strong>58%</strong> • Hay nuốt /k/
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('phong-luyen-phat-am')}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-label-mono text-[11px] font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                  >
                    <span>Luyện</span>
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </button>
                </div>

                {/* Sound 3: /æ/ */}
                <div className="p-3.5 rounded-xl bg-amber-50/70 hover:bg-amber-50 transition-colors flex items-center justify-between border border-amber-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white text-amber-700 flex items-center justify-center font-ipa-display text-xl font-bold shadow-xs border border-amber-200">
                      æ
                    </div>
                    <div>
                      <div className="font-label-md text-label-md text-slate-900 font-bold">Âm /æ/ (Cat, Man)</div>
                      <div className="font-label-mono text-[11px] text-amber-800">
                        Chính xác: <strong>61%</strong> • Nhầm /e/ Việt
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('khau-hinh-2d')}
                    className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-label-mono text-[11px] font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                  >
                    <span>Luyện</span>
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-sky-50 border border-sky-100">
              <span className="font-label-mono text-label-mono text-sky-800 font-bold flex items-center gap-1 mb-1">
                <span className="material-symbols-outlined text-sm text-sky-600">tips_and_updates</span>
                Khuyến Nghị Tuần Này:
              </span>
              <p className="font-body-sm text-body-sm text-slate-700 leading-relaxed">
                Tập trung xử lý triệt để cụm phụ âm đuôi /ks/ và âm kẹp lưỡi /θ/. Dự kiến hoàn thành 3 ải RPG sẽ nâng điểm GOP lên 82%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
