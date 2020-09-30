
var PlacesJson = require('./Ressources/Places');
var TagsJson = require('./Ressources/UserTags2');
var Sponsors = require('./Ressources/Sponsors');

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

methods.Popup = function ()
{
  var res;
  while(1) {
    res = PopupAlgo(TagsJson, Sponsors)
    if (res != false)
      console.log("lets go to ", res);
      return
  }
}


exports.data = methods;
