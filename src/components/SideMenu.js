import React, { Component } from 'react';
import MetisMenu from 'react-metismenu';


const content=[
    {
        id:1,
        icon: 'home',
        label: 'Dashboard',
        to: '/page1',
    },
    {
        id:2,
        icon: '',
        label: 'User',
        content: [
            {
                parentId:2,
                icon: 'icon-class-name',
                label: 'New User',
                to: '/page2',
            },
        ],
    },
];

export default class Menu extends Component {
    render() {
        return (<MetisMenu content={content} activeLinkFromLocation />);
    }
}
