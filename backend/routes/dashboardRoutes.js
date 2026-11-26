const express = require('express');
const router = express.Router();

const {
  getAdminStats,
  getHodStats,
  getFacultyStats,
  getStudentStats
} = require('../controllers/dashboardController');

const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.get('/admin', authorize('admin'), getAdminStats);
router.get('/hod', authorize('admin', 'hod'), getHodStats);
router.get('/faculty', authorize('admin', 'hod', 'faculty'), getFacultyStats);
router.get('/student', authorize('admin', 'hod', 'faculty', 'student'), getStudentStats);

module.exports = router;
