var createError = require('http-errors');
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Import Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var conversationRouter = require('./routes/conversation');
var messageRouter = require('./routes/message');
var locationRouter = require('./routes/location');
var courseRouter = require('./routes/course');
var commentRouter = require('./routes/comment');
var tagRouter = require('./routes/tag');
var faqRouter = require('./routes/faq')
var generatorRouter = require('./routes/generator');

//var algo = require('./Algo/BasicAlgo');
var algo = require('./Algo/BasicAlgo2');
//var algo = require('./Algo/TwoPersonAlgo');

var pop = require('./Algo/PopUpAlgo');
const { isObject } = require('util');

var app = express();

// MongoDB //

// var mongoDB = 'mongodb://didier:test@db:27017/Strollin'; //Version Authentification
var mongoDB = 'mongodb://127.0.0.1:27017/Strollin';
//var mongoDB = 'mongodb://db:27017/Strollin';
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


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
app.use('/conversation', conversationRouter);
app.use('/message', messageRouter);
app.use('/location', locationRouter);
app.use('/course', courseRouter);
app.use('/comment', commentRouter);
app.use('/tag', tagRouter);
app.use('/faq', faqRouter);
app.use('/generator', generatorRouter);

/******/


app.use(express.static('public'));


const {
  LocationModel
} = require("./models/location")

const {
    TagModel
} = require("./models/tag")

const {
  UserModel
} = require("./models/user")

//location = LocationModel.findOne({name: req.body.name, address: req.body.address});

async function TestLoc() {
  location = new LocationModel({
      name: "Le louvre3",
      owner: "qqn",
      coordinate: ["-32", "34"],
      address: "rue descartes",
      city: "Tpurs",
      country: "FR",
      description: "desc",
      tags_list: [{"tag_id": "5feceff655b121001e405b8f", "disp": "3"}],
      price_range: "25"
  });
  await location.save();
}

//TestLoc();

tag = new TagModel({
    name: "Art",
    description: "desc",
});
//tag.save();



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
