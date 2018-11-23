import React, { Component } from 'react';
import { Form, Control } from 'react-redux-form';
import './App.css';
import axios from 'axios';

class MainScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { values: '' }
    }
    async handleSubmit(values) {
        this.setState({ values });
        this.props.history.push('/signup');

    }

    render() {

        return (
            <Form
            model="signUp"
            onSubmit={(val) => this.handleSubmit(val) }
            >
            <div>

                <h3 className="welcome">Welcome to Lauper Rental Storage</h3>

                <div className="box" style={{ marginTop: '8%', color: '#f2f2f2', textDecoration: 'none' }}>
                    <button className='submit' >Rent Storage</button>
                    <button className='submit'>Business Owner</button>
                </div>
            </div>
            </Form>
        );
    }

}
export default MainScreen;