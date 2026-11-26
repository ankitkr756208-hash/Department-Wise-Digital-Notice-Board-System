import React, { useState } from 'react';
import { 
  PlusCircle, FileText, CheckCircle2, Clock, 
  Eye, AlertCircle, Trash2, Edit3, ArrowUpRight, 
  Building2, Users, Bell, Bookmark 
} from 'lucide-react';
import StatCard from '../components/StatCard';
import CreateNoticeModal from '../components/CreateNoticeModal';
import NoticeDrawer from '../components/NoticeDrawer';
import { useNotices } from '../context/NoticeContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function FacultyDashboard() {
  const { user } = useAuth();
  const { notices, deleteNotice } = useNotices();
  const { showToast } = useToast();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  // Filter notices authored by current faculty user or CSE department
  const myNotices = notices.filter(
    (n) => n.author?.name === user?.name || n.author?.email === user?.email || (user?.role === 'faculty' && n.department === user?.department && n.author?.role === 'faculty')
  );

  const publishedCount = myNotices.filter((n) => n.status === 'published').length;
  const pendingCount = myNotices.filter((n) => n.status === 'pending').length;
  const totalViews = myNotices.reduce((acc, n) => acc + (n.viewsCount || 0), 0);

  const filtered = myNotices.filter((n) => {
    if (filterStatus === 'all') return true;
    return n.status === filterStatus;
  });

  const departmentBroadcasts = notices.filter(
    (n) => n.department === user?.department && n.author?.name !== user?.name
  ).slice(0, 3);

  const handleDelete = (id) => {
    if (window.confirm('Delete this circular submission?')) {
      deleteNotice(id);
      showToast('Circular removed from submissions', 'info');
    }
  };

  const handleEdit = (notice) => {
    setEditingNotice(notice);
    setCreateModalOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150'}
            alt={user?.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-100 shadow-xs"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                Welcome, {user?.name || 'Professor'}
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-200">
                Faculty Portal
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {user?.designation || 'Associate Professor'} • Department of {user?.department || 'Computer Science'}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setEditingNotice(null);
            setCreateModalOpen(true);
          }}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition shadow-sm flex items-center justify-center gap-2 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Draft New Notice</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Live Circulars"
          value={publishedCount}
          subtitle="Actively displayed on student board"
          icon={CheckCircle2}
          color="emerald"
        />
        <StatCard
          title="Pending HOD Review"
          value={pendingCount}
          subtitle="Awaiting HOD approval"
          icon={Clock}
          color="amber"
        />
        <StatCard
          title="Student Read Views"
          value={totalViews.toLocaleString()}
          subtitle="Cumulative impressions"
          icon={Eye}
          color="blue"
        />
        <StatCard
          title="Department Reach"
          value="98.4%"
          subtitle="Target cohort acknowledgement"
          icon={Building2}
          color="indigo"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Notices Submissions Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                My Authored Circulars & Timetables
              </h2>
              <p className="text-xs text-slate-500">
                Track approval lifecycle and student engagement
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-white border border-slate-200 p-1 rounded-xl">
              {[
                { id: 'all', label: 'All' },
                { id: 'published', label: 'Published' },
                { id: 'pending', label: 'In Review' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterStatus(tab.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                    filterStatus === tab.id
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filtered.length === 0 ? (
              <div className="p-10 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-400">
                No circulars under this filter status.
              </div>
            ) : (
              filtered.map((notice) => (
                <div
                  key={notice.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-blue-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          notice.status === 'published'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {notice.status === 'published' ? 'Live on Portal' : 'Pending HOD Approval'}
                      </span>

                      <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                        {notice.category}
                      </span>

                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        {notice.viewsCount || 0} views
                      </span>
                    </div>

                    <h4
                      onClick={() => setSelectedNotice(notice)}
                      className="text-sm font-bold text-slate-900 hover:text-blue-600 cursor-pointer transition truncate"
                    >
                      {notice.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {notice.excerpt || notice.content}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleEdit(notice)}
                      className="p-2 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition"
                      title="Edit notice"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(notice.id)}
                      className="p-2 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition"
                      title="Delete notice"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setSelectedNotice(notice)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
                    >
                      Preview
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sidebar: HOD & Campus Announcements */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Bell className="w-4 h-4 text-blue-600" />
              <span>Department Announcements</span>
            </h3>
            <div className="space-y-3">
              {departmentBroadcasts.map((n) => (
                <div
                  key={n.id}
                  onClick={() => setSelectedNotice(n)}
                  className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50/60 border border-slate-100 transition cursor-pointer"
                >
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">
                    {n.priority}
                  </span>
                  <h4 className="text-xs font-bold text-slate-800 mt-1 line-clamp-2">
                    {n.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1">
                    By {n.author?.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Publishing Guidance */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-2xl border border-indigo-100 text-xs text-indigo-900 space-y-2">
            <h4 className="font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              <span>Faculty Notice Guidelines</span>
            </h4>
            <p className="text-[11px] text-indigo-800/80 leading-relaxed">
              1. All exam rosters must specify hall numbers and authorized invigilators.<br/>
              2. Lab schedules should include lab technician signatures.<br/>
              3. Urgent notices are pushed via campus email notification.
            </p>
          </div>
        </div>
      </div>

      {/* Modals & Drawer */}
      <CreateNoticeModal
        isOpen={createModalOpen}
        onClose={() => {
          setCreateModalOpen(false);
          setEditingNotice(null);
        }}
        initialData={editingNotice}
      />

      {selectedNotice && (
        <NoticeDrawer
          notice={selectedNotice}
          onClose={() => setSelectedNotice(null)}
        />
      )}
    </div>
  );
}
