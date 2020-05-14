const initialState = { 
  FirstName: null,
  LastName: null,
  Email: null,
  Password: null,
  history: []
};

function profileReducer(state = initialState, action) {
    let nextState
    switch (action.type) {
      case 'SET_USER':
        nextState = {
            ...state,
            FirstName: action.value.firstName,
            LastName: action.value.lastname,
            Email: action.value.email,
            Password: action.value.password,
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