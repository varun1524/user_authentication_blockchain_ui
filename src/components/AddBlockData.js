import React, {Component, useState} from 'react';
import Menu from './SideMenu'
import TopMenu from './TopMenu'
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from "redux";
import {user_addiiton_success} from "../actions/orgnization_user";
import KeyboardArrowRight from "@material-ui/core/es/internal/svg-icons/KeyboardArrowRight";
import {Home} from "@material-ui/icons";
import {BackendCredBody, BackendGetWithoutSession} from "../api/Util";
import {connect} from "react-redux";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import {DropdownToggle} from "reactstrap";

class AddBlockData extends Component
{
    constructor() {
        super();
        this.state = {
            role:"",
            company:"",
            start_date:"",
            end_date:"",
            technologies:"",
            highlights:"",
            university : "",
            degree_type : "",
            gpa : "",
            notes : "",
            test_date : "",
            test_type : "",
            tests : "",
            result : "",
            driving_license : "",
            incident_date : "",
            case_type : "",
            case_id : "",
            case_start_date : "",
            case_end_date : "",
            address_line_1 : "",
            address_line_2 : "",
            city : "",
            state : "",
            country : "",
            zip : ""
        }
    }

    componentWillMount() {

    }

    RedirectPage = (newpage) => {
       this.props.handlePageChange(newpage)
    };

    handleDataEntry = ((data_type) => {
        let data = {};
        if (data_type==="employment"){
            data = {
                role:this.state.role,
                company:this.props.user.given_name,
                start_date:this.state.start_date,
                end_date:this.state.end_date,
                technologies:this.state.technologies,
                highlights:this.state.highlights
            };
        }else if(data_type==="educational"){
            data = {
                university:this.props.user.given_name,
                start_date:this.state.start_date,
                end_date:this.state.end_date,
                degree_type: this.state.degree_type,
                gpa:this.state.gpa,
                notes:this.state.notes
            };
        }else if(data_type==="medical") {
            data = {
                test_date: this.state.test_date,
                test_type: this.state.test_type,
                tests: this.state.tests,
                result: this.state.result
            };
        }else if(data_type==="driving") {
            data = {
                driving_license: this.state.driving_license,
                incident_date: this.state.incident_date,
                notes: this.state.notes
            };
        }
        else if(data_type==="criminal") {
            data = {
                case_type : this.state.case_type,
                case_id : this.state.case_id,
                case_start_date : this.state.case_start_date,
                case_end_date : this.state.case_end_date,
                notes: this.state.notes
            };
        }
        else if(data_type==="residential") {
            data = {
                start_date : this.state.start_date,
                address_line_1 : this.state.address_line_1,
                address_line_2 : this.state.address_line_2,
                city : this.state.city,
                state : this.state.state,
                country: this.state.country,
                zip : this.state.zip
            };
        }

        let payload = {
            user_id : this.props.location.state.id,
            block_data : {
                operation_type: 1,
                block_type: this.props.record_types[data_type],
                data: data
            }
        };
        let endpoint='api/v1/add_user_record';
        let method='POST';
        console.log("Sending data to the block : ",payload);
        BackendCredBody(payload,endpoint,method).then((response) => {
            console.log("BackendCredBody: ", response.status);
            if (response.status === 200) {
                response.json().then((data) => {
                    if(data.message==="success") {
                        console.log("Data in add block data",JSON.parse(data.data));
                        window.alert("This data successfully added to the network")
                        // empty all the elements
                        document.getElementById('input_role').value = '';
                        document.getElementById('input_company').value = '';
                        document.getElementById('start_date').value = '';
                        document.getElementById('end_date').value = '';
                        document.getElementById('technology').value = '';
                        document.getElementById('highlights').value = '';
                    }
                    else {
                        window.alert("User data could not be added. It ")
                    }
                });

            }
            else if (response.status === 403) {
                this.setState({
                    ...this.state,
                    message: "Username/Password incorrect. Please try again"

                });
            }
            else {
                console.log("Error: ", response);
                // alert("Error while Signing In");
            }
        });
    });

    render() {
        console.log("[Add Block Data] render method");
        return (
            <div>
                <TopMenu/>
                <div className="">
                    <Menu/>
                </div>
                <div className="page-content-wrapper">
                    <div className="page-content top-side-padding">
                        <h1 className="page-title">Add User Info</h1>
                        <div className="page-bar">
                            <ul className="page-breadcrumb">
                                <li>
                                    <Home className="myiconcolor"/>
                                    <a onClick={()=>{this.RedirectPage("/dashboard")}}>Home </a>
                                    <KeyboardArrowRight className="myiconcolor"/>
                                    <a onClick={()=>{this.RedirectPage("/usersearch")}}>User Search</a>
                                    <KeyboardArrowRight className="myiconcolor"/>
                                    <a onClick={()=>{this.RedirectPage("/addblockdata")}}>Add User Info</a>
                                </li>
                            </ul>
                        </div>


                        <Tabs defaultActiveKey="experience" id="t">
                            <Tab eventKey="experience" title="Experience">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="portlet box blue myportletblue">
                                            <div className="portlet-title">
                                                <div className="caption">Add User Info for Experience</div>
                                            </div>
                                            <div className="portlet-body form">
                                                <div className="form-body">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>Role</label>
                                                                <input type="text" className="form-control"
                                                                       id="input_role"
                                                                       onChange={(event) => {
                                                                           this.setState({
                                                                               ...this.state,
                                                                               role : event.target.value
                                                                           })
                                                                       }}
                                                                /> </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>Company</label>
                                                                <input type="text" className="form-control"
                                                                       value={this.props.user.given_name}
                                                                       id="input_company"
                                                                       onChange={(event) => {
                                                                           this.setState({
                                                                               ...this.state,
                                                                               company : event.target.value
                                                                           })
                                                                       }}
                                                                       disabled
                                                                /> </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>Start Date</label>
                                                                <input type="date" className="form-control"
                                                                       id="start_date"
                                                                       onChange={(event) => {
                                                                           this.setState({
                                                                               ...this.state,
                                                                               start_date : event.target.value
                                                                           })
                                                                       }}
                                                                /> </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>End Date</label>
                                                                <input type="date" className="form-control"
                                                                       id="end_date"
                                                                       onChange={(event) => {
                                                                           this.setState({
                                                                               ...this.state,
                                                                               end_date : event.target.value
                                                                           })
                                                                       }}
                                                                /> </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label>Project/Technology/Skills</label>
                                                                <textarea rows="5" className="form-control" placeholder="Enter type of work, project or skills"
                                                                          id="technology"
                                                                          onChange={(event) => {
                                                                              this.setState({
                                                                                  ...this.state,
                                                                                  technologies : event.target.value
                                                                              })
                                                                          }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label>Highlights</label>
                                                                <textarea rows="5" placeholder="Enter specifics and other information"
                                                                          id="highlights"
                                                                          className="form-control"
                                                                          onChange={(event) => {
                                                                              this.setState({
                                                                                  ...this.state,
                                                                                  highlights: event.target.value
                                                                              })
                                                                          }}
                                                                /><span id="cityErr"/>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-actions right">
                                                        <button type="button" className="btn default">Cancel</button>&nbsp;
                                                        <button type="button" className="btn blue" onClick={()=>{this.handleDataEntry("employment")}}>Submit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="education" title="Education">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="portlet box blue myportletblue">
                                            <div className="portlet-title">
                                                <div className="caption">Add User Info for Education</div>
                                            </div>
                                            <div className="portlet-body form">
                                                <div className="form-body">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>University</label>
                                                                <input type="text" className="form-control"
                                                                       value={this.props.user.given_name}
                                                                       onChange={(event) => {
                                                                           this.setState({
                                                                               ...this.state,
                                                                               university : event.target.value
                                                                           })
                                                                       }}
                                                                       disabled
                                                                /> </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>Start Date</label>
                                                                <input type="date" className="form-control"
                                                                       onChange={(event) => {
                                                                           this.setState({
                                                                               ...this.state,
                                                                               start_date : event.target.value
                                                                           })
                                                                       }}
                                                                /> </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>End Date</label>
                                                                <input type="date" className="form-control"
                                                                       onChange={(event) => {
                                                                           this.setState({
                                                                               ...this.state,
                                                                               end_date : event.target.value
                                                                           })
                                                                       }}
                                                                /> </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>Degree Type</label>
                                                                <input type="text" className="form-control"
                                                                       onChange={(event) => {
                                                                           this.setState({
                                                                               ...this.state,
                                                                               degree_type : event.target.value
                                                                           })
                                                                       }}
                                                                /> </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>GPA</label>
                                                                <input type="text" className="form-control" placeholder="Enter GPA"
                                                                          onChange={(event) => {
                                                                              this.setState({
                                                                                  ...this.state,
                                                                                  gpa : event.target.value
                                                                              })
                                                                          }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label>Notes</label>
                                                                <textarea rows="5" placeholder="Enter Notes"
                                                                          className="form-control"
                                                                          onChange={(event) => {
                                                                              this.setState({
                                                                                  ...this.state,
                                                                                  notes: event.target.value
                                                                              })
                                                                          }}
                                                                /><span id="cityErr"/>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-actions right">
                                                        <button type="button" className="btn default">Cancel</button>&nbsp;
                                                        <button type="button" className="btn blue" onClick={()=>{this.handleDataEntry("educational")}}>Submit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="medical" title="Medical">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="portlet box blue myportletblue">
                                            <div className="portlet-title">
                                                <div className="caption">Add User Info for Drug Test</div>
                                            </div>
                                            <div className="portlet-body form">
                                                <div className="form-body">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>Test Date</label>
                                                                <input type="date" className="form-control"
                                                                       onChange={(event) => {
                                                                           this.setState({
                                                                               ...this.state,
                                                                               test_date : event.target.value
                                                                           })
                                                                       }}
                                                                /> </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>Test Type</label>
                                                                <input type="text" className="form-control"
                                                                       onChange={(event) => {
                                                                           this.setState({
                                                                               ...this.state,
                                                                               test_type : event.target.value
                                                                           })
                                                                       }}
                                                                /> </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>Tests</label>
                                                                <input type="text" className="form-control"
                                                                       onChange={(event) => {
                                                                           this.setState({
                                                                               ...this.state,
                                                                               tests : event.target.value
                                                                           })
                                                                       }}
                                                                /> </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>Result</label>
                                                                <input type="text" className="form-control"
                                                                       onChange={(event) => {
                                                                           this.setState({
                                                                               ...this.state,
                                                                               result : event.target.value
                                                                           })
                                                                       }}
                                                                /> </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-actions right">
                                                        <button type="button" className="btn default">Cancel</button>&nbsp;
                                                        <button type="button" className="btn blue" onClick={()=>{this.handleDataEntry("medical")}}>Submit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="driving" title="Driving">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="portlet box blue myportletblue">
                                            <div className="portlet-title">
                                                <div className="caption">Add User Info for Driving</div>
                                            </div>
                                            <div className="portlet-body form">
                                                <div className="form-body">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>Driving License No</label>
                                                                <input type="text" className="form-control"
                                                                       onChange={(event) => {
                                                                           this.setState({
                                                                               ...this.state,
                                                                               driving_license : event.target.value
                                                                           })
                                                                       }}
                                                                /> </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>Incident Date</label>
                                                                <input type="date" className="form-control"
                                                                       onChange={(event) => {
                                                                           this.setState({
                                                                               ...this.state,
                                                                               incident_date : event.target.value
                                                                           })
                                                                       }}
                                                                /> </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label>Notes</label>
                                                                <textarea rows="5" className="form-control"
                                                                       onChange={(event) => {
                                                                           this.setState({
                                                                               ...this.state,
                                                                               notes : event.target.value
                                                                           })
                                                                       }}
                                                                /> </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-actions right">
                                                        <button type="button" className="btn default">Cancel</button>&nbsp;
                                                        <button type="button" className="btn blue" onClick={()=>{this.handleDataEntry("driving")}}>Submit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="criminal" title="Criminal">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="portlet box blue myportletblue">
                                            <div className="portlet-title">
                                                <div className="caption">Add User Info for Criminal</div>
                                            </div>
                                            <div className="portlet-body form">
                                                <div className="form-body">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>Case Type</label>
                                                                <input type="text" className="form-control"
                                                                       onChange={(event) => {
                                                                           this.setState({
                                                                               ...this.state,
                                                                               case_type : event.target.value
                                                                           })
                                                                       }}
                                                                /> </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>Case ID</label>
                                                                <input type="text" className="form-control"
                                                                       onChange={(event) => {
                                                                           this.setState({
                                                                               ...this.state,
                                                                               case_id : event.target.value
                                                                           })
                                                                       }}
                                                                /> </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>Case Start Date</label>
                                                                <input type="date" className="form-control"
                                                                       onChange={(event) => {
                                                                           this.setState({
                                                                               ...this.state,
                                                                               case_start_date : event.target.value
                                                                           })
                                                                       }}
                                                                /> </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>Case End Date</label>
                                                                <input type="date" className="form-control"
                                                                       onChange={(event) => {
                                                                           this.setState({
                                                                               ...this.state,
                                                                               case_end_date : event.target.value
                                                                           })
                                                                       }}
                                                                /> </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label>Notes</label>
                                                                <textarea rows="5" className="form-control"
                                                                          onChange={(event) => {
                                                                              this.setState({
                                                                                  ...this.state,
                                                                                  notes : event.target.value
                                                                              })
                                                                          }}
                                                                /> </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-actions right">
                                                        <button type="button" className="btn default">Cancel</button>&nbsp;
                                                        <button type="button" className="btn blue" onClick={()=>{this.handleDataEntry("criminal")}}>Submit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="address" title="Address">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="portlet box blue myportletblue">
                                            <div className="portlet-title">
                                                <div className="caption">Add User Info for Address</div>
                                            </div>
                                            <div className="portlet-body form">
                                                <div className="form-body">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>Start Date</label>
                                                                <input type="date" className="form-control"
                                                                       onChange={(event) => {
                                                                           this.setState({
                                                                               ...this.state,
                                                                               start_date : event.target.value
                                                                           })
                                                                       }}
                                                                /> </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>Address Line 1</label>
                                                                <input type="text" className="form-control"
                                                                       onChange={(event) => {
                                                                           this.setState({
                                                                               ...this.state,
                                                                               address_line_1 : event.target.value
                                                                           })
                                                                       }}
                                                                /> </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>Address Line 2</label>
                                                                <input type="text" className="form-control"
                                                                       onChange={(event) => {
                                                                           this.setState({
                                                                               ...this.state,
                                                                               address_line_2 : event.target.value
                                                                           })
                                                                       }}
                                                                /> </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>City</label>
                                                                <input type="text" className="form-control"
                                                                       onChange={(event) => {
                                                                           this.setState({
                                                                               ...this.state,
                                                                               city : event.target.value
                                                                           })
                                                                       }}
                                                                /> </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>State</label>
                                                                <input type="text" className="form-control"
                                                                       onChange={(event) => {
                                                                           this.setState({
                                                                               ...this.state,
                                                                               state : event.target.value
                                                                           })
                                                                       }}
                                                                /> </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>Country</label>
                                                                <input type="text" className="form-control"
                                                                       onChange={(event) => {
                                                                           this.setState({
                                                                               ...this.state,
                                                                               country : event.target.value
                                                                           })
                                                                       }}
                                                                /> </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>Zip</label>
                                                                <input type="text" className="form-control"
                                                                          onChange={(event) => {
                                                                              this.setState({
                                                                                  ...this.state,
                                                                                  zip : event.target.value
                                                                              })
                                                                          }}
                                                                /> </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-actions right">
                                                        <button type="button" className="btn default">Cancel</button>&nbsp;
                                                        <button type="button" className="btn blue" onClick={()=>{this.handleDataEntry("residential")}}>Submit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                        </Tabs>


                    </div>
                </div>
            </div>

        );
    }
}

function mapStateToProps(reducer_state) {
    console.log("Reducer State", reducer_state)
    return {
        user: reducer_state.user_reducer,
        record_types : reducer_state.record_type_reducer
    };
}


export default withRouter(connect(mapStateToProps, null)(AddBlockData));