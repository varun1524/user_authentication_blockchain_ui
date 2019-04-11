import React, { Component } from 'react';
import './App.css';
import {Switch, withRouter, Route, Router} from 'react-router-dom';
import Landing from './components/Landing';
import SignUp from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import InsertUserDataForm from './components/CreateUserByOrgUser'
import Menu from './components/SideMenu'
import Page1 from './components/Page1'
import Page2 from './components/Page2'
import {connect} from 'react-redux';
import AddUser from './components/AddUser'
import AddNewUser from './components/AddNewUser'
import AddNewBranch from './components/AddNewBranch'
import Dashboard from './components/Dashboard'
import UserSearch from './components/UserSearch'
import OrganizationProfile from "./components/OrganizationProfile";
import OrganizationProfileEdit from "./components/OrganizationProfileEdit";
import OrganizationBranch from "./components/OrganizationBranch";
import UserProfile from "./components/UserProfile";
import AddBlockData from "./components/AddBlockData";
import history from './history';
import OrganizationBranchEdit from "./components/OrganizationBranchEdit";
import FlagData from "./components/FlagData";
import FlaggedRequests from "./components/FlaggedRequests";
import AdminUserSearch from "./components/AdminUserSearch";
import RequestDataAccess from "./components/RequestDataAccess";
import AccessRequest from "./components/AccessRequest";
import ViewAccess from "./components/ViewAccess";
import ViewData from "./components/ViewData";
import EducationBlockAdd from "./components/EducationBlockAdd";

class App extends Component {
    handlePageChange = ((page)=>{
        this.props.history.push(page);
    });

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Switch>
                        <Router history={history}>
                            <div>
                        <Route exact path= "/" component={Landing}/>
                        <Route path= "/signup" render = {() => (
                            <SignUp
                            />)}
                        />
                        <Route path= "/login" render = {() => (
                            <Login
                            />)}
                        />
                        <Route path= "/home" render = {() => (
                            <Home
                            />)}
                        />
                        <Route path= "/page1" render = {() => (
                            <Page1
                            />)}
                        />
                        <Route path= "/page2" render = {() => (
                            <Page2
                            />)}
                        />
                        <Route path= "/adduser" render = {() => (
                            <AddUser
                            />)}
                        />
                        <Route path= "/addnewuser" render = {() => (
                            <AddNewUser
                            />)}
                        />
                        <Route path= "/organizationbranch" render = {() => (
                            <OrganizationBranch
                            />)}
                        />
                        <Route path= "/addnewbranch" render = {() => (
                            <AddNewBranch
                            />)}
                        />
                                <Route path= "/organizationbranchedit" render = {() => (
                                    <OrganizationBranchEdit
                                    />)}
                                />
                        <Route path= "/dashboard" render = {() => (
                            <Dashboard
                            />)}
                        />
                        <Route path= "/usersearch" render = {() => (
                            <UserSearch
                                handlePageChange = {this.handlePageChange}
                            />)}
                        />
                        <Route path= "/organizationprofile" render = {() => (
                            <OrganizationProfile
                            />)}
                        />
                        <Route path= "/userprofile" render = {() => (
                            <UserProfile
                            />)}
                        />
                                <Route path= "/userprofileedit" render = {() => (
                                    <Page2
                                    />)}
                                />
                        <Route path= "/organizationprofileedit" render = {() => (
                            <OrganizationProfileEdit
                            />)}
                        />
                        <Route path= "/addblockdata" render = {() => (
                            <AddBlockData
                                handlePageChange = {this.handlePageChange}
                            />)}
                        />
                                <Route path= "/flagdata" render = {() => (
                                    <FlagData
                                        handlePageChange = {this.handlePageChange}
                                    />)}
                                />
                                <Route path= "/flaggedrequests" render = {() => (
                                    <FlaggedRequests
                                        handlePageChange = {this.handlePageChange}
                                    />)}
                                />
                                <Route path= "/adminusersearch" render = {() => (
                                    <AdminUserSearch
                                        handlePageChange = {this.handlePageChange}
                                    />)}
                                />
                                <Route path= "/requestdataaccess" render = {() => (
                                    <RequestDataAccess
                                        handlePageChange = {this.handlePageChange}
                                    />)}
                                />
                                <Route path= "/accessrequest" render = {() => (
                                    <AccessRequest
                                        handlePageChange = {this.handlePageChange}
                                    />)}
                                />
                                <Route path= "/viewaccess" render = {() => (
                                    <ViewAccess
                                        handlePageChange = {this.handlePageChange}
                                    />)}
                                />
                                <Route path= "/viewdata" render = {() => (
                                    <ViewData
                                        handlePageChange = {this.handlePageChange}
                                    />)}
                                />
                                <Route path= "/educationblockadd" render = {() => (
                                    <EducationBlockAdd
                                        handlePageChange = {this.handlePageChange}
                                    />)}
                                />
                            </div>
                        </Router>
                    </Switch>

                </header>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log("In APP", state)
    return {
        state: state
    };
}


export default withRouter(connect(mapStateToProps)(App));


