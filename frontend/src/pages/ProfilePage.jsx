import React, { useState } from 'react';
import { 
  User, Mail, Phone, Building2, GraduationCap, 
  Shield, Bookmark, FileText, Bell, Edit3, 
  CheckCircle2, X, Sparkles, LogOut, ArrowUpRight 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotices } from '../context/NoticeContext';
import { useToast } from '../context/ToastContext';
import NoticeCard from '../components/NoticeCard';
import NoticeDrawer from '../components/NoticeDrawer';
import { departments } from '../data/dummyData';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const { user, updateProfile, logout, loginAs } = useAuth();
  const { notices, bookmarks } = useNotices();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'bookmarks' | 'authored'

  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '+1 (555) 234-5678',
    department: user?.department || 'CSE',
    designation: user?.designation || '',
    enrollmentNo: user?.enrollmentNo || ''
  });

  const [notificationPrefs, setNotificationPrefs] = useState({
    urgentSms: true,
    departmentEmails: true,
    examAlerts: true,
    placementAlerts: true
  });

  const bookmarkedNotices = notices.filter((n) => bookmarks.includes(n.id));
  const authoredNotices = notices.filter(
    (n) => n.author?.name === user?.name || n.author?.email === user?.email
  );

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(editData);
    setIsEditing(false);
    showToast('Profile information successfully updated', 'success');
  };

  const handleTogglePref = (key) => {
    setNotificationPrefs((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      showToast('Notification preference updated', 'info');
      return updated;
    });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Profile Header Hero Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
              alt={user?.name}
              className="w-20 h-20 rounded-3xl object-cover border-4 border-slate-100 shadow-sm"
            />
            <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                {user?.name}
              </h1>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                {user?.role}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {user?.designation} • Department of {user?.department}
            </p>
            <p className="text-[11px] text-slate-400">
              Member since {user?.joinedDate || '2023'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition flex items-center gap-1.5 shadow-2xs"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Details</span>
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 text-xs font-semibold transition"
            >
              Cancel
            </button>
          )}

          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="px-4 py-2.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 text-xs font-semibold transition flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Tabs: Profile / Bookmarks / Authored */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'profile'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Account Overview
        </button>

        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeTab === 'bookmarks'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>Bookmarked Notices ({bookmarkedNotices.length})</span>
        </button>

        {(user?.role === 'faculty' || user?.role === 'hod' || user?.role === 'admin') && (
          <button
            onClick={() => setActiveTab('authored')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'authored'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>My Authored Notices ({authoredNotices.length})</span>
          </button>
        )}
      </div>

      {/* Tab 1: Profile & Preferences View */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Information Card */}
          <div className="md:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Institutional Credentials
            </h2>

            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={editData.phone}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Department
                    </label>
                    <select
                      value={editData.department}
                      onChange={(e) => setEditData({ ...editData, department: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white"
                    >
                      {departments.map((d) => (
                        <option key={d.code} value={d.code}>
                          {d.code} - {d.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Enrollment / Employee ID
                    </label>
                    <input
                      type="text"
                      value={editData.enrollmentNo}
                      onChange={(e) => setEditData({ ...editData, enrollmentNo: e.target.value })}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-xs"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Email</span>
                    <p className="font-semibold text-slate-800 mt-0.5">{user?.email}</p>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Contact Phone</span>
                    <p className="font-semibold text-slate-800 mt-0.5">{user?.phone || '+1 (555) 234-5678'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Academic Division</span>
                    <p className="font-semibold text-slate-800 mt-0.5">{user?.department} Department</p>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Roll / Staff Code</span>
                    <p className="font-semibold text-slate-800 mt-0.5 font-mono">{user?.enrollmentNo}</p>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Official Designation</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{user?.designation}</p>
                </div>
              </div>
            )}
          </div>

          {/* Notification Preferences */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Alert Preferences
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              {[
                { key: 'urgentSms', label: 'Urgent Circular SMS Alerts', desc: 'Real-time text for high priority exams' },
                { key: 'departmentEmails', label: 'Daily Department Digest', desc: 'Summary of new circulars in your inbox' },
                { key: 'examAlerts', label: 'Examination Timetable Push', desc: 'Immediate notification on timetable releases' },
                { key: 'placementAlerts', label: 'Placement Drives', desc: 'Job listings matching your department' }
              ].map((item) => (
                <div key={item.key} className="flex items-start justify-between gap-3 pt-2">
                  <div>
                    <p className="font-semibold text-slate-800 text-xs">{item.label}</p>
                    <p className="text-[11px] text-slate-400">{item.desc}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationPrefs[item.key]}
                    onChange={() => handleTogglePref(item.key)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 mt-1 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Bookmarked Notices View */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-4">
          {bookmarkedNotices.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
              <Bookmark className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-slate-800">No saved circulars</h3>
              <p className="text-xs text-slate-400 mt-1 mb-4">
                Click the bookmark star on any notice card to save it for quick reference.
              </p>
              <button
                onClick={() => navigate('/notices')}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600 text-white"
              >
                Browse Circulars
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookmarkedNotices.map((n) => (
                <NoticeCard
                  key={n.id}
                  notice={n}
                  onOpenDetails={(notice) => setSelectedNotice(notice)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Authored Notices (for faculty/admin) */}
      {activeTab === 'authored' && (
        <div className="space-y-4">
          {authoredNotices.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 text-xs text-slate-400">
              No circulars authored under this profile.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {authoredNotices.map((n) => (
                <NoticeCard
                  key={n.id}
                  notice={n}
                  onOpenDetails={(notice) => setSelectedNotice(notice)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Notice Drawer */}
      {selectedNotice && (
        <NoticeDrawer
          notice={selectedNotice}
          onClose={() => setSelectedNotice(null)}
        />
      )}
    </div>
  );
}
