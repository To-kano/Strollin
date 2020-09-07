var PlacesJson = require('./Ressources/Places');
var TagsJson = require('./Ressources/UserTags');

var methods = {}

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

//Calcul the distance betwenn two points
function DistCalc2D(UserPos, PlacePos) {

  var X1 = UserPos[0]
  var X2 = PlacePos[0]
  var Y1 = UserPos[1]
  var Y2 = PlacePos[1]

  var res = Math.sqrt( Math.pow((X1 - X2), 2) + Math.pow((Y1 - Y2), 2) )
  return res;
}

function algoTest(UserTags, Places) {
  return new Promise((resolve, reject) => {

    var PlacesArray = []

    //console.log(Places);
    //console.log(UserTags);

    for (var i = 0; i < Places.List.length; i++) {
      if (IsTagOk(UserTags, Places.List[i]) == true) {
        PlacesArray.push(Places.List[i])
      }
    }
    for (var i = 0; i < PlacesArray.length; i++) {
      PlacesArray[i].Dist = DistCalc2D(PlacesArray[i].Pos, TagsJson.Pos)
    }
    PlacesArray.sort(compare)
    console.log("PlacesArray", PlacesArray);

    resolve(PlacesArray[0])
  });
}

methods.hello = function ()
{
  return new Promise((resolve, reject) => {
    var test = algoTest(TagsJson, PlacesJson)
    resolve(test)
  });
}

//algoTest(TagsJson, PlacesJson)
//DistCalc2D([-7,-4], [17,6.5])

exports.data = methods;
