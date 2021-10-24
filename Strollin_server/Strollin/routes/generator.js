var express = require('express');
var router = express.Router();
var algo = require('../Algo/BasicAlgo2');
var pop = require('../Algo/PopUpAlgo');

const {
    UserModel
} = require("../models/user")

// GENERATE_COURSE
/**
 * Generate a course.
 * @param {String} req.headers.access_token
 * @param {String} req.headers.time
 * @param {String} req.headers.budget
 * @param {[String]} req.headers.tags
 * @param {[String]} req.headers.coordinate
 * @param {String} req.headers.eat
 * @param {String} req.headers.radius
 * @param {String} req.headers.placenbr
 * @param {[String]} req.headers.locations_list
 * @param {String} req.headers.is18
 * @param {String} req.headers.temptags
 * @param {String} req.headers.friendstags
 */
router.get('/generate_course', async function(req, res) {

    let user = await UserModel.findOne({access_token: req.headers.access_token}, "-_id id pseudo").catch(error => error);
    let course = undefined;
    let radius = Number(req.headers.radius)
    let placeNbr = Number(req.headers.placenbr)
    let locations_list = []

    console.log("placenbr: ", req.headers.placenbr);
    console.log("time: ", req.headers.time);
    console.log("budget: ", req.headers.budget);
    console.log("tags: ", req.headers.tags);
    console.log("coordinate: ", req.headers.coordinate);
    console.log("eat: ", req.headers.eat);
    console.log("radius: ", req.headers.radius);
    console.log("locations_list: ", req.headers.locations_list);
    console.log("Is18: ", req.headers.is18);
    console.log("tempTags: ", req.headers.temptags);
    console.log("friendtags: ", req.headers.friendstags);

    let friendstags = req.headers.friendstags;
    let userTags = req.headers.tags;
    var friendflag = false;

    if (!user) {
        return res.status(400).send({status: "You are not connected."});
    }
    if (user.reason) {
        return res.status(400).send({status: "Error in database transaction:\n", error: user});
    }

    if (!req.headers.coordinate || !req.headers.time || !req.headers.budget || !req.headers.tags) {
        return res.status(400).send({status: "Parameter required is missing."});
    }

    let tags = req.headers.tags.split(',');
    if (req.headers.locations_list) {
      locations_list = req.headers.locations_list.split(',');
      //console.log("locations_list: ", locations_list);
    }

    if (req.headers.temptags) {
      console.log("USING TEMPORARY TAGS");
      userTags = req.headers.temptags
    }

    if (friendstags) {
      var friendsArray = friendstags.split(',')
      var tagsArray = userTags.split(',')
      var prioFriends = [];

      console.log("friendsArray: ", friendsArray);
      for (var i = 0; i < friendsArray.length; i++) {
        for (var j = 0; j < tagsArray.length; j++) {
          if (friendsArray[i] == tagsArray[j]) {
            prioFriends.push(friendsArray[i])
            tagsArray.splice(j, 1);
            break;
          }
        }
      }
      userTags = tagsArray.join()
      friendflag = true;
      console.log("prioFriends: ", prioFriends);
    }

    console.log("userTags: ", userTags);
    const promise2 = algo.data.algo(req.headers.time , req.headers.budget , userTags, req.headers.coordinate, req.headers.eat, radius, placeNbr, locations_list, req.headers.is18, prioFriends, friendflag, friendsArray);
    promise2.then((value) => {
      let generated_course = value;
      console.log("course: ", generated_course);

      // A OPTI
      if (generated_course) {
        course = {locations_list: [], name: (generated_course[0].name + " => " + generated_course[generated_course.length - 1].name), tags_list: []}
        for (let index in generated_course) {
            course.locations_list.push(generated_course[index].id);
            for (let index2 in generated_course.tags_list) {
                tags = generated_course[index].tags_list[index2]._id;
                if (!course.tags_list.includes(tag)) {
                    course.tags_list.push(tag)
                }
            }
        }
        return res.status(200).send({status: "Result of the generator.", generated_course, course});
      }
      return res.status(400).send({status: "An error occured during the generation of the course"});
    })
});

// GENERATE_POPUP
/**
 * Generate a pop-up.
 * @param {String} req.headers.access_token
 * @param {[String]} req.headers.coordinate
 *
 * @param {CourseObject} req.body.course
 */
router.post('/generate_popup', async function(req, res) {

    let user = await UserModel.findOne({access_token: req.headers.access_token}, "-_id id pseudo tags_list").catch(error => error);

    let popup = undefined;

    //console.log("heyyyyy: ", req.body.course, " : ", req.headers.coordinate);
    if (!user) {
        return res.status(400).send({status: "You are not connected."});
    }
    if (user.reason) {
        return res.status(400).send({status: "Error in database transaction:\n", error: user});
    }

    if (!req.headers.coordinate || !req.body.course) {
        return res.status(400).send({status: "Parameter required is missing."});
    }

    // ACTION ICI
    const promise = algo.data.pop(req.headers.coordinate, user.tags_list, req.body.course);
    promise.then((value) => {
      //console.log("valuer: ", value);
      let popup = value
      return res.status(200).send({status: "Result of the pop-up generator.", popup});
    })

});


// POPUP ANSWER
/**
 * Answer to pop-up.
 * @param {String} req.headers.access_token
 * @param {Boolean} req.headers.answer
 *
 * @param {LocationObject} req.body.popup
 * @param {CourseObject} req.body.course
 */
router.post('/popup_answer', async function(req, res) {

    let user = await UserModel.findOne({access_token: req.headers.access_token}, "-_id id pseudo").catch(error => error);
    let popup = undefined;

    if (!user) {
        return res.status(400).send({status: "You are not connected."});
    }
    if (user.reason) {
        return res.status(400).send({status: "Error in database transaction:\n", error: user});
    }

    console.log("popup : ", req.body.popup)
    if (!req.headers.answer || !req.body.popup || !req.body.course) {
        return res.status(400).send({status: "Parameter required is missing."});
    }

    // ACTION ICI
    pop.data.Response(req.body.popup)

    return res.status(200).send({status: "Result.", popup});
});

// recover places
/**
 * Recover places with user tags and add them to the DB
 * @param {String} req.headers.access_token
 * @param {String} req.headers.coordinates
 * @param {String} req.headers.tag
 */
router.get('/recover_places', async function(req, res) {
  console.log("GENERATE PLACES");
  var coordinate = req.headers.coordinates.split(",")
  console.log("coordinate: ", coordinate);
  console.log("tag: ", req.headers.tag);

  algo.data.places(coordinate, req.headers.tag);
  console.log("I AM REEEEEEEEEEEEALLLLLLY OUT");
  return res.status(200).send({status: "Result."});
});

module.exports = router;
