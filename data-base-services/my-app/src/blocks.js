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
    this.setState({ locationValues: locationDetails.data.rows });
  }


  async handleSubmit(values) {
    this.setState({ values })
    axios.post('http://localhost:3001/blocks', values);
    this.props.history.push('/unittypes');
    
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
          <Control.select model="blocks.selectLocation"
           validators={{
            required: (val) => val.length,
            length: (val) => val.length > 4
          }} required
          >
            <option>Select Location</option>
            {this.state.locationValues.map(element => {
              return <option>{element.address_line1}</option>
            })}
          </Control.select>
        </div>

        <div className='field' >
          <label>Name: </label>
          <Control.text model="blocks.name" 
          validators={{
            required: (val) => val.length,
            length: (val) => val.length > 4
          }} required
          />
        </div>

        <button className='submit'>Next > </button>
      </Form>
    );
  }
}

export default blocksForm;
