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
    for (var j = 0; j < UserTags.Tags[0].length; j++) {
      if (Place.Tags[i] == UserTags.Tags[0][j])
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

function algoTest(UserTags, Places) {
  return new Promise((resolve, reject) => {

    var PlacesArray = []
    var FinalArray = []
    var UserPos = TagsJson.Pos

    //Put all the places corresponding to the user tags in a new array (PlacesArray)
    for (var i = 0; i < Places.length; i++) {
      if (IsTagOk(UserTags, Places[i]) == true) {
        PlacesArray.push(Places[i])
      }
    }

    //Calculate the closest place compared to the previous place
    for (var cpt = 0; cpt < 10 && PlacesArray.length > 0; cpt++) {
      for (var i = 0; i < PlacesArray.length; i++) {
        PlacesArray[i].Dist = DistCalc2D(PlacesArray[i].Pos, UserPos)
      }
      PlacesArray.sort(compare)
      if (TagsJson.Budget > PlacesArray[0].Price && TagsJson.Temps > PlacesArray[0].Time) {
        FinalArray.push(PlacesArray[0])
        TagsJson.Budget -= PlacesArray[0].Price
        TagsJson.Temps -= PlacesArray[0].Time
        console.log("Temps: ", TagsJson.Temps);
      }
      UserPos = PlacesArray[0].Pos
      PlacesArray.shift()
    }
    AddRef(FinalArray, UserTags.Tags[0])
    resolve(FinalArray)
  });
}

methods.hello = function(sending, User)
{
  return new Promise((resolve, reject) => {
    TagsJson.Tags[0] = User.tags_list
    var test = algoTest(TagsJson, sending)
    resolve(test)
  });
}

//algoTest(TagsJson, PlacesJson)
//DistCalc2D([-7,-4], [17,6.5])

exports.data = methods;
