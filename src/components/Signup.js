import React, { Component } from 'react';
import Logo from './../assets/images/UABT_logo.png';

class Signup extends Component {
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
                                    <input type="text" placeholder="Enter name" class="form-control" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Email</label>
                                    <input type="email" placeholder="Enter email" class="form-control" />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Password</label>
                                    <input type="password" placeholder="Enter password" class="form-control" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Address 1</label>
                                    <input type="text" placeholder="Enter address 1" class="form-control" />
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Address 2</label>
                                    <input type="text" placeholder="Enter Apt No / Building No" class="form-control" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>City</label>
                                    <input type="text" placeholder="Enter city" class="form-control" />
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>State</label>
                                    <select class="form-control m-b" name="account">
                                        <option></option>
                                        <option>option 2</option>
                                        <option>option 3</option>
                                        <option>option 4</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Zip</label>
                                    <input type="text" placeholder="Enter zip" class="form-control" />
                                </div>

                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Country</label>
                                    <select class="form-control m-b" name="account">
                                        <option></option>
                                        <option>option 2</option>
                                        <option>option 3</option>
                                        <option>option 4</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Phone</label>
                                    <input type="text" placeholder="Enter contact no" class="form-control" />
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Headquarter</label>
                                    <input type="text" placeholder="Enter location" class="form-control" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Date founded</label>
                                    <input type="text" placeholder="Enter MM/DD/YYYY" class="form-control" />
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4 col-md-offset-4">
                            <div class="form-group">
                                <label>Organization Type</label>
                                <select class="form-control m-b" name="account">
                                    <option></option>
                                    <option>option 2</option>
                                    <option>option 3</option>
                                    <option>option 4</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-md-4 col-md-offset-4">

                            {/*<div class="form-group">
                                <div class="checkbox i-checks">
                                    <label /><input type="checkbox"><i></i> Agree the terms and policy</label>
                                </div>
                            </div>*/}

                        </div>




                        <button type="submit" class="btn btn-primary block col-md-4 col-md-offset-4 m-b">Register</button>
                        <div class="col-md-4 col-md-offset-4">
                            <p class="text-muted text-center">
                                <small>Already have an account?</small>
                            </p>
                        </div>
                        <div class="col-md-4 col-md-offset-4">
                            <a class="btn btn-white block m-b" href="/">Login</a>
                            <p class="m-t">
                                <small>User Authetication using Blockchain &copy; 2018</small>
                            </p>
                        </div>



                </div>
            </div>


            </div>
    </div>





    );
    }
}

export default Signup;