const initialState = {
  FirstName: null,
  LastName: null,
  Email: null,
  Password: null,
  history: [],
  friend: [],
  group: [],
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

      case 'SET_FRIEND_INIT':
        nextState = {
          ...state,
          friend: action.value.friend
        }
        return nextState

      case 'SET_FRIEND':
        nextState = {
          ...state,
          friend: state.friend + action.value.friend
        }
        return nextState

      case 'DEL_FRIEND':
        var userAdd = friend.filter(function(item) {
          return action.value.name != friend.name
        })
        nextState = {
          ...state,
          friend: userAdd
        }
        return nextState

        case 'SET_GROUP_INIT':
          nextState = {
            ...state,
            group: action.value.group
          }
          return nextState

        case 'SET_GROUP':
          nextState = {
            ...state,
            group: state.group + action.value.group
          }
          return nextState

        case 'DEL_GROUP':
          var userAdd = group.filter(function(item) {
            return action.value.name != group.name
          })
          nextState = {
            ...state,
            group: userAdd
          }
          return nextState



    default:
      return state
    }
  }

export default profileReducer;
