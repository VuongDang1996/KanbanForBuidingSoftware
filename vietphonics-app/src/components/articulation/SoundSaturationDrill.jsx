import React, { useState, useEffect } from 'react';
import {
  SATURATION_SENTENCES,
  getSaturationSentence,
  evaluateSaturationSpeech
} from '../../lib/scoring/soundSaturation';

export default function SoundSaturationDrill({ initialSentenceId = 'sat_dj_01' }) {
  const [activeSentenceId, setActiveSentenceId] = useState(initialSentenceId);
  const [sentence, setSentence] = useState(() => getSaturationSentence(initialSentenceId) || SATURATION_SENTENCES[0]);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [userSimulatedCount, setUserSimulatedCount] = useState(7); // default 7 out of 8

  useEffect(() => {
    const s = getSaturationSentence(activeSentenceId) || SATURATION_SENTENCES[0];
    setSentence(s);
    setUserSimulatedCount(s.targetOccurrencesCount - 1);
    setEvaluation(null);
  }, [activeSentenceId]);

  const playNativeSlowAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(sentence.text);
      u.lang = 'en-US';
      u.rate = 0.7; // 0.7x slow exaggerated demo
      setIsPlayingAudio(true);
      u.onend = () => setIsPlayingAudio(false);
      u.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(u);
    }
  };

  const handleEvaluate = async () => {
    setIsEvaluating(true);
    try {
      const res = await fetch('/api/v1/scoring/saturation-sentence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sentenceId: sentence.id,
          correctOccurrences: userSimulatedCount,
          detectedSubstitutions: userSimulatedCount < sentence.targetOccurrencesCount ? ['/z/'] : []
        })
      });

      if (res.ok) {
        const data = await res.json();
        setEvaluation(data.evaluation);
      } else {
        const local = evaluateSaturationSpeech({
          sentenceId: sentence.id,
          correctOccurrences: userSimulatedCount,
          detectedSubstitutions: userSimulatedCount < sentence.targetOccurrencesCount ? ['/z/'] : []
        });
        setEvaluation(local);
      }
    } catch {
      const local = evaluateSaturationSpeech({
        sentenceId: sentence.id,
        correctOccurrences: userSimulatedCount,
        detectedSubstitutions: userSimulatedCount < sentence.targetOccurrencesCount ? ['/z/'] : []
      });
      setEvaluation(local);
    } finally {
      setIsEvaluating(false);
    }
  };

  const saturationFillPercent = evaluation
    ? evaluation.saturationMeterLevel
    : Math.round((userSimulatedCount / sentence.targetOccurrencesCount) * 100);

  return (
    <section className="w-full bg-slate-950 rounded-3xl p-6 md:p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Background neon ambient lights */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6 mb-8 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              PRON-211
            </span>
            <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">
              Dense Target Sound Saturation Drills
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <span>⚡ Luyện Câu Bão Hòa Âm Mục Tiêu Tối Đa</span>
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Tạo áp lực cấu âm liên tục với mật độ 6–9 âm mục tiêu trong một câu ngắn. Rèn luyện phản xạ cơ bắp tự động (Muscle Memory).
          </p>
        </div>

        {/* Sentence selector pills */}
        <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 shrink-0">
          {SATURATION_SENTENCES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveSentenceId(s.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeSentenceId === s.id
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-105'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <span className="font-mono text-sm">{s.targetPhoneme}</span>
              <span className="text-[10px] text-emerald-300">({s.targetOccurrencesCount}x)</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main interactive area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        {/* Left 8 Cols: Sentence Reader & Words Saturation Map */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Main Sentence Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                MẬT ĐỘ ÂM {sentence.targetPhoneme}: {sentence.targetOccurrencesCount} LẦN XUẤT HIỆN
              </span>
              <button
                type="button"
                onClick={playNativeSlowAudio}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-sky-400 font-bold flex items-center gap-2 transition-colors border border-slate-700"
              >
                <span className="material-symbols-outlined text-sm">
                  {isPlayingAudio ? 'graphic_eq' : 'volume_up'}
                </span>
                <span>Nghe Bản Xứ Chậm 0.7x</span>
              </button>
            </div>

            {/* Saturated Sentence Tokens */}
            <div className="flex flex-wrap gap-2.5 items-center my-6">
              {sentence.words.map((w, idx) => (
                <div
                  key={`${w.word}-${idx}`}
                  className={`px-3 py-2 rounded-2xl border transition-all flex flex-col items-center ${
                    w.hasTarget
                      ? 'bg-emerald-950/30 border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                      : 'bg-slate-950 border-slate-800/80 text-slate-400'
                  }`}
                >
                  <span className={`text-lg md:text-xl font-bold tracking-wide ${
                    w.hasTarget ? 'text-white' : 'text-slate-300'
                  }`}>
                    {w.word}
                  </span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-[11px] font-mono text-emerald-400">{w.ipa}</span>
                    {w.hasTarget && (
                      <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 px-1.5 rounded-full">
                        {w.targetCount}x
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400">
              <span className="font-bold text-slate-300">Ý nghĩa:</span> “{sentence.vietnameseTranslation}”
            </div>
          </div>

          {/* Saturation Energy Meter Bar (AC 1) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-400 text-lg">
                  bolt
                </span>
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  SATURATION METER (ĐỘ ĐẦY MẬT ĐỘ ÂM):
                </span>
              </div>
              <span className="font-mono text-lg font-black text-emerald-400">
                {saturationFillPercent}%
              </span>
            </div>

            {/* Progress Bar Track */}
            <div className="w-full h-4 bg-slate-950 rounded-full border border-slate-800 overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 transition-all duration-500 shadow-[0_0_16px_rgba(16,185,129,0.6)]"
                style={{ width: `${saturationFillPercent}%` }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
              <span>Đạt {userSimulatedCount}/{sentence.targetOccurrencesCount} âm chuẩn</span>
              <span className="text-emerald-400 font-mono">
                {saturationFillPercent >= 80 ? '✦ ĐẠT CHUẨN BÃO HÒA' : 'CẦN BẢO TOÀN ĐỘ BẬT'}
              </span>
            </div>
          </div>

          {/* Interactive Slider to simulate different pronunciations & Submit */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-xs text-slate-400 whitespace-nowrap">Mô phỏng lượt đọc:</span>
              <input
                type="range"
                min="0"
                max={sentence.targetOccurrencesCount}
                value={userSimulatedCount}
                onChange={(e) => setUserSimulatedCount(parseInt(e.target.value, 10))}
                className="w-32 accent-emerald-500 cursor-pointer"
              />
              <span className="text-xs font-mono text-white font-bold w-12">
                {userSimulatedCount}/{sentence.targetOccurrencesCount}
              </span>
            </div>

            <button
              type="button"
              onClick={handleEvaluate}
              disabled={isEvaluating}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">mic</span>
              <span>{isEvaluating ? 'Đang chấm điểm...' : 'Chấm Điểm Câu Bão Hòa (SQLite)'}</span>
            </button>
          </div>
        </div>

        {/* Right 4 Cols: L1 Trap Advice & Feedback */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* L1 Trap Callout Drawer */}
          <div className="bg-amber-950/20 border border-amber-500/40 rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400">
                <span className="material-symbols-outlined text-xl">psychology_alt</span>
              </div>
              <div>
                <h4 className="text-amber-300 font-bold text-sm">
                  {sentence.l1Trap.title}
                </h4>
                <p className="text-xs text-amber-200/80 mt-1 leading-relaxed">
                  {sentence.l1Trap.description}
                </p>

                <div className="mt-3 p-3 rounded-xl bg-amber-950/40 border border-amber-500/20 text-xs text-amber-300 leading-relaxed">
                  <span className="font-bold">Mẹo thực chiến:</span> {sentence.l1Trap.correctiveAdvice}
                </div>
              </div>
            </div>
          </div>

          {/* Evaluation Result Card */}
          {evaluation && (
            <div className={`p-6 rounded-3xl border shadow-xl animate-fade-in ${
              evaluation.isMastered
                ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                : 'bg-rose-950/20 border-rose-500/40 text-rose-300'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider">
                  KẾT QUẢ ĐÁNH GIÁ MẬT ĐỘ
                </span>
                <span className="text-2xl font-black font-mono">
                  {evaluation.accuracyPercent}%
                </span>
              </div>

              <div className="text-sm font-bold text-white mb-1">
                {evaluation.feedback}
              </div>

              <div className="text-xs opacity-90 mt-2 leading-relaxed">
                {evaluation.advice}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Số âm đạt chuẩn:</span>
                <span className="text-white font-bold">
                  {evaluation.correctOccurrences}/{evaluation.totalOccurrences} âm
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
