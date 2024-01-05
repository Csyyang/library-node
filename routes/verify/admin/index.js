const express = require('express');
const router = express.Router();
const conn = require('../../../mysql/index')

const book = require('./book')
const reader = require('./reader')
const category = require('./category')
const response = require("../../../util/response");


router.use('/', (req, res,next) => {
    if (!req.session.user.isAdmin) {
        return response('权限不足', res, '01')
    }

    next()
})

// 书籍管理
router.use('/book', book)

// 读者管理
router.use('/reader', reader)


router.use('/category', category)
module.exports = router