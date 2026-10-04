import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import SpacedRepetitionDeck from '../components/error-bank/SpacedRepetitionDeck';

const ERROR_WORDS = [
  {
    id: 'comfortable',
    word: 'Comfortable',
    ipa: '/ˈkʌmftəbl/',
    tag: 'Tính từ • 3 Syllables • Level B1',
    due: 'Hôm nay',
    sm2Cycle: 'Lần 3',
    mastery: 65,
    category: 'swallow',
    wrongHabit: 'Người Việt hay đọc 4 âm tiết phẳng com-pho-tay-bồ.',
    correction: 'Chuẩn âm học là 3 âm tiết với trọng âm dồn âm đầu: /ˈkʌmf.tə.bl/.',
    errorNote: 'Mất nuốt âm /f/'
  },
  {
    id: 'clothes',
    word: 'Clothes',
    ipa: '/kloʊðz/',
    tag: 'Danh từ • 1 Syllable • Level A2',
    due: 'Hôm nay',
    sm2Cycle: 'Lần 2',
    mastery: 42,
    category: 'ending',
    wrongHabit: 'Người Việt đọc thành "cờ-lâu-thịt" (2 âm tiết) hoặc rụng cụm /-ðz/.',
    correction: 'Chỉ phát âm 1 âm tiết, lướt nhanh từ âm lưỡi kẹp /ð/ trượt sang âm xát rung /z/.',
    errorNote: 'Thiếu cụm âm đuôi /ðz/'
  },
  {
    id: 'specific',
    word: 'Specific',
    ipa: '/spəˈsɪfɪk/',
    tag: 'Tính từ • 3 Syllables • Level B2',
    due: 'Hôm nay',
    sm2Cycle: 'Lần 1',
    mastery: 28,
    category: 'flat',
    wrongHabit: 'Bỏ quên âm đuôi /k/ thành "spe-ci-phi" và nhấn dấu sắc sai quy tắc vào âm đầu.',
    correction: 'Trọng âm rơi vào âm tiết thứ hai /ˈsɪf/, hạ thấp âm đầu và bật sắc gọn âm đuôi /k/.',
    errorNote: 'Sai trọng âm & thiếu coda /k/'
  }
];

export default function ProUpgradeView() {
  const { setUpgradeModalOpen } = useApp();
  const [filter, setFilter] = useState('all');
  const [selectedPlan, setSelectedPlan] = useState('lifetime');
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [recordingWordId, setRecordingWordId] = useState(null);

  const playTTS = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSimulateRecord = (wordId) => {
    setRecordingWordId(wordId);
    setTimeout(() => {
      setRecordingWordId(null);
      alert('Đã ghi nhận! Độ lệch âm học giảm 15%. Thuật toán SM-2 lùi chu kỳ ôn tập sang 3 ngày tới.');
    }, 1800);
  };

  const filteredWords = filter === 'all'
    ? ERROR_WORDS
    : ERROR_WORDS.filter(w => w.category === filter);

  return (
    <div className="flex flex-col w-full animate-fade-in">
      <div className="absolute top-96 right-10 w-[500px] h-[500px] bg-sky-200/35 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-gutter-desktop py-space-xl flex flex-col gap-space-xl w-full">
        {/* SECTION 1: ERROR VOCABULARY BANK */}
        <section className="flex flex-col gap-space-lg">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
            <div className="flex flex-col gap-space-xs max-w-2xl">
              <div className="flex items-center gap-space-xs flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 font-label-mono text-label-mono text-sky-700 font-semibold shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></span>
                  ALGORITHM: SUPERMEMO SM-2 COGNITIVE RETENTION
                </span>
                <span className="font-label-mono text-label-mono text-slate-500">| L1 Transfer Calibrated</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-slate-900 tracking-tight font-extrabold mt-1">
                Ngân Hàng Từ Lỗi Cá Nhân &amp; Chu Kỳ Lặp Lại
              </h1>
              <p className="font-body-md text-body-md text-slate-600 leading-relaxed">
                Theo dõi biến thiên phổ âm thanh và triệt tiêu lỗi nuốt âm, phát âm bẹt giọng tiếng Việt thông qua chu kỳ ngắt quãng thích ứng sinh học.
              </p>
            </div>

            {/* Metric Pills */}
            <div className="flex items-center gap-space-sm overflow-x-auto pb-2 lg:pb-0">
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white border border-rose-200 shadow-sm shrink-0">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-600"></span>
                </span>
                <div className="flex flex-col">
                  <span className="font-label-mono text-label-mono text-slate-500 uppercase">Cần Ôn Hôm Nay</span>
                  <span className="font-headline-sm text-headline-sm text-rose-700 leading-none font-bold">07 Từ</span>
                </div>
              </div>

              <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white border border-amber-200 shadow-sm shrink-0">
                <span className="h-3 w-3 rounded-full bg-amber-500"></span>
                <div className="flex flex-col">
                  <span className="font-label-mono text-label-mono text-slate-500 uppercase">3 Ngày Tới</span>
                  <span className="font-headline-sm text-headline-sm text-amber-700 leading-none font-bold">14 Từ</span>
                </div>
              </div>

              <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white border border-emerald-200 shadow-sm shrink-0">
                <span className="h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                <div className="flex flex-col">
                  <span className="font-label-mono text-label-mono text-slate-500 uppercase">Đã Làm Chủ</span>
                  <span className="font-headline-sm text-headline-sm text-emerald-700 leading-none font-bold">89 Từ</span>
                </div>
              </div>
            </div>
          </div>

          {/* ELSA-402: Automated Error Bank with Spaced Repetition (SM-2) Deck */}
          <SpacedRepetitionDeck />

          {/* Filter Tabs */}
          <div className="flex items-center justify-between gap-space-md overflow-x-auto pb-1">
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-200/70 border border-slate-200 shrink-0">
              <button aria-label="Nút tương tác" type="button"
                onClick={() => setFilter('all')}
                className={`font-body-sm text-body-sm px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
                  filter === 'all' ? 'bg-white text-rose-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tất Cả Lỗi (110)
              </button>
              <button aria-label="Nút tương tác" type="button"
                onClick={() => setFilter('ending')}
                className={`font-body-sm text-body-sm px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
                  filter === 'ending' ? 'bg-white text-rose-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Lỗi Âm Đuôi /s/, /ks/, /t/ (46)
              </button>
              <button aria-label="Nút tương tác" type="button"
                onClick={() => setFilter('flat')}
                className={`font-body-sm text-body-sm px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
                  filter === 'flat' ? 'bg-white text-rose-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Lỗi Trọng Âm Flat Tone (38)
              </button>
              <button aria-label="Nút tương tác" type="button"
                onClick={() => setFilter('swallow')}
                className={`font-body-sm text-body-sm px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
                  filter === 'swallow' ? 'bg-white text-rose-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Lỗi Nuốt Âm &amp; Cụm Phụ Âm (26)
              </button>
            </div>
            <span className="font-label-mono text-label-mono text-slate-500 hidden xl:block">
              Lần đồng bộ âm học cuối: 12 phút trước
            </span>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-space-md">
            {filteredWords.map((item) => (
              <article
                key={item.id}
                className="flex flex-col justify-between bg-white rounded-xl p-space-lg shadow-sm hover:shadow-md border border-slate-200/90 transition-all relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-sky-500 to-rose-500"></div>
                <div className="flex flex-col gap-space-md">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <h3 className="font-headline-md text-headline-md text-slate-900 font-bold">{item.word}</h3>
                        <span className="font-ipa-display text-ipa-display text-rose-600 font-semibold">{item.ipa}</span>
                      </div>
                      <span className="font-label-mono text-label-mono text-slate-500 uppercase">{item.tag}</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-rose-50 border border-rose-200 text-rose-700 font-label-mono text-label-mono font-semibold">
                      Hạn ôn: {item.due}
                    </span>
                  </div>

                  {/* SM-2 Progress */}
                  <div className="flex flex-col gap-2 p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="flex items-center justify-between text-xs font-label-mono">
                      <span className="text-slate-500">Chu kỳ SM-2: {item.sm2Cycle}</span>
                      <span className="text-sky-700 font-bold">Độ thuần thục: {item.mastery}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-sky-400 to-sky-600 rounded-full"
                        style={{ width: `${item.mastery}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Vietnamese L1 Bias */}
                  <div className="flex flex-col gap-2 p-3.5 rounded-lg bg-rose-50/70 border border-rose-100">
                    <div className="flex items-center gap-1.5 text-rose-700">
                      <span className="material-symbols-outlined text-sm font-semibold">warning</span>
                      <span className="font-label-mono text-label-mono uppercase tracking-wider font-bold">
                        Lỗi L1 Tiếng Việt Phổ Biến
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-slate-800 leading-relaxed">
                      {item.wrongHabit} <strong className="text-sky-700">{item.correction}</strong>
                    </p>
                  </div>

                  {/* Spectrum Match Row */}
                  <div className="flex flex-col gap-1.5">
                    <span className="font-label-mono text-label-mono text-slate-500 font-semibold">Phổ âm so khớp:</span>
                    <div className="h-10 w-full rounded-lg bg-slate-50 border border-slate-200/80 flex items-center px-3 justify-between">
                      <div className="flex items-end gap-1 h-6">
                        <span className="w-1 bg-rose-400 h-3 rounded-full"></span>
                        <span className="w-1 bg-rose-500 h-5 rounded-full"></span>
                        <span className="w-1 bg-rose-600 h-6 rounded-full"></span>
                        <span className="w-1 bg-rose-500 h-4 rounded-full"></span>
                        <span className="w-1 bg-rose-400 h-2 rounded-full"></span>
                        <span className="w-1 bg-slate-300 h-1 rounded-full"></span>
                        <span className="w-1 bg-sky-500 h-4 rounded-full"></span>
                        <span className="w-1 bg-sky-600 h-6 rounded-full"></span>
                        <span className="w-1 bg-sky-400 h-3 rounded-full"></span>
                        <span className="w-1 bg-sky-300 h-2 rounded-full"></span>
                      </div>
                      <span className="font-label-mono text-label-mono text-rose-700 flex items-center gap-1 font-semibold">
                        <span className="material-symbols-outlined text-xs">close</span> {item.errorNote}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 pt-space-md mt-space-md border-t border-slate-100">
                  <div className="grid grid-cols-2 gap-2">
                    <button aria-label="Nút tương tác"
                      onClick={() => alert(`Đang phát bản ghi lỗi được ghi nhận gần nhất cho từ "${item.word}"`)}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-body-sm text-body-sm border border-slate-200/80 transition-all font-medium cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-base text-rose-600">record_voice_over</span>
                      <span>Nghe Lỗi Của Tôi</span>
                    </button>
                    <button aria-label="Phát âm mẫu chuẩn bản ngữ"
                      onClick={() => playTTS(item.word)}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-sky-700 font-body-sm text-body-sm border border-slate-200/80 transition-all font-medium cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-base text-sky-600">verified</span>
                      <span>Bản Ngữ Chuẩn</span>
                    </button>
                  </div>
                  <button aria-label="Nút tương tác"
                    onClick={() => handleSimulateRecord(item.id)}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600 text-white font-headline-sm text-headline-sm font-semibold shadow-sm hover:shadow transition-all cursor-pointer"
                    type="button"
                  >
                    <span>🎙️</span>
                    <span>{recordingWordId === item.id ? 'Đang lắng nghe...' : 'Ghi Âm Luyện Lại Ngay'}</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SECTION 2: PRO UPGRADE CARD & SCIENTIFIC COMPARISON */}
        <section className="relative rounded-2xl bg-white p-6 md:p-10 shadow-lg border border-slate-200/80 overflow-hidden">
          <div className="absolute -right-24 -top-24 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-sky-200/40 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col gap-space-xl">
            {/* Header */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md pb-space-lg border-b border-slate-200">
              <div className="flex items-center gap-space-md">
                <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shadow-sm shrink-0">
                  <span className="material-symbols-outlined text-3xl">lock_open</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-100 border border-rose-200 text-rose-700 font-label-mono text-label-mono font-bold uppercase tracking-wider">
                      Hạn Mức Miễn Phí Đạt 5/5
                    </span>
                    <span className="font-label-mono text-label-mono text-slate-500">Daily Session Reset: 00:00:00</span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-slate-900 font-extrabold tracking-tight mt-1">
                    Chúc mừng bạn đã hoàn thành 5 bài học miễn phí hôm nay!
                  </h2>
                  <p className="font-body-md text-body-md text-slate-600 mt-1">
                    Nâng cấp <span className="text-rose-600 font-bold">VietPhonics PRO</span> để gỡ bỏ hoàn toàn giới hạn và kích hoạt AI Phòng Thí Nghiệm Âm Học L1 chuyên sâu.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-space-xs shrink-0 self-stretch lg:self-auto justify-end">
                <span className="font-label-mono text-label-mono text-slate-500">Đảm bảo kết quả:</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 font-label-mono text-label-mono text-emerald-700 font-semibold shadow-xs">
                  <span className="material-symbols-outlined text-base">verified_user</span>
                  100% Hoàn tiền 7 ngày
                </span>
              </div>
            </div>

            {/* Split Comparison & Pricing Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
              {/* Left: Scientific Feature Comparison */}
              <div className="lg:col-span-7 flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <span className="font-label-mono text-label-mono text-sky-800 uppercase tracking-widest font-bold">
                    Bảng So Sánh Quyền Lợi Khoa Học
                  </span>
                  <span className="font-label-mono text-label-mono text-slate-500 font-medium">Chuẩn CEFR &amp; L1 Matrix</span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left font-body-sm text-body-sm bg-white">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="p-3.5 text-slate-600 font-label-mono text-label-mono uppercase">Tính Năng Cốt Lõi</th>
                        <th className="p-3.5 text-slate-600 font-label-mono text-label-mono uppercase text-center w-28">Tài Khoản Free</th>
                        <th className="p-3.5 text-rose-700 font-label-mono text-label-mono uppercase text-center w-40 bg-rose-50/60 font-bold">
                          VietPhonics PRO
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="py-3 px-3.5">
                          <div className="font-semibold text-slate-900">AI Speaking Roleplay</div>
                          <div className="text-slate-500 text-xs">Mô phỏng hội thoại phản xạ trực tiếp</div>
                        </td>
                        <td className="py-3 px-3 text-center text-slate-500 font-label-mono">5 lượt/ngày</td>
                        <td className="py-3 px-3 text-center text-sky-800 font-bold bg-rose-50/20">
                          Không giới hạn + 120 kịch bản công sở
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3.5">
                          <div className="font-semibold text-slate-900">Soi Giải Phẫu Khẩu Hình 2D</div>
                          <div className="text-slate-500 text-xs">Cử động vòm họng, môi và độ cong lưỡi</div>
                        </td>
                        <td className="py-3 px-3 text-center text-slate-500 font-label-mono">Cơ bản 5 âm</td>
                        <td className="py-3 px-3 text-center text-sky-800 font-bold bg-rose-50/20">
                          Đầy đủ 44 âm IPA + Cảm biến 3D
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3.5">
                          <div className="font-semibold text-slate-900">Luyện Đề IELTS Mock Examiner</div>
                          <div className="text-slate-500 text-xs">Chấm phát âm theo tiêu chí Pronunciation Band</div>
                        </td>
                        <td className="py-3 px-3 text-center text-rose-600 font-label-mono font-medium">
                          <span className="inline-flex items-center gap-1">
                            <span className="material-symbols-outlined text-base">lock</span> Khóa
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center text-sky-800 font-bold bg-rose-50/20">
                          Chấm chi tiết IELTS Descriptors
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3.5">
                          <div className="font-semibold text-slate-900">Lộ Trình Sửa Giọng Vùng Miền</div>
                          <div className="text-slate-500 text-xs">Bù trừ thói quen giọng Bắc, Trung, Nam</div>
                        </td>
                        <td className="py-3 px-3 text-center text-slate-500 font-label-mono">Bắc mặc định</td>
                        <td className="py-3 px-3 text-center text-sky-800 font-bold bg-rose-50/20">
                          Hiệu chỉnh 3 miền Bắc - Trung - Nam
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center gap-space-sm p-3.5 rounded-lg bg-sky-50 border border-sky-100">
                  <span className="material-symbols-outlined text-sky-700 text-xl shrink-0">psychology</span>
                  <p className="font-body-sm text-body-sm text-slate-700 leading-relaxed">
                    <strong className="text-slate-900">Nghiên cứu thần kinh học ngôn ngữ:</strong> Luyện tập phản hồi âm phổ liên tục trong 21 ngày giúp tăng độ nhạy cơ hàm nói tiếng Anh lên 320% so với phương pháp nghe chép truyền thống.
                  </p>
                </div>
              </div>

              {/* Right: Plan Picker & VietQR Checkout */}
              <div className="lg:col-span-5 flex flex-col gap-space-md">
                <span className="font-label-mono text-label-mono text-rose-700 uppercase tracking-widest font-bold">
                  Chọn Gói Đăng Ký PRO
                </span>

                <div className="flex flex-col gap-space-sm">
                  {/* Plan 1: 6 Tháng */}
                  <label
                    onClick={() => setSelectedPlan('6m')}
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedPlan === '6m' ? 'bg-white border-2 border-rose-500 shadow-md' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="pro_plan"
                        checked={selectedPlan === '6m'}
                        onChange={() => setSelectedPlan('6m')}
                        className="w-4 h-4 text-rose-600 focus:ring-0 cursor-pointer"
                      />
                      <div className="flex flex-col">
                        <span className="font-headline-sm text-headline-sm text-slate-900 font-bold">Gói 6 Tháng</span>
                        <span className="font-body-sm text-body-sm text-slate-500">Thanh toán 1 lần 100.000đ</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-headline-md text-headline-md text-slate-900 font-extrabold">100.000đ</span>
                      <span className="font-label-mono text-label-mono text-slate-500">/ 6 tháng</span>
                    </div>
                  </label>

                  {/* Plan 2: Lifetime VIP */}
                  <label
                    onClick={() => setSelectedPlan('lifetime')}
                    className={`relative flex flex-col p-5 rounded-xl border-2 cursor-pointer shadow-md transition-all ${
                      selectedPlan === 'lifetime' ? 'bg-white border-rose-500' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-gradient-to-r from-rose-600 to-rose-500 text-white font-label-mono text-[10px] font-bold uppercase tracking-wider shadow-sm">
                      🌟 Khuyên Dùng • Tiết Kiệm 75%
                    </div>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="pro_plan"
                          checked={selectedPlan === 'lifetime'}
                          onChange={() => setSelectedPlan('lifetime')}
                          className="w-5 h-5 text-rose-600 focus:ring-0 cursor-pointer"
                        />
                        <div className="flex flex-col">
                          <span className="font-headline-md text-headline-md text-slate-900 font-extrabold">
                            Gói Trọn Đời (Lifetime VIP)
                          </span>
                          <span className="font-body-sm text-body-sm text-rose-600 font-semibold">
                            Sở hữu vĩnh viễn không gia hạn
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-headline-lg text-headline-lg text-rose-600 font-black">200.000đ</span>
                        <span className="line-through font-label-mono text-label-mono text-slate-400">1.299.000đ</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-4 pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-2 font-body-sm text-body-sm text-slate-700">
                        <span className="material-symbols-outlined text-sm text-emerald-600 font-bold">check_circle</span>
                        <span>Tặng kèm Bộ 44 Video Khẩu Hình Giảng Viên Anh-Mỹ chuyên sâu</span>
                      </div>
                      <div className="flex items-center gap-2 font-body-sm text-body-sm text-slate-700">
                        <span className="material-symbols-outlined text-sm text-emerald-600 font-bold">check_circle</span>
                        <span>Kích hoạt Khiên Bảo Vệ Streak Vĩnh Viễn (Không lo mất chuỗi)</span>
                      </div>
                    </div>
                  </label>
                </div>

                {/* Checkout Button */}
                <div className="flex flex-col gap-space-xs">
                  <button aria-label="Nâng cấp gói VietPhonics PRO"
                    onClick={() => setQrModalOpen(true)}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 text-white font-headline-md text-headline-md font-bold shadow-md hover:shadow-lg hover:from-rose-700 hover:to-rose-600 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined font-bold">bolt</span>
                    <span>NÂNG CẤP PRO NGAY — KÍCH HOẠT TỨC THÌ</span>
                  </button>
                  <div className="flex items-center justify-center gap-2 text-center">
                    <span className="font-label-mono text-label-mono text-slate-500">
                      Khóa học được cấp chứng chỉ chuẩn IPA sau 60 giờ thực hành
                    </span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="flex flex-col gap-2 pt-2">
                  <span className="font-label-mono text-label-mono text-slate-400 uppercase text-center font-bold">
                    Cổng Thanh Toán Nội Địa &amp; Quốc Tế Hỗ Trợ
                  </span>
                  <div className="flex items-center justify-center flex-wrap gap-2">
                    <span className="px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200/90 font-label-mono text-label-mono text-slate-700 flex items-center gap-1.5 shadow-2xs font-semibold">
                      <span className="w-2 h-2 rounded-full bg-pink-500"></span> MoMo
                    </span>
                    <span className="px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200/90 font-label-mono text-label-mono text-slate-700 flex items-center gap-1.5 shadow-2xs font-semibold">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span> ZaloPay
                    </span>
                    <span className="px-2.5 py-1.5 rounded-lg bg-sky-50 border border-sky-200 font-label-mono text-label-mono text-sky-800 flex items-center gap-1.5 shadow-2xs font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span> VietQR (Napas247)
                    </span>
                    <span className="px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200/90 font-label-mono text-label-mono text-slate-700 flex items-center gap-1.5 shadow-2xs font-semibold">
                      💳 Visa / Mastercard
                    </span>
                    <span className="px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200/90 font-label-mono text-label-mono text-slate-700 flex items-center gap-1.5 shadow-2xs font-semibold">
                       Apple Pay
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom 3 Trust Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md pt-space-md border-t border-slate-200">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="material-symbols-outlined text-sky-600 text-2xl">verified</span>
                <div className="flex flex-col">
                  <span className="font-body-md text-body-md text-slate-900 font-bold">100% Hoàn Tiền 7 Ngày</span>
                  <span className="font-body-sm text-body-sm text-slate-500">Không yêu cầu lý do nếu không thấy tiến bộ.</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="material-symbols-outlined text-rose-600 text-2xl">lock</span>
                <div className="flex flex-col">
                  <span className="font-body-md text-body-md text-slate-900 font-bold">Bảo Mật Cấp Ngân Hàng</span>
                  <span className="font-body-sm text-body-sm text-slate-500">Mã hóa chuẩn PCI-DSS qua cổng thanh toán Napas.</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="material-symbols-outlined text-indigo-600 text-2xl">headset_mic</span>
                <div className="flex flex-col">
                  <span className="font-body-md text-body-md text-slate-900 font-bold">Trợ Giảng Âm Học 1-on-1</span>
                  <span className="font-body-sm text-body-sm text-slate-500">Hỗ trợ giải đáp bài khó qua nhóm VIP Zalo.</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* VietQR Quick Payment Modal */}
      {qrModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative animate-scale-in">
            <button aria-label="Nâng cấp gói VietPhonics PRO" type="button"
              onClick={() => setQrModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="flex items-center gap-2 mb-4">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
              <h3 className="font-bold text-lg text-slate-900">Quét Mã VietQR Napas 24/7</h3>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col items-center gap-3">
              {/* QR Mockup */}
              <div className="w-56 h-56 bg-white border border-slate-300 rounded-xl p-2 flex flex-col items-center justify-center relative shadow-sm">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=2|99|0969696969|VIETPHONICS|PRO_LIFETIME|0|0|200000|VP_PRO_SUB"
                  alt="VietQR Napas247"
                  className="w-48 h-48 object-contain"
                />
              </div>

              <div className="w-full text-center space-y-1">
                <div className="text-xs text-slate-500 font-mono">Chủ TK: VIETPHONICS AI LAB</div>
                <div className="text-base font-black text-rose-600">
                  {selectedPlan === 'lifetime' ? '200.000 VNĐ' : '100.000 VNĐ'}
                </div>
                <div className="text-xs font-mono text-slate-700 bg-slate-200/80 px-2 py-1 rounded inline-block">
                  Cú pháp: <strong className="text-sky-700 font-bold">VP PRO 0969696969</strong>
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button aria-label="Nâng cấp gói VietPhonics PRO" type="button"
                onClick={() => {
                  setQrModalOpen(false);
                  alert('Kích hoạt tài khoản VietPhonics PRO thành công! Chúc mừng bạn đã sở hữu trọn đời.');
                }}
                className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-md transition-all text-sm"
              >
                Tôi Đã Chuyển Khoản Thành Công
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
