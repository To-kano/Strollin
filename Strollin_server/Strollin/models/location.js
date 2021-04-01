// Require Mongoose
var mongoose = require('mongoose');

//Define the schema
var Schema = mongoose.Schema;

var LocationModelSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    owner_id: {
        type: String,
        default: ""
    },
    owner_pseudo: {
        type: String,
        default: ""
    },
    score: {
        type: String,
        default: '0'
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    photo: {
        type: [String],
        default: [],
    },
    timetable: {
        type: String,
        default: "",
    },
    comments_list: {
        type: [String],
        default: [],
    },
    tags_list: {
        type: [{}],     // {tag_name, disp}
        default: [],
    },
    price_range: {
        type: [String, String],
        default: ['', '']
    },
    average_time: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ""
    },
    website: {
        type: String,
        default: ""
    },
    pop_disp: {
        type: String,
        default: '0'
    },
    pop_ag: {
        type: String,
        default: '0'
    },
    alg_disp: {
        type: String,
        default: '0'
    },
    alg_ag: {
        type: String,
        default: '0'
    },
})

// Compile model from schema
var LocationModel = mongoose.model('Location', LocationModelSchema);

exports.LocationModel = LocationModel;
