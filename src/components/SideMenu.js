import React, { Component } from 'react';
import MetisMenu from 'react-metismenu';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import RouterLink from 'react-metismenu-router-link';

const organization_content=[
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
            // {
            //     parentId:2,
            //     icon: 'icon-class-name',
            //     label: 'New User',
            //     to: '/page2',
            // },

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
];

const normal_user = [
    {
        icon: 'home',
        label: 'User Profile',
        to: '/user_profile',
    },
    {
        icon: 'home',
        label: 'View my block data',
        to: '/user_block_data',
    },
]

let menu = organization_content

class Menu extends Component {
    componentDidMount() {
        // CAll get_user_info with user_id=current and then we will know who is logged in
        // check whether we have any logged in data in store or not, if not then redirect to login page
    }

    render() {
        console.log("current user data")
        console.log(this.props.user)
        return (<MetisMenu content={menu} LinkComponent={RouterLink} />);
    }
}

function mapStateToProps(reducer_state) {
    console.log("--Reducer state-----", reducer_state.user.data)
    return {
        user: reducer_state.user
    };
}

export default withRouter(connect(mapStateToProps)(Menu));