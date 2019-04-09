import React, { Component } from 'react';
import Menu from './SideMenu'
import TopMenu from './TopMenu'
import {Link, withRouter} from 'react-router-dom';
import {doCreateBranch} from "../api/orgAPI";
import {bindActionCreators} from "redux";
import {branch_addiiton_success} from "../actions/organization_admin";
import KeyboardArrowRight from "@material-ui/core/es/internal/svg-icons/KeyboardArrowRight";
import {Home} from "@material-ui/icons";
import {Backend} from './../api/Util';

class OrganizationProfile extends Component {
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

    componentWillMount() {
        let endpoint = "api/v1/get_organization_details"
    }

    handleDataEntry = (() => {
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
                                                        <label className="control-label">Name: &nbsp;</label>
                                                        <label ></label>
                                                        <span id="nameErr"/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Email: &nbsp;</label>
                                                        <label ></label>
                                                        <span id="nameErr"/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Address: &nbsp;</label>
                                                        <label ></label>
                                                        <span id="nameErr"/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">City: &nbsp;</label>
                                                        <label ></label>
                                                        <span id="nameErr"/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Country: &nbsp;</label>
                                                        <label ></label>
                                                        <span id="nameErr"/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">State: &nbsp;</label>
                                                        <label ></label>
                                                        <span id="nameErr"/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Zip: &nbsp;</label>
                                                        <label ></label>
                                                        <span id="nameErr"/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Organization Type: &nbsp;</label>
                                                        <label ></label>
                                                        <span id="nameErr"/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Phone: &nbsp;</label>
                                                        <label ></label>
                                                        <span id="nameErr"/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Headquarter: &nbsp;</label>
                                                        <label ></label>
                                                        <span id="nameErr"/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Date Founded: &nbsp;</label>
                                                        <label ></label>
                                                        <span id="nameErr"/>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="form-actions right">
                                                <button type="button" className="btn default">Cancel</button>&nbsp;
                                                <a className="btn blue" href="/organizationprofileedit">Edit</a>
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

export default withRouter(OrganizationProfile);