import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function OnboardingView() {
  const { dialect, setDialect, calibrateAudioDialect, calibrationConfidence, calibrationMode, setActiveTab, setShowDiagnosticModal } = useApp();
  const [selectedGoal, setSelectedGoal] = useState('ielts'); // 'ielts' | 'tech' | 'coda' | 'zero'
  const [examPart, setExamPart] = useState('part1'); // 'part1' | 'part2'
  const [activeIeltsScore, setActiveIeltsScore] = useState(null);
  const [isCalibratingAudio, setIsCalibratingAudio] = useState(false);
  const [audioResult, setAudioResult] = useState(null);
  const [activeTabMode, setActiveTabMode] = useState('manual'); // 'manual' | 'auto_audio'

  const handleAudioCalibration = async () => {
    setIsCalibratingAudio(true);
    setAudioResult(null);
    try {
      // Simulate/trigger acoustic feature extraction on calibration sentence
      const res = await calibrateAudioDialect('Look at the little light shining at night', {
        formantF1F2Offset: 120,
        f0Variance: 0.45,
        glottalStopDetected: false
      });
      setAudioResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsCalibratingAudio(false);
    }
  };

  const goals = [
    { id: 'ielts', icon: '🎯', label: 'IELTS Speaking 7.0+', desc: 'Tập trung tính lưu loát, trọng âm câu và độ chính xác âm vị theo chuẩn chấm thi IDP/BC' },
    { id: 'tech', icon: '💻', label: 'Giao Tiếp IT / Công Sở', desc: 'Thực chiến báo cáo standup, trình bày giải pháp kỹ thuật, thảo luận sprint' },
    { id: 'coda', icon: '⚡', label: 'Xóa Mù Âm Đuôi (Ending Sounds)', desc: 'Triệt tiêu dứt điểm thói quen rụng âm /s/, /ks/, /t/, /d/, -ed' },
    { id: 'zero', icon: '👶', label: 'Mất Gốc Hoàn Toàn', desc: 'Lấy lại phản xạ 44 âm IPA từ đầu với hướng dẫn cơ sinh học chậm 0.5x' }
  ];

  const ieltsQuestions = [
    {
      id: 'q1',
      part: 'part1',
      question: 'Do you work or are you a student?',
      sampleAnswer: 'Currently, I am working as a software developer, specializing in cloud architectures and web applications.',
      targetPhonemes: '/ˈkʌr.ənt.li/',
      bandEstimate: '7.5'
    },
    {
      id: 'q2',
      part: 'part1',
      question: 'What do you find most difficult about learning English pronunciation?',
      sampleAnswer: 'I often struggle with consonant clusters at the ends of words, especially sounds like /ks/ and past tense endings.',
      targetPhonemes: '/ˈstrʌɡ.l/',
      bandEstimate: '7.0'
    },
    {
      id: 'q3',
      part: 'part2',
      question: 'Describe a memorable technology project that you recently completed.',
      sampleAnswer: 'Last month, our engineering team successfully launched an automated payment reconciliation platform with zero transaction fees.',
      targetPhonemes: '/ˌrek.ənˌsɪl.iˈeɪ.ʃən/',
      bandEstimate: '8.0'
    }
  ];

  return (
    <div className="w-full flex flex-col gap-6 py-4 animate-fade-in">
      {/* Top Header */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-slate-200/80 p-5 rounded-2xl shadow-[0_2px_8px_rgba(15,23,42,0.03)]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-2xl">person_pin</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-primary uppercase">
                Hồ Sơ & Hiệu Chuẩn Giọng L1 (ELSA-102 & USER-101)
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-mono font-bold text-slate-600">
                L1 Acoustic Prior Configuration
              </span>
            </div>
            <h2 className="text-lg font-black text-slate-900 leading-tight">
              Định Chuẩn Giọng Vùng Miền & Thiết Lập Mục Tiêu Luyện Tập
            </h2>
          </div>
        </div>

        <button aria-label="Mở bài kiểm tra chẩn đoán L1" type="button"
          onClick={() => setShowDiagnosticModal(true)}
          className="px-5 py-2.5 rounded-xl bg-primary hover:bg-rose-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-transform hover:scale-105"
        >
          <span className="material-symbols-outlined text-sm">assessment</span>
          <span>Chạy Chẩn Đoán L1 3 Phút</span>
        </button>
      </div>

      {/* 3 Regional Dialect Calibration Cards & Audio Mode */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-base text-slate-900">
              1. Hiệu Chuẩn Giọng Mẹ Đẻ (L1 Regional Dialect Calibration - ELSA-102)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Tự động căn chỉnh trọng số phạt GOP, triệt tiêu sai lệch đặc trưng theo thổ âm Bắc - Trung - Nam.
            </p>
          </div>
          
          {/* Switcher Mode: Manual vs Audio Auto-Detect */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-bold">
            <button
              onClick={() => setActiveTabMode('manual')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTabMode === 'manual'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Chọn Thủ Công (3 Miền)
            </button>
            <button
              onClick={() => setActiveTabMode('auto_audio')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                activeTabMode === 'auto_audio'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className="material-symbols-outlined text-sm">mic</span>
              <span>Tự Động Nhận Diện Qua Giọng</span>
            </button>
          </div>
        </div>

        {/* Mode 2: Auto Audio Calibration (AC 2) */}
        {activeTabMode === 'auto_audio' && (
          <div className="p-5 rounded-2xl bg-rose-50/40 border-2 border-primary/30 flex flex-col gap-4 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                  AI
                </span>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">
                    Chế độ tự động đo âm học phát hiện phương ngữ
                  </h4>
                  <p className="text-xs text-slate-500">
                    Đọc câu kiểm tra để bộ phân tích âm học đo độ mở nguyên âm và cách bật âm /l/-/n/
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-mono text-xs font-bold">
                Acoustic Auto-Calibration (ELSA-102 AC 2)
              </span>
            </div>

            {/* Test sentence display */}
            <div className="p-4 rounded-xl bg-white border border-rose-200 shadow-xs flex flex-col gap-1.5">
              <span className="font-mono text-[11px] font-bold text-slate-400 uppercase">
                Câu kiểm tra chuẩn hóa:
              </span>
              <p className="text-base sm:text-lg font-bold text-slate-900 font-serif">
                “Look at the little light shining at night”
              </p>
              <span className="text-xs text-slate-500 font-mono">
                IPA: /lʊk æt ðə ˈlɪtl laɪt ˈʃaɪnɪŋ æt naɪt/ • Kiểm tra bẫy âm: /l/ vs /n/, /æ/, /t/
              </span>
            </div>

            {/* Action & Result */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={handleAudioCalibration}
                disabled={isCalibratingAudio}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-primary hover:bg-rose-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-105 disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-base">
                  {isCalibratingAudio ? 'hourglass_top' : 'mic'}
                </span>
                <span>
                  {isCalibratingAudio
                    ? 'Đang phân tích formants F1/F2...'
                    : 'Đọc Câu Kiểm Tra & Nhận Diện Ngay'}
                </span>
              </button>

              {audioResult && (
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs animate-fade-in">
                  <span className="material-symbols-outlined text-emerald-600 text-lg">
                    check_circle
                  </span>
                  <div>
                    <span className="font-bold">
                      Đã xác định: {audioResult.detectedDialect === 'bac' ? 'Miền Bắc' : audioResult.detectedDialect === 'trung' ? 'Miền Trung' : 'Miền Nam'} (Độ tin cậy: {audioResult.confidencePercentage}%)
                    </span>
                    <p className="text-[11px] text-emerald-700 mt-0.5">
                      {audioResult.rationale}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Miền Bắc */}
          <div
            onClick={() => setDialect('bac')}
            className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between gap-3 ${
              dialect === 'bac'
                ? 'border-primary bg-rose-50/30 shadow-md scale-102 ring-2 ring-primary/20'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-xl bg-rose-100 text-primary flex items-center justify-center font-bold text-lg">
                  🇻🇳
                </span>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Miền Bắc</h4>
                  <span className="text-[10px] font-mono text-slate-400">Hà Nội & Bắc Bộ</span>
                </div>
              </div>
              {dialect === 'bac' && (
                <span className="px-2 py-0.5 rounded-full bg-primary text-white font-mono text-[10px] font-bold">
                  ✓ Đang Chọn
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Cân chỉnh tật lẫn lộn âm <strong className="text-primary font-mono">/d/-/z/</strong>, <strong className="text-primary font-mono">/l/-/n/</strong>, và thói quen bẹt âm nguyên âm ngắn <strong className="text-secondary font-mono">/æ/</strong>.
            </p>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-mono flex items-center justify-between text-slate-500">
              <span>Vector F1-F2:</span>
              <span className="font-bold text-primary">+120 Hz offset</span>
            </div>
          </div>

          {/* Miền Trung */}
          <div
            onClick={() => setDialect('trung')}
            className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between gap-3 ${
              dialect === 'trung'
                ? 'border-secondary bg-sky-50/30 shadow-md scale-102 ring-2 ring-secondary/20'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-xl bg-sky-100 text-secondary flex items-center justify-center font-bold text-lg">
                  🇻🇳
                </span>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Miền Trung</h4>
                  <span className="text-[10px] font-mono text-slate-400">Huế, Đà Nẵng, Nghệ Tĩnh</span>
                </div>
              </div>
              {dialect === 'trung' && (
                <span className="px-2 py-0.5 rounded-full bg-secondary text-white font-mono text-[10px] font-bold">
                  ✓ Đang Chọn
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Cân chỉnh cao độ nặng thanh sắc/nặng, giữ trường độ nguyên âm ngắn và tránh nén rung cổ họng quá mức.
            </p>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-mono flex items-center justify-between text-slate-500">
              <span>Vector Pitch F0:</span>
              <span className="font-bold text-secondary">Pitch Tonal Drop</span>
            </div>
          </div>

          {/* Miền Nam */}
          <div
            onClick={() => setDialect('nam')}
            className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between gap-3 ${
              dialect === 'nam'
                ? 'border-indigo-600 bg-indigo-50/30 shadow-md scale-102 ring-2 ring-indigo-600/20'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg">
                  🇻🇳
                </span>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Miền Nam</h4>
                  <span className="text-[10px] font-mono text-slate-400">TP.HCM & Nam Bộ</span>
                </div>
              </div>
              {dialect === 'nam' && (
                <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white font-mono text-[10px] font-bold">
                  ✓ Đang Chọn
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Cân chỉnh xu hướng nuốt âm <strong className="text-primary font-mono">/v/-/j/</strong> ("dô" vs "vô"), khắc phục rơi phụ âm cuối <strong className="text-secondary font-mono">/t/, /k/</strong>.
            </p>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-mono flex items-center justify-between text-slate-500">
              <span>Coda Finalizer:</span>
              <span className="font-bold text-indigo-600">Stop Release boost</span>
            </div>
          </div>
        </div>
      </div>

      {/* Priority Goal Selection */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-base text-slate-900">
          2. Chọn Mục Tiêu Phản Xạ Ưu Tiên (Daily Learning Focus)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {goals.map((g) => {
            const isSelected = selectedGoal === g.id;
            return (
              <div
                key={g.id}
                onClick={() => setSelectedGoal(g.id)}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                  isSelected
                    ? 'border-primary bg-rose-50/40 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{g.icon}</span>
                  <span className="font-bold text-xs text-slate-900">{g.label}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{g.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* IELTS Speaking Part 1 & 2 AI Mock Examiner (VN-104 & ELSA-103) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-secondary uppercase">
                VN-104 & ELSA-103 • IELTS Speaking Mock Examiner
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              Phòng Thi Thử IELTS Speaking AI Dành Cho Thí Sinh Việt Nam
            </h3>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button aria-label="Nút tương tác" type="button"
              onClick={() => setExamPart('part1')}
              className={`px-3 py-1 rounded-lg transition-all ${
                examPart === 'part1' ? 'bg-white text-secondary shadow-xs' : 'text-slate-600'
              }`}
            >
              Part 1: Phỏng Vấn Ngắn
            </button>
            <button aria-label="Nút tương tác" type="button"
              onClick={() => setExamPart('part2')}
              className={`px-3 py-1 rounded-lg transition-all ${
                examPart === 'part2' ? 'bg-white text-secondary shadow-xs' : 'text-slate-600'
              }`}
            >
              Part 2: Thuyết Trình Cue Card
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {ieltsQuestions
            .filter((q) => q.part === examPart)
            .map((q) => (
              <div key={q.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-secondary uppercase">Examiner Question:</span>
                  <span className="font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Target Band: {q.bandEstimate}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 font-sans">"{q.question}"</h4>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                  <strong>Câu trả lời mẫu chuẩn âm vị:</strong> “{q.sampleAnswer}”
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-mono text-xs text-slate-500">
                    Âm vị trọng tâm: <strong className="text-primary">{q.targetPhonemes}</strong>
                  </span>
                  <button aria-label="Chuyển phân hệ học" type="button"
                    onClick={() => {
                      setActiveIeltsScore(q.bandEstimate);
                      setActiveTab('phong-luyen-phat-am');
                    }}
                    className="px-4 py-2 rounded-xl bg-secondary hover:bg-sky-600 text-white font-bold text-xs flex items-center gap-1 shadow-xs"
                  >
                    <span className="material-symbols-outlined text-sm">mic</span>
                    <span>Luyện Trả Lời Câu Này</span>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
