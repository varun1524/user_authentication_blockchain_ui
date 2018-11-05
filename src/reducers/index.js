import {combineReducers} from 'redux';
import getUser from './login';

const allReducers = combineReducers({
    //insert reducer name here to combine
    user : getUser,
});

export default allReducers;