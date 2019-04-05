import React, { Component } from 'react';
import Menu from './SideMenu'
import TopMenu from './TopMenu'
import {Link, withRouter} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {doCreateUser} from "../api/orgAPI";
import {bindActionCreators} from "redux";
import {user_addiiton_success} from "../actions/orgnization_user";
import DeleteIcon from '@material-ui/icons/Delete';
import {connect} from "react-redux";

class Page2 extends Component {
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
            'address_line_1' : this.state.line1,
            'address_line_2' : this.state.apt,
            'city' : this.state.city,
            'state' : this.state.st,
            'country_of_residence' : this.state.country,
            'zip' : this.state.zip,
            'country_of_citizenship' : this.state.citizen_country,
            'phone' : this.state.phone
        };

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
        console.log("[signin] render method");
        return (
            <div>
                <TopMenu/>
                <div className="">
                    <Menu/>
                </div>
                <div className="page-content-wrapper">
                    <div className="page-content top-side-padding">
                        <h1 className="page-title">New User Form</h1>
                        <div className="page-bar">
                            <ul className="page-breadcrumb">
                                <li>
                                    <FontAwesomeIcon
                                        icon='home'
                                        size='2x'
                                        spin
                                        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                                    />
                                    {/*<span className='DeleteIcon'></span>*/}
                                    {/*<i className='material-icons'></i>*/}
                                    <DeleteIcon/>
                                    <a href="/page1">Home </a>
                                </li>
                            </ul>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="portlet box blue">
                                    <div className="portlet-title">
                                        <div className="caption">Create New User</div>
                                    </div>
                                    <div className="portlet-body form">
                                        <div className="form-body">
                                            <DeleteIcon/>
                                            <h3 className="form-section">Person Info
                                            </h3>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Given Name</label>
                                                        <input type="text" id="firstName" className="form-control" placeholder="Enter legal name"
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       ...this.state,
                                                                       given_name : event.target.value
                                                                   })
                                                               }}
                                                        />
                                                        <span id="givenNameErr"/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Last Name</label>
                                                        <input type="text" id="lastName" className="form-control" placeholder="Enter last name"
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       ...this.state,
                                                                       last_name : event.target.value
                                                                   })
                                                               }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Date of Birth</label>
                                                        <input type="text" className="form-control" placeholder="mm/dd/yyyy"
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       ...this.state,
                                                                       dob : event.target.value
                                                                   })
                                                               }}
                                                        /> </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Gender</label>
                                                        <select className="form-control"
                                                                onChange={(event) => {
                                                                    this.setState({
                                                                        ...this.state,
                                                                        gender : event.target.value
                                                                    })
                                                                }}
                                                        >
                                                            <option value="">Male</option>
                                                            <option value="">Female</option>
                                                        </select>

                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Email</label>
                                                        <input type="text" id="lastName" className="form-control" placeholder="Enter email"
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       ...this.state,
                                                                       email : event.target.value
                                                                   })
                                                               }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Ethinicity</label>
                                                        <select className="form-control"
                                                                onChange={(event) => {
                                                                    this.setState({
                                                                        ...this.state,
                                                                        ethnicity : event.target.value
                                                                    })
                                                                }}
                                                        >
                                                            <option value="">---Select One---</option>
                                                            <option value="">American</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <h3 className="form-section">Address & Contact Info</h3>

                                            <div className="row">
                                                <div className="col-md-6 ">
                                                    <div className="form-group">
                                                        <label>Line 1</label>
                                                        <input type="text" className="form-control"
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       ...this.state,
                                                                       line1 : event.target.value
                                                                   })
                                                               }}
                                                        /> </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Building / Apt Number</label>
                                                        <input type="text" className="form-control"
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       ...this.state,
                                                                       apt : event.target.value
                                                                   })
                                                               }}
                                                        /> </div>
                                                </div>
                                            </div>

                                            <div className="row">
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
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>State</label>
                                                        <input type="text" className="form-control"
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       ...this.state,
                                                                       st : event.target.value
                                                                   })
                                                               }}
                                                        /> </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Country</label>
                                                        <select className="form-control"
                                                                onChange={(event) => {
                                                                    this.setState({
                                                                        ...this.state,
                                                                        country : event.target.value
                                                                    })
                                                                }}
                                                        >
                                                            <option value="">---Select One---</option>
                                                            <option value="AF">Afghanistan</option>
                                                            <option value="AX">Åland Islands</option>
                                                            <option value="AL">Albania</option>
                                                            <option value="DZ">Algeria</option>
                                                            <option value="AS">American Samoa</option>
                                                            <option value="AD">Andorra</option>
                                                            <option value="AO">Angola</option>
                                                            <option value="AI">Anguilla</option>
                                                            <option value="AQ">Antarctica</option>
                                                            <option value="AG">Antigua and Barbuda</option>
                                                            <option value="AR">Argentina</option>
                                                            <option value="AM">Armenia</option>
                                                            <option value="AW">Aruba</option>
                                                            <option value="AU">Australia</option>
                                                            <option value="AT">Austria</option>
                                                            <option value="AZ">Azerbaijan</option>
                                                            <option value="BS">Bahamas</option>
                                                            <option value="BH">Bahrain</option>
                                                            <option value="BD">Bangladesh</option>
                                                            <option value="BB">Barbados</option>
                                                            <option value="BY">Belarus</option>
                                                            <option value="BE">Belgium</option>
                                                            <option value="BZ">Belize</option>
                                                            <option value="BJ">Benin</option>
                                                            <option value="BM">Bermuda</option>
                                                            <option value="BT">Bhutan</option>
                                                            <option value="BO">Bolivia, Plurinational State of</option>
                                                            <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                                                            <option value="BA">Bosnia and Herzegovina</option>
                                                            <option value="BW">Botswana</option>
                                                            <option value="BV">Bouvet Island</option>
                                                            <option value="BR">Brazil</option>
                                                            <option value="IO">British Indian Ocean Territory</option>
                                                            <option value="BN">Brunei Darussalam</option>
                                                            <option value="BG">Bulgaria</option>
                                                            <option value="BF">Burkina Faso</option>
                                                            <option value="BI">Burundi</option>
                                                            <option value="KH">Cambodia</option>
                                                            <option value="CM">Cameroon</option>
                                                            <option value="CA">Canada</option>
                                                            <option value="CV">Cape Verde</option>
                                                            <option value="KY">Cayman Islands</option>
                                                            <option value="CF">Central African Republic</option>
                                                            <option value="TD">Chad</option>
                                                            <option value="CL">Chile</option>
                                                            <option value="CN">China</option>
                                                            <option value="CX">Christmas Island</option>
                                                            <option value="CC">Cocos (Keeling) Islands</option>
                                                            <option value="CO">Colombia</option>
                                                            <option value="KM">Comoros</option>
                                                            <option value="CG">Congo</option>
                                                            <option value="CD">Congo, the Democratic Republic of the</option>
                                                            <option value="CK">Cook Islands</option>
                                                            <option value="CR">Costa Rica</option>
                                                            <option value="CI">Côte d'Ivoire</option>
                                                            <option value="HR">Croatia</option>
                                                            <option value="CU">Cuba</option>
                                                            <option value="CW">Curaçao</option>
                                                            <option value="CY">Cyprus</option>
                                                            <option value="CZ">Czech Republic</option>
                                                            <option value="DK">Denmark</option>
                                                            <option value="DJ">Djibouti</option>
                                                            <option value="DM">Dominica</option>
                                                            <option value="DO">Dominican Republic</option>
                                                            <option value="EC">Ecuador</option>
                                                            <option value="EG">Egypt</option>
                                                            <option value="SV">El Salvador</option>
                                                            <option value="GQ">Equatorial Guinea</option>
                                                            <option value="ER">Eritrea</option>
                                                            <option value="EE">Estonia</option>
                                                            <option value="ET">Ethiopia</option>
                                                            <option value="FK">Falkland Islands (Malvinas)</option>
                                                            <option value="FO">Faroe Islands</option>
                                                            <option value="FJ">Fiji</option>
                                                            <option value="FI">Finland</option>
                                                            <option value="FR">France</option>
                                                            <option value="GF">French Guiana</option>
                                                            <option value="PF">French Polynesia</option>
                                                            <option value="TF">French Southern Territories</option>
                                                            <option value="GA">Gabon</option>
                                                            <option value="GM">Gambia</option>
                                                            <option value="GE">Georgia</option>
                                                            <option value="DE">Germany</option>
                                                            <option value="GH">Ghana</option>
                                                            <option value="GI">Gibraltar</option>
                                                            <option value="GR">Greece</option>
                                                            <option value="GL">Greenland</option>
                                                            <option value="GD">Grenada</option>
                                                            <option value="GP">Guadeloupe</option>
                                                            <option value="GU">Guam</option>
                                                            <option value="GT">Guatemala</option>
                                                            <option value="GG">Guernsey</option>
                                                            <option value="GN">Guinea</option>
                                                            <option value="GW">Guinea-Bissau</option>
                                                            <option value="GY">Guyana</option>
                                                            <option value="HT">Haiti</option>
                                                            <option value="HM">Heard Island and McDonald Islands</option>
                                                            <option value="VA">Holy See (Vatican City State)</option>
                                                            <option value="HN">Honduras</option>
                                                            <option value="HK">Hong Kong</option>
                                                            <option value="HU">Hungary</option>
                                                            <option value="IS">Iceland</option>
                                                            <option value="IN">India</option>
                                                            <option value="ID">Indonesia</option>
                                                            <option value="IR">Iran, Islamic Republic of</option>
                                                            <option value="IQ">Iraq</option>
                                                            <option value="IE">Ireland</option>
                                                            <option value="IM">Isle of Man</option>
                                                            <option value="IL">Israel</option>
                                                            <option value="IT">Italy</option>
                                                            <option value="JM">Jamaica</option>
                                                            <option value="JP">Japan</option>
                                                            <option value="JE">Jersey</option>
                                                            <option value="JO">Jordan</option>
                                                            <option value="KZ">Kazakhstan</option>
                                                            <option value="KE">Kenya</option>
                                                            <option value="KI">Kiribati</option>
                                                            <option value="KP">Korea, Democratic People's Republic of</option>
                                                            <option value="KR">Korea, Republic of</option>
                                                            <option value="KW">Kuwait</option>
                                                            <option value="KG">Kyrgyzstan</option>
                                                            <option value="LA">Lao People's Democratic Republic</option>
                                                            <option value="LV">Latvia</option>
                                                            <option value="LB">Lebanon</option>
                                                            <option value="LS">Lesotho</option>
                                                            <option value="LR">Liberia</option>
                                                            <option value="LY">Libya</option>
                                                            <option value="LI">Liechtenstein</option>
                                                            <option value="LT">Lithuania</option>
                                                            <option value="LU">Luxembourg</option>
                                                            <option value="MO">Macao</option>
                                                            <option value="MK">Macedonia, the former Yugoslav Republic of</option>
                                                            <option value="MG">Madagascar</option>
                                                            <option value="MW">Malawi</option>
                                                            <option value="MY">Malaysia</option>
                                                            <option value="MV">Maldives</option>
                                                            <option value="ML">Mali</option>
                                                            <option value="MT">Malta</option>
                                                            <option value="MH">Marshall Islands</option>
                                                            <option value="MQ">Martinique</option>
                                                            <option value="MR">Mauritania</option>
                                                            <option value="MU">Mauritius</option>
                                                            <option value="YT">Mayotte</option>
                                                            <option value="MX">Mexico</option>
                                                            <option value="FM">Micronesia, Federated States of</option>
                                                            <option value="MD">Moldova, Republic of</option>
                                                            <option value="MC">Monaco</option>
                                                            <option value="MN">Mongolia</option>
                                                            <option value="ME">Montenegro</option>
                                                            <option value="MS">Montserrat</option>
                                                            <option value="MA">Morocco</option>
                                                            <option value="MZ">Mozambique</option>
                                                            <option value="MM">Myanmar</option>
                                                            <option value="NA">Namibia</option>
                                                            <option value="NR">Nauru</option>
                                                            <option value="NP">Nepal</option>
                                                            <option value="NL">Netherlands</option>
                                                            <option value="NC">New Caledonia</option>
                                                            <option value="NZ">New Zealand</option>
                                                            <option value="NI">Nicaragua</option>
                                                            <option value="NE">Niger</option>
                                                            <option value="NG">Nigeria</option>
                                                            <option value="NU">Niue</option>
                                                            <option value="NF">Norfolk Island</option>
                                                            <option value="MP">Northern Mariana Islands</option>
                                                            <option value="NO">Norway</option>
                                                            <option value="OM">Oman</option>
                                                            <option value="PK">Pakistan</option>
                                                            <option value="PW">Palau</option>
                                                            <option value="PS">Palestinian Territory, Occupied</option>
                                                            <option value="PA">Panama</option>
                                                            <option value="PG">Papua New Guinea</option>
                                                            <option value="PY">Paraguay</option>
                                                            <option value="PE">Peru</option>
                                                            <option value="PH">Philippines</option>
                                                            <option value="PN">Pitcairn</option>
                                                            <option value="PL">Poland</option>
                                                            <option value="PT">Portugal</option>
                                                            <option value="PR">Puerto Rico</option>
                                                            <option value="QA">Qatar</option>
                                                            <option value="RE">Réunion</option>
                                                            <option value="RO">Romania</option>
                                                            <option value="RU">Russian Federation</option>
                                                            <option value="RW">Rwanda</option>
                                                            <option value="BL">Saint Barthélemy</option>
                                                            <option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
                                                            <option value="KN">Saint Kitts and Nevis</option>
                                                            <option value="LC">Saint Lucia</option>
                                                            <option value="MF">Saint Martin (French part)</option>
                                                            <option value="PM">Saint Pierre and Miquelon</option>
                                                            <option value="VC">Saint Vincent and the Grenadines</option>
                                                            <option value="WS">Samoa</option>
                                                            <option value="SM">San Marino</option>
                                                            <option value="ST">Sao Tome and Principe</option>
                                                            <option value="SA">Saudi Arabia</option>
                                                            <option value="SN">Senegal</option>
                                                            <option value="RS">Serbia</option>
                                                            <option value="SC">Seychelles</option>
                                                            <option value="SL">Sierra Leone</option>
                                                            <option value="SG">Singapore</option>
                                                            <option value="SX">Sint Maarten (Dutch part)</option>
                                                            <option value="SK">Slovakia</option>
                                                            <option value="SI">Slovenia</option>
                                                            <option value="SB">Solomon Islands</option>
                                                            <option value="SO">Somalia</option>
                                                            <option value="ZA">South Africa</option>
                                                            <option value="GS">South Georgia and the South Sandwich Islands</option>
                                                            <option value="SS">South Sudan</option>
                                                            <option value="ES">Spain</option>
                                                            <option value="LK">Sri Lanka</option>
                                                            <option value="SD">Sudan</option>
                                                            <option value="SR">Suriname</option>
                                                            <option value="SJ">Svalbard and Jan Mayen</option>
                                                            <option value="SZ">Swaziland</option>
                                                            <option value="SE">Sweden</option>
                                                            <option value="CH">Switzerland</option>
                                                            <option value="SY">Syrian Arab Republic</option>
                                                            <option value="TW">Taiwan, Province of China</option>
                                                            <option value="TJ">Tajikistan</option>
                                                            <option value="TZ">Tanzania, United Republic of</option>
                                                            <option value="TH">Thailand</option>
                                                            <option value="TL">Timor-Leste</option>
                                                            <option value="TG">Togo</option>
                                                            <option value="TK">Tokelau</option>
                                                            <option value="TO">Tonga</option>
                                                            <option value="TT">Trinidad and Tobago</option>
                                                            <option value="TN">Tunisia</option>
                                                            <option value="TR">Turkey</option>
                                                            <option value="TM">Turkmenistan</option>
                                                            <option value="TC">Turks and Caicos Islands</option>
                                                            <option value="TV">Tuvalu</option>
                                                            <option value="UG">Uganda</option>
                                                            <option value="UA">Ukraine</option>
                                                            <option value="AE">United Arab Emirates</option>
                                                            <option value="GB">United Kingdom</option>
                                                            <option value="US">United States</option>
                                                            <option value="UM">United States Minor Outlying Islands</option>
                                                            <option value="UY">Uruguay</option>
                                                            <option value="UZ">Uzbekistan</option>
                                                            <option value="VU">Vanuatu</option>
                                                            <option value="VE">Venezuela, Bolivarian Republic of</option>
                                                            <option value="VN">Viet Nam</option>
                                                            <option value="VG">Virgin Islands, British</option>
                                                            <option value="VI">Virgin Islands, U.S.</option>
                                                            <option value="WF">Wallis and Futuna</option>
                                                            <option value="EH">Western Sahara</option>
                                                            <option value="YE">Yemen</option>
                                                            <option value="ZM">Zambia</option>
                                                            <option value="ZW">Zimbabwe</option>
                                                        </select>

                                                    </div>
                                                </div>
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

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Country of Citizenship</label>
                                                        <select className="form-control"
                                                                onChange={(event) => {
                                                                    this.setState({
                                                                        ...this.state,
                                                                        citizen_country : event.target.value
                                                                    })
                                                                }}
                                                        > </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>Phone</label>
                                                        <input type="text" className="form-control"
                                                               onChange={(event) => {
                                                                   this.setState({
                                                                       ...this.state,
                                                                       phone : event.target.value
                                                                   })
                                                               }}
                                                        /></div>
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
                    </div>
                </div>
            </div>

        );
    }
}

function mapStateToProps(reducer_state) {
    console.log("In page2", reducer_state)
    return {
        organization_user: reducer_state.organization_user
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({user_addiiton_success: user_addiiton_success}, dispatch)
}

export default withRouter(connect(mapStateToProps)(Page2));
