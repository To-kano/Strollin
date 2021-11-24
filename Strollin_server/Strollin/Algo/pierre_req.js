var methods = {}

const {
  LocationModel
} = require("../models/location")

function compare(a, b) {
  if (a.website > b.website) return 1;
  if (b.website > a.website) return -1;
}

//Check if the place contains tags corsponding with those of the user
function IsTagOk(UserTags, Place) {

  for (var i = 0; i < Place.tags_list.length; i++) {
    for (var j = 0; j < UserTags.length; j++) {
      if (Place.tags_list[i]._id == UserTags[j])
        return true;
    }
  }
  return false
}

//Calcul the distance betwenn two points
function DistCalc2D(UserPos, PlacePos) {

  var lat1 = UserPos.latitude
  var lat2 = PlacePos[0]
  var lon1 = UserPos.longitude
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

function NotInOldList(Place, old_locations_list) {
  for (var i = 0; i < old_locations_list.length; i++) {
    if (old_locations_list[i] == Place.id) {
      return false
    }
  }
  return true
}

function algoTest(params, test_list) {

  //console.log("food bool: ", Food);
  return new Promise((resolve, reject) => {

    var PlacesArray = [];
    var x = 0;
    //Put all the places corresponding to the user tags in a new array (PlacesArray)
    for (var i = 0; i < test_list.length && x < params.placeNbr; i++) {
      if (IsTagOk(params.tags, test_list[i]) == true && DistCalc2D(test_list[i], params.coordinate) < params.radius && NotInOldList(test_list[i], params.locations_list) == true) {
        PlacesArray.push(test_list[i])
        x++;
      }
    }
    console.log("Places pierre: ", PlacesArray);
    resolve(PlacesArray)
  });
}

hello = async function(params, test_list)
{
  return new Promise((resolve, reject) => {
    var test = algoTest(params, test_list)
    resolve(test)
  })
}

methods.pierre = async function(time, tags, coordinate, radius, placeNbr, locations_list) {
  console.log("------------------------------------------------------------------");
  var UserPos = [];
  var coordinateArr = coordinate.split(",");
  var tagsArray = tags.split(",");

  time = parseInt(time, 10);
  placeNbr = parseInt(placeNbr, 10);

  UserPos[0] = parseFloat(coordinate[0]);
  UserPos[1] = parseFloat(coordinate[1]);
  radius = radius * 1000;

  var params = {time: time, tags: tagsArray, coordinate: coordinateArr, radius: radius, placeNbr: placeNbr, locations_list: locations_list}
  let query = {};
  var locations_list = await LocationModel.find(query);

  const promise1 = hello(params, locations_list)
  return promise1;
}

exports.data = methods;
