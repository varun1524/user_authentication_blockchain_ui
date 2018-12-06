import React, { Component } from 'react';
import {doLogin} from './../api/authAPI';
import SignUp from './Signup';
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {login_success} from "../actions/login";

class ViewBlock extends Component {

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
            <div class="page-content">


                <h1 class="page-title"> View My Record

                </h1>
                <div class="page-bar">
                    <ul class="page-breadcrumb">
                        <li>
                            <i class="icon-home"></i>
                            <a href="index-2.html">Home</a>
                            <i class="fa fa-angle-right"></i>
                        </li>
                        <li>
                            <span>View My Record</span>

                        </li>

                    </ul>

                </div>

                <div class="row">
                    <div class="col-md-12">

                        <div class="tab-pane" id="tab_3">
                            <div class="portlet box blue">
                                <div class="portlet-title">
                                    <div class="caption">
                                        <i class="fa fa-gift"></i>My Record</div>

                                </div>
                                <div class="portlet-body form">

                                    <form class="form-horizontal" role="form">
                                        <div class="form-body">

                                            <h3 class="form-section">Experience</h3>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="control-label col-md-3">Role:</label>
                                                        <div class="col-md-9">
                                                            <p class="form-control-static"> Software Engineer </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="control-label col-md-3">Company:</label>
                                                        <div class="col-md-9">
                                                            <p class="form-control-static"> Facebook </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="control-label col-md-3">Duration:</label>
                                                        <div class="col-md-9">
                                                            <p class="form-control-static"> July 2017 - July 2018 </p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                            <div class="row mystyle">
                                                <div class="col-md-12" >
                                                    <div class="form-group">
                                                        <label class="control-label col-md-3">Technologies:</label>
                                                        <div class="col-md-9">
                                                            <p class="form-control-static"> HTML, CSS, JavaScript, Bootstrap, ASP.NET Core 2.0, SQL Server, Microsoft TFS </p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                            <div class="row mystyle1">
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label class="control-label col-md-3">Highlights:</label>
                                                        <div class="col-md-9">
                                                            <p class="form-control-static"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Worked on Product Support Engineering Data Center Upgrade Project having 5000 active users which manages the product related <br></br>
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;knowledge base and their business processes</p><br></br>
                                                            <p class="form-control-static"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Optimized performance which became helpful in decreasing overall usage time by 2x for the field service engineers</p>
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
                                                                <i class="fa fa-pencil"></i> Flag this data</button>
                                                            <button type="button" class="btn default">Cancel</button>
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
        user: reducer_state.user
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({login_success: login_success}, dispatch)
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewBlock));