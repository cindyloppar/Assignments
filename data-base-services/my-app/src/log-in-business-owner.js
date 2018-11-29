
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
    console.log('values :', values);
    var userLoggingIn = await axios.post('http://localhost:3001/logginbusinessowner', values);
    this.setState({ values, errorMessage: userLoggingIn.data })
    if (userLoggingIn.data.length <= 0) {
      this.props.history.push('/business');
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
          <Control.text model="logIn.email" required />
        </div>

        <div className='field' >
          <label>Password:</label>
          <Control.text model="logIn.password" required />
        </div>

        <button className='submit' >Log in</button>


      </Form>
    );
  }
}

export default logInBusiness; 