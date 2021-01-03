// Require Mongoose
var mongoose = require('mongoose');

//Define the schema
var Schema = mongoose.Schema;

var CourseModelSchema = new Schema({
    locations_list: {
        type: [String],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    score: {
        type: String,
        default: '0'
    },
    user_score: {
        type: [String], //list of User ID that gave score, see user.scoreCourse
        default: []
    },
    number_used: {      // Nombre de fois que ce parcours à été utilisé
        type: String,
        default: '0'
    },
    author: {
        type: String,
        required: true
    },
    creation_date: {
        type: Date,
        default: Date.now,
    },
    timetable: {        // Définit les horaires possible en prenant les timetable de la liste des lieux
        type: String,
        default: "",
    },
    comments_list: {
        type: [String],
        default: [],
    },
    tags_list: {
        type: [String],
        default: [],
    },
    time_spent: {
        type: [String],
        default: [],
    },
})

// Compile model from schema
var CourseModel = mongoose.model('Course', CourseModelSchema);

exports.CourseModel = CourseModel;