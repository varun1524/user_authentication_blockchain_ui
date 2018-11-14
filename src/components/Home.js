import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {login_success} from "../actions/login";

class Home extends Component {

    constructor() {
        super();
    }

    componentDidMount(){
        console.log("HomePage: ", this.props.user);
    }

    render() {

        return (
            <div className="home">
                <h1>Welcome {this.props.user.first_name} {this.props.user.last_name}</h1>
            </div>
        );
    }
}

function mapStateToProps(reducer_state) {
    return {
        user: reducer_state.user
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({login_success: login_success}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));