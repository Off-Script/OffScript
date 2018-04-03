import React from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

class LoginModal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      errors: "",
      username: "",
      password: "",
      isLoggedIn: false,
      redirectToProfile: false,
      user: {},
      login: {}
    };
    this.onChange = this.onChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
  }


  handleLogin(e) {
    e.preventDefault();
    axios.post("/login", {
      username: this.state.username,
      password: this.state.password
    })
      .then((res) => {
        this.setState({
          isLoggedIn: true,
          redirectToProfile: true,
          user: res.data.user
        });
        this.props.setUserInSession(res.data.user);
      })
      .catch((err) => {
        this.setState({
          login: {
            error: "Username or password incorrect, please try again"
          },
          isLoggedIn: false,
          redirectToProfile: false
        });
      });
  }

  handleRegistration(e) {
    console.log("handling registration now");
    e.preventDefault();
    axios.post("/signup", {
      username: this.state.username,
      password: this.state.password
    })
      .then((res) => {
        console.log("handling registration submission", res);
        this.setState({
          redirectToProfile: true
        });
      })
      .catch((err) => {
        console.log("error handling registration submission", err.response.data);
        let message;
        if (err.response.data.error) {
          message = err.response.data.error;
        } else {
          message = err.response.data.errors.password || err.response.data.errors.username;
        }
        this.setState({
          errors: {
            error: message
          },
          isLoggedIn: false,
          redirectToProfile: false
        });
      });
  }

  onChange(e) {
    let target = e.target.name;
    this.setState ({
      [ target ]: e.target.value,
      errors: {}
    });
  }

  render() {
    let show = Object.keys(this.state.errors).length ? { display: "block" } : { display: "none" };
    let showLoginFailure = Object.keys(this.state.login).length ? { display: "block" } : { display: "none" };
    let errorMessage = this.state.errors.error;
    let loginError = this.state.login.error;
    // if (this.state.errors.password) {
    //   errorMessage = 'Password incorrect, try again';
    // } else if (this.state.errors.username) {
    //   errorMessage = 'Username incorrect, try again';
    // } else {
    //   errorMessage = this.state.errors.error;
    // }
    const redirectToProfile = this.state.redirectToProfile;
    if (redirectToProfile) {
      return(<Redirect to={{ pathname: "/profile", user: this.state.user }}/>);
    }
    const display = {
      display: "block"
    };
    const hide = {
      display: "none"
    };
    return (
      <div id="login">
        <div id="alert-error" style={showLoginFailure}>
          <p>{loginError}</p>
        </div>
        <a className="btn waves-effect black modal-trigger" href="#modal-login">Login / Signup</a>
        <div id="modal-login" className="modal">
          <div id="alert-error" style={show}>
            <p>{errorMessage}</p>
          </div>
          <div className="modal-content">
            <div className="input-field col s8">
              <i className="material-icons prefix black-text">account_circle</i>
              <input id="username" type="text" className="validate black-text" name="username" value={this.state.username} onChange={this.onChange} errortext={this.state.errors.username}/>
              <label htmlFor="username">User Name</label>
            </div>
            <div className="input-field col s8">
              <i className="material-icons prefix black-text">vpn_key</i>
              <input id="password" type="password" className="validate black-text" name="password" value={this.state.password} onChange={this.onChange} errortext={this.state.errors.password}/>
              <label htmlFor="password">Password</label>
            </div>
            <div className="center input-field col s6">
              <input type="checkbox" id="check-box" defaultChecked="" />
              <label htmlFor="check-box">Remember me</label>
            </div>
            <div className="row input-field col s12">
              <div className="col s6">
                <a className="left black-text darken-4-text" onClick={this.handleRegistration}>Register Now</a>
              </div>
              <div className="col s6">
                <a className="black-text darken-4-text">Forgot Password?</a>
              </div>
            </div>
          </div>
          <div className="modal-footer transparent">
            <a className="btn waves-effect black modal-action modal-close" onClick={this.handleLogin}>Login</a>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = LoginModal;