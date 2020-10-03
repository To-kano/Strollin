
var PlacesJson = require('./Ressources/Places');
var TagsJson = require('./Ressources/UserTags2');
var Sponsors = require('./Ressources/Sponsors');

var algo = require('./BasicAlgo2');
var methods = {}

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

//Check if the place contains tags corsponding with those of the user
function IsTagOk(UserTags, Place) {

  for (var i = 0; i < Place.Tags.length; i++) {
    for (var j = 0; j < UserTags.Tags.length; j++) {
      if (Place.Tags[i] == UserTags.Tags[j])
        return true;
    }
  }
  return false
}

function PopupAlgo(TagsJson, Sponsors) {
  var UserPos = TagsJson.Pos;

  for (var i = 0; i < Sponsors.List.length; i++) {
    console.log(DistCalc2D(UserPos, Sponsors.List[i].Pos));
    if (IsTagOk(TagsJson, Sponsors.List[i]) == true && DistCalc2D(UserPos, Sponsors.List[i].Pos) < 10) {
      console.log("ok", Sponsors.List[i].Name);
      return(Sponsors.List[i])
    }
  }
}

methods.Popup = function (Destinations)
{
  var res;
  var UserPos = TagsJson.Pos;

  while(1) {
    res = PopupAlgo(TagsJson, Sponsors)
    if (res != false)
      console.log("lets go to ", res);
      res.Dist = DistCalc2D(UserPos, res.Pos);
      Destinations.push(res)
      Destinations.sort(compare)
      console.log("final: ", Destinations);
      return
  }
}


exports.data = methods;
