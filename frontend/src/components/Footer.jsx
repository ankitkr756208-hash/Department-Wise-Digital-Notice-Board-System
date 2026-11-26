import React from 'react';
import { Layers, ShieldCheck, Mail, Phone, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Layers className="w-4 h-4" />
              </div>
              <span className="font-bold text-slate-900 text-sm">
                Apex Digital Portal
              </span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">
              Real-time, department-wise digital notice board and campus communication system for university excellence.
            </p>
            <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md text-[11px] font-semibold w-fit border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Certified Campus Intranet</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-slate-800 uppercase tracking-wider text-[11px] mb-3">
              Notice Categories
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/notices?cat=Examinations" className="hover:text-blue-600 transition">
                  Examination Timetables
                </Link>
              </li>
              <li>
                <Link to="/notices?cat=Placements" className="hover:text-blue-600 transition">
                  Campus Placement Drives
                </Link>
              </li>
              <li>
                <Link to="/notices?cat=Events" className="hover:text-blue-600 transition">
                  Hackathons & Technical Fests
                </Link>
              </li>
              <li>
                <Link to="/notices?cat=Academic" className="hover:text-blue-600 transition">
                  Academic Calendars
                </Link>
              </li>
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h4 className="font-semibold text-slate-800 uppercase tracking-wider text-[11px] mb-3">
              Departments
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/notices?dept=CSE" className="hover:text-blue-600 transition">
                  Computer Science & Engineering
                </Link>
              </li>
              <li>
                <Link to="/notices?dept=ECE" className="hover:text-blue-600 transition">
                  Electronics & Communication
                </Link>
              </li>
              <li>
                <Link to="/notices?dept=ME" className="hover:text-blue-600 transition">
                  Mechanical Engineering
                </Link>
              </li>
              <li>
                <Link to="/notices?dept=Management" className="hover:text-blue-600 transition">
                  School of Management
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="font-semibold text-slate-800 uppercase tracking-wider text-[11px] mb-3">
              Campus Helpdesk
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>support.notices@apexuniversity.edu</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>+1 (555) 234-5678 (Ext. 402)</span>
              </li>
              <li className="pt-1">
                <span className="text-[11px] text-slate-400 block">
                  Office of Academic Dean • North Campus Block
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <p>© {new Date().getFullYear()} Apex Institute of Technology & Engineering. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-slate-600">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-600">Terms of Governance</a>
            <a href="#it-policy" className="hover:text-slate-600">Campus IT Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
