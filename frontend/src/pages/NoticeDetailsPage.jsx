import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, Clock, Download, Share2, 
  Bookmark, FileText, Printer, CheckCircle2, 
  Building2, Users, Eye, Sparkles, ChevronRight 
} from 'lucide-react';
import { useNotices } from '../context/NoticeContext';
import { useToast } from '../context/ToastContext';
import NoticeCard from '../components/NoticeCard';

export default function NoticeDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notices, bookmarks, toggleBookmark } = useNotices();
  const { showToast } = useToast();

  const notice = notices.find((n) => n.id === id);

  if (!notice) {
    return (
      <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 max-w-lg mx-auto my-12 shadow-xs">
        <h2 className="text-xl font-bold text-slate-800">Notice Not Found</h2>
        <p className="text-xs text-slate-500 mt-2 mb-6">
          The circular you are looking for may have been archived or removed.
        </p>
        <Link
          to="/notices"
          className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
        >
          Back to Notice Board
        </Link>
      </div>
    );
  }

  const isBookmarked = bookmarks.includes(notice.id);

  const handleDownload = (file) => {
    showToast(`Downloading ${file.name}...`, 'success');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Notice link copied to clipboard!', 'success');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Find 2 related notices from same department or category
  const relatedNotices = notices.filter(
    (n) => n.id !== notice.id && (n.department === notice.department || n.category === notice.category)
  ).slice(0, 2);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Top Back & Action Bar */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-600 p-2 rounded-xl hover:bg-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Notices</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              toggleBookmark(notice.id);
              showToast(isBookmarked ? 'Removed from saved' : 'Notice bookmarked', 'info');
            }}
            className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition ${
              isBookmarked
                ? 'bg-amber-50 text-amber-700 border-amber-200'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
            title="Bookmark circular"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
            <span className="hidden sm:inline">{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>

          <button
            onClick={handleShare}
            className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition"
            title="Share notice link"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </button>

          <button
            onClick={handlePrint}
            className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition hidden sm:flex"
            title="Print official notice"
          >
            <Printer className="w-4 h-4" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Main Notice Document Sheet */}
      <article className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-8">
        {/* Document Header Badges */}
        <div className="flex items-center flex-wrap gap-2.5 border-b border-slate-100 pb-6">
          <span className="text-xs font-bold px-3 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
            {notice.department === 'All' ? 'University-Wide Circular' : `${notice.department} Department`}
          </span>

          <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">
            {notice.category}
          </span>

          <span
            className={`text-xs font-bold px-3 py-1 rounded-lg border ${
              notice.priority === 'Urgent'
                ? 'bg-rose-50 text-rose-700 border-rose-200'
                : notice.priority === 'High'
                ? 'bg-amber-50 text-amber-800 border-amber-200'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}
          >
            {notice.priority} Priority
          </span>

          <div className="ml-auto text-xs text-slate-400 flex items-center gap-1.5">
            <Eye className="w-4 h-4" />
            <span>{notice.viewsCount || 0} read views</span>
          </div>
        </div>

        {/* Notice Title */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug tracking-tight">
            {notice.title}
          </h1>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="font-semibold text-slate-700">Target Audience:</span>
            <span className="bg-slate-100 px-2.5 py-0.5 rounded-md text-slate-800">
              {notice.targetAudience || 'All Enrolled Students & Faculty'}
            </span>
          </div>
        </div>

        {/* Author & Timing Profile Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80">
          <div className="flex items-center gap-3">
            <img
              src={notice.author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
              alt={notice.author?.name}
              className="w-11 h-11 rounded-2xl object-cover border border-slate-200 shadow-2xs"
            />
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Issued By
              </span>
              <h4 className="text-xs font-bold text-slate-900 truncate">
                {notice.author?.name}
              </h4>
              <p className="text-[11px] text-slate-500 truncate">
                {notice.author?.designation}
              </p>
            </div>
          </div>

          <div className="border-t sm:border-t-0 sm:border-l border-slate-200 pt-3 sm:pt-0 sm:pl-4">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              Official Post Date
            </span>
            <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mt-1">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>{new Date(notice.publishedAt).toLocaleDateString('en-US', { dateStyle: 'long' })}</span>
            </p>
          </div>

          <div className="border-t sm:border-t-0 sm:border-l border-slate-200 pt-3 sm:pt-0 sm:pl-4">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              Notice Expiry
            </span>
            <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mt-1">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>{new Date(notice.expiresAt).toLocaleDateString('en-US', { dateStyle: 'long' })}</span>
            </p>
          </div>
        </div>

        {/* Detailed Body Text */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Official Announcement Details
          </h3>
          <div className="text-sm leading-relaxed text-slate-700 whitespace-pre-line bg-white p-6 rounded-2xl border border-slate-100 shadow-2xs">
            {notice.content}
          </div>
        </div>

        {/* Attachments Section */}
        {notice.attachments && notice.attachments.length > 0 && (
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Attached Documents & Schedules ({notice.attachments.length})</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {notice.attachments.map((file, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-blue-300 bg-slate-50/50 flex items-center justify-between gap-3 transition"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {file.name}
                      </p>
                      <p className="text-[11px] text-slate-400 uppercase">
                        {file.type} • {file.size}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownload(file)}
                    className="p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 text-slate-600 transition shadow-2xs shrink-0"
                    title="Download file"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notice Authenticity Seal */}
        <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-center gap-3 text-xs text-blue-900">
          <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
          <p>
            This is an authenticated electronic circular approved by Apex University Examination & Academic Council. Physical signature copies are preserved in departmental archives.
          </p>
        </div>
      </article>

      {/* Related Department Circulars */}
      {relatedNotices.length > 0 && (
        <div className="space-y-4 pt-4">
          <h2 className="text-base font-bold text-slate-900">
            Related Department Notices
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedNotices.map((n) => (
              <NoticeCard
                key={n.id}
                notice={n}
                onOpenDetails={() => navigate(`/notices/${n.id}`)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
