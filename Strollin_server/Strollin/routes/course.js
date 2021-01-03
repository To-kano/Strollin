var express = require('express');
var router = express.Router();

const {
    CourseModel
} = require("../models/course")

const {
    UserModel
} = require("../models/user")

const {
    TagModel
} = require("../models/tag")


// NEW_COURSE
/**
 * Create a new course
 * @param {String} req.headers.access_token
 *
 * @param {[LocationID]} req.body.locations_list
 * @param {String} req.body.name
 * @param {UserID} req.body.author (Optional)
 * @param {String} req.body.time_spent (Optional)
 */
router.post('/new_course', async function(req, res) {

    let user = await UserModel.findOne({access_token: req.headers.access_token});
    let course = null;
    let tag = null;

    if (!user)
        return res.status(400).send({status: "You are not connected."});
    course = new CourseModel({
        locations: req.body.locations_list,
        name: req.body.name,
        author: "Strollin",
        tags_list: [],
        time_spent: req.body.time_spent
    });
    if (req.body.author)
        course.author = req.body.author;

    for (let index = 0; index < locations_list.length; index++) {
        for (let index2 = 0; index2 < locations_list[index].tags_list.length; index2++) {
            tag = locations_list[index].tags_list[index2];
            if (!course.tags_list.includes(tag)) {
                course.tags_list.push(tag)
            }
        }
    }
    await course.save();
    return res.status(200).send({status: "Course created."});
});


// GET_COURSE
/**
 * get a list of courses
 * @param {String} req.headers.access_token
 * @param {String} req.headers.sort
 */
router.get('/get_course', async function(req, res) {
    let user = await UserModel.findOne({access_token: req.headers.access_token});
    let courses_list = null;

    if (!user)
        return res.status(400).send({status: "You are not connected."});
    if (req.headers.sort) {
        if (req.headers.sort === "name") {
            courses_list = await CourseModel.find().sort("name");
        }
        else if (req.headers.sort === "popularity") {
            courses_list = await CourseModel.find().sort("number_used");
        }
        else if (req.headers.sort === "score") {
            courses_list = await CourseModel.find().sort("score");
        }
        return res.status(200).send({status: "Success", courses_list})
    }
    return res.status(400).send({status: "Please send a research's sort."});
});



// EXCEPTIONAL ROUTE

// NEW_COURSE_TIME
/**
 * Create a new course for time_spent test
 * @param {String} req.body.name
 */
router.post('/new_course_time', async function(req, res) {

    let course = null;

    course = new CourseModel({
        locations: ["test"],
        name: req.body.name,
        author: "Strollin",
    });
    await course.save();
    return res.status(200).send({status: "Course created."});
});


// ADD_COURSE_TIME
/**
 * Add in a course a time_spent test
 * @param {String} req.headers.course_id
 *
 * @param {String} req.body.time_spent
 */
router.post('/add_course_time', async function(req, res) {

    let course = await CourseModel.findOne({_id: req.headers.course_id});
    console.log(req.body)
    if (course) {
        await course.updateOne({$push: {time_spent: req.body.time_spent}});
        return res.status(200).send({status: "Course created."});
    }
    return res.status(400).send({status: "Error"});
});


module.exports = router;
