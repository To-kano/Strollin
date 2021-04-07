import { createStore, combineReducers } from 'redux';
import TestReducer from './Reducers/testReducer';

const rootReducer = combineReducers({
    test: TestReducer
});

export default createStore(rootReducer);
