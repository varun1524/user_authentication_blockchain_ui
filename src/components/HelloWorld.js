import React, { Component } from 'react';
import Logo from './../assets/images/UABT_logo.png';

class HelloWorld extends Component {
    render() {
        return (
            <div className="HelloWorld">
                <h1><img src={Logo} alt="Logo"/></h1>
                <header className="HelloWorld-header">
                    User Authentication Block-Chain

                </header>
            </div>
        );
    }
}

export default HelloWorld;