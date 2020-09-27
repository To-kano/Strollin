// Require Mongoose
var mongoose = require('mongoose');

//Define the schema
var Schema = mongoose.Schema;

var CourseModelSchema = new Schema({
    locations: {
        type: [String],
        required: true
    },
    score: {
        type: String,
        default: '0'
    },
    userScore: {
        type: [String], //list of User ID that gave score, see user.scoreCourse
        default: []
    },
    used: {             // Nombre de fois que ce parcours à été utilisé
        type: String,
        default: '0'
    },
    author: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now,
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
var CourseModel = mongoose.model('Course', CourseModelSchema);

exports.CourseModel = CourseModel;