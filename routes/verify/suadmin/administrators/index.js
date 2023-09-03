const express = require('express');
const router = express.Router();
const conn = require('../../../../mysql/index');
const queryAsync = require('../../../../mysql/queryAsync');
const { body, query, validationResult } = require('express-validator');
const response = require("../../../../util/response");

// 新增管理员
router.post('/addAdmin', [
    body('username').notEmpty().withMessage('账号不能为空'),
    body('name').notEmpty().withMessage('用户名不能为空'),
    body('password').notEmpty().withMessage('密码不能为空'),
    body('role').notEmpty().withMessage('权限不能为空'),
    ], function (req, res, next) {
    // 参数校验
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return response(errors.array(), res, '01')
    }

    const body = req.body
    const sql = `INSERT INTO admin (username, name, password, role ) VALUES ('${body.username}', '${body.name}', '${body.password}', '${body.role}')`;

    conn.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            response({}, res, '01')
            return
        }
        response({}, res)
    })
});


// 删除管理员
router.get('/delAdmin', [
    query('admin_id').notEmpty().withMessage('admin_id不能为空'),
], (req, res) => {
    // 参数校验
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return response(errors.array(), res, '01')
    }
    const sql = `DELETE FROM admin WHERE admin_id = ${req.query.admin_id};`

    conn.query(sql, function (err, result) {
        console.log(result)
        if (err) {
            console.log(err);
            response(err, res, '01')
            return
        }
        if (result.affectedRows === 0) {
            return response('未找此用户', res, '01')
        }
        response({}, res)
    })
})

// 更新管理员
router.post('/upAdmin', [
    body('admin_id').notEmpty().withMessage('admin_id不能为空'),
    body('username').notEmpty().withMessage('账号不能为空'),
    body('name').notEmpty().withMessage('用户名不能为空'),
    body('password').notEmpty().withMessage('密码不能为空'),
    body('role').notEmpty().withMessage('权限不能为空'),
], (req, res) => {
    // 参数校验
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return response(errors.array(), res, '01')
    }


    const body = req.body
    const sql = `UPDATE admin SET username = '${body.username}', name = '${body.name}',password = '${body.password}', role = '${body.role}' WHERE admin_id = ${body.admin_id};`
    conn.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            response(err, res, '01')
            return
        }
        response({}, res)
    })
})

// 获取管理员
router.get('/allAdmins', [
    query('size').isInt().withMessage('size格式错误'),
    query('page').isInt().withMessage('page格式错误'),
], async (req, res) => {
    // 参数校验
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return response(errors.array(), res, '01')
    }
    const resObj = {}

    // --获取总记录数
    const sqlAll = `SELECT COUNT(*) as 'all' FROM admin;`
    try {
        const all = await queryAsync(sqlAll)
        console.log(all)
        resObj.all = all[0].all
    } catch (error) {
        console.log(error);
        response(error, res, '01')
        return
    }

    try {
        const sql = `SELECT * FROM admin LIMIT ${req.query.size} OFFSET ${req.query.page - 1};`
        const sqlList = await queryAsync(sql)

        resObj.list = sqlList
        response(resObj, res)
    } catch (error) {
        console.log(error);
        response(error, res, '01')
        return
    }
})


module.exports = router