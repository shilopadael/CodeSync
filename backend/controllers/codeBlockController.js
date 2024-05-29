const CodeBlock = require('../models/CodeBlock');

// Get all code blocks
exports.getCodeBlocks = async (req, res) => {
  try {
    console.log('Get all code blocks');
    const codeBlocks = await CodeBlock.find();
    console.log(codeBlocks);
    res.json(codeBlocks);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Create a new code block
exports.createCodeBlock = async (req, res) => {
  try {
    const newCodeBlock = new CodeBlock(req.body);
    await newCodeBlock.save();
    res.status(201).json(newCodeBlock);
  } catch (err) {
    res.status(400).send(err);
  }
};
