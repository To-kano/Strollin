// Require Mongoose
var mongoose = require('mongoose');

//Define the schema
var Schema = mongoose.Schema;

var LocationModelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        default: null
    },
    score: {        // Note du lieu
        type: String,
        default: '0'
    },
    user_score: {
        type: [String], //list of User ID that gave score, see user.scoreLocation
        default: []
    },
    coordinate: {
        type: [String, String],
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
    timetable: {        // Définit les horaires possible en prenant les timetable de la liste des lieux
        type: String,
        default: null,
    },
    comments_list: {
        type: [String],
        default: [],
    },
    tags_list: {
        type: [{String, String}], // {tagsID, disp}
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
    mail: {
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