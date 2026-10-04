import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useRecorder } from '../lib/audio/useRecorder';
import GoldenSpeakerLab from '../components/advanced/GoldenSpeakerLab';
import WebcamLipTracker from '../components/WebcamLipTracker';
import VowelSpaceChart from '../components/advanced/VowelSpaceChart';
import AiCoachLab from '../components/advanced/AiCoachLab';
import ConnectedSpeechLab from '../components/advanced/ConnectedSpeechLab';
import IntelligibilityLab from '../components/advanced/IntelligibilityLab';
import VoiceJournalLab from '../components/advanced/VoiceJournalLab';
import AccentExplorerLab from '../components/advanced/AccentExplorerLab';
import RoleplayView from './RoleplayView';
import Game3dView from './Game3dView';

export default function AdvancedAiLabView() {
  const { aiLabSubTab, setAiLabSubTab } = useApp();
  const [activeSpeechTab, setActiveSpeechTab] = useState('golden-speaker');

  return (
    <div className="flex flex-col w-full animate-fade-in max-w-[1440px] mx-auto px-4 md:px-gutter-desktop py-4 space-y-6">
      {/* Master 3-Hub Sub-Navigation for AI Interactive Lab */}
      <div className="w-full bg-white border border-slate-200/80 p-3 sm:p-4 rounded-2xl shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200/80 overflow-x-auto max-w-full">
          <button
            type="button"
            onClick={() => setAiLabSubTab('ai-hoi-thoai')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
              aiLabSubTab === 'ai-hoi-thoai'
                ? 'bg-white text-primary shadow-xs border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-base">forum</span>
            <span>AI Hội Thoại Roleplay</span>
          </button>

          <button
            type="button"
            onClick={() => setAiLabSubTab('speech-lab')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
              aiLabSubTab === 'speech-lab'
                ? 'bg-white text-primary shadow-xs border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-base">neurology</span>
            <span>AI Speech Lab (F1/F2 &amp; Giọng Vàng)</span>
          </button>

          <button
            type="button"
            onClick={() => setAiLabSubTab('game-3d-rpg')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
              aiLabSubTab === 'game-3d-rpg'
                ? 'bg-white text-primary shadow-xs border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-base">sports_esports</span>
            <span>Game 3D RPG Chiến Luyện</span>
          </button>
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
          <span className="font-mono text-xs text-slate-500 px-3 py-1 rounded-xl bg-slate-50 border border-slate-200 font-semibold">
            Biometric DSP: 16kHz
          </span>
        </div>
      </div>

      {/* Render Sub-View 1: AI Roleplay */}
      {aiLabSubTab === 'ai-hoi-thoai' && (
        <RoleplayView />
      )}

      {/* Render Sub-View 2: Game 3D RPG */}
      {aiLabSubTab === 'game-3d-rpg' && (
        <Game3dView />
      )}

      {/* Render Sub-View 3: Acoustic Lab Modules */}
      {aiLabSubTab === 'speech-lab' && (
        <div className="space-y-6">
          {/* Lab Feature Tabs Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-100/90 border border-slate-200/80 p-1.5 rounded-2xl overflow-x-auto scrollbar-none">
            {[
              { id: 'golden-speaker', label: '🌟 Golden Speaker (ADV-101)' },
              { id: 'lip-tracker', label: '📷 Soi Khẩu Hình (ADV-102)' },
              { id: 'vowel-space', label: '📊 Vowel Space F1/F2 (ADV-103)' },
              { id: 'ai-coach', label: '🧠 AI Coach Trí Nhớ (ADV-104)' },
              { id: 'connected-speech', label: '🔗 Nối & Nuốt Âm (ADV-105)' },
              { id: 'intelligibility', label: '🎯 Intelligibility Score (ADV-106)' },
              { id: 'voice-journal', label: '🎙️ Voice Journal (ADV-107)' },
              { id: 'accent-explorer', label: '🌍 Accent Explorer (ADV-108)' }
            ].map((tab) => {
              const isActive = activeSpeechTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSpeechTab(tab.id)}
                  type="button"
                  className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-sky-800 shadow-sm border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* TAB 1: ADV-101 Golden Speaker Studio */}
          {activeSpeechTab === 'golden-speaker' && <GoldenSpeakerLab />}

          {/* TAB 2: ADV-102 MediaPipe Lip & Jaw Tracking */}
          {activeSpeechTab === 'lip-tracker' && <WebcamLipTracker />}

          {/* TAB 3: ADV-103 Live Inverted Vowel Space Chart */}
          {activeSpeechTab === 'vowel-space' && <VowelSpaceChart />}

          {/* TAB 4: ADV-104 AI Phonetics Coach with Long-Term Memory */}
          {activeSpeechTab === 'ai-coach' && <AiCoachLab />}

          {/* TAB 5: ADV-105 Connected Speech Lab */}
          {activeSpeechTab === 'connected-speech' && <ConnectedSpeechLab />}

          {/* TAB 6: ADV-106 Intelligibility Score */}
          {activeSpeechTab === 'intelligibility' && <IntelligibilityLab />}

          {/* TAB 7: ADV-107 Voice Journal */}
          {activeSpeechTab === 'voice-journal' && <VoiceJournalLab />}

          {/* TAB 8: ADV-108 Accent Explorer */}
          {activeSpeechTab === 'accent-explorer' && <AccentExplorerLab />}
        </div>
      )}
    </div>
  );
}
