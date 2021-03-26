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
 */
router.post('/new_comment', async function(req, res) {
    let comment = null;
    let course = null;
    let location = null;
    let user = await UserModel.findOne({access_token: req.headers.access_token}, "-_id id pseudo").catch(error => errror);

    if (user.reason) {
        return res.status(400).send({status: "Error in database transaction", error: user});
    }
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
        modification_date: Number(Date.now()),
        message: req.body.message,
        score: req.body.score,
        author_id: user.id,
        author_pseudo: user.pseudo,
        course_id: req.headers.course_id
    });
    let error = await comment.save().catch(error => error);
    if (error.errors) {
        return res.status(400).send({status: "Error in database transaction", error: error});
    }

    // Update the location/course
    if (location) {
        let new_score = (Number(comment.score) + (Number(location.score) * location.comments_list.length)) / (location.comments_list.length + 1);
        error = await location.updateOne({$push: {comments_list: comment.id}, $set: {score: String(new_score)}}).catch(error => error);
        if (error.errors) {
            return res.status(400).send({status: error.errors});
        }
    } else if (course) {
        let new_score = (Number(comment.score) + (Number(course.score) * course.comments_list.length)) / (course.comments_list.length + 1);
        let new_used = Number(course.number_used) + 1;
        error = await course.updateOne({$push: {comments_list: comment.id}, $set: {score: String(new_score), number_used: String(new_used)}}).catch(error => error);
        if (error.errors) {
            return res.status(400).send({status: error.errors});
        }
    } else {
        return res.status(400).send({status: "An anomaly occurred. The comment could not be added in the location/course."});
    }
    return res.status(200).send({status: "Comment added"});
});



// GET_COMMENT_BY_ID
/**
 * Get the comment(s) by ID.
 * @param {String} req.headers.access_token
 * @param {CommentID || [CommentID]} req.headers.comments_list
 */
router.get('/get_comment_by_id', async function(req, res) {
    let user = await UserModel.findOne({access_token: req.headers.access_token});
  
    if (!user) {
        return res.status(400).send({status: "You are not connected."});
    }
    let given_list = req.headers.comments_list.split(',');
    let comments_list = await CommentModel.find({id: {$in: given_list}}).catch(error => error);
    if (comments_list.reason) {
        return res.status(400).send({status: "Error in the parameters.", error: comments_list});
    } else if (comments_list.length > 0) {
        return res.status(200).send({status: "Comment(s) found.", comments_list});
    } else {
        return res.status(400).send({status: "Comment(s) not found.", error: comments_list});
    }
});


module.exports = router;