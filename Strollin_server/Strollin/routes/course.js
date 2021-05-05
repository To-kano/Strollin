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
        //name: req.body.name,
        name: req.body.name.toLowerCase(),
        author_id: user.id,
        author_pseudo: user.pseudo,
        tags_list: [],
    });

    //Get tags from locations and price range
    let min_price = 0;
    let max_price = 0;
    let avg_price = 0;
    for (let index = 0; index < locations_list.length; index++) {
        if (!isNaN(Number(locations_list[index].price_range[0]))) {
            min_price += Number(locations_list[index].price_range[0]);
            // min_price += Number(locations_list[index].price_range[0].match(/\d+/g).map(Number));
        }
        if (!isNaN(Number(!locations_list[index].price_range[1]))) {
            max_price += Number(locations_list[index].price_range[1]);
            // max_price += Number(locations_list[index].price_range[1].match(/\d+/g).map(Number));
        }
        if (!isNaN(Number(locations_list[index].price_range[2]))) {
            avg_price += Number(locations_list[index].price_range[2]);
            // avg_price += Number(locations_list[index].price_range[2].match(/\d+/g).map(Number));
        }
        for (let index2 = 0; index2 < locations_list[index].tags_list.length; index2++) {
            tag = locations_list[index].tags_list[index2];
            if (!course.tags_list.includes(tag._id || tag.id)) {
                course.tags_list.push(tag._id || tag.id)
            }
        }
    }
    course.price_range = [min_price.toString(), max_price.toString(), avg_price.toString()];

    let error = await course.save().catch(error => error);
    if (error.errors) {
        return res.status(400).send({status: "Error in database transaction:\n", error});
    }
    return res.status(200).send({status: "Course created.", course});
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
        if (req.headers.sort.toLowerCase() === "name") {
            courses_list = await CourseModel.find({}).sort("name").catch(error => error);
        }
        else if (req.headers.sort.toLowerCase() === "popularity") {
            courses_list = await CourseModel.find({}).sort("number_used").catch(error => error);
        }
        else if (req.headers.sort.toLowerCase() === "score") {
            courses_list = await CourseModel.find({}).sort("score").catch(error => error);
        }
        else if (req.headers.sort.toLowerCase() === "tendency") {
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
                course = await CourseModel.findOne({id: highest_key}).catch(error => error);
                if (course && course.reason) {
                    return res.status(400).send({status: "Error in database transaction:\n", error: course});
                }
                courses_list.push(course);
                delete course_dict[highest_key];
            }
        }
        if (courses_list && courses_list.reason) {
            return res.status(400).send({status: "Error in database transaction:\n", error: courses_list});
        }
        return res.status(200).send({status: "List of courses returned.", courses_list})
    }
    return res.status(400).send({status: "Please send a research's sort."});
});


// GET_USER_HISTORIC
/**
 * Get the user's course historic and return a list of Course Object
 * @param {String} req.headers.access_token
 * @param {Number} req.headers.size
 */
router.get('/get_user_historic', async function(req, res) {

    let course_historic = [];
    let course = undefined;
    let size = undefined;
    let user = await UserModel.findOne({access_token: req.headers.access_token}, "-_id id pseudo course_historic").catch(error => error);
  
    if (!user) {
        return res.status(400).send({status: "You are not connected."});
    }
    if (user.reason) {
        return res.status(400).send({status: "Error in database transaction:\n", error: user});
    }
    if (!req.headers.size || req.headers.size <= 0) {
        size = 10;
    } else {
        size = req.headers.size;
    }
    for (let index = 0; index < size && index < user.course_historic.length; index++) {
        course = undefined;
        course = await CourseModel.findOne({id: user.course_historic[index][0]}).catch(error => error);
        console.log(course);
        if (!course) {
            console.log("Course not found.");
            size += 1;
        } else if (course.reason) {
            return res.status(400).send({status: "Error in database transaction:\n", error: course});
        } else {
            course_historic.push(course)
        }
    }
    return res.status(200).send({status: "Course historic sent." , course_historic});
});
  

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
    console.log("given list = ", given_list);
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
        name: req.body.name.toLowerCase(),
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
