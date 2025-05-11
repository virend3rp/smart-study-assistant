const fs = require('fs');
const pdfParse = require('pdf-parse');
const Document = require('../models/Document');

const uploadDocument = async (req, res) => {
  try {
    const dataBuffer = fs.readFileSync(req.file.path);
    const data = await pdfParse(dataBuffer);
    const doc = await Document.create({
      name: req.file.originalname,
      content: data.text,
    });

    fs.unlinkSync(req.file.path); // Clean up uploaded file
    res.json({ documentId: doc._id });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload and parse document' });
  }
};

module.exports = { uploadDocument };
