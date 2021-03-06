import fetch from 'fetch-with-proxy';

const headers = {
    'Accept': 'application/json'
};

export const Backend = (payload,endpoint,method) =>
    fetch('' + endpoint, {
        method: ''+method,
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res;
    }).catch(error => {
        console.log("This is error");
        console.log(error);
        return error;
    });

export const BackendGetWithoutSession = (endpoint,method) =>
    fetch(''+endpoint, {
        method: ''+method,
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return res;
    }).catch(error => {
        console.log("This is error");
        console.log(error);
        return error;
    });

export const BackendCred = (payload,endpoint,method) =>
    fetch(''+endpoint, {
        method: ''+method,
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include'
    }).then(res => {
        return res;
    }).catch(error => {
        console.log("This is error");
        return error;
    });


export const BackendCredBody = (payload,endpoint,method) =>
    fetch(''+endpoint, {
        method: ''+method,
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
        return error;
    });


