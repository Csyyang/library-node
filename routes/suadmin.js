const express = require('express');
const router = express.Router();
const conn = require('../mysql/index')

router.get('/test', function (req, res, next) {
    res.end('ok')
});

module.exports = router