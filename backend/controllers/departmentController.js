const Department = require('../models/Department');
const User = require('../models/User');
const Notice = require('../models/Notice');
const ActivityLog = require('../models/ActivityLog');

// @desc    Get all departments
// @route   GET /api/departments
// @access  Public (or Authenticated)
exports.getDepartments = async (req, res, next) => {
  try {
    const departments = await Department.find()
      .populate('hod', 'name email avatar designation')
      .sort({ code: 1 });

    // Dynamically calculate and refresh active notices and users count
    const enriched = await Promise.all(
      departments.map(async (dept) => {
        const [activeNotices, facultyTotal, studentTotal] = await Promise.all([
          Notice.countDocuments({
            department: { $in: [dept.code, 'All'] },
            status: 'approved'
          }),
          User.countDocuments({ department: dept.code, role: 'faculty' }),
          User.countDocuments({ department: dept.code, role: 'student' })
        ]);

        const obj = dept.toObject();
        obj.activeNoticesCount = activeNotices;
        obj.facultyCount = facultyTotal;
        obj.studentCount = studentTotal;
        return obj;
      })
    );

    res.status(200).json({
      success: true,
      count: enriched.length,
      data: enriched
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single department by ID or Code
// @route   GET /api/departments/:id
// @access  Public
exports.getDepartmentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    let department;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      department = await Department.findById(id).populate('hod', 'name email avatar designation phone');
    } else {
      department = await Department.findOne({ code: id.toUpperCase() }).populate('hod', 'name email avatar designation phone');
    }

    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }

    const [activeNotices, facultyMembers, studentsCount] = await Promise.all([
      Notice.countDocuments({ department: department.code, status: 'approved' }),
      User.find({ department: department.code, role: 'faculty' }).select('name email avatar designation phone status'),
      User.countDocuments({ department: department.code, role: 'student' })
    ]);

    const result = department.toObject();
    result.activeNoticesCount = activeNotices;
    result.facultyMembers = facultyMembers;
    result.studentCount = studentsCount;

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new department
// @route   POST /api/departments
// @access  Private (Admin only)
exports.createDepartment = async (req, res, next) => {
  try {
    const { code, name, description, color, accentColor, hodId } = req.body;

    const existingDept = await Department.findOne({ code: code.toUpperCase() });
    if (existingDept) {
      return res.status(400).json({
        success: false,
        message: `Department with code '${code.toUpperCase()}' already exists`
      });
    }

    let hodUser = null;
    if (hodId) {
      hodUser = await User.findById(hodId);
    }

    const department = await Department.create({
      code: code.toUpperCase(),
      name,
      description: description || '',
      color: color || 'blue',
      accentColor: accentColor || '#3b82f6',
      hod: hodUser ? hodUser._id : null,
      hodName: hodUser ? hodUser.name : '',
      hodEmail: hodUser ? hodUser.email : '',
      hodAvatar: hodUser ? hodUser.avatar : 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'
    });

    // If HOD user provided, ensure their role is 'hod' and department updated
    if (hodUser) {
      hodUser.role = 'hod';
      hodUser.department = department.code;
      await hodUser.save();
    }

    // Audit log
    await ActivityLog.create({
      user: req.user.id,
      userName: req.user.name,
      action: 'CREATED_DEPARTMENT',
      target: `${department.code} - ${department.name}`,
      department: department.code,
      type: 'success'
    });

    res.status(201).json({
      success: true,
      message: 'Department created successfully',
      data: department
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update department
// @route   PUT /api/departments/:id
// @access  Private (Admin only)
exports.updateDepartment = async (req, res, next) => {
  try {
    let department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }

    const { name, description, color, accentColor, hodId } = req.body;
    const updateData = {};
    if (name) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (color) updateData.color = color;
    if (accentColor) updateData.accentColor = accentColor;

    if (hodId) {
      const hodUser = await User.findById(hodId);
      if (hodUser) {
        updateData.hod = hodUser._id;
        updateData.hodName = hodUser.name;
        updateData.hodEmail = hodUser.email;
        updateData.hodAvatar = hodUser.avatar;

        hodUser.role = 'hod';
        hodUser.department = department.code;
        await hodUser.save();
      }
    }

    department = await Department.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Department updated successfully',
      data: department
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete department
// @route   DELETE /api/departments/:id
// @access  Private (Admin only)
exports.deleteDepartment = async (req, res, next) => {
  try {
    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }

    // Check if there are active notices or users
    const [noticeCount, userCount] = await Promise.all([
      Notice.countDocuments({ department: department.code }),
      User.countDocuments({ department: department.code })
    ]);

    if (noticeCount > 0 || userCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete department: It still has ${userCount} associated users and ${noticeCount} notices. Reassign or delete them first`
      });
    }

    await Department.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: `Department ${department.code} deleted successfully`
    });
  } catch (error) {
    next(error);
  }
};
