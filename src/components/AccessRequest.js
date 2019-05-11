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
import {connect} from "react-redux";

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
    { key: "date", name:"Date"},
    { key: "status", name:"Status"},
    { key: "action", name: "Action"}
].map(c => ({ ...c, ...defaultColumnProperties }));


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

function Table({ rows, onAction }) {

    const Actions = (rowdata) => [
        {
            icon: "glyphicon glyphicon-link",
            actions: [
                {
                    text: "Accept",
                    callback: () => {
                        console.log("Accept Request: "+JSON.stringify(rowdata));
                        onAction(rowdata.id, "approve_data_request");
                    }
                },
                {
                    text: "Reject",
                    callback: () => {
                        console.log("Reject Request: "+JSON.stringify(rowdata));
                        onAction(rowdata.id, "deny_data_request")
                    }
                }
            ]
        }
    ];

    function getCellActions(column, row) {
        const Action = {
            action: Actions(row)
        };

        console.log(row.status !== "Approved" && row.status !== "Rejected")
        if(row.status !== "Approved" && row.status !== "Rejected"){
            return Action[column.key];
        }

    }

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

    constructor(...args) {
        super(...args);
        this.state = {
            rows1 :[],
            from_date : '',
            to_date : '',
            data_type : ''
        }
    }

    accessRequest = (id, end_point) => {
        // alert("Requests all the data: "+JSON.stringify(rowdata));
        // data category from database
        let endpoint = 'api/v1/' + end_point ;
        let method = 'POST'
        let payload = {
            "id":id
        };
        BackendCredBody(payload, endpoint, method).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    console.log("[AccessRequest]", data);
                    if(data.message==="success") {
                        alert("Action taken successfully")
                        this.fetchRequests();
                    }
                });
            }
            else {
                console.log("Error: ", response);
                alert("Could not take the action");
            }
        });
    }

    fetchRequests = (() => {
        let endpoint = 'api/v1/get_all_data_request';
        let method = 'GET'
        let payload = {
            from_date : this.state.from_date+' 00:00:00',
            to_date : this.state.to_date+' 00:00:00',
            record_type : this.props.record_types[this.state.data_type]

        }
        BackendCred(payload, endpoint, method).then((response) => {
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
                                date : obj['requested_date'].substring(0,10),
                                status : obj['status'],
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

    });



    render() {
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
                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label className="control-label">Data Type</label>
                                                        <select className="form-control"
                                                                onChange={(event) => {
                                                                    this.setState({
                                                                        ...this.state,
                                                                        data_type : event.target.value
                                                                    })
                                                                }}
                                                        >
                                                            <option value="">---Select One---</option>
                                                            <option value="educational">Educational</option>
                                                            <option value="medical">Medical</option>
                                                            <option value="employment">Employment</option>
                                                            <option value="driving">Driving</option>
                                                            <option value="criminal">Criminal</option>
                                                            <option value="residential">Residential</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label className="control-label">Date Range</label>
                                                        <input type="date" className="form-control" placeholder="mm/dd/yyyy"
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       ...this.state,
                                                                       from_date : event.target.value
                                                                   })
                                                               }}
                                                        />
                                                        <span id="givenNameErr"/>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label className="control-label">Date Range</label>
                                                        <input type="date" className="form-control" placeholder="mm/dd/yyyy"
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       ...this.state,
                                                                       to_date : event.target.value
                                                                   })
                                                               }}
                                                        />
                                                        <span id="givenNameErr"/>
                                                    </div>
                                                </div>

                                                <div className="col-md-3">
                                                    <button type="button" className="btn btn-primary mytop" onClick={()=>{this.fetchRequests()}}>Search</button>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <Table rows={this.state.rows1} onAction={this.accessRequest}/>

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
        record_types : reducer_state.record_type_reducer,
        organization_user: reducer_state.organization_user
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({branch_addiiton_success: branch_addiiton_success}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccessRequest));