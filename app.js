var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');


var login = require('./routes/login/login');
var home = require('./routes/home');
var logout = require('./routes/login/logout');
var stuRoute = require('./routes/stu/stuRoute');
var userDAO = require('./DAO/userDAO');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: "111",//"111"代表加密
    resave: false,
    name: 'user_ID',
    saveUninitialized: true,
    maxAge: 10*60*1000,
    cookie: { secure: false }
}));
app.use(express.static(path.join(__dirname,'')));


app.get('/',function(req, res){
    res.redirect('login');
});

//用户登陆跳转
app.use('/login', login);
app.use('/home',home);
app.use('/logout',logout);
//ctrl stu route
app.use('/stu',stuRoute);
//get student's own paper
app.get('/stuOwnInfo',function(req, res){
    var sql = "select sid,sname,sex from student_info where sid = " + req.cookies["userID"];
    userDAO.showStuOwnInfoQueryByID(sql,function(err, result){
        res.send({paperInfo: result[0] });
    });
});
//get student's own information
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
