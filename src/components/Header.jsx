import React from 'react';
import LoginModal from './LoginModal';
import MyAccountButton from './MyAccountButton';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      isLoggedOut: false
    }
  }

  componentDidUpdate() {
    let loggedin = localStorage.getItem('loggedIn');
    if (loggedin) {
      this.setState({
        isLoggedIn: true
      });
    }
  }

  render() {
    const button = this.props.userLoggedIn ? (<li><MyAccountButton setUserInSession={this.props.setUser.bind(this)}/></li>) : (<li><LoginModal setUserInSession={this.props.setUser.bind(this)}/></li>);
    return (
      <nav className="transparent">
        <div className="nav-wrapper">
          <a href="/" className="brand-logo center"><img className="logo" src="media/logo.png"/></a>
          <ul id="nav-mobile" className="right hide-on-small-only">
            {button}
          </ul>
        </div>
      </nav>
    )
  }
}

module.exports = Header;