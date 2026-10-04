import React, { useState, useEffect } from 'react';
import {
  getSynthSfxCatalog,
  playProceduralSfx,
  unlockSafariAudioContext,
  isReducedMotionPreferred
} from '../../lib/audio/soundSynthesizer';

export default function SoundSynthesizerSettings({ isOpen, onClose }) {
  const [sfxList] = useState(getSynthSfxCatalog());
  const [sfxVolume, setSfxVolume] = useState(0.8);
  const [bgmVolume, setBgmVolume] = useState(0.6);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [muted, setMuted] = useState(false);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [lastPlayedSfx, setLastPlayedSfx] = useState(null);
  const [saveStatus, setSaveStatus] = useState('');

  // Initial load
  useEffect(() => {
    // Detect system reduced-motion
    if (isReducedMotionPreferred()) {
      setReducedMotion(true);
    }

    // Fetch user settings from server
    fetch('/api/v1/audio/settings/latest')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          setSfxVolume(data.settings.sfxVolume ?? 0.8);
          setBgmVolume(data.settings.bgmVolume ?? 0.6);
          setReducedMotion(data.settings.reducedMotion ?? false);
          setMuted(data.settings.muted ?? false);
        }
      })
      .catch((err) => console.error('Failed to load audio settings:', err));
  }, []);

  const handleTestPlay = (sfxId) => {
    if (muted) return;
    const playResult = playProceduralSfx(sfxId, sfxVolume);
    setLastPlayedSfx(sfxId);

    // Increment play count asynchronously
    fetch('/api/v1/audio/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sfxVolume,
        bgmVolume,
        reducedMotion,
        muted,
        playedIncrement: 1
      })
    }).catch(() => {});
  };

  const handleSaveSettings = async () => {
    try {
      const res = await fetch('/api/v1/audio/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sfxVolume,
          bgmVolume,
          reducedMotion,
          muted,
          playedIncrement: 0
        })
      });
      const data = await res.json();
      if (data.success) {
        setSaveStatus('Đã lưu cài đặt âm thanh thành công!');
        setTimeout(() => setSaveStatus(''), 2500);
      }
    } catch (err) {
      setSaveStatus('Lỗi kết nối máy chủ');
    }
  };

  const handleUnlockSafari = async () => {
    const success = await unlockSafariAudioContext();
    setAudioUnlocked(success);
    if (success) {
      playProceduralSfx('level_up', sfxVolume);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
      data-testid="sound-settings-modal"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-slate-900 to-indigo-950 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
              <span className="material-symbols-outlined text-2xl">graphic_eq</span>
            </div>
            <div>
              <h2 className="font-headline-md text-lg font-bold">
                Zero-Latency Sound Synthesizer (GAME-104)
              </h2>
              <p className="font-label-mono text-xs text-indigo-200">
                Bộ tổng hợp âm thanh thủ tục Web Audio API • 0 KB Asset Download
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
            data-testid="close-sound-modal"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Zero Download Footprint Banner */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-emerald-600 text-xl">bolt</span>
              <div>
                <span className="font-bold">Zero Asset Footprint:</span> Sóng âm sin, vuông, răng cưa và tam giác sinh trực tiếp qua OscillatorNode ADSR.
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-200/80 font-label-mono text-[11px] font-bold text-emerald-800">
              0 KB Network
            </span>
          </div>

          {/* Volume Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-headline-sm text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-indigo-600">volume_up</span>
                  Âm Lượng Hiệu Ứng (SFX)
                </span>
                <span className="font-label-mono text-xs text-indigo-700 font-bold">
                  {Math.round(sfxVolume * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={sfxVolume}
                disabled={muted}
                onChange={(e) => setSfxVolume(parseFloat(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
                data-testid="sfx-volume-slider"
              />
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-headline-sm text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-violet-600">music_note</span>
                  Nhạc Nền Không Gian (BGM)
                </span>
                <span className="font-label-mono text-xs text-violet-700 font-bold">
                  {Math.round(bgmVolume * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={bgmVolume}
                disabled={muted}
                onChange={(e) => setBgmVolume(parseFloat(e.target.value))}
                className="w-full accent-violet-600 cursor-pointer"
                data-testid="bgm-volume-slider"
              />
            </div>
          </div>

          {/* Accessibility & Safari Audio Unlock */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-amber-600 text-lg">visibility</span>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-800">Giảm chuyển động (Reduced Motion)</span>
                  <span className="text-[10px] text-slate-500">Tắt chớp sáng nổ hạt, bảo vệ thị giác</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={reducedMotion}
                onChange={(e) => setReducedMotion(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 accent-indigo-600 cursor-pointer"
                data-testid="reduced-motion-checkbox"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-slate-600 text-lg">volume_off</span>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-800">Tắt toàn bộ âm thanh (Mute)</span>
                  <span className="text-[10px] text-slate-500">Im lặng tuyệt đối khi luyện tập nơi công cộng</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={muted}
                onChange={(e) => setMuted(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 accent-indigo-600 cursor-pointer"
                data-testid="mute-checkbox"
              />
            </label>
          </div>

          {/* Safari iOS Unlock Button */}
          <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sky-900 text-xs">
              <span className="material-symbols-outlined text-sky-600 text-base">phone_iphone</span>
              <span>Kích hoạt AudioContext cho Safari iOS:</span>
            </div>
            <button
              onClick={handleUnlockSafari}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                audioUnlocked
                  ? 'bg-emerald-600 text-white'
                  : 'bg-sky-600 hover:bg-sky-700 text-white'
              }`}
              data-testid="safari-unlock-btn"
            >
              <span className="material-symbols-outlined text-sm">
                {audioUnlocked ? 'check_circle' : 'touch_app'}
              </span>
              <span>{audioUnlocked ? 'Đã kích hoạt' : 'Mở khóa AudioContext'}</span>
            </button>
          </div>

          {/* 8 Procedural SFX Catalog Soundboard */}
          <div>
            <h3 className="font-headline-sm text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-indigo-600">tune</span>
              Thử Nghiệm 8 Hiệu Ứng Âm Thanh Thủ Tục (Synthesizer Soundboard)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {sfxList.map((sfx) => {
                const isPlaying = lastPlayedSfx === sfx.id;
                return (
                  <button
                    key={sfx.id}
                    onClick={() => handleTestPlay(sfx.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between h-20 ${
                      isPlaying
                        ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-200'
                        : 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                    }`}
                    data-testid={`play-sfx-${sfx.id}`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-label-mono text-[10px] uppercase font-bold text-slate-500">
                        {sfx.waveType}
                      </span>
                      <span className="material-symbols-outlined text-indigo-600 text-sm">
                        play_arrow
                      </span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800 truncate">
                        {sfx.name.split(' (')[0]}
                      </div>
                      <div className="text-[10px] text-slate-500 font-label-mono">
                        {sfx.startFreq}Hz → {sfx.endFreq}Hz
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-t border-slate-200">
          <div className="text-xs text-emerald-600 font-semibold">{saveStatus}</div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Đóng
            </button>
            <button
              onClick={handleSaveSettings}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
              data-testid="save-sound-settings-btn"
            >
              <span className="material-symbols-outlined text-sm">save</span>
              <span>Lưu Cài Đặt</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
