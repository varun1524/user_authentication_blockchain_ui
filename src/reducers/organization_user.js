import {actionTypes} from "../actions/actionTypes";

const user_data = {};

const organization_user = (state = user_data, action)=>
{
    switch (action.type) {

        case actionTypes.USER_ADDITION :
            console.log("organization user : USER_ADDITION reducer", action.data);
            state = Object.assign({},action.data);
            return state;
        default :
            return state;
    }
};

export default organization_user;
