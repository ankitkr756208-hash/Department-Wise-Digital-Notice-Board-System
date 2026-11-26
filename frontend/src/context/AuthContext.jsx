import React, { createContext, useContext, useState, useEffect } from 'react';
import { demoUsers } from '../data/dummyData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('notice_board_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved user', e);
      }
    }
    // Default to student for initial experience, but user can switch in 1 click!
    return demoUsers.student;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('notice_board_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('notice_board_user');
    }
  }, [user]);

  const login = (email, password) => {
    // Check against demo credentials or create standard session
    const matched = Object.values(demoUsers).find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (matched) {
      setUser(matched);
      return { success: true, user: matched };
    }

    // Default student user for any test credentials
    const customUser = {
      id: 'usr-custom-' + Date.now(),
      name: email.split('@')[0].replace('.', ' ').toUpperCase(),
      email: email,
      role: 'student',
      department: 'CSE',
      designation: 'Student',
      enrollmentNo: 'ENR-' + Math.floor(10000 + Math.random() * 90000),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      joinedDate: 'November 2026'
    };
    setUser(customUser);
    return { success: true, user: customUser };
  };

  const loginAs = (role) => {
    if (demoUsers[role]) {
      setUser(demoUsers[role]);
      return demoUsers[role];
    }
    return null;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updatedFields) => {
    setUser((prev) => {
      const updated = { ...prev, ...updatedFields };
      return updated;
    });
  };

  const register = (data) => {
    const newUser = {
      id: 'usr-' + Date.now(),
      name: data.fullName,
      email: data.email,
      role: data.role || 'student',
      department: data.department || 'CSE',
      designation: data.role === 'faculty' ? 'Assistant Professor' : 'Undergraduate Student',
      enrollmentNo: data.enrollmentNo || 'REG-' + Math.floor(1000 + Math.random() * 9000),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      phone: data.phone || '+1 (555) 000-0000',
      joinedDate: 'November 2026'
    };
    setUser(newUser);
    return newUser;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        loginAs,
        logout,
        updateProfile,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
