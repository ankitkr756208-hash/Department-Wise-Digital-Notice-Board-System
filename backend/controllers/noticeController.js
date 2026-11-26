const Notice = require('../models/Notice');
const ActivityLog = require('../models/ActivityLog');
const Department = require('../models/Department');

// Normalizer for priority and category
const normalizePriority = (p) => {
  if (!p) return 'medium';
  const val = p.toLowerCase();
  if (val === 'urgent') return 'high';
  if (val === 'normal') return 'medium';
  return val;
};

const normalizeCategory = (c) => {
  if (!c) return 'general';
  const val = c.toLowerCase();
  if (val === 'examinations') return 'examination';
  if (val === 'placements') return 'placement';
  return val;
};

// @desc    Get all notices with RBAC, filters and pagination
// @route   GET /api/notices
// @access  Public / Authenticated
exports.getNotices = async (req, res, next) => {
  try {
    const {
      department,
      category,
      priority,
      status,
      search,
      page = 1,
      limit = 10,
      sort = 'latest'
    } = req.query;

    const query = {};

    // 1. Role-Based Visibility Rules
    if (!req.user || req.user.role === 'student') {
      // Students and unauthenticated guests only see approved notices
      query.status = 'approved';
      if (req.user && req.user.department) {
        // Enforce student's department or campus-wide
        if (department && department !== 'All') {
          query.department = department;
        } else {
          query.department = { $in: [req.user.department, 'All'] };
        }
      } else if (department && department !== 'All') {
        query.department = department;
      }
    } else if (req.user.role === 'faculty') {
      // Faculty sees approved notices for their department/'All', OR any notice they authored
      const deptFilter = req.user.department;
      if (status) {
        query.status = status;
        if (status === 'pending' || status === 'rejected') {
          query.author = req.user.id;
        } else {
          query.department = { $in: [deptFilter, 'All'] };
        }
      } else {
        query.$or = [
          { status: 'approved', department: { $in: [deptFilter, 'All'] } },
          { author: req.user.id }
        ];
      }
    } else if (req.user.role === 'hod') {
      // HOD sees all notices in their department, plus campus-wide approved notices
      const hodDept = req.user.department;
      if (status) {
        query.status = status;
        query.department = hodDept;
      } else {
        query.$or = [
          { department: hodDept },
          { department: 'All', status: 'approved' }
        ];
      }
    } else if (req.user.role === 'admin') {
      // Admin has unrestricted view
      if (department && department !== 'All') {
        query.department = department;
      }
      if (status && status !== 'all') {
        query.status = status;
      }
    }

    // 2. Category filter
    if (category && category !== 'All' && category !== 'all') {
      query.category = normalizeCategory(category);
    }

    // 3. Priority filter
    if (priority && priority !== 'All' && priority !== 'all') {
      query.priority = normalizePriority(priority);
    }

    // 4. Search query
    if (search) {
      const searchRegex = { $regex: search, $options: 'i' };
      if (query.$or) {
        // Combine with existing $or
        query.$and = [
          { $or: query.$or },
          {
            $or: [
              { title: searchRegex },
              { content: searchRegex },
              { excerpt: searchRegex }
            ]
          }
        ];
        delete query.$or;
      } else {
        query.$or = [
          { title: searchRegex },
          { content: searchRegex },
          { excerpt: searchRegex }
        ];
      }
    }

    // 5. Sorting
    let sortOptions = { publishedAt: -1, createdAt: -1 };
    if (sort === 'oldest') sortOptions = { publishedAt: 1, createdAt: 1 };
    if (sort === 'views') sortOptions = { viewsCount: -1 };
    if (sort === 'urgent') sortOptions = { priority: -1, createdAt: -1 };

    const skip = (Number(page) - 1) * Number(limit);

    const [notices, total] = await Promise.all([
      Notice.find(query)
        .populate('author', 'name email designation department avatar')
        .populate('approvedBy', 'name email designation')
        .sort(sortOptions)
        .skip(skip)
        .limit(Number(limit)),
      Notice.countDocuments(query)
    ]);

    res.status(200).json({
      success: true,
      count: notices.length,
      total,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      data: notices
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get notice by ID or Slug
// @route   GET /api/notices/:id
// @access  Public / Authenticated
exports.getNoticeById = async (req, res, next) => {
  try {
    let notice;
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      notice = await Notice.findById(req.params.id)
        .populate('author', 'name email designation department avatar phone')
        .populate('approvedBy', 'name email designation');
    } else {
      notice = await Notice.findOne({ slug: req.params.id })
        .populate('author', 'name email designation department avatar phone')
        .populate('approvedBy', 'name email designation');
    }

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: 'Notice circular not found'
      });
    }

    // Role check for unapproved notices
    if (notice.status !== 'approved') {
      if (!req.user) {
        return res.status(403).json({
          success: false,
          message: 'Access denied: This circular is pending administrative approval'
        });
      }
      const isAuthor = notice.author._id.toString() === req.user.id;
      const isDeptHod = req.user.role === 'hod' && notice.department === req.user.department;
      const isAdmin = req.user.role === 'admin';

      if (!isAuthor && !isDeptHod && !isAdmin) {
        return res.status(403).json({
          success: false,
          message: 'Access denied: Notice is not yet approved'
        });
      }
    }

    // Increment view count
    notice.viewsCount += 1;
    await notice.save();

    res.status(200).json({
      success: true,
      data: notice
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a notice
// @route   POST /api/notices
// @access  Private (Admin, HOD, Faculty)
exports.createNotice = async (req, res, next) => {
  try {
    const {
      title,
      content,
      excerpt,
      department,
      category,
      priority,
      targetAudience,
      attachments,
      expiresAt,
      isPinned
    } = req.body;

    // Department isolation: Faculty can only post for their own department
    let targetDept = department || req.user.department;
    if (req.user.role === 'faculty') {
      targetDept = req.user.department;
    } else if (req.user.role === 'hod') {
      if (department && department !== 'All' && department !== req.user.department) {
        return res.status(403).json({
          success: false,
          message: `HOD of ${req.user.department} cannot create notices for ${department}`
        });
      }
      targetDept = req.user.department;
    }

    // Determine initial approval status based on role
    const isAutoApproved = req.user.role === 'admin' || req.user.role === 'hod';
    const status = isAutoApproved ? 'approved' : 'pending';

    const notice = await Notice.create({
      title,
      content,
      excerpt: excerpt || content.substring(0, 150) + '...',
      department: targetDept,
      category: normalizeCategory(category),
      priority: normalizePriority(priority),
      status,
      targetAudience: targetAudience || 'All Department Students',
      author: req.user.id,
      approvedBy: isAutoApproved ? req.user.id : null,
      publishedAt: isAutoApproved ? new Date() : null,
      expiresAt: expiresAt ? new Date(expiresAt) : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      attachments: attachments || [],
      isPinned: isPinned || false
    });

    // Populate author
    await notice.populate('author', 'name email designation department avatar');

    // Audit log
    await ActivityLog.create({
      user: req.user.id,
      userName: req.user.name,
      action: isAutoApproved ? 'PUBLISHED_NOTICE' : 'SUBMITTED_NOTICE',
      target: notice.title,
      department: notice.department,
      type: isAutoApproved ? 'success' : 'info'
    });

    res.status(201).json({
      success: true,
      message: isAutoApproved
        ? 'Notice published live on digital board'
        : 'Notice submitted successfully for HOD approval',
      data: notice
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a notice
// @route   PUT /api/notices/:id
// @access  Private (Author, Department HOD, Admin)
exports.updateNotice = async (req, res, next) => {
  try {
    let notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({ success: false, message: 'Notice not found' });
    }

    const isAuthor = notice.author.toString() === req.user.id;
    const isDeptHod = req.user.role === 'hod' && notice.department === req.user.department;
    const isAdmin = req.user.role === 'admin';

    if (!isAuthor && !isDeptHod && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Access denied: You do not have permission to edit this notice'
      });
    }

    const {
      title,
      content,
      excerpt,
      department,
      category,
      priority,
      targetAudience,
      attachments,
      expiresAt,
      isPinned
    } = req.body;

    if (title) notice.title = title;
    if (content) notice.content = content;
    if (excerpt !== undefined) notice.excerpt = excerpt;
    if (category) notice.category = normalizeCategory(category);
    if (priority) notice.priority = normalizePriority(priority);
    if (targetAudience) notice.targetAudience = targetAudience;
    if (attachments) notice.attachments = attachments;
    if (expiresAt) notice.expiresAt = new Date(expiresAt);
    if (isPinned !== undefined) notice.isPinned = isPinned;

    if (department && (isAdmin || isDeptHod)) {
      notice.department = department;
    }

    await notice.save();
    await notice.populate('author', 'name email designation department avatar');

    res.status(200).json({
      success: true,
      message: 'Notice updated successfully',
      data: notice
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a notice
// @route   DELETE /api/notices/:id
// @access  Private (Author, Department HOD, Admin)
exports.deleteNotice = async (req, res, next) => {
  try {
    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({ success: false, message: 'Notice not found' });
    }

    const isAuthor = notice.author.toString() === req.user.id;
    const isDeptHod = req.user.role === 'hod' && notice.department === req.user.department;
    const isAdmin = req.user.role === 'admin';

    if (!isAuthor && !isDeptHod && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Access denied: You do not have permission to delete this notice'
      });
    }

    await Notice.findByIdAndDelete(req.params.id);

    // Audit log
    await ActivityLog.create({
      user: req.user.id,
      userName: req.user.name,
      action: 'DELETED_NOTICE',
      target: notice.title,
      department: notice.department,
      type: 'warning'
    });

    res.status(200).json({
      success: true,
      message: 'Notice circular deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Approve a notice
// @route   PATCH /api/notices/:id/approve
// @access  Private (HOD for their department, Admin)
exports.approveNotice = async (req, res, next) => {
  try {
    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({ success: false, message: 'Notice not found' });
    }

    // Check department authority for HOD
    if (req.user.role === 'hod' && notice.department !== req.user.department && notice.department !== 'All') {
      return res.status(403).json({
        success: false,
        message: `Access denied: As HOD of ${req.user.department}, you can only approve notices for your department`
      });
    }

    notice.status = 'approved';
    notice.approvedBy = req.user.id;
    notice.publishedAt = new Date();
    notice.rejectionReason = '';
    await notice.save();

    await notice.populate('author', 'name email designation department avatar');
    await notice.populate('approvedBy', 'name email designation');

    // Audit log
    await ActivityLog.create({
      user: req.user.id,
      userName: req.user.name,
      action: 'APPROVED_NOTICE',
      target: notice.title,
      department: notice.department,
      type: 'success'
    });

    res.status(200).json({
      success: true,
      message: `Notice '${notice.title}' has been approved and published`,
      data: notice
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reject a notice
// @route   PATCH /api/notices/:id/reject
// @access  Private (HOD for their department, Admin)
exports.rejectNotice = async (req, res, next) => {
  try {
    const { reason = 'Notice requires revision before publishing' } = req.body;
    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({ success: false, message: 'Notice not found' });
    }

    // Check department authority for HOD
    if (req.user.role === 'hod' && notice.department !== req.user.department && notice.department !== 'All') {
      return res.status(403).json({
        success: false,
        message: `Access denied: As HOD of ${req.user.department}, you can only reject notices for your department`
      });
    }

    notice.status = 'rejected';
    notice.rejectionReason = reason;
    await notice.save();

    // Audit log
    await ActivityLog.create({
      user: req.user.id,
      userName: req.user.name,
      action: 'REJECTED_NOTICE',
      target: notice.title,
      department: notice.department,
      type: 'error',
      details: { reason }
    });

    res.status(200).json({
      success: true,
      message: `Notice '${notice.title}' has been returned to faculty with feedback`,
      data: notice
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload attachment file for notice
// @route   POST /api/notices/upload
// @access  Private (Admin, HOD, Faculty)
exports.uploadAttachment = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    const fileSizeMB = (req.file.size / (1024 * 1024)).toFixed(2) + ' MB';
    const fileType = req.file.mimetype.includes('pdf') ? 'pdf' : 'image';

    res.status(200).json({
      success: true,
      message: 'Attachment uploaded successfully',
      data: {
        name: req.file.originalname,
        url: fileUrl,
        size: fileSizeMB,
        type: fileType
      }
    });
  } catch (error) {
    next(error);
  }
};
