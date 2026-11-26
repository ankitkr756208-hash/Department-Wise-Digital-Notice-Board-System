import React, { useState } from 'react';
import { 
  Building2, Users, Bell, PlusCircle, CheckCircle2, 
  Clock, XCircle, Search, Filter, Mail, Phone, 
  FileText, ExternalLink, Trash2, ArrowUpRight 
} from 'lucide-react';
import StatCard from '../components/StatCard';
import NoticeCard from '../components/NoticeCard';
import NoticeDrawer from '../components/NoticeDrawer';
import CreateNoticeModal from '../components/CreateNoticeModal';
import { facultyMembers, departments } from '../data/dummyData';
import { useNotices } from '../context/NoticeContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function HODDashboard() {
  const { user } = useAuth();
  const { notices, approveNotice, rejectNotice, deleteNotice } = useNotices();
  const { showToast } = useToast();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'pending', 'faculty'
  const [searchQuery, setSearchQuery] = useState('');

  const deptCode = user?.department || 'CSE';
  const deptMeta = departments.find((d) => d.code === deptCode) || departments[0];

  const departmentNotices = notices.filter(
    (n) => n.department === deptCode || n.department === 'All'
  );

  const pendingNotices = departmentNotices.filter((n) => n.status === 'pending');
  const approvedNotices = departmentNotices.filter((n) => n.status === 'published');

  const filteredNotices = departmentNotices.filter((n) => {
    if (activeTab === 'pending') return n.status === 'pending';
    if (activeTab === 'approved') return n.status === 'published';
    return true;
  }).filter((n) => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.author?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApprove = (id) => {
    approveNotice(id);
    showToast('Notice approved and published to department board', 'success');
  };

  const handleReject = (id) => {
    const reason = window.prompt('Provide revision notes to faculty member:', 'Update dates');
    if (reason) {
      rejectNotice(id, reason);
      showToast('Revision request sent to faculty', 'info');
    }
  };

  return (
    <div className="space-y-8">
      {/* Department Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider font-bold bg-white/20 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                Department Executive Portal
              </span>
              <span className="text-[11px] font-semibold bg-emerald-500/30 text-emerald-200 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                Active Term
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {deptMeta.name} ({deptMeta.code})
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-2xl leading-relaxed">
              Head of Department: <strong className="text-white">{deptMeta.hodName}</strong> • Overseeing {deptMeta.facultyCount} faculty members and {deptMeta.studentCount} enrolled undergraduates.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setCreateModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-white text-blue-900 font-bold text-xs hover:bg-blue-50 transition shadow-md flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4 text-blue-600" />
              <span>Publish Notice</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Active Notices"
          value={approvedNotices.length}
          subtitle={`Broadcasting in ${deptCode}`}
          icon={Bell}
          trend="+3 this week"
          trendUp={true}
          color="blue"
        />
        <StatCard
          title="Pending Approvals"
          value={pendingNotices.length}
          subtitle="Submitted by faculty"
          icon={Clock}
          trend={pendingNotices.length > 0 ? 'Requires action' : 'All clear'}
          trendUp={pendingNotices.length === 0}
          color={pendingNotices.length > 0 ? 'amber' : 'emerald'}
        />
        <StatCard
          title="Department Faculty"
          value={deptMeta.facultyCount}
          subtitle="Active course coordinators"
          icon={Users}
          trend="100% active"
          trendUp={true}
          color="indigo"
        />
        <StatCard
          title="Enrolled Students"
          value={deptMeta.studentCount}
          subtitle="All semesters combined"
          icon={Building2}
          trend="Full attendance"
          trendUp={true}
          color="purple"
        />
      </div>

      {/* Main Tabbed Workflow: Notices vs Approvals vs Faculty */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            {[
              { id: 'all', label: `All Circulars (${departmentNotices.length})` },
              { id: 'pending', label: `Pending Approvals (${pendingNotices.length})`, badge: pendingNotices.length },
              { id: 'faculty', label: `Faculty Directory (${facultyMembers.length})` }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition relative ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {activeTab !== 'faculty' && (
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Filter department notices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white"
              />
            </div>
          )}
        </div>

        {/* Tab 1 & 2: Notices / Pending Queue */}
        {activeTab !== 'faculty' && (
          <div>
            {filteredNotices.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-slate-800">No notices in this view</h3>
                <p className="text-xs text-slate-400 mt-1">Try switching tabs or resetting your search filter.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredNotices.map((notice) => (
                  <div
                    key={notice.id}
                    className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-blue-300 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            notice.status === 'pending'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {notice.status === 'pending' ? 'Pending Approval' : 'Live on Board'}
                        </span>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                          {notice.category}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                            notice.priority === 'Urgent'
                              ? 'bg-rose-50 text-rose-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {notice.priority}
                        </span>
                        <span className="text-xs text-slate-400">
                          By {notice.author?.name} ({notice.author?.designation})
                        </span>
                      </div>

                      <h4
                        onClick={() => setSelectedNotice(notice)}
                        className="text-sm font-bold text-slate-900 hover:text-blue-600 cursor-pointer transition"
                      >
                        {notice.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 max-w-3xl">
                        {notice.content}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0">
                      {notice.status === 'pending' ? (
                        <>
                          <button
                            onClick={() => handleReject(notice.id)}
                            className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 text-slate-600 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 transition"
                          >
                            Reject / Revise
                          </button>
                          <button
                            onClick={() => handleApprove(notice.id)}
                            className="px-4 py-1.5 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-2xs flex items-center gap-1.5"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Approve Notice</span>
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setSelectedNotice(notice)}
                          className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1"
                        >
                          <span>Inspect</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Faculty Directory */}
        {activeTab === 'faculty' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facultyMembers.map((fac) => (
              <div
                key={fac.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="flex items-start gap-3.5 mb-4">
                  <img
                    src={fac.avatar}
                    alt={fac.name}
                    className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 truncate">
                      {fac.name}
                    </h4>
                    <p className="text-xs text-blue-600 font-medium">
                      {fac.designation}
                    </p>
                    <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                      {fac.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-500 py-3 border-t border-slate-100">
                  <p className="truncate">
                    <strong className="text-slate-700">Domain:</strong> {fac.specialization}
                  </p>
                  <p className="flex items-center gap-1.5 truncate">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{fac.email}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span>{fac.noticesCount} circulars authored</span>
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">
                    Verified Faculty
                  </span>
                  <button
                    onClick={() => {
                      setSearchQuery(fac.name);
                      setActiveTab('all');
                    }}
                    className="text-xs font-semibold text-blue-600 hover:underline"
                  >
                    View Notices &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals and Side Drawer */}
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
