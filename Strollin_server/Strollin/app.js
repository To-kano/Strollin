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

//var algo = require('./Algo/BasicAlgo');
var algo = require('./Algo/BasicAlgo2');
//var algo = require('./Algo/TwoPersonAlgo');

var pop = require('./Algo/PopUpAlgo');
const { isObject } = require('util');

var app = express();

// MongoDB //

var mongoDB = 'mongodb://db:270);17/Strollin';
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

/******/


app.use(express.static('public'));


const {
  LocationModel
} = require("./models/location")

const {
    TagModel
} = require("./models/tag")

async function getTags() {
  let query = {};
  let locations_list = null
  let true_list = []
  let tags = []
  let tagslist = []
  let test = []

  locations_list = await LocationModel.find(query)
  console.log("locations ///////////////: ", locations_list);
  for (var i = 0; i < locations_list.length; i++) {
    tags = []
    tagslist = []
    for (var j = 0; j < locations_list[i].tags_list.length; j++) {
      test = []
      tags[j] = locations_list[i].tags_list[j]._id
      if (!locations_list[i].tags_list[j].disp) {
        test.push(locations_list[i].tags_list[j]._id)
        test.push(0)
      } else {
        test.push(locations_list[i].tags_list[j]._id)
        test.push(locations_list[i].tags_list[j].disp)
      }
      tagslist.push(test)
    }
    true_list.push({
      Tags: tags,
      Pos: [Number(locations_list[i].coordinate[0]), Number(locations_list[i].coordinate[1])],
      Name: locations_list[i].name,
      Dist: 0,
      Price: locations_list[i].price_range[0],
      PopDisp: Number(locations_list[i].pop_disp),
      PopAg: Number(locations_list[i].pop_ag),
      AlgDisp: Number(locations_list[i].alg_disp),
      AlgAg: Number(locations_list[i].alg_ag),
      TagsDisp: tagslist,
      Desc: locations_list[i].description
    })
  }
  for (var i = 0; i < true_list.length; i++) {
    console.log("please: ", true_list[i]);
  }
  const promise1 = algo.data.hello(true_list)

  promise1.then((value) => {
    console.log("---------------------------------------");
    console.log("\n\n");
    console.log("You are going to: ", value);
    console.log("\n\n");
    console.log("---------------------------------------");
    pop.data.Popup(value)
  });
}

getTags();

//location = LocationModel.findOne({name: req.body.name, address: req.body.address});

async function TestLoc() {
  location = new LocationModel({
      name: "Le louvre2",
      owner: "qqn",
      coordinate: ["-32", "34"],
      address: "rue descartes",
      city: "Tpurs",
      country: "FR",
      description: "desc",
      tags_list: [{"_id": "5feceff655b121001e405b8f", "disp": "1"}],
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
