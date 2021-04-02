import { createStore, combineReducers } from 'redux';
import profileReducer from './Reducers/profileReducer';
import galleryReducer from './Reducers/galleryReducer';
import geolocalisationReducer from './Reducers/geolocalisationReducer';
import mapNavigationReducer from './Reducers/mapNavigationReducer';
import chatConversation from './Reducers/conversationReducer';
import createConversation from './Reducers/createConversationReducer';
import socketReducer from './Reducers/socketReducer';
import tendanceReducer from './Reducers/tendanceReducer';
import messageReducer from './Reducers/messageReducer';
import searchReducer from './Reducers/searchReducer';
import courseReducer from './Reducers/courseReducer';
import locationReducer from './Reducers/locationReducer';

const rootReducer = combineReducers({
  profil: profileReducer,
  gallery: galleryReducer,
  position: geolocalisationReducer,
  map: mapNavigationReducer,
  conversation: chatConversation,
  socket: socketReducer,
  tendance: tendanceReducer,
  createConversation: createConversation,
  message: messageReducer,
  search: searchReducer,
  course: courseReducer,
  location: locationReducer
});

export default createStore(rootReducer);
