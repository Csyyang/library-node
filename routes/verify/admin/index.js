const express = require('express');
const router = express.Router();
const conn = require('../../../mysql/index')

const book = require('./book')
const reader = require('./reader')
const category = require('./category')

// 书籍管理
router.use('/book', book)

// 读者管理
router.use('/reader', reader)


router.use('/category', category)
module.exports = router