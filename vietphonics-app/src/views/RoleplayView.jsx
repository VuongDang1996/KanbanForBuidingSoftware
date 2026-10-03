import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useRecorder } from '../lib/audio/useRecorder';

export default function RoleplayView() {
  const { incrementStreak } = useApp();
  const [showViSub, setShowViSub] = useState(true);
  const [isSlowAi, setIsSlowAi] = useState(false);
  const [hasRecordedUser, setHasRecordedUser] = useState(true);

  const { isRecording, start, stop } = useRecorder({ autoAnalyze: true });

  const aiMessage = "Morning team! Let's do a quick round. What did you finish yesterday on the payment gateway, and are there any blockers?";
  const aiMessageVi = "“Chào cả nhóm! Hôm qua bạn làm xong phần cổng thanh toán chưa, và hiện có vấn đề gì làm nghẽn tiến độ không?”";
  const proPhrase = "We ran into an infrastructure bottleneck on staging.";

  const playSpeech = (text, rate = 1.0) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = rate;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleMicToggle = async () => {
    if (isRecording) {
      await stop();
      setHasRecordedUser(true);
      incrementStreak();
    } else {
      await start();
    }
  };

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        handleMicToggle();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRecording]);

  return (
    <div className="flex flex-col w-full animate-fade-in">
      <section className="relative w-full px-4 md:px-gutter-desktop py-space-md mx-auto max-w-[1440px]">
        <div className="grid grid-cols-12 gap-space-lg items-start">
          {/* Main Roleplay Stage (Left 8 cols) */}
          <div className="col-span-12 xl:col-span-8 flex flex-col gap-space-md">
            {/* Scenario Brief Bar */}
            <div className="relative overflow-hidden rounded-xl bg-white border border-slate-200/80 p-space-md shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-space-md">
              <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-gradient-to-br from-sky-100/60 to-transparent blur-3xl pointer-events-none"></div>
              <div className="flex items-center gap-space-md min-w-0">
                <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0 text-sky-600 shadow-sm">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    terminal
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-space-xs flex-wrap">
                    <span className="font-label-mono text-label-mono uppercase tracking-widest text-sky-700 font-bold">
                      Tình Huống #IT-04
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="font-label-mono text-label-mono text-rose-600 font-bold">Sprint 42 Sync</span>
                  </div>
                  <h1 className="font-headline-sm text-headline-sm text-slate-900 truncate font-bold">
                    Daily Scrum Standup{' '}
                    <span className="font-body-sm text-body-sm text-slate-500 font-normal hidden sm:inline">
                      (Dành cho Lập trình viên / Tech Lead Mỹ)
                    </span>
                  </h1>
                </div>
              </div>
              <div className="flex items-center gap-space-xs shrink-0 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full shadow-inner">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping"></span>
                <span className="font-label-mono text-label-mono text-slate-600">
                  L1 Lọc Âm: <span className="text-rose-600 font-bold">Ending Stops /t/, /d/, /kt/</span>
                </span>
              </div>
            </div>

            {/* Partner Banner & Acoustic Status */}
            <div className="rounded-xl bg-white border border-slate-200/80 p-space-md shadow-sm flex items-center justify-between flex-wrap gap-space-md">
              <div className="flex items-center gap-space-md">
                <div className="relative shrink-0">
                  <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-sky-400 via-rose-400 to-sky-300">
                    <img
                      className="w-full h-full rounded-full object-cover ring-2 ring-white"
                      alt="Alex Tech Lead"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlobVAhbku47-3bRxJGNs2zzKtj4wm_1DZAS6xzOusrdx80eISBXCdqc5H1H2xpt169wruKmuUux6JdabMzRHYJMHpnVRSVOFqBlBvcdadIPPhpevwFfq9uSzFNUR7v6TIWcPfdGJM4Fox5FWFVD9PpnGvYisLo49wntuifxo3ljK9BOuJsSX2edDOadyhimRODos4ef4qF4EJ7z_334LV21kNrnQgYqx1S4W7x09HNXPiizWAAdGI"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse"></span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-headline-sm text-headline-sm text-slate-900 font-bold">Alex</span>
                    <span className="font-label-mono text-label-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                      San Francisco (PST)
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-slate-500">Senior Engineering Lead • Platform Core</p>
                </div>
              </div>

              {/* Dynamic Audio Spectrum Indicator */}
              <div className="flex items-center gap-space-md bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl">
                <div className="flex flex-col items-end">
                  <span className="font-label-mono text-label-mono text-emerald-600 font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Đang trực tiếp kết nối
                  </span>
                  <span className="font-label-mono text-[10px] text-slate-400">Latency: 14ms | 48kHz WebRTC</span>
                </div>
                <div className="flex items-end gap-1 h-6 w-20">
                  <div className="w-1.5 bg-sky-500 rounded-full animate-bounce h-3" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1.5 bg-sky-400 rounded-full animate-bounce h-5" style={{ animationDelay: '0.3s' }}></div>
                  <div className="w-1.5 bg-rose-500 rounded-full animate-bounce h-2" style={{ animationDelay: '0.15s' }}></div>
                  <div className="w-1.5 bg-sky-600 rounded-full animate-bounce h-6" style={{ animationDelay: '0.25s' }}></div>
                  <div className="w-1.5 bg-indigo-500 rounded-full animate-bounce h-4" style={{ animationDelay: '0.4s' }}></div>
                  <div className="w-1.5 bg-sky-500 rounded-full animate-bounce h-3" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>

            {/* Chat Dialogue Canvas Timeline */}
            <div className="flex flex-col gap-space-lg p-space-md rounded-xl bg-slate-100/70 border border-slate-200 min-h-[460px] shadow-inner relative overflow-hidden">
              <div className="flex justify-center my-space-xs">
                <span className="font-label-mono text-label-mono text-slate-500 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-xs uppercase tracking-widest font-semibold">
                  Cuộc họp bắt đầu lúc 09:30 AM PST
                </span>
              </div>

              {/* Turn 1: AI Prompt Bubble (Left) */}
              <div className="flex items-start gap-space-md max-w-2xl">
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 shadow-sm border border-slate-200">
                  <img
                    className="w-full h-full object-cover"
                    alt="Mini avatar Alex"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMAkEHV2h2_5R2T0gz2ee_6zOMJZ2pvvCyUjQ703cASamMq4l4Z093rUuGB0Cux1ooDd3MAEHVJr1Y2ybyWSilAp40k0Zu-XsoWiBn-OKtOL9yvyBSpUhMPy6KEvHdLq03Tce6Sr4w7yaFcS1USAQweZJSHnK3eD3k9Irj8DPtheOIdLYgFtakeZvR4aNFh1yK8bGzkinh4dAO9Y_o2fwlvv6AoFjdX192bWX78oLNiHG6Ito7wFX0"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-label-mono text-label-mono text-sky-800 font-bold">Alex [Tech Lead]</span>
                    <span className="font-label-mono text-[10px] text-slate-400">09:30:14</span>
                  </div>
                  <div className="p-space-md rounded-2xl rounded-tl-sm bg-sky-50/80 border border-sky-100 shadow-sm flex flex-col gap-2">
                    <p className="font-body-lg text-body-lg text-slate-800 leading-relaxed font-medium">
                      “Morning team! Let's do a quick round. What did you finish yesterday on the payment gateway, and are there any blockers?”
                    </p>
                    {/* Audio and translation helpers */}
                    <div className="flex items-center gap-2 pt-2">
                      <button aria-label="Phát âm mẫu chuẩn bản ngữ"
                        onClick={() => playSpeech(aiMessage, 1.0)}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white hover:bg-slate-50 border border-sky-200 text-slate-700 font-label-mono text-label-mono shadow-xs transition-colors cursor-pointer"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-sm text-sky-600">volume_up</span>
                        <span>1.0x</span>
                      </button>
                      <button aria-label="Phát âm mẫu chuẩn bản ngữ"
                        onClick={() => {
                          setIsSlowAi(!isSlowAi);
                          playSpeech(aiMessage, 0.8);
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-slate-600 font-label-mono text-label-mono shadow-xs transition-colors cursor-pointer ${
                          isSlowAi ? 'bg-sky-50 border-sky-300 text-sky-800' : 'bg-white hover:bg-slate-50 border-sky-200'
                        }`}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-sm text-slate-500">slow_motion_video</span>
                        <span>0.8x Chậm</span>
                      </button>
                      <button aria-label="Nút tương tác"
                        onClick={() => setShowViSub(!showViSub)}
                        className="flex items-center gap-1 px-3 py-1 rounded-full bg-white hover:bg-slate-50 border border-sky-200 text-slate-600 hover:text-slate-800 font-label-mono text-label-mono shadow-xs transition-colors cursor-pointer"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-sm text-slate-500">translate</span>
                        <span>{showViSub ? 'Ẩn Dịch' : 'Dịch TV'}</span>
                      </button>
                    </div>

                    {showViSub && (
                      <div className="p-space-sm rounded-lg bg-white/90 border border-sky-100 font-body-sm text-body-sm text-slate-600">
                        🇻🇳 <em>{aiMessageVi}</em>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Turn 2: User Voice Assessment Bubble (Right) */}
              {hasRecordedUser && (
                <div className="flex items-start justify-end gap-space-md max-w-3xl self-end w-full">
                  <div className="flex flex-col items-end gap-2 w-full">
                    <div className="flex items-center gap-2">
                      <span className="font-label-mono text-[10px] text-slate-400">09:30:42</span>
                      <span className="font-label-mono text-label-mono text-rose-700 font-bold">Bạn (Software Engineer)</span>
                    </div>

                    {/* Evaluated Audio Bubble Container */}
                    <div className="p-space-md rounded-2xl rounded-tr-sm bg-white border border-slate-200 shadow-sm w-full flex flex-col gap-3">
                      {/* Telemetry Score Header */}
                      <div className="flex items-center justify-between pb-2 bg-slate-50 border border-slate-100 px-3 py-2 rounded-xl flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-sky-600 text-base">graphic_eq</span>
                          <span className="font-label-mono text-label-mono text-slate-700">Đánh giá Âm học GOP:</span>
                          <span className="font-label-mono text-label-mono text-sky-700 font-bold px-2 py-0.5 rounded bg-sky-100 border border-sky-200">
                            88% Match
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-label-mono text-label-mono text-slate-500">
                            Ngữ Pháp: <strong className="text-slate-800">100%</strong>
                          </span>
                          <span className="text-slate-300">|</span>
                          <span className="font-label-mono text-label-mono text-slate-500">
                            Tech Lexicon: <strong className="text-sky-700">95%</strong>
                          </span>
                        </div>
                      </div>

                      {/* Rich Interactive Spoken Sentence with Forced Phoneme Alignment */}
                      <div className="font-body-lg text-body-lg text-slate-800 leading-loose py-1">
                        Yesterday I{' '}
                        <span
                          className="relative inline-flex flex-col items-center mx-1 group cursor-pointer align-baseline"
                          onClick={() => playSpeech('merged')}
                        >
                          <span className="px-2 py-0.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold shadow-xs">
                            merged
                          </span>
                          <span className="font-ipa-inline text-[11px] text-emerald-700 tracking-normal">/mɜːrdʒd/</span>
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 px-2 py-1 rounded bg-slate-800 text-white text-[10px] font-label-mono whitespace-nowrap shadow-md pointer-events-none z-30">
                            ✓ Đạt 94% • Có âm bật /dʒd/ chuẩn
                          </span>
                        </span>{' '}
                        the pull request for the checkout API, but today I am{' '}
                        <span
                          className="relative inline-flex flex-col items-center mx-1 group cursor-pointer align-baseline"
                          onClick={() => playSpeech('blocked')}
                        >
                          <span className="px-2 py-0.5 rounded-lg bg-rose-50 border border-rose-300 text-rose-700 font-bold shadow-sm animate-pulse">
                            blocked
                          </span>
                          <span className="font-ipa-inline text-[11px] text-rose-700 tracking-normal">/blɒkt/ ⚠️</span>
                          <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-rose-600 text-white text-[10px] font-label-mono font-semibold whitespace-nowrap shadow-sm z-30">
                            Bạn đọc: /blɒk/ (thiếu /t/)
                          </span>
                        </span>{' '}
                        by the staging server{' '}
                        <span
                          className="relative inline-flex flex-col items-center mx-1 group cursor-pointer align-baseline"
                          onClick={() => playSpeech('timeout')}
                        >
                          <span className="px-2 py-0.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 font-semibold">
                            timeout
                          </span>
                          <span className="font-ipa-inline text-[11px] text-slate-500 tracking-normal">/ˈtaɪm.aʊt/</span>
                        </span>
                        .
                      </div>

                      {/* Phonetic Acoustic Diagnostic Breakdown Bar */}
                      <div className="mt-4 p-space-sm rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="font-label-mono text-[11px] text-rose-700 uppercase font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">error</span>
                            Phân tích Lỗi Âm Cuối (Vietnamese L1 Transfer)
                          </span>
                          <span className="font-label-mono text-[11px] text-slate-500">Mục tiêu: Động từ quá khứ /t/ vô thanh</span>
                        </div>
                        <div className="flex items-center gap-3 p-2 rounded-lg bg-white border border-slate-200">
                          <button aria-label="Phát âm mẫu chuẩn bản ngữ"
                            onClick={() => playSpeech('blocked', 0.6)}
                            className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center hover:bg-rose-200 transition-colors shrink-0 cursor-pointer"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-sm">play_arrow</span>
                          </button>
                          <div className="flex flex-col flex-1 min-w-0">
                            <div className="flex items-center justify-between font-label-mono text-[11px]">
                              <span className="text-slate-800">
                                Target Waveform: <strong className="text-sky-700">[b] [l] [ɒ] [k] [t]</strong>
                              </span>
                              <span className="text-rose-600 font-bold">GOP Phoneme Score: 41%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mt-1 flex">
                              <div className="w-[30%] bg-sky-500 h-full"></div>
                              <div className="w-[30%] bg-sky-500 h-full"></div>
                              <div className="w-[20%] bg-sky-500 h-full"></div>
                              <div className="w-[20%] bg-rose-500 h-full animate-pulse"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 shadow-sm border border-slate-200">
                    <img
                      className="w-full h-full object-cover"
                      alt="Vietnamese Engineer Avatar"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjYQxO-f-knaJTfx2C6p5w2Jlyl_zSn7gIz3GFGUD7kdpH2V5UMeyOeQ-saTWdNCaW1fWGD6pEA2qh7UWHhl8twtups3sPdgC9Xm42nDg7GG1tOczxA-eH7uAEhuYBt3kPgQ40fx6d8pcq4ETLMY81_x4bCHfpdudO4gm47OroNwdbdSc8FQgcJuaJJ35JfRWAMuio72ll62u_Molqu-vrm-p-UPRSkaVfZm_aVJOHhQ0ATUqW-1Q0"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Live Voice Dock & Controller */}
            <div className="rounded-2xl bg-white border border-slate-200 p-space-md shadow-md flex flex-col gap-space-sm relative overflow-hidden">
              <div className="flex items-center justify-between flex-wrap gap-space-sm">
                {/* Real-time VU Meter */}
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl">
                  <span className="material-symbols-outlined text-sky-600 text-sm">mic</span>
                  <div className="flex items-center gap-1 h-4 w-28">
                    <span className="w-1 h-2 bg-sky-500 rounded-full"></span>
                    <span className="w-1 h-3 bg-sky-500 rounded-full"></span>
                    <span className="w-1 h-4 bg-sky-500 rounded-full"></span>
                    <span className="w-1 h-2 bg-sky-500 rounded-full"></span>
                    <span className="w-1 h-5 bg-sky-400 rounded-full"></span>
                    <span className="w-1 h-3 bg-sky-400 rounded-full"></span>
                    <span className="w-1 h-1.5 bg-slate-300 rounded-full"></span>
                    <span className="w-1 h-1.5 bg-slate-300 rounded-full"></span>
                    <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                  </div>
                  <span className="font-label-mono text-[10px] text-slate-500">-18 dB</span>
                </div>

                {/* Reset / Retry Controls */}
                <div className="flex items-center gap-2">
                  <button aria-label="Phát âm mẫu chuẩn bản ngữ"
                    onClick={() => playSpeech("Yesterday I merged the pull request, but today I am blocked by timeout.", 0.85)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-label-mono text-label-mono transition-colors cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-sm">replay</span>
                    <span>Nghe Mẫu Chuẩn</span>
                  </button>
                  <button aria-label="Bật tắt ghi âm giọng nói"
                    onClick={handleMicToggle}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-label-mono text-label-mono transition-colors cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-sm">mic</span>
                    <span>{isRecording ? 'Dừng' : 'Luyện Lại Câu'}</span>
                  </button>
                </div>
              </div>

              {/* Main Push-To-Talk Centerpiece */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md pt-space-xs">
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${isRecording ? 'bg-rose-500 animate-ping' : 'bg-emerald-500'}`}></div>
                  <span className="font-body-sm text-body-sm text-slate-600 font-medium">
                    {isRecording ? 'Đang lắng nghe câu trả lời của bạn...' : 'Sẵn sàng! Nhấn để nói tiếp hoặc trả lời câu hỏi phụ của Alex.'}
                  </span>
                </div>

                <div className="flex items-center gap-space-md">
                  <button aria-label="Bật tắt ghi âm giọng nói"
                    onClick={handleMicToggle}
                    className={`flex items-center gap-3 px-6 py-3 rounded-full text-white font-headline-sm text-headline-sm font-bold shadow-lg active:scale-95 transition-all cursor-pointer ${
                      isRecording
                        ? 'bg-sky-600 hover:bg-sky-700 shadow-sky-500/25 ring-4 ring-sky-200'
                        : 'bg-rose-600 hover:bg-rose-700 shadow-rose-500/25'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-2xl animate-pulse">mic</span>
                    <span className="text-base tracking-wide uppercase">
                      {isRecording ? 'Đang Thu Âm (Nhấp Dừng)' : 'Nhấp Để Nói'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Drawer / Diagnostics & Scorecard (Right 4 cols) */}
          <div className="col-span-12 xl:col-span-4 flex flex-col gap-space-md">
            {/* Roleplay Objective Checklist */}
            <div className="rounded-xl bg-white border border-slate-200 p-space-md shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sky-600">checklist</span>
                  <h2 className="font-headline-sm text-headline-sm text-slate-900 font-bold">Mục Tiêu Hội Thoại</h2>
                </div>
                <span className="font-label-mono text-label-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                  2/3 ĐẠT
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-slate-600">
                Tiêu chuẩn ngữ cảnh Scrum chuẩn Silicon Valley yêu cầu sự ngắn gọn và âm điệu dứt khoát:
              </p>
              <div className="flex flex-col gap-space-sm">
                {/* Item 1: Complete */}
                <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-slate-50 border border-slate-200/70">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-sm font-bold">check</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-body-sm text-body-sm text-slate-900 font-semibold">Nêu việc đã làm hôm qua</span>
                    <span className="font-label-mono text-[11px] text-slate-500">
                      Past tense verbs: <em>merged, reviewed</em>
                    </span>
                  </div>
                </div>

                {/* Item 2: Complete */}
                <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-slate-50 border border-slate-200/70">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-sm font-bold">check</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-body-sm text-body-sm text-slate-900 font-semibold">Kế hoạch công việc hôm nay</span>
                    <span className="font-label-mono text-[11px] text-slate-500">Present continuous / current focus</span>
                  </div>
                </div>

                {/* Item 3: Incomplete warning */}
                <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-rose-50 border border-rose-200">
                  <div className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-sm font-bold">priority_high</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-body-sm text-body-sm text-rose-700 font-bold">Báo cáo blocker kỹ thuật rõ âm</span>
                    <span className="font-label-mono text-[11px] text-rose-600 font-medium">
                      Cần phát âm rõ âm đuôi /t/ trong từ "blocked"
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Post-Session Real-time Scorecard */}
            <div className="rounded-xl bg-white border border-slate-200 p-space-md shadow-sm flex flex-col gap-space-md relative overflow-hidden">
              <div className="flex items-center justify-between">
                <h2 className="font-headline-sm text-headline-sm text-slate-900 font-bold">Bảng Chỉ Số Standup</h2>
                <span className="font-label-mono text-label-mono text-indigo-600 font-semibold">Real-time Telemetry</span>
              </div>

              {/* Gauges Row */}
              <div className="grid grid-cols-3 gap-space-xs text-center">
                <div className="flex flex-col items-center p-2 rounded-lg bg-slate-50 border border-slate-200/70">
                  <div className="relative w-14 h-14 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-200"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      ></path>
                      <path
                        className="text-sky-600"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeDasharray="84, 100"
                        strokeLinecap="round"
                        strokeWidth="3"
                      ></path>
                    </svg>
                    <span className="absolute font-headline-sm text-[13px] text-sky-700 font-bold">84%</span>
                  </div>
                  <span className="font-label-mono text-[10px] text-slate-500 font-semibold mt-1">Phát Âm</span>
                </div>

                <div className="flex flex-col items-center p-2 rounded-lg bg-slate-50 border border-slate-200/70">
                  <div className="relative w-14 h-14 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-200"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      ></path>
                      <path
                        className="text-indigo-600"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeDasharray="78, 100"
                        strokeLinecap="round"
                        strokeWidth="3"
                      ></path>
                    </svg>
                    <span className="absolute font-headline-sm text-[13px] text-indigo-700 font-bold">78%</span>
                  </div>
                  <span className="font-label-mono text-[10px] text-slate-500 font-semibold mt-1">Từ Vựng IT</span>
                </div>

                <div className="flex flex-col items-center p-2 rounded-lg bg-slate-50 border border-slate-200/70">
                  <div className="relative w-14 h-14 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-200"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      ></path>
                      <path
                        className="text-emerald-600"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeDasharray="92, 100"
                        strokeLinecap="round"
                        strokeWidth="3"
                      ></path>
                    </svg>
                    <span className="absolute font-headline-sm text-[13px] text-emerald-700 font-bold">92%</span>
                  </div>
                  <span className="font-label-mono text-[10px] text-slate-500 font-semibold mt-1">Ngữ Pháp</span>
                </div>
              </div>

              {/* Silicon Valley Workplace Actionable Coach Suggestion */}
              <div className="p-space-sm rounded-xl bg-sky-50 border border-sky-200 flex flex-col gap-2">
                <div className="flex items-center gap-1.5 text-sky-800 font-label-mono text-label-mono font-bold">
                  <span className="material-symbols-outlined text-base text-sky-600">lightbulb</span>
                  <span>Nâng Cấp Biểu Đạt Tự Nhiên (Native Pro)</span>
                </div>
                <p className="font-body-sm text-body-sm text-slate-700">
                  Thay vì mẫu câu quen thuộc{' '}
                  <span className="text-slate-600 font-mono bg-white px-1.5 py-0.5 rounded border border-sky-100">
                    “I am blocked by...”
                  </span>
                  , Tech Lead chuộng cách nói chủ động xử lý sự cố:
                </p>
                <div className="p-space-sm rounded-lg bg-white border border-sky-200 flex flex-col gap-1">
                  <span className="font-body-sm text-body-sm text-sky-800 font-semibold">
                    “{proPhrase}”
                  </span>
                  <span className="font-body-sm text-[12px] text-slate-500">
                    (Chúng tôi gặp nghẽn hạ tầng bên môi trường thử nghiệm.)
                  </span>
                </div>
                <button aria-label="Phát âm mẫu chuẩn bản ngữ"
                  onClick={() => playSpeech(proPhrase)}
                  className="w-full py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-label-mono text-label-mono flex items-center justify-center gap-1 transition-colors font-semibold shadow-xs cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-sm">record_voice_over</span>
                  <span>Luyện nói cụm nâng cấp này ngay</span>
                </button>
              </div>

              {/* L1 Muscle Tip */}
              <div className="p-space-sm rounded-lg bg-indigo-50/70 border border-indigo-100 flex items-start gap-2">
                <span className="material-symbols-outlined text-indigo-600 text-base mt-0.5">tips_and_updates</span>
                <div className="flex flex-col text-[12px] leading-relaxed text-slate-600">
                  <strong className="text-slate-800">Mẹo cơ miệng cho người Việt:</strong> Đuôi{' '}
                  <code className="bg-white px-1 py-0.5 rounded text-indigo-700 font-mono">-ed</code> sau âm vô thanh{' '}
                  <code className="bg-white px-1 py-0.5 rounded text-indigo-700 font-mono">/k/</code> (như block) phải bật thành gió{' '}
                  <code className="bg-white px-1 py-0.5 rounded text-indigo-700 font-mono">/t/</code> sắc gọn. Chặn hơi đầu lưỡi vào chân răng trên rồi nhả dứt khoát.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
