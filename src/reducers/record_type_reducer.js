import {actionTypes} from "../actions/actionTypes";

const user_data = {};

const record_type_reducer = (state = user_data, action)=>
{
    switch (action.type) {

        case actionTypes.RECORD_TYPE_FETCH :
            console.log("Fetched actions", action.data);
            state = Object.assign({},action.data);
            return state;
        default :
            return state;
    }
};

export default record_type_reducer;
