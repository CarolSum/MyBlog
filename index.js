var path = require('path');
var express = require('express');
var app = express();
var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/',indexRouter);
app.use('/users',userRouter);

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something Wrong!');
})

app.listen(3000);
console.log('server listening on : 3000 port.');
