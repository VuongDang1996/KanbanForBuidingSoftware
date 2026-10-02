import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Gamepad2,
  Sword,
  Shield,
  Zap,
  Flame,
  Heart,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  RotateCcw,
  Sparkles,
  Trophy,
  Star,
  ChevronRight,
  Info,
  CheckCircle2,
  AlertCircle,
  Award,
  Layers,
  Skull,
  Radio,
  Sliders,
  Maximize2,
  Minimize2,
  Lock,
  Unlock,
  Package,
  Music,
  Play,
  Pause,
  Crown,
  FastForward,
  Compass,
  MessageSquare
} from 'lucide-react';

// ==========================================
// 1. PROCEDURAL WEB AUDIO SYNTHESIZER ENGINE
// ==========================================
class AdvancedAudioEngine {
  constructor() {
    this.ctx = null;
    this.bgmInterval = null;
    this.bgmPlaying = false;
    this.bgmStep = 0;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playLaser(crit = false) {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = crit ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(crit ? 1100 : 780, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);
    } catch {}
  }

  playShatter() {
    try {
      this.init();
      if (!this.ctx) return;
      // Multi-frequency noise blast
      [180, 360, 720].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.04);
        osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.35);
        gain.gain.setValueAtTime(0.2, this.ctx.currentTime + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + i * 0.04);
        osc.stop(this.ctx.currentTime + 0.35);
      });
    } catch {}
  }

  playHurt() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(35, this.ctx.currentTime + 0.28);
      gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.28);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.28);
    } catch {}
  }

  playVictory() {
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C5, E5, G5, C6, E6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.25, this.ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.08);
        osc.stop(this.ctx.currentTime + idx * 0.08 + 0.3);
      });
    } catch {}
  }

  playLootChime() {
    try {
      this.init();
      if (!this.ctx) return;
      const chords = [440, 554.37, 659.25, 880];
      chords.forEach((freq) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.6);
      });
    } catch {}
  }

  toggleBGM(enable, onStep) {
    this.init();
    if (!enable) {
      if (this.bgmInterval) clearInterval(this.bgmInterval);
      this.bgmInterval = null;
      this.bgmPlaying = false;
      return;
    }

    if (this.bgmPlaying) return;
    this.bgmPlaying = true;

    // 8-bit Fantasy Chiptune Arpeggiator (Am - F - C - G)
    const chords = [
      [220, 261.63, 329.63], // Am
      [174.61, 220, 261.63], // F
      [130.81, 164.81, 196], // C
      [196, 246.94, 293.66]  // G
    ];

    this.bgmStep = 0;
    this.bgmInterval = setInterval(() => {
      try {
        if (!this.ctx) return;
        const chordIdx = Math.floor((this.bgmStep % 16) / 4);
        const noteIdx = this.bgmStep % 3;
        const freq = chords[chordIdx][noteIdx] * 1.5;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.16);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.16);

        this.bgmStep++;
        if (onStep) onStep(this.bgmStep);
      } catch {}
    }, 200);
  }
}

const audio = new AdvancedAudioEngine();

// ==========================================
// 2. PEDAGOGICAL 4-WORLD & STAGE TAXONOMY
// ==========================================
const GAME_WORLDS = [
  {
    id: 'world-1',
    name: 'World 1: Whispering Caverns',
    theme: 'Hẻm Núi Thì Thầm — Âm Đuôi & Phụ Âm Bật',
    tag: 'Final Consonants',
    color: 'emerald',
    badgeBg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
    bossTheme: 'Stone Golem of Dropped Sounds',
    lore: 'Nơi người Việt mắc bẫy nuốt sạch các âm đuôi /s, /ks, /t, /d/. Hãy dùng thần chú đánh tan rào cản!',
    stages: [
      {
        id: 'stage-1-1',
        name: 'Ải 1-1: Cổng Bật Hơi /t/ & /d/',
        targetWord: 'STREET',
        ipa: '/striːt/',
        keySound: 'Âm đuôi /t/',
        soundGroup: '/t, /d/',
        stars: 3,
        xpReward: 120,
        tip: 'Chạm đầu lưỡi vào chân răng trên và bật dứt khoát luồng hơi /t/, không nuốt âm thành "sơ-trít".',
        errorSimulation: {
          spoken: 'STREE...',
          gop: '42%',
          fault: 'Nuốt chửng âm đuôi /t/! Bạn phát âm thành /striː/. Nhân vật vấp ngã mất đà.'
        },
        correctSimulation: {
          spoken: 'STREET /striːt/',
          gop: '95%',
          feedback: 'Âm đuôi /t/ nổ giòn giã! Pha lê rạn nứt và mở đường ray tốc độ!'
        }
      },
      {
        id: 'stage-1-2',
        name: 'Ải 1-2: Mạng Nhện Cụm Phụ Âm /ks/',
        targetWord: 'SIX',
        ipa: '/sɪks/',
        keySound: 'Cụm âm /ks/',
        soundGroup: '/s, /ks/',
        stars: 2,
        xpReward: 150,
        tip: 'Khép răng xì hơi /s/ ngay sau khi bật chặn /k/. Tuyệt đối không đọc thành "sích" hay "sít".',
        errorSimulation: {
          spoken: 'SI... (/sɪ/)',
          gop: '38%',
          fault: 'Rụng hoàn toàn cụm /ks/. Hãy bật /k/ rồi xì mạnh /s/ để phá tan mạng nhện!'
        },
        correctSimulation: {
          spoken: 'SIX /sɪks/',
          gop: '96%',
          feedback: 'Critical Hit! Cụm /ks/ giải phóng tia sấm sét phá hủy hoàn toàn chướng ngại vật!'
        }
      },
      {
        id: 'stage-1-3',
        name: 'Ải 1-3 (Trùm Khu Vực): Golem Cổ Tích',
        isBoss: true,
        bossName: 'Stone Golem of Dropped Sounds',
        bossHp: 300,
        targetWord: 'BAKED BREAD',
        ipa: '/beɪkt brɛd/',
        keySound: 'Đuôi -ed (/t/) & /d/',
        soundGroup: 'Multi-Ending Boss',
        stars: 1,
        xpReward: 300,
        tip: 'Trùm dựng 2 lớp khiên: Lớp 1 "baked" phải bật đuôi /t/ (không đọc bếch-kịt), lớp 2 "bread" giữ âm /d/.',
        errorSimulation: {
          spoken: 'BAKE BREA...',
          gop: '45%',
          fault: 'Golem hấp thụ đòn đánh vì cả 2 từ đều bị nuốt mất âm cuối! Golem đập búa gây chấn động!'
        },
        correctSimulation: {
          spoken: 'BAKED BREAD /beɪkt brɛd/',
          gop: '98%',
          feedback: 'Tuyệt đỉnh! Chuỗi âm đuôi kép phá nát giáp Golem. Rương báu Hoàng Kim rơi ra!'
        }
      }
    ]
  },
  {
    id: 'world-2',
    name: 'World 2: Valley of Echoes',
    theme: 'Thung Lũng Vọng Âm — Cặp Âm Đối Lập',
    tag: 'Minimal Pairs',
    color: 'violet',
    badgeBg: 'bg-violet-500/15 border-violet-500/30 text-violet-300',
    bossTheme: 'Twin Phantoms of Confusion',
    lore: 'Ảo ảnh đánh lừa đôi tai người Việt! Phân biệt rạch ròi /θ/ vs /t/ và nguyên âm ngắn / dài.',
    stages: [
      {
        id: 'stage-2-1',
        name: 'Ải 2-1: Đối Đầu Cặp Răng Môi /θ/ vs /t/',
        targetWord: 'THINK',
        ipa: '/θɪŋk/',
        keySound: 'Âm /θ/ (không phải /t/)',
        soundGroup: '/θ/ vs /t/',
        stars: 2,
        xpReward: 160,
        tip: 'Cắn nhẹ đầu lưỡi giữa hai hàm răng và đẩy luồng hơi êm dịu. Không đọc thành "TINK" hay "Thờ" tiếng Việt.',
        errorSimulation: {
          spoken: 'TINK (/tɪŋk/)',
          gop: '50%',
          fault: 'Bạn đọc thành âm /t/ (Tink)! Khiên phản xạ của quái vật dội ngược sát thương.'
        },
        correctSimulation: {
          spoken: 'THINK /θɪŋk/',
          gop: '94%',
          feedback: 'Khẩu hình lưỡi giữa răng hoàn hảo! Phép Băng Giá đóng băng toàn bộ quái vật.'
        }
      },
      {
        id: 'stage-2-2',
        name: 'Ải 2-2: Hẻm Vực Nguyên Âm Dài /iː/ vs /ɪ/',
        targetWord: 'SHEEP',
        ipa: '/ʃiːp/',
        keySound: 'Nguyên âm căng dài /iː/',
        soundGroup: '/iː/ vs /ɪ/',
        stars: 3,
        xpReward: 180,
        tip: 'Kéo khóe miệng sang hai bên như đang cười và ngân dài âm /iː/, kết thúc bằng ngậm môi bật /p/.',
        errorSimulation: {
          spoken: 'SHIP (/ʃɪp/)',
          gop: '48%',
          fault: 'Âm quá ngắn (/ɪ/), bạn đã triệu hồi con thuyền (Ship) thay vì chú cừu (Sheep)!'
        },
        correctSimulation: {
          spoken: 'SHEEP /ʃiːp/',
          gop: '97%',
          feedback: 'Trường độ âm thanh đạt 310ms! Dây cáp năng lượng kéo bạn băng qua hẻm núi an toàn.'
        }
      },
      {
        id: 'stage-2-3',
        name: 'Ải 2-3 (Trùm Khu Vực): Ảo Ảnh Song Sinh',
        isBoss: true,
        bossName: 'Twin Phantoms of Confusion',
        bossHp: 350,
        targetWord: 'THREE TREES',
        ipa: '/θriː triːz/',
        keySound: '/θ/ vs /tr/ phối hợp',
        soundGroup: 'Twin Reflex Boss',
        stars: 0,
        xpReward: 350,
        tip: 'Phân thân 1 yêu cầu /θriː/ (lưỡi kẹp răng), phân thân 2 yêu cầu /triːz/ (uốn lưỡi âm tr). Đọc chuẩn trong 4s!',
        errorSimulation: {
          spoken: 'TREE TREES (/triː triːz/)',
          gop: '52%',
          fault: 'Bạn đọc cả hai từ thành "TREE" (/t/)! Hai ảo ảnh hợp nhất tung đòn hắc ám!'
        },
        correctSimulation: {
          spoken: 'THREE TREES /θriː triːz/',
          gop: '96%',
          feedback: 'Phân tích Formant F1/F2 chuẩn xác 100%! Cả 2 phân thân phát nổ thành bụi sao!'
        }
      }
    ]
  },
  {
    id: 'world-3',
    name: 'World 3: Rhythm Peaks',
    theme: 'Đỉnh Núi Nhịp Điệu — Trọng Âm & Phách Nói',
    tag: 'Syllable Stress',
    color: 'amber',
    badgeBg: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
    bossTheme: 'Chronos Rhythm Keeper',
    lore: 'Phá bỏ tật nói bằng phẳng (flat tones) như tiếng Việt. Nhảy bục theo nhịp điệu Stress-Timed!',
    stages: [
      {
        id: 'stage-3-1',
        name: 'Ải 3-1: Bục Chuyển Dịch Danh Từ vs Động Từ',
        targetWord: 'PRE-sent',
        ipa: '/ˈprɛznt/',
        keySound: 'Trọng âm rơi vào âm 1',
        soundGroup: '2-Syllable Shift',
        stars: 3,
        xpReward: 180,
        tip: 'Đây là danh từ "Món quà" -> Đọc thật to, cao âm "PRE", âm sau lướt nhanh /znt/.',
        errorSimulation: {
          spoken: 'pre-SENT (/prɪˈzɛnt/)',
          gop: '40%',
          fault: 'Bạn lại nhấn vào âm 2 (động từ thuyết trình)! Bục nhảy nghiêng lệch làm nhân vật trượt chân.'
        },
        correctSimulation: {
          spoken: 'PRE-sent /ˈprɛznt/',
          gop: '93%',
          feedback: 'Âm 1 đạt 84dB và dài gấp 2.5 lần âm 2! Lò xo kích hoạt phóng vút lên tầng cao!'
        }
      },
      {
        id: 'stage-3-2',
        name: 'Ải 3-2: Cầu Thang Đa Âm Tiết Lướt Schwa',
        targetWord: 'COM-for-ta-ble',
        ipa: '/ˈkʌmftəbl/',
        keySound: 'Nhấn âm 1, lướt schwa 3 âm sau',
        soundGroup: 'Polysyllabic',
        stars: 1,
        xpReward: 220,
        tip: 'Người Việt hay đọc 4 âm đều nhau: "com-fơ-tờ-bồ". Hãy dồn 70% năng lượng vào "COM" và lướt nhanh.',
        errorSimulation: {
          spoken: 'com-fơ-tờ-bồ (Flat Tone)',
          gop: '35%',
          fault: 'Bạn thêm dấu tiếng Việt và đọc 4 âm bằng nhau! Cầu thang đá vỡ vụn dưới chân.'
        },
        correctSimulation: {
          spoken: 'COM-for-ta-ble /ˈkʌmftəbl/',
          gop: '95%',
          feedback: 'Tuyệt tác nhịp điệu Stress-Timed! Nhân vật lướt nhẹ qua 3 bậc đá như một cơn gió.'
        }
      },
      {
        id: 'stage-3-3',
        name: 'Ải 3-3 (Trùm Khu Vực): Titan Đồng Hồ',
        isBoss: true,
        bossName: 'Chronos Rhythm Keeper',
        bossHp: 400,
        targetWord: 'pho-TOG-ra-phy',
        ipa: '/fəˈtɒɡrəfi/',
        keySound: 'Trọng âm âm 2 /tɒɡ/',
        soundGroup: 'Metronome Boss',
        stars: 0,
        xpReward: 400,
        tip: 'Boss đập nhịp Metronome. Hãy rút ngắn âm 1 thành /fə/, nâng cao độ và kéo dài âm "TOG"!',
        errorSimulation: {
          spoken: 'PHO-to-gra-phy',
          gop: '46%',
          fault: 'Bạn nhầm với từ Photo (nhấn âm 1)! Bánh răng khổng lồ của Titan tiếp tục quay nghiền nát.'
        },
        correctSimulation: {
          spoken: 'pho-TOG-ra-phy /fəˈtɒɡrəfi/',
          gop: '98%',
          feedback: 'Khóa nhịp hoàn hảo! Bánh răng thời gian của Titan bị đóng băng vĩnh viễn!'
        }
      }
    ]
  },
  {
    id: 'world-4',
    name: "World 4: Dragon's Spire",
    theme: 'Đỉnh Tháp Rồng — Nối Âm & Ngữ Điệu Trôi Chảy',
    tag: 'Connected Speech',
    color: 'rose',
    badgeBg: 'bg-rose-500/15 border-rose-500/30 text-rose-300',
    bossTheme: 'Ancalagon of Accents',
    lore: 'Ngọn tháp tối thượng thử thách khả năng nối âm (Liaison & Flap T) và ngữ điệu tự nhiên như người bản xứ.',
    stages: [
      {
        id: 'stage-4-1',
        name: 'Ải 4-1: Dòng Chảy Nối Phụ Âm Sang Nguyên Âm',
        targetWord: 'PICK IT UP',
        ipa: '/pɪ-kɪ-tʌp/',
        keySound: 'Nối âm: Pick-it-up -> Pi-ki-tup',
        soundGroup: 'Consonant-to-Vowel',
        stars: 2,
        xpReward: 200,
        tip: 'Phụ âm đuôi /k/ nối sang "it", phụ âm /t/ nối sang "up". Đọc liền mạch như một từ 3 âm tiết.',
        errorSimulation: {
          spoken: 'PICK... IT... UP...',
          gop: '50%',
          fault: 'Bạn bị ngắc ngứ ngắt quãng giữa các từ! Dòng dung nham trào dâng ép bạn lùi lại.'
        },
        correctSimulation: {
          spoken: 'Pi-ki-tup /pɪkɪtʌp/',
          gop: '96%',
          feedback: 'Nối âm mượt như người bản ngữ! Nhân vật lướt ván trượt trên dòng dung nham an toàn.'
        }
      },
      {
        id: 'stage-4-2',
        name: 'Ải 4-2: Lượn Sóng Ngữ Điệu Câu Hỏi Yes/No',
        targetWord: 'CAN YOU HEAR ME?',
        ipa: '/kæn juː hɪər miː ↗/',
        keySound: 'Lên giọng cuối câu (Rising Intonation)',
        soundGroup: 'Pitch Contour',
        stars: 1,
        xpReward: 240,
        tip: 'Cuối câu hỏi Yes/No phải vút cao giọng ở từ "ME" để tạo tín hiệu mời gọi phản hồi.',
        errorSimulation: {
          spoken: 'CAN YOU HEAR ME ↘ (Falling)',
          gop: '44%',
          fault: 'Bạn đi xuống giọng như câu kể! Cánh cổng âm thanh không nhận diện được tín hiệu câu hỏi.'
        },
        correctSimulation: {
          spoken: 'CAN YOU HEAR ME? ↗',
          gop: '95%',
          feedback: 'Đường cong cao độ vút lên hoàn mỹ! Tinh linh hộ mệnh thức tỉnh hộ tống bạn.'
        }
      },
      {
        id: 'stage-4-3',
        name: 'Ải 4-3 (Trùm Cuối Game): Rồng Hỗn Mang Tiếng Mẹ Đẻ',
        isBoss: true,
        bossName: 'Ancalagon of Accents (Final Boss)',
        bossHp: 600,
        targetWord: 'HOLD ON, CHECK IT OUT!',
        ipa: '/hoʊl-dɒn, tʃɛ-kɪ-daʊt/',
        keySound: 'Combo Tổng Hợp: Âm Đuôi + Nối Âm + Flap T',
        soundGroup: 'Ultimate Dragon Rush',
        stars: 0,
        xpReward: 500,
        tip: 'Combo 2 cụm: "Hol-don" và "Che-ki-daut". Đọc dứt khoát trong 1 hơi thở để kích hoạt Phonics Beam tối thượng!',
        errorSimulation: {
          spoken: 'HOLD... ON... CHECK... IT... OUT...',
          gop: '40%',
          fault: 'Tia lửa của Rồng áp đảo! Chuỗi liên hoàn bị đứt đoạn khiến thanh Khiên Nộ phát nổ.'
        },
        correctSimulation: {
          spoken: 'HOLD ON, CHECK IT OUT! (Chùm Nối Âm)',
          gop: '99%',
          feedback: 'CRITICAL PHONICS FINISHER! Rồng gục ngã, Vương Miện Phát Âm Bản Ngữ (Master Crown) tỏa sáng rực rỡ!'
        }
      }
    ]
  }
];

// ==========================================
// 3. MAIN INTERACTIVE GAME STUDIO COMPONENT
// ==========================================
export default function PronunciationGameStudio() {
  // Navigation & Game Modes
  const [activeGameMode, setActiveGameMode] = useState('campaign'); // 'campaign' | 'endless' | 'boss-rush' | 'rhythm-lane'
  const [selectedWorldId, setSelectedWorldId] = useState('world-1');
  const [selectedStageId, setSelectedStageId] = useState('stage-1-2');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isBgmOn, setIsBgmOn] = useState(false);

  // Modals
  const [showSkillTreeModal, setShowSkillTreeModal] = useState(false);
  const [showLootChestModal, setShowLootChestModal] = useState(false);
  const [openedLootItem, setOpenedLootItem] = useState(null);
  const [showStoryDialog, setShowStoryDialog] = useState(true);

  // Current World & Stage
  const currentWorld = useMemo(() => {
    return GAME_WORLDS.find((w) => w.id === selectedWorldId) || GAME_WORLDS[0];
  }, [selectedWorldId]);

  const currentStage = useMemo(() => {
    return currentWorld.stages.find((s) => s.id === selectedStageId) || currentWorld.stages[0];
  }, [currentWorld, selectedStageId]);

  // RPG Player Profile State
  const [playerState, setPlayerState] = useState({
    name: 'Hiệp Sĩ Ngữ Âm',
    level: 5,
    xp: 2450,
    nextLevelXp: 3500,
    hp: 100,
    maxHp: 100,
    mp: 95,
    maxMp: 100,
    streak: 7,
    combo: 3,
    critRate: 35,
    skillPoints: 2,
    skills: {
      endingSoundCrit: 2, // /s, /ks/ crit boost
      minimalPairIce: 1,  // /θ/ freeze
      stressCadence: 1,   // stress duration boost
      liaisonFinisher: 0  // dragon beam unlocked
    },
    inventory: [
      { id: 'w1', name: 'Trượng Lôi Thần /ks/ Cổ Đại', type: 'Wand', rarity: 'Legendary', icon: '🪄', stat: '+30% DMG Âm Đuôi', equipped: true },
      { id: 'b1', name: 'Hài Phong Lôi Stress-Timed', type: 'Boots', rarity: 'Epic', icon: '👢', stat: '+25% Tốc Độ Nhảy Bục', equipped: true },
      { id: 'c1', name: 'Giáp Khẩu Hình Băng Giá /θ/', type: 'Armor', rarity: 'Rare', icon: '🥋', stat: '+15% Kháng Sát Thương', equipped: false }
    ]
  });

  // Combat Scene Dynamic State
  const [combatState, setCombatState] = useState({
    bossHp: currentStage.isBoss ? currentStage.bossHp : null,
    bossMaxHp: currentStage.isBoss ? currentStage.bossHp : null,
    bossRageTimer: 12,
    obstacleStatus: 'approaching', // 'approaching' | 'shattered' | 'bumped' | 'casting'
    floatingTexts: [], // { id, text, color, x, y, opacity }
    shakeIntensity: 0,
    beamActive: false,
    lastFeedback: null,
    micTranscript: '',
    isListening: false,
    rhythmProgress: 0
  });

  // HTML5 Canvas Ref for 60 FPS Procedural Graphics Engine
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const particlesRef = useRef([]);

  // BGM Step sync
  useEffect(() => {
    audio.toggleBGM(isBgmOn && !isMuted, () => {
      setCombatState((prev) => ({
        ...prev,
        rhythmProgress: (prev.rhythmProgress + 1) % 100
      }));
    });
    return () => {
      audio.toggleBGM(false);
    };
  }, [isBgmOn, isMuted]);

  // Stage Switch Reset
  useEffect(() => {
    setCombatState((prev) => ({
      ...prev,
      bossHp: currentStage.isBoss ? currentStage.bossHp : null,
      bossMaxHp: currentStage.isBoss ? currentStage.bossHp : null,
      bossRageTimer: 12,
      obstacleStatus: 'approaching',
      lastFeedback: null,
      micTranscript: ''
    }));
  }, [currentStage]);

  // Spawn Particle Helper
  const spawnParticles = (x, y, count = 35, color = '#38bdf8') => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        size: Math.random() * 4 + 2,
        color,
        alpha: 1,
        life: 0,
        maxLife: Math.random() * 30 + 20
      });
    }
  };

  // 60 FPS Canvas Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let tick = 0;

    const render = () => {
      tick++;
      const width = canvas.width;
      const height = canvas.height;

      // Clear & Background Gradient
      ctx.clearRect(0, 0, width, height);

      // Save for Screen Shake
      ctx.save();
      if (combatState.shakeIntensity > 0) {
        const dx = (Math.random() - 0.5) * combatState.shakeIntensity;
        const dy = (Math.random() - 0.5) * combatState.shakeIntensity;
        ctx.translate(dx, dy);
      }

      // Parallax Stars / Nebula
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, width, height);

      // Starfield
      for (let i = 0; i < 40; i++) {
        const starX = (i * 37 + tick * 0.4) % width;
        const starY = (i * 29) % (height * 0.6);
        const starSize = (i % 3) + 1;
        ctx.fillStyle = i % 2 === 0 ? 'rgba(99, 102, 241, 0.4)' : 'rgba(255, 255, 255, 0.6)';
        ctx.fillRect(starX, starY, starSize, starSize);
      }

      // 3D Perspective Road Track (Moving Grid Floor)
      const horizonY = height * 0.55;
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.25)';
      ctx.lineWidth = 1.5;

      // Horizontal moving grid lines
      const gridOffset = (tick * 2.5) % 30;
      for (let y = horizonY; y < height; y += 15) {
        const animatedY = y + gridOffset * ((y - horizonY) / (height - horizonY));
        if (animatedY < height) {
          ctx.beginPath();
          ctx.moveTo(0, animatedY);
          ctx.lineTo(width, animatedY);
          ctx.stroke();
        }
      }

      // Perspective convergence rays
      for (let x = -width; x < width * 2; x += 60) {
        ctx.beginPath();
        ctx.moveTo(width / 2, horizonY);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Live Oscilloscope Audio Waveform on Track
      ctx.beginPath();
      ctx.strokeStyle = combatState.isListening ? '#f43f5e' : '#38bdf8';
      ctx.lineWidth = 2;
      for (let x = 0; x < width; x += 10) {
        const wave = Math.sin(x * 0.05 + tick * 0.1) * (combatState.isListening ? 16 : 6);
        const y = horizonY + 25 + wave;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Render Player Avatar (Left side)
      const playerX = width * 0.18;
      const playerY = horizonY + 30;
      const bobY = Math.sin(tick * 0.15) * 4;

      // Player Shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.beginPath();
      ctx.ellipse(playerX, playerY + 35, 24, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Wizard Body & Robe
      ctx.fillStyle = '#6366f1';
      ctx.beginPath();
      ctx.arc(playerX, playerY + bobY, 18, 0, Math.PI * 2);
      ctx.fill();

      // Magic Hat
      ctx.fillStyle = '#4f46e5';
      ctx.beginPath();
      ctx.moveTo(playerX - 22, playerY - 4 + bobY);
      ctx.lineTo(playerX + 22, playerY - 4 + bobY);
      ctx.lineTo(playerX + 4, playerY - 38 + bobY);
      ctx.closePath();
      ctx.fill();

      // Magic Staff & Glowing Orb
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(playerX + 16, playerY + 32 + bobY);
      ctx.lineTo(playerX + 26, playerY - 20 + bobY);
      ctx.stroke();

      const orbGlow = ctx.createRadialGradient(playerX + 26, playerY - 22 + bobY, 2, playerX + 26, playerY - 22 + bobY, 14);
      orbGlow.addColorStop(0, '#fef08a');
      orbGlow.addColorStop(0.5, '#38bdf8');
      orbGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = orbGlow;
      ctx.beginPath();
      ctx.arc(playerX + 26, playerY - 22 + bobY, 14, 0, Math.PI * 2);
      ctx.fill();

      // Spellcast Beam (If Casting)
      if (combatState.beamActive) {
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 8;
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.moveTo(playerX + 26, playerY - 22 + bobY);
        ctx.lineTo(width * 0.8, horizonY + 15);
        ctx.stroke();
        ctx.shadowBlur = 0; // reset
      }

      // Render Obstacle or Boss (Right side)
      const targetX = width * 0.8;
      const targetY = horizonY + 20;

      if (combatState.obstacleStatus === 'shattered') {
        // Shattered remnants
        ctx.fillStyle = 'rgba(52, 211, 153, 0.4)';
        ctx.font = 'bold 12px monospace';
        ctx.fillText('⚡ SHATTERED (+XP)', targetX - 40, targetY);
      } else if (currentStage.isBoss) {
        // Boss Monster (Dragon / Golem / Titan)
        const bossBob = Math.sin(tick * 0.08) * 8;
        ctx.fillStyle = '#be123c';
        ctx.beginPath();
        ctx.arc(targetX, targetY + bossBob, 32, 0, Math.PI * 2);
        ctx.fill();

        // Boss Eyes & Horns
        ctx.fillStyle = '#fbbf24';
        ctx.fillRect(targetX - 16, targetY - 6 + bossBob, 8, 8);
        ctx.fillRect(targetX + 8, targetY - 6 + bossBob, 8, 8);

        // Dragon Spikes
        ctx.fillStyle = '#881337';
        ctx.beginPath();
        ctx.moveTo(targetX - 25, targetY - 25 + bossBob);
        ctx.lineTo(targetX - 12, targetY - 45 + bossBob);
        ctx.lineTo(targetX, targetY - 25 + bossBob);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(targetX + 5, targetY - 25 + bossBob);
        ctx.lineTo(targetX + 18, targetY - 45 + bossBob);
        ctx.lineTo(targetX + 30, targetY - 25 + bossBob);
        ctx.fill();
      } else {
        // Runic Obstacle Crystal Gate
        const crystalBob = Math.sin(tick * 0.1) * 5;
        const gateGrad = ctx.createLinearGradient(targetX - 25, targetY - 40, targetX + 25, targetY + 40);
        gateGrad.addColorStop(0, '#06b6d4');
        gateGrad.addColorStop(1, '#4f46e5');

        ctx.fillStyle = gateGrad;
        ctx.beginPath();
        ctx.moveTo(targetX, targetY - 45 + crystalBob);
        ctx.lineTo(targetX + 30, targetY + crystalBob);
        ctx.lineTo(targetX, targetY + 45 + crystalBob);
        ctx.lineTo(targetX - 30, targetY + crystalBob);
        ctx.closePath();
        ctx.fill();

        // Runic Symbol in Crystal
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(currentStage.targetWord.slice(0, 4), targetX, targetY + 4 + crystalBob);
        ctx.textAlign = 'start';
      }

      // Render & Update Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // gravity
        p.life++;
        p.alpha = 1 - p.life / p.maxLife;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        if (p.life >= p.maxLife) {
          particlesRef.current.splice(i, 1);
        }
      }

      // Decay screen shake
      if (combatState.shakeIntensity > 0) {
        setCombatState((prev) => ({
          ...prev,
          shakeIntensity: Math.max(0, prev.shakeIntensity - 1)
        }));
      }

      ctx.restore();
      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [combatState.beamActive, combatState.isListening, combatState.obstacleStatus, combatState.shakeIntensity, currentStage]);

  // Execute Combat Spellcast Action
  const handleExecutePronunciation = (isSuccess, customTranscript = null) => {
    // SFX
    if (!isMuted) {
      if (isSuccess) {
        audio.playLaser(true);
        setTimeout(() => audio.playShatter(), 250);
      } else {
        audio.playHurt();
      }
    }

    // Trigger laser beam and particles
    setCombatState((prev) => ({
      ...prev,
      beamActive: true,
      obstacleStatus: 'casting',
      shakeIntensity: isSuccess ? 12 : 5
    }));

    // Particle Burst at Target
    const canvas = canvasRef.current;
    if (canvas) {
      const tx = canvas.width * 0.8;
      const ty = canvas.height * 0.55 + 20;
      spawnParticles(tx, ty, isSuccess ? 45 : 15, isSuccess ? '#38bdf8' : '#f43f5e');
    }

    setTimeout(() => {
      setCombatState((prev) => ({ ...prev, beamActive: false }));

      if (isSuccess) {
        const earnedXp = currentStage.xpReward * (playerState.combo >= 3 ? 1.5 : 1);

        if (currentStage.isBoss && !isMuted) {
          audio.playVictory();
        }

        setCombatState((prev) => ({
          ...prev,
          obstacleStatus: 'shattered',
          bossHp: currentStage.isBoss ? Math.max(0, (prev.bossHp || 100) - 150) : null,
          lastFeedback: {
            success: true,
            title: currentStage.isBoss ? 'BOSS CRITICAL STRIKE! 🔥' : 'CHÉM VỠ RÀO CẢN (+XP)',
            desc: currentStage.correctSimulation.feedback,
            gop: currentStage.correctSimulation.gop
          }
        }));

        setPlayerState((prev) => {
          const nextXp = prev.xp + earnedXp;
          const levelUp = nextXp >= prev.nextLevelXp;
          return {
            ...prev,
            xp: nextXp,
            level: levelUp ? prev.level + 1 : prev.level,
            skillPoints: levelUp ? prev.skillPoints + 1 : prev.skillPoints,
            combo: prev.combo + 1,
            mp: Math.min(prev.maxMp, prev.mp + 15)
          };
        });

        // Chance to trigger Loot Chest
        if (Math.random() > 0.4 || currentStage.isBoss) {
          setTimeout(() => {
            setShowLootChestModal(true);
            setOpenedLootItem(null);
          }, 1200);
        }
      } else {
        setCombatState((prev) => ({
          ...prev,
          obstacleStatus: 'bumped',
          lastFeedback: {
            success: false,
            title: 'HỤT ĐÒN! VẤP PHẢI LỖI ÂM HỌC (-15 HP)',
            desc: currentStage.errorSimulation.fault,
            gop: currentStage.errorSimulation.gop,
            tip: currentStage.tip
          }
        }));

        setPlayerState((prev) => ({
          ...prev,
          hp: Math.max(10, prev.hp - 15),
          combo: 1
        }));
      }
    }, 450);
  };

  // Toggle Live Microphone via Web Speech API
  const handleToggleMic = () => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Trình duyệt của bạn chưa hỗ trợ Web Speech API trực tiếp. Hãy dùng các nút mô phỏng bên dưới!');
      return;
    }

    if (combatState.isListening) {
      setCombatState((prev) => ({ ...prev, isListening: false }));
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => {
      setCombatState((prev) => ({ ...prev, isListening: true, micTranscript: 'Đang lắng nghe giọng bạn...' }));
    };

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript.trim().toUpperCase();
      setCombatState((prev) => ({ ...prev, isListening: false, micTranscript: `Đã nghe: "${transcript}"` }));

      const targetClean = currentStage.targetWord.replace(/[^A-Z]/g, '');
      const spokenClean = transcript.replace(/[^A-Z]/g, '');

      if (spokenClean.includes(targetClean) || targetClean.includes(spokenClean)) {
        handleExecutePronunciation(true, transcript);
      } else {
        handleExecutePronunciation(false, transcript);
      }
    };

    recognition.onerror = () => {
      setCombatState((prev) => ({ ...prev, isListening: false, micTranscript: 'Không nhận được âm thanh.' }));
    };

    recognition.onend = () => {
      setCombatState((prev) => ({ ...prev, isListening: false }));
    };

    recognition.start();
  };

  // Open Mystery Loot Chest Action
  const handleOpenChest = () => {
    if (!isMuted) audio.playLootChime();
    const possibleLoot = [
      { id: 'loot-' + Date.now(), name: 'Trượng Lôi Thần /ks/ Thượng Cổ', type: 'Wand', rarity: 'Legendary', icon: '🪄', stat: '+40% Sát Thương Âm Đuôi' },
      { id: 'loot-' + Date.now(), name: 'Búa Thời Gian Chronos Metronome', type: 'Hammer', rarity: 'Epic', icon: '🔨', stat: '+35% Điểm Nhịp Điệu Stress' },
      { id: 'loot-' + Date.now(), name: 'Áo Choàng Nối Âm Thiên Hà Liaison', type: 'Armor', rarity: 'Legendary', icon: '🥋', stat: '+50% Năng Lượng Phonics Beam' },
      { id: 'loot-' + Date.now(), name: 'Nhẫn Phản Đòn Băng Giá /θ/', type: 'Ring', rarity: 'Rare', icon: '💍', stat: '+20% Kháng Sát Thương Khi Nhầm Cặp Âm' }
    ];
    const item = possibleLoot[Math.floor(Math.random() * possibleLoot.length)];
    setOpenedLootItem(item);
    setPlayerState((prev) => ({
      ...prev,
      inventory: [item, ...prev.inventory]
    }));
  };

  // Upgrade Skill Points
  const handleUpgradeSkill = (skillKey) => {
    if (playerState.skillPoints <= 0) return;
    setPlayerState((prev) => ({
      ...prev,
      skillPoints: prev.skillPoints - 1,
      skills: {
        ...prev.skills,
        [skillKey]: prev.skills[skillKey] + 1
      }
    }));
  };

  return (
    <div className={`flex flex-col gap-4 text-slate-100 transition-all ${isFullScreen ? 'fixed inset-0 z-50 bg-slate-950 p-6 overflow-y-auto' : ''}`}>
      
      {/* 1. TOP RPG STATUS HUD & CONTROLS */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 shadow-2xl backdrop-blur flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Avatar Profile & Stats */}
        <div className="flex items-center gap-3.5 w-full md:w-auto">
          <div className="relative group cursor-pointer" onClick={() => setShowSkillTreeModal(true)}>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 border-2 border-white/60 flex items-center justify-center text-3xl shadow-xl ring-4 ring-indigo-500/20 group-hover:scale-105 transition-transform">
              🧙‍♂️
            </div>
            <div className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded bg-amber-500 text-slate-950 font-black text-[9px] border border-amber-300">
              LV {playerState.level}
            </div>
          </div>

          <div className="flex flex-col gap-1.5 flex-1 md:flex-initial">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-white flex items-center gap-1.5">
                {playerState.name}
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Combo x{playerState.combo} 🔥
                </span>
              </span>
              <button
                onClick={() => setShowSkillTreeModal(true)}
                className="text-[10px] text-amber-300 hover:text-white flex items-center gap-1 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/40 ml-auto md:ml-0 font-bold"
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Cây Kỹ Năng ({playerState.skillPoints} SP)</span>
              </button>
            </div>

            {/* HP & MP Dual Progress Bars */}
            <div className="flex items-center gap-3 text-[10px] font-mono">
              <div className="flex items-center gap-1">
                <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                <div className="w-20 bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
                  <div
                    className="bg-gradient-to-r from-rose-500 to-rose-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${(playerState.hp / playerState.maxHp) * 100}%` }}
                  />
                </div>
                <span className="text-slate-400">{playerState.hp}/{playerState.maxHp}</span>
              </div>

              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-cyan-400 fill-cyan-400" />
                <div className="w-20 bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-blue-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${(playerState.mp / playerState.maxMp) * 100}%` }}
                  />
                </div>
                <span className="text-slate-400">{playerState.mp}/{playerState.maxMp}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Audio Synth Controls & Theater Toggle */}
        <div className="flex items-center gap-2 self-end md:self-center">
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{playerState.xp} XP</span>
            <span className="text-slate-400 text-[10px] ml-1">({playerState.streak} ngày streak)</span>
          </div>

          <button
            onClick={() => setIsBgmOn(!isBgmOn)}
            className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors ${
              isBgmOn
                ? 'bg-indigo-600/30 border-indigo-400 text-indigo-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
            title="Bật/Tắt Nhạc Nền 8-Bit Synth"
          >
            <Music className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-[10px] hidden sm:inline">{isBgmOn ? 'BGM: Bật' : 'BGM: Tắt'}</span>
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-colors"
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-colors"
            title={isFullScreen ? 'Thu nhỏ' : 'Toàn màn hình rạp chiếu'}
          >
            {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4 text-indigo-400" />}
          </button>
        </div>
      </div>

      {/* 2. GAME MODE SWITCHER (Campaign / Boss Rush / Endless / Rhythm) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {[
          { id: 'campaign', label: 'Chiến Dịch 4 Thế Giới', icon: Compass },
          { id: 'boss-rush', label: 'Đấu Trùm Liên Hoàn (Boss Rush)', icon: Skull },
          { id: 'rhythm-lane', label: 'Đường Đua Nhịp Điệu (Guitar Hero)', icon: Sliders },
          { id: 'endless', label: 'Chạy Vô Tận (Endless Runner)', icon: FastForward }
        ].map((mode) => {
          const Icon = mode.icon;
          const isActive = activeGameMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => setActiveGameMode(mode.id)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-400 shadow-md ring-2 ring-indigo-500/20'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
              <span>{mode.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. 4 WORLDS PROGRESSION NAVIGATOR */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        {GAME_WORLDS.map((world, idx) => {
          const isSelected = world.id === selectedWorldId;
          return (
            <button
              key={world.id}
              onClick={() => {
                setSelectedWorldId(world.id);
                setSelectedStageId(world.stages[0].id);
              }}
              className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900 border-indigo-500/80 shadow-lg shadow-indigo-500/10 ring-2 ring-indigo-500/30'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50 opacity-80 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  Thế Giới {idx + 1}
                </span>
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold border ${world.badgeBg}`}>
                  {world.tag}
                </span>
              </div>
              <h4 className="text-xs font-bold text-white line-clamp-1">{world.name.split(':')[1] || world.name}</h4>
              <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{world.theme.split('—')[1] || world.theme}</p>
            </button>
          );
        })}
      </div>

      {/* 4. STAGES SELECTOR RIBBON */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap pl-1">
          Chọn Ải:
        </span>
        {currentWorld.stages.map((stage) => {
          const isCurrent = stage.id === selectedStageId;
          return (
            <button
              key={stage.id}
              onClick={() => setSelectedStageId(stage.id)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
                isCurrent
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-400 shadow-md ring-2 ring-indigo-500/20'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              {stage.isBoss ? (
                <Skull className={`w-3.5 h-3.5 ${isCurrent ? 'text-amber-300 animate-pulse' : 'text-rose-400'}`} />
              ) : (
                <Sparkles className="w-3 h-3 text-indigo-400" />
              )}
              <span>{stage.name}</span>
              <div className="flex items-center text-amber-400 text-[10px]">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-2.5 h-2.5 ${i < stage.stars ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`}
                  />
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* 5. 60 FPS PROCEDURAL CANVAS GRAPHICS ENGINE ARENA */}
      <div className="relative h-80 sm:h-96 w-full rounded-3xl border border-slate-800 overflow-hidden shadow-2xl bg-slate-950 flex flex-col justify-between">
        
        {/* Dynamic HTML5 Canvas Background */}
        <canvas
          ref={canvasRef}
          width={800}
          height={380}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Top Arena HUD Bar */}
        <div className="relative z-10 p-4 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3.5 py-1 rounded-full bg-slate-900/90 text-slate-200 border border-slate-700 font-bold flex items-center gap-1.5 shadow-lg backdrop-blur">
              <Sword className="w-3.5 h-3.5 text-amber-400" />
              <span>Thần chú: <strong className="text-white font-mono text-sm underline decoration-amber-400">{currentStage.targetWord}</strong></span>
              <span className="font-mono text-emerald-400 font-bold ml-1">{currentStage.ipa}</span>
            </span>

            <span className="text-[10px] text-slate-300 bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-800 hidden sm:inline">
              Trọng tâm: <strong className="text-amber-300">{currentStage.keySound}</strong>
            </span>
          </div>

          {currentStage.isBoss && (
            <div className="flex items-center gap-2 bg-rose-950/90 border border-rose-500/60 px-3 py-1 rounded-full text-rose-200 text-xs font-bold animate-pulse shadow-lg">
              <Skull className="w-4 h-4 text-rose-400" />
              <span>{currentStage.bossName}</span>
              <span className="text-[10px] font-mono text-rose-300 bg-rose-900 px-2 py-0.5 rounded-full ml-1">
                HP {combatState.bossHp}/{currentStage.bossHp}
              </span>
            </div>
          )}
        </div>

        {/* Bottom Arena Guide & Lore Pill */}
        <div className="relative z-10 p-3 m-3 rounded-2xl bg-slate-900/85 backdrop-blur border border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-300 gap-2">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-indigo-400 flex-shrink-0" />
            <span><strong>Mẹo khẩu hình:</strong> {currentStage.tip}</span>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto font-mono text-emerald-400 font-bold">
            <span>Phần thưởng: +{currentStage.xpReward} XP</span>
          </div>
        </div>
      </div>

      {/* 6. REAL VOICE CONTROLLER & COMBAT SIMULATION */}
      <div className="p-4 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3.5 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wide">
              Trình Điều Khiển Phép Thuật Giọng Nói:
            </span>
          </div>

          <button
            onClick={() => {
              setCombatState((prev) => ({
                ...prev,
                obstacleStatus: 'approaching',
                lastFeedback: null,
                bossHp: currentStage.isBoss ? currentStage.bossHp : null,
                micTranscript: ''
              }));
            }}
            className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Khởi Động Lại Ải Này</span>
          </button>
        </div>

        {/* Real Microphone Voice Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 p-3 rounded-2xl bg-slate-950 border border-slate-800">
          <button
            onClick={handleToggleMic}
            className={`w-full sm:w-auto px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
              combatState.isListening
                ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse ring-4 ring-rose-500/30 shadow-lg'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg'
            }`}
          >
            {combatState.isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            <span>{combatState.isListening ? 'Đang Thu Âm (Nói Ngay)...' : 'Bật Micro Nói Thật'}</span>
          </button>

          <div className="flex-1 w-full text-xs text-slate-300 flex items-center justify-between px-2">
            <span className="italic text-slate-400">
              {combatState.micTranscript || `Bấm nút và đọc to: "${currentStage.targetWord}"`}
            </span>
            <span className="text-[10px] font-mono text-indigo-400 hidden sm:inline bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-500/30">
              Web Speech API
            </span>
          </div>
        </div>

        {/* Instant Simulation Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => handleExecutePronunciation(true)}
            disabled={combatState.beamActive}
            className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs flex items-center justify-between shadow-lg disabled:opacity-50 transition-all hover:scale-[1.01]"
          >
            <div className="flex items-center gap-2.5">
              <Sword className="w-4 h-4 text-emerald-200" />
              <div className="text-left">
                <span className="block text-xs font-extrabold">Hô Thần Chú Chuẩn: "{currentStage.targetWord}"</span>
                <span className="text-[10px] font-normal text-emerald-100">
                  GOP {currentStage.correctSimulation.gop} ➔ Critical Strike
                </span>
              </div>
            </div>
            <span className="font-mono text-[10px] bg-white/20 px-2.5 py-1 rounded-full font-bold">
              +{currentStage.xpReward} XP
            </span>
          </button>

          <button
            onClick={() => handleExecutePronunciation(false)}
            disabled={combatState.beamActive}
            className="p-3.5 rounded-2xl bg-gradient-to-r from-rose-950 via-slate-900 to-rose-900 hover:from-rose-900 hover:to-slate-800 text-rose-200 border border-rose-700/60 font-bold text-xs flex items-center justify-between disabled:opacity-50 transition-all hover:scale-[1.01]"
          >
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <div className="text-left">
                <span className="block text-xs font-extrabold">Thử Lỗi Người Việt: "{currentStage.errorSimulation.spoken}"</span>
                <span className="text-[10px] font-normal text-rose-400">
                  GOP {currentStage.errorSimulation.gop} ➔ Vấp ngã mất đà
                </span>
              </div>
            </div>
            <span className="font-mono text-[10px] bg-rose-500/20 text-rose-300 px-2.5 py-1 rounded-full font-bold">
              -15 HP
            </span>
          </button>
        </div>

        {/* Combat Result / Feedback Card */}
        {combatState.lastFeedback && (
          <div
            className={`p-3.5 rounded-2xl border text-xs animate-in fade-in duration-200 ${
              combatState.lastFeedback.success
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                : 'bg-rose-500/15 border-rose-500/40 text-rose-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-sm flex items-center gap-1.5">
                {combatState.lastFeedback.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-400" />
                )}
                {combatState.lastFeedback.title}
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-slate-900/80 border border-slate-700">
                Độ chuẩn xác: {combatState.lastFeedback.gop}
              </span>
            </div>
            <p className="text-[11px] leading-relaxed opacity-95">
              {combatState.lastFeedback.desc}
            </p>
            {combatState.lastFeedback.tip && (
              <div className="mt-2 pt-2 border-t border-rose-500/20 text-[10px] text-amber-300 flex items-center gap-1.5">
                <Info className="w-3 h-3 text-amber-400 flex-shrink-0" />
                <span><strong>Chỉ dẫn âm học:</strong> {combatState.lastFeedback.tip}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 7. SKILL TREE MODAL (Cây Kỹ Năng 4 Nhánh) */}
      {showSkillTreeModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-xl w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <Crown className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="text-base font-extrabold text-white">Cây Kỹ Năng Ngữ Âm (Skill Tree)</h3>
                  <span className="text-xs text-amber-300">Điểm kỹ năng khả dụng: {playerState.skillPoints} SP</span>
                </div>
              </div>
              <button
                onClick={() => setShowSkillTreeModal(false)}
                className="text-slate-400 hover:text-white text-sm font-bold bg-slate-800 px-2.5 py-1 rounded-xl"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-emerald-500/30 flex flex-col justify-between">
                <div>
                  <span className="font-bold text-emerald-300 block mb-1">⚡ Bật Âm Đuôi Sấm Sét</span>
                  <p className="text-[11px] text-slate-400">Tăng 25% sát thương khi phát âm chuẩn các âm /s, /ks, /t, /d/.</p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[10px] text-emerald-400 font-bold">Cấp {playerState.skills.endingSoundCrit}/3</span>
                  <button
                    onClick={() => handleUpgradeSkill('endingSoundCrit')}
                    disabled={playerState.skillPoints <= 0}
                    className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] disabled:opacity-40"
                  >
                    + Nâng Cấp
                  </button>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-violet-500/30 flex flex-col justify-between">
                <div>
                  <span className="font-bold text-violet-300 block mb-1">❄️ Thấu Thị Cặp Âm Băng Giá</span>
                  <p className="text-[11px] text-slate-400">Đóng băng đòn đánh của boss thêm 1.5s khi phát âm chuẩn /θ/ vs /t/.</p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[10px] text-violet-400 font-bold">Cấp {playerState.skills.minimalPairIce}/3</span>
                  <button
                    onClick={() => handleUpgradeSkill('minimalPairIce')}
                    disabled={playerState.skillPoints <= 0}
                    className="px-2.5 py-1 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-bold text-[10px] disabled:opacity-40"
                  >
                    + Nâng Cấp
                  </button>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-amber-500/30 flex flex-col justify-between">
                <div>
                  <span className="font-bold text-amber-300 block mb-1">🏔️ Bục Nhảy Nhịp Điệu Titan</span>
                  <p className="text-[11px] text-slate-400">Nhấn đúng trọng âm từ kích hoạt x2 điểm kinh nghiệm (XP Boost).</p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[10px] text-amber-400 font-bold">Cấp {playerState.skills.stressCadence}/3</span>
                  <button
                    onClick={() => handleUpgradeSkill('stressCadence')}
                    disabled={playerState.skillPoints <= 0}
                    className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-[10px] disabled:opacity-40"
                  >
                    + Nâng Cấp
                  </button>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-rose-500/30 flex flex-col justify-between">
                <div>
                  <span className="font-bold text-rose-300 block mb-1">🐉 Hơi Thở Nối Âm Phonics Beam</span>
                  <p className="text-[11px] text-slate-400">Đòn tất sát tiêu diệt tức thì quái vật khi đọc trôi chảy cả câu nối âm.</p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[10px] text-rose-400 font-bold">Cấp {playerState.skills.liaisonFinisher}/3</span>
                  <button
                    onClick={() => handleUpgradeSkill('liaisonFinisher')}
                    disabled={playerState.skillPoints <= 0}
                    className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-[10px] disabled:opacity-40"
                  >
                    + Nâng Cấp
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowSkillTreeModal(false)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. MYSTERY LOOT CHEST MODAL */}
      {showLootChestModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/50 rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center space-y-4">
            <h3 className="text-base font-extrabold text-white flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Rương Cổ Ngữ Phát Âm</span>
            </h3>

            {!openedLootItem ? (
              <div className="py-6 flex flex-col items-center gap-3">
                <div className="text-6xl animate-bounce cursor-pointer" onClick={handleOpenChest}>
                  🎁
                </div>
                <p className="text-xs text-slate-300">
                  Bạn vừa hoàn thành xuất sắc ải! Bấm để mở rương nhận trang bị huyền thoại.
                </p>
                <button
                  onClick={handleOpenChest}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 font-black text-xs shadow-lg hover:scale-105 transition-transform"
                >
                  Mở Rương Ngay!
                </button>
              </div>
            ) : (
              <div className="py-4 space-y-3 animate-in zoom-in-50 duration-300">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-4xl shadow-xl">
                  {openedLootItem.icon}
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                    {openedLootItem.rarity} {openedLootItem.type}
                  </span>
                  <h4 className="text-sm font-extrabold text-white">{openedLootItem.name}</h4>
                  <p className="text-xs text-emerald-400 font-mono mt-1 font-semibold">{openedLootItem.stat}</p>
                </div>
                <button
                  onClick={() => setShowLootChestModal(false)}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md"
                >
                  Trang Bị Vào Túi Đồ
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
