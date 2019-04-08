import React, { Component } from 'react';
import Logo from './../assets/images/UABT_logo.png';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {doSignUp} from './../api/userAPI';
import {signup_success} from "../actions/signup";


class Signup extends Component {
    constructor() {
        super();
        this.state = {
            name  : "",
            email : "",
            password : "",
            address_line_1  : "",
            address_line_2 : "",
            city : "",
            state  : "",
            country : "",
            zip : "",
            message : "",
            phone: "",
            headquarter : "",
            founded_date  :"",
            organization_type: ""
        }
    }
    componentDidMount(){

    }

    componentWillMount(){

    }

    componentWillUnmount(){

    }
    handleSignup = (() => {
        // showAlert("SHowed Successful", "info", this);
        document.getElementById('emailErr').innerHTML = '';
        console.log('1',this.state.name);
        console.log('2',this.state);
        //Validation
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

        if(!this.state.name){
            document.getElementById('nameErr').innerHTML = 'Organization name is required';
        }
        else if (!this.state.email){
            document.getElementById('emailErr').innerText = 'Organization email is required';
        }
        else if(!re.test(this.state.email)){
            document.getElementById('emailErr').innerHTML='Email is invalid';
        }
        else if (!this.state.address_line_1){
            document.getElementById('add1Err').innerText = 'Address Line 1 is required';
        }
        else if (!this.state.city){
            document.getElementById('cityErr').innerText = 'City is required';
        }
        else if (!this.state.state){
            document.getElementById('stateErr').innerText = 'State is required';
        }
        else if (!this.state.country){
            document.getElementById('countryErr').innerText = 'Country is required';
        }
        else if (!this.state.zip){
            document.getElementById('zipErr').innerText = 'Zip is required';
        }
        else if (!this.state.phone){
            document.getElementById('stateErr').innerText = 'Phone number is required';
        }
        else if (!this.state.founded_date){
            document.getElementById('datefErr').innerText = 'Foundation date is required';
        }
        else{
            // empty out all the errors here
            document.getElementById('cityErr').innerText = '';
            document.getElementById('stateErr').innerText = '';
            document.getElementById('countryErr').innerText = '';
            document.getElementById('zipErr').innerText = '';
            document.getElementById('stateErr').innerText = '';
            document.getElementById('datefErr').innerText = '';

            var new_date = this.state.founded_date + ' 00:00:00';

            console.log('No error. All fields are valid. Trying to sign up');
            let payload = {
                'name': this.state.name,
                'email': this.state.email,
                'address_line_1': this.state.address_line_1,
                'address_line_2': this.state.address_line_2,
                'city':this.state.city,
                'state':this.state.state,
                'country':this.state.country,
                'zip':this.state.zip,
                'phone':this.state.phone,
                'headquarter' : this.state.headquarter,
                'founded_date'  : this.state.founded_date+' 12:00:00',
                'organization_type': 1
            };
            console.log("-----PAYLOAD-----",payload);
            doSignUp(payload).then((response) => {
                console.log(response.status);
                if (response.status === 200) {
                    response.json().then((data) => {

                        alert("Your request has been submitted. You will get an email when request has been submitted");
                        console.log(data);
                        this.props.signup_success(data);
                        this.props.history.push("/");
                    });

                }
                else if (response.status === 403) {
                    this.setState({
                        ...this.state,
                        message: "Could not register. Please try again"
                    });
                }
                else {
                    console.log("Error: ", response);
                    // alert("Error while Signing In");
                }
            });
        }
    });
    render() {
        return (
            <div className="gray-bg">

            <div className="wrapper loginscreen animated fadeInDown">

                <div className="container">

                    <div className="text-center">

                        <img src={Logo} width="10%" height="10%" />
                        <h3>Organization Signup</h3>
                    </div>



                    <div class="m-t">
                        <div class="col-md-12">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Name</label>
                                    <input type="text" placeholder="Enter name" class="form-control"
                                           onChange={(event) => {
                                               this.setState({
                                                   ...this.state,
                                                   name : event.target.value
                                               })
                                           }}
                                    />
                                    <span id="nameErr"/>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Email</label>
                                    <input type="email" placeholder="Enter email" class="form-control"
                                           onChange={(event) => {
                                               this.setState({
                                                   ...this.state,
                                                   email : event.target.value
                                               })
                                           }}
                                    /><span id="emailErr"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Address 1</label>
                                    <input type="text" placeholder="Enter address 1" class="form-control"
                                           onChange={(event) => {
                                               this.setState({
                                                   ...this.state,
                                                   address_line_1 : event.target.value
                                               })
                                           }}
                                    /><span id="add1Err"/>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Address 2</label>
                                    <input type="text" placeholder="Enter Apt No / Building No" class="form-control"
                                           onChange={(event) => {
                                               this.setState({
                                                   ...this.state,
                                                   address_line_2 : event.target.value
                                               })
                                           }}
                                    />
                                    <span id="add2Err"/>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>City</label>
                                    <input type="text" placeholder="Enter city" class="form-control"
                                           onChange={(event) => {
                                               this.setState({
                                                   ...this.state,
                                                   city : event.target.value
                                               })
                                           }}
                                    />
                                    <span id="cityErr"/>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Country</label>
                                    <CountryDropdown class="form-control m-b" name="account" value={this.state.country}
                                                     onChange={(val) => {
                                                         this.setState({
                                                             ...this.state,
                                                             country : val
                                                         })
                                                     }}
                                    >
                                    </CountryDropdown><span id="countryErr"/>

                                </div>
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>State</label>
                                    <RegionDropdown class="form-control m-b" name="account" country={this.state.country} value={this.state.state}
                                                    onChange={(val) => {
                                                        this.setState({
                                                            ...this.state,
                                                            state : val
                                                        })
                                                    }}
                                    >
                                    </RegionDropdown><span id="stateErr"/>

                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Zip</label>
                                    <input type="text" placeholder="Enter zip" class="form-control"
                                           onChange={(event) => {
                                               this.setState({
                                                   ...this.state,
                                                   zip : event.target.value
                                               })
                                           }}
                                    /><span id="zipErr"/>
                                </div>

                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Organization Type</label>
                                    <select class="form-control m-b" name="account"
                                            onChange={(event) => {
                                                this.setState({
                                                    ...this.state,
                                                    organization_type : event.target.value
                                                })
                                            }}
                                    >
                                        <option>Educational</option>
                                        <option>Medical</option>
                                        <option>IT</option>
                                        <option>Government</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Phone</label>
                                    <input type="text" placeholder="Enter contact no" class="form-control"
                                           onChange={(event) => {
                                               this.setState({
                                                   ...this.state,
                                                   phone : event.target.value
                                               })
                                           }}
                                    /><span id="phoneErr"/>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Headquarter</label>
                                    <input type="text" placeholder="Enter location" class="form-control"
                                           onChange={(event) => {
                                               this.setState({
                                                   ...this.state,
                                                   headquarter : event.target.value
                                               })
                                           }}/>
                                    <span id="hqErr"/>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Date founded</label>
                                    <input type="date" placeholder="Enter MM/DD/YYYY" class="form-control"
                                           onChange={(event) => {
                                               this.setState({
                                                   ...this.state,
                                                   founded_date : event.target.value
                                               })
                                           }}/>
                                    <span id="datefErr"></span>
                                </div>
                            </div>
                        </div>

                        {/*<div class="col-md-4 col-md-offset-4">*/}
                            {/*<div class="form-group">*/}
                                {/*<label>Organization Type</label>*/}
                                {/*<select class="form-control m-b" name="account"*/}
                                        {/*onChange={(event) => {*/}
                                            {/*this.setState({*/}
                                                {/*...this.state,*/}
                                                {/*organization_type : event.target.value*/}
                                            {/*})*/}
                                        {/*}}*/}
                                {/*>*/}
                                    {/*<option>Educational</option>*/}
                                    {/*<option>Medical</option>*/}
                                    {/*<option>IT</option>*/}
                                    {/*<option>Government</option>*/}
                                {/*</select>*/}
                            {/*</div>*/}
                        {/*</div>*/}

                        <div class="col-md-4 col-md-offset-4">

                            {/*<div class="form-group">
                                <div class="checkbox i-checks">
                                    <label /><input type="checkbox"><i></i> Agree the terms and policy</label>
                                </div>
                            </div>*/}

                        </div>




                        <button type="submit" class="btn btn-primary block col-md-4 col-md-offset-4 m-b" onClick={()=>{this.handleSignup()}}>Register</button>
                        <div class="col-md-4 col-md-offset-4">
                            <p class="text-muted text-center">
                                <small>Already have an account?</small>
                            </p>
                        </div>
                        <div class="col-md-4 col-md-offset-4">
                            <a class="btn btn-white block m-b" href="/">Login</a>
                            <p class="m-t">
                                <small>User Authetication using Blockchain &copy; 2019</small>
                            </p>
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
        user: reducer_state.user
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({signup_success: signup_success}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));