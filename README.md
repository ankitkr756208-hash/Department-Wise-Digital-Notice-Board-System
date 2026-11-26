# **🎓 Department-Wise Digital Notice Board System**

## 👨‍🎓 Project Team

    S. No. Student Name      Roll Number
  -------- ----------------- -------------------
         1 **Ankit Kumar**   **2400320100202**
         2 **Alok Kumar**    **2400320100146**

**Project Type:** Full Stack Development (FSD)\
**Project Title:** Department-Wise Digital Notice Board System

------------------------------------------------------------------------

A modern, responsive, and role-governed web application built with
**React.js, Vite, Tailwind CSS, React Router DOM, Lucide Icons, and
Recharts**.

This frontend is modeled directly on modern college management
dashboards (incorporating the clean card layouts, detail side drawer,
calendar timeline, and urgency badges from your reference designs).

------------------------------------------------------------------------

## **📌 Summary of Completed Pages**

### **1. Landing Page (`/`)**

-   **Hero Section:** High-impact headline, live urgent notices alert
    ticker, stats banner (6 Departments, 4,250+ Students, 180+ Faculty,
    99.8% Reach), and primary CTAs.
-   **1-Click Instant Demo Launcher:** Quick-login buttons directly in
    the hero for **Admin, HOD, Faculty, and Student** roles.
-   **System Introduction:** Visual presentation explaining how
    department isolation and digital broadcasts eliminate paper bulletin
    board clutter.
-   **Features Grid:** Role-based permissions, emergency alerts,
    department isolation, multi-format attachments, instant search, and
    HOD approval workflows.
-   **Department Directory Showcase:** Individual cards for **CSE, ECE,
    Mechanical, Civil, Biotech, and Management** displaying active
    notice counts and HOD profiles with direct filter links.
-   **Live Circular Preview:** Interactive tabbed cards (**All,
    Examinations, Placements, Events, Academic**) with quick detail
    preview drawer.
-   **Footer:** Accreditation badges, department directories, and IT
    helpdesk contact links.

------------------------------------------------------------------------

### **2. Login Page (`/login`)**

-   **Dual Login Flow:** Standard institutional email/password input
    alongside a **1-Click Demo Role Switcher** (Admin, HOD, Faculty,
    Student) for instant testing.
-   **Show/Hide Password:** Interactive eye toggle with smooth
    transitions.
-   **Remember Me:** Stateful persistence checkbox with `localStorage`
    session retention.
-   **Forgot Password UI:** Interactive modal with recovery email
    submission and toast notification feedback.

------------------------------------------------------------------------

### **3. Register Page (`/register`)**

-   **Role Governance:** Students can self-register with standard
    enrollment details.
-   **Privileged Role Protection:** Faculty/Staff registration is
    restricted and requires the institutional authorization key
    (`APEX2026`) with explanatory helper alerts to enforce campus
    communication integrity.
-   **Fields:** Full Name, University Email, Enrollment/Employee Code,
    Department Dropdown, Password with confirmation check, and
    University IT Policy acceptance checkbox.

------------------------------------------------------------------------

### **4. Admin Dashboard (`/dashboard/admin`)**

-   **Primary KPI Cards:** Academic Departments (6), Enrolled Students
    (4,250), Appointed Faculty (180+), and Total Circulars Published.
-   **Recharts Analytics Suite:**  
    -   **Department Notice Volume & Engagement:** Responsive Bar Chart
        comparing published notices vs. pending reviews across
        departments.
    -   **Notice Category Distribution:** Donut Chart with breakdown
        (Academic, Examinations, Placements, Events, Administration,
        Sports).
-   **Pending Moderation Queue:** Circulars submitted by faculty
    requiring university validation, equipped with **Approve** and
    **Reject/Revise** action buttons.
-   **System Audit Trail:** Real-time log of administrative and faculty
    actions with timestamps.

------------------------------------------------------------------------

### **5. HOD Dashboard (`/dashboard/hod`)**

-   **Department Executive Banner:** Highlights HOD credentials
    (Dr. Sarah Jenkins), department student count, and active term
    status.
-   **Department Statistics:** Active notices, pending faculty
    approvals, department faculty count, and enrolled students.
-   **Pending Notice Approval Queue:** Review circular drafts submitted
    by department faculty, with 1-click **Approve** or **Reject /
    Revise** with feedback notes.
-   **Faculty Directory:** Roster of department professors with academic
    specialization, email, designation, active status badges, and
    authored circular counts.
-   **Notice Management:** Search, filter, and inspect live circulars.

------------------------------------------------------------------------

### **6. Faculty Dashboard (`/dashboard/faculty`)**

-   **Welcome Profile Card:** Departmental designation (Prof. Rajiv
    Sharma, Associate Professor - CSE).
-   **Performance Metrics:** Published circulars, pending review count,
    cumulative student read views, and target reach percentage.
-   **Notice Management Table:** Filter by status (**All, Published, In
    Review**), edit notice drafts, or remove outdated notices.
-   **Department Announcements Feed:** Pinned broadcasts from the HOD
    and Academic Dean.

------------------------------------------------------------------------

### **7. Student Dashboard (`/dashboard/student`)**

*(Inspired by Reference Images 1 & 3)*

-   **Personalized Student Banner:** "Hi, Danielle Attah" with Semester
    6, Section A, and Roll Number (`21CS042`).
-   **Urgent Notice Banner:** Pulsing red priority alert for midterm
    examinations with direct access to guidelines.
-   **Filterable Notice Stream:** Fast category chips (**All,
    Examinations, Placements, Events, Saved**), live search bar, and
    attachment badges.
-   **Academic Calendar & Events Widget:** Interactive agenda for exams,
    national hackathons, and placement preparation sessions.

------------------------------------------------------------------------

### **8. All Notices Page (`/notices`)**

*(Inspired by Reference Image 2 - Schola Notice Board)*

-   **Multi-Parameter Filter Toolbar:**  
    -   Department dropdown (`All`, `CSE`, `ECE`, `ME`, `Civil`,
        `Biotech`, `Management`)
    -   Category dropdown (`All`, `Academic`, `Examinations`, `Events`,
        `Placements`, etc.)
    -   Priority filter (`All`, `Urgent`, `High`, `Normal`, `Low`)
    -   Sort options (`Most Recent`, `Urgent First`, `Most Viewed`,
        `Oldest First`)
    -   Search bar with clear button (`Ctrl + K` indicator)
-   **View Mode Toggle:** Switch seamlessly between **Grid View**
    (cards) and **List / Detail View** (Schola style).
-   **Pagination Controls:** Previous/Next page navigation with total
    circular counts.
-   **Active Filter Chips:** Visual removable chips and 1-click "Reset"
    button.

------------------------------------------------------------------------

### **9. Notice Details Page (`/notices/:id`)**

-   **Document Viewer Layout:** Full circular title, urgency and
    category tags, department seal, and views counter.
-   **Issuing Authority Profile:** Avatar, designation, department, and
    official post date.
-   **Target Audience Badge:**
    (e.g. `All 3rd Year Students, Faculty & Scholars`).
-   **Downloadable Attachments:** Dedicated attachment cards (`.pdf`,
    file sizes) with animated download toast feedback.
-   **Action Toolbar:** Bookmark notice, Copy Share Link to clipboard,
    Print Notice, and Back to Notices.
-   **Related Circulars:** Automatic suggestions from the same
    department or category.

------------------------------------------------------------------------

### **10. Profile Page (`/profile`)**

-   **User Identity Card:** User avatar, role badge, department, email,
    contact phone, and roll/staff code.
-   **Interactive Edit Mode:** Edit name, contact, department, and ID
    with **Save Changes** and **Cancel** controls.
-   **Alert Preferences:** Checkboxes for Urgent SMS Alerts, Department
    Email Digest, and Exam Timetable notifications.
-   **Saved / Bookmarked Notices Tab:** Instant access to notices
    bookmarked by the user.
-   **Authored Circulars History Tab:** Available for Faculty, HOD, and
    Admin.

------------------------------------------------------------------------

## **🛠 Reusable Components Created**

1.  **`Navbar.jsx`**: Sticky header with search bar shortcut, "Draft
    Notice" action, NotificationBell, and ProfileDropdown.
2.  **`Sidebar.jsx`**: Responsive desktop sidebar & mobile slide-out
    drawer with role-adaptive routes and department shortcuts.
3.  **`NoticeCard.jsx`**: Styled card with urgency pings, department
    tag, read time, attachment counter, and bookmarking.
4.  **`NoticeDrawer.jsx`**: Slide-over detail panel (inspired by Schola
    design) for quick inspection without leaving the page.
5.  **`CreateNoticeModal.jsx`**: Accessible native `<dialog>` modal with
    validation, role workflows, and simulated file uploads.
6.  **`StatCard.jsx`**: KPI cards with trends (`+8.4%`), colored icon
    backdrops, and hover transitions.
7.  **`SearchBar.jsx`**: Search input with clear button and keyboard
    badge.
8.  **`FilterDropdown.jsx`**: Styled select dropdown for departments,
    categories, and priorities.
9.  **`NotificationBell.jsx`**: Bell with unread counter, popover list
    of alerts, and "Mark all as read" button.
10. **`ProfileDropdown.jsx`**: Profile avatar, email, role badge,
    1-click role switcher, and sign-out.
11. **`ProtectedRoute.jsx`**: Route guard that validates roles and
    presents a 1-click role switcher if permissions are restricted.
12. **`Footer.jsx`**: Professional institutional footer with legal links
    and helpdesk contact.

------------------------------------------------------------------------

## **🏃 How to Run the Frontend**

The project is ready to run immediately.

### **Option 1: From the Root Directory (`FSD-Project/`)**

    powershell

npm run dev

### **Option 2: From the `frontend/` Directory**

    powershell

cd frontend

npm run dev

Open your browser to: 👉 **`http://localhost:5173/`**

To verify a production build:

    powershell

cd frontend

npm run build

npm run preview

------------------------------------------------------------------------

## **🔑 Demo Login Accounts**

  ----------------------------------------------------------------------------------
  Role          Name            Email                                Password
  ------------- --------------- ------------------------------------ ---------------
  **Super       Dr. Alistair    `admin@apexuniversity.edu`           `password123`
  Admin**       Vance                                                

  **HOD (CSE)** Dr. Sarah       `sarah.jenkins@apexuniversity.edu`   `password123`
                Jenkins                                              

  **Faculty**   Prof. Rajiv     `rajiv.sharma@apexuniversity.edu`    `password123`
                Sharma                                               

  **Student**   Danielle Attah  `danielle.attah@student.apex.edu`    `password123`
  ----------------------------------------------------------------------------------

*(You can also use the 1-click demo buttons on the Login page or the
top-right profile menu to switch roles on the fly).*

------------------------------------------------------------------------

### **Modern Web Guidance**

-   **`dialog`**: Implemented the native `<dialog>` element with
    `overscroll-behavior: contain` on `:modal` and `::backdrop` to
    prevent the background page from chaining gestures when scrolling
    dialogs ("scrolling over the backdrop or inside the dialog scrolls
    the page behind it").

Act as a senior Node.js backend developer. I have already developed the
frontend of my project: Department-Wise Digital Notice Board System. Now
develop a complete backend using: - Node.js - Express.js - MongoDB -
Mongoose - JWT - bcrypt - dotenv - cors - express-validator IMPORTANT:
First inspect my existing frontend project. Do not modify or break the
frontend. Create a separate backend folder. BACKEND ARCHITECTURE:
backend/ config/ controllers/ models/ routes/ middleware/ services/
utils/ uploads/ server.js package.json .env.example IMPLEMENT THE
FOLLOWING MODULES: 1. Authentication - Register user - Login user -
Logout - Get current user profile - Update profile - Change password 2.
User Management - Create users - Get all users - Update users - Delete
users - Assign department - Assign user roles 3. Department Management -
Create department - Get all departments - Get department by ID - Update
department - Delete department 4. Notice Management - Create notice -
Get all notices - Get notice by ID - Update notice - Delete notice -
Approve notice - Reject notice 5. Bookmark Management - Bookmark
notice - Remove bookmark - Get bookmarked notices 6. Dashboard APIs -
Admin dashboard statistics - HOD dashboard statistics - Faculty
dashboard statistics - Student dashboard statistics ROLE-BASED ACCESS
CONTROL: Roles: - admin - hod - faculty - student Permissions: Admin:
Full application management. HOD: Manage notices and faculty within
their assigned department. Approve or reject faculty notices. Faculty:
Create notices for their assigned department. View and manage their own
notices. Student: View approved notices belonging to their department.
Bookmark notices. SECURITY: - Hash passwords using bcrypt. - Use JWT
authentication. - Implement authentication middleware. - Implement role
authorization middleware. - Validate all request data. - Prevent
unauthorized department access. - Never store plain-text passwords. -
Use secure error handling. NOTICE STATUS: - pending - approved -
rejected NOTICE PRIORITY: - low - medium - high NOTICE CATEGORY: -
examination - events - placement - workshop - holiday - general Create
RESTful APIs with proper HTTP status codes. Add sample API documentation
with request and response examples. Test all APIs and fix errors. Do not
use hardcoded credentials or secrets. At the end, explain how to run the
backend.

# **🚀 Department-Wise Digital Notice Board System - Backend**

I have designed and implemented a production-grade, secure, and modular
backend for the **Department-Wise Digital Notice Board System** using
**Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, and
express-validator**.

The frontend was inspected first, kept untouched, and verified to build
cleanly with zero errors.

------------------------------------------------------------------------

## **📁 Backend Directory Architecture**

    backend/

├── config/

│ └── db.js \# Mongoose connection with event listeners

├── controllers/

│ ├── authController.js \# Register, Login, Profile & Password
operations

│ ├── bookmarkController.js \# Bookmark, Unbookmark & User saved list

│ ├── dashboardController.js# Role-scoped statistics & Recharts
aggregation

│ ├── departmentController.js# Department CRUD & metrics aggregation

│ ├── noticeController.js \# Notice CRUD, approval, rejection & upload

│ └── userController.js \# User management, role & department
assignments

├── middleware/

│ ├── auth.js \# JWT verification, RBAC & department isolation

│ ├── errorHandler.js \# Centralized error handler

│ ├── upload.js \# Multer attachment upload handler (10MB limit)

│ └── validate.js \# express-validator request handler

├── models/

│ ├── ActivityLog.js \# Audit trail logging

│ ├── Bookmark.js \# Notice bookmarking (compound unique index)

│ ├── Department.js \# Academic departments schema

│ ├── Notice.js \# Circulars with status, priority & categories

│ └── User.js \# User accounts with bcrypt hashing & JWT methods

├── routes/

│ ├── authRoutes.js \# /api/auth

│ ├── bookmarkRoutes.js \# /api/bookmarks

│ ├── dashboardRoutes.js \# /api/dashboard

│ ├── departmentRoutes.js \# /api/departments

│ ├── noticeRoutes.js \# /api/notices

│ └── userRoutes.js \# /api/users

├── uploads/ \# Storage directory for notice attachments

├── utils/

│ ├── seed.js \# Database population script with demo accounts

│ └── testApi.js \# Automated end-to-end API test suite

├── .env.example \# Configuration template

├── package.json \# Backend dependencies & run scripts

└── server.js \# Express application entrypoint

------------------------------------------------------------------------

## **🛡 Modules Implemented**

### **1. Authentication Module (`/api/auth`)**

-   **`POST /api/auth/register`**: Registers student accounts or
    privileged roles using the institutional access code (`APEX2026`).
    Passwords are encrypted using bcrypt (10 rounds).
-   **`POST /api/auth/login`**: Authenticates credentials and returns a
    signed JWT token containing user identity and role.
-   **`POST /api/auth/logout`**: Confirms user session termination.
-   **`GET /api/auth/me`**: Returns the authenticated user's current
    profile.
-   **`PUT /api/auth/profile`**: Updates editable profile fields (name,
    phone, avatar, designation).
-   **`PUT /api/auth/change-password`**: Verifies current password
    before hashing and saving the new password.

### **2. User Management Module (`/api/users`)**

-   **`GET /api/users`**: Lists users with pagination and search. Super
    Admins view all users; HODs only see faculty and students within
    their department.
-   **`GET /api/users/:id`**: Retrieves a single user profile (with
    department isolation checks).
-   **`POST /api/users`**: Super Admin creates users with designated
    role and department.
-   **`PUT /api/users/:id`**: Updates user information.
-   **`DELETE /api/users/:id`**: Super Admin removes a user account
    (prevents self-deletion).
-   **`PATCH /api/users/:id/department`**: Admin reassigns a user's
    department and updates department statistics.
-   **`PATCH /api/users/:id/role`**: Admin updates a user's role
    (`admin`, `hod`, `faculty`, `student`).

### **3. Department Management Module (`/api/departments`)**

-   **`GET /api/departments`**: Returns all 6 academic departments
    (`CSE`, `ECE`, `ME`, `Civil`, `Biotech`, `Management`) enriched with
    real-time active notice, faculty, and student counts.
-   **`GET /api/departments/:id`**: Fetches department by ObjectId or
    department code (e.g., `/api/departments/CSE`), including the HOD
    profile and faculty roster.
-   **`POST /api/departments`**: Admin creates a new department.
-   **`PUT /api/departments/:id`**: Admin updates department metadata or
    links an HOD.
-   **`DELETE /api/departments/:id`**: Admin deletes a department
    (protected against deletion if users or notices are still assigned).

### **4. Notice Management Module (`/api/notices`)**

-   **`GET /api/notices`**: High-performance query engine with filtering
    by `department`, `category`, `priority`, `status`, `search`, and
    pagination.  
    -   **Role-Based Visibility (RBAC):**  
        -   **Student:** Receives only `approved` circulars matching
            their department or campus-wide (`All`).
        -   **Faculty:** Receives all `approved` circulars for their
            department plus their own authored notices (including
            `pending` and `rejected`).
        -   **HOD:** Receives all notices in their department (including
            the pending approval queue) and campus-wide notices.
        -   **Admin:** Full visibility across all departments and
            statuses.
-   **`GET /api/notices/:id`**: Retrieves notice details and increments
    the view count (`viewsCount`).
-   **`POST /api/notices`**:  
    -   If created by **Faculty**: Marked as `status: 'pending'` and
        routed to the HOD approval queue.
    -   If created by **HOD** or **Admin**: Marked as
        `status: 'approved'` and published immediately.
-   **`PUT /api/notices/:id`**: Author, Department HOD, or Admin can
    update notice content.
-   **`DELETE /api/notices/:id`**: Author, Department HOD, or Admin can
    delete a notice.
-   **`PATCH /api/notices/:id/approve`**: HOD (for their department) or
    Admin approves a notice, stamps `approvedBy` and `publishedAt`, and
    logs an audit entry.
-   **`PATCH /api/notices/:id/reject`**: HOD or Admin rejects a notice
    with `rejectionReason`.
-   **`POST /api/notices/upload`**: Multer upload endpoint for notice
    attachments (`.pdf`, Word, and Images up to 10MB) stored in
    `/uploads`.

### **5. Bookmark Management Module (`/api/bookmarks`)**

-   **`POST /api/bookmarks/:noticeId`**: Saves a notice to the user's
    bookmarks (enforced unique index).
-   **`DELETE /api/bookmarks/:noticeId`**: Removes a notice from
    bookmarks.
-   **`GET /api/bookmarks`**: Returns all bookmarked notices populated
    with full notice metadata and author profiles.

### **6. Role-Based Dashboard APIs (`/api/dashboard`)**

-   **`GET /api/dashboard/admin`**: Super Admin overview including
    department notices volume (formatted for Recharts BarChart),
    category distribution (for Recharts DonutChart), recent notices, and
    audit logs.
-   **`GET /api/dashboard/hod`**: Scoped to HOD's department
    (`summary.activeNotices`, `summary.pendingApprovals`,
    `pendingQueue`, and department faculty roster).
-   **`GET /api/dashboard/faculty`**: Scoped to the faculty user
    (`myTotalNotices`, `publishedCount`, `pendingCount`, `totalViews`,
    authored circulars, and departmental broadcasts).
-   **`GET /api/dashboard/student`**: Scoped to the student's cohort
    (`urgentNotices`, latest circulars, `bookmarkedCount`, and upcoming
    academic event dates).

------------------------------------------------------------------------

## **🔒 Security & Data Integrity**

1.  **Password Hashing**: Passwords are encrypted using `bcryptjs` with
    salt factor 10. `select: false` prevents hash leaks in user queries.
2.  **JWT Authentication**: Signed with `JWT_SECRET` and configurable
    expiry (`7d`).
3.  **Department Isolation**: Middleware prevents faculty or HODs from
    accessing, creating, approving, or modifying notices in departments
    other than their own.
4.  **Validation**: All endpoints are validated with `express-validator`
    and sanitized.
5.  **No Hardcoded Secrets**: Configuration is fully managed via
    `backend/.env`.

------------------------------------------------------------------------

## **⚡ How to Run the Backend**

### **Step 1: Install Dependencies**

    powershell

cd backend

npm install

### **Step 2: Seed the Database**

Pre-populate the database with the 6 academic departments, demo users
with hashed passwords, and realistic notices:

    powershell

npm run seed

Output:

    [Seeding]: Connecting to MongoDB...

✅ DATABASE SEEDING COMPLETED SUCCESSFULLY!

### **Step 3: Start the Backend Server**

    powershell

\# Standard run

npm start

\# Development run with auto-reload

npm run dev

The server will start on **`http://localhost:5000`**.

### **Step 4: Run Automated Tests**

Execute the automated test suite verifying all 6 modules and RBAC
policies:

    powershell

npm test

Test Results:

    ======================================================

🧪 RUNNING COMPREHENSIVE BACKEND API TEST SUITE

Target Base URL: http://localhost:5000

======================================================

\[1/7\] Testing System Health Check...

  ✓ Health check returns 200 OK

  ✓ Health status is online

\[2/7\] Testing Authentication Module...

  ✓ Admin login succeeds with 200 OK

  ✓ HOD login succeeds with 200 OK

  ✓ Faculty login succeeds with 200 OK

  ✓ Student login succeeds with 200 OK

  ✓ GET /api/auth/me returns 200 OK

  ✓ Student registration returns 201 Created

\[3/7\] Testing Department Management Module...

  ✓ GET /api/departments returns 200 OK

  ✓ Contains all 6 seeded academic departments

\[4/7\] Testing Notice Management & RBAC...

  ✓ Faculty creates notice with 201 Created (defaults to 'pending')

  ✓ Student cannot see pending unapproved notices (RBAC enforced)

  ✓ HOD approves notice with 200 OK

  ✓ Student can see notice once approved by HOD

\[5/7\] Testing Bookmark Management...

  ✓ POST /api/bookmarks/:noticeId returns 201 Created

  ✓ GET /api/bookmarks returns 200 OK

  ✓ DELETE /api/bookmarks/:noticeId returns 200 OK

\[6/7\] Testing Role-Based Dashboard Analytics APIs...

  ✓ GET /api/dashboard/admin returns 200 OK

  ✓ GET /api/dashboard/hod returns 200 OK

  ✓ GET /api/dashboard/faculty returns 200 OK

  ✓ GET /api/dashboard/student returns 200 OK

\[7/7\] Testing Security & Permission Rejections (RBAC)...

  ✓ Student cannot create notice (403 Forbidden)

  ✓ Faculty cannot approve notices (403 Forbidden)

  ✓ Unauthenticated request receives 401 Unauthorized

======================================================

🎉 ALL TEST SUITES PASSED WITH 100% SUCCESS!

======================================================

------------------------------------------------------------------------

## **🔑 Demo Account Credentials**

  -----------------------------------------------------------------------------------
  Role          Email                                Password        Assigned
                                                                     Department
  ------------- ------------------------------------ --------------- ----------------
  **Super       `admin@apexuniversity.edu`           `password123`   `All`
  Admin**                                                            

  **HOD (CSE)** `sarah.jenkins@apexuniversity.edu`   `password123`   `CSE`

  **Faculty**   `rajiv.sharma@apexuniversity.edu`    `password123`   `CSE`

  **Student**   `danielle.attah@student.apex.edu`    `password123`   `CSE`
  -----------------------------------------------------------------------------------

------------------------------------------------------------------------

## **📖 Sample API Request & Response Examples**

### **1. Login Request**

`POST /api/auth/login`

    json

{

"email": "sarah.jenkins@apexuniversity.edu",

"password": "password123"

}

**Response (`200 OK`):**

    json

{

"success": true,

"message": "Authentication successful",

"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",

"user": {

"id": "6745f902f4a569b91c890121",

"name": "Dr. Sarah Jenkins",

"email": "sarah.jenkins@apexuniversity.edu",

"role": "hod",

"department": "CSE",

"designation": "Head of Department & Professor"

}

}

### **2. Faculty Notice Creation (Awaiting HOD Approval)**

`POST /api/notices`

-   **Header:** `Authorization: Bearer <FACULTY_TOKEN>`

```{=html}
<!-- -->
```
    json

{

"title": "Machine Learning Lab Supplementary Evaluation",

"content": "Make-up laboratory exam will be held in Room 204 on Friday
at 2:00 PM.",

"department": "CSE",

"category": "examination",

"priority": "high",

"targetAudience": "2nd Year CSE Students"

}

**Response (`201 Created`):**

    json

{

"success": true,

"message": "Notice submitted successfully for HOD approval",

"data": {

"\_id": "6745fa18f4a569b91c890199",

"title": "Machine Learning Lab Supplementary Evaluation",

"department": "CSE",

"category": "examination",

"priority": "high",

"status": "pending",

"targetAudience": "2nd Year CSE Students",

"author": {

"name": "Prof. Rajiv Sharma",

"email": "rajiv.sharma@apexuniversity.edu"

}

}

}

### **3. HOD Notice Approval**

`PATCH /api/notices/6745fa18f4a569b91c890199/approve`

-   **Header:** `Authorization: Bearer <HOD_TOKEN>`

**Response (`200 OK`):**

    json

{

"success": true,

"message": "Notice 'Machine Learning Lab Supplementary Evaluation' has
been approved and published",

"data": {

"\_id": "6745fa18f4a569b91c890199",

"status": "approved",

"publishedAt": "2026-11-26T11:15:00.000Z"

}

}

### **4. Admin Dashboard Metrics**

`GET /api/dashboard/admin`

-   **Header:** `Authorization: Bearer <ADMIN_TOKEN>`

**Response (`200 OK`):**

    json

{

"success": true,

"data": {

"summary": {

"totalDepartments": 6,

"totalStudents": 4250,

"totalFaculty": 180,

"totalNotices": 14,

"pendingNoticesCount": 2,

"approvedNoticesCount": 12

},

"charts": {

"departmentNotices": \[

{ "department": "CSE", "published": 6, "pending": 2, "views": 3540 },

{ "department": "ECE", "published": 2, "pending": 0, "views": 840 }

\],

"categoryDistribution": \[

{ "name": "Examination", "count": 4, "value": 33, "color": "#ef4444" },

{ "name": "Events", "count": 3, "value": 25, "color": "#8b5cf6" }

\]

}

}

}

Detailed API reference documentation is also available in
**`backend/README.md`**.

PS
C:`\Users`{=tex}`\Ankit `{=tex}Kumar`\OneDrive`{=tex}`\Desktop`{=tex}`\FSD`{=tex}-Project\>
cd .`\backend`{=tex} PS
C:`\Users`{=tex}`\Ankit `{=tex}Kumar`\OneDrive`{=tex}`\Desktop`{=tex}`\FSD`{=tex}-Project`\backend`{=tex}\>
npm install up to date, audited 133 packages in 2s 24 packages are
looking for funding run \`npm fund\` for details found 0 vulnerabilities
PS
C:`\Users`{=tex}`\Ankit `{=tex}Kumar`\OneDrive`{=tex}`\Desktop`{=tex}`\FSD`{=tex}-Project`\backend`{=tex}\>
npm run seed \> digital-notice-board-backend@1.0.0 seed \> node
utils/seed.js [Seeding](Creating%20audit%20logs...): Connecting to
MongoDB... [Seeding](Creating%20audit%20logs...): Clearing existing
database collections... [Seeding](Creating%20audit%20logs...): Creating
academic departments... [Seeding](Creating%20audit%20logs...): Creating
institutional users with hashed passwords...
[Seeding](Creating%20audit%20logs...): Populating department circulars
and notices... [Seeding](Creating%20audit%20logs...): Creating initial
bookmarks for student user... [Seeding](Creating%20audit%20logs...):
Creating audit logs...
====================================================== ✅ DATABASE
SEEDING COMPLETED SUCCESSFULLY!
====================================================== Pre-configured
User Credentials (Password: password123): 1. Admin:
admin@apexuniversity.edu (Super Admin) 2. HOD:
sarah.jenkins@apexuniversity.edu (HOD - CSE) 3. Faculty:
rajiv.sharma@apexuniversity.edu (Faculty - CSE) 4. Student:
danielle.attah@student.apex.edu (Student - CSE)


------------------------------------------------------------------------

### **You can now start the server:**

In your PowerShell terminal inside `backend\`:

    powershell

npm start

*(Or use `npm run dev` to run with auto-reload).*

You will see:

    [Server Running]: Notice Board API listening on port 5000 in development mode

------------------------------------------------------------------------

> **Tip (for the future):** If port `5000` ever gets stuck by a stray
> Node process on Windows, you can free it instantly with this one-line
> command:
>
>     powershell
>
> Stop-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess
> -Force

ye sidebaar overlapp kaar raha hai isko imrove karo

Aapke screenshot se problem exactly identify ho gayi hai.

### **Problem kya tha?**

Screen par jo white box sidebar aur dashboard ke upar overlap ho raha
tha, wo **"Draft New Notice" ka Modal** tha. CSS specificity ke karan
native `<dialog>` par `.flex` class lagi hui thi, jiski wajah se browser
modal ko close hone par bhi hide nahi kar pa raha tha (`display: flex`
ne browser ki default `display: none` property ko override kar diya
tha). Is wajah se modal hamesha screen par open reh kar sidebar aur
content ko overlap kar raha tha.

------------------------------------------------------------------------

### **Key Improvements:**

1.  **Modal Visibility Fix (`CreateNoticeModal.jsx`)**:
    -   `if (!isOpen) return null;` lagaya gaya hai. Jab tak create
        button par click nahi kiya jayega, modal DOM me bilkul render
        nahi hoga.
    -   Jab modal open hoga, wo screen ke bilkul **center me smooth dark
        backdrop overlay** (`bg-slate-900/50 backdrop-blur-xs`) ke sath
        aayega.
    -   `Esc` key dabane ya bahar backdrop par click karne par modal
        automatically smoothly close ho jayega.
2.  **Sidebar & Navbar Layout Clean-up (`Navbar.jsx`)**:
    -   Desktop view par Navbar ke andar se duplicate "Apex Portal" logo
        ko hide kar diya gaya hai kyunki Sidebar me already logo visible
        rehta hai.
    -   Ab sidebar aur main content ke beech clean spacing hai aur koi
        bhi element ek dusre ko overlap nahi karega.
3.  **Responsive Mobile Drawer**:
    -   Mobile ya tablet screen par sidebar drawer ki tarah slide-in
        hoga aur link click karne ya bahar tap karne par band ho jayega.

------------------------------------------------------------------------

### **Ab Browser me check karein:**

Aap apne browser par jaakar page ko **Refresh (`Ctrl + F5` ya `F5`)**
karein: 👉 **`http://localhost:5173/dashboard/student`**

Ab sidebar clean, professional aur bina kisi overlap ke perfectly render
hoga!
