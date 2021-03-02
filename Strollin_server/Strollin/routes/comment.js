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


// NEW_COMMENT
/**
 * Register a new comment with a score
 * @param {String} req.headers.access_token
 * @param {LocationID} req.headers.location_id (if not course_id)
 * @param {CourseID} req.headers.course_id (if not location_id)
 * 
 * @param {String} req.body.message
 * @param {String} req.body.score
 * 
 * TODO : ADD score in location/course
 */
router.post('/new_comment', async function(req, res) {
    let comment = null;
    let course = null;
    let location = null;
    let user = await UserModel.findOne({access_token: req.headers.access_token}, "-_id id pseudo");

    if (!user) {
        return res.status(400).send({status: "You are not connected."});
    }
    if (!req.body.message || !req.body.score) {
        return res.status(400).send({status: "Required data missing."});
    }

    if (req.headers.location_id) {
        location = await LocationModel.findOne({id: req.headers.location_id});
        if (!location) {
            return res.status(400).send({status: "The location ID is not valid."});
        }
    } else if (req.headers.course_id) {
        course = await CourseModel.findOne({id: req.headers.course_id});
        if (!course) {
            return res.status(400).send({status: "The course ID is not valid."});
        }
    } else { 
        return res.status(400).send({status: "Please provide a location or a course or previous comment ID."});
    }
    comment = new CommentModel({
        id: new Number(Date.now()),
        creation_date: new Date().toLocaleDateString("fr-FR"),
        message: req.body.message,
        score: req.body.score,
        author: user,
        course_id: req.headers.course_id
    });
    let error = await comment.save().catch(error => error);
    if (error.errors) {
        return res.status(400).send({status: errors});
    }

    // Update the location/course
    if (location) {
        let new_score = (Number(comment.score) + (Number(location.score) * location.comments_list.length)) / (location.comments_list.length + 1);
        error = await location.updateOne({$push: {comments_list: comment.id}, $set: {score: String(new_score)}}).catch(error => error);
        if (error.errors) {
            return res.status(400).send({status: errors});
        }
    } else if (course) {
        let new_score = (Number(comment.score) + (Number(course.score) * course.comments_list.length)) / (course.comments_list.length + 1);
        let new_used = Number(course.number_used) + 1;
        error = await course.updateOne({$push: {comments_list: comment.id}, $set: {score: String(new_score), number_used: String(new_used)}}).catch(error => error);
        if (error.errors) {
            return res.status(400).send({status: errors});
        }
    } else {
        return res.status(400).send({status: "An anomaly occurred. The comment could not be added in the location/course."});
    }
    return res.status(200).send({status: "Comment added"});
});


// EDIT_COMMENT
/**
 * Edit a comment's message or score
 * @param {String} req.headers.access_token
 * @param {CommentID} req.headers.comment_id
 * 
 * At least one of below
 * @param {String} req.body.message
 * @param {String} req.body.score
 */
router.post('/edit_comment', async function(req, res) {
    let user = await UserModel.findOne({access_token: req.headers.access_token});
    let comment = await CommentModel.findOne({id: req.headers.comment_id});

    if (!user) {
        return res.status(400).send({status: "You are not connected."});
    }
    if (!comment) {
        return res.status(400).send({status: "Comment not found."});
    }
    if (!req.body.message && !req.body.score) {
        return res.status(400).send({status: "No message or score provided."});
    }
    let old_score = Number(comment.score);
    let query = {creation_date: Date.now()};
    if (req.body.message) {
        query.message = req.body.message;
    }
    if (req.body.score) {
        query.message = req.body.score;
    }
    let error = await comment.updateOne(query).catch(error => error);
    if (error.errors) {
        return res.status(400).send({status: errors});
    }

    if (comment.location_id) {
        let location = await LocationModel.findOne({id: comment.location_id});
        let new_score = (Number(comment.score) - old_score + (Number(location.score) * location.comments_list.length)) / location.comments_list.length;
        error = await location.updateOne({$push: {comments_list: comment.id}, $set: {score: String(new_score)}}).catch(error => error);
        if (error.errors) {
            return res.status(400).send({status: errors});
        }
    } else if (comment.course_id) {
        let course = await CourseModel.findOne({id: comment.course_id});
        let new_score = (Number(comment.score) - old_score + (Number(course.score) * course.comments_list.length)) / course.comments_list.length;
        let new_used = Number(course.number_used) + 1;
        error = await course.updateOne({$push: {comments_list: comment.id}, $set: {score: String(new_score), number_used: String(new_used)}}).catch(error => error);
        if (error.errors) {
            return res.status(400).send({status: errors});
        }
    }
    return res.status(200).send({status: "Comment edited."});
});


// GET_COMMENT
/**
 * Get comment's data
 * @param {String} req.headers.access_token
 * @param {CommentID || [CommentID]} req.headers.comments_list
 */
router.get('/get_comment', async function(req, res) {
    let user = await UserModel.findOne({access_token: req.headers.access_token});
    let comments_list = null;

    if (!user) {
        return res.status(400).send({status: "You are not connected."});
    }
    let given_list = req.headers.comments_list.split(',');
    if (given_list) {
        comments_list = await CommentModel.find({id: {$in: given_list}});
        if (comments_list) {
            return res.status(200).send({status: "Comments found.", comments_list});
        }
    }
    return res.status(400).send({status: "Comment not found."});
});


module.exports = router;