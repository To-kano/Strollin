// Require Mongoose
var mongoose = require('mongoose');

//Define the schema
var Schema = mongoose.Schema;

var ImageModelSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    author: {     // user's id of the image.
        type: String,
        required: true,
    },
    uri: {             // Name of file to look in public
        type: String,
        required: true,
    },
    mimetype: {     // type d'image example : 'image/jpeg'
         type: String,
         required: true,
    }

})

// Compile model from schema
var ImageModel = mongoose.model('Image', ImageModelSchema);

exports.ImageModel = ImageModel;