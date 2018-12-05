import {combineReducers} from 'redux';
import getUser from './login';
import userDbData from './insertUserData'
import Layout from './Layout';
import ThemeOptions from './ThemeOptions';
import Auth from './Auth';


const allReducers = combineReducers({
    //insert reducer name here to combine
    user : getUser,
    userDbData : userDbData,
    Layout,
    Auth,
    ThemeOptions,
});

export default allReducers;