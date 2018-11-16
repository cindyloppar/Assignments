
import React, { Component } from 'react';
import { Form, Control } from 'react-redux-form';
import './App.css';
import axios from 'axios';


class signUp extends Component {
    constructor() {
        super()
        this.state = { values: '', errorMessage: "", errorPresent: false }

    }

    async handleSubmit(values) {
        this.setState({ values });
        var signingUserUp = await axios.post('http://localhost:3001/signup', values)
        console.log('signingUserUp :', signingUserUp);
        this.props.history.push('/login');

    }
    render() {
        const isEmail = (val) => {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var results = re.test(val);
            if (!results && val.length > 0) {
                this.setState({ errorPresent: true, errorMessage: "invalid email, please check your email!" })
            } else {
                this.setState({ errorPresent: false })
            }
            return results;
        };
        return (

            <Form
                model="signUp"
                onSubmit={(val) => this.handleSubmit(val)
                }
            >
                {this.state.errorPresent && (
                    <p>{this.state.errorMessage}</p>
                )}
                <div className='field' >
                    <label>Name: </label>
                    <Control.text model="signUp.name" />
                </div>

                <div className='field' >
                    <label>Last Name:</label>
                    <Control.text model="signUp.last_name" />
                </div>

                <div className='field' >
                    <label>Email:</label>
                    <Control.text model="signUp.email" validators={{
                        required: (val) => val && val.length,
                        isEmail, // ES6 property shorthand
                    }} required />
                </div>

                <div className='field' >
                    <label> Password: </label>
                    <Control.text model="signUp.password" />
                </div>

                <button className='submit'>sign up</button>
            </Form>
        );
    }
}
export default signUp