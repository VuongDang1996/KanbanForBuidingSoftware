import React, { useState, useEffect, useRef } from 'react';
import { getOrCreateCoachMemoryProfile, generateCoachResponse } from '../../lib/ai/phoneticsCoachMemory.js';

export default function AiCoachLab() {
  const [messages, setMessages] = useState([
    {
      id: 'init_1',
      role: 'assistant',
      text: 'Chào bạn! Tôi là Huấn luyện viên Ngữ âm AI. Tôi đã ghi nhớ 14 buổi luyện tập của bạn: bạn đã làm chủ 28/44 âm IPA. Hôm nay chúng ta cùng kiểm tra xem lỗi nuốt âm /t/ và khẩu hình /θ/ đã tiến bộ thế nào nhé!',
      time: '14:20'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [profile, setProfile] = useState(() => getOrCreateCoachMemoryProfile('learner_vip'));
  const chatBottomRef = useRef(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend) => {
    const prompt = textToSend || inputText;
    if (!prompt.trim()) return;

    setInputText('');
    const userMsg = {
      id: `u_${Date.now()}`,
      role: 'user',
      text: prompt,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const res = await fetch('/api/v1/ai/coach/chat-stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'learner_vip', prompt })
      });
      const data = await res.json();

      setTimeout(() => {
        setIsTyping(false);
        const asstMsg = {
          id: `a_${Date.now()}`,
          role: 'assistant',
          text: data.responseText || generateCoachResponse(prompt).responseText,
          articulatoryTip: data.articulatoryTip,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, asstMsg]);
      }, 400);
    } catch {
      setIsTyping(false);
      const fallback = generateCoachResponse(prompt);
      setMessages(prev => [
        ...prev,
        {
          id: `a_${Date.now()}`,
          role: 'assistant',
          text: fallback.responseText,
          articulatoryTip: fallback.articulatoryTip,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm animate-fade-in">
      {/* Left Column: Chat Studio (8 cols) */}
      <div className="lg:col-span-8 flex flex-col justify-between h-[640px] border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 bg-white border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-600 to-indigo-600 text-white flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-xl">psychology</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-sm font-bold text-slate-900">
                AI Phonetics Coach (Oxford Style)
              </span>
              <span className="text-[11px] text-emerald-600 font-mono font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Ghi nhớ 30 ngày ngữ âm • Phản xạ sinh học
              </span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-sky-50 text-sky-800 font-mono text-[11px] font-bold border border-sky-200">
            ADV-104 Context RAG
          </span>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} gap-1`}
            >
              <div
                className={`max-w-[85%] p-4 rounded-2xl text-xs md:text-sm leading-relaxed shadow-xs ${
                  m.role === 'user'
                    ? 'bg-rose-600 text-white rounded-br-xs font-medium'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                }`}
              >
                <p>{m.text}</p>

                {/* Biomechanical Articulatory Tip Box */}
                {m.articulatoryTip && (
                  <div className="mt-3 p-3 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-950 text-xs">
                    <div className="flex items-center gap-1.5 text-amber-800 font-bold mb-1">
                      <span className="material-symbols-outlined text-sm">science</span>
                      <span>Giải phẫu học cấu âm: {m.articulatoryTip.rule}</span>
                    </div>
                    <p className="opacity-90">{m.articulatoryTip.biomechanics}</p>
                  </div>
                )}
              </div>
              <span className="text-[10px] text-slate-400 font-mono px-1">{m.time}</span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-2xl w-fit">
              <div className="w-2 h-2 rounded-full bg-sky-500 animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-sky-500 animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 rounded-full bg-sky-500 animate-bounce [animation-delay:0.4s]"></div>
            </div>
          )}
          <div ref={chatBottomRef} />
        </div>

        {/* Suggested Quick Prompts */}
        <div className="px-4 py-2 bg-slate-100/70 border-t border-slate-200/60 flex items-center gap-2 overflow-x-auto text-[11px]">
          <span className="text-slate-400 shrink-0">Gợi ý hỏi:</span>
          <button
            type="button"
            onClick={() => handleSendMessage('Hôm nay em phát âm âm /t/ đã đỡ hơn chưa cô?')}
            className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-700 whitespace-nowrap cursor-pointer"
          >
            "Âm /t/ hôm nay đỡ hơn chưa?"
          </button>
          <button
            type="button"
            onClick={() => handleSendMessage("Cô ơi từ 'thought' đặt lưỡi thế nào cho chuẩn?")}
            className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-700 whitespace-nowrap cursor-pointer"
          >
            "Từ 'thought' đặt lưỡi thế nào?"
          </button>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Đặt câu hỏi về phát âm, khẩu hình hoặc hỏi tiến độ học tập..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs md:text-sm focus:outline-none focus:border-sky-500"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>Gửi</span>
            <span className="material-symbols-outlined text-sm">send</span>
          </button>
        </form>
      </div>

      {/* Right Column: Long-Term Memory Cards (4 cols) */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <span className="font-label-mono text-xs uppercase font-bold text-slate-500">
            Hồ Sơ Trí Nhớ Người Học
          </span>
          <span className="text-xs text-sky-700 font-mono font-bold">30 Ngày Qua</span>
        </div>

        {/* Mastered Progress Card */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-900">Âm Đã Thuần Thục</span>
            <span className="font-mono text-xs font-extrabold text-emerald-700">
              {profile.masteredCount} / {profile.totalPhonemes} IPA
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-emerald-200 overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full"
              style={{ width: `${(profile.masteredCount / profile.totalPhonemes) * 100}%` }}
            ></div>
          </div>
          <div className="flex flex-wrap gap-1 mt-1">
            {profile.masteredPhonemes.map(p => (
              <span key={p} className="px-1.5 py-0.5 rounded bg-white font-mono text-[10px] text-emerald-800 font-bold border border-emerald-300">
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Struggling Watchlist Card */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col gap-2">
          <span className="text-xs font-bold text-amber-900">Tật Phát Âm Cần Khắc Phục</span>
          <div className="flex flex-col gap-2">
            {profile.strugglingPhonemes.map(item => (
              <div key={item.symbol} className="flex items-center justify-between p-2 rounded-xl bg-white border border-amber-200/80 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-rose-600">{item.symbol}</span>
                  <span className="text-slate-600 text-[11px]">{item.issue}</span>
                </div>
                <span className="font-mono text-[10px] text-amber-700 font-bold">
                  {item.errorRate} lỗi
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 7-Day Sparkline Progress */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800">Xu Hướng Độ Chuẩn Âm (7 Ngày)</span>
            <span className="text-emerald-600 font-mono font-bold">+12%</span>
          </div>
          <div className="flex items-end gap-1.5 h-12 pt-2">
            {profile.sparkline7Days.map((val, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-sm bg-gradient-to-t from-sky-500 to-indigo-600"
                  style={{ height: `${(val / 100) * 40}px` }}
                ></div>
                <span className="text-[9px] font-mono text-slate-400">T{idx + 2}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
