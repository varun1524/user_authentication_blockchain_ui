import {actionTypes} from "../actions/actionTypes";

const user = {
    id : "",
    given_name : "",
    last_name : "",
    dob : "",
    email : "",
    gender : "",
    ethinicity : "",
    address_line_1 : "",
    address_line_2 : "",
    city : "",
    state : "",
    country_of_residence : "",
    country_of_citizenship : "",
    zip : "",
    user_type:"",
    neha:""
};

const user_reducer = (state = user, action) => {
    switch (action.type) {
        case actionTypes.USER_PROFILE_FETCH :
            console.log("user profile successfully fetched", action.data);
            state = Object.assign({}, state,action.data.user_info );
            return state;
        case actionTypes.LOGIN_SUCCESS :
            console.log("[user reducer] LOGIN_SUCCESS data", action.data);
            state = Object.assign({}, state, {
                id:action.data.id,
                given_name : action.data.given_name,
                last_name : action.data.last_name,
                user_type : action.data.user_type
            });
            return state;
        default :
            return state;
    }
}

export default user_reducer;