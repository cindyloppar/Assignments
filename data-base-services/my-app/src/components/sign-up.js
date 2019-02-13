
import React, { Component } from 'react';
import { Form, Control } from 'react-redux-form';
import '../App.css';
import axios from 'axios';
import NavbarUser from '../components/navbar-user'

class SignUp extends Component {
    constructor() {
        super()
        this.state = { values: '', errorMessage: "", errorPresent: false }

    }

    async handleSubmit(values) {
        var checkUserEmail = await axios.post('http://localhost:3001/signup', values);
        if (checkUserEmail.status === 200) {
            this.setState({ values, errorPresent: true, errorMessage:checkUserEmail.data })
        }else if(checkUserEmail.status === 201){
            this.props.history.push('/locationuser');
        }else{
            this.setState({ values, errorPresent: true, errorMessage: "Opps! Something went wrong please try again later" })
        }
    }
    render() {
        const isEmail = (val) => {
            var re = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
            var results = re.test(val);
            if (!results && val.length > 0) {
                this.setState({ errorPresent: true, errorMessage: "Invalid email, please check your email!" })
            } else {
                this.setState({ errorPresent: false })
            }
            return results;
        };

       
        return (

            <Form
                model="signUp"
                onSubmit={(val) => this.handleSubmit(val) }
            >
            <NavbarUser />
                {this.state.errorPresent && (
                    <p style={{ color: "red" }}>{this.state.errorMessage}</p>
                )}
                <div className='field' >
                    <label>Name: </label>
                    <Control.text model="signUp.name" required />
                </div>

                <div className='field' >
                    <label>Last Name:</label>
                    <Control.text model="signUp.last_name" required />
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
                    <Control.text model="signUp.password" required />
                </div>

                <button className='submit'>sign up</button>

            </Form>
        );
    }
}
export default SignUp