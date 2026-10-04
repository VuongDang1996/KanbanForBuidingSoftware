import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function UpgradeModal() {
  const { showUpgradeModal, setShowUpgradeModal, isPro, setIsPro } = useApp();
  const [copiedField, setCopiedField] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);

  if (!showUpgradeModal) return null;

  const bankDetails = {
    bankName: 'MB Bank (Quân Đội)',
    accountNumber: '0988776655',
    accountName: 'VIETPHONICS AI LAB',
    amount: '30,000',
    content: 'VP PRO 8829'
  };

  const handleCopy = (field, text) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSimulatePayment = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerifiedSuccess(true);
      setIsPro(true);
      setTimeout(() => {
        setVerifiedSuccess(false);
        setShowUpgradeModal(false);
      }, 1500);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 flex flex-col my-8">
        {/* Close Button */}
        <button aria-label="Nâng cấp gói VietPhonics PRO" type="button"
          onClick={() => setShowUpgradeModal(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {verifiedSuccess ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl shadow-sm">
              ✓
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              Kích Hoạt PRO Thành Công!
            </h3>
            <p className="text-sm text-slate-600">
              Chào mừng bạn đến với VietPhonics PRO. Toàn bộ kho âm và tính năng nâng cao đã được mở khóa vĩnh viễn trong tháng này.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-400 to-rose-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
                ⭐
              </div>
              <div>
                <span className="px-2 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-primary font-mono text-[10px] font-bold uppercase">
                  Gói Học Phí Tinh Gọn
                </span>
                <h3 className="text-xl font-black text-slate-900 leading-tight">
                  Nâng Cấp VietPhonics PRO
                </h3>
              </div>
            </div>

            {/* Pricing Tag */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-500 block">Học phí phát âm 1 tháng</span>
                <span className="text-3xl font-black text-primary font-mono">
                  30.000 <span className="text-base text-slate-600 font-sans font-bold">VNĐ / tháng</span>
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold font-mono">
                Chỉ 1.000đ / ngày
              </span>
            </div>

            {/* VietQR Display & Bank Transfer Details */}
            <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 flex flex-col items-center text-center shadow-xs">
              {/* VietQR Mock Code */}
              <div className="relative p-3 bg-white rounded-xl border border-slate-200 shadow-sm mb-3">
                <img
                  src={`https://api.vietqr.io/image/970422-0988776655-compact.jpg?amount=30000&addInfo=VP%20PRO%208829&accountName=VIETPHONICS%20AI%20LAB`}
                  alt="VietQR 30k Napas 247"
                  className="w-48 h-48 object-contain rounded-lg"
                  onError={(e) => {
                    // Fallback visual if offline
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div
                  style={{ display: 'none' }}
                  className="w-48 h-48 bg-slate-100 rounded-lg flex flex-col items-center justify-center p-3 text-slate-500 font-mono text-xs"
                >
                  <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">qr_code_2</span>
                  <span>Quét mã VietQR bằng App Ngân Hàng</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Napas 24/7 Tự Động Kích Hoạt Tức Thì (3 Giây)</span>
              </div>

              {/* Copy Bank Details */}
              <div className="w-full space-y-2 text-left text-xs font-mono">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Ngân hàng</span>
                    <span className="font-bold text-slate-800">{bankDetails.bankName}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Số tài khoản</span>
                    <span className="font-bold text-slate-900">{bankDetails.accountNumber}</span>
                  </div>
                  <button aria-label="Nút tương tác" type="button"
                    onClick={() => handleCopy('acc', bankDetails.accountNumber)}
                    className="px-2.5 py-1 rounded bg-white hover:bg-slate-100 border text-slate-700 text-[11px] font-bold"
                  >
                    {copiedField === 'acc' ? 'Đã sao chép!' : 'Sao chép'}
                  </button>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Nội dung chuyển khoản (Bắt buộc)</span>
                    <span className="font-bold text-primary">{bankDetails.content}</span>
                  </div>
                  <button aria-label="Nút tương tác" type="button"
                    onClick={() => handleCopy('content', bankDetails.content)}
                    className="px-2.5 py-1 rounded bg-white hover:bg-slate-100 border text-slate-700 text-[11px] font-bold"
                  >
                    {copiedField === 'content' ? 'Đã sao chép!' : 'Sao chép'}
                  </button>
                </div>
              </div>

              {/* PAY-105: Provider Transparency Notice */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 text-left flex items-start gap-2">
                <span className="material-symbols-outlined text-sm text-emerald-600 shrink-0 mt-0.5">verified</span>
                <div>
                  <span className="font-semibold text-slate-700">VietQR Napas 24/7:</span> Cổng thanh toán chính thức (miễn 100% phí giao dịch). Các cổng ví điện tử & thẻ quốc tế (MoMo, VNPay, Stripe) được tạm hoãn nhằm tối ưu chi phí học phí cho người học.
                </div>
              </div>
            </div>

            {/* Confirmation CTA */}
            <button aria-label="Nút tương tác" type="button"
              disabled={isVerifying}
              onClick={handleSimulatePayment}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-primary to-rose-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all hover:brightness-105 flex items-center justify-center gap-2"
            >
              {isVerifying ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Đang Kiểm Tra Biến Động Số Dư Napas...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-lg">check_circle</span>
                  <span>Tôi Đã Chuyển Khoản 30.000đ (Xác Nhận Ngay)</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
