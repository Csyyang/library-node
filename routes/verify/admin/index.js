const express = require('express');
const router = express.Router();
const conn = require('../../../mysql/index')

const book = require('./book')

// 书籍管理
router.use('/',book)

module.exports = router