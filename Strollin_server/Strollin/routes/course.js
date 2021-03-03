var express = require('express');
var router = express.Router();

const {
    CourseModel
} = require("../models/course")

const {
    UserModel
} = require("../models/user")

const {
    CommentModel
} = require("../models/comment")

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

    let course = null;
    let tag = null;
    let locations_list = null;
    let user = await UserModel.findOne({access_token: req.headers.access_token}, "-_id id pseudo");

    if (!user) {
        return res.status(400).send({status: "You are not connected."});
    }
    // locations_list = await CourseModel.find({id: {$in: req.body.locations_list}})
    // if (req.body.locations_list.length() !== locations_list.length()) {
    //     return res.status(400).send({status: "One of the locations does not exist."});
    // }
    course = new CourseModel({
        id: new Number(Date.now()),
        creation_date: new Date().toLocaleDateString("fr-FR"),
        locations_list: req.body.locations_list,
        name: req.body.name,
        author_id: user.id,
        author_pseudo: user.pseudo,
        tags_list: [],
    });
    if (req.body.time_spent)
        course.time_spent = req.body.time_spent

    // for (let index = 0; index < locations_list.length; index++) {
    //     for (let index2 = 0; index2 < locations_list[index].tags_list.length; index2++) {
    //         tag = locations_list[index].tags_list[index2];
    //         if (!course.tags_list.includes(tag)) {
    //             course.tags_list.push(tag)
    //         }
    //     }
    // }
    let error = await course.save().catch(error => error);
    if (error.errors) {
        return res.status(400).send({status: error.errors});
    }
    return res.status(200).send({status: "Course created."});
});


// GET_COURSE
/**
 * get a list of courses
 * @param {String} req.headers.access_token
 * @param {String} req.headers.sort
 */
router.get('/get_course', async function(req, res) {
    let courses_list = undefined;
    let user = await UserModel.findOne({access_token: req.headers.access_token});

    if (!user) {
        return res.status(400).send({status: "You are not connected."});
    }
    if (req.headers.sort) {
        if (req.headers.sort === "name") {
            courses_list = await CourseModel.find({}).sort("name");
        }
        else if (req.headers.sort === "popularity") {
            courses_list = await CourseModel.find({}).sort("number_used");
        }
        else if (req.headers.sort === "score") {
            courses_list = await CourseModel.find({}).sort("score");
        }
        else if (req.headers.sort === "tendency") {
            let tendency_date = new Number(Date.now() - (1000 * 60 * 60 * 24 * 7));
            let comments_list = await CommentModel.find(
                {
                    course_id: {$ne: ""},
                    modification_date: {$gt: tendency_date}
                },
            );
            let courses_id_list = [];
            for (let index = 0; index < comments_list.length; index++) {
                if (!courses_id_list.includes(comments_list[index].course_id)) {
                    courses_id_list.push(comments_list[index].course_id)
                }
            }
            courses_list = await CourseModel.find({id: {$in: courses_id_list}})
        }
        return res.status(200).send({status: "List of courses returned.", courses_list})
    }
    return res.status(400).send({status: "Please send a research's sort."});
});


// GET_CUSTOM_COURSE
/**
 * get a list of courses
 * @param {String} req.headers.access_token
 */
// router.get('/get_custom_course', async function(req, res) {
// });


// GET_COURSES_BY_ID
/**
 * Get the list of locations in database
 * @param {String} req.headers.access_token
 * @param {CourseID || [CourseID]} req.headers.courses_id_list
 */
router.get('/get_courses_by_id', async function(req, res) {

    let user = await UserModel.findOne({access_token: req.headers.access_token});
    let courses_list = [];
    let list = req.headers.courses_id_list;
    const projection = "-_id";

    if (!user) {
        return res.status(400).send({status: "You are not connected."});
    }
    if (list.includes(',')) {
        list = list.split(',')
        for (let index = 0; index < list.length; index++) {
            course = await CourseModel.find({id: list[index]}, projection);
            if (course) {
                courses_list.push(course[0]);
            }
        }
    } else if (typeof list == "string") {
        courses_list = await CourseModel.findOne({id: list}, projection);
    } else {
        return res.status(400).send({status: "Parameter provided is invalid."});
    }
    return res.status(200).send({status: "List of courses returned.", courses_list});
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

    let course = await CourseModel.findOne({id: req.headers.course_id});
    if (course) {
        await course.updateOne({$push: {time_spent: req.body.time_spent}});
        return res.status(200).send({status: "Course created."});
    }
    return res.status(400).send({status: "Error"});
});


module.exports = router;
