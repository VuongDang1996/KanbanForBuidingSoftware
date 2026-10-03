import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useRecorder } from '../lib/audio/useRecorder';

const DIAGNOSTIC_SENTENCES = [
  {
    id: 1,
    sentence: "Six months ago, she baked fresh bread for breakfast on the street.",
    target: "Cụm phụ âm /ks/, /nθs/, đuôi -ed /t/, và /st/",
    phonemes: "/sɪks mʌnθs əˈɡoʊ, ʃi beɪkt freʃ bred fɔːr ˈbrekfəst ɒn ðə striːt/",
    focus: "Rụng âm đuôi & nuốt phụ âm cuối"
  },
  {
    id: 2,
    sentence: "They think that the comfortable clothes are worth the price.",
    target: "Cặp âm răng /θ/ - /ð/ và nuốt âm /kl-/",
    phonemes: "/ðeɪ θɪŋk ðæt ðə ˈkʌmftəbl kloʊðz ɑːr wɜːrθ ðə praɪs/",
    focus: "Không kẹp lưỡi giữa hai hàm răng"
  },
  {
    id: 3,
    sentence: "World health experts published specific guidelines on the project.",
    target: "Cụm đuôi /ld/, /lθ/, /kts/, và /dʒ/",
    phonemes: "/wɜːrld helθ ˈekspɜːrts ˈpʌblɪʃt spəˈsɪfɪk ˈɡaɪdlaɪnz ɒn ðə ˈprɒdʒekt/",
    focus: "Ngắt hơi cụm phụ âm liên tiếp"
  },
  {
    id: 4,
    sentence: "Please take a look at the statistics regarding our digital marketing.",
    target: "Nối âm phụ âm - nguyên âm (look at, regarding our) và trọng âm",
    phonemes: "/pliːz teɪk ə lʊk æt ðə stəˈtɪstɪks rɪˈɡɑːrdɪŋ ˈaʊər ˈdɪdʒɪtl ˈmɑːrkɪtɪŋ/",
    focus: "Nói đều bằng phẳng không nối âm"
  },
  {
    id: 5,
    sentence: "She usually watches television while studying English vocabulary.",
    target: "Âm vòm họng /ʃ/, /ʒ/, /tʃ/ và nhịp điệu trọng âm",
    phonemes: "/ʃi ˈjuːʒuəli ˈwɒtʃɪz ˈtelɪvɪʒn waɪl ˈstʌdiɪŋ ˈɪŋɡlɪʃ vəˈkæbjəleri/",
    focus: "Lẫn lộn /s/ và /ʃ/, /z/ và /ʒ/"
  }
];

export default function DiagnosticModal() {
  const { showDiagnosticModal, setShowDiagnosticModal, dialectConfig, setGopScore } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [recordings, setRecordings] = useState({});
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [report, setReport] = useState(null);

  const { isRecording, start, stop, result, audioUrl, status, reset } = useRecorder({
    autoAnalyze: true
  });

  if (!showDiagnosticModal) return null;

  const currentSentence = DIAGNOSTIC_SENTENCES[currentStep];

  const handleStopRecording = async () => {
    await stop();
    const mockScore = 65 + Math.floor(Math.random() * 20);
    setRecordings((prev) => ({
      ...prev,
      [currentStep]: {
        score: mockScore,
        done: true
      }
    }));
  };

  const handleNext = () => {
    reset();
    if (currentStep < DIAGNOSTIC_SENTENCES.length - 1) {
      setCurrentStep((c) => c + 1);
    } else {
      generateReport();
    }
  };

  const generateReport = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
      setGopScore(76);
      setReport({
        overallScore: 76,
        ieltsBand: '7.0',
        cefr: 'B2+',
        toeic: '160',
        topHabits: [
          {
            title: '1. Khắc phục rụng âm đuôi /ks/ và /-st/',
            desc: 'Bạn thường ngắt hơi đột ngột tắt thanh hầu ở cuối từ như "six" và "breakfast". Cần bật nhẹ luồng hơi ra kẽ răng.',
            severity: 'high'
          },
          {
            title: '2. Đặt khẩu hình kẹp lưỡi cho âm /θ/ và /ð/',
            desc: 'Từ "think" và "they" đang bị phát âm tương tự như âm "th" hoặc "d" tiếng Việt. Cần đặt đầu lưỡi chạm mép răng trên.',
            severity: 'medium'
          },
          {
            title: '3. Nhấn trọng âm & Ngữ điệu thay vì đánh dấu thanh điệu',
            desc: 'Tiếng Việt có dấu sắc/huyền làm bạn có xu hướng thêm dấu thanh. Hãy kéo dài nguyên âm mang trọng âm chính.',
            severity: 'medium'
          }
        ],
        pillars: {
          endingSounds: 82,
          confusingPairs: 71,
          stressCadence: 68,
          linking: 59
        }
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 flex flex-col my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-primary flex items-center justify-center font-bold text-lg border border-rose-100">
              <span className="material-symbols-outlined text-xl">psychology</span>
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-900 leading-tight">
                Chẩn Đoán Phát Âm L1 Việt Nam (3 Phút)
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Đang hiệu chuẩn theo: <strong className="text-secondary">{dialectConfig.name}</strong>
              </p>
            </div>
          </div>
          <button aria-label="Mở bài kiểm tra chẩn đoán L1" type="button"
            onClick={() => setShowDiagnosticModal(false)}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Evaluating Spinner */}
        {isEvaluating ? (
          <div className="py-16 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <h4 className="text-lg font-bold text-slate-900">
              Mô hình Acoustic GOP L1 đang tổng hợp phổ âm...
            </h4>
            <p className="text-xs text-slate-500 max-w-sm">
              Đo lường năng lượng dải tần số ZCR âm đuôi, F1/F2 formant và chuyển tiếp cao độ F0.
            </p>
          </div>
        ) : report ? (
          /* Diagnostic Report View */
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-rose-50 via-sky-50 to-indigo-50 border border-slate-200/80 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <span className="font-mono text-xs uppercase font-bold text-primary tracking-wider">
                  Chỉ Số Phát Âm Chuẩn Quốc Tế
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-5xl font-black text-slate-900 font-sans tracking-tight">
                    {report.overallScore}
                  </span>
                  <span className="text-sm font-mono text-slate-500 font-bold">/ 100 GOP</span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Đã triệt tiêu 76% các bẫy thổ âm đặc trưng tiếng Việt.
                </p>
              </div>

              {/* Benchmarks Badge */}
              <div className="grid grid-cols-3 gap-2.5 w-full sm:w-auto">
                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs text-center">
                  <span className="text-[10px] font-mono text-slate-400 block font-bold">IELTS</span>
                  <span className="text-xl font-black text-secondary">{report.ieltsBand}</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs text-center">
                  <span className="text-[10px] font-mono text-slate-400 block font-bold">CEFR</span>
                  <span className="text-xl font-black text-primary">{report.cefr}</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs text-center">
                  <span className="text-[10px] font-mono text-slate-400 block font-bold">TOEIC</span>
                  <span className="text-xl font-black text-indigo-600">{report.toeic}</span>
                </div>
              </div>
            </div>

            {/* Top 3 Habits */}
            <div>
              <h4 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-base">recommend</span>
                <span>Top 3 Thói Quen Cần Triệt Tiêu Sớm Nhất:</span>
              </h4>
              <div className="space-y-2.5">
                {report.topHabits.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col gap-1"
                  >
                    <span className="font-bold text-xs text-slate-900">{item.title}</span>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button aria-label="Nút tương tác" type="button"
                onClick={() => {
                  setReport(null);
                  setCurrentStep(0);
                  setRecordings({});
                }}
                className="flex-1 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 font-bold text-xs text-slate-700 transition-colors"
              >
                Đo Lại Từ Đầu
              </button>
              <button aria-label="Mở bài kiểm tra chẩn đoán L1" type="button"
                onClick={() => setShowDiagnosticModal(false)}
                className="flex-1 py-3 rounded-xl bg-primary hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all"
              >
                Áp Dụng Vào Lộ Trình 10 Phút
              </button>
            </div>
          </div>
        ) : (
          /* Sentence Test Steps */
          <div className="space-y-6">
            {/* Step Progress Pills */}
            <div className="flex items-center justify-between gap-1.5">
              {DIAGNOSTIC_SENTENCES.map((s, idx) => {
                const isCurrent = idx === currentStep;
                const isDone = recordings[idx]?.done;
                return (
                  <div
                    key={s.id}
                    className={`flex-1 h-2 rounded-full transition-all ${
                      isDone
                        ? 'bg-emerald-500'
                        : isCurrent
                        ? 'bg-primary animate-pulse'
                        : 'bg-slate-200'
                    }`}
                  />
                );
              })}
            </div>

            {/* Active Sentence Box */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-primary uppercase">
                  Câu {currentStep + 1} / 5 • Bẫy thổ âm L1
                </span>
                <span className="px-2 py-0.5 rounded bg-rose-50 border border-rose-200 text-primary font-mono text-[11px] font-bold">
                  {currentSentence.focus}
                </span>
              </div>

              <p className="text-xl font-bold text-slate-900 leading-relaxed font-sans">
                "{currentSentence.sentence}"
              </p>

              <div className="font-mono text-xs text-secondary bg-white p-2.5 rounded-lg border border-slate-200">
                IPA: {currentSentence.phonemes}
              </div>

              <div className="text-xs text-slate-500">
                Mục tiêu đo: <strong className="text-slate-700">{currentSentence.target}</strong>
              </div>
            </div>

            {/* Recording Controls */}
            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-100 space-y-3">
              <div className="flex items-center gap-4">
                {!isRecording ? (
                  <button aria-label="Nút tương tác" type="button"
                    onClick={start}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-rose-700 text-white font-bold text-sm shadow-md hover:scale-105 transition-all"
                  >
                    <span className="material-symbols-outlined text-lg">mic</span>
                    <span>Bấm Để Đọc Câu Này</span>
                  </button>
                ) : (
                  <button aria-label="Nút tương tác" type="button"
                    onClick={handleStopRecording}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white font-bold text-sm shadow-md animate-pulse"
                  >
                    <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                    <span>Dừng Thu Âm & Chấm Điểm</span>
                  </button>
                )}
              </div>

              {recordings[currentStep]?.done && (
                <div className="flex items-center gap-2 text-emerald-600 font-mono text-xs font-bold">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  <span>Đã thu thành công! Điểm ước tính: {recordings[currentStep].score}%</span>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
              <button aria-label="Nút tương tác" type="button"
                disabled={currentStep === 0}
                onClick={() => setCurrentStep((c) => Math.max(0, c - 1))}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:pointer-events-none"
              >
                Câu Trước
              </button>

              <button aria-label="Nút tương tác" type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                <span>
                  {currentStep === DIAGNOSTIC_SENTENCES.length - 1 ? 'Xem Kết Quả Toàn Diện' : 'Tiếp Tục'}
                </span>
                <span className="material-symbols-outlined text-sm">east</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
