// Require Mongoose
var mongoose = require('mongoose');

//Define the schema
var Schema = mongoose.Schema;

var MessageModelSchema = new Schema({
    expeditor: {
        type: String,
        required: true
    },
    destinator: {
        type: String,
        required: true
    },
    conversation: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        required: true
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