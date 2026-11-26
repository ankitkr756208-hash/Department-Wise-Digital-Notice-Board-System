const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const {
  getNotices,
  getNoticeById,
  createNotice,
  updateNotice,
  deleteNotice,
  approveNotice,
  rejectNotice,
  uploadAttachment
} = require('../controllers/noticeController');

const { protect, authorize, optionalAuth } = require('../middleware/auth');
const validate = require('../middleware/validate');
const upload = require('../middleware/upload');

// Public / RBAC Notice Exploration
router
  .route('/')
  .get(optionalAuth, getNotices)
  .post(
    protect,
    authorize('admin', 'hod', 'faculty'),
    [
      body('title').trim().notEmpty().withMessage('Notice title is required'),
      body('content').trim().notEmpty().withMessage('Notice body content is required'),
      body('department').notEmpty().withMessage('Department is required')
    ],
    validate,
    createNotice
  );

// Attachment upload
router.post(
  '/upload',
  protect,
  authorize('admin', 'hod', 'faculty'),
  upload.single('file'),
  uploadAttachment
);

router
  .route('/:id')
  .get(optionalAuth, getNoticeById)
  .put(protect, authorize('admin', 'hod', 'faculty'), updateNotice)
  .delete(protect, authorize('admin', 'hod', 'faculty'), deleteNotice);

// Approval and rejection endpoints
router.patch('/:id/approve', protect, authorize('admin', 'hod'), approveNotice);
router.patch('/:id/reject', protect, authorize('admin', 'hod'), rejectNotice);

module.exports = router;
