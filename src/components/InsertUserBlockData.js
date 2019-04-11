import React, { Component } from 'react';
import {doInsertBlockData} from './../api/orgAPI'
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {user_blockdata_addition} from "../actions/orgnization_user";

class InsertUserBlockData extends Component {

    constructor() {
        super();
        this.state = {
            user_email: "",
            role : "",
            company : "",
            start_date : "",
            end_date : "",
            highlights : ""
        }
    }

    handleBlockDataEntry = (() => {
        console.log('in block data entry',this.state);
        //Validation
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

        // code for validation

        if(!this.state.email){
            document.getElementById('emailErr').innerHTML = 'Employee email is required';
        }
        else if(!re.test(this.state.email)){
            document.getElementById('emailErr').innerHTML='Email is invalid';
        }
        else if (!this.state.role){
            document.getElementById('roleErr').innerText = 'Employee role is required';
        }
        else if (!this.state.start_date){
            document.getElementById('startdateErr').innerText = 'Start date is required';
        }
        else if (!this.state.end_date){
            document.getElementById('enddateErr').innerText = 'End date is required';
        }
        else if (!this.state.highlights){
            document.getElementById('highlightsErr').innerText = 'Basic user summary is required';
        }
        else{
            let payload = {
                'user_email' : this.state.email,
                'role' : this.state.role,
                'start_date' : this.state.start_date,
                'end_date' : this.state.end_date,
                'highlights' : this.state.highlights
            };

            doInsertBlockData(payload).then((response) => {
                console.log(response.status);
                if (response.status === 200) {
                    response.json().then((data) => {
                        console.log(data);
                        this.props.user_addiiton_success(data);
                        alert("User's data successfully added to the block")
                        // clear all the html fields values
                        document.getElementById('userEmail').value = ''
                        document.getElementById('role').value = ''
                        document.getElementById('startDate').value = ''
                        document.getElementById('endDate').value = ''
                        document.getElementById('highlights').value = ''
                    });

                }
                else {
                    console.log("Error: ", response);
                    alert("Something went wrong. Could not add employee's data");
                }
            });
        }
    });


    render() {
        return(
            <div>
                <h1>HTML code</h1>
                {/*<input type="text" value="Blabla" id="userEmail">  </input>*/}
                {/*<input type="text" value="Blabla" id="role">  </input>*/}
                {/*<input type="text" value="Blabla" id="startDate">  </input>*/}
                {/*<input type="text" value="Blabla" id="endDate">  </input>*/}
                {/*<input type="text" value="Blabla" id="highlights">  </input>*/}
            </div>
        )
    }
}

function mapStateToProps(reducer_state) {
    return {
        user_reducer: reducer_state.user_reducer
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({user_blockdata_addition: user_blockdata_addition}, dispatch)
}

export default withRouter(connect(mapStateToProps)(InsertUserBlockData));