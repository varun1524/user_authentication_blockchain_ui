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



                <div class="page-content">


                    <h1 class="page-title"> View User Info - John Doe

                    </h1>
                    <div class="page-bar">
                        <ul class="page-breadcrumb">
                            <li>
                                <i class="icon-home"></i>
                                <a href="index-2.html">Home</a>
                                <i class="fa fa-angle-right"></i>
                            </li>
                            <li>
                                <span>My Profile</span>

                            </li>

                        </ul>

                    </div>

                    <div class="row">
                        <div class="col-md-12">

                            <div class="tab-pane" id="tab_3">
                                <div class="portlet box blue">
                                    <div class="portlet-title">
                                        <div class="caption">
                                            <i class="fa fa-gift"></i>My Profile</div>

                                    </div>
                                    <div class="portlet-body form">

                                        <form class="form-horizontal" role="form">
                                            <div class="form-body">

                                                <h3 class="form-section">Person Info</h3>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label class="control-label col-md-3">Given Name:</label>
                                                            <div class="col-md-9">
                                                                <p class="form-control-static"> John </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label class="control-label col-md-3">Last Name:</label>
                                                            <div class="col-md-9">
                                                                <p class="form-control-static"> Doe </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label class="control-label col-md-3">Gender:</label>
                                                            <div class="col-md-9">
                                                                <p class="form-control-static"> Male </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label class="control-label col-md-3">Date of Birth:</label>
                                                            <div class="col-md-9">
                                                                <p class="form-control-static"> 20.01.1984 </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label class="control-label col-md-3">Email:</label>
                                                            <div class="col-md-9">
                                                                <p class="form-control-static"> johndoe@gmail.com </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label class="control-label col-md-3">Ethinicity:</label>
                                                            <div class="col-md-9">
                                                                <p class="form-control-static"> Asian </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                                <h3 class="form-section">Address</h3>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label class="control-label col-md-3">Address:</label>
                                                            <div class="col-md-9">
                                                                <p class="form-control-static"> 1334 The Alameda, Apt #385 </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label class="control-label col-md-3">City:</label>
                                                            <div class="col-md-9">
                                                                <p class="form-control-static"> San Jose </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">


                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label class="control-label col-md-3">State:</label>
                                                            <div class="col-md-9">
                                                                <p class="form-control-static"> CA </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label class="control-label col-md-3">Country:</label>
                                                            <div class="col-md-9">
                                                                <p class="form-control-static"> USA </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row">


                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label class="control-label col-md-3">Zip:</label>
                                                            <div class="col-md-9">
                                                                <p class="form-control-static"> 95126 </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label class="control-label col-md-3">Country of Citizenship:</label>
                                                            <div class="col-md-9">
                                                                <p class="form-control-static"> India </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label class="control-label col-md-3">Phone:</label>
                                                            <div class="col-md-9">
                                                                <p class="form-control-static"> +1 408 888 8888 </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-actions">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="row">
                                                            <div class="col-md-offset-3 col-md-9">
                                                                <button type="submit" class="btn green">
                                                                    <i class="fa fa-pencil"></i> Edit</button>
                                                                <button type="button" class="btn default">Cancel</button>
                                                                <button type="button" className="btn default" onClick={(()=>{this.redirectPage("/CreateBlockUser")})}>Enter New Experience Data
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6"> </div>
                                                </div>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>
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