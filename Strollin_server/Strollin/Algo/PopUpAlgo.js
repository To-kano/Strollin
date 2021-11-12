
var TagsJson = require('./Ressources/UserTags');
var Sponsors = require('./Ressources/Sponsors');

var algo = require('./BasicAlgo2');
var methods = {}

const {
  LocationModel
} = require("../models/location")

//Calcul the distance betwenn two points
function DistCalc2D(UserPos, PlacePos) {

  var X1 = UserPos[0]
  var X2 = PlacePos[0]
  var Y1 = UserPos[1]
  var Y2 = PlacePos[1]

  var res = Math.sqrt( Math.pow((X1 - X2), 2) + Math.pow((Y1 - Y2), 2) )
  return res;
}

function compare(a, b) {
  if (a.Dist > b.Dist) return 1;
  if (b.Dist > a.Dist) return -1;
}

function IsTagUnique(Place, Destinations) {
  for (var i = 0; i < Destinations.length; i++) {
    if (Destinations[i].Name == Place.Name) {
      return false;
    }
  }
  return true;
}

//Check if the place contains tags coresponding with those of the user
function IsTagOk(UserTags, Place, Destinations) {

  console.log("usreTags: ", UserTags);

  for (var i = 0; i < Place.Tags.length; i++) {
    for (var j = 0; j < UserTags.length; j++) {
      if (Place.Tags[i] == UserTags[j]) {
        if (IsTagUnique(Place, Destinations) == true) {
          return true;
        }
      }
    }
  }
  return false
}

function PopupAlgo(tags, Sponsors, Destinations, UserPos) {

  for (var i = 0; i < Sponsors.length; i++) {
    if (IsTagOk(tags, Sponsors[i], Destinations) == true /*&& DistCalc2D(UserPos, Sponsors[i].Pos) < 100*/) {
      console.log("je passe par la");
      return(Sponsors[i])
    }
  }
}

//List: List of Places
//Destination: Course
methods.Popup = function (Destinations, List, LocationModel, tags, coordinate, test_list) {
  let location = LocationModel;
  var res;
  var UserPos = coordinate.split(',');
  let partner = [];
  let j = 0;

  console.log("positionnnn: ", coordinate);
  for (var i = 0; i < List.length; i++) {
    //console.log("oui");
    if (List[i].Owner == 'qqn') {
      partner[j] = List[i]
      j++
    }
  }

  while(1) {
    res = PopupAlgo(tags, partner, Destinations, UserPos)
    if (res != false)
      console.log("lets go to ", res);
      res.Dist = DistCalc2D(UserPos, res.Pos);
      Destinations.push(res)
      Destinations.sort(compare)
      console.log("final: ", Destinations);
      res.PopDisp++
      console.log("disp: ", res.PopDisp);
      location.updateOne({name: res.Name}, { $set: { pop_disp : res.PopDisp.toString()} }, function(err, raw) {
          if (err) {
              return res.status(500).send({ error_code: 2 });
          } else {
              console.log("Location updated: ", raw)
          }
      })
      return res
  }
}

methods.Response = function (popup) {
  let location = LocationModel;
  let ag = popup.PopAg + 1

  console.log("pop_ag: ", ag);
  location.updateOne({id: popup.Id}, { $set: { pop_ag : ag.toString()} }, function(err, raw) {
      if (err) {
          return res.status(500).send({ error_code: 2 });
      } else {
          console.log("Location updated: ", raw)
      }
  })
}

exports.data = methods;
