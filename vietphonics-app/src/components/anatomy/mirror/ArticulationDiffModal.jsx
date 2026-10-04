import React, { useState } from 'react';

export default function ArticulationDiffModal({
  isOpen,
  onClose,
  analysisResult,
  snapshotImage,
  phonemeProfile,
  onRetake
}) {
  const [isGhostOverlayActive, setIsGhostOverlayActive] = useState(false);

  if (!isOpen || !analysisResult) return null;

  const score = analysisResult.score ?? 0;
  const status = analysisResult.status || 'NEEDS_ADJUSTMENT';
  const metrics = analysisResult.metrics || {};
  const feedback = analysisResult.feedback || {};
  const quota = analysisResult.quota;

  const userApertureMm = metrics.userApertureMm ?? 0;
  const targetApertureMm = metrics.targetApertureMm ?? 0;
  const apertureDeltaMm = metrics.apertureDeltaMm ?? 0;
  const userRatio = metrics.userRatio ?? 1.0;
  const targetRatio = metrics.targetRatio ?? 1.0;
  const ratioDelta = metrics.ratioDelta ?? 0;
  const userTeethGapMm = metrics.userTeethGapMm ?? 0;
  const targetTeethGapMm = metrics.targetTeethGapMm ?? 0;
  const teethDeltaMm = metrics.teethDeltaMm ?? 0;
  const tongueRequired = Boolean(metrics.tongueRequired);
  const interdentalTongueDetected = Boolean(metrics.interdentalTongueDetected);
  const landmarkBox = metrics.landmarkBox || { leftPercent: 50, topPercent: 68, widthPercent: 32, heightPercent: 18 };

  const isExcellent = status === 'EXCELLENT';
  const isNeedsAdjustment = status === 'NEEDS_ADJUSTMENT';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-scaleUp"
        role="dialog"
        aria-modal="true"
        aria-labelledby="diff-modal-title"
      >
        {/* 1. MODAL HEADER */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-xl font-bold border border-indigo-500/30">
              🪞
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="diff-modal-title" className="text-base md:text-lg font-black tracking-tight text-white">
                  Đối Chiếu Khẩu Hình Thực Tế &amp; Cơ Môi Chuẩn 2D
                </h3>
                <span className="font-mono text-sm px-2 py-0.5 rounded-lg bg-rose-600/30 text-rose-300 border border-rose-500/40 font-bold">
                  {phonemeProfile.phoneme}
                </span>
              </div>
              <p className="text-slate-400 text-xs mt-0.5">
                Phân tích tỷ lệ hình học môi, khoảng hở răng và vị trí đầu lưỡi của bạn
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Score Pill */}
            <div
              className={`px-3 py-1.5 rounded-2xl font-black text-xs flex items-center gap-1.5 shadow-sm border ${
                isExcellent
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : isNeedsAdjustment
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
              }`}
            >
              <span className="text-base font-mono">{score}%</span>
              <span>{isExcellent ? 'Chuẩn Xác' : isNeedsAdjustment ? 'Cần Chỉnh' : 'Chưa Đạt'}</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              title="Đóng (Esc)"
            >
              ✕
            </button>
          </div>
        </div>

        {/* 2. BODY CONTENT */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* A. SIDE-BY-SIDE VISUAL COMPARISON STAGE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left: User Captured Real Photo */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  Ảnh Chụp Khẩu Hình Thật Của Bạn
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  {userApertureMm}mm • Tỷ lệ {userRatio}
                </span>
              </div>

              <div className="relative w-full h-48 bg-slate-950 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-inner flex items-center justify-center">
                {snapshotImage ? (
                  <img
                    src={snapshotImage}
                    alt="Khẩu hình của bạn"
                    className="w-full h-full object-cover transform -scale-x-100"
                  />
                ) : (
                  <div className="text-slate-500 text-xs">Không có ảnh chụp</div>
                )}

                {/* Detected Landmark Bounding Box Overlay anchored to real mouth position */}
                <div
                  className="absolute border-2 border-dashed border-amber-400 rounded-2xl pointer-events-none transition-all shadow-md flex items-center justify-center"
                  style={{
                    left: `${landmarkBox.leftPercent}%`,
                    top: `${landmarkBox.topPercent}%`,
                    width: `${Math.min(55, Math.max(22, landmarkBox.widthPercent))}%`,
                    height: `${Math.min(45, Math.max(14, landmarkBox.heightPercent))}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 font-mono text-[9px] font-black uppercase whitespace-nowrap shadow-sm">
                    Vùng Cơ Môi Đo Đạc
                  </span>
                </div>

                {/* Ghost Overlay mode: Project reference contour over user mouth */}
                {isGhostOverlayActive && (
                  <div
                    className="absolute border-2 border-emerald-400 rounded-2xl bg-emerald-500/15 shadow-xl animate-pulse pointer-events-none transition-all flex items-center justify-center"
                    style={{
                      left: `${landmarkBox.leftPercent}%`,
                      top: `${landmarkBox.topPercent}%`,
                      width: `${Math.min(55, Math.max(20, landmarkBox.widthPercent * (targetRatio / Math.max(0.1, userRatio))))}%`,
                      height: `${Math.min(45, Math.max(12, landmarkBox.heightPercent * (targetApertureMm / Math.max(1, userApertureMm))))}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-emerald-600 text-white font-mono text-[9px] font-bold uppercase whitespace-nowrap shadow-sm">
                      Khung Khẩu Hình Chuẩn
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Gold-Standard 2D Coronal Lip Reference */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  Mô Hình Khẩu Hình Chuẩn Y Khoa 2D
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  {targetApertureMm}mm • Tỷ lệ {targetRatio}
                </span>
              </div>

              <div className="relative w-full h-48 bg-slate-50 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-inner flex items-center justify-center p-3">
                {/* Coronal Lip Graphic representation */}
                <svg viewBox="0 0 280 140" className="w-full h-full object-contain">
                  <ellipse
                    cx="140"
                    cy="70"
                    rx={Math.min(95, Math.max(40, targetRatio * 32))}
                    ry={Math.min(55, Math.max(20, targetApertureMm * 1.8))}
                    fill="#fb7185"
                  />
                  <ellipse
                    cx="140"
                    cy="70"
                    rx={Math.min(75, Math.max(25, targetRatio * 22))}
                    ry={Math.min(38, Math.max(10, targetApertureMm * 1.1))}
                    fill="#1e293b"
                  />
                  {/* Teeth */}
                  <rect x="122" y="58" width="16" height="12" fill="#ffffff" rx="1" />
                  <rect x="142" y="58" width="16" height="12" fill="#ffffff" rx="1" />

                  {/* Tongue tip for dental */}
                  {tongueRequired && (
                    <ellipse cx="140" cy="74" rx="18" ry="8" fill="#f43f5e" />
                  )}
                </svg>

                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] font-mono font-bold text-slate-600 bg-white/90 backdrop-blur px-2.5 py-1 rounded-xl border border-slate-200">
                  <span>Hình thái: {phonemeProfile.lipShape?.label || 'Chuẩn Quốc Tế'}</span>
                  <span className="text-emerald-700">Độ khép răng: {targetTeethGapMm}mm</span>
                </div>
              </div>
            </div>
          </div>

          {/* Toggle Ghost Overlay button */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setIsGhostOverlayActive(!isGhostOverlayActive)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer border ${
                isGhostOverlayActive
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-md ring-2 ring-emerald-300'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300'
              }`}
            >
              <span className="material-symbols-outlined text-sm">layers</span>
              <span>{isGhostOverlayActive ? 'Đang Bật Lớp Phủ Đè (Ghost Diff)' : 'Bật Lớp Phủ Đè Lên Ảnh Thật (Ghost Diff)'}</span>
            </button>
          </div>

          {/* B. 4 GEOMETRIC METRICS BREAKDOWN GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {/* Metric 1: Jaw Aperture */}
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl flex flex-col justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Độ Mở Hàm (Aperture)
              </span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-lg font-black text-slate-900 font-mono">
                  {userApertureMm} <span className="text-xs font-sans font-normal text-slate-500">mm</span>
                </span>
                <span
                  className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    Math.abs(apertureDeltaMm) <= 2.5
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {apertureDeltaMm >= 0 ? `+${apertureDeltaMm}` : apertureDeltaMm} mm
                </span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1">Chuẩn: {targetApertureMm} mm</span>
            </div>

            {/* Metric 2: Lip Ratio (Spread vs Puckered) */}
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl flex flex-col justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Độ Chu / Dẹt Môi
              </span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-lg font-black text-slate-900 font-mono">
                  {userRatio} <span className="text-xs font-sans font-normal text-slate-500">W/H</span>
                </span>
                <span
                  className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    ratioDelta <= 0.4
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  Δ {ratioDelta}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1">Chuẩn: {targetRatio}</span>
            </div>

            {/* Metric 3: Teeth Gap */}
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl flex flex-col justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Khoảng Hở Răng
              </span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-lg font-black text-slate-900 font-mono">
                  {userTeethGapMm} <span className="text-xs font-sans font-normal text-slate-500">mm</span>
                </span>
                <span
                  className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    teethDeltaMm <= 1.5
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  Δ {teethDeltaMm} mm
                </span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1">Chuẩn: {targetTeethGapMm} mm</span>
            </div>

            {/* Metric 4: Interdental Tongue Presence */}
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl flex flex-col justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Đầu Lưỡi Kẹp Răng
              </span>
              <div className="mt-2 flex items-baseline justify-between">
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-xl ${
                    tongueRequired
                      ? interdentalTongueDetected
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {tongueRequired
                    ? interdentalTongueDetected
                      ? '✓ Đã Thò Lưỡi'
                      : '✗ Chưa Thò Lưỡi'
                    : 'Không Yêu Cầu'}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1">
                {tongueRequired ? 'Bắt buộc với /θ/, /ð/' : 'Âm miệng thông thường'}
              </span>
            </div>
          </div>

          {/* C. VIETNAMESE ACTIONABLE FEEDBACK CARD */}
          <div
            className={`p-4 rounded-2xl border-l-4 shadow-sm flex items-start gap-3 ${
              isExcellent
                ? 'bg-emerald-50 border-emerald-200 border-l-emerald-600 text-emerald-950'
                : isNeedsAdjustment
                ? 'bg-amber-50 border-amber-200 border-l-amber-500 text-amber-950'
                : 'bg-rose-50 border-rose-200 border-l-rose-500 text-rose-950'
            }`}
          >
            <span
              className={`material-symbols-outlined text-xl shrink-0 mt-0.5 ${
                isExcellent
                  ? 'text-emerald-700'
                  : isNeedsAdjustment
                  ? 'text-amber-600'
                  : 'text-rose-600'
              }`}
            >
              {isExcellent ? 'check_circle' : isNeedsAdjustment ? 'info' : 'warning'}
            </span>
            <div>
              <strong className="text-xs font-black uppercase tracking-wider block">
                {feedback.summary || (isExcellent ? 'Khẩu hình đạt chuẩn y khoa' : 'Khẩu hình cần điều chỉnh')}:
              </strong>
              <p className="text-xs mt-1 leading-relaxed">{feedback.actionAdvice}</p>
            </div>
          </div>
        </div>

        {/* 3. MODAL FOOTER */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          {/* Quota info */}
          <div className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
            <span className="material-symbols-outlined text-sm text-slate-400">info</span>
            <span>
              {quota?.tier === 'pro'
                ? 'Gói Pro: Soi gương & phân tích không giới hạn'
                : `Hôm nay còn: ${quota?.remainingToday ?? 2}/3 lượt miễn phí`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onRetake}
              className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all cursor-pointer shadow-sm"
            >
              Chụp Lại Ảnh
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all cursor-pointer shadow-md shadow-rose-900/20"
            >
              Hoàn Tất &amp; Luyện Tập Tiếp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
