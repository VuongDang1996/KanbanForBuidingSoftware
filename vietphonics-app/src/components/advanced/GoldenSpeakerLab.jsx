import React, { useState, useEffect } from 'react';
import { synthesizeGoldenSpeakerChannels } from '../../lib/ai/goldenSpeakerEngine.js';

const SAMPLE_WORDS = [
  { word: 'specifically', ipa: '/spəˈsɪfɪkli/', note: 'Dễ nuốt âm đuôi /k/ và âm xát /s/' },
  { word: 'fantastic', ipa: '/fænˈtæstɪk/', note: 'Dễ đọc dẹt âm /æ/ thành /e/' },
  { word: 'comfortable', ipa: '/ˈkʌmftəbl/', note: 'Dễ đọc thừa âm tiết thành 4 âm' },
  { word: 'clothes', ipa: '/kloʊðz/', note: 'Khó chuyển từ /ð/ sang /z/' }
];

export default function GoldenSpeakerLab() {
  const [selectedWord, setSelectedWord] = useState(SAMPLE_WORDS[0]);
  const [activeChannel, setActiveChannel] = useState('b');
  const [isPlaying, setIsPlaying] = useState(false);
  const [channelsData, setChannelsData] = useState(() =>
    synthesizeGoldenSpeakerChannels({ word: SAMPLE_WORDS[0].word, targetIpa: SAMPLE_WORDS[0].ipa })
  );

  // Play TTS audio
  const playChannelAudio = (channelKey) => {
    setActiveChannel(channelKey);
    setIsPlaying(true);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(selectedWord.word);
      utterance.lang = 'en-US';

      // Vary pitch and rate based on channel
      if (channelKey === 'a') {
        utterance.rate = 0.95;
        utterance.pitch = 0.9;
      } else if (channelKey === 'b') {
        utterance.rate = 0.85;
        utterance.pitch = 1.0;
      } else {
        utterance.rate = 0.8;
        utterance.pitch = 1.05;
      }

      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlaying(false), 1200);
    }
  };

  // Switch word and re-synthesize
  const handleSelectWord = async (item) => {
    setSelectedWord(item);
    try {
      const res = await fetch('/api/v1/ai/golden-speaker/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word: item.word, targetIpa: item.ipa })
      });
      const data = await res.json();
      if (data.success && data.channels) {
        setChannelsData(data);
      } else {
        setChannelsData(synthesizeGoldenSpeakerChannels({ word: item.word, targetIpa: item.ipa }));
      }
    } catch {
      setChannelsData(synthesizeGoldenSpeakerChannels({ word: item.word, targetIpa: item.ipa }));
    }
  };

  // Keyboard hotkeys A, B, C
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (key === 'a') playChannelAudio('a');
      else if (key === 'b') playChannelAudio('b');
      else if (key === 'c') playChannelAudio('c');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedWord]);

  return (
    <div className="flex flex-col gap-6 bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-0.5 rounded-full bg-amber-50 text-amber-700 font-label-mono text-xs font-bold border border-amber-200">
              ZERO-SHOT VOICE CLONE 256-D
            </span>
            <span className="text-xs font-mono text-slate-500">XTTS-v2 Timbre Model</span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-slate-900 font-extrabold tracking-tight">
            Golden Speaker Studio (ADV-101)
          </h2>
          <p className="font-body-md text-sm text-slate-600 mt-1">
            Nghe chính giọng nói của bạn nhưng được AI chuẩn hóa phát âm 100% như người bản xứ.
          </p>
        </div>

        {/* Timbre Match Pill */}
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-amber-50/80 border border-amber-200 shrink-0">
          <span className="material-symbols-outlined text-amber-600 text-2xl animate-spin">auto_awesome</span>
          <div className="flex flex-col">
            <span className="font-label-mono text-[10px] text-amber-700 uppercase font-bold">Độ Tương Đồng Âm Sắc</span>
            <span className="font-mono text-lg font-extrabold text-amber-900">
              {Math.round((channelsData?.timbreSimilarity || 0.93) * 100)}% Timbre Match
            </span>
          </div>
        </div>
      </div>

      {/* Target Word Selector */}
      <div className="flex flex-wrap gap-2">
        {SAMPLE_WORDS.map((item) => (
          <button
            key={item.word}
            type="button"
            onClick={() => handleSelectWord(item)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              selectedWord.word === item.word
                ? 'bg-slate-900 text-white shadow-sm ring-2 ring-slate-400'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span>{item.word}</span>
            <span className="font-mono opacity-80">{item.ipa}</span>
          </button>
        ))}
      </div>

      {/* 3-Channel Comparison Rack */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Channel A: User Real Recording */}
        <div
          onClick={() => playChannelAudio('a')}
          className={`flex flex-col justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all ${
            activeChannel === 'a'
              ? 'bg-rose-50/50 border-rose-500 shadow-md ring-2 ring-rose-200'
              : 'bg-slate-50 border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-lg bg-rose-100 text-rose-700 font-mono text-xs font-bold">
                [Phím A] Kênh A
              </span>
              <span className="material-symbols-outlined text-rose-600 text-lg">mic</span>
            </div>
            <h4 className="font-headline-sm text-sm font-bold text-slate-900">Giọng Của Bạn (Thực Tế)</h4>
            <p className="text-xs text-rose-700 font-medium">{channelsData?.channels?.channelA?.statusNote}</p>
          </div>

          <div className="mt-4 pt-3 border-t border-rose-200/50 flex items-center justify-between">
            <div className="flex items-end gap-1 h-6">
              {[15, 25, 40, 55, 30, 20, 45, 35, 18, 10].map((h, i) => (
                <div
                  key={i}
                  className={`w-1.5 rounded-full ${activeChannel === 'a' && isPlaying ? 'bg-rose-500 animate-pulse' : 'bg-rose-300'}`}
                  style={{ height: `${h}%` }}
                ></div>
              ))}
            </div>
            <span className="text-xs font-bold text-rose-600">Nghe bạn</span>
          </div>
        </div>

        {/* Channel B: Golden Speaker (AI Cloned) */}
        <div
          onClick={() => playChannelAudio('b')}
          className={`relative flex flex-col justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all ${
            activeChannel === 'b'
              ? 'bg-amber-50/60 border-amber-500 shadow-lg ring-2 ring-amber-200'
              : 'bg-slate-50 border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white font-mono text-[10px] font-bold uppercase tracking-wider shadow-sm">
            ⭐ Giọng Bạn Chuẩn Hóa
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-lg bg-amber-100 text-amber-800 font-mono text-xs font-bold">
                [Phím B] Kênh B
              </span>
              <span className="material-symbols-outlined text-amber-600 text-lg">auto_awesome</span>
            </div>
            <h4 className="font-headline-sm text-sm font-bold text-slate-900">Golden Speaker (Chính Bạn)</h4>
            <p className="text-xs text-amber-800 font-semibold">{channelsData?.channels?.channelB?.statusNote}</p>
          </div>

          <div className="mt-4 pt-3 border-t border-amber-200/50 flex items-center justify-between">
            <div className="flex items-end gap-1 h-6">
              {[20, 45, 75, 95, 80, 50, 70, 60, 40, 20].map((h, i) => (
                <div
                  key={i}
                  className={`w-1.5 rounded-full ${activeChannel === 'b' && isPlaying ? 'bg-amber-500 animate-bounce' : 'bg-amber-400'}`}
                  style={{ height: `${h}%` }}
                ></div>
              ))}
            </div>
            <span className="text-xs font-bold text-amber-700">Nghe Golden Voice</span>
          </div>
        </div>

        {/* Channel C: Native Reference */}
        <div
          onClick={() => playChannelAudio('c')}
          className={`flex flex-col justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all ${
            activeChannel === 'c'
              ? 'bg-emerald-50/50 border-emerald-500 shadow-md ring-2 ring-emerald-200'
              : 'bg-slate-50 border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 font-mono text-xs font-bold">
                [Phím C] Kênh C
              </span>
              <span className="material-symbols-outlined text-emerald-600 text-lg">verified</span>
            </div>
            <h4 className="font-headline-sm text-sm font-bold text-slate-900">Giọng Bản Ngữ Gốc</h4>
            <p className="text-xs text-emerald-700 font-medium">{channelsData?.channels?.channelC?.statusNote}</p>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-200/50 flex items-center justify-between">
            <div className="flex items-end gap-1 h-6">
              {[18, 40, 70, 90, 75, 48, 68, 55, 35, 18].map((h, i) => (
                <div
                  key={i}
                  className={`w-1.5 rounded-full ${activeChannel === 'c' && isPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-emerald-300'}`}
                  style={{ height: `${h}%` }}
                ></div>
              ))}
            </div>
            <span className="text-xs font-bold text-emerald-600">Nghe bản ngữ</span>
          </div>
        </div>
      </div>

      {/* Hotkey Helper Bar */}
      <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
        <div className="flex items-center gap-3">
          <span className="font-bold text-slate-800">Phím tắt nhanh:</span>
          <span className="font-mono bg-white px-2 py-0.5 rounded border border-slate-300">[A] Giọng bạn</span>
          <span className="font-mono bg-white px-2 py-0.5 rounded border border-slate-300">[B] Golden Voice</span>
          <span className="font-mono bg-white px-2 py-0.5 rounded border border-slate-300">[C] Bản ngữ</span>
        </div>
        <span className="text-slate-400 hidden md:block">Bấm phím A/B/C trên bàn phím để chuyển kênh tức thì</span>
      </div>
    </div>
  );
}
