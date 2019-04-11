import React, { Component } from 'react';
import Menu from './SideMenu'
import TopMenu from './TopMenu'
import {Link, withRouter} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {bindActionCreators} from "redux";
import DeleteIcon from '@material-ui/icons/Delete';
import {connect} from "react-redux";
import {BackendCredBody} from "../api/Util"

// This is user profile edit
class Page2 extends Component {
    constructor() {
        super();
        this.state = {
            given_name : "",
            last_name : "",
            dob : "",
            gender : "",
            email : "",
            ethnicity : "",
            address_line_1 : "",
            address_line_2 : "",
            city : "",
            state : "",
            country_of_residence : "",
            country_of_citizenship : "",
            zip : "",
            phone: ""
        }
    }


    handleDataEntry = (() => {
        console.log('Updated state in edit profile page', this.state)
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
            'address_line_1' : this.state.address_line_1,
            'address_line_2' : this.state.address_line_2,
            'city' : this.state.city,
            'state' : this.state.state,
            'country_of_residence' : this.state.country_of_residence,
            'zip' : this.state.zip,
            'country_of_citizenship' : this.state.country_of_citizenship,
            'phone' : this.state.phone
        };

        let method = 'POST';
        let endpoint = 'api/vi/save_user_profile'

        BackendCredBody(payload, endpoint, method).then((response) => {
            console.log(response.status);
            if (response.status === 200) {
                response.json().then((data) => {
                    console.log(data);
                    if(data.message==="success") {
                        this.props.history.push("/userprofile");
                    }
                    else{
                        alert("Changes could not be saved. Please try again");
                    }
                });
            }
            else {
                console.log("Error: ", response);
                alert("Changes could not be saved. Please try again");
                // alert("Error while Signing In");
            }
        });
    });

    render() {
        return (
            <div>
                <TopMenu/>
                <div className="">
                    <Menu/>
                </div>
                <div className="page-content-wrapper">
                    <div className="page-content top-side-padding">
                        <h1 className="page-title">Edit form</h1>
                        <div className="page-bar">
                            <ul className="page-breadcrumb">
                                <li>
                                    <FontAwesomeIcon
                                        icon='home'
                                        size='2x'
                                        spin
                                        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                                    />
                                    {/*<span className='DeleteIcon'></span>*/}
                                    {/*<i className='material-icons'></i>*/}
                                    <DeleteIcon/>
                                    <a href="/page1">Home </a>
                                </li>
                            </ul>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="portlet box blue">
                                    <div className="portlet-title">
                                        <div className="caption">Edit your profile</div>
                                    </div>
                                    <div className="portlet-body form">
                                        <div className="form-body">
                                            <DeleteIcon/>
                                            <h3 className="form-section">Person Info
                                            </h3>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Given Name</label>
                                                        <input type="text" id="firstName" className="form-control" placeholder="Enter legal name"
                                                               value={this.props.user.given_name}
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
                                                               value={this.props.user.last_name}
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
                                                        <label className="control-label">Date of Birth</label>
                                                        <input type="text" className="form-control" placeholder="mm/dd/yyyy"
                                                               value={this.props.user.dob}
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
                                                                value={this.props.user.gender}
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
                                                               value={this.props.user.email}
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
                                                            <option value="American Indian or Alaska Native">American Indian or Alaska Native</option>
                                                            <optton value="Asian">Asian</optton>
                                                            <optton value="Black or African American">Black or African American</optton>
                                                            <optton value="Native Hawaiian or Other Pacific Islander">Native Hawaiian or Other Pacific Islander</optton>
                                                            <optton value="White">White</optton>
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
                                                               value={this.props.user.address_line_1}
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       ...this.state,
                                                                       address_line_1 : event.target.value
                                                                   })
                                                               }}
                                                        /> </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Address Line 2</label>
                                                        <input type="text" className="form-control"
                                                               value={this.props.user.address_line_1}
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       ...this.state,
                                                                       address_line_2 : event.target.value
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
                                                               value={this.props.user.city}
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
                                                                       state : event.target.value
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
                                                                        country_of_residence : event.target.value
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
                                                                        country_of_citizenship : event.target.value
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
    console.log("In page2-->user profile edit page", reducer_state)
    return {
        user: reducer_state.user_reducer
    };
}

export default withRouter(connect(mapStateToProps)(Page2));
