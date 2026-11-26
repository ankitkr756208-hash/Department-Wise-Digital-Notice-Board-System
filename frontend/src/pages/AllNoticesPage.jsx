import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Search, Filter, LayoutGrid, List, RotateCcw, 
  Calendar, User, Clock, ArrowUpRight, Bookmark, 
  FileText, Download, CheckCircle2, ChevronLeft, ChevronRight 
} from 'lucide-react';
import NoticeCard from '../components/NoticeCard';
import NoticeDrawer from '../components/NoticeDrawer';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import { departments, categories, priorities } from '../data/dummyData';
import { useNotices } from '../context/NoticeContext';
import { useToast } from '../context/ToastContext';

export default function AllNoticesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { notices, bookmarks, toggleBookmark } = useNotices();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedDept, setSelectedDept] = useState(searchParams.get('dept') || 'All');
  const [selectedCat, setSelectedCat] = useState(searchParams.get('cat') || 'All');
  const [selectedPriority, setSelectedPriority] = useState(searchParams.get('priority') || 'All');
  const [sortBy, setSortBy] = useState('latest');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNotice, setSelectedNotice] = useState(null);

  const itemsPerPage = 6;

  // Sync state if URL query params change
  useEffect(() => {
    const deptParam = searchParams.get('dept');
    const catParam = searchParams.get('cat');
    if (deptParam) setSelectedDept(deptParam);
    if (catParam) setSelectedCat(catParam);
  }, [searchParams]);

  // Filter and sort notices
  const filteredNotices = useMemo(() => {
    return notices
      .filter((notice) => {
        // Status filter: only published notices on the public board
        if (notice.status !== 'published') return false;

        // Department
        if (selectedDept !== 'All' && notice.department !== selectedDept && notice.department !== 'All') {
          return false;
        }

        // Category
        if (selectedCat !== 'All' && notice.category !== selectedCat) {
          return false;
        }

        // Priority
        if (selectedPriority !== 'All' && notice.priority !== selectedPriority) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = notice.title.toLowerCase().includes(q);
          const matchContent = notice.content.toLowerCase().includes(q);
          const matchAuthor = notice.author?.name?.toLowerCase().includes(q);
          const matchCategory = notice.category?.toLowerCase().includes(q);
          if (!matchTitle && !matchContent && !matchAuthor && !matchCategory) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'latest') {
          return new Date(b.publishedAt) - new Date(a.publishedAt);
        }
        if (sortBy === 'oldest') {
          return new Date(a.publishedAt) - new Date(b.publishedAt);
        }
        if (sortBy === 'views') {
          return (b.viewsCount || 0) - (a.viewsCount || 0);
        }
        if (sortBy === 'urgent') {
          const priorityWeights = { Urgent: 3, High: 2, Normal: 1, Low: 0 };
          return (priorityWeights[b.priority] || 0) - (priorityWeights[a.priority] || 0);
        }
        return 0;
      });
  }, [notices, selectedDept, selectedCat, selectedPriority, searchQuery, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedNotices = filteredNotices.slice(startIndex, startIndex + itemsPerPage);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDept('All');
    setSelectedCat('All');
    setSelectedPriority('All');
    setSortBy('latest');
    setCurrentPage(1);
    setSearchParams({});
    showToast('Filters reset to default', 'info');
  };

  const deptOptions = [
    { value: 'All', label: 'All Departments' },
    ...departments.map((d) => ({ value: d.code, label: `${d.code} Dept` }))
  ];

  const catOptions = [
    { value: 'All', label: 'All Categories' },
    ...categories.filter((c) => c !== 'All').map((c) => ({ value: c, label: c }))
  ];

  const priorityOptions = [
    { value: 'All', label: 'All Priorities' },
    { value: 'Urgent', label: 'Urgent Only' },
    { value: 'High', label: 'High Priority' },
    { value: 'Normal', label: 'Normal' },
    { value: 'Low', label: 'Low' }
  ];

  const sortOptions = [
    { value: 'latest', label: 'Sort: Most Recent' },
    { value: 'urgent', label: 'Sort: Urgent First' },
    { value: 'views', label: 'Sort: Most Viewed' },
    { value: 'oldest', label: 'Sort: Oldest First' }
  ];

  return (
    <div className="space-y-6">
      {/* Page Heading & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-1">
            <span>Portal</span>
            <span>/</span>
            <span className="text-slate-700 font-semibold">Public Notice Board</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Campus Digital Notice Board
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Browse official notifications, academic schedules, exam timetables, and placement announcements.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl shadow-2xs self-start sm:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg text-xs transition ${
              viewMode === 'grid'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
            aria-label="Grid View"
            title="Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg text-xs transition ${
              viewMode === 'list'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
            aria-label="List View"
            title="List View"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter & Search Bar Toolbar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
        {/* Search */}
        <SearchBar
          value={searchQuery}
          onChange={(val) => {
            setSearchQuery(val);
            setCurrentPage(1);
          }}
          placeholder="Search by notice title, keyword, course code, or professor name..."
        />

        {/* Filters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2.5 pt-1">
          <FilterDropdown
            value={selectedDept}
            onChange={(val) => {
              setSelectedDept(val);
              setCurrentPage(1);
            }}
            options={deptOptions}
          />

          <FilterDropdown
            value={selectedCat}
            onChange={(val) => {
              setSelectedCat(val);
              setCurrentPage(1);
            }}
            options={catOptions}
          />

          <FilterDropdown
            value={selectedPriority}
            onChange={(val) => {
              setSelectedPriority(val);
              setCurrentPage(1);
            }}
            options={priorityOptions}
          />

          <FilterDropdown
            value={sortBy}
            onChange={(val) => setSortBy(val)}
            options={sortOptions}
          />

          {/* Reset Filters Button */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-1 flex items-end">
            <button
              onClick={handleResetFilters}
              className="w-full py-2.5 px-3 text-xs font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Active Filter Chips Bar */}
        {(selectedDept !== 'All' || selectedCat !== 'All' || selectedPriority !== 'All' || searchQuery) && (
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100 flex-wrap text-xs text-slate-500">
            <span className="font-semibold text-slate-700">Active Filters:</span>
            {selectedDept !== 'All' && (
              <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md border border-blue-200 font-medium">
                Dept: {selectedDept}
              </span>
            )}
            {selectedCat !== 'All' && (
              <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md border border-indigo-200 font-medium">
                Category: {selectedCat}
              </span>
            )}
            {selectedPriority !== 'All' && (
              <span className="bg-rose-50 text-rose-700 px-2 py-0.5 rounded-md border border-rose-200 font-medium">
                Priority: {selectedPriority}
              </span>
            )}
            {searchQuery && (
              <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200 font-medium">
                "{searchQuery}"
              </span>
            )}
            <span className="ml-auto font-medium text-slate-600">
              Found {filteredNotices.length} matching notices
            </span>
          </div>
        )}
      </div>

      {/* Notices Content View: Grid or List */}
      {paginatedNotices.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">
            No notices match your filters
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
            Try adjusting your search query, selecting "All Departments", or clearing your filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
          >
            Clear All Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedNotices.map((notice) => (
            <NoticeCard
              key={notice.id}
              notice={notice}
              onOpenDetails={(n) => setSelectedNotice(n)}
            />
          ))}
        </div>
      ) : (
        /* List / Table View (Inspired by Image 2 - Schola Notice Board) */
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="divide-y divide-slate-100">
            {paginatedNotices.map((notice) => (
              <div
                key={notice.id}
                onClick={() => setSelectedNotice(notice)}
                className="p-4 sm:p-5 hover:bg-slate-50/80 transition cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                      {notice.department === 'All' ? 'Campus-Wide' : notice.department}
                    </span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {notice.category}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        notice.priority === 'Urgent'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : notice.priority === 'High'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {notice.priority}
                    </span>
                    {notice.attachments && notice.attachments.length > 0 && (
                      <span className="text-[11px] text-blue-600 flex items-center gap-1 font-medium">
                        <FileText className="w-3 h-3" />
                        {notice.attachments.length} attachment
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition truncate">
                    {notice.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-1 max-w-3xl">
                    {notice.excerpt || notice.content}
                  </p>
                </div>

                <div className="flex items-center gap-6 shrink-0 text-xs text-slate-500">
                  <div className="hidden sm:block text-right">
                    <p className="font-semibold text-slate-800 text-xs">
                      {notice.author?.name}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {new Date(notice.publishedAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center text-slate-400 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pagination Footer */}
      {filteredNotices.length > 0 && (
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            Showing <strong className="text-slate-800">{startIndex + 1}</strong> to{' '}
            <strong className="text-slate-800">
              {Math.min(startIndex + itemsPerPage, filteredNotices.length)}
            </strong>{' '}
            of <strong className="text-slate-800">{filteredNotices.length}</strong> circulars
          </p>

          <div className="flex items-center gap-1.5 self-center sm:self-auto">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50 text-slate-600 transition"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg font-bold text-xs transition ${
                  currentPage === page
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50 text-slate-600 transition"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Slide-in Detail Drawer for Instant Inspection */}
      {selectedNotice && (
        <NoticeDrawer
          notice={selectedNotice}
          onClose={() => setSelectedNotice(null)}
        />
      )}
    </div>
  );
}
