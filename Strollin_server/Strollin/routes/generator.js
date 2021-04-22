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
    let course_model = undefined;

    if (!user) {
        return res.status(400).send({status: "You are not connected."});
    }
    if (user.reason) {
        return res.status(400).send({status: "Error in database transaction:\n", error: user});
    }

    console.log("lets EEEE", req.headers.time , req.headers.budget , " Tags: ", req.headers.tags , req.headers.coordinate);
    if (!req.headers.coordinate || !req.headers.time || !req.headers.budget || !req.headers.tags) {
        return res.status(400).send({status: "Parameter required is missing."});
    }
    let tags = req.headers.tags.split(',');

    const promise2 = algo.data.test(req.headers.time , req.headers.budget , req.headers.tags , req.headers.coordinate);
    promise2.then((value) => {
      let generated_course = value;
      console.log("course: ", generated_course);
      if (generated_course) {
        course = {locations_list: [], name: "", tags_list: []}
        for (let index in generated_course) {
            course.locations_list.push(generated_course[index].Id);
            if (index == 0) {
                course.name += generated_course[index].Name;
            } else {
                course.name += " / " + generated_course[index].Name;
            }
            for (let index2 in generated_course.Tags) {
                tags = generated_course[index].Tags[index2];
                if (!course.tags_list.includes(tag)) {
                    course.tags_list.push(tag)
                }
            }
        }
        return res.status(200).send({status: "Result of the generator.", generate_course, course});
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
router.get('/generate_popup', async function(req, res) {

    let user = await UserModel.findOne({access_token: req.headers.access_token}, "-_id id pseudo tags_list").catch(error => error);

    let popup = undefined;

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
    console.log("course: ", req.headers.course[0]);
    const promise = algo.data.pop(req.headers.coordinate, user.tags_list, req.headers.course);
    promise.then((value) => {
    })
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


// let done =  {"generated_course": [
//         {
//             "AlgAg": 0,
//             "AlgDisp": 0,
//             "City": "oui",
//             "Desc": "",
//             "Dist": 0.006075163571461594,
//             "Id": 1618336950173,
//             "Name": "Hôpital Henri-Mondor Ap-Hp",
//             "PopAg": 0,
//             "PopDisp": 0,
//             "Pos": [Array],
//             "Price": 20,
//             "Tags": [Array],
//             "TagsDisp": [Array],
//             "Time": 20
//         }]