var PlacesJson = require('./Ressources/Places');
var TagsJson = require('./Ressources/UserTags');
var pop = require('./PopUpAlgo');
var methods = {}

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

  var X1 = UserPos[0]
  var X2 = PlacePos[0]
  var Y1 = UserPos[1]
  var Y2 = PlacePos[1]

  var res = Math.sqrt( Math.pow((X1 - X2), 2) + Math.pow((Y1 - Y2), 2) )
  return res;
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
  if (Food == true)
    return true;
  else {
    if (PlaceFood == "Food") {
      console.log("FALSE");
      return false;
    }
    else
      return true
  }
}

function algoTest(Places, Food, time, budget, tags, coordinate) {
  return new Promise((resolve, reject) => {

    var PlacesArray = []
    var FinalArray = []
    var UserPos = []
    var tagsArray = tags.split(",");
    var budgetNb = parseInt(budget, 10);
    var timeNb = parseInt(time, 10);

    UserPos[0] = parseFloat(coordinate[0]);
    UserPos[1] = parseFloat(coordinate[1]);

    console.log("POs: ", UserPos);
    //console.log("TAGS ------------------------: ", UserTags);
    //Put all the places corresponding to the user tags in a new array (PlacesArray)
    for (var i = 0; i < Places.length; i++) {
      if (IsTagOk(tagsArray, Places[i]) == true) {
        PlacesArray.push(Places[i])
      }
    }
    //console.log("VALID: ", PlacesArray);

    //Calculate the closest place compared to the previous place
    for (var cpt = 0; cpt < 10 && PlacesArray.length > 0; cpt++) {
      for (var i = 0; i < PlacesArray.length; i++) {
        PlacesArray[i].Dist = DistCalc2D(PlacesArray[i].Pos, UserPos)
      }
      PlacesArray.sort(compare)
      if (budgetNb > PlacesArray[0].Price && timeNb > PlacesArray[0].Time && CheckFood(Food, PlacesArray[0].City)) {
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
async function getTags(time, budget, tags, coordinate) {
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
      City: locations_list[i].city
    })
  }
  /*for (var i = 0; i < true_list.length; i++) {
    console.log("please: ", true_list[i]);
  }*/

  const promise1 = hello(true_list, time, budget, tags, coordinate)
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
    console.log("update: ", update, "tagslistarray: ", tagslistarray);

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
    console.log("res print: ", res);
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
    console.log("TMP: ", tmp);
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
      console.log("pushing");
      let error = await location.save().catch(error => error);
      if (error.errors) {
          console.log({status: "Error in database transaction", error: error});
      }
    }
  }
}


async function getPlaces(coordinate) {
  const https = require('https');
  let url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyD6AVcufnom-RKQJeG8tlxAWhAOKor0-uo&location=" + coordinate[0] + "," + coordinate[1] + "&radius=100000&rankedby=location"

  https.get(url, (resp) => {
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
  });

}

hello = function(sending, time, budget, tags, coordinate)
{
  var coordinateArr = coordinate.split(",");
  getPlaces(coordinateArr);

  //promise1.then((value) => {
    console.log("coordiante: ", coordinateArr);
    return new Promise((resolve, reject) => {
      var test = algoTest(sending, false, time, budget, tags, coordinateArr)
      resolve(test)
    });
  //})
}

methods.test = function(time, budget, tags, coordinate) {
  console.log("------------------------------------------------------------------");
  const promise1 = getTags(time, budget, tags, coordinate);
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
