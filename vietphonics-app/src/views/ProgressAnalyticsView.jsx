import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function ProgressAnalyticsView() {
  const { gopScore, streak, shields, dialectConfig } = useApp();
  const [activeSubTab, setActiveSubTab] = useState('ipa-matrix'); // 'ipa-matrix' | 'formant-bio' | 'golden-speaker' | 'journal'
  const [selectedAccent, setSelectedAccent] = useState('us'); // 'us' | 'uk' | 'aus'
  const [journalText, setJournalText] = useState('');
  const [isRecordingJournal, setIsRecordingJournal] = useState(false);
  const [journalLogs, setJournalLogs] = useState([
    {
      id: 'log-1',
      date: 'Hôm nay, 10:15 AM',
      topic: 'Kể về kế hoạch cuối tuần',
      duration: '45 giây',
      gop: 79,
      intelligibility: '94% (Người bản ngữ hiểu hoàn toàn)'
    }
  ]);

  const ipaVowels = [
    { symbol: '/iː/', word: 'see', gop: 92, status: 'mastered' },
    { symbol: '/ɪ/', word: 'sit', gop: 71, status: 'practicing' },
    { symbol: '/e/', word: 'bed', gop: 88, status: 'mastered' },
    { symbol: '/æ/', word: 'cat', gop: 64, status: 'focus' },
    { symbol: '/ɑː/', word: 'car', gop: 85, status: 'mastered' },
    { symbol: '/ɒ/', word: 'hot', gop: 78, status: 'practicing' },
    { symbol: '/ɔː/', word: 'door', gop: 83, status: 'mastered' },
    { symbol: '/ʊ/', word: 'put', gop: 70, status: 'practicing' },
    { symbol: '/uː/', word: 'too', gop: 90, status: 'mastered' },
    { symbol: '/ʌ/', word: 'cup', gop: 72, status: 'practicing' },
    { symbol: '/ɜː/', word: 'bird', gop: 68, status: 'focus' },
    { symbol: '/ə/', word: 'about', gop: 86, status: 'mastered' }
  ];

  const ipaConsonants = [
    { symbol: '/θ/', word: 'think', gop: 58, status: 'focus' },
    { symbol: '/ð/', word: 'this', gop: 61, status: 'focus' },
    { symbol: '/ʃ/', word: 'she', gop: 96, status: 'mastered' },
    { symbol: '/ʒ/', word: 'vision', gop: 65, status: 'focus' },
    { symbol: '/ks/', word: 'six', gop: 52, status: 'focus' },
    { symbol: '/t/', word: 'cat', gop: 78, status: 'practicing' },
    { symbol: '/d/', word: 'dog', gop: 84, status: 'mastered' },
    { symbol: '/ŋ/', word: 'sing', gop: 95, status: 'mastered' },
    { symbol: '/tʃ/', word: 'church', gop: 81, status: 'mastered' },
    { symbol: '/dʒ/', word: 'judge', gop: 74, status: 'practicing' }
  ];

  const playSound = (word) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = selectedAccent === 'uk' ? 'en-GB' : selectedAccent === 'aus' ? 'en-AU' : 'en-US';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 py-4 animate-fade-in">
      {/* Top Breadcrumb & User Bio */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-slate-200/80 p-5 rounded-2xl shadow-[0_2px_8px_rgba(15,23,42,0.03)]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary border border-secondary/20 flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-2xl">analytics</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-secondary uppercase">
                Phân Tích Dữ Liệu Âm Học & 44 IPA Matrix
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-mono font-bold text-slate-600">
                ADV-101 to ADV-108
              </span>
            </div>
            <h2 className="text-lg font-black text-slate-900 leading-tight">
              Bảng Tổng Phổ Dữ Liệu Phát Âm L1 Việt Nam
            </h2>
          </div>
        </div>

        {/* Accent Explorer Selector (ADV-108) */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl text-xs font-mono">
          <span className="px-2 text-slate-500 font-bold">Target Accent:</span>
          {[
            { id: 'us', label: '🇺🇸 General US' },
            { id: 'uk', label: '🇬🇧 British RP' },
            { id: 'aus', label: '🇦🇺 Australian' }
          ].map((acc) => (
            <button
              key={acc.id}
              onClick={() => setSelectedAccent(acc.id)}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                selectedAccent === acc.id
                  ? 'bg-white text-secondary shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {acc.label}
            </button>
          ))}
        </div>
      </div>

      {/* Primary KPI Overview Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left 7 Cols: Radial GOP Gauge & Benchmarks */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono text-xs text-slate-400 uppercase font-bold">
                Goodness of Pronunciation
              </span>
              <h3 className="text-base font-bold text-slate-900">Chỉ Số Chuẩn Hóa GOP Tổng Thể</h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-mono text-xs font-bold border border-emerald-200">
              +8.4% Tháng Này
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center my-4">
            <div className="sm:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
                  <circle cx="80" cy="80" fill="transparent" r="66" stroke="#f1f5f9" strokeWidth="12" />
                  <circle
                    cx="80"
                    cy="80"
                    fill="transparent"
                    r="66"
                    stroke="#0284c7"
                    strokeWidth="12"
                    strokeDasharray="414.7"
                    strokeDashoffset={414.7 - (414.7 * gopScore) / 100}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black text-slate-900 leading-none">{gopScore}%</span>
                  <span className="font-mono text-[10px] text-secondary font-bold uppercase mt-1">
                    Overall GOP
                  </span>
                </div>
              </div>
            </div>

            <div className="sm:col-span-7 space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <span className="text-slate-600 font-bold">🎯 IELTS Speaking Dự Đoán:</span>
                <span className="font-mono text-sm font-black text-secondary">Band 7.0</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <span className="text-slate-600 font-bold">📘 Chuẩn Châu Âu CEFR:</span>
                <span className="font-mono text-sm font-black text-primary">B2 High</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <span className="text-slate-600 font-bold">👂 Intelligibility (ADV-106):</span>
                <span className="font-mono text-sm font-black text-emerald-600">94% Rõ Ràng</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2 border-t border-slate-100">
            <span>Mô hình giọng: {dialectConfig.name}</span>
            <span>Mục tiêu IELTS 8.0: còn 9% GOP</span>
          </div>
        </div>

        {/* Right 5 Cols: Consistency & Practice Volume */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-slate-900">Kỷ Luật & Lượng Nói Thực Tế</h3>
              <span className="px-2 py-0.5 rounded-full bg-rose-50 text-primary font-mono text-[10px] font-bold">
                STREAK LIVE
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 text-[10px] block">🔥 Chuỗi Ngày</span>
                <span className="text-xl font-black text-slate-900">{streak} Ngày</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 text-[10px] block">🛡️ Khiên Bảo Vệ</span>
                <span className="text-xl font-black text-secondary">{shields} Khiên</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 text-[10px] block">🎙️ Tổng Số Câu</span>
                <span className="text-xl font-black text-slate-900">528 Câu</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 text-[10px] block">⏱️ Thời Lượng</span>
                <span className="text-xl font-black text-slate-900">6g 45p</span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-sky-50 border border-sky-100 text-xs text-slate-700 leading-relaxed">
            💡 <strong>Nhận định AI:</strong> Tần suất luyện tập 10 phút/ngày giúp độ lệch F1/F2 giảm 42% so với tháng trước.
          </div>
        </div>
      </div>

      {/* Sub-tabs for Advanced Modules */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSubTab('ipa-matrix')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'ipa-matrix' ? 'bg-primary text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Ma Trận 44 Âm IPA
        </button>
        <button
          onClick={() => setActiveSubTab('golden-speaker')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'golden-speaker' ? 'bg-secondary text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Golden Speaker Clone (ADV-101)
        </button>
        <button
          onClick={() => setActiveSubTab('formant-bio')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'formant-bio' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Biểu Đồ Nguyên Âm F1/F2 (ADV-103)
        </button>
        <button
          onClick={() => setActiveSubTab('journal')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'journal' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Nhật Ký Nói Tự Do (ADV-107)
        </button>
      </div>

      {activeSubTab === 'golden-speaker' ? (
        /* ADV-101: Golden Speaker Voice Clone Feature */
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="font-mono text-xs font-bold text-secondary uppercase">
              ADV-101 • Voice-Cloned Self Model (Golden Speaker)
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-1">
              Nghe Chính Giọng Của Bạn Khi Phát Âm Chuẩn Bản Ngữ
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Mô hình AI giữ nguyên âm sắc, độ dày và màu giọng của bạn nhưng điều chỉnh khẩu hình và cao độ theo người bản xứ.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-50 via-rose-50 to-indigo-50 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white border border-secondary text-secondary flex items-center justify-center text-3xl shadow-sm">
                🎙️
              </div>
              <div>
                <span className="font-mono text-xs text-primary font-bold uppercase">
                  Golden Voice Synthesized
                </span>
                <h4 className="text-base font-bold text-slate-900">
                  "Six months ago, she baked fresh bread for breakfast on the street."
                </h4>
                <span className="text-xs text-slate-500 font-mono">
                  Sample Rate: 48kHz Hi-Fi Neural Voice
                </span>
              </div>
            </div>

            <button
              onClick={() => playSound('Six months ago, she baked fresh bread for breakfast on the street.')}
              className="px-6 py-3 rounded-full bg-secondary hover:bg-sky-600 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-transform hover:scale-105 shrink-0"
            >
              <span className="material-symbols-outlined text-base">play_arrow</span>
              <span>Nghe Bản Golden Speaker Của Bạn</span>
            </button>
          </div>
        </div>
      ) : activeSubTab === 'formant-bio' ? (
        /* ADV-103: Live Vowel Space F1/F2 Chart */
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="font-mono text-xs font-bold text-indigo-600 uppercase">
              ADV-103 • Live Vowel Space Chart (F1/F2 Formant Biofeedback)
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-1">
              Biểu Đồ Tần Số F1/F2 So Khớp Đa Giác Nguyên Âm Bản Ngữ
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              F1 phản ánh độ mở của hàm miệng (Jaw Aperture), F2 phản ánh vị trí trước/sau của thân lưỡi (Tongue Backness).
            </p>
          </div>

          <div className="relative w-full h-80 bg-slate-50 border border-slate-200 rounded-2xl p-4 overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 600 300">
              {/* Gridlines */}
              <line x1="60" y1="20" x2="60" y2="260" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="60" y1="260" x2="560" y2="260" stroke="#cbd5e1" strokeWidth="1" />

              <text x="30" y="30" className="font-mono text-[10px] fill-slate-400 font-bold">F1 (Hz)</text>
              <text x="520" y="280" className="font-mono text-[10px] fill-slate-400 font-bold">F2 (Hz)</text>

              {/* Native US Vowel Polygon */}
              <polygon
                points="120,60 240,40 460,80 500,200 360,220 180,180"
                fill="rgba(2, 132, 199, 0.1)"
                stroke="#0284c7"
                strokeWidth="2"
                strokeDasharray="4 4"
              />

              {/* User Vowel Data Points */}
              <circle cx="130" cy="65" r="6" fill="#e11d48" />
              <text x="140" y="70" className="font-mono text-xs fill-rose-600 font-bold">/iː/ see</text>

              <circle cx="340" cy="110" r="6" fill="#e11d48" />
              <text x="350" y="115" className="font-mono text-xs fill-rose-600 font-bold">/æ/ cat</text>

              <circle cx="480" cy="190" r="6" fill="#e11d48" />
              <text x="490" y="195" className="font-mono text-xs fill-rose-600 font-bold">/uː/ too</text>
            </svg>
            <div className="absolute bottom-3 right-4 font-mono text-xs text-slate-500 bg-white/80 px-2.5 py-1 rounded border border-slate-200">
              Đa giác xanh: Vùng chuẩn US • Chấm đỏ: Tọa độ giọng của bạn
            </div>
          </div>
        </div>
      ) : activeSubTab === 'journal' ? (
        /* ADV-107: Spontaneous Speech Voice Journal */
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="font-mono text-xs font-bold text-slate-500 uppercase">
              ADV-107 • Spontaneous Speech Voice Journal
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-1">
              Nhật Ký Nói Tự Do Mỗi Ngày & Chấm Phát Âm Không Kịch Bản
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Nói tự do 30-60 giây về bất kỳ chủ đề nào bạn thích. Hệ thống AI tự động phân tách âm vị, phát hiện từ ngắc ngứ và đánh giá độ tự tin.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <span className="text-xs text-slate-700 font-bold">
              Chủ đề gợi ý hôm nay: "Hãy chia sẻ 3 mục tiêu lớn nhất trong tuần này của bạn."
            </span>
            <button
              onClick={() => setIsRecordingJournal(!isRecordingJournal)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 ${
                isRecordingJournal
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-primary text-white hover:bg-rose-700'
              }`}
            >
              <span className="material-symbols-outlined text-sm">mic</span>
              <span>{isRecordingJournal ? 'Dừng & Lưu Nhật Ký' : 'Bật Mic Nói Tự Do'}</span>
            </button>
          </div>

          {/* Historical Logs */}
          <div className="space-y-3">
            <span className="font-mono text-xs text-slate-400 font-bold uppercase block">
              Nhật ký gần đây
            </span>
            {journalLogs.map((log) => (
              <div
                key={log.id}
                className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <span className="font-bold text-slate-900 block">{log.topic}</span>
                  <span className="text-slate-500 font-mono text-[11px]">{log.date} • {log.duration}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-secondary">{log.intelligibility}</span>
                  <span className="px-2.5 py-1 rounded bg-rose-50 text-primary font-mono font-bold">
                    {log.gop}% GOP
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Full 44 IPA Matrix Heatmap */
        <div className="space-y-6">
          {/* Vowels */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-900">
                1. Hệ Thống Nguyên Âm Tiếng Anh (Vowels & Diphthongs)
              </h3>
              <span className="font-mono text-xs text-slate-500">12 Monophthongs</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {ipaVowels.map((v) => (
                <div
                  key={v.symbol}
                  onClick={() => playSound(v.word)}
                  className={`p-3.5 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:scale-105 ${
                    v.status === 'mastered'
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                      : v.status === 'practicing'
                      ? 'bg-amber-50/70 border-amber-200 text-amber-900'
                      : 'bg-rose-50/70 border-rose-200 text-rose-900'
                  }`}
                >
                  <span className="font-mono text-xl font-black">{v.symbol}</span>
                  <span className="text-xs text-slate-600 mt-0.5">"{v.word}"</span>
                  <span className="font-mono text-[10px] font-bold mt-1.5">{v.gop}% GOP</span>
                </div>
              ))}
            </div>
          </div>

          {/* Consonants */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-900">
                2. Hệ Thống Phụ Âm Trọng Điểm Cho Người Việt (Target Consonants)
              </h3>
              <span className="font-mono text-xs text-primary font-bold">L1 Focus Consonants</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {ipaConsonants.map((c) => (
                <div
                  key={c.symbol}
                  onClick={() => playSound(c.word)}
                  className={`p-3.5 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:scale-105 ${
                    c.status === 'mastered'
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                      : c.status === 'practicing'
                      ? 'bg-amber-50/70 border-amber-200 text-amber-900'
                      : 'bg-rose-50/70 border-rose-200 text-rose-900'
                  }`}
                >
                  <span className="font-mono text-xl font-black">{c.symbol}</span>
                  <span className="text-xs text-slate-600 mt-0.5">"{c.word}"</span>
                  <span className="font-mono text-[10px] font-bold mt-1.5">{c.gop}% GOP</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
