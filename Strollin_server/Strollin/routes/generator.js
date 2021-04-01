var express = require('express');
var router = express.Router();

const {
    UserModel
} = require("../models/user")

// GENERATE_COURSE
/**
 * Generate a course.
 * @param {String} req.headers.access_token
 * @param {String} req.headers.time
 * @param {String} req.headers.budget
 * @param {[String]} req.headers.tags
 * @param {[String]} req.headers.coordinate
 */
router.get('/generate_course', async function(req, res) {

    let user = await UserModel.findOne({access_token: req.headers.access_token}, "-_id id pseudo").catch(error => error);

    if (!user) {
        return res.status(400).send({status: "You are not connected."});
    }
    if (user.reason) {
        return res.status(400).send({status: "Error in database transaction:\n", error: user});
    }

    if (!req.headers.coordinate || !req.headers.time || !req.headers.budget || !req.headers.tags) {
        return res.status(400).send({status: "Parameter required is missing."});
    }
    let tags = req.headers.tags.split(',');
    let generated_course = TON_ALGO_ICI;
    if (generated_course) {
        return res.status(200).send({status: "Result of the generator.", generated_course});
    }
    return res.status(400).send({status: "An error occured during the generation of the course"});
});



module.exports = router;
