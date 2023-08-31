const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'library'
})
// 连接数据库
conn.connect(function (err) {
    if (err) { console.log("连接失败") };
    console.log("连接成功,当前连接线程ID" + conn.threadId);
})
//导出
module.exports = conn;