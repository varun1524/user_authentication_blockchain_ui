import React, { Component } from 'react';
import Menu from './SideMenu'
import TopMenu from './TopMenu'
import {Link, withRouter} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {BackendCredBody} from "../api/Util";
import {bindActionCreators} from "redux";
import {user_addiiton_success} from "../actions/orgnization_user";
import {connect} from "react-redux";

class AddNewUser extends Component {
    constructor() {
        super();
        this.state = {
            given_name : "",
            last_name : "",
            dob : "",
            email : "",
            user_type: ""
        }
    }

    handleDataEntry = (() => {
        // showAlert("SHowed Successful", "info", this);
        // document.getElementById('emailErr').innerHTML = '';
        //console.log('1',this.state.email);
        //console.log('2',this.state.password);
        //console.log('3', this.state)
        //Validation
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

        // code for validation

        // if(!this.state.given_name){
        //     document.getElementById('emailErr').innerHTML = 'Username is required';
        // }
        // else if (!this.state.password){
        //     document.getElementById('passwordErr').innerText = 'Password is required';
        // }
        // else if(!re.test(this.state.email)){
        //     document.getElementById('emailErr').innerHTML='Email is invalid';
        // }
        // else if (this.state.password.length > 0){
        //     document.getElementById('passwordErr').innerText = '';
        //
        // console.log('inside');

        /*
        * state data
        given_name : "",
        last_name : "",
        dob : "",
        gender : "",
        email : "",
        ethnicity : "",
        line1 : "",
        apt : "",
        city : "",
        st : "",
        country : "",
        zip : "",
        citizen_country : "",
        message : "",
        emailColor:"",
        phone: ""
        *
        * */

        if(!this.state.given_name){
            document.getElementById('givenNameErr').innerHTML = 'First name is required';
        }
        else if(this.state.user_type===0){
            document.getElementById('userTypeErr').innerHTML = 'User Type is required';
        }

        let payload = {
            'given_name' : this.state.given_name,
            'last_name' : this.state.last_name,
            'dob' : this.state.dob,
            'email' : this.state.email,
            'password' : 'abcd',
            'user_type' : this.state.user_type
        };
        console.log("++++ Payload  +++");
        console.log(payload);
        let endpoint='api/v1/create_user';
        let method='POST';
        BackendCredBody(payload,endpoint,method).then((response) => {
            console.log(response.status);
            if (response.status === 200) {
                response.json().then((data) => {
                    console.log(data);
                    if(data.message==="success") {
                        console.log(data);
                        this.props.user_addiiton_success(data);
                        this.props.history.push("/home");
                    }
                    else {
                        alert("User could not be added. Please try again!")
                    }
                });

            }
            else if (response.status === 404) {
                this.setState({
                    ...this.state,
                    message: "Service not found"
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
    });

    render() {
        console.log("[addnewuser] render method");
        return (
            <div>
                <TopMenu/>
                <div className="">
                    <Menu/>
                </div>
                <div className="page-content-wrapper">
                    <div className="page-content top-side-padding">
                        <h1 className="page-title">New User Form</h1>
                        <div className="page-bar">
                            <ul className="page-breadcrumb">
                                <li>
                                    <FontAwesomeIcon
                                        icon='home'
                                        size='2x'
                                        spin
                                        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                                    />
                                    <a href="/page1">Home </a>
                                </li>
                            </ul>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="portlet box blue">
                                    <div className="portlet-title">
                                        <div className="caption">Create New User</div>
                                    </div>
                                    <div className="portlet-body form">
                                        <div className="form-body">
                                            <h3 className="form-section">Person Info
                                            </h3>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Given Name</label>
                                                        <input type="text" id="firstName" className="form-control" placeholder="Enter legal name"
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       ...this.state,
                                                                       given_name : event.target.value
                                                                   })
                                                               }}
                                                        />
                                                        <span id="givenNameErr"/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Last Name</label>
                                                        <input type="text" id="lastName" className="form-control" placeholder="Enter last name"
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       ...this.state,
                                                                       last_name : event.target.value
                                                                   })
                                                               }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Date of Birth (MM/DD/YYYY)</label>
                                                        <input type="date" className="form-control" placeholder="mm/dd/yyyy"
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       ...this.state,
                                                                       dob : event.target.value
                                                                   })
                                                               }}
                                                        /> </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Email</label>
                                                        <input type="text" id="lastName" className="form-control" placeholder="Enter email"
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       ...this.state,
                                                                       email : event.target.value
                                                                   })
                                                               }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">User Type</label>
                                                        <select className="form-control"
                                                                onChange={(event) => {
                                                                    this.setState({
                                                                        ...this.state,
                                                                        user_type : event.target.value
                                                                    })
                                                                }}
                                                        >
                                                            <option value="0">----SELECT ONE----</option>
                                                            <option value="3">Organization User</option>
                                                            <option value="4">Normal User</option>
                                                        </select>
                                                        <span id="userTypeErr"/>
                                                    </div>
                                                </div>


                                            </div>

                                            <div className="form-actions right">
                                                <button type="button" className="btn default">Cancel</button>&nbsp;
                                                <button type="button" className="btn blue" onClick={()=>{this.handleDataEntry()}}>Submit</button>
                                            </div>
                                        </div>
                                    </div>
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
        organization_user: reducer_state.organization_user
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({user_addiiton_success: user_addiiton_success}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddNewUser));
