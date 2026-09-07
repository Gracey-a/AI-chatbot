const express = require('express');
const router = express.Router();
const {
    sendMessage,
    getConversations,
    getLatestConversation,
    getConversationById,
} = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, sendMessage);
router.get('/', protect, getConversations);
router.get('/latest', protect, getLatestConversation);
router.get('/:id', protect, getConversationById);

module.exports = router;