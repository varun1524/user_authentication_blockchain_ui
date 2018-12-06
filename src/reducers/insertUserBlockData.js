import {actionTypes} from "../actions/actionTypes";

const user_data = {};

const user_blockdata = (state = user_data, action)=>
{
    switch (action.type) {

        case actionTypes.INSERT_BLOCK_DATA_SUCCESS :
            console.log("[user reducer] INSERT_BLOCK_DATA_SUCCESS data", action.data);
            state = Object.assign({},action.data);
            return state;
        default :
            return state;
    }
};

export default user_blockdata;
