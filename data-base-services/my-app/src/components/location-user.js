import React, { Component } from 'react';
import { Form, Control } from 'react-redux-form';
import '../App.css';
import axios from 'axios';
import NavbarUserDetails from '../components/nav-bar-user-details';
import { connect } from 'react-redux';
import { updateCustomerSearchResults } from '../action-creator'

class LocationUser extends Component {
    constructor() {
        super();
        this.state = {
            values: "", locationValues: [], provinceValues: [], unitTypeValues: [],
            searchResults: {
                province: "",
                unitTypeDetails: "",
                locationsSuburb: ""
            }
        }
    }
    async componentDidMount() {
        
        var locationDetails = await axios.get('http://localhost:3001/location');
        var provinceDetails = await axios.get('http://localhost:3001/location');
        var unitTypeDetails = await axios.get('http://localhost:3001/unittypes');
        // if(unitTypeDetails === unitTypeDetails[0]){
            
        // }
        this.setState({
            locationValues: locationDetails.data.rows,
            provinceValues: provinceDetails.data.rows,
            unitTypeValues: unitTypeDetails.data.rows
        })
    }

    async handleSubmit(values) {
        this.setState({ values });
        const getData = await axios.get('http://localhost:3001/locationuser', {
            params: {
                
                ...values
            }
        })
        console.log('getData :', getData);
        this.props.updateCustomerSearchResults(getData.data);
        this.props.history.push('/userdetails');
    }

    render() {
        console.log('this.state :', this.state);
        return (
            <Form
                model="LocationUser"
                onSubmit={(val) => this.handleSubmit(val)} >

                <NavbarUserDetails />

                <div>
                    <h3>Rent Storage</h3>

                    <div className='field'>
                        <Control.select model="LocationUser.province" required >
                            <option>Select Province</option>

                            {this.state.provinceValues.map(element => {
                                return <option >{element.province}</option>
                            })}

                        </Control.select>
                    </div>


                    <div className='field'>
                        <Control.select model="LocationUser.suburb" required >
                            <option>Select Suburb</option>

                            {this.state.locationValues.map(element => {
                                return <option>{element.suburb}</option>
                            })}

                        </Control.select>
                    </div>

                    <div className='field'>
                        <Control.select model="LocationUser.name" required >
                            <option >Select Unit Type</option>

                            {this.state.unitTypeValues.map(element => {
                                return <option>{element.name}</option>
                            })}

                        </Control.select>
                    </div>


                </div>
                <button className='submit'>Next > </button>
            </Form>
        );
    }

}
const mapDispatchToProps = (dispatch) => {
    return {
        updateCustomerSearchResults: (data) =>
            dispatch(updateCustomerSearchResults(data))
    }
}
export default connect(null, mapDispatchToProps)(LocationUser);
