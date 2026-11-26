import React, { useState, useEffect, useRef } from 'react';
import { X, Upload, FileText, CheckCircle2, AlertCircle, Plus, Trash2 } from 'lucide-react';
import { useNotices } from '../context/NoticeContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { departments, categories, priorities } from '../data/dummyData';

export default function CreateNoticeModal({ isOpen, onClose, initialData = null }) {
  const dialogRef = useRef(null);
  const { createNotice, updateNotice } = useNotices();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    department: 'CSE',
    category: 'Academic',
    priority: 'Normal',
    targetAudience: 'All Department Students',
    expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    attachments: []
  });

  const [simulatedFileName, setSimulatedFileName] = useState('');

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
      if (initialData) {
        setFormData({
          title: initialData.title || '',
          content: initialData.content || '',
          department: initialData.department || user?.department || 'CSE',
          category: initialData.category || 'Academic',
          priority: initialData.priority || 'Normal',
          targetAudience: initialData.targetAudience || 'All Department Students',
          expiresAt: initialData.expiresAt ? initialData.expiresAt.split('T')[0] : '',
          attachments: initialData.attachments || []
        });
      } else {
        setFormData({
          title: '',
          content: '',
          department: user?.role === 'admin' ? 'All' : (user?.department || 'CSE'),
          category: 'Academic',
          priority: 'Normal',
          targetAudience: 'All Department Students',
          expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          attachments: []
        });
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen, initialData, user]);

  const handleClose = () => {
    if (dialogRef.current?.open) {
      dialogRef.current.close();
    }
    onClose();
  };

  const handleAddAttachment = () => {
    if (!simulatedFileName.trim()) return;
    const newFile = {
      name: simulatedFileName.endsWith('.pdf') ? simulatedFileName : `${simulatedFileName}.pdf`,
      size: `${(Math.random() * 2 + 0.5).toFixed(1)} MB`,
      type: 'pdf',
      url: '#'
    };
    setFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, newFile]
    }));
    setSimulatedFileName('');
    showToast('File attached successfully', 'success');
  };

  const handleRemoveAttachment = (idx) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== idx)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      showToast('Please fill in both title and description', 'error');
      return;
    }

    if (initialData) {
      updateNotice(initialData.id, formData);
      showToast('Notice updated successfully', 'success');
    } else {
      createNotice(formData, user);
      if (user?.role === 'faculty') {
        showToast('Notice submitted for HOD review & approval', 'info');
      } else {
        showToast('Notice published live on digital board', 'success');
      }
    }

    handleClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleClose}
      aria-labelledby="create-notice-title"
      className="p-0 rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl backdrop:bg-slate-900/40 backdrop:backdrop-blur-xs max-h-[90vh] flex flex-col overflow-hidden"
    >
      {/* Modal Header */}
      <div className="p-5 px-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
        <div>
          <h2 id="create-notice-title" className="text-lg font-bold text-slate-900">
            {initialData ? 'Edit Digital Notice' : 'Draft New College Notice'}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {user?.role === 'faculty'
              ? 'Notice will be submitted for HOD verification before going live.'
              : 'Notice will be instantly broadcast to targeted student portals.'}
          </p>
        </div>
        <button
          onClick={handleClose}
          type="button"
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Title */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Notice Title *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Midterm Lab Practical Timetable or Hackathon Registration"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        {/* Department & Category & Priority */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Department
            </label>
            <select
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="All">All Campus</option>
              {departments.map((d) => (
                <option key={d.code} value={d.code}>
                  {d.code} - {d.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              {categories.filter((c) => c !== 'All').map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Priority
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              {priorities.filter((p) => p !== 'All').map((p) => (
                <option key={p} value={p}>
                  {p} Priority
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Target Audience & Expiry Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Target Audience
            </label>
            <input
              type="text"
              placeholder="e.g. All 3rd Year Students, Faculty & Scholars"
              value={formData.targetAudience}
              onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Expiration Date
            </label>
            <input
              type="date"
              value={formData.expiresAt}
              onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Notice Description */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Notice Body / Detailed Content *
          </label>
          <textarea
            required
            rows={5}
            placeholder="Provide complete details, dates, rules, eligibility, venue, or steps..."
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full text-xs leading-relaxed px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        {/* Attachments Section */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Attachments (Optional)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Attach file name, e.g. Exam_Roster_2026.pdf"
              value={simulatedFileName}
              onChange={(e) => setSimulatedFileName(e.target.value)}
              className="flex-1 text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white"
            />
            <button
              type="button"
              onClick={handleAddAttachment}
              className="px-3 py-2 text-xs font-semibold rounded-lg bg-slate-800 text-white hover:bg-slate-900 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              Add File
            </button>
          </div>

          {formData.attachments.length > 0 && (
            <div className="space-y-1.5 pt-1">
              {formData.attachments.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 text-xs"
                >
                  <span className="flex items-center gap-2 truncate">
                    <FileText className="w-4 h-4 text-rose-500" />
                    <span className="font-medium text-slate-800 truncate">{file.name}</span>
                    <span className="text-slate-400">({file.size})</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveAttachment(idx)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 text-xs font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>
              {initialData
                ? 'Save Changes'
                : user?.role === 'faculty'
                ? 'Submit for HOD Approval'
                : 'Publish Notice'}
            </span>
          </button>
        </div>
      </form>
    </dialog>
  );
}
