import {actionTypes} from "./actionTypes";

export function login_success(data) {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        data
    }
}

export function logout_success() {
    return {
        type: actionTypes.LOGOUT_SUCCESS
    }
}

export function update_surveyor_dashboard(created_surveys,requested_surveys) {
    return {
        type: actionTypes.UPDATE_SURVEYOR_DASHBOARD,
        created_surveys,
        requested_surveys,
    }
}

