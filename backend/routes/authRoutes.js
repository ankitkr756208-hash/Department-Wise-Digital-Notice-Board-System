const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const {
  register,
  login,
  logout,
  getMe,
  updateProfile,
  changePassword
} = require('../controllers/authController');

const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');

// Public routes
router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Full name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email address is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('department').optional().trim()
  ],
  validate,
  register
);

router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  validate,
  login
);

// Protected routes
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);

router.put(
  '/profile',
  protect,
  [
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    body('phone').optional().trim()
  ],
  validate,
  updateProfile
);

router.put(
  '/change-password',
  protect,
  [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword')
      .isLength({ min: 6 })
      .withMessage('New password must be at least 6 characters long')
  ],
  validate,
  changePassword
);

module.exports = router;
