import React, { Component } from 'react';
import { Form, Control } from 'react-redux-form';
import './App.css';
import axios from 'axios';

class NavBar extends Component {
    constructor() {
        super();
        this.state = { values: '' }
    }
    async handleSubmit(values) {
        this.setState({ values })
        this.props.history.push('/singup');

    }

    render() {
        return (
            <div>
                <div className="topnav">
                    <a className="active" href="http://localhost:3000/">Home</a>
                    <a href="http://localhost:3000/">Rent Storage</a>
                    <a href="http://localhost:3000/business">Business Owner</a>
                    <a href="http://localhost:3000/about">About</a>
                </div>
            </div>
        );
    }

}
export default NavBar;