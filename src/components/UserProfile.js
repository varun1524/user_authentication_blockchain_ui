import React, { Component } from 'react';
import Menu from './SideMenu'
import TopMenu from './TopMenu'
import {Link, withRouter} from 'react-router-dom';
import {getUserProfile} from "../api/userAPI";
import {bindActionCreators} from "redux";
import {user_profile_fetch} from "../actions/user";
import KeyboardArrowRight from "@material-ui/core/es/internal/svg-icons/KeyboardArrowRight";
import {Home} from "@material-ui/icons";
import {connect} from "react-redux";

class UserProfile extends Component {
    constructor() {
        super();
        this.state = {
            given_name : "",
            last_name : "",
            dob : "",
            email:"",
            gender:"",
            ethnicity:"",
            address_line_1:"",
            address_line_2:"",
            city:"",
            state : "",
            zip: "",
            country_of_residence : "",
            country_of_citizenship : "",
            phone : ""
        }
    }
    componentDidMount() {
        let payload = {
            "user_id" : 1
        };
        console.log("-----IN USER PROFILE-----",payload);
        getUserProfile(payload).then((response) => {
            console.log(response.status);
            if (response.status === 200) {
                response.json().then((data) => {
                    console.log(data);
                    if(data.message==="success") {
                        console.log("data in user profile",JSON.parse(data.data));
                        this.props.user_profile_fetch(JSON.parse(data.data));
                    }
                    else {
                        alert("User profile could not be fetched. Please try again!")
                    }
                    this.props.user_profile_fetch(data);
                });
            }
            else if (response.status === 404) {
                this.setState({
                    ...this.state,
                    message: "Service not found"
                });
            }
            else {
                console.log("Error: ", response);
                // alert("Error while Signing In");
            }
        });
    }

    handleDataEntry = (() => {
        console.log('User Profile', this.state)
        //Validation
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
                        <h1 className="page-title">User Profile</h1>
                        <div className="page-bar">
                            <ul className="page-breadcrumb">
                                <li>
                                    <Home className="myiconcolor"/>
                                    {/*<a href="/dashboard">Home </a>*/}
                                    <KeyboardArrowRight className="myiconcolor"/>
                                    {/*<a href="/organizationprofile">User Profile </a>*/}
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
                                                        <label className="control-label">Given Name: &nbsp;</label>
                                                        <label ></label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Email: &nbsp;</label>
                                                        <label ></label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Last Name: &nbsp;</label>
                                                        <label ></label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Birth Date: &nbsp;</label>
                                                        <label ></label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Gender: &nbsp;</label>
                                                        <label ></label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Ethnicity: &nbsp;</label>
                                                        <label ></label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Address 1: &nbsp;</label>
                                                        <label ></label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Address 2: &nbsp;</label>
                                                        <label ></label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">City: &nbsp;</label>
                                                        <label ></label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">State: &nbsp;</label>
                                                        <label ></label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Zip: &nbsp;</label>
                                                        <label ></label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Residence Country: &nbsp;</label>
                                                        <label ></label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Phone: &nbsp;</label>
                                                        <label ></label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Country of Citizenship: &nbsp;</label>
                                                        <label ></label>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="form-actions right">
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
        user_reducer: reducer_state.user_reducer
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({user_profile_fetch: user_profile_fetch}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProfile));