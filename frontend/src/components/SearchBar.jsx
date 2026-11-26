import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({
  value,
  onChange,
  onClear,
  placeholder = 'Search notices by title, category, keyword, or author...',
  className = ''
}) {
  return (
    <div className={`relative flex items-center ${className}`}>
      <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2.5 text-sm bg-white border border-slate-200 rounded-xl placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-xs"
      />
      {value ? (
        <button
          type="button"
          onClick={onClear || (() => onChange(''))}
          className="absolute right-3 p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      ) : (
        <span className="hidden sm:inline-block absolute right-3 text-[11px] font-medium text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 pointer-events-none">
          ⌘K
        </span>
      )}
    </div>
  );
}
