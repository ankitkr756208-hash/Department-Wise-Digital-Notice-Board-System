# 🎓 Department-Wise Digital Notice Board System

A modern, responsive, and role-governed web application built with **React.js, Vite, Tailwind CSS, React Router DOM, Lucide React, and Recharts**.

Inspired by modern college intranet and educational management dashboards (Schola, Student Portal, and Educational Notice Board designs), this platform eliminates paper notice congestion with real-time, department-isolated circular broadcasts.

---

## 🚀 Quick Start Instructions

You can run the application directly from the root directory or inside `frontend/`:

### Option A: Running from Root Directory (`FSD-Project/`)
```bash
# 1. Install dependencies (if not already installed)
cd frontend
npm install
cd ..

# 2. Start the development server
npm run dev
```

### Option B: Running from `frontend/` Directory
```bash
cd frontend
npm run dev
```

The application will launch on `http://localhost:5173/` (or the port indicated in the terminal).

To run a production build test:
```bash
cd frontend
npm run build
npm run preview
```

---

## 🔑 1-Click Interactive Demo Accounts

For demonstration and grading evaluation, the application provides **instant 1-click role switching** in both the Login page and the top navigation profile menu:

| Role | Demo User Name | Institutional Email | Key Responsibilities & Capabilities |
| :--- | :--- | :--- | :--- |
| **Super Admin** | Dr. Alistair Vance | `admin@apexuniversity.edu` | Campus-wide broadcast, Recharts analytics, telemetry, system audit trail, global notice moderation |
| **Head of Department (HOD)** | Dr. Sarah Jenkins | `sarah.jenkins@apexuniversity.edu` | CSE department statistics, approval queue for faculty submissions, faculty directory, notice publishing |
| **Faculty Member** | Prof. Rajiv Sharma | `rajiv.sharma@apexuniversity.edu` | Draft new circulars/lab timetables, submit for HOD review, track student views, manage submissions |
| **Student** | Danielle Attah | `danielle.attah@student.apex.edu` | Personalized semester feed, urgent alerts, academic calendar & exam dates, bookmarking, PDF downloads |

> **Password for all demo accounts:** `password123` (or click any of the 4 demo pills on the Login page).

---

## 📱 Pages Implemented

| # | Page Name | Route | Highlights & Features |
| :--- | :--- | :--- | :--- |
| 1 | **Landing Page** | `/` | Hero section, urgent notice ticker, institutional mission, features grid, 6-department showcase, live preview tabbed cards, 1-click demo role launcher, footer. |
| 2 | **Login Page** | `/login` | Email/password validation, show/hide password, remember me, forgot password modal, 1-click demo role switcher. |
| 3 | **Register Page** | `/register` | Secure registration form. Students can self-register; Faculty/Staff requires institutional clearance code (`APEX2026`). Password confirmation, department selection. |
| 4 | **Admin Dashboard** | `/dashboard/admin` | Total departments, student and faculty counts, circular count, Recharts Department Notice Volume (Bar Chart), Category Distribution (Donut Chart), pending moderation queue with Approve/Reject actions, and system audit trail. |
| 5 | **HOD Dashboard** | `/dashboard/hod` | Department banner with active notice count, pending faculty approvals queue with instant approve/revise workflow, live departmental broadcasts, faculty member directory. |
| 6 | **Faculty Dashboard** | `/dashboard/faculty` | Authored circulars list, submission status tracking (`Live on Portal`, `Pending HOD Approval`), total student view counts, department announcement ticker, edit/delete actions. |
| 7 | **Student Dashboard** | `/dashboard/student` | Personalized greeting (Semester 6, CSE), urgent pinned examination alert banner, academic calendar deadlines widget, fast category filtering, attachment downloads. |
| 8 | **All Notices Page** | `/notices` | Complete circular directory, dynamic search bar (`Ctrl + K`), department filter, category filter, priority filter, date sort, Grid vs. List view toggle (Schola style), pagination. |
| 9 | **Notice Details Page** | `/notices/:id` | Full circular view, department & urgency badges, author card, post & expiry dates, target audience, downloadable PDF attachments with toast feedback, bookmark, share link, print, and related notices. |
| 10 | **Profile Page** | `/profile` | User information card, interactive edit mode with save/cancel, alert preference toggles, bookmarked notices tab, authored notices history. |

---

## 🎨 Design System & UI Components

- **Color Palette:** Soft light-gray background (`#f8fafc`), crisp white cards (`#ffffff`), slate text typography (`#0f172a`), royal blue (`#2563eb`) and indigo (`#4f46e5`) primary branding accents.
- **Priority Indicators:**
  - `Urgent`: Red/Rose with pulsed badge and audio/visual emphasis
  - `High`: Amber/Orange
  - `Normal`: Blue
  - `Low`: Slate
- **Interactive Modals & Drawers:**
  - `CreateNoticeModal`: Accessible native `<dialog>` element adhering to Modern Web Guidance with backdrop overscroll containment, file attachment simulation, target audience selector, and validation.
  - `NoticeDrawer`: Slide-over detail drawer inspired directly by the reference Schola Notice Board image for rapid inspection.
  - `NotificationBell`: Dropdown drawer with unread counter, relative timestamps, and one-click "Mark all as read".
  - `ProfileDropdown`: User avatar, institutional role badge, 1-click demo role switcher, settings link, and sign out.
  - `ToastContainer`: Accessible notification toast system for download alerts, approvals, bookmarking, and link copies.

---

## 📁 Project Structure

```
frontend/
  src/
    components/
      CreateNoticeModal.jsx     # Accessible dialog for drafting circulars
      FilterDropdown.jsx        # Reusable select dropdown
      Footer.jsx                # Institutional footer with accreditation badge
      Navbar.jsx                # Sticky top header with search, bell, & role menu
      NoticeCard.jsx            # Modern rounded card with priority pings
      NoticeDrawer.jsx          # Slide-out detail board (Schola reference style)
      NotificationBell.jsx      # Unread counter & notification popover
      ProfileDropdown.jsx       # User bio & instant 1-click demo role switcher
      ProtectedRoute.jsx        # Role-based route guard with switch helper
      SearchBar.jsx             # Search input with clear button & shortcut tag
      Sidebar.jsx               # Responsive collapsible sidebar & mobile drawer
      StatCard.jsx              # Dashboard KPI metric cards with trends
    context/
      AuthContext.jsx           # User session, demo roles, persistence
      NoticeContext.jsx         # Notice state, CRUD, approvals, bookmarks
      ToastContext.jsx          # Accessible toast alert dispatch
    data/
      dummyData.js              # Realistic university data, departments, notices
    layouts/
      MainLayout.jsx            # Main app shell with navbar, sidebar, & footer
    pages/
      AdminDashboard.jsx        # Super Admin analytics and moderation
      AllNoticesPage.jsx        # Notice board with search, filters & pagination
      FacultyDashboard.jsx      # Faculty notice submissions and tracking
      HODDashboard.jsx          # HOD approval queue and faculty roster
      LandingPage.jsx           # Public portal landing page
      LoginPage.jsx             # Authentication & demo role presets
      NoticeDetailsPage.jsx     # Full notice document viewer
      ProfilePage.jsx           # User profile & notification settings
      RegisterPage.jsx          # Role-governed registration form
      StudentDashboard.jsx      # Student portal with calendar & urgent alerts
    App.jsx                     # Route architecture & providers
    main.jsx                    # Root React 19 entrypoint
    index.css                   # Tailwind v4 import & modern dialog styling
```
