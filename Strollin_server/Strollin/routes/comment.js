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
    let user = await UserModel.findOne({access_token: req.headers.access_token}, "-_id id pseudo").catch(error => error);

    if (!user) {
        return res.status(401).send({ error_code: 1 });
    }
    if (user.reason) {
        return res.status(500).send({ error_code: 2 });
    }
    if (!req.body.message || !req.body.score) {
        return res.status(400).send({ error_code: 3 });
    }

    if (req.headers.location_id) {
        location = await LocationModel.findOne({id: req.headers.location_id}).catch(error => error);
        if (!location) {
            return res.status(400).send({ error_code: 4 });
        }
        if (location.reason) {
            return res.status(500).send({ error_code: 2 });
        }
        comment = await CommentModel.findOne({author_id: user.id, location_id: location.id}).catch(error => error);
        if (comment && comment.reason) {
            return res.status(500).send({ error_code: 2 });
        }
    } else if (req.headers.course_id) {
        course = await CourseModel.findOne({id: req.headers.course_id}).catch(error => error);
        if (!course) {
            return res.status(400).send({ error_code: 4 });
        }
        if (course.reason) {
            return res.status(500).send({ error_code: 2 });
        }
        comment = await CommentModel.findOne({author_id: user.id, course_id: course.id}).catch(error => error);
        if (comment && comment.reason) {
            return res.status(500).send({ error_code: 2 });
        }
    } else {
        return res.status(400).send({ error_code: 3 });
    }

    // IF THE USER COMMENT FOR THE FIRST TIME IN THIS LOCATION/COURSE
    if (!comment) {
        comment = new CommentModel({
            id: new Number(Date.now()),
            creation_date: new Date().toLocaleDateString("fr-FR"),
            modification_date: Number(Date.now()),
            message: req.body.message,
            score: req.body.score,
            author_id: user.id,
            author_pseudo: user.pseudo,
        });
        if (course) {
            comment.course_id = course.id;
        } else if (location) {
            comment.location_id = location.id;
        }
        let error = await comment.save().catch(error => error);
        if (error.errors) {
            return res.status(500).send({ error_code: 2 });
        }
    
        // Update the location/course
        if (location) {
            let new_score = (Number(comment.score) + (Number(location.score) * location.comments_list.length)) / (location.comments_list.length + 1);
            error = await LocationModel.updateOne({id: location.id}, {$push: {comments_list: comment.id}, $set: {score: String(new_score)}}).catch(error => error);
            if (error.errors) {
                return res.status(500).send({ error_code: 2 });
            }
        } else if (course) {
            let new_score = (Number(comment.score) + (Number(course.score) * course.comments_list.length)) / (course.comments_list.length + 1);
            let new_used = Number(course.number_used) + 1;
            error = await CourseModel.updateOne({id: course.id}, {$push: {comments_list: comment.id}, $set: {score: String(new_score), number_used: String(new_used)}}).catch(error => error);
            if (error.errors) {
                return res.status(500).send({ error_code: 2 });
            }
        } else {
            return res.status(400).send({ error_code: 3 });
        }
        return res.status(200).send({ status: "Comment added" });

    // IF THE USER COMMENTED ALREADY BEFORE IN LOCATION/COURSE
    } else {
        let old_score = Number(comment.score);
        update = {
            creation_date: new Date().toLocaleDateString("fr-FR"),
            modification_date: Number(Date.now()),
            message: req.body.message,
            score: req.body.score,
        };
        let error = await CommentModel.updateOne({id: comment.id}, {$set: update}).catch(error => error);
        if (error.errors) {
            return res.status(500).send({ error_code: 2 });
        }
    
        // Update the location/course
        if (location) {
            let new_score = (Number(comment.score) - old_score + (Number(location.score) * location.comments_list.length)) / (location.comments_list.length);
            error = await LocationModel.updateOne({id: location.id}, {$set: {score: String(new_score)}}).catch(error => error);
            if (error.errors) {
                return res.status(500).send({ error_code: 2 });
            }
        } else if (course) {
            let new_score = (Number(req.body.score) - old_score + (Number(course.score) * course.comments_list.length)) / (course.comments_list.length);
            let new_used = Number(course.number_used) + 1;
            error = await CourseModel.updateOne({id: course.id}, {$set: {score: String(new_score), number_used: String(new_used)}}).catch(error => error);
            if (error.errors) {
                return res.status(500).send({ error_code: 2 });
            }
        } else {
            return res.status(400).send({ error_code: 3 });
        }
        return res.status(200).send({ status: "Comment updated" });
    }
});



// GET_COMMENT_BY_ID
/**
 * Get the comment(s) by ID.
 * @param {String} req.headers.access_token
 * @param {CommentID || [CommentID]} req.headers.comments_list
 */
router.get('/get_comment_by_id', async function(req, res) {
    let user = await UserModel.findOne({access_token: req.headers.access_token}, "-_id id pseudo").catch(error => error);

    if (!user) {
        return res.status(401).send({ error_code: 1 });
    }
    if (user.reason) {
        return res.status(500).send({ error_code: 2 });
    }
    let given_list = req.headers.comments_list.split(',');
    let comments_list = await CommentModel.find({id: {$in: given_list}}).catch(error => error);
    if (comments_list.reason) {
        return res.status(500).send({ error_code: 2 });
    } else if (comments_list.length > 0) {
        return res.status(200).send({ status: "Comment(s) found.", comments_list});
    } else {
        return res.status(200).send({ status: "Comment(s) not found.", comments_list});
    }
});


module.exports = router;