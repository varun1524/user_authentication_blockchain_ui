import {actionTypes} from "./actionTypes";

export function user_addiiton_success(data) {
    return {
        type: actionTypes.USER_ADDITION,
        data
    }
}