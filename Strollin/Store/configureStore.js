import { createStore, combineReducers } from 'redux';
import profileReducer from './Reducers/profileReducer';
import galleryReducer from './Reducers/galleryReducer';
import geolocalisationReducer from './Reducers/geolocalisationReducer';
import mapNavigationReducer from './Reducers/mapNavigationReducer';

const rootReducer = combineReducers({
  profil: profileReducer,
  gallery: galleryReducer,
  position: geolocalisationReducer,
  map: mapNavigationReducer
});

export default createStore(rootReducer);
