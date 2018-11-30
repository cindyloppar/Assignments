import React, { Component } from 'react';
import { Form, Control } from 'react-redux-form';
import './App.css';
import axios from 'axios';

class unitForm extends Component {
  constructor() {
    super();
    this.state = { values: '', blockValues: [], unitTypeValues: [] }
  }

  async componentDidMount() {
    var blockDetails = await axios.get('http://localhost:3001/blocks');
    var unitTypeDetails = await axios.get('http://localhost:3001/unittypes');    
    console.log('blockDetails :', blockDetails.data.rows);
    console.log('unitTypeDetails :', unitTypeDetails.data.rows);  
    this.setState({ blockValues: blockDetails.data.rows, unitTypeValues: unitTypeDetails.data.rows })
  }

 async handleSubmit(values) {
    this.setState({ values })
    axios.post('http://localhost:3001/units', values)
    this.props.history.push('http://localhost:3001/')
  }

  render() {
    return (

      <Form
        model="units"
        onSubmit={(val) => this.handleSubmit(val)}
      >

      <div className='field' >
          <label>Name: </label>
          <Control.text model="units.name"  required
          />
        </div>

        <div className='field' >
          <label>Select block</label>
        </div>
        
        <div className='selectBlock'>
          <Control.select model="units.selectBlock">
            <option>Select block</option>
            {this.state.blockValues.map(element => {
              return <option>{element.name}</option>
            })}
          </Control.select>
        </div>


        <div className='field' >
          <label>Select unit_type</label>
        </div>
        
        <div className='selectUnitType'>
          <Control.select model="units.selectUnitType" required
          >
            <option>Select unit_type</option>
            {this.state.unitTypeValues.map(element => {
              return <option>{element.name}</option>
            })}
          </Control.select>
        </div>

        <button className='submit'>submit </button>
        
      </Form>
    );
  }
}

export default unitForm;
