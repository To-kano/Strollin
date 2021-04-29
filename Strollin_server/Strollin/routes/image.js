var express = require('express');
var router = express.Router();

const {
    ImageModel
} = require("../models/image")


/* GET home page. */
router.get('/id', function (req, res, next) {

    let image = await ImageModel.findOne({ id: req.headers.id }).catch(error => error);

    if (image) {
        res.status(200).json({
            image: image,
        });
    } else {
        return res.status(400).send({ status: "image id unknow" });
    }
});


module.exports = router;
