import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Flame,
  Clock,
  TrendingUp,
  Award,
  AlertCircle,
  Mail,
  BellOff,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  RefreshCw,
  X
} from 'lucide-react';

export default function WeeklyReportCard({ accountId = 'default_user', isPro = true }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEmailPreview, setShowEmailPreview] = useState(false);
  const [emailSubscribed, setEmailSubscribed] = useState(true);
  const [savingPref, setSavingPref] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    fetchReport();
    fetchPreferences();
  }, [accountId]);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3002/api/v1/progress/weekly-report/${accountId}/latest`);
      const data = await res.json();
      if (data.success && data.report) {
        setReport(data.report);
      }
    } catch (err) {
      console.error('Failed to load weekly report:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPreferences = async () => {
    try {
      const res = await fetch(`http://localhost:3002/api/v1/progress/weekly-report/preferences/${accountId}`);
      const data = await res.json();
      if (data.success && data.preferences) {
        setEmailSubscribed(data.preferences.emailWeeklyReport);
      }
    } catch (err) {
      console.error('Failed to load report preferences:', err);
    }
  };

  const handleToggleEmailPref = async () => {
    try {
      setSavingPref(true);
      const newStatus = !emailSubscribed;
      const res = await fetch('http://localhost:3002/api/v1/progress/weekly-report/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accountId,
          emailWeeklyReport: newStatus,
          unsubscribe: !newStatus
        })
      });
      const data = await res.json();
      if (data.success) {
        setEmailSubscribed(newStatus);
        setToastMsg(newStatus ? 'Đã bật nhận báo cáo tuần qua email.' : 'Đã tắt nhận email báo cáo tuần.');
        setTimeout(() => setToastMsg(''), 3000);
      }
    } catch (err) {
      console.error('Failed to update report preference:', err);
    } finally {
      setSavingPref(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center text-slate-400 text-sm">
        <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-indigo-400" />
        Đang tổng hợp báo cáo tiến độ tuần...
      </div>
    );
  }

  if (!report) return null;

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-xl relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Tuần {report.weekNumber}/{report.year}
            </span>
            {report.tier === 'pro' && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Pro Report
              </span>
            )}
          </div>
          <h3 className="text-base font-bold text-white mt-1.5 flex items-center gap-2">
            Báo Cáo Tiến Độ Tuần
            <span className="text-xs font-normal text-slate-400">
              ({report.weekStartDate} → {report.weekEndDate})
            </span>
          </h3>
        </div>

        {/* Quick action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowEmailPreview(true)}
            className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition flex items-center gap-1.5"
            title="Xem trước định dạng email"
          >
            <Mail className="w-3.5 h-3.5 text-indigo-400" />
            Xem Bản Email
          </button>
          <button
            onClick={handleToggleEmailPref}
            disabled={savingPref}
            className={`p-1.5 rounded-xl border text-xs transition ${
              emailSubscribed
                ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/20'
                : 'bg-slate-800 border-slate-700 text-slate-500 hover:text-slate-300'
            }`}
            title={emailSubscribed ? 'Email báo cáo đang bật (bấm để tắt)' : 'Email báo cáo đang tắt (bấm để bật)'}
          >
            {emailSubscribed ? <Mail className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {toastMsg && (
        <div className="mt-3 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Inactive Encouragement Banner (AC 3) */}
      {report.isInactiveEncouragement ? (
        <div className="mt-5 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-3">
          <Sparkles className="w-6 h-6 shrink-0 text-amber-400" />
          <div>
            <div className="font-semibold text-white">Chỉ 5 phút để giữ phong độ!</div>
            <p className="text-amber-200/80 text-[11px] mt-0.5">
              Tuần vừa qua bạn chưa có nhiều thời gian. Hãy dành 1 bài luyện ngắn 5 phút hôm nay để giữ vững cơ miệng và phản xạ âm thanh nhé.
            </p>
          </div>
        </div>
      ) : (
        /* Standard 4-Metric Grid */
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Thời Gian Luyện</span>
              <Clock className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-lg font-bold text-white mt-1">
              {report.totalPracticeMinutes} <span className="text-xs font-normal text-slate-400">phút</span>
            </div>
            {report.minutesDeltaPercent > 0 && (
              <div className="text-[11px] text-emerald-400 flex items-center gap-0.5 mt-0.5">
                <TrendingUp className="w-3 h-3" />
                +{report.minutesDeltaPercent}% so với tuần trước
              </div>
            )}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Chuỗi Ngày (Streak)</span>
              <Flame className="w-4 h-4 text-orange-400" />
            </div>
            <div className="text-lg font-bold text-white mt-1">
              {report.currentStreak} <span className="text-xs font-normal text-slate-400">ngày</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              {report.practicedDaysCount}/7 ngày hoàn thành
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>GOP Trung Bình</span>
              <Award className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-lg font-bold text-white mt-1">
              {report.averageGopScore}%
            </div>
            <div className="text-[11px] text-emerald-400 mt-0.5">
              Vận tốc cải thiện ổn định
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Ước Tính IELTS</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-lg font-bold text-white mt-1">
              {report.predictedIeltsScore ? `${report.predictedIeltsScore} Band` : 'Free'}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5 truncate">
              {report.predictedIeltsScore ? 'Ước tính âm học AI' : 'Nâng cấp Pro để xem'}
            </div>
          </div>
        </div>
      )}

      {/* Phoneme Highlights: Improved vs Priority Focus */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        {/* Top Improved */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div className="flex items-center justify-between mb-2.5">
            <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" /> Top Âm Tiến Bộ Vượt Bậc
            </h4>
            <span className="text-[11px] text-slate-400">Tuần này</span>
          </div>
          <div className="space-y-2">
            {report.topImprovedPhonemes?.map((p, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800/50 text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded font-mono font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    {p.phoneme}
                  </span>
                  <span className="text-slate-300">{p.label || 'Âm vị'}</span>
                </div>
                <span className="font-bold text-emerald-400">
                  {p.delta}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Focus for Next Week */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div className="flex items-center justify-between mb-2.5">
            <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" /> 3 Âm Ưu Tiên Tuần Tới
            </h4>
            <span className="text-[11px] text-slate-400">SM-2 Error Bank</span>
          </div>
          <div className="space-y-2">
            {report.priorityFocusPhonemes?.map((p, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800/50 text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    {p.phoneme}
                  </span>
                  <span className="text-slate-300 truncate max-w-[160px]">{p.reason || 'Cần luyện thêm'}</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-400">
                  {p.currentScore ? `${p.currentScore}%` : 'Cần ôn tập'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
        <span className="text-xs text-slate-400">
          {emailSubscribed ? '✓ Đang nhận bản tóm tắt mỗi Chủ nhật qua email' : '⚠️ Đã tắt nhận bản tin qua email'}
        </span>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
        >
          <span>Bắt Đầu Bài Luyện Tuần Mới</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Email Preview Modal */}
      {showEmailPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <div className="flex items-center gap-2 text-indigo-400">
                <Mail className="w-4 h-4" />
                <h4 className="font-semibold text-white text-sm">Bản Tin Email Hằng Tuần (VietPhonics Digest)</h4>
              </div>
              <button
                onClick={() => setShowEmailPreview(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-300">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2">
                <div className="text-base font-bold text-white">🎉 Chúc mừng bạn đã hoàn thành Tuần {report.weekNumber}!</div>
                <p className="text-slate-400 text-[11px]">
                  Tổng kết tiến độ phát âm tiếng Anh từ {report.weekStartDate} đến {report.weekEndDate}.
                </p>
                <div className="py-2 text-2xl font-black text-indigo-400 font-mono">
                  {report.totalPracticeMinutes} PHÚT • {report.averageGopScore}% GOP
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-semibold text-white">Tiến bộ nổi bật:</div>
                {report.topImprovedPhonemes?.map((p, i) => (
                  <div key={i} className="flex justify-between p-2 rounded bg-slate-950 border border-slate-800">
                    <span>{p.phoneme} ({p.label})</span>
                    <span className="font-bold text-emerald-400">{p.delta}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <div className="font-semibold text-white">Trọng tâm tuần tới:</div>
                {report.priorityFocusPhonemes?.map((p, i) => (
                  <div key={i} className="flex justify-between p-2 rounded bg-slate-950 border border-slate-800">
                    <span>{p.phoneme}</span>
                    <span className="text-amber-300">{p.reason}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-center text-[11px] text-slate-500">
                Được gửi tự động vào 19:00 Chủ nhật hằng tuần theo Nghị định 13/2023. Bạn có thể huỷ nhận bất kỳ lúc nào trong ứng dụng.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
