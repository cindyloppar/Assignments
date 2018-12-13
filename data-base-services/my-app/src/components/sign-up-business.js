import React, { Component } from 'react';
import { Form, Control } from 'react-redux-form';
import '../App.css';
import axios from 'axios';
import NavbarLight from '../components/nav-bar';


class SignUpBusiness extends Component {
    constructor() {
        super()
        this.state = { values: '', errorMessage: "", errorPresent: false }

    }

    async handleSubmit(values) {
        var checkUserEmail = await axios.post('http://localhost:3001/signupbusinessowner', values);
        console.log(checkUserEmail);
        if (checkUserEmail.status === 200) {
            this.setState({ values, errorPresent: true, errorMessage: checkUserEmail.data })
        } else if (checkUserEmail.status === 201) {
            this.props.history.push('/logginbusinessowner');
        } else {
            this.setState({ values, errorPresent: true, errorMessage: checkUserEmail.data })
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

        return (

            <Form
                model="signUpBusiness"
                onSubmit={(val) => this.handleSubmit(val)}
            >
                <NavbarLight />
                {this.state.errorPresent && (
                    <p style={{ color: "red" }}>{this.state.errorMessage}</p>
                )}
                <div className='field' >
                    <label>Name: </label>
                    <Control.text model="signUpBusiness.name"
                        required />
                </div>

                <div className='field' >
                    <label>Last Name:</label>
                    <Control.text model="signUpBusiness.last_name" required />
                </div>

                <div className='field' >
                    <label>Email:</label>
                    <Control.text model="signUpBusiness.email" validators={{
                        required: (val) => val && val.length,
                        isEmail,
                    }} required />
                </div>

                <div className='field' >
                    <label> Password: </label>
                    <Control.text model="signUpBusiness.password" required />
                </div>

                <button className='submit'>sign up</button>

            </Form>
        );
    }
}
export default SignUpBusiness