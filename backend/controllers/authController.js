const User = require('../models/User');
const Department = require('../models/Department');
const ActivityLog = require('../models/ActivityLog');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      department,
      enrollmentNo,
      phone,
      role = 'student',
      accessCode
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this institutional email already exists'
      });
    }

    // Role-based security verification for privileged roles
    let assignedRole = 'student';
    if (role && role !== 'student') {
      const validCode = process.env.FACULTY_REGISTER_CODE || 'APEX2026';
      if (accessCode !== validCode) {
        return res.status(403).json({
          success: false,
          message: 'Invalid authorization code for privileged role assignment. Please contact Department Administrator'
        });
      }
      assignedRole = role;
    }

    // Determine default designation based on role
    let designation = 'Undergraduate Student';
    if (assignedRole === 'faculty') designation = 'Assistant Professor';
    if (assignedRole === 'hod') designation = 'Head of Department & Professor';
    if (assignedRole === 'admin') designation = 'System Administrator';

    // Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: assignedRole,
      department: department || 'CSE',
      designation: req.body.designation || designation,
      enrollmentNo: enrollmentNo || (assignedRole === 'student' ? '21CS' + Math.floor(100 + Math.random() * 900) : 'FAC-' + Math.floor(100 + Math.random() * 900)),
      phone: phone || ''
    });

    // Update department student or faculty count
    if (department) {
      const dept = await Department.findOne({ code: department });
      if (dept) {
        if (assignedRole === 'student') dept.studentCount += 1;
        if (assignedRole === 'faculty') dept.facultyCount += 1;
        await dept.save();
      }
    }

    // Generate JWT token
    const token = user.generateAuthToken();

    res.status(201).json({
      success: true,
      message: 'Account registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        designation: user.designation,
        enrollmentNo: user.enrollmentNo,
        avatar: user.avatar
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login user with email and password
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both institutional email and password'
      });
    }

    // Find user by email with password included
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. User not found'
      });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Incorrect password'
      });
    }

    // Verify account status
    if (user.status !== 'active') {
      return res.status(403).json({
        success: false,
        message: 'Your account is inactive or suspended'
      });
    }

    // Generate token
    const token = user.generateAuthToken();

    res.status(200).json({
      success: true,
      message: 'Authentication successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        designation: user.designation,
        enrollmentNo: user.enrollmentNo,
        avatar: user.avatar,
        phone: user.phone
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
exports.logout = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get currently logged in user profile
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name || req.user.name,
      phone: req.body.phone !== undefined ? req.body.phone : req.user.phone,
      avatar: req.body.avatar || req.user.avatar,
      designation: req.body.designation || req.user.designation
    };

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id).select('+password');

    // Check current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password provided is incorrect'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long'
      });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    next(error);
  }
};
