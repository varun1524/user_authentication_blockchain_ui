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
import {BackendCred, BackendCredBody} from "../api/Util"
import {connect} from "react-redux";
import KeyboardArrowRight from "@material-ui/core/es/internal/svg-icons/KeyboardArrowRight";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


const defaultColumnProperties = {
    filterable: true
};

const columns = [
    //{ key: "id", name: "ID"},
    { key: "given_name", name: "Given Name"},
    { key: "last_name", name: "Last Name"},
    { key: "email", name: "Email"},
    { key: "action", name: "Action"}
].map(c => ({ ...c, ...defaultColumnProperties }));

const selectors = Data.Selectors;

let org_id;





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

function Example({ rows, onAction }) {
    const [filters, setFilters] = useState({});
    const filteredRows = getRows(rows, filters);


    function getCellActions(column, row) {
        console.log("getCellActions: ", row,org_id);

        const InOrgNoBlock = {
            action: InOrganizationActions_NoBlock(row)
        };
        const InOrgBlock = {
            action: InOrganizationActions_Block(row)
        };
        const OutOrg = {
            action: OutOrganizationActions(row)
        };
        if(row.organization_id===org_id)
        {
            return InOrgNoBlock[column.key];
        }
        else {
            return OutOrg[column.key];
        }


    }

    const InOrganizationActions_NoBlock = (rowdata) => [
        {
            icon: "glyphicon glyphicon-link",
            actions: [
                {
                    text: "Edit",
                    callback: () => {
                        //alert("Sends to Edit Page: "+JSON.stringify(rowdata));
                        onAction(rowdata.id);
                    }
                },
                {
                    text: "Delete",
                    callback: () => {
                        //alert("Removes from Org: "+JSON.stringify(rowdata));
                    }
                },
                {
                    text: "Add User Info",
                    callback: () => {
                        history.push({pathname:'/addblockdata', state:rowdata});
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
                        console.log("Sends to Edit Page: "+JSON.stringify(rowdata));
                    }
                },
                {
                    text: "Delete",
                    callback: () => {
                        console.log("Removes from Org: "+JSON.stringify(rowdata));
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
                        onAction(rowdata.id);
                        console.log("Adds to Organization: "+JSON.stringify(rowdata)) ;
                    }
                }
            ]
        }
    ];

    // rows=rows;
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

class MyVerticallyCenteredModal extends React.Component {
    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit User Data
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label">User Type</label>
                                <select className="form-control"
                                        onChange={(event) => {
                                            this.setState({
                                                ...this.state,
                                                user_type : event.target.value
                                            })
                                        }}
                                >
                                    <option value="0">----SELECT ONE----</option>
                                    <option value="3">Organization User</option>
                                    <option value="4">Normal User</option>
                                </select>
                                <span id="userTypeErr"/>
                            </div>
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                    <Button onClick={this.props.onHide}>Submit</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}


class UserSearch extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            search_by:"",
            search_value:"",
            rows1: [],
            modalShow: false
        }
    }

    accessRequest = (id) => {
        // data category from database
        let endpoint = 'api/v1/add_user_organization' ;
        let method = 'POST'
        let payload = {
            organization_id : org_id,
            user_id: id,
            user_role : 4
        };
        BackendCredBody(payload, endpoint, method).then((response) => {
            console.log(response)
            if (response.status === 200) {
                response.json().then((data) => {
                    console.log(data);
                    if(data.message==="success") {
                        alert("Action taken successfully");
                        this.handleDataEntry();
                    }
                });

            }
            else {
                console.log("Error: ", response);
                alert("Could not take the action");
            }
        });
    }

    handleDataEntry = (() => {
        console.log('1',this.state.search_by);
        console.log('2',this.state.search_value);
        console.log('3', this.state);

        if(!this.state.search_value){
            window.alert("Please enter search criteria")
        }

        let search_by = this.state.search_by
        let payload = {}
        //payload[search_by] = this.state.given_name;
        let endpoint = 'api/v1/get_user_info?'+ search_by + '=' + this.state.search_value
        let method = 'GET'
        BackendCred(payload, endpoint, method).then((response) => {
            console.log(response.status);
            if (response.status === 200) {
                response.json().then((data) => {
                    console.log(JSON.parse(data.data));
                    let rcvd_data = JSON.parse(data.data);
                    let rows = [];
                    for (var i = 0; i < rcvd_data.user_info.length; i++){
                        var obj = rcvd_data.user_info[i];
                        var data_to_be_added = {
                            id : obj['id'],
                            given_name : obj['given_name'],
                            last_name : obj['last_name'],
                            email : obj['email'],
                            organization_id : obj['organization_id']
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
        let modalClose = () => this.setState({ modalShow: false });
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
                                    <a onClick={()=>{this.props.history.push("/dashboard")}}>Home </a>
                                    <KeyboardArrowRight className="myiconcolor"/>
                                    <a>User</a>
                                    <KeyboardArrowRight className="myiconcolor"/>
                                    <a onClick={()=>{this.props.history.push("/usersearch")}}>User Search </a>
                                </li>
                            </ul>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="portlet box blue">
                                    <div className="portlet-title">
                                        <div className="caption">Search User</div>

                                        <a className="btn btn-info myaddnewbutton" onClick={()=>{this.props.history.push("/addnewuser")}}>Add New</a>
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


                                            {/*<div className="form-actions right">
                                                <button type="button" className="btn btn-primary" onClick={() => {
                                                    this.handleDataEntry()
                                                }}>Search
                                                </button>
                                                &nbsp;

                                            </div>
                                            */}
                                            <div className="row">
                                                <h3 className="form-section">Search Results
                                                </h3>


                                                <MyVerticallyCenteredModal
                                                    show={this.state.modalShow}
                                                    onHide={modalClose}
                                                />
                                                <Example className="table-responsive" rows={this.state.rows1} onAction={this.accessRequest}/>
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
    org_id=reducer_state.user_reducer.organization_id;
    return {
        user: reducer_state.user_reducer

    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({user_addiiton_success: user_addiiton_success}, dispatch)
}

export default withRouter(connect(mapStateToProps, null)(UserSearch));