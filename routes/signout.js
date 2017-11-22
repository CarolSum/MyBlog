var express = require('express');
var router = express.Router();

var checkLogin = require('../middlewares/checkLoginState').checkLogin;

// GET /signout 登出
router.get('/', checkLogin, function (req, res, next) {
  res.send('登出');
})

module.exports = router;