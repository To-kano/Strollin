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

      // nextState.historic.concat([history]);
      console.log('history ', nextState.historic);

      return nextState;
    default:
      return state;
  }
}

export default mapNavigationReducer;
