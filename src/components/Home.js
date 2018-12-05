import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {insert_dbdata_success} from "../actions/insertData";

class Home extends Component {

    constructor() {
        super();
    }

    componentDidMount(){
        console.log("HomePage: ", this.props.userDbData);
    }

    render() {

        return (
            <div className="home">
                <h1>Welcome {this.props.userDbData.given_name} {this.props.userDbData.last_name}</h1>
            </div>
        );
    }
}

function mapStateToProps(reducer_state) {
    return {
        userDbData: reducer_state.userDbData
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({insert_dbdata_success: insert_dbdata_success}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));