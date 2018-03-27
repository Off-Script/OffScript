import React from 'react';
import axios from 'axios';

class MyAccountButton extends React.Component {

  constructor(props) {
    super(props);
    this.clickAccount = this.clickAccount.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  clickAccount() {
    console.log('inside clickAccount function');
  }

  handleLogout() {
    console.log('inside handleLogout function');
  }

  render() {
    return (
      <div id="myAccount">
        <div className="modal-footer transparent">
          <a className="btn waves-effect black" onClick={this.clickAccount}>My Account</a>
          <a className="btn waves-effect black" onClick={this.handleLogout}>Logout</a>
        </div>
      </div>
    )
  }

}

module.exports = MyAccountButton;