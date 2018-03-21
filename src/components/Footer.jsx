import React from 'react';

const Footer = (props) => (
  <footer className="page-footer transparent z-depth-4">
      <div className="container blue-grey-text darken-3-text">
      © {new Date().getFullYear()} OffScript. Powered by IBM Watson.
      </div>
  </footer>
)

module.exports = Footer;