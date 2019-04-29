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
    { key: "name", name: "Name"},
    { key: "req_type", name:"Requestor"},
    { key: "category", name: "Data Type"},
    { key: "action", name: "Action"}
].map(c => ({ ...c, ...defaultColumnProperties }));

function accessRequest(id, end_point){
    // alert("Requests all the data: "+JSON.stringify(rowdata));
    // data category from database
    let endpoint = 'api/v1/' + end_point ;
    let method = 'POST'
    let payload = {
        "request_id":id
    };
    BackendCredBody(payload, endpoint, method).then((response) => {
        console.log(response)
        if (response.status === 200) {
            response.json().then((data) => {
                console.log(data);
                if(data.message==="success") {
                    alert("Action taken successfully")
                    window.location.reload();
                }
            });

        }
        else {
            console.log("Error: ", response);
            alert("Could not take the action");
        }
    });
}

const Actions = (rowdata) => [
    {
        icon: "glyphicon glyphicon-link",
        actions: [
            {
                text: "Accept",
                callback: () => {
                    console.log("Accept Request: "+JSON.stringify(rowdata));
                    accessRequest(rowdata.id, "approve_data_request");
                }
            },
            {
                text: "Reject",
                callback: () => {
                    console.log("Reject Request: "+JSON.stringify(rowdata));
                    accessRequest(rowdata.id, "deny_data_request")
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
            rows1 :[]
        }
    }

    componentWillMount() {
        let endpoint = 'api/v1/get_all_data_request';
        let method = 'GET'
        let payload = {}
        BackendCred(payload, endpoint, method).then((response) => {
            console.log(response.status);
            console.log(response.data);
            if (response.status === 200) {
                response.json().then((data) => {
                    if(data.message==="success") {
                        console.log("[AccessRequest]Request fetched successfully")
                        console.log("[AccessRequest]ComponentWillMount ", JSON.parse(data.data))
                        let rcvd_data = JSON.parse(data.data);
                        console.log("rcvd_data : ", rcvd_data)
                        let rows = [];
                        for (var i = 0; i < rcvd_data.length; i++){
                            var obj = rcvd_data[i];
                            var per_type = "Employee";
                            if (obj['name'].includes("Organization")){
                                per_type = "Organization"
                            }
                            var data_to_be_added = {
                                id : obj['id'],
                                name : obj['name'].replace('Organization,',''),
                                req_type : per_type,
                                category : obj['category']
                            };
                            rows.push(data_to_be_added);
                        }
                        this.setState({
                            ...this.state,
                            rows1: rows
                        });
                        console.log("[FlagData] : ", rows)
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
                                        <div className="caption">Pending requests</div>
                                    </div>
                                    <div className="portlet-body form">
                                        <div className="form-body">

                                            <div className="row">
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
        organization_user: reducer_state.organization_user
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({branch_addiiton_success: branch_addiiton_success}, dispatch)
}

export default withRouter(AccessRequest);