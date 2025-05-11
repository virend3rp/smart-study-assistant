const mongoose = require('mongoose');
const ChatHistorySchema = new mongoose.Schema({
  question: String,
  answer: String,
  documentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Document' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('ChatHistory', ChatHistorySchema);
