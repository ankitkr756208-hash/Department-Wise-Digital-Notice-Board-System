import React, { useState } from 'react';
import { 
  GraduationCap, Bell, Calendar, Clock, Search, 
  Bookmark, Paperclip, ChevronRight, Sparkles, 
  BookOpen, Trophy, AlertTriangle, ArrowUpRight, 
  Download, CheckCircle2 
} from 'lucide-react';
import NoticeCard from '../components/NoticeCard';
import NoticeDrawer from '../components/NoticeDrawer';
import { upcomingEvents } from '../data/dummyData';
import { useNotices } from '../context/NoticeContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Link } from 'react-router-dom';
import abesCampusHd from '../assets/abes-campus-hd.jpg';

export default function StudentDashboard() {
  const { user } = useAuth();
  const { notices, bookmarks, toggleBookmark } = useNotices();
  const { showToast } = useToast();

  const [selectedNotice, setSelectedNotice] = useState(null);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const studentDept = user?.department || 'CSE';

  // Notices for student: Department specific OR Campus-Wide
  const relevantNotices = notices.filter(
    (n) => (n.department === studentDept || n.department === 'All') && n.status === 'published'
  );

  const urgentNotice = relevantNotices.find((n) => n.priority === 'Urgent');
  const pinnedNotices = relevantNotices.filter((n) => n.isPinned);

  const filteredNotices = relevantNotices.filter((n) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Examinations') return n.category === 'Examinations';
    if (activeTab === 'Placements') return n.category === 'Placements';
    if (activeTab === 'Events') return n.category === 'Events';
    if (activeTab === 'Saved') return bookmarks.includes(n.id);
    return n.category === activeTab;
  }).filter((n) =>
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Welcome Banner with ABES Campus HD Background */}
      <div className="rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-slate-200/20">
        {/* Background Campus HD Image with Gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src={abesCampusHd}
            alt="ABES Engineering College Campus"
            className="w-full h-full object-cover object-center filter brightness-[0.42] contrast-[1.15]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-indigo-950/85 to-slate-900/75" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                Undergraduate Student Portal
              </span>
              <span className="text-[11px] font-semibold bg-emerald-400/30 text-emerald-200 px-2 py-0.5 rounded-full border border-emerald-300/30">
                Roll #{user?.enrollmentNo || '2100320100042'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Hi, {user?.name || 'Ankit Kumar'}
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl leading-relaxed">
              B.Tech in {studentDept === 'CSE' ? 'Computer Science & Engineering' : studentDept} • Semester 6 (Section A). You have {relevantNotices.length} active department announcements.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/notices"
              className="px-4 py-2.5 rounded-xl bg-white text-blue-900 font-bold text-xs hover:bg-blue-50 transition shadow-sm flex items-center gap-2"
            >
              <span>Explore All Circulars</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Urgent Examination / Pinned Banner */}
      {urgentNotice && (
        <div
          onClick={() => setSelectedNotice(urgentNotice)}
          className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-500/10 via-rose-500/5 to-white border border-rose-200/90 shadow-xs hover:border-rose-400 transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-rose-100 text-rose-600 shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-rose-600 text-white">
                  URGENT ACTION
                </span>
                <span className="text-xs text-rose-700 font-medium">
                  Published by {urgentNotice.author?.name}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                {urgentNotice.title}
              </h3>
              <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">
                {urgentNotice.excerpt || urgentNotice.content}
              </p>
            </div>
          </div>

          <button className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shrink-0 transition flex items-center justify-center gap-1.5 shadow-xs">
            <span>Read Guidelines</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Grid: Notices Stream (Left 2 cols) & Calendar/Events (Right 1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section: Filterable Notices */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Department & Campus Circulars
              </h2>
              <p className="text-xs text-slate-500">
                Official notices verified for {studentDept}
              </p>
            </div>

            {/* Fast Category Filter Chips */}
            <div className="flex items-center flex-wrap gap-1.5">
              {['All', 'Examinations', 'Placements', 'Events', 'Saved'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {tab}
                  {tab === 'Saved' && bookmarks.length > 0 && ` (${bookmarks.length})`}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Notice Search Box */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search circulars by keyword, exam course, or event..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
            />
          </div>

          {/* Notice Cards List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredNotices.length === 0 ? (
              <div className="col-span-2 bg-white rounded-2xl p-10 text-center border border-slate-200">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-slate-800">No notices found</h4>
                <p className="text-xs text-slate-400 mt-1">No matching circulars for the selected filter.</p>
              </div>
            ) : (
              filteredNotices.map((notice) => (
                <NoticeCard
                  key={notice.id}
                  notice={notice}
                  onOpenDetails={(n) => setSelectedNotice(n)}
                />
              ))
            )}
          </div>
        </div>

        {/* Right Section: Academic Calendar Widget & Quick Tools (inspired by Image 1 & 3) */}
        <div className="space-y-6">
          {/* Calendar Widget */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Academic Calendar
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                November / December 2026
              </span>
            </div>

            {/* Upcoming Deadlines List */}
            <div className="space-y-3">
              {upcomingEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-blue-50/50 transition"
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-bold text-blue-700 bg-blue-100/60 px-2 py-0.2 rounded">
                      {evt.category}
                    </span>
                    <span className="text-slate-400 font-medium">
                      {evt.date}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 mt-1">
                    {evt.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {evt.venue} • {evt.time}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Support & Resources Card */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-3xl border border-indigo-100 space-y-3">
            <div className="flex items-center gap-2 text-indigo-900">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider">
                Need Help or Verification?
              </h4>
            </div>
            <p className="text-xs text-indigo-950/80 leading-relaxed">
              For any conflict in examination dates or attendance discrepancies, contact your department coordinator Dr. Shruti Gupta.
            </p>
            <div className="pt-2">
              <a
                href="mailto:hod.cse2@abes.ac.in"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:underline"
              >
                <span>Email CSE Department Office</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Notice Detail Drawer */}
      {selectedNotice && (
        <NoticeDrawer
          notice={selectedNotice}
          onClose={() => setSelectedNotice(null)}
        />
      )}
    </div>
  );
}
