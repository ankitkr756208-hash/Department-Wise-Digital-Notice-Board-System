const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const BASE_URL = `http://localhost:${process.env.PORT || 5000}`;

let adminToken = '';
let hodToken = '';
let facultyToken = '';
let studentToken = '';

let createdNoticeId = '';
let testDeptId = '';

const assert = (condition, message) => {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    throw new Error(message);
  } else {
    console.log(`  ✓ ${message}`);
  }
};

const runTests = async () => {
  console.log('\n======================================================');
  console.log('🧪 RUNNING COMPREHENSIVE BACKEND API TEST SUITE');
  console.log(`Target Base URL: ${BASE_URL}`);
  console.log('======================================================\n');

  try {
    // 1. Health check
    console.log('[1/7] Testing System Health Check...');
    const healthRes = await fetch(`${BASE_URL}/api/health`);
    const healthData = await healthRes.json();
    assert(healthRes.status === 200, 'Health check returns 200 OK');
    assert(healthData.status === 'online', 'Health status is online');

    // 2. Authentication Tests
    console.log('\n[2/7] Testing Authentication Module...');
    
    // Login Admin
    const adminLoginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@apexuniversity.edu', password: 'password123' })
    });
    const adminLoginData = await adminLoginRes.json();
    assert(adminLoginRes.status === 200, 'Admin login succeeds with 200 OK');
    assert(adminLoginData.token !== undefined, 'Admin JWT token received');
    adminToken = adminLoginData.token;

    // Login HOD
    const hodLoginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'sarah.jenkins@apexuniversity.edu', password: 'password123' })
    });
    const hodLoginData = await hodLoginRes.json();
    assert(hodLoginRes.status === 200, 'HOD login succeeds with 200 OK');
    hodToken = hodLoginData.token;

    // Login Faculty
    const facLoginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'rajiv.sharma@apexuniversity.edu', password: 'password123' })
    });
    const facLoginData = await facLoginRes.json();
    assert(facLoginRes.status === 200, 'Faculty login succeeds with 200 OK');
    facultyToken = facLoginData.token;

    // Login Student
    const stuLoginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'danielle.attah@student.apex.edu', password: 'password123' })
    });
    const stuLoginData = await stuLoginRes.json();
    assert(stuLoginRes.status === 200, 'Student login succeeds with 200 OK');
    studentToken = stuLoginData.token;

    // Get current profile
    const meRes = await fetch(`${BASE_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${studentToken}` }
    });
    const meData = await meRes.json();
    assert(meRes.status === 200, 'GET /api/auth/me returns 200 OK');
    assert(meData.data.email === 'danielle.attah@student.apex.edu', 'Profile matches authenticated user');

    // Register new student
    const testEmail = `test.student.${Date.now()}@student.apex.edu`;
    const regRes = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Alex Morgan',
        email: testEmail,
        password: 'password123',
        department: 'CSE',
        enrollmentNo: '21CS999'
      })
    });
    assert(regRes.status === 201, 'Student registration returns 201 Created');

    // 3. Department Management Tests
    console.log('\n[3/7] Testing Department Management Module...');
    const deptsRes = await fetch(`${BASE_URL}/api/departments`);
    const deptsData = await deptsRes.json();
    assert(deptsRes.status === 200, 'GET /api/departments returns 200 OK');
    assert(deptsData.count >= 6, 'Contains all 6 seeded academic departments');

    const singleDeptRes = await fetch(`${BASE_URL}/api/departments/CSE`);
    const singleDeptData = await singleDeptRes.json();
    assert(singleDeptRes.status === 200, 'GET /api/departments/CSE returns 200 OK');
    assert(singleDeptData.data.code === 'CSE', 'Department code verified');

    // 4. Notice Management & RBAC Tests
    console.log('\n[4/7] Testing Notice Management & RBAC...');
    // Faculty drafts notice -> status should be 'pending'
    const createNoticeRes = await fetch(`${BASE_URL}/api/notices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${facultyToken}`
      },
      body: JSON.stringify({
        title: 'Algorithms Midterm Lab Make-Up Session',
        content: 'Make-up lab session for all students scheduled for Friday 2 PM in Room 104.',
        department: 'CSE',
        category: 'examination',
        priority: 'high',
        targetAudience: '2nd Year CSE'
      })
    });
    const createNoticeData = await createNoticeRes.json();
    assert(createNoticeRes.status === 201, 'Faculty creates notice with 201 Created');
    assert(createNoticeData.data.status === 'pending', 'Faculty notice defaults to "pending" approval');
    createdNoticeId = createNoticeData.data._id;

    // Student should NOT see this pending notice
    const studentNoticesRes = await fetch(`${BASE_URL}/api/notices`, {
      headers: { Authorization: `Bearer ${studentToken}` }
    });
    const studentNoticesData = await studentNoticesRes.json();
    const hasPendingNotice = studentNoticesData.data.some((n) => n._id === createdNoticeId);
    assert(!hasPendingNotice, 'Student cannot see pending unapproved notices (RBAC enforced)');

    // HOD approves the notice
    const approveRes = await fetch(`${BASE_URL}/api/notices/${createdNoticeId}/approve`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${hodToken}` }
    });
    const approveData = await approveRes.json();
    assert(approveRes.status === 200, 'HOD approves notice with 200 OK');
    assert(approveData.data.status === 'approved', 'Notice status updated to "approved"');

    // Student CAN now see the approved notice
    const studentNoticesRes2 = await fetch(`${BASE_URL}/api/notices`, {
      headers: { Authorization: `Bearer ${studentToken}` }
    });
    const studentNoticesData2 = await studentNoticesRes2.json();
    const hasApprovedNotice = studentNoticesData2.data.some((n) => n._id === createdNoticeId);
    assert(hasApprovedNotice, 'Student can see notice once approved by HOD');

    // 5. Bookmark Management Tests
    console.log('\n[5/7] Testing Bookmark Management...');
    const bookmarkRes = await fetch(`${BASE_URL}/api/bookmarks/${createdNoticeId}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${studentToken}` }
    });
    assert(bookmarkRes.status === 201, 'POST /api/bookmarks/:noticeId returns 201 Created');

    const getBookmarksRes = await fetch(`${BASE_URL}/api/bookmarks`, {
      headers: { Authorization: `Bearer ${studentToken}` }
    });
    const getBookmarksData = await getBookmarksRes.json();
    assert(getBookmarksRes.status === 200, 'GET /api/bookmarks returns 200 OK');
    assert(
      getBookmarksData.data.some((n) => n._id === createdNoticeId),
      'Bookmarked notice appears in user saved list'
    );

    // Remove bookmark
    const removeBookmarkRes = await fetch(`${BASE_URL}/api/bookmarks/${createdNoticeId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${studentToken}` }
    });
    assert(removeBookmarkRes.status === 200, 'DELETE /api/bookmarks/:noticeId returns 200 OK');

    // 6. Dashboard Statistics Tests
    console.log('\n[6/7] Testing Role-Based Dashboard Analytics APIs...');
    // Admin Dashboard Stats
    const adminDashRes = await fetch(`${BASE_URL}/api/dashboard/admin`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const adminDashData = await adminDashRes.json();
    assert(adminDashRes.status === 200, 'GET /api/dashboard/admin returns 200 OK');
    assert(adminDashData.data.summary.totalDepartments >= 6, 'Admin stats totalDepartments verified');
    assert(Array.isArray(adminDashData.data.charts.departmentNotices), 'Recharts department notices array provided');

    // HOD Dashboard Stats
    const hodDashRes = await fetch(`${BASE_URL}/api/dashboard/hod`, {
      headers: { Authorization: `Bearer ${hodToken}` }
    });
    const hodDashData = await hodDashRes.json();
    assert(hodDashRes.status === 200, 'GET /api/dashboard/hod returns 200 OK');
    assert(hodDashData.data.department.code === 'CSE', 'HOD stats scoped to CSE department');

    // Faculty Dashboard Stats
    const facDashRes = await fetch(`${BASE_URL}/api/dashboard/faculty`, {
      headers: { Authorization: `Bearer ${facultyToken}` }
    });
    const facDashData = await facDashRes.json();
    assert(facDashRes.status === 200, 'GET /api/dashboard/faculty returns 200 OK');
    assert(facDashData.data.summary.myTotalNotices >= 1, 'Faculty authored notices counted');

    // Student Dashboard Stats
    const stuDashRes = await fetch(`${BASE_URL}/api/dashboard/student`, {
      headers: { Authorization: `Bearer ${studentToken}` }
    });
    const stuDashData = await stuDashRes.json();
    assert(stuDashRes.status === 200, 'GET /api/dashboard/student returns 200 OK');
    assert(stuDashData.data.student.department === 'CSE', 'Student dashboard department verified');

    // 7. Security & Authorization Negative Tests
    console.log('\n[7/7] Testing Security & Permission Rejections (RBAC)...');
    
    // Student attempting to create notice (Forbidden)
    const illegalCreateRes = await fetch(`${BASE_URL}/api/notices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${studentToken}`
      },
      body: JSON.stringify({
        title: 'Unauthorized Student Notice',
        content: 'This should fail',
        department: 'CSE'
      })
    });
    assert(illegalCreateRes.status === 403, 'Student cannot create notice (403 Forbidden)');

    // Faculty attempting to approve notice (Forbidden)
    const illegalApproveRes = await fetch(`${BASE_URL}/api/notices/${createdNoticeId}/approve`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${facultyToken}` }
    });
    assert(illegalApproveRes.status === 403, 'Faculty cannot approve notices (403 Forbidden)');

    // Unauthenticated request to protected route (Unauthorized)
    const unauthRes = await fetch(`${BASE_URL}/api/dashboard/admin`);
    assert(unauthRes.status === 401, 'Unauthenticated request receives 401 Unauthorized');

    console.log('\n======================================================');
    console.log('🎉 ALL TEST SUITES PASSED WITH 100% SUCCESS!');
    console.log('======================================================\n');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Test suite failed with error:', error);
    process.exit(1);
  }
};

runTests();
