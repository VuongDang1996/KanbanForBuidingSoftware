import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  Mail,
  User,
  Smartphone,
  Laptop,
  Tablet,
  LogOut,
  AlertTriangle,
  CheckCircle2,
  Clock,
  RefreshCw,
  X,
  KeyRound
} from 'lucide-react';
import { validatePasswordStrength } from '../lib/auth/passwordValidation';
import { useApp } from '../context/AppContext';

export default function AccountSecurityModal({
  isOpen,
  onClose,
  initialTab = 'register', // 'login' | 'register' | 'forgot' | 'devices'
  currentUser = null,
  onAuthSuccess = () => {}
}) {
  const appContext = useApp ? useApp() : null;
  const loginLearner = appContext?.loginLearner;
  const [activeTab, setActiveTab] = useState(initialTab);

  // Login States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // USER-106 States
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regDialect, setRegDialect] = useState('bac');
  const [regGoal, setRegGoal] = useState('communication');
  const [consentedToTerms, setConsentedToTerms] = useState(false);
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [otpCooldown, setOtpCooldown] = useState(0);

  // USER-103 States
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);
  const [resetToken, setResetToken] = useState('');
  const [resetPassword, setResetPassword] = useState('');
  const [resetStep, setResetStep] = useState(false);

  // USER-104 States
  const [sessions, setSessions] = useState([]);
  const [profileName, setProfileName] = useState(currentUser?.name || 'Học Viên VietPhonics');
  const [profileDialect, setProfileDialect] = useState(currentUser?.dialect || 'bac');
  const [profileGoal, setProfileGoal] = useState('communication');
  const [loadingSessions, setLoadingSessions] = useState(false);

  // Shared status & message
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Password strength
  const pwdStrength = validatePasswordStrength(activeTab === 'register' ? regPassword : resetPassword);

  useEffect(() => {
    setActiveTab(initialTab);
    setErrorMsg('');
    setSuccessMsg('');
  }, [initialTab, isOpen]);

  // Cooldown countdown effect
  useEffect(() => {
    let timer;
    if (otpCooldown > 0) {
      timer = setInterval(() => setOtpCooldown(prev => Math.max(0, prev - 1)), 1000);
    }
    return () => clearInterval(timer);
  }, [otpCooldown]);

  // Load sessions when devices tab is opened
  useEffect(() => {
    if (activeTab === 'devices' && isOpen) {
      fetchSessions();
    }
  }, [activeTab, isOpen]);

  const fetchSessions = async () => {
    try {
      setLoadingSessions(true);
      const accountId = currentUser?.id || 'default_user';
      const res = await fetch(`http://localhost:3002/api/v1/user/sessions?accountId=${accountId}`);
      const data = await res.json();
      if (data.success) {
        setSessions(data.sessions || []);
      }
    } catch (err) {
      console.error('Failed to load sessions:', err);
    } finally {
      setLoadingSessions(false);
    }
  };

  // 0. Submit Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    if (!loginEmail || !loginPassword) {
      setErrorMsg('Vui lòng nhập đầy đủ email và mật khẩu.');
      return;
    }
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3002/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Đăng nhập thất bại.');
      }
      setSuccessMsg('Đăng nhập thành công! Chào mừng bạn quay trở lại.');
      if (loginLearner && data.user) {
        loginLearner(data.user);
      }
      onAuthSuccess(data);
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      setErrorMsg(err.message || 'Lỗi kết nối máy chủ xác thực');
    } finally {
      setLoading(false);
    }
  };

  // 1. Submit Registration (USER-106)
  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!consentedToTerms) {
      setErrorMsg('Bạn cần đồng ý với Điều khoản & Chính sách bảo mật theo Nghị định 13/2023/NĐ-CP.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('http://localhost:3002/api/v1/auth/email/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: regEmail,
          password: regPassword,
          displayName: regName,
          l1Dialect: regDialect,
          learningGoal: regGoal,
          consentedToTerms
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.error || 'Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.');
        return;
      }

      setRegisteredEmail(regEmail);
      setOtpStep(true);
      setOtpCooldown(60);
      setSuccessMsg(data.message || 'Mã xác thực đã được gửi đến email của bạn.');
      if (data.otpPreview) {
        setOtpCode(data.otpPreview); // Auto-fill preview for ease of testing
      }
    } catch (err) {
      setErrorMsg('Lỗi kết nối máy chủ: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // 2. Submit OTP Verify (USER-106)
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    try {
      setLoading(true);
      const res = await fetch('http://localhost:3002/api/v1/auth/email/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: registeredEmail,
          otpCode: otpCode.trim()
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.error || 'Xác thực OTP không thành công.');
        return;
      }

      setSuccessMsg('Kích hoạt tài khoản thành công!');
      onAuthSuccess(data.account, data.token);
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setErrorMsg('Lỗi xác minh: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // 3. Resend OTP (USER-106)
  const handleResendOtp = async () => {
    if (otpCooldown > 0) return;
    setErrorMsg('');
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3002/api/v1/auth/email/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: registeredEmail })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.error || 'Không thể gửi lại mã.');
        return;
      }
      setOtpCooldown(60);
      setSuccessMsg('Đã gửi mã xác thực mới vào hộp thư.');
      if (data.otpPreview) setOtpCode(data.otpPreview);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 4. Request Password Reset (USER-103)
  const handleForgotRequest = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3002/api/v1/auth/password/forgot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail })
      });
      const data = await res.json();
      setForgotSubmitted(true);
      setSuccessMsg(data.message);
      if (data.resetTokenPreview) {
        setResetToken(data.resetTokenPreview);
        setResetStep(true);
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 5. Submit New Password (USER-103)
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3002/api/v1/auth/password/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: resetToken,
          newPassword: resetPassword
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.error || 'Đặt lại mật khẩu thất bại.');
        return;
      }
      setSuccessMsg(data.message);
      setTimeout(() => {
        setResetStep(false);
        setActiveTab('register');
      }, 2000);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 6. Revoke a Session (USER-104)
  const handleRevokeSession = async (sessionId) => {
    try {
      const res = await fetch(`http://localhost:3002/api/v1/user/sessions/${sessionId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        fetchSessions();
      }
    } catch (err) {
      console.error('Failed to revoke session:', err);
    }
  };

  // 7. Save Profile Settings (USER-104)
  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      const accountId = currentUser?.id || 'default_user';
      const res = await fetch('http://localhost:3002/api/v1/user/profile-settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accountId,
          displayName: profileName,
          l1Dialect: profileDialect,
          learningGoal: profileGoal
        })
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg('Đã lưu thay đổi hồ sơ & hiệu chỉnh phương ngữ thành công.');
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-base">Bảo Mật & Quản Trị Tài Khoản</h3>
              <p className="text-xs text-slate-400">Tuân thủ tiêu chuẩn an toàn Nghị định 13/2023/NĐ-CP</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-6 pt-2 overflow-x-auto">
          <button
            onClick={() => { setActiveTab('login'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`pb-3 px-3 text-sm font-medium border-b-2 transition whitespace-nowrap ${
              activeTab === 'login'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Đăng Nhập
          </button>
          <button
            onClick={() => { setActiveTab('register'); setOtpStep(false); setErrorMsg(''); setSuccessMsg(''); }}
            className={`pb-3 px-3 text-sm font-medium border-b-2 transition whitespace-nowrap ${
              activeTab === 'register'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Đăng Ký &amp; Xác Minh
          </button>
          <button
            onClick={() => { setActiveTab('forgot'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`pb-3 px-3 text-sm font-medium border-b-2 transition whitespace-nowrap ${
              activeTab === 'forgot'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Quên Mật Khẩu
          </button>
          <button
            onClick={() => { setActiveTab('devices'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`pb-3 px-3 text-sm font-medium border-b-2 transition whitespace-nowrap ${
              activeTab === 'devices'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Hồ Sơ &amp; Thiết Bị (Max 2)
          </button>
        </div>

        {/* Alerts */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {/* TAB 0: ĐĂNG NHẬP */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email Học Viên *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="learner@example.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-medium text-slate-300">Mật khẩu *</label>
                  <button
                    type="button"
                    onClick={() => setActiveTab('forgot')}
                    className="text-xs text-indigo-400 hover:underline"
                  >
                    Quên mật khẩu?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                <span>{loading ? 'Đang xác thực...' : 'Đăng Nhập'}</span>
              </button>

              <div className="text-center pt-2 border-t border-slate-800/80">
                <span className="text-xs text-slate-400">Chưa có tài khoản? </span>
                <button
                  type="button"
                  onClick={() => setActiveTab('register')}
                  className="text-xs font-semibold text-indigo-400 hover:underline cursor-pointer"
                >
                  Đăng ký ngay (Miễn phí)
                </button>
              </div>
            </form>
          )}

          {/* TAB 1: ĐĂNG KÝ EMAIL & XÁC MINH OTP (USER-106) */}
          {activeTab === 'register' && !otpStep && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Họ và tên hiển thị</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Địa chỉ Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Mật khẩu (Tối thiểu 8 ký tự, chữ hoa, số)</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                {/* Strength meter */}
                {regPassword && (
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Độ mạnh mật khẩu:</span>
                      <span className={pwdStrength.score >= 75 ? 'text-emerald-400' : pwdStrength.score >= 50 ? 'text-amber-400' : 'text-rose-400'}>
                        {pwdStrength.score >= 75 ? 'Rất mạnh' : pwdStrength.score >= 50 ? 'Khá' : 'Yếu'}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          pwdStrength.score >= 75 ? 'bg-emerald-500' : pwdStrength.score >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${pwdStrength.score}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Vùng miền mẹ đẻ (L1)</label>
                  <select
                    value={regDialect}
                    onChange={(e) => setRegDialect(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="bac">Miền Bắc (Hà Nội)</option>
                    <option value="trung">Miền Trung (Đà Nẵng/Huế)</option>
                    <option value="nam">Miền Nam (TP.HCM)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Mục tiêu học</label>
                  <select
                    value={regGoal}
                    onChange={(e) => setRegGoal(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="communication">Giao tiếp thường ngày</option>
                    <option value="ielts">Luyện thi IELTS Speaking</option>
                    <option value="workplace">Công việc & IT Standup</option>
                  </select>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-2">
                <input
                  type="checkbox"
                  id="consent"
                  checked={consentedToTerms}
                  onChange={(e) => setConsentedToTerms(e.target.checked)}
                  className="mt-1 rounded bg-slate-950 border-slate-700 text-indigo-500 focus:ring-0"
                />
                <label htmlFor="consent" className="text-xs text-slate-400">
                  Tôi đồng ý với <span className="text-indigo-400 hover:underline">Điều khoản dịch vụ</span> và{' '}
                  <span className="text-indigo-400 hover:underline">Chính sách bảo vệ dữ liệu cá nhân</span> theo Nghị định 13/2023/NĐ-CP.
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition shadow-lg shadow-indigo-600/20 disabled:opacity-50"
              >
                {loading ? 'Đang gửi mã xác thực...' : 'Tạo Tài Khoản & Nhận Mã OTP'}
              </button>
            </form>
          )}

          {/* TAB 1 - STEP 2: NHẬP MÃ OTP 6 CHỮ SỐ (USER-106) */}
          {activeTab === 'register' && otpStep && (
            <form onSubmit={handleVerifyOtp} className="space-y-4 text-center">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-medium text-sm">Xác Minh Kích Hoạt Tài Khoản</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Mã OTP 6 số đã được gửi đến <span className="text-indigo-300 font-mono">{registeredEmail}</span>
                </p>
              </div>

              <div className="py-2">
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="000000"
                  className="w-48 mx-auto text-center font-mono text-2xl tracking-[0.5em] bg-slate-950 border border-indigo-500/40 rounded-xl py-3 text-white focus:outline-none focus:border-indigo-400"
                />
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                <span>Mã có hiệu lực trong 15 phút.</span>
                {otpCooldown > 0 ? (
                  <span className="text-slate-500">Gửi lại sau {otpCooldown}s</span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="text-indigo-400 hover:underline flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Gửi lại mã
                  </button>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOtpStep(false)}
                  className="w-1/2 py-2 px-4 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-sm transition"
                >
                  Quay lại
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-1/2 py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition shadow-lg shadow-indigo-600/20 disabled:opacity-50"
                >
                  {loading ? 'Đang kích hoạt...' : 'Kích Hoạt Ngay'}
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: QUÊN & ĐẶT LẠI MẬT KHẨU (USER-103) */}
          {activeTab === 'forgot' && !resetStep && (
            <form onSubmit={handleForgotRequest} className="space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400">
                Nhập email đã đăng ký của bạn. Chúng tôi sẽ gửi token bảo mật 1 lần có thời hạn 30 phút để đặt lại mật khẩu an toàn.
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email đăng ký</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition shadow-lg shadow-indigo-600/20 disabled:opacity-50"
              >
                {loading ? 'Đang gửi...' : 'Gửi Liên Kết Đặt Lại Mật Khẩu'}
              </button>

              {forgotSubmitted && (
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setResetStep(true)}
                    className="text-xs text-indigo-400 hover:underline flex items-center justify-center gap-1 mx-auto"
                  >
                    <KeyRound className="w-3.5 h-3.5" /> Bạn đã có mã Token? Nhập mật khẩu mới ngay
                  </button>
                </div>
              )}
            </form>
          )}

          {/* TAB 2 - STEP 2: ĐẶT MẬT KHẨU MỚI (USER-103) */}
          {activeTab === 'forgot' && resetStep && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Token xác thực (32 ký tự hex)</label>
                <input
                  type="text"
                  required
                  value={resetToken}
                  onChange={(e) => setResetToken(e.target.value)}
                  placeholder="token_hex_..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Mật khẩu mới</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={resetPassword}
                    onChange={(e) => setResetPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
                ⚠️ Lưu ý: Khi đổi mật khẩu, toàn bộ các phiên đăng nhập trên các thiết bị khác sẽ tự động bị thu hồi ngay lập tức để bảo vệ an toàn.
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setResetStep(false)}
                  className="w-1/2 py-2 px-4 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-sm transition"
                >
                  Quay lại
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-1/2 py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition disabled:opacity-50"
                >
                  {loading ? 'Đang cập nhật...' : 'Lưu Mật Khẩu Mới'}
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: HỒ SƠ & THIẾT BỊ ĐĂNG NHẬP (USER-104) */}
          {activeTab === 'devices' && (
            <div className="space-y-5">
              {/* Profile Config */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">Hồ Sơ Học Viên & Phương Ngữ</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Tên hiển thị</label>
                    <input
                      type="text"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Phương ngữ L1</label>
                    <select
                      value={profileDialect}
                      onChange={(e) => setProfileDialect(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    >
                      <option value="bac">Miền Bắc (Hà Nội)</option>
                      <option value="trung">Miền Trung (Đà Nẵng)</option>
                      <option value="nam">Miền Nam (TP.HCM)</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={handleSaveProfile}
                  className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-white font-medium transition"
                >
                  Lưu Thay Đổi Hồ Sơ
                </button>
              </div>

              {/* Active Sessions List */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                    Thiết Bị Đang Đăng Nhập ({sessions.length}/2 phiên tối đa)
                  </h4>
                  <button
                    onClick={fetchSessions}
                    className="text-[11px] text-indigo-400 hover:underline flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Làm mới
                  </button>
                </div>

                {loadingSessions ? (
                  <div className="py-6 text-center text-xs text-slate-500">Đang tải danh sách thiết bị...</div>
                ) : sessions.length === 0 ? (
                  <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/80 text-center text-xs text-slate-500">
                    Chưa có phiên nào được ghi nhận.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {sessions.map((sess) => (
                      <div
                        key={sess.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                            {sess.deviceType === 'mobile' ? (
                              <Smartphone className="w-4 h-4" />
                            ) : sess.deviceType === 'tablet' ? (
                              <Tablet className="w-4 h-4" />
                            ) : (
                              <Laptop className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-white flex items-center gap-2">
                              <span>{sess.deviceName}</span>
                              {sess.isCurrent && (
                                <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                  Thiết bị này
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              {sess.locationEstimate} • IP: {sess.ipAddress}
                            </div>
                          </div>
                        </div>

                        {!sess.isCurrent && (
                          <button
                            onClick={() => handleRevokeSession(sess.id)}
                            className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition flex items-center gap-1 text-[11px]"
                            title="Đăng xuất thiết bị này"
                          >
                            <LogOut className="w-3.5 h-3.5" /> Đăng xuất
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
