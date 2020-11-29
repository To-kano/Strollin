// Require Mongoose
var mongoose = require('mongoose');

//Define the schema
var Schema = mongoose.Schema;

var ConversationModelSchema = new Schema({
    participants: {     // Liste des participants d'une conversation {id, date de sortie}, en cas de liste vide, supression de la conversation.
        type: [String],
        required: true,
    },
    name: {             // Nom de la conversation
        type: String,
        default: "",
    },
    messages_list: {    // Liste des messages
        type: [String],
        default: [],
    },
    recent_messages: {
        type: [{}],
        default: []
    }
})

// Compile model from schema
var ConversationModel = mongoose.model('Conversation', ConversationModelSchema);

exports.ConversationModel = ConversationModel;