import {combineReducers} from 'redux';
import getUser from './login';
import userDbData from './insertUserData'

const allReducers = combineReducers({
    //insert reducer name here to combine
    user : getUser,
    userDbData : userDbData,
    user_blockdata : user_blockdata,

});

export default allReducers;