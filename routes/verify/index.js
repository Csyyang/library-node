const express = require('express');
const router = express.Router();
const conn = require('../../mysql/index')
const response = require("../../util/response");
const suadmin = require("./suadmin")
const admin = require("./admin")

// 登录校验
router.use('/', (req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        response('未登录', res, 400)
    }
})


// 普通路由
// 登出
router.get('/logout', function (req, res, next) {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            res.end(err)
        } else {
            response({}, res)
        }
    });
});

// 超级管理路由
router.use('/suadmin', suadmin)
// 管理员路由
router.use('/admin', admin)

module.exports = router