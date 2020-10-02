var createError = require('http-errors');
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Import Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var socketIO = require('./socketIO/socketIO');

var algo = require('./Algo/BasicAlgo2');
const { isObject } = require('util');

var app = express();


// MongoDB //

var mongoDB = 'mongodb://db:27017/Strollin';
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/*******/

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES //

app.use('/', indexRouter);
app.use('/users', usersRouter);

/******/

// SOCKET IO //
app.use(socketIO);
/*****/

app.use(express.static('public'));

const promise1 = algo.data.hello()

promise1.then((value) => {
  console.log("---------------------------------------");
  console.log("\n\n");
  console.log("You are going to: ", value);
  console.log("\n\n");
  console.log("---------------------------------------");
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

module.exports = app;
