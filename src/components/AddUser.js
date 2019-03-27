import React, { Component } from 'react';
import Menu from './SideMenu'
import TopMenu from './TopMenu'
import {Link, withRouter} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {doCreateUser} from "../api/orgAPI";
import {bindActionCreators} from "redux";
import {user_addiiton_success} from "../actions/orgnization_user";

const options = ['Given name','Last name', 'Email', 'Zip', 'City', 'Phone']
const secondOptions = ['Given name','Last name', 'Email', 'Zip', 'City', 'Phone']

class AddUser extends Component {
    constructor() {
        super();
        this.state = {
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
            phone: "",
            selectedDropdown1: '',
            selectedDropdown2: ''
        }
        this.onDropdown1Change = this.Dropdown1Change.bind(this);
        this.onDropdown2Change = this.Dropdown2Change.bind(this);
    }

    Dropdown1Change(e) {
        const selectedVal = e.target.value;
        this.setState({  ...this.state, selectedDropdown1: selectedVal })
    }

    Dropdown2Change(e) {
        const selectedVal = e.target.value;
        this.setState({ ...this.state, selectedDropdown2: selectedVal });
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
            'gender' : this.state.gender,
            'email' : this.state.email,
            'ethnicity' : this.state.ethnicity,
            'address_line_1' : this.state.line1,
            'address_line_2' : this.state.apt,
            'city' : this.state.city,
            'state' : this.state.st,
            'country_of_residence' : this.state.country,
            'zip' : this.state.zip,
            'country_of_citizenship' : this.state.citizen_country,
            'phone' : this.state.phone
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
        console.log("[signin] render method");
        return (
            <div>
                <TopMenu/>
                <div className="">
                    <Menu/>
                </div>
                <div className="page-content-wrapper">
                    <div className="page-content top-side-padding">
                        <h1 className="page-title">Add New User</h1>
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
                                        <div className="caption">Add New User</div>
                                    </div>
                                    <div className="portlet-body form">
                                        <div className="form-body">
                                            <h3 className="form-section">Search
                                            </h3>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Given Name</label>
                                                        <select>
                                                                {options.map(p => <option>{p}</option>)}
                                                        </select>
                                                        <input type="text"/>
                                                        <span id="givenNameErr"/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Last Name</label>
                                                        <select>
                                                                {options.map(p => <option>{p}</option>)}
                                                        </select>
                                                        <input type="text"/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Date of Birth</label>
                                                        <input type="text" className="form-control" placeholder="mm/dd/yyyy"
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
                                                        <label className="control-label">Gender</label>
                                                        <select className="form-control"
                                                                onChange={(event) => {
                                                                    this.setState({
                                                                        ...this.state,
                                                                        gender : event.target.value
                                                                    })
                                                                }}
                                                        >
                                                            <option value="">Male</option>
                                                            <option value="">Female</option>
                                                        </select>

                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
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

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Ethinicity</label>
                                                        <select className="form-control"
                                                                onChange={(event) => {
                                                                    this.setState({
                                                                        ...this.state,
                                                                        ethnicity : event.target.value
                                                                    })
                                                                }}
                                                        >
                                                            <option value="">---Select One---</option>
                                                            <option value="">American</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <h3 className="form-section">Address & Contact Info</h3>

                                            <div className="row">
                                                <div className="col-md-6 ">
                                                    <div className="form-group">
                                                        <label>Line 1</label>
                                                        <input type="text" className="form-control"
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       ...this.state,
                                                                       line1 : event.target.value
                                                                   })
                                                               }}
                                                        /> </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Building / Apt Number</label>
                                                        <input type="text" className="form-control"
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       ...this.state,
                                                                       apt : event.target.value
                                                                   })
                                                               }}
                                                        /> </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>City</label>
                                                        <input type="text" className="form-control"
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       ...this.state,
                                                                       city : event.target.value
                                                                   })
                                                               }}
                                                        /> </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>State</label>
                                                        <input type="text" className="form-control"
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       ...this.state,
                                                                       st : event.target.value
                                                                   })
                                                               }}
                                                        /> </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Country</label>
                                                        <select className="form-control"
                                                                onChange={(event) => {
                                                                    this.setState({
                                                                        ...this.state,
                                                                        country : event.target.value
                                                                    })
                                                                }}
                                                        >
                                                        </select>

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
                                                        <label>Country of Citizenship</label>
                                                        <select className="form-control"
                                                                onChange={(event) => {
                                                                    this.setState({
                                                                        ...this.state,
                                                                        citizen_country : event.target.value
                                                                    })
                                                                }}
                                                        > </select>
                                                    </div>
                                                </div>
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
                                                        /></div>
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

export default withRouter(AddUser);