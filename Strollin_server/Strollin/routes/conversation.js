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
    let user = await UserModel.findOne({access_token: req.headers.access_token}, "-_id id pseudo").catch(error => error);

    if (!user) {
        return res.status(401).send({ error_code: 1 });
    }
    if (user.reason) {
        return res.status(500).send({ error_code: 2 });
    }
    let id = user.id;
    conversations = await ConversationModel.find({participants: {$in: [id]}})
    return res.status(200).send({ status: "conversations sent.", conversations});
});

// GET_CONVERSATION_BY_ID
/**
 * Get conversation(s) by ID
 * @param {String} req.headers.access_token
 * @param {ConversationID || [ConversationID]} req.headers.conversations_list
 */
router.get('/get_conversation_by_id', async function(req, res) {
    let user = await UserModel.findOne({access_token: req.headers.access_token}, "-_id id pseudo").catch(error => error);

    if (!user) {
        return res.status(401).send({ error_code: 1 });
    }
    if (user.reason) {
        return res.status(500).send({ error_code: 2 });
    }
    let given_list = req.headers.conversations_list.split(',');
    let conversations_list = await ConversationModel.find({id: {$in: given_list}}).catch(error => error);
    if (conversations_list.reason) {
        return res.status(500).send({ error_code: 2 });
    } else if (conversations_list.length > 0) {
        return res.status(200).send({ status: "Conversation(s) found.", conversations_list });
    } else {
        return res.status(200).send({ status: "Conversation(s) not found.", conversations_list });
    }
});




module.exports = router;