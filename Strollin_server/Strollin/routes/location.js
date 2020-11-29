var express = require('express');
var router = express.Router();

const {
  LocationModel
} = require("../models/location")


router.post('/new_location', async function(req, res) {

    let location = null;
    let user = await UserModel.findOne({access_token: req.headers.access_token});

    if (!user) {
        return res.status(400).send({status: "You are not connected."});
    }
    if (!req.body.name || !req.body.coordinate || !req.body.address) {
        return res.status(400).send({status: "Required data missing"});
    }
    location = await LocationModel.findOne({name: req.body.name, address: req.body.address});
    if (location)
        return res.status(400).send({status: "The location exists already."});
    tag = new LocationModel({
        name: req.body.name,
        owner: req.body.owner,
        coordinate: req.body.coordinate,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        description: req.body.description,
        timetable: req.body.timetable,
        tags_list: req.body.tags_list,
        price_range: req.body.price
    });
    await location.save();
    return  res.status(200).send({status: "Tag created."});
});


router.get('/get_locations', async function(req, res) {

    let user = await UserModel.findOne({access_token: req.headers.access_token});
    let locations_list = null;
    let query = {};

    if (!user) {
        return res.status(400).send({status: "You are not connected."});
    }
    // if (req.headers.name) {
    //     query.name = req.headers.name;
    // }
    // if (req.headers.owner) {
    //     query.owner = req.headers.owner;
    // }
    // if (req.headers.coordinate) {
    //     query.coordinate = req.headers.coordinate; // A remplacer par une Range de coordinate
    // }
    // if (req.headers.city) {
    //     query.city = req.headers.city;
    // }
    // if (req.headers.country) {
    //     query.country = req.headers.country;
    // }
    // if (req.headers.tags_list) {
    //     query.tags_list = {$in: [req.headers.tags_list]};
    // }
    locations_list = await LocationModel.find(query)
    return res.status(200).send({status: "List of locations returned.", locations_list});
});



module.exports = router;