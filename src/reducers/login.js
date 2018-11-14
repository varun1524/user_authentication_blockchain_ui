import {actionTypes} from "../actions/actionTypes";

const user_data = {};

const user = (state = user_data, action)=>
{
    switch (action.type) {

        case actionTypes.LOGIN_SUCCESS :
            console.log("[user reducer] LOGIN_SUCCESS data", action.data);
            state = Object.assign({},action.data);
            return state;
        default :
            return state;
    }
};

export default user;
