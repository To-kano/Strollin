var express = require('express');
var router = express.Router();

const {
  ConversationModel
} = require("../models/conversation")

const {
    UserModel
} = require("../models/user")


// Get

router.get('/get_conversations', async function(req, res) {

    let user = await UserModel.findOne({access_token: req.headers.access_token})
    let conversations = null;

    if (user) {
        conversations = await ConversationModel.find({participants: {$elemMatch: user._id}})
        conversations.participants = await UserModel.find({_id : {$in : conversations.participants}});
        return res.status(200).send({status: "All conversations are found.", conversations});
    }
    return res.status(400).send({status: "You are not connected."});
});



module.exports = router;