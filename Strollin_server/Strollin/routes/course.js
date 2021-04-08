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
    LocationModel
} = require("../models/location")

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
    let user = await UserModel.findOne({access_token: req.headers.access_token}, "-_id id pseudo").catch(error => error);

    if (!user) {
        return res.status(400).send({status: "You are not connected."});
    }
    if (user.reason) {
        return res.status(400).send({status: "Error in database transaction:\n", error: user});
    }
    locations_list = await LocationModel.find({id: {$in: req.body.locations_list}}).catch(error => error)
    if (locations_list && locations_list.reason) {
        return res.status(400).send({status: "Error in the parameters for database transaction.", locations_list});
    }
    if (req.body.locations_list.length !== locations_list.length) {
        return res.status(400).send({status: "One of the locations does not exist."});
    }
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

    //Get tags from locations
    for (let index = 0; index < locations_list.length; index++) {
        for (let index2 = 0; index2 < locations_list[index].tags_list.length; index2++) {
            tag = locations_list[index].tags_list[index2];
            if (!course.tags_list.includes(tag.id)) {
                course.tags_list.push(tag.id)
            }
        }
    }

    let error = await course.save().catch(error => error);
    if (error.errors) {
        return res.status(400).send({status: "Error in database transaction:\n", error});
    }
    return res.status(200).send({status: "Course created."});
});


// GET_COURSE
/**
 * get a list of courses
 * @param {String} req.headers.access_token
 * @param {String} req.headers.sort
 * @param {Number} req.headers.tendency_range (optional)
 */
router.get('/get_course', async function(req, res) {
    let courses_list = undefined;
    let user = await UserModel.findOne({access_token: req.headers.access_token}, "-_id id pseudo").catch(error => error);

    if (!user) {
        return res.status(400).send({status: "You are not connected."});
    }
    if (user.reason) {
        return res.status(400).send({status: "Error in database transaction:\n", error: user});
    }

    if (req.headers.sort) {
        if (req.headers.sort === "name") {
            courses_list = await CourseModel.find({}).sort("name").catch(error => error);
        }
        else if (req.headers.sort === "popularity") {
            courses_list = await CourseModel.find({}).sort("number_used").catch(error => error);
        }
        else if (req.headers.sort === "score") {
            courses_list = await CourseModel.find({}).sort("score").catch(error => error);
        }
        else if (req.headers.sort === "tendency") {
            let tendency_range = req.headers.tendency_range;
            if (!tendency_range || isNaN(tendency_range)) {
                tendency_range = 30;
            }
            let tendency_date = new Number(Date.now() - (1000 * 60 * 60 * 24 * tendency_range));
            let comments_list = await CommentModel.find(
                {
                    course_id: {$ne: ""},
                    modification_date: {$gt: tendency_date}
                },
            ).catch(error => error);
            if (comments_list && comments_list.reason) {
                return res.status(400).send({status: "Error in database transaction:\n", error: comments_list});
            }
            let course_dict = {};
            for (let index = 0; index < comments_list.length; index++) {
                if (!(comments_list[index].course_id in course_dict)) {
                    course_dict[comments_list[index].course_id] = 1;
                } else {
                    course_dict[comments_list[index].course_id] += 1
                }
            }
            courses_list = [];
            let course = undefined;
            let highest_key = undefined;
            let highest_value = 0;
            while (Object.entries(course_dict).length !== 0) {
                highest_value = 0;
                for (const [key, value] of Object.entries(course_dict)) {
                    if (highest_value < value) {
                        highest_value = value;
                        highest_key = key;
                    }
                }
                course = await CourseModel.find({id: highest_key}).catch(error => error);
                if (course && course.reason) {
                    return res.status(400).send({status: "Error in database transaction:\n", error: course});
                }
                courses_list.push(course);
                delete course_dict[highest_key];
            }
        }
        if (courses_list && courses_list.reason) {
            return res.status(400).send({status: "Error in database transaction:\n", error: comments_list});
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
 * Get course(s) by ID
 * @param {String} req.headers.access_token
 * @param {CourseID || [CourseID]} req.headers.courses_id_list
 */
router.get('/get_courses_by_id', async function(req, res) {
    let user = await UserModel.findOne({access_token: req.headers.access_token}, "-_id id pseudo").catch(error => error);

    if (!user) {
        return res.status(400).send({status: "You are not connected."});
    }
    if (user.reason) {
        return res.status(400).send({status: "Error in database transaction:\n", error: user});
    }

    let given_list = req.headers.courses_id_list.split(',');
    let courses_list = await CourseModel.find({id: {$in: given_list}}).catch(error => error);
    if (courses_list.reason) {
        return res.status(400).send({status: "Error in the parameters for database transaction.", courses_list});
    } else if (courses_list.length > 0) {
        return res.status(200).send({status: "Course(s) found.", courses_list});
    } else {
        return res.status(400).send({status: "Course(s) not found.", courses_list});
    }
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
        await CourseModel.updateOne({id: course.id}, {$push: {time_spent: req.body.time_spent}});
        return res.status(200).send({status: "Course time spent added."});
    }
    return res.status(400).send({status: "Error"});
});


module.exports = router;
