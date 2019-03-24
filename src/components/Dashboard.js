import React, { Component } from 'react';
import Logo from './../assets/images/logo-default.png';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIgloo } from '@fortawesome/free-solid-svg-icons';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {login_success} from "../actions/login";


library.add(faIgloo);

class Dashboard extends Component {

    render() {
        return (
            <div className="custom-sidebar-body csbcolor">
                <div className="page-header navbar navbar-fixed-top">
                    <div className="page-header-inner">
                        <div className="page-logo">
                            <img src={Logo} className="sidebar-logo"/>
                        </div>
                        <div className="page-top">
                            <ul className="nav navbar-nav pull-right">
                                <li className="dropdown dropdown-user">
                                    <a href="javascript:;" className="dropdown-toggle" data-toggle="dropdown"
                                       data-hover="dropdown" data-close-others="true">
                                        <img alt="" className="img-circle"
                                             src={Logo} />
                                        <span className="username username-hide-on-mobile"> Adam </span>

                                    </a>
                                </li>

                            </ul>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
