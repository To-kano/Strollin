const initialState = {
  waypoints: [],
  historic: []
};

function mapNavigationReducer(state = initialState, action) {
  let nextState;
  // //console.log("\n\ngalleryReducer:\n")
  switch (action.type) {
    case 'SET_WAYPOINTS':
      nextState = {
        ...state,
        waypoints: action.value,
      };
      return nextState;
    case 'ADD_HISTORIC':

      const day = new Date().getDate(); // Current Date
      const month = new Date().getMonth() + 1; // Current Month
      const year = new Date().getFullYear(); // Current Year

      const history = {
        id: Date.parse(new Date()).toString(),
        date: `${day}/${month}/${year}`,
        duration: '2 heures',
        waypoints: action.value
      };

      nextState = {
        ...state,
        historic: [history, ...state.historic]
      };

      // nextState.historic.concat([history]);
      //console.log('history ', nextState.historic);

      return nextState;
    default:
      return state;
  }
}

export default mapNavigationReducer;
