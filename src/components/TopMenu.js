import React, { Component } from 'react';
import Logo from './../assets/images/logo-default.png';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem ,Dropdown} from 'reactstrap';
import angdown from 'react-icons/lib/fa/angle-down'
import {BackendCred} from "../api/Util";

class TopMenu extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    doLogout(){
        //session destroy
        let endpoint='api/v1/logout';
        let method='GET';
        let payload = {}
        BackendCred(payload,endpoint,method).then((response) => {
            console.log(response.status);
            if (response.status === 200) {
                response.json().then((data) => {
                    if(data.message==="success") {
                        window.alert("logged out successfully")
                        this.props.history.push("/")
                    }
                    else {
                        window.alert("Cannot logout. Please try again!")
                    }
                });

            }
            else {
                console.log("Error: ", response);
            }
        });
        //window.alert("Logging out")
        // clear all the reducers here
    }

    render() {
        return (
            <div className="custom-sidebar-body csbcolor">
                <div className="page-header navbar navbar-fixed-top">
                    <div className="page-header-inner">
                        <div className="page-logo">
                            <img src={Logo} className="sidebar-logo"/>
                        </div>
                        <div className="page-top">
                            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="nav navbar-nav username-dropdown-button pull-right">
                                <DropdownToggle caret color="info">
                                    {this.props.user.given_name}
                                </DropdownToggle>
                                <DropdownMenu className="mydropdown">
                                    <li className="mydropdown-content"><a onClick={()=>this.doLogout()}>Logout</a></li>

                                </DropdownMenu>
                            </Dropdown>


                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(reducer_state) {
    console.log("--Reducer state-----", reducer_state.user_reducer)
    return {
        user: reducer_state.user_reducer
    };
}

export default withRouter(connect(mapStateToProps)(TopMenu));