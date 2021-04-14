var express = require('express');
var router = express.Router();
var algo = require('../Algo/BasicAlgo2');

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
 */
router.get('/generate_course', async function(req, res) {

    let user = await UserModel.findOne({access_token: req.headers.access_token}, "-_id id pseudo").catch(error => error);

    if (!user) {
        return res.status(400).send({status: "You are not connected."});
    }
    if (user.reason) {
        return res.status(400).send({status: "Error in database transaction:\n", error: user});
    }

    console.log("lets goooooo", req.headers.time , req.headers.budget , " TAgs: ", req.headers.tags , req.headers.coordinate);
    if (!req.headers.coordinate || !req.headers.time || !req.headers.budget || !req.headers.tags) {
        return res.status(400).send({status: "Parameter required is missing."});
    }
    let tags = req.headers.tags.split(',');

    const promise2 = algo.data.test(req.headers.time , req.headers.budget , req.headers.tags , req.headers.coordinate);
    promise2.then((value) => {
      let generated_course = value;
      console.log("course: ", generated_course);
      if (generated_course) {
          return res.status(200).send({status: "Result of the generator.", generated_course});
      }
      return res.status(400).send({status: "An error occured during the generation of the course"});
    })
});

// GENERATE_POPUP
/**
 * Generate a pop-up.
 * @param {String} req.headers.access_token
 * @param {CourseObject} req.headers.course
 * @param {[String]} req.headers.coordinate
 */
router.get('/generate_popup', async function(req, res) {

    let user = await UserModel.findOne({access_token: req.headers.access_token}, "-_id id pseudo").catch(error => error);
    let popup = undefined;

    if (!user) {
        return res.status(400).send({status: "You are not connected."});
    }
    if (user.reason) {
        return res.status(400).send({status: "Error in database transaction:\n", error: user});
    }

    if (!req.headers.coordinate || !req.headers.course) {
        return res.status(400).send({status: "Parameter required is missing."});
    }

    // ACTION ICI

    return res.status(200).send({status: "Result of the pop-up generator.", popup});
});


// POPUP ANSWER
/**
 * Answer to pop-up.
 * @param {String} req.headers.access_token
 * @param {Boolean} req.headers.answer
 * @param {LocationObject} req.headers.popup
 */
router.get('/popup_answer', async function(req, res) {

    let user = await UserModel.findOne({access_token: req.headers.access_token}, "-_id id pseudo").catch(error => error);
    let popup = undefined;

    if (!user) {
        return res.status(400).send({status: "You are not connected."});
    }
    if (user.reason) {
        return res.status(400).send({status: "Error in database transaction:\n", error: user});
    }

    if (!req.headers.answer || !req.headers.popup) {
        return res.status(400).send({status: "Parameter required is missing."});
    }

    // ACTION ICI

    return res.status(200).send({status: "Result.", popup});
});


module.exports = router;
