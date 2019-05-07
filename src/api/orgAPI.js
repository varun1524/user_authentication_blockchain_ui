import fetch from 'fetch-with-proxy';

const headers = {
    'Accept': 'application/json'
};

export const doCreateUser = (payload) =>
    fetch(`api/v1/create_user`, {
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

export const doSearchUser = (payload) =>
    fetch(`api/v1//ger_user_info`, {
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

export const doCreateBranch = (payload) =>
    fetch(`/orgAdmin/createBranch`, {
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



export const doInsertBlockData = (payload) =>
    fetch(`api/v1/add_user_record`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        let resp = {status : 200, data : {msg : "inserted"}}
        return resp;
    }).catch(error => {
        console.log("This is error");
        console.log(error);
        return error;
    });
