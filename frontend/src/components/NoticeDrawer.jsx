import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, Calendar, Clock, User, Download, Share2, 
  Bookmark, ExternalLink, Trash2, CheckCircle2, 
  FileText, Paperclip, AlertTriangle 
} from 'lucide-react';
import { useNotices } from '../context/NoticeContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function NoticeDrawer({ notice, onClose }) {
  const navigate = useNavigate();
  const { bookmarks, toggleBookmark, deleteNotice } = useNotices();
  const { user } = useAuth();
  const { showToast } = useToast();

  if (!notice) return null;

  const isBookmarked = bookmarks.includes(notice.id);
  const canManage = user?.role === 'admin' || 
    (user?.role === 'hod' && (notice.department === user?.department || notice.department === 'All')) ||
    (user?.role === 'faculty' && notice.author?.name === user?.name);

  const handleDownloadAttachment = (attachment) => {
    showToast(`Downloading ${attachment.name}...`, 'success');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin + `/notices/${notice.id}`);
      showToast('Notice link copied to clipboard!', 'success');
    } else {
      showToast('Sharing notice link', 'info');
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      deleteNotice(notice.id);
      showToast('Notice has been deleted', 'info');
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop Overlay for responsive outside click */}
      <div
        className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />
      <aside 
        aria-label="Notice Details Panel"
        className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col transform transition-transform duration-300 ease-in-out"
      >
      {/* Header */}
      <div className="p-4 px-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Notice Details
          </span>
          <span className="text-xs px-2 py-0.5 rounded font-medium bg-blue-100 text-blue-700">
            {notice.department === 'All' ? 'Campus-Wide' : notice.department}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close detail panel"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Body Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Priority & Category Badges */}
        <div className="flex items-center flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            {notice.category}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${
              notice.priority === 'Urgent'
                ? 'bg-rose-50 text-rose-700 border-rose-200'
                : notice.priority === 'High'
                ? 'bg-amber-50 text-amber-800 border-amber-200'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}
          >
            {notice.priority} Priority
          </span>
          <span className="text-xs text-slate-400 ml-auto">
            {notice.viewsCount || 0} views
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-slate-900 leading-snug">
          {notice.title}
        </h2>

        {/* Author Card */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
          <img
            src={notice.author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
            alt={notice.author?.name}
            className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-semibold text-slate-900 truncate">
              {notice.author?.name}
            </h4>
            <p className="text-xs text-slate-500 truncate">
              {notice.author?.designation} • {notice.author?.department}
            </p>
          </div>
        </div>

        {/* Timing Info */}
        <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl border border-slate-100 bg-white shadow-xs">
          <div>
            <span className="text-[11px] font-medium text-slate-400 block uppercase">
              Posted Date
            </span>
            <p className="text-xs font-semibold text-slate-700 mt-0.5 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {new Date(notice.publishedAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <span className="text-[11px] font-medium text-slate-400 block uppercase">
              Expires On
            </span>
            <p className="text-xs font-semibold text-slate-700 mt-0.5 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {new Date(notice.expiresAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Audience */}
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Target Audience
          </span>
          <p className="text-xs font-medium text-slate-800 bg-slate-100 px-3 py-1.5 rounded-lg inline-block">
            {notice.targetAudience || 'All Department Students'}
          </p>
        </div>

        {/* Content */}
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
            Notice Content
          </span>
          <div className="text-sm text-slate-700 whitespace-pre-line leading-relaxed bg-slate-50/50 p-4 rounded-xl border border-slate-100">
            {notice.content}
          </div>
        </div>

        {/* Attachments Section */}
        {notice.attachments && notice.attachments.length > 0 && (
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              Attachments ({notice.attachments.length})
            </span>
            <div className="space-y-2">
              {notice.attachments.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-blue-300 bg-white transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="p-2 rounded-lg bg-rose-50 text-rose-600">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-800 truncate">
                        {file.name}
                      </p>
                      <p className="text-[11px] text-slate-400 uppercase">
                        {file.type} • {file.size}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownloadAttachment(file)}
                    className="p-2 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    title="Download file"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-2">
        <button
          onClick={() => {
            toggleBookmark(notice.id);
            showToast(isBookmarked ? 'Removed from saved' : 'Saved to bookmarks', 'info');
          }}
          className={`px-3 py-2 text-xs font-medium rounded-xl border flex items-center gap-1.5 transition-colors ${
            isBookmarked
              ? 'bg-amber-50 text-amber-700 border-amber-200'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500' : ''}`} />
          {isBookmarked ? 'Saved' : 'Save'}
        </button>

        <button
          onClick={handleShare}
          className="px-3 py-2 text-xs font-medium rounded-xl bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
        >
          <Share2 className="w-3.5 h-3.5 text-slate-500" />
          Share
        </button>

        {canManage && (
          <button
            onClick={handleDelete}
            className="px-3 py-2 text-xs font-medium rounded-xl bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </button>
        )}

        <button
          onClick={() => {
            onClose();
            navigate(`/notices/${notice.id}`);
          }}
          className="ml-auto px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <span>Full Page</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
    </>
  );
}
