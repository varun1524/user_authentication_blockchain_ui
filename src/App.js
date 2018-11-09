import React, { Component } from 'react';
import logo from './assets/images/logo.svg';
import './App.css';
import HelloWorld from './components/HelloWorld';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <HelloWorld/>
                </header>
            </div>
        );
    }
}

export default App;
