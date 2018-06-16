// Set up your root reducer here...
import { combineReducers } from 'redux';
import predicateReducer from './predicate.reducer';

const rootReducer = combineReducers({
    predicate: predicateReducer
});

export default rootReducer;