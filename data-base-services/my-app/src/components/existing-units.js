import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import NavbarDisplayRentedUnits from '../components/navbar-rented-units';

class existingUserUnits extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            units: []
        }
    }

    async componentDidMount() {
        var jwt = sessionStorage.getItem('token');
        var decoded = jwt_decode(jwt);

        var getAvailableDetails = await axios.get('http://localhost:3001/getExistingUnits/' + decoded.email);
        console.log('getAvailaleDetails :', getAvailableDetails);
        this.setState({ units: getAvailableDetails.data });
        if (getAvailableDetails === []) {
            return <p> Sorry all units are rented!!</p>
        }

    }


    render() {

        return (
            <div>
                <NavbarDisplayRentedUnits />

                <table id="customers">
                    <thead>
                        <tr>

                            <th>Business Name</th>
                            <th>Province</th>
                            <th>City</th>
                            <th>Suburb</th>
                            <th>Blocks</th>

                        </tr>
                    </thead>

                    <tbody>
                        {this.state.units.map(singleUserDetails => {
                            return <tr name={`row-${singleUserDetails.id}`} >
                                <td>{singleUserDetails.business_name}</td>
                                <td>{singleUserDetails.province}</td>
                                <td>{singleUserDetails.city}</td>
                                <td>{singleUserDetails.suburb}</td>
                                <td>{singleUserDetails.name}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        searchResults: state.CustomerStore.searchResults
    }
}
export default connect(mapStateToProps)(existingUserUnits);
