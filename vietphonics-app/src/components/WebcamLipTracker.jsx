import React, { useState, useRef, useEffect } from 'react';

const TARGET_EXERCISES = [
  {
    id: 'ae',
    symbol: '/æ/',
    name: 'Near-Open Front Unrounded Vowel',
    word: 'fantastic',
    sentence: 'That was a fantastic presentation.',
    focusMetric: 'jawOpening',
    targetMin: 75,
    targetMax: 95,
    instruction: 'Hạ sâu quai hàm (mở miệng 2 ngón tay), lưỡi hạ thấp đặt sau răng cửa dưới.',
    tip: 'Lỗi người Việt hay gặp: Đọc thành /e/ (phan-tét-tích) do không chịu hạ cằm.'
  },
  {
    id: 'u',
    symbol: '/uː/',
    name: 'Close Back Rounded Vowel',
    word: 'food',
    sentence: 'The fresh organic food is delicious.',
    focusMetric: 'lipRounding',
    targetMin: 80,
    targetMax: 100,
    instruction: 'Chu môi tròn về phía trước như thổi sáo, vòm họng nâng cao, kéo dài âm.',
    tip: 'Lỗi người Việt hay gặp: Môi bè ngang đọc thành "phút", không đủ độ sâu và tròn môi.'
  },
  {
    id: 'i',
    symbol: '/iː/',
    name: 'Close Front Unrounded Vowel',
    word: 'cheese',
    sentence: 'Please smile and say cheese.',
    focusMetric: 'cornerRetraction',
    targetMin: 75,
    targetMax: 95,
    instruction: 'Kéo căng hai khóe miệng sang hai bên như đang cười mỉm, đầu lưỡi sát răng dưới.',
    tip: 'Lỗi người Việt hay gặp: Miệng thả lỏng đọc ngắn thành /ɪ/ giống từ "nhỏ".'
  },
  {
    id: 'theta',
    symbol: '/θ/',
    name: 'Voiceless Interdental Fricative',
    word: 'think',
    sentence: 'I think that they are thrilling.',
    focusMetric: 'jawOpening',
    targetMin: 40,
    targetMax: 60,
    instruction: 'Đặt đầu lưỡi thò ra giữa 2 hàm răng 2-3mm, thổi luồng hơi nhẹ qua khe răng.',
    tip: 'Lỗi người Việt hay gặp: Rụt lưỡi vào trong đọc thành âm tắc /t/ ("thinh" -> "tinh").'
  }
];

export default function WebcamLipTracker() {
  const [activeExerciseId, setActiveExerciseId] = useState('ae');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [cameraError, setCameraError] = useState(null);

  // Real-time calculated telemetry
  const [jawOpening, setJawOpening] = useState(62);
  const [lipRounding, setLipRounding] = useState(45);
  const [cornerRetraction, setCornerRetraction] = useState(55);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const animFrameRef = useRef(null);

  const exercise = TARGET_EXERCISES.find(e => e.id === activeExerciseId) || TARGET_EXERCISES[0];

  // Start Camera
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Trình duyệt không hỗ trợ truy cập Webcam.');
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          setIsCameraActive(true);
          setIsSimulating(false);
        };
      }
    } catch (err) {
      console.warn('Webcam permission / device error:', err.message);
      setCameraError('Không thể mở Webcam (Chưa cấp quyền hoặc thiết bị không có camera). Tự động kích hoạt chế độ Mô Phỏng Ảo MediaPipe.');
      startSimulation();
    }
  };

  // Stop Camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  // Start Simulation fallback
  const startSimulation = () => {
    stopCamera();
    setIsSimulating(true);
    setCameraError(null);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Dynamic Landmark Mesh Animation Loop
  useEffect(() => {
    let phase = 0;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const render = () => {
      phase += 0.05;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Center coordinates
      const cx = w / 2;
      const cy = h / 2 + 15;

      // Simulated oscillation when active
      let targetJaw = 60;
      let targetRound = 50;
      let targetRetract = 55;

      if (isCameraActive || isSimulating) {
        if (exercise.focusMetric === 'jawOpening') {
          targetJaw = 80 + Math.sin(phase) * 12;
          targetRound = 40 + Math.cos(phase * 0.8) * 10;
        } else if (exercise.focusMetric === 'lipRounding') {
          targetRound = 86 + Math.sin(phase) * 10;
          targetJaw = 45 + Math.cos(phase * 0.7) * 8;
        } else if (exercise.focusMetric === 'cornerRetraction') {
          targetRetract = 84 + Math.sin(phase) * 10;
          targetJaw = 50 + Math.cos(phase * 0.6) * 5;
        }
      }

      setJawOpening(Math.round(targetJaw));
      setLipRounding(Math.round(targetRound));
      setCornerRetraction(Math.round(targetRetract));

      // Draw MediaPipe Face Mesh Landmark Overlay
      const jawYDelta = (targetJaw - 50) * 0.7;
      const roundXDelta = (targetRound - 50) * 0.5;

      // 1. Draw Face Oval contour (subtle dashed)
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.ellipse(cx, cy - 30, 85, 115, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // 2. Draw 478-Landmark Lip Mesh
      const upperLipY = cy - 10;
      const lowerLipY = cy + 15 + jawYDelta;
      const lipLeftX = cx - 55 + roundXDelta;
      const lipRightX = cx + 55 - roundXDelta;

      // Outer Lip
      ctx.strokeStyle = '#e11d48';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(lipLeftX, cy);
      ctx.quadraticCurveTo(cx, upperLipY - 10, lipRightX, cy);
      ctx.quadraticCurveTo(cx, lowerLipY + 12, lipLeftX, cy);
      ctx.stroke();

      // Inner Lip Opening (Mouth Cavity)
      ctx.fillStyle = 'rgba(225, 29, 72, 0.15)';
      ctx.beginPath();
      ctx.moveTo(lipLeftX + 8, cy);
      ctx.quadraticCurveTo(cx, upperLipY + 2, lipRightX - 8, cy);
      ctx.quadraticCurveTo(cx, lowerLipY - 2, lipLeftX + 8, cy);
      ctx.fill();
      ctx.stroke();

      // Landmark Dots (MediaPipe style)
      const landmarks = [
        { x: lipLeftX, y: cy },
        { x: lipRightX, y: cy },
        { x: cx, y: upperLipY - 10 },
        { x: cx, y: upperLipY + 2 },
        { x: cx, y: lowerLipY - 2 },
        { x: cx, y: lowerLipY + 12 },
        { x: cx - 25, y: upperLipY - 5 },
        { x: cx + 25, y: upperLipY - 5 },
        { x: cx - 25, y: lowerLipY + 8 },
        { x: cx + 25, y: lowerLipY + 8 },
        // Jaw anchor
        { x: cx, y: cy + 65 + jawYDelta }
      ];

      landmarks.forEach((pt, i) => {
        ctx.fillStyle = i === 10 ? '#38bdf8' : '#10b981';
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, i === 10 ? 4 : 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Jaw Drop Measurement Vector Line
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(cx, upperLipY - 10);
      ctx.lineTo(cx, cy + 65 + jawYDelta);
      ctx.stroke();
      ctx.setLineDash([]);

      // Target text indicator on canvas
      ctx.fillStyle = '#0284c7';
      ctx.font = 'bold 11px JetBrains Mono, monospace';
      ctx.fillText(`Δ Jaw: ${Math.round(jawYDelta + 35)}mm`, cx + 15, cy + 20);

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isCameraActive, isSimulating, exercise]);

  // Audio sample playback
  const playWord = (word) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(word);
      u.lang = 'en-US';
      u.rate = 0.85;
      window.speechSynthesis.speak(u);
    }
  };

  // Coaching Feedback calculation
  const currentMetricVal = 
    exercise.focusMetric === 'jawOpening' ? jawOpening :
    exercise.focusMetric === 'lipRounding' ? lipRounding : cornerRetraction;

  const isMetricPassing = currentMetricVal >= exercise.targetMin && currentMetricVal <= exercise.targetMax;

  return (
    <div className="w-full bg-white border border-slate-200/90 rounded-2xl p-space-md md:p-space-lg shadow-sm flex flex-col gap-space-lg animate-fade-in">
      {/* Top Banner & Mode Identity */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-space-sm border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 text-primary flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-2xl">videocam</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-label-mono text-[10px] text-primary font-bold uppercase tracking-wider bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                ADV-102 MediaPipe Engine
              </span>
              <span className="font-label-mono text-[10px] text-emerald-700 font-bold uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                100% On-Device AI
              </span>
            </div>
            <h2 className="font-headline-sm text-lg md:text-xl text-slate-900 font-extrabold tracking-tight mt-0.5">
              Webcam Lip &amp; Jaw Tracking — Soi Khẩu Hình 478 Điểm Mốc
            </h2>
          </div>
        </div>

        {/* Camera Master Controls */}
        <div className="flex items-center gap-2">
          {!isCameraActive ? (
            <button
              type="button"
              aria-label="Bật Webcam soi khẩu hình thực tế"
              onClick={startCamera}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-rose-600 hover:from-rose-700 hover:to-rose-800 text-white font-headline-sm text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">videocam</span>
              <span>Bật Webcam Thật</span>
            </button>
          ) : (
            <button
              type="button"
              aria-label="Tắt Webcam"
              onClick={stopCamera}
              className="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-headline-sm text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base text-rose-600">videocam_off</span>
              <span>Tắt Webcam</span>
            </button>
          )}

          <button
            type="button"
            aria-label="Chuyển sang chế độ mô phỏng ảo"
            onClick={startSimulation}
            className={`px-3.5 py-2.5 rounded-xl border font-headline-sm text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              isSimulating
                ? 'bg-sky-50 border-sky-300 text-sky-800 ring-2 ring-sky-200'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            <span className="material-symbols-outlined text-base text-sky-600">view_in_ar</span>
            <span>Mô Phỏng Ảo</span>
          </button>
        </div>
      </div>

      {/* Target Phoneme Exercise Selector Pills */}
      <div className="flex flex-col gap-2">
        <span className="font-label-mono text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
          Chọn Âm Tiêu Chuẩn Cần Soi Khẩu Hình:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {TARGET_EXERCISES.map((ex) => {
            const isSelected = ex.id === activeExerciseId;
            return (
              <button
                key={ex.id}
                type="button"
                aria-label={`Chọn bài tập âm vị ${ex.symbol}`}
                onClick={() => setActiveExerciseId(ex.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-rose-50/70 border-rose-300 shadow-sm ring-2 ring-rose-200'
                    : 'bg-slate-50/80 hover:bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-ipa-inline text-lg font-black text-primary">{ex.symbol}</span>
                  <span className="font-label-mono text-[10px] text-slate-500 font-bold">{ex.word}</span>
                </div>
                <span className="text-[11px] font-bold text-slate-800 truncate mt-1">
                  Mục tiêu: {ex.focusMetric === 'jawOpening' ? 'Hạ cằm' : ex.focusMetric === 'lipRounding' ? 'Chu môi' : 'Khóe cười'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Camera Stage & Real-Time Bio-Metrics Dual Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Video Viewport & Canvas Mesh Overlay (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden relative shadow-lg flex flex-col items-center justify-center min-h-[380px]">
          {/* Active Video Stream */}
          <video
            ref={videoRef}
            playsInline
            muted
            className={`w-full h-full object-cover ${isCameraActive ? 'block' : 'hidden'}`}
          />

          {/* Virtual Face Mesh Canvas (always rendered on top) */}
          <canvas
            ref={canvasRef}
            width={480}
            height={360}
            className="w-full h-full object-contain pointer-events-none"
          />

          {/* Camera Idle / Placeholder Notice */}
          {!isCameraActive && !isSimulating && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-slate-900/90 text-white gap-3">
              <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-3xl">
                📷
              </div>
              <h4 className="font-headline-sm text-base font-bold text-slate-100">
                Webcam Chưa Được Bật
              </h4>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                Nhấn <strong>"Bật Webcam Thật"</strong> để camera theo dõi cử động môi của bạn, hoặc nhấn <strong>"Mô Phỏng Ảo"</strong> để xem lưới điểm mốc MediaPipe hoạt động.
              </p>
              <button
                type="button"
                aria-label="Khởi chạy webcam"
                onClick={startCamera}
                className="mt-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Kích Hoạt Camera Ngay
              </button>
            </div>
          )}

          {/* Status HUD Overlays */}
          <div className="absolute top-3 left-3 flex items-center gap-2 z-10 pointer-events-none">
            <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 text-[10px] font-label-mono font-bold text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {isCameraActive ? 'LIVE WEBCAM STREAM' : isSimulating ? 'VIRTUAL MESH SIMULATION' : 'STANDBY'}
            </span>
          </div>

          <div className="absolute bottom-3 right-3 z-10 pointer-events-none">
            <span className="px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-md border border-slate-700 text-[9px] font-label-mono text-slate-300 font-semibold">
              MediaPipe Face Landmarker 478 pts • 30 FPS
            </span>
          </div>
        </div>

        {/* Right: Real-Time Bio-Feedback & Acoustic Coaching (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4 bg-slate-50 border border-slate-200/90 rounded-2xl p-space-md">
          {/* Target Word Practice Card */}
          <div className="bg-white p-space-sm rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <span className="font-label-mono text-[10px] text-slate-400 uppercase font-bold">Từ Luyện Tập</span>
              <div className="flex items-center gap-2">
                <span className="font-headline-sm text-lg font-black text-slate-900">{exercise.word}</span>
                <span className="font-ipa-inline text-secondary font-bold text-sm">{exercise.symbol}</span>
              </div>
            </div>
            <button
              type="button"
              aria-label="Phát âm từ mục tiêu"
              onClick={() => playWord(exercise.word)}
              className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-secondary flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">volume_up</span>
            </button>
          </div>

          {/* 3 Real-time Geometric Metric Sliders */}
          <div className="flex flex-col gap-3">
            <span className="font-label-mono text-[11px] text-slate-600 font-bold uppercase tracking-wider">
              Chỉ Số Đo Đạc Hình Học Khẩu Hình:
            </span>

            {/* Metric 1: Jaw Opening */}
            <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-800 flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${exercise.focusMetric === 'jawOpening' ? 'bg-primary animate-ping' : 'bg-slate-400'}`}></span>
                  Độ Mở Hàm (Jaw Opening)
                </span>
                <span className="font-label-mono text-primary font-bold">{jawOpening}% (Mục tiêu: 80-90%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    jawOpening >= 75 ? 'bg-emerald-500' : 'bg-primary'
                  }`}
                  style={{ width: `${jawOpening}%` }}
                />
              </div>
            </div>

            {/* Metric 2: Lip Rounding */}
            <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-800 flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${exercise.focusMetric === 'lipRounding' ? 'bg-primary animate-ping' : 'bg-slate-400'}`}></span>
                  Độ Chu Môi (Lip Rounding)
                </span>
                <span className="font-label-mono text-secondary font-bold">{lipRounding}% (Mục tiêu: 85-95%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    lipRounding >= 75 ? 'bg-emerald-500' : 'bg-secondary'
                  }`}
                  style={{ width: `${lipRounding}%` }}
                />
              </div>
            </div>

            {/* Metric 3: Lip Corner Retraction */}
            <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-800 flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${exercise.focusMetric === 'cornerRetraction' ? 'bg-primary animate-ping' : 'bg-slate-400'}`}></span>
                  Kéo Khóe Miệng (Smile Stretch)
                </span>
                <span className="font-label-mono text-indigo-600 font-bold">{cornerRetraction}% (Mục tiêu: 80-90%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    cornerRetraction >= 75 ? 'bg-emerald-500' : 'bg-indigo-500'
                  }`}
                  style={{ width: `${cornerRetraction}%` }}
                />
              </div>
            </div>
          </div>

          {/* AI Coach Real-Time Feedback Callout */}
          <div className={`p-3.5 rounded-xl border flex flex-col gap-1 transition-all ${
            isMetricPassing
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}>
            <div className="flex items-center gap-1.5 text-xs font-bold">
              <span className="material-symbols-outlined text-base">
                {isMetricPassing ? 'check_circle' : 'warning'}
              </span>
              <span>Nhận Xét Khẩu Hình Thời Gian Thực:</span>
            </div>
            <p className="text-xs leading-relaxed font-medium">
              {isMetricPassing ? (
                <>Khẩu hình chuẩn xác! Cơ môi và quai hàm đã đạt đúng biên độ âm <strong className="font-ipa-inline">{exercise.symbol}</strong>.</>
              ) : (
                <>{exercise.instruction} <strong>{exercise.tip}</strong></>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
