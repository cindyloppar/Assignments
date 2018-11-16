
import React, { Component } from 'react';
import { Form, Control } from 'react-redux-form';
import './App.css';
import axios from 'axios';


class logIn extends Component {
  constructor() {
    super();
    this.state = { values: '', username: '', password: '', errorMessage: '' }

  }

  async handleSubmit(values) {
    console.log("testing")
    var userLoggingIn = await axios.post('http://localhost:3001/login', values);
    console.log('userLoggingIn :', userLoggingIn);
    this.setState({ values, errorMessage: userLoggingIn.data })
    if (userLoggingIn.data.length <= 0) {
      this.props.history.push('/location');
    }
  }

  render() {
    console.log('this.state :', this.state);
    return (
      <Form
        model="log"
        onSubmit={(val) => this.handleSubmit(val)}
      >
        <p>{this.state.errorMessage}</p>
        <div className="field">
          <label>Email </label>
          <Control.text model="log.email"
          />
        </div>

        <div className='field' >
          <label>Password:</label>
          <Control.text model="log.password" />
        </div>

        <button className='submit' >Log in</button>


      </Form>
    );
  }
}

export default logIn; 