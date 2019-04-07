import {actionTypes} from "../actions/actionTypes";

const user = {
    user_id : "",
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
    zip : ""
};

const user_reducer = (state = user, action) => {
    switch (action.type) {
        case actionTypes.USER_PROFILE_FETCH :
            console.log("user profile successfully fetched", action.data);
            state = Object.assign({},action.data);
            return state;
        default :
            return state;
    }
}

export default user_reducer;