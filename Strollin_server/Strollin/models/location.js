// Require Mongoose
var mongoose = require('mongoose');

//Define the schema
var Schema = mongoose.Schema;

var LocationModelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    score: {
        type: String,
        default: '0'
    },
    userScore: {
        type: [String], //list of User ID that gave score, see user.scoreLocation
        default: []
    },
    visited: {             // Nombre de fois que ce lieu à été visité
        type: String,
        default: '0'
    },
    coordinate: {
        type: [Float, Float],
        required: true,
    },
    address: {
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
        required: true,
    },
    commentList: {
        type: [String],
        default: [],
    },
    tags: {
        type: [String],
        default: [],
    },
})

// Compile model from schema
var LocationModel = mongoose.model('Location', LocationModelSchema);

exports.LocationModel = LocationModel;