import React, { Component } from 'react';
import { Form, Control } from 'react-redux-form';
import '../App.css';
import axios from 'axios';
import NavbarDisplayRentedUnits from '../components/navbar-rented-units'
class MyForm extends Component {
  constructor() {
    super();
    this.state = { values: '', Loading:false,}
  }


  async handleSubmit(values) {
    this.setState({ values })
    axios.post('http://localhost:3001/business', values)
    this.props.history.push('/location');
    
  }
  
  
  render() {

    return (
      
      <Form
      model="user"
      onSubmit={(val) => this.handleSubmit(val)
      }
        
      >
      <NavbarDisplayRentedUnits/>
      
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
           required
          />
        </div>
        <div className='field' >
          <label>Contact email:</label>
          <Control.text model="user.contactEmail" 
           required
          />
        </div>

        <button className='submit'>Next > </button>
      </Form>
    );
  }
}

export default MyForm;
