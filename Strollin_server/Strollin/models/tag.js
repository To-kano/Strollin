// Require Mongoose
var mongoose = require('mongoose');

//Define the schema
var Schema = mongoose.Schema;

var TagModelSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: ""
    },
    number_used: {
        type: String,
        default: '1'
    },
    location_list: {
        type: [String],
        default: []
    },
    course_list: {
        type: [String],
        default: []
    },
})

// Compile model from schema
var TagModel = mongoose.model('Tag', TagModelSchema);

exports.TagModel = TagModel;