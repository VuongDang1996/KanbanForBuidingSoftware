import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import StreakModal from './components/StreakModal';
import StreakSavedModal from './components/gamification/StreakSavedModal';
import DiagnosticModal from './components/DiagnosticModal';
import UpgradeModal from './components/UpgradeModal';
import AccountSecurityModal from './components/AccountSecurityModal';

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
    accountModalTab
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

      {/* Acoustic Precision Footer */}
      <footer className="w-full bg-white border-t border-slate-200/80 py-6 px-4 text-center mt-12 text-xs text-slate-500 font-mono">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="font-bold text-slate-800">VietPhonics.AI Acoustic L1 Lab</span>
            <span>•</span>
            <span>Audio Engine v4.2 Precision Ready</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Branch: pronunciation-app</span>
            <span>•</span>
            <span>VietQR Napas 24/7 (30.000đ/tháng)</span>
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
