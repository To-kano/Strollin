var express = require('express');
var router = express.Router();

router.get('/', async function (req, res) {

    res.status(200).json({
        documentation: url,
    });
});
