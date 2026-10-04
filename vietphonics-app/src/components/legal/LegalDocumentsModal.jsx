import React, { useState, useEffect } from 'react';
import {
  FileText,
  ShieldCheck,
  RotateCcw,
  Building,
  Mail,
  MapPin,
  X,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

export default function LegalDocumentsModal({ isOpen, onClose, initialTab = 'terms' }) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'terms' | 'privacy' | 'refund'
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (isOpen) {
      fetchDoc(activeTab);
    }
  }, [isOpen, activeTab]);

  const fetchDoc = async (type) => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3002/api/v1/legal/policy/${type}`);
      const data = await res.json();
      if (data.success && data.policy) {
        setDoc(data.policy);
      }
    } catch (err) {
      console.error('Failed to load legal document:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-base">Văn Bản Pháp Lý &amp; Điều Khoản</h3>
              <p className="text-xs text-slate-400">Tuân thủ pháp luật Việt Nam &amp; Nghị định 13/2023/NĐ-CP</p>
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
            onClick={() => setActiveTab('terms')}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 transition whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'terms'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Điều Khoản Sử Dụng
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 transition whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'privacy'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Chính Sách Bảo Mật (NĐ 13)
          </button>
          <button
            onClick={() => setActiveTab('refund')}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 transition whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'refund'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" /> Chính Sách Hoàn Tiền 7 Ngày
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-300 leading-relaxed">
          {loading ? (
            <div className="py-12 text-center text-slate-500">Đang tải văn bản...</div>
          ) : doc ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h4 className="font-bold text-white text-sm">{doc.title}</h4>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  Phiên bản: {doc.version}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 font-mono text-[11px] whitespace-pre-wrap leading-relaxed text-slate-300">
                {doc.contentMarkdown}
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-500">Không tìm thấy nội dung văn bản.</div>
          )}
        </div>

        {/* Footer: Legal Entity Disclosure (AC 1) */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/80 text-[11px] text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="space-y-0.5">
            <div className="font-semibold text-white flex items-center gap-1">
              <Building className="w-3 h-3 text-indigo-400" />
              Công ty TNHH Công nghệ Giáo dục VietPhonics
            </div>
            <div className="text-slate-500">
              Mã số thuế: 0318992819 • Email: support@vietphonics.vn
            </div>
          </div>
          <button
            onClick={onClose}
            className="self-end sm:self-center px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium transition"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
