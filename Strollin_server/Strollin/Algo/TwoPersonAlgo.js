var PlacesJson = require('./Ressources/Places');
var TagsJson = require('./Ressources/UserTags');

var methods = {}

function compare(a, b) {
  if (a.Dist > b.Dist) return 1;
  if (b.Dist > a.Dist) return -1;
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

//Check if the place contains tags corsponding with those of the user
function IsTagOk(UserTags, Place, nb) {

  for (var i = 0; i < Place.Tags.length; i++) {
    for (var j = 0; j < UserTags.Tags[nb].length; j++) {
      if (Place.Tags[i] == UserTags.Tags[nb][j])
        return true;
    }
  }
  return false
}

//Put all the places corresponding to the user tags in a new array (PlacesArray)
function PlaceHasUserTag(UserTags, Places) {
    var FinalArray = Places.List
    var Array = []
    for (var j = 0; j < UserTags.Tags.length; j++) {
      Array = []
      for (var i = 0; i < FinalArray.length; i++) {
        if (IsTagOk(UserTags, FinalArray[i], j) == true) {
          Array.push(FinalArray[i])
        }
      }
      FinalArray = Array
    }
    return(Array)
}

function algoTest(UserTags, Places) {
  return new Promise((resolve, reject) => {

    var PlacesArray = PlaceHasUserTag(UserTags, Places)
    var FinalArray = []
    var UserPos = TagsJson.Pos

    //Calculate the closest place compared to the previous place
    for (var cpt = 0; cpt < 10 && PlacesArray.length > 0; cpt++) {
      for (var i = 0; i < PlacesArray.length; i++) {
        PlacesArray[i].Dist = DistCalc2D(PlacesArray[i].Pos, UserPos)
      }
      PlacesArray.sort(compare)
      if (TagsJson.Budget > PlacesArray[0].Price) {
        FinalArray.push(PlacesArray[0])
        TagsJson.Budget -= PlacesArray[0].Price
      }
      UserPos = PlacesArray[0].Pos
      PlacesArray.shift()
      //console.log("PlacesArrayt: ", PlacesArray);
    }
    //console.log("FinalArray", FinalArray);
    //console.log("PlacesArray", PlacesArray);
    resolve(FinalArray)
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
