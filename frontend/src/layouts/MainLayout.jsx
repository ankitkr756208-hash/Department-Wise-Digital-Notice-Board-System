import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import NoticeDrawer from '../components/NoticeDrawer';
import CreateNoticeModal from '../components/CreateNoticeModal';
import { useNotices } from '../context/NoticeContext';

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const { activeNoticeId, setActiveNoticeId, notices } = useNotices();

  const activeNotice = notices.find((n) => n.id === activeNoticeId);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Sidebar (Permanent on lg screens, Drawer on mobile) */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpenCreateNotice={() => setCreateModalOpen(true)}
      />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Top Sticky Header */}
        <Navbar
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onOpenCreateNotice={() => setCreateModalOpen(true)}
        />

        {/* Content Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Slide-in Notice Detail Drawer (Schola Style) */}
      {activeNotice && (
        <NoticeDrawer
          notice={activeNotice}
          onClose={() => setActiveNoticeId(null)}
        />
      )}

      {/* Accessible Create Notice Modal */}
      <CreateNoticeModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
    </div>
  );
}
