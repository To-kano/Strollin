import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../root-reducers';

let store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
