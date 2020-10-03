// Require Mongoose
var mongoose = require('mongoose');

//Define the schema
var Schema = mongoose.Schema;

var UserModelSchema = new Schema({
    mail: {                 // Adresse mail pour login et communication
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
    type: {                 // Particulier, Commencerçant, etc...
        type: String,
        required: true,
    },
    firstName: {            // Prénom
        type: String,
        default: "",
    },
    lastName: {             // Nom
        type: String,
        default: "",
    },
    accessToken: {          // Token pour rester connecté sur l'application
        type: String,
        required: true,
    },
    tags: {                 // Liste des tags
        type: [String],
        default: [],
    },
    friendsList: {          // Contient : friendList (liste par défaut), requestList (liste d'ami en attente), autres groupes 
        type: [],
        default: [],
    },
    friendsRequest: {       // Contient : friendList (liste par défaut), requestList (liste d'ami en attente), autres groupes 
        type: [],
        default: [],
    },
    groups: {
        type: [],
        default: [],
    },
    courseHistoric: {             // Historique de parcours (historique de lieu ?)
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
    socketID: {             // ID du socket IO en cours d'utilisation, vide lorsque l'utilisateur se déconnecte
        type: String,
        default: "",
    },
    facebookID: {           // ID de facebook pour la connexion facebook ?
        type: String,
        default: "",
    },
})


// Compile model from schema
var UserModel = mongoose.model('User', UserModelSchema);

exports.UserModel = UserModel;