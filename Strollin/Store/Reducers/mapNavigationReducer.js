import { IP_SERVER, PORT_SERVER } from '../../env/Environement';

const initialState = {
  waypoints: [],
  historic: [],
  allTime: []
};

function setTime(allTime, value) {
  console.log("okkkkkk")
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

  const url = `http://${IP_SERVER}:${PORT_SERVER}/course/add_course_time`
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
  // console.log("\n\ngalleryReducer:\n")
  switch (action.type) {
    case 'SET_WAYPOINTS':
      nextState = {
        ...state,
        waypoints: action.value,
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
        waypoints: action.value
      };

      nextState = {
        ...state,
        historic: [history, ...state.historic]
      };
      saveTime(time)

      // nextState.historic.concat([history]);
      console.log('history ', nextState.historic);

      return nextState;
    default:
      return state;
  }
}

export default mapNavigationReducer;
