import React, {Component, useState} from 'react';
import Menu from './SideMenu'
import TopMenu from './TopMenu'
import {Link, withRouter, Route} from 'react-router-dom';
import {doCreateUser} from "../api/orgAPI";
import {bindActionCreators} from "redux";
import {user_addiiton_success} from "../actions/orgnization_user";
import HomeIcon from "@material-ui/icons/Home"
import ReactDataGrid from "react-data-grid";
import {Toolbar,Data} from "react-data-grid-addons";
import history from '../history';
import KeyboardArrowRight from "@material-ui/core/es/internal/svg-icons/KeyboardArrowRight";
import {BackendCred, BackendCredBody} from "../api/Util";
import {connect} from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


const defaultColumnProperties = {
    filterable: true
};

const columns = [
    { key: "given_name", name: "Given Name"},
    { key: "last_name", name: "Last Name"},
    { key: "email", name: "Email"},
    { key: "action", name: "Action"}
].map(c => ({ ...c, ...defaultColumnProperties }));

const selectors = Data.Selectors;

const rows = [
    { id: 0, title: "Task 1", complete: 20, flagbit:1},
    { id: 1, title: "Task 2", complete: 40 ,flagbit:0 },
    { id: 2, title: "Task 3", complete: 60, flagbit:1 },
    { id: 3, title: "Task 1", complete: 20, flagbit:1 },
    { id: 4, title: "Task 2", complete: 40, flagbit:0 },
    { id: 5, title: "Task 3", complete: 60, flagbit:1 }
];

var record_types = {}

function accessRequest(id, record_type){
    // alert("Requests all the data: "+JSON.stringify(rowdata));
    // data category from database
    let endpoint = 'api/v1/request_user_records';
    let method = 'POST'
    let payload = {
        "for_id":id,
        "data_category": record_types[record_type]
    };
    BackendCredBody(payload, endpoint, method).then((response) => {
        if (response.status === 200) {
            response.json().then((data) => {
                if(data.message==="success") {
                    alert("Access requested successfully")
                }
            });

        }
        else {
            console.log("Error: ", response);
            alert("Could not request the access");
        }
    });
}

const RequestActions = (rowdata) => [
    {
        icon: "glyphicon glyphicon-link",
        actions: [
            {
                text: "Request Educational history",
                callback: () => {
                    accessRequest(rowdata.id, "educational")
                }

            },
            {
                text: "Request Employment history",
                callback: () => {
                    accessRequest(rowdata.id, "employment")                }
            },
            {
                text: "Request Drug test history",
                callback: () => {
                    accessRequest(rowdata.id, "medical")                }
            },
            {
                text: "Request Driving history",
                callback: () => {
                    accessRequest(rowdata.id, "driving")                }
            },
            {
                text: "Request Criminal history",
                callback: () => {
                    accessRequest(rowdata.id, "criminal")                }
            },
            {
                text: "Request Housing history",
                callback: () => {
                    accessRequest(rowdata.id, "residential")                }
            },
            {
                text: "Add User Info",
                callback: () => {
                    alert("Redirect to Add Block: "+JSON.stringify(rowdata));
                    //this.props.handlePageChange("/addblockdata");
                    history.push({pathname:'/addblockdata', state:JSON.stringify(rowdata)});
                    alert("after")
                }
            }
        ]
    }
];

const RequestAction = (rowdata) => [
    {
        icon: "glyphicon glyphicon-link",
        actions: [
            {
                text: "Request",
                callback: () => {
                    alert("Flag's Data: "+JSON.stringify(rowdata));
                }
            }
        ]
    }
];
const CancelAction = (rowdata) => [
    {
        icon: "glyphicon glyphicon-link",
        actions: [
            {
                text: "Cancel",
                callback: () => {
                    alert("Cancel Request: "+JSON.stringify(rowdata));
                }
            }
        ]
    }
];

function getCellActions(column, row) {
    const Request = {
        action: RequestActions(row)
    };
    return Request[column.key];

}

const handleFilterChange = filter => filters => {
    const newFilters = { ...filters };
    if (filter.filterTerm) {
        newFilters[filter.column.key] = filter;
    } else {
        delete newFilters[filter.column.key];
    }
    return newFilters;
};

function getRows(rows, filters) {
    return selectors.getRows({ rows, filters });
}

function Table({ rows }) {
    const [filters, setFilters] = useState({});
    const filteredRows = getRows(rows, filters);
    return (
        <ReactDataGrid
            columns={columns}
            rowGetter={i => filteredRows[i]}
            rowsCount={filteredRows.length}
            toolbar={<Toolbar enableFilter={true} />}
            onAddFilter={filter => setFilters(handleFilterChange(filter))}
            onClearFilters={() => setFilters({})}
            enableCellSelect={true}
            getCellActions={getCellActions}
        />
    );
}


class RequestDataAccess extends Component {
    constructor() {
        super();
        this.state = {
            search_by:"",
            search_value:"",
            rows1: []
        }
    }

    componentWillMount() {
        record_types = this.props.record_types;
    }

    handleDataEntry = (() => {
        // showAlert("SHowed Successful", "info", this);
        // document.getElementById('emailErr').innerHTML = '';

        if(!this.state.search_value){
            window.alert("Please enter search criteria")
        }

        let search_by = this.state.search_by
        let payload = {}
        //payload[search_by] = this.state.given_name;
        let endpoint = 'api/v1/get_user_info?'+ search_by + '=' + this.state.search_value
        let method = 'GET'
        BackendCred(payload, endpoint, method).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    console.log(JSON.parse(data.data));
                    let rcvd_data = JSON.parse(data.data);
                    let rows = [];
                    for (var i = 0; i < rcvd_data.user_info.length; i++){
                        var obj = rcvd_data.user_info[i];
                        var data_to_be_added = {
                            "id" : obj['id'],
                            "given_name" : obj['given_name'],
                            "last_name" : obj['last_name'],
                            "email" : obj['email'],
                            "organization_id" : obj['organization_id']
                        };
                        rows.push(data_to_be_added);
                    }
                    this.setState({
                        ...this.state,
                        rows1: rows
                    });

                    console.log("++++++++++++  rows  ++++++++++++++++++", rows)
                    // rows=JSON.parse(data.data);
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
                        <h1 className="page-title">Request Data Access</h1>
                        <div className="page-bar">
                            <ul className="page-breadcrumb">
                                <li>
                                    <HomeIcon className="myiconcolor"/>
                                    <a href="/page1">Home </a>
                                    <KeyboardArrowRight className="myiconcolor"/>
                                    <a href="/requestdataaccess">Request Data Access</a>
                                </li>
                            </ul>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="portlet box blue">
                                    <div className="portlet-title">
                                        <div className="caption">Search User</div>
                                    </div>
                                    <div className="portlet-body form">
                                        <div className="form-body">

                                            <div className="row">
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label className="control-label">Search By</label>
                                                        <select className="form-control"
                                                                onChange={(event) => {
                                                                    this.setState({
                                                                        ...this.state,
                                                                        search_by : event.target.value
                                                                    })
                                                                }}
                                                        >
                                                            <option value="">---Select One---</option>
                                                            <option value="given_name">Given Name</option>
                                                            <option value="last_name">Last Name</option>
                                                            <option value="email">Email id</option>
                                                            <option value="zip">Zip</option>
                                                            <option value="city">City</option>
                                                            <option value="phone">Phone</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label className="control-label">Parameter</label>
                                                        <input type="text" id="firstName" className="form-control" placeholder="Parameter"
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       ...this.state,
                                                                       search_value : event.target.value
                                                                   })
                                                               }}
                                                        />
                                                        <span id="givenNameErr"/>
                                                    </div>
                                                </div>
                                                <div className="col-md-2">
                                                    <button type="button" className="btn btn-primary mytop" onClick={()=>{this.handleDataEntry()}}>Search</button>
                                                </div>
                                            </div>



                                            <div className="row">
                                                <h3 className="form-section">Search Results
                                                </h3>

                                                <Table rows={this.state.rows1} />
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
        record_types : reducer_state.record_type_reducer
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({user_addiiton_success: user_addiiton_success}, dispatch)
}

export default withRouter(connect(mapStateToProps, null)(RequestDataAccess));