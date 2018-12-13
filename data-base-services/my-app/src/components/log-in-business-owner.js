
import React, { Component } from 'react';
import { Form, Control } from 'react-redux-form';
import '../App.css';
import axios from 'axios';
import NavbarLight from '../components/nav-bar'


class LogInBusiness extends Component {
  constructor() {
    super();
    this.state = { values: '', errorMessage: '' }

  }

  async handleSubmit(values) {
    console.log('values :', values);
    var userLoggingIn = await axios.post('http://localhost:3001/logginbusinessowner', values);
    if (userLoggingIn.status === 200) {
      sessionStorage.setItem('token', userLoggingIn.data.token);
      this.props.history.push('/business');
    }

    else {
      this.setState({ values, errorMessage: userLoggingIn.data.message })

    }
  }

  render() {
    return (
      <Form
        model="logIn"
        onSubmit={(val) => this.handleSubmit(val)}
      >
        <NavbarLight />
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

export default LogInBusiness; 