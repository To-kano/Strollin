const initialState = {
};

function LocationReducer(state = initialState, action) {
  let nextState = {};
  // //console.log("\n\ngalleryReducer:\n")
  // //console.log(action)
  switch (action.type) {
    case 'ADD_LOCATION':
      nextState = {
        ...state,
      };

      nextState[action.value._id] = action.value;
      return nextState;
    default:
      return state;
  }
}

export default LocationReducer;