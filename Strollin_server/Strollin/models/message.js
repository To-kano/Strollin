// Require Mongoose
var mongoose = require('mongoose');

//Define the schema
var Schema = mongoose.Schema;

var MessageModelSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    expeditor_id: {
        type: String,
        required: true
    },
    expeditor_pseudo: {
        type: String,
        required: true
    },
    conversation: {
        type: String,
        required: true
    },
    creation_date: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
})

// Compile model from schema
var MessageModel = mongoose.model('Message', MessageModelSchema);

exports.MessageModel = MessageModel;