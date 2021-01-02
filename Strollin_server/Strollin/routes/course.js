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


router.post('/new_course', async function(req, res) {

    let user = await UserModel.findOne({access_token: req.headers.access_token});
    let course = null;

    if (!user)
        return res.status(400).send({status: "You are not connected."});
    course = new CourseModel({
        locations: req.body.locations_list,
        name: req.body.name,
        author: "Strollin",
    });
    if (req.body.author)
        course.author = req.body.author;
    await course.save();
    return res.status(200).send({status: "Course created."});
});


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


module.exports = router;

