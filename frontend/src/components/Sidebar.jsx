import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Bell, FileText, CheckSquare, 
  Users, BarChart3, Bookmark, Settings, UserCheck, 
  LogOut, Shield, Award, Briefcase, GraduationCap, 
  Layers, X, PlusCircle, Building2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotices } from '../context/NoticeContext';

export default function Sidebar({ isOpen, onClose, onOpenCreateNotice }) {
  const { user, logout } = useAuth();
  const { notices, bookmarks } = useNotices();
  const navigate = useNavigate();

  const role = user?.role || 'student';

  const pendingApprovalsCount = notices.filter((n) => n.status === 'pending').length;
  const bookmarkedCount = bookmarks.length;

  const getNavLinks = () => {
    switch (role) {
      case 'admin':
        return [
          { to: '/dashboard/admin', label: 'Admin Overview', icon: LayoutDashboard },
          { to: '/notices', label: 'All Notices', icon: Bell, badge: notices.length },
          { to: '/dashboard/admin#pending', label: 'Review Queue', icon: CheckSquare, badge: pendingApprovalsCount, badgeColor: 'bg-rose-500' },
          { to: '/dashboard/admin#analytics', label: 'Department Analytics', icon: BarChart3 },
          { to: '/profile', label: 'Admin Settings', icon: Settings }
        ];
      case 'hod':
        return [
          { to: '/dashboard/hod', label: 'HOD Dashboard', icon: LayoutDashboard },
          { to: '/notices', label: 'Department Notices', icon: Bell },
          { to: '/dashboard/hod#pending', label: 'Pending Approvals', icon: CheckSquare, badge: pendingApprovalsCount, badgeColor: 'bg-amber-500' },
          { to: '/dashboard/hod#faculty', label: 'Faculty Directory', icon: Users },
          { to: '/profile', label: 'Department Profile', icon: Building2 }
        ];
      case 'faculty':
        return [
          { to: '/dashboard/faculty', label: 'Faculty Dashboard', icon: LayoutDashboard },
          { to: '/notices', label: 'Campus Notices', icon: Bell },
          { to: '/dashboard/faculty#my-notices', label: 'My Submissions', icon: FileText },
          { to: '/profile', label: 'Profile & Settings', icon: Settings }
        ];
      case 'student':
      default:
        return [
          { to: '/dashboard/student', label: 'Student Portal', icon: LayoutDashboard },
          { to: '/notices', label: 'All Circulars', icon: Bell },
          { to: '/profile#saved', label: 'Saved Notices', icon: Bookmark, badge: bookmarkedCount },
          { to: '/profile', label: 'My Profile', icon: Settings }
        ];
    }
  };

  const navLinks = getNavLinks();

  const handleLogout = () => {
    logout();
    onClose && onClose();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-white border-r border-slate-200/90 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand & Mobile Close */}
        <div className="h-16 px-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xs">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight text-slate-900 block leading-none">
                Apex Portal
              </span>
              <span className="text-[10px] uppercase font-semibold text-blue-600 tracking-wider">
                Digital Board
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
          {/* Quick Create Notice Action for privileged roles */}
          {(role === 'admin' || role === 'hod' || role === 'faculty') && (
            <button
              onClick={() => {
                onClose && onClose();
                onOpenCreateNotice && onOpenCreateNotice();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 transition-colors shadow-2xs"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Draft New Notice</span>
            </button>
          )}

          <div>
            <span className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Menu Navigation
            </span>
            <nav className="space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="flex items-center gap-3">
                        <link.icon
                          className={`w-4 h-4 ${
                            isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'
                          }`}
                        />
                        <span>{link.label}</span>
                      </span>
                      {link.badge !== undefined && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : link.badgeColor || 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {link.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Quick Department Filter shortcuts */}
          <div>
            <span className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Departments
            </span>
            <div className="space-y-1">
              {[
                { name: 'Computer Science', code: 'CSE', color: 'bg-blue-500' },
                { name: 'Electronics & Comm', code: 'ECE', color: 'bg-indigo-500' },
                { name: 'Mechanical Eng.', code: 'ME', color: 'bg-amber-500' },
                { name: 'Civil Engineering', code: 'Civil', color: 'bg-emerald-500' },
                { name: 'Biotechnology', code: 'Biotech', color: 'bg-teal-500' },
                { name: 'Management Studies', code: 'Management', color: 'bg-purple-500' }
              ].map((dept) => (
                <button
                  key={dept.code}
                  onClick={() => {
                    onClose && onClose();
                    navigate(`/notices?dept=${dept.code}`);
                  }}
                  className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-slate-600 hover:bg-slate-100 transition-colors text-left"
                >
                  <span className="flex items-center gap-2.5 truncate">
                    <span className={`w-2 h-2 rounded-full ${dept.color}`} />
                    <span className="truncate">{dept.name}</span>
                  </span>
                  <span className="text-[10px] font-medium text-slate-400">
                    {dept.code}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* User Mini Profile & Logout in Sidebar Footer */}
        {user && (
          <div className="p-4 border-t border-slate-100 bg-slate-50/70">
            <div className="flex items-center justify-between gap-2">
              <div
                onClick={() => {
                  onClose && onClose();
                  navigate('/profile');
                }}
                className="flex items-center gap-2.5 min-w-0 cursor-pointer group"
              >
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate group-hover:text-blue-600 transition">
                    {user.name}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate capitalize">
                    {user.role} • {user.department}
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
