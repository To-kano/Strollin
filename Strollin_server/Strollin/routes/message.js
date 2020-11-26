var express = require('express');
var router = express.Router();

const {
    MessageModel
} = require("../models/message")

const {
    UserModel
} = require("../models/user")


// Post

// router.post('/postMessage', async function(req, res) {
//     if (req.body.expeditor &&
//         req.body.destinator &&
//         req.body.conversation_name &&
//         req.body.creation_date &&
//         req.body.type &&
//         req.body.message) {
//         message = new MessageModel({
//             expeditor: req.body.expeditor,
//             destinator: req.body.destinator,
//             conversation_name: req.body.conversation_name,
//             type: req.body.type,
//             message: req.body.message,
//             fileID: null,
//             fileURL: null
//         });
//         if (req.body.type == "message") {

//         }
//         else if (req.body.type == "image" || req.body.type == "video") {
//             message[fileID] = null
//             message[fileURL] = null
//         }
//         else {
//             return res.status(400).send({status: "The message type is invalid."});
//         }
//         await message.save();
//         return  res.status(200).send({status: "Message sent."});
//     }
//     return res.status(400).send({status: "An element is missing in the request."});
// });


// Get

router.get('/get_message', async function(req, res) {
    let user = await UserModel.findOne({access_token: req.headers.access_token});
    let message = null;

    if (user) {
        message = await MessageModel.findOne({_id: req.headers.message_id});

        console.log("message get = ", message);
        if (message) {
            return res.status(200).send(message);
        }
        else {
            return res.status(400).send({status: "Message not found."});
        }
    }
    return res.status(400).send({status: "You are not connected."});
});


// Delete

router.delete('/delete_message', async function(req, res) {

    let message = await MessageModel.find({_id: req.headers.id});

    if (message) {
        if (message.type == "video" || message.type == "image") {
            // Delete the file
            pass
        }
        await message.remove();
        return res.status(200).send({status: "Message successfully deleted."});
    }
    return res.status(400).send({status: "An error occurred."});
});


module.exports = router;

