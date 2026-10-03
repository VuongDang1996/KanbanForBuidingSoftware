import React, { useState } from 'react';

/**
 * PRON-101 AC 4: MicPermissionModal
 * Fallback guidance modal when browser denies microphone access.
 * Provides platform-specific instructions (Chrome, Safari, Edge) and a retry mechanism.
 */
export default function MicPermissionModal({ isOpen, onClose, onPermissionGranted }) {
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null); // 'granted' | 'denied'

  if (!isOpen) return null;

  const handleRetryPermission = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Granted!
      stream.getTracks().forEach(t => t.stop());
      setTestResult('granted');
      setTimeout(() => {
        if (onPermissionGranted) onPermissionGranted();
        if (onClose) onClose();
      }, 800);
    } catch (err) {
      setTestResult('denied');
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-100 flex flex-col space-y-5">
        {/* Warning Icon & Title */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200">
            <span className="material-symbols-outlined text-2xl">mic_off</span>
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-900 leading-tight">
              Chưa Cấp Quyền Microphone
            </h3>
            <p className="font-body-sm text-xs text-slate-500 mt-1">
              VietPhonics cần quyền truy cập microphone để phân tích âm thanh trực tiếp và phản hồi tức thì dưới 50ms.
            </p>
          </div>
        </div>

        {/* 3 Step Guide */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
          <div className="text-xs font-bold text-slate-700 uppercase font-mono tracking-wider">
            Cách Mở Lại Quyền Trong 3 Bước:
          </div>

          <div className="flex items-start gap-2.5 text-xs text-slate-600">
            <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
              1
            </span>
            <span>
              Nhấp vào biểu tượng <strong>Ổ khóa (🔒)</strong> hoặc <strong>Cài đặt trang web</strong> trên thanh địa chỉ trình duyệt.
            </span>
          </div>

          <div className="flex items-start gap-2.5 text-xs text-slate-600">
            <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
              2
            </span>
            <span>
              Tìm mục <strong>Microphone (Micro)</strong> và chuyển từ <em>"Chặn"</em> sang <em>"Cho phép" (Allow)</em>.
            </span>
          </div>

          <div className="flex items-start gap-2.5 text-xs text-slate-600">
            <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
              3
            </span>
            <span>
              Bấm nút <strong>"Kiểm tra lại thiết bị"</strong> ở bên dưới để hoàn tất kích hoạt.
            </span>
          </div>
        </div>

        {/* Status result banner */}
        {testResult === 'granted' && (
          <div className="bg-emerald-50 text-emerald-800 p-3 rounded-xl text-xs font-bold font-mono flex items-center gap-2 border border-emerald-200 animate-fade-in">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            <span>Đã cấp quyền thành công! Đang mở phòng luyện...</span>
          </div>
        )}

        {testResult === 'denied' && (
          <div className="bg-rose-50 text-rose-800 p-3 rounded-xl text-xs font-semibold flex items-center gap-2 border border-rose-200 animate-fade-in">
            <span className="material-symbols-outlined text-sm">error</span>
            <span>Vẫn chưa nhận được quyền mic. Vui lòng kiểm tra lại cài đặt trình duyệt hoặc hệ điều hành.</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2.5 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 font-bold text-xs text-slate-700 transition-colors cursor-pointer"
          >
            Đóng
          </button>
          <button
            type="button"
            disabled={testing}
            onClick={handleRetryPermission}
            className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {testing ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span className="material-symbols-outlined text-sm">refresh</span>
                <span>Kiểm Tra Lại Thiết Bị</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
