
import React, { Component } from 'react';
import { Form, Control } from 'react-redux-form';
import './App.css';
import axios from 'axios';


const longEnough = (val) => val && val.length > 8;
class logIn extends Component {
  constructor() {
    super();
    this.state = { values: '', errorMessage: '' }

  }

  async handleSubmit(values) {
    var userLoggingIn = await axios.post('http://localhost:3001/login', values);
    this.setState({ values, errorMessage: userLoggingIn.data })
    if (userLoggingIn.data.length <= 0) {
      this.props.history.push('/locationuser');
    }
  }


  render() {
    return (
      <Form
        model="log"
        onSubmit={(val) => this.handleSubmit(val)}
      >
        <p>{this.state.errorMessage}</p>
        <div className="field">
          <label>Email </label>
          <Control.text model="log.email"
          required
          />
        </div>

        <div className='field' >
          <label>Password:</label>
          <Control.text model="log.password" required />


        </div>

        <button className='submit' >Log in</button>


      </Form>
    );
  }
}

export default logIn; 