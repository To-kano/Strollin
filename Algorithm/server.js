
var PlacesJson = require('./jsons/Places');
var TagsJson = require('./jsons/UserTags');

console.log('hello world')


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

function DistCalc2D(UserPos, PlacePos) {

  var X1 = UserPos[0]
  var X2 = PlacePos[0]
  var Y1 = UserPos[1]
  var Y2 = PlacePos[1]

  var res = Math.sqrt( Math.pow((X1 - X2), 2) + Math.pow((Y1 - Y2), 2) )
  console.log(res);
}

function algoTest(UserTags, Places) {

  var PlacesArray = []

  //console.log(Places);
  //console.log(UserTags);

  for (var i = 0; i < Places.List.length; i++) {
    if (IsTagOk(UserTags, Places.List[i]) == true) {
      PlacesArray.push(Places.List[i])
    }
  }
  console.log(PlacesArray);
}

algoTest(TagsJson, PlacesJson)
DistCalc2D([-7,-4], [17,6.5])
