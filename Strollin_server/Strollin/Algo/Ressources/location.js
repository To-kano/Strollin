// Require Mongoose
var mongoose = require('mongoose');

//Define the schema
var Schema = mongoose.Schema;

var LocationModelSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    Pos: {
        type: [Number, Number],
        required: true,
    },
    Desc: {
        type: String,
        default: "",
    },
    TagsDisp: {
        type: [{String, String}], // {tagsID, disp}
        default: [],
    },
    Tags: {
        type: [String], // {tagsID, disp}
        default: [],
    },
    Price: {
        type: Number,
        default: ['', '']
    },
    average_time: {
        type: String,
        default: ''
    },
    PopDisp: {
        type: Number,
        default: '0'
    },
    PopAg: {
        type: Number,
        default: '0'
    },
    AlgDisp: {
        type: Number,
        default: '0'
    },
    AlgAg: {
        type: Number,
        default: '0'
    },
    Dist: {
        type: Number,
        default: '0'
    },
})

// Compile model from schema
var TrueLocation = mongoose.model('Location', LocationModelSchema);

exports.TrueLocation = TrueLocation;
