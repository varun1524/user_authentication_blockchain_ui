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


                    <h1 class="page-title"> New User Form

                    </h1>
                    <div class="page-bar">
                        <ul class="page-breadcrumb">
                            <li>
                                <i class="icon-home"></i>
                                <a href="index-2.html">Home</a>
                                <i class="fa fa-angle-right"></i>
                            </li>
                            <li>
                                <span>Users</span>
                                <i class="fa fa-angle-right"></i>
                            </li>
                            <li>
                                <span>New</span>
                            </li>
                        </ul>

                    </div>

                    <div class="row">
                        <div class="col-md-12">

                            <div class="tab-pane" id="tab_1">
                                <div class="portlet box blue">
                                    <div class="portlet-title">
                                        <div class="caption">
                                            <i class="fa fa-gift"></i>Create New User</div>

                                    </div>
                                    <div class="portlet-body form">

                                        <form action="#" class="horizontal-form">
                                            <div class="form-body">
                                                <h3 class="form-section">Person Info</h3>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label class="control-label">Given Name</label>
                                                            <input type="text" id="firstName" class="form-control" placeholder="Enter legal name"></input>

                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label class="control-label">Last Name</label>
                                                            <input type="text" id="lastName" class="form-control" placeholder="Enter last name"></input>

                                                        </div>
                                                    </div>

                                                </div>

                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label class="control-label">Date of Birth</label>
                                                            <input type="text" class="form-control" placeholder="mm/dd/yyyy"></input> </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label class="control-label">Gender</label>
                                                            <select class="form-control">
                                                                <option value="">Male</option>
                                                                <option value="">Female</option>
                                                            </select>

                                                        </div>
                                                    </div>

                                                </div>

                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label class="control-label">Email</label>
                                                            <input type="text" id="lastName" class="form-control" placeholder="Enter email"></input>

                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label class="control-label">Ethinicity</label>
                                                            <select class="form-control">
                                                                <option value="">---Select One---</option>
                                                                <option value="">American</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                </div>

                                                <h3 class="form-section">Address & Contact Info</h3>
                                                <div class="row">
                                                    <div class="col-md-6 ">
                                                        <div class="form-group">
                                                            <label>Line 1</label>
                                                            <input type="text" class="form-control"></input> </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label>Building / Apt Number</label>
                                                            <input type="text" class="form-control"></input> </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label>City</label>
                                                            <input type="text" class="form-control"></input> </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label>State</label>
                                                            <input type="text" class="form-control"></input> </div>
                                                    </div>

                                                </div>

                                                <div class="row">

                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label>Country</label>
                                                            <select class="form-control"> </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label>Zip</label>
                                                            <input type="text" class="form-control"></input> </div>
                                                    </div>

                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label>Country of Citizenship</label>
                                                            <select class="form-control"> </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label>Phone</label>
                                                            <input type="text" class="form-control"></input> </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-actions right">
                                                <button type="button" class="btn default">Cancel</button>
                                                <button type="submit" class="btn blue">
                                                    <i class="fa fa-check"></i> Save</button>
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