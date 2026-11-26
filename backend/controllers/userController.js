const User = require('../models/User');
const Department = require('../models/Department');
const ActivityLog = require('../models/ActivityLog');

// @desc    Get all users with filtering and pagination
// @route   GET /api/users
// @access  Private (Admin, HOD for own department)
exports.getUsers = async (req, res, next) => {
  try {
    const { role, department, search, page = 1, limit = 20 } = req.query;

    const query = {};

    // HOD is restricted to users in their own department
    if (req.user.role === 'hod') {
      query.department = req.user.department;
    } else if (department && department !== 'All') {
      query.department = department;
    }

    if (role && role !== 'all') {
      query.role = role;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { enrollmentNo: { $regex: search, $options: 'i' } },
        { designation: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [users, total] = await Promise.all([
      User.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      User.countDocuments(query)
    ]);

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      data: users
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single user by ID
// @route   GET /api/users/:id
// @access  Private (Admin, HOD for own department)
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // HOD check: HOD can only view users in their own department
    if (req.user.role === 'hod' && user.department !== req.user.department) {
      return res.status(403).json({
        success: false,
        message: 'Access denied: You can only view users within your assigned department'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a user
// @route   POST /api/users
// @access  Private (Admin only)
exports.createUser = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      role = 'student',
      department = 'CSE',
      designation,
      enrollmentNo,
      phone
    } = req.body;

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'A user with this email address already exists'
      });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role,
      department,
      designation: designation || (role === 'student' ? 'Student' : role === 'faculty' ? 'Assistant Professor' : 'HOD'),
      enrollmentNo: enrollmentNo || 'USR-' + Math.floor(1000 + Math.random() * 9000),
      phone: phone || ''
    });

    // Update department member count
    const dept = await Department.findOne({ code: department });
    if (dept) {
      if (role === 'student') dept.studentCount += 1;
      if (role === 'faculty') dept.facultyCount += 1;
      await dept.save();
    }

    // Log activity
    await ActivityLog.create({
      user: req.user.id,
      userName: req.user.name,
      action: 'CREATED_USER',
      target: `${user.name} (${user.role.toUpperCase()})`,
      department: user.department,
      type: 'info'
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a user
// @route   PUT /api/users/:id
// @access  Private (Admin, HOD for their department students/faculty)
exports.updateUser = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // HOD check
    if (req.user.role === 'hod') {
      if (user.department !== req.user.department || user.role === 'admin' || user.role === 'hod') {
        return res.status(403).json({
          success: false,
          message: 'Access denied: You can only update faculty or students within your own department'
        });
      }
    }

    const { name, phone, designation, enrollmentNo, status } = req.body;
    const updateData = {};
    if (name) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (designation) updateData.designation = designation;
    if (enrollmentNo) updateData.enrollmentNo = enrollmentNo;
    if (status && req.user.role === 'admin') updateData.status = status;

    user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Private (Admin only)
exports.deleteUser = async (req, res, next) => {
  try {
    if (req.params.id === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own administrative account'
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    await User.findByIdAndDelete(req.params.id);

    // Update department counts
    if (user.department) {
      const dept = await Department.findOne({ code: user.department });
      if (dept) {
        if (user.role === 'student' && dept.studentCount > 0) dept.studentCount -= 1;
        if (user.role === 'faculty' && dept.facultyCount > 0) dept.facultyCount -= 1;
        await dept.save();
      }
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Assign or reassign department to user
// @route   PATCH /api/users/:id/department
// @access  Private (Admin only)
exports.assignDepartment = async (req, res, next) => {
  try {
    const { department } = req.body;

    if (!department) {
      return res.status(400).json({
        success: false,
        message: 'Please specify the new department code'
      });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const oldDept = user.department;
    user.department = department;
    await user.save();

    // Adjust counts
    if (oldDept && oldDept !== department) {
      const oldD = await Department.findOne({ code: oldDept });
      const newD = await Department.findOne({ code: department });
      if (oldD) {
        if (user.role === 'student' && oldD.studentCount > 0) oldD.studentCount -= 1;
        if (user.role === 'faculty' && oldD.facultyCount > 0) oldD.facultyCount -= 1;
        await oldD.save();
      }
      if (newD) {
        if (user.role === 'student') newD.studentCount += 1;
        if (user.role === 'faculty') newD.facultyCount += 1;
        await newD.save();
      }
    }

    res.status(200).json({
      success: true,
      message: `Assigned user ${user.name} to department ${department}`,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Assign user role
// @route   PATCH /api/users/:id/role
// @access  Private (Admin only)
exports.assignRole = async (req, res, next) => {
  try {
    const { role } = req.body;

    const validRoles = ['admin', 'hod', 'faculty', 'student'];
    if (!role || !validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: `Invalid role. Allowed values: ${validRoles.join(', ')}`
      });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User role updated to ${role.toUpperCase()}`,
      data: user
    });
  } catch (error) {
    next(error);
  }
};
