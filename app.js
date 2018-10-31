var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//将req.isAuthenticated()封装成中间件
var isAuthenticated = (req, res, next) => {
  if (req.headers.currentuserid !== undefined) {
    var currentUserId = req.headers.currentuserid;
    var correctToken = utilService.createToken(currentUserId);
    if (correctToken === req.headers.token) {
      return next();
    }
  } else if (req.isAuthenticated()) {
    return next();
  }
  var result = {};
  result.responCode = errorCode.ErrorCode_IsLogin_No;
  result.responMessage = errorCode.ErrorCode_IsLogin_No_Meg;
  //添加log记录 查生产问题 查完后要删掉
  if (req.url === "/findUser") {
    logger.error("findUser 用户信息接口 Header：" + JSON.stringify(req.headers) + " Response:" + JSON.stringify(result));
  }
  res.json(result);
};

app.use('/', indexRouter);
app.use('/users', usersRouter);
//register
require('./routes/register')(app);
require('./routes/userOption')(app, isAuthenticated);

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


app.listen(3000);
module.exports = app;
