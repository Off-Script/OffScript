import React from 'react';
import LoginModal from './LoginModal.jsx';
import MyAccountButton from './MyAccountButton.jsx';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }
  }

  componentDidMount() {
    console.log(this.state.userLoggedIn);
    console.log('this.props.location.state', this.props);
    // if (this.props.location.state) {
    //   this.setState({
    //     isLoggedIn: true
    //   });
    // }
  }

  render() {
    const button = this.props.userLoggedIn ? (<li><MyAccountButton/></li>) : (<li><LoginModal /></li>);
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