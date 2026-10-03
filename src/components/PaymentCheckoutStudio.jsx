import React, { useState, useEffect } from 'react';
import {
  QrCode,
  CheckCircle2,
  Copy,
  Check,
  CreditCard,
  Smartphone,
  ShieldCheck,
  Zap,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingDown,
  RotateCcw,
  AlertCircle,
  HelpCircle,
  Lock,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PaymentCheckoutStudio({ onPaymentSuccess }) {
  const [selectedPlan, setSelectedPlan] = useState('monthly'); // 'monthly' | 'quarterly' | 'annual'
  const [paymentMethod, setPaymentMethod] = useState('vietqr'); // 'vietqr' | 'momo' | 'card'
  const [copiedField, setCopiedField] = useState(null);
  const [countdown, setCountdown] = useState(600); // 10 minutes in seconds
  const [paymentStatus, setPaymentStatus] = useState('idle'); // 'idle' | 'simulating' | 'success'
  const [transferCode] = useState(() => `VP${Math.floor(10000 + Math.random() * 90000)}`);

  // Plan configurations (Vietnamese Pricing Strategy)
  const plans = {
    monthly: {
      id: 'monthly',
      name: 'Gói 1 Tháng (Starter)',
      price: 30000,
      priceDisplay: '30.000đ',
      periodDisplay: '/tháng',
      subtext: 'Bằng 1 ly cà phê vỉa hè — Phù hợp học thử trải nghiệm',
      badge: 'Cơ bản',
      badgeColor: 'bg-slate-100 text-slate-700 border-slate-200'
    },
    quarterly: {
      id: 'quarterly',
      name: 'Gói 3 Tháng (Booster)',
      price: 85000,
      priceDisplay: '85.000đ',
      periodDisplay: '/3 tháng',
      subtext: 'Chỉ 28.300đ/tháng — Đủ chu kỳ 90 ngày hình thành phản xạ',
      badge: 'Tiết kiệm 5%',
      badgeColor: 'bg-sky-50 text-sky-700 border-sky-200'
    },
    annual: {
      id: 'annual',
      name: 'Gói 1 Năm VIP (Best Value)',
      price: 299000,
      priceDisplay: '299.000đ',
      periodDisplay: '/năm',
      subtext: 'Chỉ ~24.900đ/tháng — Mở khóa Golden Speaker & Soi Khẩu Hình',
      badge: 'Khuyên Dùng · Tiết Kiệm 20%',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200 font-bold'
    }
  };

  const currentPlan = plans[selectedPlan];

  // Bank transfer info (VietQR via SePay / Casso OpenBanking)
  const bankInfo = {
    bankName: 'MBBank (Ngân hàng Quân Đội)',
    accountNumber: '0981234567',
    accountName: 'CONG TY VIETPHONICS AI',
    amount: currentPlan.price,
    transferContent: transferCode
  };

  // Timer countdown
  useEffect(() => {
    if (paymentStatus === 'success') return;
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 600));
    }, 1000);
    return () => clearInterval(timer);
  }, [paymentStatus]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopy = (text, fieldKey) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(fieldKey);
    setTimeout(() => setCopiedField(null), 1600);
  };

  // Simulate Instant Webhook Reconciliation
  const handleSimulatePayment = () => {
    setPaymentStatus('simulating');
    setTimeout(() => {
      setPaymentStatus('success');
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
      if (onPaymentSuccess) {
        onPaymentSuccess(currentPlan);
      }
    }, 1500);
  };

  const handleReset = () => {
    setPaymentStatus('idle');
    setCountdown(600);
  };

  // Generate dynamic VietQR image URL using VietQR API standard format
  const vietQrUrl = `https://img.vietqr.io/image/MB-0981234567-compact2.png?amount=${currentPlan.price}&addInfo=${transferCode}&accountName=VIETPHONICS%20AI`;

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Financial Strategy */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Giải Pháp Thanh Toán Tối Ưu Cho 5.000 Users</span>
              </span>
              <span className="text-xs font-mono text-slate-500 font-semibold">
                ● 0% Phí Gạch Nợ Với VietQR Tự Động
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
              Cổng Thanh Toán Tự Động 30K/Tháng — Nhanh, Không Phí & Tự Gạch Nợ
            </h2>
            <p className="text-xs text-slate-500 max-w-3xl leading-relaxed">
              Giải pháp kết hợp <strong>VietQR động + Webhook tự động (SePay/Casso)</strong>: Học viên quét mã bằng bất kỳ App ngân hàng nào (VCB, MB, Techcombank, MoMo...), tiền vào thẳng tài khoản ngân hàng của bạn, <strong>phí giao dịch = 0đ</strong>, hệ thống tự động mở quyền Pro trong 1-2 giây.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center font-mono">
              <span className="text-[10px] text-slate-400 block uppercase">Mục tiêu 5.000 Users</span>
              <span className="text-sm font-extrabold text-emerald-600">150.000.000đ / tháng</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Plan Selection & Interactive Checkout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Plan Chooser (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                1. Chọn Gói Hội Viên
              </h3>
              <span className="text-xs text-slate-400">Hủy bất cứ lúc nào</span>
            </div>

            <div className="space-y-3">
              {Object.values(plans).map((plan) => {
                const isSelected = selectedPlan === plan.id;
                return (
                  <div
                    key={plan.id}
                    onClick={() => {
                      setSelectedPlan(plan.id);
                      if (paymentStatus === 'success') setPaymentStatus('idle');
                    }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'bg-rose-50/60 border-rose-400 ring-2 ring-rose-400/20 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold ${isSelected ? 'text-rose-900' : 'text-slate-800'}`}>
                            {plan.name}
                          </span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${plan.badgeColor}`}>
                            {plan.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          {plan.subtext}
                        </p>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <span className={`text-base font-extrabold font-mono ${isSelected ? 'text-rose-600' : 'text-slate-900'}`}>
                          {plan.priceDisplay}
                        </span>
                        <span className="text-[10px] text-slate-400 block font-mono">
                          {plan.periodDisplay}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Feature Entitlement Checklist */}
            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
              <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">
                Quyền lợi khi kích hoạt gói {currentPlan.name}:
              </span>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>Luyện phát âm không giới hạn 44 âm IPA tiếng Anh</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>Soi rụng âm đuôi /s, ed, ks/ & So sánh sóng âm A/B</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>Tặng tính năng Golden Speaker & Soi Khẩu Hình 478 điểm</span>
              </div>
            </div>
          </div>

          {/* Cost Comparison Table: Why VietQR beats gateways */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-emerald-600" />
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Tại sao VietQR là cách tốt nhất cho 30K/tháng?
              </h4>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200 flex justify-between items-center">
                <div>
                  <span className="font-bold text-emerald-900 block">VietQR SePay (Khuyên dùng)</span>
                  <span className="text-[10px] text-emerald-700">0% phí giao dịch · Phẳng 100k/tháng</span>
                </div>
                <span className="font-mono font-bold text-emerald-700 text-xs">Tiết kiệm 98%</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center text-slate-600">
                <div>
                  <span className="font-semibold block text-slate-800">Cổng VNPay / MoMo Gateway</span>
                  <span className="text-[10px] text-slate-500">MDR 1.5% - 2.5% + Phí ký quỹ GPKD</span>
                </div>
                <span className="font-mono text-slate-500 text-xs">Mất 2.2-3.7tr/tháng</span>
              </div>

              <div className="p-2.5 rounded-xl bg-rose-50/60 border border-rose-200 flex justify-between items-center text-rose-800">
                <div>
                  <span className="font-semibold block text-rose-900">Thẻ Quốc Tế (Stripe)</span>
                  <span className="text-[10px] text-rose-700">3.4% + 30¢ (~8.500đ phí cho đơn 30k!)</span>
                </div>
                <span className="font-mono font-bold text-rose-700 text-xs">Mất 28% doanh thu</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Payment QR & Modal (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-6">
            
            {/* Payment Method Switcher Tabs */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                2. Phương Thức Thanh Toán
              </h3>

              <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs font-semibold">
                <button
                  onClick={() => setPaymentMethod('vietqr')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    paymentMethod === 'vietqr'
                      ? 'bg-white text-slate-900 shadow-2xs font-bold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <QrCode className="w-3.5 h-3.5 text-emerald-600" />
                  <span>VietQR Ngân Hàng</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('momo')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    paymentMethod === 'momo'
                      ? 'bg-white text-slate-900 shadow-2xs font-bold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5 text-pink-600" />
                  <span>Ví MoMo</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-white text-slate-900 shadow-2xs font-bold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5 text-sky-600" />
                  <span>Thẻ Quốc Tế</span>
                </button>
              </div>
            </div>

            {/* State A: Idle / Active Payment Flow */}
            {paymentStatus !== 'success' ? (
              <div className="space-y-6">
                
                {/* Method 1: VietQR Content */}
                {paymentMethod === 'vietqr' && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    
                    {/* Left: Dynamic QR Box */}
                    <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-3">
                      <div className="relative group">
                        <img
                          src={vietQrUrl}
                          alt="VietQR Payment Code"
                          className="w-48 h-48 object-contain rounded-xl bg-white p-2 border border-slate-200 shadow-sm"
                        />
                        <div className="absolute top-2 right-2 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                          Napas 24/7
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                        <Clock className="w-3.5 h-3.5 text-rose-500" />
                        <span>Hết hạn sau: </span>
                        <span className="font-bold text-rose-600">{formatTimer(countdown)}</span>
                      </div>

                      <p className="text-[11px] text-slate-400 leading-tight">
                        Mở App bất kỳ ngân hàng nào (MB, VCB, Techcom, BIDV...) quét mã để thanh toán tức thì.
                      </p>
                    </div>

                    {/* Right: Transfer Detail Fields (1-click copy) */}
                    <div className="md:col-span-7 space-y-2.5 text-xs">
                      
                      {/* Bank Name */}
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 block">Ngân hàng thụ hưởng:</span>
                          <span className="font-bold text-slate-800">{bankInfo.bankName}</span>
                        </div>
                        <button
                          onClick={() => handleCopy('MBBank', 'bank')}
                          className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 transition-colors"
                          title="Sao chép tên ngân hàng"
                        >
                          {copiedField === 'bank' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      {/* Account Number */}
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 block">Số tài khoản:</span>
                          <span className="font-mono font-bold text-slate-900 text-sm tracking-wide">{bankInfo.accountNumber}</span>
                        </div>
                        <button
                          onClick={() => handleCopy(bankInfo.accountNumber, 'acc')}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold text-[11px] shadow-2xs"
                        >
                          {copiedField === 'acc' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedField === 'acc' ? 'Đã chép' : 'Sao chép'}</span>
                        </button>
                      </div>

                      {/* Amount */}
                      <div className="p-2.5 rounded-xl bg-rose-50/50 border border-rose-200 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-rose-700 block">Số tiền cần chuyển:</span>
                          <span className="font-mono font-extrabold text-rose-600 text-base">{currentPlan.priceDisplay}</span>
                        </div>
                        <button
                          onClick={() => handleCopy(currentPlan.price.toString(), 'amount')}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-rose-200 text-rose-700 hover:bg-rose-50 font-semibold text-[11px] shadow-2xs"
                        >
                          {copiedField === 'amount' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedField === 'amount' ? 'Đã chép' : 'Sao chép'}</span>
                        </button>
                      </div>

                      {/* Transfer Code (Crucial for SePay auto-webhook) */}
                      <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-300 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-amber-800 font-bold block">
                            Nội dung chuyển khoản (Bắt buộc giữ nguyên để tự động gạch nợ):
                          </span>
                          <span className="font-mono font-black text-amber-900 text-sm tracking-wider">{bankInfo.transferContent}</span>
                        </div>
                        <button
                          onClick={() => handleCopy(bankInfo.transferContent, 'code')}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500 text-white hover:bg-amber-600 font-bold text-[11px] shadow-2xs"
                        >
                          {copiedField === 'code' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedField === 'code' ? 'Đã chép' : 'Sao chép'}</span>
                        </button>
                      </div>

                    </div>
                  </div>
                )}

                {/* Method 2: MoMo Content */}
                {paymentMethod === 'momo' && (
                  <div className="p-8 text-center space-y-3 bg-pink-50/30 border border-pink-200 rounded-2xl">
                    <Smartphone className="w-10 h-10 text-pink-600 mx-auto" />
                    <h4 className="text-sm font-bold text-slate-900">Thanh toán qua Ví MoMo</h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Hệ thống hỗ trợ quét mã MoMo QR hoặc tự động điều hướng sang ứng dụng MoMo trên điện thoại.
                    </p>
                    <button
                      onClick={handleSimulatePayment}
                      className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold shadow-sm transition-all inline-flex items-center gap-2"
                    >
                      <span>Mở Ứng Dụng MoMo ({currentPlan.priceDisplay})</span>
                    </button>
                  </div>
                )}

                {/* Method 3: Card Content */}
                {paymentMethod === 'card' && (
                  <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                      <Lock className="w-3.5 h-3.5 text-sky-600" />
                      <span>Thanh toán quốc tế bảo mật qua Stripe</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <input
                        type="text"
                        placeholder="Số thẻ (Card Number)"
                        className="col-span-2 p-2.5 rounded-lg border border-slate-300 bg-white font-mono text-xs focus:ring-2 focus:ring-sky-500 outline-none"
                      />
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="p-2.5 rounded-lg border border-slate-300 bg-white font-mono text-xs focus:ring-2 focus:ring-sky-500 outline-none"
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        className="p-2.5 rounded-lg border border-slate-300 bg-white font-mono text-xs focus:ring-2 focus:ring-sky-500 outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Live Webhook Polling Status Indicator */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-slate-600">
                      Webhook Reconciler đang lắng nghe biến động tài khoản ngân hàng...
                    </span>
                  </div>

                  {/* Interactive Simulation Trigger Button */}
                  <button
                    onClick={handleSimulatePayment}
                    disabled={paymentStatus === 'simulating'}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-2xs transition-all disabled:opacity-50"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-300" />
                    <span>
                      {paymentStatus === 'simulating' ? 'Đang xác thực Webhook...' : 'Mô Phỏng Chuyển Khoản Thành Công'}
                    </span>
                  </button>
                </div>

              </div>
            ) : (
              /* State B: Success Screen (Confetti + Instant Unlock) */
              <div className="py-8 px-4 text-center space-y-5 bg-emerald-50/40 border border-emerald-200 rounded-2xl">
                <div className="w-14 h-14 rounded-full bg-emerald-100 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-600 shadow-sm animate-bounce">
                  <Check className="w-7 h-7 stroke-[3]" />
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Webhook IPN Verified · Kích Hoạt Tự Động
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    🎉 Thanh Toán Thành Công! Gói {currentPlan.name} Đã Kích Hoạt
                  </h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Tài khoản của bạn đã được nâng cấp lên <strong>Pro Member</strong>. Bạn có quyền truy cập không giới hạn tất cả bài luyện phát âm, soi khẩu hình webcam và phòng thi IELTS.
                  </p>
                </div>

                {/* Receipt Card */}
                <div className="max-w-sm mx-auto p-4 rounded-xl bg-white border border-slate-200 text-left font-mono text-xs space-y-1.5 shadow-2xs">
                  <div className="flex justify-between text-slate-500 text-[11px]">
                    <span>Mã hóa đơn:</span>
                    <span className="font-bold text-slate-800">INV-{transferCode}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-[11px]">
                    <span>Số tiền đã thanh toán:</span>
                    <span className="font-extrabold text-emerald-600">{currentPlan.priceDisplay}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-[11px]">
                    <span>Cổng gạch nợ:</span>
                    <span>VietQR / SePay 24/7 (0% phí)</span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-[11px]">
                    <span>Thời hạn gói:</span>
                    <span className="font-bold text-slate-800">{currentPlan.periodDisplay.replace('/', '')}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Thử Lại Thanh Toán Khác</span>
                  </button>

                  <button
                    onClick={() => alert(`Đã tải hóa đơn điện tử cho mã INV-${transferCode}`)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Tải Hóa Đơn VAT</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
