import {combineReducers} from 'redux';
import getUser from './login';
import userDbData from './insertUserData'

const allReducers = combineReducers({
    //insert reducer name here to combine
    user : getUser,
    userDbData : userDbData,

});

export default allReducers;