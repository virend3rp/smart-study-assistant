const express = require('express');
const multer = require('multer');
const { uploadDocument } = require('../controllers/documentController');
const { handleQuestion, getChatHistory } = require('../controllers/chatController');
const { generateSummary } = require('../controllers/summaryController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Routes
router.post('/upload-pdf', upload.single('file'), uploadDocument);
router.post('/ask-question', handleQuestion);
router.post('/get-summary', generateSummary);
router.get('/chat-history', getChatHistory);

module.exports = router;
