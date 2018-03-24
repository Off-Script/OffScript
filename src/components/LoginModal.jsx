import React from 'react';
import axios from 'axios';

class LoginModal extends React.Component{
  constructor(props) {
      super(props);
      this.toggle = this.toggle.bind(this);

      this.state = {
        toggle: false,
        errors: {},
        username: '',
        password: '',
        redirectToProfile: false,
        user: {}
      }
    }

  toggle(event) {
    this.setState(prevState => ({
      toggle: !prevState.toggle
    }));

  this.onChange = this.onChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(e) {
    console.log('handling submit now', e);
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
        <a className="btn" onClick={this.toggle}>Login / Signup</a>
        <div className="modal" style={this.state.toggle ? display : hide}>
      <div className="modal-content">
        <div className="input-field col s8">
          <i className="material-icons prefix">account_circle</i>
          <input  id="username" type="text" className="validate" name="username" value={this.state.username} onChange={this.onChange}/>
          <label htmlFor="username">User Name</label>
        </div>
        <div className="input-field col s8">
          <i className="material-icons prefix">vpn_key</i>
          <input id="password" type="password" className="validate" name="password" value={this.state.password} onChange={this.onChange}/>
          <label htmlFor="password">Password</label>
        </div>
        <div className="center input-field col s6">
          <input type="checkbox" className="filled-in" id="filled-in-box" defaultChecked="checked" />
          <label htmlFor="filled-in-box">Remember me</label>
        </div>
        <div className="row input-field col s12">
          <div className="col s6 left-align">
            <a className="modal-trigger" onClick={this.handleShowModal}>Register Now</a>
          </div>
          <div className="col s6 right-align">
             <a>Forgot Password?</a>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a className="btn" onClick={this.handleSubmit}>Submit</a>
      </div>
    </div>
      </div>
    );
  }
}

module.exports = LoginModal;