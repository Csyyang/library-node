const mysql = require('mysql');

const sqlConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'library'
}
let conn
function handleDisconnect() {
    conn = mysql.createConnection(sqlConfig)
    // 连接数据库
    conn.connect(function (err) {
        if (err) { console.log("连接失败") };
        console.log("连接成功,当前连接线程ID" + conn.threadId);
    })

    conn.on('error', function (err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}

handleDisconnect();


//导出
module.exports = conn;