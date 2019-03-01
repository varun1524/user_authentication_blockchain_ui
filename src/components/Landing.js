import React, { Component } from 'react';
import Logo from './../assets/images/UABT_logo.png';
import {withRouter} from 'react-router-dom';
import './../assets/stylesheets/bootstrap.min.css';
import './../assets/stylesheets/style.css';
import './../assets/stylesheets/animate.css';

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
            <div className="gray-bg">
            <div className="middle-box text-center loginscreen animated fadeInDown">
                <h1><img src={Logo} alt="Logo"/></h1>

                <div className="form-group">
                    <input type="email" className="form-control" placeholder="Username" required="" />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Password" required="" />
                </div>
                <button type="submit" className="btn btn-primary block full-width m-b">Login</button>

                <a href="#">
                    <small>Forgot password?</small>
                </a>
                <p className="text-muted text-center">
                    <small>Do not have an account?</small>
                </p>
                <a className="btn btn-sm btn-white btn-block" href="/signup">Create an account</a>

            </div>
            </div>
        );
    }
}

export default withRouter(Landing);