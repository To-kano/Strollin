// Require Mongoose
var mongoose = require('mongoose');

//Define the schema
var Schema = mongoose.Schema;

var CourseModelSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
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
    number_used: {      // Nombre de fois que ce parcours à été utilisé
        type: String,
        default: '0'
    },
    author_id: {
        type: String,
        required: true
    },
    author_pseudo: {
        type: String,
        required: true
    },
    creation_date: {
        type: String,
        required: true,
    },
    timetable: {        // Définit les horaires possible en prenant les timetable de la liste des lieux
        type: String,
        default: "",
    },
    price_range: {
        type: [String, String],
        default: ['0', '0']
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