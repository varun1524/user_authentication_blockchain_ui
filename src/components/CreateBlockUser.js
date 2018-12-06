import React, { Component } from 'react';
import {doLogin} from './../api/authAPI';
import SignUp from './Signup';
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {login_success} from "../actions/login";

class CreateBlockUser extends Component {

    constructor() {
        super();
        this.state = {
            email : "",
            password : "",
            message : "",
            emailColor:""
        }
    }




    render() {
        console.log("[signin] render method");
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

        return (
            <div className="page-content">


                <h1 className="page-title"> Add Employment Data

                </h1>
                <div className="page-bar">
                    <ul className="page-breadcrumb">
                        <li>
                            <i className="icon-home"></i>
                            <a href="index-2.html">Home</a>
                            <i className="fa fa-angle-right"></i>
                        </li>
                        <li>
                            <span>Users</span>
                            <i className="fa fa-angle-right"></i>
                        </li>
                        <li>
                            <span>New</span>
                        </li>
                    </ul>

                </div>

                <div className="row">
                    <div className="col-md-12">

                        <div className="tab-pane" id="tab_1">
                            <div className="portlet box blue">
                                <div className="portlet-title">
                                    <div className="caption">
                                        <i className="fa fa-gift"></i>Create New User
                                    </div>

                                </div>
                                <div className="portlet-body form">

                                    <form action="#" className="horizontal-form">
                                        <div className="form-body">
                                            <h3 className="form-section">Experience Info</h3>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Role</label>
                                                        <input type="text" id="Role" className="form-control"
                                                               placeholder="Enter Role"></input>

                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Company</label>
                                                        <input type="text" id="company" className="form-control"
                                                               placeholder="Enter company name"></input>

                                                    </div>
                                                </div>

                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Duration</label>
                                                        <input type="text" className="form-control"
                                                               placeholder="Enter years and months"></input></div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Technologies</label>
                                                        <input type="text" className="form-control"
                                                               placeholder="Enter technologies"></input></div>
                                                </div>

                                            </div>

                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label className="control-label">Highlights</label>
                                                        <textarea rows="5" type="text" id="highlights" className="form-control"
                                                                  placeholder="Enter achievements and responsibilities"></textarea>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-actions right">
                                            <button type="button" className="btn default">Cancel</button>
                                            <button type="submit" className="btn blue" onClick={(()=>{this.redirectPage("/UserProfile")})}>
                                                <i className="fa fa-check"></i> Save
                                            </button>
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
        user: reducer_state.user
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({login_success: login_success}, dispatch)
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateBlockUser));