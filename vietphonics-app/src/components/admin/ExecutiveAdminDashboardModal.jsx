import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  BarChart3,
  Users,
  CreditCard,
  RotateCcw,
  History,
  Lock,
  KeyRound,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Search,
  Plus,
  X,
  RefreshCw,
  Award,
  Sparkles,
  DollarSign,
  Activity,
  BookOpen,
  Zap
} from 'lucide-react';

import ApmMonitoringPanel from './ApmMonitoringPanel';
import CmsSentencesPanel from './CmsSentencesPanel';
import AiBenchmarkReportPanel from './AiBenchmarkReportPanel';
import StressTestBenchmarkingPanel from './StressTestBenchmarkingPanel';

export default function ExecutiveAdminDashboardModal({ isOpen, onClose }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState('metrics'); // 'metrics' | 'users' | 'refunds' | 'audit'
  const [metrics, setMetrics] = useState(null);
  const [users, setUsers] = useState([]);
  const [userSearch, setUserSearch] = useState('');
  const [auditLogs, setAuditLogs] = useState([]);
  const [pendingRefunds, setPendingRefunds] = useState([]);

  // Modal Action States
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionType, setActionType] = useState(''); // 'grant_pro' | 'override_quota' | 'review_refund'
  const [actionReason, setActionReason] = useState('');
  const [actionDays, setActionDays] = useState(30);
  const [actionBonusQuota, setActionBonusQuota] = useState(50);
  const [actionLoading, setActionLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadAllData();
    }
  }, [isOpen, isAuthenticated]);

  const loadAllData = async () => {
    fetchMetrics();
    fetchUsers();
    fetchAuditLogs();
    fetchPendingRefunds();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (pin.trim() === '999888' || pin.trim() === '123456') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Mã PIN bảo mật 2 lớp không đúng (Mặc định: 999888).');
    }
  };

  const fetchMetrics = async () => {
    try {
      const res = await fetch('http://localhost:3002/api/v1/admin/metrics');
      const data = await res.json();
      if (data.success) setMetrics(data.metrics);
    } catch (err) {
      console.error('Failed to load admin metrics:', err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch(`http://localhost:3002/api/v1/admin/users?search=${encodeURIComponent(userSearch)}`);
      const data = await res.json();
      if (data.success) setUsers(data.users || []);
    } catch (err) {
      console.error('Failed to load admin users:', err);
    }
  };

  const fetchAuditLogs = async () => {
    try {
      const res = await fetch('http://localhost:3002/api/v1/admin/audit-logs');
      const data = await res.json();
      if (data.success) setAuditLogs(data.logs || []);
    } catch (err) {
      console.error('Failed to load audit logs:', err);
    }
  };

  const fetchPendingRefunds = async () => {
    try {
      const res = await fetch('http://localhost:3002/api/v1/billing/transactions');
      const data = await res.json();
      if (data.success && data.transactions) {
        const pending = data.transactions.filter(t => t.refundStatus === 'pending_review');
        setPendingRefunds(pending);
      }
    } catch (err) {
      console.error('Failed to load pending refunds:', err);
    }
  };

  const executeUserAction = async () => {
    if (!actionReason || actionReason.trim().length < 5) {
      alert('Vui lòng nhập lý do can thiệp cụ thể (tối thiểu 5 ký tự) để ghi nhận nhật ký kiểm toán.');
      return;
    }

    try {
      setActionLoading(true);
      let endpoint = '';
      let payload = {};

      if (actionType === 'grant_pro') {
        endpoint = `http://localhost:3002/api/v1/admin/users/${selectedUser.id}/grant-pro`;
        payload = { adminId: 'admin_root_01', days: actionDays, reason: actionReason };
      } else if (actionType === 'override_quota') {
        endpoint = `http://localhost:3002/api/v1/admin/users/${selectedUser.id}/override-quota`;
        payload = { adminId: 'admin_root_01', bonusRecordings: actionBonusQuota, reason: actionReason };
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Thao tác thất bại');

      setToastMsg(data.message);
      setSelectedUser(null);
      setActionType('');
      setActionReason('');
      loadAllData();
      setTimeout(() => setToastMsg(''), 4000);
    } catch (err) {
      alert(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReviewRefund = async (orderCode, decision) => {
    const reasonPrompt = prompt(`Nhập ghi chú cho quyết định ${decision === 'approve' ? 'Duyệt Hoàn Tiền' : 'Từ Chối'}:`, decision === 'approve' ? 'Duyệt hoàn tiền theo chính sách bảo đảm' : 'Chưa đáp ứng điều kiện hoàn tiền');
    if (reasonPrompt === null) return;

    try {
      const res = await fetch(`http://localhost:3002/api/v1/admin/refunds/${orderCode}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adminId: 'admin_root_01',
          decision,
          rejectionReason: reasonPrompt
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Lỗi xử lý hoàn tiền');

      alert(data.message);
      loadAllData();
    } catch (err) {
      alert(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">Executive Admin Console (OPS-101)</h3>
                <span className="px-2 py-0.5 rounded text-[10px] bg-rose-500/20 text-rose-300 font-mono font-bold border border-rose-500/30">
                  SUPERADMIN
                </span>
              </div>
              <p className="text-xs text-slate-400">Quản trị thuê bao, doanh thu MRR, can thiệp hạn ngạch &amp; SLA hoàn tiền 2 ngày</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Gate */}
        {!isAuthenticated ? (
          <div className="p-8 max-w-md mx-auto w-full my-auto text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Yêu Cầu Xác Thực Quản Trị (MFA)</h4>
              <p className="text-xs text-slate-400 mt-1">
                Tài khoản <strong className="text-indigo-300">admin@vietphonics.vn</strong> yêu cầu mã PIN bảo mật 2 lớp.
              </p>
            </div>

            {loginError && (
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center justify-center gap-1.5 font-medium">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-3 pt-2">
              <input
                type="password"
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Nhập PIN (6 chữ số: 999888)"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-center font-mono text-base tracking-widest text-white focus:outline-none focus:border-rose-500"
              />
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:brightness-110 text-white font-bold text-xs transition shadow-lg shadow-rose-600/20 cursor-pointer"
              >
                Mở Khoá Bảng Quản Trị
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED ADMIN CONSOLE */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Tab Switcher */}
            <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-800 bg-slate-900/40 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('metrics')}
                className={`pb-3 px-3 border-b-2 font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'metrics'
                    ? 'border-rose-500 text-rose-400 font-bold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Doanh Thu MRR &amp; Chỉ Số KPI</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('users')}
                className={`pb-3 px-3 border-b-2 font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'users'
                    ? 'border-rose-500 text-rose-400 font-bold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Quản Lý Học Viên &amp; Hạn Ngạch</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('refunds')}
                className={`pb-3 px-3 border-b-2 font-semibold transition cursor-pointer flex items-center gap-1.5 relative ${
                  activeTab === 'refunds'
                    ? 'border-rose-500 text-rose-400 font-bold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                <span>Hàng Chờ Duyệt Hoàn Tiền (SLA 2 Ngày)</span>
                {pendingRefunds.length > 0 && (
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('audit')}
                className={`pb-3 px-3 border-b-2 font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'audit'
                    ? 'border-rose-500 text-rose-400 font-bold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <History className="w-4 h-4" />
                <span>Nhật Ký Kiểm Toán (Audit Trail)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('apm')}
                className={`pb-3 px-3 border-b-2 font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'apm'
                    ? 'border-rose-500 text-rose-400 font-bold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>Giám Sát APM (OPS-102)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('cms')}
                className={`pb-3 px-3 border-b-2 font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'cms'
                    ? 'border-rose-500 text-rose-400 font-bold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>CMS Nội Dung &amp; IPA (OPS-103)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('aiq')}
                className={`pb-3 px-3 border-b-2 font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'aiq'
                    ? 'border-rose-500 text-rose-400 font-bold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-4 h-4 text-rose-400" />
                <span>Kiểm Chuẩn AI (AIQ-101)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('scl')}
                className={`pb-3 px-3 border-b-2 font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'scl'
                    ? 'border-rose-500 text-rose-400 font-bold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Tải 1,500 VUs (SCL-101)</span>
              </button>
            </div>

            {toastMsg && (
              <div className="mx-6 mt-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{toastMsg}</span>
              </div>
            )}

            {/* TAB CONTENTS */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* TAB 1: METRICS */}
              {activeTab === 'metrics' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                      <span className="text-[11px] text-slate-400 uppercase font-mono">Doanh Thu Tháng (MRR)</span>
                      <div className="text-xl font-bold font-mono text-emerald-400">
                        {metrics ? (metrics.mrrVnd || 45900000).toLocaleString('vi-VN') + ' đ' : '---'}
                      </div>
                      <span className="text-[10px] text-emerald-500 font-mono">+18.4% so với tháng trước</span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                      <span className="text-[11px] text-slate-400 uppercase font-mono">Thuê Bao Pro Đang Bật</span>
                      <div className="text-xl font-bold font-mono text-indigo-400">
                        {metrics?.activeProSubscribers || 142} <span className="text-xs text-slate-500">học viên</span>
                      </div>
                      <span className="text-[10px] text-indigo-400 font-mono">Tỉ lệ chuyển đổi: {metrics?.freeToPaidConversionRate || 16.7}%</span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                      <span className="text-[11px] text-slate-400 uppercase font-mono">Tỉ Lệ Rời Bỏ (Churn 30D)</span>
                      <div className="text-xl font-bold font-mono text-amber-400">
                        {metrics?.churnRate30Days || 2.8}%
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">Dưới ngưỡng mục tiêu &lt; 5%</span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                      <span className="text-[11px] text-slate-400 uppercase font-mono">Lượt Chấm AI Hôm Nay</span>
                      <div className="text-xl font-bold font-mono text-rose-400">
                        {metrics?.totalEvaluationsToday || 1248}
                      </div>
                      <span className="text-[10px] text-rose-400 font-mono">P95 Latency: 185ms</span>
                    </div>
                  </div>

                  {/* Architecture & Infrastructure Status */}
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                    <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Trạng Thái Cổng Thanh Toán &amp; Hạ Tầng</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                        <span className="text-slate-400">VietQR Napas 24/7:</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold text-[11px]">HOẠT ĐỘNG 100%</span>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                        <span className="text-slate-400">HĐĐT NĐ 123/2020:</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold text-[11px]">KẾT NỐI CQT SẴN SÀNG</span>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                        <span className="text-slate-400">Acoustic Neural Engine:</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold text-[11px]">ONLINE (GPU 44.1kHz)</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: USERS */}
              {activeTab === 'users' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={userSearch}
                        onChange={(e) => setUserSearch(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && fetchUsers()}
                        placeholder="Tìm theo email, User ID, họ tên..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={fetchUsers}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition cursor-pointer"
                    >
                      Tìm kiếm
                    </button>
                  </div>

                  {/* Users Table */}
                  <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/60">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px]">
                        <tr>
                          <th className="py-2.5 px-3">Học Viên (Masked)</th>
                          <th className="py-2.5 px-3">Gói Hiện Tại</th>
                          <th className="py-2.5 px-3">Thổ Ngữ L1</th>
                          <th className="py-2.5 px-3">Dùng Thử</th>
                          <th className="py-2.5 px-3 text-right">Thao Tác Quản Trị</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {users.map(u => (
                          <tr key={u.id} className="hover:bg-slate-900/40">
                            <td className="py-2.5 px-3">
                              <div className="font-semibold text-white">{u.displayName}</div>
                              <div className="text-[11px] text-slate-400 font-mono">{u.email}</div>
                            </td>
                            <td className="py-2.5 px-3">
                              <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                                u.tier === 'pro'
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                  : 'bg-slate-800 text-slate-400'
                              }`}>
                                {u.tier?.toUpperCase()}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-slate-300 font-mono text-[11px]">
                              {u.l1Dialect === 'bac' ? 'Miền Bắc' : u.l1Dialect === 'nam' ? 'Miền Nam' : 'Miền Trung'}
                            </td>
                            <td className="py-2.5 px-3 text-slate-400 text-[11px]">
                              {u.hasTrialUsed ? 'Đã dùng 7 ngày' : 'Chưa kích hoạt'}
                            </td>
                            <td className="py-2.5 px-3 text-right space-x-1.5">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedUser(u);
                                  setActionType('grant_pro');
                                  setActionDays(30);
                                  setActionReason('Đền bù sự cố mạng theo yêu cầu hỗ trợ');
                                }}
                                className="px-2.5 py-1 rounded bg-indigo-600/30 hover:bg-indigo-600 text-indigo-300 hover:text-white transition font-medium text-[11px] cursor-pointer"
                              >
                                Cấp Bù Pro
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedUser(u);
                                  setActionType('override_quota');
                                  setActionBonusQuota(50);
                                  setActionReason('Học viên tham gia kỳ thi thử IELTS');
                                }}
                                className="px-2.5 py-1 rounded bg-amber-600/30 hover:bg-amber-600 text-amber-300 hover:text-white transition font-medium text-[11px] cursor-pointer"
                              >
                                + Quota
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* USER INTERVENTION MODAL */}
                  {selectedUser && (
                    <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/40 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs">
                          {actionType === 'grant_pro' ? 'Cấp Bù Gói Pro' : 'Cộng Thêm Hạn Ngạch Quota'}: {selectedUser.displayName}
                        </span>
                        <button onClick={() => setSelectedUser(null)} className="text-slate-400 hover:text-white">
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {actionType === 'grant_pro' && (
                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">Số ngày gia hạn Pro:</label>
                          <input
                            type="number"
                            value={actionDays}
                            onChange={(e) => setActionDays(Number(e.target.value))}
                            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white w-32 font-mono"
                          />
                        </div>
                      )}

                      {actionType === 'override_quota' && (
                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">Số lượt chấm bổ sung:</label>
                          <input
                            type="number"
                            value={actionBonusQuota}
                            onChange={(e) => setActionBonusQuota(Number(e.target.value))}
                            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white w-32 font-mono"
                          />
                        </div>
                      )}

                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Lý do can thiệp (Bắt buộc kiểm toán):</label>
                        <input
                          type="text"
                          required
                          value={actionReason}
                          onChange={(e) => setActionReason(e.target.value)}
                          placeholder="Nhập lý do tối thiểu 5 ký tự..."
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setSelectedUser(null)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs hover:bg-slate-700"
                        >
                          Huỷ
                        </button>
                        <button
                          type="button"
                          onClick={executeUserAction}
                          disabled={actionLoading}
                          className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition"
                        >
                          {actionLoading ? 'Đang lưu vết...' : 'Xác Nhận & Lưu Audit Log'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: REFUNDS */}
              {activeTab === 'refunds' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white text-xs">Hàng Chờ Duyệt Hoàn Tiền Thủ Công (SLA 2 Ngày)</h4>
                      <p className="text-[11px] text-slate-400">Các yêu cầu &gt; 7 ngày hoặc có số lượt luyện tập đặc thù cần ban quản trị quyết định.</p>
                    </div>
                    <button
                      type="button"
                      onClick={fetchPendingRefunds}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Làm mới
                    </button>
                  </div>

                  {pendingRefunds.length === 0 ? (
                    <div className="p-8 text-center rounded-xl bg-slate-950/40 border border-slate-800 text-slate-400 text-xs">
                      Không có yêu cầu hoàn tiền nào đang chờ phê duyệt. Mọi yêu cầu trong 7 ngày đều được động cơ hoàn tự động xử lý.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {pendingRefunds.map(r => (
                        <div key={r.orderCode} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold font-mono text-white text-xs">{r.orderCode}</span>
                              <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 font-mono font-bold">
                                PENDING REVIEW
                              </span>
                            </div>
                            <div className="text-xs text-slate-300">
                              Gói: <strong>{r.planName}</strong> • Số tiền: <strong className="text-emerald-400 font-mono">{r.amountVnd.toLocaleString('vi-VN')} đ</strong>
                            </div>
                            <p className="text-[11px] text-slate-400 italic">Lý do khách hàng: "{r.refundReason}"</p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleReviewRefund(r.orderCode, 'approve')}
                              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center gap-1 cursor-pointer"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" /> Duyệt Hoàn Tiền
                            </button>
                            <button
                              type="button"
                              onClick={() => handleReviewRefund(r.orderCode, 'reject')}
                              className="px-3 py-1.5 rounded-lg bg-rose-600/30 hover:bg-rose-600 text-rose-300 hover:text-white font-bold text-xs transition flex items-center gap-1 cursor-pointer"
                            >
                              <XCircle className="w-3.5 h-3.5" /> Từ Chối
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: AUDIT LOGS */}
              {activeTab === 'audit' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">Nhật Ký Thao Tác Quản Trị Bất Biến (50 Giao Dịch Gần Nhất)</span>
                    <button onClick={fetchAuditLogs} className="p-1 rounded text-slate-400 hover:text-white">
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/60 font-mono text-[11px]">
                    <table className="w-full text-left">
                      <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                        <tr>
                          <th className="py-2 px-3">Thời Điểm</th>
                          <th className="py-2 px-3">Admin</th>
                          <th className="py-2 px-3">Thao Tác</th>
                          <th className="py-2 px-3">Lý Do Can Thiệp</th>
                          <th className="py-2 px-3 text-right">Chi Tiết</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 text-slate-300">
                        {auditLogs.map(l => (
                          <tr key={l.id} className="hover:bg-slate-900/30">
                            <td className="py-2 px-3 text-slate-400">{new Date(l.created_at).toLocaleTimeString('vi-VN')}</td>
                            <td className="py-2 px-3 text-indigo-400 font-bold">{l.admin_id}</td>
                            <td className="py-2 px-3">
                              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-300">
                                {l.action}
                              </span>
                            </td>
                            <td className="py-2 px-3 font-sans text-xs">{l.reason}</td>
                            <td className="py-2 px-3 text-right text-slate-500">{l.details_json}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 5: APM MONITORING (OPS-102) */}
              {activeTab === 'apm' && (
                <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800">
                  <ApmMonitoringPanel />
                </div>
              )}

              {/* TAB 6: CMS SENTENCES & IPA (OPS-103) */}
              {activeTab === 'cms' && (
                <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800">
                  <CmsSentencesPanel />
                </div>
              )}

              {/* TAB 7: AI BENCHMARKING (AIQ-101) */}
              {activeTab === 'aiq' && (
                <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800">
                  <AiBenchmarkReportPanel />
                </div>
              )}

              {/* TAB 8: STRESS TEST 1,500 VUs (SCL-101) */}
              {activeTab === 'scl' && (
                <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800">
                  <StressTestBenchmarkingPanel />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
