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

    let conversations = null;
    let user = await UserModel.findOne({access_token: req.headers.access_token})

    if (!user) {
        return res.status(400).send({status: "You are not connected."});
    }
    let id = user.id;
    conversations = await ConversationModel.find({participants: {$in: [id]}})
    return res.status(200).send({status: "conversations sent.", conversations});
});

// GET_COURSES_BY_ID
/**
 * Get conversation(s) by ID
 * @param {String} req.headers.access_token
 * @param {ConversationID || [ConversationID]} req.headers.conversations_id_list
 */
router.get('/get_conversations_by_id', async function(req, res) {
    let user = await UserModel.findOne({access_token: req.headers.access_token});
  
    if (!user) {
        return res.status(400).send({status: "You are not connected."});
    }
    let given_list = req.headers.conversations_list.split(',');
    let conversations_list = await ConversationModel.find({id: {$in: given_list}}).catch(error => error);
    if (conversations_list.reason) {
        return res.status(400).send({status: "Error in the parameters.", error: conversations_list});
    } else if (conversations_list.length > 0) {
        return res.status(200).send({status: "Conversation(s) found.", conversations_list});
    } else {
        return res.status(400).send({status: "Conversation(s) not found.", error: conversations_list});
    }
});




module.exports = router;