import React, { useState, useEffect } from 'react';
import { Sparkles, Clock, CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function FreeTrialBanner({ accountId = 'default_user', onTrialActivated = () => {} }) {
  const { isPro, setIsPro, currentUser } = useApp();
  const [trialStatus, setTrialStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activating, setActivating] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchTrialStatus();
  }, [accountId]);

  const fetchTrialStatus = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3002/api/v1/billing/trial/status/${accountId}`);
      const data = await res.json();
      if (data.success) {
        setTrialStatus(data);
      }
    } catch (err) {
      console.warn('Failed to fetch trial status:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleActivateTrial = async () => {
    try {
      setActivating(true);
      setErrorMsg('');
      setSuccessMsg('');

      const email = currentUser?.email || 'learner@vietphonics.vn';
      const deviceFingerprint = 'fp_browser_' + (navigator.userAgent.slice(0, 30).replace(/[^a-zA-Z0-9]/g, ''));

      const res = await fetch('http://localhost:3002/api/v1/billing/trial/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accountId,
          email,
          deviceFingerprint
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Kích hoạt dùng thử thất bại.');
      }

      setIsPro(true);
      setSuccessMsg(data.message);
      await fetchTrialStatus();
      onTrialActivated(data);
    } catch (err) {
      setErrorMsg(err.message || 'Lỗi kết nối khi kích hoạt dùng thử.');
    } finally {
      setActivating(false);
    }
  };

  if (loading) return null;

  // Active trial countdown badge
  if (trialStatus?.hasActiveTrial) {
    return (
      <div className="w-full bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-amber-500/15 border border-amber-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-xs sm:text-sm">Gói Pro Dùng Thử 7 Ngày Đang Hoạt Động</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500 text-white font-mono font-bold">
                Còn {trialStatus.daysRemaining} ngày
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Hạn dùng đến hết ngày {new Date(trialStatus.trialEndsAt).toLocaleDateString('vi-VN')} • Không tự động trừ tiền
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 font-mono">
          <span>Tự động về Free sau 7 ngày</span>
        </div>
      </div>
    );
  }

  // Already used trial
  if (!trialStatus?.isEligible) {
    return null;
  }

  // Eligible banner
  return (
    <div className="w-full bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-5 border border-indigo-800/80 shadow-md relative overflow-hidden">
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-[10px] font-bold uppercase border border-indigo-400/30">
              PAY-108 • 0đ
            </span>
            <span className="text-xs font-semibold text-amber-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Không Cần Thẻ Tín Dụng
            </span>
          </div>
          <h3 className="font-bold text-base text-white">
            Trải Nghiệm Trọn Vẹn Gói Pro Miễn Phí 7 Ngày
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Mở khoá toàn bộ 44 âm IPA, phân tích phổ âm học 3D, phòng luyện RPG và không giới hạn lượt chấm âm mỗi ngày.
          </p>

          {errorMsg && (
            <div className="pt-2 text-rose-300 text-xs flex items-center gap-1.5 font-medium">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="pt-2 text-emerald-300 text-xs flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleActivateTrial}
          disabled={activating}
          className="shrink-0 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-rose-600 hover:brightness-110 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <span>{activating ? 'Đang kích hoạt...' : 'Kích Hoạt 7 Ngày Dùng Thử Ngay'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
