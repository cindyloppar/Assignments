import React, { Component } from 'react';
import { Form, Control } from 'react-redux-form';
import './App.css';
import axios from 'axios';

class MyForm extends Component {
  constructor() {
    super();
    this.state = { values: '' }
  }



  async handleSubmit(values) {
    this.setState({ values })
    axios.post('http://localhost:3001/business', values)
  }


  render() {
    return (

      <Form
        model="user"
        onSubmit={(val) => this.handleSubmit(val)}
      
      >
        <div className='field' >
          <label>Business name: </label>
          <Control.text model="user.businessName" />
        </div>

        <div className='field' >
          <label>Contact name:</label>
          <Control.text model="user.contactName" />
        </div>

        <div className='field' >
          <label>Telephone number: </label>
          <Control.text model="user.telephoneNumber" />
        </div>
        <div className='field' >
          <label>Contact email:</label>
          <Control.text model="user.contactEmail" />
        </div>

        <button className='next'>Next > </button>
        {/* <button className='next'>Next</button> */}
      </Form>
    );
  }
}

export default MyForm;
