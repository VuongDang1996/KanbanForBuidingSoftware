import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const PHONEMES_DATA = {
  'theta': {
    symbol: '/θ/',
    name: 'Interdental Voiceless Fricative',
    exampleWord: 'think',
    ipaWord: '/θɪŋk/',
    isVoiced: false,
    tongueContact: 'Đầu lưỡi kẹp nhẹ giữa hai hàm răng (thò ra 2 - 3mm)',
    airflow: 'Luồng khí xát liên tục qua khe hở giữa răng cửa trên và bề mặt lưỡi',
    jawOpening: 'Hở nhẹ khoảng 3mm, môi mở thư giãn tự nhiên',
    larynxStatus: 'Dây thanh âm KHÔNG RUNG (Voiceless)',
    vnComparison: {
      wrongHabit: 'Người Việt thường đọc thành âm "th" tiếng Việt (thờ-in-thin).',
      whyWrong: 'Âm "th" tiếng Việt là âm răng-lợi, đầu lưỡi thụt vào trong và bật hơi dứt khoát.',
      howToFix: 'Bắt buộc phải cắn nhẹ đầu lưỡi giữa 2 hàm răng và phì luồng hơi đều đặn, không ngắt quãng!'
    },
    stressExample: {
      word: 'METHOD',
      breakdown: [
        { text: 'ME', stressed: true, ipa: '/ˈme/' },
        { text: 'thod', stressed: false, ipa: '/θəd/' }
      ],
      rule: 'Nhấn mạnh âm tiết đầu ME, hạ giọng lướt nhẹ âm thod.'
    }
  },
  'eth': {
    symbol: '/ð/',
    name: 'Interdental Voiced Fricative',
    exampleWord: 'this',
    ipaWord: '/ðɪs/',
    isVoiced: true,
    tongueContact: 'Đầu lưỡi kẹp nhẹ giữa hai hàm răng tương tự /θ/',
    airflow: 'Luồng khí kết hợp độ rung dây thanh âm từ thanh quản',
    jawOpening: 'Hở nhẹ khoảng 3mm, môi mở tự nhiên',
    larynxStatus: 'Dây thanh âm RUNG MẠNH (Voiced)',
    vnComparison: {
      wrongHabit: 'Người Việt thường đọc thành âm "đ" hoặc "d" tiếng Việt (đít / dít).',
      whyWrong: 'Âm "đ" tiếng Việt chặn đứng dòng khí hoàn toàn thay vì tạo âm xát liên tục.',
      howToFix: 'Vừa kẹp lưỡi vừa phát ra âm "ừm" rung cổ họng, cảm nhận độ tê ở đầu lưỡi!'
    },
    stressExample: {
      word: 'TO-GE-THER',
      breakdown: [
        { text: 'to', stressed: false, ipa: '/tə/' },
        { text: 'GE', stressed: true, ipa: '/ˈɡe/' },
        { text: 'ther', stressed: false, ipa: '/ðər/' }
      ],
      rule: 'Trọng âm rơi vào âm 2 GE, âm ther đọc nhẹ và kẹp lưỡi.'
    }
  },
  'esh': {
    symbol: '/ʃ/',
    name: 'Palato-Alveolar Voiceless Fricative',
    exampleWord: 'she',
    ipaWord: '/ʃiː/',
    isVoiced: false,
    tongueContact: 'Mặt lưỡi nâng cao áp sát vòm miệng cứng, hai mép lưỡi chạm răng hàm',
    airflow: 'Luồng khí mạnh bị nén qua rãnh giữa thân lưỡi và vòm họng',
    jawOpening: 'Chu môi tròn hình phễu rõ rệt về phía trước',
    larynxStatus: 'Dây thanh âm KHÔNG RUNG (Voiceless)',
    vnComparison: {
      wrongHabit: 'Người Việt (đặc biệt Miền Bắc) phát âm lẫn lộn với /s/ (đọc "she" giống "see").',
      whyWrong: 'Âm /s/ môi bẹt phẳng, âm /ʃ/ tiếng Anh bắt buộc phải chu môi tròn.',
      howToFix: 'Chu môi tròn như đang ra hiệu "suỵt" giữ yên lặng, đẩy luồng khí xát dày.'
    },
    stressExample: {
      word: 'CON-DI-TION',
      breakdown: [
        { text: 'con', stressed: false, ipa: '/kən/' },
        { text: 'DI', stressed: true, ipa: '/ˈdɪ/' },
        { text: 'tion', stressed: false, ipa: '/ʃn/' }
      ],
      rule: 'Đuôi -tion luôn đứng sau trọng âm chính: con-DI-tion.'
    }
  },
  'ezh': {
    symbol: '/ʒ/',
    name: 'Palato-Alveolar Voiced Fricative',
    exampleWord: 'measure',
    ipaWord: '/ˈmeʒ.ər/',
    isVoiced: true,
    tongueContact: 'Khẩu hình giống hệt /ʃ/ nhưng rung dây thanh âm',
    airflow: 'Khí xát thoát qua rãnh vòm miệng kết hợp sóng âm thanh quản',
    jawOpening: 'Chu tròn môi về phía trước',
    larynxStatus: 'Dây thanh âm RUNG RÕ RỆT (Voiced)',
    vnComparison: {
      wrongHabit: 'Đọc thành âm "d" tiếng Việt hoặc nuốt âm thành /z/.',
      whyWrong: 'Tiếng Việt không có âm xát vòm miệng có rung như /ʒ/.',
      howToFix: 'Giữ khẩu hình chu môi của /ʃ/ và phát âm "rơ" có độ rung trong cổ họng.'
    },
    stressExample: {
      word: 'DE-CI-SION',
      breakdown: [
        { text: 'de', stressed: false, ipa: '/dɪ/' },
        { text: 'CI', stressed: true, ipa: '/ˈsɪ/' },
        { text: 'sion', stressed: false, ipa: '/ʒn/' }
      ],
      rule: 'Trọng âm rơi vào CI: de-CI-sion.'
    }
  },
  'ks': {
    symbol: '/ks/',
    name: 'Voiceless Velar-Alveolar Affricate Coda',
    exampleWord: 'six',
    ipaWord: '/sɪks/',
    isVoiced: false,
    tongueContact: 'Gốc lưỡi chạm ngạc mềm tạo âm /k/, sau đó trượt nhanh sang đầu lưỡi áp răng cửa tạo /s/',
    airflow: 'Bật nổ âm tắc /k/ tiếp nối ngay lập tức bằng luồng khí xát /s/ không ngắt quãng',
    jawOpening: 'Khép nhẹ hàm, mép môi bẹt sang hai bên',
    larynxStatus: 'Voiceless - Cả hai âm đều không rung thanh quản',
    vnComparison: {
      wrongHabit: 'Rụng hoàn toàn âm đuôi, người Việt chỉ nói "xích" hoặc "sít".',
      whyWrong: 'Tiếng Việt có các âm khép không bật hơi (-k, -t), tiếng Anh bắt buộc phải giải phóng âm.',
      howToFix: 'Đọc chậm: /sɪ/ + /k/ + /s/ -> Tăng tốc độ nối liền thành /sɪks/!'
    },
    stressExample: {
      word: 'EX-PE-RI-ENCE',
      breakdown: [
        { text: 'ex', stressed: false, ipa: '/ɪk/' },
        { text: 'SPE', stressed: true, ipa: '/ˈspɪər/' },
        { text: 'i', stressed: false, ipa: '/i/' },
        { text: 'ence', stressed: false, ipa: '/əns/' }
      ],
      rule: 'Âm ex đọc nhẹ, bật mạnh trọng âm vào SPE: ex-SPE-ri-ence.'
    }
  }
};

export default function MouthAnatomyView() {
  const [selectedPhonemeKey, setSelectedPhonemeKey] = useState('theta');
  const [activeTabSub, setActiveTabSub] = useState('anatomy'); // 'anatomy' | 'stress'
  const data = PHONEMES_DATA[selectedPhonemeKey];

  const playSound = (word) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 py-4 animate-fade-in">
      {/* Top Header & Phoneme Selector */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-slate-200/80 p-4 rounded-2xl shadow-[0_2px_8px_rgba(15,23,42,0.03)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-primary border border-rose-100 flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-2xl">science</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-primary uppercase">
                Phòng Giải Phẫu Khẩu Hình 2D (Sagittal Plane)
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-mono font-bold text-slate-600">
                VN-105 & PRON-201
              </span>
            </div>
            <h2 className="text-lg font-black text-slate-900 leading-tight">
              Mô Hình Cơ Sinh Học Miệng & Trọng Âm Tiếng Anh Cho Người Việt
            </h2>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTabSub('anatomy')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTabSub === 'anatomy' ? 'bg-white text-primary shadow-xs' : 'text-slate-600'
            }`}
          >
            Giải Phẫu Khẩu Hình
          </button>
          <button
            onClick={() => setActiveTabSub('stress')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTabSub === 'stress' ? 'bg-white text-secondary shadow-xs' : 'text-slate-600'
            }`}
          >
            Định Vị Trọng Âm (ELSA-202)
          </button>
        </div>
      </div>

      {/* Phoneme Quick Picker Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {Object.entries(PHONEMES_DATA).map(([key, item]) => {
          const isActive = selectedPhonemeKey === key;
          return (
            <button
              key={key}
              onClick={() => setSelectedPhonemeKey(key)}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-primary text-white shadow-sm scale-105'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
              }`}
            >
              <span>{item.symbol}</span>
              <span className="opacity-80 font-sans font-normal text-[11px]">{item.exampleWord}</span>
            </button>
          );
        })}
      </div>

      {activeTabSub === 'stress' ? (
        /* Syllable Stress & Word Capitalization Mode (ELSA-202) */
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col gap-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="font-mono text-xs font-bold text-secondary uppercase">
              ELSA-202 • Syllable Stress & Word Emphasis Evaluator
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-1">
              Quy Luật Trọng Âm: Phân Tách Âm Tiết Nhấn Mạnh
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Người Việt quen dùng tiếng đơn âm tiết có thanh điệu nên thường nói tiếng Anh bằng phẳng như robot. Trọng âm yêu cầu phát âm dài hơn, cao độ hơn và to hơn vào âm tiết nhấn.
            </p>
          </div>

          {/* Stressed Word Visual Card */}
          <div className="p-8 rounded-2xl bg-gradient-to-r from-rose-50 via-sky-50 to-indigo-50 border border-slate-200 flex flex-col items-center justify-center text-center gap-6">
            <span className="font-mono text-xs uppercase font-bold text-slate-500 tracking-wider">
              Mô Hình Nhấn Âm Tiết Trực Quan
            </span>

            <div className="flex items-center justify-center gap-3 flex-wrap">
              {data.stressExample.breakdown.map((syllable, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col items-center p-4 rounded-2xl transition-transform ${
                    syllable.stressed
                      ? 'bg-rose-600 text-white shadow-lg scale-110 ring-4 ring-rose-200'
                      : 'bg-white text-slate-700 border border-slate-200 opacity-75'
                  }`}
                >
                  <span className="font-mono text-2xl font-black">{syllable.text}</span>
                  <span className="font-mono text-xs mt-1 opacity-90">{syllable.ipa}</span>
                  <span className="text-[10px] font-mono mt-1 uppercase font-bold">
                    {syllable.stressed ? '🔥 Nhấn Trọng Âm' : 'Lướt nhẹ'}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-white/90 backdrop-blur-xs rounded-xl border border-slate-200 max-w-lg text-xs text-slate-700 leading-relaxed font-medium">
              💡 <strong>Quy tắc phản xạ:</strong> {data.stressExample.rule}
            </div>

            <button
              onClick={() => playSound(data.stressExample.word)}
              className="px-6 py-3 rounded-full bg-secondary hover:bg-sky-600 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-transform hover:scale-105"
            >
              <span className="material-symbols-outlined text-lg">volume_up</span>
              <span>Nghe Phát Âm Từ: {data.stressExample.word}</span>
            </button>
          </div>
        </div>
      ) : (
        /* Full 2D Anatomical Cross-Section & L1 Comparative Matrix (VN-105, PRON-201) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left 7 Cols: Sagittal 2D Vocal Tract Visual Canvas */}
          <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Thiết Diện Cắt Dọc Miệng (Sagittal Vocal Tract)
                </h3>
                <span className="font-mono text-xs text-slate-500">
                  Âm đang chọn: <strong className="text-primary font-bold">{data.symbol}</strong> ({data.name})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    data.isVoiced ? 'bg-secondary animate-pulse' : 'bg-slate-400'
                  }`}
                />
                <span className="font-mono text-xs text-slate-700 font-semibold">
                  {data.isVoiced ? 'Voiced (Thanh quản rung)' : 'Voiceless (Không rung)'}
                </span>
              </div>
            </div>

            {/* SVG Anatomical Diagram */}
            <div className="relative w-full h-80 bg-slate-50 border border-slate-200/80 rounded-2xl overflow-hidden flex items-center justify-center p-2">
              <svg className="w-full h-full" viewBox="0 0 700 450">
                <defs>
                  <linearGradient id="tongueMuscle" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fb7185" />
                    <stop offset="50%" stopColor="#f43f5e" />
                    <stop offset="100%" stopColor="#be123c" />
                  </linearGradient>
                  <linearGradient id="airflowCyan" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.1" />
                    <stop offset="80%" stopColor="#0284c7" stopOpacity="0.8" />
                  </linearGradient>
                </defs>

                {/* Face Silhouette */}
                <path
                  d="M 100 40 C 240 15, 450 20, 520 80 C 580 130, 600 200, 600 230 C 590 238, 560 242, 550 242 C 545 255, 540 266, 540 272 C 548 276, 575 284, 578 296 C 580 316, 530 360, 490 380 L 120 440 Z"
                  fill="#e2e8f0"
                  opacity="0.5"
                  stroke="#cbd5e1"
                  strokeWidth="1.5"
                />

                {/* Nasal Cavity */}
                <path
                  d="M 300 100 C 340 60, 420 60, 480 110 C 490 120, 510 150, 510 170 C 490 180, 450 180, 410 160 Z"
                  fill="#f1f5f9"
                  stroke="#cbd5e1"
                  strokeWidth="1.5"
                />
                <text x="360" y="110" className="fill-slate-400 font-mono text-[10px] font-bold">
                  KHOANG MŨI
                </text>

                {/* Hard Palate */}
                <path
                  d="M 330 160 C 370 160, 430 175, 460 205 C 470 215, 485 230, 492 245"
                  fill="none"
                  stroke="#475569"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <text x="350" y="155" className="fill-slate-600 font-mono text-[10px] font-bold">
                  VÒM CỨNG (PALATE)
                </text>

                {/* Upper Incisor */}
                <path d="M 515 255 L 507 277 L 498 276 L 503 255 Z" fill="#ffffff" stroke="#475569" strokeWidth="1.8" />
                <text x="518" y="250" className="fill-slate-800 font-mono text-[10px] font-bold">
                  Răng Trên
                </text>

                {/* Lower Incisor */}
                <path d="M 507 315 L 502 291 L 493 293 L 497 317 Z" fill="#ffffff" stroke="#475569" strokeWidth="1.8" />
                <text x="515" y="325" className="fill-slate-800 font-mono text-[10px] font-bold">
                  Răng Dưới
                </text>

                {/* Dynamic Tongue Anatomy (Positioned for /θ/ or selected sound) */}
                <g id="tongueBody">
                  <path
                    d={
                      selectedPhonemeKey === 'theta' || selectedPhonemeKey === 'eth'
                        ? 'M 300 370 C 310 325, 330 285, 370 270 C 415 255, 455 270, 485 278 C 502 281, 520 280, 522 277 C 520 283, 502 295, 475 305 C 420 325, 380 350, 360 390 Z'
                        : 'M 300 370 C 310 325, 340 260, 390 230 C 430 220, 470 240, 490 265 C 475 285, 440 310, 410 330 C 380 350, 360 390, 340 400 Z'
                    }
                    fill="url(#tongueMuscle)"
                    stroke="#e11d48"
                    strokeWidth="1.5"
                  />
                  <text x="370" y="315" className="fill-white font-mono text-[10px] font-bold tracking-wider">
                    CƠ LƯỠI
                  </text>
                </g>

                {/* Airflow Arrows */}
                <path
                  d="M 380 260 Q 450 250, 530 270"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="3.5"
                  strokeDasharray="5 3"
                  strokeLinecap="round"
                />
                <circle cx="522" cy="277" r="6" fill="#0284c7" className="animate-ping" opacity="0.6" />

                {/* Vocal Cord Vibration Zone */}
                <circle
                  cx="250"
                  cy="390"
                  r="14"
                  fill={data.isVoiced ? '#0284c7' : '#94a3b8'}
                  opacity="0.3"
                  className={data.isVoiced ? 'animate-pulse' : ''}
                />
                <text x="220" y="420" className="fill-slate-500 font-mono text-[9px] font-bold">
                  {data.isVoiced ? 'THANH QUẢN RUNG' : 'THANH QUẢN TĨNH'}
                </text>
              </svg>
            </div>

            {/* Biomechanical Parameters List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="font-mono text-[10px] text-slate-500 uppercase block font-bold">
                  1. Điểm Tiếp Xúc Đầu Lưỡi
                </span>
                <p className="text-xs text-slate-800 font-semibold mt-0.5">{data.tongueContact}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="font-mono text-[10px] text-slate-500 uppercase block font-bold">
                  2. Hướng Luồng Hơi Thoát Ra
                </span>
                <p className="text-xs text-slate-800 font-semibold mt-0.5">{data.airflow}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="font-mono text-[10px] text-slate-500 uppercase block font-bold">
                  3. Độ Mở Khẩu Hình Môi & Hàm
                </span>
                <p className="text-xs text-slate-800 font-semibold mt-0.5">{data.jawOpening}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="font-mono text-[10px] text-slate-500 uppercase block font-bold">
                  4. Trạng Thái Dây Thanh Âm
                </span>
                <p className="text-xs text-slate-800 font-semibold mt-0.5">{data.larynxStatus}</p>
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Vietnamese Native-Tongue Comparative Matrix (VN-105) */}
          <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="material-symbols-outlined text-primary text-xl">compare_arrows</span>
              <h3 className="text-base font-bold text-slate-900">
                So Sánh Với Tiếng Việt (VN L1 Comparison)
              </h3>
            </div>

            {/* Empathy Warning Card */}
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-2">
              <span className="font-mono text-[11px] font-bold text-primary uppercase block">
                ⚠️ Thói Quen Thổ Âm Người Việt
              </span>
              <p className="text-xs text-slate-800 leading-relaxed font-semibold">
                {data.vnComparison.wrongHabit}
              </p>
            </div>

            {/* Why It's Acoustically Wrong */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-mono text-[11px] font-bold text-slate-500 uppercase block">
                🔍 Vì sao Tây nghe không hiểu?
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                {data.vnComparison.whyWrong}
              </p>
            </div>

            {/* Actionable How-To-Fix */}
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
              <span className="font-mono text-[11px] font-bold text-emerald-800 uppercase block">
                ✅ Cách Sửa Triệt Để Bằng Cơ Học
              </span>
              <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                {data.vnComparison.howToFix}
              </p>
            </div>

            {/* Audio Listen & Test Button */}
            <button
              onClick={() => playSound(data.exampleWord)}
              className="w-full py-3.5 rounded-xl bg-primary hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span className="material-symbols-outlined text-lg">volume_up</span>
              <span>Nghe Từ Mẫu Bản Ngữ: "{data.exampleWord}" ({data.ipaWord})</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
