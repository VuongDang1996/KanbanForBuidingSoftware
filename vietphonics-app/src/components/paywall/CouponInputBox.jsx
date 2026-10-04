import React, { useState } from 'react';
import { Tag, CheckCircle2, AlertCircle, Sparkles, X } from 'lucide-react';

export default function CouponInputBox({
  orderAmount = 599000,
  planCode = 'pro_annual',
  onCouponApplied = () => {},
  onCouponRemoved = () => {}
}) {
  const [couponCode, setCouponCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleApply = async (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    try {
      setLoading(true);
      setErrorMsg('');

      const res = await fetch('http://localhost:3002/api/v1/billing/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: couponCode.trim(),
          planCode,
          orderAmount
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Mã giảm giá không hợp lệ.');
      }

      setAppliedCoupon(data);
      onCouponApplied(data);
    } catch (err) {
      setErrorMsg(err.message || 'Lỗi khi kiểm tra mã giảm giá.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setErrorMsg('');
    onCouponRemoved();
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-xs">
        <label className="font-semibold text-slate-700 flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-indigo-600" />
          <span>Mã Ưu Đãi / Khuyến Mãi (PAY-108)</span>
        </label>
        <span className="text-[11px] text-slate-400 font-mono">Thử: VIETPHONICS50 (-50%)</span>
      </div>

      {appliedCoupon ? (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold font-mono text-emerald-800 text-xs">{appliedCoupon.code}</span>
              <p className="text-[11px] text-emerald-700">
                Đã giảm {appliedCoupon.discountAmount.toLocaleString('vi-VN')} đ ({appliedCoupon.discountType === 'percent' ? `-${appliedCoupon.discountValue}%` : 'Cố định'})
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="p-1 rounded-lg hover:bg-emerald-100 text-slate-500 hover:text-rose-600 transition cursor-pointer"
            title="Gỡ mã giảm giá"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <form onSubmit={handleApply} className="flex gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            placeholder="Nhập mã: VIETPHONICS50"
            className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 uppercase"
          />
          <button
            type="submit"
            disabled={loading || !couponCode.trim()}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs transition disabled:opacity-40 cursor-pointer"
          >
            {loading ? 'Đang kiểm tra...' : 'Áp Dụng'}
          </button>
        </form>
      )}

      {errorMsg && (
        <div className="text-[11px] text-rose-600 flex items-center gap-1 font-medium">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
}
