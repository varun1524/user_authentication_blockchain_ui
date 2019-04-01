import React, { Component } from 'react';
import MetisMenu from 'react-metismenu';

const organization_content=[
    {

        icon: 'home',
        label: 'Dashboard',
        to: '/page1',
    },
    {

        icon: '',
        label: 'User',
        content: [
            {
                icon: 'icon-class-name',
                label: 'Add New User',
                to: '/addnewuser',
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

export default class Menu extends Component {
    render() {
        return (<MetisMenu content={organization_content} activeLinkFromLocation />);
    }
}
