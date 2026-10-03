import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import StreakModal from './components/StreakModal';
import DiagnosticModal from './components/DiagnosticModal';
import UpgradeModal from './components/UpgradeModal';

import DashboardView from './views/DashboardView';
import PracticeStudioView from './views/PracticeStudioView';
import MouthAnatomyView from './views/MouthAnatomyView';
import RoleplayView from './views/RoleplayView';
import Game3dView from './views/Game3dView';
import ProUpgradeView from './views/ProUpgradeView';
import ProgressAnalyticsView from './views/ProgressAnalyticsView';
import OnboardingView from './views/OnboardingView';
import MasteryLabView from './views/MasteryLabView';

function MainContent() {
  const { activeTab } = useApp();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'tong-quan':
        return <DashboardView />;
      case 'phong-luyen-phat-am':
        return <PracticeStudioView />;
      case 'khau-hinh-2d':
        return <MouthAnatomyView />;
      case 'ai-hoi-thoai':
        return <RoleplayView />;
      case 'game-3d-rpg':
        return <Game3dView />;
      case 'ngan-hang-tu-loi':
        return <ProUpgradeView />;
      case 'tien-do':
        return <ProgressAnalyticsView />;
      case 'chan-doan':
        return <OnboardingView />;
      case 'mastery-lab':
        return <MasteryLabView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans antialiased">
      <Navbar />

      <main className="w-full pt-20 pb-12 flex-1 flex flex-col">
        {renderActiveView()}
      </main>

      {/* Global Modals */}
      <StreakModal />
      <DiagnosticModal />
      <UpgradeModal />

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
