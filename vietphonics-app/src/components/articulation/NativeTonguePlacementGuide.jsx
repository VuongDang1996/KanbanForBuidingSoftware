import React, { useState, useEffect } from 'react';
import {
  NATIVE_PLACEMENT_GUIDES,
  getPlacementGuideByPhoneme,
  evaluatePlacementFeedback
} from '../../lib/scoring/nativePlacement';

export default function NativeTonguePlacementGuide({ initialPhoneme = '/ð/' }) {
  const [activePhoneme, setActivePhoneme] = useState(initialPhoneme);
  const [guide, setGuide] = useState(() => getPlacementGuideByPhoneme(initialPhoneme) || NATIVE_PLACEMENT_GUIDES[0]);
  const [userRating, setUserRating] = useState(5);
  const [feedbackNote, setFeedbackNote] = useState('');
  const [feedbackResult, setFeedbackResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [playingWord, setPlayingWord] = useState(null);

  useEffect(() => {
    const g = getPlacementGuideByPhoneme(activePhoneme) || NATIVE_PLACEMENT_GUIDES[0];
    setGuide(g);
    setUserRating(5);
    setFeedbackNote('');
    setFeedbackResult(null);
  }, [activePhoneme]);

  const playBenchmarkWord = (word) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(word);
      u.lang = 'en-US';
      u.rate = 0.8;
      setPlayingWord(word);
      u.onend = () => setPlayingWord(null);
      u.onerror = () => setPlayingWord(null);
      window.speechSynthesis.speak(u);
    }
  };

  const handleFeedbackSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/v1/pedagogy/placement-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneme: guide.phoneme,
          rating: userRating,
          feedbackNote
        })
      });

      if (res.ok) {
        const data = await res.json();
        setFeedbackResult(data.feedback);
      } else {
        const local = evaluatePlacementFeedback({
          phoneme: guide.phoneme,
          rating: userRating,
          feedbackNote
        });
        setFeedbackResult(local);
      }
    } catch {
      const local = evaluatePlacementFeedback({
        phoneme: guide.phoneme,
        rating: userRating,
        feedbackNote
      });
      setFeedbackResult(local);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full bg-slate-950 rounded-3xl p-6 md:p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6 mb-8 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              VN-105
            </span>
            <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">
              Native Tongue Placement Guides
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <span>👅 Cẩm Nang Đặt Lưỡi Đối Chiếu Tiếng Việt</span>
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Xóa bỏ thuật ngữ ngữ âm học khô khan bằng các mẹo xúc giác dân gian và sơ đồ đối chiếu vòm miệng tiếng Việt vs tiếng Anh.
          </p>
        </div>

        {/* Phoneme selector pills */}
        <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 shrink-0">
          {NATIVE_PLACEMENT_GUIDES.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setActivePhoneme(g.phoneme)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activePhoneme === g.phoneme
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30 scale-105'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <span className="font-mono text-sm">{g.phoneme}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: 3 Steps, Palate Comparison & Tactile Mnemonic */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        {/* Left 8 Cols: 3-Step Practical Layout & Side-by-Side Comparison */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Card Title & Analogy */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                MẸO DÂN GIAN CHO NGƯỜI VIỆT
              </span>
              <span className="text-xs bg-amber-500/10 border border-amber-500/30 text-amber-300 px-3 py-1 rounded-full font-medium">
                Độ khó: {guide.difficultyLevel}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {guide.title}
            </h3>
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80 text-sm text-slate-300 flex items-center gap-2.5">
              <span className="text-lg">🐝</span>
              <span><strong>Hình dung:</strong> {guide.vietnameseAnalogy}</span>
            </div>
          </div>

          {/* 3-Step Flow Cards (AC 1) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {guide.threeSteps.map((st) => (
              <div
                key={st.step}
                className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 font-mono font-black text-xs flex items-center justify-center">
                      0{st.step}
                    </span>
                    <h4 className="text-sm font-bold text-white">{st.name}</h4>
                  </div>
                  <p className="text-xs text-amber-200/90 font-medium mb-2 leading-relaxed">
                    {st.action}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
                  {st.detail}
                </div>
              </div>
            ))}
          </div>

          {/* Side-by-Side Palate Comparison (AC 2) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-4">
              SƠ ĐỒ ĐỐI CHIẾU VÒM MIỆNG (L1 VIỆT NAM VS TARGET TIẾNG ANH):
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Vietnamese Habit */}
              <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30">
                <div className="flex items-center gap-2 mb-2 text-rose-400 font-bold text-xs">
                  <span className="material-symbols-outlined text-sm">cancel</span>
                  <span>Thói Quen Tiếng Việt (Dễ Sai)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {guide.contrastPalate.vietnamesePosture}
                </p>
              </div>

              {/* English Standard */}
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
                <div className="flex items-center gap-2 mb-2 text-emerald-400 font-bold text-xs">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  <span>Khẩu Hình Chuẩn Bản Xứ</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {guide.contrastPalate.englishPosture}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Tactile Mnemonic & Benchmark Words & Feedback */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Tactile Mnemonic Card (AC 3) */}
          <div className="bg-gradient-to-br from-amber-950/30 to-slate-900 border border-amber-500/40 rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-xl">
                  {guide.tactileMnemonic.icon}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-amber-400">
                  CẢM GIÁC XÚC GIÁC
                </span>
                <h4 className="text-sm font-bold text-white mt-0.5">
                  {guide.tactileMnemonic.action}
                </h4>
              </div>
            </div>

            <p className="text-xs text-amber-100/90 leading-relaxed bg-slate-950/60 p-3.5 rounded-2xl border border-amber-500/20">
              {guide.tactileMnemonic.sensation}
            </p>
          </div>

          {/* Benchmark Words to Try */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3">
              TỪ MẪU LUYỆN TẬP THỰC TẾ:
            </h4>

            <div className="grid grid-cols-2 gap-2.5">
              {guide.benchmarkWords.map((item) => (
                <div
                  key={item.word}
                  className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center justify-between"
                >
                  <div>
                    <div className="text-sm font-bold text-white">{item.word}</div>
                    <div className="text-[11px] font-mono text-amber-400">{item.ipa}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => playBenchmarkWord(item.word)}
                    className={`p-2 rounded-xl transition-all ${
                      playingWord === item.word
                        ? 'bg-amber-600 text-white animate-pulse'
                        : 'bg-slate-850 text-slate-300 hover:bg-amber-600 hover:text-white'
                    }`}
                    title="Nghe phát âm mẫu"
                  >
                    <span className="material-symbols-outlined text-sm">
                      {playingWord === item.word ? 'graphic_eq' : 'volume_up'}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Helpfulness Rating Widget */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
              MẸO CÓ HỮU ÍCH VỚI BẠN?
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Đánh giá để giúp chúng tôi tinh chỉnh cẩm nang cho cộng đồng người học.
            </p>

            {/* Stars 1 to 5 */}
            <div className="flex items-center gap-2 mb-3">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setUserRating(s)}
                  className={`text-2xl transition-transform hover:scale-110 ${
                    s <= userRating ? 'text-amber-400' : 'text-slate-700'
                  }`}
                >
                  ★
                </button>
              ))}
              <span className="text-xs font-mono text-slate-400 ml-2">
                {userRating}/5 sao
              </span>
            </div>

            <input
              type="text"
              placeholder="Ghi chú thêm (tùy chọn)..."
              value={feedbackNote}
              onChange={(e) => setFeedbackNote(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 mb-3"
            />

            <button
              type="button"
              onClick={handleFeedbackSubmit}
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-600/30 transition-all flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">rate_review</span>
              <span>{isSubmitting ? 'Đang gửi...' : 'Gửi Đánh Giá Cẩm Nang (SQLite)'}</span>
            </button>

            {feedbackResult && (
              <div className="mt-3 p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 text-xs text-center">
                {feedbackResult.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
