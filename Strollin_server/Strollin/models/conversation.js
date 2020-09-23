// Require Mongoose
var mongoose = require('mongoose');

//Define the schema
var Schema = mongoose.Schema;

var ConversationModelSchema = new Schema({
    participants: {
        type: [String],
        required: true,
    },
    name: {
        type: String,
        default: "",
    },
    messageList: {
        type: [String],
        default: [],
    },
})

// Compile model from schema
var ConversationModel = mongoose.model('Conversation', ConversationModelSchema);

exports.ConversationModel = ConversationModel;