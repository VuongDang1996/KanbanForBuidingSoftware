import React, { useState, useEffect, useRef } from 'react';
import {
  IELTS_CUE_CARDS,
  getIeltsCueCardById,
  evaluateIeltsMockPart2
} from '../../lib/scoring/ieltsMockExaminer';

export default function IeltsMockExaminer({
  isOpen = true,
  onClose = () => {},
  selectedTopicId = 'tech_difficult_01'
}) {
  const [topicId, setTopicId] = useState(selectedTopicId);
  const [phase, setPhase] = useState('IDLE'); // 'IDLE', 'PREP_60', 'SPEAK_120', 'EVALUATED'
  const [prepTimeLeft, setPrepTimeLeft] = useState(60);
  const [speakTimeLeft, setSpeakTimeLeft] = useState(120);
  const [scratchNotes, setScratchNotes] = useState(
    '- bought 2 yrs ago for video editing\n- steep learning curve\n- confusing keyboard shortcuts'
  );
  const [transcript, setTranscript] = useState(
    'Two years ago, I bought a specialized 4K camera for recording tutorials. However, it has a really steep learning curve because the interface is quite glitchy and counterintuitive. When I first tried to configure the custom profiles, the system failed to save my presets. Even though I practiced every week, I still find it challenging to master.'
  );
  const [evaluation, setEvaluation] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'past_tense'

  const currentCard = getIeltsCueCardById(topicId);
  const timerRef = useRef(null);

  // Timer lifecycle
  useEffect(() => {
    if (phase === 'PREP_60') {
      timerRef.current = setInterval(() => {
        setPrepTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            // Auto transition to speak phase with bell chime
            playChime();
            setPhase('SPEAK_120');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (phase === 'SPEAK_120') {
      timerRef.current = setInterval(() => {
        setSpeakTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleEvaluate();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase]);

  const playChime = () => {
    if ('AudioContext' in window || 'webkitAudioContext' in window) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime); // A5 note
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.2);
      } catch {
        // Fallback or muted
      }
    }
  };

  const startPrep = () => {
    setPrepTimeLeft(60);
    setSpeakTimeLeft(120);
    setPhase('PREP_60');
  };

  const skipToSpeak = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    playChime();
    setPhase('SPEAK_120');
  };

  const handleEvaluate = async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsSubmitting(true);

    const speechSec = 120 - speakTimeLeft;
    const clientEval = evaluateIeltsMockPart2({
      topicId: currentCard.id,
      transcript,
      prepNotes: scratchNotes,
      speechDurationSec: speechSec > 10 ? speechSec : 110
    });

    try {
      const res = await fetch('/api/v1/ielts/mock-eval', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicId: currentCard.id,
          transcript,
          prepNotes: scratchNotes,
          speechDurationSec: speechSec > 10 ? speechSec : 110
        })
      });
      if (res.ok) {
        const data = await res.json();
        setEvaluation(data.evaluation || clientEval);
      } else {
        setEvaluation(clientEval);
      }
    } catch {
      setEvaluation(clientEval);
    } finally {
      setIsSubmitting(false);
      setPhase('EVALUATED');
    }
  };

  const resetExam = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase('IDLE');
    setPrepTimeLeft(60);
    setSpeakTimeLeft(120);
    setEvaluation(null);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ielts-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto animate-fade-in"
    >
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 flex flex-col">
        {/* Top Header Bar */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-600/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
              <span className="material-symbols-outlined text-2xl">school</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="ielts-modal-title" className="text-base font-bold text-white font-headline-sm">
                  IELTS Speaking Part 2 AI Mock Examiner
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  VN-104 Real Exam Mode
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Giám khảo Sarah (London IDP / British Council Accredited Protocol)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {phase === 'PREP_60' && (
              <div className="flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 px-3 py-1 rounded-full text-amber-300 font-mono text-sm font-bold animate-pulse">
                <span className="material-symbols-outlined text-base">timer</span>
                <span>Chuẩn bị: {prepTimeLeft}s</span>
              </div>
            )}
            {phase === 'SPEAK_120' && (
              <div className="flex items-center gap-2 bg-rose-500/20 border border-rose-500/40 px-3 py-1 rounded-full text-rose-300 font-mono text-sm font-bold animate-pulse">
                <span className="material-symbols-outlined text-base">mic</span>
                <span>Nói liên tục: {Math.floor(speakTimeLeft / 60)}:{(speakTimeLeft % 60).toString().padStart(2, '0')}</span>
              </div>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Đóng phòng thi"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </div>

        {/* Main Body */}
        <div className="p-6 flex flex-col gap-6 max-h-[80vh] overflow-y-auto bg-slate-50">
          {/* Phase 1 & 2: Exam In Progress */}
          {phase !== 'EVALUATED' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Official IELTS Cue Card */}
              <div className="p-5 rounded-xl bg-white border-2 border-indigo-200/80 shadow-sm flex flex-col gap-4 relative">
                <div className="flex items-center justify-between border-b border-indigo-100 pb-3">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-200">
                    CANDIDATE TASK CARD (PART 2)
                  </span>
                  <select
                    value={topicId}
                    onChange={(e) => setTopicId(e.target.value)}
                    disabled={phase !== 'IDLE'}
                    className="text-xs bg-slate-100 border border-slate-300 rounded px-2 py-1 text-slate-700 font-medium cursor-pointer"
                  >
                    {IELTS_CUE_CARDS.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.topicTitle}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-amber-50/70 border-l-4 border-amber-400 p-3 rounded-r">
                  <p className="font-bold text-slate-900 text-sm">
                    {currentCard.cardPrompt}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-600">You should say:</span>
                  <ul className="list-disc list-inside text-xs text-slate-700 space-y-1.5 pl-1">
                    {currentCard.bulletPoints.map((b, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended C1 Collocations */}
                <div className="mt-2 pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                    Gợi ý Collocations Band 7.0+:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentCard.recommendedVocab.map((v, i) => (
                      <span
                        key={i}
                        className="text-[11px] bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono"
                        title={v.meaning}
                      >
                        {v.word}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: ScratchPad Notepad & Voice Live Area */}
              <div className="flex flex-col gap-4">
                {/* ScratchPad */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col gap-2 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                      <span className="material-symbols-outlined text-sm text-indigo-600">edit_note</span>
                      <span>Bảng Nháp 1 Phút (Virtual Scratchpad)</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {phase === 'PREP_60' ? 'Đang chuẩn bị...' : 'Lưu trữ cho 2 phút nói'}
                    </span>
                  </div>
                  <textarea
                    value={scratchNotes}
                    onChange={(e) => setScratchNotes(e.target.value)}
                    placeholder="Gõ dàn ý ngắn (bullet points, keywords) trong 60s chuẩn bị..."
                    rows={4}
                    className="w-full text-xs font-mono bg-amber-50/40 border border-amber-200 rounded-lg p-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>

                {/* Speech Area / Simulator */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm text-rose-600">record_voice_over</span>
                      <span>Bài Nói Của Thí Sinh (Speech Transcript)</span>
                    </span>
                    {phase === 'SPEAK_120' && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-rose-600 font-mono font-semibold animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                        Đang ghi âm 2 phút
                      </span>
                    )}
                  </div>
                  <textarea
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    placeholder="Bắt đầu nói hoặc nhập transcript bài thi để AI Examiner chấm điểm..."
                    rows={4}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Bar when In Progress */}
          {phase === 'IDLE' && (
            <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="text-xs text-slate-600">
                Format thi chuẩn: <strong>60 giây chuẩn bị</strong> với bảng nháp &rarr; <strong>120 giây nói liên tục</strong> trước giám khảo AI.
              </div>
              <div className="flex gap-3">
                <button
                  onClick={skipToSpeak}
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition-colors cursor-pointer"
                >
                  Bỏ qua chuẩn bị &amp; Nói luôn
                </button>
                <button
                  onClick={startPrep}
                  className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span className="material-symbols-outlined text-base">timer</span>
                  <span>Bắt đầu 60s Chuẩn bị</span>
                </button>
              </div>
            </div>
          )}

          {phase === 'PREP_60' && (
            <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border border-amber-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm font-mono shadow-sm">
                  {prepTimeLeft}s
                </div>
                <div>
                  <h4 className="text-xs font-bold text-amber-900">Thời gian ghi chú nháp 1 phút</h4>
                  <p className="text-[11px] text-amber-700">
                    Hãy phác thảo 3-4 ý chính vào bảng nháp bên trên. Hết giờ chuông sẽ tự kêu!
                  </p>
                </div>
              </div>
              <button
                onClick={skipToSpeak}
                className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs transition-colors cursor-pointer"
              >
                Sẵn sàng &rarr; Bắt đầu nói ngay
              </button>
            </div>
          )}

          {phase === 'SPEAK_120' && (
            <div className="flex items-center justify-between p-4 bg-rose-50 rounded-xl border border-rose-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-xs font-mono shadow-sm animate-pulse">
                  {Math.floor(speakTimeLeft / 60)}:{(speakTimeLeft % 60).toString().padStart(2, '0')}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-rose-900">Giai đoạn nói độc thoại 2 phút</h4>
                  <p className="text-[11px] text-rose-700">
                    Duy trì tốc độ nói ổn định, liếc nhìn bảng nháp và trả lời trọn vẹn 4 ý gợi ý.
                  </p>
                </div>
              </div>
              <button
                onClick={handleEvaluate}
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-base">fact_check</span>
                <span>{isSubmitting ? 'Đang chấm điểm...' : 'Nộp bài & Chấm điểm IELTS'}</span>
              </button>
            </div>
          )}

          {/* Phase 3: Evaluation Scorecard (Cambridge 4 Criteria) */}
          {phase === 'EVALUATED' && evaluation && (
            <div className="flex flex-col gap-6 animate-fade-in">
              {/* Hero Overall Band Banner */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-indigo-900/60">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-2xl bg-amber-400 text-slate-950 flex flex-col items-center justify-center font-black shadow-lg">
                    <span className="text-[10px] font-bold tracking-widest uppercase">BAND</span>
                    <span className="text-3xl leading-none">{evaluation.overallBand.toFixed(1)}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold">IELTS Speaking Official Scorecard</h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold">
                        IDP/BC Calibrated
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 max-w-xl">
                      "{evaluation.examinerPersona.generalComment}"
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={resetExam}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
                  >
                    <span className="material-symbols-outlined text-base">restart_alt</span>
                    <span>Thi lại chủ đề khác</span>
                  </button>
                </div>
              </div>

              {/* 4 Cambridge Criteria Bento Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* FC */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-700 font-mono">FC (Fluency)</span>
                    <span className="text-sm font-black text-sky-600 bg-sky-50 px-2 py-0.5 rounded">
                      {evaluation.criteria.fc.band.toFixed(1)}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-800">Độ Trôi Chảy & Mạch Lạc</h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {evaluation.criteria.fc.feedback}
                  </p>
                </div>

                {/* LR */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-700 font-mono">LR (Lexical)</span>
                    <span className="text-sm font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                      {evaluation.criteria.lr.band.toFixed(1)}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-800">Vốn Từ Vựng</h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {evaluation.criteria.lr.feedback}
                  </p>
                </div>

                {/* GRA */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-700 font-mono">GRA (Grammar)</span>
                    <span className="text-sm font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                      {evaluation.criteria.gra.band.toFixed(1)}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-800">Ngữ Pháp & Thì Quá Khứ</h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {evaluation.criteria.gra.feedback}
                  </p>
                </div>

                {/* PR */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-700 font-mono">PR (Phonetics)</span>
                    <span className="text-sm font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      {evaluation.criteria.pr.band.toFixed(1)}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-800">Phát Âm & Ngữ Điệu</h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {evaluation.criteria.pr.feedback}
                  </p>
                </div>
              </div>

              {/* L1 Vietnamese Past Tense Error Callout Box */}
              {evaluation.criteria.gra.pastTenseErrors && evaluation.criteria.gra.pastTenseErrors.length > 0 && (
                <div className="p-5 rounded-xl bg-rose-50 border-2 border-rose-300 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-rose-800">
                    <span className="material-symbols-outlined text-lg">warning</span>
                    <h4 className="text-xs font-bold uppercase tracking-wider">
                      Cảnh Báo Lỗi Ngữ Pháp Điển Hình Người Việt (Vietnamese L1 Past-Tense Omission)
                    </h4>
                  </div>
                  <p className="text-xs text-slate-700">
                    Trong tiếng Việt động từ không biến đổi theo thì, dẫn đến thói quen quên bật đuôi quá khứ <strong>-ed</strong> khi kể chuyện quá khứ trong Part 2:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {evaluation.criteria.gra.pastTenseErrors.map((err, idx) => (
                      <div key={idx} className="p-3 bg-white rounded-lg border border-rose-200 flex flex-col gap-1 shadow-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-rose-700 line-through">
                            "{err.verb}"
                          </span>
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            &rarr; "{err.correctForm}" ({err.soundEnding})
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-1">
                          {err.correctiveTip}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
