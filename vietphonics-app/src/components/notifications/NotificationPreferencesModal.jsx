import React, { useState, useEffect } from 'react';
import {
  Bell,
  CheckCircle2,
  Shield,
  Flame,
  FileText,
  CreditCard,
  Sparkles,
  X,
  Mail
} from 'lucide-react';

export default function NotificationPreferencesModal({ isOpen, onClose }) {
  const [prefs, setPrefs] = useState({
    streakDailyReminder: true,
    weeklyDigestEmail: true,
    proRenewalAlert: true,
    marketingPromo: false
  });
  const [loading, setLoading] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadPreferences();
    }
  }, [isOpen]);

  const loadPreferences = async () => {
    try {
      const res = await fetch('http://localhost:3002/api/v1/me/notification-preferences?userId=default_user');
      const data = await res.json();
      if (data.success && data.preferences) {
        setPrefs(data.preferences);
      }
    } catch (err) {
      console.error('Failed to load notification preferences:', err);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3002/api/v1/me/notification-preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'default_user',
          ...prefs
        })
      });
      const data = await res.json();
      if (data.success) {
        setSavedMsg('Đã lưu cấu hình nhận tin thành công!');
        setTimeout(() => {
          setSavedMsg('');
          onClose();
        }, 1200);
      }
    } catch (err) {
      alert('Lỗi lưu tuỳ chọn: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Cài Đặt Thông Báo Đa Kênh</h3>
              <p className="text-[11px] text-slate-500">Quản lý kênh nhắc nhở in-app và email cá nhân</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {savedMsg && (
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{savedMsg}</span>
          </div>
        )}

        {/* Toggles */}
        <div className="space-y-3 text-xs">
          {/* Toggle 1: Streak */}
          <div className="flex items-start justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 gap-3">
            <div className="flex items-start gap-2.5">
              <Flame className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-slate-800">Nhắc nhở chuỗi Streak hằng ngày</div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Nhận thông báo lúc 20:30 tối nếu chưa hoàn thành bài luyện phát âm để không mất khiên bảo vệ.
                </div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
              <input
                type="checkbox"
                checked={prefs.streakDailyReminder}
                onChange={(e) => setPrefs({ ...prefs, streakDailyReminder: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          {/* Toggle 2: Weekly Digest */}
          <div className="flex items-start justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 gap-3">
            <div className="flex items-start gap-2.5">
              <FileText className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-slate-800">Báo cáo tiến độ tuần qua email</div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Nhận tổng kết âm cải thiện nhiều nhất và gợi ý trọng tâm luyện tập vào sáng thứ Hai.
                </div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
              <input
                type="checkbox"
                checked={prefs.weeklyDigestEmail}
                onChange={(e) => setPrefs({ ...prefs, weeklyDigestEmail: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          {/* Toggle 3: Pro Renewal */}
          <div className="flex items-start justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 gap-3">
            <div className="flex items-start gap-2.5">
              <CreditCard className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-slate-800">Cảnh báo gia hạn gói Pro</div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Nhận thông báo trước 3 ngày và 1 ngày khi gói Pro sắp hết hạn kèm ưu đãi thanh toán VietQR.
                </div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
              <input
                type="checkbox"
                checked={prefs.proRenewalAlert}
                onChange={(e) => setPrefs({ ...prefs, proRenewalAlert: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          {/* Toggle 4: Marketing */}
          <div className="flex items-start justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 gap-3">
            <div className="flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-slate-800">Bản tin tính năng &amp; ưu đãi giảm giá</div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Thông báo về các tính năng AI âm học mới và mã giảm giá theo mùa (tối đa 2 email/tháng).
                </div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
              <input
                type="checkbox"
                checked={prefs.marketingPromo}
                onChange={(e) => setPrefs({ ...prefs, marketingPromo: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          {/* Mandatory Security & Billing Notice */}
          <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl text-[11px] text-amber-900 flex items-start gap-2">
            <Shield className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>Thông báo bắt buộc theo pháp luật:</strong> Email xác thực tài khoản, khôi phục mật khẩu và hoá đơn điện tử VAT (Nghị định 123/2020) luôn được gửi tự động để đảm bảo quyền lợi pháp lý của bạn.
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 text-xs">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg cursor-pointer"
          >
            Đóng
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg cursor-pointer transition shadow-sm"
          >
            {loading ? 'Đang lưu...' : 'Lưu Thay Đổi'}
          </button>
        </div>
      </div>
    </div>
  );
}
