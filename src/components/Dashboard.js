import React, { Component } from 'react';
import Menu from './SideMenu'
import TopMenu from './TopMenu'
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {login_success} from "../actions/login";


class Dashboard extends Component {

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
