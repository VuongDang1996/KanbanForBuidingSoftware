import React, { useState, useEffect, useRef } from 'react';
import PronunciationGameStudio from './PronunciationGameStudio';
import MouthAnatomyStudio from './MouthAnatomyStudio';
import SoundPracticeEnrichedStudio from './SoundPracticeEnrichedStudio';
import {
  Mic,
  Volume2,
  Play,
  RotateCcw,
  Sparkles,
  Layers,
  Headphones,
  Palette,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Eye,
  Sliders,
  ZoomIn,
  Copy,
  Check,
  Award,
  ChevronRight,
  Flame,
  Radio,
  Clock,
  BookOpen,
  Gamepad2,
  Heart,
  Shield,
  Zap,
  Sword
} from 'lucide-react';

export default function UiDesignStudio({ project }) {
  const [activeScreenTab, setActiveScreenTab] = useState('3d-game'); // 'ending-sounds' | 'stress-tone' | 'mouth' | 'ielts-examiner' | 'minimal-pairs' | '3d-game'
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [selectedPhoneme, setSelectedPhoneme] = useState(null);
  const [copiedToken, setCopiedToken] = useState(null);
  const [selectedPairIndex, setSelectedPairIndex] = useState(0);
  const [minimalPairScore, setMinimalPairScore] = useState(null);
  const [stressWordIndex, setStressWordIndex] = useState(0);

  // Simulation timer for recording
  const timerRef = useRef(null);
  useEffect(() => {
    if (isRecording) {
      setRecordingSeconds(0);
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  const handleCopyCode = (text, tokenKey) => {
    navigator.clipboard?.writeText(text);
    setCopiedToken(tokenKey);
    setTimeout(() => setCopiedToken(null), 1500);
  };

  // Vietnamese Ending Sounds Diagnostic Sentence
  const endingSoundsTokens = [
    { word: 'Six', ending: 'x', ipa: '/sɪks/', dropped: true, errorMsg: 'Rụng cụm âm đuôi /ks/! Bạn phát âm thành /sɪ/.', tip: 'Hãy bật âm /k/ rồi xì hơi /s/ ở cuối từ.' },
    { word: 'months', ending: 'ths', ipa: '/mʌnθs/', dropped: true, errorMsg: 'Rụng âm đuôi /θs/! Bạn phát âm thành /mʌn/.', tip: 'Đặt đầu lưỡi giữa răng cho /θ/ rồi khép răng xì /s/.' },
    { word: 'ago,', ending: '', ipa: '/əˈɡoʊ/', dropped: false, errorMsg: '', tip: '' },
    { word: 'she', ending: '', ipa: '/ʃiː/', dropped: false, errorMsg: '', tip: '' },
    { word: 'baked', ending: 'ed', ipa: '/beɪkt/', dropped: true, errorMsg: 'Quên bật đuôi -ed (/t/)! Bạn phát âm thành /beɪk/.', tip: 'Đuôi -ed sau âm k phát âm là /t/ bật hơi dứt khoát.' },
    { word: 'fresh', ending: 'sh', ipa: '/frɛʃ/', dropped: false, errorMsg: '', tip: 'Âm /ʃ/ chu tròn môi, đẩy hơi gió mạnh.' },
    { word: 'bread', ending: 'd', ipa: '/brɛd/', dropped: false, errorMsg: '', tip: '' },
    { word: 'for', ending: '', ipa: '/fɔːr/', dropped: false, errorMsg: '', tip: '' },
    { word: 'breakfast', ending: 'st', ipa: '/ˈbrɛkfəst/', dropped: true, errorMsg: 'Rụng cụm âm đuôi /st/! Bạn phát âm thành /brɛk-fơ/.', tip: 'Hãy giữ âm /s/ và bật nhẹ âm /t/ ở cuối từ.' },
    { word: 'on', ending: '', ipa: '/ɒn/', dropped: false, errorMsg: '', tip: '' },
    { word: 'the', ending: '', ipa: '/ðə/', dropped: false, errorMsg: '', tip: '' },
    { word: 'street.', ending: 't', ipa: '/striːt/', dropped: false, errorMsg: '', tip: 'Bật âm /t/ dứt khoát ở đầu lưỡi chạm nướu trên.' }
  ];

  // Stress vs Tone Words
  const stressWords = [
    {
      word: 'COM-for-ta-ble',
      ipa: '/ˈkʌmftəbl/',
      syllables: [
        { text: 'COM', stress: true, duration: '240ms', db: '82dB', pitch: 'High', note: 'Trọng âm chính: đọc to, dài, rõ ràng' },
        { text: 'for', stress: false, duration: '75ms', db: '46dB', pitch: 'Low', note: 'Âm lướt: rút ngắn thành schwa /tə/' },
        { text: 'ta', stress: false, duration: '70ms', db: '44dB', pitch: 'Low', note: 'Âm lướt: không đọc thành "tờ"' },
        { text: 'ble', stress: false, duration: '90ms', db: '48dB', pitch: 'Low', note: 'Âm lướt kết hợp âm /l/ tối' }
      ],
      vnError: 'Người Việt hay đọc 4 âm đều nhau: "com-fơ-tờ-bồ" (thêm dấu huyền/nặng)',
      correctRule: 'Tiếng Anh là ngôn ngữ có trọng âm (Stress-timed). Chỉ nhấn mạnh âm 1, 3 âm sau lướt nhanh!'
    },
    {
      word: 'pho-TOG-ra-phy',
      ipa: '/fəˈtɒɡrəfi/',
      syllables: [
        { text: 'pho', stress: false, duration: '80ms', db: '48dB', pitch: 'Low', note: 'Rút ngắn thành /fə/ (không đọc PHO)' },
        { text: 'TOG', stress: true, duration: '260ms', db: '84dB', pitch: 'High', note: 'Trọng âm chính: nâng cao độ và kéo dài' },
        { text: 'ra', stress: false, duration: '75ms', db: '45dB', pitch: 'Low', note: 'Lướt nhanh /rə/' },
        { text: 'phy', stress: false, duration: '90ms', db: '50dB', pitch: 'Low', note: 'Âm cuối /fi/' }
      ],
      vnError: 'Nhầm lẫn với từ "PHO-to-graph" (trọng âm rơi vào âm 1)',
      correctRule: 'Khi thêm đuôi -y, trọng âm dịch chuyển sang âm tiết thứ 2 (pho-TOG-ra-phy)!'
    }
  ];

  // Minimal Pairs Data
  const minimalPairs = [
    {
      sound1: '/θ/',
      sound2: '/t/',
      word1: 'Think',
      word2: 'Tink',
      ipa1: '/θɪŋk/',
      ipa2: '/tɪŋk/',
      instruction: 'Âm /θ/: Cắn nhẹ đầu lưỡi giữa hai hàm răng và thổi hơi gió. Không đọc thành "T" hay "Thờ" tiếng Việt.'
    },
    {
      sound1: '/iː/',
      sound2: '/ɪ/',
      word1: 'Sheep',
      word2: 'Ship',
      ipa1: '/ʃiːp/',
      ipa2: '/ʃɪp/',
      instruction: 'Âm /iː/: Căng mép miệng cười sang hai bên. Âm /ɪ/: Mở miệng tự nhiên, phát âm ngắn và thả lỏng cơ miệng.'
    },
    {
      sound1: '/ʃ/',
      sound2: '/s/',
      word1: 'She',
      word2: 'See',
      ipa1: '/ʃiː/',
      ipa2: '/siː/',
      instruction: 'Âm /ʃ/: Chu tròn môi như đang ra hiệu "suỵt". Âm /s/: Răng khép hờ, khóe miệng kéo ngang xì hơi gió.'
    }
  ];

  return (
    <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
      
      {/* Top Banner */}
      <div className="max-w-[1720px] mx-auto bg-gradient-to-r from-rose-950/70 via-slate-900 to-indigo-950/70 rounded-2xl border border-rose-500/30 p-5 sm:p-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <span>🇻🇳</span> Vietnamese L1 Speech Engine Prototype
              </span>
              <span className="text-xs font-mono text-emerald-400 font-semibold">
                ● High-Fidelity UI & Audio Spec
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              VietPhonics AI — Product Design & Acoustic Architecture Studio
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Interactive live components demonstrating how to solve Vietnamese acoustic pain points: Ending Sound Inspector, Syllable Stress vs Tones, 2D Mouth Articulation, and IELTS Speaking Mock Tests.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/mockups/pronunciation_ui_mockup.jpg"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-all shadow-glow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open 16:9 UI Mockup</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1720px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Prototype Canvas (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Prototype Frame */}
          <div className="bg-slate-900 rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col">
            
            {/* Window chrome / tabs */}
            <div className="p-3 border-b border-slate-800 bg-slate-950/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs font-mono text-slate-400 ml-2 hidden sm:inline">
                  Interactive Live Prototype
                </span>
              </div>

              {/* Screen sub-tabs tailored to Vietnamese learners */}
              <div className="flex items-center bg-slate-800/80 rounded-lg p-0.5 border border-slate-700/60 text-[11px] font-semibold flex-wrap gap-0.5">
                <button
                  onClick={() => { setActiveScreenTab('3d-game'); setSelectedPhoneme(null); }}
                  className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 ${
                    activeScreenTab === '3d-game' ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 font-extrabold shadow-glow-sm' : 'text-amber-400 hover:text-white'
                  }`}
                >
                  <Gamepad2 className="w-3.5 h-3.5" />
                  <span>Game 3D Phiêu Lưu</span>
                </button>
                <button
                  onClick={() => { setActiveScreenTab('ending-sounds'); setSelectedPhoneme(null); }}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    activeScreenTab === 'ending-sounds' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Soi Âm Đuôi
                </button>
                <button
                  onClick={() => { setActiveScreenTab('stress-tone'); setSelectedPhoneme(null); }}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    activeScreenTab === 'stress-tone' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Trọng Âm vs Dấu
                </button>
                <button
                  onClick={() => { setActiveScreenTab('mouth'); setSelectedPhoneme(null); }}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    activeScreenTab === 'mouth' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Khẩu Hình 2D
                </button>
                <button
                  onClick={() => { setActiveScreenTab('ielts-examiner'); setSelectedPhoneme(null); }}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    activeScreenTab === 'ielts-examiner' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  IELTS Speaking AI
                </button>
                <button
                  onClick={() => { setActiveScreenTab('minimal-pairs'); setSelectedPhoneme(null); }}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    activeScreenTab === 'minimal-pairs' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Cặp Âm Dễ Nhầm
                </button>
                <button
                  onClick={() => { setActiveScreenTab('sound-practice'); setSelectedPhoneme(null); }}
                  className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 ${
                    activeScreenTab === 'sound-practice' ? 'bg-gradient-to-r from-rose-600 to-indigo-600 text-white font-bold shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Headphones className="w-3.5 h-3.5 text-rose-400" />
                  <span>Luyện Âm Đa Phương Thức</span>
                </button>
              </div>
            </div>

            {/* Live Interactive UI Content */}
            <div className="p-5 sm:p-7 bg-[#0a0f1d] min-h-[460px] flex flex-col justify-between select-none">
              
              {/* TAB: Enriched Sound Practice Studio (Dictation, Read Aloud, Waveform Compare) */}
              {activeScreenTab === 'sound-practice' && (
                <SoundPracticeEnrichedStudio />
              )}

              {/* TAB 1: Ending Sounds Inspector (Soi Âm Đuôi) */}
              {activeScreenTab === 'ending-sounds' && (
                <div className="space-y-6">
                  {/* Target Lesson Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800/60 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                      <span className="text-slate-300 font-semibold">Bài tập: Khắc phục lỗi rụng âm đuôi (/s, ks, t, d/)</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                      <span className="flex items-center gap-1 text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Bật âm đuôi chuẩn
                      </span>
                      <span className="flex items-center gap-1 text-rose-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Rụng âm đuôi (Lỗi 90% người Việt)
                      </span>
                    </div>
                  </div>

                  {/* Sentence Prompt */}
                  <div className="text-center py-2">
                    <span className="text-xs uppercase tracking-widest text-rose-400 font-mono font-semibold block mb-2">
                      Đọc câu thử nghiệm âm đuôi:
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-relaxed max-w-xl mx-auto">
                      “Six months ago, she baked fresh bread for breakfast on the street.”
                    </h3>
                  </div>

                  {/* Tokenized Ending Sounds Heatmap */}
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                    <div className="text-[11px] font-semibold text-slate-400 flex items-center justify-between">
                      <span>Bấm vào từng từ để xem phân tích âm đuôi:</span>
                      <span className="font-mono text-amber-400 font-bold">Độ chuẩn âm đuôi: 68%</span>
                    </div>

                    <div className="flex items-center justify-center flex-wrap gap-2 py-2">
                      {endingSoundsTokens.map((item, idx) => {
                        const isSelected = selectedPhoneme?.word === item.word;
                        return (
                          <button
                            key={idx}
                            onClick={() => setSelectedPhoneme(item)}
                            className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all flex flex-col items-center gap-0.5 ${
                              item.dropped
                                ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 hover:bg-rose-500/30 ring-1 ring-rose-500/40'
                                : 'bg-slate-800/80 text-slate-300 border-slate-700/60 hover:bg-slate-800'
                            } ${isSelected ? 'ring-2 ring-white scale-105 shadow-lg' : ''}`}
                          >
                            <span className="text-sm font-bold text-white">
                              {item.word}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">
                              {item.ipa}
                            </span>
                            {item.dropped && (
                              <span className="text-[9px] uppercase font-bold text-rose-400 tracking-wider">
                                Rụng -{item.ending}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Diagnostic Explanation Drawer */}
                    {selectedPhoneme && (
                      <div className="p-4 rounded-xl bg-slate-950 border border-rose-500/40 text-xs space-y-2 animate-in fade-in duration-200 shadow-xl">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <AlertCircle className={`w-4 h-4 ${selectedPhoneme.dropped ? 'text-rose-400' : 'text-emerald-400'}`} />
                            <span className="font-bold text-white text-sm">
                              Từ: "{selectedPhoneme.word}" · Phiên âm IPA: {selectedPhoneme.ipa}
                            </span>
                          </div>
                          <button
                            onClick={() => setSelectedPhoneme(null)}
                            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px]"
                          >
                            Đóng
                          </button>
                        </div>

                        {selectedPhoneme.dropped ? (
                          <div className="space-y-1.5 text-slate-300">
                            <p className="text-rose-300 font-semibold">
                              ⚠️ {selectedPhoneme.errorMsg}
                            </p>
                            <p className="text-slate-400 text-[11px] leading-relaxed">
                              💡 <strong className="text-slate-200">Mẹo cho người Việt:</strong> {selectedPhoneme.tip}
                            </p>
                          </div>
                        ) : (
                          <p className="text-emerald-400 font-semibold">
                            ✅ Âm phát ra chuẩn xác! Đã bật âm đuôi rõ ràng không bị nuốt chữ.
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Audio Wave & Record Button */}
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-4">
                    <button
                      onClick={() => alert('Đang phát âm thanh mẫu chuẩn General American...')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
                    >
                      <Volume2 className="w-4 h-4 text-rose-400" />
                      <span>Nghe Mẫu Chuẩn</span>
                    </button>

                    {/* Microphone Recording Simulation */}
                    <div className="flex flex-col items-center gap-1">
                      <button
                        onClick={() => setIsRecording(!isRecording)}
                        className={`w-14 h-14 rounded-full flex items-center justify-center text-white transition-all shadow-2xl ${
                          isRecording
                            ? 'bg-rose-600 hover:bg-rose-500 scale-110 ring-4 ring-rose-500/30 animate-pulse'
                            : 'bg-rose-600 hover:bg-rose-500 hover:scale-105 shadow-glow'
                        }`}
                      >
                        <Mic className="w-6 h-6" />
                      </button>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {isRecording ? `Đang nghe... (00:${recordingSeconds < 10 ? '0' : ''}${recordingSeconds})` : 'Bấm để ghi âm thử'}
                      </span>
                    </div>

                    <button
                      onClick={() => alert('Đang phát lại đoạn ghi âm của bạn để so sánh...')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
                    >
                      <Play className="w-4 h-4 text-emerald-400" />
                      <span>Nghe Lại Bản Thu</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: Syllable Stress vs Vietnamese Tones */}
              {activeScreenTab === 'stress-tone' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800/60 text-xs">
                    <span className="font-semibold text-white">So sánh: Trọng Âm Tiếng Anh vs Dấu Thanh Tiếng Việt</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setStressWordIndex(stressWordIndex === 0 ? 1 : 0)}
                        className="px-2.5 py-1 rounded bg-slate-800 text-indigo-300 hover:bg-slate-700 text-[11px] font-semibold border border-indigo-500/30"
                      >
                        Đổi từ ví dụ ➜
                      </button>
                    </div>
                  </div>

                  {/* Word Header */}
                  <div className="text-center py-2">
                    <span className="text-xs uppercase tracking-widest text-indigo-400 font-mono font-semibold block mb-1">
                      Từ đang luyện:
                    </span>
                    <h3 className="text-3xl font-extrabold text-white tracking-tight">
                      {stressWords[stressWordIndex].word}
                    </h3>
                    <span className="text-sm font-mono text-slate-400 mt-1 block">
                      {stressWords[stressWordIndex].ipa}
                    </span>
                  </div>

                  {/* Syllable Energy & Duration Bar Visualizer */}
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                    <span className="text-xs font-bold text-slate-300 block">
                      Phổ năng lượng âm thanh & độ dài các âm tiết (Acoustic Duration & Loudness):
                    </span>

                    <div className="grid grid-cols-4 gap-3">
                      {stressWords[stressWordIndex].syllables.map((syl, sIdx) => (
                        <div
                          key={sIdx}
                          className={`p-3 rounded-xl border flex flex-col items-center justify-between transition-all ${
                            syl.stress
                              ? 'bg-rose-500/20 border-rose-500/50 shadow-glow-sm ring-1 ring-rose-500/30'
                              : 'bg-slate-950/80 border-slate-800 text-slate-400'
                          }`}
                        >
                          <span className={`text-base font-extrabold ${syl.stress ? 'text-white' : 'text-slate-400'}`}>
                            {syl.text}
                          </span>

                          {/* Relative height bar */}
                          <div className="w-8 bg-slate-800 rounded-full h-24 my-2 flex items-end justify-center p-0.5 overflow-hidden">
                            <div
                              className={`w-full rounded-full transition-all duration-500 ${
                                syl.stress ? 'bg-gradient-to-t from-rose-500 to-amber-400 h-20' : 'bg-slate-600 h-7'
                              }`}
                            />
                          </div>

                          <div className="text-[10px] font-mono text-center space-y-0.5">
                            <span className={`font-bold block ${syl.stress ? 'text-rose-300' : 'text-slate-500'}`}>
                              {syl.duration}
                            </span>
                            <span className="text-slate-500">{syl.db}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Explanatory callout for Vietnamese learners */}
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                      <div className="flex items-start gap-2 text-rose-300">
                        <span className="text-sm">❌</span>
                        <div>
                          <strong>Lỗi phổ biến của người Việt:</strong> {stressWords[stressWordIndex].vnError}
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-emerald-300">
                        <span className="text-sm">✅</span>
                        <div>
                          <strong>Quy tắc bản xứ:</strong> {stressWords[stressWordIndex].correctRule}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: 2D Anatomical Vocal Tract Guide in Vietnamese */}
              {activeScreenTab === 'mouth' && (
                <MouthAnatomyStudio />
              )}

              {/* TAB 4: IELTS Speaking AI Mock Examiner */}
              {activeScreenTab === 'ielts-examiner' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-400" />
                      <span className="font-bold text-white">IELTS Speaking Part 2 Mock Examiner (AI Chấm Điểm)</span>
                    </div>
                    <span className="text-amber-400 font-mono font-bold">Mục tiêu: Band 7.0+</span>
                  </div>

                  {/* IELTS Cue Card */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="uppercase tracking-wider font-semibold text-indigo-400">Cue Card Prompt</span>
                      <span>Thời gian nói: 2 phút</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">
                      "Describe a conversation you had with a foreign client or friend that was memorable."
                    </h4>
                    <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                      <li>Who you spoke with</li>
                      <li>What the topic was</li>
                      <li>Why it was challenging or memorable</li>
                    </ul>
                  </div>

                  {/* Real-time Band Scorecard Simulation */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="text-xs font-bold text-slate-300 flex items-center justify-between">
                      <span>Dự báo điểm phát âm theo tiêu chí IELTS (Pronunciation Descriptors):</span>
                      <span className="font-mono text-emerald-400 text-sm font-extrabold">Band: 7.0</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">Syllable Stress</span>
                        <span className="font-mono text-emerald-400 font-bold text-sm">7.5</span>
                        <span className="text-[10px] text-slate-500 block">Tự nhiên, đúng trọng âm</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">Ending Consonants</span>
                        <span className="font-mono text-amber-400 font-bold text-sm">6.5</span>
                        <span className="text-[10px] text-slate-500 block">Còn nuốt âm đuôi /ks, t/</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">Sentence Intonation</span>
                        <span className="font-mono text-emerald-400 font-bold text-sm">7.0</span>
                        <span className="text-[10px] text-slate-500 block">Ngữ điệu lên xuống tốt</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300">
                      💡 <strong>Lời khuyên để lên Band 7.5+:</strong> Hãy chú ý bật rõ các âm đuôi nối (linking sounds) giữa các từ có phụ âm kết thúc và nguyên âm bắt đầu (ví dụ: <em>"baked a" ➔ /beɪk-tə/</em>).
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: Minimal Pairs Rapid-Fire Drill */}
              {activeScreenTab === 'minimal-pairs' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                    <span className="font-semibold text-white">Luyện Phản Xạ Cặp Âm Hay Bị Nhầm (/θ/ vs /t/, /iː/ vs /ɪ/)</span>
                    <span className="text-emerald-400 font-mono font-semibold">Cặp {selectedPairIndex + 1}/{minimalPairs.length}</span>
                  </div>

                  <div className="text-center py-3">
                    <span className="text-xs text-slate-400 block mb-1">
                      Hệ thống sẽ phát một âm, bạn hãy chọn từ mà bạn nghe thấy:
                    </span>
                    <button
                      onClick={() => alert(`Đang phát âm thanh mẫu của từ "${minimalPairs[selectedPairIndex].word1}"...`)}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs inline-flex items-center gap-2 shadow-glow-sm"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Nghe Âm Thanh Mẫu</span>
                    </button>
                  </div>

                  {/* 2 Big Choice Buttons */}
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setMinimalPairScore('correct')}
                      className={`p-5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                        minimalPairScore === 'correct'
                          ? 'bg-emerald-500/20 border-emerald-500 text-white ring-2 ring-emerald-500'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-200'
                      }`}
                    >
                      <span className="text-2xl font-extrabold">{minimalPairs[selectedPairIndex].word1}</span>
                      <span className="text-xs font-mono text-slate-400">{minimalPairs[selectedPairIndex].ipa1}</span>
                      <span className="text-[10px] font-bold text-rose-400 uppercase mt-1">Âm {minimalPairs[selectedPairIndex].sound1}</span>
                    </button>

                    <button
                      onClick={() => setMinimalPairScore('incorrect')}
                      className={`p-5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                        minimalPairScore === 'incorrect'
                          ? 'bg-rose-500/20 border-rose-500 text-white ring-2 ring-rose-500'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-200'
                      }`}
                    >
                      <span className="text-2xl font-extrabold">{minimalPairs[selectedPairIndex].word2}</span>
                      <span className="text-xs font-mono text-slate-400">{minimalPairs[selectedPairIndex].ipa2}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase mt-1">Âm {minimalPairs[selectedPairIndex].sound2}</span>
                    </button>
                  </div>

                  {minimalPairScore && (
                    <div className={`p-3 rounded-xl border text-xs ${
                      minimalPairScore === 'correct'
                        ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                        : 'bg-rose-500/15 border-rose-500/40 text-rose-300'
                    }`}>
                      {minimalPairScore === 'correct' ? (
                        <span>🎉 <strong>Chính xác!</strong> Tai bạn đã phân biệt được âm {minimalPairs[selectedPairIndex].sound1}!</span>
                      ) : (
                        <span>❌ <strong>Chưa đúng!</strong> Bạn đã nhầm sang âm {minimalPairs[selectedPairIndex].sound2}. Hãy nghe lại kỹ hơn!</span>
                      )}
                    </div>
                  )}

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    💡 <strong>Hướng dẫn tai nghe:</strong> {minimalPairs[selectedPairIndex].instruction}
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        setSelectedPairIndex((prev) => (prev + 1) % minimalPairs.length);
                        setMinimalPairScore(null);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                    >
                      Cặp âm tiếp theo ➜
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 6: 3D Voice-Controlled Game Runner & Battle Studio */}
              {activeScreenTab === '3d-game' && (
                <PronunciationGameStudio />
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Full HD Mockup & Design System Specs (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* HD UI Mockup Preview Card */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 overflow-hidden flex flex-col gap-3 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-rose-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Giao Diện Trực Quan (16:9 HD Display)
                </h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-semibold">VietPhonics Studio</span>
            </div>

            <div className="relative group rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950">
              <img
                src="/mockups/pronunciation_ui_mockup.jpg"
                alt="VietPhonics Pronunciation App UI Mockup"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <a
                  href="/mockups/pronunciation_ui_mockup.jpg"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-semibold shadow-lg flex items-center gap-1.5"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Phóng To Mockup</span>
                </a>
              </div>
            </div>
          </div>

          {/* Technical Architecture & Recommended Stack */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sliders className="w-4 h-4 text-indigo-400" />
                <span>Kiến Trúc Công Nghệ Cần Xây Dựng</span>
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              {/* Stack items */}
              <div className="space-y-2 text-slate-300 font-mono text-[11px]">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">Audio Ingestion:</span>
                  <span className="text-rose-400 font-semibold">Web Audio API (16kHz PCM)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">Speech Model:</span>
                  <span className="text-indigo-400 font-semibold">FastAPI + Wav2Vec2 + Kaldi GOP</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">L1 Confusion Bias:</span>
                  <span className="text-emerald-400 font-semibold">Vietnamese Final Plosives Matrix</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">Payment Gateways:</span>
                  <span className="text-amber-400 font-semibold">MoMo QR + VNPay + Stripe</span>
                </div>
              </div>

              {/* Component UX Checklist */}
              <div className="pt-2 border-t border-slate-800 space-y-1.5 text-[11px] text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Soi rụng âm đuôi /ks, s, t, d/ với phản hồi tức thì</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Đo đạc độ dài âm tiết (ms) chống thói quen đánh dấu thanh</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Mặt cắt khẩu hình 2D mô phỏng vị trí răng & đầu lưỡi</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Phòng thi nói IELTS Speaking Part 2 bấm giờ tự động</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
