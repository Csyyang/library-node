const express = require('express');
const router = express.Router();
const conn = require('../../mysql/index');
const { body, validationResult } = require('express-validator');
const response = require("../../util/response");

// 登录
router.post('/login', [
    // 使用express-validator中间件来验证参数
    body('username').notEmpty().withMessage('账号不能为空'),
    body('password').notEmpty().withMessage('密码不能为空'),
], (req, res,) => {
    // 参数校验
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return response(errors.array(), res, 400)
    }
    const sql = `SELECT * FROM admin WHERE username = '${req.body.username}' AND password = '${req.body.password}';`

    conn.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            return response(err, res, '01')
        }
        if (!result?.length) {
            response('账号或密码错误', res, '01')
        } else {
            const user = result[0]
            req.session.user = user
            response(user, res)
        }
    })

})

module.exports = router;
