// Require Mongoose
var mongoose = require('mongoose');

//Define the schema
var Schema = mongoose.Schema;

var ConversationModelSchema = new Schema({
    participants: {     // Liste des participants d'une conversation {id, date de sortie}, en cas de liste vide, supression de la conversation.
        type: [{}],
        required: true,
    },
    name: {             // Nom de la conversation
        type: String,
        default: "",
    },
    messageList: {      // Liste des messages
        type: [String],
        default: [],
    },
})

// Compile model from schema
var ConversationModel = mongoose.model('Conversation', ConversationModelSchema);

exports.ConversationModel = ConversationModel;