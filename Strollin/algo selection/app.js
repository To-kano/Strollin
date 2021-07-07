
const express = require('express')
const app = express()
const port = 4000
const readline = require('readline');
const fetch = require('node-fetch');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const test = {
   "tags_array": [
      "amusement_park",
      "aquarium",
      "art_gallery",
      "bakery",
      "bar",
      "beauty_salon",
      "bicycle_store",
      "book_store",
      "bowling_alley",
      "cafe",
      "campground",
      "casino",
      "church",
      "city_hall",
      "clothing_store",
      "convenience_store",
      "department_store",
      "drugstore",
      "electronics_store",
      "florist",
      "furniture_store",
      "gym",
      "hardware_store",
      "hindu_temple",
      "home_goods_store",
      "jewelry_store",
      "library",
      "liquor_store",
      "meal_takeaway",
      "mosque",
      "movie_rental",
      "movie_theater",
      "museum",
      "night_club",
      "painter",
      "park",
      "pet_store",
      "restaurant",
      "shoe_store",
      "shopping_mall",
      "spa",
      "store",
      "supermarket",
      "synagogue",
      "tourist_attraction",
      "zoo"
   ]
}


const user = [
  {
    id: 1,
    name: "hugo",
    latitude: 0,
    longitude: 0,
    budget: 1000,
    tags: ["video games", "eat"],
  }
]

const location = [
  {
    id: '1',
    latitude: 3.782120,
    longitude: 2.457256,
    distance: 0,
    name: 'UGC Ciné Cité Créteil',
    tags: ["moovie"]
  },
  {
    id: '2',
    latitude: 22.3123,
    longitude: 7.21435,
    distance: 0,
    name: 'why not Kremblin-Bicetre',
    tags: ["eat", "fast food", "burger"]
  },
  {
    id: '3',
    latitude: 3.35814,
    longitude: 8.62435,
    distance: 0,
    name: 'Player one Paris',
    tags: ['video games', 'eat', 'bar']
  },
  {
    id: '4',
    latitude: -7.351,
    longitude: 15.56166,
    distance: 0,
    name: 'Okabe',
    tags: ['eat', 'shopping']
  },
  {
    id: '5',
    latitude: 18.62462,
    longitude: -2.513,
    distance: 0,
    name: 'pizza five Kremlin bicetre',
    tags: ["eat", "fast food", "pizza"]
  },
  {
    id: '6',
    latitude: 21.7346,
    longitude: 12.34135,
    distance: 0,
    name: 'bibliotheque Paris',
    tags: ["book"]
  },
  {
    id: '7',
    latitude: -13.5361,
    longitude: -4.13513,
    distance: 0,
    name: 'Video games store Paris',
    tags: ["video games", "shopping"]
  },
  {
    id: '8',
    latitude: -7.1245,
    longitude: 0.728,
    distance: 0,
    name: 'Champs Elysée',
    tags: ["shopping", "visit"]
  },
  {
    id: '9',
    latitude: 0.2,
    longitude: 44.215661,
    distance: 0,
    name: 'Eifel tower',
    tags: ["visit"]
  },
  {
    id: '1',
    latitude: 20.3245,
    longitude: -20.4452,
    distance: 0,
    name: 'Louvres',
    tags: ["visit", "museum"]
  }
]

const tags = ["video games", "eat", "visit", "museum", "shopping", "book", "fast food", "burger", "pizza", "bar", "moovie"]

let userTmp = {}
let locationTmp = []
let inputLine = ""
let finalPlace = []

app.get('/', (req, res) => {
  console.log("test")
  res.send('Hello World!')
})

app.get('/algo', (req, res) => {

})

/*rl.on('line', (input) => {
  //console.log(`Received: ${input}`);
  inputLine = parseInt(input)
});*/

function begin() {
  let result
  user.forEach((item) => {
    console.log(item.id + " : " + item.name)
  });

  rl.question('choose a user : ', (answer) => {
    result = parseInt(answer)
    userTmp = user[result - 1]

    rl.pause();
    chooseTag(userTmp)
  });
}

async function chooseTag(userSelect) {
  setDistance(userSelect)
  let i = printTag(userSelect)
  let tag = ""
  let result

  rl.question('choose a tag in your favorite : ', (answer) => {
    result = parseInt(answer)
    rl.pause();

    if (result == i) {
        printAlltags(userSelect)
    } else {
        tag = userSelect.tags[result - 1]
        printPlace(userSelect, tag)
    }
  });
}

function setDistance(userSelect) {
  location.forEach((item) => {
     item.distance = (Math.abs(item.latitude - userSelect.latitude) + Math.abs(item.longitude - userSelect.longitude))
    // console.log('print : \n' + item.name + " : " + item.distance)
  });

}

function printTag(userSelect) {
  let i = 1
  userSelect.tags.forEach((item) => {
    console.log(i + " : " + item)
    i += 1
  });
  console.log(i + " : other")
  return i
}

function printAlltags(userSelect) {
  let i = 1
  let tag = ""
  let result

  tags.forEach((item) => {
    console.log(i + " : " + item)
    i += 1
  });

  rl.question('choose an other tag : ', (answer) => {
    result = parseInt(answer)
    tag = tags[parseInt(answer) - 1]
    rl.pause();
    printPlace(userSelect, tag)
  });
}

function printPlace(userSelect, tag) {
  let i = 0
  let place = []
  let result
  let placeExist = 0

  location.forEach((item) => {
    item.tags.forEach((item2) => {
      if (item2 === tag) {
        if (finalPlace.length > 0) {
          finalPlace.forEach((item3) => {
              if (item.id == item3.id)
                placeExist = 1
          });
        }
        if (placeExist == 0)
          place.push(location[i])
        placeExist = 0
      }
    });
    i += 1
  });

  i = 1
  place.sort(function(a, b) {
    return a.distance - b.distance
  })
  place.forEach((item) => {
    console.log(i + " : " + item.name + " : " + item.distance)
    i += 1
  });
  console.log(i + ' : return')

  rl.question('choose a place : ', (answer) => {
    result = parseInt(answer)
    rl.pause();
    if (result == i) {
      finish(userSelect)
    }
    else {
      finalPlace.push(place[result - 1])
      userSelect.latitude = place[result - 1].latitude
      userSelect.longitude = place[result - 1].longitude
      finish(userSelect)
    }
  });

}

function finish(userSelect) {
  console.log('\nyour traject for now\n')
    finalPlace.forEach((item) => {
      console.log(item.name)
    });
  //console.log("your position : " + userSelect.latitude + "  " + userSelect.longitude)
  console.log("\n____________________________\n")
  rl.question('do you want to continue to pick place ? : ', (answer) => {
      if (answer == "yes") {
        chooseTag(userSelect)
      }
      else {
        console.log("\nhere is your final traject : \n")
        finalPlace.forEach((item) => {
          console.log(item.name)
        });
        return
      }
  })

}

async function placeCall(url) {
  const result = fetch(url, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then(function (answer){
      return answer
    })
    .catch((error) => {
      console.error('error :', error);
    });
    return result
}

async function callApi(url, json) {
  console.log("\n\n\n")
  let token = null
  let url_tmp = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyD6AVcufnom-RKQJeG8tlxAWhAOKor0-uo"

  //console.log("\n\n url : \n", url, "$$$\n\n")
  await placeCall(url).then((response) => {
    //console.log("\n\n aled \n\n", response, "\n\n")
    json.push(response.results)
    if (response.next_page_token) {
      token = response.next_page_token
      url_tmp = url_tmp + "&pagetoken=" +  token
      setTimeout(async () => {
        json = await callApi(url_tmp, json)
      }, 2000)
    }
    //console.log("\n token \n", token, "$$$\n\n")
    //console.log("\n\n done \n\n")
  }).then(() => {
    console.log("\n\nresponse\n\n", json)
    return (json)
  })
}

async function begin2(value) {
  let json = []
    let token = null
    let url = ""

    let url_tmp = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyD6AVcufnom-RKQJeG8tlxAWhAOKor0-uo&location=48.8650988,2.1931007&radius=10000&keyword=" + value
    /*do {
      if (token != null) {
        url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyD6AVcufnom-RKQJeG8tlxAWhAOKor0-uo&pagetoken=" +  token
      }
      else {
        url = url_tmp
      }
      token = null
      console.log("\n\n url : \n", url, "$$$\n\n")
      await placeCall(url).then((response) => {
        console.log("\n\n aled \n\n", response, "\n\n")
        json.push(response.results)
        if (response.next_page_token) {
          token = response.next_page_token
        }
        console.log("\n token \n", token, "$$$\n\n")
        console.log("\n\n done \n\n")
      })
    } while (token != null)*/
    await callApi(url_tmp, json).then((response) => {
      if (response) {
          return
      }
      console.log("ok")
    })
    //console.log(json)
}

app.listen(port, () => {
  test.tags_array.forEach((item) => {
    begin2(item)
  });

    //begin()
})
