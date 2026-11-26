import React from 'react';
import { ShieldCheck, Mail, Phone, ExternalLink, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import abesLogo from '../assets/abes-logo.png';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <img
                src={abesLogo}
                alt="ABES Logo"
                className="h-10 w-auto object-contain bg-white rounded-lg p-0.5"
              />
              <div>
                <span className="font-bold text-slate-900 text-sm block leading-tight">
                  ABES Engg. College
                </span>
                <span className="text-[10px] text-blue-600 font-semibold tracking-wider uppercase block">
                  Digital Notice Board
                </span>
              </div>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">
              Official real-time, department-wise digital notice board and institutional communication system for ABES Engineering College, Ghaziabad.
            </p>
            <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md text-[11px] font-semibold w-fit border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>AKTU Affiliated • ISO 9001:2015</span>
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
                <span>notices@abes.ac.in</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>+91 120 713 5111 / 5112</span>
              </li>
              <li className="pt-1">
                <span className="text-[11px] text-slate-400 block">
                  19th KM Stone, NH-09, Ghaziabad, UP 201009
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <p>© {new Date().getFullYear()} ABES Engineering College, Ghaziabad. All rights reserved.</p>
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
