var express = require('express');
var router = express.Router();

const {
    TagModel
} = require("../models/tag")

const {
    UserModel
} = require("../models/user")


// Post

router.post('/new_tag', async function(req, res) {

    let tag = null;
    let user = await UserModel.findOne({access_token: req.headers.access_token});

    if (!user)
        return res.status(400).send({status: "You are not connected."});
    if (req.body.name && req.body.description) {
        tag = await TagModel.findOne({name: req.body.name});
        if (tag)
            return res.status(400).send({status: "The tag exists already."});
        tag = new MessageModel({
            name: req.body.name,
            description: req.body.description,
        });
        await tag.save();
        return  res.status(200).send({status: "Tag created."});
    }
    return res.status(400).send({status: "An element is missing in the request."});
});


// Get

router.get('/get_tags', async function(req, res) {
    let user = await UserModel.findOne({access_token: req.headers.access_token});
    let tags = null;

    if (user) {
        tags = await TagModel.find({_id: {$in: req.headers.tags_list}});
        if (tags) {
            return res.status(200).send({status: "The tags are found.", tags_list: tags});
        }
        else {
            return res.status(400).send({status: "Tags not found."});
        }
    }
    return res.status(400).send({status: "You are not connected."});
});


// Delete

router.delete('/delete_tag', async function(req, res) {
    let user = await UserModel.findOne({access_token: req.headers.access_token});
    let tags = null;

    if (user) {
        tags = await TagModel.find({_id: {$in: req.headers.tags_list}});
        if (tags) {
            return res.status(200).send({status: "The tags are found.", tags_list: tags});
        }
        else {
            return res.status(400).send({status: "Tags not found."});
        }
    }
    return res.status(400).send({status: "You are not connected."});
});


module.exports = router;

