import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {doLogin} from './../api/authAPI';
import {doInsertData} from './../api/orgAPI'
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {login_success} from "../actions/login";
import renderField from '../components/FormInputs/renderField';

const validate = values => {
    const errors = {};
    if (!values.required) {
        errors.required = 'This field is required';
    }
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Please enter a valid email';
    }
    if (values.number) {
        errors.number = 'Please enter a number';
    }
    if (values.url && !/^https?:\/\//i.test(values.url)) {
        errors.url = 'Please enter a valid URL';
    }
    if (values.equal1 && values.equal1 !== values.equal2) {
        errors.equal2 = 'Does not match';
    }
    return errors;
}

class InputForm extends Component {

    constructor() {
        super();
        this.state = {
            given_name : "",
            last_name : "",
            dob : "",
            gender : "",
            email : "",
            ethnicity : "",
            line1 : "",
            apt : "",
            city : "",
            st : "",
            country : "",
            zip : "",
            citizen_country : "",
            message : "",
            emailColor:"",
            phone: ""
        }
    }

    handleDataEntry = (() => {
        // showAlert("SHowed Successful", "info", this);
        // document.getElementById('emailErr').innerHTML = '';
        console.log('1',this.state.email);
        console.log('2',this.state.password);
        console.log('3', this.state)
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

        /*
        * state data
        given_name : "",
        last_name : "",
        dob : "",
        gender : "",
        email : "",
        ethnicity : "",
        line1 : "",
        apt : "",
        city : "",
        st : "",
        country : "",
        zip : "",
        citizen_country : "",
        message : "",
        emailColor:"",
        phone: ""
        *
        * */

        if(!this.state.given_name){
            document.getElementById('givenNameErr').innerHTML = 'First name is required';
        }

        let payload = {
            'given_name' : this.state.given_name,
            'last_name' : this.state.last_name,
            'dob' : this.state.dob,
            'gender' : this.state.gender,
            'email' : this.state.email,
            'ethnicity' : this.state.ethnicity,
            'line1' : this.state.line1,
            'apt' : this.state.apt,
            'city' : this.state.city,
            'st' : this.state.st,
            'country' : this.state.country,
            'zip' : this.state.zip,
            'citizen_country' : this.state.citizen_country,
            'phone' : this.state.phone

        };

        doInsertData(payload).then((response) => {
            console.log(response.status);
            if (response.status === 200) {
                response.json().then((data) => {
                    console.log(data);
                    this.props.login_success(data);
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
        console.log("[signin] render method");
        // let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="header"><h4>Validation</h4></div>
                            <form className="form-horizontal" onSubmit={console.log("Submitted")}>
                                <div className="content">
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">Required text</label>
                                        <div className="col-sm-9">
                                            <Field
                                                type="text"
                                                name="required"
                                                component={renderField} />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">Email</label>
                                        <div className="col-sm-9">
                                            <Field
                                                type="email"
                                                name="email"
                                                component={renderField} />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">Number</label>
                                        <div className="col-sm-9">
                                            <Field
                                                type="text"
                                                name="number"
                                                component={renderField} />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">URL</label>
                                        <div className="col-sm-9">
                                            <Field
                                                type="text"
                                                name="url"
                                                component={renderField} />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">Equal to</label>
                                        <div className="col-sm-4">
                                            <Field
                                                type="text"
                                                name="equal1"
                                                component={renderField} />
                                        </div>
                                        <div className="col-sm-5">
                                            <Field
                                                type="text"
                                                name="equal2"
                                                component={renderField} />
                                        </div>
                                    </div>
                                </div>
                                <div className="footer text-center">
                                    <button type="submit" className="btn btn-info btn-fill">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(reducer_state) {
    return {
        user: reducer_state.user
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({login_success: login_success}, dispatch)
}

//export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InsertUserData));

export default connect(mapStateToProps)(reduxForm({
    form: 'InsertUserData',
    validate
})(InputForm));