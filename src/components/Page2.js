import React, { Component } from 'react';
import Menu from './SideMenu'
import {Link, withRouter} from 'react-router-dom';

class Page2 extends Component {
    render() {
        return (
            <div >
                <div className="col-md-2">
                    <Menu/>
                </div>
                <div className="col-md-10">
                    <h2>This is page 2</h2>
                </div>
            </div>

        );
    }
}

export default withRouter(Page2);