import React, { Component } from 'react';
import { Form, Control } from 'react-redux-form';
import '../App.css';
import axios from 'axios';
import NavbarUserDetails from '../components/nav-bar-user-details';
import { connect } from 'react-redux';
import { updateCustomerSearchResults } from '../action-creator';
import jwt_decode from 'jwt-decode';

class LocationUser extends Component {
    constructor() {
        super();
        this.state = {
            values: "", locationValues: [], provinceValues: [], unitTypeValues: [], unitsValues: [],
            searchResults: {
                province: "",
                unitTypeDetails: "",
                locationsSuburb: "",
                unitsDetails: ""
            }
        }
        this.getAllUnits = this.getAllUnits.bind(this);
    }
    async componentDidMount() {
        var provinceDetails = await axios.get('http://localhost:3001/location');
        var validProvinces = [];
        provinceDetails.data.rows.forEach(element => {
            if (validProvinces.indexOf(element.province) < 0) {
                validProvinces.push(element.province);
            }
        });
        this.setState({
            provinceValues: validProvinces
        })
    }
    async getLocationUnitTypes() {
        if (this.props.currentState.suburb.length > 0) {
            var locationDetails = await axios.get('http://localhost:3001/location-unit-types/' + this.props.currentState.province + "/" + this.props.currentState.suburb);
            var validUnitTypes = [];
            locationDetails.data.forEach(element => {
                var elementFound = validUnitTypes.find(item => {
                    return item.id === element.id
                })
                if (elementFound) {
                    validUnitTypes[validUnitTypes.indexOf(elementFound)].units = [...validUnitTypes[validUnitTypes.indexOf(elementFound)].units, element.unitname];
                } else {
                    element.units = [element.unitname]
                    validUnitTypes.push(element)
                }
            });
            this.setState({ unitTypeValues: validUnitTypes })
        }
    }
    async getSuburbs() {
        if (this.props.currentState.province.length > 0) {
            var locationDetails = await axios.get('http://localhost:3001/suburb-for-province/' + this.props.currentState.province);
            this.setState({ locationValues: locationDetails.data })
        }
    }
    getAllUnits(e) {
        var selectedUnit = this.state.unitTypeValues.find(item => {
            return item.id === +e.target.value
        });
        if (selectedUnit) {
            this.setState({ unitsValues: selectedUnit.units })
        }
    }


    async handleSubmit(values) {
        this.setState({ values });
        var jwt = sessionStorage.getItem('token');
        var decoded = jwt_decode(jwt);
        await axios.post('http://localhost:3001/locationuser', {
            email: decoded.email,
            unitDetails: {
                ...this.props.currentState
            }
        })
        this.props.history.push('/userdetails');
    }
    render() {
        return (
            <Form
                model="LocationUser"
                onSubmit={(val) => this.handleSubmit(val)} >

                <NavbarUserDetails />

                <div>
                    <h3>Rent Storage</h3>

                    <div className='field'>

                        <Control.select model="LocationUser.province" required ref="selectedProvince" onClick={() => this.getSuburbs()}>
                            <option>Select Province</option>

                            {this.state.provinceValues.map(element => {
                                return <option >{element}</option>
                            })}

                        </Control.select>
                    </div>


                    <div className='field'>
                        <Control.select model="LocationUser.suburb" onClick={() => this.getLocationUnitTypes()} required >
                            <option>Select Suburb</option>
                            {this.state.locationValues.map(element => {
                                return <option>{element.suburb}</option>
                            })}

                        </Control.select>
                    </div>

                    <div className='field'>
                        <Control.select model="LocationUser.name" onClick={this.getAllUnits} required >
                            <option >Select Unit Type</option>

                            {this.state.unitTypeValues.map(element => {
                                return <option value={element.id}>{element.unittypename}</option>
                            })}

                        </Control.select>
                    </div>

                    <div className='field'>
                        <Control.select model="LocationUser.unitName" required >
                            <option >Select Unit</option>

                            {this.state.unitsValues.map(element => {
                                return <option>{element}</option>
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

const mapStateToProps = (state) => {
    return {
        currentState: state.LocationUser
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LocationUser);
