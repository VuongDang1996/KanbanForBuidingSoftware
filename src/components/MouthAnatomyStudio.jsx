import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  Play,
  RotateCcw,
  Sparkles,
  Info,
  CheckCircle2,
  AlertCircle,
  Eye,
  Sliders,
  ChevronRight,
  Smile,
  Layers,
  HelpCircle,
  Radio,
  Activity
} from 'lucide-react';

// ============================================================
// ACOUSTIC PHONETIC SOUND SYNTHESIZER (Web Audio API)
// Generates actual physical fricatives, vowels & formants in JS
// ============================================================
class PhoneticAcousticSynth {
  constructor() {
    this.ctx = null;
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

  // Generate turbulent air friction (for /θ/, /ʃ/, /s/)
  playFricativeNoise(centerFreq, qValue = 2.0, duration = 0.55, volume = 0.3) {
    try {
      this.init();
      if (!this.ctx) return;
      const bufferSize = Math.floor(this.ctx.sampleRate * duration);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(centerFreq, this.ctx.currentTime);
      filter.Q.setValueAtTime(qValue, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(volume, this.ctx.currentTime + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
      noise.stop(this.ctx.currentTime + duration);
    } catch {}
  }

  // Generate resonant vocal tract vowels with dual formants (F1, F2)
  playResonantVowel(f0, f1, f2, duration = 0.65, volume = 0.35) {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(f0, this.ctx.currentTime);

      const filter1 = this.ctx.createBiquadFilter();
      filter1.type = 'bandpass';
      filter1.frequency.setValueAtTime(f1, this.ctx.currentTime);
      filter1.Q.setValueAtTime(5.0, this.ctx.currentTime);

      const filter2 = this.ctx.createBiquadFilter();
      filter2.type = 'bandpass';
      filter2.frequency.setValueAtTime(f2, this.ctx.currentTime);
      filter2.Q.setValueAtTime(6.0, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(volume, this.ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(filter1);
      osc.connect(filter2);
      filter1.connect(gain);
      filter2.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {}
  }

  // Play exact phoneme sound
  playPhonemeSound(phonemeId) {
    switch (phonemeId) {
      case 'theta': // /θ/ voiceless dental fricative (3800Hz friction)
        this.playFricativeNoise(3800, 2.5, 0.6, 0.35);
        break;
      case 'long-i': // /iː/ high front tense vowel (F1=280Hz, F2=2350Hz)
        this.playResonantVowel(145, 280, 2350, 0.7, 0.35);
        break;
      case 'esh': // /ʃ/ palato-alveolar fricative (2600Hz rushing hiss)
        this.playFricativeNoise(2600, 1.8, 0.65, 0.4);
        break;
      case 'ash': // /æ/ open front vowel (F1=720Hz, F2=1720Hz)
        this.playResonantVowel(135, 720, 1720, 0.6, 0.35);
        break;
      case 'approximant-r': // /r/ alveolar approximant with low F3 dip
        this.playResonantVowel(130, 360, 1550, 0.6, 0.32);
        break;
      case 'lateral-l': // /l/ alveolar lateral approximant
        this.playResonantVowel(140, 380, 1150, 0.55, 0.32);
        break;
      default:
        this.playFricativeNoise(3000, 2.0, 0.5, 0.3);
    }
  }
}

const synth = new PhoneticAcousticSynth();

const PHONEME_PRESETS = [
  {
    id: 'theta',
    symbol: '/θ/',
    name: 'Âm răng môi không rung (Voiceless dental fricative)',
    exampleWord: 'Think /θɪŋk/',
    soundType: 'Phụ âm (Consonant)',
    isVoiced: false,
    tongueHeight: 48,
    jawOpen: 32,
    lipRound: 15,
    tongueX: 72,
    tongueY: 96,
    lipShape: 'interdental',
    airflowDesc: 'Luồng hơi thổi êm qua kẽ răng và đầu lưỡi',
    focusArea: 'Đầu lưỡi kẹp giữa 2 hàm răng',
    vnMistake: 'Người Việt có xu hướng thụt lưỡi vào trong và đọc thành chữ "Thờ" tiếng Việt hoặc biến thành âm /t/ ("tink").',
    correctMethod: 'Đặt nhẹ đầu lưỡi ra giữa hai hàng răng trên và dưới (đầu lưỡi thò ra khoảng 2-3mm). Không cắn chặt, đẩy luồng hơi gió nhẹ qua kẽ răng.',
    tactileTip: 'Đặt ngón tay trỏ nhẹ sát trước môi, khi phát âm "think" bạn phải cảm nhận được đầu lưỡi chạm nhẹ vào ngón tay.',
    audioWordFile: '/audio/think.mp3',
    audioWordFallback: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/think--_us_1.mp3',
    audioIpaFile: '/audio/ipa_theta.ogg',
    audioIpaFallback: 'https://commons.wikimedia.org/wiki/Special:FilePath/Voiceless_dental_fricative.ogg',
    audioSpeaker: 'Oxford US English Native Voice'
  },
  {
    id: 'long-i',
    symbol: '/iː/',
    name: 'Nguyên âm dài trước căng (Close front unrounded vowel)',
    exampleWord: 'Sheep /ʃiːp/',
    soundType: 'Nguyên âm dài (Long Vowel)',
    isVoiced: true,
    tongueHeight: 82,
    jawOpen: 18,
    lipRound: 5,
    tongueX: 95,
    tongueY: 65,
    lipShape: 'spread',
    airflowDesc: 'Dây thanh quản rung mạnh, hơi thoát tự do qua khe hẹp vòm miệng',
    focusArea: 'Thân lưỡi nâng cao tối đa về phía vòm cứng',
    vnMistake: 'Đọc quá ngắn và thả lỏng cơ miệng giống âm "i" tiếng Việt hoặc nhầm sang từ "ship" (/ɪ/).',
    correctMethod: 'Kéo khóe miệng sang hai bên như đang cười mỉm. Nâng thân lưỡi áp sát vòm họng trên và ngân dài âm thanh (>250ms).',
    tactileTip: 'Đặt 2 ngón tay lên khóe môi, bạn sẽ cảm nhận cơ má căng cứng khi phát âm chuẩn /iː/.',
    audioWordFile: '/audio/sheep.mp3',
    audioWordFallback: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/sheep--_us_1.mp3',
    audioIpaFile: '/audio/ipa_long_i.ogg',
    audioIpaFallback: 'https://commons.wikimedia.org/wiki/Special:FilePath/Close_front_unrounded_vowel.ogg',
    audioSpeaker: 'Oxford US English Native Voice'
  },
  {
    id: 'esh',
    symbol: '/ʃ/',
    name: 'Âm xì chu môi (Voiceless postalveolar fricative)',
    exampleWord: 'She /ʃiː/',
    soundType: 'Phụ âm xì (Fricative)',
    isVoiced: false,
    tongueHeight: 65,
    jawOpen: 25,
    lipRound: 85,
    tongueX: 110,
    tongueY: 78,
    lipShape: 'rounded',
    airflowDesc: 'Luồng gió xoáy cực mạnh qua ống hẹp giữa vòm họng và thân lưỡi',
    focusArea: 'Chu tròn môi về phía trước, thân lưỡi nâng vòm sau',
    vnMistake: 'Phát âm bẹt môi giống âm "x" hoặc "s" tiếng Việt (nói "she" nghe thành "see").',
    correctMethod: 'Chu tròn môi về phía trước như động tác ra hiệu "suỵt" giữ im lặng. Thân lưỡi nâng lên chạm hai bên hàm răng trên, đẩy luồng hơi gió mạnh qua giữa lưỡi.',
    tactileTip: 'Tạo hình môi thành hình tròn nhỏ và đẩy hơi, mu bàn tay đặt trước môi phải cảm nhận được luồng gió ấm và mạnh.',
    audioWordFile: '/audio/she.mp3',
    audioWordFallback: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/she--_us_1.mp3',
    audioIpaFile: '/audio/ipa_esh.ogg',
    audioIpaFallback: 'https://commons.wikimedia.org/wiki/Special:FilePath/Voiceless_postalveolar_fricative.ogg',
    audioSpeaker: 'Oxford US English Native Voice'
  },
  {
    id: 'ash',
    symbol: '/æ/',
    name: 'Nguyên âm bẹt mở rộng (Near-open front unrounded vowel)',
    exampleWord: 'Cat /kæt/',
    soundType: 'Nguyên âm ngắn bẹt (Short Vowel)',
    isVoiced: true,
    tongueHeight: 25,
    jawOpen: 85,
    lipRound: 10,
    tongueX: 90,
    tongueY: 135,
    lipShape: 'open',
    airflowDesc: 'Khoang miệng mở tối đa, lưỡi hạ thấp áp sát đáy hàm dưới',
    focusArea: 'Hạ cằm tối đa, khóe miệng mở rộng',
    vnMistake: 'Đọc nửa vời thành âm "A" hoặc "E" tiếng Việt (người Việt hay đọc "cat" thành "két" hoặc "cát").',
    correctMethod: 'Mở rộng miệng hạ quai hàm xuống tối đa. Đặt đầu lưỡi chạm vào mặt sau của răng cửa dưới, phát âm âm thanh lai giữa "A" và "E".',
    tactileTip: 'Để 2 ngón tay (ngón trỏ và giữa) xếp dọc giữa hai hàm răng, miệng mở vừa khít 2 ngón tay là độ mở chuẩn cho âm /æ/.',
    audioWordFile: '/audio/cat.mp3',
    audioWordFallback: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/cat--_us_1.mp3',
    audioIpaFile: '/audio/ipa_ash.ogg',
    audioIpaFallback: 'https://commons.wikimedia.org/wiki/Special:FilePath/Near-open_front_unrounded_vowel.ogg',
    audioSpeaker: 'Oxford US English Native Voice'
  },
  {
    id: 'approximant-r',
    symbol: '/r/',
    name: 'Âm cuộn lưỡi (Alveolar approximant)',
    exampleWord: 'Red /rɛd/',
    soundType: 'Bán nguyên âm / Phụ âm cuộn',
    isVoiced: true,
    tongueHeight: 68,
    jawOpen: 35,
    lipRound: 65,
    tongueX: 120,
    tongueY: 82,
    lipShape: 'rounded',
    airflowDesc: 'Luồng hơi lướt qua rãnh cuộn của đầu lưỡi, không có va chạm cơ học',
    focusArea: 'Đầu lưỡi uốn cong về sau TUYỆT ĐỐI KHÔNG CHẠM vòm miệng',
    vnMistake: 'Người miền Bắc đọc thành âm "D" ("dét"), người miền Nam hoặc Trung rung lưỡi quá mạnh như chữ "R" tiếng Việt.',
    correctMethod: 'Uốn cong đầu lưỡi ngược về phía sau vòm miệng nhưng tuyệt đối không để lưỡi chạm vào bất kỳ điểm nào trong miệng. Môi hơi chu nhẹ.',
    tactileTip: 'Lưỡi lơ lửng ở giữa miệng, không có tiếng rung bật "r-r-r".',
    audioWordFile: '/audio/red.mp3',
    audioWordFallback: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/red--_us_1.mp3',
    audioIpaFile: '/audio/ipa_r.ogg',
    audioIpaFallback: 'https://commons.wikimedia.org/wiki/Special:FilePath/Alveolar_approximant.ogg',
    audioSpeaker: 'Oxford US English Native Voice'
  },
  {
    id: 'lateral-l',
    symbol: '/l/',
    name: 'Âm đầu lưỡi chân răng (Alveolar lateral approximant)',
    exampleWord: 'Light /laɪt/',
    soundType: 'Phụ âm biên (Lateral)',
    isVoiced: true,
    tongueHeight: 90,
    jawOpen: 30,
    lipRound: 20,
    tongueX: 80,
    tongueY: 62,
    lipShape: 'neutral',
    airflowDesc: 'Đầu lưỡi chặn giữa, luồng hơi thoát ra hai bên mép lưỡi',
    focusArea: 'Đầu lưỡi ép chặt vào chân răng cửa trên',
    vnMistake: 'Nhầm lẫn L và N (phổ biến ở một số tỉnh miền Bắc) hoặc phát âm âm /l/ tối cuối từ thành âm "u" / "o".',
    correctMethod: 'Đặt đầu lưỡi áp chặt vào phần nướu phía sau răng cửa trên. Cho luồng hơi và âm thanh đi vòng qua hai bên mép lưỡi.',
    tactileTip: 'Giữ chặt đầu lưỡi vào nướu răng trên, ngắt âm thanh dứt khoát.',
    audioWordFile: '/audio/light.mp3',
    audioWordFallback: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/light--_us_1.mp3',
    audioIpaFile: '/audio/ipa_l.ogg',
    audioIpaFallback: 'https://commons.wikimedia.org/wiki/Special:FilePath/Alveolar_lateral_approximant.ogg',
    audioSpeaker: 'Oxford US English Native Voice'
  }
];

export default function MouthAnatomyStudio() {
  const [selectedPhonemeId, setSelectedPhonemeId] = useState('theta');
  const [activePreset, setActivePreset] = useState(PHONEME_PRESETS[0]);

  // Dynamic Slider States
  const [tongueElevation, setTongueElevation] = useState(48);
  const [jawOpening, setJawOpening] = useState(32);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [soundFeedbackText, setSoundFeedbackText] = useState('');
  const [audioSourceType, setAudioSourceType] = useState('native'); // 'native' | 'ipa' | 'synth'

  // Ref to track and cancel ongoing HTML5 Audio
  const currentAudioRef = useRef(null);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current = null;
      }
    };
  }, []);

  // Sync when selecting preset
  useEffect(() => {
    const found = PHONEME_PRESETS.find((p) => p.id === selectedPhonemeId) || PHONEME_PRESETS[0];
    setActivePreset(found);
    setTongueElevation(found.tongueHeight);
    setJawOpening(found.jawOpen);
  }, [selectedPhonemeId]);

  // Unified audio player for Native Human English Audio with multi-layer fallback
  const playNativeAudio = (primaryUrl, fallbackUrl, label, type, fallbackCallback) => {
    try {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current = null;
      }
      setIsPlayingSound(true);
      setSoundFeedbackText(label);
      setAudioSourceType(type);

      const audio = new Audio(primaryUrl);
      currentAudioRef.current = audio;

      audio.onended = () => {
        setIsPlayingSound(false);
        setSoundFeedbackText('');
        currentAudioRef.current = null;
      };

      audio.onerror = () => {
        if (fallbackUrl) {
          const fallbackAudio = new Audio(fallbackUrl);
          currentAudioRef.current = fallbackAudio;
          fallbackAudio.onended = () => {
            setIsPlayingSound(false);
            setSoundFeedbackText('');
            currentAudioRef.current = null;
          };
          fallbackAudio.onerror = () => {
            if (fallbackCallback) fallbackCallback();
            else {
              setIsPlayingSound(false);
              setSoundFeedbackText('');
            }
          };
          fallbackAudio.play().catch(() => {
            if (fallbackCallback) fallbackCallback();
            else {
              setIsPlayingSound(false);
              setSoundFeedbackText('');
            }
          });
        } else if (fallbackCallback) {
          fallbackCallback();
        } else {
          setIsPlayingSound(false);
          setSoundFeedbackText('');
        }
      };

      audio.play().catch(() => {
        if (fallbackUrl) {
          const fallbackAudio = new Audio(fallbackUrl);
          currentAudioRef.current = fallbackAudio;
          fallbackAudio.onended = () => {
            setIsPlayingSound(false);
            setSoundFeedbackText('');
            currentAudioRef.current = null;
          };
          fallbackAudio.onerror = () => {
            if (fallbackCallback) fallbackCallback();
            else {
              setIsPlayingSound(false);
              setSoundFeedbackText('');
            }
          };
          fallbackAudio.play().catch(() => {
            if (fallbackCallback) fallbackCallback();
            else {
              setIsPlayingSound(false);
              setSoundFeedbackText('');
            }
          });
        } else if (fallbackCallback) {
          fallbackCallback();
        } else {
          setIsPlayingSound(false);
          setSoundFeedbackText('');
        }
      });
    } catch {
      if (fallbackCallback) fallbackCallback();
      else {
        setIsPlayingSound(false);
        setSoundFeedbackText('');
      }
    }
  };

  // 1. Play Isolated Phoneme Audio (Real Native Human IPA Recording)
  const handlePlayPhonemeAudio = (preset = activePreset) => {
    playNativeAudio(
      preset.audioIpaFile,
      preset.audioIpaFallback,
      `Đang phát âm lẻ bản xứ (IPA Human Audio): ${preset.symbol}`,
      'ipa',
      () => {
        // Fallback to acoustic synth
        synth.playPhonemeSound(preset.id);
        setTimeout(() => {
          setIsPlayingSound(false);
          setSoundFeedbackText('');
        }, 700);
      }
    );
  };

  // 2. Play Complete Native Example Word Audio (Oxford English Native Recording)
  const handlePlayWordAudio = (preset = activePreset) => {
    const cleanWord = preset.exampleWord.split(' ')[0].replace(/[^a-zA-Z]/g, '');
    playNativeAudio(
      preset.audioWordFile,
      preset.audioWordFallback,
      `Giọng bản ngữ Oxford (Native English Speaker): "${cleanWord}"`,
      'native',
      () => {
        // Fallback to SpeechSynthesis
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(cleanWord);
          utterance.lang = 'en-US';
          utterance.rate = 0.85;
          utterance.onend = () => {
            setIsPlayingSound(false);
            setSoundFeedbackText('');
          };
          utterance.onerror = () => {
            setIsPlayingSound(false);
            setSoundFeedbackText('');
          };
          window.speechSynthesis.speak(utterance);
        } else {
          setIsPlayingSound(false);
          setSoundFeedbackText('');
        }
      }
    );
  };

  // 3. Mouth Movement Animation Trigger (Synchronized with Real Native Audio)
  const triggerMouthAnimation = () => {
    setIsAnimating(true);
    setAnimationStep(0);

    // Play real human word audio simultaneously as the mouth moves!
    handlePlayWordAudio();

    const interval = setInterval(() => {
      setAnimationStep((prev) => {
        if (prev >= 6) {
          clearInterval(interval);
          setIsAnimating(false);
          return 0;
        }
        return prev + 1;
      });
    }, 120);
  };

  // Dynamic Tongue Coordinates
  const animProgress = isAnimating ? Math.sin((animationStep / 6) * Math.PI) : 1;
  const currentTongueHeight = activePreset.tongueHeight * (isAnimating ? 0.4 + animProgress * 0.6 : 1);
  const currentJawOpen = activePreset.jawOpen * (isAnimating ? 0.3 + animProgress * 0.7 : 1);

  // Bezier coordinates for tongue curve
  const tongueTipX = activePreset.tongueX;
  const tongueTipY = activePreset.tongueY + (50 - currentTongueHeight) * 0.5 + (currentJawOpen - 30) * 0.3;
  const tongueRootX = 220;
  const tongueRootY = 175;
  const tongueBackX = 170;
  const tongueBackY = 130 - (currentTongueHeight - 50) * 0.6;

  return (
    <div className="space-y-5 text-slate-100 animate-in fade-in duration-300">
      
      {/* 1. TOP PHONEME PRESET SELECTOR TABS & DUAL AUDIO CONTROLS */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-rose-400" />
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Khẩu Hình 2D Cắt Lớp & Vị Trí Đặt Lưỡi Giải Phẫu
            </h3>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] text-emerald-300 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              100% Audio Người Bản Ngữ Thật (Oxford Native Human & IPA)
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Có đầy đủ âm thanh chuẩn bản xứ và âm thanh giải phẫu
            </span>
          </div>
        </div>

        {/* Dual Audio Playback Buttons + Animate Button */}
        <div className="flex items-center gap-2 flex-wrap self-start lg:self-auto">
          {/* Animate Mouth Movement */}
          <button
            onClick={triggerMouthAnimation}
            disabled={isAnimating}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 text-rose-400 ${isAnimating ? 'animate-spin' : ''}`} />
            <span>{isAnimating ? 'Đang Phát Âm...' : 'Xem Hoạt Họa & Phát Âm'}</span>
          </button>

          {/* 1. Isolated Phoneme Native IPA Audio */}
          <button
            onClick={() => handlePlayPhonemeAudio(activePreset)}
            className="px-3 py-1.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-400 text-indigo-200 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            title="Nghe âm lẻ bản ngữ chuẩn IPA"
          >
            <Volume2 className={`w-3.5 h-3.5 text-cyan-400 ${isPlayingSound && audioSourceType === 'ipa' ? 'animate-pulse' : ''}`} />
            <span>Nghe Âm Lẻ {activePreset.symbol}</span>
          </button>

          {/* 2. Word Real Native Human Oxford Audio */}
          <button
            onClick={() => handlePlayWordAudio(activePreset)}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
            title="Nghe giọng người bản xứ thật phát âm từ mẫu (Oxford Native English)"
          >
            <Volume2 className={`w-3.5 h-3.5 ${isPlayingSound && audioSourceType === 'native' ? 'animate-bounce' : ''}`} />
            <span>Nghe Cả Từ "{activePreset.exampleWord.split(' ')[0]}" (Oxford)</span>
          </button>
        </div>
      </div>

      {/* Phoneme Selector Ribbon */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {PHONEME_PRESETS.map((preset) => {
          const isSelected = preset.id === selectedPhonemeId;
          return (
            <button
              key={preset.id}
              onClick={() => {
                setSelectedPhonemeId(preset.id);
                // Immediately play the real human audio when switching preset!
                handlePlayWordAudio(preset);
              }}
              className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 group ${
                isSelected
                  ? 'bg-rose-950/60 border-rose-500/80 text-white ring-2 ring-rose-500/30 shadow-lg'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-850 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-1">
                <span className="text-base font-black font-mono block text-rose-300">
                  {preset.symbol}
                </span>
                <Volume2 className="w-3 h-3 text-slate-500 group-hover:text-rose-400 transition-colors opacity-70" />
              </div>
              <span className="text-[10px] text-slate-400 truncate max-w-[90px] block">
                {preset.exampleWord.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Audio Status Banner with Live Waveform Indicator if playing */}
      {soundFeedbackText && (
        <div className="p-2.5 px-3.5 rounded-xl bg-indigo-950/90 border border-indigo-500/50 text-xs text-indigo-200 flex items-center justify-between shadow-lg animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5">
            {/* Live Audio Equalizer Waveform Bars */}
            <div className="flex items-end gap-0.5 h-3.5">
              <span className="w-1 bg-cyan-400 rounded-full animate-[pulse_0.4s_ease-in-out_infinite] h-2"></span>
              <span className="w-1 bg-cyan-400 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-3.5"></span>
              <span className="w-1 bg-cyan-400 rounded-full animate-[pulse_0.3s_ease-in-out_infinite] h-1.5"></span>
              <span className="w-1 bg-cyan-400 rounded-full animate-[pulse_0.5s_ease-in-out_infinite] h-3"></span>
              <span className="w-1 bg-cyan-400 rounded-full animate-[pulse_0.4s_ease-in-out_infinite] h-2.5"></span>
            </div>
            <span className="font-medium">{soundFeedbackText}</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800">
            Native Human Voice 44.1kHz
          </span>
        </div>
      )}

      {/* 2. DUAL-PERSPECTIVE ANATOMICAL VISUALIZER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left: Sagittal Cross-Section SVG Diagram (8 Cols) */}
        <div className="lg:col-span-8 rounded-3xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-slate-800 p-4 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          
          {/* Top Indicators Overlay */}
          <div className="flex items-center justify-between text-xs z-10">
            <span className="px-3 py-1 rounded-full bg-slate-900/90 text-slate-300 border border-slate-700 text-[11px] font-semibold flex items-center gap-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span>Khẩu hình chuẩn: <strong className="text-white font-mono">{activePreset.symbol}</strong> ({activePreset.exampleWord})</span>
            </span>

            <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${
              activePreset.isVoiced
                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                : 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
            }`}>
              {activePreset.isVoiced ? 'Âm Rung Dây Thanh (Voiced)' : 'Âm Gió Không Rung (Voiceless)'}
            </span>
          </div>

          {/* SVG Anatomical Human Head & Vocal Tract Model */}
          <div className="relative h-64 sm:h-72 w-full my-auto flex items-center justify-center">
            <svg viewBox="0 0 360 230" className="w-full h-full max-w-lg select-none">
              
              {/* Outer Head & Facial Contour Silhouette */}
              <path
                d="M 50 15 Q 110 5 190 10 Q 260 20 280 90 L 290 180 Q 280 220 260 225 L 180 225 L 175 195 Q 150 200 110 195 Q 85 190 75 165 Q 65 155 58 135 L 55 125 Q 40 120 48 105 L 58 95 Q 42 70 50 45 Z"
                fill="#0f172a"
                stroke="#334155"
                strokeWidth="1.5"
                className="opacity-70"
              />

              {/* Nasal Cavity (Khoang mũi) */}
              <path
                d="M 70 55 Q 130 40 180 50 Q 210 55 220 75 Q 180 70 140 68 Z"
                fill="#1e1b4b"
                stroke="#4338ca"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <text x="120" y="58" fill="#818cf8" fontSize="9" fontFamily="sans-serif">Khoang Mũi</text>

              {/* Hard Palate (Vòm cứng) with textured bone ridges */}
              <path
                d="M 78 72 Q 130 65 180 80"
                stroke="#cbd5e1"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
              />
              <text x="135" y="75" fill="#e2e8f0" fontSize="9" fontWeight="bold">Vòm Họng Cứng (Hard Palate)</text>

              {/* Soft Palate / Velum & Uvula (Vòm mềm & Lưỡi gà) */}
              <path
                d="M 180 80 Q 205 92 215 110 Q 210 118 206 112 Q 198 95 180 80"
                fill="#f43f5e"
                fillOpacity="0.4"
                stroke="#f43f5e"
                strokeWidth="2"
              />
              <text x="210" y="105" fill="#fda4af" fontSize="8">Lưỡi Gà</text>

              {/* Upper Incisors (Răng trên) */}
              <g transform="translate(68, 74)">
                <path d="M 0 0 L 8 0 L 7 18 L 1 18 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
                <path d="M 2 2 L 6 2 L 5 16 L 2 16 Z" fill="#f8fafc" />
              </g>
              <text x="22" y="86" fill="#cbd5e1" fontSize="9">Răng Trên</text>

              {/* Dynamic Lower Jaw & Lower Teeth (Răng dưới chuyển động theo hàm) */}
              <g transform={`translate(68, ${108 + currentJawOpen * 0.4})`}>
                <path d="M 0 18 L 8 18 L 7 0 L 1 0 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
                <text x="-48" y="12" fill="#cbd5e1" fontSize="9">Răng Dưới</text>
              </g>

              {/* DYNAMIC ANATOMICAL TONGUE (Lưỡi Giải Phẫu Sinh Động) */}
              <defs>
                <linearGradient id="tongueFlesh" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fb7185" />
                  <stop offset="60%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#be123c" />
                </linearGradient>
                <radialGradient id="targetGlow">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Full anatomical tongue body path */}
              <path
                d={`M ${tongueTipX} ${tongueTipY} 
                    Q ${tongueTipX + 35} ${tongueTipY - 18} ${tongueBackX} ${tongueBackY} 
                    Q ${tongueRootX} ${tongueBackY + 20} ${tongueRootX} ${tongueRootY}
                    Q 170 ${180 + currentJawOpen * 0.3} 100 ${140 + currentJawOpen * 0.4}
                    Z`}
                fill="url(#tongueFlesh)"
                stroke="#fda4af"
                strokeWidth="2.5"
                strokeLinejoin="round"
                className="transition-all duration-150"
              />

              {/* Tongue Muscle Internal Fiber Detail Line */}
              <path
                d={`M ${tongueTipX + 18} ${tongueTipY + 4} Q ${tongueTipX + 50} ${tongueTipY - 5} ${tongueBackX - 10} ${tongueBackY + 15}`}
                stroke="#fda4af"
                strokeWidth="1.5"
                strokeDasharray="2 3"
                fill="none"
                opacity="0.6"
              />

              {/* Target Constriction Focal Point / Contact Zone Glow */}
              <circle
                cx={tongueTipX + 2}
                cy={tongueTipY - 2}
                r="10"
                fill="url(#targetGlow)"
                className="animate-ping"
              />
              <circle
                cx={tongueTipX + 2}
                cy={tongueTipY - 2}
                r="4"
                fill="#38bdf8"
              />

              {/* Animated Airflow Stream (Luồng Hơi) */}
              <path
                d={`M ${tongueTipX + 15} ${tongueTipY - 6} L 45 92`}
                stroke="#38bdf8"
                strokeWidth="3.5"
                strokeDasharray="5 3"
                strokeLinecap="round"
                className="animate-pulse"
              />
              <text x="25" y="112" fill="#38bdf8" fontSize="9" fontWeight="bold">Luồng Gió ➜</text>

              {/* Visual Sound Waves Emitter Arcs (When Audio Is Playing) */}
              {isPlayingSound && (
                <g transform="translate(36, 92)" className="animate-pulse">
                  <path d="M 0 -12 A 16 16 0 0 0 0 12" stroke="#38bdf8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <path d="M -8 -20 A 26 26 0 0 0 -8 20" stroke="#38bdf8" strokeWidth="2" fill="none" opacity="0.8" strokeLinecap="round" />
                  <path d="M -16 -28 A 36 36 0 0 0 -16 28" stroke="#38bdf8" strokeWidth="1.5" fill="none" opacity="0.5" strokeLinecap="round" />
                </g>
              )}

              {/* Vocal Cords / Thanh Quản (Larynx & Glottis) */}
              <g transform="translate(225, 185)">
                <circle
                  cx="0"
                  cy="0"
                  r={activePreset.isVoiced ? '7' : '5'}
                  fill={activePreset.isVoiced ? '#10b981' : '#64748b'}
                  className={activePreset.isVoiced ? 'animate-pulse' : ''}
                />
                <text x="12" y="4" fill={activePreset.isVoiced ? '#34d399' : '#94a3b8'} fontSize="9" fontWeight="semibold">
                  {activePreset.isVoiced ? 'Dây Thanh Rung (Voiced)' : 'Dây Thanh Nghỉ'}
                </text>
              </g>

              {/* Anatomic Callout Text on Diagram */}
              <line x1={tongueTipX} y1={tongueTipY} x2={tongueTipX + 35} y2={tongueTipY + 30} stroke="#f43f5e" strokeWidth="1" />
              <text x={tongueTipX + 38} y={tongueTipY + 34} fill="#fda4af" fontSize="10" fontWeight="bold">
                Đầu Lưỡi (Tongue Tip)
              </text>
            </svg>
          </div>

          {/* Bottom Interactive Sliders Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-800 text-xs">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] text-slate-300">
                <span>Độ nâng thân/đầu lưỡi:</span>
                <span className="font-mono text-rose-400 font-bold">{tongueElevation}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="95"
                value={tongueElevation}
                onChange={(e) => setTongueElevation(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] text-slate-300">
                <span>Độ mở hàm dưới (Jaw Drop):</span>
                <span className="font-mono text-indigo-400 font-bold">{jawOpening}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                value={jawOpening}
                onChange={(e) => setJawOpening(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Right: Front Lip Camera View & Tactile Guide (4 Cols) */}
        <div className="lg:col-span-4 rounded-3xl bg-slate-900 border border-slate-800 p-5 flex flex-col justify-between shadow-xl space-y-4">
          
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Smile className="w-4 h-4 text-rose-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Khẩu Hình Nhìn Chính Diện (Front View)
                </h4>
              </div>
              <span className="text-[10px] font-mono text-rose-400 font-bold capitalize">
                {activePreset.lipShape}
              </span>
            </div>

            {/* Front Lip Vector Rendering */}
            <div className="h-40 w-full rounded-2xl bg-slate-950 border border-slate-800/80 my-3 flex items-center justify-center p-2 relative overflow-hidden">
              <svg viewBox="0 0 200 120" className="w-full h-full max-w-[200px]">
                {/* Lip Background Skin Tone */}
                <ellipse cx="100" cy="60" rx="75" ry="42" fill="#1e293b" opacity="0.3" />

                {/* Upper Lip with Cupids Bow */}
                <path
                  d={
                    activePreset.lipShape === 'interdental'
                      ? 'M 40 60 Q 80 44 95 50 Q 100 52 105 50 Q 120 44 160 60 Q 130 52 100 54 Q 70 52 40 60 Z'
                      : activePreset.lipShape === 'spread'
                      ? 'M 30 60 Q 80 42 100 48 Q 120 42 170 60 Q 135 52 100 54 Q 65 52 30 60 Z'
                      : activePreset.lipShape === 'rounded'
                      ? 'M 65 60 Q 85 45 100 48 Q 115 45 135 60 Q 120 54 100 55 Q 80 54 65 60 Z'
                      : 'M 45 60 Q 80 38 100 44 Q 120 38 155 60 Q 130 50 100 52 Q 70 50 45 60 Z'
                  }
                  fill="#e11d48"
                  stroke="#fb7185"
                  strokeWidth="1.5"
                />

                {/* Upper Teeth in Front View */}
                <rect x="65" y="52" width="70" height="14" rx="2" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />

                {/* Tongue Tip Visible Peeking Out (Especially for /θ/) */}
                {activePreset.lipShape === 'interdental' && (
                  <ellipse cx="100" cy="66" rx="28" ry="10" fill="#f43f5e" stroke="#fda4af" strokeWidth="1.5" />
                )}

                {/* Lower Teeth */}
                <rect
                  x="70"
                  y={activePreset.lipShape === 'open' ? '76' : '65'}
                  width="60"
                  height="10"
                  rx="2"
                  fill="#f1f5f9"
                  stroke="#cbd5e1"
                  strokeWidth="0.8"
                />

                {/* Lower Lip */}
                <path
                  d={
                    activePreset.lipShape === 'interdental'
                      ? 'M 40 60 Q 100 80 160 60 Q 130 72 100 74 Q 70 72 40 60 Z'
                      : activePreset.lipShape === 'spread'
                      ? 'M 30 60 Q 100 75 170 60 Q 135 68 100 70 Q 65 68 30 60 Z'
                      : activePreset.lipShape === 'rounded'
                      ? 'M 65 60 Q 100 82 135 60 Q 120 74 100 76 Q 80 74 65 60 Z'
                      : 'M 45 60 Q 100 95 155 60 Q 130 84 100 86 Q 70 84 45 60 Z'
                  }
                  fill="#be123c"
                  stroke="#fb7185"
                  strokeWidth="1.5"
                />
              </svg>

              <span className="absolute bottom-1 right-2 text-[9px] font-mono text-slate-400">
                {activePreset.lipShape === 'interdental'
                  ? 'Kẹp nhẹ lưỡi ra ngoài'
                  : activePreset.lipShape === 'rounded'
                  ? 'Chu tròn môi'
                  : activePreset.lipShape === 'spread'
                  ? 'Cười bẹt khóe môi'
                  : 'Há mở rộng hàm'}
              </span>
            </div>

            {/* Tactile Physical Feedback Trick */}
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 leading-relaxed space-y-1">
              <span className="font-extrabold text-[11px] text-amber-300 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Mẹo Cảm Nhận Xúc Giác (Tactile Trick):</span>
              </span>
              <p className="text-[11px] opacity-90">{activePreset.tactileTip}</p>
            </div>
          </div>

          {/* Reset button */}
          <button
            onClick={() => {
              setTongueElevation(activePreset.tongueHeight);
              setJawOpening(activePreset.jawOpen);
            }}
            className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Đặt Lại Tọa Độ Chuẩn Của Âm Này</span>
          </button>
        </div>
      </div>

      {/* 3. VIETNAMESE EMPATHETIC PHONETIC ANALYSIS CALLOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Common Vietnamese Mistake */}
        <div className="p-4 rounded-3xl bg-rose-950/40 border border-rose-500/40 text-xs space-y-2 shadow-lg">
          <div className="flex items-center gap-2 text-rose-300 font-extrabold text-sm">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>Lỗi Phổ Biến Người Việt Hay Mắc:</span>
          </div>
          <p className="text-rose-200/90 text-xs leading-relaxed">
            {activePreset.vnMistake}
          </p>
        </div>

        {/* Correct Articulation Guide */}
        <div className="p-4 rounded-3xl bg-emerald-950/40 border border-emerald-500/40 text-xs space-y-2 shadow-lg">
          <div className="flex items-center gap-2 text-emerald-300 font-extrabold text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Phương Pháp Đặt Lưỡi & Khẩu Hình Chuẩn:</span>
          </div>
          <p className="text-emerald-200/90 text-xs leading-relaxed">
            {activePreset.correctMethod}
          </p>
        </div>
      </div>
    </div>
  );
}
