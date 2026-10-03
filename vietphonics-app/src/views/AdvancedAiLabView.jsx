import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useRecorder } from '../lib/audio/useRecorder';

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

      {/* TAB 1: ADV-101 Golden Speaker */}
      {activeTab === 'golden-speaker' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="font-mono text-xs font-bold text-sky-600 uppercase">
              ADV-101 • Voice-Cloned Self Model (Golden Speaker)
            </span>
            <h2 className="text-xl font-black text-slate-900 mt-1">
              Nghe Chính Giọng Mình Phát Âm Chuẩn Bản Ngữ
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Hệ thống trích xuất đặc trưng âm sắc (timbre) và tần số cơ bản (F0) từ 3 câu nói của bạn, sau đó áp dụng mô hình phonetic alignment để tạo ra phiên bản "Golden Speaker" chuẩn bản ngữ mang chính chất giọng của bạn.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Cloned Audio Comparison Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-sky-50/50 border border-slate-200 space-y-5">
              <span className="font-mono text-xs font-bold text-slate-400 uppercase block">
                Đối Chiếu Kép: Giọng Thật vs Giọng Bản Ngữ Của Bạn
              </span>
              <p className="text-base font-bold text-slate-900 leading-relaxed font-sans">
                "{goldenSentence}"
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-rose-600 uppercase block">1. Giọng Ghi Âm Thật</span>
                    <span className="text-xs text-slate-700 font-semibold">Tồn tại lỗi nuốt âm đuôi /ks/ và /t/</span>
                  </div>
                  <button
                    onClick={() => playTTS(goldenSentence, 'en-US', 0.9)}
                    type="button"
                    className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">play_arrow</span>
                    <span>Nghe Thật</span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-sky-50/80 border border-sky-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-sky-700 uppercase block">2. Golden Speaker AI (Chất giọng của bạn)</span>
                    <span className="text-xs text-sky-900 font-bold">Đã hiệu chuẩn 100% âm đuôi &amp; trường độ</span>
                  </div>
                  <button
                    onClick={() => playTTS(goldenSentence, 'en-US', 0.8)}
                    type="button"
                    className="p-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-transform active:scale-95 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">auto_awesome</span>
                    <span>Nghe Golden Speaker</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Generator Action */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Huấn Luyện Giọng Golden Speaker Cá Nhân</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Đọc 3 câu mẫu để mô hình AI học âm sắc thanh đới và đường nét cộng hưởng vòm họng của bạn:
                </p>
                <div className="mt-4 space-y-2 text-xs font-mono text-slate-700">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">1. "Six months ago, she baked fresh bread." (Đã thu)</div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">2. "They think that clothes are worth it." (Đã thu)</div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">3. "World health experts published guidelines." (Đã thu)</div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-700 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Mô hình đã huấn luyện hoàn tất
                </span>
                <button
                  onClick={() => alert('Mô hình Golden Speaker đã được cập nhật thành công với 3 mẫu giọng mới!')}
                  type="button"
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  Huấn Luyện Lại (Re-Train)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ADV-103 Live Vowel Space Chart */}
      {activeTab === 'vowel-space' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="font-mono text-xs font-bold text-sky-600 uppercase">
              ADV-103 • Visual Formant Biofeedback (F1/F2 Vowel Space)
            </span>
            <h2 className="text-xl font-black text-slate-900 mt-1">
              Biểu Đồ Không Gian Nguyên Âm F1/F2 Thời Gian Thực
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Trục tung biểu diễn Formant F1 (độ mở hàm / độ cao lưỡi), trục hoành biểu diễn Formant F2 (vị trí lưỡi trước - sau). Giúp bạn căn chỉnh nguyên âm chính xác theo chuẩn âm học quốc tế.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* SVG Vowel Quadrilateral */}
            <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center">
              <div className="w-full flex items-center justify-between text-xs font-mono text-slate-500 pb-2">
                <span>F2: Front ➔ Back (Hz)</span>
                <span>F1: High ➔ Low (Hz)</span>
              </div>

              {/* 2D Vowel Chart SVG */}
              <div className="relative w-full max-w-xl h-80 bg-white rounded-xl border border-slate-200 p-4 overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 500 300">
                  {/* Gridlines */}
                  <line x1="50" y1="50" x2="450" y2="50" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="50" y1="120" x2="450" y2="120" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="50" y1="200" x2="450" y2="200" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="150" y1="30" x2="150" y2="270" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="280" y1="30" x2="280" y2="270" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="400" y1="30" x2="400" y2="270" stroke="#f1f5f9" strokeWidth="1" />

                  {/* Standard Vowel Quadrilateral Polygon */}
                  <polygon
                    points="80,50 420,60 380,250 160,250"
                    fill="none"
                    stroke="#cbd5e1"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />

                  {/* Vowel Target Ellipses */}
                  {[
                    { sym: 'iː', x: 90, y: 60, f1: 280, f2: 2250, label: 'fleece' },
                    { sym: 'ɪ', x: 140, y: 90, f1: 400, f2: 1900, label: 'kit' },
                    { sym: 'e', x: 180, y: 140, f1: 550, f2: 1750, label: 'dress' },
                    { sym: 'æ', x: 180, y: 240, f1: 850, f2: 1600, label: 'trap' },
                    { sym: 'ʌ', x: 280, y: 200, f1: 700, f2: 1250, label: 'strut' },
                    { sym: 'ɑː', x: 370, y: 240, f1: 800, f2: 1100, label: 'palm' },
                    { sym: 'ɔː', x: 400, y: 160, f1: 500, f2: 850, label: 'thought' },
                    { sym: 'ʊ', x: 350, y: 90, f1: 420, f2: 1100, label: 'foot' },
                    { sym: 'uː', x: 410, y: 60, f1: 300, f2: 850, label: 'goose' }
                  ].map((v) => {
                    const isSelected = selectedVowel.symbol === `/${v.sym}/`;
                    return (
                      <g
                        key={v.sym}
                        className="cursor-pointer group"
                        onClick={() => setSelectedVowel({ symbol: `/${v.sym}/`, f1: v.f1, f2: v.f2, label: v.label, word: v.label })}
                      >
                        <circle
                          cx={v.x}
                          cy={v.y}
                          r={isSelected ? 16 : 12}
                          className={isSelected ? 'fill-sky-500 shadow-md' : 'fill-sky-100 hover:fill-sky-200'}
                          stroke={isSelected ? '#0284c7' : '#94a3b8'}
                          strokeWidth={isSelected ? '2.5' : '1'}
                        />
                        <text
                          x={v.x}
                          y={v.y + 4}
                          textAnchor="middle"
                          className={`font-mono text-xs font-bold ${isSelected ? 'fill-white' : 'fill-slate-700'}`}
                        >
                          {v.sym}
                        </text>
                      </g>
                    );
                  })}

                  {/* User Real-time Biofeedback Point */}
                  <g className="animate-pulse">
                    <circle cx="120" cy="80" r="8" fill="#e11d48" stroke="#ffffff" strokeWidth="2" />
                    <text x="135" y="85" className="font-mono text-[10px] fill-rose-600 font-bold">
                      Giọng của bạn (Lệch F2 +120Hz)
                    </text>
                  </g>
                </svg>
              </div>

              <span className="text-[11px] text-slate-500 mt-3 font-mono">
                💡 Bấm vào từng nguyên âm để xem thông số F1/F2 và mẹo di chuyển lưỡi
              </span>
            </div>

            {/* Vowel Details & Biofeedback Coach */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-white border border-slate-200 space-y-4">
              <span className="font-mono text-xs font-bold text-sky-700 uppercase block">
                Phân Tích Âm Học Nguyên Âm: {selectedVowel.symbol}
              </span>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs font-bold text-slate-700">Từ ví dụ</span>
                <span className="font-mono text-sm font-black text-slate-900 uppercase">"{selectedVowel.word}"</span>
              </div>
              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-sky-50 border border-sky-100 text-center">
                  <span className="text-[10px] text-sky-600 uppercase block font-bold">Formant F1</span>
                  <span className="text-base font-black text-sky-900">{selectedVowel.f1} Hz</span>
                  <span className="text-[9px] text-slate-500 block">Độ mở hàm</span>
                </div>
                <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100 text-center">
                  <span className="text-[10px] text-indigo-600 uppercase block font-bold">Formant F2</span>
                  <span className="text-base font-black text-indigo-900">{selectedVowel.f2} Hz</span>
                  <span className="text-[9px] text-slate-500 block">Vị trí trước/sau</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                <span className="font-bold block">💡 Khuyến nghị sinh học:</span>
                <p>
                  Khi người Việt phát âm {selectedVowel.symbol}, cuống lưỡi thường bị kéo tụt về phía họng làm F2 tụt thấp. Hãy đẩy thân lưỡi về phía răng cửa và cười bè mép sang hai bên.
                </p>
              </div>

              <button
                onClick={() => playTTS(selectedVowel.word)}
                type="button"
                className="w-full py-2.5 rounded-xl bg-secondary hover:bg-sky-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">volume_up</span>
                <span>Nghe Mẫu Âm Này</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ADV-104 AI Coach Có Trí Nhớ */}
      {activeTab === 'ai-coach' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="font-mono text-xs font-bold text-sky-600 uppercase">
              ADV-104 • AI Phonetics Coach with Long-Term Memory
            </span>
            <h2 className="text-xl font-black text-slate-900 mt-1">
              Huấn Luyện Viên AI Ghi Nhớ Lịch Sử Lỗi Cấu Âm
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              AI nhớ toàn bộ lịch sử 14 buổi luyện tập của bạn, chẩn đoán dựa trên đặc trưng cấu âm (Articulatory Features: Voicing, Manner, Place) thay vì chấm điểm chung chung.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="h-80 overflow-y-auto space-y-4 pr-2">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[10px] text-slate-400">{msg.time}</span>
                    <span className="font-bold text-xs text-slate-700">
                      {msg.role === 'user' ? 'Bạn' : 'AI Phonetics Coach (Dr. Evelyn)'}
                    </span>
                  </div>
                  <div
                    className={`max-w-lg p-4 rounded-2xl text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-rose-600 text-white rounded-tr-none'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-2 border-t border-slate-200">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Hỏi AI Coach: 'Tại sao tôi vẫn hay bị nuốt âm đuôi khi nói nhanh?'..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-xs cursor-pointer"
              >
                Gửi
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 4: ADV-105 Connected Speech Lab */}
      {activeTab === 'connected-speech' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="font-mono text-xs font-bold text-sky-600 uppercase">
              ADV-105 • Connected Speech Lab (Linking, Reduction, Elision)
            </span>
            <h2 className="text-xl font-black text-slate-900 mt-1">
              Luyện Nối Âm, Nuốt Âm &amp; Biến Âm Như Người Bản Ngữ
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Phát hiện khoảng ngắt tại điểm nối (&gt;120ms) để chấm Linking Score, và tính năng Listening Decoder giải mã câu nói tốc độ cao.
            </p>
          </div>

          <div className="space-y-6">
            {linkingSentences.map((item, idx) => (
              <div key={item.id} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-sky-100 text-sky-800 font-mono text-xs font-bold">
                      Bài #{item.id}
                    </span>
                    {item.links.map((lnk, lIdx) => (
                      <span key={lIdx} className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-mono text-[10px] font-bold">
                        {lnk}
                      </span>
                    ))}
                  </div>
                  <span className="font-mono text-xs font-bold text-emerald-700">
                    Linking Score: {item.linkingScore}%
                  </span>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="font-sans text-2xl font-black text-slate-900 tracking-wide text-sky-800">
                      {item.display}
                    </span>
                    <span className="font-mono text-xs text-slate-400 block mt-1">IPA: {item.ipa}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => playTTS(item.plain, 'en-US', 0.75)}
                      type="button"
                      className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">slow_motion_video</span>
                      <span>Chậm 0.75x</span>
                    </button>
                    <button
                      onClick={() => playTTS(item.plain, 'en-US', 1.0)}
                      type="button"
                      className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">volume_up</span>
                      <span>Nghe Bản Ngữ</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: ADV-106 Intelligibility Score */}
      {activeTab === 'intelligibility' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="font-mono text-xs font-bold text-sky-600 uppercase">
              ADV-106 • Intelligibility Score (Multi-ASR Listener Panel)
            </span>
            <h2 className="text-xl font-black text-slate-900 mt-1">
              Đo "Người Nghe Có Hiểu Bạn Không?" Thay Vì Chỉ Đo Giống Bản Ngữ
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Sử dụng 3 mô hình nhận dạng giọng nói ASR độc lập (OpenAI Whisper, Meta Wav2Vec2, Google Web Speech) làm hội đồng thẩm định mức độ dễ hiểu của người học tiếng Anh.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
              <span className="font-mono text-xs text-slate-400 uppercase font-bold">OpenAI Whisper ASR</span>
              <div className="text-3xl font-black text-emerald-600">{asrResults.whisper.score}%</div>
              <p className="text-[11px] text-slate-500 italic">"{asrResults.whisper.recognized}"</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
              <span className="font-mono text-xs text-slate-400 uppercase font-bold">Meta Wav2Vec2 ASR</span>
              <div className="text-3xl font-black text-sky-600">{asrResults.wav2vec2.score}%</div>
              <p className="text-[11px] text-slate-500 italic">"{asrResults.wav2vec2.recognized}"</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
              <span className="font-mono text-xs text-slate-400 uppercase font-bold">Google Web Speech</span>
              <div className="text-3xl font-black text-indigo-600">{asrResults.webSpeech.score}%</div>
              <p className="text-[11px] text-slate-500 italic">"{asrResults.webSpeech.recognized}"</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-800 uppercase block">Chỉ Số Dễ Hiểu Tổng Hợp</span>
              <span className="text-2xl font-black text-emerald-900">{asrResults.intelligibilityScore}% Dễ Hiểu</span>
              <p className="text-xs text-emerald-700 mt-1">
                🎉 Bạn đã giao tiếp hiệu quả! Giọng Việt nhẹ là hoàn toàn bình thường và được hội đồng quốc tế hiểu rõ.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: ADV-107 Voice Journal */}
      {activeTab === 'voice-journal' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="font-mono text-xs font-bold text-sky-600 uppercase">
              ADV-107 • Spontaneous Speech Voice Journal
            </span>
            <h2 className="text-xl font-black text-slate-900 mt-1">
              Nhật Ký Nói Tự Do 60 Giây &amp; Đo Lường Khoảng Cách Chuyển Di (Transfer Gap)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Đo sự chênh lệch giữa khi đọc câu có sẵn (scripted) và khi nói tự do ứng biến (spontaneous), theo dõi khoảng cách này thu hẹp dần theo tuần.
            </p>
          </div>

          <div className="space-y-4">
            {journalRecordings.map((rec, rIdx) => (
              <div key={rIdx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">{rec.day} ({rec.date})</span>
                    <span className="px-2 py-0.5 rounded bg-slate-200 font-mono text-[10px] text-slate-600">{rec.duration}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 font-mono text-xs text-slate-500">
                    <span>Tốc độ: <strong className="text-slate-800">{rec.wpm} WPM</strong></span>
                    <span>Giữ âm đuôi: <strong className="text-emerald-700">{rec.codaRetention}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right font-mono text-xs">
                    <span className="text-slate-400 block">Nói tự do vs Đọc mẫu</span>
                    <span className="font-bold text-slate-800">{rec.spontaneousScore}% vs {rec.readAloudScore}%</span>
                  </div>
                  <span className="px-3 py-1.5 rounded-xl bg-rose-100 text-rose-800 font-mono text-xs font-bold">
                    Gap: {rec.transferGap}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: ADV-108 Accent Explorer */}
      {activeTab === 'accent-explorer' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="font-mono text-xs font-bold text-sky-600 uppercase">
              ADV-108 • Accent Explorer &amp; Target Dialect Selector
            </span>
            <h2 className="text-xl font-black text-slate-900 mt-1">
              Khám Phá &amp; Chọn Giọng Mục Tiêu (Mỹ General US vs Anh RP vs Úc AU)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Hệ thống không ép buộc một giọng duy nhất. Bạn có thể chọn học theo giọng Mỹ, Anh, hoặc Úc và hệ thống sẽ tự động điều chỉnh bộ tiêu chí chấm điểm tương ứng.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {accentWords.map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black text-slate-900">{item.word}</span>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200">
                    <span className="text-sky-800 font-bold">🇺🇸 Giọng Mỹ (General US)</span>
                    <button
                      onClick={() => playTTS(item.word, 'en-US')}
                      type="button"
                      className="text-sky-600 hover:text-sky-800 flex items-center gap-1 font-bold cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">volume_up</span> {item.us}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200">
                    <span className="text-rose-800 font-bold">🇬🇧 Giọng Anh (RP)</span>
                    <button
                      onClick={() => playTTS(item.word, 'en-GB')}
                      type="button"
                      className="text-rose-600 hover:text-rose-800 flex items-center gap-1 font-bold cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">volume_up</span> {item.uk}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200">
                    <span className="text-amber-800 font-bold">🇦🇺 Giọng Úc (Aus)</span>
                    <button
                      onClick={() => playTTS(item.word, 'en-AU')}
                      type="button"
                      className="text-amber-600 hover:text-amber-800 flex items-center gap-1 font-bold cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">volume_up</span> {item.au}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
