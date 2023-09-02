var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan'); // 日志组件
const initSession = require('./util/session')

// 路由
const ordinary = require('./routes/ordinary')
const test = require('./routes/test');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // 解析URL-encoded 格式的请求体数据
app.use(cookieParser());
app.use(initSession()) // session
app.use('/public', express.static(path.join(__dirname, 'public')));

// 不需要登录
app.use('/ordinary', ordinary)

// 需要登录



// 超级管理路由

// 管理员路由

// 普通路由
app.use('/test', test)

module.exports = app;
