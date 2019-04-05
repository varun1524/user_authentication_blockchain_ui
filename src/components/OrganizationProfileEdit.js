import React, { Component } from 'react';
import Menu from './SideMenu'
import TopMenu from './TopMenu'
import {Link, withRouter} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {doCreateBranch} from "../api/orgAPI";
import {bindActionCreators} from "redux";
import {branch_addiiton_success} from "../actions/organization_admin";
import {CountryDropdown, RegionDropdown} from "react-country-region-selector";
import KeyboardArrowRight from "@material-ui/core/es/internal/svg-icons/KeyboardArrowRight";
import {Home} from "@material-ui/icons";

class OrganizationProfileEdit extends Component {
    constructor() {
        super();
        this.state = {
            address_line_1 : "",
            address_line_2 : "",
            city : "",
            state : "",
            zip: "",
            country : "",
            phone : ""
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
            'address_line_1' : this.state.address_line_1,
            'address_line_2' : this.state.address_line_2,
            'city' : this.state.city,
            'state' : this.state.state,
            'country' : this.state.country,
            'zip': this.state.zip,
            'phone': this.state.phone
        };

        doCreateBranch(payload).then((response) => {
            console.log(response.status);
            if (response.status === 200) {
                response.json().then((data) => {
                    console.log(data);
                    alert("Branch details successfully added")
                    this.props.branch_addiiton_success(data);
                    // this.props.history.push("/home");
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
                    message: "Branch already exists"
                });
            }
            else {
                console.log("Error: ", response);
                // alert("Error while Signing In");
            }
        });
    });

    render() {
        console.log("[org profile] render method");
        return (
            <div>
                <TopMenu/>
                <div className="">
                    <Menu/>
                </div>
                <div className="page-content-wrapper">
                    <div className="page-content top-side-padding">
                        <h1 className="page-title">Organization Profile</h1>
                        <div className="page-bar">
                            <ul className="page-breadcrumb">
                                <li>
                                    <Home className="myiconcolor"/>
                                    <a href="/dashboard">Home </a>
                                    <KeyboardArrowRight className="myiconcolor"/>
                                    <a href="/organizationprofile">Organization Profile </a>
                                    <KeyboardArrowRight className="myiconcolor"/>
                                    <a href="/organizationprofileedit">Edit </a>
                                </li>

                            </ul>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="portlet box blue">
                                    <div className="portlet-title">
                                        <div className="caption">Details</div>
                                    </div>
                                    <div className="portlet-body form">
                                        <div className="form-body">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Name</label>
                                                        <input type="text" placeholder="Enter name"
                                                               className="form-control"
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       ...this.state,
                                                                       name: event.target.value
                                                                   })
                                                               }}
                                                        />
                                                        <span id="nameErr"/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Email</label>
                                                        <input type="email" placeholder="Enter email"
                                                               className="form-control"
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       ...this.state,
                                                                       email: event.target.value
                                                                   })
                                                               }}
                                                        /><span id="emailErr"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Address 1</label>
                                                        <input type="text" placeholder="Enter address 1"
                                                               className="form-control"
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       ...this.state,
                                                                       address_line_1: event.target.value
                                                                   })
                                                               }}
                                                        /><span id="add1Err"/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Address 2</label>
                                                        <input type="text" placeholder="Enter Apt No / Building No"
                                                               className="form-control"
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       ...this.state,
                                                                       address_line_2: event.target.value
                                                                   })
                                                               }}
                                                        />
                                                        <span id="add2Err"/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">City</label>
                                                        <input type="text" placeholder="Enter city"
                                                               className="form-control"
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       ...this.state,
                                                                       city: event.target.value
                                                                   })
                                                               }}
                                                        />
                                                        <span id="cityErr"/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Country</label>
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
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">State</label>
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
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Zip</label>
                                                        <input type="text" placeholder="Enter zip"
                                                               className="form-control"
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       ...this.state,
                                                                       zip: event.target.value
                                                                   })
                                                               }}
                                                        /><span id="zipErr"/>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Organization Type</label>
                                                        <select className="form-control m-b" name="account"
                                                                onChange={(event) => {
                                                                    this.setState({
                                                                        ...this.state,
                                                                        organization_type: event.target.value
                                                                    })
                                                                }}
                                                        >
                                                            <option>Educational</option>
                                                            <option>Medical</option>
                                                            <option>IT</option>
                                                            <option>Government</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Phone</label>
                                                        <input type="text" placeholder="Enter contact no"
                                                               className="form-control"
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       ...this.state,
                                                                       phone: event.target.value
                                                                   })
                                                               }}
                                                        /><span id="phoneErr"/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Headquarter</label>
                                                        <input type="text" placeholder="Enter location"
                                                               className="form-control"
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       ...this.state,
                                                                       headquarter: event.target.value
                                                                   })
                                                               }}/>
                                                        <span id="hqErr"/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Date founded</label>
                                                        <input type="date" placeholder="Enter MM/DD/YYYY"
                                                               className="form-control"
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       ...this.state,
                                                                       founded_date: event.target.value
                                                                   })
                                                               }}/>
                                                        <span id="datefErr"></span>
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
    return bindActionCreators({branch_addiiton_success: branch_addiiton_success}, dispatch)
}

export default withRouter(OrganizationProfileEdit);