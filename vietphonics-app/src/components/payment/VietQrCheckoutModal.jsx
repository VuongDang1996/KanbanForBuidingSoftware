import React, { useState, useEffect, useRef } from 'react';
import { PRICING_PLANS } from '../../lib/payment/vietQrEmvco.js';

export default function VietQrCheckoutModal({
  isOpen,
  onClose,
  planId = 'pro_annual',
  userId = 'learner_vip',
  onSuccess
}) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copyToast, setCopyToast] = useState(null);
  const [remainingSeconds, setRemainingSeconds] = useState(15 * 60);
  const [isPaid, setIsPaid] = useState(false);
  const [simulating, setSimulating] = useState(false);

  const pollTimerRef = useRef(null);
  const countdownTimerRef = useRef(null);
  const toastTimeoutRef = useRef(null);

  // Selected plan details
  const selectedPlan = PRICING_PLANS.find(p => p.id === planId) || PRICING_PLANS[1];

  // Create order on open or plan change
  const fetchOrder = async () => {
    setLoading(true);
    setError(null);
    setIsPaid(false);
    try {
      const res = await fetch('/api/v1/payment/vietqr/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, planId })
      });
      const data = await res.json();
      if (data.success && data.order) {
        setOrder(data.order);
        // Calculate remaining seconds
        const expireMs = new Date(data.order.expiresAt).getTime();
        const diffSec = Math.max(0, Math.floor((expireMs - Date.now()) / 1000));
        setRemainingSeconds(diffSec > 0 ? diffSec : 15 * 60);
      } else {
        setError(data.error || 'Không thể tạo đơn hàng VietQR');
      }
    } catch (err) {
      console.error('Lỗi khởi tạo đơn hàng VietQR:', err);
      setError('Lỗi kết nối máy chủ thanh toán');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchOrder();
    } else {
      setOrder(null);
      setIsPaid(false);
    }

    return () => {
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, [isOpen, planId]);

  // Countdown timer
  useEffect(() => {
    if (!isOpen || !order || isPaid) return;

    countdownTimerRef.current = setInterval(() => {
      setRemainingSeconds(prev => {
        if (prev <= 1) {
          clearInterval(countdownTimerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    };
  }, [isOpen, order, isPaid]);

  // Real-time polling for order payment status
  useEffect(() => {
    if (!isOpen || !order || isPaid || remainingSeconds <= 0) return;

    pollTimerRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/v1/payment/vietqr/order/${order.orderCode}/status`);
        const data = await res.json();
        if (data.success && data.status === 'paid') {
          setIsPaid(true);
          clearInterval(pollTimerRef.current);
          if (onSuccess) onSuccess(order);
        }
      } catch (err) {
        console.warn('Lỗi kiểm tra trạng thái thanh toán:', err);
      }
    }, 2500);

    return () => {
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
    };
  }, [isOpen, order, isPaid, remainingSeconds]);

  // Copy to clipboard helper
  const handleCopy = (text, label) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
    }
    setCopyToast(`Đã sao chép ${label}!`);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setCopyToast(null);
    }, 2500);
  };

  // Simulate bank transfer for manual verification
  const handleSimulatePayment = async () => {
    if (!order) return;
    setSimulating(true);
    try {
      const res = await fetch('/api/v1/payment/vietqr/simulate-bank-transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderCode: order.orderCode })
      });
      const data = await res.json();
      if (data.success) {
        setIsPaid(true);
        if (onSuccess) onSuccess(order);
      } else {
        alert(data.error || 'Không thể xác nhận giao dịch');
      }
    } catch (err) {
      console.error('Lỗi mô phỏng gạch nợ:', err);
      alert('Lỗi kết nối máy chủ khi xác nhận thanh toán');
    } finally {
      setSimulating(false);
    }
  };

  if (!isOpen) return null;

  // Format mm:ss
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const isExpired = remainingSeconds <= 0;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Close Button */}
        <button
          type="button"
          aria-label="Đóng hộp thoại thanh toán"
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer z-10"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        {/* Copy Toast Banner */}
        {copyToast && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 px-4 py-2 rounded-xl bg-emerald-600 text-white font-body-sm text-xs font-bold shadow-lg animate-bounce flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            <span>{copyToast}</span>
          </div>
        )}

        {/* State 1: Paid Success (Emerald Confetti) */}
        {isPaid ? (
          <div className="flex flex-col items-center text-center py-8 px-4 gap-5 animate-scale-in">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-emerald-100 border-4 border-emerald-500 flex items-center justify-center text-emerald-600 shadow-xl animate-bounce">
                <span className="material-symbols-outlined text-5xl font-black">check</span>
              </div>
              <div className="absolute -top-2 -right-2 text-2xl animate-spin">✨</div>
              <div className="absolute -bottom-2 -left-2 text-2xl">🎉</div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-label-mono text-xs font-bold uppercase tracking-wider self-center">
                Giao Dịch Đã Khớp Lệnh Napas 24/7
              </span>
              <h3 className="font-headline-lg text-headline-lg text-slate-900 font-extrabold">
                Kích Hoạt VietPhonics PRO Thành Công!
              </h3>
              <p className="font-body-md text-body-md text-slate-600 max-w-sm">
                Chúc mừng bạn đã mở khóa toàn bộ 44 âm IPA, AI Roleplay Alex, và phòng thí nghiệm âm học.
              </p>
            </div>

            <div className="w-full bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col gap-2 text-left">
              <div className="flex justify-between text-xs text-slate-600">
                <span>Gói dịch vụ:</span>
                <span className="font-bold text-slate-900">{selectedPlan.name}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-600">
                <span>Mã đơn hàng:</span>
                <span className="font-mono font-bold text-sky-700">{order?.orderCode}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-600">
                <span>Số tiền thanh toán:</span>
                <span className="font-bold text-emerald-600">{order?.amount?.toLocaleString('vi-VN')} VNĐ</span>
              </div>
              <div className="flex justify-between text-xs text-slate-600">
                <span>Hạn sử dụng:</span>
                <span className="font-bold text-slate-900">
                  {selectedPlan.durationMonths >= 120 ? 'Vĩnh viễn (Trọn đời)' : `${selectedPlan.durationMonths} Tháng`}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-headline-sm font-bold shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Bắt Đầu Luyện Âm Ngay</span>
              <span className="material-symbols-outlined text-sm">rocket_launch</span>
            </button>
          </div>
        ) : (
          /* State 2: Checkout Form & Dynamic QR */
          <div className="flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-center gap-3 pr-8">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0">
                <span className="material-symbols-outlined text-2xl">qr_code_2</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-headline-sm text-headline-sm text-slate-900 font-bold">
                    Thanh Toán VietQR Napas
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                    Auto 2s
                  </span>
                </div>
                <span className="font-body-sm text-xs text-slate-500">
                  {selectedPlan.name} • {selectedPlan.price.toLocaleString('vi-VN')} VNĐ
                </span>
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xs font-mono text-slate-500">Đang sinh mã VietQR chuẩn EMVCo...</span>
              </div>
            ) : error ? (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex flex-col gap-2">
                <span>{error}</span>
                <button
                  type="button"
                  onClick={fetchOrder}
                  className="px-3 py-1 bg-rose-600 text-white rounded-lg text-xs font-bold w-fit cursor-pointer"
                >
                  Thử lại
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {/* Countdown & Expiration Header */}
                <div className={`flex items-center justify-between p-3 rounded-xl border ${
                  isExpired ? 'bg-rose-50 border-rose-200 text-rose-700' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">timer</span>
                    <span className="text-xs font-medium">Thời hạn quét mã:</span>
                  </div>
                  <span className={`font-mono text-sm font-bold ${isExpired ? 'text-rose-600' : 'text-rose-600'}`}>
                    {isExpired ? 'Đã hết hạn' : timeFormatted}
                  </span>
                </div>

                {/* QR Code Container */}
                <div className={`relative bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col items-center gap-3 transition-opacity ${
                  isExpired ? 'opacity-40 pointer-events-none' : ''
                }`}>
                  <div className="relative w-56 h-56 bg-white p-2 rounded-xl border border-slate-300 shadow-sm flex items-center justify-center">
                    {order?.qrImageUrl ? (
                      <img
                        src={order.qrImageUrl}
                        alt="VietQR Napas Code"
                        className="w-full h-full object-contain rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                        QR Không khả dụng
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 text-center">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Mở app ngân hàng bất kỳ (VCB, MB, Tech, MoMo...) để quét</span>
                  </div>
                </div>

                {/* If Expired, Show Refresh Button */}
                {isExpired && (
                  <button
                    type="button"
                    onClick={fetchOrder}
                    className="w-full py-3 rounded-xl bg-rose-600 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span className="material-symbols-outlined text-base">refresh</span>
                    <span>Tạo mã QR thanh toán mới</span>
                  </button>
                )}

                {/* Bank Account Details Grid */}
                <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200 flex flex-col gap-2.5 text-xs">
                  {/* Bank Name */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200/70">
                    <span className="text-slate-500">Ngân hàng:</span>
                    <span className="font-bold text-slate-800">{order?.bankName || 'MB Bank'}</span>
                  </div>

                  {/* Account Name */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200/70">
                    <span className="text-slate-500">Chủ tài khoản:</span>
                    <span className="font-bold text-slate-800 uppercase">{order?.accountName}</span>
                  </div>

                  {/* Account Number */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200/70">
                    <span className="text-slate-500">Số tài khoản:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900 text-sm tracking-wider">
                        {order?.accountNumber}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(order?.accountNumber, 'Số tài khoản')}
                        className="px-2 py-0.5 rounded bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-semibold text-[10px] cursor-pointer"
                      >
                        Sao chép
                      </button>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200/70">
                    <span className="text-slate-500">Số tiền:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-rose-600 text-sm">
                        {order?.amount?.toLocaleString('vi-VN')} VNĐ
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(String(order?.amount), 'Số tiền')}
                        className="px-2 py-0.5 rounded bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-semibold text-[10px] cursor-pointer"
                      >
                        Sao chép
                      </button>
                    </div>
                  </div>

                  {/* Transfer Memo */}
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Nội dung CK:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                        {order?.orderCode}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(order?.orderCode, 'Nội dung chuyển khoản')}
                        className="px-2 py-0.5 rounded bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-semibold text-[10px] cursor-pointer"
                      >
                        Sao chép
                      </button>
                    </div>
                  </div>
                </div>

                {/* Mobile Banking Deep Link Button (PAY-102) */}
                {order?.deepLink && (
                  <a
                    href={order.deepLink}
                    className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all text-center"
                  >
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                    <span>Mở App Ngân Hàng (App Intent Deep Link)</span>
                  </a>
                )}

                {/* Instant Verification Simulation Button */}
                <button
                  type="button"
                  disabled={simulating || isExpired}
                  onClick={handleSimulatePayment}
                  className={`w-full py-3.5 rounded-xl font-headline-sm text-sm font-bold text-white shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    simulating || isExpired
                      ? 'bg-slate-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600'
                  }`}
                >
                  {simulating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Đang đối soát Napas...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-sm">verified</span>
                      <span>Tôi Đã Chuyển Khoản (Xác Nhận Ngay)</span>
                    </>
                  )}
                </button>

                {/* Support Hotline / Zalo (PAY-102) */}
                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-emerald-600 text-sm">shield</span>
                    <span>Bảo mật chuẩn PCI-DSS</span>
                  </div>
                  <a
                    href={`https://zalo.me/vietphonics_support?text=${encodeURIComponent(`Tôi cần hỗ trợ đơn hàng: ${order?.orderCode || ''}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sky-600 hover:text-sky-700 font-medium flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">headset_mic</span>
                    <span>Hỗ trợ Zalo 24/7</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
