import React, { Component } from 'react';
import './App.css';
import {Switch, withRouter, Route} from 'react-router-dom';
import Landing from './components/Landing';
import SignUp from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import CreateUser from "./components/CreateUser";
import CreateBlockUser from "./components/CreateBlockUser";
import ViewBlock from "./components/ViewBlock";

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
                        <Route path= "/CreateBlockUser" render = {() => (
                            <CreateBlockUser
                            />)}
                        />
                        <Route path= "/home" render = {() => (
                            <Home
                            />)}
                        />
                        <Route path= "/CreateUser" render = {() => (
                            <CreateUser
                            />)}
                        />
                        <Route path= "/ViewBlock" render = {() => (
                            <ViewBlock
                            />)}
                        />
                    </Switch>
                </header>
            </div>
        );
    }
}

export default withRouter(App);