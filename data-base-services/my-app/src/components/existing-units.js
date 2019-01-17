import React from 'react';
// import { Navbar } from 'styled-navbar-component/lib/components/Navbar';
import NavbarUser from './navbar-user';
import { connect } from 'react-redux';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

class userDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            units: []
        }
    }

    async componentDidMount() {
        var jwt = sessionStorage.getItem('token');
        var decoded = jwt_decode(jwt);
        var getRentedDetails = await axios.get('http://localhost:3001/getExistingUnits/' + decoded.email);
        console.log('getRentedDetails :', getRentedDetails);
        this.setState({ units: getRentedDetails.data })
    }


    render() {
       
        return (
            <div>
                <NavbarUser />

                <table id="customers">
                    <thead>
                        <tr>

                            <th>Business Name</th>
                            <th>Province</th>
                            <th>City</th>
                            <th>Suburb</th>
                            <th>Unit_Type</th>

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
export default connect(mapStateToProps)(userDetails);
