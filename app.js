var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRouter=require('./routes/category')
var branchRouter=require('./routes/branch')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/category',categoryRouter)
app.use('/branch',branchRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
/* app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
}); */

app.use(function(err, req, res, next) {
  // Log detailed error information
  console.error('=== ERROR OCCURRED ===');
  console.error('Timestamp:', new Date().toISOString());
  console.error('Request URL:', req.originalUrl);
  console.error('Request Method:', req.method);
  console.error('Request Body:', JSON.stringify(req.body, null, 2));
  console.error('Request Params:', JSON.stringify(req.params, null, 2));
  console.error('Request Query:', JSON.stringify(req.query, null, 2));
  console.error('Error Message:', err.message);
  console.error('Error Stack:', err.stack);
  console.error('=== END ERROR LOG ===\n');

  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Send error response
  res.status(err.status || 500);
  if (req.originalUrl.includes('/api') || req.accepts('json')) {
    res.json({
      status: false,
      message: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error',
      error: process.env.NODE_ENV === 'development' ? err.stack : {}
    });
  } else {
    res.render('error');
  }
});

module.exports = app;
