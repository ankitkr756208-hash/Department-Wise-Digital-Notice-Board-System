const express = require('express');
const router = express.Router();

const {
  bookmarkNotice,
  removeBookmark,
  getBookmarks
} = require('../controllers/bookmarkController');

const { protect } = require('../middleware/auth');

// All bookmark actions require authentication
router.use(protect);

router.get('/', getBookmarks);
router.post('/:noticeId', bookmarkNotice);
router.delete('/:noticeId', removeBookmark);

module.exports = router;
