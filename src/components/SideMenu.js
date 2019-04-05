import React, { Component } from 'react';
import MetisMenu from 'react-metismenu';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";


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
                label: 'Add New User',
                to: '/addnewuser',
            },
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
                label: 'Add New Branch',
                to: '/addnewbranch',
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

class Menu extends Component {
    render() {
        console.log("current user data")
        console.log(this.props.user.data)
        //let curr_type = this.props.user.data.user_type
        let menu = organization_content

        return (<MetisMenu content={menu} activeLinkFromLocation />);
    }
}

function mapStateToProps(reducer_state) {
    console.log("--Reducer state-----", reducer_state.user.data)
    return {
        user: reducer_state.user
    };
}

export default withRouter(connect(mapStateToProps)(Menu));