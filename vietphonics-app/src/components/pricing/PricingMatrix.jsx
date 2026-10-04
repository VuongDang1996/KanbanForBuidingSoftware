import React from 'react';
import { PRICING_PLANS, FEATURE_COMPARISON } from '../../lib/payment/vietQrEmvco.js';

export default function PricingMatrix({ selectedPlanId = 'pro_annual', onSelectPlan, onUpgradeClick }) {
  const currentPlan = PRICING_PLANS.find(p => p.id === selectedPlanId) || PRICING_PLANS[1];

  return (
    <div className="flex flex-col gap-space-lg w-full">
      {/* Plan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md items-stretch">
        {PRICING_PLANS.map((plan) => {
          const isSelected = plan.id === selectedPlanId;
          const isPopular = plan.popular;

          return (
            <div
              key={plan.id}
              onClick={() => onSelectPlan && onSelectPlan(plan.id)}
              className={`relative flex flex-col justify-between p-6 rounded-2xl cursor-pointer transition-all duration-200 border-2 ${
                isSelected
                  ? 'border-rose-500 bg-white shadow-lg ring-2 ring-rose-200/50'
                  : 'border-slate-200 bg-white/80 hover:border-slate-300 hover:shadow-md'
              } ${isPopular ? 'md:-translate-y-2 md:shadow-xl border-amber-400' : ''}`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className={`absolute -top-3.5 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm whitespace-nowrap ${
                  isPopular
                    ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white animate-pulse'
                    : 'bg-slate-100 text-slate-700 border border-slate-200'
                }`}>
                  {plan.badge}
                </div>
              )}

              <div className="flex flex-col gap-3 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-headline-sm text-headline-sm text-slate-900 font-bold">{plan.name}</h3>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    isSelected ? 'border-rose-500 bg-rose-500 text-white' : 'border-slate-300'
                  }`}>
                    {isSelected && <span className="material-symbols-outlined text-xs">check</span>}
                  </div>
                </div>

                <p className="font-body-sm text-body-sm text-slate-500 min-h-[40px]">{plan.description}</p>

                <div className="flex flex-col gap-0.5 pt-2">
                  <div className="flex items-baseline gap-2">
                    <span className="font-headline-lg text-headline-lg text-rose-600 font-extrabold tracking-tight">
                      {plan.price.toLocaleString('vi-VN')}đ
                    </span>
                    {plan.originalPrice && (
                      <span className="line-through font-label-mono text-label-mono text-slate-400">
                        {plan.originalPrice.toLocaleString('vi-VN')}đ
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 font-label-mono text-xs font-bold">
                      {plan.dailyCost}
                    </span>
                    <span className="text-xs text-slate-500">
                      (Tiết kiệm {plan.discountPercent}%)
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSelectPlan) onSelectPlan(plan.id);
                    if (onUpgradeClick) onUpgradeClick(plan);
                  }}
                  className={`w-full py-3 rounded-xl font-headline-sm text-headline-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    isSelected
                      ? 'bg-gradient-to-r from-rose-600 to-rose-500 text-white shadow-md hover:from-rose-700 hover:to-rose-600'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  <span>{isSelected ? 'Đăng Ký Gói Này' : 'Chọn Gói'}</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature Comparison Table (PAY-103) */}
      <div className="flex flex-col gap-3 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <span className="font-label-mono text-label-mono text-sky-800 uppercase tracking-widest font-bold">
              Bảng So Sánh Quyền Lợi Chi Tiết (PAY-103)
            </span>
            <h4 className="font-headline-sm text-headline-sm text-slate-900 font-bold">
              Tại sao 98% học viên lựa chọn gói VietPhonics PRO?
            </h4>
          </div>
          <span className="font-label-mono text-label-mono text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-bold self-start md:self-auto">
            ✓ Cam kết tăng tối thiểu 1.5 Band phát âm
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-sm text-body-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70">
                <th className="py-3 px-4 text-slate-700 font-label-mono text-xs uppercase">Hạng Mục Tính Năng</th>
                <th className="py-3 px-4 text-slate-500 font-label-mono text-xs uppercase text-center w-36">Tài Khoản Free</th>
                <th className="py-3 px-4 text-rose-700 font-label-mono text-xs uppercase text-center w-48 bg-rose-50/60 font-bold">
                  VietPhonics PRO
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {FEATURE_COMPARISON.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 px-4 text-slate-800 font-medium">{row.feature}</td>
                  <td className="py-3 px-4 text-center text-slate-500 font-label-mono text-xs">{row.free}</td>
                  <td className="py-3 px-4 text-center text-rose-700 font-bold bg-rose-50/20 font-label-mono text-xs">
                    {row.pro}
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
