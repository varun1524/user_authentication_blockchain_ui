import React, { Component } from 'react';
import Menu from './SideMenu'
import TopMenu from './TopMenu'
import {Link, withRouter} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {doCreateUser} from "../api/orgAPI";
import {bindActionCreators} from "redux";
import {user_addiiton_success} from "../actions/orgnization_user";
import {CountryDropdown, RegionDropdown} from "react-country-region-selector";

class AddNewBranch extends Component {
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
        console.log('1',this.state.email);
        console.log('2',this.state.password);
        console.log('3', this.state)
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

        let payload = {
            'given_name' : this.state.given_name,
            'last_name' : this.state.last_name,
            'dob' : this.state.dob,
            'email' : this.state.email,
            'user_type' : this.state.user_type
        };

        doCreateUser(payload).then((response) => {
            console.log(response.status);
            if (response.status === 200) {
                response.json().then((data) => {
                    console.log(data);
                    this.props.user_addiiton_success(data);
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
                        <h1 className="page-title">New Branch</h1>
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
                                        <div className="caption">Create New Branch</div>
                                    </div>
                                    <div className="portlet-body form">
                                        <div className="form-body">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Address Line 1</label>
                                                        <input type="text" className="form-control"
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       ...this.state,
                                                                       addressline1 : event.target.value
                                                                   })
                                                               }}
                                                        /> </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Address Line 2</label>
                                                        <input type="text" className="form-control"
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       ...this.state,
                                                                       addressline2 : event.target.value
                                                                   })
                                                               }}
                                                        /> </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Country</label>
                                                        <CountryDropdown class="form-control m-b" name="account"
                                                                         value={this.state.country}
                                                                         onChange={(val) => {
                                                                             this.setState({
                                                                                 ...this.state,
                                                                                 country: val
                                                                             })
                                                                         }}
                                                        >
                                                        </CountryDropdown><span id="countryErr"/>

                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>State</label>
                                                        <RegionDropdown class="form-control m-b" name="account"
                                                                        country={this.state.country}
                                                                        value={this.state.state}
                                                                        onChange={(val) => {
                                                                            this.setState({
                                                                                ...this.state,
                                                                                state: val
                                                                            })
                                                                        }}
                                                        >
                                                        </RegionDropdown><span id="stateErr"/>

                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>City</label>
                                                        <input type="text" placeholder="Enter city"
                                                               className="form-control"
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       ...this.state,
                                                                       city: event.target.value
                                                                   })
                                                               }}
                                                        /><span id="cityErr"/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Zip</label>
                                                        <input type="text" className="form-control"
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       ...this.state,
                                                                       zip : event.target.value
                                                                   })
                                                               }}
                                                        /> </div>
                                                </div>

                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Phone</label>
                                                        <input type="text" className="form-control"
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       ...this.state,
                                                                       phone : event.target.value
                                                                   })
                                                               }}
                                                        /> </div>
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

export default withRouter(AddNewBranch);