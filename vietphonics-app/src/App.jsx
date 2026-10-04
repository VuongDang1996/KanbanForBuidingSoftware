import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import StreakModal from './components/StreakModal';
import StreakSavedModal from './components/gamification/StreakSavedModal';
import DiagnosticModal from './components/DiagnosticModal';
import UpgradeModal from './components/UpgradeModal';
import AccountSecurityModal from './components/AccountSecurityModal';
import LegalDocumentsModal from './components/legal/LegalDocumentsModal';
import BillingHistoryReceiptModal from './components/billing/BillingHistoryReceiptModal';
import ExecutiveAdminDashboardModal from './components/admin/ExecutiveAdminDashboardModal';

import DashboardView from './views/DashboardView';
import PracticeStudioView from './views/PracticeStudioView';
import MouthAnatomyView from './views/MouthAnatomyView';
import RoleplayView from './views/RoleplayView';
import Game3dView from './views/Game3dView';
import ProUpgradeView from './views/ProUpgradeView';
import ProgressAnalyticsView from './views/ProgressAnalyticsView';
import OnboardingView from './views/OnboardingView';
import MasteryLabView from './views/MasteryLabView';
import AdvancedAiLabView from './views/AdvancedAiLabView';
import ProgressHubView from './views/ProgressHubView';

function MainContent() {
  const {
    activeTab,
    showAccountModal,
    setShowAccountModal,
    accountModalTab,
    showLegalModal,
    setShowLegalModal,
    legalModalTab,
    setLegalModalTab,
    showBillingModal,
    setShowBillingModal,
    showAdminModal,
    setShowAdminModal
  } = useApp();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'tong-quan':
        return <DashboardView />;
      case 'phong-luyen-phat-am':
        return <PracticeStudioView />;
      case 'khau-hinh-2d':
        return <MouthAnatomyView />;
      case 'mastery-lab':
        return <MasteryLabView />;
      case 'ai-lab':
        return <AdvancedAiLabView />;
      case 'ai-hoi-thoai':
        return <RoleplayView />;
      case 'game-3d-rpg':
        return <Game3dView />;
      case 'ngan-hang-tu-loi':
        return <ProgressHubView />;
      case 'tien-do':
        return <ProgressHubView />;
      case 'chan-doan':
        return <OnboardingView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans antialiased overflow-x-hidden w-full max-w-full">
      <Navbar />

      <main className="w-full pt-4 pb-12 flex-1 flex flex-col overflow-x-hidden">
        {renderActiveView()}
      </main>

      {/* Global Modals */}
      <StreakModal />
      <StreakSavedModal />
      <DiagnosticModal />
      <UpgradeModal />
      <AccountSecurityModal
        isOpen={showAccountModal}
        onClose={() => setShowAccountModal(false)}
        initialTab={accountModalTab}
      />
      <LegalDocumentsModal
        isOpen={showLegalModal}
        onClose={() => setShowLegalModal(false)}
        initialTab={legalModalTab}
      />
      <BillingHistoryReceiptModal
        isOpen={showBillingModal}
        onClose={() => setShowBillingModal(false)}
      />
      <ExecutiveAdminDashboardModal
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
      />

      {/* Acoustic Precision & Legal Footer */}
      <footer className="w-full bg-white border-t border-slate-200/80 py-6 px-4 text-center mt-12 text-xs text-slate-500 font-sans">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="font-bold text-slate-800">VietPhonics.AI Acoustic L1 Lab</span>
            </div>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="text-slate-600">Audio Engine v4.2 Precision Ready</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <button
              type="button"
              onClick={() => {
                setLegalModalTab('terms');
                setShowLegalModal(true);
              }}
              className="text-slate-600 hover:text-indigo-600 hover:underline transition cursor-pointer"
            >
              Điều Khoản Dịch Vụ
            </button>
            <span className="text-slate-300">•</span>
            <button
              type="button"
              onClick={() => {
                setLegalModalTab('privacy');
                setShowLegalModal(true);
              }}
              className="text-slate-600 hover:text-indigo-600 hover:underline transition cursor-pointer font-medium"
            >
              Quyền Riêng Tư (NĐ 13/2023)
            </button>
            <span className="text-slate-300">•</span>
            <button
              type="button"
              onClick={() => {
                setLegalModalTab('refund');
                setShowLegalModal(true);
              }}
              className="text-slate-600 hover:text-indigo-600 hover:underline transition cursor-pointer"
            >
              Chính Sách Hoàn Tiền 7 Ngày
            </button>
            <span className="text-slate-300">•</span>
            <button
              type="button"
              onClick={() => setShowBillingModal(true)}
              className="text-slate-600 hover:text-indigo-600 hover:underline transition cursor-pointer font-medium"
            >
              Lịch Sử Giao Dịch &amp; Biên Lai VAT
            </button>
            <span className="text-slate-300">•</span>
            <button
              type="button"
              onClick={() => setShowAdminModal(true)}
              className="text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded font-semibold hover:bg-indigo-100 transition cursor-pointer flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
              Admin Console (OPS-101)
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
