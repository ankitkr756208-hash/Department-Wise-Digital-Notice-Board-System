import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Layers, ArrowRight, Shield, Bell, CheckCircle2, 
  Sparkles, FileText, Search, Users, Building2, 
  ChevronRight, Calendar, ArrowUpRight, Zap, ShieldCheck 
} from 'lucide-react';
import { departments, initialNotices } from '../data/dummyData';
import NoticeCard from '../components/NoticeCard';
import NoticeDrawer from '../components/NoticeDrawer';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';
import abesLogo from '../assets/abes-logo.png';
import abesCampusHd from '../assets/abes-campus-hd.jpg';

export default function LandingPage() {
  const navigate = useNavigate();
  const { loginAs } = useAuth();
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [activeTab, setActiveTab] = useState('All');

  const filteredNotices = activeTab === 'All'
    ? initialNotices.slice(0, 6)
    : initialNotices.filter((n) => n.category === activeTab || n.department === activeTab).slice(0, 6);

  const urgentNotice = initialNotices.find((n) => n.priority === 'Urgent');

  const handleQuickDemo = (role) => {
    loginAs(role);
    navigate(`/dashboard/${role}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Urgent Alert Banner */}
      {urgentNotice && (
        <div className="bg-gradient-to-r from-rose-600 to-red-600 text-white px-4 py-2 text-xs font-medium flex items-center justify-center gap-2 shadow-xs">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <span className="font-bold uppercase tracking-wider text-[11px] bg-black/20 px-1.5 py-0.5 rounded">
            Urgent Notice:
          </span>
          <span className="truncate max-w-xl">{urgentNotice.title}</span>
          <button
            onClick={() => setSelectedNotice(urgentNotice)}
            className="underline ml-1 font-semibold hover:text-white/80 shrink-0"
          >
            Read circular &rarr;
          </button>
        </div>
      )}

      {/* Header / Navbar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={abesLogo}
              alt="ABES Engineering College Logo"
              className="h-11 w-auto object-contain bg-white rounded-xl p-1 shadow-xs group-hover:scale-105 transition-transform"
            />
            <div>
              <span className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight block">
                ABES Engineering College
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 block">
                Department-Wise Digital Notice Board
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <a href="#about" className="hover:text-blue-600 transition">About System</a>
            <a href="#features" className="hover:text-blue-600 transition">Features</a>
            <a href="#departments" className="hover:text-blue-600 transition">Departments</a>
            <a href="#notices" className="hover:text-blue-600 transition">Latest Circulars</a>
          </nav>

          <div className="flex items-center gap-2.5">
            <Link
              to="/notices"
              className="px-3.5 py-2 text-xs font-semibold rounded-xl text-slate-700 hover:bg-slate-100 transition hidden sm:inline-block"
            >
              Public Board
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition shadow-xs"
            >
              Portal Login
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section with ABES Campus HD Background (Clean & Fully Responsive) */}
      <section className="relative overflow-hidden pt-16 pb-24 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white border-b border-slate-800">
        {/* Background Campus HD Photo with Cinematic Clean Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={abesCampusHd}
            alt="ABES Engineering College Campus"
            className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.12]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-900/65 to-slate-950/95" />
          <div className="absolute inset-0 bg-radial from-transparent via-slate-950/30 to-slate-950/80" />
        </div>

        {/* Foreground Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/15 text-blue-200 border border-blue-400/30 backdrop-blur-md shadow-lg transition">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>ABES Engineering College • AKTU Code: 032 • NAAC 'A' Grade</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] drop-shadow-md">
              Department-Wise <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-300 bg-clip-text text-transparent">
                Digital Notice Board
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto drop-shadow-sm">
              Official institutional communication platform for ABES Engineering College. Replace physical pin-boards with role-governed circular approvals, real-time alerts, and dedicated department streams.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <Link
                to="/notices"
                className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2"
              >
                <span>Browse All Notices</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-md transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Staff & Student Login</span>
              </Link>
            </div>

            {/* One-Click Quick Demo Launcher */}
            <div className="pt-6">
              <p className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
                Instant Interactive Demo (1-Click Role Login):
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() => handleQuickDemo('admin')}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-rose-500/20 text-rose-200 border border-rose-400/40 hover:bg-rose-500/30 backdrop-blur-sm transition flex items-center gap-1.5"
                >
                  <Shield className="w-3.5 h-3.5 text-rose-400" />
                  <span>Super Admin</span>
                </button>
                <button
                  onClick={() => handleQuickDemo('hod')}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-purple-500/20 text-purple-200 border border-purple-400/40 hover:bg-purple-500/30 backdrop-blur-sm transition flex items-center gap-1.5"
                >
                  <Building2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>HOD (Dr. Shruti Gupta)</span>
                </button>
                <button
                  onClick={() => handleQuickDemo('faculty')}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-500/20 text-indigo-200 border border-indigo-400/40 hover:bg-indigo-500/30 backdrop-blur-sm transition flex items-center gap-1.5"
                >
                  <Users className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Faculty (Prof. Rajiv Sharma)</span>
                </button>
                <button
                  onClick={() => handleQuickDemo('student')}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-500/20 text-emerald-200 border border-emerald-400/40 hover:bg-emerald-500/30 backdrop-blur-sm transition flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Student (Ankit Kumar)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Metrics Banner */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-white/95 backdrop-blur-md border border-white/20 shadow-xl max-w-4xl mx-auto text-slate-800">
            <div className="text-center p-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 block">6</span>
              <span className="text-xs font-medium text-slate-600 mt-1 block">Academic Departments</span>
            </div>
            <div className="text-center p-2 border-l border-slate-200">
              <span className="text-2xl sm:text-3xl font-extrabold text-indigo-600 block">4,500+</span>
              <span className="text-xs font-medium text-slate-600 mt-1 block">Active Students</span>
            </div>
            <div className="text-center p-2 border-l border-slate-200">
              <span className="text-2xl sm:text-3xl font-extrabold text-purple-600 block">180+</span>
              <span className="text-xs font-medium text-slate-600 mt-1 block">Faculty Members</span>
            </div>
            <div className="text-center p-2 border-l border-slate-200">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 block">99.8%</span>
              <span className="text-xs font-medium text-slate-600 mt-1 block">Notice Reach Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Project Introduction Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider">
                <Zap className="w-4 h-4" />
                <span>The Modern Campus Need</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Eliminating Paper Chaos with Structured Departmental Broadcasts
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Traditional physical notice boards suffer from physical congestion, vandalism, rain damage, and critical missed deadlines. Important exam timetables and placement opportunities frequently get lost under outdated posters.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">Zero Information Congestion</h3>
                    <p className="text-xs text-slate-500">Students receive notifications tailored exclusively to their department and academic year.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">Institutional Governance</h3>
                    <p className="text-xs text-slate-500">Faculty-drafted circulars undergo structured HOD approval before publishing to ensure authentic communication.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">Instant Attachments & Archival</h3>
                    <p className="text-xs text-slate-500">High-resolution PDF timetables, syllabus documents, and guidelines accessible on any mobile device or laptop.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Mockup Card */}
            <div className="bg-slate-100 p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-inner">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 overflow-hidden">
                <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                    <span className="text-xs font-mono text-slate-300 ml-2">noticeboard.abes.ac.in</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-600 px-2 py-0.5 rounded">Live Intranet</span>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-800">Hi, Ankit Kumar</span>
                      <p className="text-[11px] text-slate-400">B.Tech CSE • Sem 6</p>
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                      CSE Notice Board
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/50">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-rose-700">Urgent Examination Alert</span>
                      <span className="text-[10px] text-rose-500">Today, 09:30 AM</span>
                    </div>
                    <p className="text-xs font-medium text-slate-800">Midterm Examination Timetable Released - Fall 2026</p>
                    <p className="text-[11px] text-slate-500 mt-1">2 Attachments • Signed by Dr. Sanjay Kumar Agarwal</p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-blue-700">Hackathon 2026 Registration</span>
                      <span className="text-[10px] text-slate-400">Yesterday</span>
                    </div>
                    <p className="text-xs text-slate-600">36-Hour National CodeFest with $15k prize pool is now open for teams.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              Comprehensive Capabilities
            </h2>
            <h3 className="text-3xl font-bold text-slate-900">
              Designed for Campus Governance & Student Convenience
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Every role has custom-tailored views and permissions to manage institutional communication seamlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: 'Role-Governed Permissions',
                desc: 'Admins oversee campus-wide circulars; HODs control departmental boards and approve faculty submissions; students enjoy clean reading portals.',
                color: 'blue'
              },
              {
                icon: Bell,
                title: 'High-Priority Emergency Broadcasts',
                desc: 'Flag severe notices as Urgent with visual pings, instant notifications, and top-of-page sticky placement to guarantee zero missed notices.',
                color: 'rose'
              },
              {
                icon: Building2,
                title: 'Departmental Isolation',
                desc: 'Prevent clutter. Mechanical students do not have to filter through biotechnology notices unless cross-departmental announcements are tagged.',
                color: 'indigo'
              },
              {
                icon: FileText,
                title: 'Document & PDF Attachments',
                desc: 'Upload multi-page examination schedules, official circulars with administrative stamps, and syllabus sheets directly for download.',
                color: 'purple'
              },
              {
                icon: Search,
                title: 'Instant Multi-Filter Search',
                desc: 'Locate circulars in milliseconds using department codes, categories, urgency flags, and keyword indexing.',
                color: 'emerald'
              },
              {
                icon: CheckCircle2,
                title: 'Two-Tier HOD Approval Queue',
                desc: 'Ensure no unauthorized notice is published. Faculty drafts pass through the HOD approval workflow with feedback remarks.',
                color: 'amber'
              }
            ].map((f, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <f.icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">
                  {f.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments Directory Section */}
      <section id="departments" className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
                Academic Divisions
              </span>
              <h2 className="text-3xl font-bold text-slate-900">
                Departmental Digital Notice Hubs
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Explore tailored notices, HOD details, and student statistics for each engineering and business branch.
              </p>
            </div>
            <Link
              to="/notices"
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 group"
            >
              <span>View all department notices</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => (
              <div
                key={dept.id}
                className="p-6 rounded-2xl border border-slate-200/80 bg-white hover:border-blue-400/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                      {dept.code}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      {dept.activeNoticesCount} active notices
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 mb-1">
                    {dept.name}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                    {dept.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={dept.hodAvatar}
                      alt={dept.hodName}
                      className="w-8 h-8 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <p className="text-[11px] font-bold text-slate-800 leading-tight">
                        {dept.hodName}
                      </p>
                      <p className="text-[10px] text-slate-400">Head of Department</p>
                    </div>
                  </div>

                  <Link
                    to={`/notices?dept=${dept.code}`}
                    className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition"
                    title={`View ${dept.code} notices`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Notices Live Preview Section */}
      <section id="notices" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
                Real-Time Stream
              </span>
              <h2 className="text-3xl font-bold text-slate-900">
                Latest Published Circulars
              </h2>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center flex-wrap gap-1.5 p-1 bg-white border border-slate-200 rounded-xl">
              {['All', 'Examinations', 'Placements', 'Events', 'Academic'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotices.map((notice) => (
              <NoticeCard
                key={notice.id}
                notice={notice}
                onOpenDetails={(n) => setSelectedNotice(n)}
              />
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              to="/notices"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs"
            >
              <span>Explore All {initialNotices.length} Campus Notices</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Detail Drawer (when user clicks a notice) */}
      {selectedNotice && (
        <NoticeDrawer
          notice={selectedNotice}
          onClose={() => setSelectedNotice(null)}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
