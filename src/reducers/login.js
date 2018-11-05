import {actionTypes} from "../actions/actionTypes";

const userdata = {
    user:{},
};

const user = (state = userdata, action)=>
{
    switch (action.type) {

        case actionTypes.LOGIN_SUCCESS :
            console.log("[user reducer] LOGIN_SUCCESS data",action.data);
            return Object.assign({},state,{
                user:action.data
            });
        default :
            return state;
    }
};

export default user;
