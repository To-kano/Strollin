// Require Mongoose
var mongoose = require('mongoose');

//Define the schema
var Schema = mongoose.Schema;

var FaqModelSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    creation_date: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        default: "",
    },
    published: {
        type: Boolean,
        default: false,
    },
})

// Compile model from schema
var FaqModel = mongoose.model('Faq', FaqModelSchema);

exports.FaqModel = FaqModel;