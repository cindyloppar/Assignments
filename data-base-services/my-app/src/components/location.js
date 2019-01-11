import React, { Component } from 'react';
import { Form, Control } from 'react-redux-form';
import '../App.css';
import axios from 'axios';
import NavbarLight from '../components/nav-bar'

class LocationForm extends Component {
    constructor() {
        super();
        this.state = { values: '', businessValues: [], provinceValues: [] }

    }

    async componentDidMount() {
        var getToken = sessionStorage.getItem("token")
        var businessDetails = await axios.get('http://localhost:3001/business', {
            headers: {
                KEJWTNTWE: getToken
            }
        });
        this.setState({ businessValues: businessDetails.data.rows })
    }

    async handleSubmit(values) {
        this.setState({ values });
        axios.post('http://localhost:3001/location', values);
        this.props.history.push('/blocks');

    }

    render() {
        return (

            <Form
                model="location"
                onSubmit={(val) => this.handleSubmit(val)} >

                <NavbarLight />

                <div className='field' >
                    <label>Select Business</label>
                </div>

                <div className='field'>
                    <Control.select model="location.selectBusiness"
                        required
                    >
                        {this.state.businessValues.map(element => {
                            return <option>{element.business_name}</option>
                        })}
                    </Control.select>
                </div>

                <div className='field' >
                    <label>Address line 1 </label>
                    < Control.text model='location.address_line1' required />
                </div>

                <div className='field' >
                    <label>Address line 2 </label>
                    < Control.text model='location.address_line2' required />
                </div>


                <div className='field' >
                    <label>City</label>
                    < Control.text model='location.city' required />
                </div>

                <div className='field' >
                    <label>Suburb</label>
                    < Control.text model='location.suburb' required />
                </div>

                <div className='field' >
                    <label>Province </label>
                    < Control.text model='location.province' required />
                </div>

                <button className='submit'>Next > </button>
            </Form>
        );
    }
}

export default LocationForm;
