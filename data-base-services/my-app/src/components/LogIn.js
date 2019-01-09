
import React, { Component } from 'react';
import { Form, Control } from 'react-redux-form';
import '../App.css';
import axios from 'axios';
import NavbarUser from '../components/navbar-user'


const longEnough = (val) => val && val.length > 8;
class LogIn extends Component {
  constructor() {
    super();
    this.state = { values: '', errorMessage: '' }

  }

  async handleSubmit(values) {
    
    var userLoggingIn = await axios.post('http://localhost:3001/login', values);
    if (userLoggingIn.status === 200) {
      sessionStorage.setItem('token', userLoggingIn.data.token);
      this.props.history.push('/locationuser');
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
        <NavbarUser />

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


      </Form >
    );
  }
}

export default LogIn; 