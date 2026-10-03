import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useRecorder } from '../lib/audio/useRecorder';

export default function Game3dView() {
  const { incrementStreak } = useApp();
  const [world, setWorld] = useState(1);
  const [bossHp, setBossHp] = useState(1250);
  const [heroHp, setHeroHp] = useState(100);
  const [combo, setCombo] = useState(4);
  const [vCoins, setVCoins] = useState(1420);
  const [combatFeedback, setCombatFeedback] = useState({
    title: 'CRITICAL HIT! -250 DMG',
    subtitle: 'HOÀN HẢO ÂM ĐUÔI /ks/ • BẺ GÃY GIÁP ĐÁ!',
    type: 'crit'
  });
  const [currentSpellWord, setCurrentSpellWord] = useState('six');
  const [isCasting, setIsCasting] = useState(false);
  const [selectedTab, setSelectedTab] = useState('battle'); // 'battle' | 'gear' | 'ranks'

  const { isRecording, start, stop } = useRecorder({ autoAnalyze: true });

  const spells = [
    { word: 'six', ipa: '/sɪks/', target: 'Bật cụm vô thanh /ks/' },
    { word: 'box', ipa: '/bɒks/', target: 'Bật cụm vô thanh /ks/' },
    { word: 'fox', ipa: '/fɒks/', target: 'Bật cụm vô thanh /ks/' },
    { word: 'mixed', ipa: '/mɪkst/', target: 'Bật cụm /kst/ kết thúc' }
  ];

  const triggerAttack = (word, score = 92) => {
    setIsCasting(true);
    // Beep sound effect using AudioContext Web Audio API (GAME-104)
    if (typeof window !== 'undefined' && window.AudioContext) {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } catch (e) {
        // audio fail safe
      }
    }

    setTimeout(() => {
      setIsCasting(false);
      const dmg = score > 80 ? 250 : 120;
      setBossHp((hp) => Math.max(0, hp - dmg));
      setCombo((c) => c + 1);
      setVCoins((v) => v + 50);
      setCombatFeedback({
        title: score > 80 ? `CRITICAL HIT! -${dmg} DMG` : `HIT! -${dmg} DMG`,
        subtitle: `Phát âm chuẩn từ "${word}"! Bẻ gãy lá chắn Rune của Golem!`,
        type: score > 80 ? 'crit' : 'hit'
      });
      incrementStreak();
    }, 600);
  };

  const handleMicCast = async () => {
    if (!isRecording) {
      start();
    } else {
      await stop();
      triggerAttack(currentSpellWord, 95);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 py-4 animate-fade-in">
      {/* Top RPG Header Bar */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-slate-200/80 p-4 rounded-2xl shadow-[0_2px_8px_rgba(15,23,42,0.03)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-2xl">swords</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-amber-600 uppercase">
                Phonics RPG 3D Arena (GAME-101 to 105)
              </span>
              <span className="px-2 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-[10px] font-mono font-bold text-primary">
                Acoustic World 1: Final Consonants
              </span>
            </div>
            <h2 className="text-lg font-black text-slate-900 leading-tight">
              Thung Lũng Âm Đuôi • Ải 3: Trùm Golem Đá Vụn
            </h2>
          </div>
        </div>

        {/* Currency & Combo Status */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-mono font-bold text-amber-800">
            <span>🔥</span>
            <span>x{combo} STREAK COMBO!</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-700">
            <span>🪙</span>
            <span>{vCoins} V-Coins</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setSelectedTab('battle')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            selectedTab === 'battle' ? 'bg-primary text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Trận Đánh Trùm (Battle Arena)
        </button>
        <button
          onClick={() => setSelectedTab('gear')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            selectedTab === 'gear' ? 'bg-secondary text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Trang Bị Ma Thuật (GAME-105)
        </button>
        <button
          onClick={() => setSelectedTab('ranks')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            selectedTab === 'ranks' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Bảng Xếp Hạng Đại Học
        </button>
      </div>

      {selectedTab === 'gear' ? (
        /* RPG Equipment Inventory (GAME-105) */
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <h3 className="text-xl font-black text-slate-900">
            Kho Trang Bị Ma Thuật & Thuộc Tính Ngữ Âm
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-rose-100 text-primary flex items-center justify-center text-2xl">
                🪄
              </div>
              <h4 className="font-bold text-sm text-slate-900">Wand of Ending Sounds (Lv.4)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tăng +35% sát thương khi phát âm chuẩn các cụm âm đuôi /ks/, -ed, /st/.
              </p>
              <span className="text-[10px] font-mono text-emerald-600 font-bold block">ĐÃ TRANG BỊ</span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-secondary flex items-center justify-center text-2xl">
                👢
              </div>
              <h4 className="font-bold text-sm text-slate-900">Boots of Stress Rhythm (Lv.2)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Kéo dài thời gian bấm phản xạ counter-spell thêm 1.5 giây.
              </p>
              <span className="text-[10px] font-mono text-emerald-600 font-bold block">ĐÃ TRANG BỊ</span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 opacity-60">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl">
                💍
              </div>
              <h4 className="font-bold text-sm text-slate-900">Ring of Schwa Reduction</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Khóa sau khi hạ gục Trùm Rồng ở World 4. Tự động chuyển nguyên âm yếu sang /ə/.
              </p>
              <span className="text-[10px] font-mono text-slate-400 font-bold block">CHƯA MỞ KHÓA</span>
            </div>
          </div>
        </div>
      ) : selectedTab === 'ranks' ? (
        /* University Leaderboard (GAME-105) */
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <h3 className="text-xl font-black text-slate-900">
            Bảng Xếp Hạng Đấu Trường Sinh Viên (University Leaderboard)
          </h3>
          <div className="space-y-3">
            {[
              { rank: 1, name: 'Đại Học Quốc Gia Hà Nội (VNU)', points: '42,500 PTS', topPhoneme: '/θ/ & /ð/' },
              { rank: 2, name: 'Đại Học Bách Khoa TP.HCM (HCMUT)', points: '38,120 PTS', topPhoneme: 'Ending /t/, /k/' },
              { rank: 3, name: 'Đại Học Kinh Tế Quốc Dân (NEU)', points: '35,900 PTS', topPhoneme: 'Stress & Cadence' },
              { rank: 4, name: 'Đại Học Ngoại Thương (FTU)', points: '34,200 PTS', topPhoneme: 'Connected Speech' }
            ].map((u) => (
              <div
                key={u.rank}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-mono"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-sm text-primary">
                    #{u.rank}
                  </span>
                  <div>
                    <span className="font-sans font-bold text-sm text-slate-900 block">{u.name}</span>
                    <span className="text-slate-400 text-[11px]">Âm thế mạnh: {u.topPhoneme}</span>
                  </div>
                </div>
                <span className="text-sm font-black text-secondary">{u.points}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* 3D Combat Arena */
        <div className="relative w-full rounded-3xl bg-white border border-slate-200/90 shadow-lg p-6 lg:p-10 flex flex-col justify-between min-h-[520px] overflow-hidden">
          {/* Ambient Lighting & Rings */}
          <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_50%_70%,rgba(14,165,233,0.15)_0%,rgba(244,63,94,0.1)_40%,transparent_75%)]" />

          {/* Top Arena Header: Boss HP */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Dũng sĩ L1 Phonics • Giáp: 100/100 HP</span>
            </div>

            <div className="w-full sm:w-80 flex flex-col gap-1.5 bg-slate-50 p-3 rounded-2xl border border-rose-200">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-rose-700 flex items-center gap-1">
                  <span>💀</span>
                  <span>Ancient Stone Golem (Boss)</span>
                </span>
                <span className="font-mono text-slate-500 font-bold">{bossHp} / 3000 HP</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-red-600 transition-all duration-500"
                  style={{ width: `${(bossHp / 3000) * 100}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-slate-400 text-right">
                Điểm yếu: Bật cụm /ks/ phá giáp
              </span>
            </div>
          </div>

          {/* Combat Center: Hero vs Boss with Lightning Beam */}
          <div className="relative z-10 flex items-center justify-between my-auto py-8">
            {/* Hero Card */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-44 sm:w-44 sm:h-56 rounded-2xl bg-gradient-to-tr from-sky-50 to-rose-50 border-2 border-secondary shadow-md p-3 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full bg-sky-100 border-2 border-secondary flex items-center justify-center text-4xl shadow-sm mb-2">
                  🧙‍♂️
                </div>
                <span className="font-mono text-xs font-bold text-slate-800">Hero Phonetician</span>
                <span className="font-mono text-[10px] text-secondary mt-1">Casting: {currentSpellWord}</span>
              </div>
            </div>

            {/* Attack Beam & Damage Feedback */}
            <div className="flex-1 mx-4 sm:mx-8 flex flex-col items-center justify-center">
              {isCasting ? (
                <div className="w-full h-4 bg-gradient-to-r from-secondary via-rose-500 to-primary rounded-full animate-pulse shadow-[0_0_20px_rgba(2,132,199,0.8)]" />
              ) : (
                <div className="w-full h-1 bg-slate-200 border-t border-dashed border-slate-300" />
              )}

              <div className="mt-4 px-4 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-center shadow-sm">
                <span className="font-black text-sm text-primary block">{combatFeedback.title}</span>
                <span className="font-mono text-[11px] text-amber-900">{combatFeedback.subtitle}</span>
              </div>
            </div>

            {/* Boss Card */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-44 sm:w-44 sm:h-56 rounded-2xl bg-gradient-to-tr from-rose-50 to-slate-100 border-2 border-rose-300 shadow-md p-3 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full bg-rose-100 border-2 border-primary flex items-center justify-center text-4xl shadow-sm mb-2 animate-bounce">
                  🗿
                </div>
                <span className="font-mono text-xs font-bold text-slate-800">Stone Golem</span>
                <span className="font-mono text-[10px] text-primary font-bold mt-1">Rune Shield /ks/</span>
              </div>
            </div>
          </div>

          {/* Spellcasting Voice Controls (GAME-102) */}
          <div className="relative z-20 w-full max-w-xl mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col items-center gap-3">
            <span className="font-mono text-xs text-primary font-bold uppercase">
              Bắt Buộc Bật Âm Đuôi /ks/ Để Tấn Công
            </span>

            {/* Spell Word Pills */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {spells.map((s) => (
                <button
                  key={s.word}
                  onClick={() => setCurrentSpellWord(s.word)}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${
                    currentSpellWord === s.word
                      ? 'bg-primary text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  "{s.word}" {s.ipa}
                </button>
              ))}
            </div>

            {/* Mic Button & Fallback Simulation (GAME-102) */}
            <div className="flex items-center gap-3 w-full justify-center pt-2">
              <button
                onClick={handleMicCast}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-primary to-rose-600 text-white font-bold text-xs shadow-md hover:scale-105 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">mic</span>
                <span>{isRecording ? 'Dừng & Đánh Phép' : `Đọc "${currentSpellWord}" Bằng Micro`}</span>
              </button>

              <button
                onClick={() => triggerAttack(currentSpellWord, 95)}
                className="px-4 py-3 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold font-mono transition-colors"
                title="Mô phỏng phát âm chuẩn nếu môi trường ồn (GAME-102)"
              >
                Mô Phỏng Phép 95%
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
