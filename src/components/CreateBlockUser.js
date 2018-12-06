import React, { Component } from 'react';
import {doInsertBlockData} from './../api/orgAPI';
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {insert_blockdata_success} from "../actions/insertBlockData";


class CreateBlockUser extends Component {

    constructor() {
        super();
        this.state = {
            email : "",
            role : "",
            company : "",
            duration : "",
            technologies:"",
            highlights:"",
            message:""
        }
    }

    handleBlockchainDataEntry = (() => {
        console.log("block data", this.state)
        let payload = {
                'email':this.state.email,
                'role':this.state.role,
                'company':this.state.company,
                'duration':this.state.duration,
                'technologies':this.state.technologies,
                'highlights':this.state.highlights
        }

        doInsertBlockData(payload).then((response) => {
            console.log("block response",response)
            console.log(typeof response)
            console.log(response.status);
            if (response.status === 200) {
                response.json().then((data) => {
                console.log(response.data);
                this.props.insert_blockdata_success(payload);
                alert("Employment history successfully added to block");
                //this.props.history.push("/home");
            }
            );}
            else if (response.status === 404) {
                    alert("Something went wrong")
                this.setState({
                    ...this.state,
                    message: "User not registered. Please sign up"
                });
            }
            else if (response.status === 401) {
                alert("Something went wrong")
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
        console.log("in block data addition");
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

        return (
            <div className="page-content">


                <h1 className="page-title"> Add Employment Data

                </h1>
                <div className="page-bar">
                    <ul className="page-breadcrumb">
                        <li>
                            <i className="icon-home"></i>
                            <a href="index-2.html">Home</a>
                            <i className="fa fa-angle-right"></i>
                        </li>
                        <li>
                            <span>Insert Record</span>
                        </li>
                    </ul>

                </div>

                <div className="row">
                    <div className="col-md-12">

                        <div className="tab-pane" id="tab_1">
                            <div className="portlet box blue">
                                <div className="portlet-title">
                                    <div className="caption">
                                        <i className="fa fa-gift"></i>Insert Block Record
                                    </div>

                                </div>
                                <div className="portlet-body form">


                                        <div className="form-body">
                                            <h3 className="form-section">Experience Info</h3>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Email</label>
                                                        <input type="text" id="email" className="form-control"
                                                               placeholder="Enter existing email"
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       ...this.state,
                                                                       email : event.target.value
                                                                   })
                                                               }}
                                                        ></input>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Role</label>
                                                        <input type="text" id="Role" className="form-control"
                                                               placeholder="Enter Role"
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       ...this.state,
                                                                       role : event.target.value
                                                                   })
                                                               }}
                                                        ></input>

                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Company</label>
                                                        <input type="text" id="company" className="form-control"
                                                               placeholder="Enter company name"
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       ...this.state,
                                                                       company : event.target.value
                                                                   })
                                                               }}
                                                        ></input>

                                                    </div>
                                                </div>

                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Duration</label>
                                                        <input type="text" className="form-control"
                                                               placeholder="Enter years and months"
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       ...this.state,
                                                                       duration : event.target.value
                                                                   })
                                                               }}></input></div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Technologies</label>
                                                        <input type="text" className="form-control"
                                                               placeholder="Enter technologies"
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       ...this.state,
                                                                       technologies : event.target.value
                                                                   })
                                                               }}
                                                        ></input></div>
                                                </div>

                                            </div>

                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label className="control-label">Highlights</label>
                                                        <textarea rows="5" type="text" id="highlights" className="form-control"
                                                                  placeholder="Enter achievements and responsibilities"
                                                                  onChange={(event) => {
                                                                      this.setState({
                                                                          ...this.state,
                                                                          highlights : event.target.value
                                                                      })
                                                                  }}
                                                        ></textarea>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-actions right">
                                            <button type="button" className="btn default">Cancel</button>
                                            <button className="btn blue" onClick={(()=>{this.handleBlockchainDataEntry()})}>
                                                <i className="fa fa-check"></i> Save
                                            </button>
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
        user_blockdata: reducer_state.user_blockdata
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({insert_blockdata_success: insert_blockdata_success}, dispatch)
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateBlockUser));