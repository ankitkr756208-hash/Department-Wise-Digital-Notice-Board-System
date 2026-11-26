import React from 'react';
import { Calendar, Clock, Eye, Paperclip, Bookmark, ArrowUpRight, CheckCircle2, AlertOctagon, User } from 'lucide-react';
import { useNotices } from '../context/NoticeContext';
import { useToast } from '../context/ToastContext';

export default function NoticeCard({
  notice,
  onOpenDetails,
  compact = false
}) {
  const { bookmarks, toggleBookmark } = useNotices();
  const { showToast } = useToast();

  const isBookmarked = bookmarks.includes(notice.id);

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    toggleBookmark(notice.id);
    showToast(
      isBookmarked ? 'Notice removed from saved' : 'Notice saved to bookmarks',
      'info'
    );
  };

  const getPriorityBadge = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'urgent':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 border border-rose-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            Urgent
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            High
          </span>
        );
      case 'normal':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
            Normal
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs text-slate-600 bg-slate-100 border border-slate-200">
            Low
          </span>
        );
    }
  };

  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case 'examinations':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'academic':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'placements':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'events':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'sports':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'administration':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const formattedDate = new Date(notice.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div
      onClick={() => onOpenDetails && onOpenDetails(notice)}
      className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400/80 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      {/* Top Banner & Tags */}
      <div className="p-5 pb-3">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center flex-wrap gap-1.5">
            <span
              className={`text-xs px-2.5 py-0.5 rounded-md font-medium border ${getCategoryColor(
                notice.category
              )}`}
            >
              {notice.category}
            </span>

            <span className="text-xs px-2 py-0.5 rounded-md font-semibold bg-slate-100 text-slate-700 border border-slate-200">
              {notice.department === 'All' ? 'Campus-Wide' : `${notice.department} Dept`}
            </span>

            {notice.isNew && (
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-600 text-white shadow-xs">
                NEW
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            {getPriorityBadge(notice.priority)}
            <button
              onClick={handleBookmarkClick}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark notice'}
              className={`p-1.5 rounded-lg transition-colors ${
                isBookmarked
                  ? 'text-amber-500 bg-amber-50 hover:bg-amber-100'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Bookmark
                className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`}
              />
            </button>
          </div>
        </div>

        {/* Notice Title */}
        <h4 className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
          {notice.title}
        </h4>

        {/* Notice Excerpt */}
        {!compact && (
          <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {notice.excerpt || notice.content}
          </p>
        )}
      </div>

      {/* Target Audience & Attachments Badge */}
      <div className="px-5 py-2 flex items-center justify-between gap-2 text-xs text-slate-500 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-1.5 truncate">
          <span className="text-slate-400 text-[11px]">For:</span>
          <span className="font-medium text-slate-700 truncate text-[11px]">
            {notice.targetAudience || 'All Students'}
          </span>
        </div>

        {notice.attachments && notice.attachments.length > 0 && (
          <div className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100 shrink-0">
            <Paperclip className="w-3 h-3" />
            <span>{notice.attachments.length} {notice.attachments.length === 1 ? 'file' : 'files'}</span>
          </div>
        )}
      </div>

      {/* Author and Metadata Footer */}
      <div className="px-5 py-3.5 bg-white border-t border-slate-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          {notice.author?.avatar ? (
            <img
              src={notice.author.avatar}
              alt={notice.author.name}
              className="w-7 h-7 rounded-full object-cover border border-slate-200 shrink-0"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 shrink-0">
              <User className="w-3.5 h-3.5" />
            </div>
          )}
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-800 truncate leading-none">
              {notice.author?.name}
            </p>
            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              {notice.author?.designation || notice.department}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-slate-500 shrink-0">
          <span className="flex items-center gap-1" title="Published date">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            {formattedDate}
          </span>
          <div className="w-6 h-6 rounded-md bg-slate-50 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center text-slate-400 transition-colors">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
