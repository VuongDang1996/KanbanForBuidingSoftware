import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useRecorder } from '../lib/audio/useRecorder';

export default function RoleplayView() {
  const { dialectConfig, incrementStreak } = useApp();
  const [showViSub, setShowViSub] = useState(true);
  const [scenario, setScenario] = useState('standup'); // 'standup' | 'coffee' | 'demo'
  const [dialogueTurns, setDialogueTurns] = useState([
    {
      id: 'turn-1',
      speaker: 'Alex [Tech Lead]',
      time: '09:30:14',
      isAi: true,
      text: "Morning team! Let's do a quick round. What did you finish yesterday on the payment gateway, and are there any blockers?",
      vi: 'Chào cả nhóm! Hôm qua bạn làm xong phần cổng thanh toán chưa, và hiện có vấn đề gì làm nghẽn tiến độ không?',
      audioPlayed: false
    }
  ]);

  const [currentPrompt, setCurrentPrompt] = useState(
    'Yesterday I merged the pull request for the checkout API, but today I am blocked by the staging server timeout.'
  );

  const [evaluatedTurn, setEvaluatedTurn] = useState({
    score: 88,
    grammar: '100%',
    lexicon: '95%',
    evaluatedText: [
      { text: 'Yesterday I', status: 'normal' },
      { text: 'merged', ipa: '/mɜːrdʒd/', gop: 94, status: 'perfect', note: 'Bật /dʒd/ chuẩn xác' },
      { text: 'the pull request for the checkout API, but today I am', status: 'normal' },
      { text: 'blocked', ipa: '/blɒkt/', gop: 48, status: 'error', note: 'Rụng âm đuôi /t/, đọc thành /blɒk/' },
      { text: 'by the staging server', status: 'normal' },
      { text: 'timeout', ipa: '/ˈtaɪm.aʊt/', gop: 86, status: 'perfect', note: 'Trọng âm âm 1 tốt' }
    ],
    l1Analysis: 'Lỗi rụng âm đuôi /t/ trong từ "blocked" (/blɒkt/) - thói quen bỏ quên phụ âm vô thanh sau phụ âm tắt /k/ của người Việt.'
  });

  const { isRecording, start, stop, audioUrl } = useRecorder({ autoAnalyze: true });

  const playSpeech = (text, rate = 1.0) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = rate;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleFinishSpeaking = async () => {
    await stop();
    // Simulate turn completion & streak progress
    incrementStreak();
  };

  return (
    <div className="w-full flex flex-col gap-6 py-4 animate-fade-in">
      {/* Top Scenario Selector Bar */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-slate-200/80 p-4 rounded-2xl shadow-[0_2px_8px_rgba(15,23,42,0.03)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-secondary border border-sky-100 flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-2xl">terminal</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-secondary uppercase">
                AI Speaking Roleplay (ELSA-301)
              </span>
              <span className="px-2 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-[10px] font-mono font-bold text-primary">
                L1 Ending Stops /t/, /d/, /kt/
              </span>
            </div>
            <h2 className="text-lg font-black text-slate-900 leading-tight">
              Hội Thoại Trực Tiếp: Daily Scrum Standup Với Tech Lead Mỹ
            </h2>
          </div>
        </div>

        {/* Scenarios Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          {[
            { id: 'standup', label: 'Tech Standup' },
            { id: 'demo', label: 'Demo Sản Phẩm' },
            { id: 'coffee', label: 'Coffee Chat' }
          ].map((sc) => (
            <button
              key={sc.id}
              onClick={() => setScenario(sc.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                scenario === sc.id
                  ? 'bg-white text-secondary shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {sc.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Roleplay Stage Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left 8 Cols: Dialogue Canvas */}
        <div className="xl:col-span-8 flex flex-col gap-4">
          {/* AI Partner Banner */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-sky-400 to-rose-400 p-0.5">
                  <div className="w-full h-full rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700 text-sm">
                    AL
                  </div>
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900">Alex</span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold border border-slate-200">
                    San Francisco (PST)
                  </span>
                </div>
                <p className="text-xs text-slate-500">Senior Engineering Lead • Platform Core</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-mono">
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live WebRTC
              </span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-500">14ms latency</span>
            </div>
          </div>

          {/* Dialogue Turns */}
          <div className="p-5 rounded-2xl bg-slate-100/70 border border-slate-200 flex flex-col gap-5 min-h-[380px]">
            {/* AI Message Bubble */}
            {dialogueTurns.map((turn) => (
              <div key={turn.id} className="flex items-start gap-3 max-w-2xl">
                <div className="w-9 h-9 rounded-full bg-secondary text-white font-bold text-xs flex items-center justify-center shrink-0">
                  AL
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-[11px] font-mono">
                    <span className="font-bold text-secondary">{turn.speaker}</span>
                    <span className="text-slate-400">{turn.time}</span>
                  </div>
                  <div className="p-4 rounded-2xl rounded-tl-sm bg-white border border-sky-100 shadow-xs flex flex-col gap-2.5">
                    <p className="text-sm text-slate-800 leading-relaxed font-medium font-sans">
                      “{turn.text}”
                    </p>

                    <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                      <button
                        onClick={() => playSpeech(turn.text, 1.0)}
                        className="px-2.5 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 text-secondary text-xs font-bold font-mono flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-sm">volume_up</span>
                        <span>1.0x</span>
                      </button>
                      <button
                        onClick={() => playSpeech(turn.text, 0.75)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold font-mono flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-sm">slow_motion_video</span>
                        <span>0.75x Chậm</span>
                      </button>
                      <button
                        onClick={() => setShowViSub(!showViSub)}
                        className="px-2.5 py-1 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-800 text-xs font-mono"
                      >
                        {showViSub ? 'Ẩn Dịch TV' : 'Hiện Dịch TV'}
                      </button>
                    </div>

                    {showViSub && (
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 italic">
                        🇻🇳 <em>“{turn.vi}”</em>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* User Evaluated Response Bubble */}
            <div className="flex items-start justify-end gap-3 self-end max-w-2xl w-full">
              <div className="flex flex-col items-end gap-1.5 w-full">
                <div className="flex items-center gap-2 text-[11px] font-mono">
                  <span className="text-slate-400">09:30:42</span>
                  <span className="font-bold text-primary">Bạn (Software Engineer)</span>
                </div>
                <div className="p-4 rounded-2xl rounded-tr-sm bg-white border border-slate-200 shadow-xs w-full flex flex-col gap-3">
                  {/* Evaluated Header Bar */}
                  <div className="flex items-center justify-between bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl text-xs font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className="text-secondary font-bold">GOP Match: {evaluatedTurn.score}%</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <span>Ngữ pháp: <strong className="text-slate-800">{evaluatedTurn.grammar}</strong></span>
                      <span>•</span>
                      <span>Tech Lexicon: <strong className="text-secondary">{evaluatedTurn.lexicon}</strong></span>
                    </div>
                  </div>

                  {/* Tokenized Spoken Feedback */}
                  <div className="text-sm text-slate-800 leading-loose">
                    {evaluatedTurn.evaluatedText.map((token, idx) => {
                      if (token.status === 'perfect') {
                        return (
                          <span key={idx} className="relative inline-flex flex-col items-center mx-1 align-baseline group">
                            <span className="px-2 py-0.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs">
                              {token.text}
                            </span>
                            <span className="font-mono text-[10px] text-emerald-700">{token.ipa}</span>
                          </span>
                        );
                      }
                      if (token.status === 'error') {
                        return (
                          <span key={idx} className="relative inline-flex flex-col items-center mx-1 align-baseline group">
                            <span className="px-2 py-0.5 rounded-lg bg-rose-50 border border-rose-300 text-primary font-bold text-xs animate-pulse">
                              {token.text} ⚠️
                            </span>
                            <span className="font-mono text-[10px] text-primary">{token.ipa}</span>
                          </span>
                        );
                      }
                      return <span key={idx}> {token.text} </span>;
                    })}
                  </div>

                  {/* Phonetic Callout */}
                  <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 space-y-1">
                    <span className="font-bold block flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">warning</span>
                      Phân tích Lỗi Âm Cuối (Vietnamese L1 Transfer):
                    </span>
                    <p>{evaluatedTurn.l1Analysis}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Voice Input Action Controls */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-50 text-primary flex items-center justify-center font-bold shrink-0">
                <span className="material-symbols-outlined">mic</span>
              </div>
              <div>
                <span className="font-bold text-xs text-slate-900 block">
                  {isRecording ? 'Đang lắng nghe câu trả lời của bạn...' : 'Lượt nói của bạn:'}
                </span>
                <p className="text-xs text-slate-500 font-mono italic">
                  “{currentPrompt}”
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {!isRecording ? (
                <button
                  onClick={start}
                  className="px-6 py-2.5 rounded-full bg-primary hover:bg-rose-700 text-white font-bold text-xs shadow-xs transition-transform hover:scale-105 flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-base">mic</span>
                  <span>Bắt Đầu Trả Lời Alex</span>
                </button>
              ) : (
                <button
                  onClick={handleFinishSpeaking}
                  className="px-6 py-2.5 rounded-full bg-slate-900 text-white font-bold text-xs shadow-xs animate-pulse flex items-center gap-1.5"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  <span>Dừng & Nộp Báo Cáo</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right 4 Cols: 3-Tier Positional Phoneme Ladder & Scorecard (PRON-205, PRON-206, ELSA-302) */}
        <div className="xl:col-span-4 flex flex-col gap-4">
          {/* Post-Roleplay Summary Scorecard (ELSA-302) */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-900">
                Bảng Điểm Giao Tiếp Toàn Diện (ELSA-302)
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-sky-50 text-secondary font-mono text-[10px] font-bold">
                Session 42
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center font-mono">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 block">GOP Score</span>
                <span className="text-xl font-black text-secondary">88%</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 block">Grammar</span>
                <span className="text-xl font-black text-emerald-600">100%</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 block">Lexicon</span>
                <span className="text-xl font-black text-indigo-600">95%</span>
              </div>
            </div>

            {/* Recommendation */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
              <span className="font-bold text-slate-800 block">💡 Nhận xét từ AI Lead:</span>
              <p className="text-slate-600 leading-relaxed">
                Bạn phản xạ câu ngắn rất nhanh và chính xác từ vựng chuyên ngành. Lưu ý âm đuôi -ed dạng vô thanh /kt/ để tạo phong thái tự tin trong cuộc họp.
              </p>
            </div>
          </div>

          {/* 3-Tier Positional Phoneme Ladder (PRON-205, PRON-206) */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col gap-3">
            <span className="font-mono text-[10px] text-primary uppercase font-bold tracking-wider">
              PRON-205 & PRON-206 • 3-Tier Positional Ladder
            </span>
            <h4 className="font-bold text-sm text-slate-900">
              Nấc Thang Luyện Âm Theo Vị Trí: Đầu - Giữa - Cuối Từ
            </h4>

            <div className="space-y-2 text-xs font-mono">
              {/* Initial */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[10px]">Tier 1: Initial Words</span>
                  <span className="font-bold text-slate-800">this, that, think</span>
                </div>
                <span className="text-emerald-600 font-bold">✓ 94%</span>
              </div>

              {/* Medial */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[10px]">Tier 2: Medial Words</span>
                  <span className="font-bold text-slate-800">method, weather</span>
                </div>
                <span className="text-emerald-600 font-bold">✓ 89%</span>
              </div>

              {/* Final */}
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-between">
                <div>
                  <span className="text-rose-500 block text-[10px]">Tier 3: Final Words & Codas</span>
                  <span className="font-bold text-primary">breathe, with, months</span>
                </div>
                <span className="text-primary font-bold">⚠️ 62%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
