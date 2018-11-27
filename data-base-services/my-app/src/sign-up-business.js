import React, { Component } from 'react';
import { Form, Control } from 'react-redux-form';
import './App.css';
import axios from 'axios';


class signUpBusiness extends Component {
    constructor() {
        super()
        this.state = { values: '', errorMessage: "", errorPresent: false }

    }

    async handleSubmit(values) {
        var checkUserEmail = await axios.post('http://localhost:3001/signup', values);
        if (checkUserEmail.status === 200) {
            this.setState({ values, errorPresent: true, errorMessage:checkUserEmail.data })
        }else if(checkUserEmail.status === 201){
            this.props.history.push('/logginbusinessowner');
        }else{
            this.setState({ values, errorPresent: true, errorMessage: "Opps! Something went wrong please try again later" })
        }
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
                model="signUpBusiness"
                onSubmit={(val) => this.handleSubmit(val) }
            >
                {this.state.errorPresent && (
                    <p>{this.state.errorMessage}</p>
                )}
                <div className='field' >
                    <label>Name: </label>
                    <Control.text model="signUpBusiness.name" validators={{
                        required: (val) => val.length,
                        length: (val) => val.length > 4
                    }} required />
                </div>

                <div className='field' >
                    <label>Last Name:</label>
                    <Control.text model="signUpBusiness.last_name" validators={{
                        required: (val) => val.length,
                        length: (val) => val.length > 4
                    }} required />
                </div>

                <div className='field' >
                    <label>Email:</label>
                    <Control.text model="signUpBusiness.email" validators={{
                        required: (val) => val && val.length,
                        isEmail, // ES6 property shorthand
                    }} required />
                </div>

                <div className='field' >
                    <label> Password: </label>
                    <Control.text model="signUpBusiness.password" validators={{
                        required: (val) => val && val.length,
                        length: (val) => val.length > 4
                    }} required />
                </div>

                <button className='submit'>sign up</button>

            </Form>
        );
    }
}
export default signUpBusiness