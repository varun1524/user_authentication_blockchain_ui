import {actionTypes} from "./actionTypes";

export function user_profile_fetch(data) {
    return {
        type: actionTypes.USER_PROFILE_FETCH,
        data
    }
}

export function record_type_fetch(data) {
    return {
        type: actionTypes.RECORD_TYPE_FETCH,
        data
    }
}