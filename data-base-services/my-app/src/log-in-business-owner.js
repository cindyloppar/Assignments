
import React, { Component } from 'react';
import { Form, Control } from 'react-redux-form';
import './App.css';
import axios from 'axios';


class logInBusiness extends Component {
  constructor() {
    super();
    this.state = { values: '', errorMessage: '' }

  }

  async handleSubmit(values) {
    console.log("testing")
    var userLoggingIn = await axios.post('http://localhost:3001/login', values);
    console.log('userLoggingIn :', userLoggingIn);
    this.setState({ values, errorMessage: userLoggingIn.data })
    if (userLoggingIn.data.length <= 0) {
      this.props.history.push('/locationuser');
    }
  }

  render() {
    return (
      <Form
        model="logIn"
        onSubmit={(val) => this.handleSubmit(val)}
      >
        <p>{this.state.errorMessage}</p>
        <div className="field">
          <label>Email </label>
          <Control.text model="logIn.email"
            validators={{
              required:(val) => val.length,
              length:(val) => val.length > 4
            }} required />
        </div>

        <div className='field' >
          <label>Password:</label>
          <Control.text model="logIn.password" validators={{
            required: (val) => val.length,
            length: (val) => val.length > 4
          }} required />


        </div>

        <button className='submit' >Log in</button>


      </Form>
    );
  }
}

export default logInBusiness; 