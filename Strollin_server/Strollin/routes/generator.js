var express = require('express');
var router = express.Router();
var algo = require('../Algo/BasicAlgo2');

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

    let user = await UserModel.findOne({access_token: req.headers.access_token});
    if (!user) {
        return res.status(400).send({status: "You are not connected."});
    }

    if (!req.headers.coordinate || !req.headers.time || !req.headers.budget || !req.headers.tags) {
        return res.status(400).send({status: "Parameter required is missing."});
    }
    let tags = req.headers.tags.split(',');
    console.log("lets goooooo");
    const promise2 = algo.data.test(req.headers.time , req.headers.budget , req.headers.tags , req.headers.coordinate);
    promise2.then((value) => {
      let generated_course = value;
      console.log("vourse: ", generated_course);
      if (generated_course) {
          return res.status(200).send({status: "Result of the generator.", generated_course});
      }
      return res.status(400).send({status: "An error occured during the generation of the course"});
    })
});



module.exports = router;
