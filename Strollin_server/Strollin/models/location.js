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
    score: { //recup depuis plaecs
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
    address: { //recup depuis vicinity
        type: String,
        required: true,
    },
    city: { //recup depuis vicinity
        type: String,
        required: true,
    },
    country: { //vide pour l'instant
        type: String,
        required: true,
    },
    description: { //non dispo sur places
        type: String,
        default: "",
    },
    photo: { //A voir avec pierre et tony
        type: [String],
        default: [],
    },
    timetable: { //pas présent
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
        type: [String, String, String],
        default: ['', '', '']
    },
    average_time: {
        type: String,
        default: '15'
    },
    phone: { //no dispo
        type: String,
        default: ""
    },
    website: { //non dispo
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
    food: {
        type: Boolean,
        default: false
    },
})

// Compile model from schema
var LocationModel = mongoose.model('Location', LocationModelSchema);

exports.LocationModel = LocationModel;
