import AsyncStorage from '@react-native-community/async-storage';

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

const storeProfile = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('cache_profile', jsonValue);
  } catch (e) {
    console.log('echec store profile ', e);
  }
};

function profileReducer(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case 'CONNECTION':
      nextState = {
        ...state,
        accessToken: action.value
      };
      return nextState;

    case 'DECONNECTION':
      storeProfile(initialState);
      return initialState;

    case 'SET_USER':
      nextState = {
        ...state,
        ...action.value
      };
      storeProfile(nextState);
      return nextState;

    case 'ADD_HISTORY':
      nextState = {
        ...state,
        history: state.history + action.value,
      };
      storeProfile(nextState);
      return nextState;

    default:
      return state;
  }
}

export default profileReducer;
