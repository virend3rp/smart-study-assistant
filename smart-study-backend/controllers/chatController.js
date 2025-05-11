const Document = require('../models/Document');
const ChatHistory = require('../models/ChatHistory');
const { askQuestion } = require('../utils/langchain');

const handleQuestion = async (req, res) => {
  try {
    const { documentId, question } = req.body;
    const document = await Document.findById(documentId);
    if (!document) return res.status(404).json({ error: 'Document not found' });

    const answer = await askQuestion(document.content, question);
    await ChatHistory.create({ documentId, question, answer });

    res.json({ answer });
  } catch (error) {
    console.error('Question error:', error);
    res.status(500).json({ error: 'Failed to process question' });
  }
};

const getChatHistory = async (req, res) => {
  try {
    const { documentId } = req.query;
    const history = await ChatHistory.find({ documentId }).sort({ createdAt: -1 });
    res.json({ history });
  } catch (error) {
    console.error('History error:', error);
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
};

module.exports = { handleQuestion, getChatHistory };
