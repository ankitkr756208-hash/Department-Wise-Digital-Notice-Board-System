import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Menu, Bell, PlusCircle, Search, LayoutGrid, 
  Layers, Shield, GraduationCap, Briefcase, Award 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NotificationBell from './NotificationBell';
import ProfileDropdown from './ProfileDropdown';
import abesLogo from '../assets/abes-logo.png';

export default function Navbar({ onToggleSidebar, onOpenCreateNotice }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const canCreate = user && (user.role === 'admin' || user.role === 'hod' || user.role === 'faculty');

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left side: Mobile Toggle & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/" className="lg:hidden flex items-center gap-2.5 group">
            <img
              src={abesLogo}
              alt="ABES Logo"
              className="h-8 w-auto object-contain"
            />
            <div>
              <span className="text-sm font-bold tracking-tight text-slate-900 block leading-tight">
                ABES EC
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-blue-600 block leading-none">
                Digital Notice Board
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Quick Notice Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div
            onClick={() => navigate('/notices')}
            className="w-full flex items-center justify-between px-3.5 py-2 text-xs text-slate-400 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl cursor-pointer transition-colors shadow-xs"
          >
            <span className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Search circulars, department notices, events...</span>
            </span>
            <kbd className="text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-2xs font-mono">
              /
            </kbd>
          </div>
        </div>

        {/* Right side: Actions, Notification, Profile */}
        <div className="flex items-center gap-2.5">
          {/* Create Notice Action Button for staff/faculty */}
          {canCreate && (
            <button
              onClick={onOpenCreateNotice}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xs hover:shadow transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">New Notice</span>
            </button>
          )}

          {/* Direct link to All Notices */}
          <Link
            to="/notices"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors"
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Public Board</span>
          </Link>

          {/* Notification Bell */}
          <NotificationBell />

          <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block" />

          {/* Profile Menu with 1-click Role Switcher */}
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
}
