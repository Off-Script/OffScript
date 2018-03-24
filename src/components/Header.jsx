import React from 'react';
import LoginModal from './LoginModal.jsx'

const Header = (props) => (
  <nav className="transparent">
    <div className="nav-wrapper">
      <a href="/" className="brand-logo center"><img className="logo" src="media/logo.png"/></a>
      <ul id="nav-mobile" className="right hide-on-small-only">
        <li><LoginModal /></li>
      </ul>
    </div>
  </nav>
)

module.exports = Header;