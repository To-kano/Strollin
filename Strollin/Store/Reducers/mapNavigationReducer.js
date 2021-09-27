import { IP_SERVER, PORT_SERVER } from '../../env/Environement';

const initialState = {
  locations: [
    {
      "_id":"5ff31d40977cba001e801bfa",
      "owner":"2nd owner",
      "score":"0",
      "user_score":[],
      latitude: 48.798683,
      longitude: 2.446183,
      "description":"Peko",
      "photo":[],
      "timetable":"test",
      "comments_list":["5ff3277dd90060001daaf045"],
      "price_range":["",""],
      "average_time":"",
      "phone":"",
      "website":"",
      "pop_disp":"0",
      "pop_ag":"0",
      "alg_disp":"0",
      "alg_ag":"0",
      "name":"Une troisieme Maison",
      "address":"369, rue Sandvich",
      "city":"Creteil",
      "country":"France",
      "tags_list":[{"_id":{"$oid":"5ff31d40977cba001e801bfb"}}],
      "__v":0
    },
    {
      "_id":"5ff47553765c6f001fff5b6f",
      "owner":"thisID","score":"0","user_score":[],
      latitude: 48.780627,
      longitude: 2.457364,
      "description":"HAHAHAHA",
      "photo":[],
      "timetable":"Du lundi au Vendredi",
      "comments_list":[],
      "tags_list":[{"id":"tag1","disp":"0"}],
      "price_range":["",""],
      "average_time":"",
      "phone":"","website":"",
      "pop_disp":"0",
      "pop_ag":"0",
      "alg_disp":"0",
      "alg_ag":"0",
      "name":"Ma premiere Maison",
      "address":"369, rue Sandvich",
      "city":"Creteil",
      "country":"France",
      "__v":0
    }
  ],
  course:
  {
    "_id":
    {
      "$oid":"5ff32c7640659a00230b1687"
    },
    "locations_list":["5ff31d40977cba001e801bfa", "5ff47553765c6f001fff5b6f"],
    "score":"0",
    "user_score":[],
    "number_used":"0",
    "timetable":"",
    "comments_list":["5ff4773e765c6f001fff5b71"],
    "tags_list":[],
    "time_spent":[],
    "name":"HA HA HA HA!",
    "author":"Strollin",
    "creation_date":
    {
      "$date":"2021-01-04T14:55:50.106Z"
    },
    "__v":0
  },
  historic: [],
  allTime: []
};

function setTime(allTime, value) {
  let result = allTime
  result.push(value)
  return result
}

function getTime(allTime) {
  let result = allTime[allTime.length - 1] - allTime[0]
  return result
}

function saveTime(value) {
  const time = value.toString()
  const body = JSON.stringify({
    time_spent: time,
  });

  const url = `http{IP_SERVER}:${PORT_SERVER}/course/add_course_time`
  fetch(url, {
    headers : {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      course_id: "5ff1f52f59d3ad001f34c320",
    },
    body: body,
    method: 'POST',
  })
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((error) => {console.error('error :', error)})
}

function mapNavigationReducer(state = initialState, action) {
  let nextState;
  // //console.log("\n\ngalleryReducer:\n")
  switch (action.type) {
    case 'SET_WAYPOINTS':
      nextState = {
        ...state,
        locations: action.locations,
        course: action.course
      };
      return nextState;
    case 'SET_LOCATIONS':
      nextState = {
        ...state,
        locations: action.locations,
      };
      return nextState;
    case 'SET_TIME':
      nextState = {
        ...state,
        allTime: setTime(state.allTime, action.value),
      };
      return nextState;
    case 'ADD_HISTORIC':

      const day = new Date().getDate(); // Current Date
      const month = new Date().getMonth() + 1; // Current Month
      const year = new Date().getFullYear(); // Current Year

      const time = getTime(state.allTime)
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor(time % 3600 / 60);
      const seconds = Math.floor(time % 3600 % 60);

      const history = {
        id: Date.parse(new Date()).toString(),
        date: `${day}/${month}/${year}`,
        duration: `${hours} heures, ${minutes} minutes, ${seconds} seconds`,
        locations: action.locations,
        course: action.course
      };

      nextState = {
        ...state,
        historic: [history, ...state.historic]
      };
      saveTime(time)

      // nextState.historic.concat([history]);
      //console.log('history ', nextState.historic);

      return nextState;
    default:
      return state;
  }
}

export default mapNavigationReducer;
