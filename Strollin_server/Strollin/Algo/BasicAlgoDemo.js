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
    //console.log("EX: ", UserTags[l], " : ", List[i].Tags);
    if (CheckTagsDisp(List, i, UserTags) == false && SingleTagOk(UserTags[l], List[i]) == true) {
      //console.log("herro");
      List[i].TagsDisp.push([UserTags[l], 1])
    }
  }
}

function CheckTagsDisp(List, i, UserTags) {
  for (var j = 0; j < List[i].TagsDisp.length; j++) {
    //console.log("DISP: ", List[i].TagsDisp[j]);
    for (var k = 0; k < UserTags.length; k++) {
      //console.log("EX: ", UserTags[k], " : ", List[i].TagsDisp[j][0]);
      if (UserTags[k] == List[i].TagsDisp[j][0])
        List[i].TagsDisp[j][1] += 1
        return true
    }
  }
  return false
}

function AddRef(List, UserTags) {
  //console.log("LIST ||||||||||||||||||||||||||- ", List);
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
    for (var i = 0; i < Places.List.length; i++) {
      if (IsTagOk(UserTags, Places.List[i]) == true) {
        PlacesArray.push(Places.List[i])
      }
    }

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
    AddRef(FinalArray, UserTags.Tags[0])
    resolve(FinalArray)
  });
}

methods.hello = function ()
{
  //console.log("hello")
  return new Promise((resolve, reject) => {
    var test = algoTest(TagsJson, PlacesJson)
    //console.log("test", test);
    resolve(test)
  });
}

//algoTest(TagsJson, PlacesJson)
//DistCalc2D([-7,-4], [17,6.5])

exports.data = methods;
