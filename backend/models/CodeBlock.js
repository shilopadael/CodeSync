const mongoose = require('mongoose');

const CodeBlockSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, required: true },
  solution: { type: String, required: false }  // Optional field for solution
});

const CodeBlock = mongoose.model('CodeBlock', CodeBlockSchema);

module.exports = CodeBlock;
