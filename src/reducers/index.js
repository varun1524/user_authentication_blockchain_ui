import {combineReducers} from 'redux';
import getUser from './login';
import organization_user from './organization_user'
import user_reducer from './user'

const allReducers = combineReducers({
    //insert reducer name here to combine
    user : getUser,
    organization_user : organization_user,
    user_reducer : user_reducer,
});

export default allReducers;