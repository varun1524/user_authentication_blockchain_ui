const headers = {
    'Accept': 'application/json'
};

export const doInsertData = (payload) =>
    fetch(`/user/insertData`, {
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