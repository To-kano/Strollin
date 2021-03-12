var express = require('express');
var router = express.Router();

const {
    FaqModel
} = require("../models/faq")

// CREATE_QUESTION
/**
 * Create a new question fr version.
 * @param {String} req.body.mail
 * @param {String} req.body.question
 */
router.post('/create_question', async function(req, res) {

    if (!req.body.mail || !req.body.question || !req.body.language) {
        return res.status(400).send({status: "Parameter required is missing."});
    }
    let faq = new FaqModel({
        id: new Number(Date.now()),
        creation_date: new Date().toLocaleDateString("fr-FR"),
        author: req.body.mail,
        question: req.body.question,
        language: req.body.language,
    });
    let error = await faq.save().catch(error => error);
    if (error.errors) {
        return res.status(400).send({status: "Error in database transaction", error: error.errors});
    }
    return res.status(200).send({status: "Question created successfully."});
});

// ANSWER_QUESTION
/**
 * Give an answer to a question
 * @param {FaqID} req.headers.question_id
 * 
 * @param {String} req.body.answer
 * @param {Boolean} req.body.published
 */
router.post('/answer_question', async function(req, res) {

    let question = await FaqModel.findOne({id: req.headers.question_id}).catch(error => error);
    if (question.reason) {
        return res.status(400).send({status: "Error in the parameters.", error: question});
    }
    if (!question) {
        return res.status(400).send({status: "Question not found."});
    }
    if (!req.body.answer || !req.body.published) {
        return res.status(400).send({status: "Answer (String) and published (Boolean) required."});
    }
    let query = {
        answer: req.body.answer,
        published: req.body.published
    };
    let error = await question.updateOne(query).catch(error => error);
    if (error.errors) {
        return res.status(400).send({status: "Error in database transaction", error: error.errors});
    }
    return res.status(200).send({status: "Question answered."});
  });
  

// GET_QUESTION_FR
/**
 * Get the question(s) for display FAQ.
 * 
 * @param {String} req.headers.language
 */
router.get('/get_question_fr', async function(req, res) {

    let faqs_list = await FaqModel.find({published: true, language: 'fr'}, "-_id question answer creation_date").catch(error => error);
    if (faqs_list.reason) {
        return res.status(400).send({status: "Error in the parameters.", error: faqs_list});
    } else if (faqs_list.length > 0) {
        return res.status(200).send({status: "Faq(s) found.", faqs_list});
    } else {
        return res.status(400).send({status: "Faq(s) not found.", error: faqs_list});
    }
});

// GET_QUESTION_EN
/**
 * Get the question(s) for display FAQ.
 */
router.get('/get_question_en', async function(req, res) {

    let faqs_list = await FaqModel.find({published: true, language: 'en'}, "-_id question answer creation_date").catch(error => error);
    if (faqs_list.reason) {
        return res.status(400).send({status: "Error in the parameters.", error: faqs_list});
    } else if (faqs_list.length > 0) {
        return res.status(200).send({status: "Faq(s) found.", faqs_list});
    } else {
        return res.status(400).send({status: "Faq(s) not found.", error: faqs_list});
    }
});


// GET_QUESTION_BY_ID
/**
 * Get the question(s) by ID.
 * @param {FaqID || [FaqID]} req.headers.faqs_list
 */
router.get('/get_question_by_id', async function(req, res) {

    let given_list = req.headers.tags_list.split(',');
    let faqs_list = await FaqModel.find({id: {$in: given_list}}, "-_id -password").catch(error => error);
    if (faqs_list.reason) {
        return res.status(400).send({status: "Error in the parameters.", error: faqs_list});
    } else if (faqs_list.length > 0) {
        return res.status(200).send({status: "Faq(s) found.", faqs_list});
    } else {
        return res.status(400).send({status: "Faq(s) not found.", error: faqs_list});
    }
});


module.exports = router;
