import React from 'react';
import About from './About.jsx';

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <div className="parallax-container valign-wrapper">
          <div className="container">
            <h3 className="landing-tagline valign white-text">Speak with confidence.</h3>
            <a
              href="/upload"
              className="btn-large tooltipped waves-effect cyan accent-4 hoverable"
              data-position="bottom"
              data-delay="50"
              data-tooltip="Upload a script"
            >Get Started</a>
          </div>
          <div className="parallax"><img src="media/landing.jpg"/></div>
        </div>
        <About />
      </div>
    )
  }
}

module.exports = Landing;
