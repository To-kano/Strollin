import {combineReducers} from 'redux';
import auth from './registration/reducer';

const rootReducer = combineReducers({
  auth,
});

export default rootReducer;
