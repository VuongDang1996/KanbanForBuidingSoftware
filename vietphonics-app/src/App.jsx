import React, { useState } from 'react';
import {
  Mic,
  Volume2,
  Sparkles,
  ShieldCheck,
  CreditCard,
  ArrowRight,
  FolderDown,
  CheckCircle2,
  Layers,
  Activity
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('welcome');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-50 px-4 sm:px-8 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-600 to-rose-400 flex items-center justify-center text-white shadow-sm font-black text-sm">
              VP
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-slate-900">
                VietPhonics <span className="text-rose-600">AI</span>
              </span>
              <span className="ml-2 font-mono text-[10px] bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-full font-bold">
                Dev Environment :5174
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 hidden sm:inline">
              Folder: <code className="font-mono text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">/vietphonics-app</code>
            </span>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Sẵn sàng ráp UI Reference</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto p-4 sm:p-8 flex-1 w-full space-y-6">
        
        {/* Ready Notification Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs relative overflow-hidden">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
              <span>Thư mục phát triển ứng dụng đã sẵn sàng</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Chào mừng bạn đến với <span className="text-rose-600">vietphonics-app</span>
            </h1>

            <p className="text-sm text-slate-600 leading-relaxed">
              Thư mục này hoạt động <strong>hoàn toàn độc lập</strong> với công cụ quản lý Kanban. Bạn có thể dán toàn bộ file HTML, CSS, React components, hình ảnh hoặc thư mục tham khảo từ web khác vào:
            </p>

            <div className="p-3.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs flex items-center justify-between border border-slate-800">
              <span>vietphonics-app/src/ui-reference/</span>
              <span className="text-rose-400 font-bold">Paste thư mục vào đây</span>
            </div>
          </div>
        </div>

        {/* 3 Step Integration Guide */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 font-bold flex items-center justify-center text-sm border border-rose-200">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Dán UI Reference</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Bạn dán thư mục UI tải từ web khác vào <code>src/ui-reference/</code> hoặc gửi ảnh screenshot vào đây.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 font-bold flex items-center justify-center text-sm border border-sky-200">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Phân tích & Tách Component</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Tôi sẽ đọc mã UI reference, chuyển đổi sang Tailwind chuẩn Light Mode và ghép vào thư mục <code>src/components/</code>.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 font-bold flex items-center justify-center text-sm border border-emerald-200">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Ghép Voice & Thanh Toán 30K</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Kết nối micro thu âm Web Audio API và popup VietQR 30.000đ để biến giao diện tĩnh thành sản phẩm thật chạy được!
            </p>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 px-6 text-center text-xs text-slate-400">
        VietPhonics AI — Product Codebase in <code className="font-mono text-slate-600">vietphonics-app</code> · Running on port 5174
      </footer>
    </div>
  );
}
