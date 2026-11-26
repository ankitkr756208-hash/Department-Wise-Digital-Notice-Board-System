const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    notice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Notice',
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Ensure user can bookmark a specific notice only once
BookmarkSchema.index({ user: 1, notice: 1 }, { unique: true });

module.exports = mongoose.model('Bookmark', BookmarkSchema);
