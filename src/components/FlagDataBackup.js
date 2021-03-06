import React, { Component, useState} from 'react';
import Menu from './SideMenu'
import TopMenu from './TopMenu'
import {Link, withRouter} from 'react-router-dom';
import {doCreateBranch} from "../api/orgAPI";
import {bindActionCreators} from "redux";
import {branch_addiiton_success} from "../actions/organization_admin";
import {CountryDropdown, RegionDropdown} from "react-country-region-selector";
import {Home} from "@material-ui/icons";
import ReactDataGrid from "react-data-grid";
import {Toolbar,Data} from "react-data-grid-addons";
import KeyboardArrowRight from "@material-ui/core/es/internal/svg-icons/KeyboardArrowRight";
import {BackendCred} from "../api/Util";
import {connect} from "react-redux";


const rows = [
    { id: 0, title: "Task 1", complete: 20, status:"Flagged", flagbit:1 },
    { id: 1, title: "Task 2", complete: 40, flagbit:0 },
    { id: 2, title: "Task 3", complete: 60,status:"Flagged" , flagbit:1 }
];

const defaultColumnProperties = {
    filterable: true
};

const selectors = Data.Selectors;

// const columns = [
//     { key: "id", name: "ID"},
//     { key: "title", name: "Name"},
//     { key: "complete", name: "Organization"},
//     { key: "status", name: "Status"},
//     { key: "action", name: "Action"}
// ].map(c => ({ ...c, ...defaultColumnProperties }));

const columns = [
    { key: "company", name: "Company"},
    { key: "role", name: "Role"},
    { key: "start_date", name: "Start Date"},
    { key: "end_date", name: "End Date"},
    { key: "technologies", name: "Technologies"},
    { key: "highlights", name: "Highlights"},
    { key: "action", name: "Action"}
].map(c => ({ ...c, ...defaultColumnProperties }));

const FlagAction = (rowdata) => [
    {
        icon: "glyphicon glyphicon-link",
        actions: [
            {
                text: "Flag",
                callback: () => {
                    alert("Flag's Data: "+JSON.stringify(rowdata));
                }
            }
        ]
    }
];
const UnflagAction = (rowdata) => [
    {
        icon: "glyphicon glyphicon-link",
        actions: [
            {
                text: "Unflag",
                callback: () => {
                    alert("Unflag Data: "+JSON.stringify(rowdata));
                }
            }
        ]
    }
];

function getCellActions(column, row) {
    const Flag = {
        action: FlagAction(row)
    };
    const Unflag = {
        action: UnflagAction(row)
    };

    if(row.flagbit===0)
    {
        return Flag[column.key];
    }
    else
    {
        return Unflag[column.key];
    }

}


const handleFilterChange = filter => filters => {
    const newFilters = { ...filters };
    if (filter.filterTerm) {
        newFilters[filter.column.key] = filter;
    } else {
        delete newFilters[filter.column.key];
    }
    return newFilters;
};

function getRows(rows, filters) {
    return selectors.getRows({ rows, filters });
}

const ROW_COUNT = 50;
const ROW_HEIGHT = 200;

const Panel = ({ title, children }) => {
    return (
        <div class="panel panel-default">
            <div class="panel-heading">{title}</div>
            <div class="panel-body">{children}</div>
        </div>
    );
};

const Contact = ({
                     company,
                     role,
                     start_date,
                     end_date,
                     highlights,
                     technologies
                 }) => {
    return (
        <div style={{ paddingLeft: "150px" }}>
            <address>
                <strong>
                    {start_date} {end_date}
                </strong>
                <br />
                {role}
                <br />
                <label>Highlights</label> {highlights}
                <br />
                <label>Technologies</label>{technologies}
            </address>
        </div>
    );
};

const RowRenderer = ({ row, idx }) => {
    const { company } = row;
    return (
        <Panel title={`${company}`}>
            <Contact {...row} />
        </Panel>
    );
};

function Table({ rows }) {
    const [filters, setFilters] = useState({});
    const filteredRows = getRows(rows, filters);
    return (
        <ReactDataGrid
            columns={columns}
            rowGetter={i => filteredRows[i]}
            rowsCount={filteredRows.length}
            toolbar={<Toolbar enableFilter={true} />}
            rowRenderer={RowRenderer}
            onAddFilter={filter => setFilters(handleFilterChange(filter))}
            onClearFilters={() => setFilters({})}
            enableCellSelect={true}
            getCellActions={getCellActions}
        />
    );
}



class FlagData extends Component {

    constructor() {
        super();
        this.state = {
            rows1: []
        }
    }

    componentWillMount() {
        let endpoint = 'api/v1/get_user_record?user_id='+this.props.user.id;
        let method = 'GET'
        let payload = {}
        BackendCred(payload, endpoint, method).then((response) => {
            console.log(response.status);
            console.log(response.data);
            if (response.status === 200) {
                response.json().then((data) => {
                    if(data.message==="success") {
                        //alert("User can view inserted block data")
                        console.log("View My Data normal user", data)
                        let rcvd_data = JSON.parse(data.block_data);
                        let rows = [];
                        for (var i = 0; i < rcvd_data.data.length; i++){
                            var obj = rcvd_data.data[i];
                            var data_to_be_added = {
                                company : obj['company'],
                                start_date : obj['start_date'],
                                end_date : obj['end_date'],
                                role : obj['role'],
                                technologies : obj['technologies'],
                                highlights : obj['highlights']
                            };
                            rows.push(data_to_be_added);
                        }
                        this.setState({
                            ...this.state,
                            rows1: rows
                        });
                    }
                });

            }
            else {
                console.log("Error: ", response);
                alert("Could not request the access");
            }
        });
    }

    render() {

        console.log("[branch] render method");
        return (
            <div>
                <TopMenu/>
                <div className="">
                    <Menu/>
                </div>
                <div className="page-content-wrapper">
                    <div className="page-content top-side-padding">
                        <h1 className="page-title">Flag Data</h1>
                        <div className="page-bar">
                            <ul className="page-breadcrumb">
                                <li>
                                    <Home className="myiconcolor"/>
                                    <a href="/page1">Home </a>
                                    <KeyboardArrowRight className="myiconcolor"/>
                                    <a href="/organizationbranch">Flag Data</a>
                                </li>
                            </ul>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="portlet box blue">
                                    <div className="portlet-title">
                                        <div className="caption">Experience Details</div>
                                    </div>
                                    <div className="portlet-body form">
                                        <div className="form-body">

                                            <div className="row">
                                                <Table className="table-responsive" rows={this.state.rows1} />

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
    return {
        user: reducer_state.user_reducer
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({branch_addiiton_success: branch_addiiton_success}, dispatch)
}

export default withRouter(connect(mapStateToProps, null)(FlagData));