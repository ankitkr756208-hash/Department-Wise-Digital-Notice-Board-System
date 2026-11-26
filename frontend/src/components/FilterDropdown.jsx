import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function FilterDropdown({
  label,
  value,
  options,
  onChange,
  className = ''
}) {
  return (
    <div className={`relative inline-block ${className}`}>
      {label && (
        <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
          {label}
        </span>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none w-full bg-white border border-slate-200 text-slate-700 text-xs font-medium py-2.5 pl-3.5 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer shadow-xs transition-colors"
        >
          {options.map((opt) => {
            const val = typeof opt === 'string' ? opt : opt.value;
            const text = typeof opt === 'string' ? opt : opt.label;
            return (
              <option key={val} value={val}>
                {text}
              </option>
            );
          })}
        </select>
        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );
}
