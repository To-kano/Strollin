var express = require('express');
var router = express.Router();

const {
    TagModel
} = require("../models/tag")

const {
    UserModel
} = require("../models/user")


// NEW_TAG
/**
 * Create a new tag in the database
 * @param {String} req.headers.access_token
 *
 * @param {String} req.body.name
 * @param {String} req.body.description (Optional)
 */
router.post('/new_tag', async function(req, res) {

    let tag = null;
    let user = await UserModel.findOne({access_token: req.headers.access_token});

    if (!user)
        return res.status(400).send({status: "You are not connected."});
    if (req.body.name) {
        tag = await TagModel.findOne({name: req.body.name});
        if (tag)
            return res.status(400).send({status: "The tag exists already."});
        tag = new TagModel({
            name: req.body.name,
            description: req.body.description,
        });
        let error = await tag.save().catch(error => error);
        if (error.errors) {
            return res.status(400).send({status: error.errors});
        }
        return res.status(200).send({status: "tag created."});
    }
    return res.status(400).send({status: "An element is missing in the request."});
});


// GET_TAG
/**
 * Get a list of tag 
 * @param {String} req.headers.access_token
 * @param {String} req.headers.sort (optional) (name / number_used)
 * @param {String} req.headers.search (optional) (substring of name to research)
 */
router.get('/get_tag', async function(req, res) {
    let user = await UserModel.findOne({access_token: req.headers.access_token});
    let tags = null;
    let sort = req.headers.sort

    if (!user) {
        return res.status(400).send({status: "You are not connected."});
    }
    if (!sort) {
        sort = "name"; 
    }
    if (req.headers.search) {
        tags = await TagModel.find({name: {$regex: req.headers.search}}).sort(sort);
    } else {
        tags = await TagModel.find().sort(sort);
    }
    if (tags) {
        return res.status(200).send({status: true, tags_list: tags});
    }
    else {
        return res.status(400).send({status: "Tags not found."});
    }
});


module.exports = router;

