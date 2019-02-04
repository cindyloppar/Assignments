import React, { Component } from 'react';
import { Form, Control } from 'react-redux-form';
import '../App.css';
import axios from 'axios';
import NavbarDisplayRentedUnits from '../components/navbar-rented-units';
class MyForm extends Component {
  constructor() {
    super();
    this.state = { values: '', errorPresent: false, errorMessage: "Please check telephone number" }
  }


  async handleSubmit(values) {
    this.setState({ values })
    axios.post('http://localhost:3001/business', values)
    this.props.history.push('/location');

  }


  render() {

    const isEmail = (val) => {
      var re = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
      var results = re.test(val);
      if (!results && val.length > 0) {
        this.setState({ errorPresent: true, errorMessage: "Invalid email, please check your email!" })
      } else {
        this.setState({ errorPresent: false })
      }
      return results;
    };


    // const isValidTel =(validate) =>{
    //   var testDomain = /^(?!:\/\/)([a-zA-Z0-9-]+\.){0,5}[a-zA-Z0-9-][a-zA-Z0-9-]+\.[a-zA-Z]{2,64}?$/gi;
    //   var test = testDomain.test(validate);
    //   console.log('test :', test);
    //   if (!validate) {
    //     this.setState({errorPresent: true, errorMessage: "Invalid phone number, please check"})
    //   }else{
    //     this.setState({errorPresent: false})
    //   }
    //   return test;
    // }

    return (

      <Form
        model="user"
        onSubmit={(val) => this.handleSubmit(val)
        }

      >
        <NavbarDisplayRentedUnits />
        {this.state.errorPresent && (
          <p style={{ color: "red" }}>{this.state.errorMessage}</p>
        )}
        <div className='field' >
          <label>Business name: </label>
          <Control.text model="user.businessName"
            required
          />
        </div>

        <div className='field' >
          <label>Contact name:</label>
          <Control.text model="user.contactName"
            required
          />
        </div>



        <div className='field' >
          <label>Telephone number: </label>
          <Control.text model="user.telephoneNumber"
            // validators={{
            //   required: (val) => val && val.length,
            //   isValidTel,
            // }}
            required />
        </div>
        <div className='field' >
          <label>Contact email:</label>
          <Control.text model="user.contactEmail" validators={{
            required: (val) => val && val.length,
            isEmail,
          }}
            required />
        </div>

        <button className='submit'>Next > </button>
      </Form>
    );
  }
}

export default MyForm;
