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
  currentcourse: {}
};

function CourseReducer(state = initialState, action) {
  let nextState;
  // //console.log("\n\ngalleryReducer:\n")
  // //console.log(action)
  switch (action.type) {
    case 'ADD_COURSE':
      nextState = {
        ...state,
      };

      nextState[action.value._id] = action.value;
      return nextState;
    case 'SET_CURRENT_COURSE':
      nextState = {
        ...state,
        currentcourse: action.value
      };
      return nextState;
    default:
      return state;
  }
}

export default CourseReducer;
