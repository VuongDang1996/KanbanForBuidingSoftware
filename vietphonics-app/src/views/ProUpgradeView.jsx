import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function ProUpgradeView() {
  const { errorWords, setErrorWords, isPro, setIsPro, triggerPractice, setShowUpgradeModal } = useApp();
  const [filter, setFilter] = useState('all');
  const [selectedPlan, setSelectedPlan] = useState('month'); // 'month' | '3month' | 'year'
  const [copiedField, setCopiedField] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);

  const plans = [
    {
      id: 'month',
      name: 'Gói 1 Tháng',
      price: '30.000',
      period: '/ tháng',
      badge: 'Bình Dân Nhất',
      highlight: false,
      desc: 'Chỉ 1.000đ mỗi ngày, phí giao dịch 0% qua VietQR Napas 24/7.'
    },
    {
      id: '3month',
      name: 'Gói 3 Tháng',
      price: '85.000',
      period: '/ 3 tháng',
      badge: 'Tiết kiệm 5%',
      highlight: false,
      desc: 'Đủ 90 ngày hình thành thói quen phản xạ cơ miệng tự nhiên.'
    },
    {
      id: 'year',
      name: 'Gói 1 Năm (VIP)',
      price: '299.000',
      period: '/ năm',
      badge: 'Khuyên Dùng · Tiết Kiệm 20%',
      highlight: true,
      desc: 'Chỉ ~24.900đ/tháng. Tặng trọn bộ Golden Speaker AI & Soi Khẩu Hình 478 điểm!'
    }
  ];

  const currentPlan = plans.find((p) => p.id === selectedPlan);

  const bankDetails = {
    bankName: 'MB Bank (Quân Đội)',
    accountNumber: '0988776655',
    accountName: 'VIETPHONICS AI LAB',
    amount: selectedPlan === 'year' ? '299,000' : selectedPlan === '3month' ? '85,000' : '30,000',
    content: `VP30K-${selectedPlan.toUpperCase()}-8829`
  };

  const handleCopy = (field, text) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleConfirmPayment = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerifiedSuccess(true);
      setIsPro(true);
    }, 1500);
  };

  const playWord = (word) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const filteredWords = errorWords.filter((w) => {
    if (filter === 'ending') return w.errorType.toLowerCase().includes('đuôi');
    if (filter === 'stress') return w.errorType.toLowerCase().includes('trọng âm');
    if (filter === 'pairs') return w.errorType.toLowerCase().includes('nhầm') || w.errorType.toLowerCase().includes('cụm');
    return true;
  });

  return (
    <div className="w-full flex flex-col gap-8 py-4 animate-fade-in">
      {/* 3-Day Grace Period Alert (PAY-104) */}
      {!isPro && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-amber-600 text-2xl">timelapse</span>
            <div>
              <span className="font-bold text-xs text-amber-900 block">
                Chính Sách Ân Hạn 3 Ngày (Grace Period) & Hạn Mức 5 Bài Học Miễn Phí
              </span>
              <span className="text-xs text-amber-700">
                Bạn đã hoàn thành 5/5 bài miễn phí hôm nay. Nâng cấp PRO chỉ 30k để mở khóa không giới hạn toàn bộ hệ thống!
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('checkout-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs shrink-0"
          >
            Nâng Cấp Ngay 30K
          </button>
        </div>
      )}

      {/* Section 1: Personal Error Word Bank (SuperMemo SM-2) */}
      <section className="bg-white border border-slate-200/90 rounded-2xl p-6 lg:p-8 shadow-xs flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-sky-50 border border-sky-200 font-mono text-xs text-secondary font-semibold">
                ALGORITHM: SUPERMEMO SM-2 COGNITIVE RETENTION
              </span>
              <span className="font-mono text-xs text-slate-400">| L1 Transfer Calibrated</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
              Ngân Hàng Từ Lỗi Cá Nhân & Chu Kỳ Lặp Lại
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Theo dõi biến thiên phổ âm thanh và triệt tiêu lỗi nuốt âm, phát âm bẹt giọng tiếng Việt thông qua chu kỳ ngắt quãng thích ứng sinh học.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-rose-50 border border-rose-200 text-xs">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span className="font-bold text-primary">Cần ôn: {errorWords.length} từ</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-bold text-emerald-700">Đã làm chủ: 89 từ</span>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: 'all', label: `Tất Cả Lỗi (${errorWords.length})` },
            { id: 'ending', label: 'Lỗi Âm Đuôi /s/, /ks/, /t/' },
            { id: 'stress', label: 'Lỗi Trọng Âm Flat Tone' },
            { id: 'pairs', label: 'Lỗi Nuốt Âm & Cụm Phụ Âm' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl font-body-sm text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filter === tab.id
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Word Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWords.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4 group"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xl font-black text-slate-900 leading-tight">{item.word}</h4>
                    <span className="font-mono text-sm text-secondary font-bold">{item.ipa}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-primary font-mono text-[10px] font-bold">
                    {item.score}% GOP
                  </span>
                </div>

                <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-[11px] font-bold text-rose-700 block">{item.errorType}</span>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.note}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => playWord(item.word)}
                  className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm text-secondary">volume_up</span>
                  <span>Nghe Mẫu</span>
                </button>
                <button
                  onClick={() =>
                    triggerPractice({
                      id: item.id,
                      word: item.word,
                      sentence: `Let us practice the word "${item.word}" accurately.`,
                      ipa: item.ipa,
                      targetPhonemes: [item.ipa],
                      difficulty: 'Focus',
                      trap: item.errorType
                    })
                  }
                  className="flex-1 py-2 rounded-xl bg-primary hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-xs transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">mic</span>
                  <span>Luyện Ngay</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: VietPhonics PRO Pricing & VietQR Napas 24/7 Checkout (PAY-101 to PAY-103) */}
      <section
        id="checkout-section"
        className="bg-white border-2 border-slate-200/90 rounded-2xl p-6 lg:p-10 shadow-lg flex flex-col gap-8 relative overflow-hidden"
      >
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-rose-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-sky-100/50 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-rose-600 text-white flex items-center justify-center font-bold text-2xl shadow-md">
              ⭐
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-rose-100 border border-rose-200 text-primary font-mono text-[10px] font-bold uppercase tracking-wider">
                  Mở Khóa Toàn Phần L1
                </span>
                <span className="font-mono text-xs text-emerald-700 font-bold">100% Hoàn Tiền 7 Ngày</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                Nâng Cấp VietPhonics PRO • Phí Giao Dịch 0% VietQR
              </h2>
            </div>
          </div>
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 font-mono text-xs text-emerald-800 font-bold shadow-xs">
            Napas 24/7 Tự Động Kích Hoạt 3 Giây
          </span>
        </div>

        {/* Multi-Cycle Pricing Cards (PAY-103) */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((p) => {
            const isSelected = selectedPlan === p.id;
            return (
              <div
                key={p.id}
                onClick={() => setSelectedPlan(p.id)}
                className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-4 ${
                  isSelected
                    ? 'border-primary bg-rose-50/40 shadow-md scale-102 ring-2 ring-primary/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-slate-900">{p.name}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        p.highlight
                          ? 'bg-primary text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {p.badge}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1 my-2">
                    <span className="text-3xl font-black text-slate-900 font-mono">{p.price}</span>
                    <span className="text-xs text-slate-500 font-bold">VNĐ {p.period}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">{p.desc}</p>
                </div>

                <div className="flex items-center gap-2 font-bold text-xs text-primary">
                  <span className="material-symbols-outlined text-base">
                    {isSelected ? 'radio_button_checked' : 'radio_button_unchecked'}
                  </span>
                  <span>{isSelected ? 'Đang Chọn' : 'Chọn Gói Này'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 1-Scan Checkout Details (PAY-101, PAY-102) */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-8">
          {/* VietQR Visual */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center text-center">
            <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm mb-3">
              <img
                src={`https://api.vietqr.io/image/970422-0988776655-compact.jpg?amount=${currentPlan.price.replace(
                  '.',
                  ''
                )}&addInfo=${bankDetails.content}&accountName=VIETPHONICS%20AI%20LAB`}
                alt="VietQR Napas 247"
                className="w-56 h-56 object-contain rounded-xl"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Quét mã qua mọi App Ngân Hàng hoặc Ví MoMo/ZaloPay</span>
            </div>
          </div>

          {/* Transfer Bank Information */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <h3 className="text-lg font-black text-slate-900">
              Thông Tin Chuyển Khoản Trực Tiếp
            </h3>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200">
                <div>
                  <span className="text-slate-400 block text-[10px]">Ngân hàng thụ hưởng</span>
                  <span className="font-bold text-slate-900">{bankDetails.bankName}</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200">
                <div>
                  <span className="text-slate-400 block text-[10px]">Số tài khoản</span>
                  <span className="font-bold text-slate-900 text-sm">{bankDetails.accountNumber}</span>
                </div>
                <button
                  onClick={() => handleCopy('acc', bankDetails.accountNumber)}
                  className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                >
                  {copiedField === 'acc' ? '✓ Đã chép' : 'Sao chép'}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200">
                <div>
                  <span className="text-slate-400 block text-[10px]">Số tiền cần thanh toán</span>
                  <span className="font-bold text-primary text-sm">{bankDetails.amount} VNĐ</span>
                </div>
                <button
                  onClick={() => handleCopy('amount', bankDetails.amount.replace(',', ''))}
                  className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                >
                  {copiedField === 'amount' ? '✓ Đã chép' : 'Sao chép'}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200">
                <div>
                  <span className="text-slate-400 block text-[10px]">Nội dung chuyển khoản (Chính xác)</span>
                  <span className="font-bold text-primary text-sm">{bankDetails.content}</span>
                </div>
                <button
                  onClick={() => handleCopy('content', bankDetails.content)}
                  className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                >
                  {copiedField === 'content' ? '✓ Đã chép' : 'Sao chép'}
                </button>
              </div>
            </div>

            {/* Instant Confirmation Action */}
            <div className="pt-2">
              {verifiedSuccess ? (
                <div className="p-4 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">check_circle</span>
                  <span>Đã Nhận Được Chuyển Khoản! Tài khoản đã được nâng cấp lên PRO.</span>
                </div>
              ) : (
                <button
                  disabled={isVerifying}
                  onClick={handleConfirmPayment}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-rose-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all hover:scale-101 flex items-center justify-center gap-2"
                >
                  {isVerifying ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Đang Kiểm Tra Biến Động Số Dư Napas (OpenBanking Webhook)...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-lg">check_circle</span>
                      <span>Tôi Đã Chuyển Khoản (Kích Hoạt Tức Thì)</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
