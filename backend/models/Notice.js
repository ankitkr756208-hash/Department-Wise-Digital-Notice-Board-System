const mongoose = require('mongoose');

const NoticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide notice title'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    slug: {
      type: String,
      trim: true
    },
    content: {
      type: String,
      required: [true, 'Please provide notice body content']
    },
    excerpt: {
      type: String,
      trim: true
    },
    department: {
      type: String,
      required: [true, 'Please specify target department (or "All")'],
      trim: true,
      default: 'All'
    },
    category: {
      type: String,
      required: [true, 'Please select a notice category'],
      lowercase: true,
      enum: {
        values: [
          'examination',
          'events',
          'placement',
          'workshop',
          'holiday',
          'general',
          'academic',
          'sports',
          'administration'
        ],
        message: '{VALUE} is not a valid notice category'
      },
      default: 'general'
    },
    priority: {
      type: String,
      lowercase: true,
      enum: {
        values: ['low', 'medium', 'high', 'urgent', 'normal'],
        message: '{VALUE} is not a valid priority level'
      },
      default: 'medium'
    },
    status: {
      type: String,
      lowercase: true,
      enum: {
        values: ['pending', 'approved', 'rejected'],
        message: '{VALUE} is not a valid notice status'
      },
      default: 'pending'
    },
    targetAudience: {
      type: String,
      trim: true,
      default: 'All Students'
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    rejectionReason: {
      type: String,
      default: ''
    },
    attachments: [
      {
        name: { type: String, required: true },
        url: { type: String, required: true },
        size: { type: String, default: '1.0 MB' },
        type: { type: String, default: 'pdf' }
      }
    ],
    viewsCount: {
      type: Number,
      default: 0
    },
    isPinned: {
      type: Boolean,
      default: false
    },
    publishedAt: {
      type: Date,
      default: null
    },
    expiresAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

// Auto-generate slug and excerpt before save if not present
NoticeSchema.pre('save', function (next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
  if (!this.excerpt && this.content) {
    this.excerpt = this.content.substring(0, 150).trim() + '...';
  }
  next();
});

// Indexes for high performance filtering
NoticeSchema.index({ department: 1, status: 1 });
NoticeSchema.index({ category: 1, priority: 1 });
NoticeSchema.index({ publishedAt: -1 });

module.exports = mongoose.model('Notice', NoticeSchema);
