import React, { Component } from 'react';
import './App.css';

class MainScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { values: '', val: '' }
    }
    async handleSubmit(values) {
        this.props.history.push(values);
    }
  
    render() {

        return (
            <div>

                <h3 className="welcome">Welcome to Rental Storage</h3>

                <div className="box" style={{ marginTop: '8%', color: '#f2f2f2', textDecoration: 'none' }}>
                    <button onClick={()=> this.handleSubmit("/signup")} className='submit'>Rent Storage</button>
                    <button onClick={()=> this.handleSubmit("/signupbusinessowner")} className='submit'>Business Owner</button>
                </div>
            </div>
        );
    }

}
export default MainScreen;