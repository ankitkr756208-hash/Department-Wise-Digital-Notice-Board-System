# 🏢 Department-Wise Digital Notice Board System - Backend API

A secure, modular, and scalable RESTful backend service built with **Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, and express-validator**.

---

## 🏗 Backend Architecture

```
backend/
├── config/
│   └── db.js                 # Mongoose connection & event listeners
├── controllers/
│   ├── authController.js     # Register, Login, Profile & Password operations
│   ├── bookmarkController.js # Bookmark, Unbookmark & User saved list
│   ├── dashboardController.js# Role-scoped statistics & analytics
│   ├── departmentController.js# Department CRUD & metrics aggregation
│   ├── noticeController.js   # Notice CRUD, approval, rejection & upload
│   └── userController.js     # User management, role & department assignments
├── middleware/
│   ├── auth.js               # JWT verification, RBAC & department isolation
│   ├── errorHandler.js       # Centralized error handler
│   ├── upload.js             # Multer file upload handler
│   └── validate.js           # express-validator request handler
├── models/
│   ├── ActivityLog.js        # Audit trail logging
│   ├── Bookmark.js           # Notice bookmarking (compound unique index)
│   ├── Department.js         # Academic departments schema
│   ├── Notice.js             # Circulars with status, priority & categories
│   └── User.js               # User accounts with bcrypt hashing & JWT methods
├── routes/
│   ├── authRoutes.js         # /api/auth
│   ├── bookmarkRoutes.js     # /api/bookmarks
│   ├── dashboardRoutes.js    # /api/dashboard
│   ├── departmentRoutes.js   # /api/departments
│   ├── noticeRoutes.js       # /api/notices
│   └── userRoutes.js         # /api/users
├── uploads/                  # Storage directory for notice attachments
├── utils/
│   ├── seed.js               # Database population script with demo accounts
│   └── testApi.js            # Automated end-to-end API test suite
├── .env.example              # Template configuration
├── package.json              # Backend dependencies & run scripts
└── server.js                 # Express application entrypoint
```

---

## ⚙️ Prerequisites & Setup

### 1. Requirements
- **Node.js**: v18.x or v20+
- **MongoDB**: Local MongoDB instance (`mongodb://localhost:27017`) or MongoDB Atlas URI

### 2. Environment Variables (`.env`)
Create `.env` inside `backend/` (or copy from `.env.example`):
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/digital_notice_board
JWT_SECRET=super_secret_jwt_key_apex_notice_board_2026_secure
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
FACULTY_REGISTER_CODE=APEX2026
```

### 3. Install Dependencies
```bash
cd backend
npm install
```

### 4. Seed Database (Pre-configured Demo Accounts & Data)
```bash
npm run seed
```

This sets up:
* 6 Departments: `CSE`, `ECE`, `ME`, `Civil`, `Biotech`, `Management`
* 4 Demo Accounts with password `password123`:
  * **Super Admin**: `admin@apexuniversity.edu`
  * **HOD (CSE)**: `sarah.jenkins@apexuniversity.edu`
  * **Faculty (CSE)**: `rajiv.sharma@apexuniversity.edu`
  * **Student (CSE)**: `danielle.attah@student.apex.edu`
* 7+ Realistic notices across categories and approval states.

### 5. Start the Server
```bash
# Standard start
npm start

# Development mode with file watching
npm run dev
```
The server will boot on `http://localhost:5000` with status:
`[Server Running]: Notice Board API listening on port 5000 in development mode`
`[MongoDB Connected]: localhost:27017/digital_notice_board`

### 6. Run Automated Test Suite
```bash
npm test
```

---

## 🛡 Role-Based Access Control (RBAC) Matrix

| Resource / Action | Admin | HOD | Faculty | Student | Guest |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **View Approved Circulars** | ✅ All | ✅ All | ✅ Department & Campus | ✅ Department & Campus | ✅ Approved |
| **Create Notice** | ✅ Direct Publish | ✅ Direct Publish | ✅ Submits for Approval | ❌ (403) | ❌ (401) |
| **Approve Notice** | ✅ All | ✅ Assigned Department | ❌ (403) | ❌ (403) | ❌ (401) |
| **Reject Notice** | ✅ All | ✅ Assigned Department | ❌ (403) | ❌ (403) | ❌ (401) |
| **Edit Notice** | ✅ All | ✅ In Department | ✅ Own Submissions | ❌ (403) | ❌ (401) |
| **Delete Notice** | ✅ All | ✅ In Department | ✅ Own Submissions | ❌ (403) | ❌ (401) |
| **Bookmark Notices** | ✅ | ✅ | ✅ | ✅ | ❌ (401) |
| **Department Management** | ✅ CRUD | ❌ (403) | ❌ (403) | ❌ (403) | ❌ (401) |
| **User Role Assignment** | ✅ | ❌ (403) | ❌ (403) | ❌ (403) | ❌ (401) |
| **Dashboard Telemetry** | ✅ Full System | ✅ Department Scoped | ✅ Faculty Submissions | ✅ Student Cohort | ❌ (401) |

---

## 📖 RESTful API Documentation & Sample Payloads

### 1. Authentication Endpoints (`/api/auth`)

#### `POST /api/auth/register`
Register a student account, or a staff account with authorization code.
```json
// Request Body
{
  "name": "Alex Morgan",
  "email": "alex.morgan@student.apex.edu",
  "password": "password123",
  "department": "CSE",
  "enrollmentNo": "21CS099",
  "role": "student"
}

// Response (201 Created)
{
  "success": true,
  "message": "Account registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "6745f902f4a569b91c890123",
    "name": "Alex Morgan",
    "email": "alex.morgan@student.apex.edu",
    "role": "student",
    "department": "CSE",
    "designation": "Undergraduate Student",
    "enrollmentNo": "21CS099",
    "avatar": "https://..."
  }
}
```

#### `POST /api/auth/login`
```json
// Request Body
{
  "email": "admin@apexuniversity.edu",
  "password": "password123"
}

// Response (200 OK)
{
  "success": true,
  "message": "Authentication successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "6745f902f4a569b91c890120",
    "name": "Dr. Alistair Vance",
    "email": "admin@apexuniversity.edu",
    "role": "admin",
    "department": "All"
  }
}
```

#### `GET /api/auth/me`
* **Headers:** `Authorization: Bearer <TOKEN>`
* **Response (200 OK):** Current logged-in user profile with status and metadata.

#### `PUT /api/auth/profile`
* **Headers:** `Authorization: Bearer <TOKEN>`
* **Request:** `{ "name": "Dr. A. Vance", "phone": "+1 (555) 999-1234" }`

#### `PUT /api/auth/change-password`
* **Headers:** `Authorization: Bearer <TOKEN>`
* **Request:** `{ "currentPassword": "password123", "newPassword": "newSecretPassword456" }`

---

### 2. Department Management (`/api/departments`)

#### `GET /api/departments`
* **Access:** Public / Authenticated
* **Response (200 OK):**
```json
{
  "success": true,
  "count": 6,
  "data": [
    {
      "_id": "6745f902f4a569b91c890110",
      "code": "CSE",
      "name": "Computer Science & Engineering",
      "description": "Specializing in AI, Cloud Computing and Cybersecurity.",
      "hodName": "Dr. Sarah Jenkins",
      "hodEmail": "sarah.jenkins@apexuniversity.edu",
      "color": "blue",
      "accentColor": "#3b82f6",
      "activeNoticesCount": 14,
      "facultyCount": 38,
      "studentCount": 1120
    }
  ]
}
```

#### `POST /api/departments`
* **Access:** Admin only (`Authorization: Bearer <ADMIN_TOKEN>`)
* **Request:**
```json
{
  "code": "AI",
  "name": "Artificial Intelligence & Data Science",
  "description": "Pioneering intelligent systems and machine perception.",
  "color": "indigo"
}
```

---

### 3. Notice Management (`/api/notices`)

#### `GET /api/notices`
* **Access:** Public (returns approved notices) / Role-scoped when Bearer token is provided.
* **Query Parameters:**
  * `department`: `CSE`, `ECE`, `ME`, `All`
  * `category`: `examination`, `events`, `placement`, `workshop`, `holiday`, `general`
  * `priority`: `low`, `medium`, `high`
  * `status`: `pending`, `approved`, `rejected`
  * `search`: text query (searches in title and body)
  * `page`, `limit`: pagination parameters

#### `POST /api/notices`
* **Access:** Faculty, HOD, Admin
* **Request:**
```json
{
  "title": "Machine Learning Lab Supplementary Evaluation",
  "content": "Make-up laboratory exam will be held in Room 204 on Friday.",
  "department": "CSE",
  "category": "examination",
  "priority": "high",
  "targetAudience": "2nd Year CSE Students",
  "attachments": [
    {
      "name": "Lab_Schedule.pdf",
      "url": "/uploads/Lab_Schedule.pdf",
      "size": "1.4 MB",
      "type": "pdf"
    }
  ]
}
```
* **Response (201 Created):**
  * If created by Faculty: `status = 'pending'` awaiting HOD approval.
  * If created by HOD/Admin: `status = 'approved'` published live immediately.

#### `PATCH /api/notices/:id/approve`
* **Access:** HOD (for department) / Admin
* **Response (200 OK):** Notice marked `status: 'approved'`, `publishedAt` updated, and audit log recorded.

#### `PATCH /api/notices/:id/reject`
* **Access:** HOD (for department) / Admin
* **Request:** `{ "reason": "Please attach official invigilator roster" }`

#### `POST /api/notices/upload`
* **Access:** Faculty, HOD, Admin
* **Multipart Form:** `file: <attachment>` (PDF, Word, or Image up to 10MB)
* **Response (200 OK):** `{ "url": "/uploads/filename.pdf", "size": "1.2 MB", "type": "pdf" }`

---

### 4. Bookmark Management (`/api/bookmarks`)

* `POST /api/bookmarks/:noticeId` — Bookmark notice for authenticated user
* `DELETE /api/bookmarks/:noticeId` — Remove bookmark
* `GET /api/bookmarks` — Retrieve all notices saved by current user

---

### 5. Role-Scoped Dashboard APIs (`/api/dashboard`)

#### `GET /api/dashboard/admin`
* **Access:** Admin only
* **Response:**
  * `summary`: `totalDepartments`, `totalStudents`, `totalFaculty`, `totalNotices`, `pendingNoticesCount`
  * `charts.departmentNotices`: Published vs Pending counts by department (formatted for Recharts BarChart)
  * `charts.categoryDistribution`: Category percentages and color codes (for Recharts DonutChart)
  * `recentNotices`: Last 5 circulars
  * `recentActivities`: System audit trail

#### `GET /api/dashboard/hod`
* **Access:** HOD, Admin
* **Response:**
  * Scoped to HOD's department (`summary.activeNotices`, `summary.pendingApprovals`, `facultyCount`, `studentCount`)
  * `pendingQueue`: Array of faculty-submitted notices awaiting approval
  * `facultyList`: Roster of department faculty with contact info

#### `GET /api/dashboard/faculty`
* **Access:** Faculty, HOD, Admin
* **Response:**
  * `myTotalNotices`, `publishedCount`, `pendingCount`, `rejectedCount`, `totalViews`
  * `myNotices`: List of notices authored by current faculty
  * `departmentBroadcasts`: Recent announcements from HOD/Admin

#### `GET /api/dashboard/student`
* **Access:** Student, Faculty, HOD, Admin
* **Response:**
  * Scoped to Student's enrolled department
  * `urgentNotices`: Pinned high-priority examination circulars
  * `latestNotices`: Verified department broadcasts
  * `upcomingEvents`: Academic calendar deadlines and fests
