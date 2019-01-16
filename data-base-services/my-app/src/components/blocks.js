import React, { Component } from 'react';
import { Form, Control } from 'react-redux-form';
import '../App.css';
import axios from 'axios';
import NavbarLight from '../components/nav-bar'
class BlocksForm extends Component {
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
        onSubmit={(val) => this.handleSubmit(val)} >
        
        <NavbarLight />

        <div className='field' >
          <label>Select Location</label>
        </div>

        <div className='field'>

          <Control.select model="blocks.selectLocation" required>
            <option>Select Location</option>

            {this.state.locationValues.map(element => {
              return <option>{element.address_line1}</option>
            })}

          </Control.select>
        </div>

        <div className='field' >
          <label>Block Name: </label>
          < Control.text model="blocks.name" placeholder='e.g Block A' required />
        </div>

        <button className='submit'>Next ></button>
      </Form>
    );
  }
}

export default BlocksForm;
