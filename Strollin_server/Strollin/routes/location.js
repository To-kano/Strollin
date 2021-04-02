var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const axios = require('axios')

const {
  LocationModel
} = require("../models/location")

const {
    UserModel
} = require("../models/user")


// NEW_LOCATION
/**
 * Create a new location
 * @param {String} req.headers.access_token
 *
 * @param {String} req.body.name
 * @param {UserID} req.body.owner (Optional)
 * @param {Number} req.body.latitude
 * @param {Number} req.body.longitude
 * @param {String} req.body.address
 * @param {String} req.body.city (Optional)
 * @param {String} req.body.country (Optional)
 * @param {String} req.body.description (Optional)
 * @param {[String, String]} req.body.price_range (Optional)
 * @param {String} req.body.timetable (Optional)
 * @param {String} req.body.tags_list (Optional)
 * @param {String} req.body.price (Optional)
 * @param {String} req.body.average_time (Optional)
 * @param {String} req.body.phone (Optional)
 * @param {String} req.body.website (Optional)
 */
router.post('/new_location', async function(req, res) {

    let location = null;
    let user = await UserModel.findOne({access_token: req.headers.access_token});
    let owner = null;

    if (!user) {
        return res.status(400).send({status: "You are not connected."});
    }
    if (!req.body.name || !req.body.latitude || !req.body.longitude || !req.body.address) {
        return res.status(400).send({status: "Required data missing"});
    }
    location = await LocationModel.findOne({name: req.body.name, address: req.body.address});
    if (location)
        return res.status(400).send({status: "The location exists already."});
    if (req.body.owner) {
        owner = await UserModel.findOne({id: req.body.owner}, "-_id id pseudo");
        if (!owner) {
            return res.status(400).send({status: "The owner is not valid"});
        }
    }
    location = new LocationModel({
        id: new Number(Date.now()),
        name: req.body.name,
        owner_id: owner.id,
        owner_pseudo: owner.pseudo,
        coordinate: req.body.coordinate,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        description: req.body.description,
        timetable: req.body.timetable,
        tags_list: req.body.tags_list,
        price_range: req.body.price_range,
        average_time: req.body.average_time,
        phone: req.body.phone,
        website: req.body.website
    });
    let error = await location.save().catch(error => error);
    if (error.errors) {
        return res.status(400).send({status: "Error in database transaction", error: error});
    }
    return res.status(200).send({status: "Location created."});
});


// UPDATE_LOCATION
/**
 * Update a location's data (at least one body parameter)
 * @param {String} req.headers.access_token
 * @param {String} req.headers.location_id
 *
 * @param {String} req.body.name (Optional)
 * @param {UserID} req.body.owner (Optional)
 * @param {Number} req.body.latitude (Optional)
 * @param {Number} req.body.longitude (Optional)
 * @param {String} req.body.address (Optional)
 * @param {String} req.body.city (Optional)
 * @param {String} req.body.country (Optional)
 * @param {String} req.body.description (Optional)
 * @param {String} req.body.timetable (Optional)
 * @param {String} req.body.tags_list (Optional)
 * @param {String} req.body.price (Optional)
 * @param {String} req.body.average_time (Optional)
 * @param {String} req.body.phone (Optional)
 * @param {String} req.body.website (Optional)
 */
router.post('/update_location', async function(req, res) {

    let location = LocationModel;
    let update = {};
    let user = await UserModel.findOne({access_token: req.headers.access_token});

    if (!user) {
        return res.status(400).send({status: "You are not connected."});
    }
    if (req.body.name)
        update.name = req.body.name
    if (req.body.owner)
        update.owner = req.body.owner
    if (req.body.coordinate)
        update.coordinate = req.body.coordinate
    if (req.body.address)
        update.address = req.body.address
    if (req.body.city)
        update.city = req.body.city
    if (req.body.country)
        update.country = req.body.country
    if (req.body.description)
        update.description = req.body.description
    if (req.body.timetable)
        update.timetable = req.body.timetable
    if (req.body.tags_list)
        update.tags_list = req.body.tags_list
    if (req.body.price)
        update.price_range = req.body.price
    if (req.body.average_time)
        update.average_time = req.body.average_time
    if (req.body.phone)
        update.phone = req.body.phone
    if (req.body.website)
        update.website = req.body.website
    error = await location.updateOne({id: req.headers.location_id}, update).catch(error => error);
    if (error.errors) {
        return res.status(400).send({status: "Location could not be updated."});
    }
    return res.status(200).send({status: "Location updated"});
});


// GET_PLACE
/**
 * Get a place data from the Google Place API
 * @param {String} req.headers.access_token
 * @param {String} req.headers.place_name
 */
async function placeCall(url) {
  const result = fetch(url, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then(function (answer){
      return answer
    })
    .catch((error) => {
      console.error('error :', error);
    });
    return result
}

router.get('/get_place', async function(req, res) {

    /*let user = await UserModel.findOne({access_token: req.headers.access_token});
    if (!user) {
        return res.status(400).send({status: "You are not connected."});
    }*/

    let url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + req.headers.place_name + "&inputtype=textquery&key=AIzaSyC4MiDbDXP5M3gvpyUADaIUO60H7Vjb9Uk"
    let research = await placeCall(url).then((response) => {
      return response
    })
    console.log("_____________________________")
    console.log(research)
    url = "https://maps.googleapis.com/maps/api/place/details/json?place_id=" + research.candidates[0].place_id + "&fields=formatted_address,geometry,name,type,opening_hours,website,price_level,rating,review,international_phone_number,user_ratings_total,photo&key=AIzaSyC4MiDbDXP5M3gvpyUADaIUO60H7Vjb9Uk"
    let result = await placeCall(url).then((response) => {
      return response
    })

    if (result.status === 'OK') {
        return res.status(200).send({status: true, result})
    }
    return res.status(400).send({status: false, error: "Place not found or error occured."})
});


// GET_LOCATIONS
/**
 * Get the list of locations in database
 * @param {String} req.headers.access_token
 */
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
    //     query.coordinate = req.headers.coordinate; // To replace by a range of coordinate
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
    locations_list = await LocationModel.find(query, "-_id");
    return res.status(200).send({status: "List of locations returned.", locations_list});
});

// GET_LOCATIONS_BY_ID
/**
 * Get location(s) by ID
 * @param {String} req.headers.access_token
 * @param {LocationID || [LocationID]} req.headers.locations_id_list
 */
router.get('/get_locations_by_id', async function(req, res) {

    let user = await UserModel.findOne({access_token: req.headers.access_token});

    if (!user) {
        return res.status(400).send({status: "You are not connected."});
    }
    let given_list = req.headers.locations_id_list.split(',')
    let locations_list = await LocationModel.find({id: {$in: given_list}}).catch(error => error);
    if (locations_list.reason) {
        return res.status(400).send({status: "Error in the parameters.", error: locations_list});
    } else if (locations_list.length > 0) {
        return res.status(200).send({status: "Location(s) found.", locations_list});
    } else {
        return res.status(400).send({status: "Location(s) not found.", error: locations_list});
    }
});

/*router.get('/get_location_position', async function(req, res) {
    let url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + req.headers.place_name + "&inputtype=textquery&fields=formatted_address,geometry&key=AIzaSyDWnNbYqihMAkObSa_KDJ11YNBD4ffpNBk&language=" + req.headers.language
    let result = await placeCall(url).then((response) => {
      return response.candidates[0]
    })
    console.log(result)
    if (result) {
        return res.status(200).send({status: true, result})
    }
    return res.status(400).send({status: false, error: "Place not found or error occured."})
});*/


module.exports = router;
