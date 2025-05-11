const Document = require('../models/Document');
const { summarizeText } = require('../utils/langchain');

const generateSummary = async (req, res) => {
  try {
    const { documentId } = req.body;
    const document = await Document.findById(documentId);
    if (!document) return res.status(404).json({ error: 'Document not found' });

    const summary = await summarizeText(document.content);
    res.json({ summary });
  } catch (error) {
    console.error('Summary error:', error);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
};

module.exports = { generateSummary };
