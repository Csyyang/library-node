var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.post('/login', (req, res,) => {
  const sql = "SELECT * FROM users WHERE username = '提供的用户名' AND password_hash = SHA2('提供的密码', 256);"

  res.send()
})

module.exports = router;
