const headers = {
    'Accept': 'application/json'
};

export const adminSearchUser = (payload) =>
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