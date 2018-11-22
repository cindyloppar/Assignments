import React, { Component } from 'react';
import { Form, Control } from 'react-redux-form';
import './App.css';
import axios from 'axios';

class MainScreen extends Component {
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
                <div className="box" style={{marginTop: '8%'}}>
                    <button className='submit'>Sing Up</button>
                    <button className='submit'>Log in</button>
                </div>
            </div>
        );
    }

}
export default MainScreen;