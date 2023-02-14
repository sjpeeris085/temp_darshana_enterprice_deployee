// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import employees from './employee';
// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
    menu,
    employees
});

export default reducers;
