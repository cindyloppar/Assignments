import React from 'react';
// import { Navbar } from 'styled-navbar-component/lib/components/Navbar';
import NavbarUserDetails from './navbar-user';
import { connect } from 'react-redux';

class display extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        if (this.props.searchResults.length <= 0) {
            this.props.history.push("/")
        }
        return (
            <div>
                <NavbarUserDetails />

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
                        {this.props.searchResults.map(singleUserDetails => {
                            return <tr name={`row-${singleUserDetails.id}`} >
                                <td>{singleUserDetails.business_name}</td>
                                <td>{singleUserDetails.province}</td>
                                <td>{singleUserDetails.city}</td>
                                <td>{singleUserDetails.suburb}</td>
                                <td>{singleUserDetails.unitname}</td>
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
export default connect(mapStateToProps)(display);
