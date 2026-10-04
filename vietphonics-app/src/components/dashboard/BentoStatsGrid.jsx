import React from 'react';

/**
 * BentoStatsGrid.jsx
 * 4 Bento Learning Statistics Cards for Learner Mastery Dashboard (USER-101 AC 3 & AC 4)
 */
export default function BentoStatsGrid({
  stats = {
    totalPracticeMinutes: 340,
    masteredPhonemesCount: 32,
    errorBankCount: 6,
    predictedIelts: 7.0
  },
  className = ''
}) {
  const cards = [
    {
      id: 'minutes',
      label: 'Tổng Phút Luyện Tập',
      value: `${stats.totalPracticeMinutes ?? 340} ph`,
      subtext: 'Đã hoàn thành 48 phiên',
      icon: 'schedule',
      iconColor: 'text-sky-600 bg-sky-50 border-sky-100'
    },
    {
      id: 'phonemes',
      label: 'Âm Đã Thuần Thục',
      value: `${stats.masteredPhonemesCount ?? 32}/44`,
      subtext: 'Đạt chuẩn bản xứ >=85%',
      icon: 'verified',
      iconColor: 'text-emerald-600 bg-emerald-50 border-emerald-100'
    },
    {
      id: 'error_bank',
      label: 'Ngân Hàng Lỗi SM-2',
      value: `${stats.errorBankCount ?? 6} từ`,
      subtext: 'Cần ôn tập hôm nay',
      icon: 'inventory_2',
      iconColor: 'text-amber-600 bg-amber-50 border-amber-100'
    },
    {
      id: 'ielts_band',
      label: 'Dự Báo IELTS Speaking',
      value: `Band ${stats.predictedIelts ? Number(stats.predictedIelts).toFixed(1) : '7.0'}`,
      subtext: 'Pronunciation Metric 8.0',
      icon: 'school',
      iconColor: 'text-indigo-600 bg-indigo-50 border-indigo-100'
    }
  ];

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {cards.map(card => (
        <div
          key={card.id}
          className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {card.label}
            </span>
            <div className={`p-2 rounded-xl border ${card.iconColor}`}>
              <span className="material-symbols-outlined text-lg leading-none">{card.icon}</span>
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 tracking-tight">
              {card.value}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {card.subtext}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
