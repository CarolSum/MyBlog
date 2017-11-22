var express = require('express');
var router = express.Router();
var checkNotLogin = require('../middlewares/checkLoginState').checkNotLogin;

// GET /signin 登录页
router.get('/', checkNotLogin, function(req, res, next){
    res.send('登录页');
})

// POST /signin 用户登录
router.post('/', checkNotLogin, function(req, res, next){
    res.send('登录');
})

module.exports = router;