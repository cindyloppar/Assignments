import React, { Component } from 'react';
import { Form, Control } from 'react-redux-form';
import './App.css';
import axios from 'axios';

class blocksForm extends Component {
  constructor() {
    super();
    this.state = { values: '', locationValues: [] }
  }


  async componentDidMount() {
    var locationDetails = await axios.get('http://localhost:3001/location');
    console.log('locationDetails :', locationDetails.data.rows);
    this.setState({ locationValues: locationDetails.data.rows })
  }


  async handleSubmit(values) {
    this.setState({ values })
    axios.post('http://localhost:3001/blocks', values)
  }

  render() {
    return (

      <Form
        model="blocks"
        onSubmit={(val) => this.handleSubmit(val)}
      >

        <div className='field' >
          <label>Select Business</label>
        </div>
        
        <div className='selectLocation'>
          <Control.select model="blocks.selectLocation">
            <option>Select Location</option>
            {this.state.locationValues.map(element => {
              return <option>{element.address_line1}</option>
            })}
          </Control.select>
        </div>

        <div className='field' >
          <label>Name: </label>
          <Control.text model="blocks.blockName" />
        </div>

        <button className='submit'>submit > </button>
      </Form>
    );
  }
}

export default blocksForm;
