import React, { Component } from 'react';
import Logo from './../assets/images/logo-default.png';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem ,Dropdown} from 'reactstrap';
import angdown from 'react-icons/lib/fa/angle-down'




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
        window.alert("Logging out")
        this.props.history.push("/")
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
                                    <li className="mydropdown-content"><a href="" onClick={()=>this.doLogout()}>Logout</a></li>

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
    console.log("--Reducer state-----", reducer_state.user.data)
    return {
        user: reducer_state.user
    };
}

export default withRouter(connect(mapStateToProps)(TopMenu));