const express = require('express');
const router = express.Router();
const conn = require('../mysql/index')

router.get('/', function (req, res, next) {
    const sql = "SELECT * FROM Admin";

    conn.query(sql, function (err, result) {
        if (err) { console.log("查询语句执行异常"); }
        res.send(result);
    })
});

module.exports = router