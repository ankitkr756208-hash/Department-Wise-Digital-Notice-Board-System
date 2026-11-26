const mongoose = require('mongoose');

const ActivityLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    userName: {
      type: String,
      default: 'System'
    },
    action: {
      type: String,
      required: true
    },
    target: {
      type: String,
      required: true
    },
    department: {
      type: String,
      default: 'All'
    },
    type: {
      type: String,
      enum: ['success', 'info', 'warning', 'error', 'default'],
      default: 'info'
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  },
  {
    timestamps: true
  }
);

ActivityLogSchema.index({ createdAt: -1 });

module.exports = mongoose.model('ActivityLog', ActivityLogSchema);
