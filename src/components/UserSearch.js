import React, {Component, useState} from 'react';
import Menu from './SideMenu'
import TopMenu from './TopMenu'
import {Link, withRouter} from 'react-router-dom';
import {doCreateUser} from "../api/orgAPI";
import {bindActionCreators} from "redux";
import {user_addiiton_success} from "../actions/orgnization_user";
import HomeIcon from "@material-ui/icons/Home"
import ReactDataGrid from "react-data-grid";
import {Toolbar,Data} from "react-data-grid-addons";

const defaultColumnProperties = {
    filterable: true
};

const columns = [
    { key: "id", name: "ID"},
    { key: "title", name: "Name"},
    { key: "complete", name: "Organization"},
    { key: "action", name: "Action"}
].map(c => ({ ...c, ...defaultColumnProperties }));

const selectors = Data.Selectors;

const rows = [
    { id: 0, title: "Task 1", complete: 20},
    { id: 1, title: "Task 2", complete: 40 , inorg:'Y' },
    { id: 2, title: "Task 3", complete: 60 },
    { id: 3, title: "Task 1", complete: 20 },
    { id: 4, title: "Task 2", complete: 40 },
    { id: 5, title: "Task 3", complete: 60 }
];

const InOrganizationActions_NoBlock = (rowdata) => [
    {
        icon: "glyphicon glyphicon-link",
        actions: [
            {
                text: "Edit",
                callback: () => {
                    alert("Sends to Edit Page: "+JSON.stringify(rowdata));
                }
            },
            {
                text: "Delete",
                callback: () => {
                    alert("Removes from Org: "+JSON.stringify(rowdata));
                }
            },
            {
                text: "Add Block Data",
                callback: () => {
                    alert("Redirect to Add Block: "+JSON.stringify(rowdata));
                    this.props.handlePageChange("/addblockdata");   

                }
            }
        ]
    }
];

const InOrganizationActions_Block = (rowdata) => [
    {
        icon: "glyphicon glyphicon-link",
        actions: [
            {
                text: "Edit",
                callback: () => {
                    alert("Sends to Edit Page: "+JSON.stringify(rowdata));
                }
            },
            {
                text: "Delete",
                callback: () => {
                    alert("Removes from Org: "+JSON.stringify(rowdata));
                }
            }
        ]
    }
];

const OutOrganizationActions= (rowdata) => [
    {
        icon: "glyphicon glyphicon-link",
        actions: [
            {
                text: "Add to Organization",
                callback: () => {
                    alert("Adds to Organization: "+JSON.stringify(rowdata)) ;
                }
            }
        ]
    }
];

function getCellActions(column, row) {
    const InOrgNoBlock = {
        action: InOrganizationActions_NoBlock(row)
    };
    const InOrgBlock = {
        action: InOrganizationActions_Block(row)
    };
    const OutOrg = {
        action: OutOrganizationActions(row)
    };

    if(row.complete===20)
    {
        return InOrgNoBlock[column.key];
    }
    else if(row.title==="Task 3")
    {
        return InOrgBlock[column.key];
    }
    else {
        return OutOrg[column.key];
    }


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

function Example({ rows }) {
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


class UserSearch extends Component {
    constructor() {
        super();
        this.state = {
            search_by:"",
            search_value:""
        }
    }

    handleDataEntry = (() => {
        // showAlert("SHowed Successful", "info", this);
        // document.getElementById('emailErr').innerHTML = '';
        console.log('1',this.state.search_by);
        console.log('2',this.state.search_value);
        console.log('3', this.state);

        if(!this.state.search_value){
            window.alert("Please enter search criteria")
        }

        let search_by = this.state.search_by
        let payload = {}
        payload[search_by] = this.state.given_name;

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
                                                <div className="col-md-6">
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
                                            </div>


                                            <div className="form-actions right">
                                                <button type="button" className="btn default">Cancel</button>&nbsp;
                                                <button type="button" className="btn btn-primary" onClick={()=>{this.handleDataEntry()}}>Get List</button>&nbsp;

                                            </div>
                                            <div className="row">
                                                <h3 className="form-section">Search Results
                                                </h3>

                                                <Example className="table-responsive" rows={rows} />
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