import {actionTypes} from "./actionTypes";

export function signup_success(data) {
    return {
        type: actionTypes.SIGN_UP_SUCCESS,
        data
    }
}