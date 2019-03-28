import React, { Component } from 'react';
import MetisMenu from 'react-metismenu';


const content=[
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

export default class Menu extends Component {
    render() {
        return (<MetisMenu content={content} activeLinkFromLocation />);
    }
}
