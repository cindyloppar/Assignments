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
      var businessDetails =  await axios.get('http://localhost:3001/business');
      console.log('businessDetails :', businessDetails);
        this.setState({businessValues:businessDetails.data.rows})
    }

    async handleSubmit(values) {
        this.setState({ values });
        axios.post('http://localhost:3001/location', values);
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
                <div className='selectBusiness'>
                    <Control.select model="location.selectBusiness">
                        <option>Select Business</option>
                        {this.state.businessValues.map(element =>{
                            return<option>{element.business_name}</option>
                        })}
                    </Control.select>
                </div>

                <div className='field' >
                    <label>Address line 1 </label>
                    <Control.text model='location.address_line1' />
                </div>

                <div className='field' >
                    <label>Address line 2 </label>
                    <Control.text model='location.address_line2' />

                </div>

                <div className='field' >
                    <label>Suburb</label>
                    <Control.text model='location.suburb' />
                </div>

                <div className='field' >
                    <label>Country</label>
                </div>
                <div className='selectCountry'>
                    <Control.select model="location.country">
                        <option>Select Country</option>
                        <option value="South Africa">South Africa</option>
                        <option value="America">America</option>
                    </Control.select>
                </div>

                <div className='field' >
                    <label>Region</label>
                </div>
                <div className='selectRegion'>
                    <Control.select model="location.region">
                        <option>Select Region</option>
                        <option value="Bloemfontein">Bloemfontein</option>
                        <option value="Cape Town">Cape Town</option>
                        <option value="Durban">Durban</option>
                        <option value="Johannesburg">Johannesburg</option>
                        <option value="Pretoria">Pretoria</option>
                    </Control.select>
                </div>

                <div className='field' >
                    <label>Store</label>
                </div>
                <div className='selectStore'>
                    <Control.select model="location.store">
                        <option>Select Store</option>
                        <option value="Boksburg">Boksburg</option>
                        <option value="Fourways">Fourways</option>
                        <option value="Edenvale">Edenvale</option>
                        <option value="Johannesburg">Johannesburg City</option>
                        <option value="Kempton park">Kempton park</option>
                    </Control.select>
                </div>
                <button className='submit'>submit > </button>
            </Form>
        );
    }
}

export default locationForm;
