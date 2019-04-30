import React, { Component } from 'react';
import Logo from './../assets/images/UABT_logo.png';
import {Link, withRouter} from 'react-router-dom';
import './../assets/stylesheets/bootstrap.min.css';
import './../assets/stylesheets/style.css';
import './../assets/stylesheets/animate.css';
import {Backend} from './../api/Util';
import SignUp from './Signup';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {login_success} from "../actions/login";

class ResetPassword extends Component {

    constructor() {
        super();
        this.state = {
            email : "",
            password : "",
            message : "",
            emailColor:""
        }
    }

    handleLogin = (() => {
        // showAlert("SHowed Successful", "info", this);
        document.getElementById('emailErr').innerHTML = '';
        console.log('1',this.state.email);
        console.log('1',this.state.password);
        //Validation
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

        if(!this.state.email){
            document.getElementById('emailErr').innerHTML = 'Username is required';
        }
        else if (!this.state.password){
            document.getElementById('passwordErr').innerText = 'Password is required';
        }
        else if(!re.test(this.state.email)){
            document.getElementById('emailErr').innerHTML='Email is invalid';
        }
        else if (this.state.password.length > 0){
            document.getElementById('passwordErr').innerText = '';

            // console.log('inside');
            let payload = {
                'password': this.state.password
            };
        }
    });


    render() {
        console.log("[signin] render method");
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

        return (
            <div className="gray-bg">
                <div className="middle-box text-center loginscreen animated fadeInDown">
                    <h1><img src={Logo} alt="Logo"/></h1>

                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Enter New Password" required=""
                               onChange={(event) => {
                                   this.setState({
                                       ...this.state,
                                       email: event.target.value
                                   })
                               }}
                        />
                        <span id="emailErr"/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Confirm Password" required=""
                               onChange={(event) => {
                                   this.setState({
                                       ...this.state,
                                       password: event.target.value
                                   })
                               }}
                        />
                        <span id="passwordErr"/>
                    </div>
                    <a type="submit" className="btn btn-primary block full-width m-b" onClick={()=>{this.handleLogin()}}>Submit</a>

                </div>
            </div>
        );
    }
}

function mapStateToProps(reducer_state) {
    return {
        user: reducer_state.user_reducer
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({login_success: login_success}, dispatch)
}

export default withRouter(connect(mapStateToProps)(ResetPassword));