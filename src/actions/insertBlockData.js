import {actionTypes} from "./actionTypes";

export function insert_blockdata_success(data) {
    return {
        type: actionTypes.INSERT_BLOCK_DATA_SUCCESS,
        data
    }
}
