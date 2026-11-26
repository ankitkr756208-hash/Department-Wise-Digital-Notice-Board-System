import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Layers, User, Mail, Lock, Building2, 
  GraduationCap, ShieldAlert, ArrowRight, CheckCircle2, Eye, EyeOff 
} from 'lucide-react';
import { departments } from '../data/dummyData';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import abesLogo from '../assets/abes-logo.png';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    enrollmentNo: '',
    department: 'CSE',
    password: '',
    confirmPassword: '',
    role: 'student', // default
    adminPasscode: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [roleType, setRoleType] = useState('student'); // 'student' or 'faculty_request'
  const [agreeTerms, setAgreeTerms] = useState(false);

  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    if (formData.password.length < 6) {
      showToast('Password should be at least 6 characters', 'warning');
      return;
    }

    if (!agreeTerms) {
      showToast('Please accept the Institutional IT Policy', 'warning');
      return;
    }

    if (roleType === 'faculty_request') {
      const code = formData.adminPasscode.toUpperCase().trim();
      if (code !== 'ABES2026' && code !== 'APEX2026') {
        showToast('Invalid Faculty Access Token. Enter ABES2026 or contact office.', 'error');
        return;
      }
    }

    const assignedRole = roleType === 'faculty_request' ? 'faculty' : 'student';

    register({
      ...formData,
      role: assignedRole
    });

    showToast(`Account successfully created as ${assignedRole.toUpperCase()}!`, 'success');
    navigate(`/dashboard/${assignedRole}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-10 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex flex-col items-center gap-2 mb-3 group">
          <img
            src={abesLogo}
            alt="ABES Logo"
            className="h-16 w-auto object-contain bg-white rounded-xl p-1.5 shadow-sm group-hover:scale-105 transition-transform"
          />
          <div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight block">
              ABES Engineering College
            </span>
            <span className="text-xs uppercase font-bold tracking-wider text-blue-600 block">
              Department-Wise Digital Notice Board
            </span>
          </div>
        </Link>
        <h2 className="text-xl font-bold text-slate-800 tracking-tight mt-2">
          Create Your Portal Account
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Register with your institutional enrollment or university email.
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-lg px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl shadow-xl border border-slate-200/80">
          {/* Role Governance Selection */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Registration Role
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRoleType('student')}
                className={`p-3 rounded-2xl border text-left transition ${
                  roleType === 'student'
                    ? 'border-blue-500 bg-blue-50/60 ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  <span>Student</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Open enrollment for all admitted undergraduate & PG students.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setRoleType('faculty_request')}
                className={`p-3 rounded-2xl border text-left transition ${
                  roleType === 'faculty_request'
                    ? 'border-purple-500 bg-purple-50/60 ring-2 ring-purple-500/20'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                  <ShieldAlert className="w-4 h-4 text-purple-600" />
                  <span>Faculty / Staff</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Restricted. Requires Institutional Authorization Token.
                </p>
              </button>
            </div>

            {/* Security Explanation Alert */}
            {roleType === 'faculty_request' ? (
              <div className="mt-3 p-3 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-900 leading-snug">
                <strong>Governance Rule:</strong> Staff and administrative roles cannot be freely chosen to prevent unauthorized notice broadcasting. (Demo Token: <code className="bg-purple-200 px-1 py-0.5 rounded font-mono font-bold">APEX2026</code>).
              </div>
            ) : (
              <div className="mt-2 text-[11px] text-slate-400">
                Notice: Student accounts are automatically routed to your department's circulars.
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                University Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="name@student.apex.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Enrollment / Employee ID & Department */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  {roleType === 'faculty_request' ? 'Employee Code *' : 'Enrollment / Roll No *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={roleType === 'faculty_request' ? 'FAC-CSE-099' : '21CS088'}
                  value={formData.enrollmentNo}
                  onChange={(e) => setFormData({ ...formData, enrollmentNo: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Academic Department *
                </label>
                <div className="relative">
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  >
                    {departments.map((d) => (
                      <option key={d.code} value={d.code}>
                        {d.code} ({d.name})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Faculty Token Input (if staff chosen) */}
            {roleType === 'faculty_request' && (
              <div>
                <label className="block text-xs font-semibold text-purple-900 uppercase tracking-wider mb-1">
                  Department Authorization Code *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter ABES2026"
                  value={formData.adminPasscode}
                  onChange={(e) => setFormData({ ...formData, adminPasscode: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-purple-300 bg-purple-50/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 font-mono"
                />
              </div>
            )}

            {/* Passwords */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Create Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Min 6 characters"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Re-enter password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                />
                <span className="text-slate-600">
                  I agree to the University Intranet IT Code of Conduct
                </span>
              </label>

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <span>Complete Registration</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            Already have an active account?{' '}
            <Link to="/login" className="font-semibold text-blue-600 hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
