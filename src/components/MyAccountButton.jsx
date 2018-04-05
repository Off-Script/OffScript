import React from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

class MyAccountButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedOut: false
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
  }

  handleLogout(e) {
    e.preventDefault();
    axios.post("/logout")
      .then((res) => {
        this.setState({
          loggedOut: true
        });
        this.renderRedirect();
      })
      .catch((err) => {
        console.log("error logging out", err);
      });

  }

  renderRedirect() {
    if (this.state.loggedOut) {
      this.props.setUserInSession();
      window.location = "/";
    }
  }

  render() {
    return (
      <div id="myAccount">
        <div className="modal-footer transparent">
          <a href="/profile" className="btn waves-effect black">My Account</a>
          <a className="btn waves-effect black" onClick={this.handleLogout}>Logout</a>
        </div>
      </div>
    );
  }

}

module.exports = MyAccountButton;