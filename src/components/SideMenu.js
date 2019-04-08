import React, { Component } from 'react';
import MetisMenu from 'react-metismenu';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import RouterLink from 'react-metismenu-router-link';
import history from '../history';
import {getUserProfile} from "../api/userAPI";


const super_admin=[
    {
        icon: '',
        label: 'Dashboard',
        to: '/dashboard',
    },
    {
        icon: '',
        label: 'Flagged Requests',
        to: '/flaggedrequests',
    },
    {
        icon: '',
        label: 'User Search',
        to: '/adminusersearch',
    },

];

const org_admin=[
    {
        icon: 'home',
        label: 'Dashboard',
        to: '/dashboard',
    },
    {
        icon: '',
        label: 'User',
        content: [
            {
                icon: 'icon-class-name',
                label: 'User Search',
                to: '/usersearch',
            }

        ],
    },
    {

        icon: '',
        label: 'Organization',
        content: [
            {
                icon: 'icon-class-name',
                label: 'Branch',
                to: '/organizationbranch',
            },
            {
                icon: 'icon-class-name',
                label: 'Organization Profile',
                to: '/organizationprofile',
            }

        ],
    },
    {

        icon: '',
        label: 'Block Data',
        content: [
            {
                icon: 'icon-class-name',
                label: 'Request',
                to: '/requestdataaccess',
            },
            {
                icon: 'icon-class-name',
                label: 'View',
                to: '/viewaccess',
            }

        ],
    }

];

const org_user=[
    {
        icon: 'home',
        label: 'Dashboard',
        to: '/dashboard',
    },
    {
        icon: '',
        label: 'User',
        content: [
            {
                icon: 'icon-class-name',
                label: 'User Search',
                to: '/usersearch',
            }

        ],
    },
    {

        icon: '',
        label: 'Block Data',
        content: [
            {
                icon: 'icon-class-name',
                label: 'Request',
                to: '/requestdataaccess',
            },
            {
                icon: 'icon-class-name',
                label: 'View',
                to: '/viewaccess',
            }

        ],
    }

];

const user = [
    {
        icon: '',
        label: 'Dashboard',
        to: '/dashboard',
    },
    {
        icon: 'home',
        label: 'View my block data',
        to: '/flagdata',
    },
    {
        icon: '',
        label: 'User Profile',
        to: '/userprofile',
    },
    {

        icon: '',
        label: 'Block Data',
        content: [
            {
                icon: 'icon-class-name',
                label: 'Request',
                to: '/requestdataaccess',
            },
            {
                icon: 'icon-class-name',
                label: 'View',
                to: '/viewaccess',
            }

        ],
    }

];

let menu = org_admin;

class Menu extends Component {
    componentDidMount() {
        function isEmpty(obj) {
            for(var key in obj) {
                if(obj.hasOwnProperty(key))
                    return false;
            }
            return true;
        }
        // CAll get_user_info with user_id=current and then we will know who is logged in
        // check whether we have any logged in data in store or not, if not then redirect to login page
        let obj = this.props.user;
        if(isEmpty(obj)) {
            // Object is empty -> user is not logged in
            // call get_user_info with user="current"
            let payload = {
                "user_id" : "current"
            };
            console.log("-----IN SIDE MENU-----",payload);

            getUserProfile(payload).then((response) => {
                console.log(response.status);
                if (response.status === 200) {
                    response.json().then((data) => {
                        console.log(data);
                        if(data.message==="success") {
                            console.log("data in user profile",JSON.parse(data.data));
                            //this.props.user_profile_fetch(JSON.parse(data.data));
                        }
                        else {
                            alert("User profile could not be fetched. Please try again!")
                        }
                        // this.props.user_profile_fetch(data);
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

        } else {
            // Object is NOT empty
        }
    }

    render() {
        console.log("current user data");
        console.log(this.props.user);
        return (<MetisMenu content={menu} LinkComponent={RouterLink} />);
    }
}

function mapStateToProps(reducer_state) {
    console.log("--Reducer state-----", reducer_state.user.data);
    return {
        user: reducer_state.user
    };
}

export default withRouter(connect(mapStateToProps)(Menu));