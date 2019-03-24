const headers = {
    'Accept': 'application/json'
};

export const doCreateUser = (payload) =>
    fetch(`/user/createUser`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        let resp = {status : 200, data : {msg : "created"}}
        return resp;
    }).catch(error => {
        console.log("This is error");
        console.log(error);
        return error;
    });

export const doInsertBlockData = (payload) =>
    fetch(`/user/insertBlockData`, {
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