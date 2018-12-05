import {actionTypes} from "./actionTypes";

export function insert_dbdata_success(data) {
    return {
        type: actionTypes.INSERT_DATA_SUCCESS,
        data
    }
}
