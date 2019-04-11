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

class EducationBlockAdd extends Component
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

        let endpoint='';
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
                        <h2>Here {this.props.location.state}</h2>
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
                                                <div className="caption">Add Block Data for </div>
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

                            </Tab>
                            <Tab eventKey="medical" title="Medical">

                            </Tab>
                            <Tab eventKey="driving" title="Driving">

                            </Tab>
                            <Tab eventKey="address" title="Address">

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

export default withRouter(connect(mapStateToProps, null)(EducationBlockAdd));