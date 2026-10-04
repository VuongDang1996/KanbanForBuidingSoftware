import React, { useState, useEffect } from 'react';
import {
  FileText,
  Building,
  CheckCircle2,
  AlertCircle,
  Download,
  ExternalLink,
  X,
  Code,
  ShieldCheck,
  Printer
} from 'lucide-react';

export default function EInvoiceRequestModal({
  isOpen,
  onClose,
  orderCode = 'VP PRO1Y 8821',
  orderAmount = 599000,
  accountId = 'default_user'
}) {
  const [taxCode, setTaxCode] = useState('0317899123');
  const [companyName, setCompanyName] = useState('Công ty TNHH Giải Pháp Công Nghệ Alpha VN');
  const [address, setAddress] = useState('Tầng 5, Toà nhà Bitexco, Q.1, TP.HCM');
  const [email, setEmail] = useState('accounting@alphavn.com');
  const [buyerType, setBuyerType] = useState('company');

  const [loading, setLoading] = useState(false);
  const [fetchingExisting, setFetchingExisting] = useState(true);
  const [invoice, setInvoice] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (isOpen && orderCode) {
      checkExistingInvoice();
    }
  }, [isOpen, orderCode]);

  const checkExistingInvoice = async () => {
    try {
      setFetchingExisting(true);
      setErrorMsg('');
      const res = await fetch(`http://localhost:3002/api/v1/billing/e-invoice/${orderCode}`);
      const data = await res.json();
      if (data.success && data.hasInvoice && data.invoice) {
        setInvoice(data.invoice);
      } else {
        setInvoice(null);
      }
    } catch (err) {
      console.error('Failed to query invoice status:', err);
    } finally {
      setFetchingExisting(false);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    // Tax code validation
    const cleanTaxCode = taxCode.trim().replace(/[-\s]/g, '');
    if (!/^[0-9]{10}$|^[0-9]{13}$/.test(cleanTaxCode)) {
      setErrorMsg('Mã số thuế doanh nghiệp phải gồm đúng 10 hoặc 13 chữ số theo quy định Tổng Cục Thuế.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('http://localhost:3002/api/v1/billing/e-invoice/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accountId,
          orderCode,
          buyerType,
          taxCode: cleanTaxCode,
          companyName: companyName.trim(),
          address: address.trim(),
          email: email.trim()
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Yêu cầu xuất hoá đơn thất bại.');
      }

      setInvoice(data.invoice);
      setSuccessMsg(data.message || 'Phát hành hoá đơn điện tử thành công!');
    } catch (err) {
      setErrorMsg(err.message || 'Lỗi kết nối khi gửi yêu cầu hoá đơn.');
    } finally {
      setLoading(false);
    }
  };

  const subtotal = Math.round(orderAmount / 1.08);
  const vat = orderAmount - subtotal;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-base">Hoá Đơn Điện Tử VAT (NĐ 123/2020)</h3>
              <p className="text-xs text-slate-400">Có mã của Cơ quan Thuế • Ký hiệu 1C26TXX • Mẫu số 1/001</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          {fetchingExisting ? (
            <div className="py-12 text-center text-slate-400">Đang kiểm tra trạng thái hoá đơn điện tử...</div>
          ) : invoice ? (
            /* INVOICE ISSUED DETAILS */
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3 text-emerald-300">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <div>
                  <span className="font-semibold text-sm">Hoá đơn điện tử đã phát hành hợp lệ</span>
                  <p className="text-xs text-emerald-400/80 mt-0.5">
                    Đã cấp mã xác thực CQT và gửi về email {invoice.buyerEmail || email}.
                  </p>
                </div>
              </div>

              {/* Invoice Spec Card */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3 font-mono text-xs">
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Mã Đơn Hàng:</span>
                  <span className="text-white font-bold">{invoice.orderCode}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Ký Hiệu &amp; Số Hoá Đơn:</span>
                  <span className="text-amber-400 font-bold">{invoice.invoiceSeries} • Số: {invoice.invoiceNo}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Mã Tra Cứu CQT:</span>
                  <span className="text-emerald-400 font-bold">{invoice.cqtLookupCode}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Đơn Vị Mua Hàng:</span>
                  <span className="text-slate-200 text-right font-sans font-medium">{invoice.buyerCompanyName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Mã Số Thuế (MST):</span>
                  <span className="text-white font-bold">{invoice.buyerTaxCode}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Cộng Tiền Hàng (Chưa VAT):</span>
                  <span className="text-white">{(invoice.subtotalVnd || subtotal).toLocaleString('vi-VN')} đ</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Thuế GTGT (VAT 8%):</span>
                  <span className="text-white">{(invoice.vatAmountVnd || vat).toLocaleString('vi-VN')} đ</span>
                </div>
                <div className="flex justify-between pt-1 text-sm font-sans font-bold">
                  <span className="text-slate-300">Tổng Tiền Thanh Toán:</span>
                  <span className="text-emerald-400 font-mono">{(invoice.totalAmountVnd || orderAmount).toLocaleString('vi-VN')} đ</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={`http://localhost:3002/api/v1/billing/e-invoice/${orderCode}/xml`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs flex items-center justify-center gap-2 transition border border-slate-700"
                >
                  <Code className="w-4 h-4 text-sky-400" />
                  <span>Tải Tệp XML Gốc (TT 78)</span>
                </a>
                <a
                  href={invoice.pdfUrl || '#'}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => {
                    if (!invoice.pdfUrl || invoice.pdfUrl === '#') {
                      e.preventDefault();
                      window.print();
                    }
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-600/20"
                >
                  <Download className="w-4 h-4" />
                  <span>Tải Bản Thể Hiện PDF</span>
                </a>
              </div>
            </div>
          ) : (
            /* INVOICE REQUEST FORM */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 space-y-1">
                <div className="flex items-center justify-between text-slate-300 font-medium">
                  <span>Đơn hàng thanh toán: <strong>{orderCode}</strong></span>
                  <span className="font-mono text-emerald-400 font-bold">{orderAmount.toLocaleString('vi-VN')} đ</span>
                </div>
                <p>Xuất hoá đơn điện tử có mã hợp lệ để khấu trừ chi phí thuế doanh nghiệp hoặc thanh toán công tác phí.</p>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {successMsg && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Mã Số Thuế Doanh Nghiệp (MST)</label>
                  <input
                    type="text"
                    required
                    value={taxCode}
                    onChange={(e) => setTaxCode(e.target.value)}
                    placeholder="VD: 0318992819"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Loại Hình Khách Hàng</label>
                  <select
                    value={buyerType}
                    onChange={(e) => setBuyerType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="company">Tổ chức / Doanh nghiệp</option>
                    <option value="personal">Hộ kinh doanh / Cá nhân</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Tên Đơn Vị / Công Ty (Theo ĐKKD)</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Công ty Cổ phần / TNHH..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Địa Chỉ Trụ Sở Công Ty</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Số nhà, đường, phường, quận/huyện, tỉnh/thành phố..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email Nhận Hoá Đơn Điện Tử (XML &amp; PDF)</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ke-toan@company.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition shadow-lg shadow-emerald-600/20 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{loading ? 'Đang cấp mã Cơ quan Thuế...' : 'Xác Nhận Xuất Hoá Đơn Điện Tử (NĐ 123)'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
