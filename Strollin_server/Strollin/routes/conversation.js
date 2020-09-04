var express = require('express');
var router = express.Router();

const {
  ConversationModel
} = require("../models/conversation")


// Post

router.post('/postConversation', async function(req, res) {
    if (req.body.name && req.body.participants) {
        conversation = new ConversationModel({
            name: req.body.name,
            participants: req.body.participants,
            message_list: []
        });
        await message.save();
        return  res.status(200).send({status: "Conversation created."});
    }
    return res.status(400).send({status: "An error occured."})


// Get

router.get('/getConversation', async function(req, res) {
    let conversation = await ConversationModel.findOne({});

    if (conversation) {
        return  res.status(200).send({status: "The conversation is found.", discussion: message});
    }
    return res.status(400).send({status: "The conversation is not found."});
});


// Delete

router.delete('/deleteConversation', async function(req, res) {
    let conversation = await ConversationModel.findOne({});

    if (conversation) {
        await conversation.remove();
        return  res.status(200).send({status: "The conversation is deleted.", discussion: message});
    }
    return res.status(400).send({status: "The conversation is not deleted."});
});


module.exports = router;

