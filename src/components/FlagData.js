import React, { Component, useState} from 'react';
import Menu from './SideMenu'
import TopMenu from './TopMenu'
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from "redux";
import {user_profile_fetch} from "../actions/user";
import {Home} from "@material-ui/icons";
import ReactDataGrid from "react-data-grid";
import {Toolbar,Data} from "react-data-grid-addons";
import KeyboardArrowRight from "@material-ui/core/es/internal/svg-icons/KeyboardArrowRight";
import {BackendCred} from "../api/Util";
import {connect} from "react-redux";
import {getUserProfile} from "../api/userAPI";
import history from "../history";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

const static_data = [
    {
        company: "Abc Technologies",
        end_date: "2012-04-27",
        highlights: "This are the highlights",
        role: "Sr Software Engineer",
        start_date: "2015-05-09",
        technologies: "C#, Java, Asp.NET, JavaScript"
    },
    {
        company: "nehaj",
        end_date: "2019-04-27",
        highlights: "acsdcsw",
        role: "intern",
        start_date: "2019-04-05",
        technologies: "asdcds"
    },
    {
        company: "rajb",
        end_date: "2020-06-29",
        highlights: "THE HIGHLIGHTS",
        role: "Software Engineer",
        start_date: "2019-04-05",
        technologies: "Machine Learning"
    }
]



const rows = [
    { id: 0, title: "Task 1", complete: 20, status:"Flagged", flagbit:1 },
    { id: 1, title: "Task 2", complete: 40, flagbit:0 },
    { id: 2, title: "Task 3", complete: 60,status:"Flagged" , flagbit:1 }
];

const defaultColumnProperties = {
    filterable: true
};

const selectors = Data.Selectors;

// const columns = [
//     { key: "id", name: "ID"},
//     { key: "title", name: "Name"},
//     { key: "complete", name: "Organization"},
//     { key: "status", name: "Status"},
//     { key: "action", name: "Action"}
// ].map(c => ({ ...c, ...defaultColumnProperties }));

const columns = [
    { key: "company", name: "Company"},
    { key: "role", name: "Role"},
    { key: "start_date", name: "Start Date"},
    { key: "end_date", name: "End Date"},
    { key: "technologies", name: "Technologies"},
    { key: "highlights", name: "Highlights"},
    { key: "action", name: "Action"}
].map(c => ({ ...c, ...defaultColumnProperties }));

const FlagAction = (rowdata) => [
    {
        icon: "glyphicon glyphicon-link",
        actions: [
            {
                text: "Flag",
                callback: () => {
                    alert("Flag's Data: "+JSON.stringify(rowdata));
                    //Call API to flag the data

                }
            }
        ]
    }
];
const UnflagAction = (rowdata) => [
    {
        icon: "glyphicon glyphicon-link",
        actions: [
            {
                text: "Unflag",
                callback: () => {
                    alert("Unflag Data: "+JSON.stringify(rowdata));
                }
            }
        ]
    }
];

function getCellActions(column, row) {
    const Flag = {
        action: FlagAction(row)
    };
    const Unflag = {
        action: UnflagAction(row)
    };

    if(row.flagbit===0)
    {
        return Flag[column.key];
    }
    else
    {
        return Unflag[column.key];
    }

}

const divStyle={
    overflowY: 'scroll',
    border:'1px solid red',
    width:'500px',
    float: 'left',
    height:'500px',
    position:'relative'
};

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
const ROW_HEIGHT = 200;

const Panel = ({ title, children }) => {
    return (
        <div className="panel ">
            <div className="panel-heading h3 text-grey">Company: {title}</div>
            <div className="panel-body">{children}</div>
        </div>
    );
};

const Contact = ({
                     company,
                     role,
                     start_date,
                     end_date,
                     highlights,
                     technologies
                 }) => {
    return (

            <address>

                <label>Position: &nbsp;</label> {role}
                <br />
                <label>Dates: &nbsp;</label> {start_date} - {end_date}
                <br />
                <label>Highlights: &nbsp;</label>{highlights}
                <br />
                <label>Technologies: &nbsp;</label>{technologies}
            </address>

    );
};

const RowRenderer = ({ row, idx }) => {
    const { company } = row;
    return (
        <Panel title={`${company}`}>
            <Contact {...row} />
        </Panel>
    );
};

function Table({ rows }) {
    const [filters, setFilters] = useState({});
    const filteredRows = getRows(rows, filters);
    return (
        <ReactDataGrid
            columns={columns}
            rowGetter={i => filteredRows[i]}
            rowsCount={filteredRows.length}
            toolbar={<Toolbar enableFilter={true} />}
            rowRenderer={RowRenderer}
            onAddFilter={filter => setFilters(handleFilterChange(filter))}
            onClearFilters={() => setFilters({})}
            getCellActions={getCellActions}
        />
    );
}



class FlagData extends Component {

    constructor() {
        super();
        this.state = {
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

    fetchdata(){
        let endpoint = 'api/v1/get_user_record?user_id='+this.props.user.id;
        let method = 'GET'
        let payload = {}
        BackendCred(payload, endpoint, method).then((response) => {
            console.log(response.status);
            console.log(response.data);
            if (response.status === 200) {
                response.json().then((data) => {
                    if(data.message==="success") {
                        //alert("User can view inserted block data")
                        console.log("View My Data normal user", data)
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
                            residential : residential_rows
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

        // Check whether we have reducer or not
        console.log("[FlagData] reducer object", this.props.user);
        if(!this.props.user.id) {
            // Object is empty -> user is not logged in
            // call get_user_info with user="current"
            let payload = {
                "user_id" : "current"
            };
            console.log("-----IN FLAG DATA-----",payload);
            console.log("User data-->", this.props.user)
            getUserProfile(payload).then((response) => {
                console.log("[FlagData] Profile fetch response : ",response.status);
                if (response.status === 200) {
                    response.json().then((data) => {
                        console.log(data);
                        if(data.message==="success") {
                            console.log("[Flag Data] data in flag data after get_user_info",JSON.parse(data.data));
                            this.props.user_profile_fetch(JSON.parse(data.data));
                            console.log("[FlagData]fetched reducer",this.props.user)
                            console.log("[FlagData] Componentwillmount")
                            this.fetchdata();
                        }
                        else {
                            //alert("not logged in")
                            history.push('/')
                        }
                    });
                }
                else {
                    //alert("not logged in")
                    history.push('/')
                }
            });
        }
        else{
            this.fetchdata()
        }





    }

    render() {
        return (
            <div>
                <TopMenu/>
                <div className="">
                    <Menu/>
                </div>
                <div className="page-content-wrapper">
                    <div className="page-content top-side-padding">
                        <h1 className="page-title">Flag Data</h1>
                        <div className="page-bar">
                            <ul className="page-breadcrumb">
                                <li>
                                    <Home className="myiconcolor"/>
                                    <a href="/page1">Home </a>
                                    <KeyboardArrowRight className="myiconcolor"/>
                                    <a href="/organizationbranch">Flag Data</a>
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

                                                        {(this.state.employment.length !== 0) ?
                                                            <div>
                                                                <h3 className="form-section">Employment</h3>
                                                                {this.state.employment.map(function (item, i) {
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

                                                        {(this.state.educational.length !== 0) ?
                                                            <div>
                                                                <h3 className="form-section">Education</h3>
                                                                {this.state.educational.map(function (item, i) {
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

                                                        {(this.state.medical.length !== 0) ?
                                                            <div>
                                                                <h3 className="form-section">Medical</h3>
                                                                {this.state.medical.map(function (item, i) {
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
                                                        {(this.state.driving.length !== 0) ?
                                                            <div>
                                                                <h3 className="form-section">Driving Records</h3>
                                                                {this.state.driving.map(function (item, i) {
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
                                                        {(this.state.criminal.length !== 0) ?
                                                            <div>
                                                                <h3 className="form-section">Criminal Records</h3>
                                                                {this.state.criminal.map(function (item, i) {
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

                                                        {(this.state.residential.length !== 0) ?
                                                            <div>
                                                                <h3 className="form-section">Residential History</h3>
                                                                {this.state.residential.map(function (item, i) {
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
        user: reducer_state.user_reducer,
        record_types : reducer_state.record_type_reducer
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({user_profile_fetch: user_profile_fetch}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FlagData));