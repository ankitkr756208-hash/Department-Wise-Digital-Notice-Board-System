const Bookmark = require('../models/Bookmark');
const Notice = require('../models/Notice');

// @desc    Bookmark a notice
// @route   POST /api/bookmarks/:noticeId
// @access  Private (All authenticated roles)
exports.bookmarkNotice = async (req, res, next) => {
  try {
    const { noticeId } = req.params;

    // Check if notice exists
    const notice = await Notice.findById(noticeId);
    if (!notice) {
      return res.status(404).json({
        success: false,
        message: 'Notice circular not found'
      });
    }

    // Check if already bookmarked
    const existing = await Bookmark.findOne({
      user: req.user.id,
      notice: noticeId
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Notice is already bookmarked'
      });
    }

    const bookmark = await Bookmark.create({
      user: req.user.id,
      notice: noticeId
    });

    res.status(201).json({
      success: true,
      message: 'Notice saved to bookmarks',
      data: bookmark
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove bookmark
// @route   DELETE /api/bookmarks/:noticeId
// @access  Private
exports.removeBookmark = async (req, res, next) => {
  try {
    const { noticeId } = req.params;

    const result = await Bookmark.findOneAndDelete({
      user: req.user.id,
      notice: noticeId
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Bookmark not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Notice removed from bookmarks'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all bookmarked notices for user
// @route   GET /api/bookmarks
// @access  Private
exports.getBookmarks = async (req, res, next) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.user.id })
      .populate({
        path: 'notice',
        populate: {
          path: 'author',
          select: 'name email designation department avatar'
        }
      })
      .sort({ createdAt: -1 });

    // Filter out any bookmarks where the notice might have been deleted
    const validBookmarks = bookmarks
      .filter((b) => b.notice !== null)
      .map((b) => b.notice);

    res.status(200).json({
      success: true,
      count: validBookmarks.length,
      data: validBookmarks
    });
  } catch (error) {
    next(error);
  }
};
