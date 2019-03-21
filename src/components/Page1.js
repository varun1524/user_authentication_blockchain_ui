import React, { Component } from 'react';
import Menu from './SideMenu'
import {Link, withRouter} from 'react-router-dom';
import TopMenu from './TopMenu'
import Home from "./Home"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIgloo } from '@fortawesome/free-solid-svg-icons'

library.add(faIgloo)

class Page1 extends Component {
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


                </div>
                    </div>
                </div>

            );
    }
}

export default withRouter(Page1);