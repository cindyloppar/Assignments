
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
        var checkUserEmail = await axios.post('http://localhost:3001/signup', values);
        if (checkUserEmail.status === 200) {
            this.setState({ values, errorPresent: true, errorMessage:checkUserEmail.data })
        }else if(checkUserEmail.status === 201){
            this.props.history.push('/login');
        }else{
            this.setState({ values, errorPresent: true, errorMessage: "Opps! Something went wrong please try again later" })
        }
    }
    render() {
        const isEmail = (val) => {
            var re = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
            var results = re.test(val);
            if (!results && val.length > 0) {
                this.setState({ errorPresent: true, errorMessage: "invalid email, please check your email!" })
            } else {
                this.setState({ errorPresent: false })
            }
            return results;
        };

        console.log(this.state);
        return (

            <Form
                model="signUp"
                onSubmit={(val) => this.handleSubmit(val) }
            >
                {this.state.errorPresent && (
                    <p>{this.state.errorMessage}</p>
                )}
                <div className='field' >
                    <label>Name: </label>
                    <Control.text model="signUp.name" validators={{
                        required: (val) => val.length,
                        length: (val) => val.length > 4
                    }} required />
                </div>

                <div className='field' >
                    <label>Last Name:</label>
                    <Control.text model="signUp.last_name" validators={{
                        required: (val) => val.length,
                        length: (val) => val.length > 4
                    }} required />
                </div>

                <div className='field' >
                    <label>Email:</label>
                    <Control.text model="signUp.email" validators={{
                        required: (val) => val && val.length,
                        isEmail,
                    }} required />
                </div>

                <div className='field' >
                    <label> Password: </label>
                    <Control.text model="signUp.password" validators={{
                        required: (val) => val.length,
                        length: (val) => val.length > 4
                    }} required />
                </div>

                <button className='submit'>sign up</button>

            </Form>
        );
    }
}
export default signUp