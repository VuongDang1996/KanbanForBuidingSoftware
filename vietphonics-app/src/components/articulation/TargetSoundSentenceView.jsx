import React, { useState, useEffect, useCallback } from 'react';
import { TARGET_SATURATED_SENTENCES, evaluateTargetDrill } from '../../lib/scoring/targetSentenceDrill';

export default function TargetSoundSentenceView({
  initialSentenceId = 'sat_theta_01'
}) {
  const [selectedId, setSelectedId] = useState(initialSentenceId);
  const sentence = TARGET_SATURATED_SENTENCES[selectedId] || TARGET_SATURATED_SENTENCES.sat_theta_01;

  const [activeWord, setActiveWord] = useState(null);
  const [evaluation, setEvaluation] = useState(null);
  const [simulateSubstitution, setSimulateSubstitution] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isPlayingFull, setIsPlayingFull] = useState(false);
  const [isolatedWordPlaying, setIsolatedWordPlaying] = useState(null);

  // Load default evaluation on sentence or simulation change
  useEffect(() => {
    runEvaluation(simulateSubstitution);
  }, [selectedId, simulateSubstitution]);

  const runEvaluation = async (withSubstitution) => {
    setIsEvaluating(true);
    try {
      // Simulate performance payloads
      let mockPerformances = {};
      if (selectedId === 'sat_theta_01') {
        if (withSubstitution) {
          mockPerformances = {
            'thirty-three': { gop: 45, detectedPhoneme: '/t/', isSubstituted: true },
            'thought': { gop: 92, detectedPhoneme: '/θ/', isSubstituted: false },
            'think': { gop: 88, detectedPhoneme: '/θ/', isSubstituted: false },
            'thieves': { gop: 85, detectedPhoneme: '/θ/', isSubstituted: false }
          };
        } else {
          mockPerformances = {
            'think': { gop: 94, detectedPhoneme: '/θ/', isSubstituted: false },
            'thirty-three': { gop: 91, detectedPhoneme: '/θ/', isSubstituted: false },
            'thieves': { gop: 89, detectedPhoneme: '/θ/', isSubstituted: false },
            'thought': { gop: 95, detectedPhoneme: '/θ/', isSubstituted: false }
          };
        }
      } else if (selectedId === 'sat_sh_02') {
        if (withSubstitution) {
          mockPerformances = {
            'She': { gop: 90, detectedPhoneme: '/ʃ/', isSubstituted: false },
            'shiny': { gop: 50, detectedPhoneme: '/s/', isSubstituted: true },
            'seashells': { gop: 86, detectedPhoneme: '/ʃ/', isSubstituted: false },
            'seashore': { gop: 88, detectedPhoneme: '/ʃ/', isSubstituted: false }
          };
        } else {
          mockPerformances = {
            'She': { gop: 96, detectedPhoneme: '/ʃ/', isSubstituted: false },
            'shiny': { gop: 92, detectedPhoneme: '/ʃ/', isSubstituted: false },
            'seashells': { gop: 89, detectedPhoneme: '/ʃ/', isSubstituted: false },
            'seashore': { gop: 94, detectedPhoneme: '/ʃ/', isSubstituted: false }
          };
        }
      }

      // Call API
      const res = await fetch('/api/v1/scoring/targeted-sound', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sentenceId: selectedId,
          userWordPerformances: mockPerformances
        })
      });

      if (res.ok) {
        const data = await res.json();
        setEvaluation(data.evaluation);
      } else {
        // Fallback local eval
        setEvaluation(evaluateTargetDrill(selectedId, mockPerformances));
      }
    } catch {
      setEvaluation(evaluateTargetDrill(selectedId, {}));
    } finally {
      setIsEvaluating(false);
    }
  };

  // Play full native sentence audio
  const playFullSentence = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(sentence.text);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    utterance.onstart = () => setIsPlayingFull(true);
    utterance.onend = () => setIsPlayingFull(false);
    utterance.onerror = () => setIsPlayingFull(false);

    window.speechSynthesis.speak(utterance);
  };

  // Isolate Audio Snippet on click (AC 4)
  const isolateAndPlayWord = (wordObj) => {
    setActiveWord(wordObj);
    setIsolatedWordPlaying(wordObj.word);

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(wordObj.word);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      utterance.onend = () => setIsIsolatedWordPlaying(null);
      utterance.onerror = () => setIsIsolatedWordPlaying(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  const currentEval = evaluation || evaluateTargetDrill(selectedId, {});
  const accuracyScore = currentEval.accuracyPercent;

  return (
    <section className="w-full bg-white rounded-2xl p-space-md md:p-space-lg shadow-sm border border-slate-200/90 relative overflow-hidden transition-all">
      {/* Decorative subtle ambient tint */}
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-sky-100/40 blur-[60px] pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-space-sm gap-3 border-b border-slate-100 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-label-mono text-label-mono uppercase text-sky-700 font-bold tracking-wider">
              PRON-203 · Contextual Target Sound Drills
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-label-mono bg-sky-100 text-sky-800 font-bold">
              Target Sound Saturated
            </span>
          </div>
          <h3 className="text-heading-md font-bold text-slate-900 mt-1">
            Luyện Đọc To Âm Mục Tiêu Trong Ngữ Cảnh Hoàn Chỉnh
          </h3>
          <p className="text-body-sm text-slate-500">
            Chuyển từ phát âm từ đơn sang phản xạ câu dài; nhận diện tức thì âm vị mục tiêu và ngăn chặn lỗi thay thế (Substitution Trap).
          </p>
        </div>

        {/* Realtime Badge Counter (AC 2) */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-full px-4 py-2 font-mono text-sm text-white flex items-center gap-2 shadow-sm">
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                accuracyScore >= 80 ? 'bg-emerald-400' : accuracyScore >= 60 ? 'bg-amber-400' : 'bg-rose-400'
              }`} />
              <span className={`relative inline-flex rounded-full h-3 w-3 ${
                accuracyScore >= 80 ? 'bg-emerald-500' : accuracyScore >= 60 ? 'bg-amber-500' : 'bg-rose-500'
              }`} />
            </span>
            <span className="font-bold text-sky-300">
              {currentEval.badgeText}
            </span>
          </div>
        </div>
      </div>

      {/* Phoneme Drill Tabs */}
      <div className="flex flex-wrap items-center gap-2 mt-4 pt-1">
        {Object.values(TARGET_SATURATED_SENTENCES).map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => {
              setSelectedId(s.id);
              setActiveWord(null);
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 border ${
              selectedId === s.id
                ? 'bg-sky-600 border-sky-600 text-white shadow-sm'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            <span className="font-ipa-inline font-bold px-1.5 py-0.5 rounded bg-white/20 text-white">
              {s.targetPhoneme}
            </span>
            <span>{s.targetName.split('(')[0]}</span>
            <span className="text-[10px] opacity-75">({s.totalOccurrences} âm)</span>
          </button>
        ))}
      </div>

      {/* Interactive Sentence Reading Canvas (AC 1 & AC 4) */}
      <div className="mt-5 p-5 bg-gradient-to-br from-slate-50 via-sky-50/20 to-white rounded-xl border border-sky-100/80 shadow-xs relative">
        <div className="flex items-center justify-between mb-3 text-xs text-slate-500 font-label-mono">
          <span className="flex items-center gap-1.5 text-sky-700 font-semibold">
            <span className="material-symbols-outlined text-sm">touch_app</span>
            Bấm vào bất kỳ từ nào để cô lập &amp; nghe phát âm mẫu (Audio Snippet)
          </span>
          <span className="font-mono text-slate-400">
            {sentence.totalOccurrences} vị trí âm {sentence.targetPhoneme}
          </span>
        </div>

        {/* Sentence Text with Target Highlight Tokens */}
        <div className="flex flex-wrap items-baseline gap-2.5 text-xl md:text-2xl font-serif text-slate-800 leading-relaxed py-3">
          {currentEval.breakdown.map((item, idx) => {
            const isTargetWord = item.hasTarget;
            const isPlayingThis = isolatedWordPlaying === item.word;

            return (
              <button
                key={`${item.word}-${idx}`}
                type="button"
                onClick={() => isolateAndPlayWord(item)}
                className={`relative group inline-flex items-center gap-1 transition-all rounded-lg px-2 py-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                  isTargetWord
                    ? item.isCorrect
                      ? 'bg-sky-100/80 text-sky-900 border border-sky-300 font-bold hover:bg-sky-200/90 shadow-xs'
                      : 'bg-rose-100 text-rose-900 border border-rose-300 font-bold hover:bg-rose-200'
                    : 'hover:bg-slate-200/60 text-slate-700'
                } ${isPlayingThis ? 'ring-2 ring-sky-500 ring-offset-1 scale-105' : ''}`}
                title={`Click để nghe từ "${item.word}" ${item.ipa}`}
              >
                <span>{item.word}</span>

                {/* Subscript or Tag for Target Sound Occurrences */}
                {isTargetWord && (
                  <span className={`text-[10px] font-mono px-1 rounded font-bold ${
                    item.isCorrect
                      ? 'bg-sky-600 text-white'
                      : 'bg-rose-600 text-white animate-bounce'
                  }`}>
                    {item.isCorrect ? sentence.targetPhoneme : '⚠️ ' + item.detectedPhoneme}
                  </span>
                )}

                {/* Speaker icon hint on hover */}
                <span className="material-symbols-outlined text-xs text-sky-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  volume_up
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Word Snippet Inspector (AC 4) */}
        {activeWord && (
          <div className="mt-3 pt-3 border-t border-sky-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-sky-200 text-sky-900 font-mono font-bold">
                🔊 Đang cô lập từ: "{activeWord.word}"
              </span>
              <span className="font-ipa-inline font-bold text-sky-700">{activeWord.ipa}</span>
              {activeWord.hasTarget && (
                <span className="text-emerald-700 font-medium">
                  {activeWord.isCorrect ? '✅ Đạt chuẩn âm mục tiêu' : '❌ Cần điều chỉnh vị trí cấu âm'}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => isolateAndPlayWord(activeWord)}
              className="px-2.5 py-1 rounded bg-sky-600 text-white hover:bg-sky-700 font-semibold flex items-center gap-1 shadow-2xs"
            >
              <span className="material-symbols-outlined text-sm">replay</span> Phát lại từ này
            </button>
          </div>
        )}
      </div>

      {/* Substitution Detection Alerts Drawer (AC 3) */}
      {currentEval.substitutions && currentEval.substitutions.length > 0 && (
        <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-300 text-slate-800">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-amber-600 text-2xl shrink-0 mt-0.5">
              warning
            </span>
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-amber-900 text-sm">
                  Phát hiện lỗi thay thế âm vị (L1 Substitution Trap)!
                </h4>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-200 text-amber-900 font-mono">
                  {currentEval.substitutions.length} lỗi thay thế
                </span>
              </div>
              {currentEval.substitutions.map((sub, sIdx) => (
                <p key={sIdx} className="text-xs text-amber-800">
                  ⚠️ <strong className="text-amber-950 font-bold">{sub.message}</strong>
                </p>
              ))}
              <p className="text-[11px] text-amber-700 italic pt-1 border-t border-amber-200/60">
                💡 {sentence.vietnameseL1Trap}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Control Actions & Simulation Footer */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {/* Play Full Sentence Audio */}
          <button
            type="button"
            onClick={playFullSentence}
            disabled={isPlayingFull}
            className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-sm active:scale-95 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-base">
              {isPlayingFull ? 'graphic_eq' : 'volume_up'}
            </span>
            <span>{isPlayingFull ? 'Đang phát câu...' : 'Nghe Toàn Bộ Câu Chuẩn'}</span>
          </button>

          {/* Re-evaluate / Read Aloud Action */}
          <button
            type="button"
            onClick={() => runEvaluation(simulateSubstitution)}
            disabled={isEvaluating}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center gap-2 shadow-xs active:scale-95"
          >
            <span className="material-symbols-outlined text-base text-rose-600">
              {isEvaluating ? 'hourglass_top' : 'mic'}
            </span>
            <span>{isEvaluating ? 'Đang chấm điểm...' : 'Đọc To Thử Thách & Chấm Điểm'}</span>
          </button>
        </div>

        {/* QA & Teacher Simulation Toggle */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
          <span className="text-slate-500 font-medium px-2">Mô phỏng lỗi L1:</span>
          <button
            type="button"
            onClick={() => setSimulateSubstitution(!simulateSubstitution)}
            className={`px-3 py-1 rounded-md font-bold transition-all ${
              simulateSubstitution
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:text-slate-900 shadow-2xs'
            }`}
          >
            {simulateSubstitution ? 'Lỗi thay thế (/θ/->/t/): Bật' : 'Giọng đọc chuẩn: Bật'}
          </button>
        </div>
      </div>
    </section>
  );
}
