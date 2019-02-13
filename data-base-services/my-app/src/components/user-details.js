import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import NavBarUsersTable from './navbar-users-table';


class display extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            units: []
        }
    }


    async componentDidMount() {
        var jwt = sessionStorage.getItem('token');
        var decoded = jwt_decode(jwt);
        var getRentedDetails = await axios.get('http://localhost:3001/getAllUserUnits/' + decoded.email);
        this.setState({ units: getRentedDetails.data });
        if (getRentedDetails === []) {
            return <p> Sorry no available units!!</p>
        }
    }

    render() {
       
        return (
            <div>
                <NavBarUsersTable/>

                <table id="customers">
                    <thead>
                        <tr>

                            <th>Business Name</th>
                            <th>Province</th>
                            <th>City</th>
                            <th>Suburb</th>
                            <th>Units</th>
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
                                <td>{singleUserDetails.unittypesname}</td>
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
export default connect(mapStateToProps)(display);
