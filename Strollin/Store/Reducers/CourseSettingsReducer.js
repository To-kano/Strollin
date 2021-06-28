const initialState = {
  pos: 0,
  budget: 0,
  hours: 0,
  minutes: 0,
  isEatDrink: false,
  radius: 0,
  placeNbr: 0,
  tags: 0
};

function CourseSettingsReducer(state = initialState, action) {
  let nextState = {};
  console.log("\n\nCourseSettingsReducer:\n")
  console.log("//////////////////////////:action: ", action)
  switch (action.type) {
    case 'ADD_POS':
      nextState = {
        ...state,
      pos: action.value
      };

      return nextState;
    case 'ADD_BUDGET':
      nextState = {
        ...state,
        budget: action.value
      };

      return nextState;
    case 'ADD_HOURS':
      nextState = {
        ...state,
        hours: action.value
      };
      return nextState;
    case 'ADD_MINUTES':
      nextState = {
        ...state,
        minutes: action.value
      };
      return nextState;
    case 'ADD_EAT':
      nextState = {
        ...state,
        isEatDrink: action.value
      };

      return nextState;
    case 'ADD_RADIUS':
      nextState = {
        ...state,
        radius: action.value
      };
      return nextState;
    case 'ADD_PLACENBR':
      nextState = {
        ...state,
        placeNbr: action.value
      };
      return nextState;
    case 'ADD_TAGS':
      nextState = {
        ...state,
        tags: action.value
      };
      return nextState;
    default:
      return state;
  }
}

export default CourseSettingsReducer;
