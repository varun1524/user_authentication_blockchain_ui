import React, {Component} from 'react';
import {doLogin} from './../api/authAPI';
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import logo from './../assets/images/logo-default.png';

class CreateUser extends Component {

    handleLogin = (() => {
        // showAlert("SHowed Successful", "info", this);
        document.getElementById('emailErr').innerHTML = '';
        console.log('1', this.state.email);
        console.log('1', this.state.password);
        //Validation
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

        if (!this.state.email) {
            document.getElementById('emailErr').innerHTML = 'Username is required';
        }
        else if (!this.state.password) {
            document.getElementById('passwordErr').innerText = 'Password is required';
        }
        else if (!re.test(this.state.email)) {
            document.getElementById('emailErr').innerHTML = 'Email is invalid';
        }
        else if (this.state.password.length > 0) {
            document.getElementById('passwordErr').innerText = '';

            // console.log('inside');
            let payload = {
                'email': this.state.email,
                'password': this.state.password
            };

            doLogin(payload).then((response) => {
                console.log(response.status);
                if (response.status === 200) {
                    response.json().then((data) => {
                        console.log(data);
                        this.props.login_success(data);
                        this.props.history.push("/home");
                    });

                }
                else if (response.status === 404) {
                    this.setState({
                        ...this.state,
                        message: "User not registered. Please sign up"
                    });
                }
                else if (response.status === 401) {
                    this.setState({
                        ...this.state,
                        message: "Incorrect Password. Please try again"
                    });
                }
                else {
                    console.log("Error: ", response);
                    // alert("Error while Signing In");
                }
            });
        }
    });

    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            message: "",
            emailColor: ""
        }
    }

    render() {
        console.log("[signin] render method");
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

        return (
            <h1>View Block</h1>
        );
    }
}

function mapStateToProps(reducer_state) {
    return {
        CreateUserR: reducer_state.CreateUser
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({CreateUser: CreateUser}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateUser));