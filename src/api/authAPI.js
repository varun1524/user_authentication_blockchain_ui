import fetch from 'fetch-with-proxy';

const headers = {
    'Accept': 'application/json'
};

export const validateSession = () =>
    fetch(`http://pythonbackendelb-1027326963.us-west-2.elb.amazonaws.com:5000/user/validateSession`, {
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
    fetch(`http://pythonbackendelb-1027326963.us-west-2.elb.amazonaws.com:5000/user/logout`, {
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
    fetch (`http://pythonbackendelb-1027326963.us-west-2.elb.amazonaws.com:5000/user/signup`,
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
    fetch(`http://pythonbackendelb-1027326963.us-west-2.elb.amazonaws.com:5000/user/login`, {
        method: 'POST',
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
