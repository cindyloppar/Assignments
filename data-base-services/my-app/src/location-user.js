import React, { Component } from 'react';
import { Form, Control } from 'react-redux-form';
import './App.css';
import axios from 'axios';

class LocationUser extends Component {
    constructor() {
        super();
        this.state = { values: '' }
    }


    render() {
        return (
            <div>
                <h1>Locations</h1>


                <div>
                    <h1>
                        Durban
                    </h1>
                </div>
                <div>
                    <ul>
                        <li>
                            Berea
                        </li>
                        <li>
                            Durban City
                        </li>
                        <li>
                            Glen Anil
                        </li>
                        <li>
                            Springfield
                        </li>
                        <li>
                            Waterfall
                        </li>
                    </ul>
                </div>


                <div>

                    <h1>Johannesburg</h1>
                </div>
                <div>
                    <ul>
                        <li>
                            Boksburg
                        </li>
                        <li>
                            Bryanston
                        </li>
                        <li>
                            Edenvale
                        </li>
                        <li>
                            Johannesburg City
                            </li>
                        <li>
                            Kempton Park
                        </li>
                        <li>
                            Midrand
                        </li>
                        <li>
                            Randburg
                        </li>
                        <li>
                            Sunninghill
                        </li>
                    </ul>
                </div>
                <div>
                    <h1>
                        Pretoria
                    </h1>
                </div>
                <div>
                    <ul>
                        <li>
                            Brooklyn
                        </li>
                        <li>
                            Centurion
                        </li>
                        <li>
                            Irene
                        </li>
                        <li>
                            Pretoria West
                        </li>
                        <li>
                            Silver Lakes
                        </li>
                    </ul>
                </div>



            </div>
        );
    }

}
export default LocationUser;