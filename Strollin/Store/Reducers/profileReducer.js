const initialState = { 
  FirstName: null,
  LastName: null,
  Email: null,
  Password: null,
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
    default:
      return state
    }
  }

export default profileReducer;