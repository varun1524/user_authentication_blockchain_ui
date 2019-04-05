import React, { Component } from 'react';
import './App.css';
import {Switch, withRouter, Route} from 'react-router-dom';
import Landing from './components/Landing';
import SignUp from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import InsertUserDataForm from './components/CreateUserByOrgUser'
import Menu from './components/SideMenu'
import Page1 from './components/Page1'
import Page2 from './components/Page2'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIgloo } from '@fortawesome/free-solid-svg-icons'
import AddUser from './components/AddUser'
import AddNewUser from './components/AddNewUser'
import AddNewBranch from './components/AddNewBranch'
import Dashboard from './components/Dashboard'
import UserSearch from './components/UserSearch'
import OrganizationProfile from "./components/OrganizationProfile";
import OrganizationProfileEdit from "./components/OrganizationProfileEdit";
import OrganizationBranch from "./components/OrganizationBranch";

library.add(faIgloo);

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Switch>
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
                        <Route path= "/dashboard" render = {() => (
                            <Dashboard
                            />)}
                        />
                        <Route path= "/usersearch" render = {() => (
                            <UserSearch
                            />)}
                        />
                        <Route path= "/organizationprofile" render = {() => (
                            <OrganizationProfile
                            />)}
                        />
                        <Route path= "/organizationprofileedit" render = {() => (
                            <OrganizationProfileEdit
                            />)}
                        />

                    </Switch>
                </header>
            </div>
        );
    }
}

export default withRouter(App);
