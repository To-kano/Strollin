// Require Mongoose
var mongoose = require('mongoose');

//Define the schema
var Schema = mongoose.Schema;

var BlacklistModelSchema = new Schema({
    ip: {
        type: String,
        required: true,
    },
    attempt: {
        type: Number,
        default: 0,
    },
    lock_date: {
        type: Number,
        default: 0,
    },
})

// Compile model from schema
var BlacklistModel = mongoose.model('Blacklist', BlacklistModelSchema);

exports.BlacklistModel = BlacklistModel;