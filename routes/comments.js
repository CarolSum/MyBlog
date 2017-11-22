var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/checkLoginState').checkLogin;

// POST /comments 创建一条留言
router.post('/', checkLogin, function(req, res, next){
    res.send('创建留言');
})

// GET /comments/:commentId/remove 删除一条留言
router.get('/:commentId/remove', checkLogin, function(req, res, next){
    res.send('删除留言');
})

module.exports = router;