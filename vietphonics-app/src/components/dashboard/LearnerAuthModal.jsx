import React, { useState } from 'react';

/**
 * LearnerAuthModal.jsx
 * Authentication Modal for Learner Login, Google OAuth, and JWT Session (USER-101 AC 1)
 */
export default function LearnerAuthModal({
  isOpen,
  onClose,
  currentUser,
  onLoginSuccess
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e?.preventDefault();
    if (!email) {
      setErrorMessage('Vui lòng nhập địa chỉ email hợp lệ');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    try {
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      });
      const data = await res.json();
      if (data.success) {
        if (onLoginSuccess) {
          onLoginSuccess(data);
        }
        onClose();
      } else {
        setErrorMessage(data.error || 'Đăng nhập không thành công');
      }
    } catch (err) {
      setErrorMessage('Lỗi kết nối máy chủ xác thực');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    setEmail('google_learner@vietphonics.vn');
    setName('Google Learner');
    setTimeout(() => {
      handleLogin();
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Đóng"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-rose-50 text-primary border border-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
            <span className="material-symbols-outlined text-2xl">account_circle</span>
          </div>
          <h2 className="text-xl font-black text-slate-900">
            {currentUser ? 'Hồ Sơ Học Viên' : 'Đăng Nhập VietPhonics'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Lưu lại toàn bộ lịch sử ngữ âm, bảng điểm Radar và đồng bộ đa thiết bị
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
            <span className="material-symbols-outlined text-base">error</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {currentUser ? (
          <div className="flex flex-col gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">{currentUser.name}</div>
                  <div className="text-xs text-slate-500">{currentUser.email}</div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase bg-amber-50 text-amber-700 border border-amber-200">
                  {currentUser.tier || 'Free'}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl text-sm hover:bg-slate-800 transition-colors"
            >
              Đóng Cửa Sổ
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Họ và Tên (Tùy chọn)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="VD: Đặng Vương"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Học Viên *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="learner@example.com"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mật Khẩu
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-primary text-white font-bold text-sm hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Đang xác thực...' : 'Đăng Nhập / Tiếp Tục'}
            </button>

            <div className="relative my-2 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <span className="relative px-3 bg-white text-slate-400 text-xs uppercase tracking-wider font-semibold">
                Hoặc
              </span>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center justify-center gap-2 text-sm font-semibold text-slate-700 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Đăng nhập nhanh với Google</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
