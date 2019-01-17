import React, { Component } from 'react';
import { Form, Control } from 'react-redux-form';
import '../App.css';
import axios from 'axios';
import {connect} from 'react-redux';
import { updateBusinessSearchResults } from '../action-creator';
import NavbarDisplayRentedUnits from '../components/navbar-rented-units'

class LocationForm extends Component {
    constructor() {
        super();
        this.state = { values: '', businessValues: [], provinceValues: [],
        searchResults: {
            province: "",
            unitTypeDetails: "",
            locationsSuburb: "",
            unitsDetails: ""
        }
    }

    }

    async componentDidMount() {
        var getToken = sessionStorage.getItem("token");
        var businessDetails = await axios.get('http://localhost:3001/business', {
            headers: {
                KEJWTNTWE: getToken
            }
        });
        console.log('businessDetails :', businessDetails);
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

                <NavbarDisplayRentedUnits />

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
const mapDispatchToProps = (dispatch) => {
    return {
        updateBusinessSearchResults: (data) =>
            dispatch(updateBusinessSearchResults(data))
    }
}

const mapStateToProps = (state) => {
    return {
        currentState: state.LocationForm
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LocationForm);
