// Require Mongoose
var mongoose = require('mongoose');

//Define the schema
var Schema = mongoose.Schema;

var UserModelSchema = new Schema({
    login: {                // Identifiant du compte
        type: String,
        required: true,
    },
    password: {             // Mot de passe du compte
        type: String,
        required: true,
    },
    creationDate: {         // Date de création (gérer auto)
        type: Date,
        default: Date.now,
    },
    pseudo: {               // Nom apparaissant pour l'utilisateur (ex: Auteur de parcours / Messagerie)
        type: String,
        required: true,
    },
    mail: {                 // Adresse mail pour les confirmation de compte et empêcher les duplicata
        type: String,
        required: true,
    },
    firstName: {            // Prénom
        type: String,
        required: true,
    },
    lastName: {             // Nom
        type: String,
        required: true,
    },
    accessToken: {          // Token pour rester connecté sur l'application
        type: String,
    },
    tags: {                 // Liste des tags
        type: [String],
        default: [],
    },
    friendsList: {          // Contient : friendList (liste par défaut), requestList (liste d'ami en attente), autres groupes 
        type: {},
        default: {},
    },
    type: {                 // Particulier, Commencerçant, etc...
        type: String,
        required: true,
    },
    historic: {             // Historique de parcours (historique de lieu ?)
        type: [{String, Date}],
        default: [],
    },
    scoreCourse: {          // Liste des parcours notés (ID, Note, Date)
        type: [{String, String, Date}],
        default: [],
    },
    scoreLocation: {        // Liste des lieux notés (ID, Note, Date)
        type: [{String, String, Date}],
        default: [],
    },
    scoreComment: {         // Liste des commentaires notés (ID, Note, Date)
        type: [{String, String, Date}],
        default: [],
    },
})


// Compile model from schema
var UserModel = mongoose.model('User', UserModelSchema);

exports.UserModel = UserModel;