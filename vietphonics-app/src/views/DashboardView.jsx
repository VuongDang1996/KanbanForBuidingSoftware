import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import IeltsBandEstimator from '../components/dashboard/IeltsBandEstimator';
import DailyPathCard from '../components/dashboard/DailyPathCard';
import SkillRadarChart from '../components/dashboard/SkillRadarChart';
import BentoStatsGrid from '../components/dashboard/BentoStatsGrid';
import LearnerAuthModal from '../components/dashboard/LearnerAuthModal';
import GuestWelcomeHero from '../components/dashboard/GuestWelcomeHero';

export default function DashboardView() {
  const {
    dialect,
    dialectConfig,
    gopScore,
    setActiveTab,
    triggerPractice,
    setShowDiagnosticModal,
    isGuest,
    currentUser,
    loginLearner,
    setShowAccountModal,
    setAccountModalTab
  } = useApp();

  const [profileData, setProfileData] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [guestPreviewMode, setGuestPreviewMode] = useState(false);

  useEffect(() => {
    fetch('/api/v1/user/profile-dashboard')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.success) {
          setProfileData(data);
        }
      })
      .catch(() => {});
  }, []);

  const playWord = (word) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const focusPracticeItem = {
    id: 'step-02-focus',
    word: 'Months',
    sentence: 'Six months ago, she baked fresh bread for breakfast on the street.',
    ipa: '/sɪks mʌnθs əˈɡoʊ, ʃi beɪkt freʃ bred fɔːr ˈbrekfəst ɒn ðə striːt/',
    targetPhonemes: ['/ks/', '/nθs/', '/kt/', '/st/'],
    difficulty: 'Intermediate',
    trap: 'Bắt lỗi rụng âm đuôi -ed & cụm /ks/'
  };

  const showGuestHero = isGuest && !guestPreviewMode;

  return (
    <div className="flex flex-col w-full animate-fadeIn">
      <div className="w-full px-4 sm:px-6 lg:px-12 mx-auto py-space-md sm:py-space-lg flex flex-col gap-6 max-w-[1440px]">
        {/* Guest View vs Registered Learner View */}
        {showGuestHero ? (
          <>
            <GuestWelcomeHero onPreviewDashboard={() => setGuestPreviewMode(true)} />
          </>
        ) : (
          <>
            {/* Guest Preview Notification Banner if in preview mode */}
            {isGuest && guestPreviewMode && (
              <div className="w-full p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl flex items-center justify-between text-xs font-semibold">
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">visibility</span>
                  <span>Bạn đang xem trước giao diện Học Viên (Guest Preview Mode).</span>
                </span>
                <button
                  type="button"
                  onClick={() => setGuestPreviewMode(false)}
                  className="px-2.5 py-1 bg-white hover:bg-amber-100 rounded-lg border border-amber-300 text-amber-900 transition cursor-pointer"
                >
                  Quay lại Giới Thiệu
                </button>
              </div>
            )}

            {/* Learner Greeting & Dialect Bar */}
            <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white border border-slate-200/80 p-4 sm:p-5 rounded-2xl shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-primary to-rose-500 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                  {currentUser?.name ? currentUser.name.charAt(0) : 'V'}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h1 className="text-lg sm:text-xl font-bold text-slate-900">
                      Chào mừng, {currentUser?.name || profileData?.user?.name || 'Học Viên VietPhonics'}!
                    </h1>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-sky-50 text-secondary border border-sky-200">
                      {currentUser?.tier || profileData?.user?.tier || 'Free'}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                    <span>🇻🇳 Thổ ngữ L1:</span>
                    <strong className="text-slate-700">{dialectConfig.name}</strong>
                    <span>•</span>
                    <span>Hiệu chuẩn F0-F2 sẵn sàng</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => setShowDiagnosticModal(true)}
                  className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 font-label-mono text-xs text-primary font-bold transition cursor-pointer flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">assignment</span>
                  <span>Chẩn đoán L1</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAccountModalTab('devices');
                    setShowAccountModal(true);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 font-label-mono text-xs text-slate-700 font-semibold transition cursor-pointer flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">security</span>
                  <span>Tài khoản</span>
                </button>
              </div>
            </div>

            {/* USER-101: Learner Mastery Bento Statistics Grid */}
            <BentoStatsGrid stats={profileData?.stats} />

            {/* ELSA-401: 10-Minute Daily Personalized Adaptive Practice Path */}
            <DailyPathCard />

            {/* 4-Pillar Vietnamese Phonetic Radar & High-Echelon Diagnostic Hero Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-6 items-stretch">
              {/* Left Card: 4-Pillar Radial & Progress Gauges (5 cols on XL) */}
              <div className="md:col-span-1 xl:col-span-5 bg-white border border-slate-200/80 rounded-2xl p-space-lg flex flex-col justify-between shadow-xs relative overflow-hidden">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-rose-50/70 rounded-full blur-3xl pointer-events-none" />
                <div className="flex flex-col gap-space-md relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2.5 rounded-lg bg-rose-50 text-primary border border-rose-100">
                        <span className="material-symbols-outlined text-xl">graphic_eq</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-mono text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                          Acoustic Diagnostic
                        </span>
                        <h2 className="font-headline-sm text-headline-sm text-slate-900 font-bold">
                          4 Trụ Cột Ngữ Âm L1 Việt
                        </h2>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200/70 font-label-mono text-label-mono text-secondary font-semibold">
                      Dynamic Matrix
                    </span>
                  </div>

                  {/* 4 Pillars Breakdown */}
                  <div className="flex flex-col gap-3 mt-2">
                    {/* Pillar 1 */}
                    <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                      <div className="flex items-center justify-between font-body-sm text-body-sm">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
                          <span className="font-semibold text-slate-800">1. Âm Đuôi &amp; Cụm Phụ Âm</span>
                          <span className="font-label-mono text-label-mono text-slate-500">/ks/, /st/, /t/, /d/</span>
                        </div>
                        <span className="font-ipa-inline text-ipa-inline text-emerald-600 font-bold">82%</span>
                      </div>
                      <div className="w-full bg-slate-200/70 h-2 rounded-full overflow-hidden flex">
                        <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000" style={{ width: '82%' }} />
                      </div>
                    </div>

                    {/* Pillar 2 */}
                    <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                      <div className="flex items-center justify-between font-body-sm text-body-sm">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.5)]" />
                          <span className="font-semibold text-slate-800">2. Cặp Âm Dễ Nhầm</span>
                          <span className="font-label-mono text-label-mono text-slate-500">/θ/-/t/, /iː/-/ɪ/, /l/-/n/</span>
                        </div>
                        <span className="font-ipa-inline text-ipa-inline text-amber-600 font-bold">71%</span>
                      </div>
                      <div className="w-full bg-slate-200/70 h-2 rounded-full overflow-hidden flex">
                        <div className="bg-amber-500 h-full rounded-full transition-all duration-1000" style={{ width: '71%' }} />
                      </div>
                    </div>

                    {/* Pillar 3 */}
                    <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                      <div className="flex items-center justify-between font-body-sm text-body-sm">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-sky-500 shadow-[0_0_6px_rgba(2,132,199,0.5)]" />
                          <span className="font-semibold text-slate-800">3. Trọng Âm &amp; Giảm Âm Schwa</span>
                          <span className="font-label-mono text-label-mono text-slate-500">/ə/, Word Stress</span>
                        </div>
                        <span className="font-ipa-inline text-ipa-inline text-sky-600 font-bold">78%</span>
                      </div>
                      <div className="w-full bg-slate-200/70 h-2 rounded-full overflow-hidden flex">
                        <div className="bg-sky-500 h-full rounded-full transition-all duration-1000" style={{ width: '78%' }} />
                      </div>
                    </div>

                    {/* Pillar 4 */}
                    <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                      <div className="flex items-center justify-between font-body-sm text-body-sm">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_6px_rgba(99,102,241,0.5)]" />
                          <span className="font-semibold text-slate-800">4. Ngữ Điệu &amp; Nối Âm</span>
                          <span className="font-label-mono text-label-mono text-slate-500">Liaison, Intonation</span>
                        </div>
                        <span className="font-ipa-inline text-ipa-inline text-indigo-600 font-bold">69%</span>
                      </div>
                      <div className="w-full bg-slate-200/70 h-2 rounded-full overflow-hidden flex">
                        <div className="bg-indigo-500 h-full rounded-full transition-all duration-1000" style={{ width: '69%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Predicted Exam Benchmarks & Interactive IELTS Semicircle Gauge (ELSA-103) */}
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <IeltsBandEstimator overallGop={gopScore} />
                </div>
              </div>

              {/* Middle Card: USER-101 5-Pillar Pronunciation Skill Radar Chart (4 cols on XL) */}
              <div className="md:col-span-1 xl:col-span-4 bg-white border border-slate-200/80 rounded-2xl p-space-lg flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-label-mono text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                      Skill Balance Matrix
                    </span>
                    <span className="material-symbols-outlined text-secondary text-xl">radar</span>
                  </div>
                  <h2 className="font-headline-sm text-headline-sm text-slate-900 font-bold mt-1">
                    Bản Đồ Ngũ Giác Âm Học
                  </h2>
                </div>

                <div className="py-2 flex items-center justify-center">
                  <SkillRadarChart scores={profileData?.radarScores} />
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('tien-do')}
                  className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 transition font-label-mono text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Xem Chi Tiết Phân Tích Tiến Độ</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>

              {/* Right Metric Card: L1 Habit Reduction & Cadence (3 cols on XL) */}
              <div className="col-span-full xl:col-span-3 bg-white border border-slate-200/80 rounded-2xl p-space-lg flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-label-mono text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                      Habit Telemetry
                    </span>
                    <span className="material-symbols-outlined text-primary text-xl">insights</span>
                  </div>
                  <h2 className="font-headline-sm text-headline-sm text-slate-900 font-bold mt-1">
                    Chỉ Số Khử Lỗi L1
                  </h2>
                </div>

                <div className="flex flex-col gap-3 py-2">
                  {/* Metric 1 */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-600 font-medium">Flat Tone Transfer</span>
                      <span className="font-mono text-xs text-emerald-600 font-bold">-42%</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl text-slate-900 font-extrabold font-mono">0.58</span>
                      <span className="text-[10px] text-slate-500 font-mono">Tonal StDev</span>
                    </div>
                    <p className="text-[10px] text-secondary font-medium">
                      Đã giảm rung ngữ điệu kiểu thanh điệu tiếng Việt
                    </p>
                  </div>

                  {/* Metric 2 */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-600 font-medium">Tốc Độ Nói (Cadence)</span>
                      <span className="material-symbols-outlined text-base text-secondary">speed</span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl text-secondary font-extrabold font-mono">135</span>
                      <span className="text-[10px] text-slate-500 font-mono">WPM (Chuẩn Quốc Tế)</span>
                    </div>
                    <div className="w-full bg-slate-200/70 h-1.5 rounded-full overflow-hidden mt-1">
                      <div className="bg-secondary h-full rounded-full" style={{ width: '75%' }} />
                    </div>
                  </div>

                  {/* Metric 3 */}
                  <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[11px] text-emerald-700 font-semibold">Mục Tiêu Hôm Nay</span>
                      <span className="text-sm text-slate-900 font-bold">10 / 10 Phút Luyện</span>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                      <span className="material-symbols-outlined text-lg">check_circle</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => triggerPractice(focusPracticeItem)}
                  className="w-full py-2.5 rounded-xl bg-primary text-white hover:opacity-90 font-label-mono text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span className="material-symbols-outlined text-base">mic</span>
                  <span>Vào Phòng Luyện Âm Ngay</span>
                </button>
              </div>
            </div>

            {/* Lower Bento: Recent Phoneme Flaws & Articulation Diagnostic Breakdown */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              {/* Left: Recent High-Risk Phoneme Flaws Table (8 cols on XL) */}
              <div className="col-span-12 xl:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-space-lg shadow-xs flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-xl">warning</span>
                    <h3 className="font-headline-sm text-headline-sm text-slate-900 font-bold">
                      Ngân Hàng Lỗi Âm Cần Triệt Tiêu Gần Đây
                    </h3>
                  </div>
                  <span className="font-label-mono text-xs text-slate-500 font-semibold">
                    Lọc theo: L1 Vietnamese Interference
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="font-label-mono text-xs text-slate-500 uppercase tracking-wider bg-slate-50 rounded-lg border-y border-slate-200/70">
                        <th className="py-2.5 px-3">Từ Mục Tiêu</th>
                        <th className="py-2.5 px-3">Phân Tách IPA</th>
                        <th className="py-2.5 px-3">Lỗi Điển Hình Người Việt</th>
                        <th className="py-2.5 px-3">GOP Đo Được</th>
                        <th className="py-2.5 px-3 text-right">Luyện Nhanh</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {/* Item 1 */}
                      <tr className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-3 font-bold text-slate-900">Months</td>
                        <td className="py-3 px-3 font-ipa-inline text-secondary font-bold">/mʌnθs/</td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded bg-rose-50 border border-rose-200 text-primary font-mono text-[11px] font-bold">
                              Mất /s/ đuôi
                            </span>
                            <span className="text-slate-500 text-xs">➔ Nói thành "mân-tờ"</span>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-rose-600 font-bold text-xs">54%</span>
                            <div className="w-16 bg-slate-200/70 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-rose-500 h-full rounded-full" style={{ width: '54%' }} />
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            type="button"
                            onClick={() => playWord('Months')}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-secondary transition cursor-pointer"
                            aria-label="Phát âm mẫu Months"
                          >
                            <span className="material-symbols-outlined text-base">volume_up</span>
                          </button>
                        </td>
                      </tr>

                      {/* Item 2 */}
                      <tr className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-3 font-bold text-slate-900">Breakfast</td>
                        <td className="py-3 px-3 font-ipa-inline text-secondary font-bold">/ˈbrek.fəst/</td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-700 font-mono text-[11px] font-bold">
                              Sai trọng âm
                            </span>
                            <span className="text-slate-500 text-xs">➔ Nhấn âm 2, rụng cụm /-st/</span>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-amber-600 font-bold text-xs">66%</span>
                            <div className="w-16 bg-slate-200/70 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-amber-500 h-full rounded-full" style={{ width: '66%' }} />
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            type="button"
                            onClick={() => playWord('Breakfast')}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-secondary transition cursor-pointer"
                            aria-label="Phát âm mẫu Breakfast"
                          >
                            <span className="material-symbols-outlined text-base">volume_up</span>
                          </button>
                        </td>
                      </tr>

                      {/* Item 3 */}
                      <tr className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-3 font-bold text-slate-900">Street</td>
                        <td className="py-3 px-3 font-ipa-inline text-secondary font-bold">/striːt/</td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded bg-rose-50 border border-rose-200 text-primary font-mono text-[11px] font-bold">
                              Gãy cụm /str-/
                            </span>
                            <span className="text-slate-500 text-xs">➔ Nuốt âm /t/ đuôi</span>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-rose-600 font-bold text-xs">61%</span>
                            <div className="w-16 bg-slate-200/70 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-rose-500 h-full rounded-full" style={{ width: '61%' }} />
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            type="button"
                            onClick={() => playWord('Street')}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-secondary transition cursor-pointer"
                            aria-label="Phát âm mẫu Street"
                          >
                            <span className="material-symbols-outlined text-base">volume_up</span>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right: Real-Time Tongue & Palate Articulation Preview (4 cols on XL) */}
              <div className="col-span-12 xl:col-span-4 bg-white border border-slate-200/80 rounded-2xl p-space-lg shadow-xs flex flex-col justify-between">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-label-mono text-xs text-secondary uppercase tracking-widest font-bold">
                      Biomechanical Model
                    </span>
                    <span className="px-2 py-0.5 rounded bg-sky-50 border border-sky-100 text-secondary font-mono text-[10px] font-bold">
                      2D Cut-section
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-slate-900 font-bold">
                    Điểm Chạm Khẩu Hình /θ/
                  </h3>
                  <p className="text-xs text-slate-600">
                    Vị trí chuẩn: Đặt đầu lưỡi giữa hai hàm răng, thổi nhẹ không rung dây thanh.
                  </p>
                </div>

                {/* Wireframe Articulation Graphic */}
                <div className="w-full h-40 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center relative overflow-hidden my-3">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-100/50 to-transparent pointer-events-none" />
                  <svg className="w-44 h-28 text-secondary" fill="none" viewBox="0 0 200 120">
                    <path className="text-slate-400" d="M 20 40 Q 60 20 110 30 T 180 50" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" />
                    <rect className="text-slate-700" fill="currentColor" height="16" rx="2" width="12" x="75" y="28" />
                    <rect className="text-slate-700" fill="currentColor" height="16" rx="2" width="12" x="73" y="68" />
                    <path d="M 170 100 Q 130 90 95 62 Q 82 52 65 52 Q 62 57 70 65 Q 110 85 160 105" fill="rgba(225, 29, 72, 0.15)" stroke="#e11d48" strokeWidth="2" />
                    <circle className="animate-ping" cx="68" cy="54" fill="#0284c7" r="5" />
                    <circle cx="68" cy="54" fill="#0284c7" r="3" />
                  </svg>
                  <span className="absolute bottom-2 left-3 font-mono text-[10px] text-primary font-bold">
                    Interdental Friction Point
                  </span>
                  <span className="absolute top-2 right-3 font-mono text-[10px] text-slate-400 font-semibold">
                    Sagittal Plane
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-xs text-slate-800 font-bold">Tập luyện mô phỏng 2D</span>
                  <button
                    type="button"
                    onClick={() => setActiveTab('khau-hinh-2d')}
                    className="text-xs text-secondary hover:underline flex items-center gap-1 font-bold cursor-pointer"
                  >
                    <span>Mở Studio 2D</span>
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Subtle Telemetry Badge */}
            <div className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-[11px] text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Acoustic Engine v4.2 Ready • 44.1kHz • 24-bit Float</span>
              </div>
              <div>VietPhonics Precision Calibration</div>
            </div>
          </>
        )}

        {/* Learner Authentication Modal */}
        <LearnerAuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          currentUser={profileData?.user}
          onLoginSuccess={(data) => {
            if (data?.user) {
              loginLearner(data.user);
              setProfileData(prev => ({ ...prev, user: data.user }));
            }
          }}
        />
      </div>
    </div>
  );
}
