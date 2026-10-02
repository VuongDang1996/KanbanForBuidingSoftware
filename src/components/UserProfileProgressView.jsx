import React, { useState } from 'react';
import {
  User,
  Flame,
  Award,
  TrendingUp,
  Clock,
  Mic,
  Volume2,
  Calendar,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Sparkles,
  Shield,
  Layers,
  ChevronRight,
  Filter,
  BarChart3,
  ExternalLink,
  Target,
  ArrowUpRight,
  Activity,
  X
} from 'lucide-react';

// Granular 44-IPA Phoneme Progress Tracking Dataset (User Story USER-102)
export const IPA_PHONEMES_DATA = [
  // Vowels
  { symbol: '/iː/', word: 'sheep', score: 92, status: 'mastered', count: 42, trend: '+14%', group: 'Vowels', vnNote: 'Âm i dài: Căng mép miệng cười, nâng cao thân lưỡi.' },
  { symbol: '/ɪ/', word: 'ship', score: 78, status: 'improving', count: 35, trend: '+8%', group: 'Vowels', vnNote: 'Âm i ngắn: Thả lỏng cơ miệng, phát âm dứt khoát.' },
  { symbol: '/e/', word: 'bed', score: 85, status: 'mastered', count: 28, trend: '+5%', group: 'Vowels', vnNote: 'Âm e: Mở miệng tự nhiên vừa phải, không bè quá rộng.' },
  { symbol: '/æ/', word: 'cat', score: 62, status: 'warning', count: 39, trend: '+12%', group: 'Vowels', vnNote: 'Âm e bẹt: Hạ quai hàm tối đa, đè thấp đầu lưỡi.' },
  { symbol: '/ʌ/', word: 'cup', score: 80, status: 'mastered', count: 22, trend: '+6%', group: 'Vowels', vnNote: 'Âm á: Bật nhanh từ cuống họng, miệng nửa mở.' },
  { symbol: '/ɑː/', word: 'car', score: 88, status: 'mastered', count: 31, trend: '+9%', group: 'Vowels', vnNote: 'Âm a dài: Mở rộng khoang miệng, ngân dài âm.' },
  { symbol: '/ɒ/', word: 'hot', score: 74, status: 'improving', count: 19, trend: '+4%', group: 'Vowels', vnNote: 'Âm o ngắn: Chu nhẹ môi, ngắt âm dứt khoát.' },
  { symbol: '/ɔː/', word: 'door', score: 82, status: 'mastered', count: 26, trend: '+7%', group: 'Vowels', vnNote: 'Âm o dài: Chu tròn môi hơn và kéo dài hơi.' },
  { symbol: '/ʊ/', word: 'book', score: 76, status: 'improving', count: 18, trend: '+3%', group: 'Vowels', vnNote: 'Âm u ngắn: Môi hơi tròn, phát âm dứt khoát.' },
  { symbol: '/uː/', word: 'moon', score: 86, status: 'mastered', count: 30, trend: '+11%', group: 'Vowels', vnNote: 'Âm u dài: Chu tròn môi hướng ra trước, ngân dài.' },
  { symbol: '/ɜː/', word: 'bird', score: 68, status: 'improving', count: 25, trend: '+15%', group: 'Vowels', vnNote: 'Âm ơ dài: Cuộn nhẹ đầu lưỡi, không chạm vòm họng.' },
  { symbol: '/ə/', word: 'about', score: 65, status: 'warning', count: 48, trend: '+18%', group: 'Vowels', vnNote: 'Âm Schwa: Lướt cực nhẹ và mềm trong âm tiết không nhấn.' },
  // Consonants (Key L1 Vietnamese Transfer Traps)
  { symbol: '/θ/', word: 'think', score: 58, status: 'warning', count: 52, trend: '+20%', group: 'Consonants', vnNote: 'Cắn nhẹ đầu lưỡi ra giữa 2 hàm răng, thổi luồng hơi gió nhẹ.' },
  { symbol: '/ð/', word: 'this', score: 64, status: 'warning', count: 40, trend: '+10%', group: 'Consonants', vnNote: 'Kẹp đầu lưỡi giữa răng và rung mạnh dây thanh quản.' },
  { symbol: '/ʃ/', word: 'she', score: 88, status: 'mastered', count: 46, trend: '+16%', group: 'Consonants', vnNote: 'Chu tròn môi như ra hiệu "suỵt", luồng gió xoáy mạnh.' },
  { symbol: '/ʒ/', word: 'measure', score: 70, status: 'improving', count: 21, trend: '+7%', group: 'Consonants', vnNote: 'Khẩu hình giống /ʃ/ nhưng rung mạnh dây thanh quản.' },
  { symbol: '/tʃ/', word: 'chair', score: 75, status: 'improving', count: 29, trend: '+12%', group: 'Consonants', vnNote: 'Bật hơi dứt khoát kết hợp âm t và âm sh.' },
  { symbol: '/dʒ/', word: 'jam', score: 67, status: 'improving', count: 33, trend: '+14%', group: 'Consonants', vnNote: 'Bật âm rung thanh quản mạnh, không đọc thành "dờ".' },
  { symbol: '/s/', word: 'see', score: 94, status: 'mastered', count: 60, trend: '+4%', group: 'Consonants', vnNote: 'Khép răng xì hơi gió sắc và rõ nét.' },
  { symbol: '/z/', word: 'zoo', score: 84, status: 'mastered', count: 38, trend: '+8%', group: 'Consonants', vnNote: 'Khép răng xì gió có độ rung của dây thanh quản.' },
  { symbol: '/r/', word: 'red', score: 72, status: 'improving', count: 44, trend: '+15%', group: 'Consonants', vnNote: 'Cuộn ngược đầu lưỡi lơ lửng, tuyệt đối không chạm vòm họng.' },
  { symbol: '/l/', word: 'light', score: 82, status: 'mastered', count: 37, trend: '+10%', group: 'Consonants', vnNote: 'Đầu lưỡi áp chặt vào nướu răng cửa trên.' },
  // Ending Sound Clusters
  { symbol: '/ks/', word: 'six', score: 56, status: 'warning', count: 45, trend: '+22%', group: 'Clusters', vnNote: 'Bật âm /k/ rồi xì /s/ ở cuối từ, không được nuốt thành "sì".' },
  { symbol: '/st/', word: 'fast', score: 78, status: 'improving', count: 32, trend: '+16%', group: 'Clusters', vnNote: 'Giữ xì hơi /s/ và bật nhẹ âm /t/ dứt khoát.' }
];

// Default Practice History Records
export const INITIAL_PRACTICE_HISTORY = [
  {
    id: 'hist-1',
    word: 'Six months ago, she baked fresh bread for breakfast',
    ipa: '/sɪks mʌnθs əˈɡoʊ, ʃiː beɪkt frɛʃ brɛd fɔːr ˈbrɛkfəst/',
    gopScore: 92,
    category: 'ending-sounds',
    categoryLabel: 'Âm Đuôi',
    timestamp: '15 phút trước',
    status: 'good',
    tags: ['Bật /ks/ chuẩn', 'Bật đuôi -ed /t/ chuẩn'],
    feedback: 'Xuất sắc! Bạn đã bật rõ cụm /ks/ trong "six" và âm /t/ trong "baked", không còn bị nuốt âm như lần trước.',
    vnErrorNoticed: 'Không phát hiện lỗi nuốt âm nghiêm trọng.'
  },
  {
    id: 'hist-2',
    word: 'COM-for-ta-ble',
    ipa: '/ˈkʌmftəbl/',
    gopScore: 88,
    category: 'stress-tone',
    categoryLabel: 'Trọng Âm',
    timestamp: '1 giờ trước',
    status: 'good',
    tags: ['Nhấn âm 1 chuẩn', 'Lướt Schwa tốt'],
    feedback: 'Âm 1 kéo dài 260ms đạt chuẩn Stress-timed. Ba âm tiết sau lướt nhanh mềm mại.',
    vnErrorNoticed: 'Đã bỏ thói quen đọc 4 âm đều nhau ("com-fơ-tờ-bồ").'
  },
  {
    id: 'hist-3',
    word: 'I think that three trees are green',
    ipa: '/aɪ θɪŋk ðæt θriː triːz ɑːr ɡriːn/',
    gopScore: 64,
    category: 'minimal-pairs',
    categoryLabel: 'Cặp Âm',
    timestamp: 'Hôm nay, 10:24',
    status: 'warning',
    tags: ['Nhầm /θ/ thành /t/', 'Three vs Tree'],
    feedback: 'Bạn đã phát âm từ "think" thành "tink" (/t/) và "three" thành "tree". Hãy cắn nhẹ đầu lưỡi giữa hai hàm răng và đẩy luồng hơi êm.',
    vnErrorNoticed: 'Lỗi L1 phổ biến: Thay thế âm răng môi /θ/ bằng âm bật /t/ tiếng Việt.'
  },
  {
    id: 'hist-4',
    word: 'Hold on, pick it up and check it out!',
    ipa: '/hoʊl-dɒn, pɪ-kɪ-tʌp ænd tʃɛ-kɪ-daʊt/',
    gopScore: 95,
    category: 'connected-speech',
    categoryLabel: 'Nối Âm',
    timestamp: 'Hôm qua, 21:15',
    status: 'good',
    tags: ['Liaison mượt mà', 'Flap T tự nhiên'],
    feedback: 'Tuyệt đỉnh! Bạn nối mượt phụ âm sang nguyên âm: Hol-don, Pi-ki-tup, Che-ki-daut.',
    vnErrorNoticed: 'Không bị ngắt ngứ giữa các từ đơn lẻ.'
  },
  {
    id: 'hist-5',
    word: 'pho-TOG-ra-phy',
    ipa: '/fəˈtɒɡrəfi/',
    gopScore: 54,
    category: 'stress-tone',
    categoryLabel: 'Trọng Âm',
    timestamp: '2 ngày trước',
    status: 'error',
    tags: ['Nhầm trọng âm âm 1', 'Schwa bị phát âm sai'],
    feedback: 'Trọng âm bị đặt sai vào âm 1 (đọc thành PHO-to-graphy). Từ này phải nhấn mạnh âm 2: pho-TOG-ra-phy.',
    vnErrorNoticed: 'Nhầm lẫn trọng âm giữa danh từ gốc và từ phát sinh đuôi -y.'
  },
  {
    id: 'hist-6',
    word: 'Can you hear me? ↗',
    ipa: '/kæn juː hɪər miː ↗/',
    gopScore: 90,
    category: 'connected-speech',
    categoryLabel: 'Ngữ Điệu',
    timestamp: '3 ngày trước',
    status: 'good',
    tags: ['Lên giọng cuối câu', 'Câu hỏi Yes/No'],
    feedback: 'Cao độ vút lên hoàn hảo ở cuối câu hỏi Yes/No, tạo cảm giác thân thiện bản ngữ.',
    vnErrorNoticed: 'Đã khắc phục lỗi đi giọng bằng phẳng cuối câu.'
  }
];

export default function UserProfileProgressView({
  currentUser,
  onOpenAuthModal,
  onSwitchToStudio
}) {
  const [selectedFilter, setSelectedFilter] = useState('all'); // 'all' | 'ending-sounds' | 'minimal-pairs' | 'stress-tone' | 'connected-speech'
  const [playingId, setPlayingId] = useState(null);
  const [selectedPhoneme, setSelectedPhoneme] = useState(IPA_PHONEMES_DATA[12]); // Default to /θ/
  const [phonemeGroupFilter, setPhonemeGroupFilter] = useState('all'); // 'all' | 'Vowels' | 'Consonants' | 'Clusters' | 'weak'

  // Play Native Pronunciation audio sample
  const playNativeSample = (text, id) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      setPlayingId(id);
      utterance.onend = () => setPlayingId(null);
      utterance.onerror = () => setPlayingId(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Play phoneme sample
  const playPhonemeSample = (word) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const filteredHistory = INITIAL_PRACTICE_HISTORY.filter((item) => {
    if (selectedFilter === 'all') return true;
    return item.category === selectedFilter;
  });

  const filteredPhonemes = IPA_PHONEMES_DATA.filter((p) => {
    if (phonemeGroupFilter === 'all') return true;
    if (phonemeGroupFilter === 'weak') return p.score < 70;
    return p.group === phonemeGroupFilter;
  });

  return (
    <div className="max-w-[1720px] mx-auto px-4 sm:px-6 py-6 space-y-6 animate-in fade-in duration-300">
      
      {/* 1. TOP PROFILE & STREAK BANNER */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          
          {/* Avatar & Learner Details */}
          <div className="flex items-center gap-4">
            <div className="relative group cursor-pointer" onClick={onOpenAuthModal}>
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-rose-500 border-2 border-white/70 shadow-2xl flex items-center justify-center text-4xl ring-4 ring-indigo-500/20 group-hover:scale-105 transition-transform">
                {currentUser?.avatar || '🧙‍♂️'}
              </div>
              <div className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] border border-amber-300 shadow">
                LV {currentUser?.level || 5}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-xl font-extrabold text-white">
                  {currentUser?.name || 'Nguyễn Tuấn Anh'}
                </h2>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Đã Hiệu Chuẩn L1 ({currentUser?.accentRegion || 'Miền Bắc'})</span>
                </span>
              </div>

              <p className="text-xs text-slate-400">
                {currentUser?.role || 'IT Software Engineer @ FPT Software'} • {currentUser?.email || 'tuananh.dev@vietphonics.ai'}
              </p>

              <div className="flex items-center gap-2 pt-1 text-xs">
                <span className="text-slate-500 font-medium">Mục tiêu cá nhân:</span>
                <span className="text-amber-300 font-bold bg-amber-950/40 px-2.5 py-0.5 rounded border border-amber-500/30">
                  🎯 {currentUser?.target || 'Giao tiếp dự án quốc tế & IELTS 7.0'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Metrics & Account Buttons */}
          <div className="flex items-center gap-3 flex-wrap self-start lg:self-center">
            {/* Daily Streak Card */}
            <div className="p-3 px-4 rounded-2xl bg-slate-950/80 border border-amber-500/30 flex items-center gap-3 shadow-lg">
              <div className="h-10 w-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Flame className="w-5 h-5 fill-amber-400 animate-pulse" />
              </div>
              <div>
                <span className="text-sm font-extrabold text-white block">
                  {currentUser?.streak || 7} Ngày Liên Tục
                </span>
                <span className="text-[10px] text-amber-400 font-medium flex items-center gap-1">
                  <Shield className="w-3 h-3" /> 1 Khiên bảo vệ sẵn sàng
                </span>
              </div>
            </div>

            {/* Total XP Card */}
            <div className="p-3 px-4 rounded-2xl bg-slate-950/80 border border-indigo-500/30 flex items-center gap-3 shadow-lg">
              <div className="h-10 w-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-extrabold text-white block font-mono">
                  {currentUser?.xp || 2450} XP
                </span>
                <span className="text-[10px] text-indigo-300 font-medium">
                  Hạng #14 Đại Học Bách Khoa
                </span>
              </div>
            </div>

            <button
              onClick={onOpenAuthModal}
              className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition-all flex items-center gap-1.5"
            >
              <User className="w-4 h-4" />
              <span>Đổi Tài Khoản / Đăng Nhập</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. PRONUNCIATION MASTERY & 4-PILLAR RADAR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Overall Pronunciation Score Gauge (4 Cols) */}
        <div className="lg:col-span-4 rounded-3xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Chỉ Số Phát Âm Tổng Thể
              </h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
              GOP Acoustic Engine
            </span>
          </div>

          {/* Radial Big Score */}
          <div className="flex flex-col items-center justify-center py-4 space-y-2">
            <div className="relative w-36 h-36 rounded-full border-8 border-slate-800 flex items-center justify-center">
              <div
                className="absolute inset-0 rounded-full border-8 border-emerald-500 transition-all duration-1000"
                style={{
                  clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`
                }}
              />
              <div className="text-center">
                <span className="text-4xl font-black text-white font-mono block">
                  {currentUser?.overallScore || 76}%
                </span>
                <span className="text-[10px] font-semibold text-emerald-400">
                  Tương đương IELTS 7.0
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 text-center max-w-xs leading-relaxed">
              Bạn có phát âm tự nhiên hơn <strong>78%</strong> người học tiếng Anh tại Việt Nam. Tiến bộ <strong>+14%</strong> sau 14 ngày.
            </p>
          </div>

          {/* Quick Learning Stats */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800 text-center text-xs">
            <div className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800">
              <Clock className="w-4 h-4 text-indigo-400 mx-auto mb-1" />
              <span className="font-extrabold text-white block">14.5 Giờ</span>
              <span className="text-[9px] text-slate-500">Luyện nói</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800">
              <Mic className="w-4 h-4 text-rose-400 mx-auto mb-1" />
              <span className="font-extrabold text-white block">342 Câu</span>
              <span className="text-[9px] text-slate-500">Đã thu âm</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800">
              <Award className="w-4 h-4 text-amber-400 mx-auto mb-1" />
              <span className="font-extrabold text-white block">9/12 Ải</span>
              <span className="text-[9px] text-slate-500">Game 3D</span>
            </div>
          </div>
        </div>

        {/* Right: 4 Pedagogical Pillars Breakdown (8 Cols) */}
        <div className="lg:col-span-8 rounded-3xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-indigo-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Đánh Giá Theo 4 Trụ Cột Ngữ Âm Cho Người Việt
              </h3>
            </div>
            <button
              onClick={onSwitchToStudio}
              className="text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
            >
              <span>Vào Luyện Tập Ngay</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 4 Pillars Progress Bars */}
          <div className="space-y-4">
            
            {/* Pillar 1: Ending Sounds */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-bold text-white">1. Âm Đuôi & Phụ Âm Bật (/s, /ks, /t, /d, /k/)</span>
                </div>
                <span className="font-mono text-emerald-400 font-extrabold">
                  {currentUser?.soundMastery?.endingSounds || 82}% (Khá giỏi)
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-700"
                  style={{ width: `${currentUser?.soundMastery?.endingSounds || 82}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-400 block">
                Đã làm chủ âm đuôi /t/ và /s/. Cần chú ý bật dứt khoát cụm âm phức hợp /ks/ và /θs/.
              </span>
            </div>

            {/* Pillar 2: Minimal Pairs */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-violet-400" />
                  <span className="font-bold text-white">2. Cặp Âm Đối Lập (/θ/ vs /t/, /iː/ vs /ɪ/, /ʃ/ vs /s/)</span>
                </div>
                <span className="font-mono text-violet-400 font-extrabold">
                  {currentUser?.soundMastery?.minimalPairs || 71}% (Đang tiến bộ)
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-violet-500 to-indigo-400 h-full rounded-full transition-all duration-700"
                  style={{ width: `${currentUser?.soundMastery?.minimalPairs || 71}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-400 block">
                Phân biệt tốt nguyên âm ngắn/dài. Lỗi thường gặp: kẹp lưỡi cho âm /θ/ vẫn đôi khi nhầm thành /t/ khi nói nhanh.
              </span>
            </div>

            {/* Pillar 3: Syllable Stress */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="font-bold text-white">3. Trọng Âm Từ & Nhịp Điệu (Stress-Timed Rhythm)</span>
                </div>
                <span className="font-mono text-amber-400 font-extrabold">
                  {currentUser?.soundMastery?.stressCadence || 68}% (Trung bình)
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 to-rose-400 h-full rounded-full transition-all duration-700"
                  style={{ width: `${currentUser?.soundMastery?.stressCadence || 68}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-400 block">
                Đã giảm 50% thói quen đánh dấu sắc/huyền tiếng Việt. Cần lướt nhẹ các âm Schwa /ə/ trong từ đa âm tiết.
              </span>
            </div>

            {/* Pillar 4: Connected Speech */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  <span className="font-bold text-white">4. Nối Âm & Ngữ Điệu Tự Nhiên (Connected Speech & Liaison)</span>
                </div>
                <span className="font-mono text-rose-400 font-extrabold">
                  {currentUser?.soundMastery?.connectedSpeech || 59}% (Cần rèn luyện)
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-rose-500 to-pink-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${currentUser?.soundMastery?.connectedSpeech || 59}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-400 block">
                Đang học nối phụ âm sang nguyên âm và biến âm Flap T. Khuyến nghị luyện bài thi IELTS Speaking Part 2.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. GRANULAR 44-IPA PHONEME MASTERY LEDGER (User Story USER-102) */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
                Bảng Theo Dõi Tiến Độ Chi Tiết Từng Âm IPA (Phoneme Mastery Grid)
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                USER-102 Đã Tích Hợp
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Nhấp vào từng âm để xem độ thuần thục, xu hướng cải thiện tuần qua và lời khuyên khắc phục tật phát âm mẹ đẻ
            </p>
          </div>

          {/* Group Filter Buttons */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { id: 'all', label: 'Tất Cả (24)' },
              { id: 'weak', label: '⚠️ Cần Sửa (<70%)' },
              { id: 'Consonants', label: 'Phụ Âm' },
              { id: 'Vowels', label: 'Nguyên Âm' },
              { id: 'Clusters', label: 'Cụm Âm Đuôi' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setPhonemeGroupFilter(tab.id)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                  phonemeGroupFilter === tab.id
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Layout: Grid on Left (8 Cols), Selected Phoneme Detail Card on Right (4 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Phonemes Grid (8 Cols) */}
          <div className="lg:col-span-8 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
            {filteredPhonemes.map((p) => {
              const isSelected = selectedPhoneme?.symbol === p.symbol;
              const isMastered = p.score >= 80;
              const isImproving = p.score >= 65 && p.score < 80;
              const isWarning = p.score < 65;

              return (
                <button
                  key={p.symbol}
                  onClick={() => setSelectedPhoneme(p)}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-between gap-1 group relative ${
                    isSelected
                      ? 'bg-emerald-950/70 border-emerald-400 text-white ring-2 ring-emerald-400/40 shadow-xl'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-850 text-slate-200'
                  }`}
                >
                  <span className="text-base font-black font-mono block text-white group-hover:scale-110 transition-transform">
                    {p.symbol}
                  </span>
                  <span className="text-[10px] text-slate-400 block font-sans">
                    {p.word}
                  </span>
                  
                  {/* Score & Progress Badge */}
                  <span
                    className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full mt-1 ${
                      isMastered
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : isImproving
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}
                  >
                    {p.score}%
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Phoneme Deep-Dive Inspector (4 Cols) */}
          {selectedPhoneme && (
            <div className="lg:col-span-4 rounded-2xl bg-slate-950 border border-slate-800 p-5 flex flex-col justify-between space-y-4 shadow-xl">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black font-mono text-emerald-400">
                      {selectedPhoneme.symbol}
                    </span>
                    <div>
                      <span className="text-xs text-white font-bold block">
                        Từ ví dụ: "{selectedPhoneme.word}"
                      </span>
                      <span className="text-[10px] text-slate-400 block capitalize">
                        Nhóm: {selectedPhoneme.group}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => playPhonemeSample(selectedPhoneme.word)}
                    className="p-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-400/40 text-indigo-200 shadow-sm transition-all"
                    title="Nghe phát âm từ mẫu"
                  >
                    <Volume2 className="w-4 h-4 text-cyan-400" />
                  </button>
                </div>

                {/* Score & Practice Count Metric */}
                <div className="grid grid-cols-2 gap-2 my-3">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Độ chuẩn xác (GOP)</span>
                    <span className="text-lg font-black font-mono text-emerald-400 block">
                      {selectedPhoneme.score}%
                    </span>
                    <span className="text-[9px] text-emerald-400 font-semibold block">
                      {selectedPhoneme.trend} tuần qua
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Số lượt thu âm</span>
                    <span className="text-lg font-black font-mono text-white block">
                      {selectedPhoneme.count} lần
                    </span>
                    <span className="text-[9px] text-slate-400 block">
                      Đã ghi nhận dữ liệu
                    </span>
                  </div>
                </div>

                {/* Vietnamese L1 Correction Advice */}
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-1">
                  <span className="font-extrabold text-[11px] text-amber-300 block flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>Mẹo đặt khẩu hình & sửa tật L1:</span>
                  </span>
                  <p className="text-[11px] leading-relaxed text-amber-200/90">
                    {selectedPhoneme.vnNote}
                  </p>
                </div>
              </div>

              {/* Action Button: Jump to Studio */}
              <button
                onClick={onSwitchToStudio}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <Target className="w-3.5 h-3.5" />
                <span>Xem Khẩu Hình & Luyện Riêng Âm {selectedPhoneme.symbol} ➔</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 4. PRACTICE & RECORDING HISTORY LOG */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-extrabold text-white">
                Lịch Sử Thu Âm & Luyện Phát Âm Chi Tiết
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Xem lại từng câu đã nói, phân tích điểm GOP và nghe lại giọng chuẩn
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            {[
              { id: 'all', label: 'Tất Cả' },
              { id: 'ending-sounds', label: 'Âm Đuôi' },
              { id: 'minimal-pairs', label: 'Cặp Âm' },
              { id: 'stress-tone', label: 'Trọng Âm' },
              { id: 'connected-speech', label: 'Nối Âm' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedFilter === f.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* History Item Cards List */}
        <div className="space-y-3">
          {filteredHistory.map((item) => {
            const isGood = item.gopScore >= 80;
            const isWarning = item.gopScore >= 60 && item.gopScore < 80;
            const isError = item.gopScore < 60;

            return (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Left: Word & IPA */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-sm text-white">{item.word}</span>
                    <span className="font-mono text-xs text-indigo-400">{item.ipa}</span>
                    <span className="text-[10px] px-2 py-0.2 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-medium">
                      {item.categoryLabel}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.feedback}
                  </p>

                  {item.vnErrorNoticed && (
                    <div className="text-[10px] text-amber-300/90 flex items-center gap-1.5">
                      <AlertCircle className="w-3 h-3 text-amber-400 flex-shrink-0" />
                      <span>{item.vnErrorNoticed}</span>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex items-center gap-1.5 pt-1">
                    {item.tags.map((t, i) => (
                      <span
                        key={i}
                        className={`text-[9px] px-2 py-0.5 rounded font-medium ${
                          isGood
                            ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                            : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Score & Actions */}
                <div className="flex items-center gap-4 self-end md:self-center">
                  <div className="text-right">
                    <span
                      className={`text-lg font-black font-mono block ${
                        isGood
                          ? 'text-emerald-400'
                          : isWarning
                          ? 'text-amber-400'
                          : 'text-rose-400'
                      }`}
                    >
                      {item.gopScore}%
                    </span>
                    <span className="text-[10px] text-slate-500">{item.timestamp}</span>
                  </div>

                  {/* Audio Playback Button */}
                  <button
                    onClick={() => playNativeSample(item.word, item.id)}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Nghe phát âm chuẩn người bản ngữ"
                  >
                    <Volume2 className={`w-4 h-4 ${playingId === item.id ? 'text-indigo-400 animate-pulse' : ''}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
