var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan'); // 日志组件

// 路由
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const test = require('./routes/test');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // 解析URL-encoded 格式的请求体数据
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/test', test)

module.exports = app;
