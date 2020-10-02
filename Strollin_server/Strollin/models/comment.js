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
    userScore: {
        type: [String], //list of User ID that gave score, see user.scoreComment
        default: []
    },
    creationDate: {
        type: Date,
        default: Date.now,
    },
    commentPrevious: {
        type: String,
        default: '',
    },
    commentNext: {
        type: String,
        default: '',
    },
})

// Compile model from schema
var CommentModel = mongoose.model('Comment', CommentModelSchema);

exports.CommentModel = CommentModel;