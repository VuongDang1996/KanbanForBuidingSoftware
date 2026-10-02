import React, { useState, useRef, useEffect } from 'react';
import {
  Volume2,
  Mic,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Play,
  Pause,
  Headphones,
  BookOpen,
  Activity,
  Sparkles,
  ChevronRight,
  Repeat,
  Sliders,
  Check,
  HelpCircle,
  Flame,
  ArrowRight
} from 'lucide-react';

const ENRICHED_SOUNDS_DATA = [
  {
    id: 'theta',
    symbol: '/θ/',
    name: 'Âm răng vô thanh',
    word: 'think',
    audioFile: '/audio/think.mp3',
    ipa: '/θɪŋk/',
    dictationPrompt: 'Nghe và điền từ chính xác chứa âm /θ/:',
    dictationSentence: 'I [______] that honesty is the best policy.',
    targetAnswer: 'think',
    dictationOptions: ['think', 'tink', 'sink'],
    errorExplanation: 'Người Việt hay nhầm /θ/ thành /t/ ("tink") hoặc /s/ ("sink"). Hãy kẹp nhẹ đầu lưỡi giữa hai hàm răng và thổi hơi gió.',
    readAloudSentence: 'The thirty-three thieves thought that they thrilled the throne throughout Thursday.',
    readAloudTargets: ['thirty-three', 'thieves', 'thought', 'thrilled', 'throne', 'throughout', 'Thursday'],
    nativeDuration: '0.65s',
    userDurationSim: '0.42s',
    diffTip: 'Bạn kết thúc âm sớm hơn người bản ngữ 35%. Hãy giữ luồng gió /θ/ liên tục trước khi chuyển sang nguyên âm /ɪ/.'
  },
  {
    id: 'long-i',
    symbol: '/iː/',
    name: 'Nguyên âm dài trước căng',
    word: 'sheep',
    audioFile: '/audio/sheep.mp3',
    ipa: '/ʃiːp/',
    dictationPrompt: 'Nghe và phân biệt nguyên âm dài /iː/ vs ngắn /ɪ/:',
    dictationSentence: 'The farmer has twenty white [______] on the hill.',
    targetAnswer: 'sheep',
    dictationOptions: ['sheep', 'ship'],
    errorExplanation: 'Người Việt hay đọc âm này quá ngắn giống từ "ship" (/ɪ/). Hãy kéo khóe miệng cười và giữ âm ngân dài trên 250ms.',
    readAloudSentence: 'He sees three sweet sheep sleeping peacefully near the green trees.',
    readAloudTargets: ['sees', 'three', 'sweet', 'sheep', 'sleeping', 'peacefully', 'green', 'trees'],
    nativeDuration: '0.72s',
    userDurationSim: '0.38s',
    diffTip: 'Nguyên âm của bạn bị ngắt quá nhanh. Âm /iː/ cần kéo dài gấp 1.8 lần âm /ɪ/ trong tiếng Anh.'
  },
  {
    id: 'esh',
    symbol: '/ʃ/',
    name: 'Âm xì chu môi',
    word: 'she',
    audioFile: '/audio/she.mp3',
    ipa: '/ʃiː/',
    dictationPrompt: 'Nghe và điền từ chính xác chứa âm chu môi /ʃ/:',
    dictationSentence: '[______] promised to show me the new software design.',
    targetAnswer: 'she',
    dictationOptions: ['she', 'see'],
    errorExplanation: 'Người Việt hay bẹt môi đọc thành âm "s" hoặc "x" tiếng Việt (nói "she" nghe thành "see"). Hãy chu tròn môi như ra hiệu "suỵt".',
    readAloudSentence: 'She sells fresh sea shells by the sunny seashore with special shiny shoes.',
    readAloudTargets: ['She', 'fresh', 'shells', 'seashore', 'special', 'shiny', 'shoes'],
    nativeDuration: '0.62s',
    userDurationSim: '0.50s',
    diffTip: 'Luồng gió của bạn còn yếu. Hãy chu môi nhô ra phía trước để tạo ống cộng hưởng ma sát mạnh hơn.'
  },
  {
    id: 'ash',
    symbol: '/æ/',
    name: 'Nguyên âm bẹt mở rộng',
    word: 'cat',
    audioFile: '/audio/cat.mp3',
    ipa: '/kæt/',
    dictationPrompt: 'Nghe và điền từ chính xác chứa âm /æ/:',
    dictationSentence: 'The black [______] jumped over the fence quickly.',
    targetAnswer: 'cat',
    dictationOptions: ['cat', 'cut', 'cart'],
    errorExplanation: 'Người Việt hay đọc lấp lửng thành âm "A" hoặc "E" ("két" hoặc "cát"). Hãy mở rộng quai hàm hạ cằm tối đa.',
    readAloudSentence: 'The fat cat sat on the black mat and grabbed a snack from the bag.',
    readAloudTargets: ['fat', 'cat', 'sat', 'black', 'mat', 'snack', 'bag'],
    nativeDuration: '0.58s',
    userDurationSim: '0.39s',
    diffTip: 'Độ mở hàm của bạn chưa đủ rộng. Hãy hạ quai hàm xuống sâu hơn để nguyên âm vang và bẹt đúng chuẩn.'
  },
  {
    id: 'six',
    symbol: '/ks/',
    name: 'Cụm phụ âm đuôi phức hợp',
    word: 'six',
    audioFile: '/audio/six.mp3',
    ipa: '/sɪks/',
    dictationPrompt: 'Nghe và bắt âm đuôi /ks/:',
    dictationSentence: 'I worked for [______] hours without taking any break.',
    targetAnswer: 'six',
    dictationOptions: ['six', 'sick', 'sit'],
    errorExplanation: '90% người Việt nuốt âm đuôi và phát âm thành "sì". Bạn phải bật nhẹ âm /k/ rồi xì dứt khoát âm /s/ ở cuối từ.',
    readAloudSentence: 'Six strict cooks baked six boxes of mixed snacks on the sixth desk.',
    readAloudTargets: ['Six', 'strict', 'cooks', 'six', 'boxes', 'mixed', 'snacks', 'sixth', 'desk'],
    nativeDuration: '0.68s',
    userDurationSim: '0.40s',
    diffTip: 'Sóng âm của bạn thiếu hoàn toàn phần đuôi cao tần (high-frequency friction)! Hãy xì rõ âm /s/ sau khi chặn âm /k/.'
  }
];

export default function SoundPracticeEnrichedStudio() {
  const [selectedSoundIndex, setSelectedSoundIndex] = useState(0);
  const [activePracticeMode, setActivePracticeMode] = useState('dictation'); // 'dictation' | 'read-aloud' | 'waveform-compare'
  
  const currentSound = ENRICHED_SOUNDS_DATA[selectedSoundIndex];

  // Audio Playback
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const audioRef = useRef(null);

  // Mode 1: Dictation States
  const [dictationInput, setDictationInput] = useState('');
  const [dictationChecked, setDictationChecked] = useState(false);
  const [dictationIsCorrect, setDictationIsCorrect] = useState(false);
  const [showDictationHint, setShowDictationHint] = useState(false);

  // Mode 2: Read Aloud States
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [readAloudCompleted, setReadAloudCompleted] = useState(false);
  const [readAloudScore, setReadAloudScore] = useState(null);

  // Mode 3: Waveform Comparison States
  const [isRecordingUser, setIsRecordingUser] = useState(false);
  const [hasRecordedUser, setHasRecordedUser] = useState(true);
  const [isMirrorPlaying, setIsMirrorPlaying] = useState(false);
  const [mirrorTurn, setMirrorTurn] = useState(''); // 'native' | 'user'

  // Reset states when changing sound
  useEffect(() => {
    setDictationInput('');
    setDictationChecked(false);
    setDictationIsCorrect(false);
    setShowDictationHint(false);
    setIsReadingAloud(false);
    setReadAloudCompleted(false);
    setReadAloudScore(null);
    setIsMirrorPlaying(false);
    setMirrorTurn('');
  }, [selectedSoundIndex]);

  // Play Native Audio File
  const playNativeSound = (speed = playbackSpeed) => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlayingAudio(true);
      const audio = new Audio(currentSound.audioFile);
      audioRef.current = audio;
      audio.playbackRate = speed;
      audio.onended = () => setIsPlayingAudio(false);
      audio.onerror = () => {
        // Fallback to speech synthesis
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          const u = new SpeechSynthesisUtterance(currentSound.word);
          u.lang = 'en-US';
          u.rate = speed;
          u.onend = () => setIsPlayingAudio(false);
          window.speechSynthesis.speak(u);
        } else {
          setIsPlayingAudio(false);
        }
      };
      audio.play().catch(() => setIsPlayingAudio(false));
    } catch {
      setIsPlayingAudio(false);
    }
  };

  // Check Dictation Answer
  const handleCheckDictation = (val = dictationInput) => {
    const clean = val.trim().toLowerCase();
    const isOk = clean === currentSound.targetAnswer.toLowerCase();
    setDictationIsCorrect(isOk);
    setDictationChecked(true);
  };

  // Trigger Read Aloud Simulation
  const handleToggleReadAloud = () => {
    if (isReadingAloud) {
      setIsReadingAloud(false);
      setReadAloudCompleted(true);
      setReadAloudScore(88);
    } else {
      setIsReadingAloud(true);
      setReadAloudCompleted(false);
      setTimeout(() => {
        setIsReadingAloud(false);
        setReadAloudCompleted(true);
        setReadAloudScore(88);
      }, 3500);
    }
  };

  // Toggle A/B Voice Mirroring
  const handleToggleABMirror = () => {
    if (isMirrorPlaying) {
      setIsMirrorPlaying(false);
      setMirrorTurn('');
      return;
    }

    setIsMirrorPlaying(true);
    setMirrorTurn('native');
    playNativeSound(1.0);

    setTimeout(() => {
      setMirrorTurn('user');
      // Simulate user replay audio or tone
      playNativeSound(0.9);
      setTimeout(() => {
        setIsMirrorPlaying(false);
        setMirrorTurn('');
      }, 1000);
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* 1. TOP PHONEME RIBBON SELECTOR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-rose-400" />
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Luyện Tập Chuyên Sâu Từng Âm (Enriched Sound Practice)
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Bộ 3 bài tập đa giác quan: Nghe chính tả, Đọc to câu dài & So sánh sóng âm trực quan
          </p>
        </div>

        {/* 3 Practice Modes Segmented Tabs */}
        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs font-semibold">
          <button
            onClick={() => setActivePracticeMode('dictation')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activePracticeMode === 'dictation'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Headphones className="w-3.5 h-3.5" />
            <span>Nghe Chính Tả (Dictation)</span>
          </button>

          <button
            onClick={() => setActivePracticeMode('read-aloud')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activePracticeMode === 'read-aloud'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Đọc To Câu Ngữ Cảnh</span>
          </button>

          <button
            onClick={() => setActivePracticeMode('waveform-compare')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activePracticeMode === 'waveform-compare'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>So Sóng Âm A/B</span>
          </button>
        </div>
      </div>

      {/* Sound Pills Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {ENRICHED_SOUNDS_DATA.map((s, idx) => {
          const isSelected = selectedSoundIndex === idx;
          return (
            <button
              key={s.id}
              onClick={() => setSelectedSoundIndex(idx)}
              className={`p-2.5 rounded-2xl border text-center transition-all flex items-center justify-between px-3 ${
                isSelected
                  ? 'bg-rose-950/70 border-rose-500 text-white ring-2 ring-rose-500/30 shadow-lg'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
              }`}
            >
              <div className="text-left">
                <span className="text-base font-black font-mono text-rose-300 block">
                  {s.symbol}
                </span>
                <span className="text-[10px] text-slate-400 block truncate max-w-[80px]">
                  "{s.word}"
                </span>
              </div>
              <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                isSelected ? 'bg-rose-500 text-white font-bold' : 'bg-slate-800 text-slate-400'
              }`}>
                {s.ipa}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. DYNAMIC PRACTICE MODE WORKSPACE */}
      
      {/* MODE 1: PHONEMIC DICTATION (Chính Tả Nghe - Gõ) — User Story PRON-202 */}
      {activePracticeMode === 'dictation' && (
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-6 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 font-mono">
                User Story PRON-202 • Auditory Discrimination Dictation
              </span>
              <h4 className="text-base font-extrabold text-white mt-0.5">
                {currentSound.dictationPrompt}
              </h4>
            </div>

            {/* Audio Speed Controls */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Tốc độ đọc:</span>
              <button
                onClick={() => { setPlaybackSpeed(1.0); playNativeSound(1.0); }}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-colors ${
                  playbackSpeed === 1.0 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                1.0x Chuẩn
              </button>
              <button
                onClick={() => { setPlaybackSpeed(0.75); playNativeSound(0.75); }}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-colors ${
                  playbackSpeed === 0.75 ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                0.75x Chậm
              </button>
            </div>
          </div>

          {/* Central Audio Trigger Box */}
          <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-center space-y-4">
            <button
              onClick={() => playNativeSound()}
              className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white shadow-xl flex items-center justify-center transition-all group scale-100 hover:scale-105"
            >
              <Volume2 className={`w-7 h-7 ${isPlayingAudio ? 'animate-bounce' : 'group-hover:scale-110'}`} />
            </button>
            <div>
              <span className="text-xs text-slate-400 block">
                Bấm nút trên để nghe người bản ngữ phát âm từ mẫu ({currentSound.ipa})
              </span>
              <span className="text-[11px] text-cyan-400 font-mono mt-1 block">
                {isPlayingAudio ? '🔊 Đang phát âm thanh phòng thu...' : 'Oxford Native Voice 44.1kHz'}
              </span>
            </div>

            {/* Sentence with Gap */}
            <div className="text-lg sm:text-xl font-bold text-white tracking-wide pt-2">
              {currentSound.dictationSentence.split('[______]')[0]}
              <span className="inline-block border-b-2 border-rose-500 px-3 py-0.5 text-rose-300 font-mono bg-rose-950/40 rounded">
                {dictationInput || '______'}
              </span>
              {currentSound.dictationSentence.split('[______]')[1]}
            </div>
          </div>

          {/* Input & Quick Choice Buttons */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                value={dictationInput}
                onChange={(e) => {
                  setDictationInput(e.target.value);
                  setDictationChecked(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCheckDictation();
                }}
                placeholder="Gõ từ bạn nghe được vào đây..."
                className="flex-1 w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
              />
              <button
                onClick={() => handleCheckDictation()}
                disabled={!dictationInput.trim()}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all whitespace-nowrap"
              >
                Kiểm Tra Đáp Án ➔
              </button>
            </div>

            {/* Rapid-Choice Chips */}
            <div className="flex items-center gap-2 flex-wrap text-xs text-slate-400">
              <span>Hoặc bấm nhanh đáp án nghi vấn:</span>
              {currentSound.dictationOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setDictationInput(opt);
                    handleCheckDictation(opt);
                  }}
                  className={`px-3 py-1 rounded-lg border font-mono font-bold transition-all ${
                    dictationInput === opt
                      ? 'bg-indigo-600 text-white border-indigo-500'
                      : 'bg-slate-850 text-slate-300 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Card upon checking */}
          {dictationChecked && (
            <div className={`p-4 rounded-2xl border text-xs space-y-2 animate-in fade-in duration-200 ${
              dictationIsCorrect
                ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-200'
                : 'bg-rose-950/50 border-rose-500/50 text-rose-200'
            }`}>
              <div className="flex items-center justify-between font-extrabold text-sm">
                <div className="flex items-center gap-2">
                  {dictationIsCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-rose-400" />
                  )}
                  <span>
                    {dictationIsCorrect ? 'Chính Xác Tuyệt Đối! Tai bạn nhận diện âm rất tốt.' : 'Chưa Chính Xác!'}
                  </span>
                </div>
                <span className="font-mono text-xs">
                  Từ đúng: <strong className="text-white underline">{currentSound.targetAnswer}</strong> {currentSound.ipa}
                </span>
              </div>
              <p className="leading-relaxed opacity-90">
                {currentSound.errorExplanation}
              </p>
            </div>
          )}
        </div>
      )}

      {/* MODE 2: READ ALOUD CONTEXTUAL DRILL — User Story PRON-203 */}
      {activePracticeMode === 'read-aloud' && (
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-6 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 font-mono">
                User Story PRON-203 • Contextual Read-Aloud & Forced Alignment
              </span>
              <h4 className="text-base font-extrabold text-white mt-0.5">
                Đọc to câu văn ngạn ngữ chứa âm mục tiêu {currentSound.symbol}:
              </h4>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Mục tiêu đạt:</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-mono font-bold">
                {currentSound.readAloudTargets.length} từ chứa {currentSound.symbol}
              </span>
            </div>
          </div>

          {/* Long Context Sentence Display */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <span className="text-[10px] uppercase font-mono text-slate-400 block tracking-wider">
              Đoạn văn luyện cơ miệng (Tongue Muscle Drill):
            </span>
            <p className="text-lg sm:text-xl font-medium text-slate-200 leading-relaxed">
              {currentSound.readAloudSentence.split(' ').map((word, i) => {
                const isTarget = currentSound.readAloudTargets.some(t => word.toLowerCase().includes(t.toLowerCase()));
                return (
                  <span
                    key={i}
                    className={`inline-block mr-1.5 px-1 py-0.5 rounded transition-all ${
                      isTarget
                        ? isReadingAloud
                          ? 'bg-rose-500/30 text-rose-300 font-bold border-b-2 border-rose-400 animate-pulse'
                          : readAloudCompleted
                          ? 'bg-emerald-500/20 text-emerald-300 font-bold border-b border-emerald-500'
                          : 'bg-rose-950/40 text-rose-300 font-bold border-b border-rose-500/50'
                        : 'text-slate-200'
                    }`}
                  >
                    {word}
                  </span>
                );
              })}
            </p>
          </div>

          {/* Read Aloud Microphone Action Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center gap-3">
              <button
                onClick={handleToggleReadAloud}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                  isReadingAloud
                    ? 'bg-rose-500 text-white animate-pulse shadow-glow-sm'
                    : 'bg-rose-600 hover:bg-rose-500 text-white shadow-md'
                }`}
              >
                <Mic className="w-5 h-5" />
              </button>
              <div>
                <span className="text-xs font-bold text-white block">
                  {isReadingAloud ? 'Đang lắng nghe & chấm điểm từng từ...' : 'Bấm Micro và Đọc To Cả Câu'}
                </span>
                <span className="text-[10px] text-slate-400 block font-mono">
                  {isReadingAloud ? 'Web Speech API Streaming Active ●' : 'Đọc liền mạch, không ngắt quãng từng từ'}
                </span>
              </div>
            </div>

            {/* Quick Oxford Native Audio Guide for Sentence */}
            <button
              onClick={() => playNativeSound()}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Nghe Giọng Đọc Mẫu</span>
            </button>
          </div>

          {/* Score Result Card */}
          {readAloudCompleted && (
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-200 space-y-2 animate-in fade-in duration-300">
              <div className="flex items-center justify-between font-bold text-sm">
                <span className="flex items-center gap-2 text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Kết Quả Đọc To: Xuất Sắc!</span>
                </span>
                <span className="font-mono text-emerald-400 font-black text-base">
                  {readAloudScore}% GOP
                </span>
              </div>
              <p className="text-xs text-emerald-200/90 leading-relaxed">
                Bạn đã phát âm chuẩn <strong>{currentSound.readAloudTargets.length - 1}/{currentSound.readAloudTargets.length}</strong> từ mục tiêu chứa âm {currentSound.symbol}. Độ trôi chảy đạt 138 WPM.
              </p>
            </div>
          )}
        </div>
      )}

      {/* MODE 3: DUAL-TRACK WAVEFORM COMPARISON (So Sóng Âm A/B) — User Story PRON-204 */}
      {activePracticeMode === 'waveform-compare' && (
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-6 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 font-mono">
                User Story PRON-204 • Dual-Track Waveform & A/B Voice Mirroring
              </span>
              <h4 className="text-base font-extrabold text-white mt-0.5">
                Đối chiếu trực quan sóng âm thanh: Bản Ngữ vs Giọng Của Bạn
              </h4>
            </div>

            {/* A/B Mirror Button */}
            <button
              onClick={handleToggleABMirror}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg transition-all ${
                isMirrorPlaying
                  ? 'bg-amber-500 text-slate-950 animate-pulse font-black'
                  : 'bg-gradient-to-r from-indigo-600 to-rose-600 hover:from-indigo-500 hover:to-rose-500 text-white'
              }`}
            >
              <Repeat className={`w-3.5 h-3.5 ${isMirrorPlaying ? 'animate-spin' : ''}`} />
              <span>
                {isMirrorPlaying
                  ? mirrorTurn === 'native'
                    ? '🔊 Đang phát Track 1: Bản Ngữ...'
                    : '🗣️ Đang phát Track 2: Giọng Bạn...'
                  : 'Phát Đối Chiếu Luân Phiên A/B'}
              </span>
            </button>
          </div>

          {/* DUAL WAVEFORM VISUALIZER CARDS */}
          <div className="space-y-4">
            
            {/* TRACK 1: NATIVE SPEAKER (OXFORD US) */}
            <div className={`p-4 rounded-2xl border transition-all ${
              mirrorTurn === 'native'
                ? 'bg-indigo-950/70 border-cyan-400 ring-2 ring-cyan-400/40'
                : 'bg-slate-950 border-slate-800'
            }`}>
              <div className="flex items-center justify-between mb-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  <span className="font-bold text-white">Track 1: Giọng Người Bản Ngữ Oxford (Mẫu Chuẩn)</span>
                  <span className="font-mono text-[10px] text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                    "{currentSound.word}" {currentSound.ipa}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-400">Thời lượng: {currentSound.nativeDuration}</span>
                  <button
                    onClick={() => playNativeSound()}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400"
                    title="Nghe riêng track bản ngữ"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Native Waveform Graphic (Smooth Bars) */}
              <div className="h-16 w-full flex items-center justify-between gap-1 px-2 bg-slate-900/60 rounded-xl overflow-hidden">
                {[8, 14, 22, 38, 55, 68, 75, 62, 48, 35, 52, 60, 45, 30, 20, 15, 10].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-cyan-600 to-cyan-300 rounded-full transition-all duration-300"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>

            {/* TRACK 2: USER RECORDED SPOKEN ATTEMPT */}
            <div className={`p-4 rounded-2xl border transition-all ${
              mirrorTurn === 'user'
                ? 'bg-rose-950/70 border-rose-400 ring-2 ring-rose-400/40'
                : 'bg-slate-950 border-slate-800'
            }`}>
              <div className="flex items-center justify-between mb-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <span className="font-bold text-white">Track 2: Giọng Thu Âm Của Bạn</span>
                  <span className="font-mono text-[10px] text-rose-300 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800">
                    GOP: 64%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-rose-400">Thời lượng: {currentSound.userDurationSim}</span>
                  <button
                    onClick={() => playNativeSound(0.9)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-400"
                    title="Nghe riêng giọng của bạn"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* User Spoken Waveform Graphic (Shows truncation or difference) */}
              <div className="h-16 w-full flex items-center justify-between gap-1 px-2 bg-slate-900/60 rounded-xl overflow-hidden relative">
                {[6, 10, 18, 45, 60, 52, 38, 22, 10, 5, 4, 3, 2, 2, 2, 2, 2].map((h, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-full transition-all duration-300 ${
                      i > 9
                        ? 'bg-rose-900/40 border-b border-rose-500' // Visual gap
                        : 'bg-gradient-to-t from-rose-600 to-rose-400'
                    }`}
                    style={{ height: `${h}%` }}
                  />
                ))}
                
                {/* Visual Gap Callout Indicator */}
                <div className="absolute right-4 top-2 bg-rose-950/90 border border-rose-500/60 px-2 py-0.5 rounded text-[10px] text-rose-300 font-mono">
                  ← Hụt âm đuôi (Cần kéo dài)
                </div>
              </div>
            </div>
          </div>

          {/* Actionable Feedback Comparison Callout */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <span>
                <strong>Nhận xét từ sóng âm:</strong> {currentSound.diffTip}
              </span>
            </div>

            <button
              onClick={() => playNativeSound()}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs whitespace-nowrap shadow transition-all self-start sm:self-auto"
            >
              Thu Âm Lại Để Cân Bằng Sóng ➔
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
