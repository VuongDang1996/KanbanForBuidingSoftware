import React from 'react';
import { useApp } from '../context/AppContext';
import ProgressAnalyticsView from './ProgressAnalyticsView';
import ProUpgradeView from './ProUpgradeView';

export default function ProgressHubView() {
  const { progressSubTab, setProgressSubTab } = useApp();

  return (
    <div className="flex flex-col w-full animate-fade-in max-w-[1440px] mx-auto px-4 md:px-gutter-desktop py-4 space-y-6">
      {/* Sub-Tab Navigation Header */}
      <div className="w-full bg-white border border-slate-200/80 p-3 sm:p-4 rounded-2xl shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200/80 overflow-x-auto max-w-full">
          <button
            type="button"
            onClick={() => setProgressSubTab('analytics')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
              progressSubTab === 'analytics'
                ? 'bg-white text-primary shadow-xs border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-base">monitoring</span>
            <span>Biểu Đồ Tiến Độ &amp; Bảng IPA</span>
          </button>

          <button
            type="button"
            onClick={() => setProgressSubTab('error-bank')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
              progressSubTab === 'error-bank'
                ? 'bg-white text-primary shadow-xs border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-base">history_edu</span>
            <span>Ngân Hàng Từ Lỗi SM-2</span>
          </button>

          <button
            type="button"
            onClick={() => setProgressSubTab('pro-upgrade')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
              progressSubTab === 'pro-upgrade'
                ? 'bg-white text-primary shadow-xs border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-base">diamond</span>
            <span>Gói Pro &amp; VietQR Napas</span>
          </button>
        </div>

        <span className="font-mono text-xs text-slate-500 px-3 py-1 rounded-xl bg-slate-50 border border-slate-200 font-semibold self-end md:self-auto">
          PROG-101 • ELSA-402 • PAY-101
        </span>
      </div>

      {progressSubTab === 'analytics' && <ProgressAnalyticsView />}
      {(progressSubTab === 'error-bank' || progressSubTab === 'pro-upgrade') && <ProUpgradeView />}
    </div>
  );
}
