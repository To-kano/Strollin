var express = require('express');
var router = express.Router();

const {
    MessageModel
} = require("../models/message")

const {
    UserModel
} = require("../models/user")


// GET_MESSAGE
/**
 * Get the data of the messages provided in the array of messageID
 * @param {String} req.headers.access_token
 * @param {String} req.headers.message_id
 */
router.get('/get_message', async function(req, res) {
    let user = await UserModel.findOne({access_token: req.headers.access_token});
    let message = null;

    if (user) {
        //message = await MessageModel.find({_id: {$in: req.headers.messages_list}}, null, {sort: {creation_date: -1}}); // To sort by date the messages?
        message = await MessageModel.findOne({_id: req.headers.message_id});

        if (message) {
            message.creation_date = Date(message.creation_date)
            return res.status(200).send({status: "Message sent.", message});
        }
        else {
            return res.status(400).send({status: "Message not found."});
        }
    }
    return res.status(400).send({status: "You are not connected."});
});


module.exports = router;

