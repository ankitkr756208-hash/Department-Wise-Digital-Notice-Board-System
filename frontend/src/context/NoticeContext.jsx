import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialNotices, initialNotifications } from '../data/dummyData';

const NoticeContext = createContext(null);

export const NoticeProvider = ({ children }) => {
  const [notices, setNotices] = useState(() => {
    const saved = localStorage.getItem('apex_notices');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse notices from storage', e);
      }
    }
    return initialNotices;
  });

  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('apex_bookmarks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return ['ntc-101', 'ntc-102'];
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('apex_notifications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return initialNotifications;
  });

  // Active detail modal / drawer state (like in Image 2)
  const [activeNoticeId, setActiveNoticeId] = useState(null);

  useEffect(() => {
    localStorage.setItem('apex_notices', JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem('apex_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('apex_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const createNotice = (noticeData, author) => {
    const id = 'ntc-' + Date.now();
    const isPrivileged = author?.role === 'admin' || author?.role === 'hod';
    
    const newNotice = {
      id,
      title: noticeData.title,
      slug: noticeData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      content: noticeData.content,
      excerpt: noticeData.excerpt || noticeData.content.substring(0, 140) + '...',
      department: noticeData.department || author?.department || 'All',
      category: noticeData.category || 'General',
      priority: noticeData.priority || 'Normal',
      status: isPrivileged ? 'published' : 'pending',
      targetAudience: noticeData.targetAudience || 'All Students',
      author: {
        name: author?.name || 'Faculty Member',
        role: author?.role || 'faculty',
        designation: author?.designation || 'Assistant Professor',
        department: author?.department || 'CSE',
        avatar: author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      },
      publishedAt: new Date().toISOString(),
      expiresAt: noticeData.expiresAt || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      viewsCount: 1,
      isPinned: noticeData.isPinned || false,
      isNew: true,
      attachments: noticeData.attachments || []
    };

    setNotices((prev) => [newNotice, ...prev]);

    // Add notification
    const newNotification = {
      id: 'notif-' + Date.now(),
      title: isPrivileged ? `New Notice Published: ${newNotice.title}` : `New Notice Pending Approval: ${newNotice.title}`,
      message: `By ${author?.name || 'Faculty'} for ${newNotice.department}`,
      time: 'Just now',
      isRead: false,
      priority: newNotice.priority,
      noticeId: id
    };
    setNotifications((prev) => [newNotification, ...prev]);

    return newNotice;
  };

  const updateNotice = (id, updatedFields) => {
    setNotices((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...updatedFields } : n))
    );
  };

  const deleteNotice = (id) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
    if (activeNoticeId === id) {
      setActiveNoticeId(null);
    }
  };

  const approveNotice = (id) => {
    setNotices((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, status: 'published', isNew: true } : n
      )
    );
    const notice = notices.find((n) => n.id === id);
    if (notice) {
      const approvalNotif = {
        id: 'notif-' + Date.now(),
        title: `Notice Approved: ${notice.title}`,
        message: 'The notice is now live on the department digital board.',
        time: 'Just now',
        isRead: false,
        priority: notice.priority,
        noticeId: id
      };
      setNotifications((prev) => [approvalNotif, ...prev]);
    }
  };

  const rejectNotice = (id, reason = 'Needs revision') => {
    setNotices((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, status: 'rejected', rejectionReason: reason } : n
      )
    );
  };

  const toggleBookmark = (id) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((bId) => bId !== id) : [...prev, id]
    );
  };

  const incrementViews = (id) => {
    setNotices((prev) =>
      prev.map((n) => (n.id === id ? { ...n, viewsCount: (n.viewsCount || 0) + 1 } : n))
    );
  };

  const markNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })));
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  return (
    <NoticeContext.Provider
      value={{
        notices,
        bookmarks,
        notifications,
        unreadNotificationsCount,
        activeNoticeId,
        setActiveNoticeId,
        createNotice,
        updateNotice,
        deleteNotice,
        approveNotice,
        rejectNotice,
        toggleBookmark,
        incrementViews,
        markNotificationRead,
        markAllNotificationsRead
      }}
    >
      {children}
    </NoticeContext.Provider>
  );
};

export const useNotices = () => {
  const context = useContext(NoticeContext);
  if (!context) {
    throw new Error('useNotices must be used within a NoticeProvider');
  }
  return context;
};
