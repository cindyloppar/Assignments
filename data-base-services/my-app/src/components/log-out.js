import React, { Component } from 'react';
import '../App.css';


class LogOut extends Component {

  componentDidMount() {
   
    sessionStorage.removeItem("token");
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <p>Logging Out</p>
      </div>
    );
  }
}

export default LogOut;