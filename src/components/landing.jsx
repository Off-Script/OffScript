import React from 'react';

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <div className="navbar">
          <a href="/">
          <button>Get Started</button>
          </a>
        </div>
        <div className="container">
          <h2 className="landing-tagline">Speak with confidence.</h2>
          <h3 className="landing-aboutus">About Us</h3>
        </div>
      </div>
    )
  }
}

module.exports = Landing;
