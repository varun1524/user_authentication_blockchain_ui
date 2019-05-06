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
import {BackendCred, BackendGetWithoutSession} from "../api/Util";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {connect} from "react-redux";


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
    { key: "name", name: "Name"},
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

    const ViewAction = (rowdata) => [
        {
            icon: "glyphicon glyphicon-link",
            actions: [
                {
                    text: "View Data",
                    callback: () => {
                        console.log("[Call onAction] View Data: "+JSON.stringify(rowdata));
                        onAction(rowdata.id)
                    }
                }
            ]
        }
    ];
    function getCellActions(column, row) {
        const View = {
            action: ViewAction(row)
        };
        if(row.status === "Approved"){
            return View[column.key];
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
                        User Background Information
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {(this.props.state.employment.length !== 0) ?
                        <div>
                            <h3 className="form-section">Employment</h3>
                            {this.props.state.employment.map(function (item, i) {
                                return (
                                    <div>
                                        <Card>
                                            <Card.Header
                                                as="h2">{item.company}</Card.Header>
                                            <Card.Body>
                                                <Card.Title
                                                    as="h3">{item.role}</Card.Title>
                                                <Card.Text>
                                                    <p>
                                                        <strong>Start Date - End
                                                            Date: </strong> {item.start_date} - {item.end_date}
                                                        <br/>
                                                        <strong>Technologies: </strong>{item.technologies}
                                                        <br/>
                                                        <strong>Highlights: </strong>{item.highlights}
                                                    </p>
                                                </Card.Text>
                                                <Button variant="primary" onClick={()=>{alert(item.block_id)}}>
                                                    Flg this data</Button>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                )
                            })}
                        </div> : ''
                    }

                    {(this.props.state.educational.length !== 0) ?
                        <div>
                            <h3 className="form-section">Education</h3>
                            {this.props.state.educational.map(function (item, i) {
                                return (

                                    <Card>
                                        <Card.Header
                                            as="h2">{item.university}</Card.Header>
                                        <Card.Body>
                                            <Card.Title
                                                as="h3">{item.degree_type}</Card.Title>
                                            <Card.Text>
                                                <p>
                                                    <strong>Start Date - End Date: </strong> {item.start_date} - {item.end_date}
                                                    <br/>
                                                    <strong>GPA: </strong>{item.gpa}
                                                    <br/>
                                                    <strong>Notes: </strong>{item.notes}
                                                </p>
                                            </Card.Text>
                                            <Button variant="primary" onClick={()=>{alert(JSON.stringify(item))}}>
                                                Flag this data</Button>
                                        </Card.Body>
                                    </Card>

                                )
                            })}
                        </div> : ''
                    }

                    {(this.props.state.medical.length !== 0) ?
                        <div>
                            <h3 className="form-section">Medical</h3>
                            {this.props.state.medical.map(function (item, i) {
                                return (
                                    <div>
                                        <Card>

                                            <Card.Body>

                                                <Card.Text>
                                                    <p>
                                                        <strong>Test date: </strong> {item.test_date}
                                                        <br/>
                                                        <strong>Test type: </strong>{item.test_type}
                                                        <br/>
                                                        <strong>Tests: </strong>{item.tests}
                                                        <br/>
                                                        <strong>Result: </strong>{item.result}
                                                    </p>
                                                </Card.Text>
                                                <Button variant="primary" onClick={()=>{alert(JSON.stringify(item))}}>
                                                    Flag this data</Button>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                )
                            })}
                        </div> : ''
                    }
                    {(this.props.state.driving.length !== 0) ?
                        <div>
                            <h3 className="form-section">Driving Records</h3>
                            {this.props.state.driving.map(function (item, i) {
                                return (
                                    <div>
                                        <Card>
                                            <Card.Body>
                                                <Card.Text>
                                                    <p>
                                                        <strong>Driving License: </strong> {item.driving_license}
                                                        <br/>
                                                        <strong>Incident Date: </strong>{item.incident_date}
                                                        <br/>
                                                        <strong>Notes: </strong>{item.notes}
                                                    </p>
                                                </Card.Text>
                                                <Button variant="primary" onClick={()=>{alert(item.block_id)}}>
                                                    Flg this data</Button>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                )
                            })}
                        </div> : ''
                    }
                    {(this.props.state.criminal.length !== 0) ?
                        <div>
                            <h3 className="form-section">Criminal Records</h3>
                            {this.props.state.criminal.map(function (item, i) {
                                return (
                                    <div>
                                        <Card>

                                            <Card.Body>
                                                <Card.Text>
                                                    <p>
                                                        <strong>Case Type: </strong> {item.case_type}
                                                        <br/>
                                                        <strong>Case ID: </strong>{item.case_id}
                                                        <br/>
                                                        <strong>Start Date - End
                                                            Date: </strong> {item.case_start_date} - {item.case_end_date}
                                                        <br/>
                                                        <strong>Notes: </strong>{item.notes}
                                                    </p>
                                                </Card.Text>
                                                <Button variant="primary" onClick={()=>{alert(item.block_id)}}>
                                                    Flg this data</Button>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                )
                            })}
                        </div> : ''
                    }

                    {(this.props.state.residential.length !== 0) ?
                        <div>
                            <h3 className="form-section">Residential History</h3>
                            {this.props.state.residential.map(function (item, i) {
                                return (
                                    <div>
                                        <Card>
                                            <Card.Body>
                                                <Card.Title
                                                    as="h3">{item.country}</Card.Title>
                                                <Card.Text>
                                                    <p>
                                                        <strong>Start Date </strong> {item.start_date}
                                                        <br/>
                                                        <strong>Address Line 1: </strong>{item.address_line_1}
                                                        <br/>
                                                        <strong>Address Line 2: </strong>{item.address_line_2}
                                                        <br/>
                                                        <strong>City: </strong>{item.city}
                                                        <br/>
                                                        <strong>State: </strong>{item.state}
                                                        <br/>
                                                        <strong>Zip: </strong>{item.zip}
                                                    </p>
                                                </Card.Text>
                                                <Button variant="primary" onClick={()=>{alert(item.block_id)}}>
                                                    Flg this data</Button>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                )
                            })}
                        </div> : ''
                    }

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                    <Button onClick={this.props.onHide}>Submit</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}



class ViewAccess extends Component {
    constructor() {
        super();
        this.state = {
            rows1 : [],
            modalShow: false,
            educational: [],
            medical : [],
            employment : [],
            driving : [],
            criminal : [],
            residential : []
        }
    }

    findDataType(record_type_id){
        var jsonData = this.props.record_types;
        for(let i in jsonData){
            var key = i;
            var val = jsonData[i];
            if (val === record_type_id){
                return key;
            }
        }
    }

    fetchdata(id){
        let endpoint = 'api/v1/get_approved_request_data?request_id='+id;
        let method = 'GET'
        let payload = {
        }
        BackendCred(payload, endpoint, method).then((response) => {
            console.log(response.status);
            console.log(response.data);
            if (response.status === 200) {
                response.json().then((data) => {
                    if(data.message==="success") {
                        //alert("User can view inserted block data")
                        console.log("View Approved data", data)
                        let rcvd_data = (data.data.block_data);
                        console.log("rcvd_data : ", rcvd_data)
                        let employment_rows = [];
                        let medical_rows = [];
                        let educational_rows = [];
                        let driving_rows = [];
                        let criminal_rows = [];
                        let residential_rows = [];
                        for (var i = 0; i < rcvd_data.length; i++){
                            var obj = rcvd_data[i];

                            // Create different types of arrays
                            console.log("[FlagData] ", this.findDataType(obj['block_type']))
                            if(this.findDataType(obj['block_type'])==="employment"){
                                let data_to_be_added = {
                                    block_id : obj['block_id'],
                                    company : obj.data['company'],
                                    start_date : obj.data['start_date'],
                                    end_date : obj.data['end_date'],
                                    role : obj.data['role'],
                                    technologies : obj.data['technologies'],
                                    highlights : obj.data['highlights']
                                };
                                employment_rows.push(data_to_be_added);
                            }
                            else if(this.findDataType(obj['block_type'])==="educational"){
                                let data_to_be_added = {
                                    block_id : obj['block_id'],
                                    university: obj.data['university'],
                                    start_date:obj.data['start_date'],
                                    end_date:obj.data['end_date'],
                                    degree_type: obj.data['degree_type'],
                                    gpa:obj.data['gpa'],
                                    notes:obj.data['notes']
                                };
                                educational_rows.push(data_to_be_added);
                            }else if(this.findDataType(obj['block_type'])==="medical"){
                                let data_to_be_added = {
                                    block_id : obj['block_id'],
                                    test_date: obj.data['test_date'],
                                    test_type: obj.data['test_type'],
                                    tests: obj.data['tests'],
                                    result: obj.data['result']
                                };
                                medical_rows.push(data_to_be_added);
                            }else if(this.findDataType(obj['block_type'])==="driving"){
                                let data_to_be_added = {
                                    block_id : obj['block_id'],
                                    driving_license: obj.data['driving_license'],
                                    incident_date: obj.data['incident_date'],
                                    notes: obj.data['notes']
                                };
                                driving_rows.push(data_to_be_added);
                            }else if(this.findDataType(obj['block_type'])==="criminal"){
                                let data_to_be_added = {
                                    block_id : obj['block_id'],
                                    case_type : obj.data['case_type'],
                                    case_id : obj.data['case_id'],
                                    case_start_date : obj.data['case_start_date'],
                                    case_end_date : obj.data['case_end_date'],
                                    notes: obj.data['notes']
                                };
                                criminal_rows.push(data_to_be_added);
                            }else if(this.findDataType(obj['block_type'])==="residential"){
                                let data_to_be_added = {
                                    block_id : obj['block_id'],
                                    start_date : obj.data['start_date'],
                                    address_line_1 : obj.data['address_line_1'],
                                    address_line_2 : obj.data['address_line_2'],
                                    city : obj.data['city'],
                                    state : obj.data['state'],
                                    country: obj.data['country'],
                                    zip : obj.data['zip']
                                };
                                residential_rows.push(data_to_be_added);
                            }

                        }
                        this.setState({
                            ...this.state,
                            employment: employment_rows,
                            educational: educational_rows,
                            medical : medical_rows,
                            driving : driving_rows,
                            criminal : criminal_rows,
                            residential : residential_rows,
                            modalShow: true
                        });
                        console.log("[FlagData] Employment rows: ", employment_rows)
                    }
                });

            }
            else {
                console.log("Error: ", response);
                alert("Could not request the access");
            }
        });
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
                        let rcvd_data = JSON.parse(data.data);
                        console.log("rcvd_data : ", rcvd_data)
                        let rows = [];
                        for (var i = 0; i < rcvd_data.length; i++){
                            var obj = rcvd_data[i];
                            var data_to_be_added = {
                                id : obj['id'],
                                name : obj['name'],
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

    fetchRequestData = ((id) => {
        console.log('[ViewAccess state]', id);
        this.fetchdata(id)
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
                                                <MyVerticallyCenteredModal
                                                    show={this.state.modalShow}
                                                    onHide={modalClose}
                                                    state={this.state}
                                                />
                                                <Table className="table-responsive" rows={this.state.rows1} onAction={this.fetchRequestData}/>

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
    return bindActionCreators({branch_addiiton_success: branch_addiiton_success}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewAccess));