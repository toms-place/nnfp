/**
 * Main Application
 * - here everything is set up
 * - and middleware is imported
 * 
 * File contains:
 * - app setup
 * - routes setup
 * - view engine setup
 * - static file path setup
 * - express-framework setup
 * - fileupload setup
 * - route definition
 * 
 */

// importing express-framework
var express = require('express');
// importing middleware
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');

// app setup
var app = express();

// routes setup
var indexRouter = require('./routes/index');
var uploadRouter = require('./routes/upload');
var nnfpRouter = require('./routes/nnfp');
var burgerRouter = require('./routes/burger');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// static file path setup
app.use(express.static(path.join(__dirname, 'public')));

// express-framework setup
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

// fileupload setup
app.use(fileUpload());

// route definition
app.use('/', indexRouter);
app.use('/upload', uploadRouter);
app.use('/nnfp', nnfpRouter);
app.use('/burger', burgerRouter);

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

/**
 * catch 404 and forward to error handler
 */
app.use(function (req, res, next) {
  next(createError(404));
});

/**
 * error handler
 */
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;