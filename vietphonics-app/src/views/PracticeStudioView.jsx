import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useRecorder } from '../lib/audio/useRecorder';

export default function PracticeStudioView() {
  const { setActiveTab } = useApp();
  const [selectedWord, setSelectedWord] = useState('six');
  const [showFormantGrid, setShowFormantGrid] = useState(true);
  const [spectrogramOpen, setSpectrogramOpen] = useState(false);
  const [drillMode, setDrillMode] = useState('sentence'); // 'sentence' | 'dictation'
  const [dictationAnswer, setDictationAnswer] = useState('');
  const [dictationChecked, setDictationChecked] = useState(false);

  const { isRecording, start, stop } = useRecorder({ autoAnalyze: true });

  const targetSentence = "Six months ago, she baked fresh bread for breakfast on the street.";

  const playAudio = (text, rate = 1.0) => {
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
    } else {
      await start();
    }
  };

  return (
    <div className="flex flex-col w-full animate-fade-in">
      {/* Interactive State Context & Lab Control Bar */}
      <section className="w-full px-margin md:px-margin-desktop py-space-md">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-space-sm bg-white border border-slate-200/80 p-space-md rounded-xl shadow-sm">
          <div className="flex flex-wrap items-center gap-space-sm">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 font-label-mono text-label-mono font-semibold">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping"></span>
              FORCED ALIGNMENT ENGINE: GOP v5.1
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-label-mono text-label-mono font-semibold">
              <span className="material-symbols-outlined text-sm">mic_external_on</span>
              16kHz Calibrated Telemetry
            </span>
            <span className="text-slate-500 font-label-mono text-label-mono hidden sm:inline">
              Profile: Vietnamese (Hanoi Dialect Bias: /z/ for /d/, coda unreleased)
            </span>
          </div>

          <div className="flex items-center gap-space-sm self-end md:self-auto">
            {/* Dictation Mode Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold mr-1">
              <button
                onClick={() => setDrillMode('sentence')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  drillMode === 'sentence' ? 'bg-white text-sky-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Đối Chiếu Sóng
              </button>
              <button
                onClick={() => setDrillMode('dictation')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  drillMode === 'dictation' ? 'bg-white text-rose-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Chính Tả Âm Đuôi
              </button>
            </div>

            <button
              onClick={() => setShowFormantGrid(!showFormantGrid)}
              className={`px-3.5 py-1.5 rounded-lg border text-slate-700 font-body-sm text-body-sm transition-all flex items-center gap-1.5 shadow-sm font-medium ${
                showFormantGrid ? 'bg-sky-50 border-sky-300 text-sky-800' : 'bg-slate-100 hover:bg-slate-200/80 border-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-base text-sky-600">layers</span>
              <span>{showFormantGrid ? 'Lưới F1-F2: Bật' : 'Bật Lưới Âm Học'}</span>
            </button>
            <span className="px-2.5 py-1 rounded-md bg-rose-50 border border-rose-200 text-rose-700 font-label-mono text-label-mono font-bold">
              SCORE: 78.4%
            </span>
          </div>
        </div>
      </section>

      {/* Dictation Mode Exercise Container if active */}
      {drillMode === 'dictation' && (
        <div className="w-full px-margin md:px-margin-desktop max-w-[1440px] mx-auto mb-space-md">
          <div className="p-space-md bg-gradient-to-r from-rose-50 to-amber-50 border border-rose-200 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => playAudio("Six baked fresh bread", 0.8)}
                className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center hover:bg-rose-700 shadow-md shrink-0 transition-transform active:scale-95"
              >
                <span className="material-symbols-outlined text-2xl">volume_up</span>
              </button>
              <div>
                <h4 className="font-bold text-slate-800">Thử Thách Nghe: Điền âm phụ âm đuôi bị rụng</h4>
                <p className="text-sm text-slate-600">
                  Câu hỏi: <span className="font-mono font-semibold">"Si___ baked fre___ brea___ for breakfast."</span> (Gợi ý: x, sh, d)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <input
                type="text"
                value={dictationAnswer}
                onChange={(e) => setDictationAnswer(e.target.value)}
                placeholder="Nhập âm khuyết (vd: x, sh, d)"
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono w-full md:w-56 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <button
                onClick={() => setDictationChecked(true)}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-lg shadow-sm whitespace-nowrap"
              >
                Kiểm Tra
              </button>
            </div>
            {dictationChecked && (
              <span className="text-emerald-700 font-bold text-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-base">check_circle</span>
                Chính xác! Âm /ks/ và /ʃ/ đã được khôi phục.
              </span>
            )}
          </div>
        </div>
      )}

      {/* Main Acoustic Inspection Grid */}
      <div className="w-full px-margin md:px-margin-desktop space-y-space-lg max-w-[1440px] mx-auto pb-space-xl">
        {/* 1. Target Practice Card (Character-level color coded & Interactive IPA Callouts) */}
        <section className="w-full bg-white rounded-xl p-space-md md:p-space-lg shadow-sm border border-slate-200/80 relative overflow-hidden">
          {/* Glow ambient background */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-rose-100/50 blur-[80px] pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-sky-100/50 blur-[80px] pointer-events-none"></div>

          <div className="flex flex-col md:flex-row md:items-center justify-between pb-space-sm gap-2 border-b border-slate-100 relative z-10">
            <div className="flex items-center gap-2">
              <span className="font-label-mono text-label-mono uppercase text-sky-700 font-bold tracking-wider">Acoustic Token Map</span>
              <span className="text-slate-400 font-label-mono text-label-mono">/ forced_alignment_v4 /</span>
            </div>
            <div className="flex items-center gap-3 font-label-mono text-label-mono font-semibold">
              <span className="flex items-center gap-1.5 text-emerald-700">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span> Chuẩn xác (&gt;90%)
              </span>
              <span className="flex items-center gap-1.5 text-amber-700">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-500"></span> Cảnh báo (60-89%)
              </span>
              <span className="flex items-center gap-1.5 text-rose-700">
                <span className="w-2.5 h-2.5 rounded-sm bg-rose-500"></span> Lỗi nuốt/rụng âm (&lt;60%)
              </span>
            </div>
          </div>

          {/* Phonetic Dissection & Sentence Display */}
          <div className="py-space-md relative z-10">
            <div className="flex items-center justify-between mb-space-sm">
              <h2 className="font-headline-sm text-headline-sm text-slate-700 font-semibold">
                Câu thực hành mục tiêu &amp; Giám định âm học:
              </h2>
              <button
                onClick={() => playAudio(targetSentence, 0.9)}
                className="text-xs font-bold text-sky-700 hover:text-sky-900 bg-sky-50 px-3 py-1.5 rounded-full border border-sky-200 flex items-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">volume_up</span> Nghe toàn câu mẫu
              </button>
            </div>

            {/* Large Display Tiles with Crisp Light Badges */}
            <div className="flex flex-wrap items-end gap-x-3.5 gap-y-6 pt-2 pb-4">
              {/* Word 1: Six */}
              <div
                className={`flex flex-col items-center group cursor-pointer p-1.5 rounded-lg transition-all ${
                  selectedWord === 'six' ? 'bg-rose-50/80 ring-2 ring-rose-400' : 'hover:bg-slate-50'
                }`}
                onClick={() => { setSelectedWord('six'); playAudio('Six'); }}
              >
                <div className="font-ipa-display text-ipa-display tracking-tight text-slate-900 flex items-center font-bold">
                  <span>Si</span>
                  <span className="text-rose-600 bg-rose-100/80 px-1 rounded transition-transform group-hover:scale-110">x</span>
                </div>
                <div className="font-ipa-inline text-ipa-inline text-slate-600 mt-1 px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200 group-hover:bg-slate-200 transition-colors">
                  /sɪ<span className="text-rose-600 font-bold">ks</span>/
                </div>
                <span className="font-label-mono text-[10px] text-rose-600 font-bold mt-1">42% GOP</span>
              </div>

              {/* Word 2: months */}
              <div
                className={`flex flex-col items-center group cursor-pointer p-1.5 rounded-lg transition-all ${
                  selectedWord === 'months' ? 'bg-amber-50/80 ring-2 ring-amber-400' : 'hover:bg-slate-50'
                }`}
                onClick={() => { setSelectedWord('months'); playAudio('months'); }}
              >
                <div className="font-ipa-display text-ipa-display tracking-tight text-slate-900 flex items-center font-bold">
                  <span>mon</span>
                  <span className="text-amber-600 bg-amber-100/80 px-1 rounded transition-transform group-hover:scale-110">ths</span>
                </div>
                <div className="font-ipa-inline text-ipa-inline text-slate-600 mt-1 px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200 group-hover:bg-slate-200 transition-colors">
                  /mʌ<span className="text-amber-600 font-bold">nθs</span>/
                </div>
                <span className="font-label-mono text-[10px] text-amber-600 font-bold mt-1">68% GOP</span>
              </div>

              {/* Word 3: ago, */}
              <div
                className="flex flex-col items-center group cursor-pointer p-1.5 rounded-lg hover:bg-slate-50 transition-all"
                onClick={() => playAudio('ago')}
              >
                <div className="font-ipa-display text-ipa-display tracking-tight text-emerald-600 flex items-center font-bold">
                  <span>ago,</span>
                </div>
                <div className="font-ipa-inline text-ipa-inline text-slate-600 mt-1 px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200 group-hover:bg-slate-200 transition-colors">
                  /əˈɡoʊ/
                </div>
                <span className="font-label-mono text-[10px] text-emerald-600 font-bold mt-1">94% GOP</span>
              </div>

              {/* Word 4: she */}
              <div
                className="flex flex-col items-center group cursor-pointer p-1.5 rounded-lg hover:bg-slate-50 transition-all"
                onClick={() => playAudio('she')}
              >
                <div className="font-ipa-display text-ipa-display tracking-tight text-emerald-600 flex items-center font-bold">
                  <span>she</span>
                </div>
                <div className="font-ipa-inline text-ipa-inline text-slate-600 mt-1 px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200 group-hover:bg-slate-200 transition-colors">
                  /ʃiː/
                </div>
                <span className="font-label-mono text-[10px] text-emerald-600 font-bold mt-1">98% GOP</span>
              </div>

              {/* Word 5: baked */}
              <div
                className={`flex flex-col items-center group cursor-pointer p-1.5 rounded-lg transition-all ${
                  selectedWord === 'baked' ? 'bg-rose-50/80 ring-2 ring-rose-400' : 'hover:bg-slate-50'
                }`}
                onClick={() => { setSelectedWord('baked'); playAudio('baked'); }}
              >
                <div className="font-ipa-display text-ipa-display tracking-tight text-slate-900 flex items-center font-bold">
                  <span>bak</span>
                  <span className="text-rose-600 bg-rose-100/80 px-1 rounded transition-transform group-hover:scale-110">ed</span>
                </div>
                <div className="font-ipa-inline text-ipa-inline text-slate-600 mt-1 px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200 group-hover:bg-slate-200 transition-colors">
                  /beɪk<span className="text-rose-600 font-bold">t</span>/
                </div>
                <span className="font-label-mono text-[10px] text-rose-600 font-bold mt-1">39% GOP</span>
              </div>

              {/* Word 6: fresh */}
              <div
                className={`flex flex-col items-center group cursor-pointer p-1.5 rounded-lg transition-all ${
                  selectedWord === 'fresh' ? 'bg-emerald-50/80 ring-2 ring-emerald-400' : 'hover:bg-slate-50'
                }`}
                onClick={() => { setSelectedWord('fresh'); playAudio('fresh'); }}
              >
                <div className="font-ipa-display text-ipa-display tracking-tight text-slate-900 flex items-center font-bold">
                  <span>fre</span>
                  <span className="text-emerald-600 bg-emerald-100/80 px-1 rounded transition-transform group-hover:scale-110">sh</span>
                </div>
                <div className="font-ipa-inline text-ipa-inline text-emerald-700 mt-1 px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 font-bold">
                  /fre<span className="underline">ʃ</span>/
                </div>
                <span className="font-label-mono text-[10px] text-emerald-600 font-bold mt-1">96% GOP</span>
              </div>

              {/* Word 7: bread */}
              <div
                className="flex flex-col items-center group cursor-pointer p-1.5 rounded-lg hover:bg-slate-50 transition-all"
                onClick={() => playAudio('bread')}
              >
                <div className="font-ipa-display text-ipa-display tracking-tight text-emerald-600 flex items-center font-bold">
                  <span>bread</span>
                </div>
                <div className="font-ipa-inline text-ipa-inline text-slate-600 mt-1 px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200">
                  /bred/
                </div>
                <span className="font-label-mono text-[10px] text-emerald-600 font-bold mt-1">91% GOP</span>
              </div>

              {/* Word 8: for */}
              <div
                className="flex flex-col items-center group cursor-pointer p-1.5 rounded-lg hover:bg-slate-50 transition-all"
                onClick={() => playAudio('for')}
              >
                <div className="font-ipa-display text-ipa-display tracking-tight text-slate-900 font-bold">for</div>
                <div className="font-ipa-inline text-ipa-inline text-slate-600 mt-1 px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200">/fər/</div>
                <span className="font-label-mono text-[10px] text-emerald-600 font-bold mt-1">95% GOP</span>
              </div>

              {/* Word 9: breakfast */}
              <div
                className={`flex flex-col items-center group cursor-pointer relative p-1.5 rounded-lg transition-all ${
                  selectedWord === 'breakfast' ? 'bg-amber-50/80 ring-2 ring-amber-400' : 'hover:bg-slate-50'
                }`}
                onClick={() => { setSelectedWord('breakfast'); playAudio('breakfast'); }}
              >
                <span className="absolute -top-3.5 right-0 px-2 py-0.5 rounded-full bg-sky-600 text-white font-label-mono text-[9px] font-bold shadow-sm">Pause 1.3s</span>
                <div className="font-ipa-display text-ipa-display tracking-tight text-slate-900 font-bold">
                  <span>breakfas</span>
                  <span className="text-amber-600 bg-amber-100/80 px-0.5 rounded">t</span>
                </div>
                <div className="font-ipa-inline text-ipa-inline text-slate-600 mt-1 px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200">
                  /ˈbrekfəst/
                </div>
                <span className="font-label-mono text-[10px] text-amber-600 font-bold mt-1">72% GOP</span>
              </div>

              {/* Word 10: on */}
              <div className="flex flex-col items-center group cursor-pointer p-1.5 rounded-lg hover:bg-slate-50" onClick={() => playAudio('on')}>
                <div className="font-ipa-display text-ipa-display tracking-tight text-slate-900 font-bold">on</div>
                <div className="font-ipa-inline text-ipa-inline text-slate-600 mt-1 px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200">/ɑːn/</div>
                <span className="font-label-mono text-[10px] text-emerald-600 font-bold mt-1">97% GOP</span>
              </div>

              {/* Word 11: the */}
              <div className="flex flex-col items-center group cursor-pointer p-1.5 rounded-lg hover:bg-slate-50" onClick={() => playAudio('the')}>
                <div className="font-ipa-display text-ipa-display tracking-tight text-slate-900 font-bold">the</div>
                <div className="font-ipa-inline text-ipa-inline text-slate-600 mt-1 px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200">/ðə/</div>
                <span className="font-label-mono text-[10px] text-emerald-600 font-bold mt-1">92% GOP</span>
              </div>

              {/* Word 12: street. */}
              <div className="flex flex-col items-center group cursor-pointer p-1.5 rounded-lg hover:bg-slate-50" onClick={() => playAudio('street')}>
                <div className="font-ipa-display text-ipa-display tracking-tight text-slate-900 flex items-center font-bold">
                  <span>stree</span>
                  <span className="text-rose-600 bg-rose-100/80 px-0.5 rounded">t.</span>
                </div>
                <div className="font-ipa-inline text-ipa-inline text-slate-600 mt-1 px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200">
                  /striː<span className="text-rose-600 font-bold">t</span>/
                </div>
                <span className="font-label-mono text-[10px] text-rose-600 font-bold mt-1">54% GOP</span>
              </div>
            </div>
          </div>

          {/* Interactive Missing Ending Sound Callout Flags & Badges */}
          <div className="mt-space-sm pt-space-sm bg-slate-50 border border-slate-200/80 rounded-xl p-space-md grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-sm relative z-10">
            {/* Callout 1: Six */}
            <div className="p-space-sm rounded-lg bg-rose-50/80 border border-rose-200 text-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-ipa-inline text-ipa-inline font-bold text-rose-700">/ks/ coda in "Six"</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-label-mono bg-rose-600 text-white font-bold">CRITICAL</span>
                </div>
                <p className="font-body-sm text-body-sm text-slate-700">
                  ⚠️ <strong className="text-rose-700">Rụng âm đuôi /ks/!</strong> Bạn nói thành <span className="font-ipa-inline text-rose-900 font-bold">/sɪ/</span> (lỗi nuốt âm điển hình của người Việt).
                </p>
              </div>
              <div className="mt-2 pt-2 border-t border-rose-200/60 flex items-center justify-between text-slate-500 font-label-mono text-[10px]">
                <span>Acoustic Burst: 0.0ms</span>
                <button
                  onClick={() => playAudio('six', 0.6)}
                  className="text-sky-700 hover:text-sky-900 hover:underline flex items-center gap-0.5 font-body-sm font-semibold"
                >
                  <span className="material-symbols-outlined text-xs">volume_up</span> Nghe bù âm
                </button>
              </div>
            </div>

            {/* Callout 2: baked */}
            <div className="p-space-sm rounded-lg bg-rose-50/80 border border-rose-200 text-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-ipa-inline text-ipa-inline font-bold text-rose-700">/t/ coda in "baked"</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-label-mono bg-rose-600 text-white font-bold">ERROR</span>
                </div>
                <p className="font-body-sm text-body-sm text-slate-700">
                  ⚠️ <strong className="text-rose-700">Quên bật âm /t/ đuôi!</strong> Đừng đọc là "bây-kơ" hay "bếc", chặn luồng hơi rồi bật nhẹ đầu lưỡi.
                </p>
              </div>
              <div className="mt-2 pt-2 border-t border-rose-200/60 flex items-center justify-between text-slate-500 font-label-mono text-[10px]">
                <span>Stop-Consonant Void</span>
                <button
                  onClick={() => setActiveTab('khau-hinh-2d')}
                  className="text-sky-700 hover:text-sky-900 hover:underline flex items-center gap-0.5 font-body-sm font-semibold"
                >
                  <span className="material-symbols-outlined text-xs">play_arrow</span> Xem khẩu hình
                </button>
              </div>
            </div>

            {/* Callout 3: fresh */}
            <div className="p-space-sm rounded-lg bg-emerald-50/80 border border-emerald-200 text-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-ipa-inline text-ipa-inline font-bold text-emerald-700">/ʃ/ palato-alveolar in "fresh"</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-label-mono bg-emerald-600 text-white font-bold">PERFECT</span>
                </div>
                <p className="font-body-sm text-body-sm text-slate-700">
                  ✅ <strong className="text-emerald-700">Chu môi âm /ʃ/ chuẩn xác (96% GOP).</strong> Luồng khí xát đồng nhất, cộng hưởng vòm họng cực tốt.
                </p>
              </div>
              <div className="mt-2 pt-2 border-t border-emerald-200/60 flex items-center justify-between text-slate-500 font-label-mono text-[10px]">
                <span>Spectral Peak: 4.8kHz</span>
                <span className="text-emerald-700 font-bold">+15 XP Mastery</span>
              </div>
            </div>

            {/* Callout 4: months */}
            <div className="p-space-sm rounded-lg bg-amber-50/80 border border-amber-200 text-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-ipa-inline text-ipa-inline font-bold text-amber-700">Cluster /nθs/ in "months"</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-label-mono bg-amber-500 text-white font-bold">WARNING</span>
                </div>
                <p className="font-body-sm text-body-sm text-slate-700">
                  ⚠️ <strong className="text-amber-700">Cụm /nθs/ bị nuốt âm giữa!</strong> Đầu lưỡi chưa đặt giữa hai răng trước khi trượt sang âm xát /s/.
                </p>
              </div>
              <div className="mt-2 pt-2 border-t border-amber-200/60 flex items-center justify-between text-slate-500 font-label-mono text-[10px]">
                <span>Missing Dental Transition</span>
                <button
                  onClick={() => playAudio('months', 0.5)}
                  className="text-sky-700 hover:text-sky-900 hover:underline flex items-center gap-0.5 font-body-sm font-semibold"
                >
                  <span className="material-symbols-outlined text-xs">slow_motion_video</span> Tập chậm 0.5x
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Dual Telemetry Instrumentation Bar (Fluency Speedometer & Pause/Filler Monitor) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
          {/* Gauge A: Tốc Độ Nói (Speech Fluency WPM Speedometer) [Col 7] */}
          <div className="lg:col-span-7 bg-white rounded-xl p-space-md shadow-sm border border-slate-200/80 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-space-sm border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sky-600 text-xl">speed</span>
                <h3 className="font-headline-sm text-headline-sm text-slate-800 font-bold">Tốc Độ &amp; Độ Lưu Loát (Fluency Meter)</h3>
              </div>
              <span className="font-label-mono text-label-mono px-2.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 font-semibold">
                Optimal: 120-150 WPM
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-space-md items-center py-3">
              {/* Semicircular SVG Gauge */}
              <div className="sm:col-span-6 flex flex-col items-center justify-center relative">
                <svg className="w-52 h-28 overflow-visible" viewBox="0 0 200 110">
                  {/* Background Arc */}
                  <path className="text-slate-200" d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="16"></path>
                  {/* Safe Target Zone Highlight (120-150 WPM zone) */}
                  <path className="text-sky-200" d="M 96 20.8 A 80 80 0 0 1 155 48" fill="none" stroke="currentColor" strokeWidth="16"></path>
                  {/* Active Progress Arc for 138 WPM (138/200 = 69% of arc) */}
                  <path className="text-sky-500 shadow-sm" d="M 20 100 A 80 80 0 0 1 146 38" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="16"></path>
                  {/* Needle Indicator */}
                  <circle className="text-slate-800" cx="100" cy="100" fill="currentColor" r="7"></circle>
                  <line className="text-slate-800" stroke="currentColor" strokeLinecap="round" strokeWidth="3.5" x1="100" x2="142" y1="100" y2="42"></line>
                </svg>
                <div className="-mt-4 text-center">
                  <span className="font-display-hero text-headline-lg font-extrabold text-slate-900">138</span>
                  <span className="font-label-mono text-label-mono text-sky-700 ml-1 uppercase font-bold">WPM</span>
                </div>
              </div>

              {/* Gauge Metrics & Vietnamese Status Badge */}
              <div className="sm:col-span-6 flex flex-col gap-space-xs">
                <div className="p-space-sm rounded-lg bg-sky-50/70 border border-sky-100">
                  <div className="flex items-center gap-1.5 text-sky-800 font-label-mono text-label-mono mb-1 font-bold">
                    <span className="material-symbols-outlined text-sm text-sky-600">verified</span>
                    ĐÁNH GIÁ CHUẨN THỜI GIAN
                  </div>
                  <p className="font-body-md text-body-md text-slate-800 font-semibold leading-snug">
                    Nhịp điệu tự nhiên, không bị ngắt quãng từng từ
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-center">
                    <span className="font-label-mono text-[10px] text-slate-500 block uppercase font-semibold">Phát âm thực</span>
                    <span className="font-headline-sm text-body-lg text-rose-600 font-bold">3.2 giây</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-center">
                    <span className="font-label-mono text-[10px] text-slate-500 block uppercase font-semibold">Tỉ lệ nghỉ (Pause)</span>
                    <span className="font-headline-sm text-body-lg text-sky-700 font-bold">18.2%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-slate-500 font-label-mono text-label-mono pt-2 border-t border-slate-100">
              <span>0 WPM (Rời rạc)</span>
              <span className="text-sky-700 font-semibold">● Conversational Tempo (120-150)</span>
              <span>220+ WPM (Quá vội)</span>
            </div>
          </div>

          {/* Gauge B: Bắt Từ Đệm & Quãng Ngập Ngừng (Pause & Filler Monitor) [Col 5] */}
          <div className="lg:col-span-5 bg-white rounded-xl p-space-md shadow-sm border border-slate-200/80 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-space-sm border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-rose-600 text-xl">timer_pause</span>
                <h3 className="font-headline-sm text-headline-sm text-slate-800 font-bold">Giám Sát Quãng Ngắt &amp; Đệm</h3>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
            </div>

            <div className="space-y-space-sm py-2">
              {/* Counter Pill 1: Fillers */}
              <div className="flex items-center justify-between p-space-sm rounded-lg bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-space-sm">
                  <div className="w-9 h-9 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">record_voice_over</span>
                  </div>
                  <div>
                    <span className="font-body-md text-body-md font-semibold text-slate-800 block">Từ đệm (Hesitation Tokens)</span>
                    <span className="font-label-mono text-label-mono text-slate-500">"um", "uh", "ờ", "à"</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-headline-md text-headline-md font-bold text-emerald-600">0</span>
                  <span className="font-label-mono text-[10px] text-slate-500 block uppercase font-semibold">Lần</span>
                </div>
              </div>

              {/* Counter Pill 2: Pauses */}
              <div className="flex items-center justify-between p-space-sm rounded-lg bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-space-sm">
                  <div className="w-9 h-9 rounded-md bg-amber-100 text-amber-700 flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">hourglass_empty</span>
                  </div>
                  <div>
                    <span className="font-body-md text-body-md font-semibold text-slate-800 block">Quãng khựng &gt; 1.2s</span>
                    <span className="font-label-mono text-label-mono text-slate-500">Vị trí: sau từ "breakfast" (1.32s)</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-headline-md text-headline-md font-bold text-amber-600">1</span>
                  <span className="font-label-mono text-[10px] text-slate-500 block uppercase font-semibold">Lần</span>
                </div>
              </div>
            </div>

            {/* Telemetry Summary */}
            <div className="p-2.5 rounded-lg bg-slate-100/80 border border-slate-200/60 flex items-center justify-between">
              <span className="font-body-sm text-body-sm text-slate-600 font-medium">Tác động nhịp điệu người nghe:</span>
              <span className="font-label-mono text-label-mono text-sky-800 font-bold">Rất Ít Ảnh Hưởng (-0.2pt)</span>
            </div>
          </div>
        </section>

        {/* 3. Suprasegmental Pitch & Sentence Intonation Melody Canvas */}
        <section className="w-full bg-white rounded-xl p-space-md md:p-space-lg shadow-sm border border-slate-200/80 relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm pb-space-md border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-indigo-600">graphic_eq</span>
                <h3 className="font-headline-md text-headline-md text-slate-800 font-bold">Đường Cong Cao Độ &amp; Ngữ Điệu Suprasegmental</h3>
              </div>
              <p className="font-body-sm text-body-sm text-slate-500 mt-0.5">
                F0 Fundamental Frequency Tracking (Hz) trên trục thời gian ngữ lưu
              </p>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-space-md font-label-mono text-label-mono bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="w-4 h-0.5 bg-sky-600 border-b-2 border-dashed border-sky-600"></span>
                <span className="text-sky-800 font-bold">Giọng Mẫu Chuẩn Bản Ngữ (General US)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-0.5 bg-rose-600"></span>
                <span className="text-rose-700 font-bold">Giọng Của Bạn (L1 Vietnamese Pitch)</span>
              </div>
            </div>
          </div>

          {/* High-Fidelity SVG Acoustic Intonation Canvas */}
          <div className="relative w-full h-72 bg-slate-50/70 border border-slate-200/80 rounded-xl overflow-hidden p-2 mt-4">
            {/* Frequency and Time Axis Labels */}
            <div className="absolute left-2 top-2 bottom-6 flex flex-col justify-between font-label-mono text-[10px] text-slate-400 select-none pointer-events-none font-semibold">
              <span>350 Hz (High)</span>
              <span>260 Hz</span>
              <span>170 Hz (Mid)</span>
              <span>80 Hz (Chest)</span>
            </div>
            <div className="absolute bottom-1.5 left-16 right-4 flex justify-between font-label-mono text-[10px] text-slate-400 select-none pointer-events-none font-semibold">
              <span>0.0s</span>
              <span>0.8s</span>
              <span>1.6s</span>
              <span>2.4s</span>
              <span>3.2s</span>
              <span>4.2s</span>
            </div>

            {/* Sub-grid gridlines */}
            <svg className="w-full h-full pl-14 pb-5 pr-2 pt-2" preserveAspectRatio="none" viewBox="0 0 1000 240">
              <defs>
                <linearGradient id="userPitchGlowLight" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#e11d48" stopOpacity="0.18"></stop>
                  <stop offset="100%" stopColor="#e11d48" stopOpacity="0.0"></stop>
                </linearGradient>
                <linearGradient id="nativePitchGlowLight" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.14"></stop>
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0"></stop>
                </linearGradient>
              </defs>

              {/* Horizontal reference lines */}
              {showFormantGrid && (
                <>
                  <line stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="1000" y1="30" y2="30"></line>
                  <line stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="1000" y1="90" y2="90"></line>
                  <line stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="1000" y1="150" y2="150"></line>
                  <line stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="1000" y1="210" y2="210"></line>
                </>
              )}

              {/* Word Alignment Timeline Slices */}
              <g className="font-label-mono text-[9px] fill-slate-400 font-semibold">
                <text x="30" y="235">Six</text>
                <text x="120" y="235">months</text>
                <text x="210" y="235">ago,</text>
                <text x="300" y="235">she</text>
                <text x="390" y="235">baked</text>
                <text x="490" y="235">fresh</text>
                <text x="580" y="235">bread</text>
                <text x="660" y="235">for</text>
                <text x="730" y="235">breakfast</text>
                <text x="840" y="235">on the</text>
                <text x="930" y="235">street.</text>
              </g>

              {/* Area beneath Native Pitch */}
              <path d="M 20 140 Q 70 80, 130 110 T 230 70 T 320 120 T 420 85 T 510 65 T 600 100 T 700 130 T 800 90 T 900 130 T 980 155 L 980 230 L 20 230 Z" fill="url(#nativePitchGlowLight)"></path>
              {/* Native Reference Pitch Curve: Vibrant Electric Cyan dashed curve */}
              <path d="M 20 140 Q 70 80, 130 110 T 230 70 T 320 120 T 420 85 T 510 65 T 600 100 T 700 130 T 800 90 T 900 130 T 980 155" fill="none" stroke="#0284c7" strokeDasharray="6 4" strokeLinecap="round" strokeWidth="3"></path>

              {/* Area beneath User Pitch */}
              <path d="M 20 155 Q 70 70, 130 125 T 230 115 T 320 130 T 420 95 T 510 75 T 600 110 T 700 180 T 800 140 T 900 170 T 980 215 L 980 230 L 20 230 Z" fill="url(#userPitchGlowLight)"></path>
              {/* User Spoken Pitch Curve: Bold Rose curve */}
              <path d="M 20 155 Q 70 70, 130 125 T 230 115 T 320 130 T 420 95 T 510 75 T 600 110 T 700 180 T 800 140 T 900 170 T 980 215" fill="none" stroke="#e11d48" strokeLinecap="round" strokeWidth="3.5"></path>

              {/* Diagnostic Highlight Marker at the sentence drop-off */}
              <g className="animate-bounce">
                <circle cx="975" cy="215" fill="#ef4444" r="5"></circle>
                <circle cx="975" cy="215" fill="none" opacity="0.75" r="9" stroke="#ef4444" strokeWidth="1.5"></circle>
              </g>
            </svg>

            {/* Dynamic Pitch Hover Tag */}
            <div className="absolute top-4 right-4 bg-white/95 border border-slate-200/80 shadow-md backdrop-blur-md px-3.5 py-2 rounded-lg text-left hidden sm:block">
              <span className="font-label-mono text-[10px] text-sky-700 block font-bold">DELTA: -42 Hz tại âm cuối /iːt/</span>
              <span className="font-body-sm text-[11px] text-slate-700">Độ dốc thanh âm giảm đột ngột do thói quen hạ thanh điệu tiếng Việt</span>
            </div>
          </div>

          {/* Diagnostic Alert Box */}
          <div className="mt-space-md p-space-md rounded-xl bg-sky-50/60 border border-sky-200/70 flex items-start gap-space-sm shadow-sm">
            <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center shrink-0 text-sky-700 mt-0.5">
              <span className="material-symbols-outlined text-lg">lightbulb</span>
            </div>
            <div className="space-y-1">
              <h4 className="font-body-md text-body-md font-bold text-sky-800">
                💡 Ngữ Điệu Câu Hỏi / Trọng Âm (Intonation Transfer Diagnostic):
              </h4>
              <p className="font-body-md text-body-md text-slate-700 leading-relaxed">
                Cao độ của bạn bị rơi xuống ở cuối câu thay vì giữ nhịp đều. Hãy thả lỏng thanh quản và hạ nhẹ âm cuối! Trong câu kể tiếng Anh, ngữ điệu hạ (falling intonation) nên diễn ra từ từ trên hạt nhân thanh mẫu cuối cùng, tránh ngắt dốc làm người nghe cảm giác bạn bị đứt hơi hoặc mang thanh Nặng (.).
              </p>
            </div>
          </div>
        </section>

        {/* 4. Bottom Recording Dock & Live Audio Visualizer */}
        <section className="w-full bg-white rounded-2xl p-space-md md:p-space-lg shadow-md border border-slate-200/80 relative overflow-hidden">
          <div className="flex flex-col xl:flex-row items-center justify-between gap-space-lg">
            {/* Live Waveform Visualizer Area (28 animated equalizer bars) */}
            <div className="w-full xl:w-2/5 flex flex-col gap-2">
              <div className="flex items-center justify-between font-label-mono text-label-mono">
                <span className="text-sky-700 flex items-center gap-1.5 font-bold">
                  <span className={`w-2 h-2 rounded-full ${isRecording ? 'bg-rose-500 animate-ping' : 'bg-emerald-500'}`}></span>
                  {isRecording ? 'REAL-TIME 16kHz MONO CAPTURE' : 'STANDBY 16kHz AI READY'}
                </span>
                <span className="text-slate-400 font-semibold">BUFFER: 512 SAMPLES</span>
              </div>

              {/* 28 animated equalizer bars */}
              <div className="h-16 bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 flex items-end justify-between gap-1 overflow-hidden">
                <div className={`w-full bg-sky-400 rounded-t-sm h-3 ${isRecording ? 'animate-pulse' : ''}`}></div>
                <div className={`w-full bg-sky-500 rounded-t-sm ${isRecording ? 'h-10 animate-pulse' : 'h-7'}`}></div>
                <div className={`w-full bg-rose-500 rounded-t-sm ${isRecording ? 'h-14 animate-pulse' : 'h-12'}`}></div>
                <div className="w-full bg-rose-600 rounded-t-sm h-10 animate-pulse"></div>
                <div className="w-full bg-rose-400 rounded-t-sm h-5"></div>
                <div className="w-full bg-sky-400 rounded-t-sm h-8"></div>
                <div className="w-full bg-sky-600 rounded-t-sm h-14"></div>
                <div className="w-full bg-sky-500 rounded-t-sm h-11"></div>
                <div className="w-full bg-rose-500 rounded-t-sm h-9"></div>
                <div className="w-full bg-rose-600 rounded-t-sm h-16 animate-pulse"></div>
                <div className="w-full bg-rose-400 rounded-t-sm h-13"></div>
                <div className="w-full bg-sky-400 rounded-t-sm h-7"></div>
                <div className="w-full bg-sky-500 rounded-t-sm h-12"></div>
                <div className="w-full bg-sky-600 rounded-t-sm h-15"></div>
                <div className="w-full bg-rose-600 rounded-t-sm h-14"></div>
                <div className="w-full bg-rose-500 rounded-t-sm h-10 animate-pulse"></div>
                <div className="w-full bg-rose-400 rounded-t-sm h-6"></div>
                <div className="w-full bg-sky-400 rounded-t-sm h-11"></div>
                <div className="w-full bg-sky-600 rounded-t-sm h-13"></div>
                <div className="w-full bg-sky-500 rounded-t-sm h-8"></div>
                <div className="w-full bg-rose-500 rounded-t-sm h-14"></div>
                <div className="w-full bg-rose-600 rounded-t-sm h-11"></div>
                <div className="w-full bg-sky-400 rounded-t-sm h-6"></div>
                <div className="w-full bg-sky-500 rounded-t-sm h-9 animate-pulse"></div>
                <div className="w-full bg-rose-400 rounded-t-sm h-4"></div>
                <div className="w-full bg-rose-500 rounded-t-sm h-7"></div>
                <div className="w-full bg-sky-600 rounded-t-sm h-5"></div>
                <div className="w-full bg-sky-400 rounded-t-sm h-2"></div>
              </div>
            </div>

            {/* Giant Glowing Pulsing Microphone Centerpiece */}
            <div className="flex flex-col items-center justify-center relative py-2">
              {/* Outer Pulsing Neon Rings */}
              {isRecording ? (
                <>
                  <div className="absolute w-28 h-28 rounded-full bg-rose-500/30 animate-ping pointer-events-none"></div>
                  <div className="absolute w-24 h-24 rounded-full bg-sky-500/25 animate-pulse pointer-events-none"></div>
                </>
              ) : null}

              {/* Circular 72px pill-shaped button */}
              <button
                onClick={handleMicToggle}
                className={`relative z-10 w-20 h-20 rounded-full transition-all duration-300 flex items-center justify-center text-white shadow-lg cursor-pointer ${
                  isRecording
                    ? 'bg-rose-600 ring-4 ring-rose-300 animate-pulse scale-105'
                    : 'bg-gradient-to-tr from-rose-600 to-rose-500 hover:shadow-[0_0_32px_rgba(225,29,72,0.45)] active:scale-95'
                }`}
              >
                <span className="material-symbols-outlined text-4xl">
                  {isRecording ? 'stop' : 'mic'}
                </span>
              </button>
              <span className="font-label-mono text-label-mono text-slate-800 mt-2 font-bold tracking-wider uppercase">
                {isRecording ? '● Đang Ghi Âm Lọc Ồn AI' : 'Nhấn Để Ghi Âm Luyện Phát Âm'}
              </span>
            </div>

            {/* Action Control Buttons */}
            <div className="w-full xl:w-2/5 flex flex-wrap items-center justify-center xl:justify-end gap-space-sm">
              {/* Button 1: Sample Native Audio */}
              <button
                onClick={() => playAudio(targetSentence, 1.0)}
                className="px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-sky-700 font-body-sm text-body-sm transition-all flex items-center gap-2 shadow-sm font-semibold"
              >
                <span className="material-symbols-outlined text-lg">volume_up</span>
                <span>🔊 Nghe Giọng Bản Ngữ (Oxford US)</span>
              </button>

              {/* Button 2: Re-record */}
              <button
                onClick={handleMicToggle}
                className="px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-body-sm text-body-sm transition-all flex items-center gap-2 shadow-sm font-semibold"
              >
                <span className="material-symbols-outlined text-lg text-rose-600">replay</span>
                <span>🔄 {isRecording ? 'Dừng Ghi Âm' : 'Ghi Âm Lại'}</span>
              </button>

              {/* Button 3: Spectrogram View */}
              <button
                onClick={() => setSpectrogramOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-body-sm text-body-sm transition-all flex items-center gap-2 shadow-sm font-semibold"
              >
                <span className="material-symbols-outlined text-lg text-indigo-600">waterfall_chart</span>
                <span>📊 Xem Phổ Ký Spectrogram</span>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Spectrogram Drawer Modal Layer */}
      {spectrogramOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex flex-col justify-end">
          <div className="w-full max-w-[1440px] mx-auto bg-white rounded-t-2xl p-space-lg shadow-2xl flex flex-col gap-space-md max-h-[870px] overflow-y-auto border-t border-slate-200">
            <div className="flex items-center justify-between pb-space-sm border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-indigo-600 text-2xl">waterfall_chart</span>
                <div>
                  <h3 className="font-headline-md text-headline-md text-slate-900 font-bold">Phổ Ký Âm Học (Narrow-Band Formant Spectrogram)</h3>
                  <p className="font-body-sm text-body-sm text-slate-500">Phân rã Formant F1 (độ mở miệng) &amp; F2 (vị trí lưỡi trước/sau) đối chiếu với chuẩn Oxford US</p>
                </div>
              </div>
              <button
                onClick={() => setSpectrogramOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Spectrogram Comparison Canvas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              {/* Reference Oxford US Spectrogram */}
              <div className="p-space-sm rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between font-label-mono text-label-mono text-sky-800 font-bold mb-2">
                  <span>TARGET: Native Speaker Spectrogram (44.1kHz)</span>
                  <span className="text-emerald-700">Clear Voiceless Plosive Burst</span>
                </div>
                <div className="h-44 w-full bg-gradient-to-b from-sky-100/90 via-sky-50 to-white border border-sky-200 rounded-lg relative overflow-hidden flex flex-col justify-between p-2">
                  <div className="flex justify-between font-label-mono text-[9px] text-sky-800 font-bold">
                    <span>8000 Hz</span>
                    <span>Turbulent Fricative Energy (/s/, /ʃ/)</span>
                  </div>
                  <div className="w-full flex items-center justify-around h-16 opacity-85">
                    <span className="w-3 h-8 bg-sky-400 rounded-full blur-[2px]"></span>
                    <span className="w-4 h-14 bg-sky-500 rounded-full blur-[1px]"></span>
                    <span className="w-2 h-6 bg-sky-300 rounded-full"></span>
                    <span className="w-6 h-12 bg-sky-600 rounded-full blur-[2px]"></span>
                    <span className="w-8 h-16 bg-sky-500 rounded-full blur-[3px]"></span>
                  </div>
                  <div className="flex justify-between font-label-mono text-[9px] text-slate-500 font-semibold">
                    <span>0 Hz</span>
                    <span>F1/F2 Formant Bands (Stable)</span>
                  </div>
                </div>
              </div>

              {/* Learner Vietnamese Acoustic Capture */}
              <div className="p-space-sm rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between font-label-mono text-label-mono text-rose-800 font-bold mb-2">
                  <span>RECORDED: User Phonetic Heatmap</span>
                  <span className="text-rose-600 font-bold">Missing High-Freq Energy at Coda</span>
                </div>
                <div className="h-44 w-full bg-gradient-to-b from-rose-100/90 via-rose-50 to-white border border-rose-200 rounded-lg relative overflow-hidden flex flex-col justify-between p-2">
                  <div className="flex justify-between font-label-mono text-[9px] text-rose-800 font-bold">
                    <span>8000 Hz</span>
                    <span>Cut-off at 4200 Hz (Âm đuôi bị rụng)</span>
                  </div>
                  <div className="w-full flex items-center justify-around h-16 opacity-85">
                    <span className="w-3 h-6 bg-rose-300 rounded-full blur-[2px]"></span>
                    <span className="w-4 h-9 bg-rose-500 rounded-full blur-[2px]"></span>
                    <span className="w-2 h-2 bg-rose-200 rounded-full"></span>
                    <span className="w-6 h-10 bg-rose-600 rounded-full blur-[2px]"></span>
                    <span className="w-8 h-6 bg-rose-400 rounded-full blur-[4px]"></span>
                  </div>
                  <div className="flex justify-between font-label-mono text-[9px] text-slate-500 font-semibold">
                    <span>0 Hz</span>
                    <span>Glottal Stop Abrupt Decay</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action advice */}
            <div className="p-space-sm rounded-lg bg-slate-50 border border-slate-200 text-body-sm font-body-sm text-slate-800 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sky-600">tips_and_updates</span>
                <strong>Khuyến nghị âm học:</strong> Giữ áp lực khí tại vòm miệng sau để âm /t/ nén đủ động năng trước khi xả âm.
              </span>
              <button
                onClick={() => setSpectrogramOpen(false)}
                className="px-4 py-1.5 bg-rose-600 text-white rounded-lg font-bold text-xs hover:bg-rose-700 shadow-sm"
              >
                Đã Hiểu &amp; Luyện Tập Tiếp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
