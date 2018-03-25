import React from 'react';
import axios from 'axios';

class LoginModal extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        errors: {},
        username: '',
        password: '',
        redirectToProfile: false,
        user: {}
      }
      this.onChange = this.onChange.bind(this);
      this.handleLogin = this.handleLogin.bind(this);
      this.handleRegistration = this.handleRegistration.bind(this);
  }


  handleLogin(e) {
    console.log('handling login now', e);
    e.preventDefault();
    axios.post('/login', {
      username: this.state.username,
      password: this.state.password
    })
    .then((res) => {
      console.log('handling login submit', res);
    })
    .catch((err) => {
       console.log('error handling login submit', err);
     })
  }

  handleRegistration(e) {
    console.log('handling registration now', e);
    e.preventDefault();
    axios.post('/signup', {
      username: this.state.username,
      password: this.state.password
    })
    .then((res) => {
      console.log('handling registration submission', res);
    })
    .catch((err) => {
       console.log('error handling registration submission', err);
     })
  }

  onChange(e) {
    let target = e.target.name;
    this.setState ({
      [ target ]: e.target.value,
      errors: {}
    });
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
        <a className="btn waves-effect black modal-trigger" href="#modal-login">Login / Signup</a>
        <div id="modal-login" className="modal">
          <div className="modal-content">
            <div className="input-field col s8">
              <i className="material-icons prefix black-text">account_circle</i>
              <input id="username" type="text" className="validate black-text" name="username" value={this.state.username} onChange={this.onChange}/>
              <label htmlFor="username">User Name</label>
            </div>
            <div className="input-field col s8">
              <i className="material-icons prefix black-text">vpn_key</i>
              <input id="password" type="password" className="validate black-text" name="password" value={this.state.password} onChange={this.onChange}/>
              <label htmlFor="password">Password</label>
            </div>
            <div className="center input-field col s6">
              <input type="checkbox" id="check-box" defaultChecked="checked" />
              <label htmlFor="check-box">Remember me</label>
            </div>
            <div className="row input-field col s12">
              <div className="col s6">
                <a className="grey-text darken-4-text">Register Now</a>
              </div>
              <div className="col s6">
                 <a className="grey-text darken-4-text">Forgot Password?</a>
              </div>
            </div>
          </div>
          <div className="modal-footer transparent">
            <a className="btn waves-effect black" onClick={this.handleLogin}>Login</a>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = LoginModal;