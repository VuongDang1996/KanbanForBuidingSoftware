import React, { useState, useEffect, useRef } from 'react';
import {
  MASTERCLASS_LESSONS,
  getMasterclassLesson,
  getCurrentCue,
  evaluateMasterclassSession
} from '../../lib/scoring/videoMasterclass';

export default function VideoMasterclassPlayer({ initialLessonId = 'mc_theta_01' }) {
  const [activeLessonId, setActiveLessonId] = useState(initialLessonId);
  const [lesson, setLesson] = useState(() => getMasterclassLesson(initialLessonId) || MASTERCLASS_LESSONS[0]);
  const [cameraAngle, setCameraAngle] = useState('frontal'); // 'frontal' | 'profile_45'
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0); // 0.25 | 0.5 | 1.0
  const [loopEnabled, setLoopEnabled] = useState(false);
  const [autoZoom, setAutoZoom] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  const timerRef = useRef(null);

  useEffect(() => {
    const l = getMasterclassLesson(activeLessonId) || MASTERCLASS_LESSONS[0];
    setLesson(l);
    setCurrentTimeSec(0);
    setIsPlaying(false);
    setIsCompleted(false);
    setSaveStatus(null);
  }, [activeLessonId]);

  const activeCue = getCurrentCue(lesson, currentTimeSec) || lesson.cues[0];

  // Playback timer ticker
  useEffect(() => {
    if (isPlaying) {
      const stepMs = 50;
      timerRef.current = setInterval(() => {
        setCurrentTimeSec((prev) => {
          const delta = (stepMs / 1000) * playbackRate;
          let next = prev + delta;

          // Check A-B Loop
          if (loopEnabled && activeCue) {
            if (next >= activeCue.endSec) {
              return activeCue.startSec;
            }
          }

          // Check End of Lesson
          if (next >= lesson.durationSec) {
            setIsPlaying(false);
            setIsCompleted(true);
            return lesson.durationSec;
          }

          return next;
        });
      }, stepMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackRate, loopEnabled, activeCue, lesson.durationSec]);

  // Keyboard hotkeys: Space (Play/Pause), V (Camera toggle), L (Loop toggle)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      } else if (e.key.toLowerCase() === 'v') {
        e.preventDefault();
        setCameraAngle((a) => (a === 'frontal' ? 'profile_45' : 'frontal'));
      } else if (e.key.toLowerCase() === 'l') {
        e.preventDefault();
        setLoopEnabled((l) => !l);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    setCurrentTimeSec(ratio * lesson.durationSec);
  };

  const handleSaveProgress = async () => {
    try {
      const res = await fetch('/api/v1/masterclass/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonId: lesson.id,
          watchDurationSec: Math.max(currentTimeSec, isCompleted ? lesson.durationSec : currentTimeSec),
          cameraAngle,
          playbackRate,
          loopEnabled
        })
      });
      if (res.ok) {
        const data = await res.json();
        setSaveStatus(data.progress.feedback);
      } else {
        const local = evaluateMasterclassSession({
          lessonId: lesson.id,
          watchDurationSec: currentTimeSec,
          cameraAngle,
          playbackRate,
          loopEnabled
        });
        setSaveStatus(local.feedback);
      }
    } catch {
      const local = evaluateMasterclassSession({
        lessonId: lesson.id,
        watchDurationSec: currentTimeSec,
        cameraAngle,
        playbackRate,
        loopEnabled
      });
      setSaveStatus(local.feedback);
    }
  };

  const currentZoom = autoZoom && activeCue ? activeCue.zoomLevel : 1.0;

  return (
    <section className="w-full bg-slate-950 rounded-3xl p-6 md:p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6 mb-8 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              PRON-210
            </span>
            <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">
              Video Masterclass &amp; Exaggerated Articulation
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <span>🎬 Lớp Học Khẩu Hình Phóng Đại Đồng Bộ</span>
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Quan sát chuyển động cơ miệng siêu nét ở góc quay 45° và chính diện, kết hợp zoom 2.2x đồng bộ WebVTT Cues và quay chậm 0.25x.
          </p>
        </div>

        {/* Lesson selector pills */}
        <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 shrink-0">
          {MASTERCLASS_LESSONS.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => setActiveLessonId(l.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeLessonId === l.id
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 scale-105'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <span className="font-mono text-sm">{l.phoneme}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Player Frame & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start relative z-10">
        {/* Left 8 Cols: Video Viewport Canvas */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* 16:9 Video Simulation Stage */}
          <div className="relative w-full aspect-video rounded-3xl bg-slate-950 border-2 border-slate-800 overflow-hidden shadow-2xl flex items-center justify-center group">
            {/* Camera angle indicator watermark */}
            <div className="absolute top-4 left-4 z-30 flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700/80">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
              <span className="text-xs font-mono font-bold text-white uppercase">
                {cameraAngle === 'frontal' ? 'FRONTAL VIEW (0°)' : 'PROFILE VIEW (45°)'}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">(PHÍM V)</span>
            </div>

            {/* Auto-zoom scale indicator */}
            <div className="absolute top-4 right-4 z-30 flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700/80">
              <span className="text-xs font-mono font-bold text-amber-400">
                ZOOM: {currentZoom.toFixed(1)}x
              </span>
            </div>

            {/* Visual Vector Simulation with Dynamic Zoom transform */}
            <div
              className="w-full h-full flex items-center justify-center transition-transform duration-500 ease-out"
              style={{
                transform: `scale(${currentZoom})`
              }}
            >
              <svg
                viewBox="0 0 400 300"
                className="w-full h-full max-h-[300px]"
                xmlns="http://www.w3.org/2000/svg"
              >
                {cameraAngle === 'frontal' ? (
                  /* Frontal View Graphic */
                  <g id="frontal_view">
                    {/* Face Contour */}
                    <path
                      d="M 100 80 Q 200 40 300 80 Q 320 200 200 270 Q 80 200 100 80 Z"
                      fill="#1e293b"
                      stroke="#475569"
                      strokeWidth="2"
                    />
                    {/* Lips Outer Outline */}
                    <path
                      d="M 130 180 Q 200 145 270 180 Q 200 230 130 180 Z"
                      fill="#f43f5e"
                      fillOpacity="0.85"
                      stroke="#fb7185"
                      strokeWidth="2.5"
                    />
                    {/* Teeth Upper */}
                    <path
                      d="M 150 175 Q 200 170 250 175 L 245 185 Q 200 180 155 185 Z"
                      fill="#f8fafc"
                      stroke="#cbd5e1"
                      strokeWidth="1"
                    />
                    {/* Interdental Tongue Tip (Zoom Target) */}
                    {activeCue && activeCue.lipShape === 'tongue_interdental' ? (
                      <path
                        d="M 165 182 Q 200 178 235 182 Q 200 205 165 182 Z"
                        fill="#fb7185"
                        stroke="#f43f5e"
                        strokeWidth="1.5"
                      />
                    ) : (
                      <ellipse cx="200" cy="190" rx="35" ry="12" fill="#881337" opacity="0.6" />
                    )}
                    {/* Teeth Lower */}
                    <path
                      d="M 155 195 Q 200 200 245 195 L 240 202 Q 200 205 160 202 Z"
                      fill="#f8fafc"
                      stroke="#cbd5e1"
                      strokeWidth="1"
                    />
                  </g>
                ) : (
                  /* Profile 45-degree Graphic */
                  <g id="profile_view">
                    {/* Profile Face Contour */}
                    <path
                      d="M 80 50 Q 200 40 220 120 L 250 150 L 210 160 Q 220 180 215 200 L 190 250 Q 80 260 80 50 Z"
                      fill="#1e293b"
                      stroke="#475569"
                      strokeWidth="2"
                    />
                    {/* Profile Nose & Upper Lip */}
                    <path
                      d="M 250 150 L 210 160 Q 225 175 220 185 L 205 188"
                      fill="none"
                      stroke="#fb7185"
                      strokeWidth="3"
                    />
                    {/* Profile Teeth */}
                    <rect x="206" y="180" width="8" height="10" rx="2" fill="#f8fafc" />
                    {/* Profile Protruding Tongue Tip */}
                    {activeCue && activeCue.lipShape === 'tongue_interdental' ? (
                      <path
                        d="M 212 188 Q 235 188 235 192 Q 235 196 210 196 Z"
                        fill="#fb7185"
                        stroke="#f43f5e"
                        strokeWidth="1.5"
                      />
                    ) : (
                      <path d="M 205 190 Q 180 190 170 195" fill="none" stroke="#fb7185" strokeWidth="2" />
                    )}
                    {/* Profile Lower Lip & Chin */}
                    <path
                      d="M 205 198 Q 220 202 215 210 L 190 250"
                      fill="none"
                      stroke="#fb7185"
                      strokeWidth="3"
                    />
                  </g>
                )}

                {/* Glowing Neon Target Ring on Tongue Cue (AC 2) */}
                {activeCue && activeCue.zoomLevel > 1.5 && (
                  <g className="animate-pulse">
                    <circle
                      cx="200"
                      cy="188"
                      r="24"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2.5"
                      strokeDasharray="4 2"
                    />
                    <circle cx="200" cy="188" r="4" fill="#38bdf8" />
                  </g>
                )}
              </svg>
            </div>

            {/* Dynamic WebVTT Cue Overlay Box at bottom of player */}
            <div className="absolute bottom-4 left-4 right-4 z-30 bg-slate-950/90 backdrop-blur-md p-4 rounded-2xl border border-slate-700/80 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                    {activeCue ? activeCue.title : 'Đang phát'}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    [{currentTimeSec.toFixed(1)}s / {lesson.durationSec.toFixed(1)}s]
                  </span>
                </div>
                <div className="text-sm font-semibold text-white">
                  {activeCue ? activeCue.instruction : ''}
                </div>
              </div>

              {activeCue && (
                <div className="bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xl text-xs text-amber-300 shrink-0">
                  <span className="font-bold mr-1">💡 Mẹo L1:</span>
                  {activeCue.vietnameseTip}
                </div>
              )}
            </div>
          </div>

          {/* Interactive Scrubber Timeline */}
          <div
            className="w-full h-3 bg-slate-900 rounded-full cursor-pointer relative overflow-hidden border border-slate-800"
            onClick={handleSeek}
          >
            {/* Cue break indicators */}
            {lesson.cues.map((c) => (
              <div
                key={c.id}
                className="absolute top-0 bottom-0 w-0.5 bg-slate-700 z-10"
                style={{ left: `${(c.startSec / lesson.durationSec) * 100}%` }}
                title={c.title}
              />
            ))}

            {/* Played progress fill */}
            <div
              className="h-full bg-gradient-to-r from-rose-600 to-sky-500 transition-all duration-75"
              style={{ width: `${(currentTimeSec / lesson.durationSec) * 100}%` }}
            />
          </div>

          {/* Player Controls Dock */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800">
            {/* Play/Pause & Reset */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPlaying((p) => !p)}
                className="p-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/30 transition-all"
                title="Phím Space để bật/tắt"
              >
                <span className="material-symbols-outlined text-lg">
                  {isPlaying ? 'pause' : 'play_arrow'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCurrentTimeSec(0);
                  setIsPlaying(false);
                }}
                className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors"
                title="Phát lại từ đầu"
              >
                <span className="material-symbols-outlined text-lg">replay</span>
              </button>

              {/* Camera Switcher (Frontal / Profile) */}
              <button
                type="button"
                onClick={() => setCameraAngle((a) => (a === 'frontal' ? 'profile_45' : 'frontal'))}
                className="px-3.5 py-2 rounded-xl bg-slate-800 text-xs font-bold text-sky-400 hover:bg-slate-700 border border-slate-700 transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">switch_video</span>
                <span>{cameraAngle === 'frontal' ? 'Đổi Góc 45°' : 'Đổi Góc Thẳng'}</span>
              </button>
            </div>

            {/* Speed selection pills */}
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500 font-mono px-1">TỐC ĐỘ:</span>
              {[0.25, 0.5, 1.0].map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => setPlaybackRate(rate)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                    playbackRate === rate
                      ? 'bg-rose-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>

            {/* A-B Loop & Auto Zoom toggles */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setLoopEnabled((l) => !l)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                  loopEnabled
                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-md'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                }`}
                title="Phím L để lặp đoạn A-B"
              >
                <span className="material-symbols-outlined text-sm">repeat</span>
                <span>Lặp Đoạn A-B</span>
              </button>

              <button
                type="button"
                onClick={() => setAutoZoom((z) => !z)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                  autoZoom
                    ? 'bg-sky-600 border-sky-400 text-white'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                Auto-Zoom 2x
              </button>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Masterclass Lesson Details & Cues Stepper */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Lesson Metadata Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-rose-400 font-bold">
                BÀI HỌC: {lesson.phoneme}
              </span>
              <span className="text-xs font-mono text-slate-400">
                {lesson.durationSec} giây
              </span>
            </div>

            <h3 className="text-white font-bold text-base leading-snug">
              {lesson.title}
            </h3>

            <div className="mt-2 text-xs text-slate-400 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-slate-500">
                person
              </span>
              <span>{lesson.expert}</span>
            </div>

            {/* Dual Angle Description */}
            <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400 leading-relaxed">
              <span className="font-bold text-slate-300">
                Góc quay hiện tại ({cameraAngle === 'frontal' ? 'Nhìn Thẳng' : 'Nghiêng 45°'}):
              </span>{' '}
              {cameraAngle === 'frontal'
                ? lesson.angles[0].description
                : lesson.angles[1].description}
            </div>
          </div>

          {/* WebVTT Cues List */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3">
              CÁC MỐC KHẨU HÌNH ĐỒNG BỘ (WEBVTT):
            </h4>

            <div className="space-y-2.5">
              {lesson.cues.map((c, idx) => {
                const isActive = activeCue && activeCue.id === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => setCurrentTimeSec(c.startSec)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-rose-500/10 border-rose-500 text-white ring-1 ring-rose-500/40'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className={`w-5 h-5 rounded-md text-[10px] font-mono font-bold flex items-center justify-center ${
                          isActive ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {idx + 1}
                        </span>
                        <span className="font-bold text-xs">{c.title}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">
                        {c.startSec}s - {c.endSec}s
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1 pl-7">
                      {c.instruction}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Completion & Sync Button */}
            <div className="mt-5 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={handleSaveProgress}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-base">check_circle</span>
                <span>Lưu Tiến Độ Hoàn Thành Lớp Học</span>
              </button>

              {saveStatus && (
                <div className="mt-2.5 p-2 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 text-xs text-center">
                  {saveStatus}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
