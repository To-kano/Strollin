const EXEMPLE = {
  course: [
    {
      id: 'uskfdsfsd',
      budget: '13€',
      period: '17h',
      destinations: ['jskfzk', 'sjfnzleq'],
    }, {}
  ],
  currentCourse: {
    id: 'uskfdsfsd',
    budget: '13€',
    period: '17h',
    destinations: ['jskfzk', 'sjfnzleq'],
  }
};

const initialState = {
  course: [],
  currentCourse: [],
  courseObjectHistoric: []
};

function CourseReducer(state = initialState, action) {
  let nextState;
  // //console.log("\n\ngalleryReducer:\n")
  // //console.log(action)
  switch (action.type) { 
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
    default:
      return state;
  }
}

export default CourseReducer;
