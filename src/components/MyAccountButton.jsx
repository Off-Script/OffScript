import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class MyAccountButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedOut: false
    };
    this.clickAccount = this.clickAccount.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
  }

  clickAccount() {
    console.log('inside clickAccount function');
    return <Redirect to={{pathname: "/profile"}} />
  }

  handleLogout() {
    console.log('handling logout now');
    // e.preventDefault();
    axios.post('/logout')
    .then((res) => {
      console.log('successfully logged out', res);
      this.setState({
        loggedOut: true
      })
    })
    .catch((err) => {
       console.log('error logging out', err);
     })

  }

  renderRedirect() {
    if (this.state.loggedOut) {
      this.props.setUserInSession();
      return <Redirect to={{pathname: "/"}} />
    }
  }

  render() {
    return (
      <div id="myAccount">
        {this.renderRedirect()}
        <div className="modal-footer transparent">
          <a className="btn waves-effect black" onClick={this.clickAccount}>My Account</a>
          <a className="btn waves-effect black" onClick={this.handleLogout}>Logout</a>
        </div>
      </div>
    )
  }

}

module.exports = MyAccountButton;