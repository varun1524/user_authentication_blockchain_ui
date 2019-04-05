import React, { Component } from 'react';
import Menu from './SideMenu'
import TopMenu from './TopMenu'
import {Link, withRouter} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {doCreateUser} from "../api/orgAPI";
import {bindActionCreators} from "redux";
import {user_addiiton_success} from "../actions/orgnization_user";
import ReactDataGrid from "react-data-grid";
import HomeIcon from "@material-ui/icons/Home"

const columns = [
    { key: "id", name: "ID", editable: true },
    { key: "title", name: "Title", editable: true },
    { key: "complete", name: "Complete", editable: true }
];

const rows = [
    { id: 0, title: "Task 1", complete: 20 },
    { id: 1, title: "Task 2", complete: 40 },
    { id: 2, title: "Task 3", complete: 60 }
];

class UserSearch extends Component {
    onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        this.setState(state => {
            const rows = state.rows.slice();
            for (let i = fromRow; i <= toRow; i++) {
                rows[i] = { ...rows[i], ...updated };
            }
            return { rows };
        });
    };
    constructor() {
        super();
        this.state = {
            given_name : "",
            last_name : "",
            dob : "",
            email : "",
            user_type: ""
        }
    }

    handleDataEntry = (() => {
        // showAlert("SHowed Successful", "info", this);
        // document.getElementById('emailErr').innerHTML = '';
        console.log('1',this.state.email);
        console.log('2',this.state.password);
        console.log('3', this.state)
        //Validation
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

        // code for validation

        // if(!this.state.given_name){
        //     document.getElementById('emailErr').innerHTML = 'Username is required';
        // }
        // else if (!this.state.password){
        //     document.getElementById('passwordErr').innerText = 'Password is required';
        // }
        // else if(!re.test(this.state.email)){
        //     document.getElementById('emailErr').innerHTML='Email is invalid';
        // }
        // else if (this.state.password.length > 0){
        //     document.getElementById('passwordErr').innerText = '';
        //
        // console.log('inside');

        /*
        * state data
        given_name : "",
        last_name : "",
        dob : "",
        gender : "",
        email : "",
        ethnicity : "",
        line1 : "",
        apt : "",
        city : "",
        st : "",
        country : "",
        zip : "",
        citizen_country : "",
        message : "",
        emailColor:"",
        phone: ""
        *
        * */

        if(!this.state.given_name){
            document.getElementById('givenNameErr').innerHTML = 'First name is required';
        }

        let payload = {
            'given_name' : this.state.given_name,
            'last_name' : this.state.last_name,
            'dob' : this.state.dob,
            'email' : this.state.email,
            'user_type' : this.state.user_type
        };

        doCreateUser(payload).then((response) => {
            console.log(response.status);
            if (response.status === 200) {
                response.json().then((data) => {
                    console.log(data);
                    this.props.user_addiiton_success(data);
                    this.props.history.push("/home");
                });

            }
            else if (response.status === 404) {
                this.setState({
                    ...this.state,
                    message: "User not registered. Please sign up"
                });
            }
            else if (response.status === 401) {
                this.setState({
                    ...this.state,
                    message: "Incorrect Password. Please try again"
                });
            }
            else {
                console.log("Error: ", response);
                // alert("Error while Signing In");
            }
        });
    });

    render() {
        console.log("[UserSearch] render method");
        return (
            <div>
                <TopMenu/>
                <div className="">
                    <Menu/>
                </div>
                <div className="page-content-wrapper">
                    <div className="page-content top-side-padding">
                        <h1 className="page-title">User Search</h1>
                        <div className="page-bar">
                            <ul className="page-breadcrumb">
                                <li>
                                    <HomeIcon className="myiconcolor"/>
                                    <a href="/page1">Home </a>
                                </li>
                            </ul>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="portlet box blue">
                                    <div className="portlet-title">
                                        <div className="caption">Search User</div>
                                        <a className="btn btn-info myaddnewbutton" href="/addnewuser">Add New</a>
                                    </div>
                                    <div className="portlet-body form">
                                        <div className="form-body">

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Search By</label>
                                                        <select className="form-control"
                                                                onChange={(event) => {
                                                                    this.setState({
                                                                        ...this.state,
                                                                        ethnicity : event.target.value
                                                                    })
                                                                }}
                                                        >
                                                            <option value="">---Select One---</option>
                                                            <option value=""></option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Parameter</label>
                                                        <input type="text" id="firstName" className="form-control" placeholder="Parameter"
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       ...this.state,
                                                                       given_name : event.target.value
                                                                   })
                                                               }}
                                                        />
                                                        <span id="givenNameErr"/>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="form-actions right">
                                                <button type="button" className="btn default">Cancel</button>&nbsp;
                                                <button type="button" className="btn btn-primary" onClick={()=>{this.handleDataEntry()}}>Get List</button>&nbsp;

                                            </div>
                                            <div className="row">
                                                <h3 className="form-section">Search Results
                                                </h3>

                                                <ReactDataGrid
                                                    columns={columns}
                                                    rowGetter={i => rows[i]}
                                                    rowsCount={3}
                                                    onGridRowsUpdated={this.onGridRowsUpdated}
                                                    enableCellSelect={true}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

function mapStateToProps(reducer_state) {
    return {
        organization_user: reducer_state.organization_user
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({user_addiiton_success: user_addiiton_success}, dispatch)
}

export default withRouter(UserSearch);