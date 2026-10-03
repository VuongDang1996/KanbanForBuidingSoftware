import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useRecorder } from '../lib/audio/useRecorder';

export default function MasteryLabView() {
  const { incrementStreak, triggerPractice } = useApp();
  const [activeTab, setActiveTab] = useState('minimal-pairs'); // 'minimal-pairs' | 'alternation' | 'saturation' | 'ladder' | 'shadowing'
  const [quizScore, setQuizScore] = useState({ correct: 3, total: 3 });
  const [selectedQuizPair, setSelectedQuizPair] = useState(0);
  const [answeredState, setAnsweredState] = useState(null);
  const [shadowSpeed, setShadowSpeed] = useState(0.8);
  const [activeLadderTier, setActiveLadderTier] = useState(0);

  const positionalLadders = [
    {
      id: 'ladder-theta',
      phoneme: '/θ/ Interdental Fricative',
      tiers: [
        { level: '1. Initial (Đầu từ - PRON-205)', word: 'Think', ipa: '/θɪŋk/', phrase: 'Think carefully', sentence: 'Think carefully before you make an important decision.' },
        { level: '2. Medial (Giữa từ - PRON-205)', word: 'Method', ipa: '/ˈmeθəd/', phrase: 'Scientific method', sentence: 'The team follows a rigorous scientific method.' },
        { level: '3. Final (Cuối từ - PRON-205)', word: 'Breath', ipa: '/breθ/', phrase: 'Deep breath', sentence: 'Take a slow deep breath to release all tension.' }
      ],
      progressionNote: 'PRON-206: Tiến trình nối âm từ Cấp Độ Từ -> Cụm Từ -> Câu Hoàn Chỉnh trong ngữ cảnh công sở.'
    },
    {
      id: 'ladder-ks',
      phoneme: '/ks/ Complex Coda Cluster',
      tiers: [
        { level: '1. Monosyllabic (Đầu & Thân)', word: 'Six', ipa: '/sɪks/', phrase: 'Six boxes', sentence: 'There are six boxes left on the delivery truck.' },
        { level: '2. Infixed (Giữa từ)', word: 'Texture', ipa: '/ˈtekstʃər/', phrase: 'Smooth texture', sentence: 'This pastry has a remarkably smooth texture.' },
        { level: '3. Plural Inflected (Đuôi phức hợp)', word: 'Tasks', ipa: '/tæsks/', phrase: 'Complex tasks', sentence: 'She completed all complex tasks ahead of deadline.' }
      ],
      progressionNote: 'PRON-206: Khắc phục triệt để lỗi nuốt âm đuôi phụ âm kép /ks/ và /sks/ của người Việt.'
    }
  ];

  const shadowingLessons = [
    {
      id: 'shad-1',
      phonemeNumber: '#25',
      phonemeSymbol: '/θ/',
      name: 'Interdental Voiceless Fricative',
      spellingRules: [
        { rule: 'Quy tắc chính: Chữ viết "th"', examples: 'think, marathon, author, bath, breath' },
        { rule: 'Ngoại lệ danh xưng: Phát âm là /t/', examples: 'Thomas /ˈtɒməs/, Thames /temz/' }
      ],
      sentence: 'The healthy author thought thirty thoughts throughout Thursday.',
      ipa: '/ðə ˈhelθi ˈɔːθər θɔːt ˈθɜːrti θɔːts θruːˈaʊt ˈθɜːrzdeɪ/',
      coachingTip: 'PRON-210: Khẩu hình cường điệu (Exaggerated Articulation) - thè đầu lưỡi ra ngoài 2mm giữa hai hàm răng trước khi bật luồng hơi xát.'
    }
  ];

  const minimalPairs = [
    {
      id: 1,
      targetSound: '/θ/ vs /t/',
      wordA: 'think',
      ipaA: '/θɪŋk/',
      wordB: 'tink',
      ipaB: '/tɪŋk/',
      correctOption: 'A',
      testedWord: 'think',
      hint: 'Chú ý kẹp lưỡi giữa hai răng cho /θ/, đầu lưỡi bật sau nướu cho /t/'
    },
    {
      id: 2,
      targetSound: '/iː/ vs /ɪ/',
      wordA: 'sheep',
      ipaA: '/ʃiːp/',
      wordB: 'ship',
      ipaB: '/ʃɪp/',
      correctOption: 'B',
      testedWord: 'ship',
      hint: 'Nguyên âm căng /iː/ kéo dài mép cười, nguyên âm thả lỏng /ɪ/ phát âm dứt khoát'
    },
    {
      id: 3,
      targetSound: '/s/ vs /ʃ/',
      wordA: 'sea',
      ipaA: '/siː/',
      wordB: 'she',
      ipaB: '/ʃiː/',
      correctOption: 'B',
      testedWord: 'she',
      hint: 'Môi bẹt cho /s/, chu môi tròn phễu phía trước cho /ʃ/'
    }
  ];

  const voicingAlternations = [
    {
      id: 'alt-1',
      pair: 'breath vs breathe',
      noun: { word: 'breath', ipa: '/breθ/', note: 'Danh từ: âm /θ/ vô thanh không rung' },
      verb: { word: 'breathe', ipa: '/briːð/', note: 'Động từ: âm /ð/ hữu thanh rung cổ họng + nguyên âm dài /iː/' },
      rule: 'Quy tắc luân phiên: Động từ hóa biến âm xát vô thanh thành hữu thanh'
    },
    {
      id: 'alt-2',
      pair: 'use (N) vs use (V)',
      noun: { word: 'use', ipa: '/juːs/', note: 'Danh từ: kết thúc bằng âm /s/' },
      verb: { word: 'use', ipa: '/juːz/', note: 'Động từ: kết thúc bằng âm /z/ rung' },
      rule: 'Danh từ vô thanh /-s/ ➔ Động từ hữu thanh /-z/'
    },
    {
      id: 'alt-3',
      pair: 'house vs houses',
      noun: { word: 'house', ipa: '/haʊs/', note: 'Số ít: kết thúc bằng /s/' },
      verb: { word: 'houses', ipa: '/ˈhaʊ.zɪz/', note: 'Số nhiều: biến đổi thành /-zɪz/' },
      rule: 'Âm /s/ giữa hai nguyên âm biến thành âm /z/'
    }
  ];

  const saturationSentences = [
    {
      id: 'sat-1',
      phoneme: '/θ/ Interdental Saturation',
      sentence: 'Thirty-three thousand healthy thinkers thought throughout Thursday.',
      ipa: '/ˈθɜːrti θriː ˈθaʊznd ˈhelθi ˈθɪŋkərz θɔːt θruːˈaʊt ˈθɜːrzdeɪ/',
      focus: 'Bão hòa 8 lần xuất hiện âm /θ/ kẹp lưỡi liên tiếp'
    },
    {
      id: 'sat-2',
      phoneme: '/s/ and /ks/ Coda Saturation',
      sentence: 'Six strict foxes packed six boxes with mix-matched snacks.',
      ipa: '/sɪks strɪkt ˈfɒksɪz pækt sɪks ˈbɒksɪz wɪð mɪks mætʃt snæks/',
      focus: 'Bão hòa cụm phụ âm đuôi /ks/, /st/, /kt/'
    }
  ];

  const playWord = (word, rate = 0.8) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = rate;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelectQuiz = (option) => {
    const cur = minimalPairs[selectedQuizPair];
    const isCorrect = option === cur.correctOption;
    setAnsweredState(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) {
      incrementStreak();
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 py-4 animate-fade-in max-w-[1440px] mx-auto px-4 md:px-gutter-desktop">
      {/* Top Header */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-slate-200/80 p-5 rounded-2xl shadow-[0_2px_8px_rgba(15,23,42,0.03)]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-2xl">neurology</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-indigo-600 uppercase">
                Phonics Mastery Lab (PRON-205 to PRON-211)
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-mono font-bold text-slate-600">
                11-Gate Certified
              </span>
            </div>
            <h2 className="text-lg font-black text-slate-900 leading-tight">
              Phòng Thí Nghiệm Phản Xạ Âm Vị & Phân Biệt Cặp Âm Tối Thiểu
            </h2>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold flex-wrap">
          <button aria-label="Chuyển phân hệ học" type="button"
            onClick={() => setActiveTab('minimal-pairs')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'minimal-pairs' ? 'bg-white text-primary shadow-xs' : 'text-slate-600'
            }`}
          >
            Cặp Âm (ELSA-205 & PRON-208)
          </button>
          <button aria-label="Chuyển phân hệ học" type="button"
            onClick={() => setActiveTab('ladder')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'ladder' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            Bậc Thang Phân Vị (PRON-205 & 206)
          </button>
          <button aria-label="Chuyển phân hệ học" type="button"
            onClick={() => setActiveTab('shadowing')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'shadowing' ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            Shadowing & Chính Tả (PRON-209 & 210)
          </button>
          <button aria-label="Chuyển phân hệ học" type="button"
            onClick={() => setActiveTab('alternation')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'alternation' ? 'bg-white text-secondary shadow-xs' : 'text-slate-600'
            }`}
          >
            Quy Tắc Biến Đổi (PRON-207)
          </button>
          <button aria-label="Chuyển phân hệ học" type="button"
            onClick={() => setActiveTab('saturation')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'saturation' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600'
            }`}
          >
            Câu Bão Hòa Âm (PRON-211)
          </button>
        </div>
      </div>

      {activeTab === 'alternation' ? (
        /* PRON-207: Phonetic Exception Words & Grammatical Voicing Alternation */
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <span className="font-mono text-xs font-bold text-secondary uppercase">
              PRON-207 • Grammatical Voicing Alternation Rules
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-1">
              Bộ Từ Ngoại Lệ & Quy Tắc Biến Đổi Âm Vị Danh Từ - Động Từ
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Nhiều cặp từ tiếng Anh chuyển từ Danh từ sang Động từ bằng cách rung thanh quản (Voicing Alternation).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {voicingAlternations.map((item) => (
              <div key={item.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <span className="font-bold text-sm text-slate-900 font-mono block">
                  {item.pair}
                </span>

                {/* Noun Box */}
                <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">Noun [Danh từ]</span>
                    <span className="font-bold text-sm text-slate-900">{item.noun.word}</span>
                    <span className="font-mono text-xs text-primary font-bold ml-2">{item.noun.ipa}</span>
                  </div>
                  <button aria-label="Phát âm mẫu chuẩn bản ngữ" type="button"
                    onClick={() => playWord(item.noun.word)}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                  >
                    <span className="material-symbols-outlined text-base">volume_up</span>
                  </button>
                </div>

                {/* Verb Box */}
                <div className="p-3 bg-white rounded-xl border border-secondary/40 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-secondary uppercase block">Verb [Động từ]</span>
                    <span className="font-bold text-sm text-slate-900">{item.verb.word}</span>
                    <span className="font-mono text-xs text-secondary font-bold ml-2">{item.verb.ipa}</span>
                  </div>
                  <button aria-label="Phát âm mẫu chuẩn bản ngữ" type="button"
                    onClick={() => playWord(item.verb.word)}
                    className="p-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-secondary"
                  >
                    <span className="material-symbols-outlined text-base">volume_up</span>
                  </button>
                </div>

                <p className="text-[11px] text-slate-600 italic">💡 {item.rule}</p>
              </div>
            ))}
          </div>
        </div>
      ) : activeTab === 'saturation' ? (
        /* PRON-211: Dense Target Sound Saturation Sentences */
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <span className="font-mono text-xs font-bold text-indigo-600 uppercase">
              PRON-211 • Dense Target Sound Saturation Sentences
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-1">
              Luyện Câu Bão Hòa Âm Mục Tiêu & Đánh Giá Giảm Giọng Lơ Lớ
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Phương pháp huấn luyện cơ bắp cường độ cao (Hyper-density training): Lặp lại âm mục tiêu liên tục trong một hơi thở.
            </p>
          </div>

          <div className="space-y-4">
            {saturationSentences.map((s) => (
              <div key={s.id} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-primary uppercase">{s.phoneme}</span>
                  <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-mono font-bold">
                    {s.focus}
                  </span>
                </div>

                <p className="text-lg font-bold text-slate-900 leading-relaxed font-sans">
                  "{s.sentence}"
                </p>

                <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-xs text-secondary">
                  IPA: {s.ipa}
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button aria-label="Phát âm mẫu chuẩn bản ngữ" type="button"
                    onClick={() => playWord(s.sentence)}
                    className="px-5 py-2.5 rounded-xl bg-secondary hover:bg-sky-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
                  >
                    <span className="material-symbols-outlined text-sm">volume_up</span>
                    <span>Nghe Mẫu Câu Này</span>
                  </button>

                  <button aria-label="Nút tương tác" type="button"
                    onClick={() =>
                      triggerPractice({
                        id: s.id,
                        word: s.phoneme,
                        sentence: s.sentence,
                        ipa: s.ipa,
                        targetPhonemes: [s.phoneme],
                        difficulty: 'Advanced Saturation',
                        trap: s.focus
                      })
                    }
                    className="px-5 py-2.5 rounded-xl bg-primary hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
                  >
                    <span className="material-symbols-outlined text-sm">mic</span>
                    <span>Vào Phòng Thu Luyện Câu Này</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : activeTab === 'ladder' ? (
        /* PRON-205 & PRON-206: 3-Tier Positional Phoneme Ladder & Progression */
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="font-mono text-xs font-bold text-emerald-700 uppercase">
                PRON-205 & PRON-206 • 3-Tier Positional Phoneme Ladder
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Luyện Âm Phân Vị (Đầu - Giữa - Cuối) & Tiến Trình Nối Âm
              </h3>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
              {positionalLadders.map((lad, idx) => (
                <button aria-label="Nút tương tác" type="button"
                  key={lad.id}
                  onClick={() => setActiveLadderTier(idx)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    activeLadderTier === idx ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  {lad.phoneme}
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs text-slate-500">
            {positionalLadders[activeLadderTier].progressionNote}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {positionalLadders[activeLadderTier].tiers.map((tier, tIdx) => (
              <div key={tIdx} className="p-5 rounded-2xl bg-gradient-to-b from-slate-50 to-emerald-50/20 border border-slate-200 flex flex-col justify-between gap-4">
                <div>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 font-mono text-[11px] font-bold inline-block">
                    {tier.level}
                  </span>
                  <div className="mt-3">
                    <span className="text-xl font-black text-slate-900">{tier.word}</span>
                    <span className="text-xs font-mono font-bold text-emerald-700 ml-2">{tier.ipa}</span>
                  </div>
                  <div className="mt-3 p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block">Cấp Độ Cụm Từ</span>
                    <p className="text-xs font-bold text-slate-800 mt-0.5">"{tier.phrase}"</p>
                  </div>
                  <div className="mt-2 p-3 bg-white rounded-xl border border-slate-200">
                    <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block">Cấp Độ Toàn Câu</span>
                    <p className="text-xs text-slate-700 mt-0.5">"{tier.sentence}"</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button aria-label="Phát âm mẫu chuẩn bản ngữ" type="button"
                    onClick={() => playWord(tier.word)}
                    className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-700 text-xs font-bold flex items-center justify-center gap-1 transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">volume_up</span>
                    <span>Từ</span>
                  </button>
                  <button aria-label="Phát âm mẫu chuẩn bản ngữ" type="button"
                    onClick={() => playWord(tier.sentence)}
                    className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-xs transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">play_arrow</span>
                    <span>Câu Mẫu</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : activeTab === 'shadowing' ? (
        /* PRON-209 & PRON-210: Numbered Phonemes & Shadowing Masterclass */
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-mono text-xs font-bold text-sky-700 uppercase">
                PRON-209 & PRON-210 • Numbered Target Phonemes & Shadowing Masterclass
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Hệ Thống Đánh Số Âm Vị IPA & Luyện Shadowing Khẩu Hình Chuẩn
              </h3>
            </div>
            {/* Speed Control */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-500 font-bold">Tốc độ:</span>
              {[0.5, 0.75, 1.0].map((spd) => (
                <button aria-label="Chọn tốc độ luyện tập" type="button"
                  key={spd}
                  onClick={() => setShadowSpeed(spd)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                    shadowSpeed === spd ? 'bg-sky-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </div>

          {shadowingLessons.map((les) => (
            <div key={les.id} className="space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 bg-sky-100 text-sky-800 rounded-lg font-mono text-sm font-bold">
                  Phoneme {les.phonemeNumber}: {les.phonemeSymbol}
                </span>
                <span className="text-sm font-semibold text-slate-700">{les.name}</span>
              </div>

              {/* Orthographic Rules */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {les.spellingRules.map((rule, rIdx) => (
                  <div key={rIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-bold text-slate-900 block">{rule.rule}</span>
                    <span className="text-xs text-sky-700 font-mono mt-1 block">Ví dụ: {rule.examples}</span>
                  </div>
                ))}
              </div>

              {/* Script Sentence Box */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-50/70 via-indigo-50/40 to-slate-50 border border-sky-200/80 space-y-4">
                <span className="text-xs font-mono font-bold text-sky-800 uppercase block">
                  Đoạn Văn Luyện Shadowing Đồng Bộ ({shadowSpeed}x)
                </span>
                <p className="text-xl font-bold text-slate-900 leading-relaxed font-sans">
                  "{les.sentence}"
                </p>
                <div className="p-3 bg-white rounded-xl border border-sky-100 font-mono text-xs text-sky-900">
                  IPA: {les.ipa}
                </div>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-amber-600 shrink-0">tips_and_updates</span>
                  <span>{les.coachingTip}</span>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button aria-label="Phát âm mẫu chuẩn bản ngữ" type="button"
                    onClick={() => playWord(les.sentence, shadowSpeed)}
                    className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-transform active:scale-95 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">record_voice_over</span>
                    <span>Bắt Đầu Shadowing Theo Giọng Mẫu ({shadowSpeed}x)</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Minimal Pair Auditory Discrimination Quiz (ELSA-205 & PRON-208) */
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <span className="font-mono text-xs font-bold text-primary uppercase">
                ELSA-205 & PRON-208 • Minimal Pair Discrimination Quiz
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-1">
                Luyện Tai Thính: Phân Biệt Cặp Âm Dễ Nhầm Lẫn Của Người Việt
              </h3>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                Điểm bài kiểm tra: {quizScore.correct} / {quizScore.total}
              </span>
            </div>
          </div>

          {/* Active Quiz Card */}
          {(() => {
            const cur = minimalPairs[selectedQuizPair];
            return (
              <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-50 to-sky-50/50 border border-slate-200 flex flex-col items-center text-center gap-6">
                <div>
                  <span className="font-mono text-xs font-bold text-slate-400 uppercase">
                    Cặp Âm Số {selectedQuizPair + 1} / {minimalPairs.length}: {cur.targetSound}
                  </span>
                  <h4 className="text-lg font-bold text-slate-900 mt-1">
                    Bấm nút bên dưới để nghe, sau đó chọn từ bạn vừa nghe thấy:
                  </h4>
                </div>

                {/* Big Audio Play Button */}
                <button aria-label="Phát âm mẫu chuẩn bản ngữ" type="button"
                  onClick={() => playWord(cur.testedWord)}
                  className="w-20 h-20 rounded-full bg-secondary hover:bg-sky-600 text-white flex items-center justify-center text-3xl shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-4xl">volume_up</span>
                </button>

                {/* Option A vs Option B Buttons */}
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  <button aria-label="Nút tương tác" type="button"
                    onClick={() => handleSelectQuiz('A')}
                    className="p-5 rounded-2xl bg-white border-2 border-slate-200 hover:border-primary shadow-xs transition-all flex flex-col items-center cursor-pointer hover:scale-102"
                  >
                    <span className="text-2xl font-black text-slate-900">{cur.wordA}</span>
                    <span className="font-mono text-xs text-slate-500 mt-1">{cur.ipaA}</span>
                    <span className="font-mono text-[10px] text-primary font-bold mt-2 uppercase">Lựa chọn A</span>
                  </button>

                  <button aria-label="Nút tương tác" type="button"
                    onClick={() => handleSelectQuiz('B')}
                    className="p-5 rounded-2xl bg-white border-2 border-slate-200 hover:border-primary shadow-xs transition-all flex flex-col items-center cursor-pointer hover:scale-102"
                  >
                    <span className="text-2xl font-black text-slate-900">{cur.wordB}</span>
                    <span className="font-mono text-xs text-slate-500 mt-1">{cur.ipaB}</span>
                    <span className="font-mono text-[10px] text-primary font-bold mt-2 uppercase">Lựa chọn B</span>
                  </button>
                </div>

                {answeredState && (
                  <div
                    className={`p-4 rounded-xl text-xs font-mono font-bold ${
                      answeredState === 'correct'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {answeredState === 'correct'
                      ? `✅ Chính xác! Từ được đọc là "${cur.testedWord}".`
                      : `❌ Chưa chính xác. Từ chuẩn là "${cur.testedWord}".`}
                    <p className="font-normal mt-1 font-sans">{cur.hint}</p>
                  </div>
                )}

                {/* Next Button */}
                <div className="flex items-center gap-3">
                  <button aria-label="Nút tương tác" type="button"
                    onClick={() => {
                      setAnsweredState(null);
                      setSelectedQuizPair((p) => (p + 1) % minimalPairs.length);
                    }}
                    className="px-6 py-2.5 rounded-full bg-slate-900 text-white font-bold text-xs shadow-xs hover:bg-slate-800 transition-colors"
                  >
                    Chuyển Cặp Âm Tiếp Theo
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
