const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment
} = require('../controllers/departmentController');

const { protect, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');

router
  .route('/')
  .get(getDepartments)
  .post(
    protect,
    authorize('admin'),
    [
      body('code').trim().notEmpty().withMessage('Department code (e.g. CSE) is required'),
      body('name').trim().notEmpty().withMessage('Department name is required')
    ],
    validate,
    createDepartment
  );

router
  .route('/:id')
  .get(getDepartmentById)
  .put(protect, authorize('admin'), updateDepartment)
  .delete(protect, authorize('admin'), deleteDepartment);

module.exports = router;
