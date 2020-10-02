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
    numberUse: {
        type: String,
        default: '1'
    },
    locationList: {
        type: [String],
        default: []
    },
    courseList: {
        type: [String],
        default: []
    },
})

// Compile model from schema
var TagModel = mongoose.model('Tag', TagModelSchema);

exports.TagModel = TagModel;