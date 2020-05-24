import { createStore , combineReducers} from 'redux';
import profileReducer from './Reducers/profileReducer'
import galleryReducer from './Reducers/galleryReducer'
import geolocalisationReducer from './Reducers/geolocalisationReducer'

const rootReducer = combineReducers({
    profil: profileReducer,
    gallery: galleryReducer,
    position: geolocalisationReducer
})

export default createStore(rootReducer)