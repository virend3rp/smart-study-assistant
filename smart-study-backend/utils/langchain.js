const { HuggingFaceInference } = require("@langchain/community/llms/hf");

const model = new HuggingFaceInference({
  model: "mistralai/Mistral-7B-Instruct-v0.1",
  temperature: 0.7,
  maxTokens: 1024,
  apiKey: process.env.HUGGINGFACEHUB_API_KEY,
});

async function askQuestion(documentText, question) {
  const prompt = `You are an assistant. Based on the following document:\n\n${documentText}\n\nAnswer the question: ${question}`;
  const response = await model.invoke(prompt);
  return response;
}

async function summarizeText(documentText) {
  const prompt = `Summarize the following text in a few paragraphs:\n\n${documentText}`;
  const response = await model.invoke(prompt);
  return response;
}

module.exports = { askQuestion, summarizeText };
