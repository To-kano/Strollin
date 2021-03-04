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
            id: new Number(Date.now()),
            name: req.body.name,
            description: req.body.description,
        });
        let error = await tag.save().catch(error => error);
        if (error.errors) {
            return res.status(400).send({status: "Error in database transaction", error: error});
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
    let sort = req.headers.sort;
    const projection = "-_id";

    if (!user) {
        return res.status(400).send({status: "You are not connected."});
    }
    if (!sort) {
        sort = "name"; 
    }
    if (req.headers.search) {
        tags = await TagModel.find({name: {$regex: req.headers.search}}, projection).sort(sort);
    } else {
        tags = await TagModel.find({}, projection).sort(sort);
    }
    if (tags) {
        return res.status(200).send({status: true, tags_list: tags});
    }
    else {
        return res.status(400).send({status: "Tags not found."});
    }
});


// GET_TAG_BY_ID
/**
 * Get the tag(s) by ID.
 * @param {String} req.headers.access_token
 * @param {TagID || [TagID]} req.headers.tags_list
 */
router.get('/get_tag_by_id', async function(req, res) {
    let user = await UserModel.findOne({access_token: req.headers.access_token});
  
    if (!user) {
        return res.status(400).send({status: "You are not connected."});
    }
    let given_list = req.headers.tags_list.split(',');
    let tags_list = await TagModel.find({id: {$in: given_list}}).catch(error => error);
    if (tags_list.reason) {
        return res.status(400).send({status: "Error in the parameters.", error: tags_list});
    } else if (tags_list.length > 0) {
        return res.status(200).send({status: "Tag(s) found.", tags_list});
    } else {
        return res.status(400).send({status: "Tag(s) not found.", error: tags_list});
    }
});
  

module.exports = router;

