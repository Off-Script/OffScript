import React from 'react';

class LoginModal extends React.Component{
  constructor(props) {
      super(props);
      this.toggle = this.toggle.bind(this);

      this.state = {
        toggle: false
      }
    }

  toggle(event) {
    this.setState(prevState => ({
      toggle: !prevState.toggle
    }));
  }

  render() {
    const display = {
      display: 'block'
    };
    const hide = {
      display: 'none'
    };
    return (
      <div id="login">
        <a className="btn" onClick={this.toggle}>Login / Signup</a>
        <div className="modal" style={this.state.toggle ? display : hide}>
      <div className="modal-content">
        <div className="input-field col s8">
          <i className="material-icons prefix">account_circle</i>
          <input  id="username" type="text" className="validate"/>
          <label htmlFor="username">User Name</label>
        </div>
        <div className="input-field col s8">
          <i className="material-icons prefix">vpn_key</i>
          <input id="password" type="password" className="validate"/>
          <label htmlFor="password">Password</label>
        </div>
        <div className="center input-field col s6">
          <input type="checkbox" className="filled-in" id="filled-in-box" defaultChecked="checked" />
          <label htmlFor="filled-in-box">Remember me</label>
        </div>
        <div className="row input-field col s12">
          <div className="col s6 left-align">
            <a className="modal-trigger " onClick={this.handleShowModal} >Register Now</a>
          </div>
          <div className="col s6 right-align">
             <a>Forgot Password?</a>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a className="btn" onClick={this.toggle}>Submit</a>
      </div>
    </div>
      </div>
    );
  }
}

module.exports = LoginModal;