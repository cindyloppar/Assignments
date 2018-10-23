import React, { Component } from 'react';
import { Form, Control } from 'react-redux-form';
import './App.css';
import axios from 'axios';

class unitForm extends Component {
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
          <label>Name: </label>
          <Control.text model="user.businessName" />
        </div>
        <button>Submit</button>
      </Form>
    );
  }
}

export default unitForm;
