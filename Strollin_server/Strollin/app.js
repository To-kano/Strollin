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
var imageRouter = require('./routes/image');
var mailsRouter = require('./routes/mails');

//var algo = require('./Algo/BasicAlgo');
var algo = require('./Algo/BasicAlgo2');
//var algo = require('./Algo/TwoPersonAlgo');

var tags_json = require('./Algo/Ressources/tags');
var pop = require('./Algo/PopUpAlgo');
const { isObject } = require('util');

var app = express();

// MongoDB //

// var mongoDB = 'mongodb://didier:test@db:27017/Strollin'; //Version Authentification
// var mongoDB = 'mongodb://strollin_server:strollin@127.0.0.1:27017/Strollin'; //Version Authentification Rasp
// var mongoDB = 'mongodb://strollin_server:strollin@db:27017/Strollin'; //Version Authentification Rasp with docker
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

let stats = {
  success: 0,
  failure: 0,
  unknown: 0,
  total: 0,
  users: 0,
  conversation: 0,
  message: 0,
  location: 0,
  course: 0,
  comment: 0,
  tag: 0,
  faq: 0,
  generator: 0,
  other: 0,
}

setInterval(function() {
  console.log("REQUESTS STATISTIC:\n \nRequests by route:\n\t- comment:\t" + stats.comment + "\n\t- conversation:\t" + stats.conversation + "\n\t- course:\t" + stats.course + "\n\t- faq:\t\t" + stats.faq + "\n\t- generator:\t" + stats.generator + "\n\t- location:\t" + stats.location + "\n\t- message:\t" + stats.message + "\n\t- tag:\t\t" + stats.tag + "\n\t- users:\t" + stats.users + "\n\t- other:\t" + stats.other + "\n \nRequest by answer:\n\t- Success:\t" + stats.success + "\n\t- Failure:\t" + stats.failure + "\n\t- Unknown:\t" + stats.unknown + "\n \nTotal Request:\t" + stats.total);
}, (1000 * 60 * 60 * 24))

app.use((req, res, next) => {
  let model = req.originalUrl.split('/')[1];
  switch (model) {
    case "users":
      stats.users += 1;
      break;
    case "conversation":
      stats.conversation += 1;
      break;
    case "message":
      stats.message += 1;
      break;
    case "location":
      stats.location += 1;
      break;
    case "course":
      stats.course += 1;
      break;
    case "comment":
      stats.comment += 1;
      break;
    case "tag":
      stats.tag += 1;
      break;
    case "faq":
      stats.faq += 1;
      break;
    case "generator":
      stats.generator += 1;
      break;
    default:
      stats.other += 1;
      break;
  }
  if (res.statusCode == 200) {
    stats.success += 1;
  } else if (res.statusCode == 400) {
    stats.failure += 1;
  } else {
    stats.unknown += 1;
  }
  stats.total += 1;
  next()
})

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
app.use('/image', imageRouter);
app.use('/mails', mailsRouter);

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
} = require("./models/user");
const { fail } = require('assert');

//location = LocationModel.findOne({name: req.body.name, address: req.body.address});

let tag = new TagModel({
    id: 1,
    name: "Art",
    description: "desc",
});

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

async function AddTags() {
  console.log("add tags");
  let flag = 0;
  let tags = await TagModel.find().catch(error => error);
  //console.log(tags);
  for (var i = 0; i < tags_json.tags_array.length; i++) {
    tag = new TagModel({
        id: new Number(Date.now()),
        name: tags_json.tags_array[i],
        description: "z",
    });
    for (var j = 0; j < tags.length; i++) {
      if (tags[j].name == tag.name) {
        flag = 1;
        break;
      }
    }
    if (flag != 1) {
      await tag.save();
      console.log("done : tag ", tag.name, " added");
    }
    flag = 0;
  }

}

AddTags(); //Décometner cette ligne pour ajouter la liste des tags google places a votre bdd

//TestLoc();


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
