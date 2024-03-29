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
import favoritesReducer from './Reducers/favoritesReducer';
import commentReducer from './Reducers/commentReducer';
import CourseSettingsReducer from './Reducers/CourseSettingsReducer';

import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';


const persistConfig = {
  key: 'root',
  storage : AsyncStorage,
  stateReconciler: autoMergeLevel2,
}


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
  location: locationReducer,
  favorites: favoritesReducer,
  comment: commentReducer,
  CourseSettings: CourseSettingsReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

export default store;
