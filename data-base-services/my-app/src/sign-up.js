
import React, { Component } from 'react';
import { Form, Control } from 'react-redux-form';
import './App.css';
import axios from 'axios';


class signUp extends Component {
    constructor() {
        super()
        this.state = { values: '' }

    }
    
    async handleSubmit(values) {
        this.setState({ values });
        // axios.post('http://localhost:3001/location', values);
    }
    render() {
        return (

            <signUpForm
                model="signUp"
                onSubmit={(val) => this.handleSubmit(val)}
            >

                <div className='field' >
                    <label>Name: </label>
                    <Control.text model="signUp.name" />
                </div>

                <div className='field' >
                    <label>Last Name:</label>
                    <Control.text model="signUp.lastName" />
                </div>

                <div className='field' >
                    <label>Email:</label>
                    <Control.text model="signUp.email" />
                </div>

                <div className='field' >
                    <label> Password: </label>
                    <Control.text model="signUp.password" />
                </div>

                <div className='field' >
                    <label>Repeat Password: </label>
                    <Control.text model="signUp.repeatPassword" />
                </div>
                <button className='submit'>sign up</button>
            </signUpForm>
        );
    }
}
export default signUp