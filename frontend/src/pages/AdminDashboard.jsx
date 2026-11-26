import React, { useState } from 'react';
import { 
  Building2, Users, GraduationCap, Bell, PlusCircle, 
  CheckCircle2, Clock, ShieldAlert, ArrowUpRight, BarChart3, 
  PieChart as PieChartIcon, Activity, ExternalLink, Download 
} from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, 
  Tooltip, CartesianGrid, PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import StatCard from '../components/StatCard';
import { departments, analyticsData, activityLogs } from '../data/dummyData';
import { useNotices } from '../context/NoticeContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import CreateNoticeModal from '../components/CreateNoticeModal';
import NoticeDrawer from '../components/NoticeDrawer';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const { notices, approveNotice, rejectNotice } = useNotices();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);

  const totalDepartments = departments.length;
  const totalStudents = departments.reduce((acc, d) => acc + d.studentCount, 0);
  const totalFaculty = departments.reduce((acc, d) => acc + d.facultyCount, 0);
  const totalNotices = notices.length;
  const pendingNotices = notices.filter((n) => n.status === 'pending');

  const handleApprove = (id) => {
    approveNotice(id);
    showToast('Notice approved and published campus-wide', 'success');
  };

  const handleReject = (id) => {
    const reason = window.prompt('Enter reason for rejection/revision:', 'Please adjust formatting');
    if (reason) {
      rejectNotice(id, reason);
      showToast('Notice returned to faculty with feedback', 'info');
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              Central Administration
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
              Super Admin Mode
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Academic Governance & Notice Analytics
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time telemetry, departmental volume monitoring, and university-wide circular moderation.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setCreateModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition shadow-sm flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Broadcast Circular</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Academic Departments"
          value={totalDepartments}
          subtitle="6 engineering & management schools"
          icon={Building2}
          trend="+1 Added this year"
          trendUp={true}
          color="blue"
        />
        <StatCard
          title="Enrolled Students"
          value={totalStudents.toLocaleString()}
          subtitle="Active campus portal users"
          icon={GraduationCap}
          trend="+8.4% vs last term"
          trendUp={true}
          color="emerald"
        />
        <StatCard
          title="Appointed Faculty"
          value={totalFaculty}
          subtitle="Professors & course coordinators"
          icon={Users}
          trend="100% Onboarded"
          trendUp={true}
          color="indigo"
        />
        <StatCard
          title="Circulars Published"
          value={totalNotices}
          subtitle={`${pendingNotices.length} pending moderation review`}
          icon={Bell}
          trend="+18 this week"
          trendUp={true}
          color="amber"
        />
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Volume Bar Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Department Notice Volume & Student Engagement
              </h2>
              <p className="text-xs text-slate-500">
                Total circulars published and student view counts by academic branch
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
              Autumn 2026
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.departmentNotices} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="department" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderColor: '#e2e8f0',
                    borderRadius: '12px',
                    fontSize: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Bar dataKey="published" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Published Notices" />
                <Bar dataKey="pending" fill="#f59e0b" radius={[6, 6, 0, 0]} name="Pending Review" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories Distribution Donut Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 mb-1">
              Notice Categories Ratio
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Distribution across official classifications
            </p>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analyticsData.categoryDistribution}
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {analyticsData.categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderRadius: '8px',
                      fontSize: '11px',
                      border: '1px solid #e2e8f0'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 text-xs">
            {analyticsData.categoryDistribution.map((c) => (
              <div key={c.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                <span className="text-slate-600 truncate text-[11px]">{c.name}</span>
                <span className="font-bold text-slate-800 ml-auto text-[11px]">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Moderation Queue & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Notices Moderation Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Pending Moderation Queue ({pendingNotices.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Circulars submitted by faculty requiring university validation
                </p>
              </div>
            </div>
            <Link
              to="/notices"
              className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
            >
              <span>All circulars</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {pendingNotices.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                All notices have been moderated and published!
              </div>
            ) : (
              pendingNotices.map((notice) => (
                <div
                  key={notice.id}
                  className="p-4 sm:p-5 hover:bg-slate-50/70 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                        {notice.department}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {notice.category}
                      </span>
                      <span className="text-xs text-slate-400">
                        By {notice.author?.name}
                      </span>
                    </div>
                    <h4
                      onClick={() => setSelectedNotice(notice)}
                      className="text-xs font-bold text-slate-900 hover:text-blue-600 transition cursor-pointer truncate"
                    >
                      {notice.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      {notice.excerpt || notice.content}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleReject(notice.id)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 text-xs font-semibold transition"
                    >
                      Revise
                    </button>
                    <button
                      onClick={() => handleApprove(notice.id)}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition shadow-2xs flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Audit Log / Recent Activities */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900">
                System Audit Trail
              </h3>
            </div>
            <div className="space-y-4">
              {activityLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-3 text-xs">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-slate-800 font-medium">
                      <strong className="text-slate-900">{log.user}</strong> {log.action.toLowerCase()}:
                    </p>
                    <p className="text-slate-500 truncate text-[11px]">
                      "{log.target}"
                    </p>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">
                      {log.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <span className="text-[11px] text-slate-400">
              All administrative operations are cryptographically signed.
            </span>
          </div>
        </div>
      </div>

      {/* Modal and Drawer */}
      <CreateNoticeModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
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
