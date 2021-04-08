// Require Mongoose
var mongoose = require('mongoose');

//Define the schema
var Schema = mongoose.Schema;

var UserModelSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    mail: {                 // Adresse mail pour login et communication
        type: String,
        required: true,
    },
    password: {             // Mot de passe du compte
        type: String,
        required: true,
    },
    creation_date: {         // Date de création (gérer auto)
        type: String,
        required: true,
    },
    pseudo: {               // Nom apparaissant pour l'utilisateur (ex: Auteur de parcours / Messagerie)
        type: String,
        required: true,
    },
    partner: {              // false: particular / true: partner
        type: Boolean,
        required: true,
    },
    first_name: {            // Prénom
        type: String,
        default: "",
    },
    last_name: {             // Nom
        type: String,
        default: "",
    },
    access_token: {          // Token pour rester connecté sur l'application
        type: String,
        required: true,
    },
    tags_list: {             // Liste des tags
        type: [String],
        default: [],
    },
    friends_list: {          // Contient : friendList (liste par défaut), requestList (liste d'ami en attente), autres groupes 
        type: [],
        default: [],
    },
    friends_request: {       // Contient : friendList (liste par défaut), requestList (liste d'ami en attente), autres groupes 
        type: [],
        default: [],
    },
    groups: {
        type: [],
        default: [],
    },
    course_historic: {             // Historique de parcours (historique de lieu ?)
        type: [[String, Date]],
        default: [],
    },
    socket_id: {             // ID du socket IO en cours d'utilisation, vide lorsque l'utilisateur se déconnecte
        type: String,
        default: "",
    },
    facebook_id: {           // ID de facebook pour la connexion facebook ?
        type: String,
        default: "",
    },
    verify: {
        type: Boolean,
        default: false
    },
    log_attempt: {
        type: Number,
        default: 0,
    },
    log_security: {
        type: Number,
        default: 0,
    },
})


// Compile model from schema
var UserModel = mongoose.model('User', UserModelSchema);

exports.UserModel = UserModel;