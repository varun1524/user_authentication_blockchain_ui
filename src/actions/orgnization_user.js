import {actionTypes} from "./actionTypes";

export function user_addiiton_success(data) {
    return {
        type: actionTypes.USER_ADDITION_SUCCESS,
        data
    }
}

export function user_blockdata_addition(data) {
    return {
        type: actionTypes.USER_BLOCKDATA_ADDITION,
        data
    }
}