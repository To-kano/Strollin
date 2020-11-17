// Require Mongoose
var mongoose = require('mongoose');

//Define the schema
var Schema = mongoose.Schema;

var CommentModelSchema = new Schema({
    message: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true
    },
    user_score: {
        type: [String], //list of User ID that gave score, see user.scoreComment
        default: []
    },
    creation_date: {
        type: Date,
        default: Date.now,
    },
    comment_previous: {
        type: String,
        default: '',
    },
    comment_next: {
        type: String,
        default: '',
    },
})

// Compile model from schema
var CommentModel = mongoose.model('Comment', CommentModelSchema);

exports.CommentModel = CommentModel;