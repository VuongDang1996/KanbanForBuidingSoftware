import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useRecorder } from '../lib/audio/useRecorder';

export default function MasteryLabView() {
  const { incrementStreak, triggerPractice } = useApp();
  const [activeTab, setActiveTab] = useState('minimal-pairs'); // 'minimal-pairs' | 'alternation' | 'saturation' | 'shadowing'
  const [quizScore, setQuizScore] = useState({ correct: 3, total: 3 });
  const [selectedQuizPair, setSelectedQuizPair] = useState(0);
  const [answeredState, setAnsweredState] = useState(null);

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
      verb: { word: 'houses', ipa: /ˈhaʊ.zɪz/, note: 'Số nhiều: biến đổi thành /-zɪz/' },
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

  const playWord = (word) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
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
    <div className="w-full flex flex-col gap-6 py-4 animate-fade-in">
      {/* Top Header */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-slate-200/80 p-5 rounded-2xl shadow-[0_2px_8px_rgba(15,23,42,0.03)]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-2xl">neurology</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-indigo-600 uppercase">
                Phonics Mastery Lab (PRON-207 to PRON-211)
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-mono font-bold text-slate-600">
                L1 Articulation Mastery
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
            Cặp Âm Tối Thiểu (ELSA-205)
          </button>
          <button aria-label="Chuyển phân hệ học" type="button"
            onClick={() => setActiveTab('alternation')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'alternation' ? 'bg-white text-secondary shadow-xs' : 'text-slate-600'
            }`}
          >
            Quy Tắc Biến Đổi Âm (PRON-207)
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
