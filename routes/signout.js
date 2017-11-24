var express = require('express');
var router = express.Router();

var checkLogin = require('../middlewares/checkLoginState').checkLogin;

// GET /signout 登出
router.get('/', checkLogin, function (req, res, next) {
  req.session.user = null;
  req.flash('success', '成功登出');
  res.redirect('/posts');
})

module.exports = router;