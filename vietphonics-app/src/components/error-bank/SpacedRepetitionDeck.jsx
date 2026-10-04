import React, { useState, useEffect } from 'react';

export default function SpacedRepetitionDeck() {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [stats, setStats] = useState({ totalCards: 0, dueCount: 0, learningCount: 0, masteredCount: 0 });
  const [reviewMessage, setReviewMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCards = async () => {
    try {
      setLoading(true);
      const [cardsRes, statsRes] = await Promise.all([
        fetch('/api/v1/error-bank/due-cards'),
        fetch('/api/v1/error-bank/stats')
      ]);

      const cardsData = await cardsRes.json();
      const statsData = await statsRes.json();

      if (cardsData.success) {
        setCards(cardsData.dueCards || []);
      }
      if (statsData.success) {
        setStats(statsData);
      }
    } catch (err) {
      console.error('Failed to load error bank cards:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const playTTS = (text, rate = 0.85) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = rate;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleRateCard = async (quality, label) => {
    const currentCard = cards[currentIndex];
    if (!currentCard) return;

    // Simulate pronunciation score based on rating
    const simScore = quality === 5 ? 92 : quality === 4 ? 86 : 65;

    try {
      const res = await fetch('/api/v1/error-bank/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cardId: currentCard.id,
          quality,
          score: simScore
        })
      });

      const data = await res.json();
      if (data.success) {
        if (data.sm2.isMastered) {
          setReviewMessage(`🎉 Tuyệt vời! "${currentCard.word}" đã ĐẠT CHUẨN THUẦN THỤC (Mastered)! +50 Điểm Thành Tích!`);
        } else {
          setReviewMessage(`Đã ghi nhận [${label}]: Lịch ôn tiếp theo sau ${data.sm2.intervalDays} ngày (EF: ${data.sm2.easinessFactor}).`);
        }

        setTimeout(() => {
          setReviewMessage(null);
          setIsFlipped(false);
          // Advance to next card or refresh
          if (currentIndex < cards.length - 1) {
            setCurrentIndex(prev => prev + 1);
          } else {
            fetchCards();
            setCurrentIndex(0);
          }
        }, 2200);
      }
    } catch (err) {
      console.error('Error reviewing card:', err);
    }
  };

  const currentCard = cards[currentIndex];

  return (
    <div
      className="w-full bg-white border border-slate-200/90 rounded-3xl shadow-[0_4px_24px_rgba(15,23,42,0.04)] p-6 md:p-8 flex flex-col justify-between"
      data-testid="spaced-repetition-deck"
    >
      {/* Header & Stats Counters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-2xl">style</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="font-label-mono text-[11px] text-rose-700 font-bold uppercase tracking-wider">
                Thuật Toán SuperMemo SM-2 (ELSA-402)
              </span>
            </div>
            <h3 className="font-headline-md text-lg font-bold text-slate-900 mt-0.5">
              Thẻ Ôn Tập Lặp Lại Ngắt Quãng 3D
            </h3>
          </div>
        </div>

        {/* Stats Pill Badges */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>Cần Ôn: <strong>{stats.dueCount}</strong></span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Đang Luyện: <strong>{stats.learningCount}</strong></span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Đã Thuần Thục: <strong>{stats.masteredCount}</strong></span>
          </div>
        </div>
      </div>

      {/* Review Feedback Message */}
      {reviewMessage && (
        <div className="mb-5 p-3 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-bold flex items-center gap-2 animate-fade-in">
          <span className="material-symbols-outlined text-indigo-600 text-base">verified</span>
          <span>{reviewMessage}</span>
        </div>
      )}

      {/* 3D Flip Card Container (AC 2) */}
      {currentCard ? (
        <div className="perspective-1000 my-4 flex flex-col items-center">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className={`w-full max-w-xl min-h-[290px] rounded-3xl p-6 md:p-8 cursor-pointer transition-all duration-700 preserve-3d relative shadow-lg ${
              isFlipped
                ? 'bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white border border-indigo-500/40 rotate-y-180'
                : 'bg-gradient-to-br from-slate-50 to-white text-slate-900 border-2 border-slate-200/90 hover:border-indigo-300'
            }`}
            data-testid="flip-card-element"
            style={{
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}
          >
            {/* FRONT OF CARD */}
            {!isFlipped ? (
              <div className="flex flex-col justify-between h-full space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 font-label-mono text-[11px] font-bold">
                    MẶT TRƯỚC: TỪ VỰNG CẦN KHẮC PHỤC
                  </span>
                  <span className="text-xs text-slate-400 font-label-mono">
                    Thẻ {currentIndex + 1}/{cards.length}
                  </span>
                </div>

                <div className="text-center py-2">
                  <h4 className="text-3xl md:text-4xl font-headline-lg font-extrabold tracking-tight text-slate-900">
                    {currentCard.word}
                  </h4>
                  <div className="font-mono text-sm text-rose-600 font-bold mt-2">
                    Lỗi cũ: {currentCard.phoneme_error || currentCard.phonemeError}
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-100/80 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-rose-500 text-base">record_voice_over</span>
                    <span className="text-xs text-slate-700 font-mono">
                      Bạn từng đọc sai: "{currentCard.past_audio || currentCard.pastUserAudio}"
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      playTTS(currentCard.word, 0.7);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    data-testid="listen-front-audio"
                  >
                    <span className="material-symbols-outlined text-xs">volume_up</span>
                    <span>Nghe</span>
                  </button>
                </div>

                <div className="text-center text-[11px] text-slate-400 font-mono">
                  👉 Click vào thẻ bài để LẬT 3D XEM MẸO CƠ MIỆNG
                </div>
              </div>
            ) : (
              /* BACK OF CARD (Rotated 180deg) */
              <div
                className="flex flex-col justify-between h-full space-y-4"
                style={{ transform: 'rotateY(180deg)' }}
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-label-mono text-[11px] font-bold border border-emerald-500/30">
                    MẶT SAU: KỸ THUẬT PHÁT ÂM CHUẨN IPA
                  </span>
                  <span className="text-xs text-indigo-300 font-label-mono">
                    EF: {currentCard.easiness_factor || currentCard.easinessFactor}
                  </span>
                </div>

                <div className="text-center py-1">
                  <div className="font-ipa-inline text-2xl font-bold text-amber-300">
                    {currentCard.ipa}
                  </div>
                  <p className="text-xs text-slate-200 mt-2 leading-relaxed px-2">
                    {currentCard.muscle_tip || currentCard.muscleTip}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      playTTS(currentCard.word, 0.85);
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                    data-testid="listen-native-audio"
                  >
                    <span className="material-symbols-outlined text-sm">volume_up</span>
                    <span>Phát Âm Bản Xứ Chuẩn</span>
                  </button>
                </div>

                <div className="text-center text-[11px] text-indigo-300/80 font-mono">
                  Chọn mức độ bên dưới để thuật toán SM-2 lên lịch ôn tiếp theo
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="py-12 text-center text-slate-500 text-sm">
          <span className="material-symbols-outlined text-4xl text-emerald-500 mb-2">task_alt</span>
          <p className="font-bold text-slate-800">Không còn thẻ nào cần ôn hôm nay!</p>
          <p className="text-xs text-slate-500 mt-1">Bạn đã hoàn thành toàn bộ kho lỗi của chu kỳ này.</p>
        </div>
      )}

      {/* SM-2 Recall Rating Buttons (AC 3) */}
      {currentCard && (
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col items-center gap-3">
          <span className="font-label-mono text-xs uppercase font-bold text-slate-500">
            Tự Đánh Giá Mức Độ Ghi Nhớ (SuperMemo-2 Feedback):
          </span>
          <div className="grid grid-cols-3 gap-3 w-full max-w-xl">
            <button
              type="button"
              onClick={() => handleRateCard(3, 'Khó')}
              className="py-3 px-3 rounded-2xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 font-headline-sm text-xs font-bold transition-all flex flex-col items-center gap-0.5 cursor-pointer shadow-xs active:scale-[0.98]"
              data-testid="rate-hard-btn"
            >
              <span className="flex items-center gap-1 text-rose-600">
                <span className="material-symbols-outlined text-base">sentiment_dissatisfied</span>
                <span>Khó</span>
              </span>
              <span className="text-[10px] text-rose-600/80 font-mono font-normal">Ôn lại: 1 Ngày</span>
            </button>

            <button
              type="button"
              onClick={() => handleRateCard(4, 'Tốt')}
              className="py-3 px-3 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 font-headline-sm text-xs font-bold transition-all flex flex-col items-center gap-0.5 cursor-pointer shadow-xs active:scale-[0.98]"
              data-testid="rate-good-btn"
            >
              <span className="flex items-center gap-1 text-amber-600">
                <span className="material-symbols-outlined text-base">sentiment_satisfied</span>
                <span>Tốt</span>
              </span>
              <span className="text-[10px] text-amber-600/80 font-mono font-normal">Ôn lại: 3 Ngày</span>
            </button>

            <button
              type="button"
              onClick={() => handleRateCard(5, 'Dễ')}
              className="py-3 px-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-headline-sm text-xs font-bold transition-all flex flex-col items-center gap-0.5 cursor-pointer shadow-xs active:scale-[0.98]"
              data-testid="rate-easy-btn"
            >
              <span className="flex items-center gap-1 text-emerald-600">
                <span className="material-symbols-outlined text-base">sentiment_very_satisfied</span>
                <span>Dễ</span>
              </span>
              <span className="text-[10px] text-emerald-600/80 font-mono font-normal">Ôn lại: 7 Ngày</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
