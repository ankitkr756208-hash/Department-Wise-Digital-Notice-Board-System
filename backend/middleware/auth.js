const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - JWT verification
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No authorization token provided'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'The user belonging to this token no longer exists'
      });
    }

    if (user.status !== 'active') {
      return res.status(403).json({
        success: false,
        message: 'Your account is inactive or suspended. Please contact administrator'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired authorization token'
    });
  }
};

// Optional auth - attaches user if token exists, but doesn't block if absent
exports.optionalAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (user && user.status === 'active') {
      req.user = user;
    }
    next();
  } catch (error) {
    // If token invalid, still proceed as guest
    next();
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: User role '${req.user ? req.user.role : 'unauthenticated'}' is not authorized to access this resource`
      });
    }
    next();
  };
};

// Prevent unauthorized department access (department isolation)
exports.authorizeDepartment = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }

  // Admin has universal campus access
  if (req.user.role === 'admin') {
    return next();
  }

  const targetDept = req.body.department || req.params.department || req.query.department;

  if (targetDept && targetDept !== 'All' && targetDept !== req.user.department) {
    return res.status(403).json({
      success: false,
      message: `Access denied. You belong to '${req.user.department}' and cannot perform actions on department '${targetDept}'`
    });
  }

  next();
};
