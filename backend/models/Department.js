const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, 'Please provide department code (e.g. CSE, ECE)'],
      unique: true,
      uppercase: true,
      trim: true,
      maxlength: [10, 'Department code cannot exceed 10 characters']
    },
    name: {
      type: String,
      required: [true, 'Please provide full department name'],
      trim: true
    },
    description: {
      type: String,
      trim: true,
      default: ''
    },
    hod: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    hodName: {
      type: String,
      default: ''
    },
    hodEmail: {
      type: String,
      default: ''
    },
    hodAvatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    },
    color: {
      type: String,
      default: 'blue'
    },
    accentColor: {
      type: String,
      default: '#3b82f6'
    },
    facultyCount: {
      type: Number,
      default: 0
    },
    studentCount: {
      type: Number,
      default: 0
    },
    activeNoticesCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Department', DepartmentSchema);
