var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs= require('fs');
var io = require('./socket')
var dBase=require('./dBase');
var http = require('http');
var bodyParser= require('body-parser');
var multer=  require('multer');
var upload = multer();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const port = 80;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', port);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/file/:name',(req,res)=>{
  var filename=req.params.name;
  res.sendFile(__dirname+'/uploads/'+filename)
});

app.post('/', upload.array(),function(req,res){
  var user=req.body.user;
  var pass=req.body.pass;
 dBase.Check(user,pass,(result,data)=>{
    if (result) {
      res.render('chat',{getId:data._id.toString()})
    }else {
      res.render('login',{msg:'يوجد خطأ في اسم المستخدم أو كلمة المرور'})
    }
    res.end();
  });
 });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var server = http.createServer(app);
io.start(server);
server.listen(port);
