import React, { Component } from 'react';
import { Form, Control } from 'react-redux-form';
import './App.css';
import axios from 'axios';

class LocationUser extends Component {
    constructor() {
        super();
        this.state = { values: '',  locationValues: [] }
    }
    async componentDidMount() {
        var locationDetails = await axios.get('http://localhost:3001/location');
        this.setState({ locationValues: locationDetails.data.rows })
    }

    render() {
        return (
            <div>
             <h2>Select Location</h2>
             <div className='field'>
                    <Control.select model="location.selectLocation" required
                    >

                     {this.state.locationValues.map(element => {
                            return <option>{element.address_line1}</option>
                        })}

                       
                    </Control.select>
                    </div>
            </div>
        );
    }

}
export default LocationUser;