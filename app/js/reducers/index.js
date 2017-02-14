import { combineReducers } from 'redux';
import ExampleReducer from './reducer_example';

const rootReducer = combineReducers({
    exampleList: ExampleReducer
});

export default rootReducer;
