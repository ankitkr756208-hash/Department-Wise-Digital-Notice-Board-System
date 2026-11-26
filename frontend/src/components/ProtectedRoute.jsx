import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, ArrowLeft, Sparkles } from 'lucide-react';

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, isAuthenticated, loginAs } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    const requiredRole = allowedRoles[0];

    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-100">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Role Permission Required
          </h2>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            This dashboard section requires elevated credentials ({allowedRoles.join(', ')}). Your current account is logged in as{' '}
            <strong className="text-slate-800 uppercase">{user.role}</strong>.
          </p>

          <div className="mt-6 space-y-2">
            <button
              onClick={() => {
                loginAs(requiredRole);
                navigate(`/dashboard/${requiredRole}`);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition flex items-center justify-center gap-2 shadow-xs"
            >
              <Sparkles className="w-4 h-4" />
              <span>Switch to Demo {requiredRole.toUpperCase()} Account</span>
            </button>

            <button
              onClick={() => navigate(-1)}
              className="w-full py-2 px-4 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-xs transition flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Go Back</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
