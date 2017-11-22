var express = require('express');
var router = express.Router();
var jade = require('jade');

router.get('/:name', function(req, res){
    res.render('users', {name: req.params.name});
})

module.exports = router;