const initialState = {
  accessToken: null,
  mail: null,
  firstName: null,
  lastName: null,
  tags: [],
  friendList: [],
  type: null,
  historic: [],
  history: [],
  scoreCourse: [],
  scoreLocation: [],
  scoreComment: []
};

function profileReducer(state = initialState, action) {
    let nextState
    switch (action.type) {
      case 'SET_USER':
        nextState = {
            ...state,
            ...action.value
        }
        return nextState

      case 'ADD_HISTORY':
        nextState = {
            ...state,
            history: state.history + action.value,
        }
        return nextState

    default:
      return state
    }
  }

export default profileReducer;