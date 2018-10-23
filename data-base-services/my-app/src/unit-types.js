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
          <label>Name:</label>
          <Control.text model="user.locationName" />
        </div>
        <div>
          <label className='selectComp'>Select your unit size</label>
        </div>
        <div className='selectOption'>
          <Control.select model=".selectSize">
            <option>Length</option>
            <option value="ff0000">1</option>
            <option value="00ff00">3</option>
            <option value="0000ff">6</option>
            <option value="0000ff">9</option>
            <option value="0000ff">12</option>
          </Control.select>
        </div>

        <div className='selectOption'>
          <Control.select model=".selectSize">
            <option>Width</option>
            <option value="ff0000">1</option>
            <option value="00ff00">3</option>
            <option value="0000ff">6</option>
            <option value="0000ff">9</option>
            <option value="0000ff">12</option>
          </Control.select>
        </div>

        <div className='selectOption'>
          <Control.select model=".selectSize">
            <option>height</option>
            <option value="ff0000">1</option>
            <option value="00ff00">3</option>
            <option value="0000ff">6</option>
            <option value="0000ff">9</option>
            <option value="0000ff">12</option>
          </Control.select>
        </div>

        <div>
          <label className='appComp' >Approximate Unit Dimensions: </label>
        </div>

        <div>
          <label>meters wide </label>
          <label>meters deep</label>
          <label>meters high </label>
        </div>
        <div>
          <label>Recommended for: </label>
        </div>
        <button>Select></button>
      </Form>
    );
  }
}

export default unitForm;
