import React, { Component } from 'react';
import { Form, Control } from 'react-redux-form';
import jwtDecode from 'jwt-decode';
import '../App.css';
import axios from 'axios';
import NavbarDisplayRentedUnits from '../components/navbar-rented-units';
class MyForm extends Component {
  constructor() {
    super();
    this.state = { values: '', errorPresent: false, errorMessage: "Please check telephone number" }
  }


  async handleSubmit(values) {
    this.setState({ values })
    var token = sessionStorage.getItem("token");
    var userDetails = jwtDecode(token);
    axios.post('http://localhost:3001/business', { ...values, userEmail: userDetails.email })
    this.props.history.push('/location');

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
        model="user"
        onSubmit={(val) => this.handleSubmit(val)
        }

      >
        <NavbarDisplayRentedUnits />
        {this.state.errorPresent && (
          <p style={{ color: "red" }}>{this.state.errorMessage}</p>
        )}
        <div className='field' >
          <label>Business name: </label>
          <Control.text model="user.businessName"
            required
          />
        </div>

        <div className='field' >
          <label>Contact name:</label>
          <Control.text model="user.contactName"
            required
          />
        </div>



        <div className='field' >
          <label>Telephone number: </label>
          <Control.text model="user.telephoneNumber"
            required />
        </div>
        <div className='field' >
          <label>Contact email:</label>
          <Control.text model="user.contactEmail" validators={{
            required: (val) => val && val.length,
            isEmail,
          }}
            required />
        </div>

        <button className='submit'>Next > </button>
      </Form>
    );
  }
}

export default MyForm;
