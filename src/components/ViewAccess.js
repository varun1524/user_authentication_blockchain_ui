import React, { Component, useState} from 'react';
import Menu from './SideMenu'
import TopMenu from './TopMenu'
import {Link, withRouter} from 'react-router-dom';
import {doCreateBranch} from "../api/orgAPI";
import {bindActionCreators} from "redux";
import {branch_addiiton_success} from "../actions/organization_admin";
import {CountryDropdown, RegionDropdown} from "react-country-region-selector";
import {Home} from "@material-ui/icons";
import ReactDataGrid from "react-data-grid";
import {Toolbar,Data} from "react-data-grid-addons";
import KeyboardArrowRight from "@material-ui/core/es/internal/svg-icons/KeyboardArrowRight";
import {BackendGetWithoutSession} from "../api/Util";


const rows = [
    { id: 0, title: "Task 1", complete: 20, status:"Accepted", flagbit:1 },
    { id: 1, title: "Task 2", complete: 40, flagbit:0 },
    { id: 2, title: "Task 3", complete: 60,status:"Accepted" , flagbit:1 }
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

const ViewAction = (rowdata) => [
    {
        icon: "glyphicon glyphicon-link",
        actions: [
            {
                text: "View Data",
                callback: () => {
                    alert("View Data: "+JSON.stringify(rowdata));
                }
            }
        ]
    }
];
function getCellActions(column, row) {
    const View = {
        action: ViewAction(row)
    };
    return View[column.key];


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


class ViewAccess extends Component {

    constructor() {
        super();
        this.state = {
            address_line_1 : "",
            address_line_2 : "",
            city : "",
            state : "",
            zip: "",
            country : "",
            phone : ""
        }
    }

    componentWillMount() {
        let endpoint='api/v1/get_all_request_status';
        let method='GET';
        BackendGetWithoutSession(endpoint,method).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    if(data.message==="success") {
                        console.log("Fetched my requests");
                        console.log("[Get All request status]: ", JSON.parse(data.data));
                        var obj = JSON.parse(data.data);
                        console.log(obj)
                    }
                    else {
                        console.log("Error in fetching block type", response)
                    }
                });

            }
            else {
                console.log("Error: ", response);
            }
        });
    }

    handleDataEntry = (() => {
        console.log('1',this.state.email);
        console.log('2',this.state.password);
        console.log('3', this.state);
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


        if(!this.state.given_name){
            document.getElementById('givenNameErr').innerHTML = 'First name is required';
        }

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
                // alert("Error while Signing In");
            }
        });
    });



    render() {

        console.log("[view access] render method");
        return (
            <div>
                <TopMenu/>
                <div className="">
                    <Menu/>
                </div>
                <div className="page-content-wrapper">
                    <div className="page-content top-side-padding">
                        <h1 className="page-title">View Access</h1>
                        <div className="page-bar">
                            <ul className="page-breadcrumb">
                                <li>
                                    <Home className="myiconcolor"/>
                                    <a href="/page1">Home </a>
                                    <KeyboardArrowRight className="myiconcolor"/>
                                    <a href="/viewaccess">View Access</a>
                                </li>
                            </ul>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="portlet box blue">
                                    <div className="portlet-title">
                                        <div className="caption">Accepted Requests</div>
                                    </div>
                                    <div className="portlet-body form">
                                        <div className="form-body">

                                            <div className="row">
                                                <Table className="table-responsive" rows={rows} />

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

export default withRouter(ViewAccess);