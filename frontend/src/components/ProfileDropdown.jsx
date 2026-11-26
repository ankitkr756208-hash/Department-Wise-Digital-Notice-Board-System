import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Shield, LogOut, ChevronDown, Check, 
  Sparkles, GraduationCap, Briefcase, Award 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loginAs, logout } = useAuth();
  const { showToast } = useToast();
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

  const handleRoleSwitch = (role) => {
    loginAs(role);
    setIsOpen(false);
    showToast(`Switched view to ${role.toUpperCase()} mode`, 'info');
    navigate(`/dashboard/${role}`);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    showToast('Logged out successfully', 'info');
    navigate('/login');
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin':
        return { label: 'Super Admin', bg: 'bg-rose-50 text-rose-700 border-rose-200' };
      case 'hod':
        return { label: 'Head of Dept', bg: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'faculty':
        return { label: 'Faculty', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
      case 'student':
        return { label: 'Student', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      default:
        return { label: 'Member', bg: 'bg-slate-50 text-slate-700 border-slate-200' };
    }
  };

  if (!user) {
    return (
      <button
        onClick={() => navigate('/login')}
        className="px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow-xs"
      >
        Sign In
      </button>
    );
  }

  const roleMeta = getRoleBadge(user.role);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        aria-label="User profile menu"
        aria-expanded={isOpen}
      >
        <img
          src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
          alt={user.name}
          className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
        />
        <div className="hidden md:block text-left">
          <p className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[120px]">
            {user.name}
          </p>
          <span className={`inline-block text-[10px] font-semibold px-1.5 py-0.2 rounded border ${roleMeta.bg}`}>
            {roleMeta.label}
          </span>
        </div>
        <ChevronDown className="hidden md:block w-3.5 h-3.5 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          {/* User Bio Header */}
          <div className="px-4 py-3 border-b border-slate-100">
            <p className="text-sm font-bold text-slate-900">{user.name}</p>
            <p className="text-xs text-slate-500 truncate">{user.email}</p>
            <div className="mt-2 flex items-center gap-1.5">
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${roleMeta.bg}`}>
                {roleMeta.label}
              </span>
              <span className="text-[11px] text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded-md">
                {user.department === 'All' ? 'Central Admin' : `${user.department} Dept`}
              </span>
            </div>
          </div>

          {/* Quick Demo Role Switcher */}
          <div className="px-3 py-2 border-b border-slate-100 bg-slate-50/70">
            <div className="flex items-center gap-1 mb-1.5 px-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Demo: Switch Role
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { role: 'admin', label: 'Admin', icon: Shield },
                { role: 'hod', label: 'HOD', icon: Award },
                { role: 'faculty', label: 'Faculty', icon: Briefcase },
                { role: 'student', label: 'Student', icon: GraduationCap }
              ].map((item) => (
                <button
                  key={item.role}
                  onClick={() => handleRoleSwitch(item.role)}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition ${
                    user.role === item.role
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <item.icon className="w-3.5 h-3.5" />
                    {item.label}
                  </span>
                  {user.role === item.role && <Check className="w-3 h-3" />}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="py-1">
            <button
              onClick={() => {
                setIsOpen(false);
                navigate('/profile');
              }}
              className="w-full px-4 py-2 text-xs text-left text-slate-700 hover:bg-slate-50 font-medium flex items-center gap-2"
            >
              <User className="w-4 h-4 text-slate-400" />
              My Profile & Settings
            </button>
          </div>

          {/* Logout */}
          <div className="pt-1 border-t border-slate-100">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-xs text-left text-rose-600 hover:bg-rose-50 font-medium flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
