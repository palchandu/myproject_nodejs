var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser=require('body-parser');
var cors = require('cors');
var verify=require('./middleware/Auth');
/**
 * Base Path
 */
global.__basedir = __dirname;

/*mongoose and connect */
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/getwebsoftware')
//mongoose.connect('mongodb+srv://chandra:chandra@1991@cluster0-jjiso.mongodb.net/test?retryWrites=true')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRouter = require('./routes/category');
var postsRouter=require('./routes/posts');
var commentRouter=require('./routes/comments');
var miscRouter=require('./routes/misc');
var commonRouter=require('./routes/common');
var app = express();
app.use(cors());
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.use("/public", express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static('public'));
app.use('/images', express.static(__dirname + '/images'));
app.use(bodyParser.urlencoded({ limit: '50mb',extended: true,parameterLimit:50000 }));
app.use(bodyParser.json({limit: '50mb'}));
//app.use(verify.valid_request);
var usersAuth=[verify.user_log,verify.users_token];
app.use('/', indexRouter);
app.use('/users',usersAuth, usersRouter);
app.use('/category',categoryRouter);
app.use('/posts',postsRouter);
app.use('/comments',commentRouter);
app.use('/misc',miscRouter);
app.use('/common',commonRouter);
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

module.exports = app;
