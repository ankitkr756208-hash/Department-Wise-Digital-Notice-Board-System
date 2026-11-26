const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  assignDepartment,
  assignRole
} = require('../controllers/userController');

const { protect, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');

// All user routes require authentication
router.use(protect);

router
  .route('/')
  .get(authorize('admin', 'hod'), getUsers)
  .post(
    authorize('admin'),
    [
      body('name').trim().notEmpty().withMessage('Name is required'),
      body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
      body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
      body('role').isIn(['admin', 'hod', 'faculty', 'student']).withMessage('Invalid role'),
      body('department').notEmpty().withMessage('Department is required')
    ],
    validate,
    createUser
  );

router
  .route('/:id')
  .get(authorize('admin', 'hod'), getUserById)
  .put(authorize('admin', 'hod'), updateUser)
  .delete(authorize('admin'), deleteUser);

router.patch(
  '/:id/department',
  authorize('admin'),
  [body('department').notEmpty().withMessage('Department code is required')],
  validate,
  assignDepartment
);

router.patch(
  '/:id/role',
  authorize('admin'),
  [body('role').isIn(['admin', 'hod', 'faculty', 'student']).withMessage('Invalid role')],
  validate,
  assignRole
);

module.exports = router;
