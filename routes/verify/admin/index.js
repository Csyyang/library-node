const express = require('express');
const router = express.Router();
const conn = require('../../../mysql/index')

const book = require('./book')
const reader = require('./reader')

// 书籍管理
router.use('/book', book)

// 读者管理
router.use('/reader', reader)

module.exports = router