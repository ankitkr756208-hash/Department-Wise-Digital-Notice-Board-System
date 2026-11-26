import React, { useState, useRef, useEffect } from 'react';
import { Bell, CheckCheck, Clock, ExternalLink } from 'lucide-react';
import { useNotices } from '../context/NoticeContext';
import { useNavigate } from 'react-router-dom';

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    notifications, 
    unreadNotificationsCount, 
    markNotificationRead, 
    markAllNotificationsRead 
  } = useNotices();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = (notif) => {
    markNotificationRead(notif.id);
    setIsOpen(false);
    if (notif.noticeId) {
      navigate(`/notices/${notif.noticeId}`);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/30"
        aria-label="Open notifications"
        aria-expanded={isOpen}
      >
        <Bell className="w-5 h-5" />
        {unreadNotificationsCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-xs">
            {unreadNotificationsCount > 9 ? '9+' : unreadNotificationsCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-slate-900">Notifications</h3>
              {unreadNotificationsCount > 0 && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  {unreadNotificationsCount} new
                </span>
              )}
            </div>
            {unreadNotificationsCount > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 hover:underline"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400">
                No notifications right now
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`p-3.5 hover:bg-slate-50 transition cursor-pointer flex items-start gap-3 ${
                    !notif.isRead ? 'bg-blue-50/40' : ''
                  }`}
                >
                  <div className="pt-0.5">
                    <span
                      className={`block w-2 h-2 rounded-full ${
                        notif.priority === 'Urgent'
                          ? 'bg-rose-500 ring-4 ring-rose-100'
                          : notif.priority === 'High'
                          ? 'bg-amber-500'
                          : 'bg-blue-500'
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <p className={`text-xs font-semibold truncate ${!notif.isRead ? 'text-slate-900' : 'text-slate-700'}`}>
                        {notif.title}
                      </p>
                      <span className="text-[10px] text-slate-400 shrink-0 flex items-center gap-0.5">
                        <Clock className="w-2.5 h-2.5" />
                        {notif.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                      {notif.message}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="px-4 py-2 border-t border-slate-100 text-center bg-slate-50/70">
            <button
              onClick={() => {
                setIsOpen(false);
                navigate('/notices');
              }}
              className="text-xs font-medium text-slate-600 hover:text-blue-600 transition flex items-center justify-center gap-1 w-full"
            >
              <span>View all circulars</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
