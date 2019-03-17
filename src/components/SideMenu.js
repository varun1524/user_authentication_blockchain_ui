import React, { Component } from 'react';
import MetisMenu from 'react-metismenu';


const content=[
    {
        icon: 'icon-class-name',
        label: 'Label of Item',
        to: '/page1',
    },
    {
        icon: 'icon-class-name',
        label: 'Go to page2',
        to: '/page2',
    },
    {
        icon: 'icon-class-name',
        label: 'Second Item',
        content: [
            {
                icon: 'icon-class-name',
                label: 'Sub Menu of Second Item',
                to: '#another-link',
            },
        ],
    },
];

export default class Menu extends Component {
    render() {
        return (<MetisMenu content={content} activeLinkFromLocation />);
    }
}
