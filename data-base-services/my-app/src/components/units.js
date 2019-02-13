import React, { Component } from 'react';
import { Form, Control } from 'react-redux-form';
import '../App.css';
import axios from 'axios';
import NavbarLight from '../components/nav-bar';
import jwtDecode from 'jwt-decode';

class UnitForm extends Component {
  constructor() {
    super();
    this.state = { values: '', blockValues: [], unitTypeValues: [] }
  }

  async componentDidMount() {
    var blockDetails = await axios.get('http://localhost:3001/blocks');
    var unitTypeDetails = await axios.get('http://localhost:3001/unittypes');
    this.setState({ blockValues: blockDetails.data.rows, unitTypeValues: unitTypeDetails.data.rows })
  }

  async handleSubmit(values) {
    this.setState({ values })
    var token = sessionStorage.getItem("token");
    var userDetails = jwtDecode(token);
    axios.post('http://localhost:3001/units', {...values, userEmail: userDetails.email})
    this.props.history.push('/showavailableunitsdetails')
  }

  render() {
    return (

      <Form
        model="units"
        onSubmit={(val) => this.handleSubmit(val)} >

        <NavbarLight />

        <div className='field' >
          <label>Unit Name: </label>
          < Control.text model="units.name" placeholder=" e.g unit 7" required />
        </div>

        <div className='field' >
          <label>Select block</label>
        </div>

        <div className='field'>
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

        <div className='field'>
          <Control.select model="units.selectUnitType" required >
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

export default UnitForm;
