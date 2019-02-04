import React, { Component } from 'react';
import { Form, Control } from 'react-redux-form';
import '../App.css';
import axios from 'axios';
import NavbarLight from '../components/nav-bar'
class UnitTypesForm extends Component {
  constructor() {
    super();
    this.state = { values: '' }
  }



  async handleSubmit(values) {
    this.setState({ values })
    axios.post('http://localhost:3001/unittypes', values)
    this.props.history.push('/units');

  }

  render() {
    return (

      <Form
        model="unitTypes"
        onSubmit={(val) => this.handleSubmit(val)} >

        <NavbarLight />

        <div className='field' >
          <label>Unit type Name:</label>
          < Control.text model="unitTypes.name" placeholder=" e.g Garage " required />
        </div>

        <div>
          <label className='selectComp'>Select your unit size</label>

        </div>

        <div>
          < Control.text model="unitTypes.length" required />
        </div>

        <div>
          < Control.text model="unitTypes.width" required />
        </div>

        <div className='field'>
          < Control.text model="unitTypes.height" required />
        </div>

        <div>
          <label className='appComp'>Approximate Unit Dimensions: </label>
        </div>

        <div>
          <label>meters wide </label>
          <label>meters deep</label>
          <label>meters high </label>
        </div>

        <div>
          <label>Recommended for: </label>
        </div>

        <button className='submit'>Next > </button>

      </Form>
    );
  }
}

export default UnitTypesForm;
