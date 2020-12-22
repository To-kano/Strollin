var express = require('express');
var router = express.Router();

const {
  CommentModel
} = require("../models/comment")

const {
    LocationModel
} = require("../models/location")

const {
    CourseModel
} = require("../models/course")

const {
    UserModel
} = require("../models/user")


router.post('/new_comment', async function(req, res) {
    let comment = null;
    let course = null;
    let location = null;
    let user = await UserModel.findOne({access_token: req.headers.access_token});

    if (!user) {
        return res.status(400).send({status: "You are not connected."});
    }
    if (!req.body.message || !req.body.score) {
        return res.status(400).send({status: "Required data missing."});
    }
    if (req.headers.location_id) {
        location = await LocationModel.findOne({_id: req.headers.location_id});
        if (!location) {
            return res.status(400).send({status: "The location ID is not valid."});            
        }
    } else if (req.headers.course_id) {
        course = await CourseModel.findOne({_id: req.headers.course_id});
        if (!course) {
            return res.status(400).send({status: "The course ID is not valid."});            
        }
    } else { 
        return res.status(400).send({status: "Please provide a location or a course or previous comment ID."});
    }
    comment = new CommentModel({
        message: req.body.message,
        author: user._id,
    });
    // Save and add ID of the comment in 
    await comment.save(async function(err, obj) {
        if (location) {
            await location.updateOne({$push: {comments_list: obj._id}});
            await user.updateOne({$push: {score_location: [obj._id, req.body.score, Date.now()]}});
        } else if (course) {
            await course.updateOne({$push: {comments_list: obj._id}});
            await user.updateOne({$push: {score_course: [obj._id, req.body.score, Date.now()]}});
        } else { 
            return res.status(400).send({status: "An error occured."});
        }
    });
    console.log("Comment added");
    return res.status(200).send({status: true});
});

router.post('/edit_comment', async function(req, res) {
    let user = await UserModel.findOne({access_token: req.headers.access_token});
    let comment = await UserModel.findOne({_id: req.headers.comment_id});

    if (!user) {
        return res.status(400).send({status: "You are not connected."});
    }
    if (!comment) {
        return res.status(400).send({status: "Comment not found."});
    }
    if (req.body.message) {
        await comment.updateOne({message: req.body.message})
        return res.status(200).send({status: "Comment edited."});
    }
    return res.status(400).send({status: "Comment not edited."});
});

router.get('/get_comment', async function(req, res) {
    let user = await UserModel.findOne({access_token: req.headers.access_token});
    let comments_list = null;

    if (!user) {
        return res.status(400).send({status: "You are not connected."});
    }
    if (req.headers.comments_list) {
        comments_list = await CommentModel.find({_id: {$in: req.headers.comments_list}});
        if (comments_list) {
            return res.status(200).send({status: "Comments found."});
        }
    }
    return res.status(400).send({status: "Comment not found."});
});


module.exports = router;