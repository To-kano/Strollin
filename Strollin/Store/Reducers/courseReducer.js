const EXEMPLE = {
  course: [{
    id: 'uskfdsfsd',
    budget: '13€',
    period: '17h',
    destinations: ['jskfzk', 'sjfnzleq'],
  }, {}],
  currentCourse: {
    id: 'uskfdsfsd',
    budget: '13€',
    period: '17h',
    destinations: ['jskfzk', 'sjfnzleq'],
  }
};

const initialState = {
  course: [],
  currentCourse: {},
  currentLocationProposition: [],
  courseObjectHistoric: [],
  courseLocations: [],
  delete: []
};

function CourseReducer(state = initialState, action) {
  let nextState;
  // //console.log("\n\ngalleryReducer:\n")
  switch (action.type) {
    case 'DECONNECTION':
      return initialState;
    case 'ADD_COURSE':
      nextState = {
        ...state,
        course: [action.value, ...state.course]
        //course: action.value
      };
      return nextState;
    case 'SET_CURRENT_COURSE':
      nextState = {
        ...state,
        currentCourse: action.value
      };
      return nextState;
    case 'CHANGE_CURRENT_COURSE_LOCATION_PROPOSITION':
    console.log("state before change", state.currentCourse);

      nextState = {
        ...state,
        currentCourse: {
          ...state.currentCourse,
          locations_list : action.value
        }
      };
      console.log("state after change:", nextState.currentCourse);

      return nextState;
    case 'SET_CURRENT_LOCATION_PROPOSITION':
      nextState = {
        ...state,
        currentLocationProposition: action.value
      };
      return nextState;

    case 'ADD_LOCATION_PROPOSITION':
      nextState = {
        ...state,
        currentLocationProposition: [action.value, ...state.currentLocationProposition]
      };
      return nextState;
    case 'ADD_COURSE_OBJECT_HISTORIC':
      nextState = {
        ...state,
        courseObjectHistoric: [action.value, ...state.courseObjectHistoric]
      };
      return nextState;
    case 'SET_COURSE_OBJECT_HISTORIC':
      nextState = {
        ...state,
        courseObjectHistoric: action.value
      };
        return nextState;
    case 'ADD_COURSE_LOCATIONS':
      nextState = {
        ...state,
        courseLocations: [action.value, ...state.course]
        //course: action.value
      };
        return nextState;
    case 'ADD_DELETE':
      nextState = {
        ...state,
        delete: action.value
        //course: action.value
      };
        return nextState;
    default:
      return state;
  }
}

export default CourseReducer;
