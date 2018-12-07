import {headers, node_api, py_api} from './apiUtil';

export const doInsertData = (payload) =>
    fetch(`${py_api}/api/v1/create_user`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        //let resp = {status : 200, data : {msg : "inserted"}}
        return res;
    }).catch(error => {
        console.log("This is error");
        console.log(error);
        return error;
    });

export const doInsertBlockData = (payload) =>
    fetch(`${node_api}/user/insertdata`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        //let resp = {status : 200, data : {msg : "inserted"}}
        return res;
    }).catch(error => {
        console.log("This is error");
        console.log(error);
        return error;
    });