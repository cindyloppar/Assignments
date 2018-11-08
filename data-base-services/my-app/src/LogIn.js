
import React, { Component } from 'react';
import { Form, Control } from 'react-redux-form';
import './App.css';
import axios from 'axios';


class logIn extends Component {
    constructor() {
        super();
        this.state = { values: '' }

    }

    async handleSubmit(values) {
        this.setState({ values })

        // axios.post('http://localhost:3001/blocks', values)
    }

    render() {
        return (
            <logInForm
                model="log"
                onSubmit={(val) => this.handleSubmit(val)}
            >

                <div className='field' >
                    <label>Name: </label>
                    <Control.text model="log.businessName" />
                </div>

                <div className='field' >
                    <label>Password:</label>
                    <Control.text model="log.contactName" />
                </div>

                <div className="field">
                    <label>
                        <Control.checkbox model="log.remember" value={true} />
                        Remember me
          </label>
                </div>

                <button className='submit'>submit </button>

            </logInForm>
        );
    }
}

export default logIn; 