var express = require('express');
var router = express.Router();

const {
  ConversationModel
} = require("../models/conversation")

const {
    UserModel
} = require("../models/user")


// GET_CONVERSATIONS
/**
 * Get all conversations of the access token provider
 * @param {String} req.headers.access_token
 */
router.get('/get_conversations', async function(req, res) {

    let user = await UserModel.findOne({access_token: req.headers.access_token})
    let conversations = null;

    let id = user._id;

    if (user) {
        conversations = await ConversationModel.find({participants: {$in: [id]}})
        return res.status(200).send(conversations);
    }
    return res.status(400).send({status: "You are not connected."});
});



module.exports = router;