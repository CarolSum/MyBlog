var express = require('express');
var router = express.Router();

var checkLogin = require('../middlewares/checkLoginState').checkLogin;

// GET /signout 登出
router.get('/', checkLogin, function (req, res, next) {
  delete req.session.user;
  res.send('登出');
})

module.exports = router;