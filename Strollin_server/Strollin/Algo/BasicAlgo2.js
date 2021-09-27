var PlacesJson = require('./Ressources/Places');
var TagsJson = require('./Ressources/UserTags');
var pop = require('./PopUpAlgo');
var methods = {}
const fetch = require('node-fetch');

const {
  LocationModel
} = require("../models/location")

const {
    TagModel
} = require("../models/tag")

const {
  UserModel
} = require("../models/user")

function compare(a, b) {
  if (a.Dist > b.Dist) return 1;
  if (b.Dist > a.Dist) return -1;
}

//Check if the place contains tags corsponding with those of the user
function IsTagOk(UserTags, Place) {

  for (var i = 0; i < Place.Tags.length; i++) {
    for (var j = 0; j < UserTags.length; j++) {
      if (Place.Tags[i] == UserTags[j])
        return true;
    }
  }
  return false
}

function SingleTagOk(UserTags, Place) {

  for (var i = 0; i < Place.Tags.length; i++) {
      if (Place.Tags[i] == UserTags) {
        return true;
      }
  }
  return false
}

//Calcul the distance betwenn two points
function DistCalc2D(UserPos, PlacePos) {

  var lat1 = UserPos[0]
  var lat2 = PlacePos[0]
  var lon1 = UserPos[1]
  var lon2 = PlacePos[1]



  const R = 6371e3; // metres
  const φ1 = lat1 * Math.PI/180; // φ, λ in radians
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c; // in metres

  return d;
}

function AddTagsDisp(List, UserTags, i) {
  for (var l = 0; l < UserTags.length; l++) {
    if (CheckTagsDisp(List, i, UserTags[l]) == false && SingleTagOk(UserTags[l], List[i]) == true) {
      List[i].TagsDisp.push([UserTags[l], 1])
      break;
    }
  }
}

function CheckTagsDisp(List, i, UserTag) {

  var flag = false;

  for (var j = 0; j < List[i].TagsDisp.length; j++) {
    if (UserTag == List[i].TagsDisp[j][0]) {
      List[i].TagsDisp[j][1]++
      flag = true;
    }
  }
  return flag
}

function AddRef(List, UserTags) {
  for (var i = 0; i < List.length; i++) {
    AddTagsDisp(List, UserTags, i);
  }

}

function CheckFood(Food, PlaceFood) {
  if (Food === "true")
    return true;
  else {
    //console.log("\n\n place food \n\n");
    if (PlaceFood === true) {
      //console.log("FALSE");
      return false;
    }
    else
      return true
  }
}

function NotInOldList(Place, old_locations_list) {
  let rand = 0;
  for (var i = 0; i < old_locations_list.length; i++) {
    if (old_locations_list[i] == Place.Id) {
      rand = Math.floor(Math.random() * 3);
      if (rand == 0) {
        return true
      }
      return false
    }
  }
  return true
}

function IsForMinor(Place, is18) {
  if (is18 == "true") {
    return true
  }
  console.log("place: ", Place);
  for (var i = 0; i < Place.Tags.length; i++) {
    if (Place.Tags[i] == "bar" || Place.Tags[i] == "night_club" || Place.Tags[i] == "sex_shop" || Place.Tags[i] == "18+_only") {
      return false
    }
  }
  return true
}

function algoTest(Places, Food, time, budget, tags, coordinate, radius, placeNbr, old_locations_list, is18) {

  //console.log("food bool: ", Food);
  return new Promise((resolve, reject) => {

    var PlacesArray = []
    var FinalArray = []
    var UserPos = []
    var tagsArray = tags.split(",");
    var budgetNb = parseInt(budget, 10);
    var timeNb = parseInt(time, 10);
    placeNbr = parseInt(placeNbr, 10);

    UserPos[0] = parseFloat(coordinate[0]);
    UserPos[1] = parseFloat(coordinate[1]);

    //console.log("..............................POs: ", UserPos);
    radius = radius * 1000;
    //console.log("radius: ", radius);
    //console.log("old_locations_list: ", old_locations_list);
    //console.log("TAGS ------------------------: ", UserTags);
    console.log("is18: ", is18);
    //Put all the places corresponding to the user tags in a new array (PlacesArray)
    for (var i = 0; i < Places.length; i++) {
      if (IsTagOk(tagsArray, Places[i]) == true && DistCalc2D(Places[i].Pos, UserPos) < radius && NotInOldList(Places[i], old_locations_list) == true && IsForMinor(Places[i], is18) == true) {
        PlacesArray.push(Places[i])
      }
    }
    //console.log("VALID: ", PlacesArray);

    //Calculate the closest place compared to the previous place
    for (var cpt = 0; cpt < placeNbr && PlacesArray.length > 0; cpt++) {
      for (var i = 0; i < PlacesArray.length; i++) {
        PlacesArray[i].Dist = DistCalc2D(PlacesArray[i].Pos, UserPos)
      }
      PlacesArray.sort(compare)
      //console.log("\nplace array\n: ", PlacesArray[0]);
      if (budgetNb > PlacesArray[0].Price && timeNb > PlacesArray[0].Time && CheckFood(Food, PlacesArray[0].Food)) {
        FinalArray.push(PlacesArray[0])
        budgetNb -= PlacesArray[0].Price
        timeNb -= PlacesArray[0].Time
        //console.log("Temps: ", timeNb);
      }
      UserPos = PlacesArray[0].Pos
      PlacesArray.shift()
    }
    AddRef(FinalArray, tagsArray)
    resolve(FinalArray)
  });
}

//gets the tags from tge DB and transform them to a json with the right format
async function getTags(time, budget, tags, coordinate, eat, radius, placeNbr, old_locations_list, is18) {
  let query = {};
  let locations_list = null
  let true_list = []
  let tagslist = []
  let test = []
  let tagsMod = []

  let tmpTagDisp = {}
  let tagslistarray = []
  let _id = 0
  let disp = 0
  let User = null
  let UserTags = []

  locations_list = await LocationModel.find(query)
  for (var i = 0; i < locations_list.length; i++) {
    tagsMod = []
    tagslist = []
    for (var j = 0; j < locations_list[i].tags_list.length; j++) {
      test = []
      tagsMod[j] = locations_list[i].tags_list[j]._id
      if (locations_list[i].tags_list[j].disp) {
        test.push(locations_list[i].tags_list[j]._id)
        test.push(locations_list[i].tags_list[j].disp)
      } else {
        test.push(locations_list[i].tags_list[j]._id)
        test.push(0)
      }
      tagslist.push(test)
    }
    true_list.push({
      Tags: tagsMod,
      Pos: [locations_list[i].latitude, locations_list[i].longitude],
      Name: locations_list[i].name,
      Dist: 0,
      Price: Number(locations_list[i].price_range[0]),
      PopDisp: Number(locations_list[i].pop_disp),
      PopAg: Number(locations_list[i].pop_ag),
      AlgDisp: Number(locations_list[i].alg_disp),
      AlgAg: Number(locations_list[i].alg_ag),
      TagsDisp: tagslist,
      Desc: locations_list[i].description,
      Id: locations_list[i].id,
      Owner: locations_list[i].owner,
      Time: Number(locations_list[i].average_time),
      City: locations_list[i].city,
      Food: locations_list[i].food
    })
  }
  /*for (var i = 0; i < true_list.length; i++) {
    console.log("please: ", true_list[i]);
  }*/

  const promise1 = hello(true_list, time, budget, tags, coordinate, eat, radius, placeNbr, old_locations_list, is18)
  return promise1;
}

async function PopUpAlgo(course, coordinate, tags) {
    let location = LocationModel;
    let update = {}
    let query = {};
    let true_list = []
    let tagsMod = []

    //Pop Up ALgo
    for (var i = 0; i < course.length; i++) {
      tagslistarray = []
      for (var j = 0; j < course[i].TagsDisp.length; j++) {
        _id = course[i].TagsDisp[j][0]
        disp = course[i].TagsDisp[j][1]
        tmpTagDisp = {_id, disp}
        tagslistarray.push(tmpTagDisp)
      }
      update.tags_list = tagslistarray
      location.updateOne({name: course[i].Name}, { $set: { tags_list : update.tags_list } }, function(err, raw) {
          if (err) {
              return res.status(400).send({status: "Location could not be updated."});
          } else {
              console.log("Location updated: ", raw)
          }
      })
    }
    //console.log("update: ", update, "tagslistarray: ", tagslistarray);

    locations_list = await LocationModel.find(query)
    for (var i = 0; i < locations_list.length; i++) {
      tagsMod = []
      tagslist = []
      for (var j = 0; j < locations_list[i].tags_list.length; j++) {
        test = []
        tagsMod[j] = locations_list[i].tags_list[j]._id
        if (locations_list[i].tags_list[j].disp) {
          test.push(locations_list[i].tags_list[j]._id)
          test.push(locations_list[i].tags_list[j].disp)
        } else {
          test.push(locations_list[i].tags_list[j]._id)
          test.push(0)
        }
        tagslist.push(test)
      }
      true_list.push({
        Tags: tagsMod,
        Pos: [locations_list[i].latitude, locations_list[i].longitude],
        Name: locations_list[i].name,
        Dist: 0,
        Price: Number(locations_list[i].price_range[0]),
        PopDisp: Number(locations_list[i].pop_disp),
        PopAg: Number(locations_list[i].pop_ag),
        AlgDisp: Number(locations_list[i].alg_disp),
        AlgAg: Number(locations_list[i].alg_ag),
        TagsDisp: tagslist,
        Desc: locations_list[i].description,
        Id: locations_list[i].id,
        Owner: locations_list[i].owner_pseudo,
        Time: Number(locations_list[i].average_time),
        City: locations_list[i].city
      })
    }
    let res = await pop.data.Popup(course, true_list, LocationModel, tags, coordinate)
    //console.log("res print: ", res);
    return res
}

async function checkPlace(location, list) {

  for (var i = 0; i < list.length; i++) {
      if (location.name == list[i].name && location.latitude == list[i].latitude && location.longitude == list[i].longitude)
        return false;
  }
  return true;
}

async function formatPlaces(data) {

  let locations_list = null

  locations_list = await LocationModel.find({})
  //console.log("list: ", locations_list);
  let array = [];
  let flag = false;
  var tmp = [];

  for (var i = 0; i < data.length; i++) {
    let location = new LocationModel({
        id: "",
        name: "",
        owner_id: "",
        owner_pseudo: "",
        coordinate: "",
        score: "",
        latitude: "",
        longitude: "",
        address: " ",
        city: " ",
        country: " ",
        description: "",
        timetable: "",
        tags_list: "",
        price_range: [ "0", "0", "0" ],
        average_time: "15",
        phone: "",
        website: ""
    });
    tmp = data[i].vicinity.split(", ")
    //console.log("TMP: ", tmp);
    if (tmp.length > 1) {
      location.address = tmp[0]
      location.city = tmp[1]
    }
    location.score = data[i].rating
    location.tags_list = [];
    location.id = new Number(Date.now());
    location.name = data[i].name;
    location.latitude = data[i].geometry.location.lat;
    location.longitude = data[i].geometry.location.lng;
    for (var j = 0; j < data[i].types.length; j++) {
      location.tags_list.push({_id: data[i].types[j], disp: 0});
      data[i].types[j]
    }

    //console.log("location: ", location);
    flag = await checkPlace(location, locations_list)
    if (flag == true) {
      console.log("pushing: ", location.name);
      let error = await location.save().catch(error => error);
      if (error.errors) {
          console.log({status: "Error in database transaction", error: error});
      }
    }
  }
}

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

async function callApi(url) {
  let token = null
  let url_tmp = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyD6AVcufnom-RKQJeG8tlxAWhAOKor0-uo"


  await placeCall(url).then((response) => {
    formatPlaces(response.results);
    if (response.next_page_token) {
      token = response.next_page_token
      url_tmp = url_tmp + "&pagetoken=" +  token
      setTimeout(async () => {
        await callApi(url_tmp)
      }, 2000)
    }
  })
}

async function getPlaces(coordinate, type) {
  const https = require('https');
  let url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyD6AVcufnom-RKQJeG8tlxAWhAOKor0-uo&location=" + coordinate[0] + "," + coordinate[1] + "&radius=5000&type=" + type

  await callApi(url)
  /*https.get(url, (resp) => {
    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      data = JSON.parse(data)
      //console.log(data);
      formatPlaces(data.results);
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });*/

}

async function RecoverPlaces(coordinate, tags) {
  let tags_array = tags.split(",")
  var coordinateArr = coordinate.split(",");

  for (var i = 0; i < tags_array.length; i++) {
    //console.log("tags_array: ", tags_array[i]);
      await getPlaces(coordinateArr, tags_array[i]);
  }
  //console.log("fini");
}

hello = async function(sending, time, budget, tags, coordinate, eat, radius, placeNbr, old_locations_list, is18)
{
  var coordinateArr = coordinate.split(",");

  await RecoverPlaces(coordinate, tags)

  console.log("done");
  //promise1.then((value) => {
    //console.log("coordiante: ", coordinateArr);
    return new Promise((resolve, reject) => {
      var test = algoTest(sending, eat, time, budget, tags, coordinateArr, radius, placeNbr, old_locations_list, is18)
      resolve(test)
    });
  //})
}

methods.algo = function(time, budget, tags, coordinate, eat, radius, placeNbr, locations_list, is18) {
  console.log("------------------------------------------------------------------");
  const promise1 = getTags(time, budget, tags, coordinate, eat, radius, placeNbr, locations_list, is18);
  return promise1;
  /*promise1.then((value) => {
    console.log("VALEUUUUUUUUUUUUUUR: ", value);
  });*/
}

methods.pop = function(coordinate, tags, course) {
  console.log("------------------------------------------------------------------");
  const promise1 = PopUpAlgo(course, coordinate, tags)
  return promise1;
  /*promise1.then((value) => {
    console.log("VALEUUUUUUUUUUUUUUR: ", value);
  });*/
}


//algoTest(TagsJson, PlacesJson)
//DistCalc2D([-7,-4], [17,6.5])

exports.data = methods;
