import React, { Component } from 'react';
import Logo from './../assets/images/UABT_logo.png';
import {withRouter} from 'react-router-dom';

class Landing extends Component {

    constructor(){
        super();
        this.state={

        }
    }

    componentDidMount(){

    }

    componentWillMount(){

    }

    componentWillUnmount(){

    }

    redirectLogin = ((path)=>{
        this.props.history.push(path);
    });

    render() {
        return (
            <div className="HelloWorld">
                <div>
                    <button onClick={(()=>{this.redirectLogin("/login")})}>Login</button>
                </div>
                <h1><img src={Logo} alt="Logo"/></h1>
                <header className="HelloWorld-header">
                    User Authentication Block-Chain
                </header>
            </div>
        );
    }
}

export default withRouter(Landing);