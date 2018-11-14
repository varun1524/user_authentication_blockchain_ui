import React, { Component } from 'react';
import './App.css';
import {Switch, withRouter, Route} from 'react-router-dom';
import Landing from './components/Landing';
import SignUp from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';

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
                    </Switch>
                </header>
            </div>
        );
    }
}

export default withRouter(App);
