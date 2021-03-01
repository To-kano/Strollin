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

    let user = await UserModel.findOne({access_token: req.headers.access_token}, "_id pseudo");
    let course = null;
    let tag = null;
    let locations_list = null;

    if (!user) {
        return res.status(400).send({status: "You are not connected."});
    }
    // locations_list = await CourseModel.find({_id: {$in: req.body.locations_list}})
    // if (req.body.locations_list.length() !== locations_list.length()) {
    //     return res.status(400).send({status: "One of the locations does not exist."});
    // }
    course = new CourseModel({
        locations_list: req.body.locations_list,
        name: req.body.name,
        author: user,
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
    let user = await UserModel.findOne({access_token: req.headers.access_token});
    let courses_list = undefined;

    if (!user) {
        return res.status(400).send({status: "You are not connected."});
    }
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
        else if (req.headers.sort === "tendency") {
            let tendency_date = Date.now() - (1000 * 60 * 60 * 24 * 7)
            let comments_list = await CommentModel.find(
                {
                    course_id: {$ne: ""},
                    creation_date: {$gt: tendency_date.toString()}
                }
            );
            let courses_id_list = [];
            for (let index = 0; index < comments_list.length; index++) {
                if (!courses_id_list.includes(comments_list[index].course_id)) {
                    courses_id_list.push(comments_list[index].course_id)
                }
            }
            courses_list = await CourseModel.find({_id: {$in: courses_id_list}})
        }
        for (let i in courses_list) {
            courses_list[i].creation_date = Date(courses_list[i].creation_date)
        }
        return res.status(200).send({status: "List of courses returned.", courses_list})
    }
    return res.status(400).send({status: "Please send a research's sort."});
});


// GET_CUSTOM_COURSE
/**
 * get a list of courses
 * @param {String} req.headers.access_token
 * @param {String} req.headers.sort
 */
// router.get('/get_custom_course', async function(req, res) {
//     let user = await UserModel.findOne({access_token: req.headers.access_token});
//     let courses_list = undefined;

//     if (!user)
//         return res.status(400).send({status: "You are not connected."});
//     if (req.headers.sort) {
//         if (req.headers.sort === "name") {
//             courses_list = await CourseModel.find().sort("name");
//         }
//         else if (req.headers.sort === "popularity") {
//             courses_list = await CourseModel.find().sort("number_used");
//         }
//         else if (req.headers.sort === "score") {
//             courses_list = await CourseModel.find().sort("score");
//         }
//         else if (req.headers.sort === "tendancy") {
//             let comments_list = await CommentModel.find(
//                 {
//                     course_id: {$ne: ""},
//                     creation_date: {$gt: (Date.now() - (1000 * 60 * 60 * 24 * 7) )}
//                 }
//             );
//             let courses_id_list = [];
//             for (let index = 0; index < comments_list.length(); index++) {
//                 if (!courses_id_list.includes(comments_list[index].course_id)) {
//                     courses_id_list.push(comments_list[index].course_id)
//                 }
//             }
//             courses_list = await CourseModel.find({_id: {$in: courses_id_list}})
//         }
//         return res.status(200).send({status: "Success", courses_list})
//     }
//     return res.status(400).send({status: "Please send a research's sort."});
// });




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
    if (course) {
        await course.updateOne({$push: {time_spent: req.body.time_spent}});
        return res.status(200).send({status: "Course created."});
    }
    return res.status(400).send({status: "Error"});
});


module.exports = router;
