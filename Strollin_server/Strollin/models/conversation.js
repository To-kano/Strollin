// Require Mongoose
var mongoose = require('mongoose');

//Define the schema
var Schema = mongoose.Schema;

var ConversationModelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    participants: {
        type: [String],
        required: true
    },
    message_list: {
        type: [String]
    },
})

// Compile model from schema
var ConversationModel = mongoose.model('Conversation', ConversationModelSchema);

exports.ConversationModel = ConversationModel;