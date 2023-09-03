const express = require('express');
const router = express.Router();
const conn = require('../../../../mysql/index');
const queryAsync = require('../../../../mysql/queryAsync');
const { body, query, validationResult } = require('express-validator');
const response = require("../../../../util/response");

// 图书新增
router.post('/addBook', [
    body('title').notEmpty().withMessage('图书名称不能为空'),
    body('author').notEmpty().withMessage('作者不能为空'),
    body('publisher').notEmpty().withMessage('出版社不能为空'),
    body('publish_date').notEmpty().isDate().withMessage('出版日期格式不正确'),
    body('ISBN').notEmpty().withMessage('国际标准书号不能为空'),
    body('category').notEmpty().withMessage('图书分类不能为空'),
    body('description').notEmpty().withMessage('书籍描述不能为空'),
], function (req, res, next) {
    // 参数校验
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return response(errors.array(), res, '01')
    }

    const body = req.body
    const sql = `INSERT INTO book (title, author, publisher, publish_date, ISBN, category, description) VALUES ('${body.title}', '${body.author}', '${body.publisher}', '${body.publish_date}', '${body.ISBN}', '${body.category}', '${body.description}')`;

    conn.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            response({}, res, '01')
            return
        }
        response({}, res)
    })
});


// 删除
router.get('/delBook', [
    query('book_id').notEmpty().withMessage('book_id不能为空'),
], (req, res) => {
    // 参数校验
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return response(errors.array(), res, '01')
    }
    const sql = `DELETE FROM book WHERE book_id = ${req.query.book_id};`

    conn.query(sql, function (err, result) {
        console.log(result)
        if (err) {
            console.log(err);
            response(err, res, '01')
            return
        }
        if (result.affectedRows === 0) {
            return response('未找到图书', res, '01')
        }
        response({}, res)
    })
})

// 更新书籍
router.post('/updateBook', [
    body('title').notEmpty().withMessage('图书名称不能为空'),
    body('author').notEmpty().withMessage('作者不能为空'),
    body('publisher').notEmpty().withMessage('出版社不能为空'),
    body('publish_date').notEmpty().isDate().withMessage('出版日期格式不正确'),
    body('ISBN').notEmpty().withMessage('国际标准书号不能为空'),
    body('category').notEmpty().withMessage('图书分类不能为空'),
    body('description').notEmpty().withMessage('书籍描述不能为空'),
    body('status').notEmpty().withMessage('状态不能为空'),
    body('book_id').notEmpty().withMessage('book_id不能为空')
], (req, res) => {
    // 参数校验
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return response(errors.array(), res, '01')
    }


    const body = req.body
    const sql = `UPDATE book SET title = '${body.title}', author = '${body.author}',publisher = '${body.publisher}', publish_date = '${body.publish_date}', ISBN = '${body.ISBN}', category = '${body.category}',
     description = '${body.description}', status = '${body.status}' WHERE book_id = ${body.book_id};`
    conn.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            response(err, res, '01')
            return
        }
        response({}, res)
    })
})

// 获取所有图书
router.get('/allBook', [
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
    const sqlAll = `SELECT COUNT(*) as 'all' FROM book;`
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
        const sql = `SELECT *, DATE_FORMAT(publish_date, '%Y-%m-%d') AS publish_date FROM Book LIMIT ${req.query.size} OFFSET ${req.query.page - 1};`
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