// Require Mongoose
var mongoose = require('mongoose');

//Define the schema
var Schema = mongoose.Schema;

var UserModelSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    tags: {
        type: [String],
    },
})

// Compile model from schema
var UserModel = mongoose.model('User', UserModelSchema);

exports.UserModel = UserModel;