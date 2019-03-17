import React, { Component } from 'react';
import './App.css';
import {Switch, withRouter, Route} from 'react-router-dom';
import Landing from './components/Landing';
import SignUp from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import InsertUserDataForm from './components/InsertUserDataForm'
import Menu from './components/SideMenu'
import Page1 from './components/Page1'
import Page2 from './components/Page2'

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Switch>
                        <Route exact path= "/" component={Page1}/>
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
                    </Switch>
                </header>
            </div>
        );
    }
}

export default withRouter(App);
