// Require Mongoose
var mongoose = require('mongoose');

//Define the schema
var Schema = mongoose.Schema;

var CommentModelSchema = new Schema({
    message: {
        type: String,
        default: "",
    },
    author: {
        type: {},
        required: true
    },
    score: {
        type: String,
        required: true
    },
    creation_date: {
        type: Date,
        default: Date.now(),
    },
    location_id: {
        type: String,
        default: "",
    },
    course_id: {
        type: String,
        default: "",
    }
})

// Compile model from schema
var CommentModel = mongoose.model('Comment', CommentModelSchema);

exports.CommentModel = CommentModel;