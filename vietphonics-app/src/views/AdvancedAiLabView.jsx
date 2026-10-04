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

export default function AdvancedAiLabView() {
  const { incrementStreak, triggerPractice } = useApp();
  const [activeTab, setActiveTab] = useState('golden-speaker'); // golden-speaker | vowel-space | ai-coach | connected-speech | intelligibility | voice-journal | accent-explorer

  // Web Audio recorder
  const { isRecording, start, stop } = useRecorder({ autoAnalyze: true });

  // 1. ADV-101 State: Golden Speaker
  const [cloneStatus, setCloneStatus] = useState('ready'); // ready | training | cloned
  const [goldenSentence, setGoldenSentence] = useState('Six months ago, she baked fresh bread for breakfast on the street.');

  // 2. ADV-103 State: Vowel Space F1/F2
  const [selectedVowel, setSelectedVowel] = useState({ symbol: '/iː/', f1: 280, f2: 2250, label: 'High Front (Close)', word: 'fleece' });

  // 3. ADV-104 State: AI Coach Memory
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'assistant',
      time: '17:30',
      text: 'Chào Kiệt! Tôi đã theo dõi 14 buổi luyện tập của bạn. Trong tuần qua, bạn đã triệt tiêu được 85% lỗi nuốt âm đuôi /-ks/, nhưng khi nói câu dài trên 10 từ, cuống lưỡi vẫn rụt lại tạo âm /t/ thay vì /θ/. Hôm nay chúng ta sẽ giải quyết triệt để điểm thắt này nhé!'
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  // 4. ADV-105 State: Connected Speech Lab
  const [linkingSentenceIdx, setLinkingSentenceIdx] = useState(0);
  const linkingSentences = [
    {
      id: 1,
      display: 'Turn‿it‿off‿and pick‿it‿up',
      plain: 'Turn it off and pick it up',
      ipa: '/tɜːrn ɪt ɔːf ænd pɪk ɪt ʌp/',
      links: ['Consonant-to-Vowel (C-V)', 'Linking /r/', 'Flap T'],
      linkingScore: 88
    },
    {
      id: 2,
      display: 'Whaddaya‿wanna‿do?',
      plain: 'What do you want to do?',
      ipa: '/ˈwʌdəjə ˈwɑːnə duː/',
      links: ['Reduction & Elision', 'Assimilation'],
      linkingScore: 92
    }
  ];

  // 5. ADV-106 State: Intelligibility Score
  const [asrResults, setAsrResults] = useState({
    whisper: { score: 94, recognized: 'Six months ago she baked fresh bread for breakfast on the street' },
    wav2vec2: { score: 89, recognized: 'Six months ago she bake fresh bread for breakfast on the street' },
    webSpeech: { score: 91, recognized: 'Six months ago she baked fresh bread for breakfast on the street' },
    intelligibilityScore: 91.3,
    misunderstoodWords: [
      { spoken: 'baked /beɪkt/', heard: 'bake /beɪk/', model: 'Wav2Vec2', reason: 'Unreleased final /t/' }
    ]
  });

  // 6. ADV-107 State: Voice Journal
  const [journalRecordings, setJournalRecordings] = useState([
    {
      day: 'Ngày 14',
      date: 'Hôm nay',
      duration: '48s',
      wpm: 136,
      codaRetention: '84%',
      spontaneousScore: 78,
      readAloudScore: 86,
      transferGap: '-8%'
    },
    {
      day: 'Ngày 7',
      date: '7 ngày trước',
      duration: '52s',
      wpm: 122,
      codaRetention: '71%',
      spontaneousScore: 65,
      readAloudScore: 81,
      transferGap: '-16%'
    }
  ]);

  // 7. ADV-108 State: Accent Explorer
  const [targetAccent, setTargetAccent] = useState('us'); // us | uk | au
  const accentWords = [
    { word: 'Water', us: '/ˈwɔːtər/ (Flap T + R)', uk: '/ˈwɔːtə/ (Glottal / non-rhotic)', au: '/ˈwoːtə/ (Broad vowel)' },
    { word: 'Car', us: '/kɑːr/ (Strong rhotic R)', uk: '/kɑː/ (Pure open long vowel)', au: '/kɐː/ (Fronted open)' },
    { word: 'Schedule', us: '/ˈskedʒuːl/', uk: '/ˈʃedjuːl/', au: '/ˈʃedjuːl/' },
    { word: 'Dance', us: '/dæns/ (Flat /æ/)', uk: '/dɑːns/ (Broad /ɑː/)', au: '/dɑːns/ (Broad /ɑː/)' }
  ];

  const playTTS = (text, lang = 'en-US', rate = 0.85) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = rate;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    const userText = inputMsg;
    setInputMsg('');
    setChatMessages((prev) => [
      ...prev,
      { role: 'user', time: '17:32', text: userText }
    ]);
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          time: '17:32',
          text: `Tôi đã phân tích câu hỏi của bạn về "${userText}". Đối với cơ hàm người Việt, mấu chốt là thả lỏng hàm dưới và không kéo căng môi quá mức khi chuyển giữa các phụ âm xát!`
        }
      ]);
    }, 800);
  };

  return (
    <div className="flex flex-col w-full animate-fade-in max-w-[1440px] mx-auto px-4 md:px-gutter-desktop py-4 space-y-6">
      {/* Top Header */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-sky-500/20">
            <span className="material-symbols-outlined text-2xl">neurology</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-sky-600 uppercase">
                Epic: Advanced AI Speech Lab (ADV-101 to ADV-108)
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-mono font-bold text-emerald-700">
                Research-Backed 2026
              </span>
            </div>
            <h1 className="text-xl font-black text-slate-900 leading-tight">
              Phòng Thí Nghiệm Trí Tuệ Nhân Tạo &amp; Phổ Âm Sinh Học Chuyên Sâu
            </h1>
          </div>
        </div>

        {/* Global Dialect & Telemetry */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-slate-500 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 font-semibold">
            Biometric DSP: 16kHz Float32
          </span>
        </div>
      </div>

      {/* Lab Navigation Switcher */}
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
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
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
      {activeTab === 'golden-speaker' && <GoldenSpeakerLab />}

      {/* TAB 2: ADV-102 MediaPipe Lip & Jaw Tracking */}
      {activeTab === 'lip-tracker' && <WebcamLipTracker />}

      {/* TAB 3: ADV-103 Live Inverted Vowel Space Chart */}
      {activeTab === 'vowel-space' && <VowelSpaceChart />}

      {/* TAB 4: ADV-104 AI Phonetics Coach with Long-Term Memory */}
      {activeTab === 'ai-coach' && <AiCoachLab />}

      {/* TAB 5: ADV-105 Connected Speech Lab */}
      {activeTab === 'connected-speech' && <ConnectedSpeechLab />}

      {/* TAB 6: ADV-106 Intelligibility Score */}
      {activeTab === 'intelligibility' && <IntelligibilityLab />}

      {/* TAB 7: ADV-107 Voice Journal */}
      {activeTab === 'voice-journal' && <VoiceJournalLab />}

      {/* TAB 8: ADV-108 Accent Explorer */}
      {activeTab === 'accent-explorer' && <AccentExplorerLab />}
    </div>
  );
}
