import fetch from 'fetch-with-proxy';

const headers = {
    'Accept': 'application/json'
};

export const adminSearchUser = (payload) =>
    fetch(`api/v1/get_user_info`, {
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
