import React, { Component } from 'react';
import Menu from './SideMenu'
import TopMenu from './TopMenu'
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Home} from "@material-ui/icons";
import {getUserProfile} from "../api/userAPI";
import history from "../history";
import {bindActionCreators} from 'redux';
import {user_profile_fetch} from "../actions/user";


class Dashboard extends Component {

    componentWillMount() {
        let payload = {}
        getUserProfile(payload).then((response) => {
            console.log(response.status);
            if (response.status === 200) {
                response.json().then((data) => {
                    console.log(data);
                    if(data.message==="success") {
                        console.log("data in the dashboard after get_user_info",JSON.parse(data.data));
                        this.props.user_profile_fetch(JSON.parse(data.data));
                    }
                    else {
                        //alert("not logged in")
                        history.push('/')
                    }
                });
            }
            else {
                //alert("not logged in")
                history.push('/')
            }
        });
    }

    handleClick = () => {
        this.props.history.push("/page2")
    }

    render() {
        return (
            <div>
                <TopMenu/>
                <div className="">
                    <Menu/>
                </div>
                <div className="page-content-wrapper">
                    <div className="page-content top-side-padding">
                        <h1 className="page-title">Dashboard</h1>
                        <div className="page-bar">
                            <ul className="page-breadcrumb">
                                <li>
                                    <Home className="myiconcolor"/>
                                    <a href="/dashboard">Home </a>
                                </li>

                            </ul>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="portlet box blue">
                                    <div className="portlet-title">
                                        <div className="caption">Welcome Username here</div>
                                    </div>
                                    <div className="portlet-body form">
                                        <div className="form-body">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Organization: &nbsp;</label>
                                                        <label ></label>
                                                        <span id="nameErr"/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Branch: &nbsp;</label>
                                                        <label ></label>
                                                        <span id="nameErr"/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Role: &nbsp;</label>
                                                        <label ></label>
                                                        <span id="nameErr"/>
                                                    </div>
                                                </div>
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
    console.log("In dashboard")
    console.log("reducer", reducer_state)
    return {
        user: reducer_state.user_reducer
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({user_profile_fetch: user_profile_fetch}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));

