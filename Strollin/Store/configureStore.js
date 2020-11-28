import { createStore, combineReducers } from 'redux';
import profileReducer from './Reducers/profileReducer';
import galleryReducer from './Reducers/galleryReducer';
import geolocalisationReducer from './Reducers/geolocalisationReducer';
import mapNavigationReducer from './Reducers/mapNavigationReducer';
import chatConversation from './Reducers/conversationReducer';
import socketReducer from './Reducers/socketReducer';
import tendanceReducer from './Reducers/tendanceReducer';
import messageReducer from './Reducers/messageReducer';

const rootReducer = combineReducers({
  profil: profileReducer,
  gallery: galleryReducer,
  position: geolocalisationReducer,
  map: mapNavigationReducer,
  conversation: chatConversation,
  socket: socketReducer,
  tendance: tendanceReducer,
  message: messageReducer
});

export default createStore(rootReducer);
