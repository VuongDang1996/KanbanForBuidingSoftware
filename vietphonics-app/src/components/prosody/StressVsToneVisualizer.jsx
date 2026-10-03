import React, { useState, useEffect } from 'react';
import { SCHWA_BENCHMARK_WORDS, analyzeWordSchwa, getHapticPatternForSyllables } from '../../lib/scoring/schwaDemotion';

export default function StressVsToneVisualizer({ initialWord = 'banana' }) {
  const [selectedWord, setSelectedWord] = useState(initialWord);
  const [evaluation, setEvaluation] = useState(() => analyzeWordSchwa(initialWord));
  const [isSimulatingL1Trap, setIsSimulatingL1Trap] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isPlayingRhythm, setIsPlayingRhythm] = useState(false);
  const [activeSyllableIdx, setActiveSyllableIdx] = useState(null);

  const runEvaluation = async (wordKey, trapMode) => {
    setIsEvaluating(true);
    try {
      const res = await fetch('/api/v1/pedagogy/schwa-check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'default_user'
        },
        body: JSON.stringify({
          word: wordKey,
          simulateL1Trap: trapMode
        })
      });

      if (res.ok) {
        const data = await res.json();
        setEvaluation(data.evaluation);
      } else {
        setEvaluation(analyzeWordSchwa(wordKey, null, trapMode));
      }
    } catch {
      setEvaluation(analyzeWordSchwa(wordKey, null, trapMode));
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleSelectWord = (wordKey) => {
    setSelectedWord(wordKey);
    runEvaluation(wordKey, isSimulatingL1Trap);
  };

  const handleToggleL1Trap = () => {
    const nextMode = !isSimulatingL1Trap;
    setIsSimulatingL1Trap(nextMode);
    runEvaluation(selectedWord, nextMode);
  };

  /**
   * AC 4: Mobile Haptic Rhythm using Navigator.vibrate API
   */
  const triggerHapticRhythm = () => {
    if (isPlayingRhythm) return;
    setIsPlayingRhythm(true);

    const syllables = evaluation.syllables;
    const hapticPattern = getHapticPatternForSyllables(syllables);

    // Trigger device vibration if available
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(hapticPattern);
      } catch (e) {
        console.warn('Vibration API error:', e);
      }
    }

    // Visual rhythm playback animation through syllables
    let cumulativeTime = 0;
    syllables.forEach((s, idx) => {
      setTimeout(() => {
        setActiveSyllableIdx(idx);
      }, cumulativeTime);
      cumulativeTime += s.targetDurationMs + 140;
    });

    setTimeout(() => {
      setActiveSyllableIdx(null);
      setIsPlayingRhythm(false);
    }, cumulativeTime + 100);
  };

  const evalData = evaluation.evaluation;
  const currentBenchmark = SCHWA_BENCHMARK_WORDS[selectedWord] || SCHWA_BENCHMARK_WORDS.banana;

  return (
    <section className="w-full bg-white rounded-xl p-4 md:p-6 shadow-sm border border-slate-200/90 relative mt-6">
      {/* Header & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-purple-600 text-2xl">compare_arrows</span>
            <h3 className="font-bold text-slate-800 text-lg md:text-xl">
              Đối Soát Trọng Âm vs Thanh Điệu &amp; Luyện Giảm Âm Schwa (VN-103)
            </h3>
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
              Stress-timed vs Syllable-timed
            </span>
          </div>
          <p className="text-slate-500 text-sm mt-0.5">
            Cơ chế đối chiếu giữa "Thanh điệu đơn lập tiếng Việt" và "Nhịp điệu trọng âm tiếng Anh" - Kỹ năng hạ âm Schwa (/ə/)
          </p>
        </div>

        {/* Word Selector */}
        <div className="flex flex-wrap items-center gap-1.5">
          {Object.keys(SCHWA_BENCHMARK_WORDS).map((key) => (
            <button
              key={key}
              onClick={() => handleSelectWord(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedWord === key
                  ? 'bg-purple-600 text-white shadow-sm ring-2 ring-purple-200'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      {/* AC 2: Side-by-Side Linguistic Contrast Card */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: Vietnamese Syllable-timed */}
        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <span className="material-symbols-outlined text-amber-700 text-base">flag</span>
            <span>TIẾNG VIỆT (Ngôn ngữ đơn lập - Syllable-timed)</span>
          </div>
          <div className="mt-2 text-xs text-amber-800 space-y-1.5">
            <p>
              • Mỗi âm tiết là <strong>một từ độc lập</strong>, có thời lượng phát âm đều đặn (~200ms mỗi âm).
            </p>
            <p>
              • Người Việt dùng <strong>6 thanh điệu</strong> (sắc, huyền, hỏi, ngã, nặng, ngang) để phân biệt nghĩa, không có khái niệm "lướt nuốt âm".
            </p>
            <div className="p-2 bg-white/80 rounded border border-amber-200 mt-2 font-mono text-[11px] text-amber-900">
              Ví dụ: "quả - chuối - tiêu" → [200ms] - [200ms] - [200ms] (đều đặn như gõ nhịp)
            </div>
          </div>
        </div>

        {/* Right: English Stress-timed */}
        <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200/80">
          <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
            <span className="material-symbols-outlined text-indigo-700 text-base">timer</span>
            <span>TIẾNG ANH (Ngôn ngữ nhịp điệu - Stress-timed)</span>
          </div>
          <div className="mt-2 text-xs text-indigo-800 space-y-1.5">
            <p>
              • Khoảng cách giữa các trọng âm chính là <strong>bất biến</strong>.
            </p>
            <p>
              • Để kịp nhịp, các âm tiết không nhấn <strong>bắt buộc phải rút gọn thành âm lướt Schwa /ə/</strong> (&lt;70ms) và thả lỏng hoàn toàn cơ miệng.
            </p>
            <div className="p-2 bg-white/80 rounded border border-indigo-200 mt-2 font-mono text-[11px] text-indigo-900">
              Ví dụ: "ba - NA - na" → [60ms] - [290ms VƯƠN DÀI] - [55ms]
            </div>
          </div>
        </div>
      </div>

      {/* Syllable Progression & Schwa Demotion Meter */}
      <div className="mt-5 p-4 bg-slate-50 border border-slate-200/90 rounded-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black text-slate-800 tracking-wide font-mono uppercase">{currentBenchmark.word}</span>
            <span className="font-mono text-sm text-purple-700 font-bold bg-purple-100 px-2 py-0.5 rounded">{currentBenchmark.ipa}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile Haptic Trigger */}
            <button
              onClick={triggerHapticRhythm}
              disabled={isPlayingRhythm}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isPlayingRhythm
                  ? 'bg-purple-600 text-white animate-pulse'
                  : 'bg-purple-100 text-purple-800 hover:bg-purple-200 border border-purple-300'
              }`}
              title="Phát nhịp trọng âm và rung Haptic trên điện thoại"
            >
              <span className="material-symbols-outlined text-base">vibration</span>
              <span>{isPlayingRhythm ? 'Đang cảm nhận nhịp...' : '📱 Cảm Nhận Nhịp (Haptic)'}</span>
            </button>

            {/* Simulate L1 Trap Toggle */}
            <button
              onClick={handleToggleL1Trap}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                isSimulatingL1Trap
                  ? 'bg-rose-600 text-white border-rose-600 font-semibold'
                  : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
              }`}
            >
              {isSimulatingL1Trap ? '⚠️ Bẫy Đọc Đều L1' : 'Thử Bẫy Đọc Rõ Chữ L1'}
            </button>
          </div>
        </div>

        {/* Syllable Dynamic Bubbles with Haptic Highlight */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 py-4">
          {evaluation.syllables.map((syl, idx) => {
            const isActive = activeSyllableIdx === idx;
            return (
              <div
                key={idx}
                className={`flex flex-col items-center transition-transform duration-200 ${
                  isActive ? 'scale-110' : ''
                }`}
              >
                <div
                  className={`flex items-center justify-center font-bold rounded-2xl shadow-sm transition-all ${
                    syl.isStress
                      ? 'w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xl ring-4 ring-indigo-200 shadow-indigo-200'
                      : syl.isSchwa
                      ? 'w-16 h-16 bg-slate-200 text-slate-700 text-sm border-2 border-dashed border-purple-400'
                      : 'w-18 h-18 bg-slate-100 text-slate-600 text-base border border-slate-300'
                  } ${isActive ? 'ring-4 ring-emerald-400' : ''}`}
                >
                  <div className="text-center">
                    <span className="block font-black">{syl.text}</span>
                    <span className="text-[10px] font-mono opacity-80">/{syl.ipa}/</span>
                  </div>
                </div>

                <div className="mt-2 text-center">
                  <span className={`text-[11px] font-bold block ${syl.isStress ? 'text-indigo-600' : 'text-slate-500'}`}>
                    {syl.isStress ? 'TRỌNG ÂM CHÍNH' : syl.isSchwa ? 'Âm lướt Schwa' : 'Âm phụ'}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {syl.targetDurationMs}ms
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Schwa Formant & Duration Evaluation Metrics (AC 1) */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Metric 1: Duration */}
          <div className="p-3 rounded-lg bg-white border border-slate-200">
            <span className="text-xs text-slate-500 font-medium block">Thời lượng âm Schwa</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className={`text-lg font-bold font-mono ${evalData.isRapidDuration ? 'text-emerald-600' : 'text-rose-600'}`}>
                {evalData.durationMs}ms
              </span>
              <span className="text-xs text-slate-400 font-mono">(Chuẩn &lt;85ms)</span>
            </div>
            <span className={`text-[10px] font-semibold mt-1 block ${evalData.isRapidDuration ? 'text-emerald-700' : 'text-rose-700'}`}>
              {evalData.isRapidDuration ? '✓ Lướt cực nhanh đạt chuẩn' : '✕ Quá dài (chưa giảm âm)'}
            </span>
          </div>

          {/* Metric 2: Formant Neutral Proximity */}
          <div className="p-3 rounded-lg bg-white border border-slate-200">
            <span className="text-xs text-slate-500 font-medium block">Khoảng cách Formant D_neutral</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className={`text-lg font-bold font-mono ${evalData.isNeutralFormant ? 'text-emerald-600' : 'text-rose-600'}`}>
                {evalData.neutralDistance} Hz
              </span>
              <span className="text-xs text-slate-400 font-mono">(Chuẩn &le;160Hz)</span>
            </div>
            <span className={`text-[10px] font-semibold mt-1 block ${evalData.isNeutralFormant ? 'text-emerald-700' : 'text-rose-700'}`}>
              {evalData.isNeutralFormant ? '✓ Khẩu hình thả lỏng trung tâm' : '✕ Miệng mở quá to (F1 cao)'}
            </span>
          </div>

          {/* Metric 3: Overall Schwa Score */}
          <div className="p-3 rounded-lg bg-white border border-slate-200">
            <span className="text-xs text-slate-500 font-medium block">Điểm giảm âm Schwa</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className={`text-lg font-bold font-mono ${evalData.score >= 80 ? 'text-emerald-600' : 'text-amber-600'}`}>
                {evalData.score}/100
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {evalData.isDemoted ? '(Thành công)' : '(Cần hạ âm)'}
              </span>
            </div>
            <span className={`text-[10px] font-semibold mt-1 block ${evalData.isDemoted ? 'text-emerald-700' : 'text-rose-700'}`}>
              {evalData.isDemoted ? '✓ Đạt chuẩn Schwa Demotion' : '⚠️ Bị kéo dài theo thanh điệu'}
            </span>
          </div>
        </div>
      </div>

      {/* Pedagogical Guidance & L1 Diagnostic Alert (AC 3) */}
      <div className="mt-4 flex flex-col md:flex-row gap-3">
        <div className={`p-3.5 rounded-xl border flex-1 ${
          evalData.l1FullVowelTrap
            ? 'bg-rose-50 border-rose-200 text-rose-900'
            : 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
        }`}>
          <div className="flex items-center gap-2 font-bold text-sm">
            <span className="material-symbols-outlined text-base">
              {evalData.l1FullVowelTrap ? 'warning' : 'check_circle'}
            </span>
            <span>{evalData.l1FullVowelTrap ? 'Cảnh Báo Lỗi Không Giảm Âm (L1)' : 'Đánh Giá Âm Lướt Schwa'}</span>
          </div>
          <p className="text-xs mt-1 leading-relaxed">{evaluation.feedback}</p>
        </div>

        <div className="p-3.5 rounded-xl bg-purple-50/60 border border-purple-200 text-purple-900 flex-1">
          <div className="flex items-center gap-2 font-bold text-sm">
            <span className="material-symbols-outlined text-base text-purple-700">tips_and_updates</span>
            <span>Lời Khuyên Khắc Phục Bẫy Tiếng Việt</span>
          </div>
          <p className="text-xs mt-1 leading-relaxed">{evaluation.pedagogicalAdvice}</p>
        </div>
      </div>
    </section>
  );
}
