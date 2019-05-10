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

export const getUserProfile = (payload) =>
    fetch(`http://pythonbackendelb-1027326963.us-west-2.elb.amazonaws.com:5000/api/v1/get_user_info?user_id=current`, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        //body: JSON.stringify(payload)
    }).then(res => {
        return res;
    }).catch(error => {
        console.log("This is error");
        return error;
    });

export const doSignUp = (payload) =>
    fetch (`http://pythonbackendelb-1027326963.us-west-2.elb.amazonaws.com:5000/api/v1/signup_organization`,
        {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        }).then(res => {
        return res;
    }).catch(error => {
        console.log("Error: ");
        console.log(error);
        return error;
    });

export const doLogin = (payload) =>
    fetch(`http://pythonbackendelb-1027326963.us-west-2.elb.amazonaws.com:5000/api/v1/login`, {
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

