import React, { useState } from 'react';
import {
  Mic,
  ShieldCheck,
  Lock,
  Check,
  X,
  AlertTriangle,
  Info,
  CheckCircle2
} from 'lucide-react';

export default function VoiceBiometricConsentModal({
  isOpen,
  onClose,
  onConsentGranted = () => {},
  accountId = 'default_user'
}) {
  const [agreedBiometrics, setAgreedBiometrics] = useState(true);
  const [agreedModelTraining, setAgreedModelTraining] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (!agreedBiometrics) {
      setErrorMsg('Bạn cần đồng ý xử lý âm thanh giọng nói để hệ thống AI có thể chấm điểm phát âm.');
      return;
    }

    try {
      setSubmitting(true);
      setErrorMsg('');

      // 1. Submit voice biometric consent
      await fetch('http://localhost:3002/api/v1/legal/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accountId,
          consentType: 'voice_biometrics',
          isGranted: true,
          policyVersion: 'v1.2_ND13_2023'
        })
      });

      // 2. Submit model training preference
      await fetch('http://localhost:3002/api/v1/legal/model-training-opt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accountId,
          optIn: agreedModelTraining
        })
      });

      onConsentGranted({ agreedBiometrics: true, agreedModelTraining });
      onClose();
    } catch (err) {
      setErrorMsg('Không thể lưu xác nhận: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-base">Đồng Ý Xử Lý Giọng Nói AI</h3>
              <p className="text-xs text-slate-400">Tuân thủ Nghị định 13/2023/NĐ-CP về dữ liệu cá nhân</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 text-xs text-slate-300">
          <p className="leading-relaxed">
            Trước khi bạn bắt đầu luyện tập với micro, VietPhonics cần sự đồng thuận rõ ràng của bạn để thu nhận và phân tích dữ liệu âm học:
          </p>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">Mục đích sử dụng duy nhất:</span>
                <p className="text-slate-400 mt-0.5">
                  Phân tích độ mở hàm, vị trí lưỡi và tính toán điểm GOP âm vị để phản hồi sửa lỗi cho bạn ngay lập tức.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 pt-1">
              <Lock className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">Mã hóa &amp; Quyền riêng tư:</span>
                <p className="text-slate-400 mt-0.5">
                  Dữ liệu âm thanh được mã hóa an toàn. Bạn có toàn quyền thu hồi hoặc yêu cầu xoá vĩnh viễn dữ liệu giọng nói bất kỳ lúc nào trong phần Cài đặt.
                </p>
              </div>
            </div>
          </div>

          {/* Consent Checkboxes */}
          <div className="space-y-3 pt-2">
            <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/40 border border-slate-800 cursor-pointer hover:bg-slate-950/80 transition">
              <input
                type="checkbox"
                checked={agreedBiometrics}
                onChange={(e) => setAgreedBiometrics(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-indigo-600 bg-slate-900 border-slate-700 focus:ring-0"
              />
              <div>
                <span className="font-medium text-white block">
                  1. Tôi đồng ý cho phép xử lý dữ liệu âm thanh giọng nói phục vụ chấm điểm phát âm (Bắt buộc)
                </span>
                <span className="text-[11px] text-slate-400">
                  Cần thiết để AI trích xuất formant và đánh giá bài đọc của bạn.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/40 border border-slate-800 cursor-pointer hover:bg-slate-950/80 transition">
              <input
                type="checkbox"
                checked={agreedModelTraining}
                onChange={(e) => setAgreedModelTraining(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-indigo-600 bg-slate-900 border-slate-700 focus:ring-0"
              />
              <div>
                <span className="font-medium text-white block">
                  2. Cho phép sử dụng bản ghi âm ẩn danh để cải thiện mô hình AI (Tự nguyện)
                </span>
                <span className="text-[11px] text-slate-400">
                  Dữ liệu đã được gỡ bỏ toàn bộ danh tính người dùng. Bạn có thể tắt mục này bất cứ lúc nào mà không ảnh hưởng việc học.
                </span>
              </div>
            </label>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/50 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-medium transition"
          >
            Để Sau
          </button>
          <button
            onClick={handleConfirm}
            disabled={submitting}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition flex items-center gap-2 disabled:opacity-50"
          >
            <CheckCircle2 className="w-4 h-4" />
            {submitting ? 'Đang lưu...' : 'Tôi Đồng Ý &amp; Bắt Đầu Luyện'}
          </button>
        </div>
      </div>
    </div>
  );
}
