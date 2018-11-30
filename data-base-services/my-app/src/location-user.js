import React, { Component } from 'react';
import { Form, Control } from 'react-redux-form';
import './App.css';
import axios from 'axios';

class LocationUser extends Component {
    constructor() {
        super();
        this.state = { values: '', locationValues: [], provinceValues: [] }
    }
    async componentDidMount() {
        var locationDetails = await axios.get('http://localhost:3001/location');
        var provinceDetails = await axios.get('http://localhost:3001/location');
        this.setState({ locationValues: locationDetails.data.rows, provinceValues: provinceDetails.data.rows })
    }

    render() {
        return (
            <div>
                <h2>Select Location</h2>

                <div className='field'>
                    <Control.select model="location.selectProvince" required  >
                        <option>Select Province</option>
                        {this.state.provinceValues.map(element => {
                            return <option>{element.province}</option>
                        })}

                    </Control.select>
                </div>


                <div className='field'>
                    <Control.select model="location.selectLocation" required >
                        <option>Select Suburb</option>

                        {this.state.locationValues.map(element => {
                            return <option>{element.suburb}</option>
                        })}

                    </Control.select>
                </div>
                <button className="submit">Next ></button>

            </div>
        );
    }

}
export default LocationUser;