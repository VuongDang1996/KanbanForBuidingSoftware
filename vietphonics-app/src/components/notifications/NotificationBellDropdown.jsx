import React, { useState, useEffect, useRef } from 'react';
import {
  Bell,
  CheckCheck,
  Flame,
  FileText,
  CreditCard,
  Settings,
  Sparkles,
  Clock,
  ExternalLink
} from 'lucide-react';
import NotificationPreferencesModal from './NotificationPreferencesModal';

export default function NotificationBellDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isPrefModalOpen, setIsPrefModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    loadNotifications();

    // Close dropdown on outside click
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const loadNotifications = async () => {
    try {
      const res = await fetch('http://localhost:3002/api/v1/me/notifications?userId=default_user');
      const data = await res.json();
      if (data.success) {
        setNotifications(data.notifications || []);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (err) {
      console.error('Failed to load notifications:', err);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      const res = await fetch(`http://localhost:3002/api/v1/me/notifications/${id}/read`, {
        method: 'POST'
      });
      if (res.ok) {
        setNotifications(prev =>
          prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (err) {
      console.error('Error marking read:', err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      const res = await fetch('http://localhost:3002/api/v1/me/notifications/read-all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'default_user' })
      });
      if (res.ok) {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
        setUnreadCount(0);
      }
    } catch (err) {
      console.error('Error marking all read:', err);
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'streak':
        return <Flame className="w-4 h-4 text-amber-500" />;
      case 'digest':
        return <FileText className="w-4 h-4 text-indigo-500" />;
      case 'renewal':
        return <CreditCard className="w-4 h-4 text-emerald-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-purple-500" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) loadNotifications();
        }}
        className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
        title="Thông báo"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex items-center justify-center min-w-4 h-4 px-1 rounded-full bg-rose-500 text-white font-mono text-[10px] font-bold border-2 border-white animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Card */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white border border-slate-200/90 shadow-xl overflow-hidden z-50 animate-fadeIn text-xs">
          {/* Header */}
          <div className="p-3.5 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800">Thông Báo Của Bạn</span>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-700 font-mono text-[10px] font-bold">
                  {unreadCount} mới
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="text-[11px] text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 cursor-pointer"
              >
                <CheckCheck className="w-3.5 h-3.5" /> Đã đọc tất cả
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-slate-400">
                <Bell className="w-8 h-8 mx-auto mb-2 text-slate-300 stroke-1" />
                <p>Bạn không có thông báo nào mới.</p>
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => {
                    if (!n.isRead) handleMarkAsRead(n.id);
                  }}
                  className={`p-3.5 transition flex items-start gap-3 cursor-pointer ${
                    n.isRead ? 'bg-white hover:bg-slate-50/70 opacity-80' : 'bg-indigo-50/30 hover:bg-indigo-50/60'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                    {getTypeIcon(n.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className={`font-semibold ${n.isRead ? 'text-slate-700' : 'text-slate-900 font-bold'}`}>
                        {n.title}
                      </h4>
                      {!n.isRead && (
                        <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0 mt-1" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {n.message}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono pt-0.5">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(n.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
            <span className="font-mono text-[10px]">Multi-Channel Hub v4.2</span>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setIsPrefModalOpen(true);
              }}
              className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" /> Tuỳ chọn nhận tin
            </button>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      <NotificationPreferencesModal
        isOpen={isPrefModalOpen}
        onClose={() => setIsPrefModalOpen(false)}
      />
    </div>
  );
}
