import React, { Component } from 'react';
import { Form, Control } from 'react-redux-form';
import './App.css';
import axios from 'axios';

class MainScreen extends Component {
    constructor() {
        super();
        this.state = { values: '' }
    }
    async handleSubmit(values) {
        this.setState({ values })
        this.props.history.push('/location');
        
      }

    render() {
        return (
            <div>
                <header>
                    <table>
                        <tbody>
                            <td>
                                <nav className='navigation'>
                                    <ul>
                                    <li className='menu-item'>
                                    <span>
                                    <a href='/locationuser'>Location</a>

                                    </span>
                                    </li>
                                    </ul>
                                    
                                </nav>
                            </td>
                        </tbody>
                    </table>
                </header>
                
                <button className='submit'>Rent Storage</button>
                    <button className='Next'>Business Owner</button>
                
            </div>
        );
    }

}
export default MainScreen;