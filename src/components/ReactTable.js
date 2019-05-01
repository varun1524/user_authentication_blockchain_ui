import React, {Component, useState} from 'react';
import Logo from './../assets/images/logo-default.png';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem ,Dropdown} from 'reactstrap';
import angdown from 'react-icons/lib/fa/angle-down'
import {BackendCred, BackendCredBody, BackendGetWithoutSession} from "../api/Util";
import {record_type_fetch} from "../actions/user";
import ReactDataGrid from "react-data-grid";
import {Data, Toolbar} from "react-data-grid-addons";

class ReactTableCustom extends Component {

    constructor(props) {
        super(props);
    }

    defaultColumnProperties = {
        filterable: true
    };

    selectors = Data.Selectors;

    columns = [
        //{ key: "id", name: "ID"},
        { key: "given_name", name: "Given Name"},
        { key: "last_name", name: "Last Name"},
        { key: "email", name: "Email"},
        { key: "action", name: "Action"}
    ].map(c => ({ ...c, ...this.defaultColumnProperties }));

    getRows = (rows, filters) => {
        return this.selectors.getRows({ rows, filters });
    }

    accessRequest = (id) => {
        alert("Requests all the data: "+id);
        // data category from database
        let endpoint = 'api/v1/add_user_organization' ;
        let method = 'POST'
        let payload = {
            organization_id : 1,
            user_id: id,
            user_role : 4
        };
        BackendCredBody(payload, endpoint, method).then((response) => {
            console.log(response)
            if (response.status === 200) {
                response.json().then((data) => {
                    console.log(data);
                    if(data.message==="success") {
                        alert("Action taken successfully")
                        //window.location.reload();
                        this.handleDataEntry()
                    }
                });

            }
            else {
                console.log("Error: ", response);
                alert("Could not take the action");
            }
        });
    }

    InOrganizationActions_Block = (rowdata) => [
        {
            icon: "glyphicon glyphicon-link",
            actions: [
                {
                    text: "Edit",
                    callback: () => {
                        console.log("Sends to Edit Page: "+JSON.stringify(rowdata));
                    }
                },
                {
                    text: "Delete",
                    callback: () => {
                        console.log("Removes from Org: "+JSON.stringify(rowdata));
                    }
                }
            ]
        }
    ];

    getCellActions = (column, row) =>{
        console.log("getCellActions: ", row);

        const InOrgNoBlock = {
            action: this.InOrganizationActions_NoBlock(row)
        };
        const InOrgBlock = {
            action: this.InOrganizationActions_Block(row)
        };
        const OutOrg = {
            action: this.OutOrganizationActions(row)
        };
        if(row.organization_id===1)
        {
            return InOrgNoBlock[column.key];
        }
        else {
            return OutOrg[column.key];
        }
    }



    OutOrganizationActions= (rowdata) => [
        {
            icon: "glyphicon glyphicon-link",
            actions: [
                {
                    text: "Add to Organization",
                    callback: () => {
                        this.accessRequest(rowdata.id);
                        console.log("Adds to Organization: "+JSON.stringify(rowdata)) ;
                    }
                }
            ]
        }
    ];

    render(){
        return (
            <ReactDataGrid
                columns={this.columns}

                toolbar={<Toolbar enableFilter={true} />}

                enableCellSelect={true}
                getCellActions={this.getCellActions}
            />
        );
    }
}
function mapStateToProps(reducer_state) {
    console.log("--Reducer state-----", reducer_state.user_reducer)
    return {
        user: reducer_state.user_reducer
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({record_type_fetch: record_type_fetch}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReactTableCustom));
