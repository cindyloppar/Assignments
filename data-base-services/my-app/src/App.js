import React, { Component } from 'react';
import { Form, Control} from 'react-redux-form';
import './App.css';

class MyForm extends Component {

  handleSubmit(values) {
    console.log(values);
  }

  render() {
    return (
      <Form
        model="user"
        onSubmit={(val) => this.handleSubmit(val)}
      >
        <label>Business Name</label>
        <Control.text model="user.businessName"
        />

        <label>
          <Control.text model="user.contactName" />
          Contact Name
      </label>

        <label>
          <Control.text model="user.telephoneNumber" />
          Telephone Number
      </label>

        <label>
          <Control.text model="user.contactEmail" />
          Contact Email
      </label>


        <button>Submit</button>
      </Form>
    );
  }
}

export default MyForm;
