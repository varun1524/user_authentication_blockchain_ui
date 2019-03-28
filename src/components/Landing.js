import React, { Component } from 'react';
import Logo from './../assets/images/UABT_logo.png';
import {Link, withRouter} from 'react-router-dom';
import './../assets/stylesheets/bootstrap.min.css';
import './../assets/stylesheets/style.css';
import './../assets/stylesheets/animate.css';
import {doLogin} from './../api/userAPI';
import SignUp from './Signup';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {login_success} from "../actions/login";

class Landing extends Component {

    constructor(){
        super();
        this.state = {
            email : "",
            password : "",
            message : "",
            emailColor:""
        }
    }

    componentDidMount(){

    }

    componentWillMount(){

    }

    componentWillUnmount(){

    }

    handleLogin = (() => {
        // showAlert("SHowed Successful", "info", this);
        document.getElementById('emailErr').innerHTML = '';
        console.log('1',this.state.email);
        console.log('2',this.state.password);
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

            console.log('inside');
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
                        this.props.history.push("/dashboard");
                    });

                }
                else if (response.status === 403) {
                    this.setState({
                        ...this.state,
                        message: "Username/Password incorrect. Please try again"
                        
                    });
                }
                else {
                    console.log("Error: ", response);
                    // alert("Error while Signing In");
                }
            });
        }
    });
    redirectLogin = ((path)=>{
        this.props.history.push(path);
    });

    render() {
        console.log("Rendering signin in landing page");
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
        return (
            <div className="gray-bg">
                <div className="middle-box text-center loginscreen animated fadeInDown">
                    <h1><img src={Logo} alt="Logo"/></h1>

                    <div className="form-group">
                        <input type="email" className="form-control" placeholder="Username" required=""
                               onChange={(event) => {
                                   this.setState({
                                       ...this.state,
                                       emailColor : re.test(this.state.email) ? 'black' : 'Red',
                                       email: event.target.value
                                   })
                               }}
                        />
                        <span id="emailErr"/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Password" required=""
                               onChange={(event) => {
                                   this.setState({
                                       ...this.state,
                                       password: event.target.value
                                   })
                               }}
                        />
                        <span id="passwordErr"/>
                    </div>
                    <a type="submit" className="btn btn-primary block full-width m-b" onClick={()=>{this.handleLogin()}}>Login</a>

                    <a href="#">
                        <small>Forgot password?</small>
                    </a>
                    <p className="text-muted text-center">
                        <small>Do not have an account?</small>
                    </p>
                    <a className="btn btn-sm btn-white btn-block" href="/signup">Create an account</a>

                </div>
            </div>
        );
    }
}

function mapStateToProps(reducer_state) {
    return {
        user: reducer_state.user
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({login_success: login_success}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Landing));