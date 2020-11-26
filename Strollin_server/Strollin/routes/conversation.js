var express = require('express');
var router = express.Router();

const {
  ConversationModel
} = require("../models/conversation")

const {
    UserModel
} = require("../models/user")


// Post

// router.post('/post_conversation', async function(req, res) {
//     if (req.body.name && req.body.participants) {
//         conversation = new ConversationModel({
//             name: req.body.name,
//             participants: req.body.participants,
//             message_list: []
//         });
//         await message.save();
//         return  res.status(200).send({status: "Conversation created."});
//     }
//     return res.status(400).send({status: "An error occurred."});
// });


// Get

router.get('/get_conversation', async function(req, res) {

    let user = await UserModel.findOne({access_token: req.headers.access_token})
    let conversations = null;

    if (user) {
        conversations = await ConversationModel.find({participants: user._id})

        console.log("converssation get = ", conversations);
        //conversations.participants = await UserModel.find({_id : {$in : conversations.participants}});
        return res.status(200).send(conversations);
    }
    return res.status(400).send({status: "You are not connected."});
});


// Delete

router.delete('/delete_conversation', async function(req, res) {
    let conversation = await ConversationModel.findOne({_id: req.headers.id});

    if (conversation) {
        await conversation.remove();
        return  res.status(200).send({status: "The conversation is deleted."});
    }
    return res.status(400).send({status: "The conversation is not deleted."});
});


module.exports = router;