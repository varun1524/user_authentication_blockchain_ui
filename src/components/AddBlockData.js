import React, {Component, useState} from 'react';
import Menu from './SideMenu'
import TopMenu from './TopMenu'
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from "redux";
import {user_addiiton_success} from "../actions/orgnization_user";
import KeyboardArrowRight from "@material-ui/core/es/internal/svg-icons/KeyboardArrowRight";
import {Home} from "@material-ui/icons";
import {BackendCredBody} from "../api/Util";
import {connect} from "react-redux";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

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
            highlights:""
        }
    }

    RedirectPage = (newpage) => {
       this.props.handlePageChange(newpage)
    };

    handleDataEntry = (() => {
        let payload = {
            for_id:this.props.location.state.id,
            data_category:"",
            role:this.state.role,
            company:this.state.company,
            start_date:this.state.start_date,
            end_date:this.state.end_date,
            technologies:this.state.technologies,
            highlights:this.state.highlights
        };

        let endpoint='api/v1/request_user_records';
        let method='POST';

        BackendCredBody(payload,endpoint,method).then((response) => {
            console.log(response.status);
            if (response.status === 200) {
                response.json().then((data) => {
                    if(data.message==="success") {
                        console.log("data in login",JSON.parse(data.data));
                        this.props.login_success(JSON.parse(data.data));
                        this.props.history.push("/dashboard");
                    }
                    else {
                        window.alert("Blockdata could not be added. It ")
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
                        <h1 className="page-title">Add Block Data</h1>
                        /*<h2>Here {this.props.location.state}</h2>*/
                        <div className="page-bar">
                            <ul className="page-breadcrumb">
                                <li>
                                    <Home className="myiconcolor"/>
                                    <a onClick={()=>{this.RedirectPage("/dashboard")}}>Home </a>
                                    <KeyboardArrowRight className="myiconcolor"/>
                                    <a onClick={()=>{this.RedirectPage("/usersearch")}}>User Search</a>
                                    <KeyboardArrowRight className="myiconcolor"/>
                                    <a onClick={()=>{this.RedirectPage("/addblockdata")}}>Add Block Data</a>
                                </li>
                            </ul>
                        </div>


                        <Tabs defaultActiveKey="experience" id="t">
                            <Tab eventKey="experience" title="Experience">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="portlet box blue myportletblue">
                                            <div className="portlet-title">
                                                <div className="caption">Add Block Data for Experience</div>
                                            </div>
                                            <div className="portlet-body form">
                                                <div className="form-body">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>Role</label>
                                                                <input type="text" className="form-control"
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
                                                                       onChange={(event) => {
                                                                           this.setState({
                                                                               ...this.state,
                                                                               company : event.target.value
                                                                           })
                                                                       }}
                                                                /> </div>
                                                        </div>
                                                    </div>
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
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label>Project/Technology/Skills</label>
                                                                <textarea rows="5" className="form-control" placeholder="Enter type of work, project or skills"
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
                                                        <button type="button" className="btn blue" onClick={()=>{this.handleDataEntry()}}>Submit</button>
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
                                                <div className="caption">Add Block Data for Education</div>
                                            </div>
                                            <div className="portlet-body form">
                                                <div className="form-body">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label>University</label>
                                                                <input type="text" className="form-control"
                                                                       onChange={(event) => {
                                                                           this.setState({
                                                                               ...this.state,
                                                                               university : event.target.value
                                                                           })
                                                                       }}
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
                                                                <label>Notes</label>
                                                                <textarea rows="5" placeholder="Enter Notes"
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
                                                        <button type="button" className="btn blue" onClick={()=>{this.handleDataEntry()}}>Submit</button>
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
                                                <div className="caption">Add Block Data for Drug Test</div>
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
                                                        <button type="button" className="btn blue" onClick={()=>{this.handleDataEntry()}}>Submit</button>
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
                                                <div className="caption">Add Block Data for Driving</div>
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
                                                        <button type="button" className="btn blue" onClick={()=>{this.handleDataEntry()}}>Submit</button>
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
                                                <div className="caption">Add Block Data for Criminal</div>
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
                                                        <button type="button" className="btn blue" onClick={()=>{this.handleDataEntry()}}>Submit</button>
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
                                                <div className="caption">Add Block Data for Address</div>
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
                                                        <button type="button" className="btn blue" onClick={()=>{this.handleDataEntry()}}>Submit</button>
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
    return {
        user: reducer_state.user_reducer
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({user_addiiton_success: user_addiiton_success}, dispatch)
}

export default withRouter(connect(mapStateToProps, null)(AddBlockData));