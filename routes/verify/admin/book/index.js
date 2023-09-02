const express = require('express');
const router = express.Router();
const conn = require('../../../../mysql/index');
const { body, validationResult } = require('express-validator');
const response = require("../../../../util/response");

// 图书新增
router.post('/addBook', [
    body('title').notEmpty().withMessage('图书名称不能为空'),
    body('author').notEmpty().withMessage('作者不能为空'),
    body('publisher').notEmpty().withMessage('出版社不能为空'),
    body('publish_date').notEmpty().withMessage('出版日期不能为空'),
    body('ISBN').notEmpty().withMessage('国际标准书号不能为空'),
    body('category').notEmpty().withMessage('图书分类不能为空'),
    body('description').notEmpty().withMessage('书籍描述不能为空'),
], function (req, res, next) {
    // 参数校验
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return response(errors.array(), res, 400)
    }

    const body = req.body
    const sql = ` INSERT INTO Book (title, author, publisher, publish_date, ISBN, category, description)
    VALUES ('${body.title}', '${body.author}', '${body.publisher}', '${body.publish_date}', '${body.ISBN}', '${body.category}', '${body.description}'`;


    conn.query(sql, function (err, result) {
        if (err) { console.log("查询语句执行异常"); }
        response({}, res)
    })
});

module.exports = router