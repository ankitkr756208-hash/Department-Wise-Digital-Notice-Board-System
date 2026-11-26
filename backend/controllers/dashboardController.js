const User = require('../models/User');
const Department = require('../models/Department');
const Notice = require('../models/Notice');
const Bookmark = require('../models/Bookmark');
const ActivityLog = require('../models/ActivityLog');

// @desc    Admin Dashboard Analytics & Metrics
// @route   GET /api/dashboard/admin
// @access  Private (Admin only)
exports.getAdminStats = async (req, res, next) => {
  try {
    const [
      totalDepartments,
      totalStudents,
      totalFaculty,
      totalNotices,
      pendingNoticesCount,
      approvedNoticesCount,
      departmentsList,
      recentNotices,
      recentActivities
    ] = await Promise.all([
      Department.countDocuments(),
      User.countDocuments({ role: 'student' }),
      User.countDocuments({ role: 'faculty' }),
      Notice.countDocuments(),
      Notice.countDocuments({ status: 'pending' }),
      Notice.countDocuments({ status: 'approved' }),
      Department.find().select('code name color'),
      Notice.find()
        .populate('author', 'name email designation avatar')
        .sort({ createdAt: -1 })
        .limit(5),
      ActivityLog.find().sort({ createdAt: -1 }).limit(6)
    ]);

    // Aggregate notices by department for Recharts BarChart
    const departmentNoticesData = await Promise.all(
      departmentsList.map(async (dept) => {
        const [published, pending, viewsResult] = await Promise.all([
          Notice.countDocuments({ department: dept.code, status: 'approved' }),
          Notice.countDocuments({ department: dept.code, status: 'pending' }),
          Notice.aggregate([
            { $match: { department: dept.code } },
            { $group: { _id: null, totalViews: { $sum: '$viewsCount' } } }
          ])
        ]);

        return {
          department: dept.code,
          name: dept.name,
          published,
          pending,
          views: viewsResult[0] ? viewsResult[0].totalViews : 0
        };
      })
    );

    // Aggregate notices by category for Recharts DonutChart
    const categoryAggregation = await Notice.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    const categoryColors = {
      examination: '#ef4444',
      academic: '#3b82f6',
      events: '#8b5cf6',
      placement: '#10b981',
      workshop: '#06b6d4',
      holiday: '#f59e0b',
      general: '#64748b',
      sports: '#ea580c',
      administration: '#4f46e5'
    };

    const totalCategoryCount = categoryAggregation.reduce((acc, c) => acc + c.count, 0) || 1;
    const categoryDistribution = categoryAggregation.map((cat) => ({
      name: cat._id.charAt(0).toUpperCase() + cat._id.slice(1),
      count: cat.count,
      value: Math.round((cat.count / totalCategoryCount) * 100),
      color: categoryColors[cat._id] || '#6366f1'
    }));

    res.status(200).json({
      success: true,
      data: {
        summary: {
          totalDepartments,
          totalStudents,
          totalFaculty,
          totalNotices,
          pendingNoticesCount,
          approvedNoticesCount
        },
        charts: {
          departmentNotices: departmentNoticesData,
          categoryDistribution
        },
        recentNotices,
        recentActivities
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    HOD Dashboard Statistics
// @route   GET /api/dashboard/hod
// @access  Private (HOD, Admin)
exports.getHodStats = async (req, res, next) => {
  try {
    const deptCode = req.user.department || 'CSE';

    const [
      department,
      approvedNoticesCount,
      pendingNotices,
      facultyList,
      studentCount,
      recentNotices
    ] = await Promise.all([
      Department.findOne({ code: deptCode }),
      Notice.countDocuments({ department: deptCode, status: 'approved' }),
      Notice.find({ department: deptCode, status: 'pending' })
        .populate('author', 'name email designation avatar phone')
        .sort({ createdAt: -1 }),
      User.find({ department: deptCode, role: 'faculty' })
        .select('name email designation avatar phone status')
        .sort({ name: 1 }),
      User.countDocuments({ department: deptCode, role: 'student' }),
      Notice.find({ department: deptCode, status: 'approved' })
        .populate('author', 'name designation')
        .sort({ publishedAt: -1 })
        .limit(5)
    ]);

    res.status(200).json({
      success: true,
      data: {
        department: department || { code: deptCode, name: deptCode + ' Department' },
        summary: {
          activeNotices: approvedNoticesCount,
          pendingApprovals: pendingNotices.length,
          facultyCount: facultyList.length,
          studentCount
        },
        pendingQueue: pendingNotices,
        facultyList,
        recentNotices
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Faculty Dashboard Statistics
// @route   GET /api/dashboard/faculty
// @access  Private (Faculty, HOD, Admin)
exports.getFacultyStats = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const userDept = req.user.department;

    const [
      myNotices,
      totalViewsResult,
      departmentBroadcasts
    ] = await Promise.all([
      Notice.find({ author: userId }).sort({ createdAt: -1 }),
      Notice.aggregate([
        { $match: { author: req.user._id } },
        { $group: { _id: null, totalViews: { $sum: '$viewsCount' } } }
      ]),
      Notice.find({
        department: { $in: [userDept, 'All'] },
        author: { $ne: req.user._id },
        status: 'approved'
      })
        .populate('author', 'name designation')
        .sort({ publishedAt: -1 })
        .limit(4)
    ]);

    const publishedCount = myNotices.filter((n) => n.status === 'approved').length;
    const pendingCount = myNotices.filter((n) => n.status === 'pending').length;
    const rejectedCount = myNotices.filter((n) => n.status === 'rejected').length;
    const totalViews = totalViewsResult[0] ? totalViewsResult[0].totalViews : 0;

    res.status(200).json({
      success: true,
      data: {
        summary: {
          myTotalNotices: myNotices.length,
          publishedCount,
          pendingCount,
          rejectedCount,
          totalViews
        },
        myNotices,
        departmentBroadcasts
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Student Dashboard Statistics
// @route   GET /api/dashboard/student
// @access  Private (Student, Faculty, HOD, Admin)
exports.getStudentStats = async (req, res, next) => {
  try {
    const studentDept = req.user.department || 'CSE';

    const [
      departmentNotices,
      urgentNotices,
      bookmarkedCount,
      upcomingEvents
    ] = await Promise.all([
      Notice.find({
        department: { $in: [studentDept, 'All'] },
        status: 'approved'
      })
        .populate('author', 'name email designation department avatar')
        .sort({ publishedAt: -1 })
        .limit(6),
      Notice.find({
        department: { $in: [studentDept, 'All'] },
        status: 'approved',
        priority: { $in: ['high', 'urgent'] }
      })
        .populate('author', 'name designation')
        .sort({ publishedAt: -1 })
        .limit(2),
      Bookmark.countDocuments({ user: req.user.id }),
      Notice.find({
        department: { $in: [studentDept, 'All'] },
        status: 'approved',
        category: { $in: ['examination', 'events', 'academic', 'workshop'] }
      })
        .sort({ expiresAt: 1, publishedAt: -1 })
        .limit(4)
    ]);

    res.status(200).json({
      success: true,
      data: {
        student: {
          name: req.user.name,
          enrollmentNo: req.user.enrollmentNo,
          department: studentDept,
          avatar: req.user.avatar
        },
        summary: {
          activeNoticesCount: departmentNotices.length,
          urgentNoticesCount: urgentNotices.length,
          bookmarkedCount
        },
        urgentNotices,
        latestNotices: departmentNotices,
        upcomingEvents: upcomingEvents.map((evt) => ({
          id: evt._id,
          title: evt.title,
          category: evt.category,
          date: evt.expiresAt ? evt.expiresAt.toLocaleDateString() : 'Active Term',
          priority: evt.priority
        }))
      }
    });
  } catch (error) {
    next(error);
  }
};
