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

const {
    TagModel
} = require("../models/tag")


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
 * @param {[String, String, String]} req.body.price_range (Optional)
 * @param {String} req.body.timetable (Optional)
 * @param {[String]} req.body.tags_list (Optional)
 * @param {String} req.body.average_time (Optional)
 * @param {String} req.body.phone (Optional)
 * @param {String} req.body.website (Optional)
 * @param {Boolean} req.body.food (Optional)
 */
router.post('/new_location', async function(req, res) {

    let location = null;
    let owner = null;
    let user = await UserModel.findOne({access_token: req.headers.access_token}, "-_id id pseudo").catch(error => error);

    if (!user) {
        return res.status(401).send({ error_code: 1 });
    }
    if (user.reason) {
        return res.status(500).send({ error_code: 2 });
    }
    if (!req.body.name || !req.body.latitude || !req.body.longitude || !req.body.address) {
        return res.status(400).send({ error_code: 3 });
    }
    location = await LocationModel.findOne({name: req.body.name, address: req.body.address});
    if (location) {
        return res.status(409).send({ error_code: 3 });
    }
    if (req.body.owner) {
        owner = await UserModel.findOne({id: req.body.owner}, "-_id id pseudo").catch(error => error);
        if (!owner) {
            return res.status(400).send({ error_code: 4 });
        } else if (owner.reason) {
            return res.status(500).send({ error_code: 2 });
        } else {
            owner = owner.id;
        }
    }
    if (req.body.tags_list) {
        let tag = undefined;
        for (let index in req.body.tags_list) {
            tag = undefined;
            tag = await TagModel.findOne({name: req.body.tags_list[index]}, "-_id").catch(error => error);
            if (!tag) {
                return res.status(400).send({ error_code: 4 });
            } else if (tag.reason) {
                return res.status(500).send({ error_code: 2 });
            }
        }
    }

    let model = {
        id: new Number(Date.now()),
        name: req.body.name,
        owner_id: owner,
        owner_pseudo: owner.pseudo,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        tags_list: req.body.tags_list,
        price_range: req.body.price_range,
        average_time: req.body.average_time,
        food: req.body.food
    }

    if (req.body.description) {

        model.description = req.body.description
    }
    if (req.body.timetable) {

        model.timetable = req.body.timetable
    }
    if (req.body.phone) {

        model.phone = req.body.phone
    }
    if (req.body.website) {

        model.website = req.body.website
    }

    location = new LocationModel(model);
    let error = await location.save().catch(error => error);
    if (error.errors) {
        return res.status(500).send({ error_code: 2 });
    }
    return res.status(200).send({ status: "Location created." });
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
 * @param {String} req.body.price_range (Optional)
 * @param {String} req.body.timetable (Optional)
 * @param {String} req.body.average_time (Optional)
 * @param {String} req.body.phone (Optional)
 * @param {String} req.body.website (Optional)
 * @param {Boolean} req.body.food (Optional)
 * @param {String} req.body.tags_list (Optional)  = "tag1,tag2,tag3"
 */
router.post('/update_location', async function(req, res) {

    let update = {};
    let user = await UserModel.findOne({access_token: req.headers.access_token}, "-_id id pseudo").catch(error => error);
    let location = undefined;

    if (!user) {
        return res.status(401).send({ error_code: 1 });
    }
    if (user.reason) {
        return res.status(500).send({ error_code: 2 });
    }

    location = await LocationModel.findOne({id: req.headers.location_id}, "-_id").catch(error => error);
    if (!location) {
        return res.status(400).send({ error_code: 4 });
    }
    if (location.reason) {
        return res.status(500).send({ error_code: 2 });
    }

    if (req.body.name) {
        update.name = req.body.name
    }
    if (req.body.owner_id) {
        console.log("je updtae ta daronne: ", user.id)
        update.owner_id = Number(user.id)
    }
    if (req.body.owner) {
        let owner = await UserModel.findOne({id: req.body.owner}, "-_id id pseudo").catch(error => error);
        if (!owner) {
            return res.status(400).send({ error_code: 4 });
        } else if (owner.reason) {
            return res.status(500).send({ error_code: 2 });
        } else {
            update.owner_id = req.body.owner;
            update.owner_pseudo = owner.pseudo;
        }
    }
    if (req.body.latitude) {
        update.latitude = req.body.latitude
    }
    if (req.body.longitude) {
        update.longitude = req.body.longitude
    }
    if (req.body.address) {
        update.address = req.body.address
    }
    if (req.body.city) {
        update.city = req.body.city
    }
    if (req.body.country) {
        update.country = req.body.country
    }
    if (req.body.description) {
        update.description = req.body.description
    }
    if (req.body.timetable) {
        update.timetable = req.body.timetable
    }
    if (req.body.price_range) {
        update.price_range = req.body.price_range
    }
    if (req.body.average_time) {
        update.average_time = req.body.average_time
    }
    if (req.body.phone) {
        update.phone = req.body.phone
    }
    if (req.body.website) {
        update.website = req.body.website
    }
    if (req.body.tags_list) {
        update.tags_list = req.body.tags_list
    }
    if (req.body.pop_disp) {
        update.pop_disp = req.body.pop_disp
    }
    if (req.body.pop_ag) {
        update.pop_ag = req.body.pop_ag
    }
    if (req.body.tags_list) {
        console.log("tags_list: ", req.body.tags_list);
        update.tags_list = req.body.tags_list;
    }
    error = await LocationModel.updateOne({id: location.id}, update).catch(error => error);
    if (error.errors) {
        return res.status(500).send({ error_code: 2 });
    }
    return res.status(200).send({ status: "Location updated" });
});


// ADD_LOCATION_TAG
/**
 * Update a location's tag
 * @param {String} req.headers.access_token
 * @param {String} req.headers.location_id
 *
 * @param {String} req.body.tags_list
 */
router.post('/add_location_tag', async function(req, res) {

    console.log("req: ", req.headers.location_id, " : ", req.body.tags_list);
    let user = await UserModel.findOne({access_token: req.headers.access_token}, "-_id id pseudo").catch(error => error);
    let location = undefined;

    if (!user) {
        return res.status(401).send({ error_code: 1 });
    }
    if (user.reason) {
        return res.status(500).send({ error_code: 2 });
    }

    location = await LocationModel.findOne({id: req.headers.location_id}).catch(error => error);
    if (!location) {
        return res.status(400).send({ error_code: 4 });
    }
    if (location.reason) {
        return res.status(500).send({ error_code: 2 });
    }

    if (!req.body.tags_list) {
        return res.status(400).send({ error_code: 3 });
    }

    let tags = req.body.tags_list.split(',');
    let tag = undefined;

    for (let index = 0; index < tags.length ; index++) {
        tag = undefined;
        tag = await TagModel.findOne({name: tags[index]}).catch(error => error);
        if (!tag) {
            return res.status(400).send({ error_code: 4 });
        }
        if (tag.reason) {
            return res.status(500).send({ error_code: 2 });
        }
    }

    error = await LocationModel.updateOne({id: location.id}, {$push: {tags_list: {_id: tag.name, disp: 0}}}).catch(error => error);
    if (error.errors) {
        return res.status(500).send({ error_code: 2 });
    }
    return res.status(200).send({ status: "Location updated" });
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

    // let user = await UserModel.findOne({access_token: req.headers.access_token}, "-_id id pseudo").catch(error => error);
    // if (!user) {
    //     return res.status(401).send({ error_code: 1 });
    // }
    // if (user.reason) {
    //     return res.status(500).send({ error_code: 2 });
    // }

    let url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + req.headers.place_name.toLowerCase() + "&inputtype=textquery&key=AIzaSyDPc6ZV5KYveppsIq8o_1oeVEZ6CShTX4w"
    let research = await placeCall(url).then((response) => {
      return response
    })
    console.log("_____________________________")
    console.log(research)
    url = "https://maps.googleapis.com/maps/api/place/details/json?place_id=" + research.candidates[0].place_id + "&fields=formatted_address,geometry,name,type,opening_hours,website,price_level,rating,review,international_phone_number,user_ratings_total,photo&key=AIzaSyDPc6ZV5KYveppsIq8o_1oeVEZ6CShTX4w"
    let result = await placeCall(url).then((response) => {
      return response
    })

    if (result.status === 'OK') {
        return res.status(200).send({ status: true, result})
    }
    return res.status(400).send({ error_code: false, error: "Place not found or error occured." })
});


// GET_LOCATIONS
/**
 * Get the list of locations in database
 * @param {String} req.headers.access_token
 */
router.get('/get_locations', async function(req, res) {

    let locations_list = undefined;
    let query = {};
    let user = await UserModel.findOne({access_token: req.headers.access_token}, "-_id id pseudo").catch(error => error);

    if (!user) {
        return res.status(401).send({ error_code: 1 });
    }
    if (user.reason) {
        return res.status(500).send({ error_code: 2 });
    }
    locations_list = await LocationModel.find(query, "-_id").catch(error => error);
    if (locations_list.reason) {
        return res.status(500).send({ error_code: 2 });
    }
    return res.status(200).send({ status: "List of locations returned.", locations_list});
});


// GET_PARTNER_LOCATION
/**
 * Get the location of the partner
 * @param {String} req.headers.access_token
 */
router.get('/get_partner_location', async function(req, res) {

    let location = undefined;
    //console.log('req',req);
    let user = await UserModel.findOne({access_token: req.headers.access_token}, "-_id id pseudo partner").catch(error => error);

    if (!user) {
        return res.status(401).send({ error_code: 1 });
    }
    if (user.reason) {
        return res.status(500).send({ error_code: 2 });
    }
    /*if (user.partner == false) {
        return res.status(401).send({ error_code: 5 });
    }*/
    location = await LocationModel.findOne({owner_id: user.id}, "-_id").catch(error => error);
    if (!location) {
        return res.status(200).send({ status: "No location registered in your account", location });
    } else if (location.reason) {
        return res.status(500).send({ error_code: 2 });
    }
    return res.status(200).send({ status: "Location returned.", location});
});


// GET_LOCATIONS_BY_ID
/**
 * Get location(s) by ID
 * @param {String} req.headers.access_token
 * @param {LocationID || [LocationID]} req.headers.locations_id_list
 */
router.get('/get_locations_by_id', async function(req, res) {

    let user = await UserModel.findOne({access_token: req.headers.access_token}, "-_id id pseudo").catch(error => error);

    if (!user) {
        return res.status(401).send({ error_code: 1 });
    }
    if (user.reason) {
        return res.status(500).send({ error_code: 2 });
    }
    let given_list = req.headers.locations_id_list.split(',')
    let locations_list = await LocationModel.find({id: {$in: given_list}}).catch(error => error);
    if (locations_list && locations_list.reason) {
        return res.status(500).send({ error_code: 2 });
    } else if (locations_list.length > 0) {
        return res.status(200).send({ status: "Location(s) found.", locations_list});
    } else {
        return res.status(200).send({ status: "Location(s) not found.", locations_list});
    }
});

router.get('/get_location_position', async function(req, res) {
    let url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + req.headers.place_name + "&inputtype=textquery&fields=formatted_address,geometry&key=AIzaSyDPc6ZV5KYveppsIq8o_1oeVEZ6CShTX4w&language=" + req.headers.language
    let result = await placeCall(url).then((response) => {
      return response.candidates[0]
    })
    console.log(result)
    if (result) {
        return res.status(200).send({ status: true, result})
    }
    return res.status(400).send({ error_code: false, error: "Place not found or error occured." })
});

router.post('/check_open', async function(req, res) {

    console.log("##################################################################################################################");
    var array = req.body.list;
    for (var i = 0; i < array.length; i++) {
      let name = array[i].name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      let url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + name + "&inputtype=textquery&fields=name,formatted_address,opening_hours&key=AIzaSyDPc6ZV5KYveppsIq8o_1oeVEZ6CShTX4w"
      let result = await placeCall(url)
      console.log("candidat: ", result.candidates);
      if (!result.candidates[0].opening_hours || result.candidates[0].opening_hours.open_now == true) {
        array[i].website = true;
      }
      else {
        array[i].website = false;
      }
    }
    return res.status(200).send({status: true, res: array})
});

module.exports = router;
