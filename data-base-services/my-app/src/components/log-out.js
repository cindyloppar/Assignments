import React, { Component } from 'react';
import '../App.css';
// import { Auth } from "aws-amplify";


class LogOut extends Component {

  componentDidMount() {
    //  await Auth.signOut();
    // userHasAuthenticated(false);
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