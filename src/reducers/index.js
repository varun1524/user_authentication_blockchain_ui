import {combineReducers} from 'redux';
import getUser from './login';
import organization_user from './organization_user'

const allReducers = combineReducers({
    //insert reducer name here to combine
    user : getUser,
    organization_user : organization_user
});

export default allReducers;