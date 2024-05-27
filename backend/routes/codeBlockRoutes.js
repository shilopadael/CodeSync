const express = require('express');
const router = express.Router();
const { getCodeBlocks, createCodeBlock } = require('../controllers/codeBlockController');

router.get('/', getCodeBlocks);
router.post('/', createCodeBlock);

module.exports = router;
