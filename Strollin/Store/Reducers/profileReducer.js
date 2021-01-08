import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
  access_token: null,
  mail: null,
  firstName: null,
  lastName: null,
  tags: [],
  friends_list: [],
  friends_pseudo_list: {},
  type: null,
  historic: [],
  history: [],
  scoreCourse: [],
  scoreLocation: [],
  scoreComment: []
};

const storeProfile = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('cache_profile', jsonValue);
  } catch (e) {
    //console.log('echec store profile ', e);
  }
};

function profileReducer(state = initialState, action) {
  let nextState;

  switch (action.type) {
    case 'CONNECTION':
      nextState = {
        ...state,
        access_token: action.value
      };
       //console.log("profile reducer connection", nextState);
      return nextState;

    case 'DECONNECTION':
      //storeProfile(initialState);
      return initialState;

    case 'SET_USER':
      nextState = {
        ...state,
        ...action.value
      };
       //console.log("profile reducer set user", nextState);
      //storeProfile(nextState);
      return nextState;

    case 'ADD_HISTORY':
      nextState = {
        ...state,
        history: state.history + action.value,
      };
      //storeProfile(nextState);
      return nextState;
    case 'SET_FRIEND':
      nextState = {
        ...state,
      };

      nextState[action.value._id] = action.value;
      return nextState;
    case 'ADD_FRIEND_TO_PSEUDO_LIST':
      nextState = {
        ...state,
      };
      nextState.friends_pseudo_list[action.value._id] = action.value.pseudo;
    return nextState;
    case 'ADD_FRIEND_TO_PSEUDO_LIST_REVERSE':
      nextState = {
        ...state,
      };
      nextState.friends_pseudo_list[action.value.pseudo] = action.value._id;
    return nextState;

    case 'SET_FRIEND_INIT':
      nextState = {
        ...state,
        friend: action.value.friend
      };
      return nextState;

    case 'DEL_FRIEND':
      nextState = {
        ...state,
        friend: state.friend.filter((item) => action.value.name !== item.name)
      };
      return nextState;

    case 'SET_GROUP_INIT':
      nextState = {
        ...state,
        group: action.value.group
      };
      return nextState;

    case 'SET_GROUP':
      nextState = {
        ...state,
        group: state.group + action.value.group
      };
      return nextState;

    case 'DEL_GROUP':
      nextState = {
        ...state,
        group: state.group.filter((item) => action.value.name !== item.name)
      };
      return nextState;

    default:
      return state;
  }
}

export default profileReducer;
