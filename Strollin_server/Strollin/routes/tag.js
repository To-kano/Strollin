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
    let user = await UserModel.findOne({access_token: req.headers.access_token}, "-_id id pseudo").catch(error => error);

    if (!user) {
        return res.status(401).send({ error_code: 1 });
    }
    if (user.reason) {
        return res.status(500).send({ error_code: 2 });
    }

    if (!req.body.name) {
        return res.status(400).send({ error_code: 3 });
    }
    tag = await TagModel.findOne({name: req.body.name}).catch(error => error);
    if (tag && tag.reason) {
        return res.status(500).send({ error_code: 2 });
    } else if (tag) {
        return res.status(409).send({ error_code: 3 });
    }
    tag = new TagModel({
        id: new Number(Date.now()),
        name: req.body.name,
        description: req.body.description,
    });
    let error = await tag.save().catch(error => error);
    if (error.errors) {
        return res.status(500).send({ error_code: 2 });
    }
    return res.status(200).send({ status: "Tag created." });
});


// GET_TAG
/**
 * Get a list of tag
 * @param {String} req.headers.access_token
 * @param {String} req.headers.sort (optional) (name / number_used)
 * @param {String} req.headers.search (optional) (substring of name to research)
 */
router.get('/get_tag', async function(req, res) {
    let tags = null;
    let sort = req.headers.sort;
    let user = await UserModel.findOne({access_token: req.headers.access_token}, "-_id id pseudo").catch(error => error);

    if (!user) {
        return res.status(401).send({ error_code: 1 });
    }
    if (user.reason) {
        return res.status(500).send({ error_code: 2 });
    }

    if (!sort) {
        sort = "name";
    }
    if (req.headers.search) {
        tags = await TagModel.find({name: {$regex: req.headers.search}}, "-_id").sort(sort).catch(error => error);
    } else {
        tags = await TagModel.find({}, "-_id").sort(sort).catch(error => error);
    }
    if (tags && tags.reason) {
        return res.status(500).send({ error_code: 2 });
    } else if (tags) {
        return res.status(200).send({ status: "Tags found", tags_list: tags});
    } else {
        return res.status(200).send({ tags_list: tags });
    }
});


// GET_TAG_BY_ID
/**
 * Get the tag(s) by ID.
 * @param {String} req.headers.access_token
 * @param {TagID || [TagID]} req.headers.tags_list
 */
router.get('/get_tag_by_id', async function(req, res) {
    let user = await UserModel.findOne({access_token: req.headers.access_token}, "-_id id pseudo").catch(error => error);

    if (!user) {
        return res.status(401).send({ error_code: 1 });
    }
    if (user.reason) {
        return res.status(500).send({ error_code: 2 });
    }

    let given_list = req.headers.tags_list.split(',');
    let tags_list = await TagModel.find({id: {$in: given_list}}).catch(error => error);
    if (tags_list.reason) {
        return res.status(500).send({ error_code: 2 });
    } else if (tags_list.length > 0) {
        return res.status(200).send({ status: "Tag(s) found.", tags_list});
    } else {
        return res.status(200).send({ tags_list});
    }
});

module.exports = router;
