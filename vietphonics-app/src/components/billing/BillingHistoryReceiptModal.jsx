import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  Receipt,
  RotateCcw,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Download,
  Printer,
  X,
  RefreshCw,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

export default function BillingHistoryReceiptModal({
  isOpen,
  onClose,
  accountId = 'default_user'
}) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [refundOrder, setRefundOrder] = useState(null);
  const [refundReason, setRefundReason] = useState('Chưa phù hợp với trình độ hiện tại');
  const [submittingRefund, setSubmittingRefund] = useState(false);
  const [refundSuccessMsg, setRefundSuccessMsg] = useState('');
  const [refundErrorMsg, setRefundErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchTransactions();
      setRefundSuccessMsg('');
      setRefundErrorMsg('');
    }
  }, [isOpen, accountId]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3002/api/v1/billing/transactions?accountId=${accountId}`);
      const data = await res.json();
      if (data.success) {
        setTransactions(data.transactions || []);
      }
    } catch (err) {
      console.error('Failed to load transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenReceipt = async (orderCode) => {
    try {
      const res = await fetch(`http://localhost:3002/api/v1/billing/receipt/${orderCode}`);
      const data = await res.json();
      if (data.success && data.receipt) {
        setSelectedReceipt(data.receipt);
      }
    } catch (err) {
      console.error('Failed to load receipt:', err);
    }
  };

  const handleSubmitRefund = async (e) => {
    e.preventDefault();
    if (!refundOrder) return;
    try {
      setSubmittingRefund(true);
      setRefundErrorMsg('');
      setRefundSuccessMsg('');

      const res = await fetch('http://localhost:3002/api/v1/billing/refund-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accountId,
          orderCode: refundOrder.orderCode,
          reason: refundReason
        })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Yêu cầu hoàn tiền thất bại');
      }

      setRefundSuccessMsg(data.message);
      await fetchTransactions();
    } catch (err) {
      setRefundErrorMsg(err.message || 'Lỗi khi gửi yêu cầu hoàn tiền');
    } finally {
      setSubmittingRefund(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-base">Lịch Sử Giao Dịch &amp; Biên Lai VietQR</h3>
              <p className="text-xs text-slate-400">Chính sách bảo đảm hài lòng &amp; hoàn tiền trong 7 ngày</p>
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
        <div className="p-6 overflow-y-auto space-y-6">
          {loading ? (
            <div className="py-12 text-center text-slate-500 text-xs flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" />
              Đang tải danh sách giao dịch...
            </div>
          ) : transactions.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-slate-950/40 border border-slate-800/80 text-xs text-slate-500">
              Chưa có giao dịch phát sinh nào trên tài khoản này.
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Các Giao Dịch Gần Nhất ({transactions.length})
                </h4>
                <button
                  onClick={fetchTransactions}
                  className="text-[11px] text-indigo-400 hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" /> Làm mới
                </button>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900/50 text-slate-400 text-[11px]">
                      <th className="py-2.5 px-3 font-semibold">Mã Đơn / Ngày</th>
                      <th className="py-2.5 px-3 font-semibold">Gói Dịch Vụ</th>
                      <th className="py-2.5 px-3 font-semibold">Số Tiền (VND)</th>
                      <th className="py-2.5 px-3 font-semibold">Trạng Thái</th>
                      <th className="py-2.5 px-3 font-semibold text-right">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {transactions.map((tx) => (
                      <tr key={tx.orderCode} className="hover:bg-slate-900/40 transition">
                        <td className="py-3 px-3">
                          <div className="font-mono font-medium text-white">{tx.orderCode}</div>
                          <div className="text-[10px] text-slate-500">
                            {new Date(tx.paidAt || tx.createdAt).toLocaleDateString('vi-VN')}
                          </div>
                        </td>
                        <td className="py-3 px-3 font-medium text-slate-200">
                          {tx.planName}
                        </td>
                        <td className="py-3 px-3 font-mono font-semibold text-white">
                          {tx.amountVnd.toLocaleString('vi-VN')} đ
                        </td>
                        <td className="py-3 px-3">
                          {tx.status === 'paid' ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                              Đã thanh toán
                            </span>
                          ) : tx.status === 'refunded' ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700">
                              Đã hoàn tiền
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              Chờ xử lý
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-right space-x-1.5 whitespace-nowrap">
                          {tx.receiptAvailable && (
                            <button
                              onClick={() => handleOpenReceipt(tx.orderCode)}
                              className="px-2 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-[11px] font-medium transition inline-flex items-center gap-1"
                              title="Xem &amp; Tải biên lai"
                            >
                              <Receipt className="w-3 h-3" /> Biên lai
                            </button>
                          )}
                          {tx.status === 'paid' && !tx.refundStatus && (
                            <button
                              onClick={() => {
                                setRefundOrder(tx);
                                setRefundSuccessMsg('');
                                setRefundErrorMsg('');
                              }}
                              className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-rose-500/10 text-slate-400 hover:text-rose-300 border border-slate-700 hover:border-rose-500/30 text-[11px] font-medium transition inline-flex items-center gap-1"
                              title="Yêu cầu hoàn tiền 7 ngày"
                            >
                              <RotateCcw className="w-3 h-3" /> Hoàn tiền
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Refund Request Form Drawer */}
          {refundOrder && (
            <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2 text-amber-400">
                  <RotateCcw className="w-4 h-4" />
                  <h4 className="font-semibold text-xs text-white uppercase tracking-wider">
                    Yêu Cầu Hoàn Tiền 7 Ngày Cho Đơn {refundOrder.orderCode}
                  </h4>
                </div>
                <button
                  onClick={() => setRefundOrder(null)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 leading-relaxed">
                ⚖️ <strong>Chính sách hoàn tiền tự động 100%:</strong> Áp dụng cho các giao dịch trong vòng 7 ngày đầu tiên và có số lượt chấm phát âm Pro &lt; 30 bài. Khi hoàn tiền hoàn tất, tài khoản sẽ chuyển về gói Free.
              </div>

              {refundSuccessMsg ? (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{refundSuccessMsg}</span>
                </div>
              ) : (
                <form onSubmit={handleSubmitRefund} className="space-y-3">
                  {refundErrorMsg && (
                    <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>{refundErrorMsg}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      Lý do yêu cầu hoàn tiền *
                    </label>
                    <select
                      value={refundReason}
                      onChange={(e) => setRefundReason(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    >
                      <option value="Chưa phù hợp với trình độ hiện tại">Chưa phù hợp với trình độ hiện tại</option>
                      <option value="Ứng dụng nhận diện giọng địa phương chưa như mong đợi">Ứng dụng nhận diện giọng địa phương chưa như mong đợi</option>
                      <option value="Bấm nhầm nâng cấp">Bấm nhầm nâng cấp</option>
                      <option value="Lý do cá nhân khác">Lý do cá nhân khác</option>
                    </select>
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setRefundOrder(null)}
                      className="px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-medium transition"
                    >
                      Huỷ Bỏ
                    </button>
                    <button
                      type="submit"
                      disabled={submittingRefund}
                      className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition disabled:opacity-50"
                    >
                      {submittingRefund ? 'Đang gửi...' : 'Gửi Yêu Cầu Hoàn Tiền'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Receipt Printable View Modal */}
          {selectedReceipt && (
            <div className="p-5 rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-xl space-y-4 font-sans">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <div className="text-xs uppercase tracking-wider font-bold text-indigo-600">
                    Biên Lai Thanh Toán Điện Tử
                  </div>
                  <div className="text-lg font-black text-slate-900">VIETPHONICS RECEIPT</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-slate-700">{selectedReceipt.receiptNumber}</div>
                  <div className="text-[11px] text-slate-500">
                    {new Date(selectedReceipt.issuedAt).toLocaleString('vi-VN')}
                  </div>
                </div>
              </div>

              {/* Seller & Buyer Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Đơn vị phát hành</div>
                  <div className="font-bold text-slate-900">{selectedReceipt.sellerName}</div>
                  <div className="text-slate-600">MST: {selectedReceipt.sellerTaxCode}</div>
                  <div className="text-slate-600 text-[11px]">{selectedReceipt.sellerAddress}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Người mua hàng</div>
                  <div className="font-bold text-slate-900">{selectedReceipt.buyerName}</div>
                  <div className="text-slate-600">{selectedReceipt.buyerEmail}</div>
                  <div className="text-slate-600 font-mono">Mã đơn: {selectedReceipt.orderCode}</div>
                </div>
              </div>

              {/* Item line */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 text-[11px]">
                    <tr>
                      <th className="py-2 px-3 text-left">Mô tả dịch vụ</th>
                      <th className="py-2 px-3 text-right">Đơn giá</th>
                      <th className="py-2 px-3 text-right">VAT (8%)</th>
                      <th className="py-2 px-3 text-right">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2.5 px-3 font-medium">{selectedReceipt.planName}</td>
                      <td className="py-2.5 px-3 text-right font-mono">{selectedReceipt.subtotalVnd.toLocaleString('vi-VN')} đ</td>
                      <td className="py-2.5 px-3 text-right font-mono">{selectedReceipt.vatAmountVnd.toLocaleString('vi-VN')} đ</td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold">{selectedReceipt.totalAmountVnd.toLocaleString('vi-VN')} đ</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-[10px] text-slate-500">
                  Phương thức: <span className="font-semibold text-slate-700">{selectedReceipt.paymentMethod}</span> • Đã thanh toán đầy đủ
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 shadow"
                  >
                    <Printer className="w-3.5 h-3.5" /> In Biên Lai
                  </button>
                  <button
                    onClick={() => setSelectedReceipt(null)}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
