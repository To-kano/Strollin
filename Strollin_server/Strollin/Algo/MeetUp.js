var PlacesJson = require('./Ressources/Places');
var TagsJson = require('./Ressources/UserTags');
var TagsJson2 = require('./Ressources/UserTags0');

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

function IsTagOk(UserTags, Place) {

  for (var i = 0; i < Place.Tags.length; i++) {
    for (var j = 0; j < UserTags.Tags[0].length; j++) {
      if (Place.Tags[i] == UserTags.Tags[0][j])
        return true;
    }
  }
  return false
}

function FindMeetSpot(UserTags1, UserTags2, Places) {
  var FinalArray = Places.List
  var Array = []
  for (var i = 0; i < FinalArray.length; i++) {
    if (IsTagOk(UserTags1, FinalArray[i]) == true && IsTagOk(UserTags2, FinalArray[i]) == true) {
      FinalArray[i].Dist = Math.abs(DistCalc2D(FinalArray[i].Pos, UserTags1.Pos) - DistCalc2D(FinalArray[i].Pos, UserTags2.Pos))
      Array.push(FinalArray[i])
    }
  }
  FinalArray = Array
  FinalArray.sort(compare)
  console.log("Selected places for meet up spot: ", FinalArray);
  return(Array[0])
}

methods.hello = function ()
{
  //console.log("hello")
  return new Promise((resolve, reject) => {
    var MeetUpSpot = FindMeetSpot(TagsJson, TagsJson2, PlacesJson)
    //console.log("test", test);
    resolve(MeetUpSpot)
  });
}

//algoTest(TagsJson, PlacesJson)
//DistCalc2D([-7,-4], [17,6.5])

exports.data = methods;
