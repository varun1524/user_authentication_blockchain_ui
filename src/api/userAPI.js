import {headers, node_api, py_api} from './apiUtil';

export const validateSession = () =>
    fetch(`${py_api}/user/validateSession`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include'
        // body: JSON.stringify()
    }).then(res => {
        return res;
    }).catch(error => {
        console.log("This is error");
        return error;
    });

export const doLogout = () =>
    fetch(`${py_api}/user/logout`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include'
        // body: JSON.stringify()
    }).then(res => {
        return res;
    }).catch(error => {
        console.log("This is error");
        return error;
    });

export const doSignUp = (payload) =>
    fetch (`${py_api}/user/signup`,
        {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(res => {
        return res;
    }).catch(error => {
        console.log("Error: ");
        console.log(error);
        return error;
    });

export const doLogin = (payload) =>
    fetch(`${py_api}/user/login`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return res;
    }).catch(error => {
        console.log("This is error");
        console.log(error);
        return error;
    });