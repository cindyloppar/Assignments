import React, { Component } from 'react';
import { Form, Control } from 'react-redux-form';
import './App.css';
import axios from 'axios';

class locationForm extends Component {
    constructor() {
        super();
        this.state = { values: '', businessValues: [] }

    }

    async componentDidMount() {
        var businessDetails = await axios.get('http://localhost:3001/business');
        this.setState({ businessValues: businessDetails.data.rows })
    }

    async handleSubmit(values) {
        this.setState({ values });
        axios.post('http://localhost:3001/location', values);
        this.props.history.push('/blocks');

    }

    selectCountry(val) {
        this.setState({ country: val });
    }

    selectRegion(val) {
        this.setState({ region: val });
    }

    render() {
        return (

            <Form
                model="location"
                onSubmit={(val) => this.handleSubmit(val)}

            >

                <div className='field' >
                    <label>Find your store </label>
                </div>


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
                    <Control.text model='location.address_line1'
                         required
                    />
                </div>

                <div className='field' >
                    <label>Address line 2 </label>
                    <Control.text model='location.address_line2'
                        required
                    />

                </div>


                <div className='field' >
                    <label>City</label>
                    <Control.text model='location.city'
                        required
                    />

                </div>

                <div className='field' >
                    <label>Suburb</label>
                    <Control.text model='location.suburb'
                         required
                    />
                </div>

                <button className='submit'>Next > </button>
            </Form>
        );
    }
}

export default locationForm;
