const initialState = { 
  FirstName: null,
  LastName: null,
  Email: null,
  Pseudo: null,
  FriendList: [],
  history: []
};

function profileReducer(state = initialState, action) {
    let nextState
    switch (action.type) {
      case 'SET_USER':
        nextState = {
            ...state,
            FirstName: action.value.firstName,
            LastName: action.value.lastName,
            Email: action.value.email,
            Pseudo: action.value.pseudo,
            FriendList: action.value.friendList

        }
        return nextState

      case 'ADD_HISTORY':
        nextState = {
            ...state,
            history: state.history + action.value,
        }
        return nextState
      case 'SET_FRIEND':
        nextState = {
          ...state,
          FriendList: action.value.friendList

      }
        return nextState

    default:
      return state
    }
  }

export default profileReducer;