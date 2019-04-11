import React, { Component, useState} from 'react';
import Menu from './SideMenu'
import TopMenu from './TopMenu'
import {Link, withRouter} from 'react-router-dom';
import {doCreateBranch} from "../api/orgAPI";
import {bindActionCreators} from "redux";
import {branch_addiiton_success} from "../actions/organization_admin";
import {Home} from "@material-ui/icons";
import ReactDataGrid from "react-data-grid";
import {Toolbar,Data} from "react-data-grid-addons";
import KeyboardArrowRight from "@material-ui/core/es/internal/svg-icons/KeyboardArrowRight";
import {BackendCred, BackendCredBody} from "../api/Util";

const rows = [
    { id: 0, title: "Task 1", complete: 20, status:"Flagged", flagbit:1 },
    { id: 2, title: "Task 3", complete: 60, status:"Flagged" , flagbit:1 }
];

const defaultColumnProperties = {
    filterable: true
};

const selectors = Data.Selectors;

const columns = [
    { key: "id", name: "ID"},
    { key: "title", name: "Name"},
    { key: "complete", name: "Organization"},
    { key: "status", name: "Status"},
    { key: "action", name: "Action"}
].map(c => ({ ...c, ...defaultColumnProperties }));

const Actions = (rowdata) => [
    {
        icon: "glyphicon glyphicon-link",
        actions: [
            {
                text: "Accept",
                callback: () => {
                    console.log("Accept Request: "+JSON.stringify(rowdata));
                }
            },
            {
                text: "Reject",
                callback: () => {
                    console.log("Reject Request: "+JSON.stringify(rowdata));
                }
            }
        ]
    }
];

function getCellActions(column, row) {
    const Action = {
        action: Actions(row)
    };
    return Action[column.key];
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

const ROW_COUNT = 50;

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


class AccessRequest extends Component {

    constructor() {
        super();
        this.state = {

        }
    }

    componentWillMount() {
        let endpoint = 'api/v1/request_user_records';
        let method = 'GET'
        let payload = {}
        BackendCred(payload, endpoint, method).then((response) => {
            console.log(response.status);
            console.log(response.data);
            if (response.status === 200) {
                response.json().then((data) => {
                    if(data.message==="success") {
                        console.log("Request fetched successfully")
                        console.log("ComponentWillMount [AccessRequest]", data)
                    }
                });

            }
            else {
                console.log("Error: ", response);
                console.log("Could not request the access");
            }
        });
    }

    handleDataEntry = (() => {

        let payload = {
            'address_line_1' : this.state.address_line_1,
            'address_line_2' : this.state.address_line_2,
            'city' : this.state.city,
            'state' : this.state.state,
            'country' : this.state.country,
            'zip': this.state.zip,
            'phone': this.state.phone
        };

        doCreateBranch(payload).then((response) => {
            console.log(response.status);
            if (response.status === 200) {
                response.json().then((data) => {
                    console.log(data);
                    alert("Branch details successfully added")
                    this.props.branch_addiiton_success(data);
                    // this.props.history.push("/home");
                });

            }
            else if (response.status === 404) {
                this.setState({
                    ...this.state,
                    message: "Service not found"
                });
            }
            else if (response.status === 401) {
                this.setState({
                    ...this.state,
                    message: "Branch already exists"
                });
            }
            else {
                console.log("Error: ", response);
            }
        });
    });



    render() {

        console.log("[branch] render method");
        return (
            <div>
                <TopMenu/>
                <div className="">
                    <Menu/>
                </div>
                <div className="page-content-wrapper">
                    <div className="page-content top-side-padding">
                        <h1 className="page-title">Access Requests</h1>
                        <div className="page-bar">
                            <ul className="page-breadcrumb">
                                <li>
                                    <Home className="myiconcolor"/>
                                    <a href="/page1">Home </a>
                                    <KeyboardArrowRight className="myiconcolor"/>
                                    <a href="/accessrequest">Access Requests</a>
                                </li>
                            </ul>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="portlet box blue">
                                    <div className="portlet-title">
                                        <div className="caption">Details</div>
                                    </div>
                                    <div className="portlet-body form">
                                        <div className="form-body">

                                            <div className="row">
                                                <Table rows={rows} />

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
    return bindActionCreators({branch_addiiton_success: branch_addiiton_success}, dispatch)
}

export default withRouter(AccessRequest);